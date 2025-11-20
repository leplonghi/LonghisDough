
import React from 'react';
import { useUser } from '../contexts/UserProvider';
import { useTranslation } from '../i18n';
import { CloseIcon, GoogleIcon, UserCircleIcon, ShieldCheckIcon } from './IconComponents';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose }) => {
  const { login, devLogin } = useUser();
  const { t } = useTranslation();

  const handleGoogleLogin = async () => {
    try {
        await login();
        onClose();
    } catch (error) {
        console.error("Login failed", error);
    }
  };
  
  const handleDevLogin = async (type: 'admin' | 'free') => {
      try {
          devLogin(type);
          onClose();
      } catch (error) {
          console.error("Dev login failed", error);
      }
  }

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
        className="relative mx-4 w-full max-w-sm rounded-2xl bg-white p-6 shadow-xl sm:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between">
          <h2
            id="auth-modal-title"
            className="text-xl font-bold text-slate-900"
          >
            {t('auth.modal_title')}
          </h2>
          <button
            onClick={onClose}
            className="rounded-full p-1 text-slate-500 hover:bg-slate-200"
            aria-label={t('modals.close')}
          >
            <CloseIcon className="h-6 w-6" />
          </button>
        </div>

        <div className="mt-8 text-center">
          <p className="text-slate-600">
            {t('auth.modal_subtitle')}
          </p>
          <div className="mt-6">
            <button
              onClick={handleGoogleLogin}
              className="inline-flex w-full items-center justify-center gap-3 rounded-lg border border-slate-300 bg-white py-2.5 px-4 text-sm font-semibold text-slate-700 shadow-sm transition-colors hover:bg-slate-50"
            >
              <GoogleIcon className="h-5 w-5" />
              <span>{t('auth.continue_with_google')}</span>
            </button>
          </div>
          <p className="mt-6 text-xs text-slate-500">
            {t('auth.terms_notice')}
          </p>
          
          {/* Developer Mode Section */}
          <div className="mt-8 border-t border-slate-100 pt-4">
            <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-3">
                Developer Access (Simulated)
            </p>
            <div className="grid grid-cols-2 gap-3">
                 <button
                  onClick={() => handleDevLogin('admin')}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-slate-800 py-2 px-3 text-xs font-semibold text-white shadow-sm hover:bg-slate-700"
                >
                  <ShieldCheckIcon className="h-4 w-4" />
                  Admin (Pro)
                </button>
                 <button
                  onClick={() => handleDevLogin('free')}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-slate-100 py-2 px-3 text-xs font-semibold text-slate-600 hover:bg-slate-200"
                >
                  <UserCircleIcon className="h-4 w-4" />
                  Visitor (Free)
                </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default AuthModal;
