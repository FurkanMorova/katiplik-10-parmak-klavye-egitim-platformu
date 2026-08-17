"use client";

import { useState } from 'react';
import Link from 'next/link';

interface BlogPost {
  title: string;
  slug: string;
  excerpt: string;
  date: string;
  emoji: string;
  category: string;
  readTime: string;
  featured?: boolean;
}

const POSTS: BlogPost[] = [
  {
    title: 'Zabıt Katipliği Sınavında 3 Dakikada 90 Kelime Barajını Geçme Taktikleri',
    slug: '3-dakikada-90-kelime-yazma-teknikleri',
    excerpt: 'Adalet Bakanlığı zabıt katipliği uygulama sınavında 3 dakikada net 90 kelime barajını aşmak için kanıtlanmış çalışma taktikleri, heyecan kontrolü ve sınav anı stratejileri.',
    date: '18.05.2026',
    emoji: '⚖️',
    category: 'Katiplik Sınavı',
    readTime: '7 dk okuma',
    featured: true,
  },
  {
    title: '10 Parmak Klavyede Hataları Sıfırlamanın ve Hızlanmanın 7 Altın Kuralı',
    slug: 'klavyede-hata-oranini-dusurme-ve-hizlanma',
    excerpt: 'Klavyede yazı yazarken yapılan basış hatalarını en aza indirerek yazma hızınızı (DBK) iki katına çıkaracak 7 bilimsel yöntem ve ritim alıştırmaları.',
    date: '16.05.2026',
    emoji: '🎯',
    category: 'Hız & Doğruluk',
    readTime: '6 dk okuma',
  },
  {
    title: 'Sıfırdan F Klavye Öğrenme Rehberi: Adım Adım Parmak Alıştırmaları',
    slug: 'f-klavye-ogrenme-rehberi-ve-alistirmalar',
    excerpt: 'Türkçe dil yapısına özel olarak geliştirilen F klavyeyi sıfırdan öğrenmek isteyenler için ana sıra harfleri, parmak yerleşimi ve 21 günlük gelişim planı.',
    date: '14.05.2026',
    emoji: '🎹',
    category: 'F Klavye',
    readTime: '6 dk okuma',
  },
  {
    title: 'Klavyede Doğru Oturuş, Bilek Ergonomisi ve Sağlıklı Parmak Pozisyonları',
    slug: 'dogru-oturus-ve-bilek-ergonomisi',
    excerpt: 'Uzun süreli bilgisayar ve klavye kullanımında bilek ağrılarını ve karpal tünel sendromunu önleyen, hızı artıran ergonomik oturuş pozisyonu rehberi.',
    date: '10.05.2026',
    emoji: '🪑',
    category: 'Ergonomi & Sağlık',
    readTime: '5 dk okuma',
  },
  {
    title: '10 Parmak Klavye Nasıl Öğrenilir? Kesin Çözüm Rehberi',
    slug: '10-parmak-klavye-nasil-ogrenilir',
    excerpt: 'Klavyeye bakmadan yazmaya başlamak ilk başta imkansız gibi görünse de doğru kas hafızası teknikleriyle sandığınızdan çok daha kolaydır.',
    date: '02.05.2026',
    emoji: '⌨️',
    category: '10 Parmak',
    readTime: '5 dk okuma',
  },
  {
    title: 'Zabıt Katipliği Sınavı Tüyoları ve Heyecan Yenme',
    slug: 'zabit-katipligi-sinavi-tuyolari',
    excerpt: 'Klavye sınavlarında 3 dakikada 90 kelime barajını aşmak için yapmanız gereken fiziksel ve psikolojik hazırlıklar.',
    date: '28.04.2026',
    emoji: '🏛️',
    category: 'Katiplik Sınavı',
    readTime: '5 dk okuma',
  },
  {
    title: 'F Klavye mi, Q Klavye mi? Hangisi Daha Hızlı?',
    slug: 'f-klavye-vs-q-klavye',
    excerpt: 'Türkçe metinler yazarken F klavyenin anatomik avantajları ve Q klavyenin global üstünlüğünün detaylı karşılaştırması.',
    date: '15.04.2026',
    emoji: '🤔',
    category: 'F Klavye',
    readTime: '5 dk okuma',
  }
];

