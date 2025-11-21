
import React, { useState } from 'react';
import { CheckIcon, CloseIcon } from './IconComponents';

interface PlansPageProps {
    onGrantAccess: () => void;
    onNavigateHome: () => void;
}

const PlansPage: React.FC<PlansPageProps> = ({ onGrantAccess }) => {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('yearly');

  const plans = [
    {
      name: 'Free',
      price: '$0',
      period: '/mo',
      billed: 'Forever free',
      description: 'Perfect to get started. 1 Levain Pet, 1 saved bake, basic calculator, limited styles, no export, no advanced insights.',
      subtext: 'Great for testing the waters.',
      features: [
        { name: 'Dough Calculator (Basic)', included: true },
        { name: 'Basic Styles Library', included: true },
        { name: '1 Saved Batch', included: true },
        { name: '1 Levain Pet', included: true },
        { name: 'Export PDF/JSON', included: false },
        { name: 'Advanced AI Tools', included: false },
        { name: 'Deep Insights', included: false },
      ],
      cta: 'Current Plan',
      action: null,
      highlight: false,
      badge: null,
    },
    {
      name: billingCycle === 'yearly' ? 'Pro Annual' : 'DoughLabPro Pro',
      price: billingCycle === 'yearly' ? '$67.10' : '$6.99',
      period: billingCycle === 'yearly' ? '/yr' : '/mo',
      billed: billingCycle === 'yearly' ? 'Save around 20% vs paying monthly' : 'Billed monthly',
      description: billingCycle === 'yearly' 
        ? 'Lock in your dough lab for a full year.' 
        : 'For serious home bakers who want consistency.',
      subtext: billingCycle === 'yearly' 
        ? 'Invest once, bake better all year.' 
        : 'Costs less than 25¢ a day — cheaper than a coffee and way more useful.',
      features: [
        { name: 'Unlimited Levain Pets & Saved Bakes', included: true },
        { name: 'Full Calculator Control & All Styles', included: true },
        { name: 'PDF/JSON Exports & Advanced Insights', included: true },
        { name: 'Ad-free experience & Enhanced AI', included: true },
        { name: 'Priority Support', included: true },
        { name: 'One failed dough costs more than a month of Pro', included: true },
      ],
      cta: 'Upgrade to Pro',
      highlight: true,
      action: onGrantAccess,
      badge: 'Most popular among serious home bakers',
    }
  ];

  return (
    <div className="mx-auto max-w-5xl px-4 py-12 animate-[fadeIn_0.5s_ease-in-out]">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl mb-4">
          Choose your baking level
        </h1>
        <p className="text-xl text-slate-600 max-w-2xl mx-auto">
          Unlock the full potential of your dough with advanced tools and unlimited history.
        </p>
        
        {/* Billing Toggle */}
        <div className="mt-8 flex justify-center items-center gap-3">
            <span className={`text-sm font-medium ${billingCycle === 'monthly' ? 'text-slate-900' : 'text-slate-500'}`}>Monthly</span>
            <button 
                onClick={() => setBillingCycle(prev => prev === 'monthly' ? 'yearly' : 'monthly')}
                className="relative inline-flex h-6 w-11 items-center rounded-full bg-lime-500 transition-colors focus:outline-none focus:ring-2 focus:ring-lime-500 focus:ring-offset-2"
            >
                <span className={`${billingCycle === 'yearly' ? 'translate-x-6' : 'translate-x-1'} inline-block h-4 w-4 transform rounded-full bg-white transition`}/>
            </button>
            <span className={`text-sm font-medium ${billingCycle === 'yearly' ? 'text-slate-900' : 'text-slate-500'}`}>
                Yearly <span className="text-lime-600 font-bold ml-1">(Save 20%)</span>
            </span>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        {plans.map((plan) => (
          <div key={plan.name} className={`relative rounded-2xl p-8 shadow-xl flex flex-col ${plan.highlight ? 'bg-slate-900 text-white ring-4 ring-lime-500/30' : 'bg-white text-slate-900 border border-slate-200'}`}>
            {plan.badge && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-lime-500 text-slate-900 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide whitespace-nowrap shadow-sm">
                    {plan.badge}
                </div>
            )}
            <div className="mb-6">
                <h3 className="text-xl font-bold opacity-90">{plan.name}</h3>
                <div className="mt-4 flex items-baseline">
                    <span className="text-4xl font-extrabold tracking-tight">{plan.price}</span>
                    <span className="ml-1 text-xl font-semibold opacity-70">{plan.period}</span>
                </div>
                <p className={`text-sm mt-1 font-medium ${plan.highlight ? 'text-lime-400' : 'text-slate-500'}`}>{plan.billed}</p>
                
                <p className="mt-4 text-base font-medium opacity-90">{plan.description}</p>
                {plan.subtext && (
                    <p className={`mt-2 text-sm ${plan.highlight ? 'text-slate-400' : 'text-slate-500'} italic`}>
                        "{plan.subtext}"
                    </p>
                )}
            </div>
            
            <ul className="space-y-4 mb-8 flex-grow">
                {plan.features.map((feature) => (
                    <li key={feature.name} className="flex items-start gap-3">
                        {feature.included ? (
                            <CheckIcon className={`h-5 w-5 flex-shrink-0 mt-0.5 ${plan.highlight ? 'text-lime-400' : 'text-lime-600'}`} />
                        ) : (
                            <CloseIcon className="h-5 w-5 flex-shrink-0 mt-0.5 text-slate-400 opacity-50" />
                        )}
                        <span className={`text-sm ${!feature.included && 'opacity-50 decoration-slate-400 line-through'}`}>{feature.name}</span>
                    </li>
                ))}
            </ul>

            <button
                onClick={plan.action ? plan.action : undefined}
                disabled={!plan.action}
                className={`w-full rounded-lg py-3 px-6 text-center text-sm font-bold transition-all ${
                    plan.highlight 
                    ? 'bg-lime-500 text-slate-900 hover:bg-lime-400 shadow-lg hover:shadow-lime-500/25' 
                    : 'bg-slate-100 text-slate-400 cursor-default'
                }`}
            >
                {plan.cta}
            </button>
          </div>
        ))}
      </div>
      
      <div className="mt-12 text-center">
          <p className="text-sm text-slate-500">
              Secure payment via Stripe. Cancel anytime.
          </p>
      </div>
    </div>
  );
};

export default PlansPage;
