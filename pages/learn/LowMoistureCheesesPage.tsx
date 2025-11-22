
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

const LowMoistureCheesesPage: React.FC = () => {
  return (
    <TechnicalPageLayout
      title="Low-Moisture Cheeses: Behavior & Science"
      subtitle="The science behind stable melting and concentrated flavor."
      showReferencesSection
    >
        <Section title="Low Moisture: Flavor and Stability">
            <p>"Low-moisture" cheeses, like the mozzarella used in NY Style pizza, undergo a process that removes part of the whey. This water reduction concentrates proteins and fat, resulting in more intense flavor and a more stable final product.</p>
        </Section>
        <Section title="Stable and Controlled Melt">
            <p>With less water to evaporate, the melting of these cheeses is more uniform and less prone to creating liquid "pools." Fat distributes more homogeneously, creating cohesive, consistent coverage, ideal for slices needing structure.</p>
        </Section>
        <Section title="Resistance to Prolonged Heat">
            <p>Low moisture makes the cheese more resistant to longer baking times typical of home ovens. While very wet cheeses can "break" and release excessive fat, low moisture ones maintain their emulsion longer, browning gradually.</p>
        </Section>
        <Section title="Elastic Behavior and Concentrated Flavor">
            <p>The concentration of casein (the main cheese protein) results in excellent "stretch." Flavor, in turn, is saltier and more pronounced, as flavor components are less diluted in water.</p>
        </Section>
        <Section title="Fundamental Role in Specific Styles">
            <p>In New York style, low-moisture cheese is essential for creating a topping that stays firm on a foldable slice without running. Its ability to brown in a controlled manner also contributes to the classic appearance of this pizza style.</p>
        </Section>
        <Section title="Risks of Excessive Browning">
            <p>Having less water, the cheese surface reaches the temperature needed for the Maillard Reaction faster. In very hot ovens or with very long bake times, this can lead to excessive browning or even burning, resulting in a bitter taste.</p>
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
