import Link from 'next/link';

export const metadata = {
  title: 'Gizlilik Politikası ve KVKK Aydınlatma Metni | ParmakAkademi',
  description: 'ParmakAkademi gizlilik politikası, çerezler, Google AdSense üçüncü taraf reklamları ve kişisel verilerin korunması hakkında bilgilendirme.',
};

export default function GizlilikPolitikasi() {
  return (
    <main className="container" style={{ padding: '4rem 1.5rem 8rem', maxWidth: '840px' }}>
      <div className="glass-panel" style={{ padding: '3rem 2.5rem', borderRadius: '24px', background: 'var(--bg-secondary)', border: '1px solid var(--border-medium)' }}>
        <h1 style={{ fontSize: '2.5rem', fontWeight: '900', marginBottom: '1rem', color: 'var(--text-primary)', letterSpacing: '-1px' }}>
          Gizlilik Politikası ve KVKK Aydınlatma Metni
        </h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '2rem' }}>
          Son Güncelleme: {new Date().toLocaleDateString('tr-TR')}
        </p>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem', lineHeight: '1.85', color: 'var(--text-secondary)', fontSize: '1.02rem' }}>
          <p>
            <strong>ParmakAkademi</strong> ("Platform") olarak kullanıcılarımızın gizliliğine, kişisel verilerinin güvenliğine ve şeffaflık ilkelerine en yüksek düzeyde riayet etmekteyiz. 6698 sayılı Kişisel Verilerin Korunması Kanunu ("KVKK") ve Avrupa Birliği Genel Veri Koruma Yönetmeliği ("GDPR") kapsamında hazırlanan bu metin, platformumuzu ziyaret ettiğinizde verilerinizin nasıl toplandığını, işlendiğini ve korunduğunu açıklamaktadır.
          </p>

          <h2 style={{ fontSize: '1.4rem', color: 'var(--text-primary)', fontWeight: '800' }}>1. Toplanan Veriler ve İşlenme Amaçları</h2>
          <ul style={{ paddingLeft: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
            <li><strong>Hesap Bilgileri:</strong> Platforma kayıt olduğunuzda belirlediğiniz ad, soyad, kullanıcı adı ve güvenli tek yönlü şifreleme (bcrypt) ile saklanan parola verileriniz profilinizi oluşturmak amacıyla işlenir.</li>
            <li><strong>Eğitim ve Performans Verileri:</strong> Tamamladığınız dersler, sınav sonuçları, dakika başına kelime (DBK) hızınız, doğruluk oranınız ve hata istatistikleriniz kişisel gelişiminizi takip edebilmeniz ve isteğe bağlı liderlik sıralamasına katılabilmeniz için kaydedilir.</li>
            <li><strong>Teknik Veriler:</strong> Sitemizi ziyaret ettiğinizde IP adresi, tarayıcı türü, cihaz işletim sistemi ve sayfa görüntüleme süreleri gibi anonim analitik veriler platform performansını iyileştirmek için toplanır.</li>
          </ul>

          <h2 style={{ fontSize: '1.4rem', color: 'var(--text-primary)', fontWeight: '800' }}>2. Çerezler (Cookies) ve Üçüncü Taraf Reklam Ortakları</h2>
          <p>
            Platformumuz, kullanıcı deneyimini zenginleştirmek, site trafiğini analiz etmek ve ilgi alanlarınıza uygun kişiselleştirilmiş içerik ile reklam sunabilmek amacıyla çerezler (cookies) kullanmaktadır.
          </p>
          <ul style={{ paddingLeft: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
            <li><strong>Google AdSense & DoubleClick Çerezleri:</strong> Google dahil olmak üzere üçüncü taraf sağlayıcılar, kullanıcıların platformumuza veya internetteki diğer web sitelerine daha önce yaptıkları ziyaretleri temel alan reklamlar yayınlamak için çerezleri (DART çerezi) kullanır.</li>
            <li>Kullanıcılar, <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent-color)', textDecoration: 'underline' }}>Google Reklam Ayarları</a> sayfasını ziyaret ederek kişiselleştirilmiş reklamcılık için kullanılan çerezleri devre dışı bırakabilirler.</li>
            <li><strong>Google Analytics:</strong> Ziyaretçi davranışlarını anlamak ve site hızını optimize etmek amacıyla anonim istatistiksel çerezler kullanılmaktadır.</li>
          </ul>

          <h2 style={{ fontSize: '1.4rem', color: 'var(--text-primary)', fontWeight: '800' }}>3. Verilerin Korunması ve Güvenliği</h2>
          <p>
            Kullanıcı parolaları veritabanımızda asla düz metin olarak tutulmaz; endüstri standardı <strong>bcrypt hashing</strong> algoritmalarıyla korunur. Tüm veri iletimi güvenli SSL/TLS (HTTPS) şifreleme protokolü üzerinden gerçekleştirilir. Verileriniz hiçbir koşulda üçüncü şahıslara satılmaz veya ticari amaçla devredilmez.
          </p>

          <h2 style={{ fontSize: '1.4rem', color: 'var(--text-primary)', fontWeight: '800' }}>4. Kullanıcı Hakları (KVKK Madde 11)</h2>
          <p>
            KVKK kapsamında her kullanıcı; kendisiyle ilgili kişisel veri işlenip işlenmediğini öğrenme, işlenmişse buna ilişkin bilgi talep etme, verilerin düzeltilmesini veya silinmesini isteme hakkına sahiptir. Hesabınızı ve tüm verilerinizi dilediğiniz an sildirebilirsiniz.
          </p>

          <h2 style={{ fontSize: '1.4rem', color: 'var(--text-primary)', fontWeight: '800' }}>5. İletişim</h2>
          <p>
            Gizlilik politikamız ve kişisel verilerinizle ilgili her türlü soru, görüş ve veri silme talebiniz için bizimle <Link href="/iletisim" style={{ color: 'var(--accent-color)', fontWeight: '700' }}>İletişim Sayfası</Link> üzerinden veya <strong>info@furkanmorova.com</strong> adresinden irtibata geçebilirsiniz.
          </p>
        </div>
      </div>
    </main>
  );
}
