
import React, { useState } from 'react';
import { TechnicalStep, TechnicalPhase } from '@/types';
import { 
    ClockIcon, 
    FireIcon, 
    BeakerIcon, 
    WrenchScrewdriverIcon, 
    CubeIcon, 
    ExclamationCircleIcon, 
    LightBulbIcon, 
    BookOpenIcon,
    ChevronDownIcon,
    SparklesIcon,
    UserCircleIcon
} from '@/components/ui/Icons';

interface TechnicalMethodPanelProps {
  steps: TechnicalStep[];
}

const PhaseIcon: React.FC<{ phase: TechnicalPhase }> = ({ phase }) => {
    const className = "h-5 w-5 text-white";
    let bgClass = "bg-slate-400";

    switch (phase) {
        case 'PREP': bgClass = "bg-slate-500"; break;
        case 'AUTO': bgClass = "bg-blue-400"; break;
        case 'MIX': bgClass = "bg-blue-600"; break;
        case 'KNEAD': bgClass = "bg-orange-500"; break;
        case 'BULK': bgClass = "bg-purple-500"; break;
        case 'DIVIDE': bgClass = "bg-indigo-500"; break;
        case 'PROOF': bgClass = "bg-pink-500"; break;
        case 'BAKE': bgClass = "bg-red-600"; break;
        default: bgClass = "bg-slate-500"; break;
    }

    const wrapperClass = `flex h-8 w-8 items-center justify-center rounded-full ring-4 ring-white ${bgClass} shadow-sm z-10 relative`;

    switch (phase) {
        case 'PREP': return <div className={wrapperClass}><BeakerIcon className={className} /></div>;
        case 'AUTO':
        case 'MIX': return <div className={wrapperClass}><BeakerIcon className={className} /></div>;
        case 'KNEAD': return <div className={wrapperClass}><WrenchScrewdriverIcon className={className} /></div>;
        case 'BULK': return <div className={wrapperClass}><ClockIcon className={className} /></div>;
        case 'DIVIDE': return <div className={wrapperClass}><CubeIcon className={className} /></div>;
        case 'PROOF': return <div className={wrapperClass}><ClockIcon className={className} /></div>;
        case 'BAKE': return <div className={wrapperClass}><FireIcon className={className} /></div>;
        default: return <div className={wrapperClass}><BeakerIcon className={className} /></div>;
    }
};

