
import React from 'react';
import { SunIcon, MoonIcon, ComputerDesktopIcon } from './IconComponents';
import { useTranslation } from '../i18n';

type Theme = 'light' | 'dark' | 'system';

interface ThemeToggleProps {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

const ThemeToggle: React.FC<ThemeToggleProps> = ({ theme, setTheme }) => {
  const { t } = useTranslation();
  const cycleTheme = () => {
    if (theme === 'light') setTheme('dark');
    else if (theme === 'dark') setTheme('system');
    else setTheme('light');
  };

  const getLabel = () => {
    if (theme === 'light') return t('header.switch_to_dark');
    if (theme === 'dark') return t('header.switch_to_system'); // Updated to system
    return t('header.switch_to_light'); // Fallback to "Switch to light"
  }

  return (
    <button
      onClick={cycleTheme}
      className="rounded-full p-2 text-slate-500 transition-all hover:bg-slate-200 focus:outline-none focus:ring-2 focus:ring-lime-500 focus:ring-offset-2"
      aria-label={getLabel()}
    >
        {theme === 'light' && <SunIcon className="h-6 w-6" />}
        {theme === 'dark' && <MoonIcon className="h-6 w-6" />}
        {theme === 'system' && <ComputerDesktopIcon className="h-6 w-6" />}
    </button>
  );
};

export default ThemeToggle;