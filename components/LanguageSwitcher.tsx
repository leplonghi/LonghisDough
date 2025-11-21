
import React from 'react';
import { useTranslation } from '../i18n';

const LanguageSwitcher: React.FC = () => {
  const { locale } = useTranslation();

  // Currently read-only as we enforce English
  return (
    <div className="relative">
      <div
        className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-100 text-sm font-semibold text-slate-600 ring-1 ring-slate-200 cursor-default"
        aria-label="Current language"
      >
        {locale.toUpperCase()}
      </div>
    </div>
  );
};

export default LanguageSwitcher;
