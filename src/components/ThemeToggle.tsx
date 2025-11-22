
import React from 'react';
import { SunIcon, MoonIcon, ComputerDesktopIcon } from './IconComponents';

type Theme = 'light' | 'dark' | 'system';

interface ThemeToggleProps {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

const ThemeToggle: React.FC<ThemeToggleProps> = ({ theme, setTheme }) => {
  const cycleTheme = () => {
    if (theme === 'light') setTheme('dark');
    else if (theme === 'dark') setTheme('system');
    else setTheme('light');
  };

  const getLabel = () => {
    if (theme === 'light') return 'Switch to Dark Mode';
    if (theme === 'dark') return 'Switch to System Theme';
    return 'Switch to Light Mode';
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
