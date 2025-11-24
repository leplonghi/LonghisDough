import React, { useState } from 'react';
import TechnicalPageLayout from './learn/TechnicalPageLayout';
import { FireIcon, LightBulbIcon, SparklesIcon, BeakerIcon } from '@/components/ui/Icons';

export const OvenAnalysisPage: React.FC = () => {
    // TODO: Logic will be based on technical literature (AVPN, Serious Eats, etc.)
    
  return (
    <TechnicalPageLayout
        title="FormulaLab"
        subtitle="Understand your oven's behavior and get technical suggestions for dough and baking, based on real references."
        showReferencesSection
    >
        <div className="space-y-8">
            {/* Input Section */}
            <div className="rounded-lg border border-slate-200 bg-slate-50 p-6">
                <h3 className="text-xl font-semibold text-slate-800 mb-4">
                    1. Describe your Oven
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                        <label htmlFor="oven-type" className="block text-sm font-medium text-slate-700">
                            Oven Type
                        </label>
                        <select
                            id="oven-type"
                            className="mt-1 block w-full rounded-md border-slate-300 bg-white py-2 px-3 shadow-sm focus:border-lime-500 focus:outline-none focus:ring-lime-500 sm:text-sm"
                        >
                            <option>Home Gas Oven</option>
                            <option>Home Electric Oven</option>
                            <option>Portable (Ooni/Roccbox)</option>
                            <option>Wood Fired</option>
                            <option>Other</option>
                        </select>
                    </div>
                    <div>
                        <label htmlFor="surface-type" className="block text-sm font-medium text-slate-700">
                            Baking Surface
                        </label>
                        <select
                            id="surface-type"
                            className="mt-1 block w-full rounded-md border-slate-300 bg-white py-2 px-3 shadow-sm focus:border-lime-500 focus:outline-none focus:ring-lime-500 sm:text-sm"
                        >
                            <option>Pizza Stone (Cordierite)</option>
                            <option>Baking Steel</option>
                            <option>Biscotto (Clay)</option>
                            <option>Baking Sheet / Tray</option>
                        </select>
                    </div>
                     <div>
                        <label htmlFor="max-temp" className="block text-sm font-medium text-slate-700">
                            Max Temperature (°C)
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
                2. Analysis & Recommendations
              </h3>
              <div className="rounded-lg bg-white p-6 shadow-sm ring-1 ring-slate-200/50">
                  <p className="text-slate-600">
                      Recommendations for your oven setup will appear here.
                  </p>
              </div>
            </div>
        </div>
    </TechnicalPageLayout>
  );
};

export default OvenAnalysisPage;