"use client";
import { useMemo } from 'react';
import type { DailyEntry } from '../utils/useGamification';

interface MotivationToastProps {
  wpm: number;
  accuracy: number;
  xpEarned: number;
  stars: number;
  dailyHistory: Record<string, DailyEntry>;
  totalLessonsCompleted: number;
}

const MOTIVATIONS = [
  'Harika gidiyorsun! Parmaklarin hızlanıyor! 💪',
  'Her pratik seni bir adım öne taşıyor! 🚀',
  'Kas hafızan gelişiyor, devam et! 🧠',
  'Mükemmel çalışma! Hedefine yaklaşıyorsun! 🎯',
  'Azim ve sabırla her şey mümkün! ✨',
  'Bugün dünden daha iyisin! 📈',
  'Bu tempoya devam edersen çok hızlı olacaksın! ⚡',
  'Parmaklarının dansı muhteşem! 🎵',
  'Klavye artık senin için sorun olmayacak! 🏆',
  'Her yanlıştan bir ders çıkardın, bravo! 🌟',
];

export default function MotivationToast({ wpm, accuracy, xpEarned, stars, dailyHistory, totalLessonsCompleted }: MotivationToastProps) {
  const insight = useMemo(() => {
    const today = new Date().toISOString().slice(0, 10);
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayStr = yesterday.toISOString().slice(0, 10);

    const todayData = dailyHistory[today];
    const yesterdayData = dailyHistory[yesterdayStr];

    // Compare with yesterday
    if (yesterdayData && todayData && todayData.lessonsCompleted > 1) {
      const todayAvg = Math.round(todayData.wpmSum / todayData.lessonsCompleted);
      const yesterdayAvg = Math.round(yesterdayData.wpmSum / yesterdayData.lessonsCompleted);
      const diff = todayAvg - yesterdayAvg;
      if (diff > 0) {
        return `📈 Bugünkü ortalamanız düne göre ${diff} DBK daha hızlı!`;
      }
    }

    // Total practice time
    if (todayData && todayData.practiceSeconds > 300) {
      const mins = Math.floor(todayData.practiceSeconds / 60);
      return `⏱️ Bugün ${mins} dakika pratik yaptınız. Harika tempo!`;
    }

    // Milestone messages
    if (totalLessonsCompleted === 1) return '🎉 İlk dersini tamamladın! Yolculuk başlıyor!';
    if (totalLessonsCompleted === 10) return '🔟 10 ders tamamlandı! Artık ısındın!';
    if (totalLessonsCompleted === 25) return '🏅 25 ders! Sen bir on parmak savaşçısısın!';
    if (totalLessonsCompleted === 50) return '🏆 50 ders! Efsane seviyeye ulaşıyorsun!';

    return null;
  }, [dailyHistory, totalLessonsCompleted]);

  // Random motivation
  const randomMotivation = useMemo(() => {
    return MOTIVATIONS[Math.floor(Math.random() * MOTIVATIONS.length)];
  }, []);

  return (
    <div style={{
      marginTop: '1.5rem',
      padding: '1.25rem 1.5rem',
      borderRadius: '12px',
      background: 'linear-gradient(135deg, rgba(79, 142, 247, 0.06), rgba(124, 85, 247, 0.04))',
      border: '1px solid rgba(79, 142, 247, 0.15)',
    }}>
      {/* XP & Stars row */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem', marginBottom: '1rem' }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '1.5rem', fontWeight: '800', color: '#eab308', animation: 'xpPop 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)' }}>
            +{xpEarned} XP
          </div>
        </div>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '1.5rem', letterSpacing: '2px' }}>
            {Array.from({ length: 3 }, (_, i) => (
              <span key={i} style={{
                opacity: i < stars ? 1 : 0.2,
                filter: i < stars ? 'none' : 'grayscale(1)',
                animation: i < stars ? `starPop 0.4s ${i * 0.15}s cubic-bezier(0.34, 1.56, 0.64, 1) both` : undefined,
              }}>
                ⭐
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Motivation */}
      <p style={{
        textAlign: 'center',
        color: 'var(--text-secondary)',
        fontSize: '0.92rem',
        margin: 0,
        lineHeight: '1.6',
      }}>
        {insight || randomMotivation}
      </p>
    </div>
  );
}
