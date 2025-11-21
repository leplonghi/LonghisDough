
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

const TomatoPreservationPage: React.FC = () => {
  return (
    <TechnicalPageLayout
      title="Tomato Science: Acidity, Sweetness & Preservation"
      subtitle="How tomato choice and preparation define the sauce profile."
    >
        <Section title="Introduction: The Acidic Soul of Pizza">
            <p>Tomato sauce is the heart of many pizzas, providing acidity, moisture, and a fundamental flavor base. The science behind a good sauce lies in the balance between tomato compounds and how they are transformed by processing and heat.</p>
        </Section>
        <Section title="Qualitative Differences: Raw vs. Cooked">
            <p>A <strong>raw tomato</strong> sauce (like Neapolitan) preserves volatile and fresh compounds, resulting in a bright, fruity flavor with pronounced acidity. A <strong>cooked</strong> sauce (typical of NY Style) undergoes chemical reactions: water evaporates concentrating sugars and umami, and heat breaks down cell walls releasing more flavor compounds creating deeper, sweeter notes.</p>
        </Section>
        <Section title="How Acidity and Sweetness Influence Perception">
            <p>Tomato flavor is a delicate balance between natural sugars (fructose and glucose) and organic acids (citric and malic). <strong>Acidity</strong> is crucial to cut through cheese fat and highlight other flavors. <strong>Sweetness</strong> balances this acidity. Cooking tends to decrease acidity perception and increase sweetness as water evaporates.</p>
        </Section>
        <Section title="Impact of Oxidation and Storage">
            <p>Contact with oxygen and metals (like in unlined cans) can oxidize tomato compounds, leading to metallic taste and loss of freshness. This is why high-quality canned tomatoes come in protective lined cans and transferring sauce to glass or plastic containers after opening is recommended.</p>
        </Section>
        <Section title="Fresh Notes vs. Cooked Notes">
            <p>"Fresh notes" come from volatile compounds easily lost with heat. "Cooked notes" are developed through sugar caramelization and Maillard reactions (to a lesser degree), creating a robust and complex flavor profile. The choice between one and other depends entirely on pizza style and desired result.</p>
        </Section>
        <Section title="Tomato Behavior in Baking">
            <p>In the oven, sauce water evaporates rapidly. If sauce is too liquid, this evaporation can "cook" the dough underneath, creating a "gum line". If sauce is too concentrated and has added sugars, it can burn in high-temperature ovens. The goal is to have the right consistency so the sauce concentrates its flavor without soaking the dough or burning.</p>
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
