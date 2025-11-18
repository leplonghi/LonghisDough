
import React from 'react';
import { Page } from '../../types';
import MyLabLayout from './MyLabLayout';

const InsightCard: React.FC<{
  title: string;
  description: string;
  linkText: string;
  onLinkClick: () => void;
}> = ({ title, description, linkText, onLinkClick }) => (
  <div className="rounded-xl border border-neutral-200 bg-white p-6 shadow-sm flex flex-col justify-between">
    <div>
      <h3 className="text-lg font-medium text-neutral-900">{title}</h3>
      <p className="mt-2 text-sm text-neutral-600">{description}</p>
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
                <p className="mt-1 text-sm text-neutral-500">
                    Analyze patterns and trends in your baking.
                </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <InsightCard
                    title="Favorite Doughs"
                    description="Placeholder: Here you will see your most used dough recipe based on your bake history."
                    linkText="View My Doughs"
                    onLinkClick={() => onNavigate('mylab/massas')}
                />
                <InsightCard
                    title="Favorite Flours"
                    description="Placeholder: The flour you log most frequently or set as default will be highlighted here."
                    linkText="Go to My Flours"
                    onLinkClick={() => onNavigate('mylab/farinhas')}
                />
                <InsightCard
                    title="Most Used Styles"
                    description="Placeholder: Discover which pizza or bread style you've been exploring the most."
                    linkText="View My Bakes"
                    onLinkClick={() => onNavigate('mylab/fornadas')}
                />
                 <InsightCard
                    title="Sensory Notes"
                    description="Placeholder: A summary of common keywords from your notes, like 'crispy' or 'sour'."
                    linkText="Open Sensory Journal"
                    onLinkClick={() => onNavigate('mylab/diario-sensorial')}
                />
                <InsightCard
                    title="Common Errors"
                    description="Placeholder: Identify patterns in problems you log, such as 'dough tore' or 'pale crust'."
                    linkText="View My Bakes"
                    onLinkClick={() => onNavigate('mylab/fornadas')}
                />
                <InsightCard
                    title="MyLab Suggestions"
                    description="Placeholder: Based on your data, MyLab might suggest experiments, e.g., 'Try comparing A vs B'."
                    linkText="Go to Comparisons"
                    onLinkClick={() => onNavigate('mylab/comparacoes')}
                />
            </div>
        </MyLabLayout>
    );
};

export default MeuLabInsightsPage;
