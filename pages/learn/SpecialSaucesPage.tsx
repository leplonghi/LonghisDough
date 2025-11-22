
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

const SpecialSaucesPage: React.FC = () => {
  return (
    <TechnicalPageLayout
      title="Special Sauces: Pesto, Ricotta, and Others"
      subtitle="Behavior and risks of alternative bases on pizza."
    >
        <Section title="Introduction: Expanding the Palate">
            <p>Beyond tomato and white sauces, alternative bases like pesto and ricotta creams offer unique flavor profiles. However, their oven behavior is different and requires technical consideration to avoid texture and flavor issues.</p>
        </Section>
        <Section title="Pesto: Oxidation and Green Notes">
            <p>Pesto is an emulsion of olive oil with basil, pine nuts, garlic, and cheese. Basil's "green" aromatic notes come from extremely volatile and heat-sensitive compounds. When pesto is exposed to intense oven heat, these compounds degrade and chlorophyll oxidizes, resulting in a dark color and a bitter, "cooked herb" flavor. Therefore, the best way to use pesto on pizza is to add it <strong>post-oven</strong> or in small dollops protected under cheese.</p>
        </Section>
        <Section title="Creamy Ricotta: Moisture Vehicle">
            <p>Ricotta is a fresh cheese with high moisture content. When used as a base, it doesn't melt like mozzarella, but its moisture evaporates, creating a steam environment that can cook the dough underneath instead of baking it. The best way to use ricotta is in small dollops on the pizza, not as a uniform layer. This allows the surrounding dough to bake correctly. Mixing ricotta with a little salt and olive oil can improve its stability and flavor.</p>
        </Section>
        <Section title="Béchamel and Other Dairy Bases">
            <p>Béchamel, an emulsion of flour, butter, and milk, serves as a neutral, creamy base. Its structure, stabilized by flour starch, is more heat-resistant than simple cream. It browns well (Maillard reaction of milk proteins) and creates a rich texture, making it an excellent base for pizzas with vegetables or smoked meats.</p>
        </Section>
        <Section title="Qualitative Risks of Wet Sauces">
            <p>The main risk of using any alternative sauce is excess moisture. Sauces that are too liquid or release water during cooking are the primary cause of "gum line" (the dense, raw layer of dough just below the topping). The key is to always seek a thicker consistency and use sauces strategically, not as a heavy uniform layer that insulates the dough from heat.</p>
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
