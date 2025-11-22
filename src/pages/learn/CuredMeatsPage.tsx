
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

const CuredMeatsPage: React.FC = () => {
  return (
    <TechnicalPageLayout
      title="Cured Meats: Curing Science & Flavors"
      subtitle="How dehydration and fermentation transform meat into an intensely flavored ingredient."
      showReferencesSection
    >
        <Section title="The Curing Process">
            <p>Curing is an ancient preservation method involving salt, and sometimes nitrites/nitrates, to remove moisture from meat. This dehydration process inhibits microorganism growth and crucially concentrates natural meat flavors.</p>
        </Section>
        <Section title="Protein Transformation and Umami Flavor">
            <p>During curing and maturation, natural meat enzymes break down long protein chains into smaller components like amino acids. One of these is glutamate, responsible for the fifth taste, umami. This is why cured meats like prosciutto and salami have such deep satisfying flavor.</p>
        </Section>
        <Section title="Concentrated Flavors">
            <p>Removing water concentrates not only proteins but also fat and minerals. Result is ingredient with much more intense flavor than fresh counterpart. This means small amount of cured meat can have large sensory impact on pizza.</p>
        </Section>
        <Section title="Baking Behavior">
            <p>In oven heat, fat in cured meats melts ("rendering"), releasing oil that lightly fries meat and adds flavor to pizza. Proteins contract causing thin slices (like pepperoni) to crisp and cup.</p>
        </Section>
        <Section title="Risks of Drying Out">
            <p>Cured meats are already low in moisture. In very hot ovens or long bake times, they can dry out excessively, becoming tough and overly salty. Delicate cured meats like prosciutto are almost always added post-oven to preserve texture and flavor.</p>
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
