"use client";

import { useState } from 'react';
import Link from 'next/link';

interface FaqItem {
  question: string;
  answer: string;
}

const FAQS: FaqItem[] = [
  {
    question: "Zabıt katipliği sınavında 3 dakikada kaç kelime yazmak gerekir?",
    answer: "Adalet Bakanlığı zabıt katipliği uygulama sınavı şartnamesine göre adayların 3 dakikalık süre zarfında en az net 90 doğru kelime yazmaları gerekmektedir. Değerlendirmede anlam bütünlüğü, büyük/küçük harf kuralları (sınav komisyonu kararına göre) ve yazım doğruluğu dikkate alınır. Platformumuzdaki Katiplik Sınav Modu bu süreci birebir simüle eder."
  },
  {
    question: "10 parmak klavye yazmayı ne kadar sürede öğrenebilirim?",
    answer: "Günde düzenli olarak 20-30 dakika pratik yapan bir kullanıcı, yaklaşık 2 ila 3 hafta içerisinde klavyeye hiç bakmadan tüm harfleri kas hafızasına yerleştirebilir. 1-2 ay düzenli pratikle dakikada 80-100 kelime (DBK) hızına ulaşmak mümkündür."
  },
  {
    question: "F klavye mi yoksa Q klavye mi öğrenmeliyim?",
    answer: "Türkçe metin yazımında F klavye anatomik olarak çok daha avantajlıdır çünkü Türkçede en çok kullanılan harfler F klavyenin ana sırasında (orta sıra) yer alır ve parmak hareketini %86 oranında azaltır. Ancak günlük işlerinizde ve uluslararası ortamlarda Q klavye kullanıyorsanız, Q klavyede de 10 parmak yazarak çok yüksek hızlara ulaşabilirsiniz. Platformumuz her iki klavye türünü de destekler."
  },
  {
    question: "Katiplik sınav simülasyonunda yaptığım çalışmalar kaydediliyor mu?",
    answer: "Evet! Platforma ücretsiz üye olduğunuzda tamamladığınız tüm dersler, serbest çalışmalar ve 3 dakikalık sınav denemeleriniz veritabanımıza kaydedilir. En yüksek net kelime sayınızla haftalık ve genel Liderlik Tablosunda yerinizi alabilir, kişisel gelişim grafiğinizi profilinizden takip edebilirsiniz."
  },
  {
    question: "Klavyede yazma hızımı (DBK) ve doğruluğumu nasıl artırabilirim?",
    answer: "Hızlanmanın 1 numaralı kuralı hataları en aza indirmektir. Hızlı yazmaya çalışmak yerine doğru tuşlara basmaya odaklandığınızda kas hafızanız güçlenir ve hız kendiliğinden artar. Ayrıca Isı Haritası (Heatmap) analizimiz sayesinde en çok hata yaptığınız parmakları tespit edip o harflere özel alıştırmalar yapabilirsiniz."
  },
  {
    question: "ParmakAkademi eğitimleri ve testleri ücretli midir?",
    answer: "Hayır. ParmakAkademi'de yer alan tüm 10 parmak klavye dersleri, F ve Q klavye hız testleri, zabıt katipliği sınav metinleri ve istatistik araçları tüm kullanıcılara tamamen ücretsiz olarak sunulmaktadır."
  }
];

