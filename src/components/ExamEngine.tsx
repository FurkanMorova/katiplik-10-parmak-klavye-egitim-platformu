"use client";

import { useEffect, useRef } from 'react';
import StatsHeader from './StatsHeader';
import TextDisplay from './TextDisplay';
import { useTypingEngine } from '../utils/useTypingEngine';
import { useLocalStorage } from '../utils/useLocalStorage';
import { useAudioFeedback } from '../utils/useAudioFeedback';
import HeatmapKeyboard from './HeatmapKeyboard';
import { incrementGlobalStats } from '../lib/firebaseStats';

interface ExamEngineProps {
  examId: string;
  targetText: string;
  timeLimitSeconds: number | null;
  keyboardType: 'F' | 'Q';
  onRestart?: () => void;
}

export default function ExamEngine({
  examId,
  targetText,
  timeLimitSeconds,
  keyboardType,
  onRestart
}: ExamEngineProps) {
  
  const containerRef = useRef<HTMLDivElement>(null);
  const scoreSavedRef = useRef(false);
  
  const [stats, setStats] = useLocalStorage("klavye_exam_stats", {
    highestWpm: 0,
    testsCompleted: 0
  });

  // Metni temizle (Gereksiz boşluklar ve satır başlarını kaldır)
  const sanitizedText = targetText.replace(/\s+/g, ' ').trim();
  
  const [globalHeatmap, setGlobalHeatmap] = useLocalStorage<Record<string, {hits: number, misses: number}>>("klavye_global_heatmap", {});
  const [audioEnabled, setAudioEnabled] = useLocalStorage('klavye_audio_pref', true);

  const { playHit, playError } = useAudioFeedback();

  const { state, handleKeyDown, reset } = useTypingEngine(sanitizedText, {
    timeLimitSeconds,
    onKeyHit: () => { if (audioEnabled) playHit(); },
    onKeyError: () => { if (audioEnabled) playError(); }
  });

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

      // Async increment the global firebase stat
      incrementGlobalStats().catch(err => console.warn('Could not increment global stats', err));

      // Veritabanına da istatistiği gönder
      fetch('/api/stats', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          lessonId: `exam-${examId}`,
          wpm: state.wpm,
          errors: state.errors,
          timeSeconds: state.timeElapsed,
          accuracy: state.accuracy,
          correctWords: state.correctWords,
          incorrectWords: state.incorrectWords,
          errorRate: state.errorRate
        })
      }).catch(err => console.warn('Could not post exam stats', err));

      setGlobalHeatmap((prev: any) => {
        const next = { ...prev };
        Object.keys(state.heatmapStats).forEach(char => {
           if (!next[char]) next[char] = { hits: 0, misses: 0 };
           next[char].hits += state.heatmapStats[char].hits;
           next[char].misses += state.heatmapStats[char].misses;
        });
        return next;
      });
    }
  }, [state.isComplete, state.wpm, state.errors, state.timeElapsed, state.accuracy, state.correctWords, state.incorrectWords, state.errorRate, examId, state.heatmapStats, setStats, setGlobalHeatmap]);

  const handleRestart = () => {
    scoreSavedRef.current = false;
    reset();
    if (onRestart) onRestart();
    setTimeout(() => {
      containerRef.current?.querySelector('textarea')?.focus();
    }, 100);
  };

  const onTextareaKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    // Tüm tuşlar için default browser davranışını engelle
    // (Textarea'ya native yazı yazmasını engelle, sadece engine kontrol etsin)
    e.preventDefault();
    handleKeyDown(e.nativeEvent as unknown as KeyboardEvent);
  };

  return (
    <div className="typing-engine-container exam-wide" ref={containerRef}>
      <StatsHeader 
        wpm={state.wpm}
        accuracy={state.accuracy}
        errors={state.errors}
        timeElapsed={state.timeElapsed}
        timeLimit={timeLimitSeconds}
        hideStats={!state.isComplete}
        correctWords={state.correctWords}
        incorrectWords={state.incorrectWords}
        errorRate={state.errorRate}
      />

      <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem', opacity: state.isComplete ? 0.3 : 1 }}>
        <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', color: 'var(--text-secondary)', cursor: 'pointer' }}>
          <input type="checkbox" checked={audioEnabled} onChange={e => setAudioEnabled(e.target.checked)} style={{ cursor: 'pointer' }} />
          🎧 Tuş Sesi
        </label>
      </div>

      <div style={{ marginBottom: '2rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        {/* Üst Kısım: Rehber Metin (5 Satır Sınırlı ve Kayan) */}
        <div style={{ 
          height: '380px',
          overflowY: 'hidden', 
          borderRadius: '12px', 
          border: '1px solid var(--border-medium)',
          background: 'var(--bg-glass)'
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
            border: '1px solid var(--border-medium)',
            background: 'var(--bg-glass)',
            boxShadow: 'none',
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
                color: 'var(--text-primary)',
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
        <div className="glass-panel" style={{ padding: '2rem', textAlign: 'center', background: 'var(--bg-glass)' }}>
          <h2 style={{ marginBottom: '1rem', color: timeLimitSeconds ? 'var(--error)' : 'var(--success)' }}>
            {timeLimitSeconds ? 'Süre Doldu! Katiplik Sınavınız Bitti' : 'Tebrikler! Metni Tamamladınız'}
          </h2>
          <p style={{ marginBottom: '1rem', fontSize: '1.2rem', lineHeight: '1.8' }}>
            Süre: <strong>{state.timeElapsed} sn</strong>
            <br />
            Doğruluk: <strong>{state.accuracy}%</strong>
            <br />
            Net Hız: <strong style={{color: 'var(--accent-color)'}}>{state.wpm} DBK</strong>
            <br />
            Toplam Vuruş: <strong>{state.totalKeystrokes}</strong>
            <br />
            Hatalı Vuruş: <strong>{state.errors}</strong>
            <br />
            Doğru Kelime: <strong style={{color: 'var(--success)'}}>{state.correctWords}</strong>
            <br />
            Yanlış Kelime: <strong style={{color: 'var(--error)'}}>{state.incorrectWords}</strong>
            <br />
            Hata Oranı: <strong style={{color: 'var(--error)'}}>%{state.errorRate}</strong>
          </p>

          <div style={{ marginBottom: '2rem' }}>
             <HeatmapKeyboard stats={state.heatmapStats} keyboardType={keyboardType} />
          </div>

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
