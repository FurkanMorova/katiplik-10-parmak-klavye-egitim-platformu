"use client";
import { useCallback, useMemo } from 'react';
import { useLocalStorage } from './useLocalStorage';
import { achievements, type GamificationStats } from '../data/achievements';

// ─── Data Types ───
export interface DailyEntry {
  lessonsCompleted: number;
  wpmSum: number;
  bestWpm: number;
  practiceSeconds: number;
  accuracySum: number;
}

export interface GamificationData {
  lastActivityDate: string;
  currentStreak: number;
  longestStreak: number;
  totalXP: number;
  unlockedAchievements: { id: string; unlockedAt: string }[];
  lessonStars: Record<string, number>;
  dailyChallengeDate: string;
  dailyChallengeCompleted: boolean;
  dailyChallengeProgress: number;
  totalPracticeSeconds: number;
  totalLessonsCompleted: number;
  totalExamsCompleted: number;
  bestWpm: number;
  perfectLessons: number;
  dailyHistory: Record<string, DailyEntry>;
}

const defaultData: GamificationData = {
  lastActivityDate: '',
  currentStreak: 0,
  longestStreak: 0,
  totalXP: 0,
  unlockedAchievements: [],
  lessonStars: {},
  dailyChallengeDate: '',
  dailyChallengeCompleted: false,
  dailyChallengeProgress: 0,
  totalPracticeSeconds: 0,
  totalLessonsCompleted: 0,
  totalExamsCompleted: 0,
  bestWpm: 0,
  perfectLessons: 0,
  dailyHistory: {},
};

// ─── Level System ───
const LEVEL_TITLES: { min: number; max: number; title: string; color: string; emoji: string }[] = [
  { min: 1, max: 5, title: 'Çırak', color: '#22d3a5', emoji: '🟢' },
  { min: 6, max: 10, title: 'Kalfa', color: '#4f8ef7', emoji: '🔵' },
  { min: 11, max: 20, title: 'Usta', color: '#a855f7', emoji: '🟣' },
  { min: 21, max: 30, title: 'Üstat', color: '#eab308', emoji: '⭐' },
  { min: 31, max: 999, title: 'Efsane', color: '#ef4444', emoji: '🔥' },
];

export function getLevelInfo(xp: number) {
  // Each level needs progressively more XP: level N needs N * 120 XP to advance
  let level = 1;
  let totalNeeded = 0;
  while (true) {
    const needed = level * 120;
    if (xp < totalNeeded + needed) {
      const xpInLevel = xp - totalNeeded;
      const xpForNext = needed;
      const progress = Math.min(100, (xpInLevel / xpForNext) * 100);
      const titleInfo = LEVEL_TITLES.find(t => level >= t.min && level <= t.max) || LEVEL_TITLES[0];
      return { level, title: titleInfo.title, color: titleInfo.color, emoji: titleInfo.emoji, xpInLevel, xpForNext, progress };
    }
    totalNeeded += needed;
    level++;
    if (level > 100) break; // safety cap
  }
  const titleInfo = LEVEL_TITLES[LEVEL_TITLES.length - 1];
  return { level: 100, title: titleInfo.title, color: titleInfo.color, emoji: titleInfo.emoji, xpInLevel: 0, xpForNext: 1, progress: 100 };
}

// ─── Daily Challenge System ───
interface DailyChallengeTemplate {
  id: string;
  description: string;
  target: number;
  type: 'lessons' | 'accuracy' | 'wpm' | 'time';
  xpReward: number;
}

const DAILY_CHALLENGES: DailyChallengeTemplate[] = [
  { id: 'complete_2', description: '2 ders tamamla', target: 2, type: 'lessons', xpReward: 75 },
  { id: 'complete_3', description: '3 ders tamamla', target: 3, type: 'lessons', xpReward: 100 },
  { id: 'complete_5', description: '5 ders tamamla', target: 5, type: 'lessons', xpReward: 150 },
  { id: 'accuracy_95', description: '%95+ doğrulukla bir ders bitir', target: 95, type: 'accuracy', xpReward: 75 },
  { id: 'accuracy_98', description: '%98+ doğrulukla bir ders bitir', target: 98, type: 'accuracy', xpReward: 100 },
  { id: 'perfect', description: '%100 doğrulukla bir ders bitir', target: 100, type: 'accuracy', xpReward: 150 },
  { id: 'wpm_20', description: '20+ DBK\'ya ulaş', target: 20, type: 'wpm', xpReward: 50 },
  { id: 'wpm_25', description: '25+ DBK\'ya ulaş', target: 25, type: 'wpm', xpReward: 75 },
  { id: 'wpm_30', description: '30+ DBK\'ya ulaş', target: 30, type: 'wpm', xpReward: 100 },
  { id: 'practice_5', description: '5 dakika pratik yap', target: 300, type: 'time', xpReward: 50 },
  { id: 'practice_10', description: '10 dakika pratik yap', target: 600, type: 'time', xpReward: 75 },
  { id: 'practice_15', description: '15 dakika pratik yap', target: 900, type: 'time', xpReward: 100 },
];

