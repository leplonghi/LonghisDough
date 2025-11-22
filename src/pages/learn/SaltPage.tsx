
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

const SaltPage: React.FC = () => {
  return (
    <TechnicalPageLayout
      title="Salt: Chemical & Structural Functions"
      subtitle="More than flavor: salt's role in strengthening and controlling dough."
    >
        <Section title="The Regulator">
            <p>Salt is fundamental, regulating gluten, fermentation, and quality.</p>
        </Section>
        <Section title="Gluten Strengthening">
            <p>Tightens gluten network via ionic interactions making dough stronger.</p>
        </Section>
        <Section title="Fermentation Control">
            <p>Retards yeast via osmosis allowing controlled flavor development.</p>
        </Section>
        <Section title="Flavor/Preservation">
            <p>Enhances other flavors and acts as preservative.</p>
        </Section>
        <Section title="Sensory Balance">
            <p>Balances sweetness/acidity.</p>
        </Section>
        <Section title="Risks">
            <ul className="list-disc pl-5 mt-2 space-y-1">
                <li><strong>Insufficient:</strong> Sticky weak dough, bland.</li>
                <li><strong>Excess:</strong> Inhibited fermentation, salty, stiff.</li>
            </ul>
        </Section>
        <Section title="Technical References">
          <ul className="list-disc pl-5 space-y-2">
              <li>Modernist Bread</li>
              <li>King Arthur Baking</li>
              <li>Serious Eats</li>
          </ul>
        </Section>
    </TechnicalPageLayout>
  );
};

export default SaltPage;
