"use client";
import Link from 'next/link';
import FingerMap from '../../components/FingerMap';

const steps = [
  {
    number: '01',
    icon: '🎯',
    title: 'Klavye Türünüzü Seçin',
    desc: 'Ana sayfadan F Klavye veya Q Klavye seçeneğini belirleyin. Katiplik ve zabıt katipliği sınavına hazırlanıyorsanız F Klavye\'yi, global yazılım/geliştirme işleri için Q Klavye\'yi tercih edin.',
    tip: 'Katiplik sınavına hazırlanıyorsanız F Klavye çok daha büyük avantaj sağlar.',
  },
  {
    number: '02',
    icon: '📚',
    title: 'Ders Modülleri ile Başlayın',
    desc: 'Her ders modülü farklı bir harf grubunu kapsar. Temel harflerden başlayıp yavaş yavaş ilerlemeniz kas hafızanızın kalıcı oluşması için kritik öneme sahiptir. Acele etmeden, her modülde hedef DBK\'ya ulaşana kadar pratik yapın.',
    tip: 'Günde 20-30 dakika düzenli çalışmak, 2-3 saatlik seyrek seanslardan çok daha etkilidir.',
  },
  {
    number: '03',
    icon: '🔁',
    title: 'Rastgele Metin Algoritması ile Tekrar Edin',
    desc: 'Platformumuz sabit metinler yerine her seferinde farklı kelime kombinasyonları üretir. Bu sayede yazımı "ezberleme" değil "anlama" yoluyla öğrenirsiniz. Beyin, yeni kombinasyonlar gördükçe gerçek motor öğrenme yapar.',
    tip: 'Aynı dersi en az 3-5 kez tekrarlayın; her tekrarda yeni kelimeler gelecektir.',
  },
  {
    number: '04',
    icon: '⚖️',
    title: 'Katiplik Sınavı Modunu Kullanın',
    desc: 'Gerçek sınav metinleri ile 1, 3, 5, 10 dakika veya sınırsız süre seçenekleriyle pratik yapın. Sınav tamamlandıktan sonra DBK hızınız, doğruluğunuz ve hata sayınız detaylı rapor olarak sunulur.',
    tip: '3 dakika seçeneği, Adalet Bakanlığı Zabıt Katipliği sınavıyla birebir aynı format.',
  },
  {
    number: '05',
    icon: '📊',
    title: 'İlerlemenizi Takip Edin',
    desc: 'Her egzersiz sonrası performans verileri kayıt altına alınır. Rekor DBK\'nız, ortalama hata sayınız ve tamamlanan test sayısı istatistiklerinizi analiz ederek zayıf noktalarınıza odaklanabilirsiniz.',
    tip: '90 DBK barajını aştıktan sonra 120+ DBK hedefleyin; üst sıralama için bu kritik.',
  },
];

const tipItems = [
  { icon: '👀', title: 'Klavyeye Bakmayın', desc: 'Ekrana bakarak yazın. İlk haftalarda hata yapmanız normaldir, ama klavyeye bakmak kas hafızasının oluşmasını engeller.' },
  { icon: '🪑', title: 'Doğru Oturuş', desc: 'Sırtınız dik, dirsekler 90°, ekran göz hizasında olmalı. Yanlış ergonomi, uzun vadede boyun ve bilek ağrısına yol açar.' },
  { icon: '🖐️', title: 'Parmak Pozisyonu', desc: 'F Klavye\'de: sol el "U İ E A" tuşlarında, sağ el "K M L Y" tuşlarında başlangıç pozisyonunda bekler. Her vuruştan sonra ellerinizi bu pozisyona geri getirin.' },
  { icon: '🐢', title: 'Önce Doğruluk, Sonra Hız', desc: 'Hız, doğruluğun kendiliğinden gelen yan ürünüdür. Hızlı ama yanlış yazmak yerine yavaş ama doğru yazmaya odaklanın; hız zamanla gelir.' },
  { icon: '⏱️', title: 'Mola Verin', desc: 'Sürekli pratik yorgunluğa ve kalıp yanlışlarının pekişmesine yol açar. Her 25-30 dakikada 5 dakika mola, öğrenme kalitesini artırır.' },
  { icon: '🎯', title: 'Zayıf Harflere Odaklanın', desc: 'Hangi harf gruplarında daha fazla hata yaptığınızı fark edin ve o grubun dersine geri dönün. Hedef odaklı pratik, genel tekrara göre 3 kat daha etkilidir.' },
];

