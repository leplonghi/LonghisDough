
import React from 'react';
import { Page } from '@/types';
import TechnicalPageLayout from './TechnicalPageLayout';
import LearnTopicCard from '@/components/learn/LearnTopicCard';
import { FireIcon, WrenchScrewdriverIcon } from '@/components/ui/Icons';

interface OvensHeatPageProps {
  onNavigate: (page: Page) => void;
}

const OvensHeatPage: React.FC<OvensHeatPageProps> = ({ onNavigate }) => {
    const topics = [
        { page: 'learn/oven-science', title: 'Oven Science', description: 'Understand how conduction, convection, and radiation transform your dough.', icon: <FireIcon className="h-8 w-8" /> },
        { page: 'learn/equipment', title: 'Equipment', description: 'The impact of peels, stones, steel, and other tools on the final result.', icon: <WrenchScrewdriverIcon className="h-8 w-8" /> },
    ];

    return (
        <TechnicalPageLayout
            title="Ovens & Heat"
            subtitle="The physics of baking. Understand conduction, convection, radiation, and the role of your equipment."
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

export default OvensHeatPage;
