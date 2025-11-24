
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
      <button 
        onClick={() => window.history.back()} 
        className="mb-6 inline-flex items-center gap-1 text-sm font-medium text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200 transition-colors"
      >
        &larr; Back
      </button>
      <div className="rounded-2xl bg-white p-6 shadow-lg ring-1 ring-slate-200/50 sm:p-10 dark:bg-slate-800 dark:ring-slate-700">
        <div className="text-center sm:text-left">
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-4xl">{title}</h1>
          {subtitle && (
            <p className="mt-4 text-lg text-slate-700 dark:text-slate-300">
              {subtitle}
            </p>
          )}
        </div>

        {showTeaser ? (
            <div className="relative">
                <div className="prose mt-8 max-w-none text-slate-700 dark:text-slate-300 h-[300px] overflow-hidden relative leading-relaxed">
                    {children}
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/80 to-white pointer-events-none dark:via-slate-800/80 dark:to-slate-800"></div>
                </div>
                <div className="absolute bottom-0 left-0 w-full flex justify-center pb-8 z-10">
                     <div className="text-center bg-white/90 p-6 rounded-xl border border-slate-200 shadow-lg backdrop-blur-sm max-w-md dark:bg-slate-900/90 dark:border-slate-700">
                        <h3 className="font-bold text-slate-900 text-lg mb-2 dark:text-white">Upgrade to Pro to unlock the full advanced dough theory library.</h3>
                        <p className="text-slate-700 text-sm mb-4 dark:text-slate-300">Serious bakers choose Pro for deeper knowledge.</p>
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
            <div className="mt-12 p-6 bg-gradient-to-r from-slate-50 to-lime-50 rounded-xl border border-lime-100 flex flex-col sm:flex-row items-center justify-between gap-4 dark:from-slate-800 dark:to-slate-700 dark:border-slate-600">
                <div>
                    <h4 className="font-bold text-slate-800 dark:text-white">Want to go deeper?</h4>
                    <p className="text-sm text-slate-700 dark:text-slate-300">Pro unlocks expert-level techniques and insights.</p>
                </div>
                <button
                    onClick={() => openPaywall('learn')}
                    className="text-sm font-bold text-lime-600 hover:underline whitespace-nowrap dark:text-lime-400"
                >
                    Learn about Pro &rarr;
                </button>
            </div>
        )}
        
        {/* Contextual Shop Suggestion */}
        {!showTeaser && suggestion && (
             <div className="mt-12 mb-8 flex flex-col sm:flex-row items-center justify-between gap-4 rounded-xl border border-slate-200 bg-slate-50 p-6 dark:bg-slate-900 dark:border-slate-700">
                <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 rounded-full bg-white p-2 shadow-sm text-lime-600 dark:bg-slate-800">
                         <ShoppingBagIcon className="h-6 w-6" />
                    </div>
                    <div>
                        <h3 className="font-bold text-slate-900 dark:text-white">{suggestion.title}</h3>
                        <p className="text-sm text-slate-700 dark:text-slate-300">{suggestion.description}</p>
                    </div>
                </div>
                <a
                    href={suggestion.linkUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto flex-shrink-0 inline-flex items-center justify-center gap-2 rounded-lg bg-white border border-slate-300 py-2.5 px-4 text-sm font-semibold text-slate-700 shadow-sm hover:bg-slate-50 transition-colors dark:bg-slate-800 dark:border-slate-600 dark:text-slate-200 dark:hover:bg-slate-700"
                >
                    Visit Shop <ExternalLinkIcon className="h-4 w-4 text-slate-500" />
                </a>
            </div>
        )}

        {showReferencesSection && !showTeaser && (
          <div className="mt-12 border-t border-slate-200 pt-8 dark:border-slate-700">
            <h2 className="flex items-center gap-2 text-xl font-bold text-slate-900 dark:text-white">
                <BookOpenIcon className="h-6 w-6 text-lime-600" />
                <span>Technical References</span>
            </h2>
            <p className="mt-4 text-sm text-slate-600 italic dark:text-slate-400">
                The technical references on this page are based on verifiable sources (AVPN, King Arthur Baking, Serious Eats, scientific literature, etc.). No data is fabricated.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TechnicalPageLayout;
