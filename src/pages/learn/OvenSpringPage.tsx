
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

const OvenSpringPage: React.FC = () => {
  return (
    <TechnicalPageLayout
      title="Oven Spring: Initial Expansion Science"
      subtitle="Understand the phenomenon defining texture and volume of your dough."
    >
        <Section title="Rapid Gas Expansion">
            <p>Oven spring is the dramatic final expansion dough undergoes in first oven moments. Driven by rapid expansion of trapped gases (mostly CO₂) and creation of new gas via steam evaporation.</p>
        </Section>
        <Section title="Gluten Network Behavior">
            <p>Gluten network acts as elastic web trapping gases. In oven heat, network stretches to limit. Strong developed network is crucial to contain violent expansion without rupture, allowing dough to inflate and create airy crumb.</p>
        </Section>
        <Section title="Elasticity and Gas Retention">
            <p>Capacity for good oven spring depends on balance between elasticity (stretch) and tenacity (strength) of gluten. Dough with good retention keeps structure inflated; weak dough collapses.</p>
        </Section>
        <Section title="Hydration Influence">
            <p>Higher hydration means more water available for steam. Additional steam creates higher internal pressure, contributing to vigorous expansion and open crumb. Requires strong gluten to contain.</p>
        </Section>
        <Section title="Internal Steam Role">
            <p>Water to steam transformation is massive expansion event. Steam generated inside is a main driver of oven spring, inflating alveoli. Physical process parallel to CO₂ expansion.</p>
        </Section>
        <Section title="Weak Structure Collapse">
            <p>If gluten is underdeveloped, over-fermented, or weak flour used, it won't contain gas expansion. Structure ruptures, gas escapes, resulting in dense low volume dough.</p>
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
