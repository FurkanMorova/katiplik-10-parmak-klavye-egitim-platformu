"use client";
import type { Lesson } from '../data/lessons';

interface LearningPathProps {
  lessons: Lesson[];
  lessonStars: Record<string, number>;
  isLessonUnlocked: (lessonId: string, lessons: Lesson[]) => boolean;
  onSelectLesson: (lesson: Lesson) => void;
  lessonStats: Record<string, any>;
}

export default function LearningPath({ lessons, lessonStars, isLessonUnlocked, onSelectLesson, lessonStats }: LearningPathProps) {
  return (
    <div style={{ position: 'relative', paddingLeft: '3rem' }}>
      {/* Vertical line */}
      <div style={{
        position: 'absolute',
        left: '1.1rem',
        top: '2rem',
        bottom: '2rem',
        width: '3px',
        background: 'linear-gradient(to bottom, var(--accent-color), rgba(124, 85, 247, 0.3), var(--border-subtle))',
        borderRadius: '2px',
      }} />

      {lessons.map((lesson, idx) => {
        const stars = lessonStars[lesson.id] || 0;
        const unlocked = isLessonUnlocked(lesson.id, lessons);
        const stats = lessonStats[lesson.id];
        const isCompleted = stars >= 1;

        return (
          <div
            key={lesson.id}
            style={{
              position: 'relative',
              marginBottom: idx < lessons.length - 1 ? '1rem' : 0,
            }}
          >
            {/* Node dot */}
            <div style={{
              position: 'absolute',
              left: '-2.45rem',
              top: '1.5rem',
              width: isCompleted ? '22px' : '18px',
              height: isCompleted ? '22px' : '18px',
              borderRadius: '50%',
              background: isCompleted
                ? 'linear-gradient(135deg, #22d3a5, #10b981)'
                : unlocked
                  ? 'var(--accent-color)'
                  : 'var(--text-muted)',
              border: `3px solid ${isCompleted ? '#22d3a5' : unlocked ? 'var(--accent-color)' : '#2a2d3e'}`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '0.6rem',
              color: '#fff',
              fontWeight: '800',
              boxShadow: isCompleted
                ? '0 0 12px rgba(34, 211, 165, 0.4)'
                : unlocked
                  ? '0 0 12px rgba(79, 142, 247, 0.3)'
                  : 'none',
              animation: unlocked && !isCompleted ? 'pulse-glow 2s ease-in-out infinite' : undefined,
              zIndex: 2,
              transition: 'all 0.3s',
            }}>
              {isCompleted ? '✓' : unlocked ? (idx + 1) : '🔒'}
            </div>

            {/* Card */}
            <div
              onClick={() => {
                if (unlocked) onSelectLesson(lesson);
              }}
              style={{
                padding: '1.25rem 1.5rem',
                borderRadius: '14px',
                background: isCompleted
                  ? 'rgba(34, 211, 165, 0.04)'
                  : unlocked
                    ? 'var(--bg-glass)'
                    : 'rgba(255,255,255,0.015)',
                border: `1px solid ${isCompleted
                  ? 'rgba(34, 211, 165, 0.2)'
                  : unlocked
                    ? 'var(--border-subtle)'
                    : 'rgba(255,255,255,0.03)'}`,
                cursor: unlocked ? 'pointer' : 'not-allowed',
                opacity: unlocked ? 1 : 0.5,
                transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                gap: '1rem',
              }}
              onMouseEnter={e => {
                if (unlocked) {
                  e.currentTarget.style.transform = 'translateX(6px)';
                  e.currentTarget.style.borderColor = isCompleted ? 'rgba(34, 211, 165, 0.4)' : 'var(--accent-color)';
                  e.currentTarget.style.boxShadow = isCompleted
                    ? '0 8px 25px rgba(34, 211, 165, 0.1)'
                    : '0 8px 25px rgba(79, 142, 247, 0.1)';
                }
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = 'translateX(0)';
                e.currentTarget.style.borderColor = isCompleted
                  ? 'rgba(34, 211, 165, 0.2)'
                  : unlocked ? 'var(--border-subtle)' : 'rgba(255,255,255,0.03)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              {/* Left content */}
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.35rem' }}>
                  <span style={{
                    fontSize: '0.65rem',
                    fontWeight: '700',
                    padding: '0.15rem 0.5rem',
                    borderRadius: '6px',
                    letterSpacing: '0.5px',
                    background: isCompleted ? 'rgba(34, 211, 165, 0.12)' : 'rgba(79, 142, 247, 0.1)',
                    color: isCompleted ? 'var(--success)' : 'var(--accent-color)',
                    textTransform: 'uppercase',
                  }}>
                    {lesson.keyboardType} Klavye
                  </span>
                  {!unlocked && (
                    <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>
                      🔒 Önceki dersi tamamlayın
                    </span>
                  )}
                </div>
                <h3 style={{
                  fontSize: '1rem',
                  fontWeight: '700',
                  color: unlocked ? 'var(--text-primary)' : 'var(--text-muted)',
                  margin: 0,
                  lineHeight: '1.4',
                }}>
                  {lesson.title}
                </h3>
                {stats && stats.playCount > 0 && (
                  <div style={{ display: 'flex', gap: '1rem', marginTop: '0.5rem', fontSize: '0.78rem', color: 'var(--text-secondary)' }}>
                    <span>⚡ En İyi: <strong style={{ color: 'var(--success)' }}>{stats.highestWpm} DBK</strong></span>
                    <span>🔄 {stats.playCount}× tekrar</span>
                  </div>
                )}
              </div>

              {/* Right: Stars + Target */}
              <div style={{ textAlign: 'center', flexShrink: 0 }}>
                {/* Stars */}
                <div style={{ marginBottom: '0.35rem', fontSize: '1.1rem', letterSpacing: '1px' }}>
                  {[1, 2, 3].map(s => (
                    <span key={s} style={{
                      opacity: s <= stars ? 1 : 0.15,
                      filter: s <= stars ? 'none' : 'grayscale(1)',
                    }}>
                      ⭐
                    </span>
                  ))}
                </div>
                <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>
                  Hedef: {lesson.targetWpm} DBK
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
