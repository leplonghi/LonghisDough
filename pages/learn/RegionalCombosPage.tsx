
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

const RegionalCombosPage: React.FC = () => {
  return (
    <TechnicalPageLayout
      title="Regional Combinations of the World"
      subtitle="A historical and cultural profile of how different places created iconic pizzas."
      showReferencesSection
    >
        <Section title="Italian Traditions: Simplicity and Quality">
            <p>Italian tradition, especially southern (Naples), values simplicity and high quality of few ingredients. Combinations like Margherita are not just a recipe, but a celebration of tomato, mozzarella, and basil. The philosophy is 'less is more,' where the flavor of fermented dough and fresh ingredients should not be masked.</p>
        </Section>
        <Section title="American Traditions: Abundance and Innovation">
            <p>Pizza in the United States evolved into a dish of abundance and creativity. Styles like New York popularized generous cheese and pepperoni toppings. Californian style, in turn, introduced fresh and unusual ingredients like avocado and goat cheese, reflecting a gastronomic culture focused on local and healthy products.</p>
        </Section>
        <Section title="Brazilian Traditions: Creativity and Cultural Influence">
            <p>Pizza in Brazil, strongly influenced by Italian immigration in São Paulo, developed its own identity. It is characterized by generosity in toppings and combinations reflecting local tastes, such as 'Calabresa with onion' and 'Portuguesa' (with ham, egg, peas, and onion). Creativity is a hallmark, with countless flavors not found elsewhere.</p>
        </Section>
        <Section title="Other Traditions (Japan, etc.)">
            <p>In places like Japan, pizza was adapted to include local ingredients and unique combinations, such as the use of teriyaki sauce, mayonnaise, and seafood, demonstrating pizza's incredible ability to adapt and fuse with different food cultures.</p>
        </Section>
        <Section title="Consolidated Sensory Harmonies">
            <p>Regardless of origin, combinations that become classic do so because they respect principles of sensory harmony. 'Hawaiian' pizza (ham and pineapple), for example, although controversial, works through the classic contrast of sweet and salty, a pillar of gastronomy.</p>
        </Section>
        <Section title="Technical References">
          <ul className="list-disc pl-5 space-y-2">
              <li>"Modernist Pizza" (sections on global pizza history)</li>
              <li>Gastronomy history books</li>
              <li>Wikipedia (History of pizza)</li>
          </ul>
        </Section>
    </TechnicalPageLayout>
  );
};

export default RegionalCombosPage;
