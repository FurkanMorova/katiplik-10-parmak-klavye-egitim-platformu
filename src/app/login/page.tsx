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
    <main className="container" style={{ padding: '4rem 1.5rem', display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
      <div className="glass-panel" style={{ padding: '3rem', borderRadius: '24px', width: '100%', maxWidth: '400px' }}>
        <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem', color: 'var(--accent-color)', textAlign: 'center' }}>Giriş Yap</h1>
        <p style={{ color: 'var(--text-secondary)', textAlign: 'center', marginBottom: '2rem' }}>
          Öğrenci veya Yönetici hesabınızla giriş yapın.
        </p>

        {error && (
          <div style={{ background: 'var(--error-bg)', color: 'var(--error)', padding: '1rem', borderRadius: '8px', marginBottom: '1.5rem', textAlign: 'center' }}>
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <label htmlFor="username" style={{ color: 'var(--text-primary)', fontWeight: '500' }}>Kullanıcı Adı</label>
            <input 
              type="text" 
              id="username" 
              value={username}
              onChange={e => setUsername(e.target.value)}
              placeholder="kullanici.adi" 
              required
              style={{
                padding: '1rem',
                borderRadius: '8px',
                border: '1px solid var(--border-medium)',
                background: 'var(--bg-glass)',
                color: 'var(--text-primary)',
                fontSize: '1rem'
              }} 
            />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <label htmlFor="password" style={{ color: 'var(--text-primary)', fontWeight: '500' }}>Şifre</label>
            <input 
              type="password" 
              id="password" 
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="••••••••" 
              required
              style={{
                padding: '1rem',
                borderRadius: '8px',
                border: '1px solid var(--border-medium)',
                background: 'var(--bg-glass)',
                color: 'var(--text-primary)',
                fontSize: '1rem'
              }} 
            />
          </div>

          <button type="submit" disabled={loading} style={{
            padding: '1rem',
            background: 'var(--accent-color)',
            color: '#fff',
            border: 'none',
            borderRadius: '8px',
            fontSize: '1.1rem',
            fontWeight: 'bold',
            cursor: loading ? 'not-allowed' : 'pointer',
            opacity: loading ? 0.7 : 1,
            boxShadow: '0 4px 15px var(--accent-glow)',
            marginTop: '1rem'
          }}>
            {loading ? 'Giriş Yapılıyor...' : 'Giriş Yap'}
          </button>
        </form>
      </div>
    </main>
  );
}
