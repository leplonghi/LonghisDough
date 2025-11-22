
import React from 'react';
import TechnicalPageLayout from './TechnicalPageLayout';
import { BeakerIcon, BookOpenIcon } from '../../components/IconComponents';

// Local Section component for structuring content
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

const TemperatureControlPage: React.FC = () => {
  return (
    <TechnicalPageLayout
      title="Dough Temperature Control"
      subtitle="The most important concept for consistency in baking, qualitatively explained."
      showReferencesSection
    >
      <Section title="1. Introduction: Temperature is Everything">
        <p>
          Temperature is the most influential variable in dough behavior. It regulates biochemical processes transforming flour and water into structure and flavor. Temperature determines:
        </p>
        <ul className="list-disc pl-5 mt-2 space-y-1">
            <li><strong>Fermentation speed:</strong> Pacing gas production.</li>
            <li><strong>Gluten strength/extensibility:</strong> Influencing handling.</li>
            <li><strong>Enzymatic activity:</strong> Crucial for flavor and starch breakdown.</li>
            <li><strong>Final flavor:</strong> Modulating aromatic compounds.</li>
        </ul>
        <p>This concept is universal and applies to all baking forms, from pizza to artisan bread.</p>
      </Section>

      <Section title="2. DDT — Desired Dough Temperature">
        <p>
          DDT is the central concept. Per "Modernist Bread", it represents the <strong>target temperature dough should reach immediately after mixing</strong>. Hitting consistent DDT is key to predictability.
        </p>
        <ul className="list-disc pl-5 mt-2 space-y-1">
            <li>Controlling DDT means consistent fermentation start conditions regardless of weather.</li>
            <li>Main tool transforming baking from "feeling" to controlled science.</li>
        </ul>
      </Section>
      
      <Section title="3. Factors Influencing Dough Temp">
        <p>
          Final temp sums multiple heat sources. Manage each:
        </p>
        <ol className="list-decimal pl-5 mt-2 space-y-1">
            <li><strong>Flour Temp:</strong> Usually room temp.</li>
            <li><strong>Water Temp:</strong> Easiest control factor. Use cold/warm water to adjust.</li>
            <li><strong>Room Temp:</strong> Heat exchange during mixing.</li>
            <li><strong>Friction Heat:</strong> Mechanical mixing generates heat.</li>
            <li><strong>Equipment Temp:</strong> Bowl/bench transfer heat.</li>
        </ol>
      </Section>

      <Section title="4. Friction: Heat of Movement">
        <p>
          Kneading introduces mechanical energy dissipating as heat.
        </p>
        <ul className="list-disc pl-5 mt-2 space-y-1">
            <li>Stiff low hydration doughs generate more friction heat.</li>
            <li>High speed mixers generate significant heat.</li>
            <li>Autolyse/rest reduces mechanical work needed, reducing friction heat.</li>
        </ul>
      </Section>
      
      <Section title="5. Temperature and Fermentation">
        <p>Direct relationship: temp governs yeast metabolism.</p>
        <ul className="list-disc pl-5 mt-2 space-y-1">
            <li><strong>Warm doughs ferment faster.</strong> Yeast active, rapid CO₂.</li>
            <li><strong>Cold doughs ferment slower.</strong> Reduced activity, prolonged rise.</li>
            <li>In sourdough, temp influences yeast/LAB balance affecting flavor profile.</li>
        </ul>
      </Section>

      <Section title="6. Impact on Flavor">
        <p>Fermentation speed impacts flavor.</p>
        <ul className="list-disc pl-5 mt-2 space-y-1">
            <li><strong>Long cold fermentations</strong> allow enzymes time to produce complex aromatics. Deep nuanced flavor.</li>
            <li><strong>Fast warm fermentations</strong> favor CO₂/ethanol. Clean simple flavor.</li>
        </ul>
      </Section>

      <Section title="7. Practical Control">
        <ul className="list-disc pl-5 mt-2 space-y-1">
            <li><strong>Adjust ingredient temp:</strong> Mainly water.</li>
            <li><strong>Control environment:</strong> Stable room temp if possible.</li>
            <li><strong>Fridge (Retard):</strong> Effective tool to slow fermentation for flavor.</li>
            <li><strong>Bench Rest:</strong> "Wakes up" cold dough.</li>
        </ul>
      </Section>

      <Section title="8. Risks of Uncontrolled Temp">
        <ul className="list-disc pl-5 mt-2 space-y-1">
            <li><strong>Too Hot:</strong> Uncontrolled fermentation, gas before flavor, gluten degradation.</li>
            <li><strong>Too Cold:</strong> Slow/inactive fermentation, dense heavy dough.</li>
            <li><strong>Sudden Changes:</strong> Stress gluten network.</li>
        </ul>
      </Section>

      <Section title="9. Technical References" icon={<BookOpenIcon className="h-5 w-5" />}>
          <ul className="list-disc pl-5 space-y-2">
              <li>"Modernist Bread" (DDT)</li>
              <li>"Modernist Pizza"</li>
              <li>King Arthur Baking</li>
              <li>Wikipedia – Thermodynamics</li>
          </ul>
      </Section>
    </TechnicalPageLayout>
  );
};

export default TemperatureControlPage;
