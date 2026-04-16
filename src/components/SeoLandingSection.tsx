import React from 'react';

const stats = [
  { value: '10+', label: 'Eğitim Modülü', icon: '📚' },
  { value: '90', label: 'Katiplik WPM Barajı', icon: '⚡' },
  { value: '2-3', label: 'Hafta Öğrenme Süresi', icon: '📅' },
  { value: '100%', label: 'Ücretsiz Platform', icon: '🎁' },
];

const faqItems = [
  {
    q: '10 parmak klavye öğrenmek ne kadar sürer?',
    a: 'Günde sadece 20–30 dakika düzenli pratik yaparak yaklaşık 2–3 hafta içinde tuşları bakmadan bulabilirsiniz. Profesyonel hızlara (70+ DBK) ulaşmak 1–2 aylık istikrarlı çalışmayla mümkündür.',
  },
  {
    q: 'DBK (Dakika Başı Kelime) nasıl hesaplanır?',
    a: 'Uluslararası standartlara göre her 5 doğru karakter 1 kelime sayılır. Platformumuz doğru vuruşlarınıza ve geçen süreye göre anlık DBK değerinizi hesaplar.',
  },
  {
    q: 'Katiplik sınavında kaç kelime yazmak gerekir?',
    a: 'Dönem ve kuruma göre değişse de genellikle 3 dakikada net 90 kelime barajı aranmaktadır. Üst sıralara girmek için 120+ DBK hedeflenmelidir.',
  },
  {
    q: 'F Klavye mi Q Klavye mi daha avantajlı?',
    a: 'F Klavye Türkçe\'nin fonetik yapısına göre tasarlandığından sık kullanılan harfler ana sıradadır, bu da parmak hareketini azaltır. Türkçe sınav odaklı çalışanlar için F Klavye önerilir.',
  },
  {
    q: 'Katiplik Sınavı modu nasıl çalışır?',
    a: 'Admin tarafından yüklenen gerçek sınav metinleri arasından rastgele bir metin seçilir. 1, 3, 5, 10 dakika veya sınırsız süre seçenekleriyle gerçek sınav simülasyonu yapabilirsiniz.',
  },
];

