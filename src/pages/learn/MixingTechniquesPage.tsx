
import React from 'react';
import TechnicalPageLayout from './TechnicalPageLayout';
import { WrenchScrewdriverIcon, BeakerIcon, ClockIcon, FireIcon } from '../../components/IconComponents';

const Section: React.FC<{ title: string; icon?: React.ReactNode; children: React.ReactNode }> = ({ title, icon, children }) => (
    <div className="mt-8 first:mt-0">
        <h3 className="flex items-center gap-2 text-xl font-semibold text-slate-900 dark:text-slate-200 mb-3">
            {icon}
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
      title="Mixing Science: Kneading & Gluten Development"
      subtitle="The physics of transforming flour and water into a viscoelastic structure."
      showReferencesSection
    >
        <Section title="1. The Goal of Mixing">
            <p>
                Mixing is not merely the homogenization of ingredients. It is an energy-input process designed to accomplish three distinct physical and chemical tasks:
            </p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
                <li><strong>Distribution:</strong> Evenly dispersing yeast, salt, and enzymes throughout the flour mass.</li>
                <li><strong>Hydration:</strong> Forcing water into the protein structure and starch granules.</li>
                <li><strong>Development:</strong> Unraveling the coiled proteins (gliadin and glutenin) and aligning them to form cross-links (disulfide bonds), creating the gluten network.</li>
            </ul>
        </Section>

        <Section title="2. Stages of Dough Development" icon={<ClockIcon className="h-5 w-5" />}>
            <p>
                Professional bakers categorize mixing into distinct stages. Recognizing these stages is crucial for consistency.
            </p>
            <ol className="list-decimal pl-5 mt-2 space-y-1">
                <li><strong>Pick-up:</strong> Ingredients are combined; the mixture is wet, lumpy, and has no strength.</li>
                <li><strong>Clean-up:</strong> The dough begins to form a cohesive mass and pulls away from the bowl sides. The gluten network is beginning to form but is irregular.</li>
                <li><strong>Development:</strong> The dough becomes smooth, dry to the touch, and elastic. It aligns into a coherent structure.</li>
                <li><strong>Let-down (Over-mixing):</strong> If mixing continues beyond development, the gluten network fractures due to excessive mechanical stress. The dough becomes shiny, sticky, and fluid again.</li>
            </ol>
        </Section>

        <Section title="3. Friction Factor and Oxidation" icon={<FireIcon className="h-5 w-5" />}>
            <p>
                Mechanical energy creates heat. This "Friction Factor" raises the dough temperature during mixing. High-speed mixers generate significant heat, which can prematurely accelerate yeast activity before the gluten is fully developed.
            </p>
            <p className="mt-2">
                <strong>Oxidation:</strong> Intense mixing incorporates oxygen. While this strengthens gluten, excessive oxidation bleaches the natural carotenoid pigments (flavor and creamy color) of the flour, resulting in a whiter crumb with less flavor. Artisan methods often favor "Short Mix" (less kneading) followed by long fermentation to preserve these pigments.
            </p>
        </Section>

        <Section title="4. The Mechanics of Folding (Stretch & Fold)" icon={<WrenchScrewdriverIcon className="h-5 w-5" />}>
            <p>
                For high-hydration doughs (common in modern pizza), mechanical kneading is often inefficient or damaging. The <strong>Stretch & Fold</strong> technique replaces brute force with time. By stretching the dough, you physically align the protein chains. By folding it, you create layers of tension.
            </p>
            <p className="mt-2">
                Allowing the dough to rest between folds (relaxation) permits the bonds to settle, enabling further stretching in the next cycle without tearing. This is the principle of "passive development."
            </p>
        </Section>

        <Section title="5. The Rubaud Method">
            <p>
                Named after French baker Gérard Rubaud, this hand-mixing technique is designed for very wet doughs. It involves scooping air into the dough with a rhythmic, cupping motion of the hand. This incorporates oxygen to aid yeast activity and strengthens the gluten structure without the aggressive tearing action of traditional kneading.
            </p>
        </Section>

        <Section title="6. Bassinage (Double Hydration)" icon={<BeakerIcon className="h-5 w-5" />}>
            <p>
                A professional technique for super-high hydration doughs (>80%). The dough is initially mixed to full gluten development with only ~70% of the water. Once the strong network is established, the remaining water is added slowly in increments. The developed gluten holds the extra water like a sponge, allowing for higher hydration than would be possible if all water were added at the start.
            </p>
        </Section>

        <Section title="7. The Windowpane Test">
            <p>
                The universal qualitative test for gluten development. A piece of dough is stretched gently. If it can extend into a thin, translucent membrane (like a windowpane) without tearing, the protein network is fully developed and ready for fermentation.
            </p>
        </Section>
    </TechnicalPageLayout>
  );
};

export default MixingTechniquesPage;
