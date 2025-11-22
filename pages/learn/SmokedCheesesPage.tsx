
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

const SmokedCheesesPage: React.FC = () => {
  return (
    <TechnicalPageLayout
      title="Smoked Cheeses: Aromas and Smoke Physics"
      subtitle="How smoking science creates intense flavors and how to use them with balance."
      showReferencesSection
    >
        <Section title="Smoking as a Physico-Chemical Process">
            <p>Smoking is the process of exposing food to smoke from burning wood. Smoke isn't just heat; it's a complex aerosol containing hundreds of chemical compounds like phenols and aldehydes. These compounds deposit on the cheese surface, penetrating it and conferring characteristic aroma and flavor.</p>
        </Section>
        <Section title="Smoke Compounds and Fat Adhesion">
            <p>Many aromatic smoke compounds are lipophilic, meaning they dissolve in fat. Since cheese is rich in fat, it is an excellent medium for capturing and retaining these aromas. Fat acts as a vehicle, distributing the smoked flavor throughout the cheese.</p>
        </Section>
        <Section title="Intense Aromatic Impact">
            <p>Smoked flavor is dominant and can easily overpower other pizza ingredients. Cheeses like smoked provolone or scamorza affumicata add a deep layer of complexity, but their use requires attention not to mask the flavor of the sauce or dough.</p>
        </Section>
        <Section title="Moderation is Key">
            <p>Due to their intensity, smoked cheeses are often used in combination with milder cheeses, like mozzarella. A balanced mix allows obtaining the smoke aroma without sacrificing texture and the mildness of the cheese base.</p>
        </Section>
        <Section title="Classic Sensory Pairs">
            <p>Smoked flavor harmonizes well with ingredients that offer contrast. Classic combinations include using smoked cheese with cured meats (like bacon or speck), sweet vegetables (like caramelized onions), or a touch of sweetness (like a drizzle of honey).</p>
        </Section>
        <Section title="Technical References">
          <ul className="list-disc pl-5 space-y-2">
              <li>"On Food and Cooking" by Harold McGee</li>
              <li>Modernist Cuisine</li>
              <li>Wikipedia (Smoking (cooking), Food Chemistry)</li>
          </ul>
        </Section>
    </TechnicalPageLayout>
  );
};

export default SmokedCheesesPage;
