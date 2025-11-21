
import React from 'react';
import { Page } from '@/types';
import TechnicalPageLayout from './TechnicalPageLayout';
import LearnTopicCard from '@/components/learn/LearnTopicCard';
import { SparklesIcon, BeakerIcon, CubeIcon, FermentationIcon, WaterIcon, SaltIcon, OilIcon } from '@/components/ui/Icons';

interface FundamentalsPageProps {
  onNavigate: (page: Page) => void;
}

const FundamentalsPage: React.FC<FundamentalsPageProps> = ({ onNavigate }) => {
    const topics = [
        { page: 'learn/oven-spring', title: 'Oven Spring', description: 'The science of the initial dough expansion in the oven.', icon: <SparklesIcon className="h-8 w-8" /> },
        { page: 'learn/fermentation-biochemistry', title: 'Fermentation Biochemistry', description: 'Yeast, bacteria, acids, and flavor creation.', icon: <BeakerIcon className="h-8 w-8" /> },
        { page: 'learn/crumb-structure', title: 'Crumb Structure', description: 'How alveoli form and the texture of the crumb.', icon: <CubeIcon className="h-8 w-8" /> },
        { page: 'learn/dough-aging', title: 'Dough Aging', description: 'Understand starch retrogradation and sensory maturation.', icon: <FermentationIcon className="h-8 w-8" /> },
        { page: 'learn/sugars-malts-enzymes', title: 'Sugars & Enzymes', description: 'How sugars, malts, and enzymes influence fermentation, color, and taste.', icon: <SparklesIcon className="h-8 w-8" /> },
        { page: 'learn/water', title: 'Water in Dough', description: 'The science of hardness, minerals, and the impact of water on gluten structure.', icon: <WaterIcon className="h-8 w-8" /> },
        { page: 'learn/salt', title: 'The Role of Salt', description: 'Chemical and structural functions of salt, far beyond flavor.', icon: <SaltIcon className="h-8 w-8" /> },
        { page: 'learn/fats', title: 'Fats in Dough', description: 'The impact of oils and fats on softness, structure, and texture.', icon: <OilIcon className="h-8 w-8" /> },
    ];

    return (
        <TechnicalPageLayout
            title="Dough Fundamentals"
            subtitle="The science of gluten, hydration, fermentation, and the ingredients that form the foundation."
        >
            <div className="not-prose grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {topics.map(topic => (
                    <LearnTopicCard
                        key={topic.page}
                        {...topic}
                        onClick={() => onNavigate(topic.page as Page)}
                    />
                ))}
            </div>
        </TechnicalPageLayout>
    );
};

export default FundamentalsPage;
