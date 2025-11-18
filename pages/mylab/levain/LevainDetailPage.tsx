import React, { useState, useMemo } from 'react';
import { Page, Levain } from '../../../types';
import { useUser } from '../../../contexts/UserProvider';
import LevainLayout from './LevainLayout';
import { PlusCircleIcon } from '../../../components/IconComponents';
import LevainFeedingForm from './components/LevainFeedingForm';
import LevainProfile from './components/LevainProfile';
import LevainInsights from './components/LevainInsights';

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
    const { levains } = useUser();
    const [activeTab, setActiveTab] = useState<'summary' | 'feedings' | 'profile' | 'insights'>('summary');
    const [isFeedModalOpen, setIsFeedModalOpen] = useState(false);

    const levain = useMemo(() => levains.find(l => l.id === levainId), [levains, levainId]);

    if (!levain) {
        return (
            <div className="p-8 text-center">
                <h2 className="text-xl font-bold">Levain não encontrado</h2>
                <button onClick={() => onNavigate('mylab/levain')} className="mt-4 text-lime-600 hover:underline">Voltar para a lista</button>
            </div>
        );
    }
    
    const statusText = {
        ativo: "Seu levain está respondendo bem.",
        precisa_atencao: "Faz mais tempo do que o ideal desde a última alimentação.",
        descanso: "Este levain está em descanso prolongado.",
        arquivado: "Starter arquivado. Você pode reativá-lo a qualquer momento.",
    };

    const renderSummary = () => (
        <div className="space-y-6">
            <div className="rounded-xl border border-neutral-200 bg-white p-6 shadow-sm">
                <h3 className="text-lg font-medium mb-4">Resumo</h3>
                <dl className="grid grid-cols-2 md:grid-cols-3 gap-6">
                    <DetailRow label="Hidratação" value={`${levain.hydration}%`} />
                    <DetailRow label="Farinha base" value={levain.baseFlourType || 'N/A'} />
                    <DetailRow label="Criado em" value={new Date(levain.createdAt).toLocaleDateString()} />
                </dl>
                 <div className="mt-6 border-t border-neutral-200 pt-4">
                    <p className="text-sm text-neutral-600">{statusText[levain.status]}</p>
                 </div>
            </div>
        </div>
    );
    
    const renderFeedings = () => (
        <div className="rounded-xl border border-neutral-200 bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
                 <h3 className="text-lg font-medium">Alimentações</h3>
                 <button onClick={() => setIsFeedModalOpen(true)} className="flex items-center gap-2 rounded-md bg-lime-500 py-1.5 px-3 text-sm font-semibold text-white shadow-sm hover:bg-lime-600">
                     <PlusCircleIcon className="h-5 w-5"/>
                     Registrar alimentação
                 </button>
            </div>
             {levain.feedingHistory.length === 0 ? (
                <p className="text-sm text-center py-8 text-neutral-500">Nenhuma alimentação registrada ainda.</p>
            ) : (
                <div className="space-y-4 max-h-96 overflow-y-auto pr-2">
                    {[...levain.feedingHistory].sort((a,b) => new Date(b.date).getTime() - new Date(a.date).getTime()).map(log => (
                        <div key={log.id} className="rounded-md bg-neutral-50 p-3 text-sm">
                            <p className="font-semibold">{new Date(log.date).toLocaleString()}</p>
                            <div className="flex gap-4 mt-1 text-neutral-600">
                               <span>Proporção: {log.ratio || 'N/A'}</span>
                               <span>Farinha: {log.flourType || 'N/A'}</span>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
    
    const renderTabContent = () => {
        switch (activeTab) {
            case 'summary': return renderSummary();
            case 'feedings': return renderFeedings();
            case 'profile': return <LevainProfile levain={levain} />;
            case 'insights': return <LevainInsights levain={levain} />;
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
        </>
    );
};

export default LevainDetailPage;