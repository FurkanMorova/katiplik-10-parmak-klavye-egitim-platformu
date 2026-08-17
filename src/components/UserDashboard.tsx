"use client";

import { useState, useEffect } from 'react';
import { useGlobalStats } from '../lib/firebaseStats';

export default function UserDashboard() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const globalStats = useGlobalStats();

  if (!isMounted) return null;

  return (
    <div style={{ marginBottom: '3rem' }}>
      {/* Global Platform Stats */}
      <div className="glass-panel" style={{
        padding: '1.25rem 2rem',
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'center',
        background: 'rgba(34, 211, 165, 0.04)',
        border: '1px solid rgba(34, 211, 165, 0.15)'
      }}>
        {[
          { label: 'Bugün Çözülen', value: globalStats ? globalStats.today.toLocaleString() : '…', color: 'var(--success)' },
          { label: 'Bu Ay Çözülen', value: globalStats ? globalStats.thisMonth.toLocaleString() : '…', color: 'var(--success)' },
          { label: 'Toplam Egzersiz', value: globalStats ? globalStats.total.toLocaleString() : '…', color: 'var(--text-primary)' },
        ].map((item, i, arr) => (
          <div key={item.label} style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1.5px', marginBottom: '0.25rem' }}>{item.label}</div>
              <div style={{ fontSize: '1.5rem', fontWeight: '800', color: item.color }}>{item.value}</div>
            </div>
            {i < arr.length - 1 && <div style={{ width: '1px', background: 'var(--border-subtle)', height: '36px' }} />}
          </div>
        ))}
      </div>
    </div>
  );
}

