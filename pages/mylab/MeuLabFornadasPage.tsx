
import React, { useState, useMemo } from 'react';
import { DoughConfig, Page, Batch, RecipeStyle, OvenType, BatchStatus } from '../../types';
import { useUser } from '../../contexts/UserProvider';
import { useTranslation } from '../../i18n';
import MyLabLayout from './MyLabLayout';
import { BatchesIcon, CalculatorIcon } from '../../components/IconComponents';
import { OVEN_TYPE_OPTIONS } from '../../constants';

interface MeuLabFornadasPageProps {
  onLoadAndNavigate: (config: DoughConfig) => void;
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
        return <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300">Ótima</span>;
    }
    if (rating >= 3) {
        return <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300">Boa</span>;
    }
    return <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-300">Ajustar</span>;
};


const MeuLabFornadasPage: React.FC<MeuLabFornadasPageProps> = ({ 
    onNavigate, 
    onCreateDraftBatch,
}) => {
    const { t } = useTranslation();
    const { batches } = useUser();
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
        { value: 'ALL', label: 'Desde o início' },
        { value: '7d', label: 'Últimos 7 dias' },
        { value: '30d', label: 'Últimos 30 dias' },
        { value: '6m', label: 'Últimos 6 meses' },
    ];
    
    return (
        <MyLabLayout activePage="mylab/fornadas" onNavigate={onNavigate}>
            <div className="mb-6">
                <h1 className="text-2xl font-semibold tracking-tight text-neutral-900 dark:text-white">
                    Fornadas
                </h1>
                <p className="mt-1 text-sm text-neutral-500">
                    Seu histórico completo de massas.
                </p>
            </div>
            
            {/* Filters */}
             {batches.filter(b => b.status !== BatchStatus.DRAFT).length > 0 && (
                <div className="mb-6 grid grid-cols-2 md:grid-cols-4 gap-4 p-4 md:p-6 rounded-xl bg-neutral-50 dark:bg-neutral-800/50 border border-neutral-200 dark:border-neutral-700 shadow-sm">
                    <div>
                        <label className="block text-xs font-medium text-neutral-500 dark:text-neutral-400 mb-1">Estilo</label>
                        <select name="style" value={filters.style} onChange={handleFilterChange} className="w-full rounded-md border-neutral-300 bg-white dark:bg-neutral-700 text-sm py-2">
                            <option value="ALL">Todos</option>
                            {uniqueStylesInBatches.map(style => (
                                <option key={style} value={style}>{t(`form.${style.toLowerCase()}`, { defaultValue: style })}</option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label className="block text-xs font-medium text-neutral-500 dark:text-neutral-400 mb-1">Período</label>
                        <select name="period" value={filters.period} onChange={handleFilterChange} className="w-full rounded-md border-neutral-300 bg-white dark:bg-neutral-700 text-sm py-2">
                            {periodOptions.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
                        </select>
                    </div>
                    <div>
                        <label className="block text-xs font-medium text-neutral-500 dark:text-neutral-400 mb-1">Forno</label>
                        <select name="oven" value={filters.oven} onChange={handleFilterChange} className="w-full rounded-md border-neutral-300 bg-white dark:bg-neutral-700 text-sm py-2">
                            <option value="ALL">Todos</option>
                            {OVEN_TYPE_OPTIONS.map(opt => <option key={opt.value} value={opt.value}>{t(opt.labelKey)}</option>)}
                        </select>
                    </div>
                    <div>
                        <label className="block text-xs font-medium text-neutral-500 dark:text-neutral-400 mb-1">Hidratação (%)</label>
                        <div className="flex items-center gap-2">
                            <input type="number" name="minHydration" value={filters.minHydration} onChange={handleFilterChange} placeholder="Min" className="w-1/2 rounded-md border-neutral-300 bg-white dark:bg-neutral-700 text-sm py-2" />
                            <input type="number" name="maxHydration" value={filters.maxHydration} onChange={handleFilterChange} placeholder="Max" className="w-1/2 rounded-md border-neutral-300 bg-white dark:bg-neutral-700 text-sm py-2" />
                        </div>
                    </div>
                </div>
            )}

            {batches.filter(b => b.status !== BatchStatus.DRAFT).length === 0 ? (
                 <div className="flex h-64 items-center justify-center rounded-xl border border-neutral-200 bg-neutral-50 dark:border-neutral-700 dark:bg-neutral-800 p-6 shadow-sm text-center">
                    <div>
                        <BatchesIcon className="h-12 w-12 text-neutral-400 mx-auto mb-4" />
                        <h2 className="text-lg font-medium text-neutral-800 dark:text-neutral-200">Nenhuma fornada registrada ainda.</h2>
                        <p className="mt-2 text-sm text-neutral-500 dark:text-neutral-400">Registre sua primeira fornada para acompanhar sua evolução.</p>
                        <button onClick={onCreateDraftBatch} className="mt-6 inline-flex items-center gap-2 rounded-lg bg-lime-500 py-2 px-4 font-semibold text-white shadow-md">
                           <CalculatorIcon className="h-5 w-5"/> Registrar Fornada
                        </button>
                    </div>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredBatches.map(batch => (
                        <div key={batch.id} className="rounded-xl border border-neutral-200 bg-white shadow-sm dark:border-neutral-700 dark:bg-neutral-800 flex flex-col">
                           <div className="p-5 flex-grow">
                             <div className="flex justify-between items-start">
                               <h3 className="text-lg font-medium text-neutral-900 dark:text-neutral-100 pr-2">{batch.name}</h3>
                               <ResultTag rating={batch.rating} />
                             </div>
                             <p className="text-sm font-semibold text-lime-600 dark:text-lime-400 mt-1">{t(`form.${batch.doughConfig.recipeStyle.toLowerCase()}`, { defaultValue: batch.doughConfig.recipeStyle })}</p>
                             <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">{new Date(batch.createdAt).toLocaleDateString()}</p>
                             
                             <div className="mt-4 grid grid-cols-2 gap-y-2 text-sm border-t border-neutral-200 dark:border-neutral-700 pt-4">
                                <div className="text-neutral-500 dark:text-neutral-400">Hidratação</div>
                                <div className="font-semibold text-right">{batch.doughConfig.hydration}%</div>
                                <div className="text-neutral-500 dark:text-neutral-400">Fermento</div>
                                <div className="font-semibold text-right">{t(`form.yeast_${batch.doughConfig.yeastType.toLowerCase()}`)}</div>
                                <div className="text-neutral-500 dark:text-neutral-400">Forno</div>
                                <div className="font-semibold text-right">{batch.ovenType ? t(`profile.ovens.types.${batch.ovenType.toLowerCase()}`) : 'N/A'}</div>
                             </div>
                           </div>
                           <div className="p-3 bg-neutral-50 dark:bg-neutral-800/50 rounded-b-xl border-t border-neutral-200 dark:border-neutral-700">
                             <button onClick={() => onNavigate('batch', batch.id)} className="w-full text-center text-sm font-semibold text-lime-600 dark:text-lime-400 hover:underline">
                                Ver detalhes &rarr;
                             </button>
                           </div>
                        </div>
                    ))}
                </div>
            )}
        </MyLabLayout>
    );
};

export default MeuLabFornadasPage;
