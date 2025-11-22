
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

const SensoryProfilesPage: React.FC = () => {
  return (
    <TechnicalPageLayout
      title="Sensory Profiles in Pizza"
      subtitle="How umami, fat, acidity, sweetness, and crunch balance to create the perfect experience."
      showReferencesSection
    >
        <Section title="The Balance of Fundamental Tastes">
            <p>A successful pizza is a symphony of flavors and textures. The secret isn't in a single ingredient, but in the harmonious balance between fundamental tastes. A successful combination stimulates different parts of the palate simultaneously, creating a complex and satisfying experience.</p>
        </Section>
        <Section title="Umami: The Taste of Satisfaction">
            <p>Umami, or the "fifth taste," is the flavor of "deliciousness" and depth, associated with glutamates. In pizza, umami is naturally present in key ingredients:</p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
                <li><strong>Ripe Tomatoes:</strong> Especially when cooked, concentrate glutamates.</li>
                <li><strong>Aged Cheeses:</strong> Parmesan is one of the richest natural sources.</li>
                <li><strong>Mushrooms:</strong> Particularly when cooked, release an earthy, umami-rich flavor.</li>
                <li><strong>Cured Meats:</strong> The curing process breaks down proteins, releasing glutamates.</li>
            </ul>
        </Section>
        <Section title="Fat as a Flavor Vehicle">
            <p>Fat, from cheese, olive oil, and meats, is essential. It not only adds richness and a pleasant mouthfeel but also acts as a solvent for many aromatic compounds, carrying and distributing flavor throughout the pizza.</p>
        </Section>
        <Section title="Acidity for Contrast and Cleansing">
            <p>Acidity is the necessary counterpoint to fat. The acid from tomato sauce "cuts" the richness of the cheese, cleansing the palate and preventing the pizza from becoming cloying. Ingredients like pickles or olives can also add that bright acidic note.</p>
        </Section>
        <Section title="Natural Sweetness for Balance">
            <p>Sweetness, even if subtle, is crucial for balancing salt and acidity. It can come from the natural caramelization of onion and pepper, the concentration of tomato sugars in a cooked sauce, or intentional additions, like a drizzle of honey to contrast with a salty cheese.</p>
        </Section>
        <Section title="Crunch as a Texture Element">
            <p>The pizza experience isn't just about flavor, but also texture. The contrast between the crispy base, the softness of melted cheese, and the firmness of cured meat is fundamental. Crunch adds an auditory and tactile dimension that makes the experience much more interesting.</p>
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
