
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

const SmokedCheesesPage: React.FC = () => {
  return (
    <TechnicalPageLayout
      title="Smoked Cheeses: Aromas & Smoke Physics"
      subtitle="How smoking science creates intense flavors and how to use them balanced."
      showReferencesSection
    >
        <Section title="Smoking as Physicochemical Process">
            <p>Smoking is exposing food to smoke from burning wood. Smoke isn't just heat; it's a complex aerosol containing hundreds of chemical compounds like phenols and aldehydes. These compounds deposit on cheese surface, penetrating it and conferring characteristic aroma and flavor.</p>
        </Section>
        <Section title="Smoke Compounds and Fat Adhesion">
            <p>Many aromatic smoke compounds are fat-soluble, meaning they dissolve in fat. As cheese is rich in fat, it is excellent medium to capture and retain these aromas. Fat acts as vehicle distributing smoked flavor throughout cheese.</p>
        </Section>
        <Section title="Intense Aromatic Impact">
            <p>Smoked flavor is dominant and can easily overpower other pizza ingredients. Cheeses like smoked provolone or scamorza affumicata add deep layer of complexity but use requires attention not to mask sauce or dough flavor.</p>
        </Section>
        <Section title="Moderation is Key">
            <p>Due to intensity, smoked cheeses are often used combined with milder cheeses like mozzarella. Balanced mix allows obtaining smoke aroma without sacrificing texture and mildness of cheese base.</p>
        </Section>
        <Section title="Classic Sensory Pairs">
            <p>Smoked flavor harmonizes well with ingredients offering contrast. Classic combinations include using smoked cheese with cured meats (like bacon or speck), sweet vegetables (like caramelized onion) or touch of sweetness (like honey drizzle).</p>
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
