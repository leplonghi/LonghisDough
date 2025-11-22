
import React from 'react';
import TechnicalPageLayout from './TechnicalPageLayout';

const GlossaryTerm: React.FC<{ term: string; children: React.ReactNode }> = ({ term, children }) => (
  <div className="py-4 border-b border-slate-200 dark:border-slate-700 last:border-b-0">
    <dt className="font-bold text-md text-slate-900 dark:text-slate-100">{term}</dt>
    <dd className="mt-1 text-slate-700 dark:text-slate-300 leading-relaxed">{children}</dd>
  </div>
);

const GlossaryPage: React.FC = () => {
  return (
    <TechnicalPageLayout
      title="Technical Baking Glossary"
      subtitle="A dictionary of the most important technical terms in the world of pizza and bread, explained clearly and directly."
      showReferencesSection
    >
      <dl>
        <GlossaryTerm term="Alveograph (Chopin)">
          Laboratory equipment measuring dough rheological properties by inflating a bubble of dough until rupture. Generates values like Strength (W) and P/L ratio.
        </GlossaryTerm>
        <GlossaryTerm term="Autolyse">
          Process consisting of resting flour and water (usually for 20 to 60 minutes) before adding salt and yeast. Autolyse fully hydrates flour, activates enzymes relaxing gluten, and facilitates gluten network formation with less mechanical work, resulting in more extensible dough.
        </GlossaryTerm>
        <GlossaryTerm term="Biga">
          Type of Italian preferment characterized by low hydration (typically 45-60%). Ferments for a long period (12-24 hours) and develops subtle lactic acidity, contributing to stronger crumb structure and complex aroma.
        </GlossaryTerm>
        <GlossaryTerm term="Biscotto">
          Cooking surface made of porous refractory clay, traditionally used in Neapolitan pizza ovens. Low thermal conductivity allows baking pizza base at very high temperatures (above 450°C) gently without burning.
        </GlossaryTerm>
        <GlossaryTerm term="Browning">
          Culinary term describing food surface darkening during cooking. In baking, result of combined Maillard Reaction and Caramelization.
        </GlossaryTerm>
        <GlossaryTerm term="Caramelization">
          Process of oxidation and thermal degradation of sugars at high temperatures. Distinct from Maillard Reaction as it doesn't involve proteins. Contributes to dark brown color and flavors ranging from sweet to bitter.
        </GlossaryTerm>
        <GlossaryTerm term="Cornicione">
          Italian term for the puffed, airy, soft rim of pizza, especially pronounced in Neapolitan style. Formed by correct dough manipulation pushing gas from center to edges.
        </GlossaryTerm>
        <GlossaryTerm term="Crumb">
          Refers to internal structure of baked dough. "Crumb" analysis evaluates size, shape, and distribution of alveoli (bubbles), as well as texture (soft, chewy, etc.).
        </GlossaryTerm>
        <GlossaryTerm term="DDT (Desired Dough Temperature)">
          Target temperature dough should reach at end of mixing/kneading. Controlling DDT is crucial for predictable and consistent fermentation regardless of environmental conditions.
        </GlossaryTerm>
        <GlossaryTerm term="Deck">
          Base or floor of an oven (usually stone, steel, or firebrick) where pizza or bread is baked by direct contact (conduction).
        </GlossaryTerm>
        <GlossaryTerm term="Fermentation">
          Metabolic process performed by microorganisms (mainly yeasts and bacteria) converting sugars into other compounds. In baking, results in CO₂ production (rising dough), ethanol, organic acids, and aromatic compounds developing flavor.
        </GlossaryTerm>
        <GlossaryTerm term="Acetic Fermentation">
          Secondary fermentation type performed by acetic bacteria producing acetic acid. In excess, can give vinegary, aggressive taste to dough.
        </GlossaryTerm>
        <GlossaryTerm term="Lactic Fermentation">
          Fermentation performed by Lactic Acid Bacteria (LAB), such as Lactobacillus genus. Produces lactic acid, giving mild, slightly tangy flavor characteristic of sourdough (levain).
        </GlossaryTerm>
        <GlossaryTerm term="Starch Gelatinization">
          Process occurring during baking where starch granules absorb water and swell under heat. "Locks" moisture in crumb structure, fundamental for soft, cooked texture of final product.
        </GlossaryTerm>
        <GlossaryTerm term="Gliadin and Glutenin">
          Two insoluble proteins found in wheat. When hydrated and subjected to mechanical work, connect to form gluten network. <strong>Gliadin</strong> confers extensibility and <strong>glutenin</strong> elasticity and strength.
        </GlossaryTerm>
        <GlossaryTerm term="Maillard Reaction">
          Complex series of chemical reactions between amino acids (from proteins) and reducing sugars under heat. Responsible for most golden color and complex, "toasted" flavors and aromas of pizza and bread crust.
        </GlossaryTerm>
        <GlossaryTerm term="Oil-Out">
          Phenomenon where fat (oil) from cheese or meat separates from protein matrix during baking, forming small pools on pizza surface.
        </GlossaryTerm>
        <GlossaryTerm term="Overproof / Underproof">
          Terms describing fermentation state. <strong>Overproof</strong> occurs when dough ferments too long; gluten network weakens, dough may collapse, and flavor becomes excessively acidic. <strong>Underproof</strong> occurs when fermentation is insufficient, resulting in dense dough with little volume and undeveloped flavor.
        </GlossaryTerm>
        <GlossaryTerm term="P/L">
          Index measured by Alveograph representing ratio between Tenacity (P - resistance to deformation) and Extensibility (L - stretching capacity). Flour with balanced P/L (around 0.5-0.6) is ideal for pizza, being strong but easy to open.
        </GlossaryTerm>
        <GlossaryTerm term="Poolish">
          Type of high hydration (100%) preferment made with equal parts flour and water plus small amount of yeast. Ferments shorter than Biga and results in more extensible final dough with mild flavor.
        </GlossaryTerm>
        <GlossaryTerm term="Preferment">
          Mixture of flour, water, and yeast (commercial or natural) prepared hours or days before final dough. Goal is to develop flavor, aroma, and improve dough structure. Biga and Poolish are common types.
        </GlossaryTerm>
        <GlossaryTerm term="Rimacinata">
          Italian term for "re-milled". Refers to durum wheat semolina flour passed through second milling process to be finer. Often used on work surface to open pizzas, especially Roman style, as it doesn't burn easily and adds crispy texture.
        </GlossaryTerm>
        <GlossaryTerm term="Stretch & Fold">
          Dough manipulation technique especially useful for high hydration doughs, consisting of stretching and folding dough over itself at intervals during bulk fermentation. Develops and strengthens gluten network gently without intense kneading.
        </GlossaryTerm>
        <GlossaryTerm term="Windowpane Test">
          Practical test to verify if gluten network is well developed. Consists of stretching small piece of dough with fingers. If able to form thin, translucent membrane (like a window) without tearing, gluten is at ideal point.
        </GlossaryTerm>
        <GlossaryTerm term="W (Flour Strength)">
          Index measured by Alveograph quantifying flour strength and fermentation capacity. Represents total energy needed to expand dough. High W flours are "strong" suitable for long fermentation and high hydration. Low W flours are "weak" for short fermentation.
        </GlossaryTerm>
      </dl>
    </TechnicalPageLayout>
  );
};

export default GlossaryPage;
