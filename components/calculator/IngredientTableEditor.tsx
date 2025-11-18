
import React from 'react';
import { IngredientConfig } from '../../types';
import { TrashIcon, DocumentDuplicateIcon, PlusCircleIcon, BeakerIcon, CubeIcon } from '../IconComponents';
import { useTranslation } from '../../i18n';

interface IngredientTableEditorProps {
  ingredients: IngredientConfig[];
  onChange: (updatedIngredients: IngredientConfig[]) => void;
}

// IDs of ingredients that are controlled by the main sliders
const STANDARD_SLIDER_IDS = ['base-flour', 'water', 'salt', 'oil', 'sugar', 'yeast', 'levain'];

const IngredientTableEditor: React.FC<IngredientTableEditorProps> = ({ ingredients, onChange }) => {
  const { t } = useTranslation();

  // Filter to show only ingredients NOT controlled by the main sliders (custom additions)
  const customIngredients = ingredients.filter(ing => !STANDARD_SLIDER_IDS.includes(ing.id));

  const handleUpdate = (id: string, field: keyof IngredientConfig, value: any) => {
    const updated = ingredients.map((ing) => {
      if (ing.id === id) {
        // When editing an ingredient in the table, ensure manualOverride is set
        return { ...ing, [field]: value, manualOverride: true };
      }
      return ing;
    });
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
    };
    onChange([...ingredients, newItem]);
  };

  return (
    <div className="mt-8 rounded-xl border border-slate-200 bg-slate-50 p-4 sm:p-6">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-lg font-bold text-slate-800">
          Additional Ingredients
        </h3>
        <button
          type="button"
          onClick={handleAdd}
          className="inline-flex items-center gap-1 rounded-md bg-lime-500 px-3 py-1.5 text-xs font-semibold text-white shadow-sm hover:bg-lime-600"
        >
          <PlusCircleIcon className="h-4 w-4" />
          Add
        </button>
      </div>

      {customIngredients.length === 0 ? (
        <div className="text-center py-8 rounded-lg border border-dashed border-slate-300 bg-slate-50">
            <p className="text-sm text-slate-500">
                Basic ingredients (flour, water, salt, yeast, oil) are already configured in the sliders above.
                <br/>
                Use this table to add extra items (eggs, seeds, improvers, etc.).
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
                <th scope="col" className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-slate-500">
                    Type
                </th>
                <th scope="col" className="px-4 py-3 text-right text-xs font-medium uppercase tracking-wider text-slate-500">
                    %
                </th>
                <th scope="col" className="relative px-4 py-3">
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
                        type="text"
                        value={ing.name}
                        onChange={(e) => handleUpdate(ing.id, 'name', e.target.value)}
                        className="block w-full rounded-md border-slate-300 p-1.5 text-sm focus:border-lime-500 focus:ring-lime-500"
                        placeholder="Ingredient Name"
                        />
                    </td>
                    <td className="px-4 py-2">
                        <div className="relative">
                            <select
                            value={ing.type}
                            onChange={(e) => handleUpdate(ing.id, 'type', e.target.value)}
                            className="block w-full appearance-none rounded-md border-slate-300 py-1.5 pl-8 pr-8 text-sm focus:border-lime-500 focus:ring-lime-500"
                            >
                            <option value="solid">Solid</option>
                            <option value="liquid">Liquid</option>
                            </select>
                            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-2 text-slate-400">
                                {ing.type === 'liquid' ? <BeakerIcon className="h-4 w-4" /> : <CubeIcon className="h-4 w-4" />}
                            </div>
                        </div>
                    </td>
                    <td className="px-4 py-2">
                        <div className="flex items-center justify-end gap-1">
                            <input
                            type="number"
                            value={ing.bakerPercentage}
                            onChange={(e) => {
                                const val = parseFloat(e.target.value);
                                if (!isNaN(val) && val >= 0) {
                                    handleUpdate(ing.id, 'bakerPercentage', val);
                                }
                            }}
                            step="0.1"
                            min="0"
                            className="block w-20 rounded-md border-slate-300 p-1.5 text-right text-sm font-semibold focus:border-lime-500 focus:ring-lime-500"
                            />
                            <span className="text-slate-500">%</span>
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

      <p className="mt-2 text-xs text-slate-500 text-right">
        * Base flour is always 100%. Additional ingredients are calculated relative to it.
      </p>
    </div>
  );
};

export default IngredientTableEditor;
