
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

const CaramelizableVegetablesPage: React.FC = () => {
  return (
    <TechnicalPageLayout
      title="Caramelizable Vegetables: Sugars and Aromas"
      subtitle="How heat transforms natural vegetable sweetness into complex flavors."
      showReferencesSection
    >
        <Section title="The Science of Caramelization">
            <p>Caramelization is a process of sugar oxidation that occurs under heat. Unlike the Maillard Reaction, it does not involve proteins. When sugar-rich vegetables are heated, their long carbohydrate chains break down into simple sugars, which then decompose and reform, creating hundreds of new aromatic compounds.</p>
        </Section>
        <Section title="Main Caramelizable Vegetables">
            <p>Some vegetables are particularly suited for this process due to their high natural sugar content:</p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
                <li><strong>Onion:</strong> The classic example. Heat transforms its pungent sulfur compounds into deep, sweet notes.</li>
                <li><strong>Peppers:</strong> Especially red and yellow ones, which lose their bitterness and develop intense sweetness when roasted.</li>
                <li><strong>Carrot and Pumpkin:</strong> When thinly sliced, their sugars caramelize, adding earthy sweetness.</li>
            </ul>
        </Section>
        <Section title="Development of Sweet and Complex Notes">
            <p>The caramelization process transforms the one-dimensional flavor of raw vegetables into a complex profile with nutty, toasted, and umami notes, in addition to evident sweetness. This complexity adds a sophisticated flavor layer to pizza that goes beyond simple "vegetable taste."</p>
        </Section>
        <Section title="Impact on Overall Pizza Profile">
            <p>The sweetness of caramelized vegetables serves as a perfect counterpoint to salty and fatty ingredients, such as cured cheeses, bacon, or anchovies. This balance between sweet and salty is one of the fundamental pillars of flavor harmony in gastronomy.</p>
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
