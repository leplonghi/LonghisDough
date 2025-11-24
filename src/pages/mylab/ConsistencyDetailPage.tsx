
import React, { useState, useMemo } from 'react';
import { Page, TestSeries, Batch } from '@/types';
import MyLabLayout from './MyLabLayout';
import { useUser } from '@/contexts/UserProvider';
import { FlaskIcon, SparklesIcon, BatchesIcon, PlusCircleIcon } from '@/components/ui/Icons';

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
                <p>Test series not found.</p>
            </MyLabLayout>
        );
    }
    
    return (
        <MyLabLayout activePage="mylab/consistency" onNavigate={onNavigate}>
             <div className="mb-6">
                <button 
                    onClick={() => window.history.back()} 
                    className="mb-4 inline-flex items-center gap-1 text-sm font-medium text-slate-500 hover:text-slate-800 transition-colors"
                >
                    &larr; Back to Series
                </button>
                <h1 className="text-2xl font-semibold tracking-tight text-neutral-900">{series.name}</h1>
                <p className="mt-1 text-sm text-neutral-600">Summary of your controlled test series.</p>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Main Content */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Associated Bakes */}
                    <div className="rounded-xl border border-neutral-200 bg-white p-6 shadow-sm">
                        <h3 className="text-lg font-medium text-neutral-900 mb-4">Associated Bakes ({relatedBakes.length})</h3>
                        {relatedBakes.length > 0 ? (
                            <div className="space-y-3">
                                {relatedBakes.map(bake => (
                                    <div key={bake.id} onClick={() => onNavigate('batch', bake.id)} className="cursor-pointer p-3 rounded-md bg-neutral-50 hover:bg-neutral-100">
                                        <p className="font-semibold text-slate-800">{bake.name}</p>
                                        <p className="text-xs text-neutral-600">{new Date(bake.createdAt).toLocaleDateString()}</p>
                                    </div>
                                ))}
                            </div>
                        ) : <p className="text-sm text-center text-neutral-600 py-4">No bakes associated yet.</p>}
                        
                         <div className="mt-4 pt-4 border-t border-neutral-200 flex flex-col sm:flex-row items-center gap-3">
                            <select value={selectedBake} onChange={e => setSelectedBake(e.target.value)} className="w-full flex-grow rounded-md border-neutral-300 bg-white text-sm py-2 text-slate-700">
                                <option value="">Select a bake to associate...</option>
                                {unattachedBakes.map(b => <option key={b.id} value={b.id}>{b.name}</option>)}
                            </select>
                             <button onClick={handleAttachBake} disabled={!selectedBake} className="w-full sm:w-auto flex-shrink-0 flex items-center justify-center gap-2 rounded-lg bg-lime-500 py-2 px-3 text-sm font-semibold text-white shadow-sm disabled:bg-slate-400">
                                <PlusCircleIcon className="h-5 w-5"/> Associate
                            </button>
                        </div>
                    </div>

                    {/* Notes */}
                    <div className="rounded-xl border border-neutral-200 bg-white p-6 shadow-sm">
                        <h3 className="text-lg font-medium text-neutral-900 mb-4">Series Notes</h3>
                        {isEditingNotes ? (
                             <div>
                                <textarea rows={5} value={notes} onChange={e => setNotes(e.target.value)} className="w-full rounded-md border-neutral-300 bg-white text-sm text-slate-700" />
                                <div className="flex justify-end gap-2 mt-2">
                                    <button onClick={() => setIsEditingNotes(false)} className="text-sm font-semibold text-neutral-600">Cancel</button>
                                    <button onClick={handleSaveNotes} className="text-sm font-semibold text-lime-600">Save</button>
                                </div>
                             </div>
                        ) : (
                             <div onClick={() => setIsEditingNotes(true)} className="cursor-pointer prose-sm text-neutral-600 min-h-[5rem]">
                                {notes || <p className="italic text-slate-500">Click to add notes...</p>}
                            </div>
                        )}
                    </div>

                     {/* AI Analysis Placeholder */}
                    <div className="rounded-xl border-2 border-dashed border-neutral-300 p-6 text-center">
                        <SparklesIcon className="mx-auto h-8 w-8 text-neutral-400" />
                        <h3 className="mt-2 text-lg font-medium text-neutral-800">AI Analysis</h3>
                        <p className="mt-1 text-sm text-neutral-600">Coming soon: AI will analyze your bake results and generate a comparative report.</p>
                    </div>
                </div>

                {/* Sidebar */}
                <div className="lg:col-span-1">
                     <div className="rounded-xl border border-neutral-200 bg-neutral-50 p-6 shadow-sm sticky top-24">
                        <h3 className="text-lg font-medium text-neutral-900 mb-4">Test Parameters</h3>
                        <div className="space-y-3 text-sm">
                            <p className="text-slate-700"><strong className="text-neutral-600">Variable:</strong> {series.parameters.variable}</p>
                             <div>
                                <strong className="text-neutral-600">Steps tested:</strong>
                                <ul className="list-disc list-inside mt-1 text-slate-700">
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
