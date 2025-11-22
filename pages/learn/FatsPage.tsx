
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

const FatsPage: React.FC = () => {
  return (
    <TechnicalPageLayout
      title="Fats in Dough: Structure, Flavor, and Texture"
      subtitle="A comparative view on the role of oils, butter, and other fats."
    >
        <Section title="Introduction: The Softening and Flavor Agent">
            <p>Fats, whether liquid (oils) or solid (butter, lard), are added to dough to modify its texture, flavor, and oven behavior. They act as a "shortener" or softener, interfering with gluten formation and lubricating the dough structure.</p>
        </Section>
        <Section title="Interaction of Fats with Gluten">
            <p>Fat molecules coat flour proteins, partially interfering with their ability to connect and form a long, rigid gluten network. This results in a "shorter" and more fragmented gluten network, translating to a softer, less "rubbery" crumb.</p>
        </Section>
        <Section title="Impact on Softness and Extensibility">
            <p>By lubricating the gluten network, fat increases dough extensibility, making it easier to stretch. The final result is a product with a softer crumb, a more tender crust, and a longer shelf life, as fat also retards starch retrogradation (the process that makes bread stale).</p>
        </Section>
        <Section title="Impact on Flavor and Final Texture">
            <p>Each type of fat contributes a distinct flavor profile: olive oil brings fruity notes, butter confers a rich, milky flavor, and lard a more rustic taste. Additionally, fats help conduct heat, contributing to a more golden and crispy crust, especially in pan-baked styles (pan pizza).</p>
        </Section>
        <Section title="When They Are Traditional (and When Not)">
            <ul className="list-disc pl-5 mt-2 space-y-1">
                <li><strong>Traditional:</strong> Adding oil or olive oil is traditional in styles like NY Style Pizza (for softness), Roman, and Focaccia (for flavor and crunch). Butter is essential in rich doughs like brioche, and lard is used in some traditional pizza recipes.</li>
                <li><strong>Non-Traditional:</strong> Purist styles like authentic Neapolitan Pizza (following AVPN rules) forbid adding any type of fat to the dough.</li>
            </ul>
        </Section>
        <Section title="Risks of Excess Fat in Dough">
            <p>While a small amount of fat is beneficial, excess can be harmful. Too much fat can excessively coat proteins and yeast, inhibiting gluten development and retarding fermentation. The result can be a heavy, oily dough with poor volume.</p>
        </Section>
        <Section title="Technical References">
          <ul className="list-disc pl-5 space-y-2">
              <li>Modernist Bread</li>
              <li>Modernist Pizza</li>
              <li>King Arthur Baking</li>
              <li>Serious Eats - The Pizza Lab</li>
          </ul>
        </Section>
    </TechnicalPageLayout>
  );
};

export default FatsPage;
