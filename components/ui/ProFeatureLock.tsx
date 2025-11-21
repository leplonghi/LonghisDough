
import React from 'react';
import { useUser } from '@/contexts/UserProvider';
import { StarIcon, LockClosedIcon } from '@/components/ui/Icons';
import { PaywallOrigin } from '@/types';

interface ProFeatureLockProps {
  children: React.ReactNode;
  featureName?: string;
  description?: string;
  className?: string;
  origin?: PaywallOrigin;
}

const ProFeatureLock: React.FC<ProFeatureLockProps> = ({ children, featureName, description, className = "", origin = 'general' }) => {
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
        <div className="flex flex-col items-center gap-3 p-5 rounded-xl bg-white/95 shadow-lg backdrop-blur-sm border border-slate-200 transition-transform duration-200 group-hover:scale-105 max-w-xs text-center">
            <div className="p-2 bg-lime-100 rounded-full">
                <LockClosedIcon className="h-6 w-6 text-lime-600" />
            </div>
            <div>
                <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
                    {featureName || "PRO Feature"}
                </h3>
                {description && (
                    <p className="text-xs text-slate-500 mt-1 leading-relaxed">{description}</p>
                )}
            </div>
            <button className="px-4 py-1.5 text-xs font-bold text-white bg-lime-500 rounded-full shadow-sm hover:bg-lime-600 transition-colors flex items-center gap-1.5">
                <StarIcon className="h-3 w-3" />
                Unlock Pro
            </button>
        </div>
      </div>
    </div>
  );
};

export default ProFeatureLock;
