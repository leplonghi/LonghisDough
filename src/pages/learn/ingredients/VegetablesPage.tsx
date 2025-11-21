
import React from 'react';
import IngredientPageLayout from './IngredientPageLayout';
import { BookOpenIcon, SparklesIcon, BeakerIcon, FireIcon } from '../../../components/IconComponents';

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

const VegetablesPage: React.FC = () => {
  return (
    <IngredientPageLayout
      title="Vegetables on Pizza"
      description="Technical guide to handling vegetables: moisture control, precooking, and flavor maximization."
      category="Ingredients"
    >
      <Section title="Introduction: The Moisture Challenge">
        <p>
          Vegetables bring freshness, texture, and flavor, but their high water content (>90% for many) is the biggest technical challenge in pizza making. When exposed to oven heat, cell walls rupture, releasing water that can pool on the pizza, leading to a soggy crust and the dreaded "gum line".
        </p>
      </Section>

      <Section title="Pre-Cooking Techniques" icon={<FireIcon className="h-5 w-5" />}>
        <p>
          To avoid a watery pizza, most vegetables require some form of pre-treatment to reduce moisture content before baking.
        </p>
        <ul className="list-disc pl-5 mt-2 space-y-1">
            <li><strong>Roasting:</strong> Essential for high-moisture vegetables like peppers, eggplant, and zucchini. It evaporates water, concentrates flavor, and caramelizes sugars.</li>
            <li><strong>Sautéing:</strong> Ideal for mushrooms and spinach. High heat in a pan quickly drives off moisture and develops savory browning notes (Maillard reaction).</li>
            <li><strong>Salting (Degorging):</strong> Sprinkling salt on sliced zucchini or eggplant draws out moisture via osmosis. After 20-30 mins, pat dry before using.</li>
            <li><strong>Blanching:</strong> Suitable for harder vegetables like broccoli or asparagus to soften texture before the quick bake on a pizza.</li>
        </ul>
      </Section>

      <Section title="Raw Application: When it Works" icon={<SparklesIcon className="h-5 w-5" />}>
        <p>
          Some vegetables can or should be used raw, depending on the cut and baking time.
        </p>
        <ul className="list-disc pl-5 mt-2 space-y-1">
            <li><strong>Paper-thin slices:</strong> Onions, peppers, or mushrooms sliced translucently thin will cook through and release their moisture as steam quickly enough to not soak the dough.</li>
            <li><strong>Leafy greens (Arugula/Basil):</strong> Should generally be applied <strong>post-oven</strong> to preserve their delicate texture and volatile aromatic compounds. Spinach can go on raw if under cheese, which protects it from burning.</li>
            <li><strong>Cherry Tomatoes:</strong> Can be used whole or halved. If halved, cut side up to evaporate moisture, or down to release juice into the sauce (risky but flavorful).</li>
        </ul>
      </Section>

      <Section title="Specific Ingredient Notes" icon={<BeakerIcon className="h-5 w-5" />}>
        <h4>a) Mushrooms</h4>
        <p>Sponges for oil and water. Sautéing with herbs and garlic is the gold standard for pizza, creating a meaty, umami-rich topping that won't leak.</p>
        
        <h4>b) Onions</h4>
        <p>Raw onions add crunch and pungency. Caramelized onions add sweetness and softness. Red onions offer a nice visual contrast and slightly sweeter profile.</p>

        <h4>c) Olives & Capers</h4>
        <p>Cured ingredients are salt bombs. Rinse capers to remove excess brine. Ensure olives are pitted and patted dry to avoid briny puddles.</p>
      </Section>

      <Section title="Technical References" icon={<BookOpenIcon className="h-5 w-5" />}>
        <ul className="list-disc pl-5 space-y-2">
            <li>Modernist Pizza – Vegetable prep for baking</li>
            <li>Serious Eats – The Pizza Lab</li>
            <li>"On Food and Cooking" by Harold McGee</li>
        </ul>
      </Section>
    </IngredientPageLayout>
  );
};

export default VegetablesPage;