export default function HomeFaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFaq = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": FAQS.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };

  return (
    <section style={{ marginTop: '5rem', marginBottom: '4rem' }}>
      {/* Schema.org FAQPage JSON-LD for Google Rich Results */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* 1. KISIM: ZENGİN PLATFORM AVANTAJLARI (CRAWLABLE CONTENT) */}
      <div style={{ marginBottom: '4.5rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.35rem 0.9rem',
            borderRadius: '999px',
            background: 'var(--accent-light)',
            border: '1px solid var(--border-medium)',
            marginBottom: '1rem',
          }}>
            <span style={{ fontSize: '0.8rem', color: 'var(--accent-color)', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '1px' }}>
              BİLİMSEL VE PRATİK EĞİTİM
            </span>
          </div>
          <h2 style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.5rem)', fontWeight: '900', color: 'var(--text-primary)', letterSpacing: '-0.5px', marginBottom: '0.75rem' }}>
            Neden ParmakAkademi ile 10 Parmak Öğrenmelisiniz?
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', maxWidth: '640px', margin: '0 auto', lineHeight: '1.6' }}>
            Türkiye'nin katip adaylarına ve on parmak öğrencilerine özel geliştirilmiş en kapsamlı eğitim altyapısı.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.5rem' }}>
          <div className="glass-panel" style={{ padding: '2rem', borderRadius: '18px', background: 'var(--bg-secondary)', border: '1px solid var(--border-medium)' }}>
            <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>🧠</div>
            <h3 style={{ fontSize: '1.2rem', fontWeight: '800', color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
              Kas Hafızası Metodu
            </h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem', lineHeight: '1.6', margin: 0 }}>
              Ana sıra (Home Row) tuşlarından başlayarak parmaklarınızı harflere otomatik reflex ile yönlendiren bilimsel eğitim algoritması.
            </p>
          </div>

          <div className="glass-panel" style={{ padding: '2rem', borderRadius: '18px', background: 'var(--bg-secondary)', border: '1px solid var(--border-medium)' }}>
            <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>🏛️</div>
            <h3 style={{ fontSize: '1.2rem', fontWeight: '800', color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
              Resmi Katiplik Simülatörü
            </h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem', lineHeight: '1.6', margin: 0 }}>
              Adalet Bakanlığı sınavlarındaki iki kutulu orijinal UYAP sınav ortamında 3 dakikalık 90 kelime denemeleri.
            </p>
          </div>

          <div className="glass-panel" style={{ padding: '2rem', borderRadius: '18px', background: 'var(--bg-secondary)', border: '1px solid var(--border-medium)' }}>
            <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>🗺️</div>
            <h3 style={{ fontSize: '1.2rem', fontWeight: '800', color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
              Akıllı Klavye Isı Haritası
            </h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem', lineHeight: '1.6', margin: 0 }}>
              Yazarken en çok zorlandığınız ve hata yaptığınız parmakları tespit eden gerçek zamanlı analitik görselleştirme.
            </p>
          </div>

          <div className="glass-panel" style={{ padding: '2rem', borderRadius: '18px', background: 'var(--bg-secondary)', border: '1px solid var(--border-medium)' }}>
            <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>🏆</div>
            <h3 style={{ fontSize: '1.2rem', fontWeight: '800', color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
              Canlı Liderlik Sıralaması
            </h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem', lineHeight: '1.6', margin: 0 }}>
              Türkiye genelindeki diğer katip adaylarıyla yarışın, günlük ve haftalık kürsüde yerinizi alarak motivasyonunuzu artırın.
            </p>
          </div>
        </div>
      </div>

      {/* 2. KISIM: SIKÇA SORULAN SORULAR (ACCORDION FAQ) */}
      <div style={{ maxWidth: '840px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <h2 style={{ fontSize: 'clamp(1.7rem, 3vw, 2.2rem)', fontWeight: '900', color: 'var(--text-primary)', letterSpacing: '-0.5px', marginBottom: '0.5rem' }}>
            ❓ Sıkça Sorulan Sorular
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1rem' }}>
            10 parmak klavye eğitimi ve zabıt katipliği sınavı hakkında merak edilen tüm sorular
          </p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
          {FAQS.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                style={{
                  borderRadius: '14px',
                  background: 'var(--bg-secondary)',
                  border: '1px solid var(--border-medium)',
                  overflow: 'hidden',
                  transition: 'all 0.2s',
                }}
              >
                <button
                  onClick={() => toggleFaq(idx)}
                  style={{
                    width: '100%',
                    padding: '1.25rem 1.5rem',
                    background: isOpen ? 'var(--bg-glass-hover)' : 'transparent',
                    border: 'none',
                    textAlign: 'left',
                    cursor: 'pointer',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    gap: '1rem',
                  }}
                >
                  <span style={{ fontSize: '1.05rem', fontWeight: '800', color: 'var(--text-primary)' }}>
                    {faq.question}
                  </span>
                  <span style={{
                    fontSize: '1.2rem',
                    color: 'var(--accent-color)',
                    transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                    transition: 'transform 0.2s',
                    fontWeight: '800',
                    flexShrink: 0
                  }}>
                    ▼
                  </span>
                </button>

                {isOpen && (
                  <div style={{
                    padding: '1.25rem 1.5rem',
                    borderTop: '1px solid var(--border-subtle)',
                    color: 'var(--text-secondary)',
                    fontSize: '0.98rem',
                    lineHeight: '1.75',
                  }}>
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Blog Rehberlerine Yönlendirme */}
        <div style={{ marginTop: '3rem', textAlign: 'center', padding: '2rem', borderRadius: '18px', background: 'var(--accent-light)', border: '1px solid var(--border-medium)' }}>
          <h3 style={{ fontSize: '1.2rem', fontWeight: '800', color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
            Daha Fazla Bilgi ve Taktik mi Arıyorsunuz?
          </h3>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', marginBottom: '1.25rem' }}>
            Klavye hızlandırma taktikleri, sınav stratejileri ve ergonomi rehberlerimizi blog sayfamızdan okuyabilirsiniz.
          </p>
          <Link href="/blog" style={{ display: 'inline-block', padding: '0.75rem 1.75rem', background: 'var(--accent-color)', color: '#121214', fontWeight: '800', borderRadius: '10px', textDecoration: 'none' }}>
            📚 Blog Yazılarını İncele →
          </Link>
        </div>

      </div>
    </section>
  );
}
