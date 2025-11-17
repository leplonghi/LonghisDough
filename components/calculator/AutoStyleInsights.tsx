import React from 'react';
import { AutoStyleInsightsResult } from '../../types';
import { LightBulbIcon, StarIcon, SparklesIcon } from '../IconComponents';

interface AutoStyleInsightsProps {
    insights: AutoStyleInsightsResult;
    onApply: () => void;
}

const scoreToText = (score: number): { text: string; color: string } => {
    if (score < 40) return { text: 'Baixo', color: 'text-red-500' };
    if (score < 75) return { text: 'Médio', color: 'text-yellow-500' };
    return { text: 'Alto', color: 'text-lime-500' };
};

const InsightRow: React.FC<{ icon: string; label: string; value: string }> = ({ icon, label, value }) => (
    <div className="flex items-center gap-3">
        <span className="text-xl">{icon}</span>
        <div>
            <p className="text-xs text-slate-500 dark:text-slate-400">{label}</p>
            <p className="font-semibold text-slate-800 dark:text-slate-200">{value}</p>
        </div>
    </div>
);


const AutoStyleInsights: React.FC<AutoStyleInsightsProps> = ({ insights, onApply }) => {
    const {
        idealHydrationRange,
        idealFermentationRange,
        styleFitScore,
        recommendedStyle,
        mismatchWarnings,
        professionalNotes,
    } = insights;

    const scoreInfo = scoreToText(styleFitScore);

    return (
        <div className="mt-10">
            <div className="mb-4 flex items-center gap-3">
                <span className="text-lime-500 dark:text-lime-400">
                    <LightBulbIcon className="h-6 w-6" />
                </span>
                <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100">
                    Análise Inteligente da Massa
                </h3>
            </div>
            <div className="space-y-4 rounded-lg border border-slate-200 bg-white p-4 dark:border-slate-700 dark:bg-slate-800/50 sm:p-6">
                
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                    <InsightRow icon="💧" label="Hidratação Ideal" value={idealHydrationRange} />
                    <InsightRow icon="⏳" label="Fermentação Ideal" value={idealFermentationRange} />
                    <div className="flex items-center gap-3">
                        <div>
                            <p className="text-xs text-slate-500 dark:text-slate-400">Compatibilidade</p>
                            <p className={`font-bold text-lg ${scoreInfo.color}`}>{scoreInfo.text}</p>
                        </div>
                    </div>
                </div>

                {recommendedStyle && (
                    <div className="flex items-start gap-3 rounded-md bg-lime-50 p-3 ring-1 ring-inset ring-lime-200 dark:bg-lime-500/10 dark:ring-lime-500/20">
                        <StarIcon className="h-5 w-5 flex-shrink-0 text-lime-600 dark:text-lime-400 mt-0.5" />
                        <p className="text-sm font-medium text-lime-800 dark:text-lime-200">
                            <span className="font-bold">Estilo Sugerido:</span> {recommendedStyle}. Pelas suas condições, este estilo pode trazer um resultado ainda melhor.
                        </p>
                    </div>
                )}
                
                {mismatchWarnings.map((warning, index) => (
                    <div key={`warn-${index}`} className="flex items-start gap-3 rounded-md bg-yellow-50 p-3 text-yellow-900 ring-1 ring-inset ring-yellow-200 dark:bg-yellow-500/10 dark:text-yellow-200 dark:ring-yellow-500/20">
                        <span className="mt-0.5">⚠️</span>
                        <p className="text-sm font-medium">{warning}</p>
                    </div>
                ))}
                
                {professionalNotes.map((note, index) => (
                    <p key={`note-${index}`} className="text-sm text-slate-600 dark:text-slate-300 pl-8 relative">
                         <LightBulbIcon className="h-4 w-4 text-slate-400 absolute left-2 top-1" />
                        {note}
                    </p>
                ))}

                {recommendedStyle && (
                    <div className="mt-4 border-t border-slate-200 dark:border-slate-700 pt-4">
                        <button
                            onClick={onApply}
                            className="w-full flex items-center justify-center gap-2 rounded-md bg-lime-500 py-2 px-4 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-lime-600"
                        >
                            <SparklesIcon className="h-5 w-5" />
                            Aplicar Sugestões Inteligentes
                        </button>
                    </div>
                )}

            </div>
        </div>
    );
};

export default AutoStyleInsights;