
import React, { useState } from 'react';
import TechnicalPageLayout from './learn/TechnicalPageLayout';
import { FireIcon, LightBulbIcon, SparklesIcon, BeakerIcon, ClockIcon, InfoIcon, CheckCircleIcon } from '@/components/ui/Icons';
import { analyzeOvenProfile, OvenProfileInput, OvenAnalysisResult, validateOvenInput } from '@/logic/ovenProfile';

// Component for a single tip/list item
const AdviceItem: React.FC<{ text: string }> = ({ text }) => (
  <li className="flex items-start gap-3 text-sm text-slate-600">
    <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-lime-500"></span>
    <span className="leading-relaxed">{text}</span>
  </li>
);

// Component for an explanatory tooltip
const Tooltip: React.FC<{ label: string; content: string }> = ({ label, content }) => (
    <div className="group relative inline-block ml-2 align-middle">
        <button className="text-slate-400 hover:text-lime-600 transition-colors block">
            <InfoIcon className="h-4 w-4" />
        </button>
        <div className="pointer-events-none absolute bottom-full left-1/2 z-10 mb-2 w-64 -translate-x-1/2 rounded-lg bg-slate-800 p-3 text-xs text-white opacity-0 shadow-xl transition-opacity duration-300 group-hover:opacity-100">
            <strong>{label}</strong><br/>
            {content}
            <svg className="absolute left-0 top-full h-2 w-full text-slate-800" x="0px" y="0px" viewBox="0 0 255 255"><polygon className="fill-current" points="0,0 127.5,127.5 255,0" /></svg>
        </div>
    </div>
);

