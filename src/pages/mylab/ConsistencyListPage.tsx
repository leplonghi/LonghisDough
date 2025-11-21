import React, { useState, useMemo } from 'react';
import { Page, TestSeries } from '@/types';
import MyLabLayout from './MyLabLayout';
import { useUser } from '@/contexts/UserProvider';
import { useTranslation } from '@/i18n';
import { FlaskIcon, PlusCircleIcon } from '@/components/ui/Icons';
import ConsistencySeriesModal from '@/components/mylab/ConsistencySeriesModal';

const ConsistencyListPage: React.FC<{ onNavigate: (page: Page, params?: string) => void }> = ({ onNavigate }) => {
    const { testSeries, addTestSeries, updateTestSeries } = useUser();
    const { t } = useTranslation();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingSeries, setEditingSeries] = useState<TestSeries | null>(null);

    const handleOpenModal = (series: TestSeries | null = null) => {
        setEditingSeries(series);
        setIsModalOpen(true);
    };

    // FIX: Make function async to handle promises from context.
    const handleSaveSeries = async (seriesData: Omit<TestSeries, 'id' | 'createdAt' | 'updatedAt' | 'relatedBakes'> | (Partial<TestSeries> & { id: string })) => {
        if ('id' in seriesData) {
            await updateTestSeries(seriesData);
        } else {
            await addTestSeries(seriesData);
        }
        setIsModalOpen(false);
    };

    const sortedSeries = useMemo(() => 
        [...testSeries].sort((a,b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()), 
    [testSeries]);

    return (
        <>
            <MyLabLayout activePage="mylab/consistency" onNavigate={onNavigate}>
                <div className="mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-2xl font-semibold tracking-tight text-neutral-900">Consistency Mode</h1>
                        <p className="mt-1 text-sm text-neutral-600">Plan and track test series with controlled variables.</p>
                    </div>
                    <button onClick={() => handleOpenModal()} className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-lg bg-lime-500 py-2 px-4 font-semibold text-white shadow-sm hover:bg-lime-600">
                        <PlusCircleIcon className="h-5 w-5"/>
                        Create New Series
                    </button>
                </div>

                {sortedSeries.length > 0 ? (
                    <div className="space-y-4">
                        {sortedSeries.map(series => (
                            <div key={series.id} className="rounded-lg bg-white p-4 border border-neutral-200 shadow-sm">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <h4 className="font-semibold text-neutral-800">{series.name}</h4>
                                        <p className="text-sm text-neutral-600 mt-1">{series.description}</p>
                                    </div>
                                    <button onClick={() => onNavigate(`mylab/consistency/${series.id}`)} className="text-sm font-semibold text-lime-600 hover:underline">
                                        View details
                                    </button>
                                </div>
                                <div className="mt-3 pt-3 border-t border-neutral-200 flex items-center gap-4 text-xs text-neutral-600">
                                    <span>Variable: <strong>{series.parameters.variable}</strong></span>
                                    <span>Steps: <strong>{series.parameters.steps.join(' / ')}</strong></span>
                                    <span>Bakes: <strong>{series.relatedBakes.length}</strong></span>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-12 rounded-xl border-2 border-dashed border-neutral-300">
                        <FlaskIcon className="mx-auto h-10 w-10 text-neutral-400" />
                        <p className="mt-4 font-medium text-slate-700">No test series created.</p>
                        <p className="text-sm text-neutral-600">Click "Create New Series" to start your first experiment.</p>
                    </div>
                )}
            </MyLabLayout>
            <ConsistencySeriesModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSave={handleSaveSeries}
                seriesToEdit={editingSeries}
            />
        </>
    );
};

export default ConsistencyListPage;