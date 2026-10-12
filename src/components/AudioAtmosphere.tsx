import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, Volume2, VolumeX, Disc, Sparkles } from 'lucide-react';

export const AudioAtmosphere: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [activeMood, setActiveMood] = useState<'focus' | 'ambient' | 'flow'>('focus');
  const audioCtxRef = useRef<AudioContext | null>(null);
  const oscillatorRef = useRef<OscillatorNode | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);

  const moods = {
    focus: { name: 'Deep Systems Focus', freq: 432, bpm: '68 BPM', desc: 'Harmonic 432Hz Sine for analytical clarity' },
    ambient: { name: 'The Mindscape Library', freq: 528, bpm: '60 BPM', desc: '528Hz Solfeggio frequency for reflective reading' },
    flow: { name: 'Algorithmic Rhythm', freq: 396, bpm: '78 BPM', desc: 'Warm grounding fundamental for creative experimentation' },
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

      // Create subtle binaural/ambient harmonic drone
      const ctx = audioCtxRef.current;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(moods[activeMood].freq, ctx.currentTime);

      gain.gain.setValueAtTime(0.001, ctx.currentTime);
      // Gentle ramp to very low, relaxing volume
      gain.gain.exponentialRampToValueAtTime(isMuted ? 0.0001 : 0.04, ctx.currentTime + 1.5);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      oscillatorRef.current = osc;
      gainNodeRef.current = gain;
    } catch {
      // Graceful fallback if Web Audio is not supported
      console.info("Web Audio initialized in visual simulation mode.");
    }
  };

  const stopAudio = () => {
    if (oscillatorRef.current && gainNodeRef.current && audioCtxRef.current) {
      try {
        const ctx = audioCtxRef.current;
        gainNodeRef.current.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.5);
        setTimeout(() => {
          oscillatorRef.current?.stop();
          oscillatorRef.current?.disconnect();
          oscillatorRef.current = null;
        }, 500);
      } catch {
        oscillatorRef.current = null;
      }
    }
  };

  const handleMoodChange = (mood: 'focus' | 'ambient' | 'flow') => {
    setActiveMood(mood);
    if (isPlaying && oscillatorRef.current && audioCtxRef.current) {
      oscillatorRef.current.frequency.setTargetAtTime(moods[mood].freq, audioCtxRef.current.currentTime, 0.2);
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
        {/* Left: Rotating vinyl / audio symbol */}
        <div className="flex items-center gap-3">
          <div className="relative w-11 h-11 rounded-full bg-obsidian-deep border border-accent-teal/40 flex items-center justify-center overflow-hidden">
            <Disc className={`w-6 h-6 text-accent-teal transition-transform duration-1000 ${isPlaying ? 'animate-spin' : ''}`} />
            {isPlaying && (
              <span className="absolute inset-0 rounded-full border border-accent-teal animate-ping opacity-25" />
            )}
          </div>

          <div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-[10px] text-accent-teal uppercase tracking-widest font-semibold">
                Soundscape Node
              </span>
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-accent-teal animate-pulse" />
            </div>
            <h4 className="font-grotesk font-semibold text-sm text-text-soft">
              {moods[activeMood].name}
            </h4>
            <p className="font-mono text-[11px] text-text-muted">
              {moods[activeMood].bpm} · {moods[activeMood].freq}Hz Resonance
            </p>
          </div>
        </div>

        {/* Right: Controls & animated EQ bars */}
        <div className="flex items-center gap-3">
          {/* Audio Visualizer Bars */}
          <div className="flex items-end gap-1 h-6 px-2 py-1 bg-obsidian/70 rounded-md border border-white/5" aria-hidden="true">
            {[40, 75, 30, 90, 60, 45, 80, 50].map((h, i) => (
              <span
                key={i}
                className="w-1 bg-accent-teal rounded-full transition-all duration-300"
                style={{
                  height: isPlaying ? `${Math.max(15, (h * (i % 2 === 0 ? 0.9 : 1.2)) % 100)}%` : '20%',
                  opacity: isPlaying ? 0.9 : 0.35,
                  animation: isPlaying ? `subtle-float ${0.8 + (i * 0.15)}s ease-in-out infinite alternate` : 'none',
                }}
              />
            ))}
          </div>

          {/* Play/Pause Button */}
          <button
            onClick={togglePlayback}
            className={`w-9 h-9 rounded-full flex items-center justify-center transition-all ${
              isPlaying
                ? 'bg-accent-teal text-obsidian shadow-[0_0_15px_rgba(45,212,191,0.4)]'
                : 'bg-graphite-light text-text-soft hover:bg-white/10 border border-white/10'
            }`}
            aria-label={isPlaying ? 'Pause ambient atmosphere' : 'Play ambient audio atmosphere (sound starts muted or soft)'}
            title={isPlaying ? 'Pause ambient soundscape' : 'Listen to ambient acoustic frequency'}
          >
            {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
          </button>

          {/* Mute toggle */}
          {isPlaying && (
            <button
              onClick={() => {
                const nextMuted = !isMuted;
                setIsMuted(nextMuted);
                if (gainNodeRef.current && audioCtxRef.current) {
                  gainNodeRef.current.gain.setTargetAtTime(nextMuted ? 0.0001 : 0.04, audioCtxRef.current.currentTime, 0.1);
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

      {/* Mood mode selectors */}
      <div className="mt-3 pt-3 border-t border-white/5 flex flex-wrap items-center justify-between gap-2 text-xs">
        <span className="font-mono text-[10px] text-text-muted flex items-center gap-1">
          <Sparkles className="w-3 h-3 text-accent-teal" />
          Frequency Modes:
        </span>
        <div className="flex items-center gap-1.5 font-mono text-[11px]">
          {(['focus', 'ambient', 'flow'] as const).map((moodKey) => (
            <button
              key={moodKey}
              onClick={() => handleMoodChange(moodKey)}
              className={`px-2 py-0.5 rounded text-[10px] uppercase transition-colors ${
                activeMood === moodKey
                  ? 'bg-accent-teal/20 text-accent-teal border border-accent-teal/40 font-semibold'
                  : 'text-text-muted hover:text-text-soft bg-obsidian/40 border border-transparent'
              }`}
            >
              {moodKey}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
