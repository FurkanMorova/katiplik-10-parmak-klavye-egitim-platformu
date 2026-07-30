import Link from 'next/link';
import AdBanner from '../../../components/AdBanner';

export const metadata = {
  title: 'Zabıt Katipliği Sınavı Tüyoları | Parmak Akademi',
  description: 'Klavye sınavlarında 3 dakikada 90 kelime barajını aşmak için yapmanız gereken fiziksel ve psikolojik hazırlıklar.',
};

export default function BlogPost() {
  return (
    <main className="container" style={{ padding: '5rem 1.5rem 8rem', maxWidth: '800px' }}>
      <div className="animate-fade-in-up">
        <Link href="/blog" style={{ display: 'inline-block', marginBottom: '2rem', color: 'var(--accent-color)', fontWeight: '600', textDecoration: 'none' }}>
          ← Blog'a Dön
        </Link>
        
        <h1 style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: '900', color: 'var(--text-primary)', marginBottom: '1.5rem', lineHeight: '1.2', letterSpacing: '-1px' }}>
          Zabıt Katipliği Sınavı Tüyoları ve Heyecan Yenme
        </h1>
        
        <div style={{ display: 'flex', gap: '1rem', color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '3rem', fontWeight: '500' }}>
          <span>📅 28.04.2026</span>
          <span>•</span>
          <span>⏱️ 5 dk okuma</span>
        </div>

        <div style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', lineHeight: '1.8', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <p>
            Zabıt katipliği ve icra katipliği uygulamalı klavye sınavı, adayların 3 dakika içerisinde yanlışsız ve eksiksiz en az 90 net kelime yazmasını gerektiren zorlu bir maratondur. Evde 120-130 kelime yazabilen adayların birçoğu sınav esnasında heyecana yenik düşerek barajı geçemeyebilir. İşte bu heyecanı yenmenin ve sınavda başarıya ulaşmanın kanıtlanmış yolları.
          </p>

          <h2 style={{ color: 'var(--text-primary)', fontSize: '1.75rem', marginTop: '1.5rem', marginBottom: '0.5rem', fontWeight: '800' }}>1. Sınav Simülasyonu Yapın</h2>
          <p>
            Evde sessiz ve sakin bir odada, kendi rahat klavyenizde pratik yapmak sizi yanıltabilir. Sınav salonunda onlarca kişinin aynı anda klavye tuşlarına basmasından oluşan bir "takırtı" gürültüsü olacaktır. Bu sese alışmak için çalışırken arka planda "klavye ses efekti" veya "sınav salonu gürültüsü" açarak pratik yapın. Ayrıca platformumuzdaki "Katiplik Sınavı" modunu kullanarak tam 3 dakikalık gerçek testleri çözün.
          </p>

          <h2 style={{ color: 'var(--text-primary)', fontSize: '1.75rem', marginTop: '1.5rem', marginBottom: '0.5rem', fontWeight: '800' }}>2. Kelime Kelime Değil, Hece Hece veya Blok Okuma</h2>
          <p>
            Kelimeleri tek tek harf olarak düşünmek hızınızı düşürür. Kelimeyi bütün olarak algılayıp yazmaya alışın. "Defter" kelimesini "D-E-F-T-E-R" olarak değil, tek bir refleks olarak yazın. Ayrıca kopyalayacağınız metinde daima yazdığınız kelimenin bir sonrakine odaklanın (İleri okuma tekniği).
          </p>

          <h2 style={{ color: 'var(--text-primary)', fontSize: '1.75rem', marginTop: '1.5rem', marginBottom: '0.5rem', fontWeight: '800' }}>3. Yanlış Kelimeyi Düzeltmek Zaman Kaybıdır (Bazen)</h2>
          <p>
            Adalet Bakanlığı sınav değerlendirmesinde vuruş hesabı yapılmaz, doğru yazılan kelime sayısına bakılır. Eğer uzun bir kelimede sona geldiğinizde hata yaptığınızı fark ederseniz, kelimeyi tamamen silip baştan yazmak size 3-4 saniyeye mal olabilir. Bunun yerine boşluk bırakıp bir sonraki kelimeye geçmek ve o anı kurtarmak bazen daha stratejiktir (Ancak metnin bütünlüğünü bozmamaya dikkat edin).
          </p>

          <div style={{ padding: '1.5rem', background: 'rgba(240, 82, 82, 0.08)', borderLeft: '4px solid var(--error)', borderRadius: '0 12px 12px 0', marginTop: '1rem', marginBottom: '1rem' }}>
            <strong style={{ color: 'var(--error)' }}>⚠️ Uyarı:</strong> Satır atlamamaya çok dikkat edin! Sınav heyecanıyla bir satırı veya kelime öbeğini tamamen atlarsanız, değerlendirme yazılımı sonraki tüm kelimeleri "yanlış" olarak kabul edebilir ve sınavınız geçersiz sayılabilir. Göz takibini çok iyi yapın.
          </div>

          <p>
            Heyecanınızı yenmenin en kesin yolu kendinize güvenmektir. Kendinize güvenmek için de bolca tekrar yapmalısınız. Parmak Akademi sınav modunda her gün en az 5 sınav denemesi yaparak bu güveni kazanabilirsiniz.
          </p>

          {/* Makale sonu reklam */}
          <AdBanner slot="3909035000" format="rectangle" />
        </div>
      </div>
    </main>
  );
}
