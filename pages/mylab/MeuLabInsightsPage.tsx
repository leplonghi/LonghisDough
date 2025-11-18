import React from 'react';
import { Page } from '../../types';
import MyLabLayout from './MyLabLayout';

const InsightCard: React.FC<{
  title: string;
  description: string;
  linkText: string;
  onLinkClick: () => void;
}> = ({ title, description, linkText, onLinkClick }) => (
  <div className="rounded-xl border border-neutral-200 bg-white p-6 shadow-sm flex flex-col justify-between">
    <div>
      <h3 className="text-lg font-medium text-neutral-900">{title}</h3>
      <p className="mt-2 text-sm text-neutral-600">{description}</p>
    </div>
    <button onClick={onLinkClick} className="mt-4 text-sm font-semibold text-lime-600 hover:underline text-left">
      {linkText} &rarr;
    </button>
  </div>
);

const MeuLabInsightsPage: React.FC<{ onNavigate: (page: Page) => void }> = ({ onNavigate }) => {
    return (
        <MyLabLayout activePage="mylab/insights" onNavigate={onNavigate}>
            <div className="mb-6">
                <h1 className="text-2xl font-semibold tracking-tight text-neutral-900">Insights</h1>
                <p className="mt-1 text-sm text-neutral-500">
                    Analise os padrões e tendências das suas produções.
                </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <InsightCard
                    title="Massas Favoritas"
                    description="Placeholder: Aqui aparecerá a sua receita de massa mais utilizada, com base nas suas fornadas."
                    linkText="Ver Minhas Massas"
                    onLinkClick={() => onNavigate('mylab/massas')}
                />
                <InsightCard
                    title="Farinhas Favoritas"
                    description="Placeholder: A farinha que você mais registra em suas fornadas ou define como padrão será destacada aqui."
                    linkText="Ir para Minhas Farinhas"
                    onLinkClick={() => onNavigate('mylab/farinhas')}
                />
                <InsightCard
                    title="Estilos Mais Usados"
                    description="Placeholder: Descubra qual estilo de pizza ou pão você mais tem explorado em suas fornadas."
                    linkText="Ver Minhas Fornadas"
                    onLinkClick={() => onNavigate('mylab/fornadas')}
                />
                 <InsightCard
                    title="Notas do Diário Sensorial"
                    description="Placeholder: Um resumo das palavras-chave mais comuns em suas anotações, como 'crocante' ou 'ácido'."
                    linkText="Abrir Diário Sensorial"
                    onLinkClick={() => onNavigate('mylab/diario-sensorial')}
                />
                <InsightCard
                    title="Erros Comuns"
                    description="Placeholder: Identifique padrões nos problemas que você registra, como 'massa rasgou' ou 'base crua'."
                    linkText="Ver Minhas Fornadas"
                    onLinkClick={() => onNavigate('mylab/fornadas')}
                />
                <InsightCard
                    title="Sugestões do MyLab"
                    description="Placeholder: Com base nos seus dados, o MyLab poderá sugerir experimentos, como 'Tente comparar A vs B'."
                    linkText="Ir para Comparações"
                    onLinkClick={() => onNavigate('mylab/comparacoes')}
                />
            </div>
        </MyLabLayout>
    );
};

export default MeuLabInsightsPage;