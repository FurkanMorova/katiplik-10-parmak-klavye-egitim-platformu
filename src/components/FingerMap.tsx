"use client";
import { useState } from 'react';

// ─── Parmak tanımları ─────────────────────────────────────────────────────────
const FINGERS = {
  LP: { name: 'Sol Serçe',  color: '#f97316', bg: 'rgba(249,115,22,0.12)'  },
  LR: { name: 'Sol Yüzük',  color: '#eab308', bg: 'rgba(234,179,8,0.12)'   },
  LM: { name: 'Sol Orta',   color: '#22d3a5', bg: 'rgba(34,211,165,0.12)'  },
  LI: { name: 'Sol İşaret', color: '#4f8ef7', bg: 'rgba(79,142,247,0.12)'  },
  RI: { name: 'Sağ İşaret', color: '#a855f7', bg: 'rgba(168,85,247,0.12)'  },
  RM: { name: 'Sağ Orta',   color: '#f05252', bg: 'rgba(240,82,82,0.12)'   },
  RR: { name: 'Sağ Yüzük',  color: '#ec4899', bg: 'rgba(236,72,153,0.12)'  },
  RP: { name: 'Sağ Serçe',  color: '#94a3b8', bg: 'rgba(148,163,184,0.12)' },
  TH: { name: 'Başparmak',  color: '#64748b', bg: 'rgba(100,116,139,0.12)' },
} as const;

type FingerKey = keyof typeof FINGERS;
type KeyDef = { label: string; finger: FingerKey; isHome?: boolean };