export const OvenAnalysisPage: React.FC = () => {
  const [profile, setProfile] = useState<OvenProfileInput>({
    ovenType: 'home_electric',
    maxTemperature: 250,
    preheatMinutes: 30,
    surface: 'stone',
    rackPosition: 'middle',
    convectionMode: false,
  });

  const [errors, setErrors] = useState<Partial<Record<keyof OvenProfileInput, string>>>({});
  const [analysis, setAnalysis] = useState<OvenAnalysisResult | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setProfile(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : 
               type === 'number' ? Number(value) : value
    }));
    // Clear error when user types
    if (errors[name as keyof OvenProfileInput]) {
        setErrors(prev => ({...prev, [name]: undefined}));
    }
  };

  const handleAnalyze = () => {
    const validation = validateOvenInput(profile);
    
    if (!validation.isValid) {
        setErrors(validation.errors);
        setAnalysis(null);
        return;
    }

    const result = analyzeOvenProfile(profile);
    setAnalysis(result);
    
    // Scroll to results
    setTimeout(() => {
        const resultsElement = document.getElementById('analysis-results');
        if (resultsElement) {
            resultsElement.scrollIntoView({ behavior: 'smooth' });
        }
    }, 100);
  };

  return (
    <TechnicalPageLayout
      title="Oven Profiler"
      subtitle="Analyze your equipment to get tailored baking strategies, hydration limits, and rack positioning advice."
      showReferencesSection
    >
      <div className="space-y-8">
        {/* Input Section */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <div className="flex items-center gap-3 mb-6 border-b border-slate-100 pb-4">
            <div className="p-2 bg-lime-100 rounded-lg text-lime-600">
              <FireIcon className="h-6 w-6" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900">1. Oven Configuration</h3>
              <p className="text-sm text-slate-500">Define your equipment parameters.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Oven Type */}
            <div>
              <label htmlFor="ovenType" className="block text-sm font-medium text-slate-700 mb-1">
                Oven Type
              </label>
              <select
                id="ovenType"
                name="ovenType"
                value={profile.ovenType}
                onChange={handleChange}
                className="block w-full rounded-lg border-slate-300 bg-slate-50 p-2.5 text-slate-900 focus:border-lime-500 focus:ring-lime-500 sm:text-sm transition-shadow"
              >
                <option value="home_gas">Home gas oven</option>
                <option value="home_electric">Home electric oven</option>
                <option value="convection">Convection oven</option>
                <option value="deck">Deck/stone oven</option>
                <option value="wood">Wood-fired oven</option>
              </select>
            </div>

            {/* Max Temperature */}
            <div>
              <label htmlFor="maxTemperature" className="block text-sm font-medium text-slate-700 mb-1">
                Max Temperature (°C)
              </label>
              <div className="relative">
                <input
                  type="number"
                  id="maxTemperature"
                  name="maxTemperature"
                  value={profile.maxTemperature}
                  onChange={handleChange}
                  className={`block w-full rounded-lg border p-2.5 text-slate-900 focus:ring-lime-500 sm:text-sm transition-shadow ${errors.maxTemperature ? 'border-red-500 focus:border-red-500 bg-red-50' : 'border-slate-300 bg-slate-50 focus:border-lime-500'}`}
                  placeholder="e.g. 250"
                />
                <span className="absolute right-3 top-2.5 text-slate-400 text-xs font-bold">°C</span>
              </div>
              {errors.maxTemperature && <p className="mt-1 text-xs text-red-500">{errors.maxTemperature}</p>}
            </div>

            {/* Baking Surface */}
            <div>
              <label htmlFor="surface" className="block text-sm font-medium text-slate-700 mb-1">
                Baking Surface
              </label>
              <select
                id="surface"
                name="surface"
                value={profile.surface}
                onChange={handleChange}
                className="block w-full rounded-lg border-slate-300 bg-slate-50 p-2.5 text-slate-900 focus:border-lime-500 focus:ring-lime-500 sm:text-sm transition-shadow"
              >
                <option value="none">No stone/steel</option>
                <option value="stone">Baking stone (Cordierite)</option>
                <option value="steel">Baking steel</option>
              </select>
            </div>

            {/* Rack Position */}
            <div>
              <label htmlFor="rackPosition" className="block text-sm font-medium text-slate-700 mb-1">
                Rack Position
              </label>
              <select
                id="rackPosition"
                name="rackPosition"
                value={profile.rackPosition}
                onChange={handleChange}
                className="block w-full rounded-lg border-slate-300 bg-slate-50 p-2.5 text-slate-900 focus:border-lime-500 focus:ring-lime-500 sm:text-sm transition-shadow"
              >
                <option value="top">Top (High heat)</option>
                <option value="middle">Middle (Balanced)</option>
                <option value="bottom">Bottom (Direct heat)</option>
              </select>
            </div>

            {/* Preheat Time */}
            <div>
              <label htmlFor="preheatMinutes" className="block text-sm font-medium text-slate-700 mb-1 flex items-center">
                Preheat Time (Minutes)
                <Tooltip 
                    label="Why preheat?" 
                    content="Stones and steels require significant time to absorb heat (thermal mass). Without saturation, the base of your pizza will remain undercooked."
                />
              </label>
              <div className="relative">
                <input
                  type="number"
                  id="preheatMinutes"
                  name="preheatMinutes"
                  value={profile.preheatMinutes}
                  onChange={handleChange}
                  className={`block w-full rounded-lg border p-2.5 text-slate-900 focus:ring-lime-500 sm:text-sm transition-shadow ${errors.preheatMinutes ? 'border-red-500 focus:border-red-500 bg-red-50' : 'border-slate-300 bg-slate-50 focus:border-lime-500'}`}
                  placeholder="e.g. 45"
                />
                <ClockIcon className="absolute right-3 top-2.5 h-5 w-5 text-slate-400" />
              </div>
              {errors.preheatMinutes && <p className="mt-1 text-xs text-red-500">{errors.preheatMinutes}</p>}
            </div>

            {/* Convection Mode Toggle */}
            <div className="flex items-center justify-between rounded-lg border border-slate-200 p-3 bg-slate-50">
              <div className="flex flex-col">
                <span className="text-sm font-medium text-slate-900">Convection Mode</span>
                <span className="text-xs text-slate-500">Fan-forced air circulation</span>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input 
                  type="checkbox" 
                  name="convectionMode"
                  checked={profile.convectionMode} 
                  onChange={handleChange}
                  className="sr-only peer" 
                />
                <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-lime-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-lime-500"></div>
              </label>
            </div>
          </div>

          <div className="mt-8">
            <button
              onClick={handleAnalyze}
              className="w-full flex items-center justify-center gap-2 rounded-xl bg-lime-500 py-3.5 px-6 text-base font-bold text-white shadow-lg shadow-lime-200 transition-all hover:bg-lime-600 hover:scale-[1.02] active:scale-[0.98]"
            >
              <SparklesIcon className="h-5 w-5" />
              Analyze Oven Profile
            </button>
          </div>
        </div>

        {/* Results Section */}
        {analysis && (
          <div id="analysis-results" className="animate-fade-in space-y-6 pt-4">
             {/* Summary Card */}
             <div className="rounded-2xl bg-slate-900 p-8 text-white shadow-lg">
                <div className="flex items-start justify-between">
                    <div>
                        <span className="inline-flex items-center gap-1 rounded-full bg-lime-500 px-3 py-1 text-xs font-bold text-slate-900 uppercase tracking-wider mb-4">
                            {analysis.category}
                        </span>
                        <h3 className="text-2xl font-bold text-white mb-3">Analysis Summary</h3>
                        <p className="text-slate-300 leading-relaxed text-lg">
                            {analysis.summary}
                        </p>
                    </div>
                    <div className="hidden sm:block p-3 bg-slate-800 rounded-full">
                        <CheckCircleIcon className="h-8 w-8 text-lime-500" />
                    </div>
                </div>
             </div>

             <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                 {/* Card 1: Preheat */}
                 <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm h-full flex flex-col">
                    <h4 className="font-bold text-slate-800 mb-4 flex items-center gap-2 border-b border-slate-100 pb-3">
                        <ClockIcon className="h-5 w-5 text-orange-500" />
                        Preheating & Rack
                    </h4>
                    <ul className="space-y-3 mb-4 flex-grow">
                        {analysis.preheatAdvice.map((item, i) => (
                            <AdviceItem key={i} text={item} />
                        ))}
                    </ul>
                 </div>

                 {/* Card 2: Strategy */}
                 <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm h-full flex flex-col">
                    <h4 className="font-bold text-slate-800 mb-4 flex items-center gap-2 border-b border-slate-100 pb-3">
                        <FireIcon className="h-5 w-5 text-red-500" />
                        Baking Strategy
                        <Tooltip 
                            label="Low Power Strategy" 
                            content="Thermodynamics: Lower temps mean slower heat transfer. The dough dries out before it browns. Strategies like adding oil/sugar or using the broiler mimic high-heat results chemically." 
                        />
                    </h4>
                    <ul className="space-y-3 mb-4 flex-grow">
                        {analysis.bakingStrategy.map((item, i) => (
                            <AdviceItem key={i} text={item} />
                        ))}
                    </ul>
                 </div>

                 {/* Card 3: Dough */}
                 <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm h-full flex flex-col">
                    <h4 className="font-bold text-slate-800 mb-4 flex items-center gap-2 border-b border-slate-100 pb-3">
                        <BeakerIcon className="h-5 w-5 text-blue-500" />
                        Dough Adjustments
                        <Tooltip 
                            label="High Hydration Risks" 
                            content="In weak ovens, high hydration dough releases steam too slowly, creating a 'boiled' or gummy texture instead of a crispy rise. Lowering hydration helps the structure set faster." 
                        />
                    </h4>
                    <ul className="space-y-3 mb-4 flex-grow">
                        {analysis.doughAdjustments.map((item, i) => (
                            <AdviceItem key={i} text={item} />
                        ))}
                    </ul>
                 </div>
            </div>
            
            {/* Disclaimer */}
            <div className="text-center text-xs text-slate-400 italic mt-8">
                Calculations based on thermodynamic principles from Modernist Pizza and general baking physics. Real results may vary.
            </div>
          </div>
        )}
      </div>
    </TechnicalPageLayout>
  );
};

export default OvenAnalysisPage;
