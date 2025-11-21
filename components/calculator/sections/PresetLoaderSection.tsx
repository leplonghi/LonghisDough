
import React, { useState, useEffect } from 'react';
import { DoughConfig } from '../../../types';
import FormSection from '../AccordionSection';
import { BookmarkSquareIcon, TrashIcon } from '../../IconComponents';
import * as customPresets from '../../../logic/customPresets';
import { useToast } from '../../ToastProvider';

interface PresetLoaderSectionProps {
  onConfigChange: (newConfig: Partial<DoughConfig>) => void;
}

const PresetLoaderSection: React.FC<PresetLoaderSectionProps> = ({ onConfigChange }) => {
  const { addToast } = useToast();
  const [presets, setPresets] = useState<{ name: string }[]>([]);
  const [selectedPreset, setSelectedPreset] = useState<string>('');

  const refreshPresets = () => {
    const presetList = customPresets.listCustomPresets();
    setPresets(presetList);
    if (presetList.length > 0) {
        if (!presetList.some(p => p.name === selectedPreset)) {
            setSelectedPreset(presetList[0].name);
        }
    } else {
        setSelectedPreset('');
    }
  };
  
  useEffect(() => {
    refreshPresets();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const handleLoadPreset = () => {
    if (!selectedPreset) return;
    const loadedConfig = customPresets.loadCustomPreset(selectedPreset);
    if (loadedConfig) {
      onConfigChange(loadedConfig);
      // FIX: Changed addToast call to conform to new signature
      addToast({message: `Preset "${selectedPreset}" loaded.`, type: 'info'});
    }
  };

  const handleDeletePreset = () => {
    if (!selectedPreset) return;
    if (window.confirm(`Are you sure you want to delete preset "${selectedPreset}"?`)) {
      customPresets.deleteCustomPreset(selectedPreset);
      // FIX: Changed addToast call to conform to new signature
      addToast({message: `Preset "${selectedPreset}" deleted.`, type: 'info'});
      const newList = customPresets.listCustomPresets();
      setPresets(newList);
      setSelectedPreset(newList[0]?.name || '');
    }
  };

  const getSelectClasses = () => "w-full rounded-lg border-slate-300 bg-slate-50 p-2 text-slate-900 focus:border-lime-500 focus:ring-lime-500";

  return (
    <FormSection title="Load Custom Preset" description="Start from one of your saved dough formulas." icon={<BookmarkSquareIcon className="h-6 w-6" />}>
        <div className="space-y-4">
            <div className="flex gap-2">
                <select
                    value={selectedPreset}
                    onChange={(e) => setSelectedPreset(e.target.value)}
                    disabled={presets.length === 0}
                    className={getSelectClasses()}
                    aria-label="Select saved preset"
                >
                    {presets.length === 0 ? (
                        <option>No presets saved</option>
                    ) : (
                        presets.map(p => <option key={p.name} value={p.name}>{p.name}</option>)
                    )}
                </select>
                <button
                    onClick={handleDeletePreset}
                    disabled={!selectedPreset}
                    className="flex-shrink-0 rounded-lg p-2 text-red-500 transition-colors hover:bg-red-100 disabled:cursor-not-allowed disabled:opacity-50"
                    title="Delete Preset"
                >
                    <TrashIcon className="h-5 w-5" />
                </button>
            </div>
            <button
                onClick={handleLoadPreset}
                disabled={!selectedPreset}
                className="w-full rounded-md bg-slate-200 py-2 px-3 text-sm font-semibold text-slate-700 shadow-sm transition-colors hover:bg-slate-300 disabled:cursor-not-allowed disabled:opacity-50"
            >
                Load Preset
            </button>
        </div>
    </FormSection>
  );
};

export default PresetLoaderSection;