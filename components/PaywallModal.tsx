
import React, { useState } from 'react';
import {
  CloseIcon,
  StarIcon,
  BookOpenIcon,
  BeakerIcon,
  BatchesIcon,
  SparklesIcon,
  DownloadIcon,
  ShieldCheckIcon,
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
  onNavigateToPlans,
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
      // Ideally redirect to a success page or show a toast here
    }, 1500);
  };

  const getHeaderText = () => {
    switch(origin) {
        case 'levain': return "Advanced Levain Tools require DoughLabPro Pro";
        case 'mylab': return "Unlock your full baking history and insights";
        case 'calculator': return "Export, AI tools and advanced presets are Pro-only";
        case 'styles': return "Access professional dough styles with Pro";
        case 'learn': return "Continue reading advanced techniques with Pro";
        default: return "Unlock DoughLabPro Pro";
    }
  }

  const benefits = [
    {
      icon: <BeakerIcon className="h-5 w-5" />,
      title: "Unlimited Levain Pets",
      desc: "Manage multiple starters with advanced vitality analytics."
    },
    {
      icon: <BatchesIcon className="h-5 w-5" />,
      title: "Unlimited Batches in MyLab",
      desc: "Full history, photos, charts and comparisons."
    },
    {
      icon: <SparklesIcon className="h-5 w-5" />,
      title: "Advanced Dough Insights",
      desc: "Understand hydration, fermentation, stability and structure."
    },
    {
      icon: <BookOpenIcon className="h-5 w-5" />,
      title: "Complete Styles Library",
      desc: "Load any professional preset directly into the calculator."
    },
    {
      icon: <DownloadIcon className="h-5 w-5" />,
      title: "Smart Exports",
      desc: "Generate clean PDFs, JSON and batch reports."
    },
    {
      icon: <StarIcon className="h-5 w-5" />,
      title: "Priority Access",
      desc: "New tools, new styles, new intelligence every month."
    },
    {
      icon: <ShieldCheckIcon className="h-5 w-5" />,
      title: "Ad-free & Faster Sync",
      desc: "Optimized for performance."
    }
  ];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/90 backdrop-blur-sm animate-[fadeIn_0.3s_ease-out] p-4 overflow-y-auto"
      role="dialog"
      aria-modal="true"
    >
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-slate-100 text-slate-500 hover:bg-slate-200 transition-colors"
          aria-label="Close"
        >
          <CloseIcon className="h-5 w-5" />
        </button>

        {/* Header Section */}
        <div className="bg-slate-50 px-8 pt-10 pb-6 text-center border-b border-slate-200">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-lime-100 mb-4">
             <StarIcon className="h-6 w-6 text-lime-600" />
          </div>
          <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900">
            {getHeaderText()}
          </h2>
          <p className="mt-2 text-lg text-slate-600">
            Experience the full power of dough engineering.
          </p>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto px-6 py-6 md:px-10">
          
          {/* Benefits Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="flex items-start gap-3">
                <div className="flex-shrink-0 mt-0.5 text-lime-600">
                  {benefit.icon}
                </div>
                <div>
                  <h4 className="font-bold text-slate-800 text-sm">{benefit.title}</h4>
                  <p className="text-xs text-slate-500 leading-relaxed">{benefit.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Pricing Section */}
          <div className="bg-slate-900 rounded-2xl p-6 text-white mb-6">
             {/* Toggle */}
             <div className="flex justify-center mb-6">
                <div className="bg-slate-800 p-1 rounded-full flex relative">
                   <button 
                      onClick={() => setBillingCycle('monthly')}
                      className={`px-4 py-1.5 rounded-full text-sm font-semibold transition-all duration-200 ${billingCycle === 'monthly' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-400 hover:text-white'}`}
                   >
                      Monthly
                   </button>
                   <button 
                      onClick={() => setBillingCycle('yearly')}
                      className={`px-4 py-1.5 rounded-full text-sm font-semibold transition-all duration-200 flex items-center gap-2 ${billingCycle === 'yearly' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-400 hover:text-white'}`}
                   >
                      Yearly
                      <span className="bg-lime-500 text-white text-[10px] px-1.5 py-0.5 rounded-full uppercase font-bold">
                        Save 18%
                      </span>
                   </button>
                </div>
             </div>

             <div className="text-center">
                <div className="flex items-baseline justify-center gap-1">
                    <span className="text-4xl font-bold">
                        {billingCycle === 'yearly' ? '$79' : '$8'}
                    </span>
                    <span className="text-slate-400 font-medium">
                         /{billingCycle === 'yearly' ? 'year' : 'month'}
                    </span>
                </div>
                <p className="text-slate-400 text-sm mt-1">
                    {billingCycle === 'yearly' 
                        ? 'Just $6.58/month, billed annually.' 
                        : 'Flexible plan, cancel anytime.'}
                </p>
             </div>

             <button
                onClick={handleSubscribe}
                disabled={isProcessing}
                className="mt-6 w-full py-3.5 px-6 rounded-xl bg-lime-500 hover:bg-lime-400 text-slate-900 font-bold text-lg shadow-lg shadow-lime-900/20 transition-all transform active:scale-[0.98] flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
             >
                {isProcessing ? (
                    <span>Processing...</span>
                ) : (
                    <>
                        <span>Start your 7-day free trial</span>
                        <span className="text-xs bg-slate-900/10 px-2 py-0.5 rounded font-medium">
                           Then {billingCycle === 'yearly' ? '$79/yr' : '$8/mo'}
                        </span>
                    </>
                )}
             </button>
             
             <p className="text-center text-xs text-slate-500 mt-3">
                Instant access to all Pro tools. Cancel anytime before the trial ends. 
                <br className="hidden md:block"/> Card required. You will not be charged if you cancel before day 7.
             </p>
          </div>

          <div className="text-center">
              <button onClick={onClose} className="text-sm font-medium text-slate-400 hover:text-slate-600 transition-colors">
                  Maybe later
              </button>
          </div>

        </div>
      </div>
    </div>
  );
};
