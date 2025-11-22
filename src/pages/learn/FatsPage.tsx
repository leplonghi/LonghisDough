
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

const FatsPage: React.FC = () => {
  return (
    <TechnicalPageLayout
      title="Fats in Dough: Structure, Flavor, Texture"
      subtitle="Comparative view on oil, butter, and fats."
    >
        <Section title="Softener Agent">
            <p>Fats modify texture, flavor, and oven behavior. Act as softeners interfering with gluten.</p>
        </Section>
        <Section title="Gluten Interaction">
            <p>Coat proteins interfering with connection, resulting in shorter gluten network (softer crumb).</p>
        </Section>
        <Section title="Softness/Extensibility">
            <p>Lubricates gluten increasing extensibility. Result: softer crumb, tender crust, longer shelf life.</p>
        </Section>
        <Section title="Flavor/Texture">
            <p>Adds distinct flavor (olive oil vs butter). Conducts heat for crispier crust (pan pizza).</p>
        </Section>
        <Section title="Tradition">
            <ul className="list-disc pl-5 mt-2 space-y-1">
                <li><strong>Traditional:</strong> Oil in NY/Roman style. Butter in Brioche.</li>
                <li><strong>Non-Traditional:</strong> Authentic Neapolitan (AVPN) forbids fat in dough.</li>
            </ul>
        </Section>
        <Section title="Risks">
            <p>Excess fat coats yeast/proteins inhibiting fermentation and structure building.</p>
        </Section>
        <Section title="Technical References">
          <ul className="list-disc pl-5 space-y-2">
              <li>Modernist Bread</li>
              <li>Modernist Pizza</li>
              <li>King Arthur Baking</li>
              <li>Serious Eats</li>
          </ul>
        </Section>
    </TechnicalPageLayout>
  );
};

export default FatsPage;
