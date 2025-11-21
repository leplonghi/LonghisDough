import React from 'react';
import SettingsPageLayout from './SettingsPageLayout';
import { useTranslation } from '../../i18n';
import ChoiceButton from '../../components/ui/ChoiceButton';

interface ThemePageProps {
    theme: 'light' | 'dark' | 'system';
    setTheme: (theme: 'light' | 'dark' | 'system') => void;
}

const ThemePage: React.FC<ThemePageProps> = ({ theme, setTheme }) => {
  const { t } = useTranslation();

  return (
    <SettingsPageLayout title="Theme">
      <p>Choose the application appearance.</p>
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