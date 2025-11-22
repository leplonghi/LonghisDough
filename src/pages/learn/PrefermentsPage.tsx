
import React from 'react';
import TechnicalPageLayout from './TechnicalPageLayout';
import { BeakerIcon, BookOpenIcon, FireIcon, SparklesIcon } from '../../components/IconComponents';

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

const PrefermentsPage: React.FC = () => {
  return (
    <TechnicalPageLayout
      title="Preferments: The Soul of Flavor"
      subtitle="Conceptual analysis of Biga, Poolish, and Sourdough transforming dough before kneading."
      showReferencesSection
    >
      <Section title="1. Introduction: Why use a Preferment?">
        <p>
          A preferment is a portion of dough prepared in advance. Fermenting separately allows yeast and enzymes to work longer, developing flavor complexity and improving structure. Per "Modernist Pizza" and "Tartine", main goals are:
        </p>
        <ul className="list-disc pl-5 mt-2 space-y-1">
            <li><strong>Develop flavor/aroma:</strong> Prolonged fermentation generates more aromatic compounds/acids.</li>
            <li><strong>Modulate acidity:</strong> Different types favor different acid profiles (lactic vs acetic).</li>
            <li><strong>Improve digestibility:</strong> Pre-digestion of starch/protein.</li>
            <li><strong>Increase strength:</strong> Acidity strengthens gluten network.</li>
            <li><strong>Extend shelf-life:</strong> Acidity acts as natural preservative.</li>
        </ul>
      </Section>

      <Section title="2. Poolish: The Liquid Preferment" icon={<BeakerIcon className="h-5 w-5" />}>
        <p>
          High hydration (100%), liquid consistency. French origin. Fluidity promotes fast fermentation and enzymatic activity.
        </p>
        <ul className="list-disc pl-5 mt-2 space-y-1">
            <li><strong>Confers Extensibility:</strong> High hydration and enzymes relax gluten, making final dough extensible.</li>
            <li><strong>Mild Aromatic Flavor:</strong> Promotes mild, slightly sweet, nutty profile.</li>
            <li><strong>Amylase Activity:</strong> Liquid environment facilitates amylase action, aiding crust browning.</li>
        </ul>
      </Section>
      
      <Section title="3. Biga: The Solid Preferment">
        <p>
          Low hydration (45-60%), solid/stiff consistency. Italian origin. Slower controlled fermentation.
        </p>
        <ul className="list-disc pl-5 mt-2 space-y-1">
            <li><strong>Increases Strength:</strong> Slower dry fermentation develops acidity strengthening gluten, ideal for high hydration support.</li>
            <li><strong>Deeper Flavor:</strong> Anaerobic environment favors complex aromatics and acetic notes.</li>
            <li><strong>Slow Fermentation:</strong> Low water limits yeast mobility.</li>
        </ul>
      </Section>

      <Section title="4. Sourdough / Massa Madre / Lievito Naturale">
        <p>
          Italian version usually stiff (Lievito Madre). Complex ecosystem.
        </p>
        <ul className="list-disc pl-5 mt-2 space-y-1">
            <li><strong>LAB Presence:</strong> Wild yeast + Lactic Acid Bacteria producing acids.</li>
            <li><strong>Complex Aromatics:</strong> Biodiversity generates richer profile than commercial yeast.</li>
            <li><strong>Different Structure:</strong> Natural acidity alters gluten structure, often chewier crumb.</li>
        </ul>
      </Section>

      <Section title="5. Sensory Effects" icon={<SparklesIcon className="h-5 w-5" />}>
        <ul className="list-disc pl-5 mt-2 space-y-1">
            <li><strong>Poolish:</strong> Open airy crumb, thin crispy crust, delicate aroma.</li>
            <li><strong>Biga:</strong> Elastic strong dough, robust crumb, deep flavor.</li>
            <li><strong>Sourdough:</strong> Complex flavor, moderate acidity, distinct aroma.</li>
        </ul>
      </Section>

      <Section title="6. Oven Behavior" icon={<FireIcon className="h-5 w-5" />}>
        <p>Preferments alter chemistry reflected in oven:</p>
        <ul className="list-disc pl-5 mt-2 space-y-1">
            <li>Increase residual sugars leading to <strong>faster intense caramelization</strong>.</li>
            <li>Generate more volatiles for <strong>richer aroma</strong> while baking.</li>
            <li>Internal structure tends to be <strong>more developed/complex</strong>.</li>
        </ul>
      </Section>

      <Section title="7. Risks">
        <ul className="list-disc pl-5 mt-2 space-y-1">
            <li><strong>Excess Acidity:</strong> Over-fermented preferment develops too much acid, tasting vinegary.</li>
            <li><strong>Strength Loss:</strong> Over-mature preferment degrades gluten via proteolysis.</li>
            <li><strong>Low Impact:</strong> Too young preferment lacks flavor complexity and benefits.</li>
        </ul>
      </Section>
      
      <Section title="8. Technical References" icon={<BookOpenIcon className="h-5 w-5" />}>
          <ul className="list-disc pl-5 space-y-2">
            <li>Modernist Pizza</li>
            <li>Modernist Bread</li>
            <li>King Arthur Baking – Guide to Preferments</li>
            <li>Wikipedia – Fermentation Microbiology</li>
          </ul>
      </Section>
    </TechnicalPageLayout>
  );
};

export default PrefermentsPage;
