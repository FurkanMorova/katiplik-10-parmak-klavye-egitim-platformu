"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { lessons } from '@/data/lessons';

export default function AdminDashboard() {
  const [students, setStudents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const router = useRouter();

  // Yeni öğrenci formu stateleri
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [createMsg, setCreateMsg] = useState('');

  // Sınav metni stateleri
  const [exams, setExams] = useState<any[]>([]);
  const [examTitle, setExamTitle] = useState('');
  const [examContent, setExamContent] = useState('');
  const [examMsg, setExamMsg] = useState('');

  useEffect(() => {
    fetchStudents();
    fetchExams();
  }, []);

  const fetchExams = async () => {
    const res = await fetch('/api/exams');
    if (res.ok) {
      const data = await res.json();
      setExams(data);
    }
  };

  const fetchStudents = async () => {
    try {
      const res = await fetch('/api/admin/users');
      if (res.status === 401 || res.status === 403) {
        router.push('/login');
        return;
      }
      const data = await res.json();
      setStudents(data);
    } catch (err) {
      setError('Öğrenciler yüklenirken hata oluştu.');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateStudent = async (e: React.FormEvent) => {
    e.preventDefault();
    setCreateMsg('');
    try {
      const res = await fetch('/api/admin/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password, firstName, lastName })
      });
      const data = await res.json();

      if (res.ok) {
        setCreateMsg('Öğrenci başarıyla eklendi!');
        setUsername('');
        setPassword('');
        setFirstName('');
        setLastName('');
        fetchStudents(); // Listeyi yenile
      } else {
        setCreateMsg(data.error || 'Hata oluştu.');
      }
    } catch (err) {
      setCreateMsg('Bağlantı hatası.');
    }
  };

  const handleCreateExam = async (e: React.FormEvent) => {
    e.preventDefault();
    setExamMsg('');
    try {
      const res = await fetch('/api/admin/exams', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: examTitle, content: examContent })
      });
      const data = await res.json();
      if (res.ok) {
        setExamMsg('Metin eklendi!');
        setExamTitle('');
        setExamContent('');
        fetchExams();
      } else {
        setExamMsg(data.error || 'Hata oluştu.');
      }
    } catch (err) {
      setExamMsg('Bağlantı hatası.');
    }
  };

  const handleDeleteExam = async (id: string) => {
    if (!confirm('Bu metni silmek istediğinize emin misiniz?')) return;
    try {
      const res = await fetch(`/api/admin/exams/${id}`, { method: 'DELETE' });
      if (res.ok) fetchExams();
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) return <div style={{ color: 'white', textAlign: 'center', marginTop: '5rem' }}>Yükleniyor...</div>;

  return (
    <main className="container" style={{ padding: '2rem 1.5rem', minHeight: '80vh' }}>
      <h1 style={{ fontSize: '2.5rem', marginBottom: '2rem', color: 'var(--accent-color)' }}>Yönetici Paneli</h1>
      
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '2rem' }}>
        
        {/* Öğrenci Ekleme Formu */}
        <div className="glass-panel" style={{ padding: '2rem', height: 'fit-content' }}>
          <h2 style={{ fontSize: '1.5rem', marginBottom: '1.5rem', color: '#fff' }}>Yeni Öğrenci Ekle</h2>
          <form onSubmit={handleCreateStudent} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <input type="text" placeholder="Ad" value={firstName} onChange={e => setFirstName(e.target.value)} required style={inputStyle} />
            <input type="text" placeholder="Soyad" value={lastName} onChange={e => setLastName(e.target.value)} required style={inputStyle} />
            <input type="text" placeholder="Kullanıcı Adı" value={username} onChange={e => setUsername(e.target.value)} required style={inputStyle} />
            <input type="password" placeholder="Şifre" value={password} onChange={e => setPassword(e.target.value)} required style={inputStyle} />
            
            <button type="submit" style={{
              padding: '1rem',
              background: 'var(--accent-color)',
              color: '#fff',
              border: 'none',
              borderRadius: '8px',
              fontWeight: 'bold',
              cursor: 'pointer'
            }}>Kayıt Et</button>
            {createMsg && <div style={{ marginTop: '0.5rem', color: createMsg.includes('başarıyla') ? 'var(--success)' : 'var(--error)' }}>{createMsg}</div>}
          </form>
        </div>

        {/* Öğrenci Listesi ve İstatistikleri */}
        <div className="glass-panel" style={{ padding: '2rem' }}>
          <h2 style={{ fontSize: '1.5rem', marginBottom: '1.5rem', color: '#fff' }}>Kayıtlı Öğrenciler ve İstatistikler</h2>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {students.length === 0 ? (
              <p style={{ color: 'var(--text-secondary)' }}>Henüz kayıtlı öğrenci yok.</p>
            ) : (
              students.map(st => (
                <div key={st.id} style={{ 
                  background: 'rgba(59, 130, 246, 0.05)', 
                  border: '1px solid rgba(255,255,255,0.05)', 
                  padding: '1.5rem', 
                  borderRadius: '12px' 
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                    <h3 style={{ margin: 0, color: 'var(--text-primary)', fontSize: '1.2rem' }}>{st.firstName} {st.lastName} <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>(@{st.username})</span></h3>
                    <span style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>Katılım: {new Date(st.createdAt).toLocaleDateString('tr-TR')}</span>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '1rem', marginBottom: '1.5rem' }}>
                    <div>
                      <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>TOPLAM TEKRAR</div>
                      <div style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#fff' }}>{st.stats.totalAttempts}</div>
                    </div>
                    <div>
                      <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>ORT. HIZ (DBK)</div>
                      <div style={{ fontSize: '1.2rem', fontWeight: 'bold', color: 'var(--accent-color)' }}>{st.stats.avgWpm}</div>
                    </div>
                    <div>
                      <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>ORT. HATA</div>
                      <div style={{ fontSize: '1.2rem', fontWeight: 'bold', color: 'var(--error)' }}>{st.stats.avgErrors}</div>
                    </div>
                    <div>
                      <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>ORT. SÜRE</div>
                      <div style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#fff' }}>{st.stats.avgTime} sn</div>
                    </div>
                  </div>

                  {/* Ders Bazlı Detaylar */}
                  {st.perLessonStats && st.perLessonStats.length > 0 && (
                    <div style={{ marginTop: '1rem', background: 'rgba(0,0,0,0.2)', borderRadius: '8px', padding: '1rem' }}>
                      <h4 style={{ fontSize: '0.9rem', color: 'var(--text-primary)', marginBottom: '0.75rem', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '0.5rem' }}>Ders Bazlı Detaylar</h4>
                      <div style={{ overflowX: 'auto' }}>
                        <table style={{ width: '100%', fontSize: '0.85rem', color: 'var(--text-secondary)', borderCollapse: 'collapse' }}>
                          <thead>
                            <tr style={{ textAlign: 'left', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                              <th style={{ padding: '0.5rem' }}>Ders Adı</th>
                              <th style={{ padding: '0.5rem' }}>Tekrar</th>
                              <th style={{ padding: '0.5rem' }}>Ort. Hız</th>
                              <th style={{ padding: '0.5rem' }}>Ort. Hata</th>
                              <th style={{ padding: '0.5rem' }}>Ort. Süre</th>
                            </tr>
                          </thead>
                          <tbody>
                            {st.perLessonStats.map((pl: any) => {
                              const lessonInfo = lessons.find(l => l.id === pl.lessonId);
                              return (
                                <tr key={pl.lessonId} style={{ borderBottom: '1px solid rgba(255,255,255,0.03)' }}>
                                  <td style={{ padding: '0.5rem', color: 'var(--text-primary)' }}>
                                    {lessonInfo ? lessonInfo.title : pl.lessonId.toUpperCase()}
                                  </td>
                                  <td style={{ padding: '0.5rem' }}>{pl.count}</td>
                                  <td style={{ padding: '0.5rem', color: 'var(--accent-color)' }}>{pl.avgWpm} DBK</td>
                                  <td style={{ padding: '0.5rem', color: 'var(--error)' }}>{pl.avgErrors}</td>
                                  <td style={{ padding: '0.5rem' }}>{pl.avgTime} sn</td>
                                </tr>
                              );
                            })}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}
                </div>
              ))
            )}
      </div>

      </div>

      </div>

      {/* Sınav Metinleri Yönetimi Bölümü */}
      <div style={{ marginTop: '4rem' }}>
        <h2 style={{ fontSize: '2rem', marginBottom: '2rem', color: 'var(--error)' }}>Katiplik Sınav Metinleri Yönetimi</h2>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '2rem' }}>
          
          <div className="glass-panel" style={{ padding: '2rem', height: 'fit-content' }}>
            <h3 style={{ fontSize: '1.4rem', marginBottom: '1.5rem', color: '#fff' }}>Yeni Metin Ekle</h3>
            <form onSubmit={handleCreateExam} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <input 
                type="text" 
                placeholder="Metin Başlığı" 
                value={examTitle} 
                onChange={e => setExamTitle(e.target.value)} 
                required 
                style={inputStyle} 
              />
              <textarea 
                placeholder="Metin İçeriği" 
                value={examContent} 
                onChange={e => setExamContent(e.target.value)} 
                required 
                rows={10}
                style={{ ...inputStyle, resize: 'vertical' }} 
              />
              <button type="submit" style={{
                padding: '1rem',
                background: 'var(--error)',
                color: '#fff',
                border: 'none',
                borderRadius: '8px',
                fontWeight: 'bold',
                cursor: 'pointer'
              }}>Metni Kaydet</button>
              {examMsg && <div style={{ marginTop: '0.5rem', color: examMsg.includes('eklendi') ? 'var(--success)' : 'var(--error)' }}>{examMsg}</div>}
            </form>
          </div>

          <div className="glass-panel" style={{ padding: '2rem' }}>
            <h3 style={{ fontSize: '1.4rem', marginBottom: '1.5rem', color: '#fff' }}>Kayıtlı Sınav Metinleri</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {exams.length === 0 ? (
                <p style={{ color: 'var(--text-secondary)' }}>Henüz sınav metni eklenmemiş.</p>
              ) : (
                exams.map(ex => (
                  <div key={ex.id} style={{ 
                    background: 'rgba(239, 68, 68, 0.05)', 
                    border: '1px solid rgba(239, 68, 68, 0.1)', 
                    padding: '1.5rem', 
                    borderRadius: '12px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}>
                    <div>
                      <h4 style={{ color: '#fff', margin: '0 0 0.5rem 0' }}>{ex.title}</h4>
                      <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', margin: 0 }}>
                        {ex.content.substring(0, 100)}...
                      </p>
                    </div>
                    <button 
                      onClick={() => handleDeleteExam(ex.id)}
                      style={{ background: 'transparent', border: '1px solid var(--error)', color: 'var(--error)', padding: '0.4rem 0.8rem', borderRadius: '6px', cursor: 'pointer' }}
                    >Sil</button>
                  </div>
                ))
              )}
            </div>
          </div>

        </div>
      </div>
    </main>
  );
}

const inputStyle = {
  padding: '0.8rem',
  borderRadius: '8px',
  border: '1px solid rgba(255,255,255,0.1)',
  background: 'rgba(0,0,0,0.2)',
  color: '#fff',
  fontSize: '1rem'
};
