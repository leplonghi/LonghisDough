import React, { useState } from 'react';
import TechnicalPageLayout from './learn/TechnicalPageLayout';
import { FireIcon, LightBulbIcon, SparklesIcon, BeakerIcon } from '../components/IconComponents';

export const OvenAnalysisPage: React.FC = () => {
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
            <div className="rounded-lg border border-slate-200 bg-slate-50 p-6">
                <h3 className="text-xl font-semibold text-slate-800 mb-4">
                    1. Descreva seu Forno
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                        <label htmlFor="oven-type" className="block text-sm font-medium text-slate-700">
                            Tipo de Forno
                        </label>
                        <select
                            id="oven-type"
                            className="mt-1 block w-full rounded-md border-slate-300 bg-white py-2 px-3 shadow-sm focus:border-lime-500 focus:outline-none focus:ring-lime-500 sm:text-sm"
                        >
                            <option>Doméstico a Gás</option>
                            <option>Doméstico Elétrico</option>
                            <option>Forno tipo Ooni (Portátil)</option>
                            <option>A Lenha</option>
                            <option>Outro</option>
                        </select>
                    </div>
                    <div>
                        <label htmlFor="surface-type" className="block text-sm font-medium text-slate-700">
                            Tipo de Superfície
                        </label>
                        <select
                            id="surface-type"
                            className="mt-1 block w-full rounded-md border-slate-300 bg-white py-2 px-3 shadow-sm focus:border-lime-500 focus:outline-none focus:ring-lime-500 sm:text-sm"
                        >
                            <option>Pedra Refratária</option>
                            <option>Aço (Baking Steel)</option>
                            <option>Biscotto (Argila)</option>
                            <option>Assadeira / Grade</option>
                        </select>
                    </div>
                     <div>
                        <label htmlFor="max-temp" className="block text-sm font-medium text-slate-700">
                            Temperatura Máxima (°C)
                        </label>
                        <input
                            id="max-temp"
                            type="number"
                            placeholder="Ex: 290"
                            className="mt-1 block w-full rounded-md border-slate-300 bg-white py-2 px-3 shadow-sm focus:border-lime-500 focus:outline-none focus:ring-lime-500 sm:text-sm"
                        />
                    </div>
                </div>
            </div>

            {/* Results Section Placeholder */}
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-slate-800">
                2. Análise e Recomendações
              </h3>
              <div className="rounded-lg bg-white p-6 shadow-sm ring-1 ring-slate-200/50">
                  <p className="text-slate-600">
                      As recomendações para o seu forno aparecerão aqui.
                  </p>
              </div>
            </div>
        </div>
    </TechnicalPageLayout>
  );
};

export default OvenAnalysisPage;