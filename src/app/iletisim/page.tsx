"use client";

import { useState } from 'react';
import Link from 'next/link';

export default function Iletisim() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<{ type: 'success' | 'error' | null; message: string }>({
    type: null,
    message: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setStatus({ type: null, message: '' });

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Mesaj gönderilirken bir hata oluştu.');
      }

      setStatus({
        type: 'success',
        message: '🎉 Mesajınız başarıyla iletildi! En kısa sürede tarafınıza dönüş yapılacaktır.'
      });
      setFormData({ name: '', email: '', message: '' });
    } catch (err: any) {
      setStatus({
        type: 'error',
        message: err.message || 'Mesaj iletilemedi. Lütfen daha sonra tekrar deneyiniz.'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="container" style={{ padding: '4rem 1.5rem 8rem', maxWidth: '880px' }}>
      <div className="glass-panel" style={{ padding: '3.5rem 2.5rem', borderRadius: '24px', background: 'var(--bg-secondary)', border: '1px solid var(--border-medium)' }}>
        
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.35rem 0.9rem',
            borderRadius: '999px',
            background: 'var(--accent-light)',
            border: '1px solid var(--border-medium)',
            marginBottom: '1rem',
          }}>
            <span style={{ fontSize: '0.8rem', color: 'var(--accent-color)', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '1px' }}>
              BİZE ULAŞIN
            </span>
          </div>
          <h1 style={{ fontSize: 'clamp(2rem, 4vw, 2.8rem)', fontWeight: '900', color: 'var(--text-primary)', marginBottom: '0.75rem', letterSpacing: '-1px' }}>
            İletişim & Destek
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', maxWidth: '580px', margin: '0 auto', lineHeight: '1.6' }}>
            Görüş, öneri, teknik destek veya işbirliği talepleriniz için aşağıdaki formu doldurabilirsiniz.
          </p>
        </div>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2.5rem' }}>
          
          {/* Sol Kolon: İletişim Bilgileri Kartı */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div style={{
              background: 'var(--bg-glass)',
              padding: '2rem',
              borderRadius: '18px',
              border: '1px solid var(--border-subtle)',
              display: 'flex',
              flexDirection: 'column',
              gap: '1.25rem',
            }}>
              <h2 style={{ fontSize: '1.25rem', fontWeight: '800', color: 'var(--text-primary)', margin: 0 }}>
                📌 İletişim Bilgileri
              </h2>

              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                <span style={{ fontSize: '1.4rem' }}>✉️</span>
                <div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: '700', textTransform: 'uppercase' }}>E-Posta</div>
                  <div style={{ color: 'var(--text-primary)', fontWeight: '600' }}>info@furkanmorova.com</div>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                <span style={{ fontSize: '1.4rem' }}>👨‍🏫</span>
                <div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: '700', textTransform: 'uppercase' }}>Eğitmen & Geliştirici</div>
                  <div style={{ color: 'var(--text-primary)', fontWeight: '600' }}>M. Furkan Morova</div>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                <span style={{ fontSize: '1.4rem' }}>🏛️</span>
                <div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: '700', textTransform: 'uppercase' }}>Akademi</div>
                  <div style={{ color: 'var(--text-primary)', fontWeight: '600' }}>Başarısoft Bilgi Teknolojileri Akademisi</div>
                </div>
              </div>
            </div>

            <div style={{ padding: '1.5rem', borderRadius: '16px', background: 'var(--accent-light)', border: '1px solid var(--border-medium)' }}>
              <div style={{ fontWeight: '800', color: 'var(--text-primary)', fontSize: '0.95rem', marginBottom: '0.35rem' }}>
                ⚡ Hızlı Yanıt Garantisi
              </div>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', lineHeight: '1.5', margin: 0 }}>
                Gönderdiğiniz tüm formlar doğrudan yetkili e-posta adresimize iletilir ve en geç 24 saat içinde yanıtlanır.
              </p>
            </div>
          </div>

          {/* Sağ Kolon: İletişim Formu */}
          <form style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }} onSubmit={handleSubmit}>
            
            {status.type && (
              <div style={{
                padding: '1rem 1.25rem',
                borderRadius: '12px',
                background: status.type === 'success' ? 'var(--success-bg)' : 'var(--error-bg)',
                border: `1px solid ${status.type === 'success' ? 'var(--success)' : 'var(--error)'}`,
                color: status.type === 'success' ? 'var(--success)' : 'var(--error)',
                fontSize: '0.92rem',
                fontWeight: '600',
                lineHeight: '1.5',
              }}>
                {status.message}
              </div>
            )}

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
              <label htmlFor="name" style={{ color: 'var(--text-primary)', fontWeight: '700', fontSize: '0.9rem' }}>
                Adınız Soyadınız *
              </label>
              <input
                type="text"
                id="name"
                required
                placeholder="Örn: Ahmet Yılmaz"
                value={formData.name}
                onChange={e => setFormData({ ...formData, name: e.target.value })}
                style={{
                  padding: '0.9rem 1.1rem',
                  borderRadius: '10px',
                  border: '1px solid var(--border-medium)',
                  background: 'var(--bg-primary)',
                  color: 'var(--text-primary)',
                  fontSize: '0.95rem',
                  outline: 'none',
                }}
              />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
              <label htmlFor="email" style={{ color: 'var(--text-primary)', fontWeight: '700', fontSize: '0.9rem' }}>
                E-Posta Adresiniz *
              </label>
              <input
                type="email"
                id="email"
                required
                placeholder="Örn: ahmet@mail.com"
                value={formData.email}
                onChange={e => setFormData({ ...formData, email: e.target.value })}
                style={{
                  padding: '0.9rem 1.1rem',
                  borderRadius: '10px',
                  border: '1px solid var(--border-medium)',
                  background: 'var(--bg-primary)',
                  color: 'var(--text-primary)',
                  fontSize: '0.95rem',
                  outline: 'none',
                }}
              />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
              <label htmlFor="message" style={{ color: 'var(--text-primary)', fontWeight: '700', fontSize: '0.9rem' }}>
                Mesajınız *
              </label>
              <textarea
                id="message"
                rows={5}
                required
                placeholder="İletmek istediğiniz mesajınızı veya sorunuzu detaylıca yazabilirsiniz..."
                value={formData.message}
                onChange={e => setFormData({ ...formData, message: e.target.value })}
                style={{
                  padding: '0.9rem 1.1rem',
                  borderRadius: '10px',
                  border: '1px solid var(--border-medium)',
                  background: 'var(--bg-primary)',
                  color: 'var(--text-primary)',
                  fontSize: '0.95rem',
                  outline: 'none',
                  resize: 'vertical',
                  lineHeight: '1.6',
                }}
              ></textarea>
            </div>

            <button
              type="submit"
              disabled={loading}
              style={{
                padding: '1rem',
                background: loading ? 'var(--text-muted)' : 'var(--accent-color)',
                color: '#121214',
                border: 'none',
                borderRadius: '10px',
                fontSize: '1.05rem',
                fontWeight: '900',
                cursor: loading ? 'not-allowed' : 'pointer',
                boxShadow: loading ? 'none' : 'var(--shadow-accent)',
                transition: 'all 0.2s',
                marginTop: '0.5rem',
              }}
            >
              {loading ? '⏳ Gönderiliyor...' : '✉️ Mesajı Gönder'}
            </button>
          </form>

        </div>
      </div>
    </main>
  );
}
