
import React, { useState, useMemo } from 'react';
import { Page, Levain } from '../../../types';
import { useUser } from '../../../contexts/UserProvider';
import LevainLayout from './LevainLayout';
import { 
  PlusCircleIcon, 
  SparklesIcon, 
  FireIcon, 
  BeakerIcon, 
  DocumentTextIcon,
  ChevronDownIcon,
  ClockIcon
} from '../../../components/IconComponents';
import LevainFeedingForm from './components/LevainFeedingForm';
import LevainProfile from './components/LevainProfile';
import LevainInsights from './components/LevainInsights';
import ProFeatureLock from '../../../components/ProFeatureLock';
import LevainAssistant from './components/LevainAssistant';

interface LevainDetailPageProps {
    levainId: string | null;
    onNavigate: (page: Page, params?: string) => void;
}

const DetailRow: React.FC<{ label: string; value: React.ReactNode }> = ({ label, value }) => (
    <div>
        <dt className="text-sm font-medium text-neutral-500">{label}</dt>
        <dd className="mt-1 font-semibold text-neutral-900">{value}</dd>
    </div>
);

const LevainDetailPage: React.FC<LevainDetailPageProps> = ({ levainId, onNavigate }) => {
    const { levains, hasProAccess } = useUser();
    const [activeTab, setActiveTab] = useState<'summary' | 'feedings' | 'profile' | 'insights'>('summary');
    const [isFeedModalOpen, setIsFeedModalOpen] = useState(false);
    const [isAssistantOpen, setIsAssistantOpen] = useState(false);
    const [visibleLogsCount, setVisibleLogsCount] = useState(5);

    const levain = useMemo(() => levains.find(l => l.id === levainId), [levains, levainId]);

    if (!levain) {
        return (
            <div className="p-8 text-center">
                <h2 className="text-xl font-bold">Levain not found</h2>
                <button onClick={() => onNavigate('mylab/levain')} className="mt-4 text-lime-600 hover:underline">Back to list</button>
            </div>
        );
    }
    
    const statusText = {
        ativo: "Your levain is responding well.",
        precisa_atencao: "It's been longer than ideal since the last feeding.",
        descanso: "This levain is in a prolonged rest.",
        arquivado: "Archived starter. You can reactivate it at any time.",
    };

    const renderSummary = () => (
        <div className="space-y-6">
            <div className="rounded-xl border border-neutral-200 bg-white p-6 shadow-sm">
                <h3 className="text-lg font-medium mb-4">Summary</h3>
                <dl className="grid grid-cols-2 md:grid-cols-3 gap-6">
                    <DetailRow label="Hydration" value={`${levain.hydration}%`} />
                    <DetailRow label="Base Flour" value={levain.baseFlourType || 'N/A'} />
                    <DetailRow label="Created on" value={new Date(levain.createdAt).toLocaleDateString()} />
                </dl>
                 <div className="mt-6 border-t border-neutral-200 pt-4">
                    <p className="text-sm text-neutral-600">{statusText[levain.status]}</p>
                 </div>
            </div>
            
            <ProFeatureLock origin='levain' title="Levain Assistant (AI)" description="Ask questions about your starter's health and routine.">
                <div className="rounded-xl border border-neutral-200 bg-white p-6 shadow-sm flex items-center justify-between">
                     <div>
                        <h3 className="font-bold text-neutral-900">Levain Assistant (AI)</h3>
                        <p className="text-sm text-neutral-500">Ask questions about your starter's health and routine.</p>
                     </div>
                    <button 
                        onClick={() => setIsAssistantOpen(true)}
                        className="flex items-center gap-2 rounded-lg bg-indigo-100 text-indigo-700 px-4 py-2 text-sm font-bold hover:bg-indigo-200"
                    >
                        <SparklesIcon className="h-5 w-5" />
                        Ask AI
                    </button>
                </div>
            </ProFeatureLock>
        </div>
    );
    
    const renderFeedings = () => {
        // Sort all logs by date descending
        const allLogs = [...levain.feedingHistory].sort((a,b) => new Date(b.date).getTime() - new Date(a.date).getTime());
        
        // Determine access limit
        const accessLimit = hasProAccess ? allLogs.length : 3;
        
        // Determine logs to display based on pagination and access
        const logsToShow = allLogs.slice(0, Math.min(visibleLogsCount, accessLimit));
        
        const hasMoreLogs = allLogs.length > visibleLogsCount;
        const isGatekeeping = !hasProAccess && allLogs.length > 3 && visibleLogsCount >= 3;

        return (
            <div className="rounded-xl border border-neutral-200 bg-white p-6 shadow-sm">
                <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-medium">Feedings History</h3>
                    <button onClick={() => setIsFeedModalOpen(true)} className="flex items-center gap-2 rounded-md bg-lime-500 py-1.5 px-3 text-sm font-semibold text-white shadow-sm hover:bg-lime-600">
                        <PlusCircleIcon className="h-5 w-5"/>
                        Log Feeding
                    </button>
                </div>
                
                {allLogs.length === 0 ? (
                    <div className="text-center py-12 bg-neutral-50 rounded-lg border border-dashed border-neutral-300">
                        <BeakerIcon className="h-10 w-10 text-neutral-300 mx-auto mb-3" />
                        <p className="text-sm text-neutral-500">No feedings recorded yet.</p>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {logsToShow.map(log => (
                            <div key={log.id} className="rounded-lg border border-neutral-200 bg-neutral-50 p-4 transition-all hover:bg-white hover:shadow-sm hover:border-lime-200">
                                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                                    <div className="flex items-center gap-2">
                                        <ClockIcon className="h-4 w-4 text-neutral-400" />
                                        <span className="font-semibold text-neutral-800">
                                            {new Date(log.date).toLocaleDateString()} 
                                            <span className="text-neutral-400 font-normal ml-2 text-xs">
                                                {new Date(log.date).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                                            </span>
                                        </span>
                                    </div>
                                    {log.ratio && (
                                        <span className="inline-flex items-center rounded-full bg-white border border-neutral-200 px-2.5 py-0.5 text-xs font-medium text-neutral-600">
                                            Ratio: {log.ratio}
                                        </span>
                                    )}
                                </div>
                                
                                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm mb-3">
                                    <div>
                                        <span className="block text-xs text-neutral-500">Flour</span>
                                        <span className="font-medium">{log.flourAmount}g</span>
                                    </div>
                                    <div>
                                        <span className="block text-xs text-neutral-500">Water</span>
                                        <span className="font-medium">{log.waterAmount}g</span>
                                    </div>
                                    <div>
                                        <span className="block text-xs text-neutral-500">Temp</span>
                                        <span className="font-medium flex items-center gap-1">
                                            {log.ambientTemperature ? (
                                                <>
                                                    <FireIcon className="h-3 w-3 text-orange-400" />
                                                    {log.ambientTemperature}°C
                                                </>
                                            ) : 'N/A'}
                                        </span>
                                    </div>
                                    <div>
                                        <span className="block text-xs text-neutral-500">Type</span>
                                        <span className="font-medium truncate" title={log.flourType}>{log.flourType || 'N/A'}</span>
                                    </div>
                                </div>

                                {log.notes && (
                                    <div className="flex items-start gap-2 pt-3 border-t border-neutral-200/60">
                                        <DocumentTextIcon className="h-4 w-4 text-neutral-400 mt-0.5 flex-shrink-0" />
                                        <p className="text-xs text-neutral-600 italic">{log.notes}</p>
                                    </div>
                                )}
                            </div>
                        ))}

                        {/* Load More Button */}
                        {hasMoreLogs && !isGatekeeping && (
                            <button 
                                onClick={() => setVisibleLogsCount(prev => prev + 5)}
                                className="w-full py-3 text-sm text-lime-600 font-semibold hover:bg-lime-50 rounded-lg transition-colors flex items-center justify-center gap-1"
                            >
                                Show Older Feedings
                                <ChevronDownIcon className="h-4 w-4" />
                            </button>
                        )}

                        {/* Pro Lock for History */}
                        {isGatekeeping && (
                            <ProFeatureLock origin='levain' title="Full History (Pro)" description="Unlock unlimited feeding history logs.">
                                <div className="p-6 text-center bg-neutral-100 rounded-lg border-2 border-dashed border-neutral-200">
                                    <p className="text-sm text-neutral-500 mb-2">{allLogs.length - 3} older logs hidden.</p>
                                    <span className="text-sm font-bold text-lime-600">Upgrade to view all history</span>
                                </div>
                            </ProFeatureLock>
                        )}
                    </div>
                )}
            </div>
        );
    };
    
    const renderTabContent = () => {
        switch (activeTab) {
            case 'summary': return renderSummary();
            case 'feedings': return renderFeedings();
            case 'profile': return <LevainProfile levain={levain} />;
            case 'insights': return (
                <ProFeatureLock origin='levain' title="Advanced Levain Tools (Pro)" description="Unlock multiple starters, analytics and smart reminders with DoughLabPro Pro.">
                    <LevainInsights levain={levain} />
                </ProFeatureLock>
            );
            default: return null;
        }
    }

    return (
        <>
            <LevainLayout levainName={levain.name} activeTab={activeTab} onTabChange={setActiveTab}>
                {renderTabContent()}
            </LevainLayout>
            <LevainFeedingForm 
                isOpen={isFeedModalOpen}
                onClose={() => setIsFeedModalOpen(false)}
                levainId={levain.id}
            />
            <LevainAssistant
                isOpen={isAssistantOpen}
                onClose={() => setIsAssistantOpen(false)}
                levain={levain}
            />
        </>
    );
};

export default LevainDetailPage;
