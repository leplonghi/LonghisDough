
import React from 'react';
import { Page } from '../types';
// FIX: Add missing import for InsightsIcon
import { InsightsIcon } from './IconComponents';
import InsightsSummary from './insights/InsightsSummary';
import InsightsCharts from './insights/InsightsCharts';
import InsightsPatterns from './insights/InsightsPatterns';
import InsightsComparisons from './insights/InsightsComparisons';
import { useTranslation } from '../i18n'; // Import useTranslation

interface InsightsPageProps {
  onNavigate: (page: Page) => void;
}

const InsightsPage: React.FC<InsightsPageProps> = ({ onNavigate }) => {
  const { t } = useTranslation(); // Initialize useTranslation hook

  return (
    <div className="mx-auto max-w-7xl animate-[fadeIn_0.5s_ease-in-out]">
      <div className="mb-8 text-center sm:text-left">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-4xl flex items-center gap-3 justify-center sm:justify-start">
          <InsightsIcon className="h-8 w-8 text-lime-500" />
          {t('insights_page.title')}
        </h1>
        <p className="mt-2 text-lg text-slate-600 dark:text-slate-300">
          {t('insights_page.subtitle')}
        </p>
      </div>

      <div className="space-y-8">
        <InsightsSummary />
        <InsightsCharts />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          <InsightsPatterns />
          <InsightsComparisons />
        </div>
      </div>
    </div>
  );
};

export default InsightsPage;