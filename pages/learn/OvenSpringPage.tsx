
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

const OvenSpringPage: React.FC = () => {
  return (
    <TechnicalPageLayout
      title="Oven Spring: The Science of Initial Expansion"
      subtitle="Understand the phenomenon that defines the texture and volume of your dough."
    >
        <Section title="Rapid Gas Expansion">
            <p>Oven spring is the dramatic final expansion the dough undergoes in the first moments inside the oven. This phenomenon is driven by two main physical events: the rapid expansion of gases already trapped in the dough (mostly CO₂ from fermentation) and the creation of new gas through the evaporation of water into steam.</p>
        </Section>
        <Section title="Gluten Network Behavior">
            <p>The gluten network, developed during mixing and folding, acts as an elastic web that traps these gases. In the oven heat, this network stretches to its limit. A strong and well-developed gluten network is crucial to contain this violent expansion without rupturing, allowing the dough to inflate and create an airy crumb.</p>
        </Section>
        <Section title="Elasticity and Gas Retention">
            <p>A dough's capacity for good oven spring depends on the balance between elasticity (the ability to stretch) and tenacity (the strength not to break) of the gluten. A dough with good gas retention will keep its structure inflated, while a weak dough may collapse.</p>
        </Section>
        <Section title="Hydration Influence">
            <p>Higher hydration means more water available to turn into steam. This additional steam creates higher internal pressure, contributing to a more vigorous expansion and a more open crumb. However, high hydration requires a strong gluten network to contain this pressure.</p>
        </Section>
        <Section title="Internal Steam Role">
            <p>The transformation of liquid water into steam is a massive expansion event. The steam generated inside the dough is one of the main drivers of oven spring, inflating the alveoli from the inside out. It is a purely physical process that occurs in parallel with CO₂ expansion.</p>
        </Section>
        <Section title="Collapse of Weak Structure">
            <p>If the gluten network is underdeveloped (lack of kneading/folds), over-fermented (degraded by enzymes), or made with very weak flour, it won't have the strength needed to contain the gas expansion. In this case, the structure can rupture, allowing gas to escape and resulting in a dense dough with little volume.</p>
        </Section>
        <Section title="Technical References">
          <ul className="list-disc pl-5 space-y-2">
              <li>Modernist Pizza</li>
              <li>Modernist Bread</li>
              <li>King Arthur Baking</li>
              <li>Wikipedia (Gluten, Oven Spring)</li>
          </ul>
        </Section>
    </TechnicalPageLayout>
  );
};

export default OvenSpringPage;
