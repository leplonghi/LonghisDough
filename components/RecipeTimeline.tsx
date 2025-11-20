
import React from 'react';
import { RecipeStep } from '../logic/recipeStepsGenerator';
import { 
    BeakerIcon, 
    ClockIcon, 
    FireIcon, 
    HandRaisedIcon, // Simulating 'Shape' or 'Mix'
    ScaleIcon, // Simulating 'Prep'
    LightBulbIcon,
    ExclamationCircleIcon
} from './IconComponents';

interface RecipeTimelineProps {
    steps: RecipeStep[];
}

const getIconForPhase = (phase: string) => {
    switch (phase) {
        case 'Prep': return <BeakerIcon className="h-5 w-5" />;
        case 'Mix': return <HandRaisedIcon className="h-5 w-5" />; // Using HandRaised as proxy for Mix/Hand work
        case 'Ferment': return <ClockIcon className="h-5 w-5" />;
        case 'Shape': return <div className="h-5 w-5 rounded-full border-2 border-current" />; // Custom circle for shape
        case 'Bake': return <FireIcon className="h-5 w-5" />;
        default: return <BeakerIcon className="h-5 w-5" />;
    }
};

const getPhaseColor = (phase: string) => {
    switch (phase) {
        case 'Prep': return 'bg-blue-100 text-blue-600 border-blue-200';
        case 'Mix': return 'bg-purple-100 text-purple-600 border-purple-200';
        case 'Ferment': return 'bg-amber-100 text-amber-600 border-amber-200';
        case 'Shape': return 'bg-indigo-100 text-indigo-600 border-indigo-200';
        case 'Bake': return 'bg-red-100 text-red-600 border-red-200';
        default: return 'bg-slate-100 text-slate-600 border-slate-200';
    }
};

const RecipeTimeline: React.FC<RecipeTimelineProps> = ({ steps }) => {
    return (
        <div className="relative pl-4 sm:pl-6 space-y-8 before:absolute before:inset-0 before:ml-4 sm:before:ml-6 before:h-full before:w-0.5 before:-translate-x-1/2 before:bg-slate-200 before:content-['']">
            {steps.map((step, index) => {
                const colorClass = getPhaseColor(step.phase);
                
                return (
                    <div key={index} className="relative group">
                        {/* Icon Badge */}
                        <div className={`absolute top-0 -left-4 sm:-left-6 -ml-3 sm:-ml-3 flex h-10 w-10 sm:h-12 sm:w-12 -translate-x-1/2 items-center justify-center rounded-full border-4 border-white shadow-sm ${colorClass} z-10`}>
                            {getIconForPhase(step.phase)}
                        </div>

                        {/* Content Card */}
                        <div className="ml-6 sm:ml-10 rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition-all hover:shadow-md hover:border-slate-300">
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                                <div className="flex items-center gap-2">
                                    <span className={`px-2 py-0.5 text-[10px] uppercase font-bold rounded-full tracking-wide ${colorClass.replace('border-', 'ring-1 ring-inset ring-')}`}>
                                        {step.phase}
                                    </span>
                                    <h3 className="text-base font-bold text-slate-900">{step.title}</h3>
                                </div>
                                {step.duration && (
                                    <div className="flex items-center gap-1 text-xs font-semibold text-slate-500 bg-slate-50 px-2 py-1 rounded">
                                        <ClockIcon className="h-3.5 w-3.5" />
                                        {step.duration}
                                    </div>
                                )}
                            </div>
                            
                            <p className="text-sm text-slate-600 leading-relaxed">
                                {step.description}
                            </p>

                            {step.tip && (
                                <div className="mt-3 flex items-start gap-2 rounded-lg bg-sky-50 p-3 text-xs text-sky-800">
                                    <LightBulbIcon className="h-4 w-4 flex-shrink-0 text-sky-500" />
                                    <span><strong>Pro Tip:</strong> {step.tip}</span>
                                </div>
                            )}

                            {step.critical && (
                                <div className="mt-2 flex items-start gap-2 rounded-lg bg-red-50 p-3 text-xs text-red-800">
                                    <ExclamationCircleIcon className="h-4 w-4 flex-shrink-0 text-red-500" />
                                    <span><strong>Critical Point:</strong> Precision here is key for success.</span>
                                </div>
                            )}
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default RecipeTimeline;
