import React from 'react';
import { Page } from '../../types';
import TechnicalPageLayout from './TechnicalPageLayout';
import LearnTopicCard from '../../components/learn/LearnTopicCard';
import { FireIcon, WrenchScrewdriverIcon } from '../../components/IconComponents';

interface OvensHeatPageProps {
  onNavigate: (page: Page) => void;
}

const OvensHeatPage: React.FC<OvensHeatPageProps> = ({ onNavigate }) => {
    const topics = [
        { page: 'learn/oven-science', title: 'A Ciência do Forno', description: 'Entenda como condução, convecção e radiação transformam sua massa.', icon: <FireIcon className="h-8 w-8" /> },
        { page: 'learn/equipment', title: 'Equipamentos', description: 'O impacto de pás, pedras, aço e outros utensílios no resultado final.', icon: <WrenchScrewdriverIcon className="h-8 w-8" /> },
    ];

    return (
        <TechnicalPageLayout
            title="Fornos & Calor"
            subtitle="A física do assamento. Entenda condução, convecção, radiação e o papel do seu equipamento."
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