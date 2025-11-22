
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

const TomatoPreservationPage: React.FC = () => {
  return (
    <TechnicalPageLayout
      title="Tomato Science: Acidity, Sweetness, and Preservation"
      subtitle="How preparation and tomato choice define the sauce profile."
    >
        <Section title="Introduction: The Acidic Soul of Pizza">
            <p>Tomato sauce is the heart of many pizzas, providing acidity, moisture, and a fundamental flavor foundation. The science behind a good sauce lies in the balance between tomato compounds and how they are transformed by processing and heat.</p>
        </Section>
        <Section title="Qualitative Differences Between Raw and Cooked Tomatoes">
            <p>A <strong>raw tomato</strong> sauce (like Neapolitan) preserves volatile and fresh compounds, resulting in a bright, fruity flavor with pronounced acidity. A <strong>cooked</strong> sauce (typical of NY Style) undergoes chemical reactions: water evaporates, concentrating sugars and umami, and heat breaks down cell walls, releasing more flavor compounds and creating deeper, sweeter notes.</p>
        </Section>
        <Section title="How Acidity and Sweetness Influence Perception">
            <p>A tomato's flavor is a delicate balance between its natural sugars (fructose and glucose) and its organic acids (citric and malic). <strong>Acidity</strong> is crucial for cutting through cheese fat and highlighting other flavors. <strong>Sweetness</strong> balances this acidity. Cooking tends to decrease the perception of acidity and increase that of sweetness as water evaporates.</p>
        </Section>
        <Section title="Impact of Oxidation and Storage">
            <p>Contact with oxygen and metals (like in unlined cans) can oxidize tomato compounds, leading to a metallic taste and loss of freshness. That's why high-quality canned tomatoes come in cans with protective lining, and transferring sauce to a glass or plastic container after opening is recommended.</p>
        </Section>
        <Section title="Fresh Notes vs. Cooked Notes">
            <p>"Fresh notes" come from volatile compounds that are easily lost with heat. "Cooked notes" are developed through sugar caramelization and Maillard reactions (to a lesser degree), creating a more robust and complex flavor profile. The choice between one and the other depends entirely on the pizza style and desired result.</p>
        </Section>
        <Section title="Tomato Behavior in Baking">
            <p>In the oven, sauce water evaporates rapidly. If the sauce is too liquid, this evaporation can "cook" the dough underneath, creating a "gum line." If the sauce is too concentrated and has added sugars, it can burn in high-temperature ovens. The goal is to have the right consistency so the sauce concentrates its flavor without soaking the dough or burning.</p>
        </Section>
        <Section title="Technical References">
          <ul className="list-disc pl-5 space-y-2">
              <li>Modernist Pizza</li>
              <li>Serious Eats - The Pizza Lab: Tomato Sauce</li>
              <li>"On Food and Cooking" by Harold McGee</li>
          </ul>
        </Section>
    </TechnicalPageLayout>
  );
};

export default TomatoPreservationPage;
