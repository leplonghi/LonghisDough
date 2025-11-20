
import React, { useEffect, useState } from 'react';
import { DoughStyle } from '../../types';
import { 
    CalculatorIcon, 
    BookOpenIcon, 
    BeakerIcon, 
    FireIcon, 
    ClockIcon, 
    ShoppingBagIcon, 
    ExternalLinkIcon,
    BatchesIcon,
    ShareIcon,
    HeartIcon,
    StarIcon,
    SolidStarIcon
} from '../../components/IconComponents';
import { SHOP_PRODUCTS } from '../../data/affiliateLinks';
import ProFeatureLock from '../../components/ProFeatureLock';
import { useUser } from '../../contexts/UserProvider';
import { isFreeUser } from '../../lib/subscriptions';
import { AFFILIATE_PLACEMENTS } from '../../data/affiliatePlacements';
import { AffiliateBlock } from '../../components/AffiliateBlock';
import { fetchOfficialStyles } from '../../firebase/stylesRepository';
import { loadStylePresetIntoCalculator } from '../../logic/calculatorIntegration';
import { useToast } from '../../components/ToastProvider';

interface StyleDetailPageProps {
  slug: string;
  onBack: () => void;
  onNavigate: (page: any) => void;
  onLoadAndNavigate: (config: any) => void; // Legacy prop, we'll use the new integration logic internally
}

