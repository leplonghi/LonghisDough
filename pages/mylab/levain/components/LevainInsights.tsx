
import React, { useMemo } from 'react';
import { Levain } from '../../../../types';
import { hoursBetween } from '../../../../helpers';

interface LevainInsightsProps {
    levain: Levain;
}

const InsightKPI: React.FC<{ label: string; value: string | number }> = ({ label, value }) => (
    <div className="text-center">
        <p className="text-2xl font-semibold text-lime-600">{value}</p>
        <p className="text-sm text-neutral-500">{label}</p>
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
        <div className="rounded-xl border border-neutral-200 bg-white p-6 shadow-sm">
            <h3 className="text-lg font-medium mb-4">Levain Insights</h3>
            {!insights ? (
                <p className="text-sm text-center py-8 text-neutral-500">
                    Not enough data to generate insights yet.
                </p>
            ) : (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    <InsightKPI label="Avg. feeding frequency" value={`${insights.avgFrequencyHours}h`} />
                    <InsightKPI label="Avg. temperature" value={`${insights.avgTemp}°C`} />
                    <InsightKPI label="Used in recipes" value="0" />
                </div>
            )}
        </div>
    );
};

export default LevainInsights;
