
import React from 'react';
import TechnicalPageLayout from './TechnicalPageLayout';
import { FireIcon, BeakerIcon, ClockIcon } from '../../components/IconComponents';

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

const ParbakingPage: React.FC = () => {
  return (
    <TechnicalPageLayout
      title="Parbaking & Double Baking"
      subtitle="The thermodynamics of two-stage baking for texture control and moisture management."
      showReferencesSection
    >
        <Section title="1. The Logic of Two Stages">
            <p>
                Parbaking (or blind baking) separates the cooking of the dough structure from the cooking of the toppings. This technique is essential for styles like Roman Teglia, Detroit, or heavy Pan Pizzas, where the time required to crisp the base would destroy delicate toppings, or the moisture from toppings would prevent the base from baking.
            </p>
        </Section>

        <Section title="2. Stage 1: Structure Set and Gelatinization" icon={<FireIcon className="h-5 w-5" />}>
            <p>
                The goal of the first bake (usually sauce-only or plain dough) is <strong>Starch Gelatinization</strong> and <strong>Gluten Coagulation</strong>.
            </p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
                <li>The dough is baked until the internal temperature passes ~93°C (200°F). At this point, the crumb structure is set and will not collapse.</li>
                <li>Without heavy cheese or wet toppings, water evaporates freely from the dough, establishing a crisp outer crust layer ("crust formation") without burning.</li>
                <li>The result is a stable, cooked sponge that can be stored or frozen.</li>
            </ul>
        </Section>

        <Section title="3. Moisture Management (The Anti-Gum Line Strategy)" icon={<BeakerIcon className="h-5 w-5" />}>
            <p>
                One of the biggest technical faults in pizza is the "gum line"—a raw, doughy layer beneath the sauce. Parbaking solves this by creating a hydrophobic barrier (a dry crust) on top of the dough <em>before</em> moist ingredients are added. When sauce and cheese are added for the second bake, they sit on a cooked surface, preventing liquid absorption into the crumb.
            </p>
        </Section>

        <Section title="4. Stage 2: The Finish (Double Bake)" icon={<ClockIcon className="h-5 w-5" />}>
            <p>
                The second bake is short and intense. Since the dough is already cooked, the goal is purely:
            </p>
            <ol className="list-decimal pl-5 mt-2 space-y-1">
                <li>Melting the cheese.</li>
                <li>Heating the toppings.</li>
                <li>Re-crisping the bottom (which may have softened).</li>
            </ol>
            <p className="mt-2">
                This stage allows the use of delicate ingredients that cannot withstand 15-20 minutes of oven time.
            </p>
        </Section>

        <Section title="5. Applications by Style">
            <ul className="list-disc pl-5 mt-2 space-y-1">
                <li><strong>Roman Teglia:</strong> Almost always parbaked. The high hydration (80%+) requires a long initial bake to drive out moisture.</li>
                <li><strong>Detroit Style:</strong> Often parbaked to ensure the center of the thick dough is fully cooked before the cheese crust (frico) burns.</li>
                <li><strong>Frozen Pizza:</strong> Commercial frozen pizzas are parbaked so the consumer only needs to "finish" them.</li>
            </ul>
        </Section>

        <Section title="6. Technical Risks">
            <p>
                <strong>Drying Out:</strong> The risk of double baking is removing <em>too much</em> moisture, resulting in a hard, rusk-like texture rather than a crispy-chewy one. This is mitigated by high hydration formulas and controlling the temperature of the second bake.
            </p>
        </Section>
    </TechnicalPageLayout>
  );
};

export default ParbakingPage;
