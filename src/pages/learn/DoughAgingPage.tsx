
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

const DoughAgingPage: React.FC = () => {
  return (
    <TechnicalPageLayout
      title="Dough Aging: Maturation and Degradation"
      subtitle="What happens over time, from sensory maturation to starch retrogradation."
    >
        <Section title="Gluten Aging">
            <p>Gluten relaxes over time via protease action. Controlled aging results in extensible dough. Excessive aging degrades gluten causing weakness.</p>
        </Section>
        <Section title="Aromatic Changes">
            <p>Aging means flavor maturation. Slow activity generates complex aromatics transforming simple flour taste to deep nuance.</p>
        </Section>
        <Section title="Starch Retrogradation">
            <p>After baking, gelatinized starch recrystallizes releasing water. Causes staling.</p>
        </Section>
        <Section title="Elasticity Loss">
            <p>Aged dough loses elasticity (snap-back) but may tear easily if degraded.</p>
        </Section>
        <Section title="Overblown Dough Risk">
            <p>"Tired" dough fermented too long smells alcoholic, feels weak, and won't rise (no oven spring). Sugar depletion and protein degradation.</p>
        </Section>
        <Section title="Technical References">
          <ul className="list-disc pl-5 space-y-2">
              <li>Modernist Bread</li>
              <li>Wikipedia</li>
              <li>King Arthur Baking</li>
          </ul>
        </Section>
    </TechnicalPageLayout>
  );
};

export default DoughAgingPage;
