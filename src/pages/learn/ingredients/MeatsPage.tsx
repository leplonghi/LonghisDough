
import React from 'react';
import IngredientPageLayout from './IngredientPageLayout';
import { BookOpenIcon, SparklesIcon, BeakerIcon, FireIcon } from '../../../components/IconComponents';

const Section: React.FC<{ title: string, icon?: React.ReactNode, children: React.ReactNode }> = ({ title, icon, children }) => (
    <div className="mt-8">
        <h3 className="flex items-center gap-2 text-xl font-semibold text-slate-900 dark:text-slate-200 mb-3">
            {icon}
            {title}
        </h3>
        <div className="prose-sm dark:prose-invert max-w-none text-slate-700 dark:text-slate-300 leading-relaxed">
            {children}
        </div>
    </div>
);

const MeatsPage: React.FC = () => {
  return (
    <IngredientPageLayout
      title="Meats and Cured Meats"
      description="A technical analysis of how meats, cured products, and sausages behave on pizza, from curing science to oven reaction."
      category="Ingredients"
    >
      <Section title="Introduction: Chemical Impact of Meat">
        <p>
            Meats and sausages are more than just a topping; they are a complex chemical system interacting intensely with pizza. From scientific and sensory standpoint, they modulate:
        </p>
        <ul className="list-disc pl-5 mt-2 space-y-1">
            <li><strong>Salinity and Fat:</strong> Contribute salt and fat, needing balance with sauce acidity and cheese smoothness.</li>
            <li><strong>Umami Flavor:</strong> Curing and fermentation processes concentrate glutamates, providing depth of umami flavor.</li>
            <li><strong>Crispness:</strong> Rendered fat and Maillard reaction on proteins create crispy textures contrasting with soft dough.</li>
        </ul>
        <p>
            Cured meats like salami and pepperoni undergo sophisticated chemical processes before reaching pizza, including curing (salt/nitrites), fermentation (acidity/flavor), smoking, and dehydration concentrating flavor and ensuring safety.
        </p>
      </Section>

      <Section title="Technical Properties (Real Chemistry)" icon={<BeakerIcon className="h-5 w-5" />}>
        <p>
            Behavior of meats in oven is dictated by composition.
        </p>
        <ul className="list-disc pl-5 mt-2 space-y-1">
            <li><strong>Fat Rendering:</strong> Fat melts and spreads. Saturated fats (like bacon) melt slower at higher temps. Process can lead to "oil-out".</li>
            <li><strong>Water Content:</strong> Cured meats (salami, prosciutto) have low water, making them stable and prone to crisping. Fresh meats (raw sausage, chicken) release significant water, risking soggy pizza.</li>
            <li><strong>Salinity:</strong> Curing salt is concentrated. Crucial to consider meat salt when balancing total pizza salt including sauce and cheese.</li>
        </ul>
      </Section>
      
      <Section title="Oven Behavior" icon={<FireIcon className="h-5 w-5" />}>
        <p>Each meat type reacts differently to intense heat.</p>
        <ul className="list-disc pl-5 mt-2 space-y-1">
            <li><strong>Pepperoni Cupping:</strong> Thin slices cup upwards because top (exposed to radiant heat) cooks and contracts faster than bottom (protected). Rendered fat pools in cups, frying edges crisp.</li>
            <li><strong>Fresh Meat Water Release:</strong> Fresh sausage, ground beef, or chicken, if raw, release steam creating "gum line" on dough. Often pre-cooked for this reason.</li>
            <li><strong>Prosciutto and Delicate Cured Meats:</strong> Per Italian tradition and sources like Ooni Pizza School, prosciutto crudo must be applied <strong>post-oven</strong>. Intense heat destroys delicate aromatics and alters silky texture, making it salty and tough.</li>
        </ul>
      </Section>
      
       <Section title="Common Meat Types">
        <h4>a) Pepperoni</h4>
        <p>Cured dry sausage of Italian-American origin with paprika/chili. High fat and collagen casing contribute to cupping and crispy edges when sliced thin.</p>
        
        <h4>b) Italian Salami</h4>
        <p>Hundreds of varieties. Generally fermented giving acidic notes and complex flavor. Denser with less fat than pepperoni, tends not to cup but crisps pleasantly.</p>
        
        <h4>c) Smoked Sausage / Calabresa</h4>
        <p>Often cooked/processed differently than dry cured salami. Strong aromatic profile, more moisture and emulsified fat, releases significant oil.</p>

        <h4>d) Prosciutto Crudo (Parma, San Daniele)</h4>
        <p>Dry-cured with salt only, delicate flavor and melt-in-mouth texture. Best used thinly sliced added post-oven.</p>

        <h4>e) Bacon</h4>
        <p>Dense fat needs time to render. In fast-bake pizzas (Neapolitan), won't cook properly. Almost always pre-cooked to partial crispness before use as topping.</p>
      </Section>

      <Section title="Classic Combinations (Tradition Validated)" icon={<BookOpenIcon className="h-5 w-5" />}>
        <ul className="list-disc pl-5 mt-2 space-y-1">
            <li><strong>Pepperoni + Mozzarella:</strong> American classic. Pepperoni spice and fat balanced by mozzarella mildness.</li>
            <li><strong>Salami + Provolone:</strong> Robust combination. Strong salami complements sharper provolone.</li>
            <li><strong>Prosciutto + Arugula + Parmesan Shavings:</strong> Modern classic. Added post-oven; salty ham, bitter arugula, umami cheese create fresh contrast.</li>
            <li><strong>Bacon + Onion (Caramelized or Red):</strong> Onion sweetness cuts bacon richness and salt.</li>
        </ul>
      </Section>
      
       <Section title="Risks and Common Care" icon={<SparklesIcon className="h-5 w-5" />}>
        <ul className="list-disc pl-5 mt-2 space-y-1">
            <li><strong>Excess Fat (Oil-Out):</strong> Multiple fatty meats (pepperoni + bacon) lead to oily pizza. Balance with lower fat cheese or less quantity.</li>
            <li><strong>Raw Fresh Meats:</strong> High risk of releasing water and undercooking. Pre-cooking is safest effective practice.</li>
            <li><strong>Curing Agents (Nitrites):</strong> Stable and don't change significantly with oven heat. Function happens during curing before reaching kitchen.</li>
            <li><strong>Aroma Loss in Fine Cured Meats:</strong> Never bake high quality prosciutto. You pay for aromatic complexity destroyed by heat.</li>
        </ul>
      </Section>
    </IngredientPageLayout>
  );
};

export default MeatsPage;
