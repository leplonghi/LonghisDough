import React, { useState } from 'react';
import TechnicalPageLayout from './learn/TechnicalPageLayout';
import { BeakerIcon, LightBulbIcon, SparklesIcon } from '../components/IconComponents';

const DoughbotPage: React.FC = () => {
  const [problem, setProblem] = useState('');
  const [description, setDescription] = useState('');

  const commonProblems = [
    { value: '', label: 'Selecione um problema comum...' },
    { value: 'sticky', label: 'Massa muito mole / grudenta' },
    { value: 'tearing', label: 'Massa rasgando ao abrir' },
    { value: 'no_rise', label: 'Massa não cresceu' },
    { value: 'dense', label: 'Miolo denso / sem alvéolos' },
    { value: 'gummy', label: 'Base crua / "gum line"' },
    { value: 'shrinking', label: 'Massa encolhendo / "snap-back"' },
  ];

  // TODO: Implementar lógica de diagnóstico real.
  // A lógica será baseada em uma base de conhecimento com referências de fontes
  // confiáveis como AVPN, King Arthur Baking, ChainBaker, Modernist Pizza/Bread, etc.
  // Nenhuma recomendação será inventada ou gerada por IA sem validação.
  const handleDiagnose = () => {
    console.log('Diagnosing:', { problem, description });
    // Placeholder for future API call or local logic
  };

  return (
    <TechnicalPageLayout
      title="Massabo"
      subtitle="Analise sua massa, entenda o que precisa ajustar."
      showReferencesSection
    >
      <div className="space-y-8">
        {/* Input Section */}
        <div className="rounded-lg border border-slate-200 bg-slate-50 p-6">
          <h3 className="text-xl font-semibold text-slate-800 mb-4">
            1. Descreva seu problema
          </h3>
          <div className="space-y-4">
            <div>
              <label htmlFor="problem-select" className="block text-sm font-medium text-slate-700">
                Problema Comum (opcional)
              </label>
              <select
                id="problem-select"
                value={problem}
                onChange={(e) => setProblem(e.target.value)}
                className="mt-1 block w-full rounded-md border-slate-300 bg-white py-2 px-3 shadow-sm focus:border-lime-500 focus:outline-none focus:ring-lime-500 sm:text-sm"
              >
                {commonProblems.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="problem-description" className="block text-sm font-medium text-slate-700">
                Descrição Detalhada
              </label>
              <textarea
                id="problem-description"
                rows={4}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="mt-1 block w-full rounded-md border-slate-300 bg-white py-2 px-3 shadow-sm focus:border-lime-500 focus:outline-none focus:ring-lime-500 sm:text-sm"
                placeholder="Ex: Minha massa de 68% de hidratação ficou 24h na geladeira, mas está rasgando muito fácil ao tentar abrir..."
              />
            </div>
            <button
              onClick={handleDiagnose}
              className="flex w-full items-center justify-center gap-2 rounded-md bg-lime-500 py-2.5 px-4 text-sm font-semibold text-white shadow-sm hover:bg-lime-600"
            >
              <SparklesIcon className="h-5 w-5" />
              Diagnosticar Problema
            </button>
          </div>
        </div>

        {/* Results Section Placeholder */}
        <div className="space-y-6">
            <h3 className="text-2xl font-bold text-slate-800">
                2. Diagnóstico Preliminar
            </h3>
            <div className="rounded-lg bg-white p-6 shadow-sm ring-1 ring-slate-200/50">
                <h4 className="flex items-center gap-2 text-lg font-semibold text-slate-800">
                    <BeakerIcon className="h-5 w-5 text-slate-500" />
                    Possíveis Causas
                </h4>
                <ul className="mt-4 list-disc space-y-2 pl-5 text-slate-600">
                    {/* TODO: Preencher dinamicamente com base no diagnóstico */}
                    <li>O diagnóstico sobre as possíveis causas do problema aparecerá aqui.</li>
                    <li>Cada causa será explicada com base em ciência da panificação.</li>
                </ul>
            </div>
             <div className="rounded-lg bg-white p-6 shadow-sm ring-1 ring-slate-200/50">
                <h4 className="flex items-center gap-2 text-lg font-semibold text-slate-800">
                    <LightBulbIcon className="h-5 w-5 text-yellow-400" />
                    Soluções Sugeridas
                </h4>
                <ul className="mt-4 list-disc space-y-2 pl-5 text-slate-600">
                    {/* TODO: Preencher dinamicamente com base no diagnóstico */}
                    <li>As sugestões de correção, baseadas em fontes técnicas, aparecerão aqui.</li>
                    <li>As soluções incluirão ajustes na receita e no processo.</li>
                </ul>
            </div>
        </div>
      </div>
    </TechnicalPageLayout>
  );
};

export default DoughbotPage;
