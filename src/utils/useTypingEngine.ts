import { useState, useEffect, useCallback, useRef } from 'react';

export interface TypingEngineState {
  typedText: string;
  wpm: number;
  accuracy: number;
  errors: number;
  backspaceCount: number;
  totalKeystrokes: number;
  timeElapsed: number; // in seconds
  isComplete: boolean;
  isActive: boolean;
  correctWords: number;
  incorrectWords: number;
  errorRate: number;
  heatmapStats: Record<string, { hits: number, misses: number }>;
}

export interface EngineOptions {
  timeLimitSeconds?: number | null;
  onKeyHit?: () => void;
  onKeyError?: () => void;
  blockOnError?: boolean;
}

export const useTypingEngine = (targetText: string, options: EngineOptions = {}) => {
  const { timeLimitSeconds = null, onKeyHit, onKeyError, blockOnError = false } = options;
  const [typedText, setTypedText] = useState("");
  const [startTime, setStartTime] = useState<number | null>(null);
  const [endTime, setEndTime] = useState<number | null>(null);
  const [errors, setErrors] = useState(0);
  const [backspaceCount, setBackspaceCount] = useState(0);
  const [totalKeystrokes, setTotalKeystrokes] = useState(0);
  const heatmapStatsRef = useRef<Record<string, {hits: number, misses: number}>>({});
  const typedTextRef = useRef("");
  const startTimeRef = useRef<number | null>(null);
  const endTimeRef = useRef<number | null>(null);
  const optionsRef = useRef(options);

  useEffect(() => {
    optionsRef.current = options;
  }, [options]);
  
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    // Sayfa kaymasını engelle - her zaman
    if (e.key === ' ' || e.key === 'ArrowDown' || e.key === 'ArrowUp') {
      e.preventDefault();
    }

    // Tamamlandıysa hiçbir tuşu kabul etme
    if (endTimeRef.current) return;

    if (e.key === 'Backspace') {
      if (optionsRef.current.blockOnError) return; // Ders modunda backspace yok
      setBackspaceCount(prev => prev + 1);
      setTotalKeystrokes(prev => prev + 1);
      setTypedText(prev => prev.slice(0, -1));
      typedTextRef.current = typedTextRef.current.slice(0, -1);
      return;
    }
    
    // Accept only single character visual keys
    if (e.key.length === 1 && !e.ctrlKey && !e.altKey && !e.metaKey) {
      if (!startTimeRef.current) {
        const now = Date.now();
        startTimeRef.current = now;
        setStartTime(now);
      }
      
      // Basit karakter-indeks karşılaştırması
      const currentIndex = typedTextRef.current.length;
      
      // Metin sonuna ulaşıldıysa daha fazla karakter kabul etme
      if (currentIndex >= targetText.length) return;
      
      const expectedChar = targetText[currentIndex];
      
      // Heatmap istatistikleri (boşluk hariç)
      if (expectedChar !== ' ') {
         const keyChar = expectedChar.toLocaleUpperCase('tr-TR');
         if (!heatmapStatsRef.current[keyChar]) {
            heatmapStatsRef.current[keyChar] = { hits: 0, misses: 0 };
         }
         
         if (e.key === expectedChar) {
            heatmapStatsRef.current[keyChar].hits += 1;
         } else {
            heatmapStatsRef.current[keyChar].misses += 1;
         }
      }

      if (e.key !== expectedChar) {
        setErrors(prev => prev + 1);
        optionsRef.current.onKeyError?.();
        setTotalKeystrokes(prev => prev + 1);
        if (optionsRef.current.blockOnError) {
          return; // Ders modunda yanlışta ilerleme
        }
      } else {
        optionsRef.current.onKeyHit?.();
        setTotalKeystrokes(prev => prev + 1);
      }
      
      setTypedText(prev => prev + e.key);
      typedTextRef.current = typedTextRef.current + e.key;
      
      // Check for completion if typing based on string length (no time limit or normal mode)
      if (!optionsRef.current.timeLimitSeconds && typedTextRef.current.length >= targetText.length) {
        const now = Date.now();
        endTimeRef.current = now;
        setEndTime(now);
      }
    }
  }, [targetText]);

  // Real-time ticker to force re-renders for the timer
  const [tick, setTick] = useState(0);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (startTime && !endTime) {
      interval = setInterval(() => {
        setTick(prev => prev + 1);
      }, 100); // Update every 100ms for smooth experience
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [startTime, endTime]);

  // Handle time limit if present
  useEffect(() => {
    if (timeLimitSeconds && startTime && !endTime) {
      const interval = setInterval(() => {
        const elapsed = (Date.now() - startTime) / 1000;
        if (elapsed >= timeLimitSeconds) {
          setEndTime(Date.now());
          clearInterval(interval);
        }
      }, 100);
      return () => clearInterval(interval);
    }
  }, [startTime, endTime, timeLimitSeconds]);

  // Calculations
  const timeElapsedInMinutes = startTime 
    ? ((endTime || Date.now()) - startTime) / 60000 
    : 0;
  
  let correctWords = 0;
  let incorrectWords = 0;
  let errorRate = 0;
  let correctChars = 0;
  
  if (typedText.length > 0) {
    const targetWords = targetText.split(' ');
    const typedWords = typedText.split(' ');

    for (let i = 0; i < typedWords.length; i++) {
      if (targetWords[i] === undefined) {
         incorrectWords++;
         continue;
      }
      
      // Değerlendirme: Sadece tamamlanmış kelimeler (boşluk bırakılmış) veya sınav bittiyse son kelime
      if (i < typedWords.length - 1 || endTime) {
        if (typedWords[i] === targetWords[i]) {
          correctWords++;
          correctChars += targetWords[i].length;
          // Eğer cümlenin son kelimesi değilse boşluk için +1 ekle
          if (i < targetWords.length - 1) {
             correctChars += 1;
          }
        } else {
          incorrectWords++;
        }
      } else {
        // Şu an yazılan kelime için correctChars hesaplaması (hataya kadar)
        const currentTyped = typedWords[i];
        const currentTarget = targetWords[i];
        for (let j = 0; j < currentTyped.length; j++) {
           if (currentTyped[j] === currentTarget[j]) {
              correctChars++;
           } else {
              break; // ilk hatada saymayı bırak
           }
        }
      }
    }
  }

  if (targetText.length > 0) {
    errorRate = Number(((errors / targetText.length) * 100).toFixed(2));
  }

  const wpm = timeElapsedInMinutes > 0 
    ? Math.round((correctChars / 5) / timeElapsedInMinutes) 
    : 0;

  const accuracy = totalKeystrokes > 0 
    ? Math.round(((totalKeystrokes - errors) / totalKeystrokes) * 100) 
    : 100;

  // Time elapsed in seconds
  const timeElapsedSeconds = startTime ? Math.floor(((endTime || Date.now()) - startTime) / 1000) : 0;

  const reset = useCallback(() => {
    setTypedText("");
    typedTextRef.current = "";
    setStartTime(null);
    startTimeRef.current = null;
    setEndTime(null);
    endTimeRef.current = null;
    setErrors(0);
    setBackspaceCount(0);
    setTotalKeystrokes(0);
    heatmapStatsRef.current = {};
  }, []);

  return {
    state: {
      typedText,
      wpm,
      accuracy,
      errors,
      backspaceCount,
      totalKeystrokes,
      timeElapsed: timeElapsedSeconds,
      isComplete: !!endTime,
      isActive: !!startTime && !endTime,
      correctWords,
      incorrectWords,
      errorRate,
      heatmapStats: { ...heatmapStatsRef.current }
    },
    handleKeyDown,
    reset
  };
};
