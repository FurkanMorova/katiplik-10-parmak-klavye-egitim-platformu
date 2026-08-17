export interface GamificationStats {
  currentStreak: number;
  longestStreak: number;
  totalXP: number;
  bestWpm: number;
  totalLessonsCompleted: number;
  totalExamsCompleted: number;
  perfectLessons: number;
  totalPracticeSeconds: number;
  lessonStars: Record<string, number>;
  sessionWpm?: number;
  sessionAccuracy?: number;
  sessionTime?: number;
  currentHour?: number;
}

export interface Achievement {
  id: string;
  icon: string;
  name: string;
  description: string;
  category: 'streak' | 'speed' | 'accuracy' | 'completion' | 'special';
  check: (stats: GamificationStats) => boolean;
}

export const achievements: Achievement[] = [
  // === Tamamlama ===
  {
    id: 'first_step',
    icon: '🐣',
    name: 'İlk Adım',
    description: 'İlk dersini tamamla',
    category: 'completion',
    check: (s) => s.totalLessonsCompleted >= 1,
  },
  {
    id: 'dedicated',
    icon: '🎓',
    name: 'Kararlı Öğrenci',
    description: '10 ders tamamla',
    category: 'completion',
    check: (s) => s.totalLessonsCompleted >= 10,
  },
  {
    id: 'veteran',
    icon: '🏅',
    name: 'Deneyimli',
    description: '50 ders tamamla',
    category: 'completion',
    check: (s) => s.totalLessonsCompleted >= 50,
  },
  {
    id: 'legend',
    icon: '👑',
    name: 'Efsane',
    description: '100 ders tamamla',
    category: 'completion',
    check: (s) => s.totalLessonsCompleted >= 100,
  },
  {
    id: 'scholar_f',
    icon: '📚',
    name: 'F Klavye Ustası',
    description: 'Tüm F klavye derslerini tamamla',
    category: 'completion',
    check: (s) => {
      const fLessons = ['f-1','f-2','f-3','f-4','f-5','f-6','f-7','f-8','f-9','f-10','f-11'];
      return fLessons.every(id => (s.lessonStars[id] || 0) >= 1);
    },
  },
  {
    id: 'scholar_q',
    icon: '📚',
    name: 'Q Klavye Ustası',
    description: 'Tüm Q klavye derslerini tamamla',
    category: 'completion',
    check: (s) => {
      const qLessons = ['q-1','q-2','q-3','q-4','q-5','q-6','q-7','q-8','q-9','q-10','q-11'];
      return qLessons.every(id => (s.lessonStars[id] || 0) >= 1);
    },
  },

  // === Seri ===
  {
    id: 'streak_3',
    icon: '🔥',
    name: 'Ateş Serisi',
    description: '3 gün üst üste çalış',
    category: 'streak',
    check: (s) => s.longestStreak >= 3,
  },
  {
    id: 'streak_7',
    icon: '🔥',
    name: 'Haftalık Seri',
    description: '7 gün üst üste çalış',
    category: 'streak',
    check: (s) => s.longestStreak >= 7,
  },
  {
    id: 'streak_14',
    icon: '🔥',
    name: 'İki Haftalık Seri',
    description: '14 gün üst üste çalış',
    category: 'streak',
    check: (s) => s.longestStreak >= 14,
  },
  {
    id: 'streak_30',
    icon: '🔥',
    name: 'Aylık Seri',
    description: '30 gün üst üste çalış',
    category: 'streak',
    check: (s) => s.longestStreak >= 30,
  },

  // === Hız ===
  {
    id: 'speed_25',
    icon: '⚡',
    name: 'Hızlı Parmaklar',
    description: '25+ DBK\'ya ulaş',
    category: 'speed',
    check: (s) => s.bestWpm >= 25,
  },
  {
    id: 'speed_40',
    icon: '⚡',
    name: 'Hız Şeytanı',
    description: '40+ DBK\'ya ulaş',
    category: 'speed',
    check: (s) => s.bestWpm >= 40,
  },
  {
    id: 'speed_50',
    icon: '💎',
    name: 'Elmas Parmaklar',
    description: '50+ DBK\'ya ulaş',
    category: 'speed',
    check: (s) => s.bestWpm >= 50,
  },
  {
    id: 'speed_60',
    icon: '🚀',
    name: 'Roket Hız',
    description: '60+ DBK\'ya ulaş',
    category: 'speed',
    check: (s) => s.bestWpm >= 60,
  },

  // === Doğruluk ===
  {
    id: 'sniper',
    icon: '🎯',
    name: 'Keskin Nişancı',
    description: '%100 doğrulukla bir ders tamamla',
    category: 'accuracy',
    check: (s) => s.perfectLessons >= 1,
  },
  {
    id: 'sniper_5',
    icon: '🎯',
    name: 'Uzman Nişancı',
    description: '5 kez %100 doğrulukla ders tamamla',
    category: 'accuracy',
    check: (s) => s.perfectLessons >= 5,
  },
  {
    id: 'sniper_10',
    icon: '🎯',
    name: 'Efsane Nişancı',
    description: '10 kez %100 doğrulukla ders tamamla',
    category: 'accuracy',
    check: (s) => s.perfectLessons >= 10,
  },

  // === Özel ===
  {
    id: 'exam_pass',
    icon: '⚖️',
    name: 'Katip Adayı',
    description: 'Bir sınav tamamla',
    category: 'special',
    check: (s) => s.totalExamsCompleted >= 1,
  },
  {
    id: 'night_owl',
    icon: '🌙',
    name: 'Gece Kuşu',
    description: 'Gece 00:00-05:00 arası çalış',
    category: 'special',
    check: (s) => {
      const h = s.currentHour ?? 12;
      return h >= 0 && h < 5;
    },
  },
  {
    id: 'marathon',
    icon: '🏋️',
    name: 'Maratoncu',
    description: 'Tek seansta 30+ dakika çalış',
    category: 'special',
    check: (s) => (s.sessionTime || 0) >= 1800,
  },
  {
    id: 'xp_1000',
    icon: '💫',
    name: 'XP Avcısı',
    description: '1000 XP topla',
    category: 'special',
    check: (s) => s.totalXP >= 1000,
  },
  {
    id: 'xp_5000',
    icon: '🌟',
    name: 'XP Ustası',
    description: '5000 XP topla',
    category: 'special',
    check: (s) => s.totalXP >= 5000,
  },
];
