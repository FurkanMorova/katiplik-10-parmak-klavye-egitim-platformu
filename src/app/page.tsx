"use client";

import { useState, useEffect, useMemo } from 'react';
import { lessons, Lesson } from '../data/lessons';
import { examText } from '../data/exams';
import SeoArticle from '../components/SeoArticle';
import TypingEngine from '../components/TypingEngine';
import ExamEngine from '../components/ExamEngine';
import FingerMap from '../components/FingerMap';
import UserDashboard from '../components/UserDashboard';
import SeoLandingSection from '../components/SeoLandingSection';
import { useLocalStorage } from '../utils/useLocalStorage';
import AdBanner from '../components/AdBanner';

export default function Home() {
  const [isMounted, setIsMounted] = useState(false);
  const [activeLesson, setActiveLesson] = useState<Lesson | null>(null);
  const [isExamMode, setIsExamMode] = useState(false);
  const [keyboardType, setKeyboardType] = useLocalStorage<'F' | 'Q'>('klavye_type_pref', 'F');
  const [lessonStats] = useLocalStorage<Record<string, any>>('klavye_lesson_stats', {});

  // Sınav seçim stateleri
  const [examTexts, setExamTexts] = useState<any[]>([]);
  const [selectedExamText, setSelectedExamText] = useState<any>(null);
  const [selectedDuration, setSelectedDuration] = useState<number | null>(180); // Default 3dk
  const [isExamSetupMode, setIsExamSetupMode] = useState(false);

  // Dynamic Heatmap Logic
  const [globalHeatmap] = useLocalStorage<Record<string, {hits: number, misses: number}>>("klavye_global_heatmap", {});
  const weakKeys = useMemo(() => {
    return Object.keys(globalHeatmap)
      .map(char => {
        const { hits, misses } = globalHeatmap[char];
        return { char, total: hits + misses, acc: hits / (hits + misses) };
      })
      .filter(k => k.total >= 3 && k.acc < 0.90) // Under 90% accuracy
      .sort((a, b) => a.acc - b.acc)
      .slice(0, 6)
      .map(k => k.char);
  }, [globalHeatmap]);

  useEffect(() => {
    setIsMounted(true);
    fetch('/api/exams')
      .then(res => res.json())
      .then(data => {
        setExamTexts(data);
        if (data.length > 0) setSelectedExamText(data[0]);
      });
  }, []);

  const filteredLessons = lessons.filter(l => l.keyboardType === keyboardType);
  const currentIndex = activeLesson ? filteredLessons.findIndex(l => l.id === activeLesson.id) : -1;
  const hasNextLesson = currentIndex !== -1 && currentIndex < filteredLessons.length - 1;
  
  const handleNextLesson = () => {
    if (hasNextLesson) {
      setActiveLesson(filteredLessons[currentIndex + 1]);
    }
  };

  if (!isMounted) return null;

  return (
    <main className="container" style={{ padding: '5rem 1.5rem 6rem' }}>

      {/* Hero */}
      {!activeLesson && !isExamMode && !isExamSetupMode && (
        <header style={{ textAlign: 'center', marginBottom: '4.5rem' }} className="animate-fade-in-up">
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.4rem 1rem', borderRadius: '999px', background: 'rgba(79,142,247,0.1)', border: '1px solid rgba(79,142,247,0.25)', marginBottom: '1.75rem' }}>
            <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--accent-color)', display: 'inline-block', animation: 'pulse 2s infinite' }}></span>
            <span style={{ fontSize: '0.8rem', color: 'var(--accent-color)', fontWeight: '600', letterSpacing: '0.5px' }}>ÜCRETSİZ · KAYIT GEREKSİZ</span>
          </div>
          <h1 style={{ fontSize: 'clamp(2.5rem, 6vw, 4rem)', fontWeight: '900', marginBottom: '1.25rem', color: 'var(--text-primary)', letterSpacing: '-2px', lineHeight: '1.05' }}>
            Türkiye'nin En Gelişmiş<br />
            <span style={{ background: 'linear-gradient(135deg, #4f8ef7, #7c55f7)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
              10 Parmak Klavye
            </span>{' '}Platformu
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.15rem', maxWidth: '650px', margin: '0 auto 2rem', lineHeight: '1.7' }}>
            Bilimsel rastgele metin algoritması, Katiplik Sınavı simülasyonu ve gerçek zamanlı istatistiklerle hem F hem de Q klavye eğitimi alın. Kas hafızanızı kalıcı olarak geliştirin.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href="#egitimler" style={{ padding: '0.85rem 2rem', background: 'var(--accent-color)', color: '#fff', borderRadius: '10px', fontWeight: '700', fontSize: '0.95rem', boxShadow: 'var(--shadow-accent)', display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
              Eğitime Başla →
            </a>
            <a href="/nasil-calisir" style={{ padding: '0.85rem 2rem', background: 'var(--bg-glass)', color: 'var(--text-primary)', borderRadius: '10px', fontWeight: '600', fontSize: '0.95rem', border: '1px solid var(--border-medium)', display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
              Nasıl Çalışılır?
            </a>
          </div>
        </header>
      )}

      {/* Hero altı reklam */}
      {!activeLesson && !isExamMode && !isExamSetupMode && (
        <AdBanner slot="6280424775" format="horizontal" />
      )}

      <UserDashboard />

      {!activeLesson && !isExamMode && !isExamSetupMode ? (
        <div className="animate-fade-in">
          
          {/* Klavye Seçici */}
          <div id="egitimler" style={{ marginBottom: '2.5rem' }}>
            <div style={{ display: 'inline-flex', background: 'var(--bg-glass)', borderRadius: '12px', padding: '4px', border: '1px solid var(--border-subtle)' }}>
              {(['F', 'Q'] as const).map(type => (
                <button
                  key={type}
                  onClick={() => setKeyboardType(type)}
                  style={{
                    padding: '0.6rem 1.75rem',
                    fontSize: '0.95rem',
                    fontWeight: '700',
                    borderRadius: '9px',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    background: keyboardType === type ? 'var(--accent-color)' : 'transparent',
                    color: keyboardType === type ? '#fff' : 'var(--text-muted)',
                    border: 'none',
                    boxShadow: keyboardType === type ? 'var(--shadow-accent)' : 'none',
                    letterSpacing: '0.5px',
                  }}
                >
                  {type} Klavye
                </button>
              ))}
            </div>
            <p style={{ display: 'inline-block', marginLeft: '1.25rem', color: 'var(--text-muted)', fontSize: '0.85rem' }}>
              {keyboardType === 'F' ? '⚖️ Katiplik sınavı için önerilen klavye' : '💻 Global standart klavye'}
            </p>
          </div>

          <div style={{ display: 'grid', gap: '1.25rem', gridTemplateColumns: 'repeat(auto-fill, minmax(290px, 1fr))' }}>
            {filteredLessons.map((lesson, idx) => {
              const stats = lessonStats[lesson.id];
              return (
                <div
                  key={lesson.id}
                  className="glass-panel lesson-card"
                  style={{ padding: '2rem', cursor: 'pointer', display: 'flex', flexDirection: 'column', position: 'relative', overflow: 'hidden' }}
                  onClick={() => setActiveLesson(lesson)}
                >
                  {/* Arka plan nüans */}
                  <div style={{ position: 'absolute', top: 0, right: 0, width: '100px', height: '100px', background: 'radial-gradient(circle, rgba(79,142,247,0.08) 0%, transparent 70%)', pointerEvents: 'none' }} />
                  
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.25rem' }}>
                    <span className="badge badge-blue">{lesson.keyboardType} KLAVYE</span>
                    <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', background: 'var(--bg-glass)', padding: '0.2rem 0.6rem', borderRadius: '6px', border: '1px solid var(--border-subtle)' }}>
                      #{idx + 1}
                    </span>
                  </div>
                  <h2 style={{ fontSize: '1.2rem', fontWeight: '700', marginBottom: '0.6rem', color: 'var(--text-primary)', lineHeight: '1.3' }}>
                    {lesson.title}
                  </h2>
                  <div style={{ marginTop: 'auto', paddingTop: '1.25rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
                      <span style={{ color: 'var(--accent-color)', fontWeight: '700' }}>🎯 Hedef:</span>
                      <span style={{ fontWeight: '600', color: 'var(--text-primary)' }}>{lesson.targetWpm} DBK</span>
                    </div>
                    {stats && stats.playCount > 0 && (
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', fontSize: '0.8rem', color: 'var(--success)' }}>
                        <span>⚡</span>
                        <strong>{stats.highestWpm}</strong>
                      </div>
                    )}
                  </div>

                  {stats && stats.playCount > 0 && (
                    <div style={{
                      marginTop: '1rem',
                      paddingTop: '1rem',
                      borderTop: '1px solid var(--border-subtle)',
                      display: 'grid',
                      gridTemplateColumns: 'repeat(2, 1fr)',
                      gap: '0.5rem',
                      fontSize: '0.8rem',
                      color: 'var(--text-secondary)'
                    }}>
                      <div>Tekrar: <strong style={{ color: 'var(--text-primary)' }}>{stats.playCount}×</strong></div>
                      <div>Ort. Hata: <strong style={{ color: 'var(--error)' }}>{(stats.totalErrors / stats.playCount).toFixed(1)}</strong></div>
                    </div>
                  )}
                </div>
              );
            })}

            {weakKeys.length > 0 && (
              <div
                style={{
                  padding: '2rem',
                  cursor: 'pointer',
                  display: 'flex',
                  flexDirection: 'column',
                  position: 'relative',
                  overflow: 'hidden',
                  background: 'linear-gradient(135deg, rgba(234, 179, 8, 0.08), rgba(202, 138, 4, 0.04))',
                  border: '1px solid rgba(234, 179, 8, 0.25)',
                  borderRadius: 'var(--radius-lg)',
                  transition: 'all 0.25s cubic-bezier(0.4,0,0.2,1)',
                }}
                onClick={() => {
                  let charsToTrain = [...weakKeys];
                  // Eğer çok az hata harfi varsa, temel harflerle destekle
                  if (charsToTrain.length < 5) {
                     const fillers = keyboardType === 'F' ? ['A', 'E', 'K', 'T', 'İ'] : ['A', 'S', 'D', 'E', 'R'];
                     charsToTrain = Array.from(new Set([...charsToTrain, ...fillers]));
                  }
                  setActiveLesson({
                    id: 'dynamic-weak',
                    slug: 'zayif-harf-antrenmani',
                    title: 'Zayıf Harf Antrenmanı',
                    keyboardType: keyboardType,
                    allowedCharacters: charsToTrain,
                    wordCount: 20,
                    targetWpm: 20,
                    targetAccuracy: 95,
                    difficulty: 'intermediate',
                    seoContent: 'En çok hata yaptığınız karakterlere dayalı olarak tamamen size özel üretilmiş dinamik düzeltme antrenmanıdır.'
                  });
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.transform = 'translateY(-6px)';
                  e.currentTarget.style.boxShadow = '0 15px 30px rgba(0,0,0,0.2), 0 0 20px rgba(234, 179, 8, 0.15)';
                  e.currentTarget.style.borderColor = 'rgba(234, 179, 8, 0.5)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                  e.currentTarget.style.borderColor = 'rgba(234, 179, 8, 0.25)';
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.25rem' }}>
                  <span className="badge" style={{background: 'rgba(234,179,8,0.15)', color: '#eab308'}}>ANALİZ • YAPAY ZEKA</span>
                  <span style={{ fontSize: '1.25rem' }}>🔥</span>
                </div>
                <h2 style={{ fontSize: '1.2rem', fontWeight: '700', marginBottom: '0.6rem', color: '#eab308', lineHeight: '1.3' }}>
                  Zayıf Harfleri Çalış
                </h2>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', lineHeight: '1.6', flex: 1 }}>
                  Isı haritanız incelendi. <strong style={{color: 'var(--text-primary)'}}>{weakKeys.join(', ')}</strong> tuşlarında çok hata yapıyorsunuz. Sadece bu tuşlara özel antrenman yapın.
                </p>
              </div>
            )}

            {/* Katiplik Sınavı Kartı */}
            <div
              style={{
                padding: '2rem',
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
                position: 'relative',
                overflow: 'hidden',
                background: 'linear-gradient(135deg, rgba(240,82,82,0.08), rgba(220,38,38,0.04))',
                border: '1px solid rgba(240,82,82,0.25)',
                borderRadius: 'var(--radius-lg)',
                transition: 'all 0.25s cubic-bezier(0.4,0,0.2,1)',
              }}
              onClick={() => {
                if (examTexts.length === 0) {
                  alert('Henüz sınav metni eklenmemiş. Lütfen önce admin panelinden metin ekleyin.');
                  return;
                }
                setIsExamSetupMode(true);
              }}
              onMouseEnter={e => {
                e.currentTarget.style.transform = 'translateY(-6px)';
                e.currentTarget.style.boxShadow = '0 20px 40px rgba(0,0,0,0.4), 0 0 30px rgba(240,82,82,0.3)';
                e.currentTarget.style.borderColor = 'var(--error)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
                e.currentTarget.style.borderColor = 'rgba(240,82,82,0.25)';
              }}
            >
              <div style={{ position: 'absolute', top: 0, right: 0, width: '120px', height: '120px', background: 'radial-gradient(circle, rgba(240,82,82,0.12) 0%, transparent 70%)', pointerEvents: 'none' }} />
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.25rem' }}>
                <span className="badge badge-red">SINAV MODU</span>
                <span style={{ fontSize: '1.25rem' }}>⚖️</span>
              </div>
              <h2 style={{ fontSize: '1.2rem', fontWeight: '700', marginBottom: '0.6rem', color: 'var(--error)', lineHeight: '1.3' }}>
                Katiplik Sınavı
              </h2>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', lineHeight: '1.6', flex: 1 }}>
                Gerçek sınav metinleriyle pratik yapın. Süreyi kendiniz belirleyin.
              </p>
              <div style={{ marginTop: '1.25rem', paddingTop: '1rem', borderTop: '1px solid rgba(240,82,82,0.15)', display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                {['1 dk', '3 dk', '5 dk', '∞'].map(d => (
                  <span key={d} style={{ fontSize: '0.7rem', padding: '0.2rem 0.5rem', background: 'rgba(240,82,82,0.08)', color: 'var(--error)', border: '1px solid rgba(240,82,82,0.2)', borderRadius: '4px', fontWeight: '600' }}>{d}</span>
                ))}
              </div>
            </div>
          </div>

          {/* Ders kartları altı reklam */}
          <AdBanner slot="6280424775" format="horizontal" />

          <SeoLandingSection />
        </div>
      ) : isExamSetupMode ? (
        <div className="animate-fade-in" style={{ maxWidth: '700px', margin: '0 auto' }}>
          {/* Geri Butonu */}
          <button
            onClick={() => setIsExamSetupMode(false)}
            style={{
              background: 'transparent',
              color: 'var(--text-secondary)',
              border: '1px solid var(--border-medium)',
              padding: '0.5rem 1.25rem',
              borderRadius: '8px',
              cursor: 'pointer',
              marginBottom: '2.5rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              fontSize: '0.95rem',
              transition: 'all 0.2s',
            }}
          >← Ana Sayfaya Dön</button>

          {/* Başlık */}
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <div style={{
              width: '72px', height: '72px', borderRadius: '50%',
              background: 'rgba(239,68,68,0.15)',
              border: '2px solid rgba(239,68,68,0.4)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              margin: '0 auto 1.5rem',
              fontSize: '2rem'
            }}>⚖️</div>
            <h2 style={{ fontSize: '2.25rem', fontWeight: '800', color: 'var(--text-primary)', marginBottom: '0.5rem', letterSpacing: '-0.5px' }}>
              Katiplik Sınavı
            </h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem' }}>
              Sınav süresini seçin ve başlayın. Metin otomatik olarak belirlenecektir.
            </p>
          </div>

          {/* Süre Seçim Kartları */}
          <div style={{ marginBottom: '2.5rem' }}>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '1rem' }}>
              Sınav Süresi
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '0.75rem' }}>
              {([60, 180, 300, 600, null] as (number | null)[]).map(seconds => {
                const isSelected = selectedDuration === seconds;
                const label = seconds === null ? '∞' : String(seconds / 60);
                const sublabel = seconds === null ? 'Sınırsız' : 'Dakika';
                return (
                  <button
                    key={seconds === null ? 'null' : seconds}
                    onClick={() => setSelectedDuration(seconds)}
                    style={{
                      padding: '1.25rem 0.5rem',
                      borderRadius: '12px',
                      cursor: 'pointer',
                      background: isSelected ? 'var(--error-bg)' : 'var(--bg-glass)',
                      border: `2px solid ${isSelected ? 'var(--error)' : 'var(--border-subtle)'}`,
                      color: isSelected ? 'var(--error)' : 'var(--text-secondary)',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: '0.25rem',
                      transition: 'all 0.2s',
                      boxShadow: isSelected ? '0 0 20px rgba(239,68,68,0.2)' : 'none',
                    }}
                  >
                    <span style={{ fontSize: '1.75rem', fontWeight: '800', lineHeight: 1 }}>{label}</span>
                    <span style={{ fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '1px', color: isSelected ? 'var(--error)' : 'var(--text-muted)' }}>{sublabel}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Rastgele Metin Notu */}
          <div style={{
            marginBottom: '2.5rem',
            padding: '1.25rem 1.5rem',
            borderRadius: '12px',
            background: 'rgba(59,130,246,0.05)',
            border: '1px solid rgba(59,130,246,0.15)',
            display: 'flex',
            alignItems: 'center',
            gap: '1rem',
          }}>
            <span style={{ fontSize: '1.5rem' }}>🎲</span>
            <p style={{ margin: 0, color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: '1.5' }}>
              Sınava başladığınızda sistem kayıtlı metinler arasından <strong style={{ color: 'var(--text-primary)' }}>rastgele</strong> bir metin seçecektir.
            </p>
          </div>

          {/* Başla Butonu */}
          <button
            onClick={() => {
              const randomText = examTexts[Math.floor(Math.random() * examTexts.length)];
              setSelectedExamText(randomText);
              setIsExamSetupMode(false);
              setIsExamMode(true);
            }}
            style={{
              width: '100%',
              padding: '1.25rem',
              background: 'linear-gradient(135deg, #ef4444, #dc2626)',
              color: '#fff',
              border: 'none',
              borderRadius: '14px',
              fontSize: '1.2rem',
              fontWeight: '700',
              cursor: 'pointer',
              boxShadow: '0 8px 30px rgba(239,68,68,0.35)',
              letterSpacing: '0.5px',
              transition: 'all 0.2s',
            }}
            onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.transform = 'translateY(-2px)'; (e.currentTarget as HTMLButtonElement).style.boxShadow = '0 12px 40px rgba(239,68,68,0.5)'; }}
            onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.transform = 'translateY(0)'; (e.currentTarget as HTMLButtonElement).style.boxShadow = '0 8px 30px rgba(239,68,68,0.35)'; }}
          >
            Sınava Başla →
          </button>
        </div>
      ) : isExamMode && selectedExamText ? (
        <div className="animate-fade-in">
          <button 
            onClick={() => setIsExamMode(false)}
            style={{
              background: 'transparent',
              color: 'var(--text-secondary)',
              border: '1px solid var(--text-muted)',
              padding: '0.5rem 1rem',
              borderRadius: '6px',
              cursor: 'pointer',
              marginBottom: '2rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}
          >
            ← Ana Ekrana Dön
          </button>
          <SeoArticle 
            title={selectedExamText.title} 
            content={selectedDuration ? `Bu sınav ${selectedDuration / 60} dakika sürmektedir. Hazır olduğunuzda ilk tuşa basarak başlayın.` : 'Bu sınav sınırsız sürelidir; metin bittiğinde otomatik olarak sonlanacaktır. Hazır olduğunuzda başlayın.'} 
          />
          <ExamEngine 
            examId={selectedExamText.id} 
            targetText={selectedExamText.content} 
            timeLimitSeconds={selectedDuration} 
            keyboardType={keyboardType} 
            onRestart={() => {
              if (examTexts.length > 1) {
                let randomText = examTexts[Math.floor(Math.random() * examTexts.length)];
                while (randomText.id === selectedExamText.id) {
                  randomText = examTexts[Math.floor(Math.random() * examTexts.length)];
                }
                setSelectedExamText(randomText);
              }
            }}
          />
          {/* Sınav sonrası reklam */}
          <AdBanner slot="3909035000" format="rectangle" />
        </div>
      ) : activeLesson ? (
        <div className="animate-fade-in">
          <button 
            onClick={() => setActiveLesson(null)}
            style={{
              background: 'transparent',
              color: 'var(--text-secondary)',
              border: '1px solid var(--text-muted)',
              padding: '0.5rem 1rem',
              borderRadius: '6px',
              cursor: 'pointer',
              marginBottom: '2rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}
          >
            ← Ders Seçimine Dön
          </button>

          {/* Parmak Haritası — sayfanın en başında, açık */}
          <div style={{ marginBottom: '1.5rem' }}>
            <FingerMap compact defaultExpanded defaultKb={activeLesson.keyboardType} />
          </div>

          {lessonStats[activeLesson.id] && lessonStats[activeLesson.id].playCount > 0 && (
            <div className="glass-panel" style={{ padding: '1.5rem', marginBottom: '2rem', display: 'flex', justifyContent: 'space-around', alignItems: 'center', background: 'rgba(59, 130, 246, 0.05)' }}>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1px' }}>Kişisel Rekorunuz</div>
                <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--success)' }}>{lessonStats[activeLesson.id].highestWpm} <span style={{fontSize:'1rem'}}>DBK</span></div>
              </div>
              <div style={{ width: '1px', background: 'rgba(255,255,255,0.1)', height: '40px' }}></div>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1px' }}>Ortalama Hata</div>
                <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--error)' }}>{(lessonStats[activeLesson.id].totalErrors / lessonStats[activeLesson.id].playCount).toFixed(1)}</div>
              </div>
              <div style={{ width: '1px', background: 'rgba(255,255,255,0.1)', height: '40px' }}></div>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1px' }}>Toplam Tekrar</div>
                <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--text-primary)' }}>{lessonStats[activeLesson.id].playCount}</div>
              </div>
            </div>
          )}
          
          <SeoArticle title={activeLesson.title} content={activeLesson.seoContent} />
          
          <TypingEngine 
            lessonId={activeLesson.id}
            allowedCharacters={activeLesson.allowedCharacters}
            customWords={activeLesson.customWords}
            wordCount={activeLesson.wordCount}
            targetWpm={activeLesson.targetWpm}
            keyboardType={activeLesson.keyboardType}
            onNextLesson={hasNextLesson ? handleNextLesson : undefined}
          />
          {/* Ders sonrası reklam */}
          <AdBanner slot="6280424775" format="horizontal" />
        </div>
      ) : null}
    </main>
  );
}
