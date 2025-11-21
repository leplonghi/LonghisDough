
import React from 'react';
import { useTranslation } from '@/i18n';
import { Page } from '@/types';
import { 
    AcademicCapIcon, 
    WrenchScrewdriverIcon,
    BeakerIcon,
    FireIcon,
    QuestionMarkCircleIcon,
    FlourIcon
} from '@/components/ui/Icons';
import LearnTopicCard from '@/components/learn/LearnTopicCard';

interface LearnPageProps {
  onNavigate: (page: Page) => void;
}

const LearnPage: React.FC<LearnPageProps> = ({ onNavigate }) => {
    const { t } = useTranslation();

    const categories = [
        {
            page: 'learn/fundamentals' as Page,
            title: 'Dough Fundamentals',
            description: 'The science of gluten, hydration, fermentation, and the ingredients that form the foundation.',
            icon: <BeakerIcon className="h-10 w-10" />,
        },
        {
            page: 'learn/methods' as Page,
            title: 'Techniques & Methods',
            description: 'Master kneading, folding, balling, preferments, and temperature control.',
            icon: <WrenchScrewdriverIcon className="h-10 w-10" />,
        },
        {
            page: 'learn/critical-ingredients' as Page,
            title: 'Critical Ingredients',
            description: 'A deep dive into flours, tomatoes, cheeses, meats, and their impact.',
            icon: <FlourIcon className="h-10 w-10" />,
        },
        {
            page: 'learn/ovens-heat' as Page,
            title: 'Ovens & Heat',
            description: 'The physics of baking. Understand conduction, convection, radiation, and your equipment.',
            icon: <FireIcon className="h-10 w-10" />,
        },
        {
            page: 'learn/troubleshooting-guide' as Page,
            title: 'Troubleshooting',
            description: 'Diagnose and fix common problems: sticky dough, pale crust, and more.',
            icon: <QuestionMarkCircleIcon className="h-10 w-10" />,
        },
    ];

    return (
        <div className="mx-auto max-w-7xl animate-[fadeIn_0.5s_ease-in-out]">
            <div className="text-center mb-12">
                <AcademicCapIcon className="mx-auto h-12 w-12 text-lime-500" />
                <h1 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
                    {t('learn.title')}
                </h1>
                <p className="mt-4 max-w-3xl mx-auto text-lg text-slate-600 dark:text-slate-300">
                    {t('learn.subtitle')}
                </p>
            </div>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                {categories.map((cat, index) => (
                    <div 
                        key={cat.page}
                        className={`
                            ${categories.length % 3 === 2 && index === categories.length - 2 ? 'lg:col-start-1' : ''}
                            ${categories.length % 2 === 1 && index === categories.length - 1 ? 'md:col-span-2 lg:col-span-1 lg:col-start-2' : ''}
                        `}
                    >
                         <LearnTopicCard {...cat} onClick={() => onNavigate(cat.page)} />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default LearnPage;
