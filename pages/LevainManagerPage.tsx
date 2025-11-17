import React, { useState, useMemo } from 'react';
// FIX: Corrected the import path for the useUser hook.
import { useUser } from '../contexts/UserProvider';
import LevainModal from '../components/LevainModal';
import { calculateWaterTempDDT, hoursBetween } from '../helpers';
import { DEFAULT_DDT_C } from '../constants';
import { FeedingEvent, Levain } from '../types';

const LevainManagerPage: React.FC = () => {
    const { levains, addLevain, updateLevain, addFeedingEvent } = useUser();
    const [isModalOpen, setIsModalOpen] = useState(false);
    
    // For now, we manage only one levain, the first one or the default one.
    // This can be expanded later to support multiple levains.
    const levain = levains.find(l => l.isDefault) || levains[0];

    // State for the feeding form
    const [feedFlour, setFeedFlour] = useState(50);
    const [feedWater, setFeedWater] = useState(50);
    const [feedNotes, setFeedNotes] = useState('');

    // State for DDT calculator
    const [ddtAmbient, setDdtAmbient] = useState(22);
    const [ddtFlour, setDdtFlour] = useState(22);
    
    const ddtWaterTemp = useMemo(() => {
        return calculateWaterTempDDT(DEFAULT_DDT_C, ddtAmbient, ddtFlour);
    }, [ddtAmbient, ddtFlour]);

    const handleSaveLevain = (levainData: Omit<Levain, 'id' | 'isDefault' | 'feedingHistory'>) => {
        if (levain) {
            // update logic would go here if we supported editing from this page
        } else {
            addLevain(levainData);
        }
        setIsModalOpen(false);
    };

    const handleFeed = () => {
        if (!levain || feedFlour <= 0 || feedWater <= 0) {
            alert("Por favor, preencha a quantidade de farinha e água.");
            return;
        }
        addFeedingEvent(levain.id, {
            flourAmount: feedFlour,
            waterAmount: feedWater,
            notes: feedNotes,
        });
        // Reset form
        setFeedFlour(50);
        setFeedWater(50);
        setFeedNotes('');
    };

    const getStrengthInfo = (hours: number): { text: string, color: string } => {
        if (hours < 6) return { text: 'Forte (Pico)', color: 'text-green-500' };
        if (hours <= 12) return { text: 'Ótimo', color: 'text-lime-600' };
        if (hours <= 24) return { text: 'Estável', color: 'text-yellow-500' };
        return { text: 'Fraco (Alimente-me!)', color: 'text-red-500' };
    };

    if (levains.length === 0) {
        return (
            <>
                <div className="text-center p-8 rounded-lg bg-white dark:bg-slate-800 shadow-sm">
                    <h1 className="text-2xl font-bold">Gerenciador de Levain</h1>
                    <p className="mt-4 text-slate-600 dark:text-slate-300">Você ainda não tem um levain (massa madre) cadastrado.</p>
                    <button onClick={() => setIsModalOpen(true)} className="mt-6 rounded-md bg-lime-500 py-2 px-4 font-semibold text-white shadow-sm hover:bg-lime-600">
                        Criar Meu Levain
                    </button>
                </div>
                <LevainModal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    onSave={handleSaveLevain}
                    levainToEdit={null}
                />
            </>
        );
    }

    const hoursSinceFeeding = hoursBetween(new Date().toISOString(), levain.lastFeeding);
    const strength = getStrengthInfo(hoursSinceFeeding);

    return (
        <div className="mx-auto max-w-4xl space-y-8">
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Gerenciador de Levain: {levain.name}</h1>
            
            {/* Status Card */}
            <div className="rounded-lg bg-white p-6 shadow-sm ring-1 ring-slate-200/50 dark:border dark:border-slate-700/50 dark:bg-slate-800">
                <h2 className="font-bold text-lg mb-4">Status Atual</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div><dt className="text-sm text-slate-500">Força Estimada</dt><dd className={`font-semibold text-lg ${strength.color}`}>{strength.text}</dd></div>
                    <div><dt className="text-sm text-slate-500">Última Alimentação</dt><dd className="font-semibold text-lg">{hoursSinceFeeding.toFixed(1)}h atrás</dd></div>
                    <div><dt className="text-sm text-slate-500">Hidratação</dt><dd className="font-semibold text-lg">{levain.hydration}%</dd></div>
                    <div><dt className="text-sm text-slate-500">Peso Total</dt><dd className="font-semibold text-lg">{levain.totalWeight.toFixed(0)}g</dd></div>
                </div>
            </div>

            {/* Feeding and DDT cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Feeding Card */}
                <div className="rounded-lg bg-white p-6 shadow-sm ring-1 ring-slate-200/50 dark:border dark:border-slate-700/50 dark:bg-slate-800">
                    <h2 className="font-bold text-lg mb-4">Alimentar Levain</h2>
                    <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="text-sm font-medium">Farinha (g)</label>
                                <input type="number" value={feedFlour} onChange={e => setFeedFlour(Number(e.target.value))} className="mt-1 w-full rounded-md border-slate-300 bg-slate-50 py-2 px-3 dark:border-slate-600 dark:bg-slate-700"/>
                            </div>
                            <div>
                                <label className="text-sm font-medium">Água (g)</label>
                                <input type="number" value={feedWater} onChange={e => setFeedWater(Number(e.target.value))} className="mt-1 w-full rounded-md border-slate-300 bg-slate-50 py-2 px-3 dark:border-slate-600 dark:bg-slate-700"/>
                            </div>
                        </div>
                        <button onClick={handleFeed} className="w-full rounded-md bg-lime-500 py-2 px-4 font-semibold text-white shadow-sm hover:bg-lime-600">
                            Registrar Alimentação
                        </button>
                    </div>
                </div>

                {/* DDT Calculator Card */}
                <div className="rounded-lg bg-white p-6 shadow-sm ring-1 ring-slate-200/50 dark:border dark:border-slate-700/50 dark:bg-slate-800">
                     <h2 className="font-bold text-lg mb-4">Temp. da Água (DDT)</h2>
                     <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="text-sm font-medium">Ambiente (°C)</label>
                                <input type="number" value={ddtAmbient} onChange={e => setDdtAmbient(Number(e.target.value))} className="mt-1 w-full rounded-md border-slate-300 bg-slate-50 py-2 px-3 dark:border-slate-600 dark:bg-slate-700"/>
                            </div>
                            <div>
                                <label className="text-sm font-medium">Farinha (°C)</label>
                                <input type="number" value={ddtFlour} onChange={e => setDdtFlour(Number(e.target.value))} className="mt-1 w-full rounded-md border-slate-300 bg-slate-50 py-2 px-3 dark:border-slate-600 dark:bg-slate-700"/>
                            </div>
                        </div>
                        <div className="text-center rounded-lg bg-lime-50 dark:bg-lime-500/10 p-4">
                            <p className="text-sm text-lime-800 dark:text-lime-200">Use água a aproximadamente:</p>
                            <p className="text-3xl font-bold text-lime-600 dark:text-lime-400">{ddtWaterTemp.toFixed(0)}°C</p>
                        </div>
                     </div>
                </div>
            </div>

            {/* History Card */}
            <div className="rounded-lg bg-white p-6 shadow-sm ring-1 ring-slate-200/50 dark:border dark:border-slate-700/50 dark:bg-slate-800">
                <h2 className="font-bold text-lg mb-4">Histórico de Alimentação</h2>
                <div className="max-h-96 overflow-y-auto">
                    <table className="w-full text-sm">
                        <thead className="sticky top-0 bg-white dark:bg-slate-800">
                            <tr className="border-b dark:border-slate-700">
                                <th className="py-2 text-left font-semibold">Data</th>
                                <th className="py-2 text-right font-semibold">Farinha</th>
                                <th className="py-2 text-right font-semibold">Água</th>
                                <th className="py-2 text-right font-semibold">Ratio</th>
                            </tr>
                        </thead>
                        <tbody>
                            {[...levain.feedingHistory].reverse().map(event => (
                                <tr key={event.id} className="border-b dark:border-slate-700 last:border-0">
                                    <td className="py-3">{new Date(event.date).toLocaleString()}</td>
                                    <td className="py-3 text-right">{event.flourAmount}g</td>
                                    <td className="py-3 text-right">{event.waterAmount}g</td>
                                    <td className="py-3 text-right">{event.ratio || 'N/A'}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default LevainManagerPage;