import React, { useMemo } from 'react';
import { Levain } from '../../../../types';
import { hoursBetween } from '../../../../helpers';

interface LevainInsightsProps {
    levain: Levain;
}

const InsightKPI: React.FC<{ label: string; value: string | number }> = ({ label, value }) => (
    <div className="text-center">
        <p className="text-2xl font-semibold text-lime-600 dark:text-lime-400">{value}</p>
        <p className="text-sm text-neutral-500 dark:text-neutral-400">{label}</p>
    </div>
);

const LevainInsights: React.FC<LevainInsightsProps> = ({ levain }) => {
    const insights = useMemo(() => {
        const { feedingHistory } = levain;
        if (feedingHistory.length < 2) {
            return null;
        }
        
        // Frequência Média
        const sortedHistory = [...feedingHistory].sort((a,b) => new Date(a.date).getTime() - new Date(b.date).getTime());
        const totalHours = hoursBetween(sortedHistory[sortedHistory.length - 1].date, sortedHistory[0].date);
        const avgFrequencyHours = totalHours / (sortedHistory.length - 1);
        
        // Temperatura Média
        const temps = feedingHistory.filter(f => f.ambientTemperature != null).map(f => f.ambientTemperature!);
        const avgTemp = temps.length > 0 ? temps.reduce((a, b) => a + b, 0) / temps.length : null;

        return {
            avgFrequencyHours: avgFrequencyHours.toFixed(1),
            avgTemp: avgTemp ? avgTemp.toFixed(1) : 'N/A',
        };

    }, [levain]);

    return (
        <div className="rounded-xl border border-neutral-200 bg-white p-6 shadow-sm dark:border-neutral-700 dark:bg-neutral-800">
            <h3 className="text-lg font-medium mb-4">Insights do Levain</h3>
            {!insights ? (
                <p className="text-sm text-center py-8 text-neutral-500 dark:text-neutral-400">
                    Ainda não há dados suficientes para gerar insights.
                </p>
            ) : (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    <InsightKPI label="Frequência média de alimentação" value={`${insights.avgFrequencyHours}h`} />
                    <InsightKPI label="Temperatura média" value={`${insights.avgTemp}°C`} />
                    <InsightKPI label="Usado em receitas" value="0" />
                </div>
            )}
        </div>
    );
};

export default LevainInsights;