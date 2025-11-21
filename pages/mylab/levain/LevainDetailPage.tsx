import React, { useState, useMemo } from 'react';
import { Page, Levain } from '@/types';
import { useUser } from '@/contexts/UserProvider';
import LevainLayout from './LevainLayout';
import { PlusCircleIcon, SparklesIcon } from '@/components/ui/Icons';
import LevainFeedingForm from './components/LevainFeedingForm';
import LevainProfile from './components/LevainProfile';
import LevainInsights from './components/LevainInsights';
import ProFeatureLock from '@/components/ui/ProFeatureLock';
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
            
            <div className="rounded-xl border border-neutral-200 bg-white p-6 shadow-sm flex items-center justify-between">
                 <div>
                    <h3 className="font-bold text-neutral-900">Levain Assistant (AI)</h3>
                    <p className="text-sm text-neutral-500">Ask questions about your starter's health and routine.</p>
                 </div>
                 <ProFeatureLock origin='levain' featureName="AI Assistant">
                    <button 
                        onClick={() => setIsAssistantOpen(true)}
                        className="flex items-center gap-2 rounded-lg bg-indigo-100 text-indigo-700 px-4 py-2 text-sm font-bold hover:bg-indigo-200"
                    >
                        <SparklesIcon className="h-5 w-5" />
                        Ask AI
                    </button>
                 </ProFeatureLock>
            </div>
        </div>
    );
    
    const renderFeedings = () => {
        const historyToShow = hasProAccess ? levain.feedingHistory : levain.feedingHistory.slice(0, 3);
        return (
            <div className="rounded-xl border border-neutral-200 bg-white p-6 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-medium">Feedings</h3>
                    <button onClick={() => setIsFeedModalOpen(true)} className="flex items-center gap-2 rounded-md bg-lime-500 py-1.5 px-3 text-sm font-semibold text-white shadow-sm hover:bg-lime-600">
                        <PlusCircleIcon className="h-5 w-5"/>
                        Log Feeding
                    </button>
                </div>
                {levain.feedingHistory.length === 0 ? (
                    <p className="text-sm text-center py-8 text-neutral-500">No feedings recorded yet.</p>
                ) : (
                    <div className="space-y-4 max-h-96 overflow-y-auto pr-2">
                        {historyToShow.sort((a,b) => new Date(b.date).getTime() - new Date(a.date).getTime()).map(log => (
                            <div key={log.id} className="rounded-md bg-neutral-50 p-3 text-sm">
                                <p className="font-semibold">{new Date(log.date).toLocaleString()}</p>
                                <div className="flex gap-4 mt-1 text-neutral-600">
                                <span>Ratio: {log.ratio || 'N/A'}</span>
                                <span>Flour: {log.flourType || 'N/A'}</span>
                                </div>
                            </div>
                        ))}
                        {!hasProAccess && levain.feedingHistory.length > 3 && (
                            <div className="p-4 text-center bg-neutral-50 rounded-lg">
                                <p className="text-sm text-neutral-500 mb-2">Older history is hidden.</p>
                                <ProFeatureLock origin='levain' featureName="Full History">
                                    <button className="text-sm font-bold text-lime-600 hover:underline">Unlock Full History</button>
                                </ProFeatureLock>
                            </div>
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
                <ProFeatureLock origin='levain' featureName="Levain Insights">
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