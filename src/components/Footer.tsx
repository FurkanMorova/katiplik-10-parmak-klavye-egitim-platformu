"use client";

import Link from 'next/link';

const footerLinks = {
  platform: [
    { label: 'F Klavye Dersleri', href: '/#egitimler' },
    { label: 'Q Klavye Dersleri', href: '/#egitimler' },
    { label: 'Katiplik Sınavı Modu', href: '/' },
    { label: 'Nasıl Çalışılır?', href: '/nasil-calisir' },
    { label: 'Blog & Tüyolar', href: '/blog' },
  ],
  kurumsal: [
    { label: 'Hakkımızda', href: '/hakkimizda' },
    { label: 'İletişim', href: '/iletisim' },
    { label: 'Gizlilik Politikası', href: '/gizlilik-politikasi' },
    { label: 'Kullanım Koşulları', href: '/kullanim-kosullari' },
  ],
};

export default function Footer() {
  return (
    <footer style={{
      borderTop: '1px solid var(--border-subtle)',
      background: 'var(--header-bg)',
      backdropFilter: 'blur(20px)',
      padding: '4rem 0 2rem',
      marginTop: 'auto',
      position: 'relative',
      zIndex: 1,
    }}>
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', gap: '3rem', marginBottom: '4rem' }}>

          {/* Marka */}
          <div>
            <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', textDecoration: 'none', marginBottom: '1.25rem' }}>
              <div style={{
                background: 'linear-gradient(135deg, #4f8ef7, #7c55f7)',
                color: '#fff',
                width: '40px',
                height: '40px',
                borderRadius: '10px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: '900',
                fontSize: '1rem',
                boxShadow: '0 4px 15px rgba(79, 142, 247, 0.4)',
                flexShrink: 0,
              }}>10</div>
              <div>
                <div style={{ fontWeight: '800', fontSize: '1.1rem', color: 'var(--text-primary)' }}>
                  Parmak<span style={{ color: 'var(--accent-color)' }}>Akademi</span>
                </div>
                <div style={{ fontSize: '0.65rem', color: 'var(--text-muted)', letterSpacing: '1px' }}>KLAVYE EĞİTİM PLATFORMU</div>
              </div>
            </Link>
            <p style={{ color: 'var(--text-secondary)', lineHeight: '1.75', fontSize: '0.9rem', maxWidth: '320px' }}>
              Bilimsel rastgele metin algoritması, Katiplik Sınavı simülasyonu ve gerçek zamanlı istatistiklerle Türkiye'nin en gelişmiş ücretsiz 10 parmak klavye eğitim platformu.
            </p>
            <div style={{ marginTop: '1.5rem', display: 'flex', gap: '0.5rem' }}>
              {['Ücretsiz', 'Reklamsız', 'Kayıt Gereksiz'].map(tag => (
                <span key={tag} style={{ fontSize: '0.7rem', padding: '0.2rem 0.6rem', background: 'rgba(79,142,247,0.1)', color: 'var(--accent-color)', border: '1px solid rgba(79,142,247,0.2)', borderRadius: '99px', fontWeight: '600' }}>{tag}</span>
              ))}
            </div>
          </div>

          {/* Platform */}
          <div>
            <h4 style={{ color: 'var(--text-primary)', marginBottom: '1.5rem', fontSize: '0.85rem', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '1px' }}>Platform</h4>
            <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '0.9rem' }}>
              {footerLinks.platform.map(l => (
                <li key={l.label}>
                  <Link
                    href={l.href}
                    style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', transition: 'color 0.2s' }}
                    onMouseEnter={e => e.currentTarget.style.color = 'var(--accent-color)'}
                    onMouseLeave={e => e.currentTarget.style.color = 'var(--text-secondary)'}
                  >{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Kurumsal */}
          <div>
            <h4 style={{ color: 'var(--text-primary)', marginBottom: '1.5rem', fontSize: '0.85rem', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '1px' }}>Kurumsal</h4>
            <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '0.9rem' }}>
              {footerLinks.kurumsal.map(l => (
                <li key={l.label}>
                  <Link
                    href={l.href}
                    style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', transition: 'color 0.2s' }}
                    onMouseEnter={e => e.currentTarget.style.color = 'var(--accent-color)'}
                    onMouseLeave={e => e.currentTarget.style.color = 'var(--text-secondary)'}
                  >{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Alt Bant */}
        <div style={{
          paddingTop: '2rem',
          borderTop: '1px solid var(--border-subtle)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1rem',
          color: 'var(--text-muted)',
          fontSize: '0.8rem',
        }}>
          <p>© {new Date().getFullYear()} M. Furkan Morova · ParmakAkademi. Tüm hakları saklıdır.</p>
          <p>Zabıt Katipliği ve İcra Katipliği sınavlarına en iyi hazırlık platformu</p>
        </div>
      </div>
    </footer>
  );
}
