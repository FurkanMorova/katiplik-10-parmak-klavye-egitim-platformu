"use client";

import { useEffect, useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { lessons } from '@/data/lessons';

interface LessonResult {
  id: string;
  lessonId: string;
  wpm: number;
  errors: number;
  timeSeconds: number;
  accuracy: number;
  createdAt: string;
}

export default function ProfilPage() {
  const router = useRouter();
  const [results, setResults] = useState<LessonResult[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedLessonId, setSelectedLessonId] = useState<string>('all');

  useEffect(() => {
    fetch('/api/stats/user')
      .then(res => {
        if (!res.ok) {
          if (res.status === 401) {
            router.push('/login');
            throw new Error('Unauthorized');
          }
          throw new Error('Veriler getirilemedi');
        }
        return res.json();
      })
      .then(data => {
        setResults(data);
        setLoading(false);
        if (data.length > 0) {
          // Set first available lesson as default if 'all' is not desired, 
          // but 'all' might be good to show summary. Let's default to the most recent lesson.
          setSelectedLessonId(data[0].lessonId);
        }
      })
      .catch(err => {
        if (err.message !== 'Unauthorized') {
          setError(err.message);
          setLoading(false);
        }
      });
  }, [router]);

  // Gruplama ve istatistik hesaplama
  const groupedData = useMemo(() => {
    if (!results.length) return [];
    
    const filtered = selectedLessonId === 'all' 
      ? results 
      : results.filter(r => r.lessonId === selectedLessonId);

    const groups: Record<string, LessonResult[]> = {};
    
    filtered.forEach(result => {
      // Sadece tarih kısmını al (DD.MM.YYYY)
      const dateStr = new Date(result.createdAt).toLocaleDateString('tr-TR');
      if (!groups[dateStr]) groups[dateStr] = [];
      groups[dateStr].push(result);
    });

    // Grupları diziye çevir ve hesapla
    const summary = Object.keys(groups).map(dateStr => {
      const dayResults = groups[dateStr];
      const playCount = dayResults.length;
      const avgWpm = Math.round(dayResults.reduce((acc, r) => acc + r.wpm, 0) / playCount);
      const avgErrors = Math.round(dayResults.reduce((acc, r) => acc + r.errors, 0) / playCount * 10) / 10;
      const avgAccuracy = Math.round(dayResults.reduce((acc, r) => acc + r.accuracy, 0) / playCount * 10) / 10;
      const totalSeconds = dayResults.reduce((acc, r) => acc + r.timeSeconds, 0);

      return {
        dateStr,
        playCount,
        avgWpm,
        avgErrors,
        avgAccuracy,
        totalMinutes: Math.round(totalSeconds / 60)
      };
    });

    // Tarihe göre sırala (en yeni en üstte)
    return summary.sort((a, b) => {
      const [d1, m1, y1] = a.dateStr.split('.').map(Number);
      const [d2, m2, y2] = b.dateStr.split('.').map(Number);
      return new Date(y2, m2 - 1, d2).getTime() - new Date(y1, m1 - 1, d1).getTime();
    });
  }, [results, selectedLessonId]);

  const uniqueLessonIds = useMemo(() => {
    return Array.from(new Set(results.map(r => r.lessonId)));
  }, [results]);

  if (loading) {
    return <div className="container" style={{ padding: '6rem 1.5rem', textAlign: 'center' }}>Yükleniyor...</div>;
  }

  if (error) {
    return <div className="container" style={{ padding: '6rem 1.5rem', textAlign: 'center', color: 'var(--error)' }}>{error}</div>;
  }

  const getLessonName = (id: string) => {
    if (id.startsWith('exam-')) return 'Sınav Metni';
    const lesson = lessons.find(l => l.id === id);
    return lesson ? lesson.title : id;
  };

  return (
    <main className="container" style={{ padding: '4rem 1.5rem 6rem', minHeight: '80vh' }}>
      <div className="animate-fade-in-up">
        <h1 style={{ fontSize: '2.5rem', fontWeight: '800', marginBottom: '1rem', color: 'var(--text-primary)' }}>
          Gelişim <span style={{ color: 'var(--accent-color)' }}>İstatistiklerim</span>
        </h1>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '3rem', fontSize: '1.1rem' }}>
          Çalıştığınız derslerdeki gün gün ilerlemenizi buradan takip edebilirsiniz.
        </p>

        {results.length === 0 ? (
          <div className="glass-panel" style={{ padding: '3rem', textAlign: 'center' }}>
            <span style={{ fontSize: '3rem' }}>📭</span>
            <h3 style={{ marginTop: '1rem', marginBottom: '0.5rem', color: 'var(--text-primary)' }}>Henüz Veri Yok</h3>
            <p style={{ color: 'var(--text-secondary)' }}>İstatistiklerinizin oluşması için eğitimlere veya sınav moduna katılın.</p>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            
            {/* Filtre */}
            <div className="glass-panel" style={{ padding: '1.5rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <strong style={{ color: 'var(--text-primary)' }}>Ders Seçin: </strong>
              <select 
                value={selectedLessonId} 
                onChange={e => setSelectedLessonId(e.target.value)}
                style={{
                  padding: '0.5rem 1rem',
                  borderRadius: '8px',
                  background: 'var(--bg-secondary)',
                  color: 'var(--text-primary)',
                  border: '1px solid var(--border-medium)',
                  outline: 'none',
                  fontSize: '1rem',
                  cursor: 'pointer',
                  minWidth: '250px'
                }}
              >
                <option value="all">Tüm Çalışmalar (Genel)</option>
                {uniqueLessonIds.map(id => (
                  <option key={id} value={id}>{getLessonName(id)}</option>
                ))}
              </select>
            </div>

            {/* İstatistik Kartları */}
            <div style={{ display: 'grid', gap: '1.25rem', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))' }}>
              {groupedData.map((day, index) => (
                <div key={day.dateStr} className="glass-panel" style={{ 
                  padding: '2rem', 
                  borderLeft: index === 0 ? '4px solid var(--accent-color)' : '4px solid var(--border-medium)',
                  transition: 'all 0.2s',
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                    <h3 style={{ fontSize: '1.25rem', fontWeight: '700', color: 'var(--text-primary)', margin: 0 }}>
                      📅 {day.dateStr}
                    </h3>
                    <span className="badge badge-blue">{day.playCount} Tekrar</span>
                  </div>
                  
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                    <div>
                      <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '0.25rem' }}>Ort. Hız</div>
                      <div style={{ fontSize: '1.5rem', fontWeight: '800', color: 'var(--success)' }}>{day.avgWpm} <span style={{fontSize: '0.9rem', fontWeight: '600'}}>DBK</span></div>
                    </div>
                    <div>
                      <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '0.25rem' }}>Doğruluk</div>
                      <div style={{ fontSize: '1.5rem', fontWeight: '800', color: 'var(--accent-color)' }}>%{day.avgAccuracy}</div>
                    </div>
                    <div>
                      <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '0.25rem' }}>Ort. Hata</div>
                      <div style={{ fontSize: '1.5rem', fontWeight: '800', color: 'var(--error)' }}>{day.avgErrors}</div>
                    </div>
                    <div>
                      <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '0.25rem' }}>Pratik Süresi</div>
                      <div style={{ fontSize: '1.5rem', fontWeight: '800', color: 'var(--text-primary)' }}>{day.totalMinutes} <span style={{fontSize: '0.9rem', fontWeight: '600'}}>dk</span></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

          </div>
        )}
      </div>
    </main>
  );
}
