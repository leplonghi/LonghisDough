
import React, { useState } from 'react';
import { SparklesIcon, CloseIcon, BeakerIcon } from '@/components/ui/Icons';
import { generateStyleFromDescription } from '@/ai/assistantClient';
import { DoughStyleDefinition } from '@/types';
import { useToast } from '@/components/ToastProvider';

interface AiStyleBuilderModalProps {
  isOpen: boolean;
  onClose: () => void;
  onStyleGenerated: (style: Partial<DoughStyleDefinition>) => void;
}

const AiStyleBuilderModal: React.FC<AiStyleBuilderModalProps> = ({ isOpen, onClose, onStyleGenerated }) => {
  const [description, setDescription] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const { addToast } = useToast();

  const handleGenerate = async () => {
    if (!description.trim()) return;
    
    setIsGenerating(true);
    try {
      const generatedStyle = await generateStyleFromDescription(description);
      onStyleGenerated(generatedStyle);
      addToast('Style generated! Review and save it.', 'success');
      onClose(); // Close this modal to show the Create/Edit modal
    } catch (error) {
      addToast('Failed to generate style. Try being more specific.', 'error');
    } finally {
      setIsGenerating(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/80 backdrop-blur-sm p-4" onClick={onClose}>
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg overflow-hidden" onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between p-4 border-b border-slate-100 bg-gradient-to-r from-indigo-50 to-white">
             <h2 className="text-lg font-bold text-indigo-900 flex items-center gap-2">
                <SparklesIcon className="h-5 w-5 text-indigo-500" />
                AI Style Builder
             </h2>
             <button onClick={onClose} className="p-1 text-slate-400 hover:bg-slate-100 rounded-full">
                 <CloseIcon className="h-5 w-5" />
             </button>
        </div>
        
        <div className="p-6 space-y-4">
             <div className="bg-indigo-50 rounded-lg p-4 border border-indigo-100">
                <p className="text-sm text-indigo-800">
                    Describe the dough style you want to create. Our AI will generate a technical profile based on baking science and literature.
                </p>
             </div>

             <div>
                 <label className="block text-sm font-medium text-slate-700 mb-2">Describe your dough</label>
                 <textarea 
                    value={description} 
                    onChange={(e) => setDescription(e.target.value)} 
                    rows={4} 
                    className="w-full rounded-lg border-slate-300 focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="e.g., Argentine pizza a la piedra, extremely thin and crispy, no oil..."
                    autoFocus
                 />
             </div>
             
             <div className="flex flex-wrap gap-2">
                <span className="text-xs text-slate-500 font-medium">Try:</span>
                <button onClick={() => setDescription('100% Rye German Bread, dense and sour')} className="text-xs bg-slate-100 hover:bg-slate-200 px-2 py-1 rounded text-slate-700 transition-colors">German Rye</button>
                <button onClick={() => setDescription('Argentine Pizza a la Piedra')} className="text-xs bg-slate-100 hover:bg-slate-200 px-2 py-1 rounded text-slate-700 transition-colors">Pizza a la Piedra</button>
                <button onClick={() => setDescription('High hydration Focaccia Romana')} className="text-xs bg-slate-100 hover:bg-slate-200 px-2 py-1 rounded text-slate-700 transition-colors">Romana</button>
             </div>
             
             <div className="text-xs text-slate-400 italic mt-2 border-t border-slate-100 pt-2">
                Disclaimer: AI-generated styles are based on general patterns. Always validate with your own flour and oven.
             </div>
        </div>
        
        <div className="p-4 border-t border-slate-100 flex justify-end gap-3 bg-slate-50">
             <button onClick={onClose} className="px-4 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-200 rounded-lg">Cancel</button>
             <button 
                onClick={handleGenerate} 
                disabled={isGenerating || !description.trim()}
                className="px-5 py-2 text-sm font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg shadow-sm disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
                {isGenerating ? (
                    <>
                        <BeakerIcon className="h-4 w-4 animate-pulse" /> Generating...
                    </>
                ) : (
                    <>
                        <SparklesIcon className="h-4 w-4" /> Generate Style
                    </>
                )}
            </button>
        </div>
      </div>
    </div>
  );
};

export default AiStyleBuilderModal;
