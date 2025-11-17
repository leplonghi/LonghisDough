import React, { useState } from 'react';
import TechnicalPageLayout from './learn/TechnicalPageLayout';
import { FireIcon, LightBulbIcon, SparklesIcon, BeakerIcon } from '../components/IconComponents';

const OvenAnalysisPage: React.FC = () => {
    // TODO: A lógica de cálculo e recomendações será baseada em
    // literatura técnica de pizzarias, fabricantes de fornos e referências
    // como AVPN, Serious Eats, etc. Nenhuma recomendação será inventada.

  return (
    <TechnicalPageLayout
        title="FormulaLab"
        subtitle="Ferramenta para entender o comportamento do seu forno e sugerir ajustes de massa e técnicas, com base em referências reais."
        showReferencesSection
    >
        <div className="space-y-8">
            {/* Input Section */}
            <div className="rounded-lg border border-slate-200 bg-slate-50 p-6 dark:border-slate-700 dark:bg-slate-700/50">
                <h3 className="text-xl font-semibold text-slate-800 dark:text-slate-100 mb-4">
                    1. Descreva seu Forno
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                        <label htmlFor="oven-type" className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                            Tipo de Forno
                        </label>
                        <select
                            id="oven-type"
                            className="mt-1 block w-full rounded-md border-slate-300 bg-white py-2 px-3 shadow-sm focus:border-lime-500 focus:outline-none focus:ring-lime-500 dark:border-slate-600 dark:bg-slate-900 dark:text-white sm:text-sm"
                        >
                            <option>Doméstico a Gás</option>
                            <option>Doméstico Elétrico</option>
                            <option>Forno tipo Ooni (Portátil)</option>
                            <option>A Lenha</option>
                            <option>Outro</option>
                        </select>
                    </div>
                    <div>
                        <label htmlFor="surface-type" className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                            Tipo de Superfície
                        </label>
                        <select
                            id="surface-type"
                            className="mt-1 block w-full rounded-md border-slate-300 bg-white py-2 px-3 shadow-sm focus:border-lime-500 focus:outline-none focus:ring-lime-500 dark:border-slate-600 dark:bg-slate-900 dark:text-white sm:text-sm"
                        >
                            <option>Pedra Refratária</option>
                            <option>Aço (Baking Steel)</option>
                            <option>Biscotto (Argila)</option>
                            <option>Assadeira / Grade</option>
                        </select>
                    </div>
                     <div>
                        <label htmlFor="max-temp" className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                            Temperatura Máxima (°C)
                        </label>
                        <input type="number" id="max-temp" placeholder="ex: 280" className="mt-1 block w-full rounded-md border-slate-300 bg-white py-2 px-3 shadow-sm focus:border-lime-500 focus:outline-none focus:ring-lime-500 dark:border-slate-600 dark:bg-slate-900 dark:text-white sm:text-sm" />
                    </div>
                    <div>
                        <label htmlFor="preheat-time" className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                            Pré-aquecimento (min)
                        </label>
                        <input type="number" id="preheat-time" placeholder="ex: 45" className="mt-1 block w-full rounded-md border-slate-300 bg-white py-2 px-3 shadow-sm focus:border-lime-500 focus:outline-none focus:ring-lime-500 dark:border-slate-600 dark:bg-slate-900 dark:text-white sm:text-sm" />
                    </div>
                    <div className="sm:col-span-2">
                        <label htmlFor="bake-time" className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                            Tempo médio de assamento (min)
                        </label>
                        <input type="number" id="bake-time" placeholder="ex: 6" className="mt-1 block w-full rounded-md border-slate-300 bg-white py-2 px-3 shadow-sm focus:border-lime-500 focus:outline-none focus:ring-lime-500 dark:border-slate-600 dark:bg-slate-900 dark:text-white sm:text-sm" />
                    </div>
                </div>
                 <button
                    onClick={() => { /* Placeholder */ }}
                    className="mt-6 flex w-full items-center justify-center gap-2 rounded-md bg-lime-500 py-2.5 px-4 text-sm font-semibold text-white shadow-sm hover:bg-lime-600"
                    >
                    <SparklesIcon className="h-5 w-5" />
                    Analisar meu Forno
                </button>
            </div>

            {/* Results Section Placeholder */}
             <div className="space-y-6">
                <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-100">
                    2. Análise e Recomendações
                </h3>
                <div className="rounded-lg bg-white p-6 shadow-sm ring-1 ring-slate-200/50 dark:border dark:border-slate-700/50 dark:bg-slate-800">
                    <h4 className="flex items-center gap-2 text-lg font-semibold text-slate-800 dark:text-slate-200">
                        <FireIcon className="h-5 w-5 text-slate-500" />
                        Perfil Térmico Estimado
                    </h4>
                    <p className="mt-4 text-slate-600 dark:text-slate-300">
                        O perfil térmico estimado do seu forno, incluindo capacidade de retenção de calor e velocidade de transferência, aparecerá aqui.
                    </p>
                </div>
                <div className="rounded-lg bg-white p-6 shadow-sm ring-1 ring-slate-200/50 dark:border dark:border-slate-700/50 dark:bg-slate-800">
                    <h4 className="flex items-center gap-2 text-lg font-semibold text-slate-800 dark:text-slate-200">
                        <LightBulbIcon className="h-5 w-5 text-yellow-400" />
                        Sugestões de Estilos de Pizza Compatíveis
                    </h4>
                    <ul className="mt-4 list-disc space-y-2 pl-5 text-slate-600 dark:text-slate-300">
                        <li>Sugestões de estilos de pizza (ex: NY Style, Napolitana adaptada) ideais para o seu equipamento serão listadas aqui.</li>
                    </ul>
                </div>
                 <div className="rounded-lg bg-white p-6 shadow-sm ring-1 ring-slate-200/50 dark:border dark:border-slate-700/50 dark:bg-slate-800">
                    <h4 className="flex items-center gap-2 text-lg font-semibold text-slate-800 dark:text-slate-200">
                        <BeakerIcon className="h-5 w-5 text-slate-500" />
                        Observações sobre Hidratação e Tempo
                    </h4>
                    <p className="mt-4 text-slate-600 dark:text-slate-300">
                        Recomendações técnicas sobre como ajustar a hidratação da massa e os tempos de fermentação para otimizar o resultado no seu forno aparecerão aqui.
                    </p>
                </div>
            </div>
        </div>
    </TechnicalPageLayout>
  );
};

export default OvenAnalysisPage;
