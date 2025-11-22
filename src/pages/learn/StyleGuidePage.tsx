
import React from 'react';
import TechnicalPageLayout from './TechnicalPageLayout';
import { BookOpenIcon, SparklesIcon, BeakerIcon, FireIcon } from '../../components/IconComponents';

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


const StyleGuidePage: React.FC = () => {
  return (
    <TechnicalPageLayout 
        title="Pizza Style Guide"
        subtitle="A conceptual, historical, and scientific description of major pizza styles, focusing on structural and textural characteristics."
        showReferencesSection={false} // Custom references section at the end
    >
        <Section title="1. Pizza Napoletana (AVPN – Conceptual Version)" icon={<FireIcon className="h-5 w-5" />}>
            <ul className="list-disc pl-5 mt-2 space-y-1">
                <li><strong>Dough:</strong> Extremely soft and extensible, designed to be opened by hand.</li>
                <li><strong>Rim (Cornicione):</strong> The most iconic feature. It is puffed, airy, with irregular alveoli and typical leopard spots ("leoparding") due to rapid, intense baking.</li>
                <li><strong>Baking:</strong> Extremely fast, in wood-fired ovens with extremely high temperatures. Pizza cooks in seconds, resulting in unique texture.</li>
                <li><strong>Flavor:</strong> Delicate and balanced, centered on high quality of the tomato-mozzarella-basil trio.</li>
                <li><strong>Structure:</strong> Center is very thin and wet, almost "soupy", making the slice soft and elastic, meant to be folded and eaten.</li>
                <li><strong>Oven Floor:</strong> Requires a floor with low thermal conductivity (like clay "biscotto") so base bakes perfectly without burning.</li>
            </ul>
        </Section>

        <Section title="2. New York Style" icon={<SparklesIcon className="h-5 w-5" />}>
            <ul className="list-disc pl-5 mt-2 space-y-1">
                <li><strong>Base:</strong> Firmer and wider, resulting in large, structured slices.</li>
                <li><strong>Rim:</strong> Crispy outside, but soft and chewy inside.</li>
                <li><strong>Sauce:</strong> Usually a cooked and seasoned tomato sauce, with a deeper flavor profile.</li>
                <li><strong>Cheese:</strong> Predominantly low-moisture mozzarella, melting evenly and releasing less water.</li>
                <li><strong>Baking:</strong> Longer and at more moderate temperatures than Neapolitan, typically in gas deck ovens.</li>
                <li><strong>Main Feature:</strong> The "foldable slice", allowing large slices to be eaten with one hand.</li>
            </ul>
        </Section>
        
        <Section title="3. Romana (Pala and Teglia)" icon={<BookOpenIcon className="h-5 w-5" />}>
            <ul className="list-disc pl-5 mt-2 space-y-1">
                <li><strong>Dough:</strong> Very high extensibility and hydration, resulting in extremely light, airy texture.</li>
                <li><strong>Crumb:</strong> Characterized by very large, irregular alveoli.</li>
                <li><strong>Baking:</strong> Can be double or prolonged, seeking maximum crispness development.</li>
                <li><strong>Crispness:</strong> The main feature. Base is notably crunchy ("scrocchiarella").</li>
                <li><strong>Flour:</strong> Commonly uses very strong flours to support high hydration and long fermentations.</li>
                <li><strong>Tradition:</strong> A pillar of contemporary Roman baking, sold in bakeries ("forni") by weight.</li>
            </ul>
        </Section>
        
        <Section title="4. Detroit Style" icon={<BeakerIcon className="h-5 w-5" />}>
            <ul className="list-disc pl-5 mt-2 space-y-1">
                <li><strong>Baking Pan:</strong> Baked in rectangular steel pans that conduct heat intensely.</li>
                <li><strong>Cheese Crust ("Frico"):</strong> The style's trademark. Cheese is spread to edges, creating a caramelized, crispy wall.</li>
                <li><strong>Dough:</strong> Higher and airier, with fluffy, soft texture similar to focaccia.</li>
                <li><strong>Inverted Assembly:</strong> Sauce is applied in stripes over cheese ("red stripes"), protecting dough from excess moisture.</li>
                <li><strong>Final Texture:</strong> A crispy, almost fried base, soft interior, and ultra-crispy cheese edges.</li>
            </ul>
        </Section>

        <Section title="5. Focaccia / Pan Pizza">
            <ul className="list-disc pl-5 mt-2 space-y-1">
                <li><strong>Dough:</strong> High with spongy, open crumb structure.</li>
                <li><strong>Texture:</strong> Soft and moist inside, with golden base and surface from oil.</li>
                <li><strong>Baking:</strong> Slower and at moderate temperatures to ensure interior cooks fully.</li>
                <li><strong>Oily Base:</strong> Generous use of olive oil in pan is fundamental for texture and flavor, lightly frying the base.</li>
                <li><strong>Use:</strong> Its robust structure is ideal for supporting heavier, wetter toppings.</li>
            </ul>
        </Section>

        <Section title="6. Chicago Deep Dish (Technical Summary)">
             <ul className="list-disc pl-5 mt-2 space-y-1">
                <li><strong>Pie Structure:</strong> Closer to a savory pie than flat pizza.</li>
                <li><strong>Dough:</strong> Dough forms a high wall and contains fat (butter or oil), giving rich, flaky texture.</li>
                <li><strong>Inverted Layers:</strong> Assembly is reversed (cheese at base, fillings in middle, sauce on top) to protect ingredients during long bake time.</li>
                <li><strong>Baking:</strong> Very long at low temperature to cook large amount of filling without burning dough.</li>
            </ul>
        </Section>

        <Section title="7. Thermal Considerations by Style">
            <ul className="list-disc pl-5 mt-2 space-y-1">
                <li><strong>High Temperature</strong> styles (like Neapolitan) rely on <strong>intense radiant heat</strong> from oven ceiling to cook top and puff rim quickly.</li>
                <li><strong>Home Oven</strong> styles (like adapted NY Style or Detroit) rely more on <strong>heat conduction</strong> from good surface (steel or pan) and <strong>convection</strong> (circulating hot air) to cook dough over longer period.</li>
            </ul>
        </Section>

        <Section title="8. Technical References" icon={<BookOpenIcon className="h-5 w-5" />}>
          <ul className="list-disc pl-5 space-y-2">
              <li>Modernist Pizza – Nathan Myhrvold & Francisco Migoya</li>
              <li>Associazione Verace Pizza Napoletana (AVPN) – Official regulation</li>
              <li>Historical and culinary records on pizza evolution in New York, Rome, and Detroit.</li>
              <li>Historical pizzerias like Lombardi's (NY), Forno Campo de' Fiori (Rome), and Buddy's (Detroit).</li>
          </ul>
        </Section>
    </TechnicalPageLayout>
  );
};

export default StyleGuidePage;
