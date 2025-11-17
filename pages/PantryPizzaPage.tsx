import React, { useState } from 'react';
import TechnicalPageLayout from './learn/TechnicalPageLayout';
import { SparklesIcon, LightBulbIcon } from '../components/IconComponents';

const PantryPizzaPage: React.FC = () => {
  // TODO: A lógica de combinação será baseada em referências de ciência sensorial,
  // livros de gastronomia e combinações clássicas validadas. Nenhuma sugestão será inventada.
  const pantryIngredients = [
    'Molho de Tomate', 'Mozzarella', 'Parmesão', 'Gorgonzola',
    'Calabresa', 'Presunto', 'Frango desfiado', 'Bacon',
    'Cebola', 'Pimentão', 'Tomate fresco', 'Manjericão', 'Orégano',
    'Azeitonas', 'Milho', 'Ovo', 'Azeite'
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
      title="Pizza de Despensa"
      subtitle="Ferramenta para sugerir pizzas possíveis com base nos ingredientes que você tem em casa, respeitando combinações técnicas e clássicas."
      showReferencesSection
    >
      <div className="space-y-8">
        {/* Input Section */}
        <div className="rounded-lg border border-slate-200 bg-slate-50 p-6 dark:border-slate-700 dark:bg-slate-700/50">
          <h3 className="text-xl font-semibold text-slate-800 dark:text-slate-100 mb-4">
            1. O que você tem na despensa?
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {pantryIngredients.map(ingredient => (
              <label key={ingredient} className="flex items-center gap-2 rounded-md p-2 bg-white dark:bg-slate-800 cursor-pointer border border-slate-200 dark:border-slate-600 hover:border-lime-500 has-[:checked]:border-lime-500 has-[:checked]:bg-lime-50 dark:has-[:checked]:bg-lime-900/50 transition-colors">
                <input
                  type="checkbox"
                  checked={selectedIngredients.includes(ingredient)}
                  onChange={() => handleToggleIngredient(ingredient)}
                  className="h-4 w-4 rounded border-slate-300 text-lime-600 focus:ring-lime-500"
                />
                <span className="text-sm font-medium text-slate-700 dark:text-slate-300">{ingredient}</span>
              </label>
            ))}
          </div>
          <button
            onClick={() => { /* Placeholder */ }}
            className="mt-6 flex w-full items-center justify-center gap-2 rounded-md bg-lime-500 py-2.5 px-4 text-sm font-semibold text-white shadow-sm hover:bg-lime-600"
          >
            <SparklesIcon className="h-5 w-5" />
            Sugerir Pizzas
          </button>
        </div>

        {/* Results Section Placeholder */}
        <div className="space-y-6">
          <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-100">
            2. Sugestões de Pizzas Possíveis
          </h3>
          <div className="rounded-lg bg-white p-6 shadow-sm ring-1 ring-slate-200/50 dark:border dark:border-slate-700/50 dark:bg-slate-800">
            <p className="text-slate-600 dark:text-slate-300">
              As sugestões de pizzas que você pode fazer com os ingredientes selecionados aparecerão aqui.
            </p>
            {/* Example of how a suggestion might look */}
            <div className="mt-4 p-4 border-l-4 border-lime-500 bg-lime-50 dark:bg-lime-900/20 opacity-50">
              <h4 className="font-bold text-lime-800 dark:text-lime-200">Pizza de Calabresa com Cebola</h4>
              <p className="text-sm text-lime-700 dark:text-lime-300 mt-1">Ingredientes usados: Molho de Tomate, Mozzarella, Calabresa, Cebola, Azeitonas, Orégano.</p>
            </div>
          </div>
          <div className="rounded-lg bg-white p-6 shadow-sm ring-1 ring-slate-200/50 dark:border dark:border-slate-700/50 dark:bg-slate-800">
            <h4 className="flex items-center gap-2 text-lg font-semibold text-slate-800 dark:text-slate-200">
              <LightBulbIcon className="h-5 w-5 text-yellow-400" />
              Cuidados Técnicos
            </h4>
            <p className="mt-4 text-slate-600 dark:text-slate-300">
              Orientações sobre o balanceamento de umidade, gordura e sabor dos ingredientes selecionados serão exibidas aqui para garantir o melhor resultado possível.
            </p>
          </div>
        </div>
      </div>
    </TechnicalPageLayout>
  );
};

export default PantryPizzaPage;