export const StyleDetailPage: React.FC<StyleDetailPageProps> = ({ slug, onBack, onNavigate, onLoadAndNavigate }) => {
  const { user, openPaywall, favoriteStyleIds, toggleStyleFavorite, createBatchFromStyle } = useUser();
  const { addToast } = useToast();
  const free = isFreeUser(user);
  
  const [style, setStyle] = useState<DoughStyle | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
      const load = async () => {
          setLoading(true);
          // For now, fetching from official list. In future this would fetch from repo by slug.
          const allStyles = await fetchOfficialStyles();
          const found = allStyles.find(s => s.slug === slug || s.id === slug);
          setStyle(found || null);
          setLoading(false);
      };
      load();
  }, [slug]);

  if (loading) return <div className="p-10 text-center">Loading style...</div>;
  if (!style) return <div className="p-10 text-center">Style not found. <button onClick={onBack} className="text-lime-600 underline">Back</button></div>;

  const isFavorite = favoriteStyleIds.includes(style.id);
  const pizzaPlacement = AFFILIATE_PLACEMENTS.find(p => p.context === "styles_pizza");
  const breadPlacement = AFFILIATE_PLACEMENTS.find(p => p.context === "styles_bread");

  const handleLoadClick = () => {
      if (style.accessTier === 'pro' && free) {
          openPaywall('styles');
      } else if (style.defaultPreset) {
          // Use the new integration logic to build the config
          // We need to access the current config state or just pass the partial to App's handler
          // App's handler expects Partial<DoughConfig>.
          // We will construct a partial config here.
          // Since we don't have access to currentConfig here easily without prop drilling, 
          // we assume the parent handler will merge it.
          // Ideally we'd use the logic from calculatorIntegration but for now let's pass the data directly 
          // which matches the App.tsx expectations.
          
          // Re-mapping manually here to match App.tsx expected signature for now
          const configPayload = {
              bakeType: style.category === 'Pizza' ? 'PIZZAS' : style.category === 'Pão' ? 'BREADS_SAVORY' : 'SWEETS_PASTRY',
              recipeStyle: style.defaultPreset.recipeStyle,
              hydration: style.defaultPreset.hydration,
              salt: style.defaultPreset.salt,
              oil: style.defaultPreset.oil,
              sugar: style.defaultPreset.sugar,
              fermentationTechnique: style.defaultPreset.fermentationTechnique,
              bakingTempC: style.defaultPreset.bakingTempC,
              baseStyleName: style.name // Set context
          };
          // @ts-ignore
          onLoadAndNavigate(configPayload);
      }
  };

  const handleStartBatch = async () => {
      if (free) {
          openPaywall('mylab'); // Batch creation from style is Pro feature for now (or limited)
          return;
      }
      try {
        const batchId = await createBatchFromStyle(style);
        onNavigate('batch', batchId);
      } catch (e) {
          addToast("Failed to create batch.", "error");
      }
  };

  return (
    <div className="mx-auto max-w-4xl animate-[fadeIn_0.3s_ease-in_out]">
        {/* Back Button */}
        <button onClick={onBack} className="mb-6 text-sm font-semibold text-slate-500 hover:text-slate-800 flex items-center gap-1">
            &larr; Back to Library
        </button>

        <div className="bg-white rounded-2xl shadow-lg ring-1 ring-slate-200/50 overflow-hidden">
            {/* Header */}
            <div className="bg-slate-900 p-8 text-white">
                <div className="flex justify-between items-start">
                    <div>
                        <div className="flex items-center gap-3 mb-2">
                            <h1 className="text-3xl font-bold">{style.name}</h1>
                             <button onClick={() => toggleStyleFavorite(style.id)} className="text-slate-400 hover:text-yellow-400 transition-colors">
                                {isFavorite ? <SolidStarIcon className="h-6 w-6 text-yellow-400"/> : <StarIcon className="h-6 w-6"/>}
                            </button>
                        </div>
                        <p className="text-slate-300 mt-2 text-lg max-w-2xl">{style.description}</p>
                        <div className="flex gap-3 mt-4 text-sm font-medium text-slate-400">
                            <span className="bg-slate-800 px-2 py-1 rounded border border-slate-700">{style.category}</span>
                            <span className="bg-slate-800 px-2 py-1 rounded border border-slate-700">{style.country}</span>
                            {style.year && <span className="bg-slate-800 px-2 py-1 rounded border border-slate-700">{style.year}</span>}
                            <span className="bg-slate-800 px-2 py-1 rounded border border-slate-700">{style.complexity}</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="p-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
                
                {/* Left Column: Technical Data */}
                <div className="lg:col-span-2 space-y-10">
                    {/* History Section */}
                    <section>
                        <h2 className="flex items-center gap-2 text-xl font-bold text-slate-900 mb-3">
                            <BookOpenIcon className="h-5 w-5 text-lime-500" />
                            Story & Identity
                        </h2>
                        <p className="text-slate-600 leading-relaxed">
                            {style.history}
                        </p>
                    </section>

                    {/* Technical Matrix */}
                    <section className="relative">
                        <h2 className="flex items-center gap-2 text-xl font-bold text-slate-900 mb-4">
                            <BeakerIcon className="h-5 w-5 text-lime-500" />
                            Technical Matrix
                        </h2>
                        
                         {style.accessTier === 'pro' && free && (
                            <ProFeatureLock origin="styles" className="absolute inset-0 z-10 mt-10" title="Unlock Technical Matrix" description="Exact hydration ranges and fermentation details are available in Pro." />
                        )}

                        <div className={`bg-slate-50 rounded-xl border border-slate-200 overflow-hidden ${style.accessTier === 'pro' && free ? 'blur-[3px]' : ''}`}>
                            <table className="w-full text-sm text-left">
                                <tbody className="divide-y divide-slate-200">
                                    <tr>
                                        <th className="px-4 py-3 font-semibold text-slate-700 bg-slate-100 w-1/3">Hydration</th>
                                        <td className="px-4 py-3 text-slate-600 font-mono">{style.technical.hydration[0]}% – {style.technical.hydration[1]}%</td>
                                    </tr>
                                    <tr>
                                        <th className="px-4 py-3 font-semibold text-slate-700 bg-slate-100">Salt</th>
                                        <td className="px-4 py-3 text-slate-600 font-mono">{style.technical.salt[0]}% – {style.technical.salt[1]}%</td>
                                    </tr>
                                     <tr>
                                        <th className="px-4 py-3 font-semibold text-slate-700 bg-slate-100">Oil/Fat</th>
                                        <td className="px-4 py-3 text-slate-600 font-mono">{style.technical.fat[0]}% – {style.technical.fat[1]}%</td>
                                    </tr>
                                    <tr>
                                        <th className="px-4 py-3 font-semibold text-slate-700 bg-slate-100">Sugar</th>
                                        <td className="px-4 py-3 text-slate-600 font-mono">{style.technical.sugar[0]}% – {style.technical.sugar[1]}%</td>
                                    </tr>
                                    <tr>
                                        <th className="px-4 py-3 font-semibold text-slate-700 bg-slate-100">Fermentation</th>
                                        <td className="px-4 py-3 text-slate-600">
                                            {style.technical.fermentation.description}
                                            <br/>
                                            <span className="text-xs text-slate-500">{style.technical.fermentation.ranges[0]}</span>
                                        </td>
                                    </tr>
                                     <tr>
                                        <th className="px-4 py-3 font-semibold text-slate-700 bg-slate-100">Oven Temp</th>
                                        <td className="px-4 py-3 text-slate-600">{style.technical.bakingTempC}°C</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </section>
                    
                    {/* Variations */}
                     {style.variations && style.variations.length > 0 && (
                        <section>
                             <h2 className="flex items-center gap-2 text-xl font-bold text-slate-900 mb-4">Variations</h2>
                             <div className="grid gap-4">
                                 {style.variations.map((variation, idx) => (
                                     <div key={idx} className="p-4 border border-slate-200 rounded-lg bg-white">
                                         <h4 className="font-bold text-slate-800">{variation.name}</h4>
                                         <p className="text-sm text-slate-600 mt-1">{variation.description}</p>
                                         {variation.hydration && <span className="inline-block mt-2 text-xs bg-slate-100 px-2 py-1 rounded text-slate-500">Hydration: {variation.hydration}%</span>}
                                     </div>
                                 ))}
                             </div>
                        </section>
                     )}

                    {/* Notes & Risks */}
                    {(style.notes || style.risks) && (
                        <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {style.risks && (
                                <div className="bg-amber-50 p-5 rounded-xl border border-amber-100">
                                    <h3 className="font-bold text-amber-800 mb-3 text-sm uppercase tracking-wide flex items-center gap-2">
                                        Common Pitfalls
                                    </h3>
                                    <ul className="list-disc list-inside text-sm text-amber-900 space-y-2">
                                        {style.risks.map((r, i) => <li key={i}>{r}</li>)}
                                    </ul>
                                </div>
                            )}
                             {style.notes && (
                                <div className="bg-blue-50 p-5 rounded-xl border border-blue-100">
                                    <h3 className="font-bold text-blue-800 mb-3 text-sm uppercase tracking-wide flex items-center gap-2">
                                        Chef's Notes
                                    </h3>
                                    <ul className="list-disc list-inside text-sm text-blue-900 space-y-2">
                                        {style.notes.map((n, i) => <li key={i}>{n}</li>)}
                                    </ul>
                                </div>
                            )}
                        </section>
                    )}
                </div>

                {/* Right Column: Actions */}
                <div className="space-y-6">
                     <div className="p-6 bg-slate-50 rounded-xl border border-slate-200 shadow-sm space-y-4">
                         <h3 className="font-bold text-slate-800 mb-2">Actions</h3>
                         <button 
                            onClick={handleLoadClick}
                            className={`w-full flex items-center justify-center gap-2 rounded-xl py-3 px-6 text-base font-bold text-white shadow-md transition-all active:translate-y-0 ${style.accessTier === 'pro' && free ? 'bg-slate-800 hover:bg-slate-700' : 'bg-lime-500 hover:bg-lime-600 hover:-translate-y-1 shadow-lime-200'}`}
                        >
                            <CalculatorIcon className="h-5 w-5" />
                            {style.accessTier === 'pro' && free ? "Load (Pro)" : "Load in Calculator"}
                        </button>
                        
                        <button 
                            onClick={handleStartBatch}
                            className="w-full flex items-center justify-center gap-2 rounded-xl py-3 px-6 text-base font-bold text-slate-700 bg-white border border-slate-300 shadow-sm hover:bg-slate-50"
                        >
                            <BatchesIcon className="h-5 w-5 text-slate-500" />
                            Start Batch in MyLab
                        </button>
                        
                        <div className="grid grid-cols-2 gap-2 pt-2">
                             <button className="flex items-center justify-center gap-1 py-2 text-sm font-medium text-slate-500 bg-slate-100 rounded hover:bg-slate-200">
                                 <ShareIcon className="h-4 w-4" /> Share
                             </button>
                              <button className="flex items-center justify-center gap-1 py-2 text-sm font-medium text-slate-500 bg-slate-100 rounded hover:bg-slate-200">
                                 Clone
                             </button>
                        </div>
                     </div>

                     {/* Affiliate / Recommended */}
                     {free && style.category === 'Pizza' && pizzaPlacement && (
                        <AffiliateBlock placement={pizzaPlacement} />
                     )}
                     {free && style.category === 'Pão' && breadPlacement && (
                        <AffiliateBlock placement={breadPlacement} />
                     )}
                </div>
            </div>
        </div>
    </div>
  );
};
