
import React from 'react';
import { useTranslation } from '../../i18n';
import { Page } from '../../types';
import { 
    AcademicCapIcon, 
    WrenchScrewdriverIcon,
    FermentationIcon,
    SparklesIcon,
    QuestionMarkCircleIcon,
    FlourIcon,
    FlaskIcon,
    BookOpenIcon,
    ListBulletIcon,
    FireIcon,
    BeakerIcon,
    SunIcon,
    CubeIcon,
    ShieldCheckIcon,
    WaterIcon,
    SaltIcon,
    OilIcon,
    TagIcon,
    GlobeAltIcon,
} from './IconComponents';

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
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">{description}</p>
        </div>
        <p className="mt-4 text-sm font-semibold text-slate-500 dark:text-slate-400 group-hover:text-lime-500 transition-colors">
            Explorar &rarr;
        </p>
    </button>
);


const LearnPage: React.FC<LearnPageProps> = ({ onNavigate }) => {
    const { t } = useTranslation();
    
    const categories: { page: Page; title: string; description: string; icon: React.ReactNode }[] = [
        {
            page: 'learn/oven-spring',
            title: 'Oven Spring',
            description: 'A ciência da expansão inicial da massa no forno.',
            icon: <SparklesIcon className="h-8 w-8" />,
        },
        {
            page: 'learn/fermentation-biochemistry',
            title: 'Bioquímica da Fermentação',
            description: 'Leveduras, bactérias, ácidos e a criação de sabor.',
            icon: <BeakerIcon className="h-8 w-8" />,
        },
        {
            page: 'learn/crumb-structure',
            title: 'Estrutura Interna (Crumb)',
            description: 'Como se formam os alvéolos e a textura do miolo.',
            icon: <CubeIcon className="h-8 w-8" />,
        },
        {
            page: 'learn/dough-aging',
            title: 'Envelhecimento da Massa',
            description: 'Entenda a retrogradação do amido e a maturação sensorial.',
            icon: <FermentationIcon className="h-8 w-8" />,
        },
        {
            page: 'learn/ambient-vs-cold-fermentation',
            title: 'Ambiente vs. Frio',
            description: 'Uma comparação científica sobre os métodos de fermentação.',
            icon: <SunIcon className="h-8 w-8" />,
        },
        {
            page: 'learn/mixing-techniques',
            title: 'Técnicas de Mistura',
            description: 'A ciência por trás da sova, dobras e método Rubaud.',
            icon: <WrenchScrewdriverIcon className="h-8 w-8" />,
        },
        {
            page: 'learn/balling-technique',
            title: 'Ciência do Boleamento',
            description: 'Como a tensão superficial organiza o glúten e retém o gás.',
            icon: <CubeIcon className="h-8 w-8" />,
        },
        {
            page: 'learn/sensory-maturation',
            title: 'Maturação Sensorial',
            description: 'A formação de aromas complexos em fermentações longas.',
            icon: <SparklesIcon className="h-8 w-8" />,
        },
        {
            page: 'learn/parbaking',
            title: 'Pré-assamento',
            description: 'A ciência e a técnica do pré-assamento e duplo assamento.',
            icon: <FireIcon className="h-8 w-8" />,
        },
        {
            page: 'learn/water',
            title: 'Água na Massa',
            description: 'A ciência da dureza, minerais e o impacto da água na estrutura do glúten.',
            icon: <WaterIcon className="h-8 w-8" />,
        },
        {
            page: 'learn/salt',
            title: 'O Papel do Sal',
            description: 'Funções químicas e estruturais do sal, muito além do sabor.',
            icon: <SaltIcon className="h-8 w-8" />,
        },
        {
            page: 'learn/sugars-malts-enzymes',
            title: 'Açúcares e Enzimas',
            description: 'Como açúcares, maltes e enzimas influenciam fermentação, cor e sabor.',
            icon: <SparklesIcon className="h-8 w-8" />,
        },
        {
            page: 'learn/fats',
            title: 'Gorduras na Massa',
            description: 'O impacto de óleos e gorduras na maciez, estrutura e textura.',
            icon: <OilIcon className="h-8 w-8" />,
        },
        {
            page: 'learn/tomato-preservation',
            title: 'A Ciência do Tomate',
            description: 'Acidez, doçura e conservação para criar o molho perfeito.',
            icon: <FireIcon className="h-8 w-8" />,
        },
        {
            page: 'learn/white-sauces',
            title: 'Molhos Brancos e Emulsões',
            description: 'A ciência da consistência em bases cremosas para pizza.',
            icon: <BeakerIcon className="h-8 w-8" />,
        },
        {
            page: 'learn/special-sauces',
            title: 'Molhos Especiais',
            description: 'O uso técnico de pesto, ricota e outras bases na pizza.',
            icon: <TagIcon className="h-8 w-8" />,
        },
        {
            page: 'learn/low-moisture-cheeses',
            title: 'Queijos Low-Moisture',
            description: 'A ciência do derretimento estável e do sabor concentrado.',
            icon: <CubeIcon className="h-8 w-8" />,
        },
        {
            page: 'learn/smoked-cheeses',
            title: 'Queijos Defumados',
            description: 'A física da fumaça e o impacto aromático na pizza.',
            icon: <FireIcon className="h-8 w-8" />,
        },
        {
            page: 'learn/cured-meats',
            title: 'Carnes Curadas',
            description: 'Entenda a ciência da cura e como ela transforma o sabor.',
            icon: <TagIcon className="h-8 w-8" />,
        },
        {
            page: 'learn/smoked-aromatics',
            title: 'Defumados e Aromáticos',
            description: 'O uso de ingredientes de sabor intenso e o risco de saturação.',
            icon: <SparklesIcon className="h-8 w-8" />,
        },
        {
            page: 'learn/water-rich-vegetables',
            title: 'Vegetais Ricos em Água',
            description: 'Como controlar a umidade de cogumelos, abobrinha e outros.',
            icon: <WaterIcon className="h-8 w-8" />,
        },
        {
            page: 'learn/caramelizable-vegetables',
            title: 'Vegetais Caramelizáveis',
            description: 'A ciência dos açúcares em cebolas, pimentões e seu impacto no sabor.',
            icon: <FireIcon className="h-8 w-8" />,
        },
        {
            page: 'learn/regional-combos',
            title: 'Combinações Regionais',
            description: 'Uma viagem cultural pelas pizzas do mundo.',
            icon: <GlobeAltIcon className="h-8 w-8" />,
        },
        {
            page: 'learn/sensory-profiles',
            title: 'Perfis Sensoriais',
            description: 'O equilíbrio de umami, gordura, acidez e doçura na pizza.',
            icon: <BeakerIcon className="h-8 w-8" />,
        },
        {
            page: 'learn/techniques',
            title: 'Técnicas Gerais',
            description: 'Aprenda sobre autólise, stretch & fold, no-knead e mais.',
            icon: <WrenchScrewdriverIcon className="h-8 w-8" />,
        },
        {
            page: 'learn/fermentation',
            title: 'Fermentação',
            description: 'Domine a arte da maturação a frio e controle do levain.',
            icon: <FermentationIcon className="h-8 w-8" />,
        },
        {
            page: 'learn/preferments',
            title: 'Pré-Fermentos',
            description: 'A ciência e os efeitos de Poolish, Biga e Massa Madre.',
            icon: <BeakerIcon className="h-8 w-8" />,
        },
        {
            page: 'learn/dough-science',
            title: 'Ciência da Massa',
            description: 'Entenda a rede de glúten, hidratação e a importância da temperatura (DDT).',
            icon: <SparklesIcon className="h-8 w-8" />,
        },
        {
            page: 'learn/oven-science',
            title: 'A Ciência do Forno',
            description: 'Entenda como condução, convecção e radiação transformam sua massa.',
            icon: <FireIcon className="h-8 w-8" />,
        },
        {
            page: 'learn/temperature-control',
            title: 'Controle de Temperatura',
            description: 'O segredo da consistência: entenda o DDT e como a temperatura afeta sua massa.',
            icon: <SunIcon className="h-8 w-8" />,
        },
        {
            page: 'learn/storage',
            title: 'Armazenamento da Massa',
            description: 'A ciência de como guardar a massa para controlar a fermentação e preservar a textura.',
            icon: <CubeIcon className="h-8 w-8" />,
        },
        {
            page: 'learn/hygiene-safety',
            title: 'Higiene e Segurança',
            description: 'Princípios sanitários para uma manipulação segura e responsável.',
            icon: <ShieldCheckIcon className="h-8 w-8" />,
        },
        {
            page: 'learn/equipment',
            title: 'Equipamentos',
            description: 'O impacto de pás, pedras, aço e outros utensílios no resultado final.',
            icon: <WrenchScrewdriverIcon className="h-8 w-8" />,
        },
        {
            page: 'learn/troubleshooting',
            title: 'Troubleshooting',
            description: 'Resolva problemas como massa que rasga, base crua e falta de crescimento.',
            icon: <QuestionMarkCircleIcon className="h-8 w-8" />,
        },
        {
            page: 'learn/ingredients',
            title: 'Ingredientes',
            description: 'Conheça os tipos de farinha, a função do sal, óleo e do fermento.',
            icon: <FlourIcon className="h-8 w-8" />,
        },
        {
            page: 'learn/chemistry-library',
            title: 'Biblioteca Química',
            description: 'Aprofunde-se nas reações enzimáticas e no papel dos micro-organismos.',
            icon: <FlaskIcon className="h-8 w-8" />,
        },
        {
            page: 'learn/style-guide',
            title: 'Guia de Estilos',
            description: 'Explore as características de pizzas como Napolitana, NY, Detroit e mais.',
            icon: <BookOpenIcon className="h-8 w-8" />,
        },
        {
            page: 'learn/glossary',
            title: 'Glossário',
            description: 'Um dicionário com os termos técnicos mais importantes da panificação.',
            icon: <ListBulletIcon className="h-8 w-8" />,
        },
    ];

    return (
        <div className="mx-auto max-w-7xl animate-[fadeIn_0.5s_ease-in-out]">
            <div className="text-center">
                <AcademicCapIcon className="mx-auto h-12 w-12 text-lime-500" />
                <h1 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
                    {t('learn.title')}
                </h1>
                <p className="mt-4 max-w-3xl mx-auto text-lg text-slate-600 dark:text-slate-300">
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
