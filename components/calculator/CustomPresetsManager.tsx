
import React, { useState, useEffect } from 'react';
import { DoughConfig } from '../../types';
import * as customPresets from '../../logic/customPresets';
import { TrashIcon, BookmarkSquareIcon } from '../IconComponents';
import { useToast } from '../ToastProvider';

interface CustomPresetsManagerProps {
  currentConfig: DoughConfig;
  onLoadPreset: (config: DoughConfig) => void;
}

const CustomPresetsManager: React.FC<CustomPresetsManagerProps> = ({ currentConfig, onLoadPreset }) => {
  const [presets, setPresets] = useState<{ name: string }[]>([]);
  const [selectedPreset, setSelectedPreset] = useState<string>('');
  const { addToast } = useToast();

  const refreshPresets = () => {
    const presetList = customPresets.listCustomPresets();
    setPresets(presetList);
    if (presetList.length > 0) {
        // If the currently selected preset still exists, keep it. Otherwise, default to the first.
        if (!presetList.some(p => p.name === selectedPreset)) {
            setSelectedPreset(presetList[0].name);
        }
    } else {
        setSelectedPreset('');
    }
  };

  useEffect(() => {
    refreshPresets();
  }, []);

  const handleSave = () => {
    const name = prompt('Name this preset:');
    if (name && name.trim()) {
      customPresets.saveCustomPreset(name, currentConfig);
      addToast(`Preset "${name}" saved!`, 'success');
      refreshPresets();
      setSelectedPreset(name);
    }
  };

  const handleLoad = () => {
    if (!selectedPreset) return;
    const config = customPresets.loadCustomPreset(selectedPreset);
    if (config) {
      onLoadPreset(config);
      addToast(`Preset "${selectedPreset}" loaded.`, 'info');
    }
  };

  const handleDelete = () => {
    if (!selectedPreset) return;
    if (window.confirm(`Are you sure you want to delete preset "${selectedPreset}"?`)) {
      customPresets.deleteCustomPreset(selectedPreset);
      addToast(`Preset "${selectedPreset}" deleted.`, 'info');
      // After deleting, refresh and reset selection to the first available preset
      const newList = customPresets.listCustomPresets();
      setPresets(newList);
      setSelectedPreset(newList[0]?.name || '');
    }
  };

  return (
    <div className="relative rounded-xl border border-slate-200 p-4 pt-6">
       <h3 className="absolute -top-3.5 left-4 flex items-center gap-2 bg-white px-2 text-sm font-semibold uppercase tracking-wider text-slate-500">
         <span className="text-lime-500"><BookmarkSquareIcon className="h-5 w-5" /></span>
        <span>My Presets</span>
      </h3>

      <div className="space-y-4">
        <div className="flex gap-2">
          <select
            value={selectedPreset}
            onChange={(e) => setSelectedPreset(e.target.value)}
            disabled={presets.length === 0}
            className="w-full rounded-lg border-slate-300 bg-slate-50 p-2 text-slate-900 focus:border-lime-500 focus:ring-lime-500 disabled:opacity-50"
            aria-label="Select saved preset"
          >
            {presets.length === 0 ? (
              <option>No presets saved</option>
            ) : (
              presets.map(p => <option key={p.name} value={p.name}>{p.name}</option>)
            )}
          </select>
          <button
            onClick={handleDelete}
            disabled={!selectedPreset}
            className="flex-shrink-0 rounded-lg p-2 text-red-500 transition-colors hover:bg-red-100 disabled:cursor-not-allowed disabled:opacity-50"
            title="Delete Preset"
          >
            <TrashIcon className="h-5 w-5" />
          </button>
        </div>

        <div className="grid grid-cols-2 gap-3">
            <button
                onClick={handleLoad}
                disabled={!selectedPreset}
                className="w-full rounded-md bg-slate-200 py-2 px-3 text-sm font-semibold text-slate-700 shadow-sm transition-colors hover:bg-slate-300 disabled:cursor-not-allowed disabled:opacity-50"
            >
                Load Preset
            </button>
            <button
                onClick={handleSave}
                className="flex w-full items-center justify-center gap-2 rounded-md bg-lime-500 py-2 px-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-lime-600"
            >
                <span>Save Current</span>
            </button>
        </div>
      </div>
    </div>
  );
};

export default CustomPresetsManager;
