
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
    FlourIcon,
    SparklesIcon,
    UserCircleIcon,
    ClockIcon,
    GlobeAltIcon,
    TagIcon
} from '@/components/ui/Icons';
import { STYLES_DATA } from '@/data/stylesData';
import { useTranslation } from '@/i18n';
import { DoughStyleDefinition, DoughConfig, StyleCategory } from '@/types';
import { useUser } from '@/contexts/UserProvider';
import CreateStyleModal from '@/components/styles/CreateStyleModal';
import AiStyleBuilderModal from '@/components/styles/AiStyleBuilderModal';
import ProFeatureLock from '@/components/ui/ProFeatureLock';

interface DoughStylesPageProps {
  doughConfig: DoughConfig;
  onLoadStyle: (style: DoughStyleDefinition) => void;
  onNavigateToDetail: (styleId: string) => void;
}

// Navigation Categories matching the new taxonomy
const CATEGORY_FILTERS: { id: StyleCategory | 'all', label: string }[] = [
    { id: 'all', label: 'All Styles' },
    { id: 'pizza', label: 'Pizza' },
    { id: 'bread', label: 'Breads' },
    { id: 'enriched_bread', label: 'Enriched' },
    { id: 'burger_bun', label: 'Buns' },
    { id: 'pastry', label: 'Pastry' },
    { id: 'cookie', label: 'Cookies' },
];

// Helper to group categories for display sections
const getDisplayGroup = (category: StyleCategory): string => {
    switch (category) {
        case 'pizza': return 'Pizzas';
        case 'bread': return 'Breads & Rustic Loaves';
        case 'enriched_bread': return 'Enriched Breads';
        case 'flatbread': return 'Flatbreads';
        case 'burger_bun': return 'Burger Buns';
        case 'pastry': return 'Pastry & Sweet Doughs';
        case 'cookie': return 'Cookies & Confectionery';
        default: return 'Other Styles';
    }
};

// Priority order for display groups
const GROUP_ORDER = [
    'Pizzas',
    'Breads & Rustic Loaves',
    'Enriched Breads',
    'Burger Buns',
    'Pastry & Sweet Doughs',
    'Cookies & Confectionery',
    'Other Styles'
];

const CategoryBadge: React.FC<{ category: StyleCategory }> = ({ category }) => {
    let colorClass = 'bg-slate-100 text-slate-700 border-slate-200';
    let icon = <CubeIcon className="h-3 w-3 mr-1" />;

    switch (category) {
        case 'pizza':
            colorClass = 'bg-orange-50 text-orange-700 border-orange-200';
            icon = <FireIcon className="h-3 w-3 mr-1" />;
            break;
        case 'bread':
            colorClass = 'bg-amber-50 text-amber-800 border-amber-200';
            icon = <BeakerIcon className="h-3 w-3 mr-1" />;
            break;
        case 'enriched_bread':
            colorClass = 'bg-yellow-50 text-yellow-700 border-yellow-200';
            icon = <StarIcon className="h-3 w-3 mr-1" />;
            break;
        case 'burger_bun':
            colorClass = 'bg-orange-50 text-orange-800 border-orange-200';
            icon = <CubeIcon className="h-3 w-3 mr-1" />;
            break;
        case 'pastry':
            colorClass = 'bg-pink-50 text-pink-700 border-pink-200';
            icon = <SparklesIcon className="h-3 w-3 mr-1" />;
            break;
        case 'cookie':
            colorClass = 'bg-stone-100 text-stone-700 border-stone-200';
            icon = <FlourIcon className="h-3 w-3 mr-1" />;
            break;
    }

    return (
        <span className={`inline-flex items-center rounded-full border px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide ${colorClass}`}>
            {icon}
            {category.replace(/_/g, ' ')}
        </span>
    );
};

