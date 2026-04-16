"use client";

export default function GizlilikPolitikasi() {
  return (
    <main className="container" style={{ padding: '4rem 1.5rem', maxWidth: '800px' }}>
      <div className="glass-panel" style={{ padding: '3rem', borderRadius: '24px' }}>
        <h1 style={{ fontSize: '2.5rem', marginBottom: '2rem', color: 'var(--accent-color)' }}>Gizlilik Politikası</h1>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', lineHeight: '1.8', color: 'var(--text-secondary)' }}>
          <p>
            Son Güncelleme: {new Date().toLocaleDateString('tr-TR')}
          </p>

          <p>
            10 Parmak Akademi olarak kullanıcılarımızın gizliliğine ve kişisel verilerinin korunmasına büyük önem veriyoruz. Bu metin, web sitemizi ("Platform") ziyaret ettiğinizde verilerinizin nasıl toplandığı, kullanıldığı ve korunduğu hakkında sizi bilgilendirmek amacıyla hazırlanmıştır.
          </p>

          <h2 style={{ fontSize: '1.5rem', color: 'var(--text-primary)', marginTop: '1rem' }}>1. Hangi Verileri Topluyoruz?</h2>
          <p>
            Platformumuz, kullanıcılarına üye girişi gerektirmeyen tamamen anonim bir deneyim sunar. Sistem, öğrenme istatistiklerinizi ve ilerlemenizi tarayıcınızın <strong>Local Storage (Yerel Depolama)</strong> üzerine kaydeder. Sunucularımızda size ait kişisel hiçbir tanımlayıcı bilgi (ad, soyad, e-posta, hız istatistikleri) <u>tutulmamaktadır</u>.
          </p>

          <h2 style={{ fontSize: '1.5rem', color: 'var(--text-primary)', marginTop: '1rem' }}>2. Çerezler (Cookies) ve Üçüncü Taraf İş Ortakları</h2>
          <p>
            Platformumuz daha iyi bir kullanıcı deneyimi sunabilmek, site trafiğini analiz etmek ve uygun reklamları gösterebilmek amacıyla çerezleri (cookies) ve benzeri teknolojileri (örneğin Google AdSense ve Google Analytics) kullanabilir.
          </p>
          <ul style={{ paddingLeft: '1.5rem' }}>
            <li>Google dahil olmak üzere üçüncü taraf sağlayıcılar, kullanıcıların web sitemize veya diğer web sitelerine yaptıkları önceki ziyaretleri temel alan reklamlar yayınlamak için çerezleri kullanmaktadır.</li>
            <li>Google'ın reklam çerezlerini kullanması, Google ve iş ortaklarının kullanıcılarınıza sitemiz ve/veya internetteki diğer sitelere yaptıkları ziyaretleri temel alan reklamlar sunmasına olanak tanır.</li>
          </ul>

          <h2 style={{ fontSize: '1.5rem', color: 'var(--text-primary)', marginTop: '1rem' }}>3. İletişim Bilgileri</h2>
          <p>
            Bu Gizlilik Politikası hakkında sorularınız, endişeleriniz veya şikayetleriniz olması durumunda bize <strong>iletisim@10parmakakademi.com</strong> adresinden e-posta yoluyla veya <a href="/iletisim" style={{ color: 'var(--accent-color)' }}>İletişim sayfasındaki</a> form aracılığıyla ulaşabilirsiniz.
          </p>
        </div>
      </div>
    </main>
  );
}
