"use client";
import { useState } from 'react';

// ─── Parmak tanımları ─────────────────────────────────────────────────────────
const FINGERS = {
  LP: { name: 'Sol Serçe',  color: '#f97316', bg: 'rgba(249,115,22,0.15)'  },
  LR: { name: 'Sol Yüzük',  color: '#eab308', bg: 'rgba(234,179,8,0.15)'   },
  LM: { name: 'Sol Orta',   color: '#2dd4bf', bg: 'rgba(45,212,191,0.15)'  },
  LI: { name: 'Sol İşaret', color: '#f59e0b', bg: 'rgba(245,158,11,0.15)'  },
  RI: { name: 'Sağ İşaret', color: '#a855f7', bg: 'rgba(168,85,247,0.15)'  },
  RM: { name: 'Sağ Orta',   color: '#f43f5e', bg: 'rgba(244,63,94,0.15)'   },
  RR: { name: 'Sağ Yüzük',  color: '#ec4899', bg: 'rgba(236,72,153,0.15)'  },
  RP: { name: 'Sağ Serçe',  color: '#94a3b8', bg: 'rgba(148,163,184,0.15)' },
  TH: { name: 'Başparmak',  color: '#71717a', bg: 'rgba(113,113,122,0.15)' },
} as const;

type FingerKey = keyof typeof FINGERS;
type KeyDef = { label: string; finger: FingerKey; isHome?: boolean };

// ─── F Klavye (TS 2117 standardı) ─────────────────────────────────────────────
const F_ROWS: KeyDef[][] = [
  // Üst sıra
  [
    { label: 'F', finger: 'LP' }, { label: 'G',  finger: 'LR' },
    { label: 'Ğ', finger: 'LM' }, { label: 'I',  finger: 'LI' },
    { label: 'O', finger: 'LI' }, { label: 'D',  finger: 'RI' },
    { label: 'R', finger: 'RI' }, { label: 'N',  finger: 'RM' },
    { label: 'H', finger: 'RR' }, { label: 'P',  finger: 'RP' },
    { label: 'Q', finger: 'RP' }, { label: 'W',  finger: 'RP' },
  ],
  // Ana sıra ★
  [
    { label: 'U', finger: 'LP', isHome: true }, { label: 'İ', finger: 'LR', isHome: true },
    { label: 'E', finger: 'LM', isHome: true }, { label: 'A', finger: 'LI', isHome: true },
    { label: 'Ü', finger: 'LI', isHome: true }, { label: 'T', finger: 'RI', isHome: true },
    { label: 'K', finger: 'RI', isHome: true }, { label: 'M', finger: 'RM', isHome: true },
    { label: 'L', finger: 'RR', isHome: true }, { label: 'Y', finger: 'RP', isHome: true },
    { label: 'Ş', finger: 'RP', isHome: true }, { label: 'X', finger: 'RP', isHome: true },
  ],
  // Alt sıra
  [
    { label: '<',  finger: 'LP' }, { label: 'J',  finger: 'LP' },
    { label: 'Ö',  finger: 'LR' }, { label: 'V',  finger: 'LM' },
    { label: 'C',  finger: 'LI' }, { label: 'Ç',  finger: 'LI' },
    { label: 'Z',  finger: 'RI' }, { label: 'S',  finger: 'RI' },
    { label: 'B',  finger: 'RM' }, { label: '.',  finger: 'RR' },
    { label: ':',  finger: 'RP' }, { label: ',',  finger: 'RP' },
  ],
];

// ─── Q Klavye ─────────────────────────────────────────────────────────────────
const Q_ROWS: KeyDef[][] = [
  [
    { label: 'Q', finger: 'LP' }, { label: 'W', finger: 'LR' },
    { label: 'E', finger: 'LM' }, { label: 'R', finger: 'LI' },
    { label: 'T', finger: 'LI' }, { label: 'Y', finger: 'RI' },
    { label: 'U', finger: 'RI' }, { label: 'I', finger: 'RM' },
    { label: 'O', finger: 'RR' }, { label: 'P', finger: 'RP' },
    { label: 'Ğ', finger: 'RP' }, { label: 'Ü', finger: 'RP' },
  ],
  [
    { label: 'A', finger: 'LP', isHome: true }, { label: 'S', finger: 'LR', isHome: true },
    { label: 'D', finger: 'LM', isHome: true }, { label: 'F', finger: 'LI', isHome: true },
    { label: 'G', finger: 'LI', isHome: true }, { label: 'H', finger: 'RI', isHome: true },
    { label: 'J', finger: 'RI', isHome: true }, { label: 'K', finger: 'RM', isHome: true },
    { label: 'L', finger: 'RR', isHome: true }, { label: 'Ş', finger: 'RP', isHome: true },
    { label: 'İ', finger: 'RP', isHome: true },
  ],
  [
    { label: 'Z', finger: 'LP' }, { label: 'X', finger: 'LR' },
    { label: 'C', finger: 'LM' }, { label: 'V', finger: 'LI' },
    { label: 'B', finger: 'LI' }, { label: 'N', finger: 'RI' },
    { label: 'M', finger: 'RI' }, { label: 'Ö', finger: 'RM' },
    { label: 'Ç', finger: 'RR' }, { label: '.', finger: 'RP' },
  ],
];

