import React, { useState, useRef, useEffect } from 'react';
import { Page } from '@/types';
import UserMenu from '@/components/layout/UserMenu';
import {
  CalculatorIcon,
  AcademicCapIcon,
  Bars3Icon,
  CloseIcon,
  ChevronDownIcon,
  BookOpenIcon,
  FireIcon,
  BeakerIcon,
  UserCircleIcon,
  ShoppingBagIcon,
  LockClosedIcon,
  StarIcon
} from '@/components/ui/Icons';
import { useUser } from '@/contexts/UserProvider';

interface NavigationProps {
  activePage: Page;
  onNavigate: (page: Page) => void;
  onOpenAuth: () => void;
}

interface HeaderComponentProps extends Omit<NavigationProps, 'activePage'> {
    activePage: Page;
    handleNavigate: (page: Page) => void;
}

const ProBadge = () => (
    <span className="ml-2 inline-flex items-center rounded bg-lime-100 px-1.5 py-0.5 text-[10px] font-bold text-lime-700 uppercase tracking-wide border border-lime-200">
        PRO
    </span>
);

const LockedIcon = () => (
    <LockClosedIcon className="ml-auto h-3.5 w-3.5 text-slate-400" />
);

const ToolsMenu: React.FC<{ onNavigate: (page: Page) => void }> = ({ onNavigate }) => {
    const [isOpen, setIsOpen] = useState(false);
    const wrapperRef = useRef<HTMLDivElement>(null);
    const { hasProAccess, openPaywall } = useUser();
    const hasPro = hasProAccess;

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
    
    const handleNavigate = (page: Page, requiresPro: boolean = false) => {
        if (requiresPro && !hasPro) {
            setIsOpen(false);
            openPaywall();
        } else {
            onNavigate(page);
            setIsOpen(false);
        }
    };
    
    const toolItems = [
      { page: 'tools-oven-analysis' as Page, label: 'FormulaLab', icon: <FireIcon className="h-5 w-5" />, requiresPro: true },
      { page: 'references' as Page, label: 'Technical References', icon: <BookOpenIcon className="h-5 w-5" />, requiresPro: false },
      { page: 'tools-doughbot' as Page, label: 'Dough Diagnostic', icon: <BeakerIcon className="h-5 w-5" />, requiresPro: true },
    ];

    return (
        <div className="relative" ref={wrapperRef}>
            <button
                onClick={() => setIsOpen(prev => !prev)}
                className="flex items-center gap-1 rounded-md px-3 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-100 hover:text-slate-800"
            >
                Tools
                <ChevronDownIcon className={`h-4 w-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
            </button>
            {isOpen && (
                <div className="absolute left-0 mt-2 w-64 origin-top-left rounded-md bg-white p-2 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    {toolItems.map(item => (
                       <button
                          key={item.page}
                          onClick={() => handleNavigate(item.page, item.requiresPro)}
                          className="flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm text-slate-700 transition-colors hover:bg-slate-100"
                          role="menuitem"
                        >
                          <span className="text-slate-500">{item.icon}</span>
                          <span className="flex-grow text-left">{item.label}</span>
                          {item.requiresPro && !hasPro && <LockedIcon />}
                          {item.requiresPro && hasPro && <ProBadge />}
                        </button>
                    ))}
                </div>
            )}
        </div>
    )
};

const DesktopHeader: React.FC<HeaderComponentProps> = ({ activePage, handleNavigate, onNavigate, onOpenAuth }) => {
    const { isAuthenticated, hasProAccess, openPaywall } = useUser();
    
    const navLinks = [
      { page: 'mylab', label: 'My Lab' },
      { page: 'calculator', label: 'Calculator' },
      { page: 'styles', label: 'Styles' },
      { page: 'learn', label: 'Learn' },
      { page: 'shop', label: 'Shop' },
    ];

    return (
        <header className="fixed top-0 left-0 w-full z-50 hidden border-b border-slate-200/80 bg-white/90 backdrop-blur-md sm:block transition-all duration-200 shadow-sm">
          <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
            {/* Left Section: Logo & main links */}
            <div className="flex items-center gap-6">
              <button onClick={() => handleNavigate('mylab')} aria-label="Home" className="flex flex-shrink-0 items-center">
                <img src="https://firebasestorage.googleapis.com/v0/b/doughlabpro-app.firebasestorage.app/o/assets%2FDoughLabPro%20fbranco%20FINAL%20COMLETA.png?alt=media&token=0f160dc9-2e99-4f59-9eaa-9640e3437161" alt="DoughLabPro Logo" className="h-8 w-auto" />
              </button>
              <nav className="flex items-center gap-1">
                  {navLinks.map(link => (
                    <button
                        key={link.page}
                        onClick={() => handleNavigate(link.page as Page)}
                        className={`rounded-md px-3 py-2 text-sm font-semibold transition-colors flex items-center gap-1.5 ${
                          activePage === link.page || activePage.startsWith(link.page + '/')
                            ? 'text-lime-600 bg-lime-50'
                            : 'text-slate-600 hover:bg-slate-100 hover:text-slate-800'
                        }`}
                      >
                        {link.label}
                    </button>
                  ))}
                  <ToolsMenu onNavigate={onNavigate} />
              </nav>
            </div>

            {/* Right Section: User Avatar & Plan Status */}
            <div className="flex flex-shrink-0 items-center gap-4">
              {isAuthenticated && (
                  <div className="flex items-center gap-3 border-r border-slate-200 pr-4 mr-1">
                    {hasProAccess ? (
                       <div className="flex items-center gap-2" title="Thank you for supporting DoughLabPro">
                           <span className="inline-flex items-center gap-1 rounded-full bg-gradient-to-r from-amber-200 to-yellow-400 px-2.5 py-0.5 text-xs font-bold text-yellow-900 shadow-sm ring-1 ring-yellow-400/50">
                               <StarIcon className="h-3 w-3" /> PRO
                           </span>
                       </div>
                    ) : (
                        <>
                            <span className="text-xs font-medium text-slate-500 bg-slate-100 px-2.5 py-1 rounded-full border border-slate-200">
                                Free plan
                            </span>
                            <button 
                                onClick={() => openPaywall('general')}
                                className="text-sm font-bold text-lime-600 hover:text-lime-700 hover:underline transition-all"
                            >
                                Unlock your dough lab
                            </button>
                        </>
                    )}
                  </div>
              )}
              <UserMenu onNavigate={onNavigate} onOpenAuthModal={onOpenAuth} />
            </div>
          </div>
        </header>
    );
};

const MobileHeader: React.FC<HeaderComponentProps & { isMobileMenuOpen: boolean; setIsMobileMenuOpen: React.Dispatch<React.SetStateAction<boolean>>; }> = ({ activePage, handleNavigate, onNavigate, onOpenAuth, isMobileMenuOpen, setIsMobileMenuOpen }) => {
    const { hasProAccess, openPaywall } = useUser();
    const hasPro = hasProAccess;

    const navLinks = [
      { id: 'mylab', page: 'mylab', label: 'My Lab', icon: <BeakerIcon className="h-6 w-6 text-slate-500" /> } as any,
      { id: 'calculator', page: 'calculator', label: 'Calculator', icon: <CalculatorIcon className="h-6 w-6 text-slate-500" /> } as any,
      { id: 'styles', page: 'styles', label: 'Styles', icon: <BookOpenIcon className="h-6 w-6 text-slate-500" /> } as any,
      { id: 'learn', page: 'learn', label: 'Learn', icon: <AcademicCapIcon className="h-6 w-6 text-slate-500" /> } as any,
      { id: 'shop', page: 'shop', label: 'Shop', icon: <ShoppingBagIcon className="h-6 w-6 text-slate-500" /> } as any,
      { id: 'tools-oven-analysis', page: 'tools-oven-analysis', label: 'FormulaLab', icon: <FireIcon className="h-6 w-6 text-slate-500" />, requiresPro: true } as any,
      { id: 'profile', page: 'profile', label: 'Profile', icon: <UserCircleIcon className="h-6 w-6 text-slate-500" /> } as any,
    ];

    const onMobileNavigate = (page: Page, requiresPro: boolean = false) => {
        if (requiresPro && !hasPro) {
            setIsMobileMenuOpen(false);
            openPaywall();
        } else {
            handleNavigate(page);
        }
    }

    return (
        <header className="fixed top-0 left-0 w-full z-50 border-b border-slate-200/80 bg-white/90 backdrop-blur-md sm:hidden transition-all duration-200 shadow-sm">
            <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
                <button onClick={() => handleNavigate('mylab')} aria-label="Home" className="flex flex-shrink-0 items-center">
                    <img src="https://firebasestorage.googleapis.com/v0/b/doughlabpro-app.firebasestorage.app/o/assets%2FDoughLabPro%20fbranco%20FINAL%20COMLETA.png?alt=media&token=0f160dc9-2e99-4f59-9eaa-9640e3437161" alt="DoughLabPro Logo" className="h-8 w-auto" />
                </button>
                <div className="flex items-center gap-2">
                    <UserMenu onNavigate={onNavigate} onOpenAuthModal={onOpenAuth} />
                    <button onClick={() => setIsMobileMenuOpen(prev => !prev)} className="rounded-md p-2 text-slate-500 hover:bg-slate-100">
                        {isMobileMenuOpen ? <CloseIcon className="h-6 w-6" /> : <Bars3Icon className="h-6 w-6" />}
                    </button>
                </div>
            </div>
            {isMobileMenuOpen && (
                 <nav className="space-y-1 p-4 border-t border-slate-200 bg-white shadow-lg absolute w-full left-0 max-h-[80vh] overflow-y-auto">
                    {navLinks.map((link: any) => (
                        <button
                            key={link.id}
                            onClick={() => onMobileNavigate(link.id, link.requiresPro)}
                            className="flex w-full items-center gap-3 rounded-lg p-3 text-base font-semibold text-slate-700 hover:bg-slate-100"
                        >
                            {link.icon}
                            <span className="flex-grow text-left">{link.label}</span>
                            {link.requiresPro && !hasPro && <LockedIcon />}
                            {link.requiresPro && hasPro && <ProBadge />}
                        </button>
                    ))}
                </nav>
            )}
        </header>
    );
};


const Navigation: React.FC<NavigationProps> = (props) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const handleNavigate = (page: Page) => {
    props.onNavigate(page);
    setIsMobileMenuOpen(false);
  }

  return (
    <>
      <DesktopHeader {...props} handleNavigate={handleNavigate} />
      <MobileHeader {...props} handleNavigate={handleNavigate} isMobileMenuOpen={isMobileMenuOpen} setIsMobileMenuOpen={setIsMobileMenuOpen} />
    </>
  );
};

export default Navigation;