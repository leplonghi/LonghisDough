import React from 'react';
import { useTranslation } from '@/i18n';
import { Page } from '@/types';
import { 
    AcademicCapIcon, 
    WrenchScrewdriverIcon,
    BeakerIcon,
    FireIcon,
    QuestionMarkCircleIcon,
    FlourIcon,
    SparklesIcon,
    CubeIcon,
    FermentationIcon,
    WaterIcon,
    SaltIcon,
    OilIcon,
    TagIcon,
    GlobeAltIcon,
    ListBulletIcon,
    BookOpenIcon,
    PuzzlePieceIcon,
    FlaskIcon,
    ShieldCheckIcon,
    SunIcon,
} from '@/components/ui/Icons';

interface LearnPageProps {
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


const LearnPage: React.FC<LearnPageProps> = ({ onNavigate }) => {
    const { t } = useTranslation();
    
    const categories = [
        {
            page: 'learn/oven-spring' as Page,
            title: 'Oven Spring',
            description: 'The science of the initial dough expansion in the oven.',
            icon: <SparklesIcon className="h-8 w-8" />,
        },
        {
            page: 'learn/fermentation-biochemistry' as Page,
            title: 'Fermentation Biochemistry',
            description: 'Yeast, bacteria, acids, and flavor creation.',
            icon: <BeakerIcon className="h-8 w-8" />,
        },
        {
            page: 'learn/crumb-structure' as Page,
            title: 'Crumb Structure',
            description: 'How alveoli form and the texture of the crumb.',
            icon: <CubeIcon className="h-8 w-8" />,
        },
        {
            page: 'learn/dough-aging' as Page,
            title: 'Dough Aging',
            description: 'Understand starch retrogradation and sensory maturation.',
            icon: <FermentationIcon className="h-8 w-8" />,
        },
        {
            page: 'learn/ambient-vs-cold-fermentation' as Page,
            title: 'Ambient vs. Cold',
            description: 'A scientific comparison of fermentation methods.',
            icon: <SunIcon className="h-8 w-8" />,
        },
        {
            page: 'learn/mixing-techniques' as Page,
            title: 'Mixing Techniques',
            description: 'The science behind kneading, folding, and the Rubaud method.',
            icon: <WrenchScrewdriverIcon className="h-8 w-8" />,
        },
        {
            page: 'learn/balling-technique' as Page,
            title: 'Balling Science',
            description: 'How surface tension organizes gluten and retains gas.',
            icon: <CubeIcon className="h-8 w-8" />,
        },
        {
            page: 'learn/sensory-maturation' as Page,
            title: 'Sensory Maturation',
            description: 'The formation of complex aromas in long fermentations.',
            icon: <SparklesIcon className="h-8 w-8" />,
        },
        {
            page: 'learn/parbaking' as Page,
            title: 'Parbaking',
            description: 'The science and technique of parbaking and double baking.',
            icon: <FireIcon className="h-8 w-8" />,
        },
        {
            page: 'learn/water' as Page,
            title: 'Water in Dough',
            description: 'The science of hardness, minerals, and water impact on gluten.',
            icon: <WaterIcon className="h-8 w-8" />,
        },
        {
            page: 'learn/salt' as Page,
            title: 'The Role of Salt',
            description: 'Chemical and structural functions of salt, beyond flavor.',
            icon: <SaltIcon className="h-8 w-8" />,
        },
        {
            page: 'learn/sugars-malts-enzymes' as Page,
            title: 'Sugars & Enzymes',
            description: 'How sugars, malts, and enzymes influence fermentation, color, and flavor.',
            icon: <SparklesIcon className="h-8 w-8" />,
        },
        {
            page: 'learn/fats' as Page,
            title: 'Fats in Dough',
            description: 'The impact of oils and fats on softness, structure, and texture.',
            icon: <OilIcon className="h-8 w-8" />,
        },
        {
            page: 'learn/tomato-preservation' as Page,
            title: 'Tomato Science',
            description: 'Acidity, sweetness, and preservation to create the perfect sauce.',
            icon: <FireIcon className="h-8 w-8" />,
        },
        {
            page: 'learn/white-sauces' as Page,
            title: 'White Sauces & Emulsions',
            description: 'The science behind creamy bases and their behavior in heat.',
            icon: <BeakerIcon className="h-8 w-8" />,
        },
        {
            page: 'learn/special-sauces' as Page,
            title: 'Special Sauces',
            description: 'Technical use of pesto, ricotta, and other bases on pizza.',
            icon: <TagIcon className="h-8 w-8" />,
        },
        {
            page: 'learn/low-moisture-cheeses' as Page,
            title: 'Low-Moisture Cheeses',
            description: 'The science of stable melting and concentrated flavor.',
            icon: <CubeIcon className="h-8 w-8" />,
        },
        {
            page: 'learn/smoked-cheeses' as Page,
            title: 'Smoked Cheeses',
            description: 'The physics of smoke and aromatic impact on pizza.',
            icon: <FireIcon className="h-8 w-8" />,
        },
        {
            page: 'learn/cured-meats' as Page,
            title: 'Cured Meats',
            description: 'From pepperoni to prosciutto. Tips on prep, curing, and pairing.',
            icon: <TagIcon className="h-8 w-8" />,
        },
        {
            page: 'learn/smoked-aromatics' as Page,
            title: 'Smoked & Aromatics',
            description: 'Using ingredients with intense flavor and the risk of saturation.',
            icon: <SparklesIcon className="h-8 w-8" />,
        },
        {
            page: 'learn/water-rich-vegetables' as Page,
            title: 'Water-Rich Vegetables',
            description: 'How to control moisture in mushrooms, zucchini, and others.',
            icon: <WaterIcon className="h-8 w-8" />,
        },
        {
            page: 'learn/caramelizable-vegetables' as Page,
            title: 'Caramelizable Vegetables',
            description: 'The science of sugars in onions, peppers, and their impact on flavor.',
            icon: <FireIcon className="h-8 w-8" />,
        },
        {
            page: 'learn/regional-combos' as Page,
            title: 'Regional Combos',
            description: 'A cultural journey through pizzas of the world.',
            icon: <GlobeAltIcon className="h-8 w-8" />,
        },
        {
            page: 'learn/sensory-profiles' as Page,
            title: 'Sensory Profiles',
            description: 'Balancing umami, fat, acidity, and sweetness in pizza.',
            icon: <BeakerIcon className="h-8 w-8" />,
        },
        {
            page: 'learn/techniques' as Page,
            title: 'General Techniques',
            description: 'Learn about autolyse, stretch & fold, no-knead, and more.',
            icon: <WrenchScrewdriverIcon className="h-8 w-8" />,
        },
        {
            page: 'learn/fermentation' as Page,
            title: 'Fermentation',
            description: 'Master the art of cold maturation and levain control.',
            icon: <FermentationIcon className="h-8 w-8" />,
        },
        {
            page: 'learn/preferments' as Page,
            title: 'Preferments',
            description: 'The science and effects of Poolish, Biga, and Sourdough.',
            icon: <BeakerIcon className="h-8 w-8" />,
        },
        {
            page: 'learn/dough-science' as Page,
            title: 'Dough Science',
            description: 'Understand gluten network, hydration, and the importance of DDT.',
            icon: <SparklesIcon className="h-8 w-8" />,
        },
        {
            page: 'learn/oven-science' as Page,
            title: 'Oven Science',
            description: 'Understand how conduction, convection, and radiation transform your dough.',
            icon: <FireIcon className="h-8 w-8" />,
        },
        {
            page: 'learn/temperature-control' as Page,
            title: 'Temperature Control',
            description: 'The secret to consistency: understand DDT and temperature effects.',
            icon: <SunIcon className="h-8 w-8" />,
        },
        {
            page: 'learn/storage' as Page,
            title: 'Dough Storage',
            description: 'The science of storing dough to control fermentation and texture.',
            icon: <CubeIcon className="h-8 w-8" />,
        },
        {
            page: 'learn/hygiene-safety' as Page,
            title: 'Hygiene & Safety',
            description: 'Sanitary principles for safe and responsible handling.',
            icon: <ShieldCheckIcon className="h-8 w-8" />,
        },
        {
            page: 'learn/equipment' as Page,
            title: 'Equipment',
            description: 'The impact of peels, stones, steel, and other tools on the result.',
            icon: <WrenchScrewdriverIcon className="h-8 w-8" />,
        },
        {
            page: 'learn/troubleshooting' as Page,
            title: 'Troubleshooting',
            description: 'Solve problems like tearing dough, raw base, and lack of rise.',
            icon: <QuestionMarkCircleIcon className="h-8 w-8" />,
        },
        {
            page: 'learn/ingredients' as Page,
            title: 'Ingredients',
            description: 'Know flour types, salt functions, oil, and yeast.',
            icon: <FlourIcon className="h-8 w-8" />,
        },
        {
            page: 'learn/chemistry-library' as Page,
            title: 'Chemistry Library',
            description: 'Dive deep into enzymatic reactions and microorganisms.',
            icon: <FlaskIcon className="h-8 w-8" />,
        },
        {
            page: 'learn/style-guide' as Page,
            title: 'Style Guide',
            description: 'Explore characteristics of Neapolitan, NY, Detroit, and more.',
            icon: <BookOpenIcon className="h-8 w-8" />,
        },
        {
            page: 'learn/glossary' as Page,
            title: 'Glossary',
            description: 'A dictionary of the most important technical baking terms.',
            icon: <ListBulletIcon className="h-8 w-8" />,
        },
        {
            page: 'learn/sensory-guide' as Page,
            title: 'Sensory Guide',
            description: 'Learn to balance sweet, salty, sour, bitter, and umami.',
            icon: <BeakerIcon className="h-8 w-8" />,
        },
    ];

    return (
        <div className="mx-auto max-w-7xl animate-[fadeIn_0.5s_ease-in-out]">
            <div className="text-center mb-12">
                <AcademicCapIcon className="mx-auto h-12 w-12 text-lime-500" />
                <h1 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
                    {t('learn.title')}
                </h1>
                <p className="mt-4 max-w-3xl mx-auto text-lg text-slate-700 dark:text-slate-300">
                    {t('learn.subtitle')}
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

export default LearnPage;