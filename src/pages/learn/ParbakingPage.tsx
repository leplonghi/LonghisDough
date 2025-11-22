
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

const ParbakingPage: React.FC = () => {
  return (
    <TechnicalPageLayout
      title="Parbaking & Double Baking"
      subtitle="Science of two-stage baking for texture and moisture control."
    >
        <Section title="Advantages">
            <p>Common in Roman/Pan styles. Controls moisture, seals base, prevents gum line.</p>
        </Section>
        <Section title="Base Structure">
            <p>First bake sets structure. Second finishes toppings/crispness.</p>
        </Section>
        <Section title="Thermal Conduction">
            <p>Allows base cooking directly on deck.</p>
        </Section>
        <Section title="Risks">
            <p>Over-drying base making it hard not crispy.</p>
        </Section>
        <Section title="Technical References">
          <ul className="list-disc pl-5 space-y-2">
              <li>Modernist Pizza</li>
              <li>Bonci Style</li>
              <li>Serious Eats</li>
          </ul>
        </Section>
    </TechnicalPageLayout>
  );
};

export default ParbakingPage;
