import Link from 'next/link';

export const metadata = {
  title: 'Blog | Parmak Akademi',
  description: '10 parmak klavye eğitimi, katiplik sınavı tüyoları ve klavye hızlandırma teknikleri hakkında makaleler.',
};

const POSTS = [
  {
    title: '10 Parmak Klavye Nasıl Öğrenilir? Kesin Çözüm Rehberi',
    slug: '10-parmak-klavye-nasil-ogrenilir',
    excerpt: 'Klavyeye bakmadan yazmaya başlamak ilk başta imkansız gibi görünse de doğru kas hafızası teknikleriyle sandığınızdan çok daha kolaydır.',
    date: '02.05.2026',
    emoji: '⌨️'
  },
  {
    title: 'Zabıt Katipliği Sınavı Tüyoları ve Heyecan Yenme',
    slug: 'zabit-katipligi-sinavi-tuyolari',
    excerpt: 'Klavye sınavlarında 3 dakikada 90 kelime barajını aşmak için yapmanız gereken fiziksel ve psikolojik hazırlıklar.',
    date: '28.04.2026',
    emoji: '⚖️'
  },
  {
    title: 'F Klavye mi, Q Klavye mi? Hangisi Daha Hızlı?',
    slug: 'f-klavye-vs-q-klavye',
    excerpt: 'Türkçe metinler yazarken F klavyenin anatomik avantajları ve Q klavyenin global üstünlüğünün detaylı karşılaştırması.',
    date: '15.04.2026',
    emoji: '🤔'
  }
];

export default function BlogIndex() {
  return (
    <main className="container" style={{ padding: '5rem 1.5rem 8rem', minHeight: '80vh' }}>
      <div className="animate-fade-in-up">
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <h1 style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: '900', color: 'var(--text-primary)', marginBottom: '1rem', letterSpacing: '-1px' }}>
            Klavye <span style={{ color: 'var(--accent-color)' }}>Akademi Blog</span>
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.15rem', maxWidth: '600px', margin: '0 auto' }}>
            Klavye hızınızı artıracak taktikler, katiplik sınavı ipuçları ve teknolojik incelemeler.
          </p>
        </div>

        <div style={{ display: 'grid', gap: '2rem', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))' }}>
          {POSTS.map(post => (
            <Link 
              key={post.slug} 
              href={`/blog/${post.slug}`} 
              className="glass-panel lesson-card" 
              style={{ display: 'flex', flexDirection: 'column', padding: '2rem', textDecoration: 'none' }}
            >
              <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>{post.emoji}</div>
              <h2 style={{ fontSize: '1.35rem', fontWeight: '800', color: 'var(--text-primary)', marginBottom: '1rem', lineHeight: '1.4' }}>
                {post.title}
              </h2>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: '1.6', flex: 1 }}>
                {post.excerpt}
              </p>
              <div style={{ marginTop: '1.5rem', paddingTop: '1.5rem', borderTop: '1px solid var(--border-subtle)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: 'var(--text-muted)', fontSize: '0.85rem', fontWeight: '600' }}>
                <span>{post.date}</span>
                <span style={{ color: 'var(--accent-color)' }}>Devamını Oku →</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
