"use client";

import { useEffect, useState, useRef } from 'react';
import StatsHeader from './StatsHeader';
import TextDisplay from './TextDisplay';
import VirtualKeyboard from './VirtualKeyboard';
import { useTypingEngine } from '../utils/useTypingEngine';
import { generateRandomText } from '../utils/generateRandomText';
import { useLocalStorage } from '../utils/useLocalStorage';
import { incrementGlobalStats } from '../lib/firebaseStats';

interface TypingEngineProps {
  lessonId: string;
  allowedCharacters: string[];
  wordCount?: number;
  timeLimitSeconds?: number | null;
  targetWpm?: number;
  keyboardType?: 'F' | 'Q';
  customWords?: string[];
  onNextLesson?: () => void;
}

export default function TypingEngine({
  lessonId,
  allowedCharacters,
  wordCount = 20,
  timeLimitSeconds = null,
  targetWpm = 15,
  keyboardType = 'F',
  customWords,
  onNextLesson
}: TypingEngineProps) {
  
  const [targetText, setTargetText] = useState("");
  const contentGeneratedRef = useRef(false);
  const scoreSavedRef = useRef(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Stats storage
  const [stats, setStats] = useLocalStorage("klavye_stats", {
    highestWpm: 0,
    testsCompleted: 0
  });

  // Per-lesson stats storage
  const [lessonStats, setLessonStats] = useLocalStorage<Record<string, any>>("klavye_lesson_stats", {});

  // Generate text once on mount or when allowed chars change
  useEffect(() => {
    // Basic prevention of double generation in StrictMode
    if (!contentGeneratedRef.current || targetText === "") {
      const text = generateRandomText(allowedCharacters, wordCount, 5, customWords);
      setTargetText(text);
      contentGeneratedRef.current = true;
    }
  }, [allowedCharacters, wordCount, targetText, customWords]);

  const { state, handleKeyDown, reset } = useTypingEngine(targetText, timeLimitSeconds);

  // Global keydown capture
  useEffect(() => {
    if (state.isComplete) return;
    
    const onKeyDown = (e: KeyboardEvent) => {
      // Don't capture if user is focusing on an input element somewhere else 
      if (document.activeElement?.tagName === 'INPUT' || document.activeElement?.tagName === 'TEXTAREA') {
        return;
      }
      handleKeyDown(e);
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [handleKeyDown, state.isComplete]);

  // Handle completion
  useEffect(() => {
    if (state.isComplete && !scoreSavedRef.current) {
      scoreSavedRef.current = true;
      setStats((prev: any) => ({
        ...prev,
        highestWpm: Math.max(prev.highestWpm, state.wpm),
        testsCompleted: prev.testsCompleted + 1
      }));

      // Async increment the global firebase stat
      incrementGlobalStats().catch(err => console.warn('Could not increment global stats', err));

      // Push individual stats to standard API (for Logged-in Students)
      fetch('/api/stats', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          lessonId,
          wpm: state.wpm,
          errors: state.errors,
          timeSeconds: state.timeElapsed,
          accuracy: state.wpm > 0 ? ((state.wpm * 5) / ((state.wpm * 5) + state.errors)) * 100 : 0 // Rough estimation for generic accuracy if wanted
        })
      }).catch(err => console.warn('Could not post local stats', err));

      setLessonStats((prev: any) => {
        const p = prev[lessonId] || { playCount: 0, totalErrors: 0, totalTimeSeconds: 0, highestWpm: 0 };
        return {
          ...prev,
          [lessonId]: {
            playCount: p.playCount + 1,
            totalErrors: p.totalErrors + state.errors,
            totalTimeSeconds: p.totalTimeSeconds + state.timeElapsed,
            highestWpm: Math.max(p.highestWpm, state.wpm)
          }
        };
      });
    }
  }, [state.isComplete, state.wpm, state.errors, state.timeElapsed, lessonId, setStats, setLessonStats]);

  const expectedChar = targetText[state.typedText.length] || null;

  const handleRestart = () => {
    scoreSavedRef.current = false;
    setTargetText(generateRandomText(allowedCharacters, wordCount, 5, customWords));
    reset();
    setTimeout(() => {
      containerRef.current?.focus();
    }, 100);
  };

  if (!targetText) return <div>Yükleniyor...</div>;

  return (
    <div className="typing-engine-container" ref={containerRef} tabIndex={-1}>
      <StatsHeader 
        wpm={state.wpm}
        accuracy={state.accuracy}
        errors={state.errors}
        timeElapsed={state.timeElapsed}
        timeLimit={timeLimitSeconds}
      />

      <TextDisplay 
        targetText={targetText}
        typedText={state.typedText}
        isActive={!state.isComplete}
      />

      {state.isComplete ? (
        <div className="glass-panel" style={{ marginTop: '2rem', padding: '2rem', textAlign: 'center' }}>
          <h2 style={{ marginBottom: '1rem', color: 'var(--success)' }}>Egzersiz Tamamlandı!</h2>
          <p style={{ marginBottom: '1rem', fontSize: '1.2rem' }}>
            Hızınız: <strong title="Dakika Başına Kelime">{state.wpm} DBK</strong>
            <br />
            Doğruluk Oranı: <strong>{state.accuracy}%</strong>
            <br />
            Toplam Basış: <strong>{state.totalKeystrokes}</strong>
            <br />
            Hatalı Basış: <strong>{state.errors}</strong>
          </p>
          {state.wpm >= targetWpm ? (
            <p style={{ color: 'var(--success)', marginBottom: '1.5rem', fontWeight: 'bold' }}>🎉 Hedefinize ulaştınız!</p>
          ) : (
            <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem' }}>Hedefinize ({targetWpm} DBK) ulaşmak için biraz daha pratik yapın.</p>
          )}
          
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
            <button 
              onClick={handleRestart}
              style={{
                padding: '0.75rem 2rem',
                background: 'transparent',
                color: 'var(--text-primary)',
                border: '1px solid var(--text-muted)',
                borderRadius: '8px',
                fontSize: '1.1rem',
                cursor: 'pointer',
                fontWeight: 'bold'
              }}
            >
              Tekrar Dene
            </button>

            {onNextLesson && (
              <button 
                onClick={onNextLesson}
                style={{
                  padding: '0.75rem 2rem',
                  background: 'var(--accent-color)',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '8px',
                  fontSize: '1.1rem',
                  cursor: 'pointer',
                  fontWeight: 'bold',
                  boxShadow: '0 4px 15px var(--accent-glow)'
                }}
              >
                Sonraki Ders →
              </button>
            )}
          </div>
        </div>
      ) : (
        <VirtualKeyboard expectedChar={expectedChar} keyboardType={keyboardType} />
      )}
    </div>
  );
}
