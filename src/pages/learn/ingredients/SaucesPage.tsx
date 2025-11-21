
import React from 'react';
import IngredientPageLayout from './IngredientPageLayout';
import { BookOpenIcon, SparklesIcon, BeakerIcon, FireIcon } from '../../../components/IconComponents';

const Section: React.FC<{ title: string, icon?: React.ReactNode, children: React.ReactNode }> = ({ title, icon, children }) => (
    <div className="mt-8 first:mt-0">
        <h3 className="flex items-center gap-2 text-xl font-semibold text-slate-800 dark:text-slate-200 mb-3">
            {icon}
            {title}
        </h3>
        <div className="prose-sm dark:prose-invert max-w-none text-slate-700 dark:text-slate-300 leading-relaxed">
            {children}
        </div>
    </div>
);


const SaucesPage: React.FC = () => {
  return (
    <IngredientPageLayout
      title="Pizza Sauces"
      description="A technical analysis of the pizza heart: the sauce. Understand how tomato choice and preparation impact acidity, moisture, and final flavor balance."
      category="Ingredients"
    >
      <Section title="Introduction: The Central Role of Sauce">
        <p>
            Sauce is much more than a simple wet ingredient; it defines the pizza's soul. A good sauce brings:
        </p>
        <ul className="list-disc pl-5 mt-2 space-y-1">
            <li><strong>Acidity:</strong> To cut through cheese and meat fat.</li>
            <li><strong>Aroma:</strong> Characteristic tomato scent released with oven heat.</li>
            <li><strong>Moisture:</strong> Essential for texture, but a risk factor if uncontrolled.</li>
            <li><strong>Color:</strong> Vibrant red from lycopene, a natural pigment and antioxidant.</li>
            <li><strong>Balance:</strong> The foundation all other topping flavors are built on.</li>
        </ul>
        <p>
            Scientifically, tomato is a natural marvel containing water (>90%), natural sugars (fructose/glucose), organic acids (citric/malic), and polysaccharides like pectin giving structure/viscosity.
        </p>
      </Section>

      <Section title="Tomatoes and Moisture Chemistry" icon={<BeakerIcon className="h-5 w-5" />}>
        <p>
            Water management is challenge number one when working with tomatoes.
        </p>
        <ul className="list-disc pl-5 mt-2 space-y-1">
            <li><strong>Cell Structure:</strong> Whole tomatoes, especially canned, retain most water inside cell walls. Crushing breaks walls releasing water creating fluid sauce.</li>
            <li><strong>Varieties:</strong> Varieties like San Marzano or Roma preferred for denser pulp and fewer seeds, resulting in ideal sugar/acid balance.</li>
            <li><strong>Pectin:</strong> Natural thickener. Processing and cooking can alter pectin structure, influencing final viscosity.</li>
            <li><strong>Reduction:</strong> Slow cooking evaporates water, concentrating sugars, acids, and flavor compounds. Controls moisture and intensifies flavor.</li>
        </ul>
      </Section>
      
      <Section title="Raw vs. Cooked Sauce: A Style Choice">
        <p>Deciding whether to cook sauce before pizza is a key distinction between styles, documented by sources like AVPN and NY Style guides.</p>
        <h4>Raw Sauce (Neapolitan Style)</h4>
        <ul className="list-disc pl-5 mt-2 space-y-1">
            <li><strong>Flavor:</strong> Bright, fresh, natural acidity highlighted. Pizza bakes so fast sauce "cooks" on pizza.</li>
            <li><strong>Prep:</strong> High quality tomatoes (San Marzano) hand-crushed or lightly blended, seasoned only with salt.</li>
            <li><strong>Challenge:</strong> Requires strict moisture control as no prior evaporation.</li>
            <li><strong>Reference:</strong> Mandatory standard of AVPN <em>disciplinare</em> for authentic Neapolitan Pizza.</li>
        </ul>
        <h4>Cooked Sauce (NY Style, Pan Pizzas)</h4>
        <ul className="list-disc pl-5 mt-2 space-y-1">
            <li><strong>Flavor:</strong> Deeper, sweeter, concentrated. Slow cooking allows slight sugar caramelization and infusion of aromatics (garlic, oregano).</li>
            <li><strong>Prep:</strong> Simmered to reduce volume 25-50%, concentrating flavor and eliminating excess water.</li>
            <li><strong>Advantage:</strong> Greater control over final moisture, reducing soggy pizza risk, especially in home ovens with longer bake times.</li>
        </ul>
      </Section>
      
       <Section title="Density and Viscosity: The Sweet Spot">
        <p>Sauce consistency is crucial and must adapt to pizza style.</p>
        <ul className="list-disc pl-5 mt-2 space-y-1">
            <li><strong>Too Liquid:</strong> Main cause of "gum line" (raw dough layer under topping). Excess water prevents base heat from baking dough, steaming it instead.</li>
            <li><strong>Too Dense:</strong> Can act as thermal insulator preventing heat penetration. Pasty sauce can result in dry texture.</li>
            <li><strong>Ideal:</strong> Thick enough to coat spoon back without running immediately, fluid enough to spread easily.</li>
        </ul>
      </Section>

      <Section title="Thermal Behavior in Oven" icon={<FireIcon className="h-5 w-5" />}>
        <p>Inside oven, sauce undergoes rapid transformation:</p>
        <ul className="list-disc pl-5 mt-2 space-y-1">
            <li><strong>Evaporation:</strong> Water evaporates first, concentrating components.</li>
            <li><strong>Flavor Concentration:</strong> Sugars and acids become pronounced. Balanced cold sauce can become overly sweet or acidic after baking.</li>
            <li><strong>Pigment Oxidation:</strong> Lycopene is relatively stable but can suffer slight oxidation darkening sauce color.</li>
        </ul>
      </Section>

      <Section title="Classic Sauce Combinations">
        <ul className="list-disc pl-5 mt-2 space-y-1">
            <li><strong>Neapolitan:</strong> Raw tomato purity complemented only by mozzarella creaminess and fresh basil added at end.</li>
            <li><strong>NY Style:</strong> Cooked sauce seasoned with oregano creates robust flavor base supporting pepperoni fat and cheese quantity.</li>
            <li><strong>High Topping Load:</strong> For many ingredients (vegetables), denser cooked sauce essential not to add more moisture.</li>
        </ul>
      </Section>

      <Section title="Risks and Common Care" icon={<SparklesIcon className="h-5 w-5" />}>
        <ul className="list-disc pl-5 mt-2 space-y-1">
            <li><strong>Excess Water:</strong> Main cause of soggy pizza. Always reduce moisture, either by cooking or using denser pulp tomatoes.</li>
            <li><strong>Too Sweet:</strong> Sugars caramelize fast and can burn in high heat, tasting bitter.</li>
            <li><strong>Too Acidic:</strong> Overly acidic sauce dominates flavors. Balance with pinch of sugar/baking soda if needed, or longer cooking.</li>
            <li><strong>Overcooking:</strong> Hours of cooking develops depth but loses freshness. 20-40 mins usually sufficient for pizza.</li>
        </ul>
      </Section>
    </IngredientPageLayout>
  );
};

export default SaucesPage;