const StepCard: React.FC<{ step: TechnicalStep; isExpanded: boolean; onToggle: () => void; mode: 'technical' | 'grandma' }> = ({ step, isExpanded, onToggle, mode }) => {
    const isPreferment = step.title.toLowerCase().includes('poolish') || 
                         step.title.toLowerCase().includes('biga') || 
                         step.title.toLowerCase().includes('sponge') ||
                         (step.phase === 'PREP' && step.title.toLowerCase().includes('levain'));

    const containerClasses = isPreferment
        ? "border-amber-200 bg-amber-50/80 hover:border-amber-300 hover:shadow-md ring-1 ring-amber-100"
        : "border-slate-200 bg-white hover:border-lime-400 hover:shadow-md hover:ring-1 hover:ring-lime-400/50";

    const isGrandma = mode === 'grandma';

    return (
        <div className="relative pb-10 pl-8 sm:pl-12 last:pb-0">
            <div className="absolute left-[15px] top-8 h-full w-0.5 bg-slate-200 last:hidden" aria-hidden="true"></div>
            
            <div className="absolute left-0 top-0">
                <PhaseIcon phase={step.phase} />
            </div>

            <div 
                className={`group relative flex flex-col rounded-2xl border p-5 shadow-sm transition-all cursor-pointer ${containerClasses}`}
                onClick={onToggle}
            >
                <div className="flex items-start justify-between gap-4">
                    <div className="space-y-1">
                        <div className="flex items-center gap-2 flex-wrap">
                            <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${isPreferment ? 'bg-amber-200 text-amber-800' : 'bg-slate-100 text-slate-500'}`}>
                                {step.phase}
                            </span>
                            {isPreferment && (
                                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-amber-500 text-white flex items-center gap-1">
                                    <SparklesIcon className="h-3 w-3" /> Preferment
                                </span>
                            )}
                            {step.durationLabel && !isGrandma && (
                                <span className="inline-flex items-center gap-1 rounded-md bg-slate-100 px-2 py-0.5 text-xs font-medium text-slate-600 border border-slate-200">
                                    <ClockIcon className="h-3 w-3 text-slate-400" /> {step.durationLabel}
                                </span>
                            )}
                        </div>
                        <h3 className="text-lg font-bold text-slate-800 leading-tight">
                            {step.title}
                        </h3>
                    </div>
                    <div className={`transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''} text-slate-400 bg-white/50 rounded-full p-1`}>
                        <ChevronDownIcon className="h-5 w-5" />
                    </div>
                </div>

                <p className="mt-3 text-sm font-medium text-slate-700 leading-relaxed">
                    {isGrandma ? (step.grandmaInstructions || step.actionInstructions) : step.actionInstructions}
                </p>

                <div 
                    className={`grid grid-cols-1 gap-3 overflow-hidden transition-all duration-300 ease-in-out ${isExpanded ? 'mt-5 opacity-100 max-h-[1000px]' : 'max-h-0 opacity-0'}`}
                >
                    <div className="h-px w-full bg-slate-200/60 mb-1"></div>

                    {step.temperatureLabel && !isGrandma && (
                        <div className="flex items-center gap-2 text-sm font-semibold text-orange-700 bg-orange-50 p-2.5 rounded-lg border border-orange-100">
                            <FireIcon className="h-4 w-4" />
                            Target Temp: {step.temperatureLabel}
                        </div>
                    )}

                    {!isGrandma && step.technicalExplanation && (
                        <div className="rounded-lg bg-slate-50 p-3.5 text-xs text-slate-600 border border-slate-200">
                            <span className="flex items-center gap-1.5 font-bold text-slate-700 mb-1.5 uppercase tracking-wide text-[10px]">
                                <BeakerIcon className="h-3 w-3" /> The Science
                            </span>
                            {step.technicalExplanation}
                        </div>
                    )}

                    {step.proTip && (
                        <div className="rounded-lg bg-blue-50 p-3.5 text-xs text-blue-800 border-l-4 border-blue-400 shadow-sm">
                            <div className="flex items-center gap-2 mb-1.5">
                                <LightBulbIcon className="h-4 w-4 text-blue-600" />
                                <span className="font-bold uppercase tracking-wide text-[10px]">Pro Tip</span>
                            </div>
                            {step.proTip}
                        </div>
                    )}

                    {step.criticalPoint && !isGrandma && (
                        <div className="rounded-lg bg-red-50 p-3.5 text-xs text-red-800 border-l-4 border-red-400 shadow-sm">
                            <div className="flex items-center gap-2 mb-1.5">
                                <ExclamationCircleIcon className="h-4 w-4 text-red-600" />
                                <span className="font-bold uppercase tracking-wide text-[10px]">Critical Point</span>
                            </div>
                            {step.criticalPoint}
                        </div>
                    )}

                    {step.references && step.references.length > 0 && !isGrandma && (
                        <div className="flex items-center gap-1.5 text-[10px] text-slate-400 mt-2">
                            <BookOpenIcon className="h-3 w-3" />
                            <span>Source: {step.references.join(', ')}</span>
                        </div>
                    )}
                </div>
                
                {!isExpanded && (step.proTip || step.criticalPoint) && (
                    <div className="mt-3 flex gap-2">
                        {step.criticalPoint && (
                            <span className="inline-flex items-center gap-1 rounded-md bg-red-50 border border-red-100 px-2 py-1 text-[10px] font-bold text-red-700 uppercase tracking-wide">
                                <ExclamationCircleIcon className="h-3 w-3" /> Critical
                            </span>
                        )}
                        {step.proTip && (
                            <span className="inline-flex items-center gap-1 rounded-md bg-blue-50 border border-blue-100 px-2 py-1 text-[10px] font-bold text-blue-700 uppercase tracking-wide">
                                <LightBulbIcon className="h-3 w-3" /> Tip
                            </span>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}

const TechnicalMethodPanel: React.FC<TechnicalMethodPanelProps> = ({ steps }) => {
  const [expandedStepId, setExpandedStepId] = useState<string | null>(steps[0]?.id || null);
  const [mode, setMode] = useState<'technical' | 'grandma'>('technical');

  const handleToggle = (id: string) => {
      setExpandedStepId(prev => prev === id ? null : id);
  };

  if (steps.length === 0) return null;

  return (
    <div className="mt-8 animate-[fadeIn_0.5s_ease-out]">
      <div className="mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
            <div className="p-2 bg-lime-100 text-lime-600 rounded-lg">
                <BookOpenIcon className="h-6 w-6" />
            </div>
            <div>
                <h2 className="text-xl font-bold text-slate-900">Step-by-Step Method</h2>
                <p className="text-sm text-slate-500">Workflow generated for your dough.</p>
            </div>
        </div>

        <div className="flex items-center gap-2 bg-slate-100 p-1 rounded-lg border border-slate-200">
            <button
                onClick={() => setMode('technical')}
                className={`px-3 py-1.5 rounded-md text-xs font-bold transition-all flex items-center gap-2 ${mode === 'technical' ? 'bg-white text-slate-800 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
            >
                <WrenchScrewdriverIcon className="h-3 w-3" /> Technical
            </button>
            <button
                onClick={() => setMode('grandma')}
                className={`px-3 py-1.5 rounded-md text-xs font-bold transition-all flex items-center gap-2 ${mode === 'grandma' ? 'bg-white text-pink-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
            >
                <UserCircleIcon className="h-3 w-3" /> Grandma
            </button>
        </div>
      </div>

      <div className="space-y-0">
        {steps.map((step) => (
            <StepCard 
                key={step.id} 
                step={step} 
                isExpanded={expandedStepId === step.id} 
                onToggle={() => handleToggle(step.id)}
                mode={mode}
            />
        ))}
      </div>
      
      <div className="mt-10 p-4 rounded-xl bg-slate-50 border border-slate-200 text-center">
          <p className="text-xs text-slate-500 italic font-medium">
              This workflow adapts dynamically to hydration, yeast type, and room temperature settings.
          </p>
      </div>
    </div>
  );
};

export default TechnicalMethodPanel;
