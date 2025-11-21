
import React from 'react';
import TechnicalPageLayout from './TechnicalPageLayout';
import { BookOpenIcon } from '../../components/IconComponents';

const Section: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
    <div className="mt-8 first:mt-0">
        <h3 className="flex items-center gap-2 text-xl font-semibold text-slate-800 dark:text-slate-200 mb-3">
            {title}
        </h3>
        <div className="prose-sm dark:prose-invert max-w-none text-slate-700 dark:text-slate-300 leading-relaxed">
            {children}
        </div>
    </div>
);

const MixingTechniquesPage: React.FC = () => {
  return (
    <TechnicalPageLayout
      title="Mixing & Kneading Techniques"
      subtitle="Science of gluten development via manual and mechanical manipulation."
    >
        <Section title="Mechanical Friction">
            <p>Goal is gluten development. Mechanical action aligns proteins to form network. Generates heat.</p>
        </Section>
        <Section title="Traditional Kneading">
            <p>Continuous kneading for rapid development seeking "windowpane".</p>
        </Section>
        <Section title="Stretch & Fold">
            <p>Ideal for high hydration. Gentle stretching at intervals aligns gluten passively.</p>
        </Section>
        <Section title="Rubaud Method">
            <p>Manual bowl mixing method "scooping" air into wet dough.</p>
        </Section>
        <Section title="Over vs Under Mixing">
            <p>Balance crucial. Under = weak/dense. Over = tough/oxidized.</p>
        </Section>
        <Section title="Technical References">
          <ul className="list-disc pl-5 space-y-2">
              <li>Modernist Bread</li>
              <li>King Arthur Baking</li>
              <li>Ken Forkish</li>
          </ul>
        </Section>
    </TechnicalPageLayout>
  );
};

export default MixingTechniquesPage;
