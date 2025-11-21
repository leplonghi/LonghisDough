
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

const SmokedAromaticsPage: React.FC = () => {
  return (
    <TechnicalPageLayout
      title="Smoked & Intense Aromatics"
      subtitle="How to use dominant flavor ingredients to create complexity without overwhelming pizza."
      showReferencesSection
    >
        <Section title="Cold vs Hot Smoking (Conceptual)">
            <p><strong>Cold smoking</strong> exposes food to smoke at temperatures that don't cook it, focusing purely on aroma absorption. Used for ingredients like smoked salmon. <strong>Hot smoking</strong> cooks food while smoking it, as with bacon. Hot process can create drier outer layer ("pellicle").</p>
        </Section>
        <Section title="Aromatic Effect on Cheese and Sauce">
            <p>Smoke compounds are potent and can infuse not only smoked ingredient but also surrounding cheeses and sauces during baking. Bacon, for example, releases smoky fat which spreads and lends aroma to entire pizza surface.</p>
        </Section>
        <Section title="Flavor Saturation Risks">
            <p>Main risk when using ingredients like smoked cheese, bacon, or anchovies is saturation. Intense flavor can easily dominate palate masking subtle notes of fermented dough and tomato sauce. Balance is achieved through moderation in quantity and combination with more neutral ingredients.</p>
        </Section>
        <Section title="Safe and Traditional Combinations">
            <p>To balance smoked flavor, classic gastronomy uses contrasts:</p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
                <li><strong>Sweetness:</strong> Ingredients like caramelized onion, honey, or fig contrast and balance salty and smoky.</li>
                <li><strong>Acidity:</strong> Touch of pickle acidity or vibrant tomato sauce can "cut" richness of smoky fat.</li>
                <li><strong>Creaminess:</strong> Neutral base like cream, ricotta, or potato can soften and dilute smokiness intensity.</li>
            </ul>
        </Section>
        <Section title="Technical References">
          <ul className="list-disc pl-5 space-y-2">
              <li>"The Flavor Bible" by Karen Page and Andrew Dornenburg</li>
              <li>Modernist Cuisine</li>
              <li>Charcuterie and smoking guides</li>
          </ul>
        </Section>
    </TechnicalPageLayout>
  );
};

export default SmokedAromaticsPage;