const CATEGORIES = ['Tümü', 'Katiplik Sınavı', 'Hız & Doğruluk', 'F Klavye', '10 Parmak', 'Ergonomi & Sağlık'];

export default function BlogIndex() {
  const [selectedCategory, setSelectedCategory] = useState('Tümü');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredPosts = POSTS.filter(post => {
    const matchesCategory = selectedCategory === 'Tümü' || post.category === selectedCategory;
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const featuredPost = POSTS.find(p => p.featured) || POSTS[0];

  return (
    <main className="container" style={{ padding: '4rem 1.5rem 8rem', minHeight: '80vh', maxWidth: '1200px' }}>
      <div className="animate-fade-in-up">
        
        {/* ÜST BAŞLIK */}
        <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
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
              📚 AKADEMİ BLOG & REHBERLER
            </span>
          </div>
          <h1 style={{ fontSize: 'clamp(2.2rem, 5vw, 3.5rem)', fontWeight: '900', color: 'var(--text-primary)', marginBottom: '1rem', letterSpacing: '-1.5px' }}>
            On Parmak & Katiplik <span style={{ color: 'var(--accent-color)' }}>Rehberleri</span>
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.15rem', maxWidth: '640px', margin: '0 auto', lineHeight: '1.6' }}>
            Zabıt katipliği sınav stratejileri, klavye hızlandırma egzersizleri ve ergonomi ipuçları.
          </p>
        </div>

        {/* ÖNE ÇIKAN MAKALE HERO KARTI */}
        {selectedCategory === 'Tümü' && !searchQuery && (
          <Link
            href={`/blog/${featuredPost.slug}`}
            className="glass-panel"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '2rem',
              padding: '2.5rem',
              borderRadius: '24px',
              background: 'linear-gradient(135deg, var(--bg-secondary) 0%, rgba(245, 158, 11, 0.05) 100%)',
              border: '1px solid var(--border-medium)',
              textDecoration: 'none',
              marginBottom: '3.5rem',
              boxShadow: 'var(--shadow-lg)',
              transition: 'all 0.2s',
            }}
          >
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', marginBottom: '1rem' }}>
                <span style={{ background: 'var(--accent-color)', color: '#121214', padding: '0.3rem 0.8rem', borderRadius: '20px', fontSize: '0.78rem', fontWeight: '900', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                  ⭐ ÖNE ÇIKAN REHBER
                </span>
                <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem', fontWeight: '600' }}>
                  {featuredPost.readTime}
                </span>
              </div>
              <h2 style={{ fontSize: 'clamp(1.5rem, 3vw, 2.2rem)', fontWeight: '900', color: 'var(--text-primary)', marginBottom: '1rem', lineHeight: '1.3', letterSpacing: '-0.5px' }}>
                {featuredPost.title}
              </h2>
              <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', lineHeight: '1.7', margin: 0, marginBottom: '1.5rem' }}>
                {featuredPost.excerpt}
              </p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--accent-color)', fontWeight: '800', fontSize: '1rem' }}>
                <span>Rehberi Oku</span>
                <span>→</span>
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--bg-glass)', borderRadius: '18px', padding: '2rem', fontSize: '5rem', border: '1px solid var(--border-subtle)' }}>
              {featuredPost.emoji}
            </div>
          </Link>
        )}

        {/* FİLTRE VE ARAMA ÇUBUĞU */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', marginBottom: '3rem' }}>
          
          {/* Arama Kutusu */}
          <div style={{ position: 'relative', maxWidth: '480px', width: '100%', margin: '0 auto' }}>
            <input
              type="text"
              placeholder="Makalelerde ara... (örn: katiplik, 90 kelime, F klavye)"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              style={{
                width: '100%',
                padding: '0.85rem 1.25rem 0.85rem 2.8rem',
                borderRadius: '12px',
                background: 'var(--bg-secondary)',
                border: '1px solid var(--border-medium)',
                color: 'var(--text-primary)',
                fontSize: '0.95rem',
                outline: 'none',
                boxSizing: 'border-box',
              }}
            />
            <span style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }}>
              🔍
            </span>
          </div>

          {/* Kategori Butonları */}
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', justifyContent: 'center' }}>
            {CATEGORIES.map(cat => {
              const isSelected = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  style={{
                    padding: '0.5rem 1.1rem',
                    borderRadius: '20px',
                    border: `1px solid ${isSelected ? 'var(--accent-color)' : 'var(--border-subtle)'}`,
                    background: isSelected ? 'var(--accent-light)' : 'var(--bg-glass)',
                    color: isSelected ? 'var(--accent-color)' : 'var(--text-secondary)',
                    fontWeight: isSelected ? '800' : '600',
                    fontSize: '0.85rem',
                    cursor: 'pointer',
                    transition: 'all 0.15s',
                  }}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>

        {/* MAKALELER IZGARASI */}
        {filteredPosts.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '4rem 1rem', color: 'var(--text-muted)' }}>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🔎</div>
            <h3>Aradığınız kriterlere uygun makale bulunamadı.</h3>
            <p>Farklı bir arama terimi deneyebilir veya kategorileri sıfırlayabilirsiniz.</p>
          </div>
        ) : (
          <div style={{ display: 'grid', gap: '2rem', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))' }}>
            {filteredPosts.map(post => (
              <Link 
                key={post.slug} 
                href={`/blog/${post.slug}`} 
                className="glass-panel lesson-card" 
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  padding: '2.2rem',
                  textDecoration: 'none',
                  background: 'var(--bg-secondary)',
                  border: '1px solid var(--border-medium)',
                  borderRadius: '20px',
                  transition: 'all 0.2s',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
                  <span style={{ fontSize: '2.4rem' }}>{post.emoji}</span>
                  <span style={{
                    padding: '0.25rem 0.7rem',
                    borderRadius: '20px',
                    background: 'var(--bg-glass)',
                    border: '1px solid var(--border-subtle)',
                    fontSize: '0.75rem',
                    fontWeight: '700',
                    color: 'var(--accent-color)',
                  }}>
                    {post.category}
                  </span>
                </div>

                <h2 style={{ fontSize: '1.3rem', fontWeight: '800', color: 'var(--text-primary)', marginBottom: '0.85rem', lineHeight: '1.4' }}>
                  {post.title}
                </h2>

                <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: '1.65', flex: 1, margin: 0 }}>
                  {post.excerpt}
                </p>

                <div style={{ marginTop: '1.75rem', paddingTop: '1.25rem', borderTop: '1px solid var(--border-subtle)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: 'var(--text-muted)', fontSize: '0.82rem', fontWeight: '600' }}>
                  <span>⏱️ {post.readTime}</span>
                  <span style={{ color: 'var(--accent-color)', fontWeight: '800' }}>Devamını Oku →</span>
                </div>
              </Link>
            ))}
          </div>
        )}

        {/* ALT CTA BİLGİ ALANI */}
        <div style={{ marginTop: '5rem', textAlign: 'center', padding: '3.5rem 2rem', borderRadius: '24px', background: 'var(--bg-secondary)', border: '1px solid var(--border-medium)' }}>
          <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🚀</div>
          <h2 style={{ fontSize: '2rem', fontWeight: '900', color: 'var(--text-primary)', marginBottom: '0.75rem' }}>
            Hemen Klavyenizin Başına Geçin
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', maxWidth: '560px', margin: '0 auto 2rem', lineHeight: '1.6' }}>
            Öğrendiğiniz taktikleri pratikle birleştirin. 10 parmak derslerine başlayın veya 3 dakikalık katiplik sınavında kendinizi test edin.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/" style={{ padding: '0.9rem 2rem', background: 'var(--accent-color)', color: '#121214', fontWeight: '900', borderRadius: '12px', textDecoration: 'none', boxShadow: 'var(--shadow-accent)' }}>
              ⌨️ 10 Parmak Derslerine Başla
            </Link>
            <Link href="/" style={{ padding: '0.9rem 2rem', background: 'var(--bg-glass)', color: 'var(--text-primary)', fontWeight: '800', borderRadius: '12px', textDecoration: 'none', border: '1px solid var(--border-medium)' }}>
              ⚖️ Katiplik Sınavı Çöz
            </Link>
          </div>
        </div>

      </div>
    </main>
  );
}
