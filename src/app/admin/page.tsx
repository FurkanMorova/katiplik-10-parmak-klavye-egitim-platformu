"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { lessons } from '@/data/lessons';

export default function AdminDashboard() {
  const [students, setStudents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState<'internal' | 'external' | 'exams'>('internal');
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

  const handleDeleteStudent = async (id: string, name: string) => {
    if (!confirm(`"${name}" adlı öğrenciyi ve tüm çalışma geçmişini silmek istediğinize emin misiniz?`)) return;
    try {
      const res = await fetch(`/api/admin/users?id=${id}`, { method: 'DELETE' });
      if (res.ok) {
        fetchStudents();
      } else {
        const d = await res.json();
        alert(d.error || 'Öğrenci silinemedi.');
      }
    } catch (err) {
      console.error('Delete error:', err);
      alert('Bağlantı hatası.');
    }
  };

  const internalStudents = students.filter(s => !s.isExternal);
  const externalStudents = students.filter(s => s.isExternal);

  if (loading) return (
    <div style={{ color: 'var(--text-primary)', textAlign: 'center', marginTop: '6rem', fontSize: '1.2rem', fontWeight: '600' }}>
      Yönetici paneli yükleniyor...
    </div>
  );

  return (
    <main className="container" style={{ padding: '3rem 1.5rem 6rem', minHeight: '85vh' }}>
      
      {/* Header */}
      <div style={{ marginBottom: '2.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h1 style={{ fontSize: '2.25rem', fontWeight: '800', margin: 0, color: 'var(--text-primary)', letterSpacing: '-0.5px' }}>
            ⚙️ Yönetici Paneli
          </h1>
          <p style={{ color: 'var(--text-secondary)', marginTop: '0.35rem', fontSize: '0.95rem' }}>
            Öğrenci takibi, dış kayıtlar ve sınav metinleri yönetimi
          </p>
        </div>

        {/* Tab Navigation */}
        <div style={{
          display: 'inline-flex',
          background: 'var(--bg-secondary)',
          borderRadius: '12px',
          padding: '4px',
          border: '1px solid var(--border-medium)'
        }}>
          <button
            onClick={() => setActiveTab('internal')}
            style={tabButtonStyle(activeTab === 'internal')}
          >
            👨‍🏫 Kurs Öğrencilerim ({internalStudents.length})
          </button>
          <button
            onClick={() => setActiveTab('external')}
            style={tabButtonStyle(activeTab === 'external')}
          >
            🌐 Dış Kayıtlar ({externalStudents.length})
          </button>
          <button
            onClick={() => setActiveTab('exams')}
            style={tabButtonStyle(activeTab === 'exams')}
          >
            📝 Sınav Metinleri ({exams.length})
          </button>
        </div>
      </div>

      {error && (
        <div style={{ background: 'var(--error-bg)', color: 'var(--error)', border: '1px solid var(--error)', padding: '1rem', borderRadius: '10px', marginBottom: '2rem' }}>
          {error}
        </div>
      )}

      {/* TAB 1: Kendi Eklediğimiz Kurs Öğrencileri */}
      {activeTab === 'internal' && (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '2rem', alignItems: 'start' }}>
          
          {/* Öğrenci Ekleme Formu */}
          <div className="glass-panel" style={{ padding: '2rem', background: 'var(--bg-secondary)', border: '1px solid var(--border-medium)' }}>
            <h2 style={{ fontSize: '1.35rem', fontWeight: '700', marginBottom: '1.25rem', color: 'var(--text-primary)' }}>
              ➕ Yeni Kurs Öğrencisi Ekle
            </h2>
            <form onSubmit={handleCreateStudent} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <label style={labelStyle}>Ad</label>
                <input type="text" placeholder="Örn: Mehmet" value={firstName} onChange={e => setFirstName(e.target.value)} required style={inputStyle} />
              </div>
              <div>
                <label style={labelStyle}>Soyad</label>
                <input type="text" placeholder="Örn: Demir" value={lastName} onChange={e => setLastName(e.target.value)} required style={inputStyle} />
              </div>
              <div>
                <label style={labelStyle}>Kullanıcı Adı</label>
                <input type="text" placeholder="mehmet.demir" value={username} onChange={e => setUsername(e.target.value)} required style={inputStyle} />
              </div>
              <div>
                <label style={labelStyle}>Şifre</label>
                <input type="password" placeholder="••••••••" value={password} onChange={e => setPassword(e.target.value)} required style={inputStyle} />
              </div>
              
              <button type="submit" style={{
                padding: '0.9rem',
                background: 'var(--accent-color)',
                color: '#121214',
                border: 'none',
                borderRadius: '10px',
                fontWeight: '700',
                fontSize: '1rem',
                cursor: 'pointer',
                boxShadow: 'var(--shadow-accent)',
                marginTop: '0.5rem',
                transition: 'all 0.2s',
              }}>
                Öğrenciyi Kaydet
              </button>
              {createMsg && (
                <div style={{
                  padding: '0.75rem',
                  borderRadius: '8px',
                  fontSize: '0.9rem',
                  fontWeight: '600',
                  textAlign: 'center',
                  background: createMsg.includes('başarıyla') ? 'var(--success-bg)' : 'var(--error-bg)',
                  color: createMsg.includes('başarıyla') ? 'var(--success)' : 'var(--error)',
                  border: `1px solid ${createMsg.includes('başarıyla') ? 'var(--success)' : 'var(--error)'}`
                }}>
                  {createMsg}
                </div>
              )}
            </form>
          </div>

          {/* Kurs Öğrencileri Detaylı Listesi */}
          <div className="glass-panel" style={{ padding: '2rem', background: 'var(--bg-secondary)', border: '1px solid var(--border-medium)' }}>
            <h2 style={{ fontSize: '1.35rem', fontWeight: '700', marginBottom: '1.25rem', color: 'var(--text-primary)' }}>
              📚 Kurs Öğrencileri ({internalStudents.length})
            </h2>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              {internalStudents.length === 0 ? (
                <p style={{ color: 'var(--text-secondary)', textAlign: 'center', padding: '3rem 0' }}>
                  Henüz kurs öğrencisi eklenmemiş. Yan taraftaki formdan öğrenci ekleyebilirsiniz.
                </p>
              ) : (
                internalStudents.map(st => (
                  <div key={st.id} style={{ 
                    background: 'var(--bg-glass)', 
                    border: '1px solid var(--border-subtle)', 
                    padding: '1.5rem', 
                    borderRadius: '14px' 
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
                      <div>
                        <h3 style={{ margin: 0, color: 'var(--text-primary)', fontSize: '1.2rem', fontWeight: '700' }}>
                          {st.firstName} {st.lastName}{' '}
                          <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: '400' }}>(@{st.username})</span>
                        </h3>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                          📅 Katılım: {new Date(st.createdAt).toLocaleDateString('tr-TR')}
                        </span>
                        <button
                          onClick={() => handleDeleteStudent(st.id, `${st.firstName} ${st.lastName}`)}
                          style={{
                            background: 'transparent',
                            border: '1px solid var(--error)',
                            color: 'var(--error)',
                            padding: '0.25rem 0.65rem',
                            borderRadius: '6px',
                            cursor: 'pointer',
                            fontSize: '0.78rem',
                            fontWeight: '600',
                            transition: 'all 0.2s'
                          }}
                          onMouseEnter={e => { e.currentTarget.style.background = 'var(--error)'; e.currentTarget.style.color = '#fff'; }}
                          onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--error)'; }}
                        >
                          Öğrenciyi Sil
                        </button>
                      </div>
                    </div>

                    {/* Özet İstatistikler */}
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0.75rem', padding: '1rem', borderRadius: '10px', background: 'rgba(0,0,0,0.2)', marginBottom: '1rem' }}>
                      <div style={{ textAlign: 'center' }}>
                        <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: '600' }}>TOPLAM TEKRAR</div>
                        <div style={{ fontSize: '1.25rem', fontWeight: '800', color: 'var(--text-primary)', marginTop: '0.2rem' }}>{st.stats.totalAttempts}</div>
                      </div>
                      <div style={{ textAlign: 'center' }}>
                        <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: '600' }}>ORT. HIZ</div>
                        <div style={{ fontSize: '1.25rem', fontWeight: '800', color: 'var(--accent-color)', marginTop: '0.2rem' }}>{st.stats.avgWpm} DBK</div>
                      </div>
                      <div style={{ textAlign: 'center' }}>
                        <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: '600' }}>ORT. HATA</div>
                        <div style={{ fontSize: '1.25rem', fontWeight: '800', color: 'var(--error)', marginTop: '0.2rem' }}>{st.stats.avgErrors}</div>
                      </div>
                      <div style={{ textAlign: 'center' }}>
                        <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: '600' }}>HATA ORANI</div>
                        <div style={{ fontSize: '1.25rem', fontWeight: '800', color: 'var(--error)', marginTop: '0.2rem' }}>%{st.stats.avgErrorRate}</div>
                      </div>
                    </div>

                    {/* Ders Bazlı Detaylar */}
                    {st.perLessonStats && st.perLessonStats.length > 0 && (
                      <div style={{ marginTop: '1rem', background: 'rgba(0,0,0,0.25)', borderRadius: '10px', padding: '1rem', border: '1px solid var(--border-subtle)' }}>
                        <h4 style={{ fontSize: '0.85rem', color: 'var(--text-primary)', marginBottom: '0.75rem', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                          Ders Bazlı Gelişim Tablosu
                        </h4>
                        <div style={{ overflowX: 'auto' }}>
                          <table style={{ width: '100%', fontSize: '0.85rem', color: 'var(--text-secondary)', borderCollapse: 'collapse' }}>
                            <thead>
                              <tr style={{ textAlign: 'left', borderBottom: '1px solid var(--border-subtle)' }}>
                                <th style={{ padding: '0.5rem', color: 'var(--text-muted)', fontSize: '0.75rem' }}>Ders Adı</th>
                                <th style={{ padding: '0.5rem', color: 'var(--text-muted)', fontSize: '0.75rem' }}>Tekrar</th>
                                <th style={{ padding: '0.5rem', color: 'var(--text-muted)', fontSize: '0.75rem' }}>Ort. Hız</th>
                                <th style={{ padding: '0.5rem', color: 'var(--text-muted)', fontSize: '0.75rem' }}>Ort. Hata</th>
                                <th style={{ padding: '0.5rem', color: 'var(--text-muted)', fontSize: '0.75rem' }}>Hata Oranı</th>
                                <th style={{ padding: '0.5rem', color: 'var(--text-muted)', fontSize: '0.75rem' }}>Ort. Süre</th>
                              </tr>
                            </thead>
                            <tbody>
                              {st.perLessonStats.map((pl: any) => {
                                const lessonInfo = lessons.find(l => l.id === pl.lessonId);
                                return (
                                  <tr key={pl.lessonId} style={{ borderBottom: '1px solid rgba(255,255,255,0.03)' }}>
                                    <td style={{ padding: '0.5rem', color: 'var(--text-primary)', fontWeight: '600' }}>
                                      {lessonInfo ? lessonInfo.title : pl.lessonId.toUpperCase()}
                                    </td>
                                    <td style={{ padding: '0.5rem' }}>{pl.count}</td>
                                    <td style={{ padding: '0.5rem', color: 'var(--accent-color)', fontWeight: '700' }}>{pl.avgWpm} DBK</td>
                                    <td style={{ padding: '0.5rem', color: 'var(--error)' }}>{pl.avgErrors}</td>
                                    <td style={{ padding: '0.5rem', color: 'var(--error)' }}>%{pl.avgErrorRate}</td>
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
      )}

      {/* TAB 2: Dışarıdan Kayıt Olan Genel Öğrenciler */}
      {activeTab === 'external' && (
        <div className="glass-panel" style={{ padding: '2.5rem', background: 'var(--bg-secondary)', border: '1px solid var(--border-medium)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
            <div>
              <h2 style={{ fontSize: '1.5rem', fontWeight: '800', color: 'var(--text-primary)', margin: 0 }}>
                🌐 Dışarıdan Kayıt Olan Kullanıcılar
              </h2>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginTop: '0.25rem' }}>
                Platforma web üzerinden kendi kaydolan genel öğrenciler ve tamamladıkları toplam pratikler
              </p>
            </div>
            <div style={{
              padding: '0.4rem 0.9rem',
              borderRadius: '8px',
              background: 'var(--accent-light)',
              color: 'var(--accent-color)',
              fontWeight: '700',
              fontSize: '0.9rem'
            }}>
              Toplam: {externalStudents.length} Kayıt
            </div>
          </div>

          {externalStudents.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '4rem 0', color: 'var(--text-secondary)' }}>
              Henüz dışarıdan kayıt olmuş bir kullanıcı bulunmuyor.
            </div>
          ) : (
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid var(--border-medium)' }}>
                    <th style={{ ...thStyle, width: '60px' }}>#</th>
                    <th style={thStyle}>Ad Soyad</th>
                    <th style={thStyle}>Kullanıcı Adı</th>
                    <th style={{ ...thStyle, textAlign: 'center' }}>Tamamlanan Pratik</th>
                    <th style={{ ...thStyle, textAlign: 'center' }}>En Yüksek Hız</th>
                    <th style={{ ...thStyle, textAlign: 'right' }}>Kayıt Tarihi</th>
                    <th style={{ ...thStyle, textAlign: 'center', width: '90px' }}>İşlem</th>
                  </tr>
                </thead>
                <tbody>
                  {externalStudents.map((user, idx) => (
                    <tr 
                      key={user.id} 
                      style={{ borderBottom: '1px solid var(--border-subtle)', transition: 'background 0.15s' }}
                      onMouseEnter={e => { e.currentTarget.style.background = 'var(--bg-glass-hover)'; }}
                      onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; }}
                    >
                      <td style={{ ...tdStyle, color: 'var(--text-muted)', fontWeight: '600' }}>
                        {idx + 1}
                      </td>
                      <td style={tdStyle}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                          <div style={{
                            width: '36px',
                            height: '36px',
                            borderRadius: '50%',
                            background: 'var(--bg-glass)',
                            border: '1px solid var(--border-medium)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '0.9rem',
                            fontWeight: '700',
                            color: 'var(--accent-color)'
                          }}>
                            {user.firstName?.[0]?.toUpperCase()}
                          </div>
                          <span style={{ fontWeight: '700', color: 'var(--text-primary)', fontSize: '0.95rem' }}>
                            {user.firstName} {user.lastName}
                          </span>
                        </div>
                      </td>
                      <td style={{ ...tdStyle, color: 'var(--text-secondary)', fontFamily: 'var(--font-mono)' }}>
                        @{user.username}
                      </td>
                      <td style={{ ...tdStyle, textAlign: 'center' }}>
                        <span style={{
                          padding: '0.3rem 0.8rem',
                          borderRadius: '20px',
                          background: user.stats.totalAttempts > 0 ? 'var(--success-bg)' : 'rgba(255,255,255,0.04)',
                          color: user.stats.totalAttempts > 0 ? 'var(--success)' : 'var(--text-muted)',
                          fontWeight: '700',
                          fontSize: '0.9rem',
                          display: 'inline-block'
                        }}>
                          {user.stats.totalAttempts} pratik
                        </span>
                      </td>
                      <td style={{ ...tdStyle, textAlign: 'center', fontWeight: '800', color: user.stats.bestWpm > 0 ? 'var(--accent-color)' : 'var(--text-muted)', fontSize: '1rem' }}>
                        {user.stats.bestWpm > 0 ? `${user.stats.bestWpm} DBK` : '-'}
                      </td>
                      <td style={{ ...tdStyle, textAlign: 'right', color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                        {new Date(user.createdAt).toLocaleDateString('tr-TR', { day: 'numeric', month: 'short', year: 'numeric' })}
                      </td>
                      <td style={{ ...tdStyle, textAlign: 'center' }}>
                        <button
                          onClick={() => handleDeleteStudent(user.id, `${user.firstName} ${user.lastName}`)}
                          style={{
                            background: 'transparent',
                            border: '1px solid var(--error)',
                            color: 'var(--error)',
                            padding: '0.25rem 0.65rem',
                            borderRadius: '6px',
                            cursor: 'pointer',
                            fontSize: '0.78rem',
                            fontWeight: '600',
                            transition: 'all 0.2s'
                          }}
                          onMouseEnter={e => { e.currentTarget.style.background = 'var(--error)'; e.currentTarget.style.color = '#fff'; }}
                          onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--error)'; }}
                        >
                          Sil
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {/* TAB 3: Sınav Metinleri Yönetimi */}
      {activeTab === 'exams' && (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '2rem', alignItems: 'start' }}>
          
          <div className="glass-panel" style={{ padding: '2rem', background: 'var(--bg-secondary)', border: '1px solid var(--border-medium)' }}>
            <h3 style={{ fontSize: '1.35rem', fontWeight: '700', marginBottom: '1.25rem', color: 'var(--text-primary)' }}>
              ➕ Yeni Sınav Metni Ekle
            </h3>
            <form onSubmit={handleCreateExam} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <label style={labelStyle}>Metin Başlığı</label>
                <input 
                  type="text" 
                  placeholder="Örn: 2026 Zabıt Katipliği Metni" 
                  value={examTitle} 
                  onChange={e => setExamTitle(e.target.value)} 
                  required 
                  style={inputStyle} 
                />
              </div>
              <div>
                <label style={labelStyle}>Metin İçeriği</label>
                <textarea 
                  placeholder="Sınav metnini buraya yapıştırın..." 
                  value={examContent} 
                  onChange={e => setExamContent(e.target.value)} 
                  required 
                  rows={8}
                  style={{ ...inputStyle, resize: 'vertical', lineHeight: '1.6' }} 
                />
              </div>
              <button type="submit" style={{
                padding: '0.9rem',
                background: 'var(--error)',
                color: '#fff',
                border: 'none',
                borderRadius: '10px',
                fontWeight: '700',
                fontSize: '1rem',
                cursor: 'pointer',
                boxShadow: 'var(--shadow-error)',
                marginTop: '0.5rem',
                transition: 'all 0.2s',
              }}>
                Metni Kaydet
              </button>
              {examMsg && (
                <div style={{
                  padding: '0.75rem',
                  borderRadius: '8px',
                  fontSize: '0.9rem',
                  fontWeight: '600',
                  textAlign: 'center',
                  background: examMsg.includes('eklendi') ? 'var(--success-bg)' : 'var(--error-bg)',
                  color: examMsg.includes('eklendi') ? 'var(--success)' : 'var(--error)',
                  border: `1px solid ${examMsg.includes('eklendi') ? 'var(--success)' : 'var(--error)'}`
                }}>
                  {examMsg}
                </div>
              )}
            </form>
          </div>

          <div className="glass-panel" style={{ padding: '2rem', background: 'var(--bg-secondary)', border: '1px solid var(--border-medium)' }}>
            <h3 style={{ fontSize: '1.35rem', fontWeight: '700', marginBottom: '1.25rem', color: 'var(--text-primary)' }}>
              📋 Kayıtlı Sınav Metinleri ({exams.length})
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {exams.length === 0 ? (
                <p style={{ color: 'var(--text-secondary)', textAlign: 'center', padding: '3rem 0' }}>
                  Henüz sınav metni eklenmemiş.
                </p>
              ) : (
                exams.map(ex => (
                  <div key={ex.id} style={{ 
                    background: 'var(--bg-glass)', 
                    border: '1px solid var(--border-subtle)', 
                    padding: '1.25rem 1.5rem', 
                    borderRadius: '12px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    gap: '1.5rem'
                  }}>
                    <div style={{ flex: 1 }}>
                      <h4 style={{ color: 'var(--text-primary)', margin: '0 0 0.4rem 0', fontSize: '1.05rem', fontWeight: '700' }}>
                        {ex.title}
                      </h4>
                      <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', margin: 0, lineHeight: '1.5' }}>
                        {ex.content.substring(0, 120)}...
                      </p>
                    </div>
                    <button 
                      onClick={() => handleDeleteExam(ex.id)}
                      style={{
                        background: 'transparent',
                        border: '1px solid var(--error)',
                        color: 'var(--error)',
                        padding: '0.45rem 0.9rem',
                        borderRadius: '8px',
                        cursor: 'pointer',
                        fontWeight: '600',
                        fontSize: '0.85rem',
                        transition: 'all 0.2s'
                      }}
                      onMouseEnter={e => { e.currentTarget.style.background = 'var(--error)'; e.currentTarget.style.color = '#fff'; }}
                      onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--error)'; }}
                    >
                      Sil
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>

        </div>
      )}

    </main>
  );
}

const tabButtonStyle = (isActive: boolean): React.CSSProperties => ({
  padding: '0.55rem 1.1rem',
  borderRadius: '9px',
  fontSize: '0.88rem',
  fontWeight: '700',
  cursor: 'pointer',
  border: 'none',
  background: isActive ? 'var(--accent-color)' : 'transparent',
  color: isActive ? '#121214' : 'var(--text-secondary)',
  boxShadow: isActive ? 'var(--shadow-accent)' : 'none',
  transition: 'all 0.2s',
});

const labelStyle: React.CSSProperties = {
  display: 'block',
  fontSize: '0.82rem',
  fontWeight: '600',
  color: 'var(--text-secondary)',
  marginBottom: '0.35rem',
};

const inputStyle: React.CSSProperties = {
  width: '100%',
  padding: '0.8rem 0.95rem',
  borderRadius: '8px',
  border: '1px solid var(--border-medium)',
  background: 'var(--bg-glass)',
  color: 'var(--text-primary)',
  fontSize: '0.95rem',
  outline: 'none',
  boxSizing: 'border-box',
};

const thStyle: React.CSSProperties = {
  padding: '0.85rem 1rem',
  fontSize: '0.75rem',
  fontWeight: '700',
  color: 'var(--text-muted)',
  textTransform: 'uppercase',
  letterSpacing: '1px',
};

const tdStyle: React.CSSProperties = {
  padding: '1rem',
  fontSize: '0.9rem',
};
