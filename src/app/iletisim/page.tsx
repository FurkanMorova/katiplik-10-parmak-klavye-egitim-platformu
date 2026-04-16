"use client";

export default function Iletisim() {
  return (
    <main className="container" style={{ padding: '4rem 1.5rem', maxWidth: '800px' }}>
      <div className="glass-panel" style={{ padding: '3rem', borderRadius: '24px' }}>
        <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem', color: 'var(--accent-color)' }}>İletişim</h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', marginBottom: '2.5rem' }}>
          Görüş, öneri veya işbirliği talepleriniz için aşağıdaki formu doldurabilir ya da doğrudan e-posta adresim üzerinden bana ulaşabilirsiniz.
        </p>
        
        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '2rem' }}>
          
          <div style={{ background: 'rgba(59, 130, 246, 0.05)', padding: '2rem', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.05)' }}>
            <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: '#fff' }}>İletişim Bilgileri</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', color: 'var(--text-secondary)' }}>
              <p><strong>E-Posta:</strong> iletisim@10parmakakademi.com</p>
              <p><strong>Eğitmen:</strong> M. Furkan Morova</p>
              <p><strong>Akademi:</strong> Başarısoft Bilgi Teknolojileri Akademisi</p>
            </div>
          </div>

          <form style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }} onSubmit={(e) => e.preventDefault()}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <label htmlFor="name" style={{ color: 'var(--text-primary)', fontWeight: '500' }}>Ad Soyad</label>
              <input type="text" id="name" placeholder="Adınız Soyadınız" style={{
                padding: '1rem',
                borderRadius: '8px',
                border: '1px solid rgba(255,255,255,0.1)',
                background: 'rgba(0,0,0,0.2)',
                color: '#fff',
                fontSize: '1rem'
              }} />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <label htmlFor="email" style={{ color: 'var(--text-primary)', fontWeight: '500' }}>E-Posta Adresi</label>
              <input type="email" id="email" placeholder="ornek@mail.com" style={{
                padding: '1rem',
                borderRadius: '8px',
                border: '1px solid rgba(255,255,255,0.1)',
                background: 'rgba(0,0,0,0.2)',
                color: '#fff',
                fontSize: '1rem'
              }} />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <label htmlFor="message" style={{ color: 'var(--text-primary)', fontWeight: '500' }}>Mesajınız</label>
              <textarea id="message" rows={5} placeholder="Mesajınızı buraya yazabilirsiniz..." style={{
                padding: '1rem',
                borderRadius: '8px',
                border: '1px solid rgba(255,255,255,0.1)',
                background: 'rgba(0,0,0,0.2)',
                color: '#fff',
                fontSize: '1rem',
                resize: 'vertical'
              }}></textarea>
            </div>

            <button type="submit" style={{
              padding: '1rem',
              background: 'var(--accent-color)',
              color: '#fff',
              border: 'none',
              borderRadius: '8px',
              fontSize: '1.1rem',
              fontWeight: 'bold',
              cursor: 'pointer',
              boxShadow: '0 4px 15px var(--accent-glow)'
            }}>
              Gönder
            </button>
          </form>

        </div>
      </div>
    </main>
  );
}
