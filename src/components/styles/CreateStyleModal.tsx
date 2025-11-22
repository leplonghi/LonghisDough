
import React, { useState, useEffect } from 'react';
import { CloseIcon, BeakerIcon, FireIcon, ClockIcon, GlobeAltIcon, BookOpenIcon, UserCircleIcon } from '@/components/ui/Icons';
import { DoughStyleDefinition, StyleCategory, RecipeStyle, FermentationTechnique } from '@/types';

interface CreateStyleModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (style: Omit<DoughStyleDefinition, 'id' | 'createdAt'>) => void;
  defaultValues?: Partial<DoughStyleDefinition>;
}

const CATEGORIES: StyleCategory[] = ['pizza', 'bread', 'enriched_bread', 'burger_bun', 'pastry', 'cookie', 'flatbread'];

const CreateStyleModal: React.FC<CreateStyleModalProps> = ({ isOpen, onClose, onSave, defaultValues }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    family: 'My Custom Styles',
    category: 'pizza' as StyleCategory,
    hydration: 65,
    salt: 2.0,
    oil: 0,
    sugar: 0,
    fermentationTime: '24h',
    bakingTempC: 250,
    country: 'Custom',
    region: '',
    history: '',
    culturalContext: '',
    source: 'user_manual' as 'user_manual' | 'user_ai',
    isCanonical: false,
  });

  useEffect(() => {
    if (defaultValues) {
        setFormData(prev => ({
            ...prev,
            name: defaultValues.name || '',
            description: defaultValues.description || '',
            family: defaultValues.family || 'My Custom Styles',
            category: defaultValues.category || 'pizza',
            hydration: defaultValues.technical?.hydration || 65,
            salt: defaultValues.technical?.salt || 2.0,
            oil: defaultValues.technical?.oil || 0,
            sugar: defaultValues.technical?.sugar || 0,
            fermentationTime: defaultValues.technical?.fermentation || '24h',
            bakingTempC: defaultValues.technical?.bakingTempC || 250,
            country: defaultValues.origin?.country || defaultValues.country || 'Custom',
            region: defaultValues.origin?.region || '',
            history: defaultValues.history || '',
            culturalContext: defaultValues.culturalContext || '',
            source: (defaultValues.source as any) || 'user_manual',
        }));
    } else {
         setFormData({
            name: '',
            description: '',
            family: 'My Custom Styles',
            category: 'pizza',
            hydration: 65,
            salt: 2.0,
            oil: 0,
            sugar: 0,
            fermentationTime: '24h',
            bakingTempC: 250,
            country: 'Custom',
            region: '',
            history: '',
            culturalContext: '',
            source: 'user_manual',
            isCanonical: false,
         });
    }
  }, [defaultValues, isOpen]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
        ...prev,
        [name]: ['hydration', 'salt', 'oil', 'sugar', 'bakingTempC'].includes(name) ? Number(value) : value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newStyle: Omit<DoughStyleDefinition, 'id' | 'createdAt'> = {
        name: formData.name,
        description: formData.description,
        family: formData.family,
        category: formData.category,
        isCanonical: false,
        source: formData.source,
        country: formData.country,
        origin: { country: formData.country, region: formData.region },
        history: formData.history || 'User created style.',
        culturalContext: formData.culturalContext,
        isPro: false,
        recipeStyle: RecipeStyle.NEAPOLITAN, // Default placeholder mapping
        technical: {
            hydration: formData.hydration,
            salt: formData.salt,
            oil: formData.oil,
            sugar: formData.sugar,
            fermentation: formData.fermentationTime,
            fermentationTechnique: FermentationTechnique.DIRECT,
            bakingTempC: formData.bakingTempC,
        },
        allowedFermentationTechniques: [FermentationTechnique.DIRECT, FermentationTechnique.POOLISH, FermentationTechnique.BIGA],
        defaultFermentationTechnique: FermentationTechnique.DIRECT,
        ingredients: [],
        technicalProfile: {
            hydration: [Math.max(0, formData.hydration - 2), formData.hydration + 2],
            salt: [Math.max(0, formData.salt - 0.2), formData.salt + 0.2],
            oil: [formData.oil, formData.oil],
            sugar: [formData.sugar, formData.sugar],
            flourStrength: "Custom",
            fermentation: {
                bulk: "Custom",
                proof: "Custom"
            },
            ovenRecommendations: `${formData.bakingTempC}°C`,
            difficulty: "Medium",
            recommendedUse: "Custom"
        },
        // Preserve references if passed in defaultValues (from AI)
        references: defaultValues?.references || [],
    };
    
    onSave(newStyle);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/80 backdrop-blur-sm p-4" onClick={onClose}>
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl overflow-hidden flex flex-col max-h-[90vh]" onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between p-4 border-b border-slate-100 flex-shrink-0">
             <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                 {formData.source === 'user_ai' ? (
                     <span className="flex items-center gap-1 text-indigo-600"><UserCircleIcon className="h-5 w-5" /> AI Generated Style</span>
                 ) : 'Create New Style'}
             </h2>
             <button onClick={onClose} className="p-1 text-slate-400 hover:bg-slate-100 rounded-full">
                 <CloseIcon className="h-5 w-5" />
             </button>
        </div>
        
        <form onSubmit={handleSubmit} className="flex-grow overflow-y-auto p-6 space-y-6">
             {formData.source === 'user_ai' && (
                 <div className="bg-indigo-50 p-3 rounded-lg border border-indigo-100 text-xs text-indigo-800 mb-4">
                     This style was generated by AI. Please review the technical parameters and description before saving.
                 </div>
             )}

             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                 <div className="col-span-2">
                     <label className="block text-sm font-medium text-slate-700 mb-1">Style Name</label>
                     <input required type="text" name="name" value={formData.name} onChange={handleChange} className="w-full rounded-lg border-slate-300 focus:ring-lime-500 focus:border-lime-500" placeholder="e.g., My Weekend Pizza" />
                 </div>
                 
                 <div>
                     <label className="block text-sm font-medium text-slate-700 mb-1">Category</label>
                     <select name="category" value={formData.category} onChange={handleChange} className="w-full rounded-lg border-slate-300 focus:ring-lime-500 focus:border-lime-500 capitalize">
                         {CATEGORIES.map(c => <option key={c} value={c}>{c.replace('_', ' ')}</option>)}
                     </select>
                 </div>
                 <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">Family (Group)</label>
                      <input type="text" name="family" value={formData.family} onChange={handleChange} className="w-full rounded-lg border-slate-300 focus:ring-lime-500 focus:border-lime-500" placeholder="e.g., My Experiments" />
                 </div>
             </div>
             
             <div>
                 <label className="block text-sm font-medium text-slate-700 mb-1">Description</label>
                 <textarea name="description" value={formData.description} onChange={handleChange} rows={2} className="w-full rounded-lg border-slate-300 focus:ring-lime-500 focus:border-lime-500" placeholder="Briefly describe this style..." />
             </div>

             <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-4">
                 <h3 className="text-xs font-bold uppercase text-slate-500 flex items-center gap-2">
                     <BeakerIcon className="h-4 w-4" /> Technical Parameters
                 </h3>
                 <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                     <div>
                         <label className="block text-xs font-medium text-slate-600">Hydration (%)</label>
                         <input type="number" name="hydration" value={formData.hydration} onChange={handleChange} className="w-full rounded-md border-slate-300 text-sm" />
                     </div>
                     <div>
                         <label className="block text-xs font-medium text-slate-600">Salt (%)</label>
                         <input type="number" name="salt" value={formData.salt} onChange={handleChange} className="w-full rounded-md border-slate-300 text-sm" step="0.1" />
                     </div>
                     <div>
                         <label className="block text-xs font-medium text-slate-600">Oil (%)</label>
                         <input type="number" name="oil" value={formData.oil} onChange={handleChange} className="w-full rounded-md border-slate-300 text-sm" step="0.5" />
                     </div>
                      <div>
                         <label className="block text-xs font-medium text-slate-600">Sugar (%)</label>
                         <input type="number" name="sugar" value={formData.sugar} onChange={handleChange} className="w-full rounded-md border-slate-300 text-sm" step="0.5" />
                     </div>
                 </div>
                 <div className="grid grid-cols-2 gap-4">
                     <div>
                         <label className="block text-xs font-medium text-slate-600 flex items-center gap-1"><ClockIcon className="h-3 w-3"/> Fermentation</label>
                         <input type="text" name="fermentationTime" value={formData.fermentationTime} onChange={handleChange} className="w-full rounded-md border-slate-300 text-sm" placeholder="e.g. 24h Cold" />
                     </div>
                      <div>
                         <label className="block text-xs font-medium text-slate-600 flex items-center gap-1"><FireIcon className="h-3 w-3"/> Bake Temp (°C)</label>
                         <input type="number" name="bakingTempC" value={formData.bakingTempC} onChange={handleChange} className="w-full rounded-md border-slate-300 text-sm" />
                     </div>
                 </div>
             </div>
             
             <div className="space-y-4 border-t border-slate-100 pt-4">
                 <h3 className="text-xs font-bold uppercase text-slate-500 flex items-center gap-2">
                     <GlobeAltIcon className="h-4 w-4" /> Origin & Context
                 </h3>
                 <div className="grid grid-cols-2 gap-4">
                     <div>
                        <label className="block text-xs font-medium text-slate-600">Country</label>
                        <input type="text" name="country" value={formData.country} onChange={handleChange} className="w-full rounded-md border-slate-300 text-sm" />
                     </div>
                     <div>
                        <label className="block text-xs font-medium text-slate-600">Region</label>
                        <input type="text" name="region" value={formData.region} onChange={handleChange} className="w-full rounded-md border-slate-300 text-sm" />
                     </div>
                 </div>
                 <div>
                     <label className="block text-xs font-medium text-slate-600">History</label>
                     <textarea name="history" value={formData.history} onChange={handleChange} rows={2} className="w-full rounded-md border-slate-300 text-sm" />
                 </div>
                  <div>
                     <label className="block text-xs font-medium text-slate-600">Cultural Context</label>
                     <textarea name="culturalContext" value={formData.culturalContext} onChange={handleChange} rows={2} className="w-full rounded-md border-slate-300 text-sm" />
                 </div>
             </div>

        </form>
        
        <div className="p-4 border-t border-slate-100 flex justify-end gap-2 flex-shrink-0 bg-white">
             <button type="button" onClick={onClose} className="px-4 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-100 rounded-lg">Cancel</button>
             <button onClick={handleSubmit} className="px-6 py-2 text-sm font-bold text-white bg-lime-500 hover:bg-lime-600 rounded-lg shadow-sm">
                 {formData.source === 'user_ai' ? 'Save Generated Style' : 'Save Style'}
             </button>
         </div>
      </div>
    </div>
  );
};

export default CreateStyleModal;
