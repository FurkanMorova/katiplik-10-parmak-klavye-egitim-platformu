"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Giriş yapılamadı.');
      }

      const data = await res.json();
      
      if (data.user.role === 'ADMIN') {
        router.push('/admin');
      } else {
        router.push('/');
        setTimeout(() => window.location.reload(), 500); // Zorunlu header refresh
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="container" style={{ padding: '4rem 1.5rem', display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '75vh' }}>
      <div className="glass-panel" style={{ padding: '3rem 2.5rem', borderRadius: '24px', width: '100%', maxWidth: '420px', background: 'var(--bg-secondary)', border: '1px solid var(--border-medium)', boxShadow: 'var(--shadow-lg)' }}>
        
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
            🔐
          </div>
          <h1 style={{ fontSize: '2.2rem', fontWeight: '800', marginBottom: '0.5rem', color: 'var(--text-primary)', letterSpacing: '-0.5px' }}>
            Giriş Yap
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
            Öğrenci veya Yönetici hesabınızla giriş yapın.
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

        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
            <label htmlFor="username" style={{ color: 'var(--text-primary)', fontWeight: '600', fontSize: '0.88rem' }}>Kullanıcı Adı</label>
            <input 
              type="text" 
              id="username" 
              value={username}
              onChange={e => setUsername(e.target.value)}
              placeholder="kullanici.adi" 
              required
              style={inputStyle} 
            />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
            <label htmlFor="password" style={{ color: 'var(--text-primary)', fontWeight: '600', fontSize: '0.88rem' }}>Şifre</label>
            <input 
              type="password" 
              id="password" 
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="••••••••" 
              required
              style={inputStyle} 
            />
          </div>

          <button type="submit" disabled={loading} style={{
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
          }}>
            {loading ? 'Giriş Yapılıyor...' : 'Giriş Yap'}
          </button>
        </form>

        <div style={{ marginTop: '1.75rem', textAlign: 'center', borderTop: '1px solid var(--border-subtle)', paddingTop: '1.25rem' }}>
          <span style={{ color: 'var(--text-secondary)', fontSize: '0.92rem' }}>
            Hesabınız yok mu?{' '}
          </span>
          <a href="/register" style={{ color: 'var(--accent-color)', fontWeight: '700', fontSize: '0.92rem' }}>
            Hemen Kayıt Ol
          </a>
        </div>

      </div>
    </main>
  );
}

const inputStyle: React.CSSProperties = {
  padding: '0.85rem 1rem',
  borderRadius: '10px',
  border: '1px solid var(--border-medium)',
  background: 'var(--bg-glass)',
  color: 'var(--text-primary)',
  fontSize: '0.95rem',
  outline: 'none',
};
