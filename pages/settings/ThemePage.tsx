
import React from 'react';
import SettingsPageLayout from './SettingsPageLayout';
import { useTranslation } from '../../i18n';

// Replicating the ChoiceButton locally as it's a small component
const ChoiceButton: React.FC<{
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}> = ({ active, onClick, children }) => (
  <button
    type="button"
    onClick={onClick}
    className={`w-full rounded-lg px-4 py-2 text-center text-sm font-medium transition-all duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-lime-500 focus:ring-offset-2 dark:focus:ring-offset-slate-800 ${
      active
        ? 'bg-lime-500 text-white font-semibold shadow-md'
        : 'bg-slate-200 text-slate-700 hover:bg-slate-300 dark:bg-slate-700 dark:text-slate-200 dark:hover:bg-slate-600'
    }`}
  >
    {children}
  </button>
);

interface ThemePageProps {
    theme: 'light' | 'dark' | 'system';
    setTheme: (theme: 'light' | 'dark' | 'system') => void;
}

const ThemePage: React.FC<ThemePageProps> = ({ theme, setTheme }) => {
  const { t } = useTranslation();

  return (
    <SettingsPageLayout title="Tema">
      <p>Escolha a aparência do aplicativo.</p>
      <div className="not-prose mt-6 grid grid-cols-1 gap-3 sm:grid-cols-3">
          <ChoiceButton active={theme === 'light'} onClick={() => setTheme('light')}>
              {t('user_menu.theme_light')}
          </ChoiceButton>
          <ChoiceButton active={theme === 'dark'} onClick={() => setTheme('dark')}>
              {t('user_menu.theme_dark')}
          </ChoiceButton>
          <ChoiceButton active={theme === 'system'} onClick={() => setTheme('system')}>
              {t('user_menu.theme_system')}
          </ChoiceButton>
      </div>
    </SettingsPageLayout>
  );
};

export default ThemePage;
