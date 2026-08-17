import Link from 'next/link';

export const metadata = {
  title: 'Kullanım Koşulları ve Üyelik Şartları | ParmakAkademi',
  description: 'ParmakAkademi platformunun kullanım koşulları, telif hakları, üyelik kuralları ve yasal sorumluluklar.',
};

export default function KullanimKosullari() {
  return (
    <main className="container" style={{ padding: '4rem 1.5rem 8rem', maxWidth: '840px' }}>
      <div className="glass-panel" style={{ padding: '3rem 2.5rem', borderRadius: '24px', background: 'var(--bg-secondary)', border: '1px solid var(--border-medium)' }}>
        <h1 style={{ fontSize: '2.5rem', fontWeight: '900', marginBottom: '1rem', color: 'var(--text-primary)', letterSpacing: '-1px' }}>
          Kullanım Koşulları
        </h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '2rem' }}>
          Son Güncelleme: {new Date().toLocaleDateString('tr-TR')}
        </p>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem', lineHeight: '1.85', color: 'var(--text-secondary)', fontSize: '1.02rem' }}>
          <p>
            <strong>ParmakAkademi</strong> web sitesini ziyaret ederek veya platforma kayıt olarak aşağıdaki kullanım koşullarını kabul etmiş sayılırsınız. Lütfen hizmetlerimizi kullanmadan önce bu şartları dikkatle okuyunuz.
          </p>

          <h2 style={{ fontSize: '1.4rem', color: 'var(--text-primary)', fontWeight: '800' }}>1. Hizmetin Niteliği</h2>
          <p>
            ParmakAkademi; kullanıcılara 10 parmak klavye eğitimi, F ve Q klavye hız testleri, zabıt katipliği sınav simülasyonları ve gelişim takip araçları sunan bağımsız bir eğitim platformudur. Platformdaki tüm temel egzersizler ve testler kullanıcılara ücretsiz olarak sunulmaktadır.
          </p>

          <h2 style={{ fontSize: '1.4rem', color: 'var(--text-primary)', fontWeight: '800' }}>2. Telif Hakları ve Fikri Mülkiyet</h2>
          <p>
            Platformda yer alan yazılımlar, tasarım ögeleri, parmak haritaları, logo, metinler ve eğitim içeriklerinin tüm telif hakları ParmakAkademi'ye aittir. İzinsiz kopyalanması, kaynak gösterilmeden çoğaltılması veya ticari amaçla kullanılması yasaktır.
          </p>

          <h2 style={{ fontSize: '1.4rem', color: 'var(--text-primary)', fontWeight: '800' }}>3. Kullanıcı Davranış Kuralları</h2>
          <ul style={{ paddingLeft: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
            <li>Kullanıcılar liderlik sıralamalarında yapay bot, otomatik makro yazılımları veya hile araçları kullanamazlar.</li>
            <li>Diğer kullanıcıları rahatsız edici, hakaret içeren veya ahlaka aykırı kullanıcı adları oluşturulamaz.</li>
            <li>Sistemin işleyişini aksatacak, güvenlik açıklarını suistimal edecek faaliyetlerde bulunulamaz.</li>
          </ul>

          <h2 style={{ fontSize: '1.4rem', color: 'var(--text-primary)', fontWeight: '800' }}>4. Sorumluluk Reddi</h2>
          <p>
            Platformumuzdaki sınav metinleri ve katiplik simülasyonları geçmiş sınavlara ve genel bilgilere dayalı olarak hazırlanmış eğitim araçlarıdır. Resmi kurum ve komisyonların yapacağı sınavlarda oluşabilecek kural değişikliklerinden platformumuz sorumlu tutulamaz.
          </p>

          <h2 style={{ fontSize: '1.4rem', color: 'var(--text-primary)', fontWeight: '800' }}>5. İletişim</h2>
          <p>
            Kullanım koşullarımızla ilgili tüm soru ve önerileriniz için <Link href="/iletisim" style={{ color: 'var(--accent-color)', fontWeight: '700' }}>İletişim Sayfamızdan</Link> bize ulaşabilirsiniz.
          </p>
        </div>
      </div>
    </main>
  );
}
