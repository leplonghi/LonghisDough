import React from 'react';
import { SparklesIcon } from '../IconComponents';

const ComparisonBlock: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
    <div className="rounded-lg bg-slate-50 p-4">
        <h4 className="text-sm font-semibold text-slate-800 mb-2">{title}</h4>
        {children}
    </div>
);


const InsightsComparisons: React.FC = () => {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm h-full">
        <h2 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
            <SparklesIcon className="h-6 w-6 text-lime-500"/>
            Intelligent Comparisons
        </h2>
        <div className="space-y-4">
            <ComparisonBlock title="Your Avg. Hydration vs. Community (Neapolitan)">
                <div className="space-y-2 text-xs">
                    <div>
                        <span>You: 65%</span>
                        <div className="w-full bg-slate-200 rounded-full h-2.5"><div className="bg-lime-500 h-2.5 rounded-full" style={{width: '65%'}}></div></div>
                    </div>
                    <div>
                        <span>Community: 62%</span>
                        <div className="w-full bg-slate-200 rounded-full h-2.5"><div className="bg-sky-500 h-2.5 rounded-full" style={{width: '62%'}}></div></div>
                    </div>
                </div>
            </ComparisonBlock>
            <ComparisonBlock title="Your Fermentation Time vs. Technical Standard (NY Style)">
                 <div className="space-y-2 text-xs">
                    <div>
                        <span>You: 24h</span>
                        <div className="w-full bg-slate-200 rounded-full h-2.5"><div className="bg-lime-500 h-2.5 rounded-full" style={{width: '33%'}}></div></div>
                    </div>
                    <div>
                        <span>Recommended: 48-72h</span>
                         <div className="relative w-full bg-slate-200 rounded-full h-2.5">
                             <div className="bg-sky-500 h-2.5 rounded-full absolute" style={{left: '66%', width: '33%'}}></div>
                         </div>
                    </div>
                </div>
            </ComparisonBlock>
            <ComparisonBlock title="Performance by Flour Type">
                <p className="text-sm text-slate-600">
                    Your best ratings (avg. <strong>4.8 <span className="text-yellow-400">★</span></strong>) are with <strong>Strong 00 Flour</strong>.
                </p>
            </ComparisonBlock>
        </div>
    </div>
  );
};

export default InsightsComparisons;