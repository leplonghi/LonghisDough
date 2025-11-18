import React, { useState, useMemo, useEffect } from 'react';
import { 
    SparklesIcon, 
    CalculatorIcon,
    TagIcon,
    PlusCircleIcon,
    TrashIcon,
    ChevronRightIcon,
    CloseIcon,
    InfoIcon,
} from '../../components/IconComponents';
import { DoughConfig, PizzaRecipe } from '../../types';
import { useUser } from '../../contexts/UserProvider';
import { PIZZA_RECIPES } from '../../pizzas-constants';

interface PizzasPageProps {
  doughConfig: DoughConfig;
  onLoadAndNavigate: (config: Partial<DoughConfig>) => void;
}

const origins = Array.from(new Set(PIZZA_RECIPES.map(p => p.origin)));
const COMMON_TOPPINGS = ['Mozzarella', 'Parmesão', 'Provolone', 'Gorgonzola', 'Catupiry', 'Pepperoni', 'Calabresa', 'Presunto', 'Bacon', 'Frango', 'Cebola', 'Pimentão', 'Cogumelos', 'Azeitonas', 'Milho', 'Orégano', 'Manjericão'];


const PizzasPage: React.FC<PizzasPageProps> = ({ doughConfig, onLoadAndNavigate }) => {
    const { batches } = useUser();
    const [filterOrigin, setFilterOrigin] = useState('ALL');
    const [searchTerm, setSearchTerm] = useState('');
    
    const [isPlannerOpen, setIsPlannerOpen] = useState(false);
    const [isCreatorOpen, setIsCreatorOpen] = useState(false);
    const [isDetailOpen, setIsDetailOpen] = useState(false);
    const [isRequestOpen, setIsRequestOpen] = useState(false);
    
    const [selectedPizza, setSelectedPizza] = useState<PizzaRecipe | null>(null);
    const [customPizzas, setCustomPizzas] = useState<PizzaRecipe[]>([]);
    const [initialMix, setInitialMix] = useState<{ id: string, count: number }[] | null>(null);

    const allRecipes = useMemo(() => [...PIZZA_RECIPES, ...customPizzas], [customPizzas]);

    const filteredPizzas = useMemo(() => {
        return allRecipes.filter(pizza => {
            const matchesOrigin = filterOrigin === 'ALL' || pizza.origin === filterOrigin;
            const matchesSearch = searchTerm === '' || pizza.name.toLowerCase().includes(searchTerm.toLowerCase());
            return matchesOrigin && matchesSearch;
        });
    }, [filterOrigin, searchTerm, allRecipes]);

    const openDetailModal = (pizza: PizzaRecipe) => {
        setSelectedPizza(pizza);
        setIsDetailOpen(true);
    };
    
    const openPlannerWithPizza = (pizza: PizzaRecipe) => {
        setIsDetailOpen(false); // Close detail if it was open
        setInitialMix([{ id: pizza.id, count: 1 }]);
        setIsPlannerOpen(true);
    };
    
    const handleLoadDough = (pizza: PizzaRecipe) => {
        const newDoughConfig = {
            stylePresetId: pizza.dough.styleId,
            doughBallWeight: pizza.dough.ballWeightG,
            hydration: pizza.dough.hydration,
            // Keep user's production quantity
            numPizzas: doughConfig.numPizzas, 
        };
        onLoadAndNavigate(newDoughConfig);
    };

    return (
        <>
            <div className="mx-auto max-w-7xl animate-[fadeIn_0.5s_ease-in_out]">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
                        Pizzas
                    </h1>
                    <p className="mt-4 max-w-2xl mx-auto text-lg text-slate-600 dark:text-slate-300">
                        Navegue por receitas clássicas ou crie a sua para calcular as coberturas.
                    </p>
                </div>

                <div className="mb-8 flex items-start gap-4 rounded-xl border-2 border-dashed border-lime-300 bg-lime-50 p-4 dark:border-lime-500/50 dark:bg-lime-900/50">
                    <InfoIcon className="h-6 w-6 flex-shrink-0 text-lime-600 dark:text-lime-400 mt-0.5" />
                    <p className="text-sm font-semibold text-lime-800 dark:text-lime-200">
                        A quantidade de bolas de massa que você definir na Calculadora está automaticamente vinculada a estas receitas. Ajuste na calculadora para ver as quantidades de cobertura corretas no Planejador.
                    </p>
                </div>

                <div className="mb-8 flex flex-col md:flex-row gap-4 justify-between items-center p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700">
                     <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
                        <button onClick={() => setIsCreatorOpen(true)} className="w-full sm:w-auto flex-shrink-0 inline-flex items-center justify-center gap-2 rounded-lg bg-white dark:bg-neutral-700 py-2 px-4 font-semibold text-neutral-700 dark:text-neutral-200 shadow-sm ring-1 ring-inset ring-neutral-300 dark:ring-neutral-600 hover:bg-neutral-50 dark:hover:bg-neutral-600">
                            <PlusCircleIcon className="h-5 w-5 text-lime-500" /> Criar sua Pizza
                        </button>
                        <button onClick={() => { setInitialMix(null); setIsPlannerOpen(true); }} className="w-full sm:w-auto flex-shrink-0 inline-flex items-center justify-center gap-2 rounded-lg bg-lime-500 py-2 px-4 font-semibold text-white shadow-sm hover:bg-lime-600">
                            <CalculatorIcon className="h-5 w-5"/> Planejar Coberturas ({doughConfig.numPizzas} bolas)
                        </button>
                     </div>
                     <button onClick={() => setIsRequestOpen(true)} className="w-full md:w-auto flex-shrink-0 text-sm font-semibold text-lime-600 dark:text-lime-400 hover:underline">
                        Solicitar nova receita
                    </button>
                </div>
                
                 <div className="mb-8 flex flex-col sm:flex-row gap-4 w-full">
                    <input 
                        type="text"
                        placeholder="Buscar pelo nome..."
                        value={searchTerm}
                        onChange={e => setSearchTerm(e.target.value)}
                        className="w-full sm:w-64 rounded-md border-slate-300 bg-white dark:bg-slate-700 text-sm py-2"
                    />
                     <select 
                        value={filterOrigin}
                        onChange={e => setFilterOrigin(e.target.value)}
                        className="w-full sm:w-auto rounded-md border-slate-300 bg-white dark:bg-slate-700 text-sm py-2"
                     >
                        <option value="ALL">Todas as Origens</option>
                        {origins.map(o => <option key={o} value={o}>{o}</option>)}
                    </select>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {filteredPizzas.map(pizza => (
                        <div key={pizza.id} className="rounded-xl border border-slate-200 bg-white shadow-sm dark:border-slate-700 dark:bg-slate-800 flex flex-col transition-all duration-200 hover:shadow-lg hover:-translate-y-1">
                            <img src={pizza.image} alt={pizza.name} loading="lazy" className="aspect-[4/3] w-full object-cover rounded-t-xl"/>
                            <div className="p-4 flex-grow flex flex-col">
                                <h3 className="font-bold text-lg text-slate-900 dark:text-white">{pizza.name}</h3>
                                <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500 mt-1">{pizza.origin}</p>
                                <ul className="text-xs text-slate-600 dark:text-slate-400 mt-3 space-y-1 flex-grow">
                                    {pizza.toppings.main.map(t => <li key={t} className="flex items-center gap-2"><TagIcon className="h-3 w-3 flex-shrink-0"/><span>{t}</span></li>)}
                                </ul>
                                <button onClick={() => openDetailModal(pizza)} className="mt-4 w-full text-center text-sm font-semibold text-lime-600 dark:text-lime-400 hover:underline">
                                    Ver detalhes
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            
            {isPlannerOpen && <ToppingPlannerModal onClose={() => setIsPlannerOpen(false)} totalBalls={doughConfig.numPizzas} allRecipes={allRecipes} initialMix={initialMix} />}
            {isCreatorOpen && <CreatePizzaModal onClose={() => setIsCreatorOpen(false)} onSave={(newPizza) => { setCustomPizzas(prev => [...prev, newPizza]); openPlannerWithPizza(newPizza); }} />}
            {isDetailOpen && selectedPizza && <PizzaDetailModal pizza={selectedPizza} onClose={() => setIsDetailOpen(false)} onAddToPlanner={openPlannerWithPizza} onLoadDough={handleLoadDough} />}
            {isRequestOpen && <RequestRecipeModal onClose={() => setIsRequestOpen(false)} />}
        </>
    );
};

// --- Modals ---

const PizzaDetailModal: React.FC<{ pizza: PizzaRecipe; onClose: () => void; onAddToPlanner: (pizza: PizzaRecipe) => void; onLoadDough: (pizza: PizzaRecipe) => void; }> = ({ pizza, onClose, onAddToPlanner, onLoadDough }) => {
    return (
         <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm animate-[fadeIn_0.3s_ease-out]" onClick={onClose}>
            <div className="relative w-full max-w-lg bg-white dark:bg-slate-800 rounded-2xl shadow-xl" onClick={e => e.stopPropagation()}>
                <img src={pizza.image} alt={pizza.name} className="aspect-video w-full object-cover rounded-t-xl"/>
                <div className="p-6">
                    <h2 className="text-2xl font-bold">{pizza.name}</h2>
                    <p className="text-sm font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500 mt-1">{pizza.origin}</p>
                    <div className="mt-4 border-t pt-4">
                        <h4 className="font-semibold mb-2">Ingredientes Principais</h4>
                        <ul className="list-disc list-inside text-sm text-slate-600 dark:text-slate-300">
                             <li>{pizza.sauce.type !== 'Nenhum' ? `Molho de ${pizza.sauce.type}` : 'Base Branca'}</li>
                             {pizza.toppings.main.map(i => <li key={i}>{i}</li>)}
                        </ul>
                    </div>
                     <div className="mt-6 flex items-start gap-3 rounded-lg bg-slate-100 p-3 text-sm text-slate-600 dark:bg-slate-700/50 dark:text-slate-300">
                        <InfoIcon className="h-5 w-5 flex-shrink-0 mt-0.5" />
                        <p>
                            A quantidade de bolas de massa definida na <strong>Calculadora</strong> afeta o cálculo dos recheios no Planejador.
                        </p>
                    </div>
                     <div className="mt-6 flex flex-col sm:flex-row gap-3">
                        <button onClick={() => onLoadDough(pizza)} className="w-full flex-1 text-center font-semibold text-lime-600 dark:text-lime-400 rounded-lg py-2 px-4 border-2 border-lime-500 hover:bg-lime-50 dark:hover:bg-lime-900/50">Calcular Massa</button>
                        <button onClick={() => onAddToPlanner(pizza)} className="w-full flex-1 font-semibold bg-lime-500 text-white rounded-lg py-2.5 px-4 hover:bg-lime-600">Adicionar ao Planejador</button>
                     </div>
                </div>
            </div>
        </div>
    );
};

const ToppingPlannerModal: React.FC<{ onClose: () => void; totalBalls: number; allRecipes: PizzaRecipe[]; initialMix: { id: string, count: number }[] | null }> = ({ onClose, totalBalls, allRecipes, initialMix }) => {
    const [mix, setMix] = useState<{ id: string, count: number }[]>(() => {
        if (initialMix) {
            const initialCount = initialMix.reduce((sum, item) => sum + item.count, 0);
            const remaining = totalBalls - initialCount;
            if (remaining > 0) {
                 return [{id: PIZZA_RECIPES[0].id, count: remaining}, ...initialMix];
            }
            return initialMix;
        }
        return [{ id: PIZZA_RECIPES[0].id, count: totalBalls }];
    });
    const [results, setResults] = useState<Record<string, number> | null>(null);

    const allocatedBalls = mix.reduce((sum, item) => sum + item.count, 0);
    const remainingBalls = totalBalls - allocatedBalls;

    const handleMixChange = (index: number, newId: string, newCountStr: string) => {
        const newCount = parseInt(newCountStr, 10) || 0;
        const newMix = [...mix];
        const oldItem = newMix[index];
        const countDiff = newCount - oldItem.count;
        
        if (countDiff > remainingBalls) return; // Don't allow allocating more than available

        newMix[index] = { id: newId, count: Math.max(0, newCount) };
        setMix(newMix);
    };

    const addFlavor = () => {
        const firstUnused = allRecipes.find(p => !mix.some(m => m.id === p.id));
        if (firstUnused && remainingBalls > 0) {
            setMix([...mix, { id: firstUnused.id, count: 1 }]);
        }
    };
    
    const removeFlavor = (index: number) => {
        setMix(mix.filter((_, i) => i !== index));
    };

    const calculateToppings = () => {
        const consolidated: Record<string, number> = {};
        mix.forEach(item => {
            const pizza = allRecipes.find(p => p.id === item.id);
            if (pizza) {
                const sauceKey = pizza.sauce.type !== 'Nenhum' ? `Molho ${pizza.sauce.type}` : 'Base Branca';
                consolidated[sauceKey] = (consolidated[sauceKey] || 0) + (pizza.sauce.grams * item.count);
                const toppingsPerPizza = pizza.toppings.grams / (pizza.toppings.main.length || 1);
                pizza.toppings.main.forEach(topping => {
                    consolidated[topping] = (consolidated[topping] || 0) + (toppingsPerPizza * item.count);
                });
            }
        });
        setResults(consolidated);
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm" onClick={onClose}>
            <div className="relative w-full max-w-2xl bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-xl" onClick={e => e.stopPropagation()}>
                <h2 className="text-xl font-bold mb-4">Planejador de Coberturas</h2>
                <div className="space-y-4">
                    <div className="p-3 rounded-lg bg-slate-100 dark:bg-slate-700 text-center font-semibold">
                        Total de Bolas na Fornada: {totalBalls}
                    </div>
                    
                    <div className="space-y-3 p-4 border rounded-lg dark:border-slate-700 max-h-60 overflow-y-auto">
                        {mix.map((item, index) => (
                            <div key={index} className="flex items-center gap-3">
                                <select value={item.id} onChange={e => handleMixChange(index, e.target.value, String(item.count))} className="flex-grow rounded-md border-slate-300 dark:bg-slate-700 text-sm">
                                    {allRecipes.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
                                </select>
                                <input type="number" value={item.count} onChange={e => handleMixChange(index, item.id, e.target.value)} className="w-20 rounded-md border-slate-300 dark:bg-slate-700 text-sm"/>
                                {mix.length > 1 && <button onClick={() => removeFlavor(index)}><TrashIcon className="h-5 w-5 text-red-500"/></button>}
                            </div>
                        ))}
                         <button onClick={addFlavor} disabled={remainingBalls <= 0} className="text-sm font-semibold text-lime-600 flex items-center gap-1 disabled:opacity-50 disabled:cursor-not-allowed"><PlusCircleIcon className="h-5 w-5"/> Adicionar sabor</button>
                    </div>

                    <button onClick={calculateToppings} disabled={remainingBalls !== 0} className="w-full bg-lime-500 text-white font-semibold py-2 rounded-lg disabled:bg-slate-400 disabled:cursor-not-allowed">
                        {remainingBalls !== 0 ? `${remainingBalls} bola(s) restantes para alocar` : 'Calcular Quantidades Totais'}
                    </button>

                    {results && (
                        <div className="mt-6 border-t pt-4">
                            <h3 className="font-bold">Lista de Compras:</h3>
                            <ul className="list-disc list-inside mt-2 text-sm columns-2">
                                {Object.entries(results).map(([name, grams]) => (
                                    <li key={name}><strong>{name}:</strong> {(grams as number).toFixed(0)}g</li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

const CreatePizzaModal: React.FC<{onClose: () => void; onSave: (pizza: PizzaRecipe) => void;}> = ({onClose, onSave}) => {
    const [name, setName] = useState('');
    const [selectedToppings, setSelectedToppings] = useState<string[]>([]);
    
    const handleSave = () => {
        const newPizza: PizzaRecipe = {
            id: `custom-${crypto.randomUUID()}`,
            name,
            origin: 'Custom',
            image: `https://source.unsplash.com/random/400x300/?pizza,${name.split(' ').join(',')}`,
            dough: { ballWeightG: 280, hydration: 65, styleId: 'massa_direta_universal'},
            oven: { tempC: 280 },
            sauce: { type: 'Tomate', grams: 90 },
            toppings: {
                main: selectedToppings,
                grams: 150 + selectedToppings.length * 10, // Estimate grams
            },
            techniqueNotes: 'Pizza personalizada criada no DoughLabPro.'
        };
        onSave(newPizza);
        onClose();
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm" onClick={onClose}>
            <div className="relative w-full max-w-lg bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-xl" onClick={e => e.stopPropagation()}>
                <h2 className="text-xl font-bold mb-4">Criar sua Pizza</h2>
                 <div className="space-y-4">
                     <div>
                        <label className="text-sm font-medium">Nome da Pizza</label>
                        <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder="Ex: A Minha Favorita" className="w-full mt-1 rounded-md border-slate-300 dark:bg-slate-700"/>
                    </div>
                     <div>
                        <label className="text-sm font-medium">Ingredientes</label>
                        <div className="mt-2 grid grid-cols-2 sm:grid-cols-3 gap-2 max-h-48 overflow-y-auto p-2 border rounded-lg dark:border-slate-600">
                        {COMMON_TOPPINGS.map(topping => (
                            <label key={topping} className="flex items-center gap-2 text-sm">
                                <input type="checkbox" checked={selectedToppings.includes(topping)} onChange={() => setSelectedToppings(prev => prev.includes(topping) ? prev.filter(t => t !== topping) : [...prev, topping])} className="rounded text-lime-500 focus:ring-lime-500" />
                                {topping}
                            </label>
                        ))}
                        </div>
                    </div>
                </div>
                <div className="flex justify-end gap-3 mt-6 pt-4 border-t dark:border-slate-700">
                    <button onClick={onClose} className="text-sm font-semibold px-4 py-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700">Cancelar</button>
                    <button onClick={handleSave} disabled={!name || selectedToppings.length === 0} className="text-sm font-semibold px-4 py-2 rounded-lg bg-lime-500 text-white disabled:bg-slate-400">Salvar e Adicionar</button>
                </div>
            </div>
        </div>
    )
};

const RequestRecipeModal: React.FC<{onClose: () => void}> = ({onClose}) => {
    return (
         <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm" onClick={onClose}>
            <div className="relative w-full max-w-lg bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-xl" onClick={e => e.stopPropagation()}>
                <h2 className="text-xl font-bold mb-4">Solicitar Nova Receita</h2>
                <p className="text-sm text-slate-600 dark:text-slate-300 mb-4">Sentiu falta de alguma pizza? Sugira para a nossa equipe. Receitas populares serão adicionadas em atualizações futuras.</p>
                <textarea rows={3} placeholder="Ex: Pizza Carbonara" className="w-full rounded-md border-slate-300 dark:bg-slate-700 text-sm"></textarea>
                <div className="flex justify-end gap-3 mt-4">
                    <button onClick={onClose} className="text-sm font-semibold px-4 py-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700">Cancelar</button>
                    <button onClick={onClose} className="text-sm font-semibold px-4 py-2 rounded-lg bg-lime-500 text-white">Enviar Sugestão</button>
                </div>
            </div>
        </div>
    )
}

export default PizzasPage;