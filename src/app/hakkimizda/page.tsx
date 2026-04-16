"use client";

export default function Hakkimizda() {
  return (
    <main className="container" style={{ padding: '4rem 1.5rem', maxWidth: '800px' }}>
      <div className="glass-panel" style={{ padding: '3rem', borderRadius: '24px' }}>
        <h1 style={{ fontSize: '2.5rem', marginBottom: '2rem', color: 'var(--accent-color)' }}>Hakkımızda</h1>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', lineHeight: '1.8', color: 'var(--text-secondary)', fontSize: '1.1rem' }}>
          <p>
            Ben <strong>M. Furkan Morova</strong>. İstanbul Arel Üniversitesi Bilgisayar Programcılığı bölümünden mezun olduktan sonra eğitim ve yazılım alanında aktif olarak çalışmalarımı sürdürmekteyim. Şu anda <strong>Başarısoft Bilgi Teknolojileri Akademisi</strong> bünyesinde yazılım, bilgisayar bilimleri ve teknoloji odaklı eğitimler vererek öğrencilerimin sektöre donanımlı bir şekilde hazırlanmasına katkı sağlıyorum.
          </p>

          <p>
            Eğitim sürecinde edindiğim deneyimler doğrultusunda, öğrencilerin yalnızca ders saatleriyle sınırlı kalmaması gerektiğine inanıyorum. Bu nedenle, hem eğitimlerimi daha verimli hale getirmek hem de öğrencilerimin ders dışı pratik yapabileceği, kendilerini geliştirebileceği bir ortam sunmak amacıyla bu platformu geliştirdim.
          </p>

          <p>
            Bu platform; yazılım öğrenmek isteyenler, bilgisayar becerilerini geliştirmek isteyen öğrenciler ve kendini teknoloji alanında ilerletmek isteyen herkes için hazırlanmıştır. İçeriklerimiz; uygulamalı eğitimler, örnek projeler, interaktif çalışmalar ve güncel teknoloji konularıyla desteklenerek kullanıcıların en iyi şekilde öğrenmesini hedefler.
          </p>

          <p>
            Amacımız; yazılım eğitimi, bilgisayar bilimleri, programlama dersleri ve dijital beceriler alanında kaliteli, anlaşılır ve erişilebilir içerikler sunarak daha fazla kişinin bu alanda kendini geliştirmesine katkı sağlamaktır.
          </p>

          <div style={{ padding: '1.5rem', background: 'rgba(59, 130, 246, 0.1)', borderLeft: '4px solid var(--accent-color)', borderRadius: '0 8px 8px 0', marginTop: '1rem' }}>
            <p style={{ margin: 0, color: 'var(--text-primary)', fontStyle: 'italic' }}>
              Sürekli gelişen teknoloji dünyasında, öğrenmenin sürekliliğine inanıyor ve bu doğrultuda içeriklerimizi sürekli güncelliyoruz.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
