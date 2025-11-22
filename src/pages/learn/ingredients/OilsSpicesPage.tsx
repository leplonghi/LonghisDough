
import React from 'react';
import IngredientPageLayout from './IngredientPageLayout';
import { BookOpenIcon, SparklesIcon, BeakerIcon } from '../../../components/IconComponents';

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

const OilsSpicesPage: React.FC = () => {
  return (
    <IngredientPageLayout
      title="Herbs & Spices"
      description="Technical analysis of finishers: how herbs and spices modulate aroma and pizza complexity."
      category="Ingredients"
    >
      <Section title="Introduction: Aroma Chemistry">
        <p>
          Herbs and spices are the aromatic signature of a pizza, adding layers of complexity. Their power lies in <strong>volatile organic compounds</strong> — light molecules evaporating with heat perceived by smell. Aromatic profile depends on chemical composition (terpenes, phenols, aldehydes) and ingredient state (fresh vs dry).
        </p>
      </Section>

      <Section title="Fresh Herbs: Vibrancy and Delicacy" icon={<SparklesIcon className="h-5 w-5" />}>
        <h4>a) Basil</h4>
        <p>
          Iconic aroma comes from compounds like linalool, extremely heat sensitive. Documented by Italian tradition and AVPN rules, fresh basil should be added <strong>post-oven</strong> to preserve scent.
        </p>
        
        <h4>b) Arugula</h4>
        <p>
          Bitter and fresh notes used as counterpoint to richness like cured ham. Delicate like basil, added fresh on hot pizza post-oven.
        </p>

        <h4>c) Parsley</h4>
        <p>
          Clean fresh aroma, moderately heat resistant but freshness most pronounced when added at end.
        </p>
      </Section>
      
      <Section title="Dried Herbs: Concentrated Flavor" icon={<BeakerIcon className="h-5 w-5" />}>
        <p>
          Drying removes water concentrating aromatics. This alters flavor profile eliminating "green" notes. Advantage is greater heat resistance.
        </p>
        <ul className="list-disc pl-5 mt-2 space-y-1">
            <li><strong>Dried Oregano:</strong> Rich in phenols like carvacrol, heat resistant, ideal mixed in sauce or sprinkled on cheese before baking (NY style).</li>
            <li><strong>Dried Basil:</strong> Loses freshness completely, assumes clove-like notes. Not a substitute for fresh.</li>
            <li><strong>Dried Thyme:</strong> Main compound thymol is robust/earthy, pairs well with mushrooms/meats.</li>
        </ul>
      </Section>
      
      <Section title="Classic Spices">
        <ul className="list-disc pl-5 mt-2 space-y-1">
            <li><strong>Red Pepper Flakes:</strong> Heat comes from <strong>capsaicin</strong>, thermostable molecule keeping potency in oven heat.</li>
            <li><strong>Garlic Powder/Granulated:</strong> Dehydration gives sweeter flavor. Protect from direct heat to avoid burning.</li>
            <li><strong>Rosemary:</strong> Rich in heat resistant terpenes. Leaves used moderately before baking release resinous aroma.</li>
        </ul>
      </Section>

      <Section title="Application: Pre or Post-Oven?" icon={<BookOpenIcon className="h-5 w-5" />}>
        <p>General rule based on chemical stability of aromatics:</p>
        <ul className="list-disc pl-5 mt-2 space-y-1">
            <li><strong>Post-Oven:</strong> Fresh delicate herbs (basil, arugula) to preserve aroma.</li>
            <li><strong>Pre-Oven:</strong> Dried herbs (oregano) and resistant spices, as heat helps release concentrated aromas.</li>
        </ul>
      </Section>
      
      <Section title="Risks and Care">
        <ul className="list-disc pl-5 mt-2 space-y-1">
            <li><strong>Burning:</strong> Fresh herbs burn easily in hot ovens tasting bitter. Dried spices burn if exposed directly to intense heat.</li>
            <li><strong>Overpowering:</strong> Herbs/spices complement, shouldn't dominate. Excess masks other pizza flavors.</li>
        </ul>
      </Section>
    </IngredientPageLayout>
  );
};

export default OilsSpicesPage;
