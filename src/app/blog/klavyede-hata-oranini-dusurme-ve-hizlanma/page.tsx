import Link from 'next/link';

export const metadata = {
  title: '10 Parmak Klavyede Hataları Sıfırlamanın ve Hızlanmanın 7 Altın Kuralı | ParmakAkademi',
  description: 'Klavyede yazı yazarken yapılan basış hatalarını en aza indirerek yazma hızınızı (DBK) iki katına çıkaracak 7 bilimsel yöntem ve egzersiz tekniği.',
};

export default function ArticleHataDusurme() {
  return (
    <main className="container" style={{ padding: '4rem 1.5rem 8rem', maxWidth: '840px' }}>
      <Link href="/blog" style={{ color: 'var(--text-secondary)', display: 'inline-flex', alignItems: 'center', gap: '0.5rem', marginBottom: '2rem', fontSize: '0.9rem' }}>
        ← Blog Listesine Dön
      </Link>

      <article className="glass-panel" style={{ padding: '3rem 2.5rem', borderRadius: '24px', background: 'var(--bg-secondary)', border: '1px solid var(--border-medium)' }}>
        
        <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
          <span style={{ background: 'var(--accent-light)', color: 'var(--accent-color)', padding: '0.3rem 0.75rem', borderRadius: '20px', fontSize: '0.8rem', fontWeight: '700' }}>
            🎯 Hız & Doğruluk
          </span>
          <span style={{ background: 'var(--bg-glass)', color: 'var(--text-muted)', padding: '0.3rem 0.75rem', borderRadius: '20px', fontSize: '0.8rem', fontWeight: '600' }}>
            ⏱️ 6 dk Okuma
          </span>
        </div>

        <h1 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.6rem)', fontWeight: '900', color: 'var(--text-primary)', marginBottom: '1.5rem', lineHeight: '1.25' }}>
          10 Parmak Klavyede Hataları Sıfırlamanın ve Hızlanmanın 7 Altın Kuralı
        </h1>

        <div style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', lineHeight: '1.85', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <p>
            On parmak klavye kullanırken hızınızı sınırlayan en büyük faktör parmaklarınızın hareket kabiliyeti değil, <strong>yaptığınız hataları düzeltmek için harcadığınız zamandır</strong>. Her bir hata, yalnızca yanlış harfe basma süresini değil; duraksama, Backspace tuşuna basma ve zihnin ritmini yeniden yakalama sürecini kapsar.
          </p>

          <h2 style={{ fontSize: '1.5rem', color: 'var(--text-primary)', fontWeight: '800', marginTop: '1rem' }}>
            1. Ana Sıra (Home Row) Pozisyonunu Asla Kaybetmeyin
          </h2>
          <p>
            Parmaklarınızın referans noktası daima ana sıradır (F klavyede <strong>U İ E A Ü - T K M L Y</strong>, Q klavyede <strong>A S D F G - H J K L</strong>). Bir üst veya alt sıradaki tuşa bastıktan sonra parmağınız hemen ana sıradaki yuvasına geri dönmelidir. İşaret parmaklarındaki çıkıntılar (A/K veya F/J) klavyeye bakmadan konumunuzu teyit etmenizi sağlar.
          </p>

          <h2 style={{ fontSize: '1.5rem', color: 'var(--text-primary)', fontWeight: '800', marginTop: '1rem' }}>
            2. Klavyeye Bakma Alışkanlığını Kesin Olarak Bırakın
          </h2>
          <p>
            Gözleriniz klavyeye her indiğinde beyniniz ekran ile tuşlar arasında geçiş yapmak zorunda kalır ve akış bozulur. Yanlış tuşa bassanız dahi klavyeye bakmayın; kas hafızasının hata yaparak doğru mesafeyi öğrenmesine izin verin.
          </p>

          <h2 style={{ fontSize: '1.5rem', color: 'var(--text-primary)', fontWeight: '800', marginTop: '1rem' }}>
            3. Ritim Duygusu Geliştirin (Metronom Tekniği)
          </h2>
          <p>
            Hızlı yazan profesyoneller harflere dalgalı değil, sabit bir ritimle (metronom gibi tık-tık-tık) basarlar. Kolay kelimelerde hızlanıp zor kelimelerde yavaşlamak yerine, dengeli bir tempo tutturmak hata oranını %80 oranında düşürür.
          </p>

          <h2 style={{ fontSize: '1.5rem', color: 'var(--text-primary)', fontWeight: '800', marginTop: '1rem' }}>
            4. Zayıf Parmaklarınızı Hedefleyen Egzersizler Yapın
          </h2>
          <p>
            Genellikle serçe ve yüzük parmakları (sol serçe Q, A, Z tuşları veya sağ serçe P, Ğ, Ü tuşları) işaret ve orta parmaklara göre daha zayıftır. Platformumuzdaki Isı Haritası (Heatmap) özelliğini kullanarak en çok hata yaptığınız harfleri tespit edin ve o harfleri içeren özel egzersizlere ağırlık verin.
          </p>

          <h2 style={{ fontSize: '1.5rem', color: 'var(--text-primary)', fontWeight: '800', marginTop: '1rem' }}>
            5. Harfleri Değil, Kelime Gruplarını Görselleştirin
          </h2>
          <p>
            Gelişmiş 10 parmak yazarları harf harf değil, sık kullanılan hece ve kelime blokları ("ve", "ile", "için", "olan", "hukuk", "mahkeme") halinde yazarlar. Beyin kelimeyi bir bütün olarak algıladığında parmaklar tek bir otomatik hareket dizisiyle kelimeyi tamamlar.
          </p>

          <h2 style={{ fontSize: '1.5rem', color: 'var(--text-primary)', fontWeight: '800', marginTop: '1rem' }}>
            6. Doğru Oturuş ve Bilek Duruşunu Koruyun
          </h2>
          <p>
            Bileklerinizi masaya yapıştırmak parmakların hareket alanını kısıtlar ve karpal tünel riskini artırır. Bilekler masadan hafifçe havada, dirsekler 90 derece açıda olmalıdır.
          </p>

          <h2 style={{ fontSize: '1.5rem', color: 'var(--text-primary)', fontWeight: '800', marginTop: '1rem' }}>
            7. Düzenli ve Kısa Seanslar Halinde Pratik Yapın
          </h2>
          <p>
            Haftada bir gün 4 saat çalışmak yerine, her gün 20 dakika pratik yapmak nöromüsküler kas hafızasının kalıcı olmasını sağlar. Günde 20 dakika ParmakAkademi dersleri ile 30 günde yazma hızınızı ikiye katlayabilirsiniz.
          </p>
        </div>

      </article>
    </main>
  );
}
