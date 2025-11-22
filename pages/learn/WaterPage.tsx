
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

const WaterPage: React.FC = () => {
  return (
    <TechnicalPageLayout
      title="Water: Composition and Qualitative Impact"
      subtitle="The science behind the ingredient that gives life to dough."
    >
        <Section title="Introduction: More Than H₂O">
            <p>Water is the universal solvent in baking. It not only hydrates the flour but also dissolves salt, activates yeast, and allows enzymes to begin their work. The mineral composition of water, especially its "hardness," has a subtle but significant impact on the dough.</p>
        </Section>
        <Section title="Minerals and Water Hardness">
            <p>Water hardness refers to the concentration of dissolved minerals, primarily calcium and magnesium. "Soft" water has few minerals, while "hard" water has a higher concentration. These minerals interact directly with the dough structure.</p>
        </Section>
        <Section title="Hardness Effect on Gluten Structure">
            <p>Minerals in hard water, such as calcium, strengthen the bonds of the gluten network. This results in a stronger, more tenacious dough. In contrast, very soft water can result in a stickier, more relaxed dough because the gluten doesn't receive this mineral reinforcement.</p>
        </Section>
        <Section title="Impact on Fermentation">
            <p>Minerals in water also serve as nutrients for yeast, promoting healthy fermentation. Excessively soft or demineralized water can retard yeast activity. Conversely, extremely hard water can inhibit fermentation.</p>
        </Section>
        <Section title="Soft vs. Hard Water">
            <ul className="list-disc pl-5 mt-2 space-y-1">
                <li><strong>Soft Water:</strong> Tends to produce softer, stickier doughs. Fermentation may be slightly slower.</li>
                <li><strong>Hard Water:</strong> Produces firmer, stronger doughs with greater fermentation tolerance. In excess, can make the dough too stiff.</li>
            </ul>
            <p>Generally, moderately hard water is considered ideal for baking.</p>
        </Section>
        <Section title="Essential for Hydration and Enzymatic Processes">
            <p>Regardless of its hardness, water's primary function is hydration. It allows flour proteins (gliadin and glutenin) to join and form gluten and activates amylase and protease enzymes, which are crucial for breaking down starches and proteins, developing flavor and dough structure.</p>
        </Section>
        <Section title="Impact on Final Flavor">
            <p>Although subtle, water's mineral composition can influence the final flavor. Waters with distinct mineral profiles can contribute background notes that complement the flavor of fermented wheat.</p>
        </Section>
        <Section title="Technical References">
          <ul className="list-disc pl-5 space-y-2">
              <li>Modernist Bread</li>
              <li>King Arthur Baking - Water in Baking</li>
              <li>Wikipedia (Water Hardness)</li>
          </ul>
        </Section>
    </TechnicalPageLayout>
  );
};

export default WaterPage;
