
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

const FermentationBiochemistryPage: React.FC = () => {
  return (
    <TechnicalPageLayout
      title="Fermentation Biochemistry"
      subtitle="The science behind transforming flour and water into a complex, flavorful structure."
    >
        <Section title="Yeast and Lactic Acid Bacteria (LAB)">
            <p>Fermentation is a metabolic process performed by microorganisms. In doughs, the main actors are yeasts (primarily <em>Saccharomyces cerevisiae</em>) and, in natural fermentation (sourdough), Lactic Acid Bacteria (LAB). Yeasts are primarily responsible for gas production, while LAB are crucial for developing acidity and flavor complexity.</p>
        </Section>
        <Section title="CO₂ Production">
            <p>Yeast consumes the simple sugars available in the dough (broken down from flour starch by enzymes) and, as a byproduct, releases carbon dioxide (CO₂). This gas gets trapped in the gluten network, forming alveoli and causing the dough to rise.</p>
        </Section>
        <Section title="Organic Acids">
            <p>Lactic acid bacteria produce organic acids, mainly lactic acid and acetic acid. Lactic acid confers a mild, yogurt-like flavor, while acetic acid is more pungent, like vinegar. The balance between these acids is fundamental to the final flavor profile, especially in long-fermentation doughs.</p>
        </Section>
        <Section title="Aromatic Compounds">
            <p>Besides CO₂ and acids, fermentation generates a vast range of volatile compounds, such as esters (with fruity notes), alcohols, and aldehydes. These compounds form the aromatic "bouquet" of the dough, contributing to the complex smell and taste of the final baked product.</p>
        </Section>
        <Section title="Qualitative Effect of Salt">
            <p>Salt plays a crucial control role. It retards yeast activity through osmosis, moderating the speed of fermentation. This allows flavor development processes to occur in a slower, more controlled manner, avoiding excessively rapid gas production that could happen before flavor has developed.</p>
        </Section>
        <Section title="Qualitative Effect of Flour">
            <p>Flour is the food source for microorganisms. The type of flour influences fermentation. Whole wheat flours, for example, contain more minerals and enzymes, which can accelerate fermentative activity. Flour strength (its gluten potential) determines the dough's ability to retain the gas produced.</p>
        </Section>
        <Section title="Risks of Uncontrolled Fermentation">
            <p>Fermentation that is too fast or too long can be harmful. If yeast consumes all available sugars too early, the dough may stop rising and fail to brown well in the oven. Excessive fermentation can also lead to an overproduction of acids and proteolytic enzymes, which degrade the gluten network, resulting in a weak, sticky dough with an overly acidic taste.</p>
        </Section>
        <Section title="Technical References">
          <ul className="list-disc pl-5 space-y-2">
              <li>Modernist Bread</li>
              <li>King Arthur Baking</li>
              <li>Wikipedia (Yeast, Lactic Acid Fermentation)</li>
          </ul>
        </Section>
    </TechnicalPageLayout>
  );
};

export default FermentationBiochemistryPage;
