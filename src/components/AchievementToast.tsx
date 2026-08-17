"use client";
import { useState, useEffect } from 'react';
import { achievements } from '../data/achievements';

interface AchievementToastProps {
  unlockedIds: string[];
  onDismiss: () => void;
}

export default function AchievementToast({ unlockedIds, onDismiss }: AchievementToastProps) {
  const [visible, setVisible] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (unlockedIds.length > 0) {
      setVisible(true);
      setCurrentIndex(0);
    }
  }, [unlockedIds]);

  useEffect(() => {
    if (!visible) return;
    const timer = setTimeout(() => {
      if (currentIndex < unlockedIds.length - 1) {
        setCurrentIndex(prev => prev + 1);
      } else {
        setVisible(false);
        onDismiss();
      }
    }, 3500);
    return () => clearTimeout(timer);
  }, [visible, currentIndex, unlockedIds.length, onDismiss]);

  if (!visible || unlockedIds.length === 0) return null;

  const achievementId = unlockedIds[currentIndex];
  const achievement = achievements.find(a => a.id === achievementId);
  if (!achievement) return null;

  return (
    <div style={{
      position: 'fixed',
      top: '1.5rem',
      right: '1.5rem',
      zIndex: 10000,
      animation: 'achievementSlideIn 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) forwards',
    }}>
      <div style={{
        background: 'linear-gradient(135deg, rgba(22, 25, 37, 0.98), rgba(30, 33, 48, 0.98))',
        border: '1px solid rgba(234, 179, 8, 0.4)',
        borderRadius: '16px',
        padding: '1.25rem 1.75rem',
        display: 'flex',
        alignItems: 'center',
        gap: '1rem',
        boxShadow: '0 20px 50px rgba(0,0,0,0.5), 0 0 30px rgba(234, 179, 8, 0.15)',
        minWidth: '300px',
        maxWidth: '420px',
        backdropFilter: 'blur(20px)',
      }}>
        {/* Glow */}
        <div style={{
          position: 'absolute',
          top: '-20%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '200px',
          height: '100px',
          background: 'radial-gradient(ellipse, rgba(234, 179, 8, 0.15) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />

        {/* Icon */}
        <div style={{
          width: '52px',
          height: '52px',
          borderRadius: '14px',
          background: 'rgba(234, 179, 8, 0.12)',
          border: '1px solid rgba(234, 179, 8, 0.3)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '1.75rem',
          flexShrink: 0,
          animation: 'achievementPulse 1s ease-in-out infinite',
        }}>
          {achievement.icon}
        </div>

        {/* Text */}
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: '0.7rem', color: '#eab308', fontWeight: '700', letterSpacing: '1.5px', textTransform: 'uppercase', marginBottom: '0.25rem' }}>
            🏆 Başarım Açıldı!
          </div>
          <div style={{ fontSize: '1.05rem', fontWeight: '700', color: '#f0f2ff', marginBottom: '0.15rem' }}>
            {achievement.name}
          </div>
          <div style={{ fontSize: '0.82rem', color: '#8892aa' }}>
            {achievement.description}
          </div>
        </div>

        {/* Counter */}
        {unlockedIds.length > 1 && (
          <div style={{ fontSize: '0.75rem', color: '#4a5270', fontWeight: '600' }}>
            {currentIndex + 1}/{unlockedIds.length}
          </div>
        )}
      </div>
    </div>
  );
}
