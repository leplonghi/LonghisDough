import React, { useState } from 'react';
import TechnicalPageLayout from './learn/TechnicalPageLayout';
import { BeakerIcon, LightBulbIcon, SparklesIcon } from '@/components/ui/Icons';

const DoughbotPage: React.FC = () => {
  const [problem, setProblem] = useState('');
  const [description, setDescription] = useState('');

  const commonProblems = [
    { value: '', label: 'Select a common problem...' },
    { value: 'sticky', label: 'Dough too sticky / wet' },
    { value: 'tearing', label: 'Dough tears when stretching' },
    { value: 'no_rise', label: 'Dough did not rise' },
    { value: 'dense', label: 'Dense crumb / no air bubbles' },
    { value: 'gummy', label: 'Under-cooked base / "gum line"' },
    { value: 'shrinking', label: 'Dough snaps back / shrinks' },
  ];

  // TODO: Implement real diagnostic logic based on trusted sources (AVPN, King Arthur, etc.)
  const handleDiagnose = () => {
    console.log('Diagnosing:', { problem, description });
  };

  return (
    <TechnicalPageLayout
      title="Doughbot"
      subtitle="Analyze your dough, understand what to adjust."
      showReferencesSection
    >
      <div className="space-y-8">
        {/* Input Section */}
        <div className="rounded-lg border border-slate-200 bg-slate-50 p-6 dark:bg-slate-800/50 dark:border-slate-700">
          <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-4">
            1. Describe your problem
          </h3>
          <div className="space-y-4">
            <div>
              <label htmlFor="problem-select" className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                Common Issue (optional)
              </label>
              <select
                id="problem-select"
                value={problem}
                onChange={(e) => setProblem(e.target.value)}
                className="mt-1 block w-full rounded-md border-slate-300 bg-white py-2 px-3 shadow-sm focus:border-lime-500 focus:outline-none focus:ring-lime-500 sm:text-sm text-slate-700 dark:bg-slate-700 dark:border-slate-600 dark:text-white"
              >
                {commonProblems.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="problem-description" className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                Detailed Description
              </label>
              <textarea
                id="problem-description"
                rows={4}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="mt-1 block w-full rounded-md border-slate-300 bg-white py-2 px-3 shadow-sm focus:border-lime-500 focus:outline-none focus:ring-lime-500 sm:text-sm text-slate-700 dark:bg-slate-700 dark:border-slate-600 dark:text-white"
                placeholder="E.g., My 68% hydration dough sat in the fridge for 24h, but tears easily when I try to open it..."
              />
            </div>
            <button
              onClick={handleDiagnose}
              className="flex w-full items-center justify-center gap-2 rounded-md bg-lime-500 py-2.5 px-4 text-sm font-semibold text-white shadow-sm hover:bg-lime-600"
            >
              <SparklesIcon className="h-5 w-5" />
              Diagnose Problem
            </button>
          </div>
        </div>

        {/* Results Section Placeholder */}
        <div className="space-y-6">
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
                2. Preliminary Diagnosis
            </h3>
            <div className="rounded-lg bg-white p-6 shadow-sm ring-1 ring-slate-200/50 dark:bg-slate-800 dark:ring-slate-700">
                <h4 className="flex items-center gap-2 text-lg font-semibold text-slate-800 dark:text-slate-100">
                    <BeakerIcon className="h-5 w-5 text-slate-600 dark:text-slate-400" />
                    Possible Causes
                </h4>
                <ul className="mt-4 list-disc space-y-2 pl-5 text-slate-700 dark:text-slate-300">
                    {/* Placeholder */}
                    <li>Diagnosis of potential causes will appear here.</li>
                    <li>Each cause will be explained based on baking science.</li>
                </ul>
            </div>
             <div className="rounded-lg bg-white p-6 shadow-sm ring-1 ring-slate-200/50 dark:bg-slate-800 dark:ring-slate-700">
                <h4 className="flex items-center gap-2 text-lg font-semibold text-slate-800 dark:text-slate-100">
                    <LightBulbIcon className="h-5 w-5 text-yellow-600 dark:text-yellow-400" />
                    Suggested Solutions
                </h4>
                <ul className="mt-4 list-disc space-y-2 pl-5 text-slate-700 dark:text-slate-300">
                    {/* Placeholder */}
                    <li>Technical suggestions for correction will appear here.</li>
                    <li>Solutions will include recipe and process adjustments.</li>
                </ul>
            </div>
        </div>
      </div>
    </TechnicalPageLayout>
  );
};

export default DoughbotPage;