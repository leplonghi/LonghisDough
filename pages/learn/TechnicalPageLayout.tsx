import React, { useMemo } from 'react';
import { BookOpenIcon, ExternalLinkIcon, ShoppingBagIcon, StarIcon } from '@/components/ui/Icons';
import { getAffiliateSuggestionsForTopic } from '@/logic/affiliateSuggestions';
import { useUser } from '@/contexts/UserProvider';

interface TechnicalPageLayoutProps {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  showReferencesSection?: boolean;
  isPro?: boolean;
}

const TechnicalPageLayout: React.FC<TechnicalPageLayoutProps> = ({ title, subtitle, children, showReferencesSection = false, isPro = false }) => {
  const suggestion = useMemo(() => getAffiliateSuggestionsForTopic(title), [title]);
  const { hasProAccess, openPaywall } = useUser();

  const showTeaser = isPro && !hasProAccess;

  return (
    <div className="mx-auto max-w-4xl animate-[fadeIn_0.5s_ease-in-out]">
      <div className="rounded-2xl bg-white p-6 shadow-lg ring-1 ring-slate-200/50 sm:p-10">
        <div className="text-center sm:text-left">
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">{title}</h1>
          {subtitle && (
            <p className="mt-4 text-lg text-slate-700 dark:text-slate-300">
              {subtitle}
            </p>
          )}
        </div>

        {showTeaser ? (
            <div className="relative">
                <div className="prose mt-8 max-w-none text-slate-700 dark:text-slate-300 h-[18.75rem] overflow-hidden relative leading-relaxed">
                    {children}
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/80 to-white pointer-events-none"></div>
                </div>
                <div className="absolute bottom-0 left-0 w-full flex justify-center pb-8 z-10">
                     <div className="text-center bg-white/90 p-6 rounded-xl border border-slate-200 shadow-lg backdrop-blur-sm max-w-md">
                        <h3 className="font-bold text-slate-900 text-lg mb-2">Upgrade to Pro to unlock the full advanced dough theory library.</h3>
                        <p className="text-slate-600 text-sm mb-4">Serious bakers choose Pro for deeper knowledge.</p>
                        <button
                            onClick={() => openPaywall('learn')}
                            className="bg-lime-500 text-white font-bold py-2 px-6 rounded-full hover:bg-lime-600 transition-colors flex items-center justify-center gap-2 mx-auto shadow-md"
                        >
                            <StarIcon className="h-4 w-4" />
                            Unlock Full Article
                        </button>
                     </div>
                </div>
            </div>
        ) : (
            <div className="prose mt-8 max-w-none text-slate-700 dark:text-slate-300 leading-relaxed">
                {children}
            </div>
        )}
        
        {/* Soft Callout for Free Users on Free content */}
        {!isPro && !hasProAccess && (
            <div className="mt-12 p-6 bg-gradient-to-r from-slate-50 to-lime-50 rounded-xl border border-lime-100 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                    <h4 className="font-bold text-slate-800">Want to go deeper?</h4>
                    <p className="text-sm text-slate-600">Pro unlocks expert-level techniques and insights.</p>
                </div>
                <button
                    onClick={() => openPaywall('learn')}
                    className="text-sm font-bold text-lime-600 hover:underline whitespace-nowrap"
                >
                    Learn about Pro &rarr;
                </button>
            </div>
        )}
        
        {/* Contextual Shop Suggestion */}
        {!showTeaser && suggestion && (
             <div className="mt-12 mb-8 flex flex-col sm:flex-row items-center justify-between gap-4 rounded-xl border border-slate-200 bg-slate-50 p-6">
                <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 rounded-full bg-white p-2 shadow-sm text-lime-500">
                         <ShoppingBagIcon className="h-6 w-6" />
                    </div>
                    <div>
                        <h3 className="font-bold text-slate-900">{suggestion.title}</h3>
                        <p className="text-sm text-slate-600">{suggestion.description}</p>
                    </div>
                </div>
                <a
                    href={suggestion.linkUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto flex-shrink-0 inline-flex items-center justify-center gap-2 rounded-lg bg-white border border-slate-300 py-2.5 px-4 text-sm font-semibold text-slate-700 shadow-sm hover:bg-slate-50 transition-colors"
                >
                    Visit Shop <ExternalLinkIcon className="h-4 w-4 text-slate-400" />
                </a>
            </div>
        )}

        {showReferencesSection && !showTeaser && (
          <div className="mt-12 border-t border-slate-200 pt-8">
            <h2 className="flex items-center gap-2 text-xl font-bold text-slate-900">
                <BookOpenIcon className="h-6 w-6 text-lime-500" />
                <span>Technical References</span>
            </h2>
            <p className="mt-4 text-sm text-slate-500 italic">
                The technical references on this page are based on verifiable sources (AVPN, King Arthur Baking, Serious Eats, scientific literature, etc.). No data is fabricated.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TechnicalPageLayout;