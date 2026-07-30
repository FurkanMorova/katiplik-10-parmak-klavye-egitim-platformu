"use client";

import { useEffect, useState } from 'react';

export default function ThemeToggle() {
  const [isLight, setIsLight] = useState(false);

  useEffect(() => {
    if (document.documentElement.classList.contains('light-mode')) {
      setIsLight(true);
    }
  }, []);

  const toggleTheme = () => {
    const root = document.documentElement;
    if (root.classList.contains('light-mode')) {
      root.classList.remove('light-mode');
      localStorage.setItem('theme', 'dark');
      setIsLight(false);
    } else {
      root.classList.add('light-mode');
      localStorage.setItem('theme', 'light');
      setIsLight(true);
    }
  };

  return (
    <button 
      onClick={toggleTheme}
      style={{
        background: 'rgba(100, 100, 100, 0.1)',
        border: '1px solid var(--border-subtle)',
        color: 'var(--text-primary)',
        borderRadius: '50%',
        width: '36px',
        height: '36px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        transition: 'all 0.2s',
        fontSize: '1.2rem',
      }}
      title="Temayı Değiştir"
    >
      {isLight ? '🌙' : '☀️'}
    </button>
  );
}
