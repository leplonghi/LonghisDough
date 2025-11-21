import React, { useMemo } from 'react';
import { Levain } from '@/types';
import { hoursBetween } from '@/helpers';
import { ClockIcon, FireIcon, SparklesIcon, ChartBarIcon } from '@/components/ui/Icons';

interface LevainInsightsProps {
    levain: Levain;
}

const StatCard: React.FC<{ label: string; value: string; subtext?: string; icon: React.ReactNode; colorClass: string }> = ({ label, value, subtext, icon, colorClass }) => (
    <div className="flex items-start gap-3 rounded-xl bg-slate-50 p-4 border border-slate-100">
        <div className={`p-2 rounded-lg ${colorClass} bg-opacity-10 text-current`}>
            {icon}
        </div>
        <div>
            <p className="text-xs font-bold uppercase tracking-wide text-slate-500">{label}</p>
            <p className="text-xl font-bold text-slate-800">{value}</p>
            {subtext && <p className="text-xs text-slate-600 mt-0.5">{subtext}</p>}
        </div>
    </div>
);

const HealthBar: React.FC<{ score: number }> = ({ score }) => {
    // Score 0-100
    let color = 'bg-red-500';
    let text = 'Weak';
    
    if (score > 80) { color = 'bg-green-500'; text = 'Peak Health'; }
    else if (score > 50) { color = 'bg-lime-500'; text = 'Good'; }
    else if (score > 30) { color = 'bg-yellow-500'; text = 'Fair'; }

    return (
        <div className="mb-6">
            <div className="flex justify-between items-end mb-2">
                <span className="text-sm font-bold text-slate-700">Starter Health Score</span>
                <span className={`text-xs font-bold px-2 py-0.5 rounded-full text-white ${color}`}>{text}</span>
            </div>
            <div className="h-3 w-full bg-slate-200 rounded-full overflow-hidden">
                <div 
                    className={`h-full ${color} transition-all duration-500 ease-out`} 
                    style={{ width: `${score}%` }}
                ></div>
            </div>
            <p className="text-xs text-slate-600 mt-2">Based on feeding consistency and recent activity.</p>
        </div>
    );
}

const LevainInsights: React.FC<LevainInsightsProps> = ({ levain }) => {
    const analysis = useMemo(() => {
        const { feedingHistory } = levain;
        if (!feedingHistory || feedingHistory.length < 2) {
            return null;
        }
        
        const sortedHistory = [...feedingHistory].sort((a,b) => new Date(b.date).getTime() - new Date(a.date).getTime());
        
        // Avg Frequency
        const timeSpan = hoursBetween(sortedHistory[0].date, sortedHistory[sortedHistory.length - 1].date);
        const avgFrequencyHours = timeSpan / (sortedHistory.length - 1);
        
        // Avg Temp
        const temps = feedingHistory.filter(f => f.ambientTemperature != null).map(f => f.ambientTemperature!);
        const avgTemp = temps.length > 0 ? temps.reduce((a, b) => a + b, 0) / temps.length : null;

        // Simple Health Algo (Mock)
        // Deduct points for irregular feedings or very long gaps
        let healthScore = 100;
        const hoursSinceLast = hoursBetween(new Date().toISOString(), sortedHistory[0].date);
        
        if (hoursSinceLast > 168) healthScore -= 60; // > 1 week
        else if (hoursSinceLast > 72) healthScore -= 30; // > 3 days
        else if (hoursSinceLast > 24) healthScore -= 10; // > 1 day
        
        if (avgFrequencyHours > 168) healthScore -= 20;

        return {
            avgFrequencyHours: avgFrequencyHours.toFixed(1),
            avgTemp: avgTemp ? avgTemp.toFixed(1) : 'N/A',
            totalFeedings: feedingHistory.length,
            healthScore: Math.max(0, Math.min(100, healthScore)),
            lastFedHours: hoursSinceLast.toFixed(0)
        };

    }, [levain]);

    if (!analysis) {
        return (
            <div className="rounded-xl border-2 border-dashed border-slate-200 bg-slate-50 p-8 text-center">
                <ChartBarIcon className="mx-auto h-10 w-10 text-slate-300 mb-2" />
                <h3 className="text-slate-900 font-medium">No insights available</h3>
                <p className="text-sm text-slate-500">Log at least 2 feedings to see analysis.</p>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                <h3 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
                    <SparklesIcon className="h-5 w-5 text-lime-500" />
                    Performance & Health
                </h3>
                
                <HealthBar score={analysis.healthScore} />

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    <StatCard 
                        label="Avg Frequency" 
                        value={`Every ${analysis.avgFrequencyHours}h`} 
                        icon={<ClockIcon className="h-5 w-5"/>}
                        colorClass="text-blue-600 bg-blue-500"
                    />
                    <StatCard 
                        label="Avg Temp" 
                        value={`${analysis.avgTemp}°C`} 
                        icon={<FireIcon className="h-5 w-5"/>}
                        colorClass="text-orange-600 bg-orange-500"
                    />
                     <StatCard 
                        label="Total Feedings" 
                        value={`${analysis.totalFeedings}`} 
                        subtext="Lifetime logs"
                        icon={<ChartBarIcon className="h-5 w-5"/>}
                        colorClass="text-purple-600 bg-purple-500"
                    />
                </div>
            </div>

            {/* Simple Activity Visualization */}
            <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                 <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wide mb-4">Recent Activity</h3>
                 <div className="flex items-end gap-1 h-24">
                    {levain.feedingHistory.slice(0, 20).reverse().map((log, idx) => (
                        <div 
                            key={idx} 
                            className="flex-1 bg-lime-400 rounded-t-sm hover:bg-lime-500 transition-colors relative group"
                            style={{ height: '60%' }} // Placeholder height, real logic would map ratio or amount
                        >
                             <div className="opacity-0 group-hover:opacity-100 absolute bottom-full left-1/2 -translate-x-1/2 mb-1 px-2 py-1 bg-slate-800 text-white text-xs rounded whitespace-nowrap pointer-events-none z-10">
                                {new Date(log.date).toLocaleDateString()}
                            </div>
                        </div>
                    ))}
                 </div>
                 <p className="text-xs text-slate-400 mt-2 text-center">Last 20 feedings</p>
            </div>
        </div>
    );
};

export default LevainInsights;