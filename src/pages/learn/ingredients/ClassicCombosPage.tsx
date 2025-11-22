
import React from 'react';
import TechnicalPageLayout from '../TechnicalPageLayout';
import { BeakerIcon, BookOpenIcon } from '../../../components/IconComponents';

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

const IngredientDetail: React.FC<{ title: string; combos: string[]; sensory: { [key: string]: string }; analysis: string }> = ({ title, combos, sensory, analysis }) => (
    <div className="mt-6 rounded-lg bg-slate-50 p-4 dark:bg-slate-700/50">
        <h4 className="text-lg font-bold text-slate-800 dark:text-slate-200">{title}</h4>
        <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
                <h5 className="font-semibold mb-1">Classic Combos:</h5>
                <ul className="list-disc list-inside space-y-1 text-sm text-slate-600 dark:text-slate-400">
                    {combos.map((c, i) => <li key={i}>{c}</li>)}
                </ul>
                <h5 className="font-semibold mt-3 mb-1">Technical Analysis:</h5>
                <p className="text-sm text-slate-600 dark:text-slate-400">{analysis}</p>
            </div>
            <div>
                <h5 className="font-semibold mb-1">Sensory Profile:</h5>
                <dl className="text-sm space-y-1">
                    {Object.entries(sensory).map(([key, value]) => (
                        <div key={key}>
                            <dt className="font-medium text-slate-500 dark:text-slate-400">{key}:</dt>
                            <dd className="text-slate-700 dark:text-slate-300">{value}</dd>
                        </div>
                    ))}
                </dl>
            </div>
        </div>
    </div>
);

const ClassicCombosPage: React.FC = () => {
  return (
    <TechnicalPageLayout
      title="Classic Combinations"
      subtitle="Science and tradition behind combos that defined pizza globally."
      showReferencesSection
    >
      <Section title="Introduction: The Art of Flavor Pairing">
        <p>
          Successful pizza combinations aren't accidents but exercises in chemical and sensory balance. Best combos, validated over decades, rely on fundamental flavor pairing principles:
        </p>
        <ul className="list-disc pl-5 mt-2 space-y-1">
            <li><strong>Balance:</strong> Complementary flavors, like tomato acidity cutting cheese fat.</li>
            <li><strong>Contrast:</strong> Interaction of opposites creating complexity.</li>
            <li><strong>Aromatic Synergy:</strong> Combination creating flavor more intense than sum of parts (umami amplification).</li>
        </ul>
      </Section>

      <Section title="Ingredients and Pairings" icon={<BookOpenIcon className="h-5 w-5" />}>
          <IngredientDetail
            title="Tomato"
            combos={['Mozzarella', 'Basil', 'Garlic', 'Olive Oil', 'Oregano']}
            sensory={{ "Aromatics": "Fresh, fruity, acidic", "Intensity": "Medium", "Texture": "Smooth, liquid", "Moisture Risk": "High" }}
            analysis="Pizza heart. Tomato acidity (citric/malic acids) essential to balance richness of cheese/meat."
          />
          <IngredientDetail
            title="Mozzarella"
            combos={['Tomato', 'Pepperoni', 'Basil', 'Provolone', 'Mushroom']}
            sensory={{ "Aromatics": "Lactic, mild", "Intensity": "Low", "Texture": "Soft, elastic", "Moisture Risk": "Medium to High" }}
            analysis="Neutral textured base. Mild flavor doesn't compete, elastic melt provides expected texture."
          />
          <IngredientDetail
            title="Mushrooms"
            combos={['Mozzarella', 'Garlic', 'Olive Oil', 'Fresh Herbs']}
            sensory={{ "Aromatics": "Earthy, umami", "Intensity": "Medium", "Texture": "Soft, meaty", "Moisture Risk": "Very High (if raw)" }}
            analysis="Rich in glutamates, adding umami depth. Must be pre-cooked to eliminate excess water."
          />
          <IngredientDetail
            title="Onion"
            combos={['Sausage', 'Bacon', 'Mozzarella', 'Peppers']}
            sensory={{ "Aromatics": "Pungent (raw), sweet (cooked)", "Intensity": "Medium/High", "Texture": "Crisp (raw), soft (cooked)", "Moisture Risk": "Medium" }}
            analysis="Sweetness of caramelized onion is perfect counterpoint to fat/salt of cured meats."
          />
      </Section>
    </TechnicalPageLayout>
  );
};

export default ClassicCombosPage;
