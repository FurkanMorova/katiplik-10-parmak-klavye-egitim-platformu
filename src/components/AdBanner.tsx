"use client";

import { useEffect, useRef } from 'react';

interface AdBannerProps {
  slot: string;
  format?: 'auto' | 'horizontal' | 'vertical' | 'rectangle';
  responsive?: boolean;
  style?: React.CSSProperties;
}

declare global {
  interface Window {
    adsbygoogle: any[];
  }
}

export default function AdBanner({ 
  slot, 
  format = 'auto', 
  responsive = true,
  style 
}: AdBannerProps) {
  const adRef = useRef<HTMLModElement>(null);
  const adPushed = useRef(false);

  useEffect(() => {
    if (adPushed.current) return;
    const timer = setTimeout(() => {
      try {
        if (adRef.current && !adRef.current.getAttribute('data-adsbygoogle-status')) {
          (window.adsbygoogle = window.adsbygoogle || []).push({});
          adPushed.current = true;
        }
      } catch (err) {
        // Dev ortamında AdSense uyarılarını sessize al
      }
    }, 150);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div style={{ 
      display: 'flex', 
      justifyContent: 'center', 
      margin: '1.5rem 0',
      minHeight: '90px',
      ...style 
    }}>
      <ins
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client="ca-pub-1907576756476954"
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive={responsive ? 'true' : 'false'}
        ref={adRef}
      />
    </div>
  );
}
