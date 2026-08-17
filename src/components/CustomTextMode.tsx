"use client";
import { useState } from 'react';

interface CustomTextModeProps {
  onStart: (text: string) => void;
  onBack: () => void;
}

export default function CustomTextMode({ onStart, onBack }: CustomTextModeProps) {
  const [text, setText] = useState('');
  const charCount = text.trim().length;
  const isValid = charCount >= 20 && charCount <= 5000;

  return (
    <div className="animate-fade-in" style={{ maxWidth: '700px', margin: '0 auto' }}>
      <button
        onClick={onBack}
        style={{
          background: 'transparent',
          color: 'var(--text-secondary)',
          border: '1px solid var(--border-medium)',
          padding: '0.5rem 1.25rem',
          borderRadius: '8px',
          cursor: 'pointer',
          marginBottom: '2.5rem',
          fontSize: '0.95rem',
        }}
      >← Ana Sayfaya Dön</button>

      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
        <div style={{
          width: '72px', height: '72px', borderRadius: '50%',
          background: 'rgba(79, 142, 247, 0.12)',
          border: '2px solid rgba(79, 142, 247, 0.3)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          margin: '0 auto 1.5rem',
          fontSize: '2rem',
        }}>📝</div>
        <h2 style={{ fontSize: '2rem', fontWeight: '800', color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
          Kendi Metnini Yaz
        </h2>
        <p style={{ color: 'var(--text-secondary)', fontSize: '1rem' }}>
          Pratik yapmak istediğiniz metni yapıştırın ve başlayın.
        </p>
      </div>

      {/* Textarea */}
      <div style={{ marginBottom: '1.5rem' }}>
        <textarea
          value={text}
          onChange={e => setText(e.target.value)}
          placeholder="Buraya kendi metninizi yapıştırın... (min 20, maks 5000 karakter)"
          style={{
            width: '100%',
            minHeight: '200px',
            padding: '1.25rem',
            borderRadius: '14px',
            background: 'var(--bg-glass)',
            border: '1px solid var(--border-medium)',
            color: 'var(--text-primary)',
            fontSize: '1rem',
            fontFamily: 'var(--font-main)',
            resize: 'vertical',
            lineHeight: '1.7',
            outline: 'none',
            transition: 'border-color 0.2s',
          }}
          onFocus={e => { e.currentTarget.style.borderColor = 'var(--accent-color)'; }}
          onBlur={e => { e.currentTarget.style.borderColor = 'var(--border-medium)'; }}
        />
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          marginTop: '0.5rem',
          fontSize: '0.82rem',
        }}>
          <span style={{
            color: charCount < 20 ? 'var(--error)' : charCount > 5000 ? 'var(--error)' : 'var(--text-muted)',
          }}>
            {charCount < 20 ? `En az 20 karakter gerekli (${20 - charCount} daha)` : charCount > 5000 ? 'Maksimum 5000 karakter!' : '✓ Metin uygun'}
          </span>
          <span style={{ color: 'var(--text-muted)' }}>
            {charCount} / 5000
          </span>
        </div>
      </div>

      {/* Tips */}
      <div style={{
        marginBottom: '2rem',
        padding: '1rem 1.25rem',
        borderRadius: '12px',
        background: 'rgba(79, 142, 247, 0.04)',
        border: '1px solid rgba(79, 142, 247, 0.12)',
        fontSize: '0.85rem',
        color: 'var(--text-secondary)',
        lineHeight: '1.6',
      }}>
        💡 <strong style={{ color: 'var(--text-primary)' }}>İpucu:</strong> Ders notlarınızı, sevdiğiniz bir kitaptan bir paragrafı veya sınav metinlerini buraya yapıştırarak pratik yapabilirsiniz.
      </div>

      {/* Start button */}
      <button
        onClick={() => { if (isValid) onStart(text.trim()); }}
        disabled={!isValid}
        style={{
          width: '100%',
          padding: '1.15rem',
          background: isValid ? 'linear-gradient(135deg, #4f8ef7, #7c55f7)' : 'var(--bg-glass)',
          color: isValid ? '#fff' : 'var(--text-muted)',
          border: isValid ? 'none' : '1px solid var(--border-subtle)',
          borderRadius: '14px',
          fontSize: '1.15rem',
          fontWeight: '700',
          cursor: isValid ? 'pointer' : 'not-allowed',
          boxShadow: isValid ? '0 8px 30px rgba(79, 142, 247, 0.3)' : 'none',
          transition: 'all 0.2s',
        }}
      >
        {isValid ? 'Pratiğe Başla →' : 'Metin girin...'}
      </button>
    </div>
  );
}
