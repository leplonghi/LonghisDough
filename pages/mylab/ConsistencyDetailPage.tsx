import React, { useState, useMemo } from 'react';
import { Page, TestSeries, Batch } from '../../types';
import MyLabLayout from './MyLabLayout';
import { useUser } from '../../contexts/UserProvider';
import { FlaskIcon, SparklesIcon, BatchesIcon, PlusCircleIcon } from '../../components/IconComponents';

interface ConsistencyDetailPageProps {
  seriesId: string | null;
  onNavigate: (page: Page, params?: string) => void;
}

const ConsistencyDetailPage: React.FC<ConsistencyDetailPageProps> = ({ seriesId, onNavigate }) => {
    const { testSeries, batches, attachBakeToSeries, updateTestSeries } = useUser();
    const [notes, setNotes] = useState('');
    const [isEditingNotes, setIsEditingNotes] = useState(false);
    const [selectedBake, setSelectedBake] = useState('');

    const series = useMemo(() => testSeries.find(s => s.id === seriesId), [testSeries, seriesId]);

    React.useEffect(() => {
        if (series) {
            setNotes(series.description);
        }
    }, [series]);

    const relatedBakes = useMemo(() => {
        if (!series) return [];
        return series.relatedBakes
            .map(bakeId => batches.find(b => b.id === bakeId))
            .filter((b): b is Batch => b !== undefined)
            .sort((a,b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    }, [series, batches]);

    const unattachedBakes = useMemo(() => {
        if (!series) return [];
        return batches.filter(b => !series.relatedBakes.includes(b.id))
            .sort((a,b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
            .slice(0, 20); // Limit to recent bakes
    }, [series, batches]);

    const handleAttachBake = () => {
        if (seriesId && selectedBake) {
            attachBakeToSeries(seriesId, selectedBake);
            setSelectedBake('');
        }
    };
    
    const handleSaveNotes = () => {
        if (series) {
            updateTestSeries({ id: series.id, description: notes });
            setIsEditingNotes(false);
        }
    };

    if (!series) {
        return (
            <MyLabLayout activePage="mylab/consistency" onNavigate={onNavigate}>
                <p>Série de testes não encontrada.</p>
            </MyLabLayout>
        );
    }
    
    return (
        <MyLabLayout activePage="mylab/consistency" onNavigate={onNavigate}>
             <div className="mb-6">
                <h1 className="text-2xl font-semibold tracking-tight text-neutral-900">{series.name}</h1>
                <p className="mt-1 text-sm text-neutral-500">Resumo da sua série de testes controlados.</p>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Main Content */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Fornadas associadas */}
                    <div className="rounded-xl border border-neutral-200 bg-white p-6 shadow-sm">
                        <h3 className="text-lg font-medium text-neutral-900 mb-4">Fornadas Associadas ({relatedBakes.length})</h3>
                        {relatedBakes.length > 0 ? (
                            <div className="space-y-3">
                                {relatedBakes.map(bake => (
                                    <div key={bake.id} onClick={() => onNavigate('batch', bake.id)} className="cursor-pointer p-3 rounded-md bg-neutral-50 hover:bg-neutral-100">
                                        <p className="font-semibold">{bake.name}</p>
                                        <p className="text-xs text-neutral-500">{new Date(bake.createdAt).toLocaleDateString()}</p>
                                    </div>
                                ))}
                            </div>
                        ) : <p className="text-sm text-center text-neutral-500 py-4">Nenhuma fornada associada ainda.</p>}
                        
                         <div className="mt-4 pt-4 border-t border-neutral-200 flex flex-col sm:flex-row items-center gap-3">
                            <select value={selectedBake} onChange={e => setSelectedBake(e.target.value)} className="w-full flex-grow rounded-md border-neutral-300 bg-white text-sm py-2">
                                <option value="">Selecione uma fornada para associar...</option>
                                {unattachedBakes.map(b => <option key={b.id} value={b.id}>{b.name}</option>)}
                            </select>
                             <button onClick={handleAttachBake} disabled={!selectedBake} className="w-full sm:w-auto flex-shrink-0 flex items-center justify-center gap-2 rounded-lg bg-lime-500 py-2 px-3 text-sm font-semibold text-white shadow-sm disabled:bg-slate-400">
                                <PlusCircleIcon className="h-5 w-5"/> Associar
                            </button>
                        </div>
                    </div>

                    {/* Notas */}
                    <div className="rounded-xl border border-neutral-200 bg-white p-6 shadow-sm">
                        <h3 className="text-lg font-medium text-neutral-900 mb-4">Notas da Série</h3>
                        {isEditingNotes ? (
                             <div>
                                <textarea rows={5} value={notes} onChange={e => setNotes(e.target.value)} className="w-full rounded-md border-neutral-300 bg-white text-sm" />
                                <div className="flex justify-end gap-2 mt-2">
                                    <button onClick={() => setIsEditingNotes(false)} className="text-sm font-semibold text-neutral-600">Cancelar</button>
                                    <button onClick={handleSaveNotes} className="text-sm font-semibold text-lime-600">Salvar</button>
                                </div>
                             </div>
                        ) : (
                             <div onClick={() => setIsEditingNotes(true)} className="cursor-pointer prose-sm text-neutral-600 min-h-[5rem]">
                                {notes || <p className="italic">Clique para adicionar notas...</p>}
                            </div>
                        )}
                    </div>

                     {/* AI Analysis Placeholder */}
                    <div className="rounded-xl border-2 border-dashed border-neutral-300 p-6 text-center">
                        <SparklesIcon className="mx-auto h-8 w-8 text-neutral-400" />
                        <h3 className="mt-2 text-lg font-medium text-neutral-800">Análise da IA</h3>
                        <p className="mt-1 text-sm text-neutral-500">Em breve: A IA irá analisar os resultados das suas fornadas e gerar um relatório comparativo.</p>
                    </div>
                </div>

                {/* Sidebar */}
                <div className="lg:col-span-1">
                     <div className="rounded-xl border border-neutral-200 bg-neutral-50 p-6 shadow-sm sticky top-24">
                        <h3 className="text-lg font-medium text-neutral-900 mb-4">Parâmetros do Teste</h3>
                        <div className="space-y-3 text-sm">
                            <p><strong className="text-neutral-500">Variável:</strong> {series.parameters.variable}</p>
                             <div>
                                <strong className="text-neutral-500">Passos testados:</strong>
                                <ul className="list-disc list-inside mt-1">
                                    {series.parameters.steps.map((step, i) => <li key={i}>{step}</li>)}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </MyLabLayout>
    );
};

export default ConsistencyDetailPage;