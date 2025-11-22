
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

const WaterPage: React.FC = () => {
  return (
    <TechnicalPageLayout
      title="Water: Composition & Impact"
      subtitle="Science behind the ingredient giving life to dough."
    >
        <Section title="More than H₂O">
            <p>Universal solvent activating gluten, dissolving ingredients.</p>
        </Section>
        <Section title="Hardness">
            <p>Mineral concentration (Ca/Mg) affects gluten.</p>
        </Section>
        <Section title="Gluten Effect">
            <p>Hard water strengthens gluten. Soft water weakens/softens.</p>
        </Section>
        <Section title="Fermentation Impact">
            <p>Minerals feed yeast. Extremes retard activity.</p>
        </Section>
        <Section title="Soft vs Hard">
            <ul className="list-disc pl-5 mt-2 space-y-1">
                <li><strong>Soft:</strong> Softer sticky dough.</li>
                <li><strong>Hard:</strong> Firmer strong dough.</li>
            </ul>
        </Section>
        <Section title="Essentials">
            <p>Primary function is hydration and enzyme activation.</p>
        </Section>
        <Section title="Flavor">
            <p>Mineral profile subtly affects taste.</p>
        </Section>
        <Section title="Technical References">
          <ul className="list-disc pl-5 space-y-2">
              <li>Modernist Bread</li>
              <li>King Arthur Baking</li>
              <li>Wikipedia</li>
          </ul>
        </Section>
    </TechnicalPageLayout>
  );
};

export default WaterPage;