const TechnicalBadge: React.FC<{ label: string, value: string | number }> = ({ label, value }) => (
    <div className="flex flex-col px-2 py-1 bg-slate-50 rounded border border-slate-100 items-center text-center">
        <span className="text-[9px] uppercase text-slate-400 font-bold tracking-wider">{label}</span>
        <span className="text-xs font-semibold text-slate-700">{value}</span>
    </div>
);

const StyleCard: React.FC<{ style: DoughStyleDefinition; onClick: () => void; onUse: (e: React.MouseEvent) => void; onDelete?: (e: React.MouseEvent) => void }> = ({ style, onClick, onUse, onDelete }) => {
    // New Badge Logic (last 30 days)
    const isNew = useMemo(() => {
        if (!style.releaseDate) return false;
        const release = new Date(style.releaseDate);
        const diffTime = Math.abs(new Date().getTime() - release.getTime());
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return diffDays <= 30;
    }, [style.releaseDate]);

    // Format hydration display
    const hydrationDisplay = style.technicalProfile 
        ? `${style.technicalProfile.hydration[0]}-${style.technicalProfile.hydration[1]}%` 
        : `${style.technical.hydration}%`;

    return (
        <div 
            onClick={onClick}
            className="group flex flex-col rounded-xl border border-slate-200 bg-white shadow-sm transition-all duration-200 hover:shadow-md hover:-translate-y-1 cursor-pointer h-full relative overflow-hidden"
        >
            {style.isPro && (
                <div className="absolute top-0 right-0 bg-lime-500 text-white text-[10px] font-bold px-2 py-1 rounded-bl-lg shadow-sm z-10 uppercase tracking-wide">
                    PRO
                </div>
            )}
            {!style.isCanonical && (
                 <div className={`absolute top-0 left-0 text-white text-[10px] font-bold px-2 py-1 rounded-br-lg shadow-sm z-10 uppercase tracking-wide flex items-center gap-1 ${style.source === 'user_ai' ? 'bg-indigo-500' : 'bg-sky-500'}`}>
                    {style.source === 'user_ai' ? <SparklesIcon className="h-3 w-3" /> : <UserCircleIcon className="h-3 w-3" />}
                    {style.source === 'user_ai' ? 'AI Style' : 'USER'}
                </div>
            )}
            {isNew && style.isCanonical && (
                <div className="absolute top-0 left-0 bg-blue-500 text-white text-[10px] font-bold px-2 py-1 rounded-br-lg shadow-sm z-10 uppercase tracking-wide">
                    NEW
                </div>
            )}
            
            <div className="p-5 flex-grow flex flex-col">
                <div className="flex justify-between items-start mb-2 mt-2">
                    <h3 className="font-bold text-lg text-slate-900 group-hover:text-lime-600 transition-colors line-clamp-1 leading-tight">
                        {style.name}
                    </h3>
                </div>
                
                <div className="mb-3 flex gap-2 flex-wrap">
                    <CategoryBadge category={style.category} />
                    <span className="text-[10px] font-semibold text-slate-500 bg-slate-50 px-2 py-0.5 rounded-full border border-slate-100 flex items-center gap-1">
                        <GlobeAltIcon className="h-3 w-3" /> {style.country}
                    </span>
                </div>

                <p className="text-sm text-slate-600 mb-4 line-clamp-2 flex-grow">
                    {style.description}
                </p>
                
                {/* Technical Stats Grid */}
                <div className="grid grid-cols-3 gap-2 mb-4">
                    <TechnicalBadge label="Hydration" value={hydrationDisplay} />
                    <TechnicalBadge label="Time" value={style.technicalProfile ? style.technicalProfile.fermentation?.bulk.split(' ')[0] : 'Std'} />
                    <TechnicalBadge label="Skill" value={style.technicalProfile?.difficulty || 'Med'} />
                </div>

                {/* Tags */}
                {style.tags && style.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1 mb-4">
                        {style.tags.slice(0, 3).map(tag => (
                            <span key={tag} className="text-[9px] text-slate-500 bg-slate-50 border border-slate-100 px-1.5 py-0.5 rounded flex items-center gap-0.5">
                                <TagIcon className="h-2 w-2" /> {tag}
                            </span>
                        ))}
                    </div>
                )}

                <div className="mt-auto pt-4 border-t border-slate-100 flex gap-2">
                    <button 
                        onClick={onUse}
                        className="flex-1 bg-lime-50 text-lime-700 hover:bg-lime-100 hover:text-lime-800 text-xs font-bold py-2 px-3 rounded-lg transition-colors flex items-center justify-center gap-1"
                    >
                        <CalculatorIcon className="h-3 w-3" /> Use
                    </button>
                     {!style.isCanonical && onDelete && (
                        <button 
                            onClick={onDelete}
                            className="bg-red-50 text-red-600 hover:bg-red-100 p-2 rounded-lg transition-colors"
                            title="Delete Style"
                        >
                            <TrashIcon className="h-4 w-4" />
                        </button>
                    )}
                    <button className="flex-1 bg-slate-50 text-slate-600 hover:bg-slate-100 text-xs font-semibold py-2 px-3 rounded-lg transition-colors flex items-center justify-center gap-1">
                        Details <ChevronRightIcon className="h-3 w-3" />
                    </button>
                </div>
            </div>
        </div>
    );
};

