

import React, { useState } from 'react';
import { useUser } from '../../../../contexts/UserProvider';
import { useToast } from '../../../../components/ToastProvider';
import { CloseIcon } from '../../../../components/IconComponents';

interface LevainFeedingFormProps {
  isOpen: boolean;
  onClose: () => void;
  levainId: string;
}

const LevainFeedingForm: React.FC<LevainFeedingFormProps> = ({ isOpen, onClose, levainId }) => {
    const { addFeedingEvent } = useUser();
    const { addToast } = useToast();
    
    const [flourAmount, setFlourAmount] = useState<number>(50);
    const [waterAmount, setWaterAmount] = useState<number>(50);
    const [ratio, setRatio] = useState('1:2:2');
    const [flourType, setFlourType] = useState('Trigo Branca');
    const [ambientTemperature, setAmbientTemperature] = useState<number | undefined>(24);
    const [notes, setNotes] = useState('');
    
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

        addToast("Alimentação registrada com sucesso.", 'success');
        onClose();
        // Reset form for next time
        setFlourAmount(50);
        setWaterAmount(50);
        setRatio('1:2:2');
        setNotes('');
        setFlourType('Trigo Branca');
        setAmbientTemperature(24);
    };

    if (!isOpen) return null;

    return (
        <div
            className="fixed inset-0 z-40 flex items-center justify-center bg-black/60 backdrop-blur-sm animate-[fadeIn_0.3s_ease-out]"
            onClick={onClose}
            role="dialog"
            aria-modal="true"
        >
            <div
                className="relative mx-4 w-full max-w-lg rounded-2xl bg-white p-6 shadow-xl"
                onClick={(e) => e.stopPropagation()}
            >
                 <div className="flex items-start justify-between border-b border-slate-200 pb-4">
                    <h2 className="text-xl font-bold text-slate-900">
                        Registrar alimentação
                    </h2>
                    <button onClick={onClose} className="-mt-2 -mr-2 rounded-full p-1 text-slate-500 hover:bg-slate-200">
                        <CloseIcon className="h-6 w-6" />
                    </button>
                </div>
                <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-slate-700">Data e hora</label>
                        <input type="text" disabled value="Agora" className="mt-1 block w-full rounded-md border-slate-300 bg-slate-100 py-2 px-3 shadow-sm opacity-70" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-slate-700">Farinha (g)</label>
                            <input type="number" value={flourAmount} onChange={e => setFlourAmount(Number(e.target.value))} className="mt-1 block w-full rounded-md border-slate-300 bg-white py-2 px-3 shadow-sm focus:border-lime-500" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700">Água (g)</label>
                            <input type="number" value={waterAmount} onChange={e => setWaterAmount(Number(e.target.value))} className="mt-1 block w-full rounded-md border-slate-300 bg-white py-2 px-3 shadow-sm focus:border-lime-500" />
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-slate-700">Proporção</label>
                            <input type="text" value={ratio} onChange={e => setRatio(e.target.value)} placeholder="Ex.: 1:2:2" className="mt-1 block w-full rounded-md border-slate-300 bg-white py-2 px-3 shadow-sm focus:border-lime-500" />
                        </div>
                         <div>
                            <label className="block text-sm font-medium text-slate-700">Temperatura ambiente (°C)</label>
                            <input type="number" value={ambientTemperature || ''} onChange={e => setAmbientTemperature(Number(e.target.value))} placeholder="Ex.: 24" className="mt-1 block w-full rounded-md border-slate-300 bg-white py-2 px-3 shadow-sm focus:border-lime-500" />
                        </div>
                    </div>
                     <div>
                        <label className="block text-sm font-medium text-slate-700">Tipo de farinha</label>
                        <input type="text" value={flourType} onChange={e => setFlourType(e.target.value)} placeholder="Selecione o tipo de farinha" className="mt-1 block w-full rounded-md border-slate-300 bg-white py-2 px-3 shadow-sm focus:border-lime-500" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-700">Observações</label>
                        <textarea rows={3} value={notes} onChange={e => setNotes(e.target.value)} placeholder="Notas sobre cheiro, textura, crescimento…" className="mt-1 block w-full rounded-md border-slate-300 bg-white py-2 px-3 shadow-sm focus:border-lime-500"></textarea>
                    </div>
                     <div className="flex justify-end gap-4 pt-4 border-t border-slate-200">
                        <button type="button" onClick={onClose} className="rounded-md py-2 px-4 text-sm font-semibold text-slate-600 hover:bg-slate-100">Cancelar</button>
                        <button type="submit" className="rounded-md bg-lime-500 py-2 px-4 text-sm font-semibold text-white shadow-sm hover:bg-lime-600">Salvar registro</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default LevainFeedingForm;