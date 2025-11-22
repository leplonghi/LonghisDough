
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

const CrumbStructurePage: React.FC = () => {
  return (
    <TechnicalPageLayout
      title="Crumb Structure"
      subtitle="The science behind alveoli formation and the internal texture of your pizza or bread."
    >
        <Section title="Alveoli Formation">
            <p>Alveoli, or the "bubbles" in the dough crumb, are pockets of gas (CO₂) produced by yeast during fermentation. They form at nucleation sites in the dough and grow as more gas is produced. The size, shape, and distribution of these alveoli define the final texture, from a tight, uniform crumb to an open, irregular one.</p>
        </Section>
        <Section title="Internal Tensions and the Gluten Network">
            <p>The gluten network acts as a support structure that traps these gas pockets. Crumb structure is a balance between gas pressure trying to expand the alveoli and gluten network tension trying to contain them. A strong, extensible gluten network allows alveoli to expand significantly without breaking, resulting in a light, airy crumb.</p>
        </Section>
        <Section title="Impact of Mixing and Folding">
            <p>Dough manipulation techniques, such as kneading and "stretch and fold," are fundamental for organizing and strengthening the gluten network. They align proteins, create tension, and distribute gases more evenly. Good manipulation technique results in a stronger internal structure with better gas retention capacity.</p>
        </Section>
        <Section title="Collapse of Extreme Structures">
            <p>Balance is key. A dough that is too stiff (low hydration and overdeveloped gluten) can restrict gas expansion, resulting in a dense crumb. Conversely, a dough that is too loose (high hydration with a weak gluten network) may not have enough strength to support the alveoli, causing them to rupture and the structure to collapse, also resulting in a dense and often wet crumb.</p>
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
