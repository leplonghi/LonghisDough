
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

const AmbientVsColdFermentationPage: React.FC = () => {
  return (
    <TechnicalPageLayout
      title="Ambient vs. Cold Fermentation: Scientific Comparison"
      subtitle="Fundamental differences in dough result based on temperature."
    >
        <Section title="Speed Differences">
            <p>Temperature regulates yeast. Ambient = active/fast. Cold = slow. Ambient focuses on quick volume, Cold on prolonged process.</p>
        </Section>
        <Section title="Sensory Differences">
            <p>Cold allows enzymes/LAB to work longer producing complex flavor. Ambient produces simple direct flavor.</p>
        </Section>
        <Section title="Control and Predictability">
            <p>Cold offers wider ideal window/control. Ambient is sensitive to temp variations.</p>
        </Section>
        <Section title="Gluten Impact">
            <p>Cold allows full gluten relaxation via proteases resulting in extensible soft dough.</p>
        </Section>
        <Section title="Risks">
            <p>Ambient: High over-fermentation risk. Cold: Under-fermentation if too short/cold.</p>
        </Section>
        <Section title="Technical References">
          <ul className="list-disc pl-5 space-y-2">
              <li>Modernist Pizza</li>
              <li>Serious Eats</li>
              <li>Ooni Learn</li>
              <li>King Arthur Baking</li>
          </ul>
        </Section>
    </TechnicalPageLayout>
  );
};

export default AmbientVsColdFermentationPage;
