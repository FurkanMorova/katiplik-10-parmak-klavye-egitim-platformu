"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function Register() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          firstName,
          lastName,
          username,
          password
        })
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Kayıt oluşturulamadı.');
      }

      // Kayıt ve giriş başarılı
      router.push('/');
      setTimeout(() => window.location.reload(), 500);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="container" style={{ padding: '4rem 1.5rem', display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '75vh' }}>
      <div className="glass-panel" style={{ padding: '3rem 2.5rem', borderRadius: '24px', width: '100%', maxWidth: '440px', background: 'var(--bg-secondary)', border: '1px solid var(--border-medium)', boxShadow: 'var(--shadow-lg)' }}>
        
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '56px',
            height: '56px',
            borderRadius: '16px',
            background: 'var(--accent-light)',
            color: 'var(--accent-color)',
            fontSize: '1.75rem',
            marginBottom: '1rem',
            border: '1px solid var(--border-subtle)'
          }}>
            ✨
          </div>
          <h1 style={{ fontSize: '2.2rem', fontWeight: '800', marginBottom: '0.5rem', color: 'var(--text-primary)', letterSpacing: '-0.5px' }}>
            Hesap Oluştur
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: '1.5' }}>
            Ücretsiz üye olun, pratiklerinizi kaydedin ve liderlik tablosunda yerinizi alın.
          </p>
        </div>

        {error && (
          <div style={{
            background: 'var(--error-bg)',
            border: '1px solid var(--error)',
            color: 'var(--error)',
            padding: '0.85rem 1rem',
            borderRadius: '10px',
            marginBottom: '1.5rem',
            fontSize: '0.9rem',
            fontWeight: '500',
            textAlign: 'center'
          }}>
            {error}
          </div>
        )}

        <form onSubmit={handleRegister} style={{ display: 'flex', flexDirection: 'column', gap: '1.15rem', width: '100%' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '0.75rem', width: '100%' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', width: '100%' }}>
              <label htmlFor="firstName" style={{ color: 'var(--text-primary)', fontWeight: '600', fontSize: '0.88rem' }}>Adınız</label>
              <input 
                type="text" 
                id="firstName" 
                value={firstName}
                onChange={e => setFirstName(e.target.value)}
                placeholder="Örn: Ahmet" 
                required
                style={inputStyle} 
              />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', width: '100%' }}>
              <label htmlFor="lastName" style={{ color: 'var(--text-primary)', fontWeight: '600', fontSize: '0.88rem' }}>Soyadınız</label>
              <input 
                type="text" 
                id="lastName" 
                value={lastName}
                onChange={e => setLastName(e.target.value)}
                placeholder="Örn: Yılmaz" 
                required
                style={inputStyle} 
              />
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', width: '100%' }}>
            <label htmlFor="username" style={{ color: 'var(--text-primary)', fontWeight: '600', fontSize: '0.88rem' }}>Kullanıcı Adı</label>
            <input 
              type="text" 
              id="username" 
              value={username}
              onChange={e => setUsername(e.target.value.toLowerCase())}
              placeholder="kullanici.adi" 
              required
              minLength={3}
              style={inputStyle} 
            />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', width: '100%' }}>
            <label htmlFor="password" style={{ color: 'var(--text-primary)', fontWeight: '600', fontSize: '0.88rem' }}>Şifre</label>
            <input 
              type="password" 
              id="password" 
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="En az 4 karakter" 
              required
              minLength={4}
              style={inputStyle} 
            />
          </div>

          <button 
            type="submit" 
            disabled={loading} 
            style={{
              width: '100%',
              padding: '0.95rem',
              background: 'var(--accent-color)',
              color: '#121214',
              border: 'none',
              borderRadius: '10px',
              fontSize: '1.05rem',
              fontWeight: '700',
              cursor: loading ? 'not-allowed' : 'pointer',
              opacity: loading ? 0.7 : 1,
              boxShadow: 'var(--shadow-accent)',
              marginTop: '0.5rem',
              transition: 'all 0.2s',
            }}
          >
            {loading ? 'Kayıt Yapılıyor...' : 'Kayıt Ol'}
          </button>
        </form>

        <div style={{ marginTop: '1.75rem', textAlign: 'center', borderTop: '1px solid var(--border-subtle)', paddingTop: '1.25rem' }}>
          <span style={{ color: 'var(--text-secondary)', fontSize: '0.92rem' }}>
            Zaten bir hesabınız var mı?{' '}
          </span>
          <Link href="/login" style={{ color: 'var(--accent-color)', fontWeight: '700', fontSize: '0.92rem' }}>
            Giriş Yap
          </Link>
        </div>

      </div>
    </main>
  );
}

const inputStyle: React.CSSProperties = {
  width: '100%',
  boxSizing: 'border-box',
  padding: '0.85rem 1rem',
  borderRadius: '10px',
  border: '1px solid var(--border-medium)',
  background: 'var(--bg-glass)',
  color: 'var(--text-primary)',
  fontSize: '0.95rem',
  outline: 'none',
  transition: 'border-color 0.2s',
};
