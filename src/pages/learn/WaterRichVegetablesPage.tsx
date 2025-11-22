
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

const WaterRichVegetablesPage: React.FC = () => {
  return (
    <TechnicalPageLayout
      title="Water-Rich Vegetables: Moisture & Thermal Behavior"
      subtitle="How to handle excess moisture from ingredients like mushrooms, zucchini, and fresh tomatoes."
      showReferencesSection
    >
        <Section title="The Vegetable Water Challenge">
            <p>Many fresh vegetables like mushrooms, zucchini, spinach, and even fresh tomatoes are over 90% water. When exposed to oven heat, cell walls rupture releasing this water as steam and liquid directly onto pizza.</p>
        </Section>
        <Section title="How Moisture Affects Pizza Base">
            <p>This water release has direct detrimental effect on dough. Liquid prevents dough surface from drying and reaching baking temperature. Instead, dough is "steamed" under topping resulting in dreaded "gum line" — dense pale raw layer between sauce and pizza crumb.</p>
        </Section>
        <Section title="Solution: Pre-prep for Moisture Control">
            <p>Fundamental strategy for using watery vegetables is removing part of moisture before they contact dough. This can be done via several techniques:</p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
                <li><strong>Salting:</strong> Sprinkling salt on sliced veg (like zucchini or eggplant) and resting extracts water via osmosis.</li>
                <li><strong>Sautéing or Grilling:</strong> Rapidly cooking mushrooms, spinach, or peppers in pan or grill evaporates most water and concentrates flavor.</li>
                <li><strong>Roasting:</strong> Baking vegetables before using on pizza is effective for dehydration and caramelizing natural sugars.</li>
            </ul>
        </Section>
        <Section title="Risks of Excess Moisture">
            <p>Beyond "gum line", excess moisture leads to soggy heavy pizza with limp base. Also dilutes sauce/cheese flavor resulting in bland pizza.</p>
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
