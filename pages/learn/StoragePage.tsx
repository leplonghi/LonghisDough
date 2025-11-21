
import React from 'react';
import TechnicalPageLayout from './TechnicalPageLayout';
import { BeakerIcon, BookOpenIcon, ShieldCheckIcon } from '../../components/IconComponents';

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

const StoragePage: React.FC = () => {
  return (
    <TechnicalPageLayout
      title="Technical Dough Storage"
      subtitle="The science behind storing dough to control fermentation, preserve texture, and ensure safety."
      showReferencesSection={false} // Custom references section at the end
    >
      <Section title="1. Introduction: Storage as a Control Tool">
        <p>
          Proper dough storage is not a passive step, but an active tool to modulate the final result. How dough is stored directly influences:
        </p>
        <ul className="list-disc pl-5 mt-2 space-y-1">
            <li><strong>Fermentation speed and profile</strong>, by controlling temperature and oxygen exposure.</li>
            <li><strong>Texture and surface hydration</strong>, preventing drying that impairs extensibility.</li>
            <li><strong>Flavor development</strong>, by allowing enzymatic and microbial processes to occur in a stable environment.</li>
            <li><strong>Safety and hygiene</strong>, protecting the dough from external contamination.</li>
            <li><strong>Gluten stability</strong>, ensuring the dough maintains its ability to retain gas.</li>
        </ul>
      </Section>

      <Section title="2. Suitable Containers" icon={<ShieldCheckIcon className="h-5 w-5" />}>
        <p>
          The choice of container is the first line of defense for dough integrity.
        </p>
        <ul className="list-disc pl-5 mt-2 space-y-1">
            <li><strong>Clean, airtight containers</strong> are essential to prevent contamination by unwanted microorganisms (fungi, bacteria) from the environment.</li>
            <li>Using individual boxes or dividers for dough balls <strong>prevents drying</strong> and keeps them from sticking together.</li>
            <li>The container must have <strong>sufficient space for expansion</strong>. Inadequate space can cause the dough to press against the lid, collapsing its gas structure and losing volume.</li>
        </ul>
      </Section>
      
      <Section title="3. Air Contact: The Enemy of the Surface">
        <p>
          Direct exposure to air is detrimental to the dough surface.
        </p>
        <ul className="list-disc pl-5 mt-2 space-y-1">
            <li>Air <strong>dehydrates the surface</strong>, creating a dry "skin" or crust. This layer loses elasticity and can cause tearing during stretching, as well as creating hard spots on the crust after baking.</li>
            <li>Oxygen contact can also lead to <strong>surface oxidation</strong>, which may subtly affect flavor and color.</li>
        </ul>
      </Section>
      
      <Section title="4. Internal Humidity Control">
        <p>Maintaining humidity balance within the container is crucial.</p>
        <ul className="list-disc pl-5 mt-2 space-y-1">
            <li><strong>Closed boxes retain moisture</strong> naturally released by the dough, creating a stable microclimate that keeps the surface pliable.</li>
            <li>The traditional method of covering with a <strong>damp cloth</strong> works on the same principle of maintaining surface moisture, but offers less protection against contamination.</li>
            <li><strong>Excess moisture can cause condensation</strong>, especially if warm dough is placed in a cold environment. Water droplets on the surface can make the dough excessively sticky.</li>
        </ul>
      </Section>

      <Section title="5. Contamination: Real Risks">
        <p>Dough is an ideal culture medium for microorganisms. Protection against contamination is fundamental.</p>
        <ul className="list-disc pl-5 mt-2 space-y-1">
            <li><strong>Environmental molds</strong> can settle on the surface of unprotected dough, especially during long fermentations.</li>
            <li><strong>Unwanted bacteria</strong> from dirty surfaces or utensils can compete with yeast and produce unpleasant flavors and odors.</li>
            <li>Dough is porous to odors. Storing it near strong-smelling foods (like onion or fish) in the fridge can result in <strong>odor migration</strong>, contaminating the delicate flavor of the dough.</li>
        </ul>
      </Section>
      
       <Section title="6. Storage During Cold Fermentation">
        <p>Refrigerated storage (cold fermentation) is a powerful technique but requires specific care.</p>
        <ul className="list-disc pl-5 mt-2 space-y-1">
            <li><strong>Lower temperatures drastically slow down yeast activity</strong> but do not stop it completely. This allows slower enzymatic processes to continue, developing flavor complexity not possible at room temperature.</li>
            <li>The cold, damp environment of a fridge makes <strong>clean, well-sealed containers</strong> even more important to avoid cross-contamination with other foods.</li>
        </ul>
      </Section>

      <Section title="7. Post-Balling Storage">
        <p>After the dough is divided and balled, the goal of storage is to preserve the structure of each individual ball.</p>
        <ul className="list-disc pl-5 mt-2 space-y-1">
            <li>Dough balls should be stored in a way that <strong>maintains their shape and surface tension</strong>.</li>
            <li><strong>Avoid stacking or squashing</strong> the balls, as this destroys the internal gas structure carefully developed.</li>
            <li>Each ball must have its own space to ferment and expand without touching others.</li>
        </ul>
      </Section>
      
      <Section title="8. Common Risks of Improper Storage">
        <ul className="list-disc pl-5 mt-2 space-y-1">
            <li><strong>Dried dough:</strong> Results in a tearing surface and hard crust. Cause: poor seal or air exposure.</li>
            <li><strong>Excessively sticky dough:</strong> Difficult to handle. Cause: condensation inside a sealed container when warm dough is refrigerated.</li>
            <li><strong>Strong alcohol smell:</strong> Indicates uncontrolled anaerobic fermentation, often in a container that is too airtight at high temperatures.</li>
        </ul>
      </Section>

      <Section title="9. Technical References" icon={<BookOpenIcon className="h-5 w-5" />}>
          <ul className="list-disc pl-5 space-y-2">
            <li>Modernist Pizza</li>
            <li>Modernist Bread</li>
            <li>King Arthur Baking – Dough Storage Guides</li>
            <li>Ooni Learn – Storing Pizza Dough</li>
            <li>Wikipedia – Basic microbiology and food safety</li>
          </ul>
      </Section>
    </TechnicalPageLayout>
  );
};

export default StoragePage;
