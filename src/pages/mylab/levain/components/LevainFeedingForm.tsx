
import React, { useState, useEffect } from 'react';
import { useUser } from '@/contexts/UserProvider';
import { useToast } from '@/components/ToastProvider';
import { CloseIcon, FlourIcon, WaterIcon, FireIcon, WeightIcon, CalculatorIcon } from '@/components/ui/Icons';

interface LevainFeedingFormProps {
  isOpen: boolean;
  onClose: () => void;
  levainId: string;
}

const LevainFeedingForm: React.FC<LevainFeedingFormProps> = ({ isOpen, onClose, levainId }) => {
    const { addFeedingEvent } = useUser();
    const { addToast } = useToast();
    
    const [starterWeight, setStarterWeight] = useState<number>(0);
    const [flourAmount, setFlourAmount] = useState<number>(50);
    const [waterAmount, setWaterAmount] = useState<number>(50);
    const [ratio, setRatio] = useState('1:1:1');
    const [flourType, setFlourType] = useState('White Flour');
    const [ambientTemperature, setAmbientTemperature] = useState<number | undefined>(24);
    const [notes, setNotes] = useState('');

    // Reset form when opening
    useEffect(() => {
        if (isOpen) {
            setStarterWeight(0);
            setFlourAmount(50);
            setWaterAmount(50);
            setRatio('1:1:1');
        }
    }, [isOpen]);
    
    const applyRatio = (rFlour: number, rWater: number) => {
        if (starterWeight > 0) {
            setFlourAmount(starterWeight * rFlour);
            setWaterAmount(starterWeight * rWater);
            setRatio(`1:${rFlour}:${rWater}`);
        } else {
            // If no starter weight, just set ratio text and defaults
            setRatio(`1:${rFlour}:${rWater}`);
            setFlourAmount(50 * rFlour);
            setWaterAmount(50 * rWater);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        
        addFeedingEvent(levainId, {
            flourAmount,
            waterAmount,
            ratio,
            flourType,
            ambientTemperature,
            notes,
        });

        addToast("Feeding logged! Your pet is happy.", 'success');
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div
            className="fixed inset-0 z-40 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm animate-[fadeIn_0.3s_ease-out]"
            onClick={onClose}
            role="dialog"
            aria-modal="true"
        >
            <div
                className="relative mx-4 w-full max-w-lg rounded-2xl bg-white shadow-2xl overflow-hidden"
                onClick={(e) => e.stopPropagation()}
            >
                 <div className="flex items-center justify-between border-b border-slate-100 bg-slate-50/50 px-6 py-4">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-lime-100 rounded-lg text-lime-600">
                            <WeightIcon className="h-5 w-5" />
                        </div>
                        <h2 className="text-lg font-bold text-slate-900">
                            Feed Your Levain
                        </h2>
                    </div>
                    <button onClick={onClose} className="rounded-full p-2 text-slate-400 hover:bg-slate-200 transition-colors">
                        <CloseIcon className="h-5 w-5" />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-6">
                    
                    {/* Quick Ratios */}
                    <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                        <div className="flex items-center gap-2 mb-3">
                             <CalculatorIcon className="h-4 w-4 text-slate-500" />
                             <span className="text-xs font-bold uppercase tracking-wide text-slate-500">Ratio Calculator</span>
                        </div>
                        
                        <div className="flex items-center gap-4 mb-4">
                             <div className="flex-1">
                                <label className="block text-xs text-slate-500 mb-1">Current Starter (g)</label>
                                <input 
                                    type="number" 
                                    value={starterWeight || ''} 
                                    onChange={e => setStarterWeight(Number(e.target.value))} 
                                    placeholder="Optional" 
                                    className="w-full rounded-md border-slate-300 text-sm py-1.5" 
                                />
                             </div>
                             <div className="flex gap-2 items-end">
                                 <button type="button" onClick={() => applyRatio(1, 1)} className="px-3 py-2 text-xs font-bold rounded-lg bg-white border border-slate-300 hover:border-lime-500 hover:text-lime-600 transition-colors">1:1:1</button>
                                 <button type="button" onClick={() => applyRatio(2, 2)} className="px-3 py-2 text-xs font-bold rounded-lg bg-white border border-slate-300 hover:border-lime-500 hover:text-lime-600 transition-colors">1:2:2</button>
                                 <button type="button" onClick={() => applyRatio(5, 5)} className="px-3 py-2 text-xs font-bold rounded-lg bg-white border border-slate-300 hover:border-lime-500 hover:text-lime-600 transition-colors">1:5:5</button>
                             </div>
                        </div>
                    </div>

                    {/* Inputs Grid */}
                    <div className="grid grid-cols-2 gap-4">
                         <div className="space-y-1.5">
                            <label className="flex items-center gap-1.5 text-sm font-semibold text-slate-700">
                                <FlourIcon className="h-4 w-4 text-amber-500" /> Flour (g)
                            </label>
                            <input 
                                type="number" required
                                value={flourAmount} 
                                onChange={e => setFlourAmount(Number(e.target.value))} 
                                className="w-full rounded-lg border-slate-300 bg-amber-50/30 focus:border-amber-500 focus:ring-amber-500 font-mono text-lg text-slate-800" 
                            />
                        </div>

                        <div className="space-y-1.5">
                            <label className="flex items-center gap-1.5 text-sm font-semibold text-slate-700">
                                <WaterIcon className="h-4 w-4 text-blue-500" /> Water (g)
                            </label>
                            <input 
                                type="number" required
                                value={waterAmount} 
                                onChange={e => setWaterAmount(Number(e.target.value))} 
                                className="w-full rounded-lg border-slate-300 bg-blue-50/30 focus:border-blue-500 focus:ring-blue-500 font-mono text-lg text-slate-800" 
                            />
                        </div>
                    </div>

                    {/* Secondary Details */}
                    <div className="grid grid-cols-2 gap-4 pt-2">
                        <div>
                            <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">Flour Type</label>
                            <select 
                                value={flourType} 
                                onChange={e => setFlourType(e.target.value)} 
                                className="w-full rounded-md border-slate-300 text-sm text-slate-700 focus:border-lime-500 focus:ring-lime-500"
                            >
                                <option>White Flour</option>
                                <option>Whole Wheat</option>
                                <option>Rye</option>
                                <option>Blend</option>
                            </select>
                        </div>
                        <div>
                            <label className="flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
                                <FireIcon className="h-3 w-3" /> Temp (°C)
                            </label>
                            <input 
                                type="number" 
                                value={ambientTemperature || ''} 
                                onChange={e => setAmbientTemperature(Number(e.target.value))} 
                                placeholder="24" 
                                className="w-full rounded-md border-slate-300 text-sm focus:border-lime-500 focus:ring-lime-500 text-slate-700" 
                            />
                        </div>
                    </div>
                    
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Ratio Used</label>
                        <input 
                            type="text" 
                            value={ratio} 
                            onChange={e => setRatio(e.target.value)} 
                            className="w-full rounded-md border-slate-300 text-sm text-slate-600 bg-slate-50" 
                        />
                    </div>

                     <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
                        <button type="button" onClick={onClose} className="rounded-lg px-4 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-100 transition-colors">Cancel</button>
                        <button type="submit" className="rounded-lg bg-lime-500 px-6 py-2 text-sm font-bold text-white shadow-md shadow-lime-200 hover:bg-lime-600 transition-all active:scale-95">Confirm Feeding</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default LevainFeedingForm;
