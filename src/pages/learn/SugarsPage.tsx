
import React from 'react';
import TechnicalPageLayout from './TechnicalPageLayout';
import { BookOpenIcon } from '../../components/IconComponents';

const Section: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
    <div className="mt-8 first:mt-0">
        <h3 className="flex items-center gap-2 text-xl font-semibold text-slate-900 dark:text-slate-200 mb-3">
            {title}
        </h3>
        <div className="prose-sm dark:prose-invert max-w-none text-slate-700 dark:text-slate-300 leading-relaxed">
            {children}
        </div>
    </div>
);

const SugarsPage: React.FC = () => {
  return (
    <TechnicalPageLayout
      title="Sugars, Malts, and Enzymes"
      subtitle="Role in fermentation, color, and crust flavor."
    >
        <Section title="Dough Energy">
            <p>Sugars are primary fermentation energy source. Enzymes break starch into simple sugars for yeast.</p>
        </Section>
        <Section title="Yeast Food">
            <p>Yeast metabolizes simple sugars producing CO₂/ethanol. Excess sugar retards yeast (osmosis).</p>
        </Section>
        <Section title="Browning Reactions">
            <p>Residual sugars fuel Maillard/Caramelization creating golden crust and complex flavor.</p>
        </Section>
        <Section title="Enzymatic Action">
            <p>Amylases break complex starch into maltose, ensuring constant food supply and browning sugars.</p>
        </Section>
        <Section title="Aroma/Color Impact">
            <p>Adequate residual sugar creates rich crust color/aroma. Lack leads to pale crust.</p>
        </Section>
        <Section title="Sugar Levels">
            <ul className="list-disc pl-5 mt-2 space-y-1">
                <li><strong>More sugar:</strong> Faster intense browning, softer crumb.</li>
                <li><strong>Less sugar:</strong> Requires higher heat/time for color (e.g., Neapolitan).</li>
            </ul>
        </Section>
        <Section title="Technical References">
          <ul className="list-disc pl-5 space-y-2">
              <li>Modernist Bread</li>
              <li>Modernist Pizza</li>
              <li>Wikipedia</li>
          </ul>
        </Section>
    </TechnicalPageLayout>
  );
};

export default SugarsPage;
