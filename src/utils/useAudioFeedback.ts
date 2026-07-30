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

  // Metronome control
  const startMetronome = useCallback((bpm: number) => {
    if (metronomeIntervalRef.current) clearInterval(metronomeIntervalRef.current);
    
    // Convert BPM to ms interval
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

  return { playHit, playError, startMetronome, stopMetronome };
};
