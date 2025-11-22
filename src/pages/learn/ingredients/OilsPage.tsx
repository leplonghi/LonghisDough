
import React from 'react';
import IngredientPageLayout from './IngredientPageLayout';
import { BookOpenIcon, SparklesIcon, BeakerIcon, FireIcon } from '../../../components/IconComponents';

const Section: React.FC<{ title: string, icon?: React.ReactNode, children: React.ReactNode }> = ({ title, icon, children }) => (
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

const OilsPage: React.FC = () => {
  return (
    <IngredientPageLayout
      title="Oils on Pizza"
      description="Technical analysis of how oils function as aroma vectors and texture agents."
      category="Ingredients"
    >
      <Section title="Introduction: Oils as Flavor Vectors">
        <p>
          Oils play multiple roles beyond adding fat. They act as aroma vectors, flavor enhancers, texture agents, and crispness modulators. Chemically, lipids excel at absorbing and transporting volatile aromatic compounds (fat-soluble) from ingredients like garlic/herbs. Fat conducts heat differently than water, influencing final dough texture.
        </p>
      </Section>

      <Section title="Extra Virgin Olive Oil (EVOO)" icon={<BeakerIcon className="h-5 w-5" />}>
        <p>
          High quality EVOO is rich in polyphenols, aromatic volatiles responsible for fruity, spicy, bitter notes. These compounds are delicate and degrade under intense oven heat. Per sources like "Modernist Pizza", best use for finishing EVOO is <strong>post-oven</strong>, drizzled on hot pizza to release fresh aroma unaltered.
        </p>
      </Section>

      <Section title="Chili Oil & Infused Oils">
        <p>
          Chili heat (capsaicin) and herb aromas are fat-soluble. Infusing creates concentrated extract distributing flavor evenly. Heating may slightly alter aromatic profile, but results in strong persistent notes integrating well.
        </p>
      </Section>

      <Section title="Garlic Oil">
        <p>
          Garlic contains sulfur compounds (like allicin) highly aromatic and fat soluble. Garlic oil is potent, use moderately. Used pre-bake (cooked milder flavor) or post-bake (pungent flavor).
        </p>
      </Section>
      
      <Section title="Neutral Oils (Sunflower, Canola)">
        <p>
          While Italian tradition focuses on olive oil, American styles like Detroit use neutral oils in pans. Goal is function not flavor: oil practically "fries" dough sides/base creating characteristic crunch and "frico" (caramelized cheese) edges.
        </p>
      </Section>

      <Section title="Thermal Behavior" icon={<FireIcon className="h-5 w-5" />}>
        <p>
            Oil doesn't conduct heat as efficiently as solid surface (steel/stone). Excess oil on base can insulate dough resulting in less browning. "Oil-out" from cheese/meat contributes significant surface oil.
        </p>
      </Section>

      <Section title="Strategic Application" icon={<SparklesIcon className="h-5 w-5" />}>
        <ul className="list-disc pl-5 mt-2 space-y-1">
            <li><strong>Post-Oven Drizzle:</strong> Best way to use quality EVOO highlighting aroma.</li>
            <li><strong>Greased Pan:</strong> Essential for Detroit/Sicilian styles for crispy base preventing sticking.</li>
            <li><strong>In Dough:</strong> Small % oil (1-3%) in dough (NY style) helps soften crumb and improve browning in cooler ovens.</li>
        </ul>
      </Section>

      <Section title="Risks and Care">
        <ul className="list-disc pl-5 mt-2 space-y-1">
            <li><strong>Greasy Feel:</strong> Excess oil, especially low quality, makes pizza heavy.</li>
            <li><strong>Masking Flavors:</strong> Potent infused oil can dominate sauce/cheese/dough flavor.</li>
            <li><strong>Home Oven:</strong> In cooler ovens fat takes longer to heat, excess results in oily rather than crispy pizza.</li>
        </ul>
      </Section>
    </IngredientPageLayout>
  );
};

export default OilsPage;
