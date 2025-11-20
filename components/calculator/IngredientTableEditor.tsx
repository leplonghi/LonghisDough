
import React, { useState, useMemo } from 'react';
import { IngredientConfig, RecipeStyle, IngredientUnit, UnitSystem } from '../../types';
import { TrashIcon, DocumentDuplicateIcon, PlusCircleIcon, BeakerIcon, CubeIcon, LightBulbIcon, InfoIcon } from '../IconComponents';
import { useTranslation } from '../../i18n';
import { ADDITIONAL_INGREDIENTS_LIBRARY, AdditionalIngredientDef } from '../../data/additionalIngredients';
import { useUser } from '../../contexts/UserProvider';
import { convertToGrams, convertFromGrams } from '../../helpers';

interface IngredientTableEditorProps {
  ingredients: IngredientConfig[];
  onChange: (updatedIngredients: IngredientConfig[]) => void;
  recipeStyle: RecipeStyle;
  totalFlourWeight: number; // Needed for accurate conversion between % and absolute
}

// IDs of ingredients that are controlled by the main sliders
const STANDARD_SLIDER_IDS = ['base-flour', 'water', 'salt', 'oil', 'sugar', 'yeast', 'levain'];

// Helper function to calculate Baker's Percentage from an absolute amount
const calculateBakerPercentage = (amountGrams: number, totalFlour: number): number => {
    if (totalFlour <= 0) return 0;
    return (amountGrams / totalFlour) * 100;
};

