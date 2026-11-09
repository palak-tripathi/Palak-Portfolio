import { useCallback, useEffect, useRef, useState } from "react";
import { Music, Volume2, VolumeX } from "lucide-react";
import { Button } from "@/components/ui/button";

let audioCtx: AudioContext | null = null;

function getAudioContext(): AudioContext | null {
  if (typeof window === "undefined") return null;
  if (!audioCtx) {
    const AudioContextClass =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  if (audioCtx && audioCtx.state === "suspended") {
    audioCtx.resume().catch(() => {});
  }
  return audioCtx;
}

// Separate Magical Book Opening Sound (Celestial Harp & Sparkle Glissando)
export function playMagicalOpenSound() {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    // Ascending celestial bell/harp chord: E5, G#5, B5, E6, G#6
    const freqs = [659.25, 830.61, 987.77, 1318.51, 1661.22];

    freqs.forEach((freq, i) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const filter = ctx.createBiquadFilter();

      osc.type = "sine";
      osc.frequency.setValueAtTime(freq, ctx.currentTime + i * 0.08);

      filter.type = "lowpass";
      filter.frequency.setValueAtTime(3000, ctx.currentTime);

      const startTime = ctx.currentTime + i * 0.08;
      gain.gain.setValueAtTime(0.0001, startTime);
      gain.gain.exponentialRampToValueAtTime(0.12, startTime + 0.04);
      gain.gain.exponentialRampToValueAtTime(0.0001, startTime + 1.2);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      osc.start(startTime);
      osc.stop(startTime + 1.3);
    });

    // Magical golden sparkle shimmer
    const shimmer = ctx.createOscillator();
    const shimmerGain = ctx.createGain();
    shimmer.type = "triangle";
    shimmer.frequency.setValueAtTime(2400, ctx.currentTime + 0.3);
    shimmer.frequency.exponentialRampToValueAtTime(3600, ctx.currentTime + 0.9);

    shimmerGain.gain.setValueAtTime(0.0001, ctx.currentTime + 0.3);
    shimmerGain.gain.exponentialRampToValueAtTime(0.05, ctx.currentTime + 0.5);
    shimmerGain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 1.1);

    shimmer.connect(shimmerGain);
    shimmerGain.connect(ctx.destination);
    shimmer.start(ctx.currentTime + 0.3);
    shimmer.stop(ctx.currentTime + 1.2);
  } catch {
    // audio disabled or restricted
  }
}

// Realistic Paper Page-Turn Flutter Sound
export function playPageTurnSound() {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    const bufferSize = Math.floor(ctx.sampleRate * 0.18);
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);

    let b0 = 0,
      b1 = 0,
      b2 = 0;
    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;
      b0 = 0.99886 * b0 + white * 0.0555179;
      b1 = 0.99332 * b1 + white * 0.0750759;
      b2 = 0.969 * b2 + white * 0.153852;
      const pink = b0 + b1 + b2 + white * 0.5362;
      const progress = i / bufferSize;
      const envelope = Math.sin(progress * Math.PI) * Math.exp(-progress * 2.8);
      data[i] = pink * 0.07 * envelope;
    }

    const noiseNode = ctx.createBufferSource();
    noiseNode.buffer = buffer;

    const filter = ctx.createBiquadFilter();
    filter.type = "lowpass";
    filter.frequency.setValueAtTime(1400, ctx.currentTime);
    filter.frequency.exponentialRampToValueAtTime(350, ctx.currentTime + 0.18);

    const gainNode = ctx.createGain();
    gainNode.gain.setValueAtTime(0.5, ctx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.18);

    noiseNode.connect(filter);
    filter.connect(gainNode);
    gainNode.connect(ctx.destination);

    noiseNode.start();
  } catch {
    // fallback
  }
}

