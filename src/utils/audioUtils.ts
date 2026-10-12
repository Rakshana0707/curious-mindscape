// Web Audio API Synthesizer for Authentic Paper Page Turn Sound
// 100% Client-side synthetic audio - zero external MP3 dependencies, instant response

class AudioManager {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = false;

  constructor() {
    // Check localStorage preference
    try {
      const savedMute = localStorage.getItem('curious_book_sound_muted');
      if (savedMute !== null) {
        this.isMuted = savedMute === 'true';
      }
    } catch {
      this.isMuted = false;
    }
  }

  private initContext() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtxClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtxClass) {
        this.ctx = new AudioCtxClass();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
  }

  public getMuted(): boolean {
    return this.isMuted;
  }

  public toggleMute(): boolean {
    this.isMuted = !this.isMuted;
    try {
      localStorage.setItem('curious_book_sound_muted', String(this.isMuted));
    } catch {
      // ignore
    }
    return this.isMuted;
  }

  // Synthesize realistic paper flip sound
  public playPageTurn() {
    if (this.isMuted) return;

    try {
      this.initContext();
      if (!this.ctx) return;

      const now = this.ctx.currentTime;

      // 1. White/Pink noise buffer for paper friction texture
      const bufferSize = this.ctx.sampleRate * 0.22; // ~220ms duration
      const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const data = buffer.getChannelData(0);
      let lastOut = 0.0;

      for (let i = 0; i < bufferSize; i++) {
        const white = Math.random() * 2 - 1;
        // Pink-ish filtering to soften the harsh noise into soft parchment texture
        lastOut = (lastOut * 0.7) + (white * 0.3);
        data[i] = lastOut;
      }

      const noiseSource = this.ctx.createBufferSource();
      noiseSource.buffer = buffer;

      // Bandpass filter to isolate paper rustle frequencies (800Hz - 3200Hz)
      const bandpass = this.ctx.createBiquadFilter();
      bandpass.type = 'bandpass';
      bandpass.frequency.setValueAtTime(1400, now);
      bandpass.frequency.exponentialRampToValueAtTime(2400, now + 0.09);
      bandpass.frequency.exponentialRampToValueAtTime(800, now + 0.21);
      bandpass.Q.setValueAtTime(2.2, now);

      // Lowpass filter to ensure silky parchment warmth
      const lowpass = this.ctx.createBiquadFilter();
      lowpass.type = 'lowpass';
      lowpass.frequency.setValueAtTime(3600, now);

      // Gain envelope for smooth paper swish
      const gainNode = this.ctx.createGain();
      gainNode.gain.setValueAtTime(0.001, now);
      gainNode.gain.linearRampToValueAtTime(0.18, now + 0.04);
      gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.21);

      noiseSource.connect(bandpass);
      bandpass.connect(lowpass);
      lowpass.connect(gainNode);
      gainNode.connect(this.ctx.destination);

      noiseSource.start(now);
      noiseSource.stop(now + 0.22);

      // 2. Subtle low-frequency thud for book spine resonance
      const osc = this.ctx.createOscillator();
      const oscGain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(120, now);
      osc.frequency.exponentialRampToValueAtTime(45, now + 0.08);

      oscGain.gain.setValueAtTime(0.04, now);
      oscGain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);

      osc.connect(oscGain);
      oscGain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.09);
    } catch {
      // Audio playback fails gracefully if blocked by autoplay policies
    }
  }
}

export const bookAudio = new AudioManager();
