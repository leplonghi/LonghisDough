import React, { useEffect } from 'react';
import { useTranslation } from '../i18n';

declare global {
  interface Window {
    adsbygoogle?: { [key: string]: unknown }[];
  }
}

const AdSenseBlock: React.FC = () => {
  const { t } = useTranslation();

  useEffect(() => {
    // Delay the AdSense push to ensure the container has been rendered and has a width.
    // This helps prevent the "no slot size for availableWidth=0" error.
    const timeout = setTimeout(() => {
      try {
        if (typeof window !== 'undefined') {
          (window.adsbygoogle = window.adsbygoogle || []).push({});
        }
      } catch (e) {
        console.error('AdSense error:', e);
      }
    }, 150); // A small delay is usually sufficient.

    return () => clearTimeout(timeout);
  }, []);

  return (
    <div className="rounded-lg border border-slate-200 bg-slate-50 p-4 text-center dark:border-slate-700 dark:bg-slate-700/50">
      <span className="text-xs uppercase tracking-wider text-slate-500 dark:text-slate-400">
        {t('ads.advertisement')}
      </span>
      <ins
        className="adsbygoogle"
        style={{ display: 'block', marginTop: '8px', minHeight: '100px' }}
        data-ad-client="ca-pub-8653595934786167"
        // IMPORTANT: Replace this with your actual Ad Slot ID from AdSense
        data-ad-slot="2172740239"
        data-ad-format="auto"
        data-full-width-responsive="true"
      ></ins>
    </div>
  );
};

export default AdSenseBlock;
