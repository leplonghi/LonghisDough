
import React from 'react';
import TechnicalPageLayout from './TechnicalPageLayout';
import { BeakerIcon, BookOpenIcon, LightBulbIcon } from '@/components/ui/Icons';

// Local Section component for structuring content
const Section: React.FC<{ title: string, icon?: React.ReactNode, children: React.ReactNode }> = ({ title, icon, children }) => (
    <div className="mt-8">
        <h3 className="flex items-center gap-2 text-xl font-semibold text-slate-900 dark:text-slate-200 mb-3">
            {icon}
            {title}
        </h3>
        <div className="prose-sm dark:prose-invert max-w-none text-slate-700 dark:text-slate-300 leading-relaxed">
            {children}
        </div>
    </div>
);

const TroubleshootingPage: React.FC = () => {
  return (
    <TechnicalPageLayout 
        title="Diagnostics: Common Pizza Problems" 
        subtitle="A scientific guide to identifying and correcting common faults, based on technical sources."
        showReferencesSection
    >
        <Section title="1. Introduction: Pizza as a Complex System">
            <p>
                Pizza is a complex system where multiple factors — water, flour, fermentation, heat, and ingredients — interact simultaneously. A small imbalance in any of these areas can lead to unexpected results. Understanding root causes, based on science, is the path to consistency.
            </p>
        </Section>

        <Section title="2. Problem: Gum Line (Raw dough under sauce)" icon={<BeakerIcon className="h-5 w-5" />}>
            <h4>Real Causes:</h4>
            <ul className="list-disc pl-5 mt-2 space-y-1">
                <li><strong>Excess Moisture:</strong> Too liquid sauce, wet cheese, or raw vegetables release steam that "cooks" the dough instead of baking it.</li>
                <li><strong>Cold Ingredients:</strong> Very cold sauce or dough causes condensation at the interface, creating a wet layer.</li>
                <li><strong>Underfermented Dough:</strong> Lacks a developed alveoli structure to allow steam to escape.</li>
                <li><strong>Weak Oven/Floor:</strong> Lack of conduction heat at the base fails to dry the dough quickly.</li>
                <li><strong>Excess Toppings:</strong> A thick layer of toppings acts as thermal insulation, blocking heat.</li>
                <li><strong>Flour Too Weak:</strong> Gluten network may collapse under weight, compacting dough and preventing baking.</li>
            </ul>
        </Section>
        
        <Section title="3. Problem: Snapback (Dough shrinking when stretching)" icon={<LightBulbIcon className="h-5 w-5" />}>
            <h4>Scientific Explanation:</h4>
            <ul className="list-disc pl-5 mt-2 space-y-1">
                <li><strong>Tensioned Gluten:</strong> The gluten network, especially glutenin protein, is contracted and behaving like a rubber band.</li>
                <li><strong>Insufficient Rest:</strong> Dough hasn't had enough time to relax after balling (handling). Rest allows gluten bonds to readjust.</li>
                <li><strong>Flour Too Strong (High P/L):</strong> Flours with high tenacity (P) are naturally more elastic and prone to snapback.</li>
                <li><strong>Low Dough Temperature:</strong> Cold stiffens the gluten network, making it less extensible and more elastic.</li>
            </ul>
        </Section>

        <Section title="4. Problem: Burnt Base">
            <h4>Real Causes:</h4>
            <ul className="list-disc pl-5 mt-2 space-y-1">
                <li><strong>Floor Too Hot:</strong> Excess conduction heat, common when placing pizza on an area recently exposed to embers in wood ovens.</li>
                <li><strong>Highly Conductive Surface:</strong> A baking steel transfers heat much faster than stone. In extremely high-temp ovens, steel can burn the base before the top cooks.</li>
                <li><strong>Excess Flour on Bench:</strong> Loose flour on pizza base burns rapidly at high temperatures, creating bitter taste and soot.</li>
            </ul>
        </Section>

        <Section title="5. Problem: Soggy Pizza">
            <h4>Real Causes:</h4>
            <ul className="list-disc pl-5 mt-2 space-y-1">
                <li><strong>Vegetables Releasing Water:</strong> Ingredients like mushrooms, zucchini, and spinach, when raw, release large amounts of moisture.</li>
                <li><strong>Sauce Too Liquid:</strong> Excess water in sauce doesn't evaporate in time and is absorbed by dough.</li>
                <li><strong>Cheese Too Wet:</strong> Fresh mozzarella (fior di latte, buffalo) must be well drained before use.</li>
                <li><strong>Excess Toppings:</strong> Too many cold, wet ingredients overload the oven's capacity to evaporate moisture.</li>
                <li><strong>Cold Oven Floor:</strong> Not enough conduction heat to seal and dry the dough base.</li>
            </ul>
        </Section>
        
        <Section title="6. Problem: Pale Pizza">
            <h4>Causes:</h4>
            <ul className="list-disc pl-5 mt-2 space-y-1">
                <li><strong>Lack of Radiant Heat:</strong> Oven ceiling isn't hot enough. In home ovens, bottom heat is often stronger.</li>
                <li><strong>Wet Surface:</strong> Oven energy is spent evaporating water, preventing surface from reaching temperatures needed for Maillard/caramelization reactions.</li>
                <li><strong>Little Available Sugar:</strong> Can be caused by short fermentation (didn't break down enough starch) or over-fermentation (yeast consumed all sugars).</li>
            </ul>
        </Section>

        <Section title="7. Problem: Dense Dough">
            <h4>Causes:</h4>
            <ul className="list-disc pl-5 mt-2 space-y-1">
                <li><strong>Insufficient Fermentation (Under-proofed):</strong> Yeast didn't produce enough CO₂ to inflate gluten network.</li>
                <li><strong>Weak or Poorly Hydrated Flour:</strong> Gluten network didn't form correctly to retain gas.</li>
                <li><strong>Inadequate Dough Temperature:</strong> Too cold inhibits yeast; too hot can lead to structure collapse.</li>
                <li><strong>Over-handling (Degassing):</strong> Stretching dough too forcefully or using a rolling pin can expel all accumulated gas.</li>
            </ul>
        </Section>

        <Section title="8. Problem: Edge Bursts / Irregular">
            <h4>Causes:</h4>
            <ul className="list-disc pl-5 mt-2 space-y-1">
                <li><strong>Uneven Gas Accumulation:</strong> Large gas bubbles trapped in dough expanding rapidly in oven.</li>
                <li><strong>Inconsistent Stretching:</strong> Leaving parts of the edge thinner creates weak points that burst.</li>
                <li><strong>Very Advanced Fermentation:</strong> Gluten network is at its elasticity limit and breaks easily with gas expansion in oven.</li>
            </ul>
        </Section>
        
        <Section title="9. Technical References" icon={<BookOpenIcon className="h-5 w-5" />}>
          <ul className="list-disc pl-5 space-y-2">
              <li>Modernist Pizza</li>
              <li>Modernist Bread</li>
              <li>Serious Eats – Pizza Troubleshooting Guides</li>
              <li>Ooni Learn – Common Pizza Problems</li>
              <li>Wikipedia – Maillard Reaction, Caramelization, Baking Chemistry</li>
          </ul>
        </Section>
    </TechnicalPageLayout>
  );
};

export default TroubleshootingPage;
