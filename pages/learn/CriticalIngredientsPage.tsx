import React from 'react';
import { Page } from '../../types';
import TechnicalPageLayout from './TechnicalPageLayout';
import LearnTopicCard from '../../components/learn/LearnTopicCard';
import { FireIcon, BeakerIcon, CubeIcon, TagIcon, WaterIcon, FlourIcon } from '../../components/IconComponents';

interface CriticalIngredientsPageProps {
  onNavigate: (page: Page) => void;
}

const CriticalIngredientsPage: React.FC<CriticalIngredientsPageProps> = ({ onNavigate }) => {
    const topics = [
        { page: 'learn/ingredients/flours', title: 'Farinhas', description: 'A ciência por trás da força (W), P/L e tipos de moagem.', icon: <FlourIcon className="h-8 w-8" /> },
        { page: 'learn/ingredients/yeasts', title: 'Fermentos', description: 'Leveduras comerciais, levain e a ciência da fermentação.', icon: <BeakerIcon className="h-8 w-8" /> },
        { page: 'learn/tomato-preservation', title: 'A Ciência do Tomate', description: 'Acidez, doçura e conservação para criar o molho perfeito.', icon: <FireIcon className="h-8 w-8" /> },
        { page: 'learn/white-sauces', title: 'Molhos Brancos e Emulsões', description: 'A ciência por trás de bases cremosas e seu comportamento no calor.', icon: <BeakerIcon className="h-8 w-8" /> },
        { page: 'learn/special-sauces', title: 'Molhos Especiais', description: 'O uso técnico de pesto, ricota e outras bases na pizza.', icon: <TagIcon className="h-8 w-8" /> },
        { page: 'learn/low-moisture-cheeses', title: 'Queijos Low-Moisture', description: 'A ciência do derretimento estável e do sabor concentrado.', icon: <CubeIcon className="h-8 w-8" /> },
        { page: 'learn/smoked-cheeses', title: 'Queijos Defumados', description: 'A física da fumaça e o impacto aromático na pizza.', icon: <FireIcon className="h-8 w-8" /> },
        { page: 'learn/cured-meats', title: 'Carnes Curadas', description: 'Entenda a ciência da cura e como ela transforma o sabor.', icon: <TagIcon className="h-8 w-8" /> },
        { page: 'learn/smoked-aromatics', title: 'Defumados e Aromáticos', description: 'O uso de ingredientes de sabor intenso e o risco de saturação.', icon: <BeakerIcon className="h-8 w-8" /> },
        { page: 'learn/water-rich-vegetables', title: 'Vegetais Ricos em Água', description: 'Como controlar a umidade de cogumelos, abobrinha e outros.', icon: <WaterIcon className="h-8 w-8" /> },
        { page: 'learn/caramelizable-vegetables', title: 'Vegetais Caramelizáveis', description: 'A ciência dos açúcares em cebolas, pimentões e seu impacto no sabor.', icon: <FireIcon className="h-8 w-8" /> },
    ];

    return (
        <TechnicalPageLayout
            title="Ingredientes Críticos"
            subtitle="Um mergulho profundo em farinhas, tomates, queijos, carnes e o impacto de cada um."
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

export default CriticalIngredientsPage;