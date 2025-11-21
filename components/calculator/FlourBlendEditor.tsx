
import React, { useMemo, useState } from 'react';
import { IngredientConfig, FlourDefinition } from '../../types';
import { FLOURS } from '../../flours-constants';
import { calculateBlendCharacteristics, balanceFlourPercentages } from '../../logic/flourMath';
import { PlusCircleIcon, TrashIcon, InfoIcon, SparklesIcon } from '../IconComponents';
import { useTranslation } from '../../i18n';

interface FlourBlendEditorProps {
  ingredients: IngredientConfig[];
  mainFlourId: string;
  onChange: (newIngredients: IngredientConfig[], newMainFlourId: string) => void;
}

const FlourBlendEditor: React.FC<FlourBlendEditorProps> = ({ ingredients, mainFlourId, onChange }) => {
  const { t } = useTranslation();
  
  // Extract only flour ingredients
  const flourIngredients = useMemo(() => ingredients.filter(i => i.role === 'flour'), [ingredients]);
  
  // Calculate current stats
  const stats = useMemo(() => calculateBlendCharacteristics(ingredients), [ingredients]);

  const handleAddFlour = (flourDefId: string) => {
    const def = FLOURS.find(f => f.id === flourDefId);
    if (!def) return;

    // Default new flour to 10%
    const newIng: IngredientConfig = {
      id: def.id, // Use definition ID as ingredient ID for flours to allow tracking
      name: def.name,
      type: 'solid',
      role: 'flour',
      bakerPercentage: 10,
      manualOverride: true
    };

    // Add to list, checking if it already exists (if so, maybe just alert or allow duplicate? Logic assumes unique IDs for simplicity here)
    if (ingredients.some(i => i.id === newIng.id)) {
        alert('This flour is already in the blend.');
        return;
    }

    const newIngredientsList = [...ingredients, newIng];
    const balanced = balanceFlourPercentages(newIngredientsList, mainFlourId);
    onChange(balanced, mainFlourId);
  };

  const handleRemoveFlour = (id: string) => {
    if (id === mainFlourId) return; // Cannot remove main flour
    const filtered = ingredients.filter(i => i.id !== id);
    const balanced = balanceFlourPercentages(filtered, mainFlourId);
    onChange(balanced, mainFlourId);
  };

  const handlePercentageChange = (id: string, newPct: number) => {
    if (id === mainFlourId) return; // Main flour is calculated automatically

    const updated = ingredients.map(i => 
      i.id === id ? { ...i, bakerPercentage: newPct, manualOverride: true } : i
    );
    
    const balanced = balanceFlourPercentages(updated, mainFlourId);
    onChange(balanced, mainFlourId);
  };

  const handleMainFlourChange = (newId: string) => {
      // When main flour changes, we update the ID and Name of the main flour ingredient
      const def = FLOURS.find(f => f.id === newId);
      if (!def) return;

      const updated = ingredients.map(i => {
          if (i.id === mainFlourId) {
              return { ...i, id: newId, name: def.name };
          }
          return i;
      });
      onChange(updated, newId);
  };
  
  const mainFlour = flourIngredients.find(i => i.id === mainFlourId);
  const secondaryFlours = flourIngredients.filter(i => i.id !== mainFlourId);
  
  // Available flours to add (excluding current ones)
  const availableFlours = FLOURS.filter(f => !flourIngredients.some(i => i.id === f.id));

  return (
    <div className="space-y-4 rounded-xl border border-slate-200 bg-slate-50 p-4">
        <div className="flex items-center justify-between">
            <h3 className="font-semibold text-slate-800 flex items-center gap-2">
                <SparklesIcon className="h-5 w-5 text-lime-500" />
                Flour Blend
            </h3>
             <div className="flex items-center gap-2 text-xs bg-white px-2 py-1 rounded border border-slate-200">
                <span className="text-slate-500">Est. Strength:</span>
                <span className="font-bold text-slate-800">W {stats.estimatedW}</span>
            </div>
        </div>

        {/* Main Flour Selector */}
        <div className="bg-white p-3 rounded-lg border border-slate-200 shadow-sm">
            <label className="block text-xs font-bold uppercase text-slate-500 mb-1">Main Flour (Base)</label>
            <div className="flex items-center gap-3">
                 <select 
                    value={mainFlourId} 
                    onChange={(e) => handleMainFlourChange(e.target.value)}
                    className="flex-grow rounded-md border-slate-300 text-sm p-2"
                >
                    {FLOURS.map(f => <option key={f.id} value={f.id}>{f.name}</option>)}
                </select>
                <span className="text-lg font-bold text-slate-800 w-16 text-right">
                    {mainFlour ? mainFlour.bakerPercentage.toFixed(0) : '0'}%
                </span>
            </div>
        </div>

        {/* Secondary Flours */}
        {secondaryFlours.length > 0 && (
            <div className="space-y-2">
                <p className="text-xs font-bold uppercase text-slate-400 ml-1">Blended Flours</p>
                {secondaryFlours.map(flour => (
                    <div key={flour.id} className="bg-white p-3 rounded-lg border border-slate-200 shadow-sm flex flex-col gap-2">
                         <div className="flex justify-between items-center">
                            <span className="text-sm font-medium text-slate-700">{flour.name}</span>
                             <button onClick={() => handleRemoveFlour(flour.id)} className="text-red-400 hover:text-red-600">
                                <TrashIcon className="h-4 w-4" />
                            </button>
                         </div>
                         <div className="flex items-center gap-3">
                             <input 
                                type="range" 
                                min="1" 
                                max="50" 
                                value={flour.bakerPercentage}
                                onChange={(e) => handlePercentageChange(flour.id, Number(e.target.value))}
                                className="flex-grow h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer"
                             />
                             <span className="text-sm font-bold text-slate-800 w-12 text-right">{flour.bakerPercentage}%</span>
                         </div>
                    </div>
                ))}
            </div>
        )}

        {/* Add Flour Button */}
        {availableFlours.length > 0 && (
            <div className="relative group">
                 <button className="w-full flex items-center justify-center gap-2 rounded-lg border-2 border-dashed border-slate-300 py-2 text-sm font-semibold text-slate-500 hover:border-lime-500 hover:text-lime-600 transition-colors">
                    <PlusCircleIcon className="h-5 w-5" />
                    Add Flour to Blend
                </button>
                {/* Simple Dropdown on Hover/Click for MVP */}
                <div className="hidden group-focus-within:block absolute top-full left-0 w-full mt-2 bg-white border border-slate-200 rounded-lg shadow-xl z-10 max-h-48 overflow-y-auto">
                    {availableFlours.map(f => (
                        <button 
                            key={f.id}
                            onClick={() => handleAddFlour(f.id)}
                            className="w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-slate-50"
                        >
                            {f.name} ({f.category})
                        </button>
                    ))}
                </div>
            </div>
        )}
        
        <div className="flex items-start gap-2 p-3 bg-blue-50 rounded-lg text-xs text-blue-800">
             <InfoIcon className="h-4 w-4 flex-shrink-0 mt-0.5" />
             <p>
                 Blending flours allows you to adjust protein content and flavor. 
                 Example: Add 10-20% Whole Wheat for flavor, or Semolina for crunch.
             </p>
        </div>

    </div>
  );
};

export default FlourBlendEditor;
