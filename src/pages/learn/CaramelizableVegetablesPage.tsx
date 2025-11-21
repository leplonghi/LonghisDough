
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

const CaramelizableVegetablesPage: React.FC = () => {
  return (
    <TechnicalPageLayout
      title="Caramelizable Vegetables: Sugars & Aromas"
      subtitle="How heat transforms natural vegetable sweetness into complex flavors."
      showReferencesSection
    >
        <Section title="Caramelization Science">
            <p>Caramelization is sugar oxidation process occurring under heat. Unlike Maillard Reaction, it doesn't involve proteins. When sugar-rich vegetables are heated, long carbohydrate chains break into simple sugars which then decompose and reform creating hundreds of new aromatic compounds.</p>
        </Section>
        <Section title="Main Caramelizable Vegetables">
            <p>Some vegetables are particularly suitable due to high natural sugar content:</p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
                <li><strong>Onion:</strong> Classic example. Heat transforms pungent sulfur compounds into deep sweet notes.</li>
                <li><strong>Peppers:</strong> Especially red and yellow, losing bitterness and developing intense sweetness when roasted.</li>
                <li><strong>Carrot and Pumpkin:</strong> When thinly sliced, sugars caramelize adding earthy sweetness.</li>
            </ul>
        </Section>
        <Section title="Development of Sweet Complex Notes">
            <p>Caramelization transforms one-dimensional raw vegetable flavor into complex profile with nutty, toasted, and umami notes plus evident sweetness. This complexity adds sophisticated flavor layer to pizza beyond simple "vegetable taste".</p>
        </Section>
        <Section title="Impact on Overall Pizza Profile">
            <p>Sweetness of caramelized vegetables serves as perfect counterpoint to salty fatty ingredients like cured cheeses, bacon, or anchovies. This sweet-salty balance is fundamental pillar of flavor harmony in gastronomy.</p>
        </Section>
        <Section title="Technical References">
          <ul className="list-disc pl-5 space-y-2">
              <li>"On Food and Cooking" by Harold McGee</li>
              <li>Wikipedia (Caramelization)</li>
              <li>Food Chemistry (textbooks)</li>
          </ul>
        </Section>
    </TechnicalPageLayout>
  );
};

export default CaramelizableVegetablesPage;
