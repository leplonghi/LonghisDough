import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
  FC,
  useCallback,
  useMemo,
  useEffect,
} from 'react';
import { Locale } from './types';

interface TranslationContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: string, replacements?: { [key: string]: string | number }) => string;
  isLoadingTranslations: boolean;
}

const TranslationContext = createContext<TranslationContextType | undefined>(
  undefined,
);

// Helper to safely resolve nested translation keys
function resolve(path: string, obj: any): string | null {
  const resolved = path
    .split('.')
    .reduce((prev, curr) => (prev ? prev[curr] : null), obj);
  return typeof resolved === 'string' ? resolved : null;
}

export const TranslationProvider: FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [locale, setLocaleState] = useState<Locale>('en');
  const [currentTranslations, setCurrentTranslations] = useState<Record<string, any> | null>(null);
  const [isLoadingTranslations, setIsLoadingTranslations] = useState(true);

  // Load translations dynamically when locale changes
  useEffect(() => {
    setIsLoadingTranslations(true);
    // Dynamically import the JSON file for the selected locale
    import(`./locales/${locale}.json`)
      .then((module) => {
        setCurrentTranslations(module.default);
      })
      .catch((error) => {
        console.error(`Failed to load translations for ${locale}:`, error);
        // Fallback to English if the selected locale fails to load
        return import('./locales/en.json');
      })
      .then((module) => {
        // Always set translations here, whether it's the primary or fallback import
        setCurrentTranslations(module.default);
      })
      .finally(() => {
        setIsLoadingTranslations(false);
      });
  }, [locale]); // Only re-run when locale changes

  const setLocale = useCallback((newLocale: Locale) => {
    setLocaleState(newLocale);
  }, []);

  const t = useCallback(
    (key: string, replacements?: { [key: string]: string | number }): string => {
      if (!currentTranslations) {
        // If translations haven't loaded yet, return the key directly.
        // The loading state in App.tsx should prevent most UI from rendering
        // before translations are ready, but this is a safe guard.
        return key;
      }

      let translation = resolve(key, currentTranslations);

      if (translation === null) {
        // If translation not found in the current locale, log a warning and return the key.
        console.warn(`Translation not found for key: ${key} in locale ${locale}. Returning key.`);
        return key;
      }
      
      if (replacements) {
          Object.keys(replacements).forEach(rKey => {
              translation = translation!.replace(`{${rKey}}`, String(replacements[rKey]));
          })
      }

      return translation;
    },
    [locale, currentTranslations],
  );

  const value = useMemo(
    () => ({
      locale,
      setLocale,
      t,
      isLoadingTranslations,
    }),
    [locale, setLocale, t, isLoadingTranslations],
  );

  return React.createElement(TranslationContext.Provider, { value: value }, children);
};

export const useTranslation = (): TranslationContextType => {
  const context = useContext(TranslationContext);
  if (context === undefined) {
    throw new Error('useTranslation must be used within a TranslationProvider');
  }
  return context;
};