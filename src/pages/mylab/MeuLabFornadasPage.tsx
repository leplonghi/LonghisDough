import React, { useState, useMemo } from 'react';
import { DoughConfig, Page, Batch, RecipeStyle, OvenType, BatchStatus } from '@/types';
import { useUser } from '@/contexts/UserProvider';
import { useTranslation } from '@/i18n';
import MyLabLayout from './MyLabLayout';
import { BatchesIcon, CalculatorIcon, LockClosedIcon } from '@/components/ui/Icons';
import { OVEN_TYPE_OPTIONS } from '@/constants';
import { useToast } from '@/components/ToastProvider';

interface MeuLabFornadasPageProps {
  onLoadAndNavigate: (config: Partial<DoughConfig>) => void;
  onNavigate: (page: Page, params?: string) => void;
  onCreateDraftBatch: () => void;
}

// Filter state interface
interface FornadasFilters {
    style: RecipeStyle | 'ALL';
    period: '7d' | '30d' | '6m' | 'ALL';
    oven: OvenType | 'ALL';
    minHydration: string;
    maxHydration: string;
}

// Result Tag component
const ResultTag: React.FC<{ rating?: number }> = ({ rating }) => {
    if (!rating || rating < 1) return null;

    if (rating >= 4.5) {
        return <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-green-100 text-green-800">Great</span>;
    }
    if (rating >= 3) {
        return <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-blue-100 text-blue-800">Good</span>;
    }
    return <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-yellow-100 text-yellow-800">Adjust</span>;
};


