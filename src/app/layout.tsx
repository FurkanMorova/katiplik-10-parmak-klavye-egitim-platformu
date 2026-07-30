import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import WelcomeModal from "../components/WelcomeModal";
import Script from "next/script";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Katiplik Eğitimi ve Hızlı Yazma Platformu | On Parmak Klavye Dersleri",
  description: "Katip olmak isteyenler için hızlı yazma ve on parmak klavye eğitimi. Sınavlara hazırlan, yazma hızını artır ve profesyonel seviyeye ulaş.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr" suppressHydrationWarning>
      <head>
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1907576756476954"
          crossOrigin="anonymous"
        />
      </head>
      <body className={inter.className} style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <script
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
        <WelcomeModal />
        <Header />
        <div className="app-layout animate-fade-in" style={{ flex: 1 }}>
          {children}
        </div>
        <Footer />
      </body>
    </html>
  );
}
