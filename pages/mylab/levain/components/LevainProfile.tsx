
import React, { useState } from 'react';
import { Levain } from '@/types';
import { useUser } from '@/contexts/UserProvider';
import { useToast } from '@/components/ToastProvider';

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
        addToast("Changes saved successfully.", "success");
    };

    return (
        <div className="rounded-xl border border-neutral-200 bg-white p-6 shadow-sm">
            <h3 className="text-lg font-medium mb-4">Starter Profile</h3>
            <div className="space-y-6">
                <div>
                    <label className="block text-sm font-medium text-neutral-700">Typical Use</label>
                    <input 
                        type="text" 
                        value={typicalUse} 
                        onChange={e => setTypicalUse(e.target.value)} 
                        placeholder="Select for which doughs you use this levain." 
                        className="mt-1 block w-full rounded-md border-neutral-300 bg-white py-2 px-3 shadow-sm focus:border-lime-500" 
                    />
                </div>
                 <div>
                    <label className="block text-sm font-medium text-neutral-700">Sensory Notes</label>
                    <textarea 
                        rows={4} 
                        value={sensoryNotes} 
                        onChange={e => setSensoryNotes(e.target.value)} 
                        placeholder="Describe smell, activity, texture, behavior." 
                        className="mt-1 block w-full rounded-md border-neutral-300 bg-white py-2 px-3 shadow-sm focus:border-lime-500"
                    ></textarea>
                </div>

                <div className="space-y-4 border-t border-neutral-200 pt-6">
                     <div className="flex items-center justify-between">
                        <label htmlFor="notification-switch" className="text-sm font-medium text-neutral-700">
                            Remind me to feed this levain
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
                                className="block h-6 cursor-pointer overflow-hidden rounded-full bg-neutral-300 peer-checked:bg-lime-500"
                            ></label>
                            <label
                                htmlFor="notification-switch"
                                className="absolute left-0 top-0 block h-6 w-6 transform rounded-full bg-white shadow transition-transform duration-200 ease-in-out peer-checked:translate-x-4"
                            ></label>
                        </div>
                    </div>
                    <div>
                        <label htmlFor="feeding-interval" className="block text-sm font-medium text-neutral-700">
                            Ideal interval between feedings (hours)
                        </label>
                        <input
                            type="number"
                            id="feeding-interval"
                            value={idealFeedingIntervalHours}
                            onChange={(e) => setIdealFeedingIntervalHours(Number(e.target.value))}
                            placeholder="24"
                            disabled={!notificationEnabled}
                            className="mt-1 block w-full rounded-md border-neutral-300 bg-white py-2 px-3 shadow-sm focus:border-lime-500 disabled:opacity-50"
                        />
                    </div>
                </div>

                 <div className="flex justify-end pt-2 border-t border-neutral-200">
                    <button 
                        onClick={handleSave}
                        className="mt-4 rounded-md bg-lime-500 py-2 px-4 text-sm font-semibold text-white shadow-sm hover:bg-lime-600"
                    >
                        Save Changes
                    </button>
                </div>
            </div>
        </div>
    );
};

export default LevainProfile;
