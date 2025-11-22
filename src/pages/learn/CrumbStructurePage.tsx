
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

const CrumbStructurePage: React.FC = () => {
  return (
    <TechnicalPageLayout
      title="Crumb Structure"
      subtitle="Science behind alveoli formation and crumb texture."
    >
        <Section title="Alveoli Formation">
            <p>Alveoli ("bubbles") are CO₂ gas pockets produced by yeast. Form at nucleation sites and grow. Size/shape define texture.</p>
        </Section>
        <Section title="Internal Tension and Gluten Network">
            <p>Gluten traps gas pockets. Structure is balance between gas pressure expanding and gluten tension containing. Strong extensible gluten allows expansion without rupture.</p>
        </Section>
        <Section title="Mixing/Folding Impact">
            <p>Techniques like kneading/folding organize/strengthen gluten, aligning proteins and distributing gas.</p>
        </Section>
        <Section title="Extreme Structure Collapse">
            <p>Balance is key. Too stiff restricts expansion (dense). Too loose (weak gluten) collapses (dense/wet).</p>
        </Section>
        <Section title="Technical References">
          <ul className="list-disc pl-5 space-y-2">
              <li>Modernist Bread</li>
              <li>King Arthur Baking</li>
              <li>Serious Eats – The Pizza Lab</li>
          </ul>
        </Section>
    </TechnicalPageLayout>
  );
};

export default CrumbStructurePage;
