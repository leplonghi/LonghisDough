
import React, { useEffect, useRef, useState } from 'react';
import { useTranslation } from '../i18n';
import { useUser } from '../contexts/UserProvider';
import { isFreeUser } from '../lib/permissions'; // Corrigido para lib/permissions

declare global {
  interface Window {
    adsbygoogle?: { [key: string]: unknown }[];
  }
}

const AdSenseBlock: React.FC = () => {
  const { t } = useTranslation();
  const { user } = useUser();
  const adRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  // This effect sets up the IntersectionObserver to detect when the ad block
  // is visible in the viewport.
  useEffect(() => {
    if (!user || !isFreeUser(user)) return; // Don't observe if Pro or user is null

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
  }, [user]);

  // This effect triggers the AdSense push call only once the component becomes visible.
  useEffect(() => {
    if (isVisible && user && isFreeUser(user)) {
      try {
        if (typeof window !== 'undefined') {
          (window.adsbygoogle = window.adsbygoogle || []).push({});
        }
      } catch (e) {
        console.error('AdSense push error:', e);
      }
    }
  }, [isVisible, user]);

  // If user is Pro, do not render anything
  if (user && !isFreeUser(user)) return null;

  return (
    <div
      ref={adRef}
      className="rounded-lg border border-slate-200 bg-slate-50 p-4 text-center"
    >
      <span className="text-xs uppercase tracking-wider text-slate-500">
        {t('ads.advertisement')}
      </span>
      <ins
        className="adsbygoogle"
        style={{ display: 'block', marginTop: '8px', minHeight: '100px' }}
        data-ad-client="ca-pub-8653595934786167"
        data-ad-slot="2172740239"
        data-ad-format="auto"
        data-full-width-responsive="true"
      ></ins>
    </div>
  );
};

export default AdSenseBlock;