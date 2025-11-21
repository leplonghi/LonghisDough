
import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from '../i18n';
import { Locale } from '../types';
import { CheckIcon } from './IconComponents';

// TODO: This component is currently non-functional as i18n.ts is hardcoded to 'en'.
// Enable and implement actual locale change logic in i18n.ts when multiple languages are supported.
const LanguageSwitcher: React.FC = () => {
  const { locale, setLocale, t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const languages: { code: Locale; name: string }[] = [
    { code: 'en', name: t('language_switcher.english', { defaultValue: 'English' }) },
    { code: 'pt', name: t('language_switcher.portuguese', { defaultValue: 'Português' }) },
    { code: 'es', name: t('language_switcher.spanish', { defaultValue: 'Español' }) },
  ];

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

  const handleLanguageSelect = (langCode: Locale) => {
    setLocale(langCode); // This call is currently a no-op as per i18n.ts
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={wrapperRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-100 text-sm font-semibold text-slate-600 ring-1 ring-slate-200 transition-all hover:bg-slate-200 focus:outline-none focus:ring-2 focus:ring-lime-500 focus:ring-offset-2"
        aria-label={t('language_switcher.label')}
        aria-haspopup="true"
        aria-expanded={isOpen}
      >
        {locale.toUpperCase()}
      </button>

      {isOpen && (
        <div
          className="absolute right-0 mt-2 w-40 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="menu-button"
        >
          <div className="py-1" role="none">
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => handleLanguageSelect(lang.code)}
                className="flex w-full items-center justify-between px-4 py-2 text-sm text-slate-700 hover:bg-slate-100 hover:text-slate-900"
                role="menuitem"
              >
                <span
                  className={
                    locale === lang.code
                      ? 'font-semibold text-lime-600'
                      : ''
                  }
                >
                  {lang.name}
                </span>
                {locale === lang.code && (
                  <CheckIcon className="h-5 w-5 text-lime-600" />
                )}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default LanguageSwitcher;