// Romantic Felt-Piano Synthesizer (Gentle, dreamlike piano arpeggio)
function playPianoNote(
  ctx: AudioContext,
  freq: number,
  time: number,
  duration: number,
  masterGain: GainNode,
) {
  // Fundamental + warm acoustic felt harmonics
  const osc1 = ctx.createOscillator();
  const osc2 = ctx.createOscillator();
  const gain = ctx.createGain();
  const filter = ctx.createBiquadFilter();

  osc1.type = "sine";
  osc1.frequency.setValueAtTime(freq, time);

  osc2.type = "triangle";
  osc2.frequency.setValueAtTime(freq * 2, time); // 1st harmonic

  filter.type = "lowpass";
  filter.frequency.setValueAtTime(900, time);
  filter.frequency.exponentialRampToValueAtTime(300, time + duration);

  // Felt-piano envelope
  gain.gain.setValueAtTime(0.0001, time);
  gain.gain.exponentialRampToValueAtTime(0.045, time + 0.015);
  gain.gain.exponentialRampToValueAtTime(0.0001, time + duration);

  osc1.connect(filter);
  osc2.connect(filter);
  filter.connect(gain);
  gain.connect(masterGain);

  osc1.start(time);
  osc2.start(time);
  osc1.stop(time + duration + 0.05);
  osc2.stop(time + duration + 0.05);
}

export function DiaryAudioControls({ className = "" }: { className?: string }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const loopTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const masterGainRef = useRef<GainNode | null>(null);

  const startPianoMusic = useCallback(() => {
    const ctx = getAudioContext();
    if (!ctx) return;

    if (!masterGainRef.current) {
      const mg = ctx.createGain();
      mg.gain.setValueAtTime(0.9, ctx.currentTime);
      mg.connect(ctx.destination);
      masterGainRef.current = mg;
    }

    // Romantic, gentle chord progression (Eb Maj7 -> Cm9 -> Ab Maj7 -> Bb sus)
    // Frequencies:
    // Eb Maj7: Eb4 (311.13), G4 (392.00), Bb4 (466.16), D5 (587.33)
    // Cm9:     C4 (261.63), Eb4 (311.13), G4 (392.00), D5 (587.33)
    // Ab Maj7: Ab3 (207.65), C4 (261.63), Eb4 (311.13), G4 (392.00)
    // Bb sus:  Bb3 (233.08), F4 (349.23), Bb4 (466.16), Eb5 (622.25)
    const chords = [
      [311.13, 392.0, 466.16, 587.33],
      [261.63, 311.13, 392.0, 587.33],
      [207.65, 261.63, 311.13, 392.0],
      [233.08, 349.23, 466.16, 622.25],
    ];

    let chordIdx = 0;

    const playNextBar = () => {
      const now = ctx.currentTime;
      const currentChord = chords[chordIdx % chords.length];

      currentChord.forEach((note, nIdx) => {
        playPianoNote(ctx, note, now + nIdx * 0.65, 2.2, masterGainRef.current!);
      });

      chordIdx++;
      loopTimeoutRef.current = setTimeout(playNextBar, 2800);
    };

    playNextBar();
    setIsPlaying(true);
  }, []);

  const stopPianoMusic = useCallback(() => {
    if (loopTimeoutRef.current) {
      clearTimeout(loopTimeoutRef.current);
      loopTimeoutRef.current = null;
    }
    setIsPlaying(false);
  }, []);

  const toggleMusic = () => {
    if (isPlaying) {
      stopPianoMusic();
    } else {
      startPianoMusic();
    }
  };

  useEffect(() => {
    return () => {
      stopPianoMusic();
    };
  }, [stopPianoMusic]);

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={toggleMusic}
      className={`rounded-full border border-pink-300/80 font-serif text-xs font-semibold backdrop-blur transition ${
        isPlaying
          ? "bg-pink-100 text-pink-950 shadow-xs"
          : "bg-white/80 text-stone-700 hover:bg-pink-50"
      } ${className}`}
      title={isPlaying ? "Mute romantic piano music" : "Play romantic piano music"}
    >
      {isPlaying ? (
        <>
          <Volume2 className="mr-1.5 h-3.5 w-3.5 text-pink-600 animate-pulse" />
          <span>Piano: On</span>
        </>
      ) : (
        <>
          <VolumeX className="mr-1.5 h-3.5 w-3.5 text-stone-400" />
          <span>Piano: Off</span>
        </>
      )}
    </Button>
  );
}
