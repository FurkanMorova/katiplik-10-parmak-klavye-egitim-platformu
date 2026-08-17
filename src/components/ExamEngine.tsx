"use client";

import { useEffect, useRef, useState, useCallback } from 'react';
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
  timeLimitSeconds = 180,
  keyboardType,
  onRestart
}: ExamEngineProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const targetScrollRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const scoreSavedRef = useRef(false);

  // Orijinal metni temizle
  const cleanTargetText = targetText.replace(/\r\n/g, '\n').replace(/\s+/g, ' ').trim();
  const targetWords = cleanTargetText.split(' ').filter(Boolean);

  const [typedText, setTypedText] = useState('');
  const [startTime, setStartTime] = useState<number | null>(null);
  const [endTime, setEndTime] = useState<number | null>(null);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [totalKeystrokes, setTotalKeystrokes] = useState(0);

  const heatmapStatsRef = useRef<Record<string, { hits: number, misses: number }>>({});
  const [globalHeatmap, setGlobalHeatmap] = useLocalStorage<Record<string, { hits: number, misses: number }>>("klavye_global_heatmap", {});
  const [stats, setStats] = useLocalStorage("klavye_exam_stats", {
    highestWpm: 0,
    testsCompleted: 0
  });
  const [audioEnabled, setAudioEnabled] = useLocalStorage('klavye_audio_pref', false);

  const { playHit, playCompletion } = useAudioFeedback();

  const isComplete = !!endTime;

  // Textarea'ya otomatik odaklanma
  useEffect(() => {
    if (!isComplete) {
      setTimeout(() => textareaRef.current?.focus(), 80);
    }
  }, [isComplete]);

  // Sayaç döngüsü
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (startTime && !endTime) {
      interval = setInterval(() => {
        const elapsed = Math.floor((Date.now() - startTime) / 1000);
        setTimeElapsed(elapsed);

        if (timeLimitSeconds && elapsed >= timeLimitSeconds) {
          setEndTime(Date.now());
          clearInterval(interval);
        }
      }, 100);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [startTime, endTime, timeLimitSeconds]);

  // Kelime karşılaştırması
  const typedWords = typedText.trim().length > 0 ? typedText.trim().split(/\s+/) : [];
  
  let finalCorrectWords = 0;
  let finalIncorrectWords = 0;
  let finalCorrectChars = 0;

  for (let i = 0; i < typedWords.length; i++) {
    if (targetWords[i] !== undefined) {
      if (typedWords[i] === targetWords[i]) {
        finalCorrectWords++;
        finalCorrectChars += targetWords[i].length + 1;
      } else {
        finalIncorrectWords++;
      }
    } else {
      finalIncorrectWords++;
    }
  }

  const remainingSeconds = timeLimitSeconds ? Math.max(0, timeLimitSeconds - timeElapsed) : timeElapsed;

  // Kullanıcı yazdıkça üst kutuyu otomatik orantılı kaydır
  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (isComplete) return;

    if (!startTime) {
      setStartTime(Date.now());
    }

    setTypedText(e.target.value);
    setTotalKeystrokes(prev => prev + 1);

    setTimeout(() => {
      if (textareaRef.current && targetScrollRef.current) {
        const ta = textareaRef.current;
        const targetBox = targetScrollRef.current;
        const progress = ta.value.length / Math.max(1, cleanTargetText.length);
        targetBox.scrollTop = progress * (targetBox.scrollHeight - targetBox.clientHeight * 0.7);
      }
    }, 10);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (isComplete) return;

    if (!startTime) {
      setStartTime(Date.now());
    }

    if (e.key.length === 1 && !e.ctrlKey && !e.altKey && !e.metaKey) {
      const keyChar = e.key.toLocaleUpperCase('tr-TR');
      if (!heatmapStatsRef.current[keyChar]) {
        heatmapStatsRef.current[keyChar] = { hits: 0, misses: 0 };
      }
      heatmapStatsRef.current[keyChar].hits += 1;
      if (audioEnabled) playHit();
    }
  };

  // Sınav bittiğinde skorları kaydet
  useEffect(() => {
    if (isComplete && !scoreSavedRef.current) {
      scoreSavedRef.current = true;
      if (audioEnabled) playCompletion();

      const timeInMins = Math.max(0.1, timeElapsed / 60);
      const wpm = Math.round(finalCorrectWords / timeInMins);
      const accuracy = totalKeystrokes > 0 ? Math.round((finalCorrectChars / Math.max(1, typedText.length)) * 100) : 100;
      const errorRate = typedWords.length > 0 ? Number(((finalIncorrectWords / typedWords.length) * 100).toFixed(2)) : 0;

      setStats((prev: any) => ({
        ...prev,
        highestWpm: Math.max(prev.highestWpm, wpm),
        testsCompleted: prev.testsCompleted + 1
      }));

      incrementGlobalStats().catch(err => console.warn('Could not increment global stats', err));

      fetch('/api/stats', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          lessonId: `exam-${examId}`,
          wpm,
          errors: finalIncorrectWords,
          timeSeconds: timeElapsed,
          accuracy,
          correctWords: finalCorrectWords,
          incorrectWords: finalIncorrectWords,
          errorRate
        })
      }).catch(err => console.warn('Could not post exam stats', err));

      setGlobalHeatmap((prev: any) => {
        const next = { ...prev };
        Object.keys(heatmapStatsRef.current).forEach(char => {
          if (!next[char]) next[char] = { hits: 0, misses: 0 };
          next[char].hits += heatmapStatsRef.current[char].hits;
          next[char].misses += heatmapStatsRef.current[char].misses;
        });
        return next;
      });
    }
  }, [isComplete, timeElapsed, finalCorrectWords, finalIncorrectWords, finalCorrectChars, typedText, typedWords, totalKeystrokes, examId, audioEnabled, playCompletion, setStats, setGlobalHeatmap]);

  const handleRestart = () => {
    scoreSavedRef.current = false;
    setTypedText('');
    setStartTime(null);
    setEndTime(null);
    setTimeElapsed(0);
    setTotalKeystrokes(0);
    heatmapStatsRef.current = {};
    if (onRestart) onRestart();
    setTimeout(() => textareaRef.current?.focus(), 100);
  };

  const timeInMins = Math.max(0.01, (timeElapsed || (timeLimitSeconds || 180)) / 60);
  const calculatedWpm = Math.round(finalCorrectWords / timeInMins);

  return (
    <div
      className="exam-authentic-container"
      ref={containerRef}
      style={{
        width: '100%',
        maxWidth: '1360px',
        margin: '0 auto',
      }}
    >
      {!isComplete && (
        <div style={{
          background: 'var(--bg-secondary)',
          padding: '1.5rem',
          borderRadius: '18px',
          border: '1px solid var(--border-medium)',
          boxShadow: 'var(--shadow-lg)'
        }}>
          
          {/* ÜST BAŞLIK & SÜRE ROZETİ */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <div style={{
              background: 'var(--bg-primary)',
              color: 'var(--text-primary)',
              padding: '0.45rem 1.4rem',
              borderRadius: '8px',
              fontSize: '1.05rem',
              fontWeight: '800',
              letterSpacing: '0.5px',
              border: '1px solid var(--border-medium)',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              boxShadow: 'var(--shadow-sm)'
            }}>
              <span>Süre :</span>
              <span style={{
                color: remainingSeconds <= 30 && startTime ? 'var(--error)' : 'var(--accent-color)',
                fontSize: '1.25rem',
                fontFamily: 'var(--font-mono)'
              }}>
                {remainingSeconds}
              </span>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', color: 'var(--text-secondary)', cursor: 'pointer' }}>
                <input type="checkbox" checked={audioEnabled} onChange={e => setAudioEnabled(e.target.checked)} style={{ cursor: 'pointer' }} />
                🎧 Tuş Sesi
              </label>
            </div>
          </div>

          {/* METİN ALANLARI KAPSAYICISI */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            
            {/* 1. ÜST KUTU: UYGULAMA METNİ (Dikey Etiketli) */}
            <div style={{ display: 'flex', alignItems: 'stretch', width: '100%' }}>
              
              {/* Sol Dikey Kehribar "UYGULAMA METNİ" Rozeti */}
              <div style={{
                background: 'var(--accent-color)',
                color: '#121214',
                fontWeight: '900',
                fontSize: '0.78rem',
                letterSpacing: '1.5px',
                writingMode: 'vertical-rl',
                transform: 'rotate(180deg)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '1rem 0.45rem',
                borderRadius: '6px 0 0 6px',
                userSelect: 'none',
                flexShrink: 0,
                textTransform: 'uppercase',
                boxShadow: 'var(--shadow-sm)'
              }}>
                UYGULAMA METNİ
              </div>

              {/* Orijinal Metin Kutusu */}
              <div
                ref={targetScrollRef}
                style={{
                  flex: 1,
                  height: '250px',
                  overflowY: 'auto',
                  background: 'var(--bg-primary)',
                  border: '1px solid var(--border-medium)',
                  borderRadius: '0 8px 8px 0',
                  padding: '16px 20px',
                  color: 'var(--text-primary)',
                  fontSize: '1.25rem',
                  lineHeight: '1.85',
                  letterSpacing: '0.2px',
                  fontWeight: '500',
                  whiteSpace: 'pre-wrap',
                  userSelect: 'none',
                  textAlign: 'left',
                  fontFamily: 'Inter, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                  WebkitFontSmoothing: 'antialiased',
                }}
              >
                {cleanTargetText}
              </div>
            </div>

            {/* 2. ALT KUTU: YAZI ALANI */}
            <div style={{ width: '100%' }}>
              <textarea
                ref={textareaRef}
                value={typedText}
                onChange={handleTextChange}
                onKeyDown={handleKeyDown}
                placeholder="Yazı alanı"
                autoFocus
                spellCheck={false}
                autoComplete="off"
                autoCorrect="off"
                autoCapitalize="off"
                style={{
                  width: '100%',
                  height: '250px',
                  background: 'var(--bg-primary)',
                  border: '1px solid var(--border-medium)',
                  borderRadius: '8px',
                  padding: '16px 20px',
                  color: 'var(--text-primary)',
                  fontSize: '1.25rem',
                  lineHeight: '1.85',
                  letterSpacing: '0.2px',
                  fontWeight: '500',
                  resize: 'none',
                  outline: 'none',
                  boxSizing: 'border-box',
                  fontFamily: 'Inter, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                  WebkitFontSmoothing: 'antialiased',
                  caretColor: 'var(--accent-color)',
                  transition: 'border-color 0.2s',
                }}
                onFocus={e => { e.currentTarget.style.borderColor = 'var(--accent-color)'; }}
                onBlur={e => { e.currentTarget.style.borderColor = 'var(--border-medium)'; }}
              />
            </div>

          </div>

        </div>
      )}

      {/* SÜRE BİTİNCE: SONUÇ VE DEĞERLENDİRME EKRANI */}
      {isComplete && (
        <div className="glass-panel" style={{ padding: '3rem 2.5rem', background: 'var(--bg-secondary)', border: '1px solid var(--border-medium)', borderRadius: '20px', color: 'var(--text-primary)' }}>
          <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
            <div style={{ fontSize: '3.5rem', marginBottom: '0.5rem' }}>
              {finalCorrectWords >= 90 ? '🏆' : '⏱️'}
            </div>
            <h2 style={{ fontSize: '2.2rem', fontWeight: '900', marginBottom: '0.5rem', color: finalCorrectWords >= 90 ? 'var(--success)' : 'var(--accent-color)' }}>
              Süre Doldu! Sınav Değerlendirmesi
            </h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', margin: 0 }}>
              {finalCorrectWords >= 90
                ? '🎉 TEBRİKLER! 3 dakikada 90 Net Doğru Kelime Barajını başarıyla geçtiniz.'
                : `3 dakikalık 90 Net Kelime barajını geçmek için ${90 - finalCorrectWords} kelimeye daha ihtiyacınız var.`}
            </p>
          </div>

          {/* Sonuç Kartları */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '1.25rem', marginBottom: '2.5rem' }}>
            <div style={resultCardStyle}>
              <div style={resultCardLabel}>NET DOĞRU KELİME</div>
              <div style={{ ...resultCardValue, color: 'var(--success)', fontSize: '2.8rem' }}>{finalCorrectWords}</div>
              <div style={{ fontSize: '0.75rem', color: finalCorrectWords >= 90 ? 'var(--success)' : 'var(--text-muted)', fontWeight: '700', marginTop: '0.25rem' }}>
                {finalCorrectWords >= 90 ? '✓ BARAJI GEÇTİ' : 'Baraj Altı'}
              </div>
            </div>
            <div style={resultCardStyle}>
              <div style={resultCardLabel}>YANLIŞ KELİME</div>
              <div style={{ ...resultCardValue, color: 'var(--error)' }}>{finalIncorrectWords}</div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>Hatalı veya atlanan</div>
            </div>
            <div style={resultCardStyle}>
              <div style={resultCardLabel}>NET HIZ (DBK)</div>
              <div style={{ ...resultCardValue, color: 'var(--accent-color)' }}>{calculatedWpm}</div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>Dakika Başına Kelime</div>
            </div>
            <div style={resultCardStyle}>
              <div style={resultCardLabel}>TOPLAM BASIŞ</div>
              <div style={{ ...resultCardValue, color: 'var(--text-primary)' }}>{typedText.length}</div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>Vurulan Karakter</div>
            </div>
          </div>

          {/* Detaylı Kelime Karşılaştırma Raporu */}
          <div style={{ marginBottom: '2.5rem', padding: '1.5rem', borderRadius: '12px', background: 'var(--bg-glass)', border: '1px solid var(--border-subtle)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <h3 style={{ fontSize: '0.95rem', fontWeight: '800', color: 'var(--text-primary)', textTransform: 'uppercase', letterSpacing: '0.5px', margin: 0 }}>
                🔍 Kelime Bazlı Sınav Kontrolü
              </h3>
              <div style={{ display: 'flex', gap: '1rem', fontSize: '0.82rem' }}>
                <span style={{ color: 'var(--success)', fontWeight: '700' }}>■ Doğru ({finalCorrectWords})</span>
                <span style={{ color: 'var(--error)', fontWeight: '700' }}>■ Yanlış ({finalIncorrectWords})</span>
              </div>
            </div>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.45rem', fontSize: '1rem', lineHeight: '1.8', fontFamily: 'var(--font-mono)' }}>
              {targetWords.slice(0, Math.max(typedWords.length, 15)).map((targetWord, idx) => {
                const typedWord = typedWords[idx];
                const isCorrect = typedWord === targetWord;
                const wasWritten = typedWord !== undefined;

                if (!wasWritten) {
                  return (
                    <span key={idx} style={{ color: 'var(--text-muted)', opacity: 0.4 }}>
                      {targetWord}
                    </span>
                  );
                }

                return (
                  <span
                    key={idx}
                    title={isCorrect ? 'Doğru' : `Yazdığınız: "${typedWord}" / Doğrusu: "${targetWord}"`}
                    style={{
                      padding: '0.1rem 0.45rem',
                      borderRadius: '4px',
                      background: isCorrect ? 'var(--success-bg)' : 'var(--error-bg)',
                      color: isCorrect ? 'var(--success)' : 'var(--error)',
                      border: `1px solid ${isCorrect ? 'rgba(34, 197, 94, 0.3)' : 'rgba(239, 68, 68, 0.3)'}`,
                      textDecoration: isCorrect ? 'none' : 'line-through',
                      fontWeight: '700',
                    }}
                  >
                    {targetWord}
                  </span>
                );
              })}
            </div>
          </div>

          {/* Klavye Isı Haritası */}
          <div style={{ marginBottom: '2.5rem' }}>
            <h3 style={{ fontSize: '1.05rem', fontWeight: '800', color: 'var(--text-primary)', marginBottom: '1rem', textAlign: 'center' }}>
              ⌨️ Klavye Hata Isı Haritası
            </h3>
            <HeatmapKeyboard stats={heatmapStatsRef.current} keyboardType={keyboardType} />
          </div>

          <div style={{ textAlign: 'center' }}>
            <button 
              onClick={handleRestart}
              style={{
                padding: '1rem 3.5rem',
                background: 'var(--accent-color)',
                color: '#121214',
                border: 'none',
                borderRadius: '12px',
                fontSize: '1.15rem',
                cursor: 'pointer',
                fontWeight: '900',
                boxShadow: 'var(--shadow-accent)',
                transition: 'all 0.2s',
              }}
            >
              🔄 Yeni 3 Dakikalık Sınava Başla
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

const resultCardStyle: React.CSSProperties = {
  padding: '1.25rem 1rem',
  borderRadius: '14px',
  background: 'var(--bg-glass)',
  border: '1px solid var(--border-medium)',
  textAlign: 'center',
};

const resultCardLabel: React.CSSProperties = {
  fontSize: '0.72rem',
  color: 'var(--text-muted)',
  fontWeight: '800',
  textTransform: 'uppercase',
  letterSpacing: '1px',
  marginBottom: '0.35rem',
};

const resultCardValue: React.CSSProperties = {
  fontSize: '1.8rem',
  fontWeight: '900',
  lineHeight: 1.1,
};
