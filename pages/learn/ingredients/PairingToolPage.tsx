import React, { useState } from 'react';
import IngredientPageLayout from './IngredientPageLayout';
import { BookOpenIcon, SparklesIcon, BeakerIcon } from '../../../components/IconComponents';

const PairingToolPage: React.FC = () => {
  // TODO: As combinações serão baseadas em referências de ciência sensorial,
  // livros de gastronomia (ex: The Flavor Bible) e fontes confiáveis.
  // Nenhuma combinação será inventada sem base técnica.
  const pairingIngredients = [
    { value: '', label: 'Selecione um ingrediente...' },
    { value: 'mozzarella', label: 'Mozzarella' },
    { value: 'gorgonzola', label: 'Gorgonzola' },
    { value: 'pumpkin', label: 'Abóbora' },
    { value: 'red_onion', label: 'Cebola Roxa' },
    { value: 'mushrooms', label: 'Cogumelos' },
    { value: 'prosciutto', label: 'Presunto Cru (Prosciutto)' },
  ];

  const [selectedIngredient, setSelectedIngredient] = useState('');

  const handleSearch = () => {
      // Placeholder for future search logic
  }

  return (
    <IngredientPageLayout
      title="Tenho esse ingrediente → o que combina?"
      description="Uma ferramenta para descobrir combinações de sabores clássicas e ousadas para seus ingredientes."
      category="Ferramentas"
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
              Buscar Combinações
            </button>
        </div>
        
        {/* Results */}
        <div className="space-y-6">
            <div className="rounded-lg bg-slate-50 p-6 dark:bg-slate-800/50">
                <h4 className="flex items-center gap-2 text-lg font-semibold text-slate-800 dark:text-slate-200">
                    <BookOpenIcon className="h-5 w-5 text-slate-500" />
                    Combinações Clássicas Sugeridas
                </h4>
                <ul className="mt-4 list-disc space-y-2 pl-5 text-slate-600 dark:text-slate-300">
                    {/* Placeholder content */}
                    <li>As sugestões de combinações clássicas para o ingrediente selecionado aparecerão aqui.</li>
                </ul>
            </div>
            <div className="rounded-lg bg-slate-50 p-6 dark:bg-slate-800/50">
                <h4 className="flex items-center gap-2 text-lg font-semibold text-slate-800 dark:text-slate-200">
                    <SparklesIcon className="h-5 w-5 text-yellow-400" />
                    Combinações Ousadas Sugeridas
                </h4>
                <ul className="mt-4 list-disc space-y-2 pl-5 text-slate-600 dark:text-slate-300">
                    {/* Placeholder content */}
                    <li>Sugestões de combinações mais criativas e ousadas para o ingrediente selecionado aparecerão aqui.</li>
                </ul>
            </div>
            <div className="rounded-lg bg-slate-50 p-6 dark:bg-slate-800/50">
                <h4 className="flex items-center gap-2 text-lg font-semibold text-slate-800 dark:text-slate-200">
                    <BeakerIcon className="h-5 w-5 text-slate-500" />
                    Observações Técnicas
                </h4>
                 <p className="mt-4 text-slate-600 dark:text-slate-300">
                    {/* Placeholder content */}
                    Explicações técnicas sobre por que as combinações funcionam (equilíbrio de sabores, texturas, etc.), baseadas em flavor science e literatura gastronômica, aparecerão aqui.
                </p>
            </div>
        </div>
      </div>
    </IngredientPageLayout>
  );
};

export default PairingToolPage;