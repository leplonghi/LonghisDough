
import React, { useMemo } from 'react';
import { Page, LevainStatus } from '../types';
import { useUser } from '../contexts/UserProvider';
import { useTranslation } from '../i18n';
import { timeSince } from '../helpers';
import MyLabLayout from './mylab/MyLabLayout';
import AuthPlaceholder from '../components/AuthPlaceholder';
import { 
    BeakerIcon,
    BatchesIcon,
    PlusCircleIcon,
    ArrowTopRightOnSquareIcon,
    ChartBarIcon,
    ClockIcon,
    SparklesIcon,
    FlaskIcon,
    LockClosedIcon
} from '../components/IconComponents';
import { AFFILIATE_PLACEMENTS } from '../data/affiliatePlacements';
import { AffiliateBlock } from '../components/AffiliateBlock';
import { isFreeUser, isProUser } from '../lib/permissions'; // Corrigido para lib/permissions
import ProFeatureLock from '../components/ProFeatureLock';
import { ProBadge } from '../components/ProBadge';
import { logEvent } from '../services/analytics'; // Import logEvent

interface MyLabPageProps {
    onNavigate: (page: Page, params?: string) => void;
    onCreateDraftBatch: () => void;
    onLoadAndNavigate: (config: any) => void;
}

const DashboardCard: React.FC<{
    title: string;
    icon: React.ReactNode;
    colorClass: string;
    children: React.ReactNode;
    onClick?: () => void;
    isPro?: boolean;
}> = ({ title, icon, colorClass, children, onClick, isPro }) => (
    <div 
        onClick={onClick}
        className={`rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition-all ${onClick ? 'hover:shadow-md cursor-pointer' : ''}`}
    >
        <div className="flex items-center gap-2 mb-4">
            <span className={`p-2 rounded-lg ${colorClass}`}>
                {icon}
            </span>
            <h2 className="text-lg font-bold text-slate-800 flex items-center">
                {title}
                {isPro && <ProBadge />}
            </h2>
        </div>
        {children}
    </div>
);

