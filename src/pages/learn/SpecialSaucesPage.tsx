
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

const SpecialSaucesPage: React.FC = () => {
  return (
    <TechnicalPageLayout
      title="Special Sauces: Pesto, Ricotta & Others"
      subtitle="Behavior and risks of alternative pizza bases."
    >
        <Section title="Introduction: Expanding the Palate">
            <p>Beyond tomato and white sauces, alternative bases like pesto and ricotta creams offer unique flavor profiles. However, their oven behavior differs and requires technical consideration to avoid texture and flavor issues.</p>
        </Section>
        <Section title="Pesto: Oxidation and Green Notes">
            <p>Pesto is an emulsion of oil, basil, pine nuts, garlic, and cheese. "Green" aromatic notes of basil come from extremely volatile and heat-sensitive compounds. When pesto is exposed to intense oven heat, these compounds degrade and chlorophyll oxidizes, resulting in dark color and bitter "cooked herb" taste. Best way to use pesto on pizza is adding it <strong>post-oven</strong> or in small dollops protected under cheese.</p>
        </Section>
        <Section title="Creamy Ricotta: Moisture Vehicle">
            <p>Ricotta is a fresh cheese with high moisture content. When used as a base, it doesn't melt like mozzarella, but its moisture evaporates creating a steam environment that can cook dough underneath instead of baking it. Best way to use ricotta is in small "dollops" on pizza, not as a uniform layer. This allows surrounding dough to bake correctly. Mixing ricotta with a little salt and oil can improve stability and flavor.</p>
        </Section>
        <Section title="Bechamel and Other Dairy Bases">
            <p>Bechamel, a flour, butter, and milk emulsion, serves as a neutral creamy base. Its structure, stabilized by flour starch, is more heat resistant than simple cream. It browns well (milk protein Maillard reaction) creating rich texture, excellent base for vegetable or smoked meat pizzas.</p>
        </Section>
        <Section title="Qualitative Risks of Wet Sauces">
            <p>Main risk of using any alternative sauce is excess moisture. Too liquid sauces or those releasing water during cooking are main cause of "gum line" (dense raw dough layer under topping). Key is always seeking thicker consistency and using sauces strategically, not as a uniform heavy layer insulating dough from heat.</p>
        </Section>
        <Section title="Technical References">
          <ul className="list-disc pl-5 space-y-2">
              <li>Modernist Pizza</li>
              <li>"The Flavor Bible" by Karen Page and Andrew Dornenburg</li>
              <li>Serious Eats</li>
          </ul>
        </Section>
    </TechnicalPageLayout>
  );
};

export default SpecialSaucesPage;
