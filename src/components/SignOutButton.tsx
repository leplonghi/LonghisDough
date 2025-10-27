import React from 'react';
import { supabase } from '../integrations/supabase/client';
import { useTranslation } from '../i18n';

const SignOutButton: React.FC = () => {
  const { t } = useTranslation();

  const handleSignOut = async () => {
    await supabase.auth.signOut();
  };

  return (
    <button
      onClick={handleSignOut}
      className="rounded-full p-2 text-slate-500 transition-all hover:bg-slate-200 focus:outline-none focus:ring-2 focus:ring-lime-500 focus:ring-offset-2 dark:text-slate-300 dark:hover:bg-slate-700 dark:hover:text-slate-100 dark:focus:ring-offset-slate-900"
      aria-label={t('auth.sign_out')}
    >
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
      </svg>
    </button>
  );
};

export default SignOutButton;