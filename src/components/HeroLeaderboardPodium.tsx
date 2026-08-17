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

export default function HeroLeaderboardPodium() {
  const [type, setType] = useState<'exam' | 'speed'>('exam');
  const [leaders, setLeaders] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch(`/api/leaderboard?period=weekly&type=${type}`)
      .then(res => res.json())
      .then(data => {
        setLeaders(data || []);
        setLoading(false);
      })
      .catch(() => {
        setLeaders([]);
        setLoading(false);
      });
  }, [type]);

  const top1 = leaders[0];
  const top2 = leaders[1];
  const top3 = leaders[2];

  return (
    <div className="glass-panel" style={{
      padding: '1.5rem',
      borderRadius: '20px',
      background: 'var(--bg-secondary)',
      border: '1px solid var(--border-medium)',
      boxShadow: 'var(--shadow-lg), 0 0 40px rgba(245, 158, 11, 0.08)',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Ambient background glow */}
      <div style={{
        position: 'absolute',
        top: '-30%',
        right: '-20%',
        width: '200px',
        height: '200px',
        background: 'radial-gradient(circle, rgba(245, 158, 11, 0.15) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      {/* Header with toggle */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
          <span style={{ fontSize: '1.3rem' }}>🏆</span>
          <div>
            <div style={{ fontSize: '0.95rem', fontWeight: '800', color: 'var(--text-primary)', lineHeight: 1.2 }}>
              {type === 'exam' ? '3 Dk Sınav Şampiyonları' : 'Haftanın En Hızlıları'}
            </div>
            <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
              {type === 'exam' ? 'En Çok Doğru Kelime Yazanlar' : 'En Yüksek DBK Hızları'}
            </div>
          </div>
        </div>

        {/* Mini Toggle */}
        <div style={{
          display: 'inline-flex',
          background: 'var(--bg-glass)',
          borderRadius: '8px',
          padding: '2px',
          border: '1px solid var(--border-medium)'
        }}>
          <button
            onClick={() => setType('exam')}
            style={{
              padding: '0.25rem 0.6rem',
              borderRadius: '6px',
              border: 'none',
              cursor: 'pointer',
              fontWeight: '700',
              fontSize: '0.72rem',
              background: type === 'exam' ? 'var(--accent-color)' : 'transparent',
              color: type === 'exam' ? '#121214' : 'var(--text-secondary)',
              transition: 'all 0.15s'
            }}
          >
            ⚖️ 3 Dk
          </button>
          <button
            onClick={() => setType('speed')}
            style={{
              padding: '0.25rem 0.6rem',
              borderRadius: '6px',
              border: 'none',
              cursor: 'pointer',
              fontWeight: '700',
              fontSize: '0.72rem',
              background: type === 'speed' ? 'var(--accent-color)' : 'transparent',
              color: type === 'speed' ? '#121214' : 'var(--text-secondary)',
              transition: 'all 0.15s'
            }}
          >
            ⚡ Hız
          </button>
        </div>
      </div>

      {loading ? (
        <div style={{ textAlign: 'center', padding: '3rem 0', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
          Sıralama yükleniyor...
        </div>
      ) : leaders.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '2rem 1rem', background: 'var(--bg-glass)', borderRadius: '14px', border: '1px dashed var(--border-medium)' }}>
          <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>{type === 'exam' ? '⚖️' : '🥇'}</div>
          <div style={{ fontWeight: '700', color: 'var(--text-primary)', fontSize: '0.95rem', marginBottom: '0.25rem' }}>
            {type === 'exam' ? '3 Dk Sınavına Gir, Zirveye Yerleş!' : 'İlk Şampiyon Sen Ol!'}
          </div>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.82rem', margin: 0 }}>
            {type === 'exam' ? '3 dakikalık zabıt katipliği sınavını tamamla, doğru kelimelerinle podyuma çık.' : 'Hemen bir pratik tamamla, liderlik tablosuna adını yazdır.'}
          </p>
        </div>
      ) : (
        <>
          {/* PODIUM TOP 3 */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1.15fr 1fr',
            gap: '0.6rem',
            alignItems: 'end',
            marginBottom: '1.25rem',
            paddingTop: '0.5rem'
          }}>
            {/* 2nd Place */}
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              padding: '1rem 0.4rem',
              borderRadius: '14px',
              background: 'var(--bg-glass)',
              border: '1px solid rgba(161, 161, 170, 0.2)',
              textAlign: 'center',
            }}>
              <div style={{ fontSize: '1.5rem', marginBottom: '0.25rem' }}>🥈</div>
              <div style={{
                width: '38px', height: '38px', borderRadius: '50%',
                background: 'rgba(161, 161, 170, 0.15)',
                border: '2px solid #a1a1aa',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontWeight: '800', color: '#a1a1aa', fontSize: '0.9rem', marginBottom: '0.4rem'
              }}>
                {top2 ? top2.firstName[0]?.toUpperCase() : '-'}
              </div>
              <div style={{ fontSize: '0.82rem', fontWeight: '700', color: 'var(--text-primary)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '85px' }}>
                {top2 ? `${top2.firstName} ${top2.lastName}.` : 'Bekleniyor'}
              </div>
              <div style={{ fontSize: '0.95rem', fontWeight: '800', color: '#a1a1aa', marginTop: '0.2rem' }}>
                {top2 ? (type === 'exam' ? `${top2.bestCorrectWords} Kelime` : `${top2.bestWpm} DBK`) : '-'}
              </div>
            </div>

            {/* 1st Place (Champion) */}
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              padding: '1.25rem 0.4rem',
              borderRadius: '16px',
              background: 'linear-gradient(180deg, rgba(245, 158, 11, 0.15), rgba(245, 158, 11, 0.05))',
              border: '2px solid var(--accent-color)',
              boxShadow: '0 0 25px rgba(245, 158, 11, 0.2)',
              textAlign: 'center',
              position: 'relative',
              transform: 'translateY(-6px)'
            }}>
              <div style={{
                position: 'absolute',
                top: '-12px',
                background: 'var(--accent-color)',
                color: '#121214',
                fontSize: '0.65rem',
                fontWeight: '900',
                padding: '0.15rem 0.5rem',
                borderRadius: '999px',
                letterSpacing: '0.5px'
              }}>
                ZİRVE
              </div>
              <div style={{ fontSize: '1.85rem', marginBottom: '0.2rem' }}>🥇</div>
              <div style={{
                width: '44px', height: '44px', borderRadius: '50%',
                background: 'linear-gradient(135deg, #f59e0b, #ea580c)',
                border: '2px solid #fff',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontWeight: '900', color: '#121214', fontSize: '1.05rem', marginBottom: '0.4rem',
                boxShadow: '0 4px 12px rgba(245, 158, 11, 0.4)'
              }}>
                {top1 ? top1.firstName[0]?.toUpperCase() : '-'}
              </div>
              <div style={{ fontSize: '0.9rem', fontWeight: '800', color: 'var(--text-primary)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '100px' }}>
                {top1 ? `${top1.firstName} ${top1.lastName}.` : 'Bekleniyor'}
              </div>
              <div style={{ fontSize: '1.15rem', fontWeight: '900', color: 'var(--accent-color)', marginTop: '0.2rem' }}>
                {top1 ? (type === 'exam' ? `${top1.bestCorrectWords} Kelime` : `${top1.bestWpm} DBK`) : '-'}
              </div>
              {top1 && (
                <div style={{ fontSize: '0.7rem', color: 'var(--text-secondary)', marginTop: '0.1rem' }}>
                  {top1.totalTests} {type === 'exam' ? 'sınav' : 'pratik'}
                </div>
              )}
            </div>

            {/* 3rd Place */}
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              padding: '1rem 0.4rem',
              borderRadius: '14px',
              background: 'var(--bg-glass)',
              border: '1px solid rgba(205, 127, 50, 0.25)',
              textAlign: 'center',
            }}>
              <div style={{ fontSize: '1.5rem', marginBottom: '0.25rem' }}>🥉</div>
              <div style={{
                width: '38px', height: '38px', borderRadius: '50%',
                background: 'rgba(205, 127, 50, 0.15)',
                border: '2px solid #cd7f32',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontWeight: '800', color: '#cd7f32', fontSize: '0.9rem', marginBottom: '0.4rem'
              }}>
                {top3 ? top3.firstName[0]?.toUpperCase() : '-'}
              </div>
              <div style={{ fontSize: '0.82rem', fontWeight: '700', color: 'var(--text-primary)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '85px' }}>
                {top3 ? `${top3.firstName} ${top3.lastName}.` : 'Bekleniyor'}
              </div>
              <div style={{ fontSize: '0.95rem', fontWeight: '800', color: '#cd7f32', marginTop: '0.2rem' }}>
                {top3 ? (type === 'exam' ? `${top3.bestCorrectWords} Kelime` : `${top3.bestWpm} DBK`) : '-'}
              </div>
            </div>
          </div>

          {/* Mini 4th & 5th runners up */}
          {leaders.slice(3, 5).length > 0 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', borderTop: '1px solid var(--border-subtle)', paddingTop: '0.75rem' }}>
              {leaders.slice(3, 5).map(user => (
                <div key={user.rank} style={{
                  display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                  padding: '0.35rem 0.6rem', borderRadius: '8px', background: 'var(--bg-glass)',
                  fontSize: '0.82rem'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span style={{ fontWeight: '700', color: 'var(--text-muted)', width: '18px' }}>#{user.rank}</span>
                    <span style={{ fontWeight: '600', color: 'var(--text-primary)' }}>{user.firstName} {user.lastName}.</span>
                  </div>
                  <span style={{ fontWeight: '700', color: 'var(--accent-color)' }}>
                    {type === 'exam' ? `${user.bestCorrectWords} Kelime` : `${user.bestWpm} DBK`}
                  </span>
                </div>
              ))}
            </div>
          )}

          {/* Action Link to Full Leaderboard */}
          <div style={{ marginTop: '1rem', textAlign: 'center' }}>
            <a
              href="#liderlik-tablosu"
              style={{
                fontSize: '0.8rem',
                fontWeight: '700',
                color: 'var(--accent-color)',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.3rem',
                textDecoration: 'none'
              }}
            >
              Tüm Liderlik Tablosunu Gör ({leaders.length} Aday) ↓
            </a>
          </div>
        </>
      )}
    </div>
  );
}
