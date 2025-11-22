
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

const WaterRichVegetablesPage: React.FC = () => {
  return (
    <TechnicalPageLayout
      title="Water-Rich Vegetables: Moisture and Thermal Behavior"
      subtitle="How to deal with excess moisture from ingredients like mushrooms, zucchini, and fresh tomatoes."
      showReferencesSection
    >
        <Section title="The Water Challenge in Vegetables">
            <p>Many fresh vegetables, such as mushrooms, zucchini, spinach, and even fresh tomatoes, are composed of more than 90% water. When exposed to oven heat, their cell walls rupture, releasing this water as steam and liquid directly onto the pizza.</p>
        </Section>
        <Section title="How Moisture Affects the Pizza Base">
            <p>This release of water has a direct detrimental effect on the dough. The liquid prevents the dough surface from drying and reaching the temperature needed to bake. Instead, the dough is "steamed" under the topping, resulting in the dreaded "gum line" — a dense, pale, raw line between the sauce and the pizza crumb.</p>
        </Section>
        <Section title="The Solution: Pre-prep for Moisture Control">
            <p>The fundamental strategy for using watery vegetables is to remove part of their moisture before they come into contact with the dough. This can be done through several techniques:</p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
                <li><strong>Salting:</strong> Sprinkling salt on sliced vegetables (like zucchini or eggplant) and letting them rest extracts water through osmosis.</li>
                <li><strong>Sautéing or Grilling:</strong> Rapidly cooking mushrooms, spinach, or peppers in a pan or grill evaporates most of their water and, as a bonus, concentrates their flavor.</li>
                <li><strong>Roasting:</strong> Roasting vegetables in the oven before using them on pizza is also an effective way to dehydrate them and caramelize their natural sugars.</li>
            </ul>
        </Section>
        <Section title="Risks of Excess Moisture">
            <p>Besides the "gum line," excess moisture can lead to a soggy, heavy pizza with a soft base instead of a crispy one. It also dilutes the flavor of the sauce and cheese, resulting in a pizza lacking intensity.</p>
        </Section>
        <Section title="Technical References">
          <ul className="list-disc pl-5 space-y-2">
              <li>Serious Eats - The Pizza Lab</li>
              <li>King Arthur Baking - Pizza Toppings Guide</li>
              <li>"On Food and Cooking" by Harold McGee</li>
          </ul>
        </Section>
    </TechnicalPageLayout>
  );
};

export default WaterRichVegetablesPage;
