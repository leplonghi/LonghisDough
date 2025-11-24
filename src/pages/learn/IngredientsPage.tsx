

import React from 'react';
import { useTranslation } from '@/i18n';
import { Page } from '@/types';
import { 
    AcademicCapIcon, 
    CubeIcon, 
    TagIcon, 
    SparklesIcon, 
    BeakerIcon, 
    BookOpenIcon, 
    PuzzlePieceIcon, 
    ListBulletIcon, 
    FireIcon, 
    OilIcon, 
    FlourIcon, 
} from '@/components/ui/Icons';

interface IngredientsPageProps {
  onNavigate: (page: Page) => void;
}

const LearnCategoryCard: React.FC<{
    icon: React.ReactNode;
    title: string;
    description: string;
    onClick: () => void;
}> = ({ icon, title, description, onClick }) => (
    <button
        onClick={onClick}
        className="group h-full text-left flex flex-col rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition-all hover:shadow-lg hover:-translate-y-1 dark:border-slate-700 dark:bg-slate-800"
    >
        <div className="flex-shrink-0 text-lime-500">{icon}</div>
        <div className="mt-4 flex-grow">
            <h3 className="text-lg font-bold text-slate-800 dark:text-white group-hover:text-lime-600 dark:group-hover:text-lime-400 transition-colors">
                {title}
            </h3>
            <p className="mt-2 text-sm text-slate-700 dark:text-slate-300 leading-relaxed">{description}</p>
        </div>
        <p className="mt-4 text-sm font-semibold text-slate-600 dark:text-slate-400 group-hover:text-lime-600 transition-colors">
            Explore &rarr;
        </p>
    </button>
);

const IngredientsPage: React.FC<IngredientsPageProps> = ({ onNavigate }) => {
    const { t } = useTranslation();
    
    const categories = [
        {
            page: 'learn/ingredients/flours' as Page,
            title: 'Flours',
            description: 'The science behind the main ingredient: strength (W), P/L, and milling types.',
            icon: <FlourIcon className="h-8 w-8" />,
        },
        {
            page: 'learn/ingredients/yeasts' as Page,
            title: 'Yeasts',
            description: 'Commercial yeasts, sourdough starters, and fermentation science.',
            icon: <BeakerIcon className="h-8 w-8" />,
        },
        {
            page: 'learn/ingredients/cheeses' as Page,
            title: 'Cheeses',
            description: 'All about mozzarella, parmesan, provolone, and more. Moisture, melting, and flavor.',
            icon: <CubeIcon className="h-8 w-8" />,
        },
        {
            page: 'learn/ingredients/meats' as Page,
            title: 'Meats & Cured Meats',
            description: 'From pepperoni to prosciutto. Tips on prep, curing, and pairing.',
            icon: <TagIcon className="h-8 w-8" />,
        },
        {
            page: 'learn/ingredients/vegetables' as Page,
            title: 'Vegetables',
            description: 'How to prepare vegetables for pizza, avoiding excess moisture and maximizing flavor.',
            icon: <SparklesIcon className="h-8 w-8" />,
        },
        {
            page: 'learn/ingredients/sauces' as Page,
            title: 'Sauces',
            description: 'From classic San Marzano to white bases and pestos. The foundation of flavor.',
            icon: <FireIcon className="h-8 w-8" />,
        },
        {
            page: 'learn/ingredients/oils' as Page,
            title: 'Oils & Fats',
            description: 'The final touch. Understand olive oil, infused oils, and their behavior in heat.',
            icon: <OilIcon className="h-8 w-8" />,
        },
        {
            page: 'learn/ingredients/oils-spices' as Page,
            title: 'Herbs & Spices',
            description: 'The aromatic science of oregano, basil, and other spices and their correct usage.',
            icon: <SparklesIcon className="h-8 w-8" />,
        },
        {
            page: 'learn/ingredients/classic-combos' as Page,
            title: 'Classic Combos',
            description: 'Margherita, Pepperoni, Four Cheese. Recipes that never fail.',
            icon: <BookOpenIcon className="h-8 w-8" />,
        },
        {
            page: 'learn/ingredients/bold-combos' as Page,
            title: 'Bold Combos',
            description: 'Get inspired by creative and surprising combinations for your pizzas.',
            icon: <SparklesIcon className="h-8 w-8" />,
        },
        {
            page: 'learn/ingredients/pairing-tool' as Page,
            title: 'Pairing Tool',
            description: 'An interactive tool to discover the best ingredient combinations.',
            icon: <PuzzlePieceIcon className="h-8 w-8" />,
        },
        {
            page: 'learn/ingredients/ready-toppings' as Page,
            title: 'Ready Toppings',
            description: 'Library of prepared combinations with weights and measures for your pizza.',
            icon: <ListBulletIcon className="h-8 w-8" />,
        },
    ];

    return (
        <div className="mx-auto max-w-7xl animate-[fadeIn_0.5s_ease-in-out]">
            <div className="text-center">
                <AcademicCapIcon className="mx-auto h-12 w-12 text-lime-500" />
                <h1 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
                    Ingredient Guide
                </h1>
                <p className="mt-4 max-w-3xl mx-auto text-lg text-slate-700 dark:text-slate-300">
                    Explore the universe of flavors that go on top of your dough.
                </p>
            </div>

            <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {categories.map(category => (
                    <LearnCategoryCard
                        key={category.page}
                        icon={category.icon}
                        title={category.title}
                        description={category.description}
                        onClick={() => onNavigate(category.page)}
                    />
                ))}
            </div>
        </div>
    );
};

export default IngredientsPage;