const DoughStylesPage: React.FC<DoughStylesPageProps> = ({ doughConfig, onLoadStyle, onNavigateToDetail }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState<StyleCategory | 'all'>('all');
    const [selectedTag, setSelectedTag] = useState<string | null>(null);
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [isAiModalOpen, setIsAiModalOpen] = useState(false);
    const [styleToEdit, setStyleToEdit] = useState<Partial<DoughStyleDefinition> | undefined>(undefined);
    const [isPlannerOpen, setIsPlannerOpen] = useState(false);
    
    const { userStyles, addUserStyle, deleteUserStyle } = useUser();
    
    // Combine Official and User Styles
    const allStyles = useMemo(() => [...STYLES_DATA, ...userStyles], [userStyles]);
    
    // Extract unique tags from all available styles
    const availableTags = useMemo(() => {
        const tags = new Set<string>();
        allStyles.forEach(style => {
            style.tags?.forEach(t => tags.add(t));
        });
        return Array.from(tags).sort();
    }, [allStyles]);
    
    // Helper to count styles in a category
    const countByCategory = (cat: string) => {
        if (cat === 'all') return allStyles.length;
        return allStyles.filter(s => s.category === cat).length;
    };

    // Group styles by Display Section
    const stylesByGroup = useMemo(() => {
        const filtered = allStyles.filter(style => {
            const searchLower = searchTerm.toLowerCase();
            const matchesSearch = style.name.toLowerCase().includes(searchLower) || 
                                  style.description.toLowerCase().includes(searchLower) ||
                                  (style.tags && style.tags.some(t => t.toLowerCase().includes(searchLower)));
            
            const matchesCategory = selectedCategory === 'all' || style.category === selectedCategory;
            
            const matchesTag = selectedTag ? style.tags?.includes(selectedTag) : true;

            return matchesSearch && matchesCategory && matchesTag;
        });

        const grouped: Record<string, DoughStyleDefinition[]> = {};
        filtered.forEach(style => {
            const groupName = getDisplayGroup(style.category);
            if (!grouped[groupName]) grouped[groupName] = [];
            grouped[groupName].push(style);
        });
        
        return grouped;
    }, [searchTerm, selectedCategory, selectedTag, allStyles]);

    const handleUseStyle = (e: React.MouseEvent, style: DoughStyleDefinition) => {
        e.stopPropagation();
        if (onLoadStyle) {
            onLoadStyle(style);
        }
    };
    
    const handleDeleteUserStyle = async (e: React.MouseEvent, id: string) => {
        e.stopPropagation();
        if (confirm('Are you sure you want to delete this custom style?')) {
            await deleteUserStyle(id);
        }
    };

    const handleAiStyleGenerated = (style: Partial<DoughStyleDefinition>) => {
        setStyleToEdit({ ...style, source: 'user_ai' });
        setIsCreateModalOpen(true);
        setIsAiModalOpen(false);
    };

    return (
        <>
        <div className="mx-auto max-w-7xl animate-[fadeIn_0.5s_ease-in_out]">
            <div className="text-center mb-10">
                <BookOpenIcon className="mx-auto h-12 w-12 text-lime-500" />
                <h1 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                    Style Library
                </h1>
                <p className="mt-4 max-w-2xl mx-auto text-lg text-slate-600">
                    Explore technical formulas for Pizzas, Breads, Pastry, and more.
                </p>
            </div>

             <div className="mb-8 grid grid-cols-1 md:grid-cols-2 gap-4 p-6 rounded-xl bg-white border border-slate-200 shadow-sm">
                <div className="flex flex-col justify-center">
                     <h3 className="font-bold text-slate-800 text-lg">Create Your Own</h3>
                     <p className="text-sm text-slate-500 mt-1">Define your own unique methods or ask AI to generate a technical profile for you.</p>
                </div>
                <div className="flex flex-col sm:flex-row gap-3 justify-end items-center">
                    <ProFeatureLock origin='styles' featureName="AI Style Builder" className="w-full sm:w-auto">
                        <button 
                            onClick={() => setIsAiModalOpen(true)} 
                            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-lg bg-indigo-600 py-2.5 px-5 font-bold text-white shadow-sm hover:bg-indigo-700 transition-transform hover:scale-105"
                        >
                            <SparklesIcon className="h-5 w-5"/> Ask AI for a Style
                        </button>
                    </ProFeatureLock>
                    <button 
                        onClick={() => { setStyleToEdit(undefined); setIsCreateModalOpen(true); }} 
                        className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-lg bg-slate-100 py-2.5 px-5 font-bold text-slate-700 shadow-sm hover:bg-slate-200 transition-transform hover:scale-105"
                    >
                        <PlusCircleIcon className="h-5 w-5"/> Manual Create
                    </button>
                </div>
            </div>
            
             <div className="mb-8 flex flex-col md:flex-row gap-4 justify-center items-center p-4 rounded-xl bg-slate-50 border border-slate-200">
                <p className="text-sm font-semibold text-slate-700 text-center md:text-left">Need to calculate topping ingredients for your pizza bake?</p>
                 <button onClick={() => setIsPlannerOpen(true)} className="w-full sm:w-auto flex-shrink-0 inline-flex items-center justify-center gap-2 rounded-lg bg-lime-500 py-2 px-4 font-semibold text-white shadow-sm hover:bg-lime-600">
                    <CalculatorIcon className="h-5 w-5"/> Open Toppings Planner
                </button>
            </div>

            {/* Search and Filter Bar */}
            <div className="mb-6 flex flex-col md:flex-row gap-4 items-center justify-between bg-slate-50 p-4 rounded-xl border border-slate-200 sticky top-20 z-20 shadow-sm">
                <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0 w-full md:w-auto no-scrollbar">
                    {CATEGORY_FILTERS.map(cat => (
                        <button 
                            key={cat.id}
                            onClick={() => setSelectedCategory(cat.id as any)}
                            className={`whitespace-nowrap px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-1.5 ${selectedCategory === cat.id ? 'bg-lime-500 text-white shadow-sm' : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'}`}
                        >
                            {cat.label}
                            <span className={`text-[10px] py-0.5 px-1.5 rounded-full ${selectedCategory === cat.id ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-500'}`}>
                                {countByCategory(cat.id)}
                            </span>
                        </button>
                    ))}
                </div>
                <div className="relative w-full md:w-72">
                    <input
                        type="text"
                        className="block w-full rounded-lg border-slate-300 bg-white py-2 pl-4 pr-3 text-sm placeholder-slate-500 focus:border-lime-500 focus:ring-lime-500"
                        placeholder="Search by name or tag..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>

            {/* Tags Filter */}
            {availableTags.length > 0 && (
                <div className="mb-8 flex flex-wrap items-center gap-2 px-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1">
                        <TagIcon className="h-3 w-3" /> Filter by Tag:
                    </span>
                    {availableTags.map(tag => (
                        <button
                            key={tag}
                            onClick={() => setSelectedTag(prev => prev === tag ? null : tag)}
                            className={`text-xs px-2.5 py-1 rounded-full border transition-all ${
                                selectedTag === tag 
                                ? 'bg-slate-700 text-white border-slate-700 shadow-sm' 
                                : 'bg-white text-slate-600 border-slate-200 hover:border-lime-500 hover:text-lime-600'
                            }`}
                        >
                            {tag}
                        </button>
                    ))}
                    {selectedTag && (
                        <button 
                            onClick={() => setSelectedTag(null)}
                            className="text-xs text-red-500 hover:text-red-700 ml-2 font-medium"
                        >
                            Clear Filter
                        </button>
                    )}
                </div>
            )}
            
            <div className="space-y-12">
                {Object.keys(stylesByGroup).length === 0 ? (
                    <div className="col-span-full text-center py-12 text-slate-500">
                        No styles found matching criteria.
                    </div>
                ) : (
                    GROUP_ORDER.map(groupName => {
                        const styles = stylesByGroup[groupName];
                        if (!styles || styles.length === 0) return null;
                        
                        return (
                            <section key={groupName} className="animate-fade-in">
                                <div className="flex items-center gap-4 mb-6">
                                    <h2 className="text-2xl font-bold text-slate-800">{groupName}</h2>
                                    <span className="text-xs font-medium px-2 py-1 bg-slate-100 rounded-full text-slate-500">{styles.length}</span>
                                    <div className="h-px bg-slate-200 flex-grow"></div>
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                                    {styles.map(style => (
                                        <StyleCard 
                                            key={style.id} 
                                            style={style} 
                                            onClick={() => onNavigateToDetail(style.id)} 
                                            onUse={(e) => handleUseStyle(e, style)}
                                            onDelete={!style.isCanonical ? (e) => handleDeleteUserStyle(e, style.id) : undefined}
                                        />
                                    ))}
                                </div>
                            </section>
                        );
                    })
                )}
            </div>
        </div>
        
        <CreateStyleModal 
            isOpen={isCreateModalOpen} 
            onClose={() => setIsCreateModalOpen(false)}
            defaultValues={styleToEdit}
            onSave={async (style) => {
                await addUserStyle(style);
                setIsCreateModalOpen(false);
            }}
        />
        
        <AiStyleBuilderModal
            isOpen={isAiModalOpen}
            onClose={() => setIsAiModalOpen(false)}
            onStyleGenerated={handleAiStyleGenerated}
        />

        {isPlannerOpen && <ToppingPlannerModal onClose={() => setIsPlannerOpen(false)} totalBalls={doughConfig.numPizzas} />}
        </>
    );
};

// ToppingPlannerModal component
const ToppingPlannerModal: React.FC<{ onClose: () => void; totalBalls: number; }> = ({ onClose, totalBalls }) => {
    const [flavors, setFlavors] = useState<{ name: string, ingredients: { name: string, amount: string }[], assignedBalls: number }[]>([{ name: 'Flavor 1', ingredients: [{ name: '', amount: '' }], assignedBalls: totalBalls }]);
    const [results, setResults] = useState<Record<string, number> | null>(null);

    const allocatedBalls = flavors.reduce((sum, item) => sum + item.assignedBalls, 0);
    const remainingBalls = totalBalls - allocatedBalls;

    const handleFlavorChange = (index: number, field: string, value: string | number) => {
        const newFlavors = [...flavors];
        if (field === 'name') {
            // @ts-ignore
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
        // @ts-ignore
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