const ROW_LABELS  = ['Üst Sıra', 'Ana Sıra ★', 'Alt Sıra'];
const ROW_OFFSETS = ['0px', '8px', '20px'];

interface FingerMapProps {
  compact?: boolean;
  defaultKb?: 'F' | 'Q';
  defaultExpanded?: boolean;
}

export default function FingerMap({ compact = false, defaultKb = 'F', defaultExpanded }: FingerMapProps) {
  const [activeKb, setActiveKb]           = useState<'F' | 'Q'>(defaultKb);
  const [hoveredFinger, setHoveredFinger] = useState<FingerKey | null>(null);
  const [expanded, setExpanded]           = useState(
    defaultExpanded !== undefined ? defaultExpanded : !compact
  );

  const rows = activeKb === 'F' ? F_ROWS : Q_ROWS;

  return (
    <div style={{
      marginBottom: compact ? '0' : '2rem',
      borderRadius: '16px',
      overflow: 'hidden',
      background: 'var(--bg-secondary)',
      border: '1px solid var(--border-medium)',
      boxShadow: 'var(--shadow-sm)'
    }}>

      {/* Başlık + toggle */}
      <div
        style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          flexWrap: 'wrap', gap: '0.75rem',
          cursor: compact ? 'pointer' : 'default',
          padding: '1.1rem 1.4rem',
          background: 'var(--bg-glass-hover)',
          borderBottom: expanded ? '1px solid var(--border-medium)' : 'none',
          transition: 'all 0.2s',
        }}
        onClick={() => compact && setExpanded(v => !v)}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
          <span style={{ fontSize: '1.35rem' }}>🎹</span>
          <div>
            <div style={{ fontWeight: '800', fontSize: compact ? '0.95rem' : '1.25rem', color: 'var(--text-primary)', letterSpacing: '-0.3px' }}>
              {compact ? 'Parmak Haritası (Hangi Parmağını Kullanmalısın?)' : '🎹 Parmak Haritası Rehberi'}
            </div>
            {!compact && (
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', margin: '0.2rem 0 0' }}>
                Her parmağın hangi tuşa basacağını keşfedin · Ana sıra tuşları ★ ile işaretlidir
              </p>
            )}
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div
            style={{
              display: 'inline-flex',
              background: 'var(--bg-glass)',
              borderRadius: '9px',
              padding: '3px',
              border: '1px solid var(--border-medium)'
            }}
            onClick={e => e.stopPropagation()}
          >
            {(['F', 'Q'] as const).map(type => (
              <button
                key={type}
                onClick={() => setActiveKb(type)}
                style={{
                  padding: '0.35rem 0.95rem', borderRadius: '7px', border: 'none',
                  cursor: 'pointer', fontWeight: '800', fontSize: '0.82rem', transition: 'all 0.2s',
                  background: activeKb === type ? 'var(--accent-color)' : 'transparent',
                  color: activeKb === type ? '#121214' : 'var(--text-secondary)',
                  boxShadow: activeKb === type ? 'var(--shadow-accent)' : 'none',
                }}
              >{type} Klavye</button>
            ))}
          </div>
          {compact && (
            <span style={{ color: 'var(--text-primary)', fontWeight: '700', fontSize: '0.85rem', display: 'inline-block', transform: expanded ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.2s' }}>
              ▼
            </span>
          )}
        </div>
      </div>

      {/* Klavye + legend */}
      {expanded && (
        <div style={{
          padding: '1.5rem',
          overflowX: 'auto',
          background: 'var(--bg-secondary)',
        }}>
          <div style={{ minWidth: '540px' }}>
            {rows.map((row, rowIdx) => (
              <div key={rowIdx} style={{ marginBottom: '0.6rem' }}>
                <div style={{
                  fontSize: '0.68rem',
                  color: rowIdx === 1 ? 'var(--accent-color)' : 'var(--text-muted)',
                  fontWeight: '800',
                  letterSpacing: '1px',
                  textTransform: 'uppercase',
                  marginBottom: '0.3rem',
                  paddingLeft: ROW_OFFSETS[rowIdx],
                }}>
                  {ROW_LABELS[rowIdx]}
                </div>
                <div style={{ display: 'flex', gap: '5px', paddingLeft: ROW_OFFSETS[rowIdx] }}>
                  {row.map((key, kIdx) => {
                    const f = FINGERS[key.finger];
                    const isActive = hoveredFinger === key.finger;
                    const isDimmed = hoveredFinger !== null && !isActive;
                    return (
                      <div
                        key={kIdx}
                        onMouseEnter={() => setHoveredFinger(key.finger)}
                        onMouseLeave={() => setHoveredFinger(null)}
                        style={{
                          minWidth: '42px', height: '42px', borderRadius: '9px',
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          flexDirection: 'column', cursor: 'default',
                          transition: 'all 0.15s ease',
                          background: isActive ? f.color : key.isHome ? f.bg : 'var(--bg-glass)',
                          border: key.isHome
                            ? `2px solid ${f.color}`
                            : `1px solid ${isActive ? f.color : 'var(--border-medium)'}`,
                          opacity: isDimmed ? 0.2 : 1,
                          transform: isActive ? 'scale(1.12) translateY(-2px)' : 'scale(1)',
                          boxShadow: isActive ? `0 6px 18px ${f.bg}` : 'none',
                        }}
                      >
                        <span style={{
                          fontSize: '0.85rem',
                          fontWeight: '800',
                          color: isActive ? '#121214' : key.isHome ? f.color : 'var(--text-primary)',
                          fontFamily: 'var(--font-mono)',
                        }}>
                          {key.label}
                        </span>
                        {key.isHome && (
                          <span style={{ width: '4px', height: '4px', borderRadius: '50%', background: isActive ? '#121214' : f.color, marginTop: '2px' }} />
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}

            {/* Boşluk tuşu */}
            <div style={{ marginTop: '0.6rem', paddingLeft: '60px' }}>
              <div style={{ fontSize: '0.65rem', color: 'var(--text-muted)', fontWeight: '800', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '0.3rem' }}>Boşluk</div>
              <div
                onMouseEnter={() => setHoveredFinger('TH')}
                onMouseLeave={() => setHoveredFinger(null)}
                style={{
                  width: '220px', height: '34px', borderRadius: '9px',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  cursor: 'default', transition: 'all 0.15s ease',
                  background: hoveredFinger === 'TH' ? FINGERS.TH.color : FINGERS.TH.bg,
                  border: `1px solid ${hoveredFinger === 'TH' ? FINGERS.TH.color : 'var(--border-medium)'}`,
                  opacity: hoveredFinger !== null && hoveredFinger !== 'TH' ? 0.2 : 1,
                }}
              >
                <span style={{ fontSize: '0.75rem', color: hoveredFinger === 'TH' ? '#fff' : 'var(--text-secondary)', fontWeight: '700' }}>
                  BOŞLUK — Başparmak
                </span>
              </div>
            </div>
          </div>

          {/* Legend */}
          <div style={{ marginTop: '1.25rem', paddingTop: '1rem', borderTop: '1px solid var(--border-subtle)', display: 'flex', flexWrap: 'wrap', gap: '0.45rem' }}>
            {(Object.entries(FINGERS) as [FingerKey, typeof FINGERS[FingerKey]][]).map(([key, f]) => (
              <div
                key={key}
                onMouseEnter={() => setHoveredFinger(key)}
                onMouseLeave={() => setHoveredFinger(null)}
                style={{
                  display: 'flex', alignItems: 'center', gap: '0.45rem',
                  padding: '0.35rem 0.75rem', borderRadius: '999px', cursor: 'default',
                  border: `1px solid ${hoveredFinger === key ? f.color : 'var(--border-medium)'}`,
                  background: hoveredFinger === key ? f.bg : 'var(--bg-glass)',
                  transition: 'all 0.15s ease',
                  opacity: hoveredFinger !== null && hoveredFinger !== key ? 0.35 : 1,
                }}
              >
                <div style={{ width: '9px', height: '9px', borderRadius: '50%', background: f.color, flexShrink: 0 }} />
                <span style={{ fontSize: '0.78rem', color: hoveredFinger === key ? f.color : 'var(--text-primary)', fontWeight: '700' }}>
                  {f.name}
                </span>
              </div>
            ))}
          </div>

          {/* Alt not */}
          <div style={{ marginTop: '1rem', padding: '0.85rem 1.1rem', background: 'var(--accent-light)', border: '1px solid var(--border-medium)', borderRadius: '10px', fontSize: '0.85rem', color: 'var(--text-primary)', lineHeight: '1.6' }}>
            <strong style={{ color: 'var(--accent-color)' }}>★ Ana Sıra Tuşları:</strong>
            {activeKb === 'F'
              ? ' F Klavyede eller U İ E A Ü (sol) · T K M L Y Ş X (sağ) üzerinde durur. Sol işaret parmağı A ve Ü tuşlarını; sağ işaret parmağı T ve K tuşlarını kapsar.'
              : ' Q Klavyede eller A S D F G (sol) · H J K L Ş (sağ) üzerinde durur. Sol işaret parmağı F ve G tuşlarını; sağ işaret parmağı H ve J tuşlarını kapsar.'}
          </div>
        </div>
      )}
    </div>
  );
}
