"use client";

import React from 'react';

// ─── F Klavye Satırları ──────────────────────────────────────────────
const F_ROWS = [
  ['F', 'G', 'Ğ', 'I', 'O', 'D', 'R', 'N', 'H', 'P', 'Q', 'W'],
  ['U', 'İ', 'E', 'A', 'Ü', 'T', 'K', 'M', 'L', 'Y', 'Ş', 'X'],
  ['<', 'J', 'Ö', 'V', 'C', 'Ç', 'Z', 'S', 'B', '.', ':', ','],
];

// ─── Q Klavye Satırları ──────────────────────────────────────────────
const Q_ROWS = [
  ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P', 'Ğ', 'Ü'],
  ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', 'Ş', 'İ'],
  ['Z', 'X', 'C', 'V', 'B', 'N', 'M', 'Ö', 'Ç', '.'],
];

const ROW_OFFSETS = ['0px', '12px', '24px'];

interface HeatmapKeyboardProps {
  keyboardType: 'F' | 'Q';
  stats: Record<string, { hits: number, misses: number }>;
}

export default function HeatmapKeyboard({ keyboardType, stats }: HeatmapKeyboardProps) {
  const rows = keyboardType === 'F' ? F_ROWS : Q_ROWS;

  return (
    <div style={{
      background: 'var(--bg-glass)',
      border: '1px solid var(--border-subtle)',
      borderRadius: '16px',
      padding: '2rem',
      overflowX: 'auto',
      marginTop: '1.5rem',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center'
    }}>
      <h3 style={{ marginBottom: '1.5rem', fontSize: '1.1rem', color: 'var(--text-secondary)' }}>
        Bu Egzersizde Yapılan Hataların Isı Haritası
      </h3>
      
      <div style={{ minWidth: '400px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {rows.map((row, rowIdx) => (
          <div key={rowIdx} style={{ display: 'flex', gap: '6px', paddingLeft: ROW_OFFSETS[rowIdx] }}>
            {row.map((char, kIdx) => {
              const stat = stats[char] || { hits: 0, misses: 0 };
              const total = stat.hits + stat.misses;
              const bgColor = total > 0 
                ? stat.misses > 0 
                  ? `rgba(239, 68, 68, ${Math.min(0.2 + (stat.misses / Math.max(5, total)) * 0.8, 1)})` // Red gradient intensity
                  : 'rgba(34, 211, 165, 0.2)' // Pure Green for 0 mistakes
                : 'var(--bg-glass)'; // Unpressed
              
              const borderColor = total > 0
                ? stat.misses > 0 
                  ? 'rgba(239, 68, 68, 0.5)'
                  : 'rgba(34, 211, 165, 0.5)'
                : 'var(--border-subtle)';

              return (
                <div
                  key={kIdx}
                  style={{
                    minWidth: '44px',
                    height: '50px',
                    borderRadius: '8px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: bgColor,
                    border: `1px solid ${borderColor}`,
                    transition: 'all 0.2s',
                  }}
                >
                  <span style={{
                    fontSize: '1.1rem',
                    fontWeight: '700',
                    color: total > 0 ? 'var(--text-primary)' : 'var(--text-secondary)'
                  }}>
                    {char}
                  </span>
                  {stat.misses > 0 && (
                    <span style={{
                      fontSize: '0.65rem',
                      fontWeight: '800',
                      color: 'var(--error)',
                      marginTop: '2px'
                    }}>
                      {stat.misses} Hata
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        ))}
        {/* Spacebar */}
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '8px' }}>
             <div
                style={{
                  width: '260px',
                  height: '42px',
                  borderRadius: '8px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: 'var(--bg-glass)',
                  border: '1px solid var(--border-subtle)',
                }}
              >
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>BOŞLUK</span>
              </div>
        </div>
      </div>
    </div>
  );
}
