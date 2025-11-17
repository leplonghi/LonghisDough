import React from 'react';
import { RecipeStyle } from '../../types';
import { useTranslation } from '../../i18n';

interface HydrationChartProps {
  data: { styleId: RecipeStyle; avgHydration: number }[];
}

const HydrationByStyleChart: React.FC<HydrationChartProps> = ({ data }) => {
    const { t } = useTranslation();
    const maxHydration = Math.max(...data.map(d => d.avgHydration), 100);

    return (
        <div className="mt-6 space-y-4">
            {data.map(({ styleId, avgHydration }) => (
                <div key={styleId}>
                    <div className="flex justify-between items-center mb-1 text-sm">
                        <span className="font-semibold text-slate-700 dark:text-slate-300">
                            {t(`form.${styleId.toLowerCase()}`, { defaultValue: styleId })}
                        </span>
                        <span className="font-bold text-lime-600 dark:text-lime-400">
                            {avgHydration.toFixed(1)}%
                        </span>
                    </div>
                    <div className="h-4 w-full rounded-full bg-slate-200 dark:bg-slate-700">
                        <div
                            className="h-4 rounded-full bg-lime-500"
                            style={{ width: `${(avgHydration / maxHydration) * 100}%` }}
                        />
                    </div>
                </div>
            ))}
        </div>
    );
};

export default HydrationByStyleChart;
