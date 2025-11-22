
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

const BallingTechniquePage: React.FC = () => {
  return (
    <TechnicalPageLayout
      title="Balling: Surface Tension Science"
      subtitle="Correct technique organizes gluten preparing for perfect final proof."
    >
        <Section title="Surface Tension">
            <p>Balling creates tensioned "skin" aligning outer gluten fibers.</p>
        </Section>
        <Section title="Gas Retention">
            <p>Tensioned skin improves gas retention allowing uniform rise.</p>
        </Section>
        <Section title="Opening Behavior">
            <p>Well-balled dough opens into round uniform disc predictably.</p>
        </Section>
        <Section title="Uniformity">
            <p>Consistent balling ensures consistent fermentation and behavior.</p>
        </Section>
        <Section title="Risks">
            <ul className="list-disc pl-5 mt-2 space-y-1">
                <li><strong>Weak:</strong> Pancakes/flat dough.</li>
                <li><strong>Excessive:</strong> Restricted expansion/degassing.</li>
            </ul>
        </Section>
        <Section title="Technical References">
          <ul className="list-disc pl-5 space-y-2">
              <li>Modernist Pizza</li>
              <li>Ooni Learn</li>
              <li>SFBI</li>
          </ul>
        </Section>
    </TechnicalPageLayout>
  );
};

export default BallingTechniquePage;
