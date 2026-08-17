"use client";

interface DailyChallengeProps {
  description: string;
  target: number;
  type: 'lessons' | 'accuracy' | 'wpm' | 'time';
  completed: boolean;
  progress: number;
  xpReward: number;
}

export default function DailyChallenge({ description, target, type, completed, progress, xpReward }: DailyChallengeProps) {
  const getProgressDisplay = () => {
    if (type === 'lessons') return `${Math.min(progress, target)}/${target}`;
    if (type === 'time') return `${Math.floor(Math.min(progress, target) / 60)}/${Math.floor(target / 60)} dk`;
    if (type === 'accuracy') return completed ? '✓' : '-';
    if (type === 'wpm') return completed ? '✓' : '-';
    return '';
  };

  const getProgressPercent = () => {
    if (completed) return 100;
    if (type === 'lessons') return Math.min(100, (progress / target) * 100);
    if (type === 'time') return Math.min(100, (progress / target) * 100);
    return 0;
  };

  const percent = getProgressPercent();

  return (
    <div style={{
      marginBottom: '2rem',
      padding: '1.25rem 1.5rem',
      borderRadius: '14px',
      background: completed
        ? 'linear-gradient(135deg, rgba(34, 211, 165, 0.08), rgba(34, 211, 165, 0.04))'
        : 'linear-gradient(135deg, rgba(79, 142, 247, 0.06), rgba(124, 85, 247, 0.04))',
      border: `1px solid ${completed ? 'rgba(34, 211, 165, 0.25)' : 'rgba(79, 142, 247, 0.2)'}`,
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <span style={{ fontSize: '1.35rem' }}>{completed ? '✅' : '🎯'}</span>
          <div>
            <div style={{ fontSize: '0.65rem', fontWeight: '700', color: completed ? 'var(--success)' : 'var(--accent-color)', letterSpacing: '1.5px', textTransform: 'uppercase' }}>
              Günlük Meydan Okuma
            </div>
            <div style={{ fontSize: '0.95rem', fontWeight: '600', color: 'var(--text-primary)', marginTop: '0.15rem' }}>
              {description}
            </div>
          </div>
        </div>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.35rem',
          padding: '0.3rem 0.7rem',
          borderRadius: '8px',
          background: completed ? 'rgba(34, 211, 165, 0.1)' : 'rgba(79, 142, 247, 0.08)',
          fontSize: '0.8rem',
          fontWeight: '700',
          color: completed ? 'var(--success)' : 'var(--accent-color)',
        }}>
          {completed ? '🎉' : '💰'} +{xpReward} XP
        </div>
      </div>

      {/* Progress bar */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '0.75rem',
      }}>
        <div style={{
          flex: 1,
          height: '8px',
          borderRadius: '4px',
          background: 'rgba(255,255,255,0.06)',
          overflow: 'hidden',
        }}>
          <div style={{
            height: '100%',
            borderRadius: '4px',
            width: `${percent}%`,
            background: completed
              ? 'linear-gradient(90deg, #22d3a5, #10b981)'
              : 'linear-gradient(90deg, #4f8ef7, #7c55f7)',
            transition: 'width 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
            boxShadow: completed ? '0 0 10px rgba(34, 211, 165, 0.4)' : '0 0 10px rgba(79, 142, 247, 0.3)',
          }} />
        </div>
        <span style={{ fontSize: '0.8rem', fontWeight: '700', color: 'var(--text-secondary)', minWidth: '40px', textAlign: 'right' }}>
          {getProgressDisplay()}
        </span>
      </div>
    </div>
  );
}