const MyLabPage: React.FC<MyLabPageProps> = ({ onNavigate, onCreateDraftBatch }) => {
  const { user, batches, levains, isAuthenticated, openPaywall } = useUser();
  const { t } = useTranslation();

  React.useEffect(() => {
    if (user) {
        // FIX: The logEvent function expects a single object argument with 'name' and 'params'.
        // The current call site `logEvent({ name: '...', params: { ... } })` is already correct.
        logEvent({ name: 'levain_pet_opened', params: { userId: user.email } });
    }
  }, [user]);

  if (!isAuthenticated) {
      return <AuthPlaceholder />;
  }

  // Pro Check for My Lab access
  if (!isProUser(user)) {
    return (
      <MyLabLayout activePage="mylab" onNavigate={onNavigate}>
        <div className="mx-auto max-w-xl px-4 py-12 text-center">
          <div className="mb-6 flex justify-center">
             <div className="rounded-full bg-lime-100 p-4">
                 <LockClosedIcon className="h-12 w-12 text-lime-600" />
             </div>
          </div>
          <h1 className="mb-3 text-2xl font-bold text-slate-900">
            My Lab is part of DoughLabPro Pro
          </h1>
          <p className="mb-8 text-lg text-slate-600">
            Saving batches, tracking your history and seeing your evolution are
            Pro features.
            <br/>
            <span className="text-sm text-slate-500 block mt-2">
                The Free plan lets you experiment with the calculator, but does not store any baking history.
            </span>
          </p>
          <button
            type="button"
            onClick={() => openPaywall("mylab")}
            className="inline-flex items-center gap-2 rounded-lg bg-lime-500 px-6 py-3 text-base font-bold text-white shadow-md transition-all hover:bg-lime-600 focus:outline-none focus:ring-2 focus:ring-lime-500 focus:ring-offset-2"
          >
            <SparklesIcon className="h-5 w-5" />
            Unlock My Lab with Pro
          </button>
        </div>
      </MyLabLayout>
    );
  }

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

  // Affiliate Logic
  const free = isFreeUser(user);
  const placement = AFFILIATE_PLACEMENTS.find(
    (p) => p.context === "mylab_afterFirstBatch"
  );

  return (
    <MyLabLayout activePage="mylab" onNavigate={onNavigate}>
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">{getGreeting()}</h1>
        <p className="mt-2 text-lg text-slate-600">Your personal dough laboratory. Record, compare, understand, and evolve.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Quick Actions */}
        <DashboardCard
          title="Quick Actions"
          icon={<PlusCircleIcon className="h-6 w-6" />}
          colorClass="bg-lime-100 text-lime-600"
        >
          <div className="space-y-3">
            <button
              onClick={() => onCreateDraftBatch()}
              className="w-full flex items-center gap-3 rounded-lg bg-lime-500 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-lime-600"
            >
              <BatchesIcon className="h-5 w-5" />
              New Dough Formula
            </button>
            <button
              onClick={() => onNavigate('mylab/levain')}
              className="w-full flex items-center gap-3 rounded-lg bg-amber-100 px-4 py-2.5 text-sm font-semibold text-amber-800 shadow-sm hover:bg-amber-200"
            >
              <BeakerIcon className="h-5 w-5" />
              Open Levain Pet
            </button>
          </div>
        </DashboardCard>

        {/* Last Bake Summary */}
        <DashboardCard
          title="Last Bake"
          icon={<BatchesIcon className="h-6 w-6" />}
          colorClass="bg-blue-100 text-blue-600"
          onClick={lastBatch ? () => onNavigate('batch', lastBatch.id) : undefined}
        >
          {lastBatch ? (
            <div>
              <p className="text-xl font-bold text-slate-900">{lastBatch.name}</p>
              <p className="text-sm text-slate-600 mt-1">
                {t(`form.${lastBatch.doughConfig.recipeStyle.toLowerCase()}`, { defaultValue: lastBatch.doughConfig.recipeStyle })} • {new Date(lastBatch.createdAt).toLocaleDateString()}
              </p>
              <div className="mt-3 flex items-center justify-between text-sm">
                <span className="text-slate-500">Hydration:</span>
                <span className="font-semibold text-slate-800">{lastBatch.doughConfig.hydration}%</span>
              </div>
            </div>
          ) : (
            <p className="text-sm text-slate-500 italic py-4">You haven't saved any bakes yet.</p>
          )}
        </DashboardCard>
        
        {/* Levain Pet Overview */}
        <DashboardCard
          title="Levain Pet"
          icon={<BeakerIcon className="h-6 w-6" />}
          colorClass="bg-red-100 text-red-600"
          onClick={() => onNavigate('mylab/levain')}
        >
          {mainLevain ? (
            <div>
              <p className="text-xl font-bold text-slate-900">{mainLevain.name}</p>
              <p className="text-sm text-slate-600 mt-1">
                Status: <span className={`font-semibold ${
                    mainLevain.status === 'ativo' ? 'text-green-600' :
                    mainLevain.status === 'precisa_atencao' ? 'text-yellow-600' : 'text-slate-600'
                }`}>
                    {mainLevain.status === 'ativo' ? 'Active' : mainLevain.status === 'precisa_atencao' ? 'Needs Attention' : 'Resting'}
                </span>
              </p>
              <div className="mt-3 flex items-center justify-between text-sm">
                <span className="text-slate-500">Last fed:</span>
                <span className="font-semibold text-slate-800">{timeSince(mainLevain.lastFeeding, t)} ago</span>
              </div>
            </div>
          ) : (
            <p className="text-sm text-slate-500 italic py-4">You don't have a Levain Pet yet.</p>
          )}
        </DashboardCard>

        {/* Dynamic Affiliate Block */}
        {free && placement && (
          <AffiliateBlock placement={placement} />
        )}

        {/* Insights Teaser */}
        <DashboardCard
          title="Insights"
          icon={<ChartBarIcon className="h-6 w-6" />}
          colorClass="bg-purple-100 text-purple-600"
          onClick={() => onNavigate('mylab/insights')}
        >
          <p className="text-xl font-bold text-slate-900">Your Baking Patterns</p>
          <p className="text-sm text-slate-600 mt-1">
            Discover what makes your dough unique.
          </p>
          <div className="mt-3 flex items-center justify-between text-sm">
            <span className="text-slate-500">Avg. Hydration:</span>
            <span className="font-semibold text-slate-800">~68%</span>
          </div>
        </DashboardCard>
        
        {/* Consistency Mode Teaser */}
        <DashboardCard
          title="Consistency Mode"
          icon={<FlaskIcon className="h-6 w-6" />}
          colorClass="bg-teal-100 text-teal-600"
          onClick={() => onNavigate('mylab/consistency')}
        >
          <p className="text-xl font-bold text-slate-900">Structured Experiments</p>
          <p className="text-sm text-slate-600 mt-1">
            Plan and track test series with controlled variables.
          </p>
          <div className="mt-3 flex items-center justify-between text-sm">
            <span className="text-slate-500">Active Series:</span>
            <span className="font-semibold text-slate-800">{levains.length}</span>
          </div>
        </DashboardCard>

      </div>
    </MyLabLayout>
  );
};

export default MyLabPage;
