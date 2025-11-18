import React, { useState, useRef, ReactNode } from 'react';
import { useUser } from '../contexts/UserProvider';
import { 
    UserCircleIcon, 
    ArrowRightOnRectangleIcon,
    SettingsIcon,
    QuestionMarkCircleIcon,
    ShieldCheckIcon,
    ChevronRightIcon,
} from './IconComponents';
import { Page } from '../types';

interface UserMenuProps {
  onNavigate: (page: Page) => void;
  onOpenAuthModal: () => void;
}

const UserMenu: React.FC<UserMenuProps> = ({ onNavigate, onOpenAuthModal }) => {
  const { isAuthenticated, user, logout } = useUser();
  const [isOpen, setIsOpen] = useState(false);
  const [activeSubMenu, setActiveSubMenu] = useState<string | null>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setActiveSubMenu(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    logout();
    setIsOpen(false);
    onNavigate('calculator');
  };

  const handleNavigate = (page: Page) => {
    setIsOpen(false);
    setActiveSubMenu(null);
    onNavigate(page);
  };
  
  if (!isAuthenticated) {
    return (
      <button
        onClick={onOpenAuthModal}
        title="Sign In"
        className="flex h-9 w-9 items-center justify-center rounded-full text-sm font-semibold text-slate-600 ring-1 ring-slate-200 transition-all hover:bg-slate-100 sm:w-auto sm:gap-1.5 sm:px-3"
      >
        <UserCircleIcon className="h-5 w-5" />
        <span className="hidden sm:inline">Sign In</span>
      </button>
    );
  }
  
  const MenuItem: React.FC<{icon: ReactNode, children: ReactNode, onClick?: () => void, hasSubMenu?: boolean, onSubMenuToggle?: () => void}> = ({ icon, children, onClick, hasSubMenu, onSubMenuToggle }) => (
      <button
        onClick={onClick || onSubMenuToggle}
        className="flex w-full items-center justify-between gap-3 rounded-md px-3 py-2 text-sm text-slate-700 transition-colors hover:bg-slate-100"
        role="menuitem"
      >
        <div className="flex items-center gap-3">
            <span className="text-slate-500">{icon}</span>
            <span>{children}</span>
        </div>
        {hasSubMenu && <ChevronRightIcon className="h-4 w-4 text-slate-400" />}
      </button>
  );
  
  const SubMenu: React.FC<{title: string, onBack: () => void, children: ReactNode}> = ({ title, onBack, children }) => (
      <div className="absolute top-0 left-0 w-full h-full bg-white rounded-md animate-[fadeIn_0.2s_ease-out]">
         <div className="flex items-center gap-2 p-2 border-b border-slate-200">
             <button onClick={onBack} className="p-1 rounded-full hover:bg-slate-100">
                <ChevronRightIcon className="h-4 w-4 rotate-180"/>
             </button>
             <h4 className="text-sm font-semibold">{title}</h4>
         </div>
         <div className="p-1 space-y-1">{children}</div>
      </div>
  );

  return (
    <div className="relative" ref={wrapperRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        title="User menu"
        className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-200 text-sm font-semibold uppercase text-slate-600 ring-1 ring-slate-300 transition-all hover:ring-2 hover:ring-lime-500 focus:outline-none focus:ring-2 focus:ring-lime-500 focus:ring-offset-2"
        aria-haspopup="true"
        aria-expanded={isOpen}
      >
        {user?.avatar ? (
          <img src={user.avatar} alt={user.name} className="h-full w-full rounded-full object-cover" />
        ) : (
          <span className="text-base font-bold">{user?.name.charAt(0)}</span>
        )}
      </button>

      {isOpen && (
        <div
          className="absolute right-0 mt-2 w-64 origin-top-right rounded-md bg-white p-2 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none overflow-hidden"
          role="menu"
          aria-orientation="vertical"
        >
          <div className={`transition-opacity duration-200 ${activeSubMenu ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
            <div className="mb-2 border-b border-slate-200 pb-2">
                <p className="truncate px-1 text-sm font-semibold text-slate-800">{user?.name}</p>
                <p className="truncate px-1 text-xs text-slate-500">{user?.email}</p>
            </div>
            <div role="none" className="space-y-1">
                <MenuItem icon={<UserCircleIcon className="h-5 w-5"/>} onClick={() => handleNavigate('profile')}>Profile</MenuItem>
                <MenuItem icon={<SettingsIcon className="h-5 w-5"/>} hasSubMenu onSubMenuToggle={() => setActiveSubMenu('settings')}>Settings</MenuItem>
                <MenuItem icon={<QuestionMarkCircleIcon className="h-5 w-5"/>} onClick={() => handleNavigate('help')}>Help</MenuItem>
                <MenuItem icon={<ShieldCheckIcon className="h-5 w-5"/>} onClick={() => handleNavigate('legal')}>Legal</MenuItem>
                <div className="border-t border-slate-200 my-1"></div>
                <button onClick={handleLogout} className="flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm text-red-600 transition-colors hover:bg-red-50" role="menuitem">
                <ArrowRightOnRectangleIcon className="h-5 w-5" />
                <span>Sign Out</span>
                </button>
            </div>
          </div>
          
          {/* Submenus */}
          {activeSubMenu === 'settings' && (
              <SubMenu title="Settings" onBack={() => setActiveSubMenu(null)}>
                  <MenuItem icon={<SettingsIcon className="h-5 w-5"/>} onClick={() => handleNavigate('settings')}>General</MenuItem>
              </SubMenu>
          )}

        </div>
      )}
    </div>
  );
};

export default UserMenu;