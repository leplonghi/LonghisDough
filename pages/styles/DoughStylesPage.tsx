
import React, { useState, useMemo } from 'react';
import { 
    BookOpenIcon,
    BeakerIcon,
    FireIcon,
    CubeIcon,
    ChevronRightIcon,
    StarIcon,
    CalculatorIcon,
    TrashIcon,
    CloseIcon,
    PlusCircleIcon,
} from '@/components/ui/Icons';
import { STYLES_DATA } from '@/data/stylesData';
import { useTranslation } from '@/i18n';
import { DoughStyleDefinition } from '@/types';
import { DoughConfig } from '@/types';

interface DoughStylesPageProps {
  doughConfig: DoughConfig;
  onLoadAndNavigate: (config: Partial<DoughConfig>) => void;
  onNavigateToDetail: (styleId: string) => void;
}

const CategoryBadge: React.FC<{ category: string }> = ({ category }) => {
    let colorClass = 'bg-slate-100 text-slate-700';
    let icon = <CubeIcon className="h-3 w-3 mr-1" />;

    if (category === 'Pizza') {
        colorClass = 'bg-orange-100 text-orange-800 border-orange-200';
        icon = <FireIcon className="h-3 w-3 mr-1" />;
    } else if (category === 'Bread') {
        colorClass = 'bg-amber-100 text-amber-800 border-amber-200';
        icon = <BeakerIcon className="h-3 w-3 mr-1" />;
    } else if (category === 'Pastry') {
        colorClass = 'bg-pink-100 text-pink-800 border-pink-200';
        icon = <BookOpenIcon className="h-3 w-3 mr-1" />;
    }

    return (
        <span className={`inline-flex items-center rounded-full border px-2 py-0.5 text-xs font-semibold ${colorClass}`}>
            {icon}
            {category}
        </span>
    );
};

const StyleCard: React.FC<{ style: DoughStyleDefinition; onClick: () => void }> = ({ style, onClick }) => {
    return (
        <div 
            onClick={onClick}
            className="group flex flex-col rounded-xl border border-slate-200 bg-white shadow-sm transition-all duration-200 hover:shadow-md hover:-translate-y-1 cursor-pointer h-full"
        >
            <div className="p-5 flex-grow flex flex-col">
                <div className="flex justify-between items-start mb-2">
                    <h3 className="font-bold text-lg text-slate-900 group-hover:text-lime-600 transition-colors line-clamp-1">
                        {style.name}
                    </h3>
                    {style.isPro && <StarIcon className="h-4 w-4 text-yellow-500" />}
                </div>
                
                <div className="mb-3 flex gap-2">
                    <CategoryBadge category={style.category} />
                    <span className="text-xs text-slate-500 bg-slate-50 px-2 py-0.5 rounded-full border border-slate-100">{style.country}</span>
                </div>

                <p className="text-sm text-slate-600 mb-4 line-clamp-3">
                    {style.description}
                </p>

                <div className="mt-auto pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                    <span className="font-mono bg-slate-50 px-1.5 py-0.5 rounded">Hydration: {style.technical.hydration}%</span>
                    <span className="flex items-center font-semibold text-lime-600 group-hover:underline">
                        Details <ChevronRightIcon className="h-3 w-3 ml-1" />
                    </span>
                </div>
            </div>
        </div>
    );
};

