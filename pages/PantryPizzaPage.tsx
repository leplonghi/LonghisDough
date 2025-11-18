import React, { useState } from 'react';
import TechnicalPageLayout from './learn/TechnicalPageLayout';
import { SparklesIcon, LightBulbIcon } from '../components/IconComponents';

const PantryPizzaPage: React.FC = () => {
  // Logic will be based on sensory science and trusted sources.
  const pantryIngredients = [
    'Tomato Sauce', 'Mozzarella', 'Parmesan', 'Gorgonzola',
    'Pepperoni', 'Ham', 'Shredded Chicken', 'Bacon',
    'Onion', 'Bell Pepper', 'Fresh Tomato', 'Basil', 'Oregano',
    'Olives', 'Corn', 'Egg', 'Olive Oil'
  ];

  const [selectedIngredients, setSelectedIngredients] = useState<string[]>([]);

  const handleToggleIngredient = (ingredient: string) => {
    setSelectedIngredients(prev =>
      prev.includes(ingredient)
        ? prev.filter(i => i !== ingredient)
        : [...prev, ingredient]
    );
  };

  return (
    <TechnicalPageLayout
      title="Pantry Pizza"
      subtitle="Tool to suggest possible pizzas based on ingredients you have at home, respecting technical and classic combinations."
      showReferencesSection
    >
      <div className="space-y-8">
        {/* Input Section */}
        <div className="rounded-lg border border-slate-200 bg-slate-50 p-6">
          <h3 className="text-xl font-semibold text-slate-800 mb-4">
            1. What's in your pantry?
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {pantryIngredients.map(ingredient => (
              <label key={ingredient} className="flex items-center gap-2 rounded-md p-2 bg-white cursor-pointer border border-slate-200 hover:border-lime-500 has-[:checked]:border-lime-500 has-[:checked]:bg-lime-50 transition-colors">
                <input
                  type="checkbox"
                  checked={selectedIngredients.includes(ingredient)}
                  onChange={() => handleToggleIngredient(ingredient)}
                  className="h-4 w-4 rounded border-slate-300 text-lime-600 focus:ring-lime-500"
                />
                <span className="text-sm font-medium text-slate-700">{ingredient}</span>
              </label>
            ))}
          </div>
          <button
            onClick={() => { /* Placeholder */ }}
            className="mt-6 flex w-full items-center justify-center gap-2 rounded-md bg-lime-500 py-2.5 px-4 text-sm font-semibold text-white shadow-sm hover:bg-lime-600"
          >
            <SparklesIcon className="h-5 w-5" />
            Suggest Pizzas
          </button>
        </div>

        {/* Results Section Placeholder */}
        <div className="space-y-6">
          <h3 className="text-2xl font-bold text-slate-800">
            2. Possible Suggestions
          </h3>
          <div className="rounded-lg bg-white p-6 shadow-sm ring-1 ring-slate-200/50">
            <p className="text-slate-600">
              Pizza suggestions based on selected ingredients will appear here.
            </p>
            {/* Example */}
            <div className="mt-4 p-4 border-l-4 border-lime-500 bg-lime-50 opacity-50">
              <h4 className="font-bold text-lime-800">Pepperoni & Onion Pizza</h4>
              <p className="text-sm text-lime-700 mt-1">Ingredients: Tomato Sauce, Mozzarella, Pepperoni, Onion, Olives, Oregano.</p>
            </div>
          </div>
          <div className="rounded-lg bg-white p-6 shadow-sm ring-1 ring-slate-200/50">
            <h4 className="flex items-center gap-2 text-lg font-semibold text-slate-800">
              <LightBulbIcon className="h-5 w-5 text-yellow-400" />
              Technical Tips
            </h4>
            <p className="mt-4 text-slate-600">
              Guidance on balancing moisture, fat, and flavor of the selected ingredients will be displayed here to ensure the best result.
            </p>
          </div>
        </div>
      </div>
    </TechnicalPageLayout>
  );
};

export default PantryPizzaPage;