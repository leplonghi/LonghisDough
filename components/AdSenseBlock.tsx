import React, { useEffect, useRef, useState } from 'react';
import { useTranslation } from '../i18n';

declare global {
  interface Window {
    adsbygoogle?: { [key: string]: unknown }[];
  }
}

const AdSenseBlock: React.FC = () => {
  const { t } = useTranslation();
  const adRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  // This effect sets up the IntersectionObserver to detect when the ad block
  // is visible in the viewport.
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          // We only need to trigger this once, so we can unobserve.
          observer.unobserve(entry.target);
        }
      },
      {
        // Add a small margin to start loading the ad just before it's fully visible.
        rootMargin: '50px',
      },
    );

    if (adRef.current) {
      observer.observe(adRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  // This effect triggers the AdSense push call only once the component becomes visible.
  useEffect(() => {
    if (isVisible) {
      try {
        if (typeof window !== 'undefined') {
          (window.adsbygoogle = window.adsbygoogle || []).push({});
        }
      } catch (e) {
        console.error('AdSense push error:', e);
      }
    }
  }, [isVisible]);

  return (
    <div
      ref={adRef}
      className="rounded-lg border border-slate-200 bg-slate-50 p-4 text-center"
    >
      <span className="text-xs uppercase tracking-wider text-slate-500">
        {t('ads.advertisement')}
      </span>
      <ins
        className="adsbygoogle block mt-2 min-h-[6.25rem]"
        data-ad-client="ca-pub-8653595934786167"
        data-ad-slot="2172740239"
        data-ad-format="auto"
        data-full-width-responsive="true"
      ></ins>
    </div>
  );
};

export default AdSenseBlock;