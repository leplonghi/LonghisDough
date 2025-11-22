
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

const SaltPage: React.FC = () => {
  return (
    <TechnicalPageLayout
      title="Salt: Chemical & Structural Functions"
      subtitle="Much more than flavor: salt's role in strengthening and controlling dough."
    >
        <Section title="Introduction: The Dough Regulator">
            <p>Salt is a fundamental ingredient that plays crucial and multifaceted roles in baking, going far beyond simply adding flavor. It acts as a chemical and physical regulator, directly influencing gluten structure, fermentation speed, and final product quality.</p>
        </Section>
        <Section title="Strengthening the Gluten Network">
            <p>Salt has a "tightening" effect on the gluten network. The ionic charges of sodium and chloride ions interact with gluten proteins, causing them to bond more tightly. This results in a stronger, more elastic, and less sticky dough with greater capacity to retain fermentation gas.</p>
        </Section>
        <Section title="Moderating Fermentation Speed">
            <p>Salt is hygroscopic, meaning it attracts moisture. Through osmosis, it draws water out of yeast cells, retarding their metabolism. This moderation is vital: it prevents yeast from fermenting uncontrollably, allowing flavor development processes to occur at a slower, more balanced pace.</p>
        </Section>
        <Section title="Influence on Flavor and Preservation">
            <p>Beyond its own salty taste, salt enhances other complex flavors developed in the dough during fermentation. It also possesses antimicrobial properties that help inhibit the growth of unwanted microorganisms, acting as a natural preservative.</p>
        </Section>
        <Section title="Sensory Effect on Balance">
            <p>Unsalted dough tastes insipid and flat. Salt balances the natural sweetness of wheat and the acidity of fermentation, creating a complete and pleasing flavor profile. It also contributes to a thinner, crispier crust.</p>
        </Section>
        <Section title="Qualitative Risks (Lack and Excess)">
            <ul className="list-disc pl-5 mt-2 space-y-1">
                <li><strong>Insufficient Salt:</strong> Results in a sticky, weak dough that is hard to handle. Fermentation can be very rapid and uncontrolled, and the final flavor will be bland.</li>
                <li><strong>Excessive Salt:</strong> Can severely inhibit or even kill yeast, resulting in very slow or non-existent fermentation. The dough can become excessively stiff, and the final flavor unpleasantly salty.</li>
            </ul>
        </Section>
        <Section title="Technical References">
          <ul className="list-disc pl-5 space-y-2">
              <li>Modernist Bread</li>
              <li>King Arthur Baking - The Role of Salt</li>
              <li>Serious Eats - The Pizza Lab</li>
          </ul>
        </Section>
    </TechnicalPageLayout>
  );
};

export default SaltPage;
