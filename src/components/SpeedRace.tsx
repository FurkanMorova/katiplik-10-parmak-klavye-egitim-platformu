"use client";

import { useState, useEffect, useRef, useCallback } from 'react';
import StatsHeader from './StatsHeader';
import { generateRandomText } from '../utils/generateRandomText';
import { useLocalStorage } from '../utils/useLocalStorage';
import { useAudioFeedback } from '../utils/useAudioFeedback';

interface SpeedRaceProps {
  keyboardType: 'F' | 'Q';
  onBack: () => void;
}

const ALL_CHARS_F = ['u','i','e','a','ü','t','k','m','l','y','ş','f','g','ğ','ı','o','d','r','n','h','p','j','ö','v','c','ç','z','s','b'];
const ALL_CHARS_Q = ['a','s','d','f','g','h','j','k','l','ş','i','q','w','e','r','t','y','u','ı','o','p','ğ','ü','z','x','c','v','b','n','m','ö','ç'];

interface CompletedWord {
  target: string;
  typed: string;
  isCorrect: boolean;
}

export default function SpeedRace({ keyboardType, onBack }: SpeedRaceProps) {
  const [phase, setPhase] = useState<'countdown' | 'racing' | 'results'>('countdown');
  const [countdown, setCountdown] = useState(3);
  const [words, setWords] = useState<string[]>([]);
  const [currentWordIdx, setCurrentWordIdx] = useState(0);
  const [currentInput, setCurrentInput] = useState('');
  const [completedWords, setCompletedWords] = useState<CompletedWord[]>([]);
  const [correctWordsCount, setCorrectWordsCount] = useState(0);
  const [incorrectWordsCount, setIncorrectWordsCount] = useState(0);
  const [totalKeystrokes, setTotalKeystrokes] = useState(0);
  const [charErrors, setCharErrors] = useState(0);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [translateY, setTranslateY] = useState(0);

  const [bestRecord, setBestRecord] = useLocalStorage<number>('klavye_speedrace_best', 0);
  const [audioEnabled] = useLocalStorage('klavye_audio_pref', true);
  const { playHit, playError, playCompletion } = useAudioFeedback();

  const textScrollRef = useRef<HTMLDivElement>(null);
  const activeWordRef = useRef<HTMLSpanElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const startTimeRef = useRef<number | null>(null);

  const chars = keyboardType === 'F' ? ALL_CHARS_F : ALL_CHARS_Q;

  // Yeni kelimeler üret
  const generateWords = useCallback(() => {
    const raw = generateRandomText(chars, 120, 5);
    const w = raw.split(' ').filter(Boolean);
    setWords(w);
  }, [chars]);

  useEffect(() => {
    generateWords();
  }, [generateWords]);

  // Geri sayım
  useEffect(() => {
    if (phase !== 'countdown') return;
    if (countdown <= 0) {
      setPhase('racing');
      startTimeRef.current = Date.now();
      setTimeout(() => inputRef.current?.focus(), 80);
      return;
    }
    const timer = setTimeout(() => setCountdown(prev => prev - 1), 1000);
    return () => clearTimeout(timer);
  }, [phase, countdown]);

  // 60 Saniyelik Yarış Zamanlayıcısı
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (phase === 'racing') {
      interval = setInterval(() => {
        if (!startTimeRef.current) return;
        const elapsed = Math.floor((Date.now() - startTimeRef.current) / 1000);
        setTimeElapsed(elapsed);

        if (elapsed >= 60) {
          setPhase('results');
          if (audioEnabled) playCompletion();
          clearInterval(interval);
        }
      }, 100);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [phase, audioEnabled, playCompletion]);

  // Auto-scroll: Aktif kelimeye göre metni kaydır
  useEffect(() => {
    if (!textScrollRef.current || !activeWordRef.current) return;
    const wordEl = activeWordRef.current;
    const wordTop = wordEl.offsetTop;
    if (wordTop > 70) {
      setTranslateY(wordTop - 70);
    } else {
      setTranslateY(0);
    }
  }, [currentWordIdx]);

  // Tuş kontrolü (Boşluk ile kelime onaylama & hızlı akış)
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (phase !== 'racing') return;

    // BOŞLUK TUŞU (Kelimeyi Tamamla ve İlerle)
    if (e.key === ' ' || e.code === 'Space') {
      e.preventDefault();
      const targetWord = words[currentWordIdx];
      const typed = currentInput.trim();

      if (typed.length === 0) return;

      const isCorrect = typed === targetWord;

      if (isCorrect) {
        setCorrectWordsCount(prev => prev + 1);
        if (audioEnabled) playHit();
      } else {
        setIncorrectWordsCount(prev => prev + 1);
        setCharErrors(prev => prev + 1);
        if (audioEnabled) playError();
      }

      setCompletedWords(prev => [...prev, { target: targetWord, typed, isCorrect }]);
      setTotalKeystrokes(prev => prev + 1);
      setCurrentInput('');

      if (currentWordIdx + 1 >= words.length) {
        setPhase('results');
        if (audioEnabled) playCompletion();
      } else {
        setCurrentWordIdx(prev => prev + 1);
      }
      return;
    }

    if (e.key === 'Backspace') {
      setTotalKeystrokes(prev => prev + 1);
      return;
    }

    if (e.key.length === 1 && !e.ctrlKey && !e.altKey && !e.metaKey) {
      setTotalKeystrokes(prev => prev + 1);
      const targetWord = words[currentWordIdx] || '';
      const charIndex = currentInput.length;
      const expectedChar = targetWord[charIndex];

      if (expectedChar) {
        if (e.key === expectedChar) {
          if (audioEnabled) playHit();
        } else {
          setCharErrors(prev => prev + 1);
          if (audioEnabled) playError();
        }
      }
    }
  };

  const timeInMins = Math.max(0.01, (timeElapsed || 1) / 60);
  const finalWpm = Math.round(correctWordsCount / (phase === 'results' ? 1 : timeInMins));
  const accuracy = totalKeystrokes > 0 ? Math.max(0, Math.round(((totalKeystrokes - charErrors) / totalKeystrokes) * 100)) : 100;
  const isNewRecord = phase === 'results' && finalWpm > bestRecord;

  // Yeni rekoru kaydet
  useEffect(() => {
    if (phase === 'results' && finalWpm > bestRecord) {
      setBestRecord(finalWpm);
    }
  }, [phase, finalWpm, bestRecord, setBestRecord]);

  const handleRestart = () => {
    generateWords();
    setCurrentWordIdx(0);
    setCurrentInput('');
    setCompletedWords([]);
    setCorrectWordsCount(0);
    setIncorrectWordsCount(0);
    setTotalKeystrokes(0);
    setCharErrors(0);
    setTimeElapsed(0);
    setTranslateY(0);
    setCountdown(3);
    startTimeRef.current = null;
    setPhase('countdown');
  };

  return (
    <div className="animate-fade-in" style={{ maxWidth: '900px', margin: '0 auto' }}>
      
      {/* Geri Dön Butonu */}
      <button
        onClick={onBack}
        style={{
          background: 'transparent',
          color: 'var(--text-secondary)',
          border: '1px solid var(--border-medium)',
          padding: '0.5rem 1.25rem',
          borderRadius: '8px',
          cursor: 'pointer',
          marginBottom: '2rem',
          fontSize: '0.95rem',
          transition: 'all 0.2s',
        }}
      >
        ← Ana Sayfaya Dön
      </button>

      {/* 1. GERİ SAYIM AŞAMASI */}
      {phase === 'countdown' && (
        <div style={{ textAlign: 'center', padding: '6rem 0' }}>
          <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '3px', marginBottom: '1rem' }}>
            ⚡ 60 Saniyelik Hız Testi
          </div>
          <div style={{
            fontSize: '8rem',
            fontWeight: '900',
            color: countdown > 0 ? 'var(--accent-color)' : 'var(--success)',
            lineHeight: 1,
            animation: 'countdownPulse 1s ease-in-out infinite',
            textShadow: '0 0 40px var(--accent-glow)',
          }}>
            {countdown > 0 ? countdown : 'BAŞLA!'}
          </div>
          <p style={{ color: 'var(--text-secondary)', marginTop: '2rem', fontSize: '1.1rem' }}>
            Kelimeleri yazın ve <strong>BOŞLUK</strong> tuşuna basarak hız rekorunuzu kırın!
          </p>
        </div>
      )}

      {/* 2. YARIŞ AŞAMASI */}
      {phase === 'racing' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          
          {/* Süre Sayacı & Üst Bar */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '1rem 1.5rem',
            borderRadius: '14px',
            background: 'var(--bg-secondary)',
            border: '1px solid var(--border-medium)',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span style={{ fontSize: '1.4rem' }}>⏱️</span>
              <span style={{ fontSize: '1.6rem', fontWeight: '900', color: 60 - timeElapsed <= 10 ? 'var(--error)' : 'var(--accent-color)' }}>
                {Math.max(0, 60 - timeElapsed)}s
              </span>
              <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>kaldı</span>
            </div>

            <div style={{ display: 'flex', gap: '2rem', textAlign: 'center' }}>
              <div>
                <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>HIZ</div>
                <div style={{ fontSize: '1.3rem', fontWeight: '800', color: 'var(--accent-color)' }}>{finalWpm} DBK</div>
              </div>
              <div>
                <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>DOĞRU</div>
                <div style={{ fontSize: '1.3rem', fontWeight: '800', color: 'var(--success)' }}>{correctWordsCount}</div>
              </div>
              <div>
                <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>HATA</div>
                <div style={{ fontSize: '1.3rem', fontWeight: '800', color: 'var(--error)' }}>{charErrors}</div>
              </div>
            </div>
          </div>

          {/* Kayan Kelime Kutusu */}
          <div
            ref={textScrollRef}
            onClick={() => inputRef.current?.focus()}
            style={{
              position: 'relative',
              height: '180px',
              overflow: 'hidden',
              borderRadius: '16px',
              background: 'var(--bg-secondary)',
              border: '2px solid var(--border-medium)',
              padding: '1.5rem',
              cursor: 'text',
              userSelect: 'none',
            }}
          >
            <div
              style={{
                transform: `translateY(-${translateY}px)`,
                transition: 'transform 0.22s cubic-bezier(0.2, 0, 0.2, 1)',
                display: 'flex',
                flexWrap: 'wrap',
                gap: '0.65rem 0.5rem',
                fontFamily: 'var(--font-mono), monospace',
                fontSize: '1.45rem',
                lineHeight: '1.7',
              }}
            >
              {words.map((word, idx) => {
                const isCurrent = idx === currentWordIdx;
                const completed = completedWords[idx];

                let bg = 'transparent';
                let color = 'var(--text-secondary)';
                let textDecoration = 'none';

                if (completed) {
                  color = completed.isCorrect ? 'var(--success)' : 'var(--error)';
                  bg = completed.isCorrect ? 'var(--success-bg)' : 'var(--error-bg)';
                  textDecoration = completed.isCorrect ? 'none' : 'line-through';
                } else if (isCurrent) {
                  color = '#121214';
                  bg = 'var(--accent-color)';
                }

                return (
                  <span
                    key={idx}
                    ref={isCurrent ? activeWordRef : undefined}
                    style={{
                      padding: '0.15rem 0.55rem',
                      borderRadius: '6px',
                      background: bg,
                      color,
                      textDecoration,
                      fontWeight: isCurrent ? '800' : '600',
                      transition: 'background-color 0.15s, color 0.15s',
                      boxShadow: isCurrent ? 'var(--shadow-accent)' : 'none',
                    }}
                  >
                    {word}
                  </span>
                );
              })}
            </div>
          </div>

          {/* Hızlı Yazı Giriş Kutusu */}
          <div style={{
            padding: '1.25rem 1.5rem',
            borderRadius: '16px',
            background: 'var(--bg-secondary)',
            border: '2px solid var(--accent-color)',
            boxShadow: '0 0 25px rgba(245, 158, 11, 0.15)',
          }}>
            <input
              ref={inputRef}
              type="text"
              value={currentInput}
              onChange={e => setCurrentInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Yazın ve BOŞLUK (Space) tuşuna basın..."
              autoComplete="off"
              autoCorrect="off"
              autoCapitalize="off"
              spellCheck="false"
              autoFocus
              style={{
                width: '100%',
                padding: '0.85rem 1rem',
                borderRadius: '10px',
                border: '1px solid var(--border-medium)',
                background: 'var(--bg-glass)',
                color: 'var(--text-primary)',
                fontSize: '1.35rem',
                fontWeight: '700',
                fontFamily: 'var(--font-mono), monospace',
                outline: 'none',
                boxSizing: 'border-box',
              }}
            />
          </div>

        </div>
      )}

      {/* 3. SONUÇ EKRANI */}
      {phase === 'results' && (
        <div className="glass-panel" style={{ padding: '3rem', textAlign: 'center', background: 'var(--bg-secondary)', border: '1px solid var(--border-medium)', borderRadius: '20px' }}>
          {isNewRecord && (
            <div style={{
              fontSize: '1.5rem',
              fontWeight: '800',
              color: 'var(--accent-color)',
              marginBottom: '1.5rem',
              animation: 'xpPop 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)',
            }}>
              🎉 TEBRİKLER! YENİ HIZ REKORU! 🎉
            </div>
          )}

          <div style={{ fontSize: '4.5rem', fontWeight: '900', color: 'var(--accent-color)', lineHeight: 1, marginBottom: '0.5rem' }}>
            {finalWpm}
          </div>
          <div style={{ fontSize: '1rem', color: 'var(--text-muted)', marginBottom: '2.5rem', textTransform: 'uppercase', letterSpacing: '2px' }}>
            Dakika Başına Kelime (DBK)
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem', marginBottom: '2.5rem', maxWidth: '480px', margin: '0 auto 2.5rem' }}>
            <div style={{ padding: '1rem', background: 'var(--bg-glass)', borderRadius: '12px', border: '1px solid var(--border-subtle)' }}>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Doğru Kelime</div>
              <div style={{ fontSize: '1.6rem', fontWeight: '800', color: 'var(--success)' }}>{correctWordsCount}</div>
            </div>
            <div style={{ padding: '1rem', background: 'var(--bg-glass)', borderRadius: '12px', border: '1px solid var(--border-subtle)' }}>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Hatalı Basış</div>
              <div style={{ fontSize: '1.6rem', fontWeight: '800', color: 'var(--error)' }}>{charErrors}</div>
            </div>
            <div style={{ padding: '1rem', background: 'var(--bg-glass)', borderRadius: '12px', border: '1px solid var(--border-subtle)' }}>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>En İyi Rekor</div>
              <div style={{ fontSize: '1.6rem', fontWeight: '800', color: 'var(--accent-color)' }}>{Math.max(bestRecord, finalWpm)} DBK</div>
            </div>
          </div>

          <button
            onClick={handleRestart}
            style={{
              padding: '0.95rem 2.5rem',
              background: 'var(--accent-color)',
              color: '#121214',
              border: 'none',
              borderRadius: '12px',
              fontSize: '1.1rem',
              fontWeight: '800',
              cursor: 'pointer',
              boxShadow: 'var(--shadow-accent)',
              transition: 'all 0.2s',
            }}
          >
            ⚡ Tekrar Yarış (60s)
          </button>
        </div>
      )}

    </div>
  );
}
