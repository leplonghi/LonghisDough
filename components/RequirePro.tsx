
import React from 'react';
import { useUser } from '@/contexts/UserProvider';
import { LockClosedIcon, StarIcon } from '@/components/ui/Icons';

const RequirePro: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { hasProAccess, openPaywall } = useUser();

  if (!hasProAccess) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] p-8 text-center animate-fade-in">
        <div className="bg-lime-100 p-6 rounded-full mb-6 ring-4 ring-lime-50">
            <LockClosedIcon className="w-12 h-12 text-lime-600" />
        </div>
        <h2 className="text-3xl font-bold text-slate-900 mb-3">Pro Feature Locked</h2>
        <p className="text-slate-600 mb-8 max-w-md text-lg leading-relaxed">
          This area is available exclusively to Pro members. Unlock your full baking potential with unlimited history, advanced insights, and more.
        </p>
        <button
          onClick={() => openPaywall('mylab')}
          className="flex items-center gap-2 rounded-xl bg-lime-500 py-3.5 px-8 text-base font-bold text-white shadow-lg shadow-lime-200 transition-all hover:bg-lime-600 hover:scale-105 active:scale-95"
        >
          <StarIcon className="h-5 w-5" />
          Upgrade to Pro
        </button>
      </div>
    );
  }

  return <>{children}</>;
};

export default RequirePro;
