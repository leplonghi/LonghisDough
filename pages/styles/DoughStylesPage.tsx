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
    BookOpenIcon,
} from '../../components/IconComponents';
import { DoughConfig, PizzaRecipe, DoughStylePreset } from '../../types';
import { useUser } from '../../contexts/UserProvider';
import { DOUGH_STYLE_PRESETS } from '../../constants';
import { useTranslation } from '../../i18n';

interface DoughStylesPageProps {
  doughConfig: DoughConfig;
  onLoadAndNavigate: (config: Partial<DoughConfig>) => void;
}

const DoughStylesPage: React.FC<DoughStylesPageProps> = ({ doughConfig, onLoadAndNavigate }) => {
    const { t } = useTranslation();
    const [isPlannerOpen, setIsPlannerOpen] = useState(false);
    
    const handleLoadStyle = (preset: DoughStylePreset) => {
        const newDoughConfig: Partial<DoughConfig> = {
            bakeType: preset.type,
            recipeStyle: preset.recipeStyle,
            stylePresetId: preset.id,
            hydration: preset.defaultHydration,
            salt: preset.defaultSalt,
            oil: preset.defaultOil,
            sugar: preset.defaultSugar,
            yeastPercentage: preset.defaultYeastPct,
            flourId: preset.preferredFlourProfileId,
        };
        onLoadAndNavigate(newDoughConfig);
    };

    return (
        <>
            <div className="mx-auto max-w-7xl animate-[fadeIn_0.5s_ease-in_out]">
                <div className="text-center mb-8">
                     <BookOpenIcon className="mx-auto h-12 w-12 text-lime-500" />
                    <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                        Estilos de Massa
                    </h1>
                    <p className="mt-4 max-w-2xl mx-auto text-lg text-slate-600">
                        Explore uma biblioteca de estilos de massa. Cada um é um ponto de partida para sua fórmula na Calculadora.
                    </p>
                </div>

                 <div className="mb-8 flex flex-col md:flex-row gap-4 justify-center items-center p-4 rounded-xl bg-slate-50 border border-slate-200">
                    <p className="text-sm font-semibold text-slate-700 text-center md:text-left">Precisa calcular os ingredientes para as coberturas da sua fornada de pizza?</p>
                     <button onClick={() => setIsPlannerOpen(true)} className="w-full sm:w-auto flex-shrink-0 inline-flex items-center justify-center gap-2 rounded-lg bg-lime-500 py-2 px-4 font-semibold text-white shadow-sm hover:bg-lime-600">
                        <CalculatorIcon className="h-5 w-5"/> Abrir Planejador de Coberturas
                    </button>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {DOUGH_STYLE_PRESETS.map(preset => (
                        <div key={preset.id} className="rounded-xl border border-slate-200 bg-white shadow-sm flex flex-col transition-all duration-200 hover:shadow-lg hover:-translate-y-1">
                            <div className="p-4 flex-grow flex flex-col">
                                <h3 className="font-bold text-lg text-slate-900">{preset.name}</h3>
                                <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 mt-1">{t(`form.${preset.type.toLowerCase()}`)}</p>
                                <div className="text-xs text-slate-600 mt-3 space-y-1 flex-grow">
                                    <p><strong>Hidratação:</strong> {preset.defaultHydration}%</p>
                                    <p><strong>Sal:</strong> {preset.defaultSalt}%</p>
                                    <p><strong>Óleo:</strong> {preset.defaultOil}%</p>
                                    {preset.notes && <p className="pt-2 italic text-slate-500">{preset.notes}</p>}
                                </div>
                                <button onClick={() => handleLoadStyle(preset)} className="mt-4 w-full text-center text-sm font-semibold text-lime-600 hover:underline">
                                    Carregar na Calculadora
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            
            {isPlannerOpen && <ToppingPlannerModal onClose={() => setIsPlannerOpen(false)} totalBalls={doughConfig.numPizzas} />}
        </>
    );
};

// --- Modals ---

const ToppingPlannerModal: React.FC<{ onClose: () => void; totalBalls: number; }> = ({ onClose, totalBalls }) => {
    const [flavors, setFlavors] = useState<{ name: string, ingredients: { name: string, amount: string }[], assignedBalls: number }[]>([{ name: 'Sabor 1', ingredients: [{ name: '', amount: '' }], assignedBalls: totalBalls }]);
    const [results, setResults] = useState<Record<string, number> | null>(null);

    const allocatedBalls = flavors.reduce((sum, item) => sum + item.assignedBalls, 0);
    const remainingBalls = totalBalls - allocatedBalls;

    const handleFlavorChange = (index: number, field: string, value: string | number) => {
        const newFlavors = [...flavors];
        if (field === 'name') {
            newFlavors[index].name = value as string;
        } else if (field === 'assignedBalls') {
            const newCount = Number(value);
            const countDiff = newCount - newFlavors[index].assignedBalls;
            if (countDiff <= remainingBalls) {
                newFlavors[index].assignedBalls = Math.max(0, newCount);
            }
        }
        setFlavors(newFlavors);
    };

    const handleIngredientChange = (flavorIndex: number, ingIndex: number, field: string, value: string) => {
        const newFlavors = [...flavors];
        newFlavors[flavorIndex].ingredients[ingIndex] = { ...newFlavors[flavorIndex].ingredients[ingIndex], [field]: value };
        setFlavors(newFlavors);
    };
    
    const addIngredient = (flavorIndex: number) => {
        const newFlavors = [...flavors];
        newFlavors[flavorIndex].ingredients.push({ name: '', amount: '' });
        setFlavors(newFlavors);
    };
    
    const removeIngredient = (flavorIndex: number, ingIndex: number) => {
        const newFlavors = [...flavors];
        newFlavors[flavorIndex].ingredients.splice(ingIndex, 1);
        setFlavors(newFlavors);
    };

    const addFlavor = () => {
        if (remainingBalls > 0) {
            setFlavors([...flavors, { name: `Sabor ${flavors.length + 1}`, ingredients: [{ name: '', amount: '' }], assignedBalls: 1 }]);
        }
    };
    
    const removeFlavor = (index: number) => {
        setFlavors(flavors.filter((_, i) => i !== index));
    };

    const calculateToppings = () => {
        const consolidated: Record<string, number> = {};
        flavors.forEach(flavor => {
            flavor.ingredients.forEach(ing => {
                const amount = parseFloat(ing.amount);
                if (ing.name && !isNaN(amount)) {
                    consolidated[ing.name] = (consolidated[ing.name] || 0) + (amount * flavor.assignedBalls);
                }
            });
        });
        setResults(consolidated);
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm" onClick={onClose}>
            <div className="relative w-full max-w-3xl bg-white rounded-2xl p-6 shadow-xl" onClick={e => e.stopPropagation()}>
                <h2 className="text-xl font-bold mb-4">Planejador de Coberturas</h2>
                <div className="p-3 rounded-lg bg-slate-100 text-center font-semibold mb-4">
                    Total de Bolas na Fornada: {totalBalls}
                </div>
                
                <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-2">
                    {flavors.map((flavor, flavorIndex) => (
                        <div key={flavorIndex} className="p-4 border rounded-lg">
                            <div className="flex items-center gap-3 mb-3">
                                <input type="text" value={flavor.name} onChange={e => handleFlavorChange(flavorIndex, 'name', e.target.value)} className="font-semibold text-lg flex-grow border-0 p-1 focus:ring-0" />
                                <input type="number" value={flavor.assignedBalls} onChange={e => handleFlavorChange(flavorIndex, 'assignedBalls', e.target.value)} className="w-20 rounded-md border-slate-300 text-sm"/>
                                {flavors.length > 1 && <button onClick={() => removeFlavor(flavorIndex)}><TrashIcon className="h-5 w-5 text-red-500"/></button>}
                            </div>
                             <div className="space-y-2">
                                {flavor.ingredients.map((ing, ingIndex) => (
                                    <div key={ingIndex} className="flex items-center gap-2">
                                        <input type="text" value={ing.name} onChange={e => handleIngredientChange(flavorIndex, ingIndex, 'name', e.target.value)} placeholder="Ingrediente" className="flex-grow rounded-md border-slate-300 text-sm"/>
                                        <input type="text" value={ing.amount} onChange={e => handleIngredientChange(flavorIndex, ingIndex, 'amount', e.target.value)} placeholder="Qtd/un" className="w-24 rounded-md border-slate-300 text-sm"/>
                                        {flavor.ingredients.length > 1 && <button onClick={() => removeIngredient(flavorIndex, ingIndex)}><CloseIcon className="h-4 w-4 text-slate-400"/></button>}
                                    </div>
                                ))}
                                <button onClick={() => addIngredient(flavorIndex)} className="text-xs font-semibold text-lime-600 flex items-center gap-1"><PlusCircleIcon className="h-4 w-4"/> Adicionar ingrediente</button>
                             </div>
                        </div>
                    ))}
                    <button onClick={addFlavor} disabled={remainingBalls <= 0} className="w-full text-sm font-semibold text-lime-600 flex items-center justify-center gap-1 p-2 border-2 border-dashed rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"><PlusCircleIcon className="h-5 w-5"/> Adicionar sabor</button>
                </div>

                <button onClick={calculateToppings} disabled={remainingBalls !== 0} className="mt-4 w-full bg-lime-500 text-white font-semibold py-2 rounded-lg disabled:bg-slate-400 disabled:cursor-not-allowed">
                    {remainingBalls !== 0 ? `${remainingBalls} bola(s) restantes para alocar` : 'Calcular Lista de Compras'}
                </button>

                {results && (
                    <div className="mt-6 border-t pt-4">
                        <h3 className="font-bold">Lista de Compras Consolidada:</h3>
                        <ul className="list-disc list-inside mt-2 text-sm columns-2">
                            {Object.entries(results).map(([name, total]) => (
                                <li key={name}><strong>{name}:</strong> {total} (unidades)</li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );
};

export default DoughStylesPage;