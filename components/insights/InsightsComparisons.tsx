
import React from 'react';
import { SparklesIcon } from '../IconComponents';

const ComparisonBlock: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
    <div className="rounded-lg bg-slate-50 dark:bg-slate-700/50 p-4">
        <h4 className="text-sm font-semibold text-slate-800 dark:text-slate-100 mb-2">{title}</h4>
        {children}
    </div>
);


const InsightsComparisons: React.FC = () => {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-800 h-full">
        <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-4 flex items-center gap-2">
            <SparklesIcon className="h-6 w-6 text-lime-500"/>
            Comparativos Inteligentes
        </h2>
        <div className="space-y-4">
            <ComparisonBlock title="Sua Hidratação Média vs. Comunidade (Napolitana)">
                <div className="space-y-2 text-xs">
                    <div>
                        <span>Você: 65%</span>
                        <div className="w-full bg-slate-200 rounded-full h-2.5 dark:bg-slate-600"><div className="bg-lime-500 h-2.5 rounded-full" style={{width: '65%'}}></div></div>
                    </div>
                    <div>
                        <span>Comunidade: 62%</span>
                        <div className="w-full bg-slate-200 rounded-full h-2.5 dark:bg-slate-600"><div className="bg-sky-500 h-2.5 rounded-full" style={{width: '62%'}}></div></div>
                    </div>
                </div>
            </ComparisonBlock>
            <ComparisonBlock title="Seu Tempo de Fermentação vs. Padrão Técnico (NY Style)">
                 <div className="space-y-2 text-xs">
                    <div>
                        <span>Você: 24h</span>
                        <div className="w-full bg-slate-200 rounded-full h-2.5 dark:bg-slate-600"><div className="bg-lime-500 h-2.5 rounded-full" style={{width: '33%'}}></div></div>
                    </div>
                    <div>
                        <span>Recomendado: 48-72h</span>
                         <div className="relative w-full bg-slate-200 rounded-full h-2.5 dark:bg-slate-600">
                             <div className="bg-sky-500 h-2.5 rounded-full absolute" style={{left: '66%', width: '33%'}}></div>
                         </div>
                    </div>
                </div>
            </ComparisonBlock>
            <ComparisonBlock title="Performance por Tipo de Farinha">
                <p className="text-sm text-slate-600 dark:text-slate-300">
                    Suas melhores avaliações (média <strong>4.8 <span className="text-yellow-400">★</span></strong>) são com farinha <strong>Tipo 00 Reforçada</strong>.
                </p>
            </ComparisonBlock>
        </div>
    </div>
  );
};

export default InsightsComparisons;
