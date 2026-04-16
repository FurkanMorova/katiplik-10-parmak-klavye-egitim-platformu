"use client";

export default function KullanimKosullari() {
  return (
    <main className="container" style={{ padding: '4rem 1.5rem', maxWidth: '800px' }}>
      <div className="glass-panel" style={{ padding: '3rem', borderRadius: '24px' }}>
        <h1 style={{ fontSize: '2.5rem', marginBottom: '2rem', color: 'var(--accent-color)' }}>Kullanım Koşulları</h1>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', lineHeight: '1.8', color: 'var(--text-secondary)' }}>
          <p>
            Lütfen bu platformu kullanmadan önce aşağıdaki kullanım koşullarını dikkatlice okuyunuz. 10 Parmak Akademi platformunu ziyaret ederek veya kullanarak, bu kullanım koşullarını kabul etmiş sayılırsınız.
          </p>

          <h2 style={{ fontSize: '1.5rem', color: 'var(--text-primary)', marginTop: '1rem' }}>Sitenin Kullanımı Başkadır</h2>
          <p>
            10 Parmak Akademi, ücretsiz ve interaktif on parmak klavye (F ve Q) eğitimleri sunar. Bu hizmetleri yalnızca yasal amaçlar için ve kişisel gelişiminizi desteklemek amacıyla kullanabilirsiniz.
          </p>

          <h2 style={{ fontSize: '1.5rem', color: 'var(--text-primary)', marginTop: '1rem' }}>Fikri Mülkiyet</h2>
          <p>
            Web sitemizde yer alan ders içerikleri, tasarımlar, kodlar ve diğer materyallerin hakları M. Furkan Morova'ya aittir. Bu içeriklerin kaynak gösterilmeden veya izin alınmadan kopyalanması, çoğaltılması ve ticari amaçlarla kullanılması yasaktır.
          </p>

          <h2 style={{ fontSize: '1.5rem', color: 'var(--text-primary)', marginTop: '1rem' }}>Garanti Reddi</h2>
          <p>
            Eğitim metinlerimiz ve platform özelliklerimiz "olduğu gibi" sağlanmaktadır. 10 Parmak Akademi sunulan bilgilerin kesin doğruluğunu, kesintisiz hizmeti ya da olası yazılım hatalarının bulunmadığını taahhüt etmez. Meydana gelebilecek veri kayıplarından (örneğin yerel istatistiklerin tarayıcı temizliğiyle silinmesinden) platformumlu tutulamaz.
          </p>
        </div>
      </div>
    </main>
  );
}
