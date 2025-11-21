
import React, { useState } from 'react';
import { useUser } from '../../../../contexts/UserProvider';
import { useToast } from '../../../../components/ToastProvider';
import { CloseIcon, FlourIcon, WaterIcon, FireIcon, WeightIcon, ClockIcon } from '../../../../components/IconComponents';

interface LevainFeedingFormProps {
  isOpen: boolean;
  onClose: () => void;
  levainId: string;
}

const RatioButton: React.FC<{ label: string; onClick: () => void; active: boolean }> = ({ label, onClick, active }) => (
    <button
        type="button"
        onClick={onClick}
        className={`px-3 py-1 text-xs font-bold rounded-full border transition-colors ${
            active 
            ? 'bg-lime-100 border-lime-500 text-lime-700' 
            : 'bg-white border-slate-200 text-slate-600 hover:border-lime-300'
        }`}
    >
        {label}
    </button>
);

const LevainFeedingForm: React.FC<LevainFeedingFormProps> = ({ isOpen, onClose, levainId }) => {
    const { addFeedingEvent } = useUser();
    const { addToast } = useToast();
    
    const [flourAmount, setFlourAmount] = useState<number>(50);
    const [waterAmount, setWaterAmount] = useState<number>(50);
    const [ratio, setRatio] = useState('1:1:1');
    const [flourType, setFlourType] = useState('White Flour');
    const [ambientTemperature, setAmbientTemperature] = useState<number | undefined>(24);
    const [notes, setNotes] = useState('');
    
    const handleRatioClick = (newRatio: string) => {
        setRatio(newRatio);
        // Logic to auto-adjust water/flour could go here, but keeping it manual for safety
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

        // FIX: Changed addToast call to conform to new signature
        addToast({message: "Feeding logged successfully.", type: 'success'});
        onClose();
        // Reset form for next time
        setFlourAmount(50);
        setWaterAmount(50);
        setRatio('1:1:1');
        setNotes('');
        setFlourType('White Flour');
        setAmbientTemperature(24);
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
                            Log Feeding
                        </h2>
                    </div>
                    <button onClick={onClose} className="rounded-full p-2 text-slate-400 hover:bg-slate-200 transition-colors">
                        <CloseIcon className="h-5 w-5" />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-6">
                    
                    {/* Inputs Grid */}
                    <div className="grid grid-cols-2 gap-4">
                         {/* Flour Input */}
                        <div className="space-y-1.5">
                            <label className="flex items-center gap-1.5 text-sm font-semibold text-slate-700">
                                <FlourIcon className="h-4 w-4 text-amber-500" /> Flour (g)
                            </label>
                            <input 
                                type="number" 
                                value={flourAmount} 
                                onChange={e => setFlourAmount(Number(e.target.value))} 
                                className="w-full rounded-lg border-slate-300 bg-amber-50/30 focus:border-amber-500 focus:ring-amber-500 font-mono text-lg" 
                            />
                        </div>

                         {/* Water Input */}
                        <div className="space-y-1.5">
                            <label className="flex items-center gap-1.5 text-sm font-semibold text-slate-700">
                                <WaterIcon className="h-4 w-4 text-blue-500" /> Water (g)
                            </label>
                            <input 
                                type="number" 
                                value={waterAmount} 
                                onChange={e => setWaterAmount(Number(e.target.value))} 
                                className="w-full rounded-lg border-slate-300 bg-blue-50/30 focus:border-blue-500 focus:ring-blue-500 font-mono text-lg" 
                            />
                        </div>
                    </div>

                    {/* Ratio Selection */}
                    <div className="space-y-2">
                         <label className="block text-sm font-medium text-slate-600">Feeding Ratio (Starter:Flour:Water)</label>
                         <div className="flex items-center gap-3">
                            <input 
                                type="text" 
                                value={ratio} 
                                onChange={e => setRatio(e.target.value)} 
                                placeholder="1:1:1" 
                                className="w-24 rounded-md border-slate-300 text-sm focus:border-lime-500 focus:ring-lime-500" 
                            />
                            <div className="flex gap-2">
                                <RatioButton label="1:1:1" active={ratio === '1:1:1'} onClick={() => handleRatioClick('1:1:1')} />
                                <RatioButton label="1:2:2" active={ratio === '1:2:2'} onClick={() => handleRatioClick('1:2:2')} />
                                <RatioButton label="1:4:4" active={ratio === '1:4:4'} onClick={() => handleRatioClick('1:4:4')} />
                            </div>
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
                                <FireIcon className="h-3 w-3" /> Ambient Temp (°C)
                            </label>
                            <input 
                                type="number" 
                                value={ambientTemperature || ''} 
                                onChange={e => setAmbientTemperature(Number(e.target.value))} 
                                placeholder="24" 
                                className="w-full rounded-md border-slate-300 text-sm focus:border-lime-500 focus:ring-lime-500" 
                            />
                        </div>
                    </div>
                    
                    {/* Notes */}
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Observations</label>
                        <textarea 
                            rows={3} 
                            value={notes} 
                            onChange={e => setNotes(e.target.value)} 
                            placeholder="Smell (yogurt/vinegar), texture, rise time..." 
                            className="w-full rounded-lg border-slate-300 bg-slate-50 p-3 text-sm focus:border-lime-500 focus:ring-lime-500"
                        ></textarea>
                    </div>

                     <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
                        <button type="button" onClick={onClose} className="rounded-lg px-4 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-100 transition-colors">Cancel</button>
                        <button type="submit" className="rounded-lg bg-lime-500 px-6 py-2 text-sm font-bold text-white shadow-md shadow-lime-200 hover:bg-lime-600 transition-all active:scale-95">Save Log</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default LevainFeedingForm;