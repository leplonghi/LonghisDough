
import React, { useState, useMemo, useEffect } from 'react';
import { 
    BookOpenIcon,
    PlusCircleIcon,
    GlobeAltIcon
} from '../../components/IconComponents';
import { fetchOfficialStyles, fetchUserStyles, fetchCommunityStyles } from '../../firebase/stylesRepository';
import { useTranslation } from '../../i18n';
import { DoughStyle } from '../../types';
import StyleCard from '../../components/styles/StyleCard';
import { useUser } from '../../contexts/UserProvider';
import { isFreeUser } from '../../lib/subscriptions';

interface DoughStylesPageProps {
  onNavigateToDetail: (slug: string) => void;
}

const DoughStylesPage: React.FC<DoughStylesPageProps> = ({ onNavigateToDetail }) => {
    const { t } = useTranslation();
    const { user, favoriteStyleIds, toggleStyleFavorite, openPaywall } = useUser();
    const free = isFreeUser(user);

    const [activeTab, setActiveTab] = useState<'library' | 'custom'>('library');
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState<string>('All');
    
    const [styles, setStyles] = useState<DoughStyle[]>([]);
    const [userStyles, setUserStyles] = useState<DoughStyle[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const loadStyles = async () => {
            setIsLoading(true);
            const official = await fetchOfficialStyles();
            const community = await fetchCommunityStyles();
            setStyles([...official, ...community]);
            
            if (user) {
                const custom = await fetchUserStyles(user.uid);
                setUserStyles(custom);
            }
            setIsLoading(false);
        };
        loadStyles();
    }, [user]);

    const categories = ['All', 'Pizza', 'Pão', 'Doce'];

    const filterStyles = (list: DoughStyle[]) => {
        return list.filter(style => {
            const matchesSearch = style.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                                  style.description.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesCategory = selectedCategory === 'All' || style.category === selectedCategory;
            return matchesSearch && matchesCategory;
        });
    };

    const featuredStyles = useMemo(() => styles.filter(s => s.isFeatured && s.accessTier !== 'coming_next'), [styles]);
    const comingNextStyles = useMemo(() => styles.filter(s => s.accessTier === 'coming_next'), [styles]);
    const allLibraryStyles = useMemo(() => filterStyles(styles.filter(s => s.accessTier !== 'coming_next')), [styles, searchTerm, selectedCategory]);
    const filteredUserStyles = useMemo(() => filterStyles(userStyles), [userStyles, searchTerm, selectedCategory]);

    const handleStyleClick = (style: DoughStyle) => {
        if (style.accessTier === 'coming_next') return;
        onNavigateToDetail(style.slug || style.id);
    };

    const handleCreateCustom = () => {
        if (free) {
            openPaywall('styles');
            return;
        }
        // Navigate to create style page (placeholder logic for now)
        alert("Custom Style Creator coming in next update.");
    }

    return (
        <div className="mx-auto max-w-7xl animate-[fadeIn_0.5s_ease-in_out]">
            {/* Header */}
            <div className="text-center mb-10">
                <BookOpenIcon className="mx-auto h-12 w-12 text-lime-500" />
                <h1 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                    Dough Styles Library
                </h1>
                <p className="mt-4 max-w-2xl mx-auto text-lg text-slate-600">
                    Technical, data-driven presets for dough engineering.
                </p>
            </div>

            {/* Tabs */}
            <div className="flex justify-center mb-8">
                <div className="bg-slate-100 p-1 rounded-lg flex gap-1">
                    <button 
                        onClick={() => setActiveTab('library')}
                        className={`px-4 py-2 rounded-md text-sm font-semibold transition-all ${activeTab === 'library' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                    >
                        Library
                    </button>
                    <button 
                        onClick={() => setActiveTab('custom')}
                        className={`px-4 py-2 rounded-md text-sm font-semibold transition-all ${activeTab === 'custom' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                    >
                        My Styles
                    </button>
                </div>
            </div>

            {/* Search and Filter Bar */}
            <div className="mb-8 flex flex-col md:flex-row gap-4 items-center justify-between bg-slate-50 p-4 rounded-xl border border-slate-200">
                <div className="relative w-full md:w-96">
                    <input
                        type="text"
                        className="block w-full rounded-lg border-slate-300 bg-white py-2 pl-4 pr-3 text-sm placeholder-slate-500 focus:border-lime-500 focus:ring-lime-500"
                        placeholder="Search styles..."
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

            {activeTab === 'library' && (
                <div className="space-y-12">
                    {/* Featured Section */}
                    {featuredStyles.length > 0 && !searchTerm && selectedCategory === 'All' && (
                        <section>
                             <h2 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
                                <GlobeAltIcon className="h-5 w-5 text-lime-500" /> Featured Styles
                             </h2>
                             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                {featuredStyles.map(style => (
                                    <StyleCard 
                                        key={style.id} 
                                        style={style} 
                                        onClick={() => handleStyleClick(style)}
                                        isFavorite={favoriteStyleIds.includes(style.id)}
                                        onToggleFavorite={toggleStyleFavorite}
                                    />
                                ))}
                             </div>
                        </section>
                    )}

                    {/* All Styles Grid */}
                    <section>
                        <h2 className="text-xl font-bold text-slate-800 mb-4">All Styles</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            {allLibraryStyles.map(style => (
                                <StyleCard 
                                    key={style.id} 
                                    style={style} 
                                    onClick={() => handleStyleClick(style)} 
                                    isFavorite={favoriteStyleIds.includes(style.id)}
                                    onToggleFavorite={toggleStyleFavorite}
                                    lockReason={style.isPro && free ? 'pro_only' : null} // Visual lock only
                                />
                            ))}
                            {allLibraryStyles.length === 0 && (
                                <div className="col-span-full text-center py-12 text-slate-500 bg-slate-50 rounded-xl border border-dashed border-slate-300">
                                    No styles found matching your filters.
                                </div>
                            )}
                        </div>
                    </section>

                    {/* Coming Next Section */}
                    {comingNextStyles.length > 0 && (
                         <section className="opacity-80">
                            <h2 className="text-xl font-bold text-slate-800 mb-4 mt-8">Coming Next</h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                {comingNextStyles.map(style => (
                                    <StyleCard 
                                        key={style.id} 
                                        style={style} 
                                        lockReason='coming_next'
                                    />
                                ))}
                            </div>
                        </section>
                    )}
                </div>
            )}

            {activeTab === 'custom' && (
                <div className="space-y-6">
                    <div className="flex justify-between items-center">
                        <h2 className="text-xl font-bold text-slate-800">My Custom Styles</h2>
                        <button 
                            onClick={handleCreateCustom}
                            className="flex items-center gap-2 bg-lime-500 text-white px-4 py-2 rounded-lg text-sm font-bold shadow-sm hover:bg-lime-600"
                        >
                            <PlusCircleIcon className="h-5 w-5" /> Create Style
                        </button>
                    </div>
                    
                    {filteredUserStyles.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {filteredUserStyles.map(style => (
                                <StyleCard 
                                    key={style.id} 
                                    style={style} 
                                    onClick={() => handleStyleClick(style)}
                                    isFavorite={favoriteStyleIds.includes(style.id)}
                                    onToggleFavorite={toggleStyleFavorite}
                                />
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-16 bg-slate-50 rounded-xl border border-dashed border-slate-300">
                             <h3 className="text-lg font-medium text-slate-900">No custom styles yet</h3>
                             <p className="text-slate-500 mt-1">Create your own dough profiles and save them here.</p>
                             {!free && (
                                 <button onClick={handleCreateCustom} className="mt-4 text-lime-600 font-semibold hover:underline">Create your first style</button>
                             )}
                             {free && (
                                 <p className="text-xs text-slate-400 mt-4">Custom styles are available in the Pro plan.</p>
                             )}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default DoughStylesPage;
