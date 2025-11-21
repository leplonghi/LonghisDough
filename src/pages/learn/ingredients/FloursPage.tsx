
import React from 'react';
import IngredientPageLayout from './IngredientPageLayout';
import { BeakerIcon, BookOpenIcon, FireIcon } from '../../../components/IconComponents';

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

const FloursPage: React.FC = () => {
  return (
    <IngredientPageLayout
      title="Pizza Flours"
      description="Technical analysis of the most important dough ingredient. Understand how flour choice defines structure, flavor, and behavior."
      category="Ingredients"
    >
      <Section title="Introduction: The Soul of the Dough">
        <p>
          Flour is the dough backbone. More than simple powder, it's a complex system of starches, proteins, minerals, and enzymes. As documented in "Modernist Pizza", choice influences:
        </p>
        <ul className="list-disc pl-5 mt-2 space-y-1">
            <li><strong>Gluten Structure:</strong> Strength and elasticity.</li>
            <li><strong>Water Absorption:</strong> Max hydration supported.</li>
            <li><strong>Strength (W):</strong> Capacity to resist long fermentation.</li>
            <li><strong>Extensibility (P/L):</strong> Ease of stretching without tearing/shrinking.</li>
            <li><strong>Flavor:</strong> Influenced by wheat type and mineral content.</li>
            <li><strong>Oven Behavior:</strong> Crust coloration and oven spring.</li>
        </ul>
      </Section>

      <Section title="Wheat Types: Hard vs Soft" icon={<BeakerIcon className="h-5 w-5" />}>
        <p>Most baking flours come from wheat, but not all wheat is equal. Main distinction in biochemistry:</p>
        <ul className="list-disc pl-5 mt-2 space-y-1">
            <li><strong>Hard Wheat:</strong> Rich in high quality protein, base for "strong" flours. Forms robust elastic gluten ideal for artisan breads/pizzas needing structure.</li>
            <li><strong>Soft Wheat:</strong> Lower protein, weaker gluten. Used for cakes/pastry, and in blends for pizza flours seeking softness/extensibility like "Type 00".</li>
        </ul>
        <p>Milling industry creates <strong>blends</strong> to achieve specific protein/strength profiles.</p>
      </Section>

      <Section title="Italian Flour Classification">
        <p>Refers to refinement degree and ash content (minerals), not strength.</p>
        <ul className="list-disc pl-5 mt-2 space-y-1">
            <li><strong>Type 00 (Doppio Zero):</strong> Most refined, center of kernel. Fine white powder, low ash. Creates soft extensible dough, classic for Neapolitan.</li>
            <li><strong>Type 0:</strong> Less refined than 00, contains small bran portion. Slightly stronger, absorbs more water. Excellent for pizza.</li>
            <li><strong>Rimacinata (Re-milled Semolina):</strong> Durum wheat milled twice for fine texture. Famous in Roman style (Pala/Teglia) for crispy texture and yellow color. Great for dusting bench.</li>
        </ul>
      </Section>
      
      <Section title="Flour Strength (W)">
        <p>W Factor is precise strength measure from Chopin Alveograph. Measures energy to expand dough.</p>
        <ul className="list-disc pl-5 mt-2 space-y-1">
            <li><strong>Strong Flour (High W):</strong> Forms robust gluten retaining gas long term. Ideal for long/cold fermentation (24-72h) and high hydration.</li>
            <li><strong>Weak Flour (Low W):</strong> Delicate gluten, doesn't support long fermentation, tears easily. Good for quick processes/pastry.</li>
            <li>Each style has ideal W range. Classic Neapolitan seeks balance, Roman Teglia requires much stronger flour.</li>
        </ul>
      </Section>

      <Section title="P/L Index: Elasticity vs Extensibility">
        <p>Crucial Alveograph measure. Balance between Tenacity (P) and Extensibility (L).</p>
        <ul className="list-disc pl-5 mt-2 space-y-1">
            <li><strong>High P/L:</strong> Tenacious elastic dough. More "snap-back", harder to stretch.</li>
            <li><strong>Low P/L:</strong> Extensible relaxed dough, easy to open but fragile if W is low.</li>
            <li>Pizza seeks <strong>Balanced P/L</strong> allowing easy opening with enough strength to hold shape/gas.</li>
        </ul>
      </Section>
      
       <Section title="Ash Content">
        <p>"Ash" is mineral residue after burning sample. Indicates refinement. Refined (00) low ash, whole wheat high ash. Higher ash associated with rustic complex flavor and higher enzymatic activity.</p>
      </Section>
      
      <Section title="Water Absorption">
        <p>Capacity to absorb water determines hydration.</p>
        <ul className="list-disc pl-5 mt-2 space-y-1">
            <li><strong>Strong flours</strong> (more protein) absorb more water.</li>
            <li><strong>Coarser milling</strong> (whole wheat) absorbs more due to "thirsty" bran particles.</li>
            <li>Absorption takes time. <strong>Autolyse</strong> ensures full hydration before kneading.</li>
        </ul>
      </Section>

      <Section title="Oven Impact" icon={<FireIcon className="h-5 w-5" />}>
        <ul className="list-disc pl-5 mt-2 space-y-1">
            <li><strong>Strong flours</strong> maintain structure under heat, resulting in good oven spring.</li>
            <li><strong>Weaker flours</strong> or high enzyme activity brown faster due to available sugars (Maillard).</li>
            <li><strong>Whole flours</strong> alter texture making it denser, retained moisture may require longer bake.</li>
        </ul>
      </Section>
      
       <Section title="Technical References" icon={<BookOpenIcon className="h-5 w-5" />}>
          <ul className="list-disc pl-5 space-y-2">
            <li>"Modernist Pizza" & "Modernist Bread" – Nathan Myhrvold & Francisco Migoya</li>
            <li>King Arthur Baking – Flour Guides</li>
            <li>Italian milling association sources</li>
            <li>Wikipedia – Wheat biochemistry</li>
          </ul>
      </Section>
    </IngredientPageLayout>
  );
};

export default FloursPage;
