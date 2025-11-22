
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

const SugarsPage: React.FC = () => {
  return (
    <TechnicalPageLayout
      title="Sugars, Malts, and Enzymes"
      subtitle="Their role in fermentation, color, and crust flavor."
    >
        <Section title="Introduction: The Dough's Energy">
            <p>Sugars, in their various forms, are the primary energy source for fermentation. Wheat flour naturally contains starches, which are long chains of sugar, but it is the enzymes that break them down into simple sugars that yeast can consume.</p>
        </Section>
        <Section title="Sugars as Yeast Food">
            <p>Yeast metabolizes simple sugars (like glucose and fructose) to produce CO₂ and ethanol. Adding small amounts of sugar can give fermentation an initial "push." However, in excess, sugar can retard fermentation through an osmotic effect, similar to salt.</p>
        </Section>
        <Section title="Caramelization and Maillard Reaction">
            <p>Residual sugars in the dough (those not consumed by yeast) are crucial for crust color. During baking, they participate in two fundamental chemical reactions: <strong>Caramelization</strong> (degradation of sugar by heat) and the <strong>Maillard Reaction</strong> (reaction between sugars and amino acids), which together create the golden color and complex flavors of the crust.</p>
        </Section>
        <Section title="Malts and Enzymatic Action">
            <p>Flour naturally contains enzymes called <strong>amylases</strong>. Malted flour (or malt extract) is often added to supplement this enzymatic activity. Amylases break down complex flour starches into simpler sugars, including maltose, ensuring a constant food supply for yeast throughout longer fermentations and residual sugars for browning.</p>
        </Section>
        <Section title="Impact on Aroma and Crust Color">
            <p>A dough with an adequate amount of residual sugars will develop a crust with rich color and a toasted bread aroma. Lack of available sugar (either due to short fermentation that didn't break down starch, or long fermentation that consumed everything) will result in a pale crust with less developed flavor.</p>
        </Section>
        <Section title="Behavior of Doughs with More or Less Sugars">
            <ul className="list-disc pl-5 mt-2 space-y-1">
                <li><strong>Doughs with more free sugars:</strong> Tend to brown faster and more intensely, which can be beneficial in lower-temperature home ovens. Can also result in a softer crumb.</li>
                <li><strong>Doughs with fewer free sugars:</strong> Require higher temperatures or longer baking times to achieve good coloration. This is the case for traditional styles like Neapolitan Pizza, which does not use added sugar.</li>
            </ul>
        </Section>
        <Section title="Technical References">
          <ul className="list-disc pl-5 space-y-2">
              <li>Modernist Bread</li>
              <li>Modernist Pizza</li>
              <li>Wikipedia (Maillard Reaction, Caramelization)</li>
          </ul>
        </Section>
    </TechnicalPageLayout>
  );
};

export default SugarsPage;
