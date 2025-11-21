
import React, { useState } from 'react';
import {
  CloseIcon,
  StarIcon,
  CheckIcon,
  LockClosedIcon,
} from './IconComponents';
import { useUser } from '../contexts/UserProvider';
import { PaywallOrigin } from '../types';

interface PaywallModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigateToPlans?: () => void;
  origin?: PaywallOrigin | null;
}

type BillingCycle = 'monthly' | 'yearly';

export const PaywallModal: React.FC<PaywallModalProps> = ({
  isOpen,
  onClose,
  origin
}) => {
  const { grantProAccess } = useUser();
  const [billingCycle, setBillingCycle] = useState<BillingCycle>('yearly');
  const [isProcessing, setIsProcessing] = useState(false);

  if (!isOpen) return null;

  const handleSubscribe = () => {
    setIsProcessing(true);
    // Simulate API call / Stripe Checkout delay
    setTimeout(() => {
      grantProAccess();
      setIsProcessing(false);
      onClose();
    }, 1500);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/90 backdrop-blur-sm animate-[fadeIn_0.3s_ease-out] p-4 overflow-y-auto"
      role="dialog"
      aria-modal="true"
    >
      <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-slate-100 text-slate-500 hover:bg-slate-200 transition-colors"
          aria-label="Close"
        >
          <CloseIcon className="h-5 w-5" />
        </button>

        {/* Header Section */}
        <div className="px-8 pt-10 pb-2 text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-lime-100 mb-5 shadow-sm ring-4 ring-lime-50">
             <StarIcon className="h-7 w-7 text-lime-600" />
          </div>
          <h2 className="text-3xl font-extrabold text-slate-900 leading-tight">
            Stop guessing.<br/>Start mastering your dough.
          </h2>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto px-6 py-6">
          
          {/* Comparison Card */}
          <div className="bg-slate-50 rounded-2xl p-5 border border-slate-100 shadow-inner mb-6 space-y-3">
             <div className="flex items-start gap-3">
                <span className="flex-shrink-0 mt-0.5">
                    <LockClosedIcon className="h-5 w-5 text-slate-400" />
                </span>
                <div>
                    <span className="font-bold text-slate-500 text-sm uppercase tracking-wider">Free</span>
                    <p className="text-sm text-slate-600 leading-snug">1 Levain Pet, 1 saved bake, basic tools.</p>
                </div>
             </div>
             <div className="w-full h-px bg-slate-200"></div>
             <div className="flex items-start gap-3">
                <span className="flex-shrink-0 mt-0.5">
                    <CheckIcon className="h-5 w-5 text-lime-600" />
                </span>
                <div>
                    <span className="font-bold text-lime-600 text-sm uppercase tracking-wider">Pro</span>
                    <p className="text-sm text-slate-800 font-medium leading-snug">Unlimited Levain Pets, full history, advanced insights, exports, and more.</p>
                </div>
             </div>
          </div>

          {/* Pricing Section */}
          <div className="bg-slate-900 rounded-2xl p-6 text-white text-center shadow-xl ring-1 ring-slate-900/5">
             {/* Toggle */}
             <div className="flex justify-center mb-5">
                <div className="bg-slate-800 p-1 rounded-full flex relative">
                   <button 
                      onClick={() => setBillingCycle('monthly')}
                      className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wide transition-all duration-200 ${billingCycle === 'monthly' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-400 hover:text-white'}`}
                   >
                      Monthly
                   </button>
                   <button 
                      onClick={() => setBillingCycle('yearly')}
                      className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wide transition-all duration-200 flex items-center gap-2 ${billingCycle === 'yearly' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-400 hover:text-white'}`}
                   >
                      Yearly
                      <span className="bg-lime-500 text-white text-[9px] px-1.5 py-0.5 rounded-md uppercase font-extrabold">
                        -20%
                      </span>
                   </button>
                </div>
             </div>

             <div className="mb-1">
                <div className="flex items-baseline justify-center gap-1">
                    <span className="text-4xl font-extrabold tracking-tight">
                        {billingCycle === 'yearly' ? '$67.10' : '$6.99'}
                    </span>
                    <span className="text-slate-400 font-medium">
                         /{billingCycle === 'yearly' ? 'yr' : 'mo'}
                    </span>
                </div>
                <p className="text-lime-400 text-sm font-bold mt-1">
                    {billingCycle === 'yearly' 
                        ? 'From just $5.59/mo — billed annually.'
                        : 'From just $6.99/month — less than 25¢ a day.'}
                </p>
                <p className="text-slate-400 text-xs mt-1.5">
                    Cheaper than a coffee, more valuable than a failed batch.
                </p>
             </div>

             <button
                onClick={handleSubscribe}
                disabled={isProcessing}
                className="mt-6 w-full py-3.5 px-6 rounded-xl bg-lime-500 hover:bg-lime-400 text-slate-900 font-bold text-lg shadow-lg shadow-lime-900/20 transition-all transform active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
             >
                {isProcessing ? (
                    <span>Processing...</span>
                ) : (
                    <>
                        <StarIcon className="h-5 w-5" />
                        Upgrade to Pro
                    </>
                )}
             </button>
          </div>

          <div className="mt-4 text-center">
              <button 
                onClick={onClose} 
                className="text-sm font-medium text-slate-400 hover:text-slate-600 transition-colors py-2"
              >
                  Keep Free plan for now
              </button>
          </div>

        </div>
      </div>
    </div>
  );
};
