"use client";

import { useEffect, useRef } from 'react';
import StatsHeader from './StatsHeader';
import TextDisplay from './TextDisplay';
import { useTypingEngine } from '../utils/useTypingEngine';
import { useLocalStorage } from '../utils/useLocalStorage';

interface ExamEngineProps {
  targetText: string;
  timeLimitSeconds: number | null;
}

export default function ExamEngine({
  targetText,
  timeLimitSeconds
}: ExamEngineProps) {
  
  const containerRef = useRef<HTMLDivElement>(null);
  const scoreSavedRef = useRef(false);
  
  const [stats, setStats] = useLocalStorage("klavye_exam_stats", {
    highestWpm: 0,
    testsCompleted: 0
  });

  // Metni temizle (Gereksiz boşluklar ve satır başlarını kaldır)
  const sanitizedText = targetText.replace(/\s+/g, ' ').trim();
  const { state, handleKeyDown, reset } = useTypingEngine(sanitizedText, timeLimitSeconds);

  // Focus the textarea initially and when clicking the container
  useEffect(() => {
    if (!state.isComplete) {
      setTimeout(() => {
        containerRef.current?.querySelector('textarea')?.focus();
      }, 100);
    }
  }, [state.isComplete]);

  // Handle completion
  useEffect(() => {
    if (state.isComplete && !scoreSavedRef.current) {
      scoreSavedRef.current = true;
      setStats((prev: any) => ({
        ...prev,
        highestWpm: Math.max(prev.highestWpm, state.wpm),
        testsCompleted: prev.testsCompleted + 1
      }));
    }
  }, [state.isComplete, state.wpm, setStats]);

  const handleRestart = () => {
    scoreSavedRef.current = false;
    reset();
    setTimeout(() => {
      containerRef.current?.querySelector('textarea')?.focus();
    }, 100);
  };

  const onTextareaKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    // If it's a single char or backspace, let the engine handle it
    // We pass the native event to handleKeyDown
    handleKeyDown(e.nativeEvent as unknown as KeyboardEvent);
  };

  return (
    <div className="typing-engine-container" ref={containerRef}>
      <StatsHeader 
        wpm={state.wpm}
        accuracy={state.accuracy}
        errors={state.errors}
        timeElapsed={state.timeElapsed}
        timeLimit={timeLimitSeconds}
        hideStats={!state.isComplete}
      />

      <div style={{ marginBottom: '2rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        {/* Üst Kısım: Rehber Metin (5 Satır Sınırlı ve Kayan) */}
        <div style={{ 
          height: '230px',
          overflowY: 'hidden', 
          borderRadius: '12px', 
          border: '1px solid rgba(239, 68, 68, 0.2)',
          background: 'rgba(0,0,0,0.25)'
        }}>
          <TextDisplay 
            targetText={sanitizedText}
            typedText={state.typedText}
            isActive={!state.isComplete}
            displayOnly={true}
          />
        </div>

        {/* Alt Kısım: Yazım Alanı */}
        {!state.isComplete && (
          <div style={{
            padding: '1.5rem',
            borderRadius: '16px',
            border: '1px solid rgba(255,255,255,0.12)',
            background: 'rgba(255, 255, 255, 0.05)',
            boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.06)',
          }}>
            <textarea
              value={state.typedText}
              onChange={() => {}}
              onKeyDown={onTextareaKeyDown}
              placeholder="Yazmaya başlamak için buraya tıklayın ve yazmaya başlayın..."
              autoFocus
              style={{
                width: '100%',
                minHeight: '150px',
                background: 'transparent',
                border: 'none',
                color: '#fff',
                fontSize: '1.2rem',
                lineHeight: '1.8',
                resize: 'none',
                outline: 'none',
                fontFamily: 'inherit',
                caretColor: 'var(--accent-color)'
              }}
            />
          </div>
        )}
      </div>

      {state.isComplete && (
        <div className="glass-panel" style={{ padding: '2rem', textAlign: 'center', background: 'rgba(255,255,255,0.02)' }}>
          <h2 style={{ marginBottom: '1rem', color: timeLimitSeconds ? 'var(--error)' : 'var(--success)' }}>
            {timeLimitSeconds ? 'Süre Doldu! Katiplik Sınavınız Bitti' : 'Tebrikler! Metni Tamamladınız'}
          </h2>
          <p style={{ marginBottom: '1rem', fontSize: '1.2rem' }}>
            Net Hızınız: <strong>{state.wpm} WPM</strong>
            <br />
            Doğruluk: <strong>{state.accuracy}%</strong>
            <br />
            Hatalı Vuruş: <strong>{state.errors}</strong>
          </p>
          <div style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>
            {state.wpm > 90 ? (
               <span style={{color: 'var(--success)'}}>Tebrikler! Mükemmel bir skor. Katilip sınavı barajını rahatlıkla geçiyorsunuz.</span>
            ) : state.wpm > 60 ? (
               <span style={{color: '#fbbf24'}}>İyi bir skor. Ancak pratik yaparak daha da hızlanabilirsiniz.</span>
            ) : (
               <span>Daha fazla pratik yapmanız gerekiyor. Pes etmeyin! Her gün egzersiz yapmayı unutmayın.</span>
            )}
          </div>
          <button 
            onClick={handleRestart}
            style={{
              padding: '0.75rem 2rem',
              background: 'var(--error)',
              color: '#fff',
              border: 'none',
              borderRadius: '8px',
              fontSize: '1.1rem',
              cursor: 'pointer',
              fontWeight: 'bold'
            }}
          >
            Sınavı Tekrarla
          </button>
        </div>
      )}
    </div>
  );
}
