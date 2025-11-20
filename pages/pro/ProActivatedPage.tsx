
import React, { useEffect } from 'react';
import { CheckCircleIcon } from '../../components/IconComponents';
import { useUser } from '../../contexts/UserProvider';
import { Page } from '../../types';

const ProActivatedPage: React.FC<{ onNavigate: (page: Page) => void }> = ({ onNavigate }) => {
  const { grantProAccess } = useUser();

  useEffect(() => {
    grantProAccess();
    const timer = setTimeout(() => {
      onNavigate('mylab');
    }, 3000);
    return () => clearTimeout(timer);
  }, [grantProAccess, onNavigate]);

  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center p-6 text-center animate-fade-in">
      <div className="mb-6 rounded-full bg-lime-100 p-4">
        <CheckCircleIcon className="h-16 w-16 text-lime-600" />
      </div>
      <h1 className="mb-2 text-3xl font-bold text-slate-900">Pro Activated!</h1>
      <p className="mb-8 text-lg text-slate-600">
        Thank you for supporting DoughLabPro.<br/>
        You now have full access to all features.
      </p>
      <div className="h-2 w-48 overflow-hidden rounded-full bg-slate-200">
        <div className="h-full w-full animate-[slide-in-right_2s_ease-in-out] bg-lime-500"></div>
      </div>
      <p className="mt-4 text-sm text-slate-400">Redirecting to your lab...</p>
    </div>
  );
};

export default ProActivatedPage;
