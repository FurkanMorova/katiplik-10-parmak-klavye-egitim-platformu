"use client";
import { useState, useEffect } from 'react';

interface LeaderboardEntry {
  rank: number;
  firstName: string;
  lastName: string;
  bestScore: number;
  bestWpm: number;
  bestCorrectWords: number;
  bestAccuracy: number;
  totalTests: number;
  type?: 'exam' | 'speed';
}

export default function Leaderboard() {
  const [type, setType] = useState<'exam' | 'speed'>('exam');
  const [period, setPeriod] = useState<'daily' | 'weekly' | 'all'>('weekly');
  const [data, setData] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch(`/api/leaderboard?period=${period}&type=${type}`)
      .then(res => res.json())
      .then(d => { setData(d || []); setLoading(false); })
      .catch(() => { setData([]); setLoading(false); });
  }, [period, type]);

  const getRankStyle = (rank: number) => {
    if (rank === 1) return { color: '#f59e0b', emoji: '🥇' };
    if (rank === 2) return { color: '#a1a1aa', emoji: '🥈' };
    if (rank === 3) return { color: '#cd7f32', emoji: '🥉' };
    return { color: 'var(--text-muted)', emoji: '' };
  };

  return (
    <div id="liderlik-tablosu" style={{ marginBottom: '3.5rem', scrollMarginTop: '6rem' }}>
      
      {/* Başlık ve Filtreler */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.25rem' }}>
        <div>
          <h3 style={{ fontSize: '1.5rem', fontWeight: '800', color: 'var(--text-primary)', margin: 0, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            🏆 Liderlik Sıralaması
          </h3>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', margin: '0.25rem 0 0' }}>
            {type === 'exam' 
              ? '⚖️ 3 Dakikalık Katiplik Sınavında en çok net doğru kelime yazan adaylar' 
              : '⚡ Tüm ders ve pratiklerde ulaşılan en yüksek DBK hızları'}
          </p>
        </div>

        {/* Sıralama Türü ve Zaman Filtresi */}
        <div style={{ display: 'flex', gap: '0.6rem', flexWrap: 'wrap', alignItems: 'center' }}>
          {/* Tür Seçici */}
          <div style={{
            display: 'inline-flex',
            background: 'var(--bg-secondary)',
            borderRadius: '9px',
            padding: '3px',
            border: '1px solid var(--border-medium)'
          }}>
            <button
              onClick={() => setType('exam')}
              style={typeBtnStyle(type === 'exam')}
            >
              ⚖️ 3 Dk Sınavı
            </button>
            <button
              onClick={() => setType('speed')}
              style={typeBtnStyle(type === 'speed')}
            >
              ⚡ Genel Hız (DBK)
            </button>
          </div>

          {/* Dönem Filtresi */}
          <div style={{
            display: 'inline-flex',
            background: 'var(--bg-secondary)',
            borderRadius: '9px',
            padding: '3px',
            border: '1px solid var(--border-medium)'
          }}>
            {([
              { key: 'daily' as const, label: 'Bugün' },
              { key: 'weekly' as const, label: 'Bu Hafta' },
              { key: 'all' as const, label: 'Tümü' },
            ]).map(p => (
              <button
                key={p.key}
                onClick={() => setPeriod(p.key)}
                style={periodBtnStyle(period === p.key)}
              >
                {p.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="glass-panel" style={{ padding: '0.5rem', overflow: 'hidden', background: 'var(--bg-secondary)', border: '1px solid var(--border-medium)' }}>
        {loading ? (
          <div style={{ padding: '3rem', textAlign: 'center', color: 'var(--text-secondary)' }}>Sıralama yükleniyor...</div>
        ) : data.length === 0 ? (
          <div style={{ padding: '3rem 2rem', textAlign: 'center', color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
            <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>{type === 'exam' ? '⚖️' : '⚡'}</div>
            {type === 'exam' 
              ? 'Bu dönemde henüz 3 dakikalık katiplik sınavı tamamlayan aday yok. Sınava girerek ilk sen ol!' 
              : 'Bu dönem için henüz hız rekoru bulunmuyor. Hemen bir ders tamamla ve listeye gir!'}
          </div>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid var(--border-medium)' }}>
                  <th style={{ ...thStyle, width: '60px' }}>#</th>
                  <th style={{ ...thStyle, textAlign: 'left' }}>Katip Adayı</th>
                  <th style={{ ...thStyle, textAlign: 'center' }}>
                    {type === 'exam' ? '3 Dk Net Doğru Kelime' : 'En Yüksek Hız'}
                  </th>
                  {type === 'exam' && (
                    <th style={{ ...thStyle, textAlign: 'center' }}>Ort. Hız (DBK)</th>
                  )}
                  <th style={{ ...thStyle, textAlign: 'center', width: '110px' }}>
                    {type === 'exam' ? 'Sınav Tekrarı' : 'Toplam Pratik'}
                  </th>
                </tr>
              </thead>
              <tbody>
                {data.map((entry) => {
                  const rankInfo = getRankStyle(entry.rank);
                  return (
                    <tr
                      key={entry.rank}
                      style={{
                        borderBottom: '1px solid var(--border-subtle)',
                        transition: 'background 0.15s',
                      }}
                      onMouseEnter={e => { e.currentTarget.style.background = 'var(--bg-glass-hover)'; }}
                      onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; }}
                    >
                      <td style={{ ...tdStyle, textAlign: 'center', fontWeight: '800', fontSize: '1rem', color: rankInfo.color }}>
                        {rankInfo.emoji || `#${entry.rank}`}
                      </td>
                      <td style={tdStyle}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                          <div style={{
                            width: '36px',
                            height: '36px',
                            borderRadius: '50%',
                            background: entry.rank <= 3 ? `linear-gradient(135deg, ${rankInfo.color}, rgba(245,158,11,0.2))` : 'var(--bg-glass)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '0.85rem',
                            fontWeight: '800',
                            color: entry.rank <= 3 ? '#121214' : 'var(--text-secondary)',
                            border: '1px solid var(--border-medium)',
                          }}>
                            {entry.firstName[0]?.toUpperCase()}
                          </div>
                          <div>
                            <span style={{ fontWeight: '700', color: 'var(--text-primary)', fontSize: '0.95rem' }}>
                              {entry.firstName} {entry.lastName}.
                            </span>
                            {entry.rank === 1 && (
                              <span style={{ marginLeft: '0.5rem', fontSize: '0.7rem', padding: '0.15rem 0.45rem', borderRadius: '4px', background: 'var(--accent-light)', color: 'var(--accent-color)', fontWeight: '800' }}>
                                LİDER
                              </span>
                            )}
                          </div>
                        </div>
                      </td>
                      
                      {/* Skor */}
                      <td style={{ ...tdStyle, textAlign: 'center' }}>
                        {type === 'exam' ? (
                          <div style={{ display: 'inline-flex', flexDirection: 'column', alignItems: 'center' }}>
                            <span style={{ fontWeight: '900', color: entry.rank <= 3 ? 'var(--accent-color)' : 'var(--success)', fontSize: '1.2rem' }}>
                              {entry.bestCorrectWords} <span style={{ fontSize: '0.8rem', fontWeight: '600' }}>Kelime</span>
                            </span>
                            {entry.bestCorrectWords >= 90 ? (
                              <span style={{ fontSize: '0.68rem', color: 'var(--success)', fontWeight: '700' }}>✓ Barajı Geçti (90+)</span>
                            ) : (
                              <span style={{ fontSize: '0.68rem', color: 'var(--text-muted)' }}>Hedefe {90 - entry.bestCorrectWords} kaldı</span>
                            )}
                          </div>
                        ) : (
                          <span style={{ fontWeight: '900', color: entry.rank <= 3 ? 'var(--accent-color)' : 'var(--success)', fontSize: '1.2rem' }}>
                            {entry.bestWpm} <span style={{ fontSize: '0.8rem', fontWeight: '600' }}>DBK</span>
                          </span>
                        )}
                      </td>

                      {/* Exam modunda ortalama DBK */}
                      {type === 'exam' && (
                        <td style={{ ...tdStyle, textAlign: 'center', color: 'var(--text-secondary)', fontWeight: '700' }}>
                          {entry.bestWpm} DBK
                        </td>
                      )}

                      {/* Toplam Sınav/Pratik */}
                      <td style={{ ...tdStyle, textAlign: 'center' }}>
                        <span style={{
                          padding: '0.25rem 0.65rem',
                          borderRadius: '12px',
                          background: 'var(--bg-glass)',
                          fontSize: '0.82rem',
                          fontWeight: '600',
                          color: 'var(--text-secondary)'
                        }}>
                          {entry.totalTests} {type === 'exam' ? 'sınav' : 'pratik'}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

const typeBtnStyle = (isActive: boolean): React.CSSProperties => ({
  padding: '0.4rem 0.85rem',
  borderRadius: '7px',
  fontSize: '0.82rem',
  fontWeight: '700',
  cursor: 'pointer',
  border: 'none',
  background: isActive ? 'var(--accent-color)' : 'transparent',
  color: isActive ? '#121214' : 'var(--text-secondary)',
  boxShadow: isActive ? 'var(--shadow-accent)' : 'none',
  transition: 'all 0.2s',
});

const periodBtnStyle = (isActive: boolean): React.CSSProperties => ({
  padding: '0.4rem 0.75rem',
  borderRadius: '7px',
  fontSize: '0.8rem',
  fontWeight: '600',
  cursor: 'pointer',
  border: 'none',
  background: isActive ? 'var(--bg-glass-hover)' : 'transparent',
  color: isActive ? 'var(--text-primary)' : 'var(--text-muted)',
  transition: 'all 0.2s',
});

const thStyle: React.CSSProperties = {
  padding: '0.85rem 1rem',
  fontSize: '0.75rem',
  fontWeight: '700',
  color: 'var(--text-muted)',
  textTransform: 'uppercase',
  letterSpacing: '1px',
};

const tdStyle: React.CSSProperties = {
  padding: '0.85rem 1rem',
  fontSize: '0.9rem',
};