const faqItems = [
  {
    q: 'On parmak klavye öğrenmek için minimum yaş var mı?',
    a: '10 parmak klavye eğitimi için minimum yaş kısıtlaması yoktur. Parmakların motor koordinasyonu gelişmiş her bireyler (genellikle 7-8 yaş ve üzeri) başarıyla öğrenebilir. Yetişkinler de aynı yöntemi uygular; ancak küçük yaşta başlayanlar daha kısa sürede ustalaşır.',
  },
  {
    q: 'F Klavye mi, Q Klavye mi öğrenmeliyim?',
    a: 'Katiplik sınavına, devlet memurluğuna veya Türkçe ağırlıklı iş ortamına hazırlanıyorsanız F Klavye. Yazılım geliştirme, İngilizce belge hazırlama veya uluslararası iş ortamı için Q Klavye uygundur. İkinci bir klavye öğrenmek de mümkündür; temel beceriler kazanıldıktan sonra geçiş genellikle 2-3 hafta sürer.',
  },
  {
    q: 'Zabıt Katipliği sınavında hangi metin türleri çıkar?',
    a: 'Adalet Bakanlığı zabıt katipliği sınavında genellikle hukuki terimler içeren mahkeme tutanağı benzeri metinler kullanılır. Platformumuzdaki Katiplik Sınavı modunda bu tür metinlerden derlenen gerçek içerikler bulunmaktadır.',
  },
  {
    q: 'Katiplik sınavında kaç hata yapılabilir?',
    a: 'Sınav barajı "net kelime" üzerinden hesaplanır; yani yanlış yazdığınız kelimeler toplam sayıdan düşülür. Genellikle 3 dakikada 90 net kelime şartı aranır. Hata oranını %25\'in altında tutmak hedeflenen barajı aşmak için gereklidir.',
  },
  {
    q: 'Platformu kullanmak için üye olmam gerekiyor mu?',
    a: 'Hayır. Tüm eğitim modülleri, Katiplik Sınavı modu ve istatistikler kayıt gerektirmeden ücretsiz kullanılabilir. Giriş yapmanız yalnızca kişisel ilerleme verilerinizin bulut üzerinde saklanmasını istiyorsanız gereklidir.',
  },
];

