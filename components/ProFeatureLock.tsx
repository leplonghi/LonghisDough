
import React from "react";
import { useUser } from "../contexts/UserProvider";
import { LockClosedIcon, StarIcon } from "./IconComponents";
import { PaywallOrigin } from "../types";

type ProFeatureLockProps = {
  origin: PaywallOrigin;
  title?: string;
  description?: string;
  children?: React.ReactNode;
  className?: string;
  featureName?: string; // Kept for backward compatibility but unused in new design
};

const ProFeatureLock: React.FC<ProFeatureLockProps> = ({
  origin,
  title,
  description,
  children,
  className = "",
}) => {
  const { hasProAccess, openPaywall } = useUser();

  if (hasProAccess) {
    return <>{children}</>;
  }

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    openPaywall(origin);
  };

  return (
    <div className={`relative group ${className}`} onClick={handleClick}>
      {children && (
        <div className="pointer-events-none select-none opacity-40 blur-[2px] transition-all duration-300 group-hover:blur-[3px]">
          {children}
        </div>
      )}
      <div className="absolute inset-0 z-10 flex flex-col items-center justify-center">
        <button
          type="button"
          className="flex flex-col items-center justify-center rounded-xl border border-slate-200 bg-white/90 px-6 py-4 text-center shadow-lg backdrop-blur-sm transition-transform duration-200 hover:scale-105 hover:shadow-xl"
        >
          <div className="mb-2 rounded-full bg-lime-100 p-2 text-lime-600">
             <LockClosedIcon className="h-5 w-5" />
          </div>
          <div className="mb-1 text-sm font-bold text-slate-900">
            {title || "Pro Feature"}
          </div>
          <div className="mb-3 text-xs text-slate-500 max-w-[200px] leading-snug">
            {description ||
              "Unlock this tool with DoughLabPro Pro to get full access."}
          </div>
          <div className="inline-flex items-center gap-1.5 rounded-full bg-lime-500 px-3 py-1.5 text-xs font-bold text-white shadow-sm hover:bg-lime-600">
            <StarIcon className="h-3 w-3" />
            Unlock with Pro
          </div>
        </button>
      </div>
    </div>
  );
};

export default ProFeatureLock;
