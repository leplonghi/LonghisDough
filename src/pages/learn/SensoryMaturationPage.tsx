
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

const SensoryMaturationPage: React.FC = () => {
  return (
    <TechnicalPageLayout
      title="Advanced Sensory Maturation"
      subtitle="Science of complex aroma development in long fermentation."
    >
        <Section title="Complex Aroma Formation">
            <p>Maturation develops profile beyond simple flour taste via slow microbial/enzymatic activity generating volatiles.</p>
        </Section>
        <Section title="Enzymatic Interactions">
            <p>Amylases create sugars for flavor/color. Proteases soften gluten.</p>
        </Section>
        <Section title="Softness/Plasticity">
            <p>Mature dough behaves better. Controlled gluten relaxation improves plasticity and extensibility.</p>
        </Section>
        <Section title="Long vs Short">
            <p>Short = simple. Long = deep nuance.</p>
        </Section>
        <Section title="Technical References">
          <ul className="list-disc pl-5 space-y-2">
              <li>Modernist Bread</li>
              <li>Modernist Pizza</li>
              <li>Raymond Calvel</li>
          </ul>
        </Section>
    </TechnicalPageLayout>
  );
};

export default SensoryMaturationPage;
