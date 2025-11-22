import React from 'react';
import { DoughStyleDefinition } from '@/types';
import { 
    CalculatorIcon, 
    BookOpenIcon, 
    BeakerIcon, 
    FireIcon, 
    InfoIcon, 
    ClockIcon, 
    ShoppingBagIcon, 
    ExternalLinkIcon, 
} from '@/components/ui/Icons';
import { AFFILIATE_LINKS } from '@/data/affiliateLinks';
import ProFeatureLock from '@/components/ui/ProFeatureLock';
import { useUser } from '@/contexts/UserProvider';

interface StyleDetailPageProps {
  style: DoughStyleDefinition;
  onLoadAndNavigate: (style: DoughStyleDefinition) => void;
  onBack: () => void;
}

export const StyleDetailPage: React.FC<StyleDetailPageProps> = ({ style, onLoadAndNavigate, onBack }) => {
  const { hasProAccess, openPaywall } = useUser();
  
  const renderRecommendation = () => {
      let text = "";
      let linkId = "";

      if (style.category === 'pizza') {
          if (style.name.includes('Neapolitan')) {
              text = "For authentic Neapolitan-style baking, high-heat pizza ovens (450°C+) make a huge difference.";
              linkId = "ooni_oven";
          } else {
              text = "For crispy bottoms in a home oven, a heavy-duty baking steel performs better than stone.";
              linkId = "baking_steel";
          }
      } else if (style.category === 'bread') {
          text = "Bread doughs, especially high hydration ones, are much easier to handle with a good bench scraper and proofing box.";
          linkId = "proofing_box";
      } else {
          text = "Precision is key for pastry. A digital scale with 0.1g accuracy is essential.";
          linkId = "scale_precision";
      }

      const product = AFFILIATE_LINKS.find(p => p.id === linkId);
      const url = product ? product.url : '/shop';

      return (
          <div className="mt-8 pt-8 border-t border-slate-200">
                <h3 className="flex items-center gap-2 font-bold text-slate-900 mb-3">
                <ShoppingBagIcon className="h-5 w-5 text-lime-500" />
                Recommended Tools
            </h3>
            <div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
                <p className="text-sm text-slate-700 mb-3">{text}</p>
                <a 
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-sm font-semibold text-lime-600 hover:underline"
                >
                    See recommended gear in Shop <ExternalLinkIcon className="h-3 w-3" />
                </a>
            </div>
        </div>
      );
  };

  return (
    <div className="mx-auto max-w-4xl animate-[fadeIn_0.3s_ease-in_out]">
        {/* Back Button */}
        <button onClick={onBack} className="mb-6 text-sm font-semibold text-slate-500 hover:text-slate-800 flex items-center gap-1">
            &larr; Back to Library
        </button>

        <div className="bg-white rounded-2xl shadow-lg ring-1 ring-slate-200/50 overflow-hidden">
            {/* Header */}
            <div className="bg-slate-900 p-8 text-white relative">
                <div className="flex justify-between items-start">
                    <div>
                        <h1 className="text-3xl font-bold">{style.name}</h1>
                        <p className="text-slate-300 mt-2 text-lg">{style.description}</p>
                        <div className="flex gap-3 mt-4 text-sm font-medium text-slate-400">
                            <span className="bg-slate-800 px-2 py-1 rounded border border-slate-700">{style.category}</span>
                            <span className="bg-slate-800 px-2 py-1 rounded border border-slate-700">{style.country}</span>
                            {style.year && <span className="bg-slate-800 px-2 py-1 rounded border border-slate-700">{style.year}</span>}
                        </div>
                    </div>
                    {style.isPro && (
                        <span className="bg-lime-500 text-slate-900 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide shadow-sm">
                            PRO
                        </span>
                    )}
                </div>
            </div>

            <div className="p-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
                
                {/* Left Column: Technical Data */}
                <div className="lg:col-span-2 space-y-8">
                    {/* History Section - Always Visible */}
                    <section>
                        <h2 className="flex items-center gap-2 text-xl font-bold text-slate-900 mb-3">
                            <BookOpenIcon className="h-5 w-5 text-lime-500" />
                            History & Context
                        </h2>
                        <p className="text-slate-600 leading-relaxed">
                            {style.history}
                        </p>
                    </section>

                    {/* Formula Section - Partially Locked for Pro */}
                    <section>
                        <h2 className="flex items-center gap-2 text-xl font-bold text-slate-900 mb-4">
                            <BeakerIcon className="h-5 w-5 text-lime-500" />
                            Base Formula
                        </h2>
                        <ProFeatureLock 
                             origin="styles" 
                             featureName="Pro Style Formula" 
                             description="Full style specs and baker's percentages are available in Pro."
                             className={style.isPro && !hasProAccess ? "min-h-[200px] flex items-center justify-center" : ""}
                        >
                            <div className={`bg-slate-50 rounded-xl border border-slate-200 overflow-hidden ${style.isPro && !hasProAccess ? 'filter blur-sm pointer-events-none opacity-60' : ''}`}>
                                <table className="w-full text-sm text-left">
                                    <thead className="bg-slate-100 text-slate-500 uppercase text-xs">
                                        <tr>
                                            <th className="px-4 py-3">Ingredient</th>
                                            <th className="px-4 py-3 text-right">% (Baker's)</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-200">
                                        {style.ingredients.map(ing => (
                                            <tr key={ing.id}>
                                                <td className="px-4 py-3 font-medium text-slate-700">{ing.name}</td>
                                                <td className="px-4 py-3 text-right font-mono text-slate-600">{ing.bakerPercentage}%</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </ProFeatureLock>
                    </section>
                    
                    {/* Notes & Risks */}
                    {(style.notes || style.risks) && (
                        <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {style.risks && (
                                <div className="bg-amber-50 p-4 rounded-xl border border-amber-100">
                                    <h3 className="font-bold text-amber-800 mb-2 text-sm uppercase tracking-wide">Watch Out</h3>
                                    <ul className="list-disc list-inside text-sm text-amber-900 space-y-1">
                                        {style.risks.map((r, i) => <li key={i}>{r}</li>)}
                                    </ul>
                                </div>
                            )}
                             {style.notes && (
                                <div className="bg-blue-50 p-4 rounded-xl border border-blue-100">
                                    <h3 className="font-bold text-blue-800 mb-2 text-sm uppercase tracking-wide">Chef's Notes</h3>
                                    <ul className="list-disc list-inside text-sm text-blue-900 space-y-1">
                                        {style.notes.map((n, i) => <li key={i}>{n}</li>)}
                                    </ul>
                                </div>
                            )}
                        </section>
                    )}
                </div>

                {/* Right Column: Parameters & Action */}
                <div className="space-y-6">
                     <ProFeatureLock 
                        origin="styles"
                        featureName="Technical Parameters"
                        className={style.isPro && !hasProAccess ? "min-h-[180px] flex items-center justify-center" : ""}
                     >
                         <div className={`bg-slate-50 p-6 rounded-xl border border-slate-200 ${style.isPro && !hasProAccess ? 'filter blur-sm pointer-events-none opacity-60' : ''}`}>
                            <h3 className="font-bold text-slate-900 mb-4">Technical Parameters</h3>
                            <div className="space-y-4">
                                <div>
                                    <p className="text-xs text-slate-500 uppercase font-semibold">Hydration</p>
                                    <p className="text-xl font-bold text-slate-800">{style.technical.hydration}%</p>
                                </div>
                                <div>
                                    <p className="text-xs text-slate-500 uppercase font-semibold flex items-center gap-1">
                                        <ClockIcon className="h-3 w-3" /> Fermentation
                                    </p>
                                    <p className="text-base font-medium text-slate-800">{style.technical.fermentation}</p>
                                </div>
                                 <div>
                                    <p className="text-xs text-slate-500 uppercase font-semibold flex items-center gap-1">
                                        <FireIcon className="h-3 w-3" /> Oven Temp
                                    </p>
                                    <p className="text-base font-medium text-slate-800">{style.technical.bakingTempC}°C</p>
                                </div>
                            </div>
                         </div>
                     </ProFeatureLock>

                    {style.isPro ? (
                        <ProFeatureLock origin='styles' featureName={`Pro Style: ${style.name}`}>
                             <button 
                                className="w-full flex items-center justify-center gap-2 rounded-xl bg-slate-300 py-4 px-6 text-lg font-bold text-white cursor-not-allowed"
                                disabled
                            >
                                <CalculatorIcon className="h-6 w-6" />
                                Load into Calculator
                            </button>
                        </ProFeatureLock>
                    ) : (
                         <button 
                            onClick={() => onLoadAndNavigate(style)}
                            className="w-full flex items-center justify-center gap-2 rounded-xl bg-lime-500 py-4 px-6 text-lg font-bold text-white shadow-lg shadow-lime-200 transition-all hover:bg-lime-600 hover:-translate-y-1 active:translate-y-0"
                        >
                            <CalculatorIcon className="h-6 w-6" />
                            Load into Calculator
                        </button>
                    )}
                     
                     <p className="text-xs text-center text-slate-400">
                        This will configure the calculator with the base formula for this style.
                     </p>

                     {renderRecommendation()}
                     
                     {/* Soft Callout for Free Styles */}
                     {!style.isPro && !hasProAccess && (
                        <div className="mt-8 p-4 bg-gradient-to-r from-slate-50 to-lime-50 rounded-lg border border-lime-100 text-center">
                             <p className="text-sm font-bold text-slate-800 mb-2">Want to go deeper?</p>
                             <p className="text-xs text-slate-600 mb-3">Pro unlocks expert-level techniques and insights for all styles.</p>
                             <button
                                onClick={() => openPaywall('styles')}
                                className="text-xs font-bold text-lime-600 hover:underline"
                            >
                                Learn about Pro &rarr;
                            </button>
                        </div>
                     )}
                </div>
            </div>
        </div>
    </div>
  );
};