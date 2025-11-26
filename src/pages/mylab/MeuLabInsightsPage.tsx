
import React from 'react';
import { Page } from '../../types';
import MyLabLayout from './MyLabLayout';
import ProFeatureLock from '../../components/ui/ProFeatureLock';
import { ChartBarIcon } from '@/components/ui/Icons';

const InsightCard: React.FC<{
  title: string;
  description: string;
  linkText: string;
  onLinkClick: () => void;
}> = ({ title, description, linkText, onLinkClick }) => (
  <div className="rounded-xl border border-neutral-200 bg-white p-6 shadow-sm flex flex-col justify-between">
    <div>
      <h3 className="text-lg font-medium text-neutral-900">{title}</h3>
      <p className="mt-2 text-sm text-neutral-700">{description}</p>
    </div>
    <button onClick={onLinkClick} className="mt-4 text-sm font-semibold text-lime-600 hover:underline text-left">
      {linkText} &rarr;
    </button>
  </div>
);

const MeuLabInsightsPage: React.FC<{ onNavigate: (page: Page) => void }> = ({ onNavigate }) => {
    return (
        <MyLabLayout activePage="mylab/insights" onNavigate={onNavigate}>
            <div className="mb-6">
                <h1 className="text-2xl font-semibold tracking-tight text-neutral-900">Insights</h1>
                <p className="mt-1 text-sm text-neutral-600">
                    Analyze patterns and trends in your baking.
                </p>
            </div>
            
            <ProFeatureLock 
                origin="mylab" 
                featureName="Advanced Dough Analytics"
                description="Advanced dough analytics live here. Pro users track everything — hydration, fermentation, bake outcomes. Unlock advanced dough science with Pro."
                className="min-h-[25rem] flex items-center justify-center"
            >
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 filter blur-sm pointer-events-none select-none opacity-60">
                    <InsightCard
                        title="Favorite Doughs"
                        description="See your most used dough recipes."
                        linkText="View My Doughs"
                        onLinkClick={() => {}}
                    />
                    <InsightCard
                        title="Favorite Flours"
                        description="The flour you log most frequently."
                        linkText="Go to My Flours"
                        onLinkClick={() => {}}
                    />
                    <InsightCard
                        title="Most Used Styles"
                        description="Discover which style you explore most."
                        linkText="View My Bakes"
                        onLinkClick={() => {}}
                    />
                     <InsightCard
                        title="Sensory Notes"
                        description="A summary of common keywords from your notes."
                        linkText="Open Sensory Journal"
                        onLinkClick={() => {}}
                    />
                    <InsightCard
                        title="Common Errors"
                        description="Identify patterns in problems you log."
                        linkText="View My Bakes"
                        onLinkClick={() => {}}
                    />
                    <InsightCard
                        title="MyLab Suggestions"
                        description="Based on your data, MyLab suggests experiments."
                        linkText="Go to Comparisons"
                        onLinkClick={() => {}}
                    />
                </div>
            </ProFeatureLock>
        </MyLabLayout>
    );
};

export default MeuLabInsightsPage;
