
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

const DoughAgingPage: React.FC = () => {
  return (
    <TechnicalPageLayout
      title="Dough Aging: Maturation and Degradation"
      subtitle="What happens to dough over time, from sensory maturation to starch retrogradation."
    >
        <Section title="Gluten Aging">
            <p>Over time, the gluten network undergoes a relaxation process. Protease enzymes, naturally present in flour, begin to break down long protein chains. Controlled aging (like in cold fermentation) results in a more extensible and softer dough. However, excessive aging can degrade gluten so much that the dough loses its strength, becoming weak and sticky.</p>
        </Section>
        <Section title="Aromatic Changes and Sensory Maturation">
            <p>"Aging" of dough is synonymous with flavor maturation. During prolonged periods, especially under refrigeration, the slow activity of yeasts and bacteria produces a much wider and more complex range of aromatic compounds (esters, alcohols, acids). This transforms the dough's flavor from something simple and "floury" to something with fruity, lactic, and deep notes.</p>
        </Section>
        <Section title="Starch Retrogradation (Qualitative)">
            <p>After baking, gelatinized starch (which absorbed water and swelled) begins to recrystallize and release the water it had absorbed. This process, known as starch retrogradation, is the main cause of bread and pizza staling, making them hard and dry. The process is faster at refrigerator temperatures than at room temperature (for the baked product).</p>
        </Section>
        <Section title="Loss of Elasticity">
            <p>An "aged" dough (one that has passed the ideal fermentation point) often loses its elasticity. Gluten degradation means the dough no longer has the ability to "spring back" when stretched and can tear easily, as its support structure has been compromised.</p>
        </Section>
        <Section title="Risk of 'Tired' Dough">
            <p>A "tired" dough is one that has fermented for too long. It may smell excessively alcoholic or vinegary, have a weak and sticky texture, and fail to show good "oven spring" in the oven, resulting in a flat and dense final product. It is the result of sugar depletion and protein structure degradation.</p>
        </Section>
        <Section title="Technical References">
          <ul className="list-disc pl-5 space-y-2">
              <li>Modernist Bread</li>
              <li>Wikipedia (Starch Retrogradation, Gluten)</li>
              <li>King Arthur Baking</li>
          </ul>
        </Section>
    </TechnicalPageLayout>
  );
};

export default DoughAgingPage;
