
import React, { useState, useMemo } from 'react';
import { 
    BookOpenIcon,
    BeakerIcon,
    FireIcon,
    CubeIcon,
    ChevronRightIcon,
    StarIcon,
    CalculatorIcon,
    ClockIcon,
    FlourIcon,
} from '@/components/ui/Icons';
import { STYLES_DATA } from '@/data/stylesData';
import { useTranslation } from '@/i18n';
import { DoughStyleDefinition, DoughConfig, StyleCategory } from '@/types';

interface DoughStylesPageProps {
  doughConfig: DoughConfig;
  onLoadStyle?: (style: DoughStyleDefinition) => void;
  onNavigateToDetail: (styleId: string) => void;
}

// Navigation Categories
const CATEGORY_FILTERS: { id: StyleCategory | 'all', label: string }[] = [
    { id: 'all', label: 'All' },
    { id: 'pizza', label: 'Pizza' },
    { id: 'bread', label: 'Breads' },
    { id: 'flatbread', label: 'Flatbreads' },
    { id: 'enriched_bread', label: 'Enriched' },
    { id: 'pastry', label: 'Pastry & Sweets' },
];

const TechnicalBadge: React.FC<{ label: string, value: string | number }> = ({ label, value }) => (
    <div className="flex flex-col px-2 py-1 bg-slate-50 rounded border border-slate-100">
        <span className="text-[9px] uppercase text-slate-400 font-bold tracking-wider">{label}</span>
        <span className="text-xs font-semibold text-slate-700">{value}</span>
    </div>
);

const ReferenceList: React.FC<{ references?: DoughStyleDefinition['references'] }> = ({ references }) => {
    if (!references || references.length === 0) return null;
    return (
        <div className="mt-3 pt-3 border-t border-slate-100">
            <p className="text-[10px] text-slate-400 uppercase font-bold mb-1 flex items-center gap-1">
                <BookOpenIcon className="h-3 w-3" /> Validated Sources
            </p>
            <ul className="space-y-0.5">
                {references.slice(0, 2).map((ref, idx) => (
                    <li key={idx} className="text-[10px] text-slate-500 truncate">
                        • {ref.source} {ref.author ? `(${ref.author})` : ''}
                    </li>
                ))}
            </ul>
        </div>
    );
};

