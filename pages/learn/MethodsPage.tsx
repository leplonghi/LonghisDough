import React from 'react';
import { Page } from '../../types';
import TechnicalPageLayout from './TechnicalPageLayout';
import LearnTopicCard from '../../components/learn/LearnTopicCard';
import { SunIcon, WrenchScrewdriverIcon, CubeIcon, SparklesIcon, FireIcon, BeakerIcon, ShieldCheckIcon } from '../../components/IconComponents';

interface MethodsPageProps {
  onNavigate: (page: Page) => void;
}

const MethodsPage: React.FC<MethodsPageProps> = ({ onNavigate }) => {
    const topics = [
        { page: 'learn/ambient-vs-cold-fermentation', title: 'Ambiente vs. Frio', description: 'Uma comparação científica sobre os métodos de fermentação.', icon: <SunIcon className="h-8 w-8" /> },
        { page: 'learn/mixing-techniques', title: 'Técnicas de Mistura', description: 'A ciência por trás da sova, dobras e método Rubaud.', icon: <WrenchScrewdriverIcon className="h-8 w-8" /> },
        { page: 'learn/balling-technique', title: 'Ciência do Boleamento', description: 'Como a tensão superficial organiza o glúten e retém o gás.', icon: <CubeIcon className="h-8 w-8" /> },
        { page: 'learn/sensory-maturation', title: 'Maturação Sensorial', description: 'A formação de aromas complexos em fermentações longas.', icon: <SparklesIcon className="h-8 w-8" /> },
        { page: 'learn/parbaking', title: 'Pré-assamento', description: 'A ciência e a técnica do pré-assamento e duplo assamento.', icon: <FireIcon className="h-8 w-8" /> },
        { page: 'learn/preferments', title: 'Pré-Fermentos', description: 'A ciência e os efeitos de Poolish, Biga e Massa Madre.', icon: <BeakerIcon className="h-8 w-8" /> },
        { page: 'learn/storage', title: 'Armazenamento da Massa', description: 'A ciência de como guardar a massa para controlar a fermentação e preservar a textura.', icon: <ShieldCheckIcon className="h-8 w-8" /> },
    ];

    return (
        <TechnicalPageLayout
            title="Técnicas & Métodos"
            subtitle="Domine a sova, as dobras, o boleamento, pré-fermentos e o controle de temperatura."
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