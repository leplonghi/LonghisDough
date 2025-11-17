
import React from 'react';
import { useTranslation } from '../../i18n';
import { Page } from '../../types';
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
} from '../../components/IconComponents';

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
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">{description}</p>
        </div>
        <p className="mt-4 text-sm font-semibold text-slate-500 dark:text-slate-400 group-hover:text-lime-500 transition-colors">
            Explorar &rarr;
        </p>
    </button>
);


const IngredientsPage: React.FC<IngredientsPageProps> = ({ onNavigate }) => {
    const { t } = useTranslation();
    
    const categories: { page: Page; title: string; description: string; icon: React.ReactNode }[] = [
        {
            page: 'learn/ingredients/flours',
            title: 'Farinhas',
            description: 'A ciência por trás do ingrediente principal: força (W), P/L e tipos de moagem.',
            icon: <FlourIcon className="h-8 w-8" />,
        },
        {
            page: 'learn/ingredients/yeasts',
            title: 'Fermentos',
            description: 'Leveduras comerciais, levain e a ciência da fermentação.',
            icon: <BeakerIcon className="h-8 w-8" />,
        },
        {
            page: 'learn/ingredients/cheeses',
            title: 'Queijos',
            description: 'Tudo sobre mozzarella, parmesão, provolone e outros. Umidade, derretimento e sabor.',
            icon: <CubeIcon className="h-8 w-8" />,
        },
        {
            page: 'learn/ingredients/meats',
            title: 'Carnes e Embutidos',
            description: 'Do pepperoni ao presunto cru. Dicas de preparo, cura e combinação.',
            icon: <TagIcon className="h-8 w-8" />,
        },
        {
            page: 'learn/ingredients/vegetables',
            title: 'Vegetais',
            description: 'Como preparar vegetais para pizza, evitando excesso de umidade e maximizando o sabor.',
            icon: <SparklesIcon className="h-8 w-8" />,
        },
        {
            page: 'learn/ingredients/sauces',
            title: 'Molhos',
            description: 'Do clássico San Marzano a bases brancas e pestos. A base do sabor.',
            icon: <FireIcon className="h-8 w-8" />,
        },
        {
            page: 'learn/ingredients/oils',
            title: 'Óleos e Azeites',
            description: 'O toque final. Entenda a função do azeite, óleos aromatizados e seu comportamento no calor.',
            icon: <OilIcon className="h-8 w-8" />,
        },
        {
            page: 'learn/ingredients/oils-spices',
            title: 'Ervas e Especiarias',
            description: 'A ciência aromática do orégano, manjericão e outras especiarias e seu uso correto.',
            icon: <SparklesIcon className="h-8 w-8" />,
        },
        {
            page: 'learn/ingredients/classic-combos',
            title: 'Combinações Clássicas',
            description: 'Margherita, Pepperoni, Quatro Queijos. As receitas que nunca falham.',
            icon: <BookOpenIcon className="h-8 w-8" />,
        },
        {
            page: 'learn/ingredients/bold-combos',
            title: 'Combinações Ousadas',
            description: 'Inspire-se com combinações criativas e surpreendentes para suas pizzas.',
            icon: <SparklesIcon className="h-8 w-8" />,
        },
        {
            page: 'learn/ingredients/pairing-tool',
            title: 'O que combina com...',
            description: 'Uma ferramenta interativa para descobrir as melhores combinações de ingredientes.',
            icon: <PuzzlePieceIcon className="h-8 w-8" />,
        },
        {
            page: 'learn/ingredients/ready-toppings',
            title: 'Recheios Prontos',
            description: 'Biblioteca de combinações prontas com pesos e medidas para usar na sua pizza.',
            icon: <ListBulletIcon className="h-8 w-8" />,
        },
    ];

    return (
        <div className="mx-auto max-w-7xl animate-[fadeIn_0.5s_ease-in-out]">
            <div className="text-center">
                <AcademicCapIcon className="mx-auto h-12 w-12 text-lime-500" />
                <h1 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
                    Guia de Ingredientes
                </h1>
                <p className="mt-4 max-w-3xl mx-auto text-lg text-slate-600 dark:text-slate-300">
                    Explore o universo de sabores que vão sobre a sua massa.
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
