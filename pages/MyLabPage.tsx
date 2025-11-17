import React from 'react';
import { Page, RecipeStyle, Batch, Levain, LevainStatus } from '../../types';
import { useUser } from '../../contexts/UserProvider';
import { useTranslation } from '../../i18n';
import { calculateUserInsights } from '../logic/insights';
import { timeSince } from '../helpers';
import { 
    CalculatorIcon, 
    ChartBarIcon, 
    StarIcon,
    BeakerIcon,
    SparklesIcon,
    BookOpenIcon,
    ListBulletIcon,
    AcademicCapIcon,
    ShieldCheckIcon,
    UsersIcon,
    ChevronRightIcon,
    FlaskIcon
} from '../components/IconComponents';

interface MyLabPageProps {
    onNavigate: (page: Page, params?: string) => void;
    onCreateDraftBatch: () => void;
    onLoadAndNavigate: (config: any) => void;
}

const MyLabPage: React.FC<MyLabPageProps> = ({ onNavigate, onCreateDraftBatch, onLoadAndNavigate }) => {
  const { user, batches, levains, goals, testSeries } = useUser();
  const { t } = useTranslation();
  const insights = calculateUserInsights(batches);
  const activeGoals = goals.filter(g => g.status === 'ativo').slice(0, 3);
  const recentSeries = [...testSeries].sort((a,b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()).slice(0, 3);

  const getGreeting = () => {
    const name = user?.name.split(' ')[0] || 'Chef';
    const hour = new Date().getHours();
    if (hour < 12) return t('dashboard.greeting_morning', { name });
    if (hour < 18) return t('dashboard.greeting_afternoon', { name });
    return t('dashboard.greeting_evening', { name });
  };
  
  const Card: React.FC<{ children: React.ReactNode, className?: string }> = ({ children, className }) => (
    <div className={`rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 p-6 shadow-sm ${className}`}>
        {children}
    </div>
  );
  
  const StatCard: React.FC<{ label: string; value: string | number }> = ({ label, value }) => (
    <div className="text-center">
      <p className="text-xl font-semibold text-neutral-800 dark:text-neutral-100 truncate" title={String(value)}>{value}</p>
      <p className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">{label}</p>
    </div>
  );

  return (
    <div className="space-y-6">
        <div>
            <h1 className="text-2xl font-semibold tracking-tight text-neutral-900 dark:text-white mb-4">{t('dashboard.title')}</h1>
            <p className="text-sm text-neutral-500 mb-6">{t('dashboard.subtitle')}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Greeting + Quick Actions */}
            <Card className="lg:col-span-2 bg-lime-50 dark:bg-lime-900/50 border-lime-300 dark:border-lime-500/30">
                <h2 className="text-2xl font-semibold text-neutral-900 dark:text-neutral-100">{getGreeting()}</h2>
                <p className="mt-1 text-neutral-600 dark:text-neutral-300">{t('dashboard.greeting_subtext')}</p>
                <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 gap-3">
                    <button onClick={() => onNavigate('calculator')} className="rounded-lg bg-white/70 dark:bg-neutral-700/50 p-3 text-center font-semibold text-neutral-700 dark:text-neutral-200 hover:bg-white dark:hover:bg-neutral-700 transition">
                        {t('dashboard.action_new_dough')}
                    </button>
                    <button onClick={onCreateDraftBatch} className="rounded-lg bg-white/70 dark:bg-neutral-700/50 p-3 text-center font-semibold text-neutral-700 dark:text-neutral-200 hover:bg-white dark:hover:bg-neutral-700 transition">
                        {t('dashboard.action_log_batch')}
                    </button>
                    <button onClick={() => onNavigate('mylab/levain')} className="rounded-lg bg-white/70 dark:bg-neutral-700/50 p-3 text-center font-semibold text-neutral-700 dark:text-neutral-200 hover:bg-white dark:hover:bg-neutral-700 transition">
                        {t('dashboard.action_open_levain')}
                    </button>
                </div>
            </Card>

            {/* Levain Pet - Highlighted */}
            <div className="lg:col-span-2 rounded-xl border border-amber-300 bg-amber-50 p-6 shadow-md dark:border-amber-700/50 dark:bg-neutral-800/60 flex flex-col items-center justify-between gap-4 sm:flex-row sm:gap-8">
                {levains.length > 0 ? (
                    <>
                        <div className="flex-shrink-0">
                            <BeakerIcon className="h-16 w-16 text-amber-400 dark:text-amber-500 opacity-70" />
                        </div>
                        <div className="flex-grow text-center sm:text-left">
                            <h3 className="text-sm font-bold uppercase tracking-wider text-amber-800 dark:text-amber-300">{t('dashboard.levain_title')}</h3>
                            {(() => {
                                const mainLevain = levains.find(l => l.isDefault) || levains[0];
                                const statusColor = mainLevain.status === 'ativo' 
                                    ? 'bg-green-500' 
                                    : mainLevain.status === 'precisa_atencao' 
                                    ? 'bg-yellow-500' 
                                    : mainLevain.status === 'descanso'
                                    ? 'bg-blue-500'
                                    : 'bg-neutral-500';
                                return (
                                    <>
                                        <p className="mt-1 text-2xl font-bold text-neutral-900 dark:text-neutral-100">{mainLevain.name}</p>
                                        <div className="mt-2 flex items-center justify-center sm:justify-start gap-2">
                                            <span className="relative flex h-3 w-3">
                                                {['ativo', 'precisa_atencao'].includes(mainLevain.status) && <span className={`animate-ping absolute inline-flex h-full w-full rounded-full ${statusColor} opacity-75`}></span>}
                                                <span className={`relative inline-flex rounded-full h-3 w-3 ${statusColor}`}></span>
                                            </span>
                                            <p className="text-sm text-neutral-600 dark:text-neutral-300">
                                                {t(`levain_pet.status.${mainLevain.status as LevainStatus}`)} - {t('dashboard.levain_status_fed', { time: timeSince(mainLevain.lastFeeding) })}
                                            </p>
                                        </div>
                                    </>
                                );
                            })()}
                        </div>
                        <div className="mt-4 sm:mt-0 flex-shrink-0">
                            <button onClick={() => onNavigate('mylab/levain')} className="rounded-lg bg-white/70 dark:bg-neutral-700/80 py-2 px-5 font-semibold text-amber-800 dark:text-amber-200 hover:bg-white dark:hover:bg-neutral-700 transition ring-1 ring-inset ring-amber-300 dark:ring-amber-700">
                                Ver detalhes
                            </button>
                        </div>
                    </>
                ) : (
                    <div className="text-center w-full">
                         <h3 className="text-lg font-bold text-amber-900 dark:text-amber-200">{t('dashboard.levain_title')}</h3>
                         <p className="mt-2 text-neutral-600 dark:text-neutral-400">{t('dashboard.levain_empty_state')}</p>
                         <button onClick={() => onNavigate('mylab/levain')} className="mt-4 rounded-lg bg-white/70 dark:bg-neutral-700/80 py-2 px-5 font-semibold text-amber-800 dark:text-amber-200 hover:bg-white dark:hover:bg-neutral-700 transition ring-1 ring-inset ring-amber-300 dark:ring-amber-700">
                            Criar Levain
                        </button>
                    </div>
                )}
            </div>
            
            {/* Recent Batches */}
            <Card>
                <h3 className="text-lg font-medium text-neutral-900 dark:text-neutral-100 mb-4">{t('dashboard.recent_batches_title')}</h3>
                <div className="space-y-3">
                    {batches.slice(0, 3).map(b => (
                        <div key={b.id} className="flex justify-between items-center text-sm">
                            <div>
                                <p className="font-semibold text-neutral-700 dark:text-neutral-200">{b.name}</p>
                                <p className="text-xs text-neutral-500 dark:text-neutral-400">{b.doughConfig.hydration}% - {new Date(b.createdAt).toLocaleDateString()}</p>
                            </div>
                            <button onClick={() => onNavigate('batch', b.id)} className="text-xs font-semibold text-lime-600 dark:text-lime-400 hover:underline">Detalhes</button>
                        </div>
                    ))}
                </div>
                <button onClick={() => onNavigate('mylab/fornadas')} className="mt-4 text-sm font-semibold text-lime-600 dark:text-lime-400 hover:underline">{t('dashboard.recent_batches_view_all')} &rarr;</button>
            </Card>
            
            {/* Lab Summary */}
            <Card>
                <h3 className="text-lg font-medium text-neutral-900 dark:text-neutral-100 mb-4">{t('dashboard.summary_title')}</h3>
                <div className="grid grid-cols-2 md:grid-cols-2 gap-4">
                    <StatCard label={t('dashboard.summary_batches_7_days')} value={insights.batchesLast30Days} />
                    <StatCard label={t('dashboard.summary_last_batch')} value={insights.lastBatchDate ? t('dashboard.summary_last_batch_value', { time: timeSince(insights.lastBatchDate)}) : 'N/A'} />
                    <StatCard label={t('dashboard.summary_frequent_style')} value={insights.mostUsedStyles[0]?.styleId || 'N/A'} />
                    <StatCard label="Média Hidratação" value={`${insights.avgHydrationOverall?.toFixed(1) || 'N/A'}%`} />
                </div>
            </Card>

             {/* My Goals */}
            <Card>
                <h3 className="text-lg font-medium text-neutral-900 dark:text-neutral-100 mb-2">Meus objetivos</h3>
                <p className="text-sm text-neutral-500 dark:text-neutral-400 mb-4">Defina pequenos desafios para evoluir nas massas.</p>
                {activeGoals.length > 0 ? (
                    <div className="space-y-3">
                        {activeGoals.map(goal => (
                            <div key={goal.id}>
                                <div className="flex justify-between items-center text-sm mb-1">
                                    <span className="font-semibold text-neutral-700 dark:text-neutral-200">{goal.title}</span>
                                    <span className="font-bold text-lime-600 dark:text-lime-400">{goal.progress}%</span>
                                </div>
                                <div className="h-2 w-full rounded-full bg-neutral-200 dark:bg-neutral-700">
                                    <div
                                        className="h-2 rounded-full bg-lime-500"
                                        style={{ width: `${goal.progress}%` }}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                ) : <p className="text-sm text-center py-4 text-neutral-500 dark:text-neutral-400">Nenhum objetivo ativo.</p>}
                <div className="mt-4 flex gap-3">
                    <button onClick={() => onNavigate('mylab/objetivos')} className="flex-1 text-sm text-center font-semibold text-lime-600 dark:text-lime-400 hover:underline">Ver todos</button>
                    <button onClick={() => onNavigate('mylab/objetivos')} className="flex-1 rounded-lg bg-white/70 dark:bg-neutral-700/50 p-2 text-center font-semibold text-neutral-700 dark:text-neutral-200 hover:bg-white dark:hover:bg-neutral-700 transition">
                        Criar objetivo
                    </button>
                </div>
            </Card>

            {/* Consistency Mode */}
            <Card>
                <h3 className="text-lg font-medium text-neutral-900 dark:text-neutral-100 mb-2 flex items-center gap-2">
                    <FlaskIcon className="h-5 w-5 text-lime-500" />
                    Consistency Mode
                </h3>
                <p className="text-sm text-neutral-500 dark:text-neutral-400 mb-4">Planeje séries de testes com variações controladas.</p>
                {recentSeries.length > 0 ? (
                    <div className="space-y-3">
                        {recentSeries.map(series => (
                            <div 
                                key={series.id} 
                                onClick={() => onNavigate(`mylab/consistency/${series.id}`)}
                                className="flex justify-between items-center text-sm p-3 rounded-lg bg-neutral-50 dark:bg-neutral-700/50 cursor-pointer hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-colors"
                            >
                                <div>
                                    <p className="font-semibold text-neutral-700 dark:text-neutral-200">{series.name}</p>
                                    <p className="text-xs text-neutral-500 dark:text-neutral-400 capitalize">
                                        Variável: {series.parameters.variable}
                                    </p>
                                </div>
                                <div className="text-right flex-shrink-0 ml-4">
                                    <p className="font-bold text-lg text-neutral-800 dark:text-neutral-100">{series.relatedBakes.length}</p>
                                    <p className="text-xs text-neutral-500 dark:text-neutral-400">Fornada(s)</p>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : <p className="text-sm text-center py-4 text-neutral-500 dark:text-neutral-400">Nenhuma série de testes criada.</p>}
                <div className="mt-4 flex gap-3">
                    <button onClick={() => onNavigate('mylab/consistency')} className="flex-1 text-sm text-center font-semibold text-lime-600 dark:text-lime-400 hover:underline">Ver todas</button>
                    <button onClick={() => onNavigate('mylab/consistency')} className="flex-1 rounded-lg bg-white/70 dark:bg-neutral-700/50 p-2 text-center font-semibold text-neutral-700 dark:text-neutral-200 hover:bg-white dark:hover:bg-neutral-700 transition">
                        Criar nova série
                    </button>
                </div>
            </Card>
        </div>
    </div>
  );
};

export default MyLabPage;