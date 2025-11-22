
import React, { useState } from 'react';
import IngredientPageLayout from './IngredientPageLayout';
import { BookOpenIcon, SparklesIcon, BeakerIcon } from '../../../components/IconComponents';

const PairingToolPage: React.FC = () => {
  const pairingIngredients = [
    { value: '', label: 'Select an ingredient...' },
    { value: 'mozzarella', label: 'Mozzarella' },
    { value: 'gorgonzola', label: 'Gorgonzola' },
    { value: 'pumpkin', label: 'Pumpkin' },
    { value: 'red_onion', label: 'Red Onion' },
    { value: 'mushrooms', label: 'Mushrooms' },
    { value: 'prosciutto', label: 'Prosciutto (Cured Ham)' },
  ];

  const [selectedIngredient, setSelectedIngredient] = useState('');

  const handleSearch = () => {
      // Placeholder for future search logic
  }

  return (
    <IngredientPageLayout
      title="Flavor Pairing Tool"
      description="Discover classic and bold flavor combinations for your ingredients."
      category="Tools"
    >
      <div className="space-y-6">
        {/* Input */}
        <div className="flex flex-col sm:flex-row items-center gap-3">
            <select
              value={selectedIngredient}
              onChange={(e) => setSelectedIngredient(e.target.value)}
              className="block w-full rounded-md border-slate-300 bg-white py-2 px-3 shadow-sm focus:border-lime-500 focus:outline-none focus:ring-lime-500 dark:border-slate-600 dark:bg-slate-900 dark:text-white sm:text-sm"
            >
              {pairingIngredients.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
             <button
              onClick={handleSearch}
              className="flex w-full sm:w-auto items-center justify-center gap-2 rounded-md bg-lime-500 py-2.5 px-4 text-sm font-semibold text-white shadow-sm hover:bg-lime-600"
            >
              <SparklesIcon className="h-5 w-5" />
              Find Pairings
            </button>
        </div>
        
        {/* Results */}
        <div className="space-y-6">
            <div className="rounded-lg bg-slate-50 p-6 dark:bg-slate-800/50">
                <h4 className="flex items-center gap-2 text-lg font-semibold text-slate-800 dark:text-slate-200">
                    <BookOpenIcon className="h-5 w-5 text-slate-500" />
                    Classic Suggestions
                </h4>
                <ul className="mt-4 list-disc space-y-2 pl-5 text-slate-700 dark:text-slate-300">
                    {/* Placeholder content */}
                    <li>Classic combination suggestions for the selected ingredient will appear here.</li>
                </ul>
            </div>
            <div className="rounded-lg bg-slate-50 p-6 dark:bg-slate-800/50">
                <h4 className="flex items-center gap-2 text-lg font-semibold text-slate-800 dark:text-slate-200">
                    <SparklesIcon className="h-5 w-5 text-yellow-400" />
                    Bold Suggestions
                </h4>
                <ul className="mt-4 list-disc space-y-2 pl-5 text-slate-700 dark:text-slate-300">
                    {/* Placeholder content */}
                    <li>Creative and bold pairing suggestions for the selected ingredient will appear here.</li>
                </ul>
            </div>
            <div className="rounded-lg bg-slate-50 p-6 dark:bg-slate-800/50">
                <h4 className="flex items-center gap-2 text-lg font-semibold text-slate-800 dark:text-slate-200">
                    <BeakerIcon className="h-5 w-5 text-slate-500" />
                    Technical Notes
                </h4>
                 <p className="mt-4 text-slate-700 dark:text-slate-300">
                    {/* Placeholder content */}
                    Technical explanations on why pairings work (flavor balance, textures, etc.), based on flavor science and gastronomic literature, will appear here.
                </p>
            </div>
        </div>
      </div>
    </IngredientPageLayout>
  );
};

export default PairingToolPage;