const StyleCard: React.FC<{ style: DoughStyleDefinition; onClick: () => void; onUse: (e: React.MouseEvent) => void }> = ({ style, onClick, onUse }) => {
    // New Badge Logic (last 30 days)
    const isNew = useMemo(() => {
        if (!style.releaseDate) return false;
        const release = new Date(style.releaseDate);
        const diffTime = Math.abs(new Date().getTime() - release.getTime());
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return diffDays <= 30;
    }, [style.releaseDate]);

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
            {isNew && (
                <div className="absolute top-0 left-0 bg-blue-500 text-white text-[10px] font-bold px-2 py-1 rounded-br-lg shadow-sm z-10 uppercase tracking-wide">
                    NEW
                </div>
            )}
            
            <div className="p-5 flex-grow flex flex-col">
                <div className="flex justify-between items-start mb-1">
                    <h3 className="font-bold text-lg text-slate-900 group-hover:text-lime-600 transition-colors line-clamp-1">
                        {style.name}
                    </h3>
                </div>
                <p className="text-xs text-slate-500 mb-3">{style.country}, {style.year}</p>

                <p className="text-sm text-slate-600 mb-4 line-clamp-2 flex-grow">
                    {style.description}
                </p>
                
                <div className="grid grid-cols-3 gap-2 mb-4">
                    <TechnicalBadge label="Hydration" value={style.technicalProfile ? `${style.technicalProfile.hydration[0]}-${style.technicalProfile.hydration[1]}%` : `${style.technical.hydration}%`} />
                    <TechnicalBadge label="Ferment" value={style.technicalProfile ? style.technicalProfile.fermentation.bulk.split(' ')[0] : 'Std'} />
                    <TechnicalBadge label="Skill" value={style.technicalProfile?.difficulty || 'Med'} />
                </div>

                <ReferenceList references={style.references} />

                <div className="mt-auto pt-4 border-t border-slate-100 flex gap-2">
                    <button 
                        onClick={onUse}
                        className="flex-1 bg-lime-50 text-lime-700 hover:bg-lime-100 hover:text-lime-800 text-xs font-bold py-2 px-3 rounded-lg transition-colors flex items-center justify-center gap-1"
                    >
                        <CalculatorIcon className="h-3 w-3" /> Use
                    </button>
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
    
    // Group styles by Family
    const stylesByFamily = useMemo(() => {
        const filtered = STYLES_DATA.filter(style => {
            const matchesSearch = style.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                                  style.description.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesCategory = selectedCategory === 'all' || style.category === selectedCategory;
            return matchesSearch && matchesCategory;
        });

        const grouped: Record<string, DoughStyleDefinition[]> = {};
        filtered.forEach(style => {
            const family = style.family || 'Other';
            if (!grouped[family]) grouped[family] = [];
            grouped[family].push(style);
        });
        return grouped;
    }, [searchTerm, selectedCategory]);

    const handleUseStyle = (e: React.MouseEvent, style: DoughStyleDefinition) => {
        e.stopPropagation();
        if (onLoadStyle) {
            onLoadStyle(style);
        }
    };

    return (
        <div className="mx-auto max-w-7xl animate-[fadeIn_0.5s_ease-in_out]">
            <div className="text-center mb-10">
                <BookOpenIcon className="mx-auto h-12 w-12 text-lime-500" />
                <h1 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                    Style Library
                </h1>
                <p className="mt-4 max-w-2xl mx-auto text-lg text-slate-600">
                    A rigorous technical compendium of baking styles, validated by international standards and scientific literature.
                </p>
            </div>

            {/* Search and Filter Bar */}
            <div className="mb-8 flex flex-col md:flex-row gap-4 items-center justify-between bg-slate-50 p-4 rounded-xl border border-slate-200 sticky top-20 z-20 shadow-sm">
                <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0 w-full md:w-auto no-scrollbar">
                    {CATEGORY_FILTERS.map(cat => (
                        <button 
                            key={cat.id}
                            onClick={() => setSelectedCategory(cat.id as any)}
                            className={`whitespace-nowrap px-4 py-2 rounded-lg text-sm font-medium transition-colors ${selectedCategory === cat.id ? 'bg-lime-500 text-white shadow-sm' : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'}`}
                        >
                            {cat.label}
                        </button>
                    ))}
                </div>
                <div className="relative w-full md:w-72">
                    <input
                        type="text"
                        className="block w-full rounded-lg border-slate-300 bg-white py-2 pl-4 pr-3 text-sm placeholder-slate-500 focus:border-lime-500 focus:ring-lime-500"
                        placeholder="Search style..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>
            
            <div className="space-y-12">
                {Object.keys(stylesByFamily).length === 0 ? (
                    <div className="col-span-full text-center py-12 text-slate-500">
                        No styles found matching criteria.
                    </div>
                ) : (
                    Object.entries(stylesByFamily).map(([family, styles]) => (
                        <section key={family} className="animate-fade-in">
                            <div className="flex items-center gap-4 mb-6">
                                <h2 className="text-2xl font-bold text-slate-800">{family}</h2>
                                <div className="h-px bg-slate-200 flex-grow"></div>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                                {styles.map(style => (
                                    <StyleCard 
                                        key={style.id} 
                                        style={style} 
                                        onClick={() => onNavigateToDetail(style.id)} 
                                        onUse={(e) => handleUseStyle(e, style)}
                                    />
                                ))}
                            </div>
                        </section>
                    ))
                )}
            </div>
        </div>
    );
};

export default DoughStylesPage;
