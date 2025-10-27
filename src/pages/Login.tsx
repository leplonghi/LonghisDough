import React from 'react';
import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { supabase } from '../integrations/supabase/client';
import { useTranslation } from '../i18n';

const LoginPage: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-900 p-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-lg ring-1 ring-slate-200/50 dark:border dark:border-slate-700/50 dark:bg-slate-800 dark:ring-0 sm:p-8">
        <h2 className="text-center text-2xl font-bold text-slate-900 dark:text-white mb-6">
          {t('login.title')}
        </h2>
        <Auth
          supabaseClient={supabase}
          providers={['google']}
          appearance={{
            theme: ThemeSupa,
            variables: {
              default: {
                colors: {
                  brand: 'hsl(84 96% 39%)', // lime-500
                  brandAccent: 'hsl(84 96% 30%)', // lime-600
                  brandButtonText: 'white',
                  defaultButtonBackground: 'hsl(210 40% 96.1%)', // slate-200
                  defaultButtonBackgroundHover: 'hsl(214.3 31.8% 91.4%)', // slate-300
                  defaultButtonBorder: 'hsl(210 40% 96.1%)',
                  defaultButtonText: 'hsl(215.4 16.3% 46.9%)', // slate-700
                  inputBackground: 'hsl(210 40% 96.1%)', // slate-50
                  inputBorder: 'hsl(217.2 32.6% 17.5%)', // slate-300
                  inputBorderHover: 'hsl(84 96% 39%)', // lime-500
                  inputBorderFocus: 'hsl(84 96% 39%)', // lime-500
                  inputText: 'hsl(222.2 47.4% 11.2%)', // slate-900
                  inputLabelText: 'hsl(215.4 16.3% 46.9%)', // slate-700
                },
              },
              dark: {
                colors: {
                  brand: 'hsl(84 96% 39%)', // lime-500
                  brandAccent: 'hsl(84 96% 30%)', // lime-600
                  brandButtonText: 'white',
                  defaultButtonBackground: 'hsl(217.2 32.6% 17.5%)', // slate-700
                  defaultButtonBackgroundHover: 'hsl(215.4 16.3% 46.9%)', // slate-600
                  defaultButtonBorder: 'hsl(217.2 32.6% 17.5%)',
                  defaultButtonText: 'hsl(210 40% 96.1%)', // slate-200
                  inputBackground: 'hsl(217.2 32.6% 17.5%)', // slate-700
                  inputBorder: 'hsl(215 27.9% 27.8%)', // slate-600
                  inputBorderHover: 'hsl(84 96% 39%)', // lime-500
                  inputBorderFocus: 'hsl(84 96% 39%)', // lime-500
                  inputText: 'hsl(210 40% 96.1%)', // slate-100
                  inputLabelText: 'hsl(210 40% 96.1%)', // slate-300
                },
              },
            },
          }}
          theme="light" // Will be overridden by dark mode class on root
          magicLink={true}
        />
      </div>
    </div>
  );
};

export default LoginPage;