const DoughStylesPage: React.FC<DoughStylesPageProps & { onNavigateToDetail: (id: string) => void }> = ({ doughConfig, onLoadAndNavigate, onNavigateToDetail }) => {
    const { t } = useTranslation();
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState<string>('All');
    const [isPlannerOpen, setIsPlannerOpen] = useState(false);
    
    const categories = ['All', 'Pizza', 'Bread', 'Pastry'];

    const filteredStyles = useMemo(() => {
        return STYLES_DATA.filter(style => {
            const matchesSearch = style.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                                  style.description.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesCategory = selectedCategory === 'All' || style.category === selectedCategory;
            return matchesSearch && matchesCategory;
        });
    }, [searchTerm, selectedCategory]);

    return (
        <>
        <div className="mx-auto max-w-7xl animate-[fadeIn_0.5s_ease-in_out]">
            <div className="text-center mb-10">
                <BookOpenIcon className="mx-auto h-12 w-12 text-lime-500" />
                <h1 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                    Style Library
                </h1>
                <p className="mt-4 max-w-2xl mx-auto text-lg text-slate-600">
                    A technical compendium with formulas, history, and parameters of the world's main baking styles.
                </p>
            </div>

             <div className="mb-8 flex flex-col md:flex-row gap-4 justify-center items-center p-4 rounded-xl bg-slate-50 border border-slate-200">
                <p className="text-sm font-semibold text-slate-700 text-center md:text-left">Need to calculate topping ingredients for your pizza bake?</p>
                 <button onClick={() => setIsPlannerOpen(true)} className="w-full sm:w-auto flex-shrink-0 inline-flex items-center justify-center gap-2 rounded-lg bg-lime-500 py-2 px-4 font-semibold text-white shadow-sm hover:bg-lime-600">
                    <CalculatorIcon className="h-5 w-5"/> Open Toppings Planner
                </button>
            </div>

            {/* Search and Filter Bar */}
            <div className="mb-8 flex flex-col md:flex-row gap-4 items-center justify-between bg-slate-50 p-4 rounded-xl border border-slate-200">
                <div className="relative w-full md:w-96">
                    <input
                        type="text"
                        className="block w-full rounded-lg border-slate-300 bg-white py-2 pl-4 pr-3 text-sm placeholder-slate-500 focus:border-lime-500 focus:ring-lime-500"
                        placeholder="Search style..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0 w-full md:w-auto">
                    {categories.map(cat => (
                        <button 
                            key={cat}
                            onClick={() => setSelectedCategory(cat)}
                            className={`whitespace-nowrap px-4 py-2 rounded-lg text-sm font-medium transition-colors ${selectedCategory === cat ? 'bg-lime-500 text-white shadow-sm' : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'}`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredStyles.map(style => (
                    <StyleCard key={style.id} style={style} onClick={() => onNavigateToDetail(style.id)} />
                ))}
                {filteredStyles.length === 0 && (
                    <div className="col-span-full text-center py-12 text-slate-500">
                        No styles found.
                    </div>
                )}
            </div>
        </div>
        {isPlannerOpen && <ToppingPlannerModal onClose={() => setIsPlannerOpen(false)} totalBalls={doughConfig.numPizzas} />}
        </>
    );
};

const ToppingPlannerModal: React.FC<{ onClose: () => void; totalBalls: number; }> = ({ onClose, totalBalls }) => {
    const [flavors, setFlavors] = useState<{ name: string, ingredients: { name: string, amount: string }[], assignedBalls: number }[]>([{ name: 'Flavor 1', ingredients: [{ name: '', amount: '' }], assignedBalls: totalBalls }]);
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
            setFlavors([...flavors, { name: `Flavor ${flavors.length + 1}`, ingredients: [{ name: '', amount: '' }], assignedBalls: 1 }]);
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
                <h2 className="text-xl font-bold mb-4">Toppings Planner</h2>
                <div className="p-3 rounded-lg bg-slate-100 text-center font-semibold mb-4">
                    Total Balls in Bake: {totalBalls}
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
                                        <input type="text" value={ing.name} onChange={e => handleIngredientChange(flavorIndex, ingIndex, 'name', e.target.value)} placeholder="Ingredient" className="flex-grow rounded-md border-slate-300 text-sm"/>
                                        <input type="text" value={ing.amount} onChange={e => handleIngredientChange(flavorIndex, ingIndex, 'amount', e.target.value)} placeholder="Qty/unit" className="w-24 rounded-md border-slate-300 text-sm"/>
                                        {flavor.ingredients.length > 1 && <button onClick={() => removeIngredient(flavorIndex, ingIndex)}><CloseIcon className="h-4 w-4 text-slate-400"/></button>}
                                    </div>
                                ))}
                                <button onClick={() => addIngredient(flavorIndex)} className="text-xs font-semibold text-lime-600 flex items-center gap-1"><PlusCircleIcon className="h-4 w-4"/> Add ingredient</button>
                             </div>
                        </div>
                    ))}
                    <button onClick={addFlavor} disabled={remainingBalls <= 0} className="w-full text-sm font-semibold text-lime-600 flex items-center justify-center gap-1 p-2 border-2 border-dashed rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"><PlusCircleIcon className="h-5 w-5"/> Add flavor</button>
                </div>

                <button onClick={calculateToppings} disabled={remainingBalls !== 0} className="mt-4 w-full bg-lime-500 text-white font-semibold py-2 rounded-lg disabled:bg-slate-400 disabled:cursor-not-allowed">
                    {remainingBalls !== 0 ? `${remainingBalls} ball(s) remaining to allocate` : 'Calculate Shopping List'}
                </button>

                {results && (
                    <div className="mt-6 border-t pt-4">
                        <h3 className="font-bold">Consolidated Shopping List:</h3>
                        <ul className="list-disc list-inside mt-2 text-sm columns-2">
                            {Object.entries(results).map(([name, total]) => (
                                <li key={name}><strong>{name}:</strong> {total} (units)</li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );
};

export default DoughStylesPage;
