
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

const CuredMeatsPage: React.FC = () => {
  return (
    <TechnicalPageLayout
      title="Cured Meats: Curing Science and Flavors"
      subtitle="How dehydration and fermentation transform meat into an intensely flavored ingredient."
      showReferencesSection
    >
        <Section title="The Curing Process">
            <p>Curing is an ancient preservation method involving the use of salt, and sometimes nitrites/nitrates, to remove moisture from meat. This dehydration process inhibits microorganism growth and, crucially, concentrates natural meat flavors.</p>
        </Section>
        <Section title="Protein Transformation and Umami Flavor">
            <p>During curing and maturation, natural meat enzymes break down long protein chains into smaller components, such as amino acids. One of these amino acids is glutamate, responsible for the fifth taste, umami. That's why cured meats like prosciutto and salami have such deep, satisfying flavor.</p>
        </Section>
        <Section title="Concentrated Flavors">
            <p>Removing water concentrates not only proteins but also fat and minerals. The result is an ingredient with much more intense flavor than its fresh counterpart. This means a small amount of cured meat can have a large sensory impact on pizza.</p>
        </Section>
        <Section title="Baking Behavior">
            <p>In the heat of the oven, fat present in cured meats melts ("rendering"), releasing oil that lightly fries the meat and adds flavor to the pizza. Proteins contract, causing thin slices (like pepperoni) to crisp and curl ("cupping").</p>
        </Section>
        <Section title="Risks of Drying Out">
            <p>Cured meats already have low moisture. In very hot ovens and with long cooking times, they can dry out excessively, becoming tough and overly salty. Very delicate cured meats, like prosciutto, are almost always added post-oven to preserve their texture and flavor.</p>
        </Section>
        <Section title="Technical References">
          <ul className="list-disc pl-5 space-y-2">
              <li>Modernist Cuisine</li>
              <li>"On Food and Cooking" by Harold McGee</li>
              <li>Serious Eats – Cured Meats Guides</li>
          </ul>
        </Section>
    </TechnicalPageLayout>
  );
};

export default CuredMeatsPage;
