
import React from 'react';
import TechnicalPageLayout from '../TechnicalPageLayout';
import { BeakerIcon, SparklesIcon } from '../../../components/IconComponents';

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
                <h5 className="font-semibold mb-1">Bold Combos:</h5>
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

const BoldCombosPage: React.FC = () => {
  return (
    <TechnicalPageLayout
      title="Bold Combinations (Validated)"
      subtitle="Exploring flavor frontiers in modern pizza, based on science and avant-garde pizzerias."
      showReferencesSection
    >
      <Section title="Introduction: Innovating on Tradition">
        <p>
          Bold combos in contemporary pizza aren't random. They follow same balance principles as classics but apply unexpected ingredients for new contrasts. Renowned places like Pizzarium (Rome) or Roberta's (NY) are flavor labs popularizing challenging pairings.
        </p>
      </Section>

      <Section title="Ingredients and Pairings" icon={<SparklesIcon className="h-5 w-5" />}>
          <IngredientDetail
            title="Pepperoni"
            combos={['Honey', 'Pickled Jalapeño']}
            sensory={{ "Aromatics": "Spicy, smoky", "Intensity": "High", "Texture": "Firm, crisp", "Moisture Risk": "Low (oil release)" }}
            analysis="Pairing with honey (e.g., Roberta's) creates highly addictive 'sweet & heat' contrast."
          />
          <IngredientDetail
            title="Gorgonzola"
            combos={['Honey', 'Walnuts', 'Pear']}
            sensory={{ "Aromatics": "Pungent, complex", "Intensity": "High", "Texture": "Creamy", "Moisture Risk": "Low" }}
            analysis="Sweet-salty contrast is key. Intense blue cheese balanced by honey/pear sweetness is classic Italian pairing."
          />
          <IngredientDetail
            title="Zucchini"
            combos={['Ricotta', 'Lemon Zest', 'Mint']}
            sensory={{ "Aromatics": "Mild, vegetal", "Intensity": "Low", "Texture": "Soft", "Moisture Risk": "Very High" }}
            analysis="Light fresh combo. Ricotta offers creamy base, lemon zest (added end) brightens mild zucchini flavor."
          />
          <IngredientDetail
            title="Prosciutto Crudo"
            combos={['Fig', 'Goat Cheese', 'Arugula (post-oven)']}
            sensory={{ "Aromatics": "Salty, cured", "Intensity": "High", "Texture": "Thin, silky", "Moisture Risk": "Low" }}
            analysis="Fig combo is Californian/Italian modern classic. Concentrated fig sweetness cuts ham saltiness."
          />
      </Section>
    </TechnicalPageLayout>
  );
};

export default BoldCombosPage;
