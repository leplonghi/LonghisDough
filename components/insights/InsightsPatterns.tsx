import React from 'react';
import { LightBulbIcon } from '../IconComponents';

const PatternItem: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <li className="flex items-start gap-3">
        <LightBulbIcon className="h-5 w-5 flex-shrink-0 text-yellow-400 mt-0.5" />
        <p className="text-sm text-slate-600">{children}</p>
    </li>
);

const InsightsPatterns: React.FC = () => {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm h-full">
        <h2 className="text-xl font-bold text-slate-800 mb-4">Consistência & Evolução</h2>
        <ul className="space-y-4">
            <PatternItem>Você tende a usar hidratação <strong>+3% maior</strong> em dias quentes (&gt;28°C).</PatternItem>
            <PatternItem>Suas fornadas com <strong>nota 5 estrelas</strong> usam, em média, <strong>48 horas</strong> de fermentação a frio.</PatternItem>
            <PatternItem>Você usa mais o prefermento <strong>Biga</strong> aos fins de semana.</PatternItem>
             <PatternItem>Seu estilo mais consistente é a <strong>Pizza Napolitana</strong>, com baixa variação nos resultados.</PatternItem>
        </ul>
    </div>
  );
};

export default InsightsPatterns;
