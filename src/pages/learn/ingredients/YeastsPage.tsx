
import React from 'react';
import IngredientPageLayout from './IngredientPageLayout';
import { BeakerIcon, BookOpenIcon, SparklesIcon } from '../../../components/IconComponents';

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

const YeastsPage: React.FC = () => {
  return (
    <IngredientPageLayout
      title="Yeasts: The Biological Engine"
      description="Scientific analysis of microorganisms giving life, structure, and flavor to pizza."
      category="Ingredients"
    >
      <Section title="1. Introduction: What is Yeast?">
        <p>
          Scientifically, baking yeasts are single-celled microorganisms, primarily <em>Saccharomyces cerevisiae</em>. Their function is metabolizing simple sugars in flour via anaerobic process. Generates two main byproducts: <strong>Carbon Dioxide (CO₂)</strong> trapped in gluten making dough rise, and <strong>Ethanol</strong>. Also produces secondary compounds like esters/aldehydes crucial for aroma/flavor.
        </p>
      </Section>

      <Section title="2. Dry Yeast (IDY & ADY)" icon={<BeakerIcon className="h-5 w-5" />}>
        <p>
          Dry yeast is dormant dehydrated <em>S. cerevisiae</em>. Main advantage ("Modernist Bread") is <strong>high stability</strong> and shelf life, ideal for consistent production. Reactivation via hydration is highly predictable.
        </p>
      </Section>
      
      <Section title="3. Fresh Yeast">
        <p>
          Compressed blocks (~70% moisture), active state yeast. <strong>Higher immediate activity</strong>, short shelf life, temp sensitive. Traditional in Europe.
        </p>
      </Section>

      <Section title="4. Natural Fermentation (Levain/Sourdough)">
        <p>
          Unlike commercial yeast, levain is a <strong>complex symbiotic mixture</strong> of wild yeast and Lactic Acid Bacteria (LAB). LAB produce acids (lactic/acetic) giving characteristic sour flavor and structure. Slower complex action. (See Levain Pet module).
        </p>
      </Section>

      <Section title="5. Factors Affecting Fermentation">
        <p>Fermentation speed regulated by:</p>
        <ul className="list-disc pl-5 mt-2 space-y-1">
            <li><strong>Temperature:</strong> Ideal 24-27°C.</li>
            <li><strong>Hydration:</strong> Mobility of nutrients.</li>
            <li><strong>Flour Type:</strong> Available sugars. Whole flour accelerates.</li>
            <li><strong>Salt:</strong> Retards via osmosis.</li>
            <li><strong>Fat:</strong> Coating cells can retard process.</li>
        </ul>
      </Section>

      <Section title="6. Aromas Produced" icon={<SparklesIcon className="h-5 w-5" />}>
        <p>Fermentation creates aromas:</p>
        <ul className="list-disc pl-5 mt-2 space-y-1">
            <li><strong>Yeasts:</strong> Alcohols, esters (fruity).</li>
            <li><strong>LAB:</strong> Lactic acid (yogurt), acetic acid (vinegar).</li>
        </ul>
      </Section>

      <Section title="7. Common Risks">
        <ul className="list-disc pl-5 mt-2 space-y-1">
            <li><strong>Over-proofing:</strong> Gluten collapse, weak sticky dough, acidic taste.</li>
            <li><strong>Under-proofing:</strong> Dense heavy product, undeveloped flavor.</li>
            <li><strong>High Temp:</strong> Uncontrolled fermentation, gas before flavor.</li>
        </ul>
      </Section>
      
      <Section title="8. Technical References" icon={<BookOpenIcon className="h-5 w-5" />}>
          <ul className="list-disc pl-5 space-y-2">
            <li>Modernist Bread</li>
            <li>Modernist Pizza</li>
            <li>King Arthur Baking – Yeast 101</li>
            <li>Microbiology articles on <em>Saccharomyces cerevisiae</em></li>
            <li>Wikipedia – Fermentation, Yeast</li>
          </ul>
      </Section>
    </IngredientPageLayout>
  );
};

export default YeastsPage;
