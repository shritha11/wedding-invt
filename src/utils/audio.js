/**
 * Traditional Indian Wedding Audio Player (Web Audio API)
 * Procedurally synthesizes a soothing classical Raga Kalyani / Yaman melody
 * with warm shehnai/flute tones, meditative tanpura drone, and gentle temple bell chime.
 * 100% self-contained, lightweight, zero external network dependency.
 */

class IndianWeddingAudioPlayer {
  constructor() {
    this.ctx = null;
    this.isPlaying = false;
    this.masterGain = null;
    this.timerId = null;
    this.droneGain = null;
    this.droneOscs = [];
    this.onStateChange = null;
  }

  init() {
    if (this.ctx) return;
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;
    this.ctx = new AudioContext();

    this.masterGain = this.ctx.createGain();
    this.masterGain.gain.setValueAtTime(0.18, this.ctx.currentTime);
    this.masterGain.connect(this.ctx.destination);
  }

  // Play an auspicious temple bell chime (Ghanta)
  playTempleBell(freq = 1046.5) {
    if (!this.ctx || !this.isPlaying) return;
    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const bellGain = this.ctx.createGain();

    osc.type = "sine";
    osc.frequency.setValueAtTime(freq, now);

    // Exponential decay bell envelope
    bellGain.gain.setValueAtTime(0.08, now);
    bellGain.gain.exponentialRampToValueAtTime(0.0001, now + 3.2);

    osc.connect(bellGain);
    bellGain.connect(this.masterGain);

    osc.start(now);
    osc.stop(now + 3.3);
  }

  // Auspicious Tanpura drone in Sa-Pa (C - G)
  startTanpuraDrone() {
    if (!this.ctx) return;
    const now = this.ctx.currentTime;
    this.droneGain = this.ctx.createGain();
    this.droneGain.gain.setValueAtTime(0.0001, now);
    this.droneGain.gain.linearRampToValueAtTime(0.05, now + 2.5);
    this.droneGain.connect(this.masterGain);

    // Fundamental frequencies: Sa (C3 = 130.81Hz), Pa (G3 = 196Hz), Sa' (C4 = 261.63Hz)
    const pitches = [130.81, 196.00, 261.63, 131.2];
    this.droneOscs = pitches.map((pitch, idx) => {
      const osc = this.ctx.createOscillator();
      osc.type = idx % 2 === 0 ? "sawtooth" : "triangle";
      osc.frequency.setValueAtTime(pitch, now);

      // Low pass filter for soft meditative warm resonance
      const filter = this.ctx.createBiquadFilter();
      filter.type = "lowpass";
      filter.frequency.setValueAtTime(320, now);

      osc.connect(filter);
      filter.connect(this.droneGain);
      osc.start(now);
      return osc;
    });
  }

  stopTanpuraDrone() {
    if (!this.ctx || !this.droneGain) return;
    const now = this.ctx.currentTime;
    try {
      this.droneGain.gain.linearRampToValueAtTime(0.0001, now + 0.8);
      setTimeout(() => {
        this.droneOscs.forEach(o => {
          try { o.stop(); o.disconnect(); } catch (e) {}
        });
        this.droneOscs = [];
        this.droneGain = null;
      }, 900);
    } catch (e) {}
  }

  // Play single warm shehnai/bansuri-like note with delicate vibrato
  playMelodyNote(freq, duration = 1.2, delay = 0) {
    if (!this.ctx || !this.isPlaying) return;
    const now = this.ctx.currentTime + delay;

    const osc = this.ctx.createOscillator();
    const vibrato = this.ctx.createOscillator();
    const vibratoGain = this.ctx.createGain();
    const noteGain = this.ctx.createGain();
    const filter = this.ctx.createBiquadFilter();

    // Shehnai dual-reed warmth (triangle + subtle harmonics via lowpass filter)
    osc.type = "triangle";
    osc.frequency.setValueAtTime(freq, now);

    // Authentic Indian classical gamaka (subtle frequency slide)
    osc.frequency.exponentialRampToValueAtTime(freq * 1.008, now + duration * 0.4);
    osc.frequency.exponentialRampToValueAtTime(freq, now + duration);

    // Vibrato LFO
    vibrato.frequency.setValueAtTime(5.2, now); // 5.2 Hz Indian classical vibrato
    vibratoGain.gain.setValueAtTime(3.5, now);
    vibrato.connect(osc.frequency);
    vibrato.start(now);
    vibrato.stop(now + duration + 0.2);

    // Filter shaping
    filter.type = "bandpass";
    filter.frequency.setValueAtTime(freq * 1.8, now);
    filter.Q.setValueAtTime(1.8, now);

    // Soft attack, singing sustain, gentle release
    noteGain.gain.setValueAtTime(0.0001, now);
    noteGain.gain.linearRampToValueAtTime(0.12, now + 0.22);
    noteGain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

    osc.connect(filter);
    filter.connect(noteGain);
    noteGain.connect(this.masterGain);

    osc.start(now);
    osc.stop(now + duration + 0.05);
  }

