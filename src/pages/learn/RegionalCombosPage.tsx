
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

const RegionalCombosPage: React.FC = () => {
  return (
    <TechnicalPageLayout
      title="Regional Combos of the World"
      subtitle="Historical and cultural profile of how different places created iconic pizzas."
      showReferencesSection
    >
        <Section title="Italian Traditions: Simplicity & Quality">
            <p>Italian tradition, especially southern (Naples), values simplicity and high quality of few ingredients. Combos like Margherita aren't just recipes but celebration of tomato, mozzarella, and basil. Philosophy is "less is more", where fermented dough flavor and fresh ingredients shouldn't be masked.</p>
        </Section>
        <Section title="American Traditions: Abundance & Innovation">
            <p>Pizza in USA evolved into dish of abundance and creativity. Styles like New York popularized generous cheese and pepperoni toppings. Californian style introduced fresh unusual ingredients like avocado and goat cheese, reflecting gastronomic culture focused on local healthy products.</p>
        </Section>
        <Section title="Brazilian Traditions: Creativity & Cultural Influence">
            <p>Pizza in Brazil, strongly influenced by Italian immigration in São Paulo, developed own identity. Characterized by generosity in toppings and combinations reflecting local palate like "Calabresa with onion" and "Portuguesa" (ham, egg, peas, onion). Creativity is trademark with countless flavors not found elsewhere.</p>
        </Section>
        <Section title="Other Traditions (Japan, etc.)">
            <p>In places like Japan, pizza adapted to include local ingredients and unique combos like teriyaki sauce, mayonnaise, and seafood, demonstrating pizza's incredible ability to adapt and fuse with different food cultures.</p>
        </Section>
        <Section title="Consolidated Sensory Harmonies">
            <p>Regardless of origin, combos becoming classic do so respecting sensory harmony principles. "Hawaiian" pizza (ham and pineapple), though controversial, works by classic sweet-salty contrast, a gastronomy pillar.</p>
        </Section>
        <Section title="Technical References">
          <ul className="list-disc pl-5 space-y-2">
              <li>"Modernist Pizza" (global pizza history sections)</li>
              <li>Gastronomy history books</li>
              <li>Wikipedia (History of pizza)</li>
          </ul>
        </Section>
    </TechnicalPageLayout>
  );
};

export default RegionalCombosPage;
