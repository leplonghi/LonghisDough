
import React from 'react';
import TechnicalPageLayout from './TechnicalPageLayout';
import { CubeIcon, ShieldCheckIcon, BeakerIcon } from '../../components/IconComponents';

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

const BallingTechniquePage: React.FC = () => {
  return (
    <TechnicalPageLayout
      title="Balling: The Physics of Surface Tension"
      subtitle="Why shaping isn't just aesthetic: organizing gluten for gas retention and uniform expansion."
      showReferencesSection
    >
        <Section title="1. The Purpose of Balling (Staglio)">
            <p>
                Dividing and shaping dough into balls (Staglio) serves a structural purpose. It is the final reorganization of the gluten network before the final rise (Proofing). The primary goal is to create a "skin" of tension around the dough mass.
            </p>
        </Section>

        <Section title="2. Surface Tension and Gas Retention" icon={<ShieldCheckIcon className="h-5 w-5" />}>
            <p>
                A tight outer skin acts as a containment vessel. During the final proof, yeast produces CO₂.
            </p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
                <li><strong>Without Tension:</strong> The gas expands horizontally, the bubble structure is weak, and the dough flattens out (pancaking).</li>
                <li><strong>With Tension:</strong> The tight skin forces the expansion to happen vertically and internally, pressurizing the alveoli. This internal pressure is potential energy that is released as "oven spring" when baked.</li>
            </ul>
        </Section>

        <Section title="3. Sealing the Seam" icon={<CubeIcon className="h-5 w-5" />}>
            <p>
                Proper balling involves pulling the dough surface towards a central point at the bottom, creating a seam. This seam must be sealed tightly. If left open, gas will leak out of the bottom during fermentation, resulting in a dense, under-leavened pizza rim.
            </p>
        </Section>

        <Section title="4. Gluten Alignment">
            <p>
                The physical act of rolling the ball aligns the gluten strands in a concentric pattern. This alignment ensures that when the dough is eventually stretched (opened) into a disk, it expands evenly in all directions, maintaining a circular shape rather than becoming oblong or tearing at weak points.
            </p>
        </Section>

        <Section title="5. Relaxation and Elasticity" icon={<BeakerIcon className="h-5 w-5" />}>
            <p>
                Balling introduces mechanical stress, temporarily tightening the gluten (increasing elasticity). This is why dough balls must rest for several hours after shaping. If you try to open a ball immediately after shaping, it will snap back aggressively. The "proofing" window is the time required for this tension to relax sufficiently for stretching while retaining enough structure to hold gas.
            </p>
        </Section>

        <Section title="6. Common Defects">
            <ul className="list-disc pl-5 mt-2 space-y-1">
                <li><strong>Tearing the Skin:</strong> Over-tightening the ball breaks the outer gluten strands. This creates a rough surface that compromises gas retention.</li>
                <li><strong>Air Pockets:</strong> Trapping large air bubbles inside the ball during shaping can lead to giant, burnt bubbles (blisters) on the final pizza.</li>
                <li><strong>Incomplete Seal:</strong> Results in a flat, irregular dough ball ("blown" dough).</li>
            </ul>
        </Section>
    </TechnicalPageLayout>
  );
};

export default BallingTechniquePage;
