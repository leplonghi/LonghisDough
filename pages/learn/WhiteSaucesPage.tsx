
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

const WhiteSaucesPage: React.FC = () => {
  return (
    <TechnicalPageLayout
      title="White Sauces and Emulsions"
      subtitle="The science of consistency in creamy pizza bases."
    >
        <Section title="Introduction: The Chemistry of Emulsions">
            <p>White sauces, such as béchamel or cheese-based creams, are emulsions — stable suspensions of fat in a liquid (usually water or milk). The stability of this emulsion is key to a creamy sauce that behaves well in the oven, rather than a sauce that "breaks" and releases oil.</p>
        </Section>
        <Section title="Stable vs. Unstable Emulsions">
            <p>A <strong>stable emulsion</strong> is maintained by an emulsifying agent (like milk proteins in béchamel or lecithin in egg yolk). These agents prevent fat droplets from joining together. An <strong>unstable emulsion</strong>, like a simple vinaigrette, will separate quickly. Pizza sauces need stability to withstand intense heat.</p>
        </Section>
        <Section title="The Role of Dairy Fat">
            <p>Dairy fat (cream, butter, cheese) is what gives richness and flavor to white sauces. It also carries fat-soluble aromatic compounds. The challenge is keeping this fat emulsified. Starches (like flour in béchamel) and proteins help create a network that traps the fat.</p>
        </Section>
        <Section title="Thermal Behavior in the Oven">
            <p>Under oven heat, water in the emulsion begins to evaporate, concentrating the sauce. At the same time, heat can destabilize the emulsion. A well-made sauce will thicken and brown slightly (Maillard reaction of milk proteins), while a poorly made sauce will separate.</p>
        </Section>
        <Section title="Risks of Separation ('Breaking')">
            <p>A white sauce "breaks" when the emulsion fails and fat separates from liquid. This can happen for several reasons:</p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
                <li><strong>Excessive heat:</strong> Intense heat can denature the proteins that maintain the emulsion.</li>
                <li><strong>Excess acid:</strong> Acidic ingredients can coagulate milk proteins, causing separation.</li>
                <li><strong>Lack of emulsifying agent:</strong> The sauce lacks sufficient structure to keep fat suspended.</li>
            </ul>
        </Section>
        <Section title="Uses in Specific Pizzas">
            <p>White sauces are the base for "white pizzas." They offer a neutral, creamy canvas that pairs well with ingredients like mushrooms, spinach, potatoes, or cured meats. In focaccias, an olive oil and water emulsion base is often used to maintain moisture and flavor.</p>
        </Section>
        <Section title="Technical References">
          <ul className="list-disc pl-5 space-y-2">
              <li>"On Food and Cooking" by Harold McGee</li>
              <li>Modernist Cuisine</li>
              <li>Wikipedia (Emulsion, Bechamel Sauce)</li>
          </ul>
        </Section>
    </TechnicalPageLayout>
  );
};

export default WhiteSaucesPage;
