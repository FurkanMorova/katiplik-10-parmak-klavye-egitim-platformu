"use client";
import { useState } from 'react';
import { achievements } from '../data/achievements';

interface AchievementsGalleryProps {
  unlockedIds: string[];
}

const CATEGORIES = [
  { id: 'all', label: 'Tümü' },
  { id: 'completion', label: '📚 Tamamlama' },
  { id: 'streak', label: '🔥 Seri' },
  { id: 'speed', label: '⚡ Hız' },
  { id: 'accuracy', label: '🎯 Doğruluk' },
  { id: 'special', label: '✨ Özel' },
];

export default function AchievementsGallery({ unlockedIds }: AchievementsGalleryProps) {
  const [activeCategory, setActiveCategory] = useState('all');
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const unlockedSet = new Set(unlockedIds);
  const filtered = activeCategory === 'all'
    ? achievements
    : achievements.filter(a => a.category === activeCategory);

  const unlockedCount = achievements.filter(a => unlockedSet.has(a.id)).length;

  return (
    <div style={{ marginBottom: '3rem' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
        <div>
          <h3 style={{ fontSize: '1.35rem', fontWeight: '800', color: 'var(--text-primary)', margin: 0 }}>
            🏆 Başarımlar
          </h3>
          <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
            {unlockedCount}/{achievements.length} rozet açıldı
          </p>
        </div>
        {/* Overall progress */}
        <div style={{
          width: '80px',
          height: '80px',
          borderRadius: '50%',
          background: `conic-gradient(#eab308 ${(unlockedCount / achievements.length) * 360}deg, rgba(255,255,255,0.06) 0deg)`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          <div style={{
            width: '64px',
            height: '64px',
            borderRadius: '50%',
            background: 'var(--bg-primary)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '0.9rem',
            fontWeight: '800',
            color: '#eab308',
          }}>
            {Math.round((unlockedCount / achievements.length) * 100)}%
          </div>
        </div>
      </div>

      {/* Category tabs */}
      <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.25rem', flexWrap: 'wrap' }}>
        {CATEGORIES.map(cat => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            style={{
              padding: '0.4rem 0.85rem',
              borderRadius: '8px',
              fontSize: '0.8rem',
              fontWeight: '600',
              cursor: 'pointer',
              border: 'none',
              transition: 'all 0.2s',
              background: activeCategory === cat.id ? 'rgba(234, 179, 8, 0.15)' : 'var(--bg-glass)',
              color: activeCategory === cat.id ? '#eab308' : 'var(--text-muted)',
            }}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Achievement grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))',
        gap: '0.75rem',
      }}>
        {filtered.map(achievement => {
          const unlocked = unlockedSet.has(achievement.id);
          const isHovered = hoveredId === achievement.id;
          return (
            <div
              key={achievement.id}
              onMouseEnter={() => setHoveredId(achievement.id)}
              onMouseLeave={() => setHoveredId(null)}
              style={{
                padding: '1.25rem 0.75rem',
                borderRadius: '12px',
                background: unlocked ? 'rgba(234, 179, 8, 0.06)' : 'var(--bg-glass)',
                border: `1px solid ${unlocked ? 'rgba(234, 179, 8, 0.2)' : 'var(--border-subtle)'}`,
                textAlign: 'center',
                transition: 'all 0.25s',
                cursor: 'default',
                position: 'relative',
                transform: isHovered ? 'translateY(-4px)' : 'none',
                boxShadow: isHovered && unlocked ? '0 10px 30px rgba(234, 179, 8, 0.15)' : 'none',
              }}
            >
              <div style={{
                fontSize: '2rem',
                marginBottom: '0.5rem',
                filter: unlocked ? 'none' : 'grayscale(1) brightness(0.5)',
                opacity: unlocked ? 1 : 0.4,
              }}>
                {achievement.icon}
              </div>
              <div style={{
                fontSize: '0.78rem',
                fontWeight: '700',
                color: unlocked ? 'var(--text-primary)' : 'var(--text-muted)',
                marginBottom: '0.25rem',
                lineHeight: '1.3',
              }}>
                {unlocked ? achievement.name : '???'}
              </div>
              <div style={{
                fontSize: '0.7rem',
                color: 'var(--text-muted)',
                lineHeight: '1.4',
              }}>
                {achievement.description}
              </div>
              {unlocked && (
                <div style={{
                  position: 'absolute',
                  top: '6px',
                  right: '6px',
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  background: '#22d3a5',
                  boxShadow: '0 0 6px rgba(34, 211, 165, 0.5)',
                }} />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