const MeuLabFornadasPage: React.FC<MeuLabFornadasPageProps> = ({ 
    onNavigate, 
    onCreateDraftBatch,
    onLoadAndNavigate,
}) => {
    const { t } = useTranslation();
    const { batches, hasProAccess, openPaywall } = useUser();
    const { addToast } = useToast();
    const [filters, setFilters] = useState<FornadasFilters>({
        style: 'ALL',
        period: 'ALL',
        oven: 'ALL',
        minHydration: '',
        maxHydration: '',
    });

    const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFilters(prev => ({ ...prev, [name]: value }));
    };
    
    const handleCreateDraft = () => {
        const savedBatches = batches.filter(b => b.status !== BatchStatus.DRAFT);
        if (!hasProAccess && savedBatches.length >= 1) {
            addToast("Free plan includes 1 saved bake. Pro never forgets your best dough.", "error");
            openPaywall('mylab');
            return;
        }
        onCreateDraftBatch();
    };
    
    const uniqueStylesInBatches = useMemo(() => {
        const styles = new Set(batches.filter(b => b.status !== BatchStatus.DRAFT).map(b => b.doughConfig.recipeStyle));
        return Array.from(styles);
    }, [batches]);

    const filteredBatches = useMemo(() => {
        const now = new Date();
        return batches
            .filter(b => b.status !== BatchStatus.DRAFT) // Don't show drafts
            .filter(batch => {
                // Style filter
                if (filters.style !== 'ALL' && batch.doughConfig.recipeStyle !== filters.style) {
                    return false;
                }
                // Period filter
                if (filters.period !== 'ALL') {
                    const batchDate = new Date(batch.createdAt);
                    let daysLimit = 0;
                    if (filters.period === '7d') daysLimit = 7;
                    if (filters.period === '30d') daysLimit = 30;
                    if (filters.period === '6m') daysLimit = 180;
                    const diffDays = (now.getTime() - batchDate.getTime()) / (1000 * 3600 * 24);
                    if (diffDays > daysLimit) return false;
                }
                // Oven filter
                if (filters.oven !== 'ALL' && (batch.ovenType !== filters.oven)) {
                    return false;
                }
                // Hydration filter
                const minHyd = parseFloat(filters.minHydration);
                const maxHyd = parseFloat(filters.maxHydration);
                if (!isNaN(minHyd) && batch.doughConfig.hydration < minHyd) {
                    return false;
                }
                if (!isNaN(maxHyd) && batch.doughConfig.hydration > maxHyd) {
                    return false;
                }
                return true;
            })
            .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    }, [batches, filters]);

    const periodOptions = [
        { value: 'ALL', label: 'All Time' },
        { value: '7d', label: 'Last 7 days' },
        { value: '30d', label: 'Last 30 days' },
        { value: '6m', label: 'Last 6 months' },
    ];
    
    const hasReachedFreeLimit = !hasProAccess && batches.filter(b => b.status !== BatchStatus.DRAFT).length >= 1;

    return (
        <MyLabLayout activePage="mylab/fornadas" onNavigate={onNavigate}>
            <div className="mb-6">
                <h1 className="text-2xl font-semibold tracking-tight text-neutral-900">
                    My Bakes
                </h1>
                <p className="mt-1 text-sm text-neutral-600">
                    Your complete baking history.
                </p>
            </div>
            
            {/* Filters */}
             {batches.filter(b => b.status !== BatchStatus.DRAFT).length > 0 && (
                <div className="mb-6 grid grid-cols-2 md:grid-cols-4 gap-4 p-4 md:p-6 rounded-xl bg-neutral-50 border border-neutral-200 shadow-sm">
                    <div>
                        <label className="block text-xs font-medium text-neutral-600 mb-1">Style</label>
                        <select name="style" value={filters.style} onChange={handleFilterChange} className="w-full rounded-md border-neutral-300 bg-white text-sm py-2 text-slate-700">
                            <option value="ALL">All</option>
                            {uniqueStylesInBatches.map(style => (
                                <option key={style} value={style}>{t(`form.${style.toLowerCase()}`, { defaultValue: style })}</option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label className="block text-xs font-medium text-neutral-600 mb-1">Period</label>
                        <select name="period" value={filters.period} onChange={handleFilterChange} className="w-full rounded-md border-neutral-300 bg-white text-sm py-2 text-slate-700">
                            {periodOptions.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
                        </select>
                    </div>
                    <div>
                        <label className="block text-xs font-medium text-neutral-600 mb-1">Oven</label>
                        <select name="oven" value={filters.oven} onChange={handleFilterChange} className="w-full rounded-md border-neutral-300 bg-white text-sm py-2 text-slate-700">
                            <option value="ALL">All</option>
                            {OVEN_TYPE_OPTIONS.map(opt => <option key={opt.value} value={opt.value}>{t(opt.labelKey)}</option>)}
                        </select>
                    </div>
                    <div>
                        <label className="block text-xs font-medium text-neutral-600 mb-1">Hydration (%)</label>
                        <div className="flex items-center gap-2">
                            <input type="number" name="minHydration" value={filters.minHydration} onChange={handleFilterChange} placeholder="Min" className="w-1/2 rounded-md border-neutral-300 bg-white text-sm py-2 text-slate-700" />
                            <input type="number" name="maxHydration" value={filters.maxHydration} onChange={handleFilterChange} placeholder="Max" className="w-1/2 rounded-md border-neutral-300 bg-white text-sm py-2 text-slate-700" />
                        </div>
                    </div>
                </div>
            )}

            {batches.filter(b => b.status !== BatchStatus.DRAFT).length === 0 ? (
                 <div className="flex h-64 items-center justify-center rounded-xl border border-neutral-200 bg-neutral-50 p-6 shadow-sm text-center">
                    <div>
                        <BatchesIcon className="h-12 w-12 text-neutral-400 mx-auto mb-4" />
                        <h2 className="text-lg font-medium text-neutral-800">No bakes recorded yet.</h2>
                        <p className="mt-2 text-sm text-neutral-600">Record your first bake to track your progress.</p>
                        <button onClick={handleCreateDraft} className="mt-6 inline-flex items-center gap-2 rounded-lg bg-lime-500 py-2 px-4 font-semibold text-white shadow-md">
                           <CalculatorIcon className="h-5 w-5"/> Log Bake
                        </button>
                    </div>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredBatches.map(batch => (
                        <div key={batch.id} className="rounded-xl border border-neutral-200 bg-white shadow-sm flex flex-col">
                           <div className="p-5 flex-grow">
                             <div className="flex justify-between items-start">
                               <h3 className="text-lg font-medium text-neutral-900 pr-2">{batch.name}</h3>
                               <ResultTag rating={batch.rating} />
                             </div>
                             <p className="text-sm font-semibold text-lime-600 mt-1">{t(`form.${batch.doughConfig.recipeStyle.toLowerCase()}`, { defaultValue: batch.doughConfig.recipeStyle })}</p>
                             <p className="text-xs text-neutral-600 mt-1">{new Date(batch.createdAt).toLocaleDateString()}</p>
                             
                             <div className="mt-4 grid grid-cols-2 gap-y-2 text-sm border-t border-neutral-200 pt-4">
                                <div className="text-neutral-600">Hydration</div>
                                <div className="font-semibold text-right text-slate-700">{batch.doughConfig.hydration}%</div>
                                <div className="text-neutral-600">Yeast</div>
                                <div className="font-semibold text-right text-slate-700">{t(`form.yeast_${batch.doughConfig.yeastType.toLowerCase()}`)}</div>
                                <div className="text-neutral-600">Oven</div>
                                <div className="font-semibold text-right text-slate-700">{batch.ovenType ? t(`profile.ovens.types.${batch.ovenType.toLowerCase()}`) : 'N/A'}</div>
                             </div>
                           </div>
                           <div className="p-3 bg-neutral-50 rounded-b-xl border-t border-neutral-200">
                             <button onClick={() => onNavigate('batch', batch.id)} className="w-full text-center text-sm font-semibold text-lime-600 hover:underline">
                                View Details &rarr;
                             </button>
                           </div>
                        </div>
                    ))}
                    
                    {/* Pro Slot */}
                    {hasReachedFreeLimit && (
                         <button 
                            onClick={() => openPaywall('mylab')}
                            className="flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-lime-200 bg-lime-50/50 p-6 shadow-sm transition-all hover:bg-lime-50 hover:border-lime-300 hover:shadow-md group min-h-[250px]"
                        >
                            <div className="p-4 bg-lime-100 rounded-full text-lime-600 mb-4 group-hover:scale-110 transition-transform">
                                <BatchesIcon className="h-8 w-8" />
                            </div>
                            <h3 className="font-bold text-lime-800 text-lg flex items-center gap-2">
                                Unlimited Batches <LockClosedIcon className="h-4 w-4" />
                            </h3>
                            <p className="mt-2 text-xs text-center text-lime-700 max-w-[200px]">
                                Unlimited saved bakes with Pro. Free plan includes 1 saved bake.
                            </p>
                        </button>
                    )}
                </div>
            )}
        </MyLabLayout>
    );
};

export default MeuLabFornadasPage;