export default function NasilCalisir() {
  return (
    <main>
      {/* Hero */}
      <section style={{
        background: 'linear-gradient(180deg, rgba(79,142,247,0.06) 0%, transparent 100%)',
        borderBottom: '1px solid var(--border-subtle)',
        padding: '5rem 0 4rem',
      }}>
        <div className="container" style={{ maxWidth: '860px' }}>
          <Link href="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '2.5rem', transition: 'color 0.2s' }}
            onMouseEnter={e => (e.currentTarget.style.color = 'var(--accent-color)')}
            onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-muted)')}
          >← Ana Sayfaya Dön</Link>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.35rem 0.9rem', borderRadius: '999px', background: 'rgba(79,142,247,0.1)', border: '1px solid rgba(79,142,247,0.25)', marginBottom: '1.5rem' }}>
            <span style={{ fontSize: '0.75rem', color: 'var(--accent-color)', fontWeight: '600', letterSpacing: '0.5px' }}>REHBER</span>
          </div>
          <h1 style={{ fontSize: 'clamp(2rem, 5vw, 3.25rem)', fontWeight: '900', letterSpacing: '-1.5px', lineHeight: '1.1', marginBottom: '1.25rem', color: 'var(--text-primary)' }}>
            10 Parmak Klavye{' '}
            <span style={{ background: 'linear-gradient(135deg, #4f8ef7, #7c55f7)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
              Nasıl Çalışılır?
            </span>
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', lineHeight: '1.8', maxWidth: '680px' }}>
            On parmak klavye eğitiminin bilimsel temelleri, doğru çalışma yöntemi ve <strong style={{ color: 'var(--text-primary)' }}>Zabıt Katipliği sınavına</strong> etkili hazırlık — adım adım rehber.
          </p>
        </div>
      </section>

      {/* Adımlar */}
      <section style={{ padding: '5rem 0' }}>
        <div className="container" style={{ maxWidth: '860px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '3rem' }}>
            <span style={{ fontSize: '1.5rem' }}>🗺️</span>
            <h2 style={{ fontSize: '1.75rem', fontWeight: '800', color: 'var(--text-primary)', letterSpacing: '-0.5px' }}>
              Adım Adım Çalışma Planı
            </h2>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {steps.map((step, i) => (
              <div key={i} className="glass-panel" style={{ padding: '2rem', display: 'flex', gap: '2rem', alignItems: 'flex-start' }}>
                <div style={{
                  flexShrink: 0,
                  width: '56px', height: '56px',
                  borderRadius: '14px',
                  background: 'rgba(79,142,247,0.1)',
                  border: '1px solid rgba(79,142,247,0.2)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '1.5rem',
                }}>
                  {step.icon}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
                    <span style={{ fontSize: '0.7rem', fontWeight: '800', color: 'var(--accent-color)', letterSpacing: '2px' }}>{step.number}</span>
                    <h3 style={{ fontSize: '1.1rem', fontWeight: '700', color: 'var(--text-primary)' }}>{step.title}</h3>
                  </div>
                  <p style={{ color: 'var(--text-secondary)', lineHeight: '1.75', fontSize: '0.95rem', marginBottom: '0.75rem' }}>{step.desc}</p>
                  <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.35rem 0.85rem', background: 'rgba(34,211,165,0.07)', border: '1px solid rgba(34,211,165,0.2)', borderRadius: '8px' }}>
                    <span style={{ fontSize: '0.75rem' }}>💡</span>
                    <span style={{ fontSize: '0.8rem', color: 'var(--success)' }}>{step.tip}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Parmak Haritası */}
      <section style={{ padding: '0 0 5rem', borderTop: '1px solid var(--border-subtle)' }}>
        <div className="container" style={{ maxWidth: '860px', paddingTop: '4rem' }}>
          <FingerMap />
        </div>
      </section>

      {/* Katiplik Sınavı Odaklı Bölüm */}
      <section style={{ padding: '0 0 5rem' }}>
        <div className="container" style={{ maxWidth: '860px' }}>
          <div style={{
            padding: '3rem',
            borderRadius: '24px',
            background: 'linear-gradient(135deg, rgba(240,82,82,0.08), rgba(220,38,38,0.03))',
            border: '1px solid rgba(240,82,82,0.2)',
            marginBottom: '4rem',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
              <span style={{ fontSize: '2.5rem' }}>⚖️</span>
              <div>
                <span style={{ fontSize: '0.7rem', fontWeight: '700', color: 'var(--error)', letterSpacing: '2px', textTransform: 'uppercase' }}>Resmi Sınav</span>
                <h2 style={{ fontSize: '1.6rem', fontWeight: '800', color: 'var(--text-primary)', letterSpacing: '-0.5px', marginTop: '0.1rem' }}>
                  Zabıt Katipliği Sınavına Nasıl Hazırlanılır?
                </h2>
              </div>
            </div>

            <p style={{ color: 'var(--text-secondary)', lineHeight: '1.85', fontSize: '0.975rem', marginBottom: '1.75rem' }}>
              Türkiye Cumhuriyeti <strong style={{ color: 'var(--text-primary)' }}>Adalet Bakanlığı Zabıt Katipliği</strong> ile <strong style={{ color: 'var(--text-primary)' }}>İcra Müdür Yardımcılığı ve Katipliği</strong> sınavlarında adaylar, bilgisayar klavyesinde belirli bir süre içinde yüksek hız ve doğruluk ile metin yazma becerisini test etmek zorundadır. Sınav formatı şu şekilde işler:
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem', marginBottom: '2rem' }}>
              {[
                { label: 'Sınav Süresi', value: '3 Dakika', desc: 'Genellikle 3 dakika okuma + 3 dakika yazma', icon: '⏱️' },
                { label: 'Net Kelime Barajı', value: '90 Kelime', desc: 'Hatalı kelimeler toplam sayıdan düşülür', icon: '🎯' },
                { label: 'Önerilen Hedef', value: '120+ DBK', desc: 'Üst sıralama için ek güvenlik payı', icon: '🚀' },
                { label: 'Hata Toleransı', value: '<%25', desc: 'Net kelime için hata oranı çok düşük tutulmalı', icon: '✅' },
              ].map((item, i) => (
                <div key={i} style={{ background: 'rgba(240,82,82,0.06)', borderRadius: '12px', padding: '1.25rem' }}>
                  <div style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>{item.icon}</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--error)', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '0.25rem' }}>{item.label}</div>
                  <div style={{ fontSize: '1.25rem', fontWeight: '800', color: 'var(--text-primary)', marginBottom: '0.2rem' }}>{item.value}</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', lineHeight: '1.5' }}>{item.desc}</div>
                </div>
              ))}
            </div>

            <p style={{ color: 'var(--text-secondary)', lineHeight: '1.85', fontSize: '0.95rem', marginBottom: '1.5rem' }}>
              Platformumuzun <strong style={{ color: 'var(--text-primary)' }}>Katiplik Sınavı modu</strong>, gerçek sınav koşullarını birebir simüle eder. Admin tarafından eklenen orijinal hukuki metinler kullanılır; sistem metni rastgele Seçerek sürpriz faktörünü korur. Sınav tamamlandığında DBK, doğruluk oranı ve hata analizi detaylı olarak sunulur.
            </p>

            <Link href="/" style={{
              display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
              padding: '0.85rem 1.75rem',
              background: 'linear-gradient(135deg, #f05252, #dc2626)',
              color: '#fff',
              borderRadius: '12px',
              fontWeight: '700',
              fontSize: '0.95rem',
              boxShadow: '0 6px 20px rgba(240,82,82,0.35)',
              transition: 'all 0.2s',
            }}>Katiplik Sınavı Modunu Dene →</Link>
          </div>

          {/* F Klavye vs Q Klavye */}
          <div style={{ marginBottom: '4rem' }}>
            <h2 style={{ fontSize: '1.6rem', fontWeight: '800', color: 'var(--text-primary)', letterSpacing: '-0.5px', marginBottom: '0.75rem' }}>
              F Klavye mi, Q Klavye mi?
            </h2>
            <p style={{ color: 'var(--text-secondary)', lineHeight: '1.8', marginBottom: '1.5rem', fontSize: '0.975rem' }}>
              Türk alfabesine özel geliştirilen F Klavye, Türkçe kelimelerin en sık kullanılan harflerini (A, E, I, İ, N, R gibi) ana sıraya yerleştirir. Bu sayede parmak yatay hareketi Q Klavye'ye kıyasla yaklaşık <strong style={{ color: 'var(--text-primary)' }}>%30-40 azalır</strong>. Katiplik sınavı hazırlığında bu avantaj sınav puanına doğrudan yansır.
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              {[
                {
                  type: 'F Klavye',
                  color: 'var(--accent-color)',
                  bg: 'rgba(79,142,247,0.08)',
                  border: 'rgba(79,142,247,0.2)',
                  pros: ['Türkçe için optimize', 'Az parmak hareketi', 'Katiplik sınavında avantaj', 'Türk devlet kurumlarında standart'],
                  cons: ['Global içerik için az yaygın'],
                },
                {
                  type: 'Q Klavye',
                  color: 'var(--success)',
                  bg: 'rgba(34,211,165,0.06)',
                  border: 'rgba(34,211,165,0.15)',
                  pros: ['Dünya standardı', 'Yazılım geliştirme için ideal', 'İngilizce içerik için verimli', 'Uluslararası donanım uyumu'],
                  cons: ['Türkçe için daha fazla parmak hareketi'],
                },
              ].map((item, i) => (
                <div key={i} style={{ background: item.bg, border: `1px solid ${item.border}`, borderRadius: '16px', padding: '1.75rem' }}>
                  <div style={{ fontWeight: '800', fontSize: '1.15rem', color: item.color, marginBottom: '1rem' }}>{item.type}</div>
                  <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    {item.pros.map((pro, j) => (
                      <li key={j} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                        <span style={{ color: item.color, flexShrink: 0 }}>✓</span>{pro}
                      </li>
                    ))}
                    {item.cons.map((con, j) => (
                      <li key={j} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', fontSize: '0.875rem', color: 'var(--text-muted)' }}>
                        <span style={{ flexShrink: 0 }}>–</span>{con}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Pratik İpuçları */}
      <section style={{ padding: '0 0 5rem', background: 'rgba(255,255,255,0.01)', borderTop: '1px solid var(--border-subtle)', borderBottom: '1px solid var(--border-subtle)' }}>
        <div className="container" style={{ maxWidth: '860px', paddingTop: '4rem' }}>
          <h2 style={{ fontSize: '1.6rem', fontWeight: '800', color: 'var(--text-primary)', letterSpacing: '-0.5px', marginBottom: '0.5rem' }}>
            Uzmanlardan Pratik İpuçları
          </h2>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '2.5rem', fontSize: '0.95rem' }}>
            Hızlı ilerlemenin kısa yolları — yanlış alışkanlıklardan önce doğru temeli kurun.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '1rem' }}>
            {tipItems.map((tip, i) => (
              <div key={i} className="glass-panel" style={{ padding: '1.5rem' }}>
                <div style={{ fontSize: '1.75rem', marginBottom: '0.75rem' }}>{tip.icon}</div>
                <div style={{ fontWeight: '700', color: 'var(--text-primary)', marginBottom: '0.5rem', fontSize: '0.95rem' }}>{tip.title}</div>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', lineHeight: '1.65', margin: 0 }}>{tip.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SSS */}
      <section style={{ padding: '5rem 0' }}>
        <div className="container" style={{ maxWidth: '860px' }}>
          <h2 style={{ fontSize: '1.6rem', fontWeight: '800', color: 'var(--text-primary)', letterSpacing: '-0.5px', marginBottom: '2.5rem' }}>
            Sıkça Sorulan Sorular
          </h2>
          <div className="glass-panel" style={{ padding: '0.5rem 2rem' }}>
            {faqItems.map((item, i) => (
              <div key={i} style={{ padding: '1.75rem 0', borderBottom: i < faqItems.length - 1 ? '1px solid var(--border-subtle)' : 'none' }}>
                <div style={{ fontWeight: '700', color: 'var(--text-primary)', marginBottom: '0.6rem', fontSize: '0.975rem' }}>{item.q}</div>
                <p style={{ color: 'var(--text-secondary)', lineHeight: '1.75', fontSize: '0.9rem', margin: 0 }}>{item.a}</p>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div style={{ marginTop: '3rem', textAlign: 'center' }}>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>Artık yeterince hazırsınız — hemen başlayın!</p>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link href="/#egitimler" style={{
                padding: '0.85rem 2rem',
                background: 'var(--accent-color)',
                color: '#fff',
                borderRadius: '10px',
                fontWeight: '700',
                fontSize: '0.95rem',
                boxShadow: 'var(--shadow-accent)',
              }}>Eğitime Başla →</Link>
              <Link href="/" style={{
                padding: '0.85rem 2rem',
                background: 'transparent',
                color: 'var(--text-secondary)',
                borderRadius: '10px',
                fontWeight: '600',
                fontSize: '0.95rem',
                border: '1px solid var(--border-medium)',
              }}>Ana Sayfaya Dön</Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
