
import React from 'react';
import TechnicalPageLayout from './TechnicalPageLayout';
import { ShieldCheckIcon, BookOpenIcon, BeakerIcon } from '../../components/IconComponents';

// Local Section component for structuring content
const Section: React.FC<{ title: string, icon?: React.ReactNode, children: React.ReactNode }> = ({ title, icon, children }) => (
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

const EquipmentPage: React.FC = () => {
  return (
    <TechnicalPageLayout
      title="Essential Pizza Equipment"
      subtitle="Technical analysis of how each tool impacts final result, from peel to baking surface."
      showReferencesSection={false} // Custom references section at the end
    >
      <Section title="1. Introduction: Tools Shaping Pizza">
        <p>
          Equipment is integral to process, influencing:
        </p>
        <ul className="list-disc pl-5 mt-2 space-y-1">
            <li><strong>Thermal conduction/capacity</strong> dictating heat transfer.</li>
            <li><strong>Manipulation</strong> ease.</li>
            <li><strong>Baking speed</strong> impacting hydration.</li>
            <li><strong>Final texture</strong> of crust.</li>
        </ul>
      </Section>

      <Section title="2. Peels">
        <h4>a) Wooden Peel</h4>
        <ul className="list-disc pl-5 mt-2 space-y-1">
            <li><strong>Less sticky:</strong> Porous wood absorbs moisture helping prevent sticking.</li>
            <li><strong>Ideal for prep:</strong> Best for assembling pizza.</li>
            <li><strong>Lower thermal transfer:</strong> Doesn't heat up much.</li>
        </ul>
        <h4>b) Metal Peel</h4>
        <ul className="list-disc pl-5 mt-2 space-y-1">
            <li><strong>Thinner:</strong> Slides under baked pizza easily.</li>
            <li><strong>Best for retrieval:</strong> Ideal for turning/removing.</li>
            <li><strong>Stickier:</strong> Raw dough sticks to smooth metal.</li>
        </ul>
      </Section>
      
      <Section title="3. Pizza Stones">
        <ul className="list-disc pl-5 mt-2 space-y-1">
            <li><strong>Medium thermal capacity:</strong> Stores heat well, transfers gradually.</li>
            <li><strong>Good stability:</strong> Maintains temp between pizzas.</li>
            <li><strong>Balanced baking:</strong> Uniform base cooking, versatile.</li>
        </ul>
      </Section>
      
      <Section title="4. Baking Steel">
        <ul className="list-disc pl-5 mt-2 space-y-1">
            <li><strong>Very high conductivity:</strong> Transfers heat rapidly.</li>
            <li><strong>Base browns faster:</strong> Crispier base, better oven spring in home ovens.</li>
            <li><strong>Burn risk:</strong> Can burn base before top cooks if top heat is weak.</li>
        </ul>
      </Section>

      <Section title="5. Biscotto (Refractory Clay)">
        <ul className="list-disc pl-5 mt-2 space-y-1">
            <li><strong>Low conductivity:</strong> Porous clay transfers heat gently.</li>
            <li><strong>Ideal for Neapolitan:</strong> Perfect for high temp ovens, cooking base without burning.</li>
        </ul>
      </Section>
      
      <Section title="6. Detroit Pans (Steel)">
        <ul className="list-disc pl-5 mt-2 space-y-1">
            <li><strong>Heat to edges:</strong> High conductive walls bake sides.</li>
            <li><strong>Cheese caramelization (Frico):</strong> Creates crispy cheese wall.</li>
            <li><strong>Uniform expansion:</strong> Contained growth for airy crumb.</li>
        </ul>
      </Section>

      <Section title="7. Cutters and Spatulas">
        <ul className="list-disc pl-5 mt-2 space-y-1">
            <li><strong>Stainless Steel:</strong> Durable, hygienic.</li>
            <li><strong>Sharp Blades:</strong> Clean cuts without dragging topping.</li>
        </ul>
      </Section>

      <Section title="8. Materials Science (Qualitative)" icon={<BeakerIcon className="h-5 w-5" />}>
        <ul className="list-disc pl-5 mt-2 space-y-1">
            <li><strong>Metals:</strong> High conductivity. Fast heat transfer.</li>
            <li><strong>Ceramics:</strong> Low conductivity, high retention. Gradual heat release.</li>
            <li><strong>Aluminum:</strong> Heats/cools fast.</li>
            <li><strong>Steel:</strong> Heats fast, holds less heat than ceramic.</li>
        </ul>
      </Section>

      <Section title="9. Risks">
        <ul className="list-disc pl-5 mt-2 space-y-1">
            <li><strong>Steel too hot:</strong> Burns base.</li>
            <li><strong>Stone cold:</strong> Raw base ("gum line").</li>
            <li><strong>Dirty tools:</strong> Contamination.</li>
        </ul>
      </Section>

      <Section title="10. Technical References" icon={<BookOpenIcon className="h-5 w-5" />}>
          <ul className="list-disc pl-5 space-y-2">
            <li>Modernist Pizza</li>
            <li>Serious Eats – Steel vs. Stone</li>
            <li>Ooni Learn – Baking Surfaces</li>
            <li>Wikipedia – Thermal properties</li>
          </ul>
      </Section>
    </TechnicalPageLayout>
  );
};

export default EquipmentPage;
