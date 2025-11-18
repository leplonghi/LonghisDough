import React from 'react';
import { LightBulbIcon } from '../IconComponents';

const PatternItem: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <li className="flex items-start gap-3">
        <LightBulbIcon className="h-5 w-5 flex-shrink-0 text-yellow-400 mt-0.5" />
        <p className="text-sm text-slate-600">{children}</p>
    </li>
);

const InsightsPatterns: React.FC = () => {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm h-full">
        <h2 className="text-xl font-bold text-slate-800 mb-4">Consistency & Evolution</h2>
        <ul className="space-y-4">
            <PatternItem>You tend to use <strong>+3% higher</strong> hydration on hot days (&gt;28°C).</PatternItem>
            <PatternItem>Your <strong>5-star bakes</strong> average <strong>48 hours</strong> of cold fermentation.</PatternItem>
            <PatternItem>You use <strong>Biga</strong> preferment more often on weekends.</PatternItem>
             <PatternItem>Your most consistent style is <strong>Neapolitan Pizza</strong>, with low variance in results.</PatternItem>
        </ul>
    </div>
  );
};

export default InsightsPatterns;