
import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from '../i18n';
import { Locale } from '../types';
import { CheckIcon } from './IconComponents';

// This component is currently non-functional as i18n.ts is hardcoded to 'en'.
// We keep the structure ready for future implementation.
const LanguageSwitcher: React.FC = () => {
  const { locale, setLocale, t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [wrapperRef]);

  return (
    <div className="relative" ref={wrapperRef}>
      <button
        type="button"
        disabled
        className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-100 text-sm font-semibold text-slate-400 ring-1 ring-slate-200 cursor-default"
        aria-label={t('language_switcher.label')}
      >
        {locale.toUpperCase()}
      </button>
    </div>
  );
};

export default LanguageSwitcher;
