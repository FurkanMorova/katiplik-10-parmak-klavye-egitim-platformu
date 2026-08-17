import Link from 'next/link';

export const metadata = {
  title: 'Sıfırdan F Klavye Öğrenme Rehberi: Adım Adım Parmak Alıştırmaları | ParmakAkademi',
  description: 'Türkçe dil yapısına özel olarak geliştirilen F klavyeyi sıfırdan öğrenmek isteyenler için ana sıra harfleri, parmak yerleşimi ve günlük çalışma planı.',
};

export default function ArticleFOgrenme() {
  return (
    <main className="container" style={{ padding: '4rem 1.5rem 8rem', maxWidth: '840px' }}>
      <Link href="/blog" style={{ color: 'var(--text-secondary)', display: 'inline-flex', alignItems: 'center', gap: '0.5rem', marginBottom: '2rem', fontSize: '0.9rem' }}>
        ← Blog Listesine Dön
      </Link>

      <article className="glass-panel" style={{ padding: '3rem 2.5rem', borderRadius: '24px', background: 'var(--bg-secondary)', border: '1px solid var(--border-medium)' }}>
        
        <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
          <span style={{ background: 'var(--accent-light)', color: 'var(--accent-color)', padding: '0.3rem 0.75rem', borderRadius: '20px', fontSize: '0.8rem', fontWeight: '700' }}>
            🎹 F Klavye Eğitimi
          </span>
          <span style={{ background: 'var(--bg-glass)', color: 'var(--text-muted)', padding: '0.3rem 0.75rem', borderRadius: '20px', fontSize: '0.8rem', fontWeight: '600' }}>
            ⏱️ 6 dk Okuma
          </span>
        </div>

        <h1 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.6rem)', fontWeight: '900', color: 'var(--text-primary)', marginBottom: '1.5rem', lineHeight: '1.25' }}>
          Sıfırdan F Klavye Öğrenme Rehberi: Adım Adım Parmak Alıştırmaları
        </h1>

        <div style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', lineHeight: '1.85', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <p>
            F klavye, 1955 yılında İhsan Sıtkı Yener öncülüğünde Türkçede en sık kullanılan harflerin frekans analizi yapılarak tasarlanmış ulusal klavyemizdir. Türkçede kullanılan harflerin %86'sı F klavyenin ana sırasında (orta sıra) yer alır. Bu sayede parmaklar minimum hareketle maksimum hız üretir.
          </p>

          <h2 style={{ fontSize: '1.5rem', color: 'var(--text-primary)', fontWeight: '800', marginTop: '1rem' }}>
            1. Adım: Ana Sırayı Tanıyın (U İ E A Ü - T K M L Y Ş X)
          </h2>
          <p>
            F klavyede sol el parmakları sırasıyla <strong>U (Serçe), İ (Yüzük), E (Orta), A (İşaret)</strong> harfleri üzerine yerleşir. Sağ el parmakları ise <strong>K (İşaret), M (Orta), L (Yüzük), Y (Serçe)</strong> harflerinde durur. Sol işaret parmağı ayrıca <strong>Ü</strong> harfine, sağ işaret parmağı ise <strong>T</strong> harfine uzanır.
          </p>

          <h2 style={{ fontSize: '1.5rem', color: 'var(--text-primary)', fontWeight: '800', marginTop: '1rem' }}>
            2. Adım: Üst ve Alt Sıralara Uzanma
          </h2>
          <p>
            Ana sıradaki harfler kas hafızanıza yerleştikten sonra:
          </p>
          <ul style={{ paddingLeft: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <li><strong>Üst Sıra:</strong> F G Ğ I O | D R N H P Q W</li>
            <li><strong>Alt Sıra:</strong> &lt; J Ö V C Ç | Z S B . : ,</li>
          </ul>
          <p>
            Her harfe bastıktan sonra parmağınızı gecikmeden ana sıradaki temel yuvasına geri çekmeyi alışkanlık haline getirin.
          </p>

          <h2 style={{ fontSize: '1.5rem', color: 'var(--text-primary)', fontWeight: '800', marginTop: '1rem' }}>
            3. Adım: 21 Günlük F Klavye Gelişim Planı
          </h2>
          <p>
            - <strong>1-7. Gün:</strong> Yalnızca Ana Sıra harfleriyle 2 ve 3 harfli hece alıştırmaları.
            <br />
            - <strong>8-14. Gün:</strong> Üst ve alt sıranın eklenmesi, temel Türkçe kelimeler.
            <br />
            - <strong>15-21. Gün:</strong> Noktalama işaretleri, büyük harfler (Shift) ve 3 dakikalık metin denemeleri.
          </p>
        </div>

        <div style={{ marginTop: '3rem', padding: '2rem', borderRadius: '16px', background: 'var(--bg-glass)', border: '1px solid var(--border-medium)', textAlign: 'center' }}>
          <h3 style={{ fontSize: '1.3rem', fontWeight: '800', color: 'var(--text-primary)', marginBottom: '0.75rem' }}>
            Sıfırdan F Klavye Derslerine Başlayın
          </h3>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', marginBottom: '1.5rem' }}>
            İnteraktif parmak haritası ve adım adım F klavye dersleriyle 1. dersten hemen öğrenmeye başlayın.
          </p>
          <Link href="/" style={{ display: 'inline-block', padding: '0.85rem 2rem', background: 'var(--accent-color)', color: '#121214', fontWeight: '800', borderRadius: '10px', textDecoration: 'none' }}>
            🎹 F Klavye Derslerine Git →
          </Link>
        </div>

      </article>
    </main>
  );
}
