
import React from 'react';
import TechnicalPageLayout from './TechnicalPageLayout';
import { BeakerIcon, BookOpenIcon, FireIcon } from '../../components/IconComponents';

// Local Section component for structuring content
const Section: React.FC<{ title: string, icon?: React.ReactNode, children: React.ReactNode }> = ({ title, icon, children }) => (
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

const ChemistryLibraryPage: React.FC = () => {
  return (
    <TechnicalPageLayout title="Pizza Chemistry Library" showReferencesSection>
        <Section title="Introduction: Pizza as a Lab">
            <p>
                Creating a pizza is a practical exercise in chemistry and physics. From the moment water touches flour, a cascade of transformations begins, involving the main building blocks of food: carbohydrates, proteins, lipids, sugars, water, and gases. Understanding these processes allows much greater control over the final result.
            </p>
        </Section>

        <Section title="1. Hydration & Solubilization" icon={<BeakerIcon className="h-5 w-5" />}>
            <p>Water is the universal solvent in baking. Its first function is as a solvent, dissolving salt, sugars, and allowing enzymes to move and start working. Next, it hydrates starch granules and, most importantly, flour proteins, initiating gluten formation. The amount of water (hydration) directly influences molecule mobility and, consequently, dough extensibility.</p>
        </Section>

        <Section title="2. Gluten Formation">
            <p>Gluten is a complex protein network formed when two flour proteins, <strong>gliadin</strong> and <strong>glutenin</strong>, are hydrated and manipulated. Intermolecular bonds (disulfide bridges) form, creating a viscoelastic structure.</p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
                <li><strong>Gliadin:</strong> Responsible for <strong>extensibility</strong> (ability to stretch).</li>
                <li><strong>Glutenin:</strong> Responsible for <strong>elasticity</strong> and strength (tendency to return to original shape).</li>
            </ul>
            <p>Manipulation (kneading, folding) organizes and strengthens this network. Resting (autolyse) allows hydration to occur passively, developing gluten with less mechanical work.</p>
        </Section>

        <Section title="3. Fermentation" icon={<BeakerIcon className="h-5 w-5" />}>
            <p>Fermentation is the metabolic process performed by yeast <em>Saccharomyces cerevisiae</em>. In a low-oxygen (anaerobic) environment, yeast consumes simple sugars and produces <strong>carbon dioxide (CO₂)</strong> and <strong>ethanol</strong>.</p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
                <li>CO₂ gets trapped in the gluten network, inflating the dough and creating volume.</li>
                <li>Ethanol and other byproducts (esters, organic acids) are primarily responsible for developing characteristic bread flavor and aroma.</li>
                <li>During this process, enzymes <strong>amylases</strong> (breaking starch into sugars) and <strong>proteases</strong> (breaking proteins) continue to modify the dough, making it tastier and more extensible.</li>
            </ul>
        </Section>

        <Section title="4. Maillard Reaction" icon={<FireIcon className="h-5 w-5" />}>
            <p>This is not a single reaction, but a complex network of reactions occurring between <strong>amino acids</strong> (from proteins) and <strong>reducing sugars</strong> under heat. It is primarily responsible for the deep golden color and a vast range of complex, "toasted" flavors. The Maillard Reaction requires dry heat and high surface temperature to occur effectively.</p>
        </Section>

        <Section title="5. Caramelization">
            <p>Distinct from Maillard, caramelization is the thermal degradation (pyrolysis) of <strong>sugars</strong>. It occurs at generally higher temperatures and involves only sugars. It contributes nutty, bitter, and sweet flavor notes, and darker coloring (almost amber) on crust spots and ingredients like onions.</p>
        </Section>

        <Section title="6. Starch Gelatinization">
            <p>During baking, starch granules in the dough absorb free water around them and swell dramatically when heated. This process, called gelatinization, "locks" water into the crumb structure and is fundamental for forming the soft, moist internal texture of pizza. In thicker styles like Detroit, complete gelatinization is crucial to avoid a raw center.</p>
        </Section>

        <Section title="7. Evaporation and Phase Change">
            <p>When pizza enters the hot oven, free water on the dough surface and ingredients evaporates rapidly. Water inside the dough turns into steam. This steam expands violently, inflating gas alveoli (created by fermentation) and causing "oven spring" — the rapid final rise of the rim. It is a basic thermodynamics principle in action.</p>
        </Section>

        <Section title="8. Lipids and Oil-Out">
            <p>Lipids (fats), present in cheese and oil, have a lower melting point than oven temperature. They melt quickly, lubricating the pizza structure. In cheeses with high fat content, "oil-out" may occur, where fat separates from the protein matrix and forms small pools. While it may seem excessive, this free fat is an excellent flavor conductor.</p>
        </Section>
        
        <Section title="9. Thermal Degradation of Herbs and Aromas">
            <p>Aromas of fresh herbs like basil come from volatile organic compounds. When exposed to intense oven heat, these compounds evaporate or degrade rapidly, losing their characteristic scent. This is why Italian culinary tradition, based on practice, dictates fresh and delicate herbs be added after pizza leaves the oven.</p>
        </Section>
    </TechnicalPageLayout>
  );
};

export default ChemistryLibraryPage;
