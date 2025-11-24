
import React from 'react';
import { Page } from '@/types';
import TechnicalPageLayout from './TechnicalPageLayout';
import LearnTopicCard from '@/components/learn/LearnTopicCard';
import { SunIcon, WrenchScrewdriverIcon, CubeIcon, SparklesIcon, FireIcon, BeakerIcon, ShieldCheckIcon, ClockIcon } from '@/components/ui/Icons';

interface MethodsPageProps {
  onNavigate: (page: Page) => void;
}

const MethodsPage: React.FC<MethodsPageProps> = ({ onNavigate }) => {
    const topics = [
        { page: 'learn/autolyse', title: 'Autolyse', description: 'The passive rest technique for gluten development and extensibility.', icon: <ClockIcon className="h-8 w-8" /> },
        { page: 'learn/ambient-vs-cold-fermentation', title: 'Ambient vs. Cold', description: 'A scientific comparison of fermentation methods.', icon: <SunIcon className="h-8 w-8" /> },
        { page: 'learn/mixing-techniques', title: 'Mixing Techniques', description: 'The science behind kneading, folding, and the Rubaud method.', icon: <WrenchScrewdriverIcon className="h-8 w-8" /> },
        { page: 'learn/balling-technique', title: 'Balling Science', description: 'How surface tension organizes gluten and retains gas.', icon: <CubeIcon className="h-8 w-8" /> },
        { page: 'learn/sensory-maturation', title: 'Sensory Maturation', description: 'The formation of complex aromas in long fermentations.', icon: <SparklesIcon className="h-8 w-8" /> },
        { page: 'learn/parbaking', title: 'Parbaking', description: 'The science and technique of parbaking and double baking.', icon: <FireIcon className="h-8 w-8" /> },
        { page: 'learn/preferments', title: 'Preferments', description: 'The science and effects of Poolish, Biga, and Sourdough.', icon: <BeakerIcon className="h-8 w-8" /> },
        { page: 'learn/storage', title: 'Dough Storage', description: 'The science of storing dough to control fermentation and texture.', icon: <ShieldCheckIcon className="h-8 w-8" /> },
    ];

    return (
        <TechnicalPageLayout
            title="Techniques & Methods"
            subtitle="Master kneading, folding, balling, preferments, and temperature control."
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

export default MethodsPage;
