

import React from 'react';
import TechnicalPageLayout from './TechnicalPageLayout';
import { BookOpenIcon, BeakerIcon } from '../../components/IconComponents';

const Section: React.FC<{ title: string; icon?: React.ReactNode; children: React.ReactNode }> = ({ title, icon, children }) => (
    <div className="mt-8 first:mt-0">
        <h3 className="flex items-center gap-2 text-xl font-semibold text-slate-900 dark:text-slate-200 mb-3">
            {icon}
            {title}
        </h3>
        <div className="prose-sm dark:prose-invert max-w-none text-slate-700 dark:text-slate-300 leading-relaxed">
            {children}
        </div>
    </div>
);

const FermentationPage: React.FC = () => {
  return (
    <TechnicalPageLayout 
        title="Cold Fermentation: The Science of Time" 
        showReferencesSection
    >
        <Section title="1. Introduction: The Art of Patience">
            <p>
                Cold fermentation, or cold maturation, is the technique of keeping the dough at low temperatures (typically refrigerated) for an extended period. The goal isn't just to make the dough rise, but to orchestrate a series of slow biochemical transformations to:
            </p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
                <li><strong>Slow down microbial activity:</strong> Reduce the yeast's pace to avoid overproduction of gas.</li>
                <li><strong>Allow slow starch digestion:</strong> Give enzymes in the flour time to break down complex carbohydrates.</li>
                <li><strong>Develop deep flavor:</strong> Generate a complex range of aromatic compounds that don't appear in fast fermentations.</li>
                <li><strong>Increase extensibility:</strong> Relax the gluten network, making the dough easier to handle and stretch.</li>
            </ul>
        </Section>

        <Section title="2. What Happens Scientifically" icon={<BeakerIcon className="h-5 w-5" />}>
            <p>At low temperatures, the dough becomes a laboratory of slow reactions:</p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
                <li><strong>Yeast sleeps:</strong> CO₂ production by yeast (<em>Saccharomyces cerevisiae</em>) decreases drastically but doesn't stop completely.</li>
                <li><strong>Bacteria modulate acidity:</strong> Lactic Acid Bacteria (LAB), if present (especially in sourdough), continue to produce lactic and acetic acids at a slow pace, contributing to flavor complexity.</li>
                <li><strong>Enzymes keep working:</strong> Natural flour enzymes, <strong>amylases</strong> and <strong>proteases</strong>, are less sensitive to cold than yeast. They continue to break down starches into simple sugars and proteins into amino acids, respectively.</li>
                <li><strong>Protein structure relaxes:</strong> Protease action and extended time relax the gluten network bonds, making it more extensible.</li>
                <li><strong>Flavor deepens:</strong> Slow enzymatic and microbial activity generates a greater variety of alcohols, esters, and other aromatic compounds, resulting in a much richer flavor profile.</li>
            </ul>
        </Section>
        
        <Section title="3. Effects on Texture">
            <p>The result of cold fermentation on texture is remarkable, as noted by sources like King Arthur Baking and Ooni:</p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
                <li><strong>Greater extensibility without tearing:</strong> The dough becomes significantly easier to stretch to a thinness with less "snap-back" (shrinking).</li>
                <li><strong>Lighter, airier internal structure:</strong> The relaxed and strong gluten network can expand better in the oven, creating a crumb structure with finer, well-distributed alveoli.</li>
                <li><strong>More balanced chewiness:</strong> The crust tends to be crispier and the crumb softer and moist, rather than dense or rubbery.</li>
            </ul>
        </Section>

        <Section title="4. Effects on Flavor">
            <p>The flavor difference between a quick dough and a cold-fermented one is profound:</p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
                <li><strong>Develops complex notes:</strong> Long maturation allows the development of aromatic notes that can be described as <strong>fruity</strong> (due to esters), <strong>lactic</strong> (a mild, almost yogurt-like flavor), and <strong>complex</strong>.</li>
                <li><strong>Quick doughs tend to have a more neutral profile:</strong> Flavor is dominated by wheat and yeast, without the layers of complexity developed over time.</li>
            </ul>
        </Section>

        <Section title="5. Style Considerations">
            <p>
                Cold fermentation is a pillar for many artisanal pizza styles, but is especially beneficial for:
            </p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
                <li><strong>Classic styles like NY and Roman (Teglia):</strong> Both benefit immensely from the extensibility and flavor development provided by long fermentation.</li>
                <li><strong>Pizzas requiring high extensibility:</strong> Any style requiring a very thin and uniform base benefits from a well-relaxed dough.</li>
            </ul>
        </Section>

        <Section title="6. Real Risks and Mitigation">
            <ul className="list-disc pl-5 mt-2 space-y-1">
                <li><strong>Over-fermentation:</strong> Even in the cold, dough can go too far, especially if fridge temperature is unstable or too high (above 4°C). The result is an acidic, weak, and sticky dough.</li>
                <li><strong>Poor storage:</strong> Dough must be stored in an airtight container to prevent surface drying, which creates a "skin" and hinders rising.</li>
                <li><strong>Contamination:</strong> The container must be perfectly clean to avoid growth of unwanted microorganisms during the long storage period.</li>
            </ul>
        </Section>
        
        <Section title="7. Relation to DDT (Desired Dough Temperature)">
            <p>
              Reaching the correct initial dough temperature (DDT) is even more crucial in cold fermentation. Dough entering the fridge too warm will continue to ferment actively for hours before cooling down, consuming sugars and potentially leading to over-fermentation. A consistent starting dough ensures a predictable cooling and maturation process.
            </p>
        </Section>

        <Section title="8. Technical References" icon={<BookOpenIcon className="h-5 w-5" />}>
          <ul className="list-disc pl-5 space-y-2">
              <li>Modernist Pizza – cold fermentation</li>
              <li>Modernist Bread – thermal effects</li>
              <li>King Arthur Baking – dough flavor</li>
              <li>Ooni Learn</li>
              <li>Wikipedia – yeast biology</li>
          </ul>
        </Section>
    </TechnicalPageLayout>
  );
};

export default FermentationPage;
