import React from 'react';
import { Page } from '../../types';
import TechnicalPageLayout from './TechnicalPageLayout';
import LearnTopicCard from '../../components/learn/LearnTopicCard';
import { QuestionMarkCircleIcon } from '../../components/IconComponents';

interface TroubleshootingGuidePageProps {
  onNavigate: (page: Page) => void;
}

const TroubleshootingGuidePage: React.FC<TroubleshootingGuidePageProps> = ({ onNavigate }) => {
    const topics = [
        { page: 'learn/troubleshooting', title: 'Massa Pegajosa', description: 'Diagnóstico e soluções para uma massa muito mole e difícil de manusear.', icon: <QuestionMarkCircleIcon className="h-8 w-8" /> },
        { page: 'learn/troubleshooting', title: 'Massa Seca ou Quebradiça', description: 'Entenda por que a massa não desenvolve elasticidade.', icon: <QuestionMarkCircleIcon className="h-8 w-8" /> },
        { page: 'learn/troubleshooting', title: 'Fermentação Insuficiente', description: 'Causas e correções para uma massa que não cresce o esperado.', icon: <QuestionMarkCircleIcon className="h-8 w-8" /> },
        { page: 'learn/troubleshooting', title: 'Crosta Pálida', description: 'Descubra por que sua pizza não está dourando no forno.', icon: <QuestionMarkCircleIcon className="h-8 w-8" /> },
        { page: 'learn/troubleshooting', title: 'Queijo Escorrendo Óleo', description: 'A ciência por trás do "oil-out" e como controlá-lo.', icon: <QuestionMarkCircleIcon className="h-8 w-8" /> },
        { page: 'learn/troubleshooting', title: 'Centro Encharcado (Gum Line)', description: 'Como evitar a camada de massa crua sob a cobertura.', icon: <QuestionMarkCircleIcon className="h-8 w-8" /> },
    ];

    return (
        <TechnicalPageLayout
            title="Solução de Problemas"
            subtitle="Diagnostique e corrija os problemas mais comuns: massa pegajosa, crosta pálida e mais."
        >
            <div className="not-prose grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {topics.map(topic => (
                    <LearnTopicCard
                        key={topic.title}
                        {...topic}
                        onClick={() => onNavigate(topic.page as Page)}
                    />
                ))}
            </div>
        </TechnicalPageLayout>
    );
};

export default TroubleshootingGuidePage;