export default function SeoLandingSection() {
  return (
    <section style={{ marginTop: '5rem' }}>

      {/* İstatistikler */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '1rem',
        marginBottom: '5rem',
        paddingTop: '4rem',
        borderTop: '1px solid var(--border-subtle)',
      }}>
        {stats.map((s, i) => (
          <div key={i} className="glass-panel" style={{ padding: '1.75rem', textAlign: 'center' }}>
            <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>{s.icon}</div>
            <div style={{ fontSize: '2rem', fontWeight: '800', color: 'var(--text-primary)', letterSpacing: '-1px' }}>{s.value}</div>
            <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Ana SEO İçerik */}
      <div style={{ maxWidth: '820px', margin: '0 auto' }}>

        <div style={{ marginBottom: '4rem', textAlign: 'center' }}>
          <span className="badge badge-blue" style={{ marginBottom: '1rem' }}>Neden Önemli?</span>
          <h2 style={{ fontSize: '2.25rem', fontWeight: '800', color: 'var(--text-primary)', marginBottom: '1.5rem', letterSpacing: '-0.5px', lineHeight: '1.2' }}>
            On Parmak Klavye Eğitimi<br />
            <span style={{ color: 'var(--accent-color)' }}>Kariyerinizi Değiştirir</span>
          </h2>
          <p style={{ color: 'var(--text-secondary)', lineHeight: '1.9', fontSize: '1.05rem' }}>
            Dijitalleşen dünyada zamanımızın büyük bölümü bilgisayar başında geçiyor. <strong style={{ color: 'var(--text-primary)' }}>On parmak klavye kullanımı</strong> (touch typing), sadece mesleki bir gereklilik değil; düşünce hızınıza yetişmek, enerjinizi korumak ve verimliliğinizi katlamak için en kritik yeteneklerden biridir. İki parmakla yazmak sürekli klavyeye bakmak anlamına gelir; bu da boyun ağrısı, dikkat dağınıklığı ve düşük verimlilik demektir. 10 parmak klavye eğitimiyle ekranla aranızdaki tüm engeller kalkar.
          </p>
        </div>

        {/* İki sütun içerik */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '4rem' }}>
          <div className="glass-panel" style={{ padding: '2rem' }}>
            <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>⚖️</div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: '700', color: 'var(--text-primary)', marginBottom: '1rem' }}>
              Katiplik Sınavı İçin F Klavye
            </h3>
            <p style={{ color: 'var(--text-secondary)', lineHeight: '1.8', fontSize: '0.95rem' }}>
              Adalet Bakanlığı Zabıt Katipliği ve İcra Katipliği sınavlarında adaylardan belirli sürede yüksek kelime hızı beklenir. Türkçe'ye özel geliştirilen <strong style={{ color: 'var(--text-primary)' }}>F Klavye</strong>, sık kullanılan harfleri ana sıraya yerleştirerek parmak hareketini ciddi ölçüde azaltır. Bu avantajla sınav barajını daha kolay aşabilirsiniz.
            </p>
          </div>
          <div className="glass-panel" style={{ padding: '2rem' }}>
            <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>🧠</div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: '700', color: 'var(--text-primary)', marginBottom: '1rem' }}>
              Bilimsel Rastgele Pratik
            </h3>
            <p style={{ color: 'var(--text-secondary)', lineHeight: '1.8', fontSize: '0.95rem' }}>
              Pek çok uygulama sabit metinlerle mekanik ezbere yol açar. Platformumuzun <strong style={{ color: 'var(--text-primary)' }}>Rastgele Metin Üretim Algoritması</strong>, belirlenen harf havuzundan sonsuz kombinasyon oluşturur. Beyniniz gerçek bir öğrenme sürecine girer, kas hafızanız kalıcı olarak gelişir.
            </p>
          </div>
        </div>

        {/* Katiplik sınavı detay kutusu */}
        <div style={{
          background: 'linear-gradient(135deg, rgba(240, 82, 82, 0.06), rgba(240, 82, 82, 0.02))',
          border: '1px solid rgba(240, 82, 82, 0.2)',
          borderRadius: 'var(--radius-xl)',
          padding: '2.5rem',
          marginBottom: '4rem',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
            <span style={{ fontSize: '2rem' }}>📋</span>
            <div>
              <span className="badge badge-red" style={{ marginBottom: '0.25rem' }}>Resmi Bilgi</span>
              <h3 style={{ fontSize: '1.35rem', fontWeight: '700', color: 'var(--text-primary)' }}>
                Zabıt Katipliği Sınavı Klavye Bilgileri
              </h3>
            </div>
          </div>
          <p style={{ color: 'var(--text-secondary)', lineHeight: '1.9', marginBottom: '1rem', fontSize: '0.95rem' }}>
            Türkiye Cumhuriyeti <strong style={{ color: 'var(--text-primary)' }}>Adalet Bakanlığı Zabıt Katipliği</strong> sınavı; bilgisayar klavyesinde hızlı ve doğru yazma becerisini ölçen pratik bir testten oluşmaktadır. Adaylar belirli bir süie içinde —genellikle 3 dakika— yanlış yazım oranını minimize ederek yüksek kelime barajını aşmak zorundadır.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem', marginTop: '1.5rem' }}>
            {[
              { label: 'Minimum Baraj', value: '90 Net Kelime', icon: '🎯' },
              { label: 'Sınav Süresi', value: '3 Dakika', icon: '⏱️' },
              { label: 'Önerilen Hız', value: '120+ DBK', icon: '🚀' },
            ].map((item, i) => (
              <div key={i} style={{ background: 'rgba(240, 82, 82, 0.06)', borderRadius: 'var(--radius-md)', padding: '1.25rem', textAlign: 'center' }}>
                <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>{item.icon}</div>
                <div style={{ fontWeight: '700', color: 'var(--error)', fontSize: '1.1rem' }}>{item.value}</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>{item.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* SSS bölümü */}
        <div className="glass-panel" style={{ padding: '2.5rem', marginBottom: '2rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '2rem' }}>
            <span style={{ fontSize: '1.5rem' }}>❓</span>
            <h3 style={{ fontSize: '1.35rem', fontWeight: '700', color: 'var(--text-primary)' }}>
              Sıkça Sorulan Sorular
            </h3>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
            {faqItems.map((item, i) => (
              <div key={i} style={{
                padding: '1.5rem 0',
                borderBottom: i < faqItems.length - 1 ? '1px solid var(--border-subtle)' : 'none',
              }}>
                <div style={{ fontWeight: '600', color: 'var(--text-primary)', marginBottom: '0.6rem', fontSize: '0.95rem' }}>
                  {item.q}
                </div>
                <p style={{ color: 'var(--text-secondary)', lineHeight: '1.7', fontSize: '0.9rem', margin: 0 }}>
                  {item.a}
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
