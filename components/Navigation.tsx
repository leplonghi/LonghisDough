import React, { useState, useRef, useEffect } from 'react';
import { Page } from '../types';
import { useTranslation } from '../i18n';
import UserMenu from './UserMenu';
import {
  DoughLabLogoIcon,
  CalculatorIcon,
  FeedIcon,
  AcademicCapIcon,
  Bars3Icon,
  CloseIcon,
  ChevronDownIcon,
  SettingsIcon,
  BookOpenIcon,
  FireIcon,
  PizzaSliceIcon,
  SparklesIcon,
  ListBulletIcon,
  BeakerIcon,
} from './IconComponents';

interface NavigationProps {
  activePage: Page;
  onNavigate: (page: Page) => void;
  onOpenAuth: () => void;
  theme: 'light' | 'dark' | 'system';
  setTheme: (theme: 'light' | 'dark' | 'system') => void;
}

const ToolsMenu: React.FC<{ onNavigate: (page: Page) => void }> = ({ onNavigate }) => {
    const [isOpen, setIsOpen] = useState(false);
    const wrapperRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [wrapperRef]);
    
    const handleNavigate = (page: Page) => {
        onNavigate(page);
        setIsOpen(false);
    };
    
    const toolItems = [
      { page: 'tools-oven-analysis' as Page, label: 'FormulaLab', icon: <FireIcon className="h-5 w-5" /> },
      { page: 'toppings' as Page, label: 'Coberturas & Recheios', icon: <PizzaSliceIcon className="h-5 w-5" /> },
      { page: 'tools-doughbot' as Page, label: 'Massabo', icon: <SparklesIcon className="h-5 w-5" /> },
      { page: 'tools-pantry-pizza' as Page, label: 'Pizza de Despensa', icon: <ListBulletIcon className="h-5 w-5" /> },
      { page: 'references' as Page, label: 'Referências Técnicas', icon: <BookOpenIcon className="h-5 w-5" /> },
    ];

    return (
        <div className="relative" ref={wrapperRef}>
            <button
                onClick={() => setIsOpen(prev => !prev)}
                className="flex items-center gap-1 rounded-md px-3 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-100 hover:text-slate-800 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-slate-100"
            >
                Ferramentas
                <ChevronDownIcon className={`h-4 w-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
            </button>
            {isOpen && (
                <div className="absolute left-0 mt-2 w-64 origin-top-left rounded-md bg-white p-2 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none dark:bg-slate-800 dark:ring-white/10">
                    {toolItems.map(item => (
                       <button
                          key={item.page}
                          onClick={() => handleNavigate(item.page)}
                          className="flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm text-slate-700 transition-colors hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-700"
                          role="menuitem"
                        >
                          <span className="text-slate-500 dark:text-slate-400">{item.icon}</span>
                          <span>{item.label}</span>
                        </button>
                    ))}
                </div>
            )}
        </div>
    )
};


const Navigation: React.FC<NavigationProps> = ({
  activePage,
  onNavigate,
  onOpenAuth,
  theme,
  setTheme,
}) => {
  const { t } = useTranslation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const handleNavigate = (page: Page) => {
    onNavigate(page);
    setIsMobileMenuOpen(false);
  }

  const DesktopHeader = () => (
    <header className="sticky top-0 z-20 hidden border-b border-slate-200/80 bg-white/80 backdrop-blur-sm dark:border-slate-700/80 dark:bg-slate-900/80 sm:block">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Left Section: Logo & main links */}
        <div className="flex items-center gap-6">
          <button onClick={() => handleNavigate('mylab')} aria-label="Home" className="flex flex-shrink-0 items-center gap-2.5">
            <DoughLabLogoIcon className="h-8 w-auto text-lime-500" />
            <span className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">DoughLabPro</span>
          </button>
          <nav className="flex items-center gap-1">
              <button
                key="mylab"
                onClick={() => handleNavigate('mylab')}
                className={`rounded-md px-3 py-2 text-sm font-semibold transition-colors ${
                  (activePage.startsWith('mylab') || activePage === 'batch')
                    ? 'text-lime-600 dark:text-lime-400'
                    : 'text-slate-600 hover:bg-slate-100 hover:text-slate-800 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-slate-100'
                }`}
              >
                {t('nav.lab')}
              </button>
              <button
                key="calculator"
                onClick={() => handleNavigate('calculator')}
                className={`rounded-md px-3 py-2 text-sm font-semibold transition-colors ${
                  activePage === 'calculator'
                    ? 'text-lime-600 dark:text-lime-400'
                    : 'text-slate-600 hover:bg-slate-100 hover:text-slate-800 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-slate-100'
                }`}
              >
                {t('nav.calculator')}
              </button>
              <button
                key="learn"
                onClick={() => handleNavigate('learn')}
                className={`rounded-md px-3 py-2 text-sm font-semibold transition-colors ${
                  activePage.startsWith('learn')
                    ? 'text-lime-600 dark:text-lime-400'
                    : 'text-slate-600 hover:bg-slate-100 hover:text-slate-800 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-slate-100'
                }`}
              >
                {t('nav.learn')}
              </button>
               <button
                key="community"
                onClick={() => handleNavigate('community')}
                className={`rounded-md px-3 py-2 text-sm font-semibold transition-colors ${
                  activePage.startsWith('community')
                    ? 'text-lime-600 dark:text-lime-400'
                    : 'text-slate-600 hover:bg-slate-100 hover:text-slate-800 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-slate-100'
                }`}
              >
                {t('nav.community')}
              </button>
              <ToolsMenu onNavigate={onNavigate} />
          </nav>
        </div>

        {/* Right Section: User Avatar */}
        <div className="flex-shrink-0">
          <UserMenu onNavigate={onNavigate} onOpenAuthModal={onOpenAuth} theme={theme} setTheme={setTheme} />
        </div>
      </div>
    </header>
  );

  const MobileHeader = () => (
    <header className="sticky top-0 z-20 border-b border-slate-200/80 bg-white/80 backdrop-blur-sm dark:border-slate-700/80 dark:bg-slate-900/80 sm:hidden">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
            <button onClick={() => handleNavigate('mylab')} aria-label="Home" className="flex flex-shrink-0 items-center gap-2">
                <DoughLabLogoIcon className="h-8 w-auto text-lime-500" />
                <span className="text-lg font-bold tracking-tight text-slate-900 dark:text-white">DoughLabPro</span>
            </button>
            <div className="flex items-center gap-2">
                <UserMenu onNavigate={onNavigate} onOpenAuthModal={onOpenAuth} theme={theme} setTheme={setTheme} />
                <button onClick={() => setIsMobileMenuOpen(prev => !prev)} className="rounded-md p-2 text-slate-500 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800">
                    {isMobileMenuOpen ? <CloseIcon className="h-6 w-6" /> : <Bars3Icon className="h-6 w-6" />}
                </button>
            </div>
        </div>
        {isMobileMenuOpen && (
             <nav className="space-y-1 p-4 border-t border-slate-200 dark:border-slate-700">
                <button
                    onClick={() => handleNavigate('mylab')}
                    className="flex w-full items-center gap-3 rounded-lg p-3 text-base font-semibold text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800"
                >
                    <BeakerIcon className="h-6 w-6 text-slate-500 dark:text-slate-400" /> {t('nav.lab')}
                </button>
                <button
                    onClick={() => handleNavigate('calculator')}
                    className="flex w-full items-center gap-3 rounded-lg p-3 text-base font-semibold text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800"
                >
                    <CalculatorIcon className="h-6 w-6 text-slate-500 dark:text-slate-400" /> {t('nav.calculator')}
                </button>
                 <button
                    onClick={() => handleNavigate('learn')}
                    className="flex w-full items-center gap-3 rounded-lg p-3 text-base font-semibold text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800"
                >
                    <AcademicCapIcon className="h-6 w-6 text-slate-500 dark:text-slate-400" /> {t('nav.learn')}
                </button>
                <button
                    onClick={() => handleNavigate('community')}
                    className="flex w-full items-center gap-3 rounded-lg p-3 text-base font-semibold text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800"
                >
                    <FeedIcon className="h-6 w-6 text-slate-500 dark:text-slate-400" /> {t('nav.community')}
                </button>
                 <button
                    onClick={() => handleNavigate('settings')}
                    className="flex w-full items-center gap-3 rounded-lg p-3 text-base font-semibold text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800"
                >
                    <SettingsIcon className="h-6 w-6 text-slate-500 dark:text-slate-400" /> {t('user_menu.settings')}
                </button>
            </nav>
        )}
    </header>
  );

  return (
    <>
      <DesktopHeader />
      <MobileHeader />
    </>
  );
};

export default Navigation;
