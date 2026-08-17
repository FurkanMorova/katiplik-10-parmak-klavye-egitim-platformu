"use client";

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import ThemeToggle from './ThemeToggle';
import { useGamification } from '../utils/useGamification';

export default function Header() {
  const [authState, setAuthState] = useState<{ authenticated: boolean; user?: any }>({ authenticated: false });
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const { effectiveStreak, levelInfo, data } = useGamification();

  useEffect(() => {
    fetch('/api/auth/me')
      .then(res => res.json())
      .then(data => setAuthState(data))
      .catch(() => setAuthState({ authenticated: false }));

    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    window.location.reload();
  };

  const navLinkStyle = (href: string) => ({
    color: pathname === href ? 'var(--accent-color)' : 'var(--text-secondary)',
    fontWeight: '500' as const,
    fontSize: '0.9rem',
    transition: 'color 0.2s',
    padding: '0.25rem 0',
    borderBottom: pathname === href ? '2px solid var(--accent-color)' : '2px solid transparent',
  });

  return (
    <header style={{
      position: 'sticky',
      top: 0,
      zIndex: 100,
      background: scrolled ? 'var(--header-bg-scrolled)' : 'var(--header-bg)',
      backdropFilter: 'blur(20px)',
      WebkitBackdropFilter: 'blur(20px)',
      borderBottom: scrolled ? '1px solid var(--border-subtle)' : '1px solid transparent',
      padding: '0.85rem 0',
      transition: 'all 0.3s ease',
    }}>
      <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', textDecoration: 'none' }}>
          <div style={{
            background: 'linear-gradient(135deg, #f59e0b, #ea580c)',
            color: '#121214',
            width: '38px',
            height: '38px',
            borderRadius: '10px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: '900',
            fontSize: '1.05rem',
            boxShadow: '0 4px 15px rgba(245, 158, 11, 0.35)',
            flexShrink: 0,
          }}>10</div>
          <div>
            <div style={{ fontWeight: '800', fontSize: '1.1rem', color: 'var(--text-primary)', letterSpacing: '-0.3px', lineHeight: 1 }}>
              Parmak<span style={{ color: 'var(--accent-color)' }}>Akademi</span>
            </div>
            <div style={{ fontSize: '0.65rem', color: 'var(--text-muted)', letterSpacing: '1px', lineHeight: 1, marginTop: '2px' }}>
              KLAVYE EĞİTİM PLATFORMU
            </div>
          </div>
        </Link>

        <nav style={{ display: 'flex', gap: '1.75rem', alignItems: 'center' }}>
          <Link
            href="/hakkimizda"
            style={navLinkStyle('/hakkimizda')}
            onMouseEnter={e => { if (pathname !== '/hakkimizda') e.currentTarget.style.color = 'var(--text-primary)'; }}
            onMouseLeave={e => { if (pathname !== '/hakkimizda') e.currentTarget.style.color = 'var(--text-secondary)'; }}
          >Hakkımızda</Link>
          <Link
            href="/iletisim"
            style={navLinkStyle('/iletisim')}
            onMouseEnter={e => { if (pathname !== '/iletisim') e.currentTarget.style.color = 'var(--text-primary)'; }}
            onMouseLeave={e => { if (pathname !== '/iletisim') e.currentTarget.style.color = 'var(--text-secondary)'; }}
          >İletişim</Link>
          <Link
            href="/blog"
            style={navLinkStyle('/blog')}
            onMouseEnter={e => { if (pathname !== '/blog') e.currentTarget.style.color = 'var(--text-primary)'; }}
            onMouseLeave={e => { if (pathname !== '/blog') e.currentTarget.style.color = 'var(--text-secondary)'; }}
          >Blog</Link>

          {/* Gamification badges */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            {effectiveStreak > 0 && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', fontSize: '0.85rem', fontWeight: '700', color: '#f97316' }} title={`${effectiveStreak} günlük seri`}>
                <span style={{ animation: 'fireFlicker 1.5s ease-in-out infinite' }}>🔥</span>
                {effectiveStreak}
              </div>
            )}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.15rem' }} title={`Seviye ${levelInfo.level} — ${levelInfo.title} (${data.totalXP} XP)`}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', fontSize: '0.78rem', fontWeight: '700', color: levelInfo.color }}>
                <span>{levelInfo.emoji}</span>
                <span>Lv.{levelInfo.level}</span>
              </div>
              <div className="xp-bar-container" style={{ width: '42px' }}>
                <div className="xp-bar-fill" style={{ width: `${levelInfo.progress}%` }} />
              </div>
            </div>
          </div>

          <ThemeToggle />

          {authState.authenticated ? (
            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
              {authState.user?.role === 'ADMIN' && (
                <Link href="/admin" style={{
                  color: 'var(--success)',
                  fontWeight: '600',
                  fontSize: '0.9rem',
                  background: 'rgba(34, 211, 165, 0.08)',
                  padding: '0.4rem 0.9rem',
                  borderRadius: '8px',
                  border: '1px solid rgba(34, 211, 165, 0.2)',
                }}>⚙ Yönetici</Link>
              )}
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
                <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: 'var(--accent-color)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.75rem', fontWeight: '700', color: '#fff' }}>
                  {authState.user?.firstName?.[0]?.toUpperCase()}
                </div>
                {authState.user?.firstName}
              </div>
              <Link href="/profil" style={{
                color: 'var(--text-primary)',
                fontWeight: '600',
                fontSize: '0.9rem',
                background: 'var(--bg-glass)',
                padding: '0.35rem 0.9rem',
                borderRadius: '8px',
                border: '1px solid var(--border-subtle)',
                transition: 'all 0.2s'
              }}
              onMouseEnter={e => { e.currentTarget.style.background = 'var(--bg-glass-hover)'; e.currentTarget.style.borderColor = 'var(--border-medium)'; }}
              onMouseLeave={e => { e.currentTarget.style.background = 'var(--bg-glass)'; e.currentTarget.style.borderColor = 'var(--border-subtle)'; }}
              >📈 Profilim</Link>
              <button
                onClick={handleLogout}
                style={{ background: 'transparent', border: '1px solid rgba(240, 82, 82, 0.3)', color: 'var(--error)', padding: '0.35rem 0.9rem', borderRadius: '8px', cursor: 'pointer', fontSize: '0.85rem', transition: 'all 0.2s' }}
                onMouseEnter={e => { e.currentTarget.style.background = 'rgba(240,82,82,0.1)'; }}
                onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; }}
              >Çıkış</button>
            </div>
          ) : (
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
              <Link href="/login" style={{
                background: 'var(--bg-glass)',
                color: 'var(--text-primary)',
                border: '1px solid var(--border-medium)',
                padding: '0.45rem 0.95rem',
                borderRadius: '8px',
                fontWeight: '600',
                fontSize: '0.88rem',
                transition: 'all 0.2s',
              }}
              onMouseEnter={e => { e.currentTarget.style.background = 'var(--bg-glass-hover)'; e.currentTarget.style.borderColor = 'var(--accent-color)'; }}
              onMouseLeave={e => { e.currentTarget.style.background = 'var(--bg-glass)'; e.currentTarget.style.borderColor = 'var(--border-medium)'; }}
              >Giriş Yap</Link>
              
              <Link href="/register" style={{
                background: 'var(--accent-color)',
                color: '#121214',
                border: 'none',
                padding: '0.45rem 1rem',
                borderRadius: '8px',
                fontWeight: '700',
                fontSize: '0.88rem',
                boxShadow: 'var(--shadow-accent)',
                transition: 'all 0.2s',
              }}
              onMouseEnter={e => { e.currentTarget.style.opacity = '0.9'; }}
              onMouseLeave={e => { e.currentTarget.style.opacity = '1'; }}
              >Kayıt Ol</Link>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
}
