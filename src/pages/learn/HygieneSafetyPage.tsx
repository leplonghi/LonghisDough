
import React from 'react';
import TechnicalPageLayout from './TechnicalPageLayout';
import { ShieldCheckIcon, BookOpenIcon } from '../../components/IconComponents';

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

const HygieneSafetyPage: React.FC = () => {
  return (
    <TechnicalPageLayout
      title="Hygiene and Food Safety in Pizza"
      subtitle="Universal sanitary principles for safe responsible handling, based on science."
      showReferencesSection={false} // Custom references section at the end
    >
      <Section title="1. Introduction: Quality Base is Safety">
        <p>
          Food safety is non-negotiable. It's a system aiming for:
        </p>
        <ul className="list-disc pl-5 mt-2 space-y-1">
            <li><strong>Microbial control</strong> reducing pathogens.</li>
            <li><strong>Preventing contamination</strong> (biological, chemical, physical).</li>
            <li><strong>Responsible handling</strong> of ingredients/tools.</li>
            <li>Maintaining <strong>clean environment</strong>.</li>
        </ul>
        <p>
          Following principles protects health and ensures sensory integrity.
        </p>
      </Section>

      <Section title="2. Personal Hygiene: Starting Point" icon={<ShieldCheckIcon className="h-5 w-5" />}>
        <p>
          Handler is main contamination vector.
        </p>
        <ul className="list-disc pl-5 mt-2 space-y-1">
            <li><strong>Wash hands properly</strong> with soap/water frequently.</li>
            <li>Keep <strong>nails short/clean</strong>.</li>
            <li><strong>Avoid handling</strong> with open wounds unless covered.</li>
            <li>Avoid <strong>cross contact</strong>: never touch raw meat then ready food without washing.</li>
        </ul>
      </Section>
      
      <Section title="3. Ingredient Hygiene">
        <p>
          Sanitary quality equals sensory quality.
        </p>
        <ul className="list-disc pl-5 mt-2 space-y-1">
            <li>Use <strong>fresh ingredients</strong> from reliable sources.</li>
            <li>Discard <strong>strange odors, altered colors</strong> or <strong>bloated</strong> packs.</li>
            <li><strong>Wash vegetables</strong> well.</li>
            <li>Check appearance/smell of <strong>meats/dairy</strong> and expiry dates.</li>
        </ul>
      </Section>
      
      <Section title="4. Cross Contamination: Invisible Risk">
        <p>Transfer of microorganisms between foods/surfaces.</p>
        <ul className="list-disc pl-5 mt-2 space-y-1">
            <li><strong>Segregate boards/knives.</strong> Use different tools for raw meats/veg.</li>
            <li><strong>Never mix raw/ready</strong> in same container.</li>
            <li><strong>Clean surfaces rigorously</strong>.</li>
        </ul>
      </Section>

      <Section title="5. Common Microorganisms">
        <p>Dough/ingredients are nutrient rich:</p>
        <ul className="list-disc pl-5 mt-2 space-y-1">
            <li><strong>Bacteria:</strong> Can multiply fast. Some pathogenic.</li>
            <li><strong>Molds:</strong> Visible colonies producing mycotoxins.</li>
            <li><strong>Unwanted Yeasts:</strong> Wild yeasts producing off flavors.</li>
            <li><strong>Biofilms:</strong> Communities on dirty surfaces.</li>
        </ul>
      </Section>
      
       <Section title="6. General Dough Conservation">
        <p>Protect dough during fermentation.</p>
        <ul className="list-disc pl-5 mt-2 space-y-1">
            <li>Use <strong>clean closed containers</strong>.</li>
            <li>Avoid <strong>contaminated air</strong> contact.</li>
            <li>Clean all <strong>tools</strong>.</li>
            <li><strong>Avoid unnecessary handling</strong>.</li>
        </ul>
      </Section>

      <Section title="7. Real Risks">
        <ul className="list-disc pl-5 mt-2 space-y-1">
            <li><strong>Sensory spoilage:</strong> Off flavors/odors.</li>
            <li><strong>Foodborne illness:</strong> Pathogens causing sickness.</li>
            <li><strong>Visible mold:</strong> Discard entirely. Mycotoxins spread beyond visible mold.</li>
        </ul>
      </Section>

      <Section title="8. Technical References" icon={<BookOpenIcon className="h-5 w-5" />}>
          <ul className="list-disc pl-5 space-y-2">
            <li>WHO – Five Keys to Safer Food</li>
            <li>FDA Food Code</li>
            <li>Modernist Cuisine – Food Safety</li>
            <li>Wikipedia – Food safety</li>
          </ul>
      </Section>
    </TechnicalPageLayout>
  );
};

export default HygieneSafetyPage;
