import Link from 'next/link';
import AdBanner from '../../../components/AdBanner';

export const metadata = {
  title: '10 Parmak Klavye Nasıl Öğrenilir? Kesin Çözüm Rehberi | Parmak Akademi',
  description: 'Klavyeye bakmadan yazmaya başlamak ilk başta imkansız gibi görünse de doğru kas hafızası teknikleriyle sandığınızdan çok daha kolaydır.',
};

export default function BlogPost() {
  return (
    <main className="container" style={{ padding: '5rem 1.5rem 8rem', maxWidth: '800px' }}>
      <div className="animate-fade-in-up">
        <Link href="/blog" style={{ display: 'inline-block', marginBottom: '2rem', color: 'var(--accent-color)', fontWeight: '600', textDecoration: 'none' }}>
          ← Blog'a Dön
        </Link>
        
        <h1 style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: '900', color: 'var(--text-primary)', marginBottom: '1.5rem', lineHeight: '1.2', letterSpacing: '-1px' }}>
          10 Parmak Klavye Nasıl Öğrenilir? Kesin Çözüm Rehberi
        </h1>
        
        <div style={{ display: 'flex', gap: '1rem', color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '3rem', fontWeight: '500' }}>
          <span>📅 02.05.2026</span>
          <span>•</span>
          <span>⏱️ 4 dk okuma</span>
        </div>

        <div style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', lineHeight: '1.8', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <p>
            On parmak klavye kullanımı (Touch Typing), günümüzde bilgisayar başında zaman geçiren herkesin sahip olması gereken en temel yeteneklerden biridir. Peki, yıllarca iki parmakla klavyeye bakarak yazmaya alışmış biri, nasıl olur da ekrandan gözünü hiç ayırmadan harflerin yerini ezbere bulabilir?
          </p>

          <h2 style={{ color: 'var(--text-primary)', fontSize: '1.75rem', marginTop: '1.5rem', marginBottom: '0.5rem', fontWeight: '800' }}>1. Temel Kural: Klavyeye Bakmak Yasak!</h2>
          <p>
            On parmak öğrenmenin tek ve en önemli kuralı budur. Klavyeye baktığınız an, beyniniz harfin yerini ezberlemek yerine görsel bir kopya çeker ve kas hafızanız asla gelişmez. Başlangıçta çok hata yapsanız bile, gözünüz sürekli ekranda olmalıdır. Parmak Akademi'nin dinamik eğitim modüllerinde hatalı bastığınızda ekran sizi uyarır, böylece klavyeye bakmadan doğru tuşu bulana kadar denemeye devam edersiniz.
          </p>

          <h2 style={{ color: 'var(--text-primary)', fontSize: '1.75rem', marginTop: '1.5rem', marginBottom: '0.5rem', fontWeight: '800' }}>2. Parmakların Ana Yuvası (Temel Sıra)</h2>
          <p>
            Klavyede (F veya Q) bir temel sıra vardır. Elleriniz klavyeye ilk değdiğinde işaret parmaklarınız, üzerinde küçük bir kabartı (çizgi veya nokta) bulunan tuşlara (F klavyede A ve K, Q klavyede F ve J) yerleşmelidir. Tüm parmaklar bu sıradan çıkarak diğer tuşlara uzanır ve işini bitirdikten sonra tekrar bu ana yuvaya döner.
          </p>

          <h2 style={{ color: 'var(--text-primary)', fontSize: '1.75rem', marginTop: '1.5rem', marginBottom: '0.5rem', fontWeight: '800' }}>3. Kas Hafızası Süreci (Kaslar Değil Beyin Öğrenir)</h2>
          <p>
            Aslında parmak kaslarınız değil, beyniniz öğreniyor. Sürekli aynı hareket paternlerini tekrarladığınızda, beyninizdeki nöron bağları güçlenir. Yaklaşık 2-3 haftalık düzenli (günde 20-30 dakika) bir çalışma sonucunda, zihniniz "A" harfini düşündüğünde sol serçe parmağınız (Q klavyede) otomatik olarak hareket edecektir.
          </p>

          <div style={{ padding: '1.5rem', background: 'var(--accent-light)', borderLeft: '4px solid var(--accent-color)', borderRadius: '0 12px 12px 0', marginTop: '1rem', marginBottom: '1rem' }}>
            <strong style={{ color: 'var(--text-primary)' }}>💡 İpucu:</strong> Hızlanmaya çalışmayın. Başlangıçta sadece %100 doğrulukla (hiç hata yapmadan) yavaşça yazmaya odaklanın. İsabet oranınız yüksek olduğunda, hız kendiliğinden gelecektir.
          </div>

          <p>
            Eğer bu serüvene başlamaya hazırsanız, ana sayfamızdaki "Ders 1: Temel Sıra" eğitiminden hemen ücretsiz başlayabilirsiniz. Sabırlı olun, ilk 3 günden sonraki gelişiminize inanamayacaksınız!
          </p>

          {/* Makale sonu reklam */}
          <AdBanner slot="3909035000" format="rectangle" />
        </div>
      </div>
    </main>
  );
}
