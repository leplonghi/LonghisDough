import React, { useState } from 'react';
import { useAuth } from '../auth';
import { useTranslation } from '../i18n';
import { CloseIcon, GoogleIcon } from './IconComponents';
import { User } from '../types';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose }) => {
  const { login } = useAuth();
  const { t } = useTranslation();
  const [email, setEmail] = useState('');

  const handleGoogleLogin = () => {
    // Simulate Google Login
    const mockUser: User = {
      name: 'Test User',
      email: 'test.user@google.com',
      avatar: `https://api.dicebear.com/8.x/initials/svg?seed=Test%20User`
    };
    login(mockUser);
    onClose();
  };

  const handleEmailLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const name = email.split('@')[0].replace('.', ' ').replace(/\b\w/g, l => l.toUpperCase());
    const mockUser: User = {
      name: name,
      email: email,
      avatar: `https://api.dicebear.com/8.x/initials/svg?seed=${encodeURIComponent(name)}`
    };
    login(mockUser);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-30 flex items-center justify-center bg-black/60 backdrop-blur-sm"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="auth-title"
    >
      <div
        className="relative mx-4 w-full max-w-sm rounded-2xl bg-white p-6 shadow-xl dark:border dark:border-slate-700 dark:bg-slate-800"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 rounded-full p-1 text-slate-500 hover:bg-slate-200 dark:text-slate-400 dark:hover:bg-slate-700"
          aria-label={t('load_modal.close_aria')}
        >
          <CloseIcon className="h-6 w-6" />
        </button>

        <div className="text-center">
          <h2 id="auth-title" className="text-2xl font-bold text-slate-900 dark:text-white">
            {t('auth.modal_title')}
          </h2>
          <p className="mt-2 text-slate-600 dark:text-slate-300">
            {t('auth.modal_subtitle')}
          </p>
        </div>

        <div className="mt-8 space-y-4">
          <button
            onClick={handleGoogleLogin}
            className="flex w-full items-center justify-center gap-3 rounded-lg border border-slate-300 bg-white py-2.5 px-4 text-sm font-semibold text-slate-700 shadow-sm transition-colors hover:bg-slate-50 dark:border-slate-600 dark:bg-slate-700 dark:text-slate-200 dark:hover:bg-slate-600"
          >
            <GoogleIcon />
            {t('auth.google_button')}
          </button>

          <div className="my-4 flex items-center">
            <div className="flex-grow border-t border-slate-300 dark:border-slate-600"></div>
            <span className="mx-4 flex-shrink text-xs uppercase text-slate-500 dark:text-slate-400">
              {t('auth.or_continue_with')}
            </span>
            <div className="flex-grow border-t border-slate-300 dark:border-slate-600"></div>
          </div>

          <form onSubmit={handleEmailLogin} className="space-y-4">
            <div>
              <label htmlFor="email" className="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-300">
                {t('auth.email_label')}
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                required
                className="w-full rounded-lg border-slate-300 bg-slate-50 p-2 text-slate-900 focus:border-lime-500 focus:ring-lime-500 dark:border-slate-600 dark:bg-slate-700 dark:text-slate-100"
              />
            </div>
            <button
              type="submit"
              className="w-full rounded-lg bg-lime-500 py-2.5 px-4 font-semibold text-white shadow-md hover:bg-lime-600"
            >
              {t('auth.login_button')}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AuthModal;
