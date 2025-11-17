import React from 'react';
import { Page } from '../../types';
import { AcademicCapIcon, ArrowTopRightOnSquareIcon } from '../IconComponents';

interface MyLabLearnCardProps {
  onNavigate: (page: Page) => void;
}

const LearnTopic: React.FC<{ title: string; description: string; onClick: () => void }> = ({ title, description, onClick }) => (
    <div className="rounded-lg bg-slate-50 p-4 dark:bg-slate-700/50">
        <div>
            <h4 className="font-semibold text-slate-800 dark:text-slate-100">{title}</h4>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">{description}</p>
        </div>
        <button onClick={onClick} className="mt-3 text-sm font-semibold text-lime-600 dark:text-lime-400 hover:underline flex items-center gap-1">
            Ler mais <ArrowTopRightOnSquareIcon className="h-4 w-4" />
        </button>
    </div>
);

const MyLabLearnCard: React.FC<MyLabLearnCardProps> = ({ onNavigate }) => {
  const handleNavigate = () => {
    onNavigate('learn');
  };

  return (
    <div className="rounded-lg bg-white p-6 shadow-sm ring-1 ring-slate-200/50 dark:border dark:border-slate-700/50 dark:bg-slate-800">
      <h2 className="text-lg font-bold text-slate-800 dark:text-slate-100 mb-4 flex items-center gap-2">
        <AcademicCapIcon className="h-6 w-6 text-lime-500" />
        Aprenda Rápido
      </h2>
      <div className="space-y-3">
        <LearnTopic 
            title="Hidratação explicada"
            description="Entenda como a água transforma sua massa."
            onClick={handleNavigate}
        />
        <LearnTopic 
            title="Controle de temperatura (DDT)"
            description="O segredo para uma fermentação previsível."
            onClick={handleNavigate}
        />
        <LearnTopic 
            title="Aço (Steel) vs. Pedra"
            description="Qual a melhor superfície para seu forno?"
            onClick={handleNavigate}
        />
      </div>
    </div>
  );
};

export default MyLabLearnCard;
