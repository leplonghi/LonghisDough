
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
import { useTranslation } from '../i18n'; // Import useTranslation

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
  const { t } = useTranslation(); // Initialize useTranslation
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
        case 'levain': return t('paywall.header_levain');
        case 'mylab': return t('paywall.header_mylab');
        case 'calculator': return t('paywall.header_calculator');
        case 'styles': return t('paywall.header_styles');
        case 'learn': return t('paywall.header_learn');
        case 'tools': return t('paywall.header_tools');
        case 'mobile-nav': return t('paywall.header_mobile_nav');
        default: return t('paywall.header_general');
    }
  }

  const benefits = [
    {
      icon: <BeakerIcon className="h-5 w-5" />,
      title: t('paywall.benefit_levain_title'),
      desc: t('paywall.benefit_levain_desc')
    },
    {
      icon: <BatchesIcon className="h-5 w-5" />,
      title: t('paywall.benefit_batches_title'),
      desc: t('paywall.benefit_batches_desc')
    },
    {
      icon: <SparklesIcon className="h-5 w-5" />,
      title: t('paywall.benefit_insights_title'),
      desc: t('paywall.benefit_insights_desc')
    },
    {
      icon: <BookOpenIcon className="h-5 w-5" />,
      title: t('paywall.benefit_styles_title'),
      desc: t('paywall.benefit_styles_desc')
    },
    {
      icon: <DownloadIcon className="h-5 w-5" />,
      title: t('paywall.benefit_exports_title'),
      desc: t('paywall.benefit_exports_desc')
    },
    {
      icon: <StarIcon className="h-5 w-5" />,
      title: t('paywall.benefit_priority_title'),
      desc: t('paywall.benefit_priority_desc')
    },
    {
      icon: <ShieldCheckIcon className="h-5 w-5" />,
      title: t('paywall.benefit_ads_title'),
      desc: t('paywall.benefit_ads_desc')
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
          aria-label={t('common.close')}
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
            {t('paywall.subtitle')}
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
                      {t('paywall.monthly_button')}
                   </button>
                   <button 
                      onClick={() => setBillingCycle('yearly')}
                      className={`px-4 py-1.5 rounded-full text-sm font-semibold transition-all duration-200 flex items-center gap-2 ${billingCycle === 'yearly' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-400 hover:text-white'}`}
                   >
                      {t('paywall.yearly_button')}
                      <span className="bg-lime-500 text-white text-[10px] px-1.5 py-0.5 rounded-full uppercase font-bold">
                        {t('paywall.save_badge')}
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
                         /{billingCycle === 'yearly' ? t('common.year') : t('common.month')}
                    </span>
                </div>
                <p className="text-slate-400 text-sm mt-1">
                    {billingCycle === 'yearly' 
                        ? t('paywall.billed_annually')
                        : t('paywall.flexible_plan')}
                </p>
             </div>

             <button
                onClick={handleSubscribe}
                disabled={isProcessing}
                className="mt-6 w-full py-3.5 px-6 rounded-xl bg-lime-500 hover:bg-lime-400 text-slate-900 font-bold text-lg shadow-lg shadow-lime-900/20 transition-all transform active:scale-[0.98] flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
             >
                {isProcessing ? (
                    <span>{t('paywall.processing')}</span>
                ) : (
                    <>
                        <span>{t('paywall.start_trial_button')}</span>
                        <span className="text-xs bg-slate-900/10 px-2 py-0.5 rounded font-medium">
                           {t('paywall.then_price_yearly')} {billingCycle === 'yearly' ? '$79/yr' : t('paywall.then_price_monthly', { price: '$8/mo' })}
                        </span>
                    </>
                )}
             </button>
             
             <p className="text-center text-xs text-slate-500 mt-3">
                {t('paywall.trial_notice')}
             </p>
          </div>

          <div className="text-center">
              <button onClick={onClose} className="text-sm font-medium text-slate-400 hover:text-slate-600 transition-colors">
                  {t('paywall.maybe_later')}
              </button>
          </div>

        </div>
      </div>
    </div>
  );
};