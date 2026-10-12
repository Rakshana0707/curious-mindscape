import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, Volume2, VolumeX, Activity, Cpu } from 'lucide-react';

export const AudioAtmosphere: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [activeFrequency, setActiveFrequency] = useState<'432' | '528' | '396'>('432');
  const audioCtxRef = useRef<AudioContext | null>(null);
  const oscillatorRef = useRef<OscillatorNode | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);

  const frequencies = {
    '432': { name: '432 Hz Calibration Wave', freq: 432, desc: 'Sine Wave Harmonic Carrier' },
    '528': { name: '528 Hz Reference Tone', freq: 528, desc: 'High-Purity Audio Synthesis' },
    '396': { name: '396 Hz Fundamental Tone', freq: 396, desc: 'Low-Frequency Oscillation' },
  };

  const togglePlayback = () => {
    if (isPlaying) {
      stopAudio();
      setIsPlaying(false);
    } else {
      startAudio();
      setIsPlaying(true);
    }
  };

  const startAudio = () => {
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!audioCtxRef.current) {
        audioCtxRef.current = new AudioCtx();
      }
      if (audioCtxRef.current.state === 'suspended') {
        audioCtxRef.current.resume();
      }

      const ctx = audioCtxRef.current;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(frequencies[activeFrequency].freq, ctx.currentTime);

      gain.gain.setValueAtTime(0.001, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(isMuted ? 0.0001 : 0.03, ctx.currentTime + 1.2);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      oscillatorRef.current = osc;
      gainNodeRef.current = gain;
    } catch {
      console.info("Web Audio initialized in visual simulation mode.");
    }
  };

  const stopAudio = () => {
    if (oscillatorRef.current && gainNodeRef.current && audioCtxRef.current) {
      try {
        const ctx = audioCtxRef.current;
        gainNodeRef.current.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.4);
        setTimeout(() => {
          oscillatorRef.current?.stop();
          oscillatorRef.current?.disconnect();
          oscillatorRef.current = null;
        }, 400);
      } catch {
        oscillatorRef.current = null;
      }
    }
  };

  const handleFrequencyChange = (freq: '432' | '528' | '396') => {
    setActiveFrequency(freq);
    if (isPlaying && oscillatorRef.current && audioCtxRef.current) {
      oscillatorRef.current.frequency.setTargetAtTime(frequencies[freq].freq, audioCtxRef.current.currentTime, 0.2);
    }
  };

  useEffect(() => {
    return () => {
      stopAudio();
      if (audioCtxRef.current && audioCtxRef.current.state !== 'closed') {
        audioCtxRef.current.close().catch(() => {});
      }
    };
  }, []);

  return (
    <div className="relative group bg-graphite/90 backdrop-blur-md border border-white/10 rounded-2xl p-4 sm:p-5 shadow-card hover:border-accent-teal/40 transition-all duration-300">
      <div className="flex items-center justify-between gap-4">
        {/* Left: Signal Indicator */}
        <div className="flex items-center gap-3">
          <div className="relative w-10 h-10 rounded-xl bg-obsidian-deep border border-accent-teal/40 flex items-center justify-center overflow-hidden">
            <Activity className={`w-5 h-5 text-accent-teal ${isPlaying ? 'animate-pulse' : ''}`} />
          </div>

          <div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-[10px] text-accent-teal uppercase tracking-widest font-semibold">
                Web Audio Telemetry
              </span>
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-accent-teal animate-pulse" />
            </div>
            <h4 className="font-grotesk font-semibold text-sm text-text-soft">
              {frequencies[activeFrequency].name}
            </h4>
            <p className="font-mono text-[11px] text-text-muted">
              {frequencies[activeFrequency].desc}
            </p>
          </div>
        </div>

        {/* Right: Controls & Frequency Spectrum Bars */}
        <div className="flex items-center gap-3">
          <div className="flex items-end gap-1 h-6 px-2 py-1 bg-obsidian/70 rounded-md border border-white/5" aria-hidden="true">
            {[40, 75, 30, 90, 60, 45, 80, 50].map((h, i) => (
              <span
                key={i}
                className="w-1 bg-accent-teal rounded-full transition-all duration-300"
                style={{
                  height: isPlaying ? `${Math.max(15, (h * (i % 2 === 0 ? 0.9 : 1.2)) % 100)}%` : '20%',
                  opacity: isPlaying ? 0.9 : 0.35,
                }}
              />
            ))}
          </div>

          <button
            onClick={togglePlayback}
            className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all ${
              isPlaying
                ? 'bg-accent-teal text-obsidian shadow-[0_0_15px_rgba(45,212,191,0.4)]'
                : 'bg-graphite-light text-text-soft hover:bg-white/10 border border-white/10'
            }`}
            aria-label={isPlaying ? 'Stop signal synthesizer' : 'Start signal synthesizer'}
            title={isPlaying ? 'Stop signal synthesizer' : 'Synthesize Web Audio sine wave'}
          >
            {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
          </button>

          {isPlaying && (
            <button
              onClick={() => {
                const nextMuted = !isMuted;
                setIsMuted(nextMuted);
                if (gainNodeRef.current && audioCtxRef.current) {
                  gainNodeRef.current.gain.setTargetAtTime(nextMuted ? 0.0001 : 0.03, audioCtxRef.current.currentTime, 0.1);
                }
              }}
              className="p-2 text-text-muted hover:text-text-soft"
              aria-label={isMuted ? 'Unmute' : 'Mute'}
            >
              {isMuted ? <VolumeX className="w-4 h-4 text-accent-amber" /> : <Volume2 className="w-4 h-4" />}
            </button>
          )}
        </div>
      </div>

      {/* Tone frequency selector */}
      <div className="mt-3 pt-3 border-t border-white/5 flex flex-wrap items-center justify-between gap-2 text-xs">
        <span className="font-mono text-[10px] text-text-muted flex items-center gap-1">
          <Cpu className="w-3 h-3 text-accent-teal" />
          Frequency Band:
        </span>
        <div className="flex items-center gap-1.5 font-mono text-[11px]">
          {(['432', '528', '396'] as const).map((freqKey) => (
            <button
              key={freqKey}
              onClick={() => handleFrequencyChange(freqKey)}
              className={`px-2 py-0.5 rounded text-[10px] uppercase transition-colors ${
                activeFrequency === freqKey
                  ? 'bg-accent-teal/20 text-accent-teal border border-accent-teal/40 font-semibold'
                  : 'text-text-muted hover:text-text-soft bg-obsidian/40 border border-transparent'
              }`}
            >
              {freqKey} Hz
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
