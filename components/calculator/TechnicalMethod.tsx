
import React from 'react';
import { TechnicalStep, TechnicalPhase } from '@/types';
import { 
    ClockIcon, 
    FireIcon, 
    BeakerIcon, 
    WrenchScrewdriverIcon, 
    CubeIcon,
    ExclamationCircleIcon,
    LightBulbIcon,
    BookOpenIcon
} from '@/components/ui/Icons';

interface TechnicalMethodProps {
  steps: TechnicalStep[];
}

const PhaseIcon: React.FC<{ phase: TechnicalPhase }> = ({ phase }) => {
    switch (phase) {
        case 'PREP': return <BeakerIcon className="h-5 w-5 text-slate-500" />;
        case 'AUTO':
        case 'MIX': return <BeakerIcon className="h-5 w-5 text-blue-500" />;
        case 'KNEAD': return <WrenchScrewdriverIcon className="h-5 w-5 text-orange-500" />;
        case 'BULK': return <ClockIcon className="h-5 w-5 text-purple-500" />;
        case 'DIVIDE': return <CubeIcon className="h-5 w-5 text-indigo-500" />;
        case 'PROOF': return <ClockIcon className="h-5 w-5 text-pink-500" />;
        case 'BAKE': return <FireIcon className="h-5 w-5 text-red-500" />;
        default: return <BeakerIcon className="h-5 w-5 text-slate-500" />;
    }
};

const TechnicalMethod: React.FC<TechnicalMethodProps> = ({ steps }) => {
  return (
    <div className="mt-8 animate-[fadeIn_0.5s_ease-out]">
      <div className="flex items-center gap-3 mb-6 border-b border-slate-200 pb-4">
        <BookOpenIcon className="h-6 w-6 text-lime-500" />
        <h2 className="text-xl font-bold text-slate-900">Technical Method</h2>
      </div>

      <div className="relative border-l-2 border-slate-200 ml-3 space-y-8">
        {steps.map((step, index) => (
          <div key={step.id} className="ml-6 relative">
            {/* Timeline Dot */}
            <span className="absolute -left-[31px] top-0 flex h-8 w-8 items-center justify-center rounded-full bg-white ring-2 ring-slate-200">
               <PhaseIcon phase={step.phase} />
            </span>

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-2">
                <h3 className="text-lg font-bold text-slate-800">{step.title}</h3>
                <div className="flex items-center gap-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
                    {step.durationLabel && (
                        <span className="flex items-center gap-1 bg-slate-100 px-2 py-1 rounded">
                            <ClockIcon className="h-3 w-3" /> {step.durationLabel}
                        </span>
                    )}
                     {step.temperatureLabel && (
                        <span className="flex items-center gap-1 bg-orange-50 text-orange-700 px-2 py-1 rounded">
                            <FireIcon className="h-3 w-3" /> {step.temperatureLabel}
                        </span>
                    )}
                </div>
            </div>

            <p className="text-slate-600 mb-3 leading-relaxed">
                {step.actionInstructions}
            </p>

            {/* Meta Data Cards */}
            <div className="space-y-2">
                {step.technicalExplanation && (
                    <div className="text-xs text-slate-500 bg-slate-50 p-2 rounded border-l-2 border-slate-300">
                        <span className="font-bold text-slate-600">Science:</span> {step.technicalExplanation}
                    </div>
                )}
                
                {step.criticalPoint && (
                    <div className="flex items-start gap-2 text-xs text-red-700 bg-red-50 p-2 rounded border border-red-100">
                        <ExclamationCircleIcon className="h-4 w-4 flex-shrink-0 mt-0.5" />
                        <span><strong>Critical:</strong> {step.criticalPoint}</span>
                    </div>
                )}

                {step.proTip && (
                    <div className="flex items-start gap-2 text-xs text-blue-700 bg-blue-50 p-2 rounded border border-blue-100">
                        <LightBulbIcon className="h-4 w-4 flex-shrink-0 mt-0.5" />
                        <span><strong>Pro Tip:</strong> {step.proTip}</span>
                    </div>
                )}
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-8 text-center p-4 bg-slate-50 rounded-lg border border-slate-200">
          <p className="text-sm text-slate-500 italic">
              This method is dynamically generated based on your specific dough configuration (hydration, yeast type, flour).
          </p>
      </div>
    </div>
  );
};

export default TechnicalMethod;
