import React, { useState } from 'react';
import { Levain } from '../../../../types';
import { useUser } from '../../../../contexts/UserProvider';
import { useToast } from '../../../../components/ToastProvider';

interface LevainProfileProps {
    levain: Levain;
}

const LevainProfile: React.FC<LevainProfileProps> = ({ levain }) => {
    const { updateLevain } = useUser();
    const { addToast } = useToast();
    const [typicalUse, setTypicalUse] = useState(levain.typicalUse || '');
    const [sensoryNotes, setSensoryNotes] = useState(levain.notes || '');
    const [notificationEnabled, setNotificationEnabled] = useState(levain.notificationEnabled || false);
    const [idealFeedingIntervalHours, setIdealFeedingIntervalHours] = useState(levain.idealFeedingIntervalHours || 24);
    
    const handleSave = () => {
        updateLevain({
            id: levain.id,
            typicalUse,
            notes: sensoryNotes,
            notificationEnabled,
            idealFeedingIntervalHours,
        });
        addToast("Alterações salvas com sucesso.", "success");
    };

    return (
        <div className="rounded-xl border border-neutral-200 bg-white p-6 shadow-sm dark:border-neutral-700 dark:bg-neutral-800">
            <h3 className="text-lg font-medium mb-4">Perfil do Starter</h3>
            <div className="space-y-6">
                <div>
                    <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300">Uso típico</label>
                    <input 
                        type="text" 
                        value={typicalUse} 
                        onChange={e => setTypicalUse(e.target.value)} 
                        placeholder="Selecione para quais massas você usa este levain." 
                        className="mt-1 block w-full rounded-md border-neutral-300 bg-white py-2 px-3 shadow-sm focus:border-lime-500 dark:border-neutral-600 dark:bg-neutral-900" 
                    />
                </div>
                 <div>
                    <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300">Notas sensoriais</label>
                    <textarea 
                        rows={4} 
                        value={sensoryNotes} 
                        onChange={e => setSensoryNotes(e.target.value)} 
                        placeholder="Descreva cheiro, atividade, textura, comportamento." 
                        className="mt-1 block w-full rounded-md border-neutral-300 bg-white py-2 px-3 shadow-sm focus:border-lime-500 dark:border-neutral-600 dark:bg-neutral-900"
                    ></textarea>
                </div>

                <div className="space-y-4 border-t border-neutral-200 dark:border-neutral-700 pt-6">
                     <div className="flex items-center justify-between">
                        <label htmlFor="notification-switch" className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
                            Lembrar de alimentar este levain
                        </label>
                        <div className="relative inline-block w-10 align-middle select-none">
                            <input
                                type="checkbox"
                                name="notification"
                                id="notification-switch"
                                checked={notificationEnabled}
                                onChange={(e) => setNotificationEnabled(e.target.checked)}
                                className="peer absolute block h-6 w-6 cursor-pointer rounded-full bg-white opacity-0"
                            />
                            <label
                                htmlFor="notification-switch"
                                className="block h-6 cursor-pointer overflow-hidden rounded-full bg-neutral-300 peer-checked:bg-lime-500 dark:bg-neutral-600"
                            ></label>
                            <label
                                htmlFor="notification-switch"
                                className="absolute left-0 top-0 block h-6 w-6 transform rounded-full bg-white shadow transition-transform duration-200 ease-in-out peer-checked:translate-x-4"
                            ></label>
                        </div>
                    </div>
                    <div>
                        <label htmlFor="feeding-interval" className="block text-sm font-medium text-neutral-700 dark:text-neutral-300">
                            Intervalo ideal entre alimentações (horas)
                        </label>
                        <input
                            type="number"
                            id="feeding-interval"
                            value={idealFeedingIntervalHours}
                            onChange={(e) => setIdealFeedingIntervalHours(Number(e.target.value))}
                            placeholder="24"
                            disabled={!notificationEnabled}
                            className="mt-1 block w-full rounded-md border-neutral-300 bg-white py-2 px-3 shadow-sm focus:border-lime-500 disabled:opacity-50 dark:border-neutral-600 dark:bg-neutral-900"
                        />
                    </div>
                </div>

                 <div className="flex justify-end pt-2 border-t border-neutral-200 dark:border-neutral-700">
                    <button 
                        onClick={handleSave}
                        className="mt-4 rounded-md bg-lime-500 py-2 px-4 text-sm font-semibold text-white shadow-sm hover:bg-lime-600"
                    >
                        Salvar alterações
                    </button>
                </div>
            </div>
        </div>
    );
};

export default LevainProfile;