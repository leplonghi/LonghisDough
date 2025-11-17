import React from 'react';
import { Page } from '../../types';
import TechnicalPageLayout from './TechnicalPageLayout';
import LearnTopicCard from '../../components/learn/LearnTopicCard';
import { SparklesIcon, BeakerIcon, CubeIcon, FermentationIcon, WaterIcon, SaltIcon, OilIcon } from '../../components/IconComponents';

interface FundamentalsPageProps {
  onNavigate: (page: Page) => void;
}

const FundamentalsPage: React.FC<FundamentalsPageProps> = ({ onNavigate }) => {
    const topics = [
        { page: 'learn/oven-spring', title: 'Oven Spring', description: 'A ciência da expansão inicial da massa no forno.', icon: <SparklesIcon className="h-8 w-8" /> },
        { page: 'learn/fermentation-biochemistry', title: 'Bioquímica da Fermentação', description: 'Leveduras, bactérias, ácidos e a criação de sabor.', icon: <BeakerIcon className="h-8 w-8" /> },
        { page: 'learn/crumb-structure', title: 'Estrutura Interna (Crumb)', description: 'Como se formam os alvéolos e a textura do miolo.', icon: <CubeIcon className="h-8 w-8" /> },
        { page: 'learn/dough-aging', title: 'Envelhecimento da Massa', description: 'Entenda a retrogradação do amido e a maturação sensorial.', icon: <FermentationIcon className="h-8 w-8" /> },
        { page: 'learn/sugars-malts-enzymes', title: 'Açúcares e Enzimas', description: 'Como açúcares, maltes e enzimas influenciam fermentação, cor e sabor.', icon: <SparklesIcon className="h-8 w-8" /> },
        { page: 'learn/water', title: 'Água na Massa', description: 'A ciência da dureza, minerais e o impacto da água na estrutura do glúten.', icon: <WaterIcon className="h-8 w-8" /> },
        { page: 'learn/salt', title: 'O Papel do Sal', description: 'Funções químicas e estruturais do sal, muito além do sabor.', icon: <SaltIcon className="h-8 w-8" /> },
        { page: 'learn/fats', title: 'Gorduras na Massa', description: 'O impacto de óleos e gorduras na maciez, estrutura e textura.', icon: <OilIcon className="h-8 w-8" /> },
    ];

    return (
        <TechnicalPageLayout
            title="Fundamentos da Massa"
            subtitle="A ciência do glúten, hidratação, fermentação e os ingredientes que formam a base de tudo."
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