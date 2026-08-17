"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    try {
      const consent = localStorage.getItem('parmak_cookie_consent');
      if (!consent) {
        setIsVisible(true);
      }
    } catch (e) {}
  }, []);

  const handleAccept = () => {
    try {
      localStorage.setItem('parmak_cookie_consent', 'true');
    } catch (e) {}
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div
      style={{
        position: 'fixed',
        bottom: '1.5rem',
        left: '50%',
        transform: 'translateX(-50%)',
        width: 'calc(100% - 3rem)',
        maxWidth: '720px',
        background: 'var(--bg-secondary)',
        border: '1px solid var(--border-medium)',
        boxShadow: 'var(--shadow-lg), 0 10px 30px rgba(0, 0, 0, 0.4)',
        borderRadius: '16px',
        padding: '1.25rem 1.75rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '1rem',
        zIndex: 9999,
        backdropFilter: 'blur(12px)',
      }}
    >
      <div style={{ flex: 1, minWidth: '260px' }}>
        <div style={{ fontWeight: '700', color: 'var(--text-primary)', fontSize: '0.95rem', marginBottom: '0.25rem' }}>
          🍪 Çerez (Cookie) Kullanımı
        </div>
        <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: '1.5' }}>
          Platformumuzda size en iyi deneyimi sunmak, site trafiğini analiz etmek ve uygun içerikleri sunabilmek için çerezler kullanılmaktadır. Detaylar için{' '}
          <Link href="/gizlilik-politikasi" style={{ color: 'var(--accent-color)', textDecoration: 'underline' }}>
            Gizlilik Politikamızı
          </Link>{' '}
          inceleyebilirsiniz.
        </p>
      </div>

      <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
        <button
          onClick={handleAccept}
          style={{
            padding: '0.6rem 1.4rem',
            background: 'var(--accent-color)',
            color: '#121214',
            border: 'none',
            borderRadius: '9px',
            fontSize: '0.88rem',
            fontWeight: '800',
            cursor: 'pointer',
            boxShadow: 'var(--shadow-accent)',
            transition: 'all 0.15s',
          }}
        >
          Anladım ve Kabul Ediyorum
        </button>
      </div>
    </div>
  );
}
