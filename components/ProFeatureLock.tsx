import React from 'react';
import { useUser } from '../contexts/UserProvider';
import { StarIcon, LockClosedIcon } from './IconComponents';
import { PaywallOrigin } from '../types';

interface ProFeatureLockProps {
  children: React.ReactNode;
  featureName?: string;
  className?: string;
  origin?: PaywallOrigin;
}

const ProFeatureLock: React.FC<ProFeatureLockProps> = ({ children, featureName, className = "", origin = 'general' }) => {
  const { hasProAccess, openPaywall } = useUser();
  const hasAccess = hasProAccess;

  if (hasAccess) {
    return <>{children}</>;
  }

  return (
    <div className={`relative group ${className}`} onClick={(e) => { e.stopPropagation(); openPaywall(origin as PaywallOrigin); }}>
      <div className="pro-locked select-none pointer-events-none" aria-hidden="true">
        {children}
      </div>
      
      <div className="absolute inset-0 z-10 flex items-center justify-center cursor-pointer">
        <div className="flex flex-col items-center gap-3 p-4 rounded-xl bg-white/90 shadow-lg backdrop-blur-sm border border-slate-200 transition-transform duration-200 group-hover:scale-105">
            <div className="p-2 bg-lime-100 rounded-full">
                <LockClosedIcon className="h-6 w-6 text-lime-600" />
            </div>
            <div className="text-center">
                <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
                    PRO Feature
                </h3>
                {featureName && (
                    <p className="text-xs text-slate-500 mt-1">{featureName}</p>
                )}
            </div>
            <button className="px-4 py-1.5 text-xs font-bold text-white bg-lime-500 rounded-full shadow-sm hover:bg-lime-600 transition-colors flex items-center gap-1.5">
                <StarIcon className="h-3 w-3" />
                Unlock
            </button>
        </div>
      </div>
    </div>
  );
};

export default ProFeatureLock;