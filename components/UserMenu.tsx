import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../auth';
import { useTranslation } from '../i18n';
import { UserCircleIcon, ArrowRightOnRectangleIcon } from './IconComponents';

type Page = 'calculator' | 'plans' | 'tips' | 'profile';

interface UserMenuProps {
  onNavigate: (page: Page) => void;
  onOpenAuthModal: () => void;
}

const UserMenu: React.FC<UserMenuProps> = ({ onNavigate, onOpenAuthModal }) => {
  const { isAuthenticated, user, logout } = useAuth();
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

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
  }, []);

  const handleLogout = () => {
    logout();
    setIsOpen(false);
    onNavigate('calculator');
  };
  
  const handleProfileClick = () => {
    setIsOpen(false);
    onNavigate('profile');
  };

  if (!isAuthenticated) {
    return (
      <button
        onClick={onOpenAuthModal}
        title={t('auth.sign_in')}
        className="hidden items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-semibold text-slate-600 ring-1 ring-slate-200 transition-all hover:bg-slate-100 dark:text-slate-300 dark:ring-slate-700 dark:hover:bg-slate-800 sm:flex"
      >
        <UserCircleIcon className="h-5 w-5" />
        <span>{t('auth.sign_in')}</span>
      </button>
    );
  }

  return (
    <div className="relative" ref={wrapperRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        title={t('header.user_profile_tooltip')}
        className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-200 text-sm font-semibold uppercase text-slate-600 ring-1 ring-slate-300 transition-all hover:ring-lime-500 focus:outline-none focus:ring-2 focus:ring-lime-500 focus:ring-offset-2 dark:bg-slate-700 dark:text-slate-200 dark:ring-slate-600 dark:focus:ring-offset-slate-900"
        aria-haspopup="true"
        aria-expanded={isOpen}
      >
        {user?.avatar ? (
            <img src={user.avatar} alt={user.name} className="h-full w-full rounded-full object-cover" />
        ) : (
            user?.name.charAt(0)
        )}
      </button>

      {isOpen && (
        <div
          className="absolute right-0 mt-2 w-48 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none dark:bg-slate-800 dark:ring-white/10"
          role="menu"
          aria-orientation="vertical"
        >
          <div className="py-1" role="none">
             <div className="border-b border-slate-200 px-4 py-2 dark:border-slate-700">
                <p className="truncate text-sm font-semibold text-slate-800 dark:text-slate-100">{user?.name}</p>
                <p className="truncate text-xs text-slate-500 dark:text-slate-400">{user?.email}</p>
             </div>
             <button
              onClick={handleProfileClick}
              className="flex w-full items-center gap-2 px-4 py-2 text-sm text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-700"
              role="menuitem"
            >
              <UserCircleIcon className="h-5 w-5" />
              <span>{t('auth.view_profile')}</span>
            </button>
            <button
              onClick={handleLogout}
              className="flex w-full items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-slate-100 dark:text-red-400 dark:hover:bg-slate-700"
              role="menuitem"
            >
              <ArrowRightOnRectangleIcon className="h-5 w-5" />
              <span>{t('auth.sign_out')}</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserMenu;