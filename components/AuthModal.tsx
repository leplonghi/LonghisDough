import React from 'react';
import { useAuth } from '../auth';
import { useTranslation } from '../i18n';
import { User } from '../types';
import { CloseIcon, GoogleIcon } from './IconComponents';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose }) => {
  const { login } = useAuth();
  const { t } = useTranslation();

  const handleGoogleLogin = () => {
    // This is a mock login. In a real app, this would trigger the OAuth flow.
    const mockUser: User = {
      name: 'Jane Dough',
      email: 'jane.dough@example.com',
      avatar: `https://i.pravatar.cc/150?u=${Date.now()}`, // Random avatar for demo
    };
    login(mockUser);
    onClose();
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 z-30 flex items-center justify-center bg-black/60 backdrop-blur-sm animate-[fadeIn_0.3s_ease-out]"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="auth-modal-title"
    >
      <div
        className="relative mx-4 w-full max-w-sm rounded-2xl bg-white p-6 shadow-xl dark:border dark:border-slate-700 dark:bg-slate-800 sm:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between">
          <h2
            id="auth-modal-title"
            className="text-xl font-bold text-slate-900 dark:text-white"
          >
            {t('auth.modal_title')}
          </h2>
          <button
            onClick={onClose}
            className="rounded-full p-1 text-slate-500 hover:bg-slate-200 dark:text-slate-400 dark:hover:bg-slate-700"
            aria-label={t('load_modal.close_aria')}
          >
            <CloseIcon className="h-6 w-6" />
          </button>
        </div>

        <div className="mt-8 text-center">
          <p className="text-slate-600 dark:text-slate-300">
            {t('auth.modal_subtitle')}
          </p>
          <div className="mt-6">
            <button
              onClick={handleGoogleLogin}
              className="inline-flex w-full items-center justify-center gap-3 rounded-lg border border-slate-300 bg-white py-2.5 px-4 text-sm font-semibold text-slate-700 shadow-sm transition-colors hover:bg-slate-50 dark:border-slate-600 dark:bg-slate-700 dark:text-slate-200 dark:hover:bg-slate-600"
            >
              <GoogleIcon className="h-5 w-5" />
              <span>{t('auth.continue_with_google')}</span>
            </button>
          </div>
          <p className="mt-6 text-xs text-slate-500 dark:text-slate-400">
            {t('auth.terms_notice')}
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthModal;
