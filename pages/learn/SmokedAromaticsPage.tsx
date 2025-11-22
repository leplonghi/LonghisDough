
import React from 'react';
import TechnicalPageLayout from './TechnicalPageLayout';

const Section: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
    <div className="mt-8 first:mt-0">
        <h3 className="flex items-center gap-2 text-xl font-semibold text-slate-900 dark:text-slate-100 mb-3">
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
      title="Smoked and Intense Aromatics"
      subtitle="How to use dominant flavor ingredients to create complexity without overwhelming the pizza."
      showReferencesSection
    >
        <Section title="Cold vs. Hot Smoking (Conceptual)">
            <p><strong>Cold smoking</strong> exposes food to smoke at temperatures that do not cook it, focusing purely on aroma absorption. It is used for ingredients like smoked salmon. <strong>Hot smoking</strong> cooks the food while smoking it, as in the case of bacon. The hot process can create a drier outer layer ("pellicle").</p>
        </Section>
        <Section title="Aromatic Effect on Cheeses and Sauces">
            <p>Smoke compounds are potent and can infuse not only the smoked ingredient but also the surrounding cheeses and sauces during baking. Bacon, for example, releases its smoked fat, which spreads and lends its aroma to the entire pizza surface.</p>
        </Section>
        <Section title="Flavor Saturation Risks">
            <p>The main risk when using ingredients like smoked cheeses, bacon, or anchovies is saturation. Intense flavor can easily dominate the palate, masking the more subtle notes of fermented dough and tomato sauce. Balance is achieved through moderation in quantity and combination with more neutral ingredients.</p>
        </Section>
        <Section title="Safe and Traditional Combinations">
            <p>To balance a smoked flavor, classic gastronomy relies on contrasts:</p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
                <li><strong>Sweetness:</strong> Ingredients like caramelized onion, honey, or fig contrast and balance salty and smoky flavors.</li>
                <li><strong>Acidity:</strong> A touch of acidity from pickles or a vibrant tomato sauce can "cut" the richness of smoked fat.</li>
                <li><strong>Creaminess:</strong> A neutral base like cream, ricotta, or potato can soften and dilute the intensity of the smoke.</li>
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