// ─── F Klavye (TS 2117 standardı — kullanıcı tarafından doğrulandı) ────────────
// Üst sıra: F  G  Ğ  I  O  |  D  R  N  H  P  Q  W
// Ana sıra: U  İ  E  A  Ü  |  T  K  M  L  Y  Ş  X  ★
// Alt sıra: <  J  Ö  V  C  Ç  |  Z  S  B  .  :  ,
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
  // Alt sıra: <(LP) J(LP) Ö(LR) V(LM) C(LI) Ç(LI) Z(RI) S(RI) B(RM) .(RR) :(RP) ,(RP)
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
// Ana sıra: A S D F G | H J K L Ş İ
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
  /** Bileşen ilk render edildiğinde açık mı başlasın? (default: compact=false ise true) */
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
    <div style={{ marginBottom: compact ? '0' : '2rem' }}>

      {/* Başlık + toggle */}
      <div
        style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          flexWrap: 'wrap', gap: '0.75rem',
          marginBottom: expanded ? (compact ? '0' : '1.5rem') : '0',
          cursor: compact ? 'pointer' : 'default',
          padding: compact ? '1rem 1.25rem' : '0',
          background: compact ? 'rgba(255,255,255,0.03)' : 'transparent',
          border: compact ? '1px solid rgba(255,255,255,0.08)' : 'none',
          borderRadius: compact ? (expanded ? '14px 14px 0 0' : '14px') : '0',
          transition: 'border-radius 0.2s',
        }}
        onClick={() => compact && setExpanded(v => !v)}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
          <span style={{ fontSize: compact ? '1rem' : '1.5rem' }}>🎹</span>
          <div>
            <div style={{ fontWeight: '700', fontSize: compact ? '0.9rem' : '1.5rem', color: 'var(--text-primary)', letterSpacing: compact ? '0' : '-0.5px' }}>
              {compact ? 'Parmak Haritası' : '🎹 Parmak Haritası'}
            </div>
            {!compact && (
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', margin: 0 }}>
                Her parmağın hangi tuşa basacağını keşfedin · Ana sıra tuşları ★ ile işaretlidir
              </p>
            )}
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div
            style={{ display: 'inline-flex', background: 'rgba(255,255,255,0.04)', borderRadius: '8px', padding: '3px', border: '1px solid rgba(255,255,255,0.08)' }}
            onClick={e => e.stopPropagation()}
          >
            {(['F', 'Q'] as const).map(type => (
              <button
                key={type}
                onClick={() => setActiveKb(type)}
                style={{
                  padding: '0.35rem 1rem', borderRadius: '6px', border: 'none',
                  cursor: 'pointer', fontWeight: '700', fontSize: '0.8rem', transition: 'all 0.2s',
                  background: activeKb === type ? 'var(--accent-color)' : 'transparent',
                  color: activeKb === type ? '#fff' : 'var(--text-muted)',
                  boxShadow: activeKb === type ? '0 2px 10px rgba(79,142,247,0.4)' : 'none',
                }}
              >{type}</button>
            ))}
          </div>
          {compact && (
            <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem', display: 'inline-block', transform: expanded ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.2s' }}>▼</span>
          )}
        </div>
      </div>

      {/* Klavye + legend */}
      {expanded && (
        <div style={{
          background: 'rgba(255,255,255,0.02)',
          border: '1px solid rgba(255,255,255,0.08)',
          borderTop: compact ? 'none' : undefined,
          borderRadius: compact ? '0 0 14px 14px' : '18px',
          padding: '1.5rem',
          overflowX: 'auto',
        }}>
          <div style={{ minWidth: '520px' }}>
            {rows.map((row, rowIdx) => (
              <div key={rowIdx} style={{ marginBottom: '0.5rem' }}>
                <div style={{
                  fontSize: '0.58rem', color: rowIdx === 1 ? 'var(--success)' : 'var(--text-muted)',
                  fontWeight: '700', letterSpacing: '1px', textTransform: 'uppercase',
                  marginBottom: '0.25rem', paddingLeft: ROW_OFFSETS[rowIdx],
                }}>
                  {ROW_LABELS[rowIdx]}
                </div>
                <div style={{ display: 'flex', gap: '4px', paddingLeft: ROW_OFFSETS[rowIdx] }}>
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
                          minWidth: '41px', height: '41px', borderRadius: '8px',
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          flexDirection: 'column', cursor: 'default',
                          transition: 'all 0.15s ease',
                          background: isActive ? f.color : key.isHome ? f.bg : 'rgba(255,255,255,0.04)',
                          border: key.isHome
                            ? `2px solid ${f.color}`
                            : `1px solid ${isActive ? f.color : 'rgba(255,255,255,0.08)'}`,
                          opacity: isDimmed ? 0.18 : 1,
                          transform: isActive ? 'scale(1.13) translateY(-2px)' : 'scale(1)',
                          boxShadow: isActive ? `0 6px 18px ${f.bg}` : 'none',
                        }}
                      >
                        <span style={{
                          fontSize: '0.78rem', fontWeight: key.isHome ? '800' : '600',
                          color: isActive ? '#fff' : key.isHome ? f.color : 'var(--text-secondary)',
                          fontFamily: 'var(--font-mono)',
                        }}>
                          {key.label}
                        </span>
                        {key.isHome && (
                          <span style={{ width: '4px', height: '4px', borderRadius: '50%', background: isActive ? '#fff' : f.color, marginTop: '2px' }} />
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}

            {/* Boşluk tuşu */}
            <div style={{ marginTop: '0.5rem', paddingLeft: '60px' }}>
              <div style={{ fontSize: '0.58rem', color: 'var(--text-muted)', fontWeight: '700', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '0.25rem' }}>Boşluk</div>
              <div
                onMouseEnter={() => setHoveredFinger('TH')}
                onMouseLeave={() => setHoveredFinger(null)}
                style={{
                  width: '210px', height: '32px', borderRadius: '8px',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  cursor: 'default', transition: 'all 0.15s ease',
                  background: hoveredFinger === 'TH' ? FINGERS.TH.color : FINGERS.TH.bg,
                  border: `1px solid ${hoveredFinger === 'TH' ? FINGERS.TH.color : 'rgba(255,255,255,0.08)'}`,
                  opacity: hoveredFinger !== null && hoveredFinger !== 'TH' ? 0.18 : 1,
                }}
              >
                <span style={{ fontSize: '0.7rem', color: hoveredFinger === 'TH' ? '#fff' : 'var(--text-muted)', fontWeight: '600' }}>
                  BOŞLUK — Başparmak
                </span>
              </div>
            </div>
          </div>

          {/* Legend */}
          <div style={{ marginTop: '1.25rem', paddingTop: '1rem', borderTop: '1px solid rgba(255,255,255,0.06)', display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
            {(Object.entries(FINGERS) as [FingerKey, typeof FINGERS[FingerKey]][]).map(([key, f]) => (
              <div
                key={key}
                onMouseEnter={() => setHoveredFinger(key)}
                onMouseLeave={() => setHoveredFinger(null)}
                style={{
                  display: 'flex', alignItems: 'center', gap: '0.4rem',
                  padding: '0.3rem 0.7rem', borderRadius: '999px', cursor: 'default',
                  border: `1px solid ${hoveredFinger === key ? f.color : 'rgba(255,255,255,0.07)'}`,
                  background: hoveredFinger === key ? f.bg : 'rgba(255,255,255,0.02)',
                  transition: 'all 0.15s ease',
                  opacity: hoveredFinger !== null && hoveredFinger !== key ? 0.35 : 1,
                }}
              >
                <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: f.color, flexShrink: 0 }} />
                <span style={{ fontSize: '0.75rem', color: hoveredFinger === key ? f.color : 'var(--text-secondary)', fontWeight: hoveredFinger === key ? '700' : '500' }}>
                  {f.name}
                </span>
              </div>
            ))}
          </div>

          {/* Alt not */}
          <div style={{ marginTop: '1rem', padding: '0.75rem 1rem', background: 'rgba(79,142,247,0.05)', border: '1px solid rgba(79,142,247,0.12)', borderRadius: '8px', fontSize: '0.8rem', color: 'var(--text-secondary)', lineHeight: '1.6' }}>
            <strong style={{ color: 'var(--accent-color)' }}>★ Ana Sıra</strong>
            {activeKb === 'F'
              ? ' — F Klavye: U İ E A Ü (sol el) · T K M L Y Ş X (sağ el). Sol işaret parmagı A ve Ü tuşlarını; sağ işaret parmagı T ve K tuşlarını kaps ar.'
              : ' — Q Klavye: A S D F G (sol el) · H J K L Ş (sağ el). Sol işaret parmak F ve G tuşlarını; sağ işaret H ve J tuşlarını kaps ar.'}
          </div>
        </div>
      )}
    </div>
  );
}
