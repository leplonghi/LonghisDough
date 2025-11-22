
import React from 'react';
import TechnicalPageLayout from './TechnicalPageLayout';
import { BookOpenIcon } from '../../components/IconComponents';

const Section: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
    <div className="mt-8 first:mt-0">
        <h3 className="flex items-center gap-2 text-xl font-semibold text-slate-900 dark:text-slate-200 mb-3">
            {title}
        </h3>
        <div className="prose-sm dark:prose-invert max-w-none text-slate-700 dark:text-slate-300 leading-relaxed">
            {children}
        </div>
    </div>
);

const LowMoistureCheesesPage: React.FC = () => {
  return (
    <TechnicalPageLayout
      title="Low-Moisture Cheeses: Behavior & Science"
      subtitle="Science behind stable melting and concentrated flavor."
      showReferencesSection
    >
        <Section title="Low Moisture: Flavor and Stability">
            <p>"Low-moisture" cheeses, like mozzarella used in NY Style pizza, undergo a process removing part of the whey. This water reduction concentrates proteins and fat, resulting in more intense flavor and a more stable final product.</p>
        </Section>
        <Section title="Stable and Controlled Melt">
            <p>With less water to evaporate, melting of these cheeses is more uniform and less prone to creating liquid "pools". Fat distributes more homogeneously creating cohesive consistent coverage, ideal for slices needing structure.</p>
        </Section>
        <Section title="Resistance to Prolonged Heat">
            <p>Low moisture makes cheese more resistant to longer baking times typical of home ovens. While very wet cheeses can "break" releasing excessive fat, low moisture ones maintain emulsion longer, browning gradually.</p>
        </Section>
        <Section title="Elastic Behavior and Concentrated Flavor">
            <p>Concentration of casein (main cheese protein) results in excellent "stretch". Flavor is saltier and more pronounced as flavor components are less diluted in water.</p>
        </Section>
        <Section title="Fundamental Role in Specific Styles">
            <p>In New York style, low-moisture cheese is essential to creating topping that stays firm on foldable slice without running. Its controlled browning ability also contributes to classic pizza appearance.</p>
        </Section>
        <Section title="Excessive Browning Risks">
            <p>Having less water, cheese surface reaches Maillard Reaction temperature faster. In very hot ovens or long bakes, this can lead to excessive browning or burning, resulting in bitter taste.</p>
        </Section>
        <Section title="Technical References">
          <ul className="list-disc pl-5 space-y-2">
              <li>Modernist Pizza</li>
              <li>Serious Eats – The Pizza Lab (Cheese Guides)</li>
              <li>Wikipedia (Mozzarella, Food Chemistry)</li>
          </ul>
        </Section>
    </TechnicalPageLayout>
  );
};

export default LowMoistureCheesesPage;
