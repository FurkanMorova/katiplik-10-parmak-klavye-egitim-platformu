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
import HomeFaqSection from '../components/HomeFaqSection';
import { useLocalStorage } from '../utils/useLocalStorage';
import AdBanner from '../components/AdBanner';

// Gamification imports
import { useGamification } from '../utils/useGamification';
import StreakBanner from '../components/StreakBanner';
import DailyChallenge from '../components/DailyChallenge';
import LearningPath from '../components/LearningPath';
import AchievementsGallery from '../components/AchievementsGallery';
import ProgressChart from '../components/ProgressChart';
import Leaderboard from '../components/Leaderboard';
import SpeedRace from '../components/SpeedRace';
import CustomTextMode from '../components/CustomTextMode';
import HeroLeaderboardPodium from '../components/HeroLeaderboardPodium';

export default function Home() {
  const [isMounted, setIsMounted] = useState(false);
  const [activeLesson, setActiveLesson] = useState<Lesson | null>(null);
  const [isExamMode, setIsExamMode] = useState(false);
  const [isSpeedRaceMode, setIsSpeedRaceMode] = useState(false);
  const [isCustomTextMode, setIsCustomTextMode] = useState(false);
  const [customText, setCustomText] = useState<string | null>(null);
  const [keyboardType, setKeyboardType] = useLocalStorage<'F' | 'Q'>('klavye_type_pref', 'F');
  const [lessonStats] = useLocalStorage<Record<string, any>>('klavye_lesson_stats', {});

  // Sınav seçim stateleri
  const [examTexts, setExamTexts] = useState<any[]>([]);
  const [selectedExamText, setSelectedExamText] = useState<any>(null);
  const [selectedDuration, setSelectedDuration] = useState<number | null>(180);
  const [isExamSetupMode, setIsExamSetupMode] = useState(false);

  // Gamification
  const gamification = useGamification();

  // Dynamic Heatmap Logic
  const [globalHeatmap] = useLocalStorage<Record<string, {hits: number, misses: number}>>("klavye_global_heatmap", {});
  const weakKeys = useMemo(() => {
    return Object.keys(globalHeatmap)
      .map(char => {
        const { hits, misses } = globalHeatmap[char];
        return { char, total: hits + misses, acc: hits / (hits + misses) };
      })
      .filter(k => k.total >= 3 && k.acc < 0.90)
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

  const isInAnyMode = activeLesson || isExamMode || isExamSetupMode || isSpeedRaceMode || isCustomTextMode || customText;

  if (!isMounted) return null;

  return (
    <main className="container" style={{ padding: '3.5rem 1.5rem 6rem' }}>

      {/* Dynamic Split Hero */}
      {!isInAnyMode && (
        <header style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
          gap: '3rem',
          alignItems: 'center',
          marginBottom: '4rem',
        }} className="animate-fade-in-up">
          
          {/* Sol Kolon: Katiplik & On Parmak Başlık ve Aksiyonlar */}
          <div>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.4rem 1rem',
              borderRadius: '999px',
              background: 'var(--accent-light)',
              border: '1px solid rgba(245, 158, 11, 0.3)',
              marginBottom: '1.25rem'
            }}>
              <span style={{ fontSize: '1rem' }}>⚖️</span>
              <span style={{ fontSize: '0.78rem', color: 'var(--accent-color)', fontWeight: '700', letterSpacing: '0.5px', textTransform: 'uppercase' }}>
                KATİPLİK SINAVI & ON PARMAK EĞİTİMİ
              </span>
            </div>

            <h1 style={{
              fontSize: 'clamp(2.2rem, 4.5vw, 3.4rem)',
              fontWeight: '900',
              marginBottom: '1.25rem',
              color: 'var(--text-primary)',
              letterSpacing: '-1.5px',
              lineHeight: '1.1'
            }}>
              Katiplik Sınavına Hazırlık ve{' '}
              <span style={{
                background: 'linear-gradient(135deg, #f59e0b, #ea580c)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}>
                On Parmak Klavye
              </span>{' '}Çalışması
            </h1>

            <p style={{
              color: 'var(--text-secondary)',
              fontSize: '1.05rem',
              lineHeight: '1.7',
              marginBottom: '1.75rem',
              maxWidth: '540px'
            }}>
              <strong>3 dakikada 90 kelime barajını aşın.</strong> Bilimsel F ve Q klavye dersleri, Adalet Bakanlığı sınav metinleri, zayıf tuş analizi ve canlı liderlik sıralamasıyla kas hafızanızı hızlandırın.
            </p>

            {/* Aksiyon Butonları */}
            <div style={{ display: 'flex', gap: '0.85rem', flexWrap: 'wrap', marginBottom: '2rem' }}>
              <a
                href="#egitimler"
                style={{
                  padding: '0.85rem 1.75rem',
                  background: 'var(--accent-color)',
                  color: '#121214',
                  borderRadius: '10px',
                  fontWeight: '800',
                  fontSize: '0.95rem',
                  boxShadow: 'var(--shadow-accent)',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  transition: 'all 0.2s',
                }}
              >
                Eğitime Başla →
              </a>

              <button
                onClick={() => {
                  if (examTexts.length === 0) {
                    alert('Sınav metinleri yükleniyor...');
                    return;
                  }
                  setIsExamSetupMode(true);
                }}
                style={{
                  padding: '0.85rem 1.5rem',
                  background: 'var(--error-bg)',
                  color: 'var(--error)',
                  borderRadius: '10px',
                  fontWeight: '700',
                  fontSize: '0.95rem',
                  border: '1px solid var(--error)',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                }}
              >
                ⚖️ 3 Dk Sınav Modu
              </button>

              <button
                onClick={() => setIsSpeedRaceMode(true)}
                style={{
                  padding: '0.85rem 1.4rem',
                  background: 'var(--bg-secondary)',
                  color: 'var(--text-primary)',
                  borderRadius: '10px',
                  fontWeight: '700',
                  fontSize: '0.95rem',
                  border: '1px solid var(--border-medium)',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                }}
              >
                ⚡ 60sn Hız Testi
              </button>
            </div>

            {/* Özellik Rozetleri */}
            <div style={{ display: 'flex', gap: '1.25rem', flexWrap: 'wrap', borderTop: '1px solid var(--border-subtle)', paddingTop: '1.25rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
                <span style={{ color: 'var(--success)' }}>✓</span> 3 Dk / 90 Kelime Simülasyonu
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
                <span style={{ color: 'var(--accent-color)' }}>✓</span> F & Q Klavye Desteği
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
                <span style={{ color: 'var(--success)' }}>✓</span> Tamamen Ücretsiz
              </div>
            </div>
          </div>

          {/* Sağ Kolon: Canlı Liderlik Kürsüsü (Podium) */}
          <div>
            <HeroLeaderboardPodium />
          </div>

        </header>
      )}

      {/* Hero altı reklam */}
      {!isInAnyMode && (
        <AdBanner slot="6280424775" format="horizontal" />
      )}

      <UserDashboard />

      {!isInAnyMode ? (
        <div className="animate-fade-in">

          {/* Streak Banner */}
          <StreakBanner
            streak={gamification.effectiveStreak}
            longestStreak={gamification.data.longestStreak}
          />

          {/* Daily Challenge */}
          <DailyChallenge
            description={gamification.dailyChallenge.description}
            target={gamification.dailyChallenge.target}
            type={gamification.dailyChallenge.type}
            completed={gamification.dailyChallenge.completed}
            progress={gamification.dailyChallenge.progress}
            xpReward={gamification.dailyChallenge.xpReward}
          />
          
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

          {/* Learning Path (replaces old grid) */}
          <LearningPath
            lessons={filteredLessons}
            lessonStars={gamification.data.lessonStars}
            isLessonUnlocked={gamification.isLessonUnlocked}
            onSelectLesson={setActiveLesson}
            lessonStats={lessonStats}
          />

          {/* Extra Mode Cards */}
          <div style={{ display: 'grid', gap: '1.25rem', gridTemplateColumns: 'repeat(auto-fill, minmax(290px, 1fr))', marginTop: '2rem', marginBottom: '2rem' }}>

            {/* Zayıf Harfler */}
            {weakKeys.length > 0 && (
              <div
                className="glass-panel lesson-card"
                style={{ padding: '2rem', cursor: 'pointer', display: 'flex', flexDirection: 'column', position: 'relative', overflow: 'hidden', background: 'linear-gradient(135deg, rgba(234, 179, 8, 0.08), rgba(202, 138, 4, 0.04))', border: '1px solid rgba(234, 179, 8, 0.25)' }}
                onClick={() => {
                  let charsToTrain = [...weakKeys];
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
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.25rem' }}>
                  <span className="badge" style={{background: 'rgba(234,179,8,0.15)', color: '#eab308'}}>ANALİZ • YAPAY ZEKA</span>
                  <span style={{ fontSize: '1.25rem' }}>🔥</span>
                </div>
                <h2 style={{ fontSize: '1.2rem', fontWeight: '700', marginBottom: '0.6rem', color: '#eab308', lineHeight: '1.3' }}>
                  Zayıf Harfleri Çalış
                </h2>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', lineHeight: '1.6', flex: 1 }}>
                  Isı haritanız incelendi. <strong style={{color: 'var(--text-primary)'}}>{weakKeys.join(', ')}</strong> tuşlarında çok hata yapıyorsunuz.
                </p>
              </div>
            )}

            {/* Hızlı Yarış */}
            <div
              className="glass-panel lesson-card"
              style={{ padding: '2rem', cursor: 'pointer', display: 'flex', flexDirection: 'column', position: 'relative', overflow: 'hidden', background: 'linear-gradient(135deg, rgba(124, 85, 247, 0.08), rgba(79, 142, 247, 0.04))', border: '1px solid rgba(124, 85, 247, 0.25)' }}
              onClick={() => setIsSpeedRaceMode(true)}
            >
              <div style={{ position: 'absolute', top: 0, right: 0, width: '120px', height: '120px', background: 'radial-gradient(circle, rgba(124,85,247,0.12) 0%, transparent 70%)', pointerEvents: 'none' }} />
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.25rem' }}>
                <span className="badge" style={{background: 'rgba(124,85,247,0.15)', color: '#a855f7'}}>YARIŞ MODU</span>
                <span style={{ fontSize: '1.25rem' }}>⚡</span>
              </div>
              <h2 style={{ fontSize: '1.2rem', fontWeight: '700', marginBottom: '0.6rem', color: '#a855f7', lineHeight: '1.3' }}>
                Hızlı Yarış (60s)
              </h2>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', lineHeight: '1.6', flex: 1 }}>
                60 saniyede ne kadar hızlı yazabilirsin? Rekorunu kır!
              </p>
              <div style={{ marginTop: '1.25rem', paddingTop: '1rem', borderTop: '1px solid rgba(124,85,247,0.15)', fontSize: '0.8rem', color: '#a855f7', fontWeight: '600' }}>
                ⚡ Rekorunuz: {(() => { try { return JSON.parse(localStorage.getItem('klavye_speedrace_best') || '0'); } catch { return 0; } })()} DBK
              </div>
            </div>

            {/* Özel Metin */}
            <div
              className="glass-panel lesson-card"
              style={{ padding: '2rem', cursor: 'pointer', display: 'flex', flexDirection: 'column', position: 'relative', overflow: 'hidden', background: 'linear-gradient(135deg, rgba(34, 211, 165, 0.06), rgba(16, 185, 129, 0.04))', border: '1px solid rgba(34, 211, 165, 0.2)' }}
              onClick={() => setIsCustomTextMode(true)}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.25rem' }}>
                <span className="badge badge-green">SERBEST MOD</span>
                <span style={{ fontSize: '1.25rem' }}>📝</span>
              </div>
              <h2 style={{ fontSize: '1.2rem', fontWeight: '700', marginBottom: '0.6rem', color: 'var(--success)', lineHeight: '1.3' }}>
                Kendi Metnini Yaz
              </h2>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', lineHeight: '1.6', flex: 1 }}>
                Kendi metnini yapıştır ve üzerinde pratik yap.
              </p>
            </div>

            {/* Katiplik Sınavı */}
            <div
              className="glass-panel lesson-card"
              style={{ padding: '2rem', cursor: 'pointer', display: 'flex', flexDirection: 'column', position: 'relative', overflow: 'hidden', background: 'linear-gradient(135deg, rgba(240,82,82,0.08), rgba(220,38,38,0.04))', border: '1px solid rgba(240,82,82,0.25)' }}
              onClick={() => {
                if (examTexts.length === 0) {
                  alert('Henüz sınav metni eklenmemiş. Lütfen önce admin panelinden metin ekleyin.');
                  return;
                }
                setIsExamSetupMode(true);
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
                Gerçek sınav metinleriyle pratik yapın.
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

          {/* Progress Chart */}
          <ProgressChart dailyHistory={gamification.data.dailyHistory} />

          {/* Achievements Gallery */}
          <AchievementsGallery
            unlockedIds={gamification.data.unlockedAchievements.map(a => a.id)}
          />

          {/* Leaderboard */}
          <Leaderboard />

          <SeoLandingSection />
          <HomeFaqSection />
        </div>

      ) : isSpeedRaceMode ? (
        <SpeedRace
          keyboardType={keyboardType}
          onBack={() => setIsSpeedRaceMode(false)}
        />

      ) : isCustomTextMode && !customText ? (
        <CustomTextMode
          onStart={(text) => {
            setCustomText(text);
            setIsCustomTextMode(false);
          }}
          onBack={() => setIsCustomTextMode(false)}
        />

      ) : customText ? (
        <div className="animate-fade-in">
          <button
            onClick={() => { setCustomText(null); setIsCustomTextMode(false); }}
            style={{ background: 'transparent', color: 'var(--text-secondary)', border: '1px solid var(--text-muted)', padding: '0.5rem 1rem', borderRadius: '6px', cursor: 'pointer', marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}
          >← Ana Ekrana Dön</button>
          <TypingEngine
            lessonId="custom-text"
            allowedCharacters={[]} 
            customWords={customText.split(/\s+/).filter(w => w.length > 0)}
            wordCount={customText.split(/\s+/).filter(w => w.length > 0).length}
            targetWpm={20}
            keyboardType={keyboardType}
          />
        </div>

      ) : isExamSetupMode ? (
        <div className="animate-fade-in" style={{ maxWidth: '700px', margin: '0 auto' }}>
          <button
            onClick={() => setIsExamSetupMode(false)}
            style={{ background: 'transparent', color: 'var(--text-secondary)', border: '1px solid var(--border-medium)', padding: '0.5rem 1.25rem', borderRadius: '8px', cursor: 'pointer', marginBottom: '2.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.95rem', transition: 'all 0.2s' }}
          >← Ana Sayfaya Dön</button>

          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <div style={{ width: '72px', height: '72px', borderRadius: '50%', background: 'rgba(239,68,68,0.15)', border: '2px solid rgba(239,68,68,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem', fontSize: '2rem' }}>⚖️</div>
            <h2 style={{ fontSize: '2.25rem', fontWeight: '800', color: 'var(--text-primary)', marginBottom: '0.5rem', letterSpacing: '-0.5px' }}>
              Katiplik Sınavı
            </h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem' }}>
              Sınav süresini seçin ve başlayın. Metin otomatik olarak belirlenecektir.
            </p>
          </div>

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
                      padding: '1.25rem 0.5rem', borderRadius: '12px', cursor: 'pointer',
                      background: isSelected ? 'var(--error-bg)' : 'var(--bg-glass)',
                      border: `2px solid ${isSelected ? 'var(--error)' : 'var(--border-subtle)'}`,
                      color: isSelected ? 'var(--error)' : 'var(--text-secondary)',
                      display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.25rem',
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

          <div style={{ marginBottom: '2.5rem', padding: '1.25rem 1.5rem', borderRadius: '12px', background: 'rgba(59,130,246,0.05)', border: '1px solid rgba(59,130,246,0.15)', display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <span style={{ fontSize: '1.5rem' }}>🎲</span>
            <p style={{ margin: 0, color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: '1.5' }}>
              Sınava başladığınızda sistem kayıtlı metinler arasından <strong style={{ color: 'var(--text-primary)' }}>rastgele</strong> bir metin seçecektir.
            </p>
          </div>

          <button
            onClick={() => {
              const randomText = examTexts[Math.floor(Math.random() * examTexts.length)];
              setSelectedExamText(randomText);
              setIsExamSetupMode(false);
              setIsExamMode(true);
            }}
            style={{
              width: '100%', padding: '1.25rem',
              background: 'linear-gradient(135deg, #ef4444, #dc2626)', color: '#fff',
              border: 'none', borderRadius: '14px', fontSize: '1.2rem', fontWeight: '700',
              cursor: 'pointer', boxShadow: '0 8px 30px rgba(239,68,68,0.35)',
              letterSpacing: '0.5px', transition: 'all 0.2s',
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
            style={{ background: 'transparent', color: 'var(--text-secondary)', border: '1px solid var(--text-muted)', padding: '0.5rem 1rem', borderRadius: '6px', cursor: 'pointer', marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}
          >← Ana Ekrana Dön</button>
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
          <AdBanner slot="3909035000" format="rectangle" />
        </div>

      ) : activeLesson ? (
        <div className="animate-fade-in">
          <button 
            onClick={() => setActiveLesson(null)}
            style={{ background: 'transparent', color: 'var(--text-secondary)', border: '1px solid var(--text-muted)', padding: '0.5rem 1rem', borderRadius: '6px', cursor: 'pointer', marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}
          >← Ders Seçimine Dön</button>

          {/* Parmak Haritası */}
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
          <AdBanner slot="6280424775" format="horizontal" />
        </div>
      ) : null}
    </main>
  );
}
