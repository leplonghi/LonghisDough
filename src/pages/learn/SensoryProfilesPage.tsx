
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

const SensoryProfilesPage: React.FC = () => {
  return (
    <TechnicalPageLayout
      title="Sensory Profiles in Pizza"
      subtitle="How umami, fat, acidity, sweetness, and crunch balance to create perfect experience."
      showReferencesSection
    >
        <Section title="Balance of Fundamental Tastes">
            <p>Successful pizza is symphony of flavors and textures. Secret isn't single ingredient but harmonious balance between fundamental tastes. Successful combo stimulates different palate parts simultaneously creating complex satisfying experience.</p>
        </Section>
        <Section title="Umami: Taste of Satisfaction">
            <p>Umami, or "fifth taste", is savory depth flavor associated with glutamates. In pizza, umami is naturally present in key ingredients:</p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
                <li><strong>Ripe Tomatoes:</strong> Especially when cooked concentrate glutamates.</li>
                <li><strong>Aged Cheeses:</strong> Parmesan is one of richest natural sources.</li>
                <li><strong>Mushrooms:</strong> Particularly when cooked release earthy umami rich flavor.</li>
                <li><strong>Cured Meats:</strong> Curing process breaks proteins releasing glutamates.</li>
            </ul>
        </Section>
        <Section title="Fat as Flavor Vehicle">
            <p>Fat from cheese, oil, and meats is essential. It adds richness and pleasant mouthfeel and acts as solvent for many aromatic compounds carrying and distributing flavor throughout pizza.</p>
        </Section>
        <Section title="Acidity for Contrast and Cleansing">
            <p>Acidity is necessary counterpoint to fat. Tomato sauce acid "cuts" cheese richness cleansing palate preventing cloying pizza. Ingredients like pickles or olives can also add bright acidic note.</p>
        </Section>
        <Section title="Natural Sweetness for Balance">
            <p>Sweetness, even subtle, is crucial balancing salt and acidity. Can come from natural caramelization of onion/pepper, tomato sugar concentration in cooked sauce, or intentional additions like honey drizzle contrasting salty cheese.</p>
        </Section>
        <Section title="Crunch as Texture Element">
            <p>Pizza experience isn't just flavor but texture. Contrast between crispy base, soft melted cheese, and firmness of cured meat is fundamental. Crunch adds auditory and tactile dimension making experience interesting.</p>
        </Section>
        <Section title="Technical References">
          <ul className="list-disc pl-5 space-y-2">
              <li>"The Flavor Bible" by Karen Page and Andrew Dornenburg</li>
              <li>"On Food and Cooking" by Harold McGee</li>
              <li>Modernist Cuisine</li>
          </ul>
        </Section>
    </TechnicalPageLayout>
  );
};

export default SensoryProfilesPage;
