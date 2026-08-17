import React from 'react';

const stats = [
  { value: '10+', label: 'Eğitim Modülü', icon: '📚' },
  { value: '90', label: 'Katiplik WPM Barajı', icon: '⚡' },
  { value: '2-3', label: 'Hafta Öğrenme Süresi', icon: '📅' },
  { value: '100%', label: 'Ücretsiz Platform', icon: '🎁' },
];

export default function SeoLandingSection() {
  return (
    <section style={{ marginTop: '4rem' }}>

      {/* İstatistikler */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '1rem',
        marginBottom: '4.5rem',
        paddingTop: '3.5rem',
        borderTop: '1px solid var(--border-medium)',
      }}>
        {stats.map((s, i) => (
          <div key={i} className="glass-panel" style={{ padding: '1.75rem', textAlign: 'center', background: 'var(--bg-secondary)', border: '1px solid var(--border-medium)', borderRadius: '16px' }}>
            <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>{s.icon}</div>
            <div style={{ fontSize: '2rem', fontWeight: '900', color: 'var(--text-primary)', letterSpacing: '-1px' }}>{s.value}</div>
            <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '0.25rem', fontWeight: '600' }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Ana Bilgilendirici Metinler */}
      <div style={{ maxWidth: '920px', margin: '0 auto' }}>

        <div style={{ marginBottom: '3.5rem', textAlign: 'center' }}>
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
              NEDEN 10 PARMAK?
            </span>
          </div>
          <h2 style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.5rem)', fontWeight: '900', color: 'var(--text-primary)', marginBottom: '1.25rem', letterSpacing: '-0.5px', lineHeight: '1.25' }}>
            On Parmak Klavye Kullanımı<br />
            <span style={{ color: 'var(--accent-color)' }}>Zamanınızı ve Verimliliğinizi Katlar</span>
          </h2>
          <p style={{ color: 'var(--text-secondary)', lineHeight: '1.85', fontSize: '1.05rem', margin: '0 auto', maxWidth: '780px' }}>
            Dijital çağda düşünce hızında yazabilmek yalnızca bir yetenek değil; sınavlarda, profesyonel kariyerde ve günlük işlerde en büyük avantajınızdır. İki parmakla klavyeye bakarak yazmak odak kaybına, boyun ağrısına ve ciddi zaman kaybına yol açar. <strong style={{ color: 'var(--text-primary)' }}>10 parmak klavye eğitimi</strong> sayesinde gözlerinizi ekrandan ayırmadan, harfleri otomatik kas hafızanızla bulabilirsiniz.
          </p>
        </div>

        {/* İki Sütun Özellik */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem', marginBottom: '3.5rem' }}>
          <div className="glass-panel" style={{ padding: '2.2rem', background: 'var(--bg-secondary)', border: '1px solid var(--border-medium)', borderRadius: '18px' }}>
            <div style={{ fontSize: '2.2rem', marginBottom: '1rem' }}>⚖️</div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: '800', color: 'var(--text-primary)', marginBottom: '0.75rem' }}>
              Katiplik Sınavında F Klavye Üstünlüğü
            </h3>
            <p style={{ color: 'var(--text-secondary)', lineHeight: '1.75', fontSize: '0.95rem', margin: 0 }}>
              Adalet Bakanlığı Zabıt ve İcra Katipliği sınavlarında F klavye kullanan adaylar, Türkçenin harf dizilimine uygunluk sayesinde %86 oranında ana sıra tuşlarını kullanır. Parmak yorgunluğu minimize edilir ve 3 dakikalık sürede 90 kelime barajı çok daha rahat aşılır.
            </p>
          </div>
          <div className="glass-panel" style={{ padding: '2.2rem', background: 'var(--bg-secondary)', border: '1px solid var(--border-medium)', borderRadius: '18px' }}>
            <div style={{ fontSize: '2.2rem', marginBottom: '1rem' }}>🧠</div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: '800', color: 'var(--text-primary)', marginBottom: '0.75rem' }}>
              Bilimsel Rastgele Pratik Algoritması
            </h3>
            <p style={{ color: 'var(--text-secondary)', lineHeight: '1.75', fontSize: '0.95rem', margin: 0 }}>
              Sabit metinler mekanik ezbere yol açarak gerçek yazma hızını geliştirmez. Platformumuz her derste izin verilen harf havuzundan rastgele kelimeler üreterek beyninizin gerçek nöromüsküler bağlar kurmasını ve refleks kazanmasını sağlar.
            </p>
          </div>
        </div>

        {/* Katiplik Sınavı Resmi Bilgi Kartı */}
        <div style={{
          background: 'var(--bg-secondary)',
          border: '1px solid var(--border-medium)',
          borderRadius: '20px',
          padding: '2.5rem 2rem',
          marginBottom: '2rem',
          boxShadow: 'var(--shadow-md)',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.25rem' }}>
            <span style={{ fontSize: '2.2rem' }}>📋</span>
            <div>
              <span style={{ fontSize: '0.75rem', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '1px', color: 'var(--accent-color)' }}>
                RESMİ SINAV STANDARDI
              </span>
              <h3 style={{ fontSize: '1.4rem', fontWeight: '900', color: 'var(--text-primary)', margin: '0.2rem 0 0 0' }}>
                Zabıt Katipliği Uygulama Sınavı Kriterleri
              </h3>
            </div>
          </div>
          <p style={{ color: 'var(--text-secondary)', lineHeight: '1.8', marginBottom: '1.75rem', fontSize: '0.98rem' }}>
            Türkiye Cumhuriyeti <strong style={{ color: 'var(--text-primary)' }}>Adalet Bakanlığı Zabıt Katipliği</strong> sınavında adaylar, bilgisayar klavyesinde hızlı ve doğru yazma becerisini kanıtlar. 3 dakikalık süre içinde vuruş doğruluğunu koruyarak 90 net kelime barajını geçmek şarttır.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '1rem' }}>
            {[
              { label: 'Minimum Baraj', value: '90 Net Kelime', icon: '🎯', color: 'var(--success)' },
              { label: 'Sınav Süresi', value: '3 Dakika', icon: '⏱️', color: 'var(--accent-color)' },
              { label: 'Önerilen Hız', value: '110+ DBK', icon: '🚀', color: 'var(--text-primary)' },
            ].map((item, i) => (
              <div key={i} style={{ background: 'var(--bg-glass)', borderRadius: '12px', padding: '1.25rem 1rem', textAlign: 'center', border: '1px solid var(--border-subtle)' }}>
                <div style={{ fontSize: '1.5rem', marginBottom: '0.35rem' }}>{item.icon}</div>
                <div style={{ fontWeight: '900', color: item.color, fontSize: '1.2rem' }}>{item.value}</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.25rem', fontWeight: '600' }}>{item.label}</div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
