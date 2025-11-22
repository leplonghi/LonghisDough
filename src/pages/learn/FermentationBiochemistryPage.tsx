
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

const FermentationBiochemistryPage: React.FC = () => {
  return (
    <TechnicalPageLayout
      title="Fermentation Biochemistry"
      subtitle="Science behind transforming flour and water into complex flavorful structure."
    >
        <Section title="Yeast and Lactic Acid Bacteria (LAB)">
            <p>Fermentation is metabolic process by microorganisms. In doughs, main actors are yeast (*Saccharomyces cerevisiae*) and, in natural fermentation, LAB. Yeast primarily produces gas, LAB develop acidity/flavor.</p>
        </Section>
        <Section title="CO₂ Production">
            <p>Yeast consumes simple sugars (from starch breakdown) releasing CO₂. Gas trapped in gluten forms alveoli making dough rise.</p>
        </Section>
        <Section title="Organic Acids">
            <p>LAB produce organic acids, mainly lactic and acetic. Lactic is mild/yogurt-like, acetic is pungent/vinegar-like. Balance fundamental for flavor profile.</p>
        </Section>
        <Section title="Aromatic Compounds">
            <p>Besides CO₂ and acids, fermentation generates volatile compounds like esters, alcohols, aldehydes forming aromatic bouquet.</p>
        </Section>
        <Section title="Salt Effect">
            <p>Salt retards yeast via osmosis, moderating fermentation speed allowing flavor development.</p>
        </Section>
        <Section title="Flour Effect">
            <p>Flour is food source. Whole flours accelerate activity. Flour strength determines gas retention.</p>
        </Section>
        <Section title="Uncontrolled Fermentation Risks">
            <p>Too fast/long can be harmful. Yeast consuming all sugar stops rise/browning. Excess acidity/enzymes degrade gluten leading to weak sticky dough.</p>
        </Section>
        <Section title="Technical References">
          <ul className="list-disc pl-5 space-y-2">
              <li>Modernist Bread</li>
              <li>King Arthur Baking</li>
              <li>Wikipedia (Yeast, Lactic Acid Fermentation)</li>
          </ul>
        </Section>
    </TechnicalPageLayout>
  );
};

export default FermentationBiochemistryPage;
