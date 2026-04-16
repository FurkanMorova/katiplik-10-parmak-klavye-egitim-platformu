import { useState, useEffect, useCallback } from 'react';

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
}

export const useTypingEngine = (targetText: string, timeLimitSeconds: number | null = null) => {
  const [typedText, setTypedText] = useState("");
  const [startTime, setStartTime] = useState<number | null>(null);
  const [endTime, setEndTime] = useState<number | null>(null);
  const [errors, setErrors] = useState(0);
  const [backspaceCount, setBackspaceCount] = useState(0);
  const [totalKeystrokes, setTotalKeystrokes] = useState(0);
  
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    // Sayfa kaymasını engelle
    if (e.key === ' ') {
      // Eğer input/textarea içindeysek space'in normal işlevine (karakter ekleme) izin ver ama sayfanın aşağı kaymasını (varsayılan) engelle
      e.preventDefault();
    }

    if (e.key === 'Backspace') {
      setBackspaceCount(prev => prev + 1);
      setTotalKeystrokes(prev => prev + 1);
      setTypedText(prev => prev.slice(0, -1));
      return;
    }
    
    // Accept only single character visual keys
    if (e.key.length === 1 && !e.ctrlKey && !e.altKey && !e.metaKey) {
      if (!startTime) {
        setStartTime(Date.now());
      }
      
      const expectedChar = targetText[typedText.length];
      if (e.key !== expectedChar) {
        setErrors(prev => prev + 1);
      }
      
      setTotalKeystrokes(prev => prev + 1);
      setTypedText(prev => prev + e.key);
      
      // Check for completion if typing based on string length (no time limit or normal mode)
      if (!timeLimitSeconds && typedText.length + 1 >= targetText.length) {
        setEndTime(Date.now());
      }
    }
  }, [typedText.length, targetText, startTime, timeLimitSeconds]);

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
  
  // WPM Formula: (Correct Characters / 5) / Time Elapsed in Minutes
  // We count only characters typed up to the currently typed length
  let correctChars = 0;
  for (let i = 0; i < typedText.length; i++) {
    if (typedText[i] === targetText[i]) {
      correctChars++;
    }
  }

  const wpm = timeElapsedInMinutes > 0 
    ? Math.round((correctChars / 5) / timeElapsedInMinutes) 
    : 0;

  const totalTyped = typedText.length;
  const accuracy = totalTyped > 0 
    ? Math.round((correctChars / totalTyped) * 100) 
    : 100;

  // Time elapsed in seconds
  const timeElapsedSeconds = startTime ? Math.floor(((endTime || Date.now()) - startTime) / 1000) : 0;

  const reset = useCallback(() => {
    setTypedText("");
    setStartTime(null);
    setEndTime(null);
    setErrors(0);
    setBackspaceCount(0);
    setTotalKeystrokes(0);
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
      isActive: !!startTime && !endTime
    },
    handleKeyDown,
    reset
  };
};
