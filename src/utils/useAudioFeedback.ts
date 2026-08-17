"use client";
import { useRef, useCallback, useEffect } from 'react';

export const useAudioFeedback = () => {
  const audioCtxRef = useRef<AudioContext | null>(null);
  const metronomeIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Lazy Initialization of Audio Context (needed for modern browser auto-play policies)
  const getAudioContext = useCallback(() => {
    if (!audioCtxRef.current) {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (AudioCtx) {
        audioCtxRef.current = new AudioCtx();
      }
    }
    // Resume context if it was suspended
    if (audioCtxRef.current && audioCtxRef.current.state === 'suspended') {
      audioCtxRef.current.resume();
    }
    return audioCtxRef.current;
  }, []);

  const playHit = useCallback(() => {
    const ctx = getAudioContext();
    if (!ctx) return;

    // Typewriter click sound simulation
    const osc = ctx.createOscillator();
    const gainNode = ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(600, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(100, ctx.currentTime + 0.05);

    gainNode.gain.setValueAtTime(0.3, ctx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.05);

    osc.connect(gainNode);
    gainNode.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + 0.05);
  }, [getAudioContext]);

  const playError = useCallback(() => {
    const ctx = getAudioContext();
    if (!ctx) return;

    // Error buzzer sound simulation
    const osc = ctx.createOscillator();
    const gainNode = ctx.createGain();

    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(150, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(80, ctx.currentTime + 0.15);

    gainNode.gain.setValueAtTime(0.5, ctx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.15);

    osc.connect(gainNode);
    gainNode.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + 0.15);
  }, [getAudioContext]);

  const playMetronomeTick = useCallback(() => {
    const ctx = getAudioContext();
    if (!ctx) return;

    // Woodblock tick sound
    const osc = ctx.createOscillator();
    const gainNode = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(1000, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(100, ctx.currentTime + 0.05);

    gainNode.gain.setValueAtTime(0.4, ctx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.05);

    osc.connect(gainNode);
    gainNode.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + 0.05);
  }, [getAudioContext]);

  // Level up fanfare - ascending arpeggio
  const playLevelUp = useCallback(() => {
    const ctx = getAudioContext();
    if (!ctx) return;
    const notes = [523, 659, 784, 1047]; // C5 E5 G5 C6
    notes.forEach((freq, i) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, ctx.currentTime + i * 0.12);
      gain.gain.setValueAtTime(0.3, ctx.currentTime + i * 0.12);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + i * 0.12 + 0.3);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(ctx.currentTime + i * 0.12);
      osc.stop(ctx.currentTime + i * 0.12 + 0.3);
    });
  }, [getAudioContext]);

  // Achievement chime - sparkle sound
  const playAchievement = useCallback(() => {
    const ctx = getAudioContext();
    if (!ctx) return;
    [880, 1320, 1760].forEach((freq, i) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, ctx.currentTime + i * 0.08);
      gain.gain.setValueAtTime(0.25, ctx.currentTime + i * 0.08);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + i * 0.08 + 0.25);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(ctx.currentTime + i * 0.08);
      osc.stop(ctx.currentTime + i * 0.08 + 0.25);
    });
  }, [getAudioContext]);

  // Completion jingle - success chord
  const playCompletion = useCallback(() => {
    const ctx = getAudioContext();
    if (!ctx) return;
    [440, 554, 659].forEach(freq => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, ctx.currentTime);
      gain.gain.setValueAtTime(0.2, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.5);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.5);
    });
  }, [getAudioContext]);

  // New record - triumphant chord
  const playNewRecord = useCallback(() => {
    const ctx = getAudioContext();
    if (!ctx) return;
    const chords = [[523, 659, 784], [587, 740, 880], [659, 831, 1047]];
    chords.forEach((chord, ci) => {
      chord.forEach(freq => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, ctx.currentTime + ci * 0.2);
        gain.gain.setValueAtTime(0.2, ctx.currentTime + ci * 0.2);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + ci * 0.2 + 0.4);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(ctx.currentTime + ci * 0.2);
        osc.stop(ctx.currentTime + ci * 0.2 + 0.4);
      });
    });
  }, [getAudioContext]);

  // Metronome control
  const startMetronome = useCallback((bpm: number) => {
    if (metronomeIntervalRef.current) clearInterval(metronomeIntervalRef.current);
    const intervalMs = 60000 / bpm;
    metronomeIntervalRef.current = setInterval(() => {
      playMetronomeTick();
    }, intervalMs);
  }, [playMetronomeTick]);

  const stopMetronome = useCallback(() => {
    if (metronomeIntervalRef.current) {
      clearInterval(metronomeIntervalRef.current);
      metronomeIntervalRef.current = null;
    }
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (metronomeIntervalRef.current) {
        clearInterval(metronomeIntervalRef.current);
      }
    };
  }, []);

  return { playHit, playError, playLevelUp, playAchievement, playCompletion, playNewRecord, startMetronome, stopMetronome };
};
