
import React from 'react';
import { LightBulbIcon } from '../IconComponents';
import { EnvironmentAdjustments as EnvironmentAdjustmentsType } from '../../logic/environmentAdjustments';

interface EnvironmentAdjustmentsProps {
    adjustments: EnvironmentAdjustmentsType;
}

const SuggestionItem: React.FC<{ text: string }> = ({ text }) => (
    <p className="text-sm text-slate-600 dark:text-slate-300">{text}</p>
);

const WarningItem: React.FC<{ text: string }> = ({ text }) => (
     <div className="flex items-start gap-2 rounded-md bg-yellow-50 p-2 text-sm text-yellow-900 ring-1 ring-inset ring-yellow-200 dark:bg-yellow-500/10 dark:text-yellow-200 dark:ring-yellow-500/20">
        <LightBulbIcon className="h-4 w-4 mt-0.5 flex-shrink-0 text-yellow-500" />
        <span>{text}</span>
    </div>
);

const EnvironmentAdjustments: React.FC<EnvironmentAdjustmentsProps> = ({ adjustments }) => {
    const hasAdjustments =
        adjustments.hydrationSuggestion ||
        adjustments.yeastSuggestion ||
        adjustments.fermentationTimeSuggestion ||
        adjustments.warnings.length > 0;

    if (!hasAdjustments) {
        return (
            <div className="mt-10">
                <div className="mb-4 flex items-center gap-3">
                    <span className="text-lime-500 dark:text-lime-400">
                        <LightBulbIcon className="h-6 w-6" />
                    </span>
                    <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100">
                        Ajustes Ambientais
                    </h3>
                </div>
                <div className="rounded-lg border border-slate-200 bg-white p-4 text-center text-sm text-slate-500 dark:border-slate-700 dark:bg-slate-800/50">
                    Sem ajustes recomendados para as condições atuais.
                </div>
            </div>
        );
    }

    return (
        <div className="mt-10">
            <div className="mb-4 flex items-center gap-3">
                <span className="text-lime-500 dark:text-lime-400">
                    <LightBulbIcon className="h-6 w-6" />
                </span>
                <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100">
                    Ajustes Ambientais Inteligentes
                </h3>
            </div>
            <div className="space-y-3 rounded-lg border border-slate-200 bg-white p-4 dark:border-slate-700 dark:bg-slate-800/50 sm:p-6">
                {adjustments.warnings.map((warning, index) => (
                    <WarningItem key={`warn-${index}`} text={warning} />
                ))}
                {adjustments.hydrationSuggestion && <SuggestionItem text={adjustments.hydrationSuggestion} />}
                {adjustments.yeastSuggestion && <SuggestionItem text={adjustments.yeastSuggestion} />}
                {adjustments.fermentationTimeSuggestion && <SuggestionItem text={adjustments.fermentationTimeSuggestion} />}
            </div>
        </div>
    );
};

export default EnvironmentAdjustments;
