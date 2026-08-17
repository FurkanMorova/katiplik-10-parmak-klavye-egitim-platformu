"use client";

interface StreakBannerProps {
  streak: number;
  longestStreak: number;
}

export default function StreakBanner({ streak, longestStreak }: StreakBannerProps) {
  const getMessage = () => {
    if (streak === 0) return 'Bugün ilk dersini çöz ve seriye başla!';
    if (streak < 3) return 'Harika başladın! Devam et!';
    if (streak < 7) return 'Seriye devam! Harika gidiyorsun!';
    if (streak < 14) return 'Müthiş bir seri! Bırakma!';
    if (streak < 30) return 'İnanılmaz disiplin! Seni durduramaz!';
    return 'Efsanevi seri! Sen bir makinasın!';
  };

  const isMilestone = [7, 14, 30, 60, 100].includes(streak);

  return (
    <div style={{
      marginBottom: '2rem',
      padding: '1rem 1.75rem',
      borderRadius: '14px',
      background: streak > 0
        ? 'linear-gradient(135deg, rgba(234, 88, 12, 0.08), rgba(234, 179, 8, 0.06))'
        : 'var(--bg-glass)',
      border: `1px solid ${streak > 0 ? 'rgba(234, 179, 8, 0.2)' : 'var(--border-subtle)'}`,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: '1rem',
      animation: isMilestone ? 'streakGlow 2s ease-in-out infinite' : undefined,
    }}>
      {/* Left: Streak info */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <div style={{
          fontSize: streak > 0 ? '2rem' : '1.5rem',
          animation: streak > 0 ? 'fireFlicker 1.5s ease-in-out infinite' : undefined,
        }}>
          {streak > 0 ? '🔥' : '❄️'}
        </div>
        <div>
          <div style={{
            fontSize: '1.35rem',
            fontWeight: '800',
            color: streak > 0 ? '#f97316' : 'var(--text-muted)',
            lineHeight: 1,
            letterSpacing: '-0.5px',
          }}>
            {streak > 0 ? `${streak} Gün` : 'Seri Yok'}
          </div>
          <div style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', marginTop: '0.2rem' }}>
            {getMessage()}
          </div>
        </div>
      </div>

      {/* Right: Longest streak */}
      {longestStreak > 0 && (
        <div style={{
          textAlign: 'center',
          padding: '0.5rem 1rem',
          borderRadius: '10px',
          background: 'rgba(234, 179, 8, 0.06)',
          border: '1px solid rgba(234, 179, 8, 0.12)',
        }}>
          <div style={{ fontSize: '0.65rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1px' }}>
            En Uzun
          </div>
          <div style={{ fontSize: '1.1rem', fontWeight: '800', color: '#eab308' }}>
            {longestStreak} 🔥
          </div>
        </div>
      )}
    </div>
  );
}