const IngredientTableEditor: React.FC<IngredientTableEditorProps> = ({ ingredients, onChange, recipeStyle, totalFlourWeight }) => {
  const { t } = useTranslation();
  const { customIngredientLibrary, addCustomIngredient } = useUser();
  const [showSuggestions, setShowSuggestions] = useState(true);
  // Assuming metric for calculations, but this could be context-aware if UnitSystem was passed.
  // For consistency in logic, we use Metric base but allow US units via conversion helpers.
  const unitSystem = UnitSystem.METRIC; 

  // Filter to show only ingredients NOT controlled by the main sliders AND not flours (managed by Blend Editor)
  const customIngredients = ingredients.filter(ing => 
    !STANDARD_SLIDER_IDS.includes(ing.id) && ing.role !== 'flour'
  );

  // Get suggested ingredients based on the current style
  const suggestedIngredients = useMemo(() => {
    return ADDITIONAL_INGREDIENTS_LIBRARY.filter(
        item => item.compatibleStyles.includes(recipeStyle)
    );
  }, [recipeStyle]);
  
  // Combined list for Autocomplete (Validated Library + User Custom Library)
  const allAutoCompleteOptions = useMemo(() => {
      const options = new Map<string, { name: string, type: 'solid' | 'liquid' }>();
      
      ADDITIONAL_INGREDIENTS_LIBRARY.forEach(i => options.set(i.name, { name: i.name, type: i.type }));
      customIngredientLibrary.forEach(i => options.set(i.name, { name: i.name, type: i.type }));
      
      return Array.from(options.values()).sort((a, b) => a.name.localeCompare(b.name));
  }, [customIngredientLibrary]);

  const handleUpdate = (id: string, field: keyof IngredientConfig, value: any) => {
    const updated = ingredients.map((ing) => {
      if (ing.id === id) {
        // When editing an ingredient in the table, ensure manualOverride is set
        const updatedIng = { ...ing, [field]: value, manualOverride: true };
        
        // If name is updated, check if we should auto-set the type from library
        if (field === 'name') {
             const match = allAutoCompleteOptions.find(opt => opt.name.toLowerCase() === String(value).toLowerCase());
             if (match) {
                 updatedIng.type = match.type;
             }
        }
        return updatedIng;
      }
      return ing;
    });
    onChange(updated);
  };

  // Specific handler for changing units or amounts
  const handleAmountChange = (ing: IngredientConfig, newAmount: number, unit: IngredientUnit) => {
      if (unit === '%') {
          // Direct percentage update
          handleUpdate(ing.id, 'bakerPercentage', newAmount);
      } else {
          // Absolute value update -> convert to grams -> convert to percentage
          const grams = convertToGrams(newAmount, unit, ing.id, unitSystem);
          const newPct = calculateBakerPercentage(grams, totalFlourWeight);
          // Update both the percentage (for logic) and selectedUnit (for display persistence)
          const updated = ingredients.map(i => 
              i.id === ing.id ? { ...i, bakerPercentage: newPct, selectedUnit: unit, manualOverride: true } : i
          );
          onChange(updated);
      }
  };

  const handleUnitChange = (ing: IngredientConfig, newUnit: IngredientUnit) => {
      // Just update the preferred unit. The value input will re-render based on the new unit relative to the *current* percentage.
      const updated = ingredients.map(i => 
          i.id === ing.id ? { ...i, selectedUnit: newUnit, manualOverride: true } : i
      );
      onChange(updated);
  };

  const handleRemove = (id: string) => {
    const updated = ingredients.filter((ing) => ing.id !== id);
    onChange(updated);
  };

  const handleDuplicate = (id: string) => {
    const index = ingredients.findIndex((ing) => ing.id === id);
    if (index === -1) return;

    const itemToClone = ingredients[index];
    const newItem: IngredientConfig = {
      ...itemToClone,
      id: `ing-${crypto.randomUUID()}`,
      name: `${itemToClone.name} (Copy)`,
      manualOverride: true,
    };

    const updated = [...ingredients];
    updated.splice(index + 1, 0, newItem);
    onChange(updated);
  };

  const handleAdd = () => {
    const newItem: IngredientConfig = {
      id: `ing-${crypto.randomUUID()}`,
      name: '',
      type: 'solid',
      bakerPercentage: 0,
      role: 'other',
      manualOverride: true,
      selectedUnit: '%', // Default
    };
    onChange([...ingredients, newItem]);
  };
  
  const handleAddSuggestion = (suggestion: AdditionalIngredientDef) => {
      // Check if already exists
      if (ingredients.some(i => i.name === suggestion.name)) {
          alert(`${suggestion.name} is already in the list.`);
          return;
      }
      
      const newItem: IngredientConfig = {
          id: `ing-sugg-${crypto.randomUUID()}`,
          name: suggestion.name,
          type: suggestion.type,
          bakerPercentage: suggestion.defaultPercentage,
          role: 'other',
          manualOverride: true,
          selectedUnit: '%',
      };
      onChange([...ingredients, newItem]);
  };

  // Auto-save new ingredients to user library when they lose focus or change name
  const handleBlurName = (ing: IngredientConfig) => {
      if (ing.name && ing.name.trim() !== '') {
          const exists = allAutoCompleteOptions.some(opt => opt.name.toLowerCase() === ing.name.toLowerCase());
          if (!exists) {
              addCustomIngredient({ name: ing.name, type: ing.type });
          }
      }
  };

  // Helper to get display value for input based on current unit
  const getDisplayValue = (ing: IngredientConfig): string => {
      const unit = ing.selectedUnit || '%';
      if (unit === '%') return ing.bakerPercentage.toFixed(2).replace(/\.?0+$/, '');
      
      // Convert % to grams first: (pct/100) * totalFlour
      const currentGrams = (ing.bakerPercentage / 100) * totalFlourWeight;
      // Then grams to unit
      const val = convertFromGrams(currentGrams, unit, ing.id, unitSystem);
      return val.toFixed(2).replace(/\.?0+$/, '');
  };

  return (
    <div className="mt-8 rounded-xl border border-slate-200 bg-slate-50 p-4 sm:p-6">
      <div className="mb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
            <h3 className="text-lg font-bold text-slate-800">
            Additional Ingredients
            </h3>
            <p className="text-xs text-slate-500">Add eggs, milk powder, malt, etc.</p>
        </div>
        <button
          type="button"
          onClick={handleAdd}
          className="inline-flex items-center justify-center gap-1 rounded-md bg-lime-500 px-3 py-1.5 text-xs font-semibold text-white shadow-sm hover:bg-lime-600"
        >
          <PlusCircleIcon className="h-4 w-4" />
          Add
        </button>
      </div>

      {/* Quick Add Suggestions */}
      {suggestedIngredients.length > 0 && showSuggestions && (
          <div className="mb-6 bg-white p-3 rounded-lg border border-slate-200 shadow-sm">
              <div className="flex justify-between items-center mb-2">
                  <p className="text-xs font-bold uppercase tracking-wide text-lime-600 flex items-center gap-1">
                      <LightBulbIcon className="h-3 w-3" />
                      Suggested for this style
                  </p>
                  <button onClick={() => setShowSuggestions(false)} className="text-xs text-slate-400 hover:text-slate-600">Hide</button>
              </div>
              <div className="flex flex-wrap gap-2">
                  {suggestedIngredients.map(sugg => (
                      <button
                        key={sugg.id}
                        onClick={() => handleAddSuggestion(sugg)}
                        className="group relative inline-flex items-center gap-1 rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700 hover:bg-lime-100 hover:text-lime-800 transition-colors"
                        title={sugg.description}
                      >
                          <span>{sugg.name}</span>
                          <span className="text-slate-400 group-hover:text-lime-600">({sugg.defaultPercentage}%)</span>
                          <PlusCircleIcon className="h-3 w-3 text-lime-500 ml-1" />
                      </button>
                  ))}
              </div>
          </div>
      )}

      {customIngredients.length === 0 ? (
        <div className="text-center py-8 rounded-lg border border-dashed border-slate-300 bg-slate-50">
            <p className="text-sm text-slate-500">
                Basic ingredients (flour, water, salt, yeast, oil) are already configured above.
            </p>
        </div>
      ) : (
        <div className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm">
            <table className="min-w-full divide-y divide-slate-200">
            <thead className="bg-slate-100">
                <tr>
                <th scope="col" className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-slate-500">
                    Ingredient
                </th>
                <th scope="col" className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-slate-500 w-24">
                    Type
                </th>
                <th scope="col" className="px-4 py-3 text-right text-xs font-medium uppercase tracking-wider text-slate-500 w-40">
                    Amount
                </th>
                <th scope="col" className="relative px-4 py-3 w-20">
                    <span className="sr-only">Actions</span>
                </th>
                </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 bg-white">
                {customIngredients.map((ing) => {
                return (
                    <tr key={ing.id} className="group hover:bg-slate-50">
                    <td className="px-4 py-2">
                        <input
                        list="ingredient-options"
                        type="text"
                        value={ing.name}
                        onChange={(e) => handleUpdate(ing.id, 'name', e.target.value)}
                        onBlur={() => handleBlurName(ing)}
                        className="block w-full rounded-md border-slate-300 p-1.5 text-sm focus:border-lime-500 focus:ring-lime-500"
                        placeholder="Name"
                        />
                        <datalist id="ingredient-options">
                            {allAutoCompleteOptions.map(opt => (
                                <option key={opt.name} value={opt.name} />
                            ))}
                        </datalist>
                    </td>
                    <td className="px-4 py-2">
                         <select
                            value={ing.type}
                            onChange={(e) => handleUpdate(ing.id, 'type', e.target.value)}
                            className="block w-full rounded-md border-slate-300 p-1.5 text-sm focus:border-lime-500 focus:ring-lime-500"
                        >
                            <option value="solid">Solid</option>
                            <option value="liquid">Liquid</option>
                        </select>
                    </td>
                    <td className="px-4 py-2">
                        <div className="flex items-center justify-end gap-1">
                            <input
                                type="number"
                                value={getDisplayValue(ing)}
                                onChange={(e) => {
                                    const val = parseFloat(e.target.value);
                                    if (!isNaN(val) && val >= 0) {
                                        handleAmountChange(ing, val, ing.selectedUnit || '%');
                                    }
                                }}
                                step="0.1"
                                min="0"
                                className="block w-20 rounded-md border-slate-300 p-1.5 text-right text-sm font-semibold focus:border-lime-500 focus:ring-lime-500"
                            />
                             <select
                                value={ing.selectedUnit || '%'}
                                onChange={(e) => handleUnitChange(ing, e.target.value as IngredientUnit)}
                                className="block w-16 rounded-md border-slate-300 p-1.5 text-sm focus:border-lime-500 focus:ring-lime-500 bg-slate-50"
                            >
                                <option value="%">%</option>
                                <option value="g">g</option>
                                <option value="kg">kg</option>
                                <option value="ml">ml</option>
                                <option value="l">l</option>
                                <option value="cup">cup</option>
                                <option value="tbsp">tbsp</option>
                                <option value="tsp">tsp</option>
                                <option value="oz">oz</option>
                                <option value="lb">lb</option>
                            </select>
                        </div>
                    </td>
                    <td className="px-4 py-2 text-right">
                        <div className="flex items-center justify-end gap-2 opacity-0 transition-opacity group-hover:opacity-100 focus-within:opacity-100">
                            <button
                                onClick={() => handleDuplicate(ing.id)}
                                title="Duplicate"
                                className="rounded p-1 text-slate-400 hover:bg-slate-200 hover:text-slate-600"
                            >
                                <DocumentDuplicateIcon className="h-4 w-4" />
                            </button>
                            <button
                                onClick={() => handleRemove(ing.id)}
                                title="Remove"
                                className="rounded p-1 text-red-400 hover:bg-red-100 hover:text-red-600"
                            >
                                <TrashIcon className="h-4 w-4" />
                            </button>
                        </div>
                    </td>
                    </tr>
                );
                })}
            </tbody>
            </table>
        </div>
      )}

      <div className="mt-2 flex justify-between items-start sm:items-center text-xs text-slate-500 flex-col sm:flex-row gap-2">
         <span className="flex items-center gap-1"><InfoIcon className="h-3 w-3"/> New ingredients save to your library.</span>
         <span className="text-right">
             * Amounts auto-convert based on total flour ({totalFlourWeight.toFixed(0)}g).
         </span>
      </div>
    </div>
  );
};

export default IngredientTableEditor;