  // Loop auspicious Raga Kalyani melody phrases (Sa, Re, Ga, Ma', Pa, Dha, Ni, Sa)
  startMelodyLoop() {
    // Frequencies (Hz): C4 = 261.63, D4 = 293.66, E4 = 329.63, F#4 = 369.99, G4 = 392.00, A4 = 440.00, B4 = 493.88, C5 = 523.25
    const Sa = 261.63;
    const Re = 293.66;
    const Ga = 329.63;
    const TivraMa = 369.99;
    const Pa = 392.00;
    const Dha = 440.00;
    const Ni = 493.88;
    const SaHigh = 523.25;

    // Classic Auspicious Kalyani Wedding Phrases
    const phrases = [
      // Phrase 1: Kalyani Aarohana cadence
      [
        { f: Sa, d: 1.2 }, { f: Ga, d: 1.0 }, { f: TivraMa, d: 0.9 },
        { f: Pa, d: 1.8 }, { f: Dha, d: 1.2 }, { f: Ni, d: 1.2 }, { f: SaHigh, d: 2.2 }
      ],
      // Phrase 2: Gentle descending blessing
      [
        { f: SaHigh, d: 1.2 }, { f: Ni, d: 1.0 }, { f: Dha, d: 1.2 },
        { f: Pa, d: 2.0 }, { f: TivraMa, d: 1.0 }, { f: Ga, d: 1.4 }, { f: Re, d: 1.2 }, { f: Sa, d: 2.5 }
      ],
      // Phrase 3: Madhyama sthayi devotional celebration
      [
        { f: Ga, d: 1.2 }, { f: TivraMa, d: 1.0 }, { f: Pa, d: 1.4 },
        { f: Dha, d: 1.0 }, { f: Pa, d: 2.2 }, { f: Ga, d: 1.2 }, { f: Re, d: 1.4 }, { f: Sa, d: 2.8 }
      ]
    ];

    let currentPhraseIdx = 0;

    const playNextPhrase = () => {
      if (!this.isPlaying) return;
      const phrase = phrases[currentPhraseIdx];
      let offset = 0;

      // Play bell at start of phrase periodically
      if (currentPhraseIdx === 0) {
        this.playTempleBell(1046.5);
      }

      phrase.forEach(note => {
        this.playMelodyNote(note.f, note.d, offset);
        offset += note.d * 0.92;
      });

      currentPhraseIdx = (currentPhraseIdx + 1) % phrases.length;
      this.timerId = setTimeout(playNextPhrase, (offset + 1.2) * 1000);
    };

    playNextPhrase();
  }

  toggle() {
    if (this.isPlaying) {
      this.pause();
    } else {
      this.play();
    }
  }

  async play() {
    this.init();
    if (!this.ctx) return;
    if (this.ctx.state === "suspended") {
      await this.ctx.resume();
    }
    this.isPlaying = true;
    if (this.onStateChange) this.onStateChange(true);

    this.startTanpuraDrone();
    this.startMelodyLoop();
  }

  pause() {
    this.isPlaying = false;
    if (this.timerId) {
      clearTimeout(this.timerId);
      this.timerId = null;
    }
    this.stopTanpuraDrone();
    if (this.onStateChange) this.onStateChange(false);
  }
}

export const weddingAudio = new IndianWeddingAudioPlayer();
