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
    ChevronDownIcon
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

    const wrapperClass = `flex h-8 w-8 items-center justify-center rounded-full ring-4 ring-white ${bgClass}`;

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

const StepCard: React.FC<{ step: TechnicalStep; isExpanded: boolean; onToggle: () => void }> = ({ step, isExpanded, onToggle }) => {
    return (
        <div className="relative pb-8 pl-8 sm:pl-10 last:pb-0">
            {/* Connector Line */}
            <div className="absolute left-[15px] top-8 h-full w-0.5 bg-slate-200 last:hidden" aria-hidden="true"></div>
            
            {/* Icon */}
            <div className="absolute left-0 top-0">
                <PhaseIcon phase={step.phase} />
            </div>

            {/* Content Card */}
            <div 
                className={`group relative flex flex-col rounded-xl border bg-white p-4 shadow-sm transition-all hover:shadow-md cursor-pointer ${isExpanded ? 'border-lime-200 ring-1 ring-lime-200' : 'border-slate-200'}`}
                onClick={onToggle}
            >
                {/* Header */}
                <div className="flex items-start justify-between gap-4">
                    <div>
                        <div className="flex items-center gap-2 mb-1">
                            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                                {step.phase}
                            </span>
                            {step.durationLabel && (
                                <span className="inline-flex items-center gap-1 rounded-md bg-slate-100 px-2 py-0.5 text-xs font-medium text-slate-700">
                                    <ClockIcon className="h-3 w-3" /> {step.durationLabel}
                                </span>
                            )}
                        </div>
                        <h3 className="text-lg font-bold text-slate-900 group-hover:text-lime-700 transition-colors">
                            {step.title}
                        </h3>
                    </div>
                    <div className={`transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`}>
                        <ChevronDownIcon className="h-5 w-5 text-slate-400" />
                    </div>
                </div>

                {/* Main Instruction */}
                <p className="mt-2 text-sm text-slate-700 leading-relaxed">
                    {step.actionInstructions}
                </p>

                {/* Details (Collapsible) */}
                <div className={`grid grid-cols-1 gap-3 overflow-hidden transition-all duration-300 ease-in-out ${isExpanded ? 'mt-4 opacity-100 max-h-[500px]' : 'max-h-0 opacity-0'}`}>
                    
                    {step.temperatureLabel && (
                        <div className="flex items-center gap-2 text-sm font-semibold text-orange-700 bg-orange-50 p-2 rounded-lg border border-orange-100">
                            <FireIcon className="h-4 w-4" />
                            Target Temp: {step.temperatureLabel}
                        </div>
                    )}

                    {step.technicalExplanation && (
                        <div className="rounded-lg bg-slate-50 p-3 text-xs text-slate-600 border border-slate-200">
                            <span className="block font-bold text-slate-700 mb-1">The Science:</span>
                            {step.technicalExplanation}
                        </div>
                    )}

                    {step.proTip && (
                        <div className="rounded-lg bg-blue-50 p-3 text-xs text-blue-800 border-l-4 border-blue-400">
                            <div className="flex items-center gap-2 mb-1">
                                <LightBulbIcon className="h-4 w-4 text-blue-500" />
                                <span className="font-bold">Pro Tip</span>
                            </div>
                            {step.proTip}
                        </div>
                    )}

                    {step.criticalPoint && (
                        <div className="rounded-lg bg-red-50 p-3 text-xs text-red-800 border-l-4 border-red-400">
                            <div className="flex items-center gap-2 mb-1">
                                <ExclamationCircleIcon className="h-4 w-4 text-red-500" />
                                <span className="font-bold">Critical Point</span>
                            </div>
                            {step.criticalPoint}
                        </div>
                    )}

                    {step.references && step.references.length > 0 && (
                        <div className="flex items-center gap-2 text-[10px] text-slate-500 mt-1">
                            <BookOpenIcon className="h-3 w-3" />
                            <span>Ref: {step.references.join(', ')}</span>
                        </div>
                    )}
                </div>
                
                {!isExpanded && (step.proTip || step.criticalPoint) && (
                    <div className="mt-3 flex gap-2">
                        {step.criticalPoint && <span className="h-2 w-2 rounded-full bg-red-400" title="Has Critical Point"></span>}
                        {step.proTip && <span className="h-2 w-2 rounded-full bg-blue-400" title="Has Pro Tip"></span>}
                    </div>
                )}
            </div>
        </div>
    );
}

const TechnicalMethodPanel: React.FC<TechnicalMethodPanelProps> = ({ steps }) => {
  const [expandedStepId, setExpandedStepId] = useState<string | null>(steps[0]?.id || null);

  const handleToggle = (id: string) => {
      setExpandedStepId(prev => prev === id ? null : id);
  };

  return (
    <div className="mt-8 animate-[fadeIn_0.5s_ease-out]">
      <div className="mb-6">
        <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <BookOpenIcon className="h-6 w-6 text-lime-500" />
            Technical Method
        </h2>
        <p className="text-sm text-slate-600 mt-1">
            A scientifically grounded roadmap for your dough.
        </p>
      </div>

      <div className="space-y-0">
        {steps.map((step) => (
            <StepCard 
                key={step.id} 
                step={step} 
                isExpanded={expandedStepId === step.id} 
                onToggle={() => handleToggle(step.id)}
            />
        ))}
      </div>
      
      <div className="mt-8 p-4 rounded-lg bg-slate-50 border border-slate-200 text-center">
          <p className="text-xs text-slate-500 italic">
              This workflow is dynamically generated based on your specific dough configuration (hydration, yeast type, and environment settings).
          </p>
      </div>
    </div>
  );
};

export default TechnicalMethodPanel;