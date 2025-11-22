
import React from 'react';
import IngredientPageLayout from './IngredientPageLayout';
import { BookOpenIcon, SparklesIcon, BeakerIcon } from '../../../components/IconComponents';

const Section: React.FC<{ title: string; icon?: React.ReactNode; children: React.ReactNode }> = ({ title, icon, children }) => (
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

const ReadyToppingsPage: React.FC = () => {
  return (
    <IngredientPageLayout
      title="Ready-to-Use Toppings Guide"
      description="Technical analysis of pre-prepared ingredients to optimize time and ensure quality."
      category="Ingredients"
    >
      <Section title="Introduction: Quality Speed">
        <p>
          "Ready toppings" are ingredients processed industrially or artisanally before your kitchen. They offer convenience but require technical evaluation to ensure quality. Includes:
        </p>
        <ul className="list-disc pl-5 mt-2 space-y-1">
            <li><strong>Ready sauces:</strong> Passatas, seasoned pizza sauces.</li>
            <li><strong>Pre-cooked meats:</strong> Shredded chicken, bacon cubes, cooked sausage.</li>
            <li><strong>Prepared vegetables:</strong> Roasted peppers, caramelized onions, sautéed mushrooms.</li>
            <li><strong>Preserves/Premium:</strong> Artichokes, sun-dried tomatoes, anchovies, olives.</li>
        </ul>
        <p>
          Evaluate based on: <strong>texture, moisture, acidity, salinity, and flavor concentration</strong>.
        </p>
      </Section>

      <Section title="Ready Sauces" icon={<BeakerIcon className="h-5 w-5" />}>
        <p>
            Convenient but inspect properties.
        </p>
        <ul className="list-disc pl-5 mt-2 space-y-1">
            <li><strong>Moisture:</strong> Many have high water content. Liquid sauce causes "gum line". <strong>Tip:</strong> If it runs easily off spoon, reduce on low heat 10-15 min.</li>
            <li><strong>Stabilizers:</strong> Modified starch/gums give artificial viscosity. Can result in gelatinous texture.</li>
            <li><strong>Acidity/Flavor:</strong> Often contain sugar balancing poor tomato acidity. Taste and adjust salt/acid.</li>
        </ul>
      </Section>
      
      <Section title="Pre-Cooked Meats">
        <p>
            Behave predictably in oven.
        </p>
        <ul className="list-disc pl-5 mt-2 space-y-1">
            <li><strong>Less Water Release:</strong> Main advantage. Won't release moisture onto dough.</li>
            <li><strong>Concentrated Flavor:</strong> Initial cooking concentrated flavors via Maillard.</li>
            <li><strong>Rendered Fat:</strong> Bacon fat already rendered. Reduced risk of excessive oil-out.</li>
            <li><strong>Ideal for Home Ovens:</strong> Essential for food safety in short bake times.</li>
        </ul>
      </Section>
      
      <Section title="Prepared Vegetables">
        <p>
            Raw veg is mostly water. Pre-prep controls moisture.
        </p>
        <ul className="list-disc pl-5 mt-2 space-y-1">
            <li><strong>Roasted/Grilled:</strong> Removes water, breaks cellulose, caramelizes sugars. Deep flavor and soft texture.</li>
            <li><strong>Pickled:</strong> Pickles/peppers bring sharp acidity cutting fat. Use moderately.</li>
        </ul>
      </Section>

      <Section title="High Quality Preserves" icon={<SparklesIcon className="h-5 w-5" />}>
        <p>
            Professional shortcut to intense flavor.
        </p>
        <ul className="list-disc pl-5 mt-2 space-y-1">
            <li><strong>Artichoke:</strong> Often in oil/brine. Drain well.</li>
            <li><strong>Sun-dried Tomato:</strong> Dehydration concentrates sugar/umami. Rehydrate in warm water for softness.</li>
            <li><strong>Roasted Pepper:</strong> Jarred, peeled, smoky sweet. Great time saver.</li>
            <li><strong>Anchovies:</strong> Salt cured umami bomb. Use sparingly.</li>
        </ul>
      </Section>
      
      <Section title="Technical Risks & Mitigation" icon={<BookOpenIcon className="h-5 w-5" />}>
        <ul className="list-disc pl-5 mt-2 space-y-1">
            <li><strong>Excess Topping:</strong> Too many cold ingredients reduce surface temp drastically, impairing oven spring.</li>
            <li><strong>Oily Ingredients:</strong> Drain oil preserves well to avoid greasy pizza.</li>
            <li><strong>Watery Ingredients:</strong> Dry olives/brined items with paper towel. Moisture is enemy of crispness.</li>
        </ul>
      </Section>
    </IngredientPageLayout>
  );
};

export default ReadyToppingsPage;
