import React, { useMemo } from 'react';
import { Page, LevainStatus } from '@/types';
import { useUser } from '@/contexts/UserProvider';
import { useTranslation } from '@/i18n';
import { timeSince } from '@/helpers';
import MyLabLayout from './mylab/MyLabLayout';
import { 
    BeakerIcon,
    BatchesIcon,
    PlusCircleIcon,
    ArrowTopRightOnSquareIcon
} from '@/components/ui/Icons';

interface MyLabPageProps {
    onNavigate: (page: Page, params?: string) => void;
    onCreateDraftBatch: () => void;
    onLoadAndNavigate: (config: any) => void;
}

const MyLabPage: React.FC<MyLabPageProps> = ({ onNavigate, onCreateDraftBatch }) => {
  const { user, batches, levains } = useUser();
  const { t } = useTranslation();

  // Greeting Logic
  const getGreeting = () => {
    const name = user?.name.split(' ')[0] || 'Chef';
    const hour = new Date().getHours();
    if (hour < 12) return t('dashboard.greeting_morning', { name });
    if (hour < 18) return t('dashboard.greeting_afternoon', { name });
    return t('dashboard.greeting_evening', { name });
  };

  // Recent Activity Logic
  const lastBatch = useMemo(() => {
    if (batches.length === 0) return null;
    const validBatches = batches.filter(b => b.status !== 'DRAFT');
    return validBatches.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())[0];
  }, [batches]);

  // Levain Logic
  const mainLevain = useMemo(() => levains.find(l => l.isDefault) || levains[0], [levains]);

  return (
    <MyLabLayout activePage="mylab" onNavigate={onNavigate}>
        <div className="space-y-8">
            {/* 1. Greeting & Actions Header */}
            <div className="rounded-2xl bg-gradient-to-br from-lime-50 to-white border border-lime-100 p-6 sm:p-8 shadow-sm">
                <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-2">{getGreeting()}</h1>
                <p className="text-slate-600 mb-6">{t('dashboard.greeting_subtext')}</p>
                
                <div className="flex flex-col sm:flex-row gap-3">
                    <button 
                        onClick={() => onNavigate('calculator')}
                        className="flex items-center justify-center gap-2 rounded-lg bg-lime-500 px-6 py-3 text-sm font-semibold text-white shadow-md transition-all hover:bg-lime-600 hover:shadow-lg active:scale-95"
                    >
                        <PlusCircleIcon className="h-5 w-5" />
                        {t('dashboard.action_new_dough')}
                    </button>
                    <button 
                         onClick={() => onNavigate('mylab/fornadas')}
                         className="flex items-center justify-center gap-2 rounded-lg bg-white px-6 py-3 text-sm font-semibold text-slate-700 shadow-sm ring-1 ring-slate-200 transition-all hover:bg-slate-50"
                    >
                        <BatchesIcon className="h-5 w-5 text-slate-400" />
                        {t('dashboard.recent_batches_view_all')}
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* 2. Levain Pet Card */}
                <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between h-full">
                    <div>
                        <div className="flex items-center gap-2 mb-4">
                            <span className="p-2 rounded-lg bg-amber-100 text-amber-600">
                                <BeakerIcon className="h-6 w-6" />
                            </span>
                            <h2 className="text-lg font-bold text-slate-800">{t('levain_pet.title')}</h2>
                        </div>
                        
                        {mainLevain ? (
                            <>
                                <h3 className="text-xl font-semibold text-slate-900">{mainLevain.name}</h3>
                                <div className="mt-2 flex items-center gap-2 text-sm text-slate-600">
                                     <span className={`inline-block h-2.5 w-2.5 rounded-full ${mainLevain.status === 'ativo' ? 'bg-green-500' : 'bg-yellow-500'}`}></span>
                                     <span>{t(`levain_pet.status.${mainLevain.status as LevainStatus}`)}</span>
                                </div>
                                <p className="mt-1 text-sm text-slate-500">
                                    {t('dashboard.levain_status_fed', { time: timeSince(mainLevain.lastFeeding) })}
                                </p>
                            </>
                        ) : (
                            <p className="text-slate-600">{t('dashboard.levain_empty_state')}</p>
                        )}
                    </div>
                    
                    <div className="mt-6 pt-6 border-t border-slate-100">
                        {mainLevain ? (
                            <button 
                                onClick={() => onNavigate('mylab/levain/detail', mainLevain.id)}
                                className="text-sm font-semibold text-lime-600 hover:text-lime-700 flex items-center gap-1"
                            >
                                {t('dashboard.action_open_levain')} <ArrowTopRightOnSquareIcon className="h-4 w-4" />
                            </button>
                        ) : (
                            <button 
                                onClick={() => onNavigate('mylab/levain')}
                                className="text-sm font-semibold text-lime-600 hover:text-lime-700"
                            >
                                {t('levain_pet.create_button')} &rarr;
                            </button>
                        )}
                    </div>
                </div>

                {/* 3. Last Batch Card */}
                <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between h-full">
                    <div>
                         <div className="flex items-center gap-2 mb-4">
                            <span className="p-2 rounded-lg bg-blue-100 text-blue-600">
                                <BatchesIcon className="h-6 w-6" />
                            </span>
                            <h2 className="text-lg font-bold text-slate-800">{t('dashboard.summary_last_batch')}</h2>
                        </div>

                        {lastBatch ? (
                            <>
                                <h3 className="text-xl font-semibold text-slate-900 line-clamp-1">{lastBatch.name}</h3>
                                <p className="text-sm font-medium text-lime-600 mt-1">
                                    {t(`form.${lastBatch.doughConfig.recipeStyle.toLowerCase()}`, { defaultValue: lastBatch.doughConfig.recipeStyle })}
                                </p>
                                <div className="mt-3 flex gap-4 text-sm text-slate-500">
                                    <div>
                                        <span className="block font-semibold text-slate-700">{lastBatch.doughConfig.hydration}%</span>
                                        Hydration
                                    </div>
                                    <div>
                                        <span className="block font-semibold text-slate-700">{new Date(lastBatch.createdAt).toLocaleDateString()}</span>
                                        Date
                                    </div>
                                </div>
                            </>
                        ) : (
                            <p className="text-slate-600">No bakes registered yet.</p>
                        )}
                    </div>

                     <div className="mt-6 pt-6 border-t border-slate-100">
                        {lastBatch ? (
                             <button 
                                onClick={() => onNavigate('batch', lastBatch.id)}
                                className="text-sm font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1"
                            >
                                {t('common.details')} <ArrowTopRightOnSquareIcon className="h-4 w-4" />
                            </button>
                        ) : (
                            <button 
                                onClick={() => onNavigate('calculator')}
                                className="text-sm font-semibold text-blue-600 hover:text-blue-700"
                            >
                                {t('dashboard.action_new_dough')} &rarr;
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    </MyLabLayout>
  );
};

export default MyLabPage;