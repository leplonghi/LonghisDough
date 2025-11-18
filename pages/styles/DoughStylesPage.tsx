
import React, { useState, useMemo } from 'react';
import { 
    BookOpenIcon,
    BeakerIcon,
    FireIcon,
    CubeIcon,
    ChevronRightIcon,
    StarIcon,
} from '../../components/IconComponents';
import { STYLES_DATA } from '../../data/stylesData';
import { useTranslation } from '../../i18n';
import { DoughStyleDefinition } from '../../types';

interface DoughStylesPageProps {
  onNavigateToDetail: (styleId: string) => void;
}

const CategoryBadge: React.FC<{ category: string }> = ({ category }) => {
    let colorClass = 'bg-slate-100 text-slate-700';
    let icon = <CubeIcon className="h-3 w-3 mr-1" />;

    if (category === 'Pizza') {
        colorClass = 'bg-orange-100 text-orange-800 border-orange-200';
        icon = <FireIcon className="h-3 w-3 mr-1" />;
    } else if (category === 'Pão') {
        colorClass = 'bg-amber-100 text-amber-800 border-amber-200';
        icon = <BeakerIcon className="h-3 w-3 mr-1" />;
    } else if (category === 'Doce') {
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
                    <span className="font-mono bg-slate-50 px-1.5 py-0.5 rounded">Hidratação: {style.technical.hydration}%</span>
                    <span className="flex items-center font-semibold text-lime-600 group-hover:underline">
                        Detalhes <ChevronRightIcon className="h-3 w-3 ml-1" />
                    </span>
                </div>
            </div>
        </div>
    );
};

const DoughStylesPage: React.FC<DoughStylesPageProps> = ({ onNavigateToDetail }) => {
    const { t } = useTranslation();
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState<string>('Todos');
    
    const categories = ['Todos', 'Pizza', 'Pão', 'Doce'];

    const filteredStyles = useMemo(() => {
        return STYLES_DATA.filter(style => {
            const matchesSearch = style.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                                  style.description.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesCategory = selectedCategory === 'Todos' || style.category === selectedCategory;
            return matchesSearch && matchesCategory;
        });
    }, [searchTerm, selectedCategory]);

    return (
        <div className="mx-auto max-w-7xl animate-[fadeIn_0.5s_ease-in_out]">
            <div className="text-center mb-10">
                <BookOpenIcon className="mx-auto h-12 w-12 text-lime-500" />
                <h1 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                    Biblioteca de Estilos
                </h1>
                <p className="mt-4 max-w-2xl mx-auto text-lg text-slate-600">
                    Um compêndio técnico com fórmulas, história e parâmetros dos principais estilos de panificação do mundo.
                </p>
            </div>

            {/* Search and Filter Bar */}
            <div className="mb-8 flex flex-col md:flex-row gap-4 items-center justify-between bg-slate-50 p-4 rounded-xl border border-slate-200">
                <div className="relative w-full md:w-96">
                    <input
                        type="text"
                        className="block w-full rounded-lg border-slate-300 bg-white py-2 pl-4 pr-3 text-sm placeholder-slate-500 focus:border-lime-500 focus:ring-lime-500"
                        placeholder="Buscar estilo..."
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
                        Nenhum estilo encontrado.
                    </div>
                )}
            </div>
        </div>
    );
};

export default DoughStylesPage;
