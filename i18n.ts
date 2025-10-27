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
        if (!currentTranslations) { // Only set if not already set by the primary load
          setCurrentTranslations(module.default);
        }
      })
      .finally(() => {
        setIsLoadingTranslations(false);
      });
  }, [locale, currentTranslations]); // Added currentTranslations to dependency array to re-evaluate if it's null

  const setLocale = useCallback((newLocale: Locale) => {
    setLocaleState(newLocale);
  }, []);

  const t = useCallback(
    (key: string, replacements?: { [key: string]: string | number }): string => {
      let translation =
        resolve(key, currentTranslations) || resolve(key, null); // Fallback to null if currentTranslations is not loaded

      // If currentTranslations is not loaded or key not found, try English fallback
      if (!translation) {
        // This part will only run if currentTranslations is null or key is not found in it
        // We need to ensure English translations are loaded if currentTranslations is null
        // For simplicity, we'll assume English is always available or loaded first.
        // In a real app, you might want a default `en.json` import at the top or a more robust fallback.
        // For now, we'll just return the key if no translations are loaded.
        if (!currentTranslations) {
          return key; // Return key directly if no translations are loaded yet
        }
        console.warn(`Translation not found for key: ${key} in locale ${locale}. Falling back to key.`);
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