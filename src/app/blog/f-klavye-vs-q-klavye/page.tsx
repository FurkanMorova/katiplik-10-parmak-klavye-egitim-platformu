import Link from 'next/link';
import AdBanner from '../../../components/AdBanner';

export const metadata = {
  title: 'F Klavye mi, Q Klavye mi? | Parmak Akademi',
  description: 'Türkçe metinler yazarken F klavyenin anatomik avantajları ve Q klavyenin global üstünlüğünün detaylı karşılaştırması.',
};

export default function BlogPost() {
  return (
    <main className="container" style={{ padding: '5rem 1.5rem 8rem', maxWidth: '800px' }}>
      <div className="animate-fade-in-up">
        <Link href="/blog" style={{ display: 'inline-block', marginBottom: '2rem', color: 'var(--accent-color)', fontWeight: '600', textDecoration: 'none' }}>
          ← Blog'a Dön
        </Link>
        
        <h1 style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: '900', color: 'var(--text-primary)', marginBottom: '1.5rem', lineHeight: '1.2', letterSpacing: '-1px' }}>
          F Klavye mi, Q Klavye mi? Hangisi Daha Hızlı?
        </h1>
        
        <div style={{ display: 'flex', gap: '1rem', color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '3rem', fontWeight: '500' }}>
          <span>📅 15.04.2026</span>
          <span>•</span>
          <span>⏱️ 3 dk okuma</span>
        </div>

        <div style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', lineHeight: '1.8', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <p>
            Bilgisayar daktilo döneminden günümüze taşındığında, Türkiye'de en çok sorulan sorulardan biri hep şu olmuştur: Yazı yazarken F klavye mi kullanmalıyım, yoksa alışkın olduğum Q klavye mi? Bu sorunun cevabı, aslında klavyeyi hangi amaçla kullanacağınıza göre değişmektedir.
          </p>

          <h2 style={{ color: 'var(--text-primary)', fontSize: '1.75rem', marginTop: '1.5rem', marginBottom: '0.5rem', fontWeight: '800' }}>F Klavyenin Eşsiz Avantajı</h2>
          <p>
            F Klavye, İhsan Sıtkı Yener öncülüğünde tamamen Türk dilinin fonetik yapısı ve kelime anatomisi dikkate alınarak tasarlanmıştır. Türkçede en sık kullanılan harfler (A, E, K, İ, M, vb.) parmakların en güçlü ve en hızlı olduğu "temel sıraya" (orta sıra) yerleştirilmiştir. Bu sayede parmaklarınız klavyede daha az mesafeye hareket eder, daha az yorulur ve mükemmel bir hız yakalar. Dünya daktilo şampiyonalarında Türk takımının elde ettiği tarihi birinciliklerin sırrı tamamen F klavyenin bu bilimsel tasarımından kaynaklanmaktadır. 
          </p>
          <p>
            Eğer bir roman yazarı, sekreter veya Zabıt Katibi adayıysanız ve gününüzün büyük bir bölümü "Türkçe" metin yazarak geçiyorsa, kesinlikle F klavyeyi tercih etmelisiniz.
          </p>

          <h2 style={{ color: 'var(--text-primary)', fontSize: '1.75rem', marginTop: '1.5rem', marginBottom: '0.5rem', fontWeight: '800' }}>Q Klavyenin Evrensel Gücü</h2>
          <p>
            Q klavye ise İngilizce daktilolardaki harf çubuklarının birbirine takılmasını önlemek amacıyla "yavaşlatmak" felsefesiyle tasarlanmıştır. Ancak zamanla dünya standardı haline gelmiştir. Günümüzde kodlama dilleri (HTML, CSS, JS vb.) İngilizce karakter ve terimler içerdiği için yazılımcıların F klavye kullanması çok büyük bir dezavantajdır. Keza yabancı dilde iletişim kuranlar veya oyuncular (WASD tuş dizilimi) için Q klavye zorunluluk gibidir.
          </p>

          <div style={{ padding: '1.5rem', background: 'rgba(34, 211, 165, 0.08)', borderLeft: '4px solid var(--success)', borderRadius: '0 12px 12px 0', marginTop: '1rem', marginBottom: '1rem' }}>
            <strong style={{ color: 'var(--success)' }}>Sonuç Kararı:</strong> 
            Katiplik sınavına hazırlanıyorsanız veya veri girişi memuruysanız <strong>F Klavye</strong>. <br />
            Yazılımcı, oyuncu veya global çalışan biriyseniz <strong>Q Klavye</strong> öğrenmelisiniz.
          </div>

          <p>
            Parmak Akademi üzerinde profilinizden klavye tipini seçerek hem Q hem de F klavyede kendinizi geliştirebilirsiniz. Unutmayın, klavye türü ne olursa olsun "on parmak (bakmadan)" yazmak her zaman iki parmakla bakarak yazmaktan daha hızlıdır.
          </p>

          {/* Makale sonu reklam */}
          <AdBanner slot="3909035000" format="rectangle" />
        </div>
      </div>
    </main>
  );
}