export function getDailyChallenge(dateStr: string): DailyChallengeTemplate {
  let hash = 0;
  for (let i = 0; i < dateStr.length; i++) {
    hash = ((hash << 5) - hash) + dateStr.charCodeAt(i);
    hash |= 0;
  }
  return DAILY_CHALLENGES[Math.abs(hash) % DAILY_CHALLENGES.length];
}

// ─── XP Calculation ───
function calculateXP(wpm: number, accuracy: number, targetWpm: number, isExam: boolean, streakDays: number): number {
  let xp = isExam ? 100 : 50;
  if (wpm >= targetWpm) xp += 25;
  if (accuracy >= 95) xp += 15;
  if (accuracy === 100) xp += 50;
  // Streak bonus: +10 per day, capped at 100
  xp += Math.min(100, streakDays * 10);
  return xp;
}

// ─── Stars Calculation ───
function calculateStars(wpm: number, accuracy: number, targetWpm: number): number {
  if (wpm >= targetWpm && accuracy >= 95) return 3;
  if (wpm >= targetWpm) return 2;
  return 1;
}

// ─── Main Hook ───
export function useGamification() {
  const [data, setData] = useLocalStorage<GamificationData>('klavye_gamification', defaultData);

  const today = new Date().toISOString().slice(0, 10);

  // Effective streak (accounts for day transitions)
  const effectiveStreak = useMemo(() => {
    if (data.lastActivityDate === today) return data.currentStreak;
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    if (data.lastActivityDate === yesterday.toISOString().slice(0, 10)) return data.currentStreak;
    return 0; // streak broken
  }, [data.lastActivityDate, data.currentStreak, today]);

  const levelInfo = useMemo(() => getLevelInfo(data.totalXP), [data.totalXP]);

  const dailyChallenge = useMemo(() => {
    const template = getDailyChallenge(today);
    const isToday = data.dailyChallengeDate === today;
    return {
      ...template,
      completed: isToday ? data.dailyChallengeCompleted : false,
      progress: isToday ? data.dailyChallengeProgress : 0,
    };
  }, [today, data.dailyChallengeDate, data.dailyChallengeCompleted, data.dailyChallengeProgress]);

  // Update streak for today
  const updateStreak = useCallback(() => {
    setData((prev: GamificationData) => {
      if (prev.lastActivityDate === today) return prev;
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      const newStreak = prev.lastActivityDate === yesterday.toISOString().slice(0, 10) ? prev.currentStreak + 1 : 1;
      return {
        ...prev,
        lastActivityDate: today,
        currentStreak: newStreak,
        longestStreak: Math.max(prev.longestStreak, newStreak),
      };
    });
  }, [today, setData]);

  // Complete a lesson — returns gamification results
  const completeLesson = useCallback((
    lessonId: string,
    wpm: number,
    accuracy: number,
    timeSeconds: number,
    targetWpm: number = 15,
    isExam: boolean = false
  ) => {
    // Snapshot current data for calculations
    const prev = { ...data };

    // 1. Streak
    let newStreak = prev.currentStreak;
    if (prev.lastActivityDate !== today) {
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      newStreak = prev.lastActivityDate === yesterday.toISOString().slice(0, 10) ? prev.currentStreak + 1 : 1;
    }

    // 2. Stars
    const stars = calculateStars(wpm, accuracy, targetWpm);
    const prevStars = prev.lessonStars[lessonId] || 0;

    // 3. XP
    const xpEarned = calculateXP(wpm, accuracy, targetWpm, isExam, newStreak);

    // 4. Build updated state
    const updated: GamificationData = {
      ...prev,
      lastActivityDate: today,
      currentStreak: newStreak,
      longestStreak: Math.max(prev.longestStreak, newStreak),
      totalXP: prev.totalXP + xpEarned,
      totalPracticeSeconds: prev.totalPracticeSeconds + timeSeconds,
      totalLessonsCompleted: prev.totalLessonsCompleted + (isExam ? 0 : 1),
      totalExamsCompleted: prev.totalExamsCompleted + (isExam ? 1 : 0),
      bestWpm: Math.max(prev.bestWpm, wpm),
      perfectLessons: prev.perfectLessons + (accuracy === 100 ? 1 : 0),
      lessonStars: {
        ...prev.lessonStars,
        [lessonId]: Math.max(prevStars, stars),
      },
    };

    // 5. Daily history
    const dayEntry = updated.dailyHistory[today] || { lessonsCompleted: 0, wpmSum: 0, bestWpm: 0, practiceSeconds: 0, accuracySum: 0 };
    dayEntry.lessonsCompleted += 1;
    dayEntry.wpmSum += wpm;
    dayEntry.bestWpm = Math.max(dayEntry.bestWpm, wpm);
    dayEntry.practiceSeconds += timeSeconds;
    dayEntry.accuracySum += accuracy;
    updated.dailyHistory = { ...prev.dailyHistory, [today]: dayEntry };

    // 6. Daily challenge progress
    if (updated.dailyChallengeDate !== today) {
      updated.dailyChallengeDate = today;
      updated.dailyChallengeCompleted = false;
      updated.dailyChallengeProgress = 0;
    }
    const challenge = getDailyChallenge(today);
    let challengeJustCompleted = false;
    if (!updated.dailyChallengeCompleted) {
      if (challenge.type === 'lessons') {
        updated.dailyChallengeProgress += 1;
        if (updated.dailyChallengeProgress >= challenge.target) {
          updated.dailyChallengeCompleted = true;
          challengeJustCompleted = true;
        }
      } else if (challenge.type === 'accuracy' && accuracy >= challenge.target) {
        updated.dailyChallengeCompleted = true;
        updated.dailyChallengeProgress = challenge.target;
        challengeJustCompleted = true;
      } else if (challenge.type === 'wpm' && wpm >= challenge.target) {
        updated.dailyChallengeCompleted = true;
        updated.dailyChallengeProgress = challenge.target;
        challengeJustCompleted = true;
      } else if (challenge.type === 'time') {
        updated.dailyChallengeProgress += timeSeconds;
        if (updated.dailyChallengeProgress >= challenge.target) {
          updated.dailyChallengeCompleted = true;
          challengeJustCompleted = true;
        }
      }
    }

    // Daily challenge XP bonus
    let totalXPEarned = xpEarned;
    if (challengeJustCompleted) {
      updated.totalXP += challenge.xpReward;
      totalXPEarned += challenge.xpReward;
    }

    // 7. Check achievements
    const stats: GamificationStats = {
      currentStreak: updated.currentStreak,
      longestStreak: updated.longestStreak,
      totalXP: updated.totalXP,
      bestWpm: updated.bestWpm,
      totalLessonsCompleted: updated.totalLessonsCompleted,
      totalExamsCompleted: updated.totalExamsCompleted,
      perfectLessons: updated.perfectLessons,
      totalPracticeSeconds: updated.totalPracticeSeconds,
      lessonStars: updated.lessonStars,
      sessionWpm: wpm,
      sessionAccuracy: accuracy,
      sessionTime: timeSeconds,
      currentHour: new Date().getHours(),
    };

    const alreadyUnlocked = new Set(prev.unlockedAchievements.map(a => a.id));
    const newlyUnlocked: string[] = [];
    achievements.forEach(a => {
      if (!alreadyUnlocked.has(a.id) && a.check(stats)) {
        newlyUnlocked.push(a.id);
        updated.unlockedAchievements = [
          ...updated.unlockedAchievements,
          { id: a.id, unlockedAt: new Date().toISOString() },
        ];
      }
    });

    // Achievement XP bonus
    const achievementXP = newlyUnlocked.length * 100;
    updated.totalXP += achievementXP;
    totalXPEarned += achievementXP;

    // 8. Level check
    const prevLevel = getLevelInfo(prev.totalXP).level;
    const newLevelInfo = getLevelInfo(updated.totalXP);
    const leveledUp = newLevelInfo.level > prevLevel;

    // Commit
    setData(updated);

    return {
      xpEarned: totalXPEarned,
      stars,
      newlyUnlocked,
      leveledUp,
      newLevel: newLevelInfo,
      challengeJustCompleted,
      challengeXP: challengeJustCompleted ? challenge.xpReward : 0,
    };
  }, [data, today, setData]);

  // Check if a lesson is unlocked
  const isLessonUnlocked = useCallback((lessonId: string, filteredLessons: { id: string }[]) => {
    const index = filteredLessons.findIndex(l => l.id === lessonId);
    if (index < 3) return true;
    const prevLesson = filteredLessons[index - 1];
    return prevLesson ? (data.lessonStars[prevLesson.id] || 0) >= 1 : false;
  }, [data.lessonStars]);

  const getStarsForLesson = useCallback((lessonId: string) => {
    return data.lessonStars[lessonId] || 0;
  }, [data.lessonStars]);

  return {
    data,
    effectiveStreak,
    levelInfo,
    dailyChallenge,
    updateStreak,
    completeLesson,
    isLessonUnlocked,
    getStarsForLesson,
  };
}
