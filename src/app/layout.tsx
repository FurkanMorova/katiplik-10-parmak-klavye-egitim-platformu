import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import CookieBanner from "../components/CookieBanner";
import Script from "next/script";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Katiplik Klavye Çalışması & On Parmak Klavye Eğitimi | ParmakAkademi",
  description: "Katiplik sınavına hazırlık için Türkiye'nin en gelişmiş on parmak klavye eğitim platformu. F ve Q klavye dersleri, 3 dakikada 90 kelime katiplik sınav simülasyonu, hız testi ve canlı liderlik sıralaması.",
  keywords: [
    "katiplik klavye çalışması",
    "on parmak klavye",
    "zabıt katipliği sınavı",
    "10 parmak klavye eğitimi",
    "f klavye dersleri",
    "q klavye hız testi",
    "katiplik metinleri",
    "3 dakikada 90 kelime"
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr" suppressHydrationWarning>
      <head>
        <Script
          id="theme-script"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              try {
                if (localStorage.getItem('theme') === 'light') {
                  document.documentElement.classList.add('light-mode');
                }
              } catch (e) {}
            `,
          }}
        />
        <Script
          id="adsense-script"
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1907576756476954"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
      </head>
      <body className={inter.className} style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-5CWSB7Y8XE"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-5CWSB7Y8XE');
          `}
        </Script>
        <CookieBanner />
        <Header />
        <div className="app-layout animate-fade-in" style={{ flex: 1 }}>
          {children}
        </div>
        <Footer />
      </body>
    </html>
  );
}
