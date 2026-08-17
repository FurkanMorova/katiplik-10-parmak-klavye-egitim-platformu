import Link from 'next/link';

export const metadata = {
  title: 'Klavyede Doğru Oturuş, Bilek Ergonomisi ve Sağlıklı Parmak Pozisyonları | ParmakAkademi',
  description: 'Uzun süreli bilgisayar ve klavye kullanımında bilek ağrılarını önleyen, hızı artıran ergonomik oturuş pozisyonu ve parmak duruş rehberi.',
};

export default function ArticleErgonomi() {
  return (
    <main className="container" style={{ padding: '4rem 1.5rem 8rem', maxWidth: '840px' }}>
      <Link href="/blog" style={{ color: 'var(--text-secondary)', display: 'inline-flex', alignItems: 'center', gap: '0.5rem', marginBottom: '2rem', fontSize: '0.9rem' }}>
        ← Blog Listesine Dön
      </Link>

      <article className="glass-panel" style={{ padding: '3rem 2.5rem', borderRadius: '24px', background: 'var(--bg-secondary)', border: '1px solid var(--border-medium)' }}>
        
        <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
          <span style={{ background: 'var(--accent-light)', color: 'var(--accent-color)', padding: '0.3rem 0.75rem', borderRadius: '20px', fontSize: '0.8rem', fontWeight: '700' }}>
            🪑 Ergonomi & Sağlık
          </span>
          <span style={{ background: 'var(--bg-glass)', color: 'var(--text-muted)', padding: '0.3rem 0.75rem', borderRadius: '20px', fontSize: '0.8rem', fontWeight: '600' }}>
            ⏱️ 5 dk Okuma
          </span>
        </div>

        <h1 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.6rem)', fontWeight: '900', color: 'var(--text-primary)', marginBottom: '1.5rem', lineHeight: '1.25' }}>
          Klavyede Doğru Oturuş, Bilek Ergonomisi ve Sağlıklı Parmak Pozisyonları
        </h1>

        <div style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', lineHeight: '1.85', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <p>
            Klavye başında saatlerce yazı yazan katip adayları, yazılımcılar ve ofis çalışanlarının en sık karşılaştığı sağlık problemleri; bilek ağrıları, karpal tünel sendromu, boyun ve omuz tutulmalarıdır. Hızlı ve yorulmadan yazabilmenin ilk şartı, doğru çalışma ergonomisini sağlamaktır.
          </p>

          <h2 style={{ fontSize: '1.5rem', color: 'var(--text-primary)', fontWeight: '800', marginTop: '1rem' }}>
            1. Sandalye ve Ekran Hizalaması
          </h2>
          <p>
            Ayak tabanlarınız yere tam basmalı, dizleriniz 90 derecelik dik bir açı oluşturmalıdır. Monitörünüzün üst kenarı tam göz hizanızda olmalıdır; böylece boynunuzu öne veya aşağı bükmek zorunda kalmazsınız. Ekran ile gözleriniz arasında yaklaşık 50-70 cm mesafe bırakılmalıdır.
          </p>

          <h2 style={{ fontSize: '1.5rem', color: 'var(--text-primary)', fontWeight: '800', marginTop: '1rem' }}>
            2. Bileklerin Konumu (Karpal Tüneli Önleme)
          </h2>
          <p>
            Yazarken bileklerinizi masa yüzeyine sertçe bastırmaktan kaçının. Bilekleriniz klavyeyle aynı hizada ve hafifçe havada durmalıdır (piyano çalar gibi). Bileklerinizi bükmeden, ön kollarınızla düz bir çizgi halinde tutmak tendonlardaki baskıyı en aza indirir.
          </p>

          <h2 style={{ fontSize: '1.5rem', color: 'var(--text-primary)', fontWeight: '800', marginTop: '1rem' }}>
            3. Parmakların Kavisli Duruşu
          </h2>
          <p>
            Parmaklarınızı düz uzatmak yerine, elinizin altında görünmez bir tenis topu tutuyormuş gibi hafifçe kavisli (bükük) tutun. Tuşlara parmak uçlarının etli kısmıyla değil, tırnağa yakın üst kısımla hafif ve seri dokunuşlar yapın.
          </p>

          <h2 style={{ fontSize: '1.5rem', color: 'var(--text-primary)', fontWeight: '800', marginTop: '1rem' }}>
            4. 20-20-20 Kuralı ve Esneme Egzersizleri
          </h2>
          <p>
            Her 20 dakikada bir 20 saniye mola verin ve 6 metre (20 feet) uzağa bakın. Ayrıca saatte bir parmaklarınızı geriye doğru esneterek ve omuzlarınızı dairesel hareketlerle çevirerek kan dolaşımını canlandırın.
          </p>
        </div>

      </article>
    </main>
  );
}
