
import React from 'react';
import TechnicalPageLayout from './TechnicalPageLayout';
import { FireIcon, BeakerIcon, BookOpenIcon, LightBulbIcon } from '@/components/ui/Icons';

// Local Section component for structuring content
const Section: React.FC<{ title: string, icon?: React.ReactNode, children: React.ReactNode }> = ({ title, icon, children }) => (
    <div className="mt-8 first:mt-0">
        <h3 className="flex items-center gap-2 text-xl font-semibold text-slate-800 dark:text-slate-200 mb-3">
            {icon}
            {title}
        </h3>
        <div className="prose-sm dark:prose-invert max-w-none text-slate-700 dark:text-slate-300 leading-relaxed">
            {children}
        </div>
    </div>
);

const OvenSciencePage: React.FC = () => {
  return (
    <TechnicalPageLayout title="Baking Pizza: The Physics of the Oven" showReferencesSection>
        <Section title="1. Introduction: The Thermal Shock That Creates Pizza">
            <p>
              Scientifically, baking is the most violent and transformative stage in the dough's life. When the pizza enters the oven, it undergoes a thermal shock triggering a cascade of physical and chemical events in seconds, as described in "Modernist Pizza":
            </p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
                <li><strong>Thermal shock:</strong> Cold dough meets intense oven heat.</li>
                <li><strong>Rapid water evaporation:</strong> Water on dough surface and ingredients turns to steam almost instantly.</li>
                <li><strong>Gas expansion (Oven Spring):</strong> CO₂ trapped in gluten and newly formed steam expand violently, causing "oven spring" and puffing the rim (cornicione).</li>
                <li><strong>Surface coloration:</strong> Maillard reactions and caramelization occur on dry surface, developing color and flavor.</li>
                <li><strong>Internal structure stabilization:</strong> Starch gelatinizes and gluten proteins coagulate, fixing the aerated dough structure.</li>
            </ul>
        </Section>

        <Section title="2. Heat Flow: The Three Mechanisms">
            <p>
              Heat isn't a single entity; it transfers in three distinct ways. Baking excellence, as Kenji López-Alt explains, depends on perfect balance between them. Different ovens drastically alter the dominance of each mechanism.
            </p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
                <li>Heat <strong>flows from hot oven surface (deck) to pizza base</strong> (Conduction).</li>
                <li>Radiant heat <strong>acts on upper surface</strong> of pizza, coming from ceiling and flames (Radiation).</li>
                <li>Convective heat <strong>warms air around</strong> pizza, helping cook ingredients and remove moisture (Convection).</li>
            </ul>
        </Section>
        
        <Section title="3. Conduction: Base Heat">
            <p>
              Conduction is heat transfer by direct contact. Oven floor (steel, stone, or brick) transfers thermal energy to dough base. Transfer speed is fundamental for crispy base. Different materials conduct heat at different speeds. Steel, for example, is a much faster conductor than stone, transferring heat more aggressively.
            </p>
        </Section>
        
        <Section title="4. Radiation: Top Heat">
            <p>
              Radiation is heat emitted as infrared waves. In a pizza oven, it comes from the ceiling (dome), walls, and crucially, flame in a wood oven. This is main mechanism responsible for controlling rim and surface coloration and cooking toppings.
            </p>
        </Section>

        <Section title="5. Convection: Moving Air">
            <p>
              Convection is heat transfer by hot air movement. In electric home ovens, there is often a fan to force this circulation. Convection helps bake pizza more evenly and is crucial for removing steam layer forming around pizza, allowing surface to dry and brown.
            </p>
        </Section>
        
        <Section title="6. Phase Change: The Power of Steam">
            <p>
              Transformation of water to steam is one of most important events in oven.
            </p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
                <li><strong>Rapid water evaporation</strong> in dough turns to steam. Since steam occupies much larger volume than liquid water, it violently expands existing gas bubbles, contributing to "oven spring".</li>
                <li>Free water in ingredients (especially sauce and veg) also evaporates. <strong>Controlling this moisture is critical</strong> to avoid soggy pizza.</li>
            </ul>
        </Section>

        <Section title="7. Baking Stages">
            <p>
              Baking can be divided into sequential and overlapping stages:
            </p>
            <ol className="list-decimal pl-5 mt-2 space-y-1">
                <li><strong>Expansion (Oven Spring):</strong> In first 30-60 seconds, heat accelerates final yeast activity and expands CO₂ and water vapor, inflating dough.</li>
                <li><strong>Structure Fixation:</strong> As internal dough temperature rises, starch gelatinizes and gluten proteins coagulate, solidifying aerated structure created in expansion phase.</li>
                <li><strong>Surface Drying:</strong> Moisture on dough surface evaporates, creating dry "skin", prerequisite for coloring reactions.</li>
                <li><strong>Coloration (Browning):</strong> With dry surface and high temperature, Maillard Reaction and Caramelization occur, developing color, flavor, and aroma.</li>
            </ol>
        </Section>

        <Section title="8. Interaction with Ingredients">
            <p>
              Toppings aren't passive; they interact with heat and dough.
            </p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
                <li><strong>Very wet sauces</strong> release steam and delay surface drying, which can inhibit coloring and lead to raw base ("gum line").</li>
                <li><strong>Very fatty cheeses</strong> suffer "oil-out", releasing oil that can fry surface of other ingredients.</li>
                <li><strong>Fresh meats</strong> release fat and water, impacting moisture.</li>
                <li><strong>Raw vegetables</strong> release large amount of steam, which needs managing to not soak pizza.</li>
            </ul>
        </Section>

        <Section title="9. Risks: Thermal Imbalance">
            <ul className="list-disc pl-5 mt-2 space-y-1">
                <li><strong>Baking too fast (excess top heat):</strong> Pizza gains color outside, but crumb remains raw.</li>
                <li><strong>Baking too slow (cold oven):</strong> Dough dehydrates slowly before baking, resulting in dry hard texture.</li>
                <li><strong>Cold floor (lack of conduction):</strong> Base doesn't cook properly, staying pale and soggy, even if top looks ready.</li>
            </ul>
        </Section>
        
        <Section title="10. Technical References" icon={<BookOpenIcon className="h-5 w-5" />}>
          <ul className="list-disc pl-5 space-y-2">
              <li>Modernist Pizza – Nathan Myhrvold & Francisco Migoya</li>
              <li>Serious Eats (J. Kenji López-Alt) – The Pizza Lab: Heat Transfer</li>
              <li>Ooni Learn – The Science of Baking a Pizza</li>
              <li>Wikipedia – Conduction, Convection, Radiation (Thermodynamics)</li>
          </ul>
        </Section>
    </TechnicalPageLayout>
  );
};

export default OvenSciencePage;
