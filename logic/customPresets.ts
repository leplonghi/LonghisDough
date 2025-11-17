import { DoughConfig } from '../types';

const STORAGE_KEY = 'doughlabpro.custompresets';

interface StoredPreset {
  name: string;
  config: DoughConfig;
}

function getPresets(): StoredPreset[] {
  try {
    const rawData = localStorage.getItem(STORAGE_KEY);
    if (!rawData) return [];
    const parsed = JSON.parse(rawData);
    return Array.isArray(parsed) ? parsed : [];
  } catch (error) {
    console.error('Failed to load custom presets:', error);
    return [];
  }
}

function saveAllPresets(presets: StoredPreset[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(presets));
  } catch (error) {
    console.error('Failed to save custom presets:', error);
  }
}

export function saveCustomPreset(name: string, config: DoughConfig): void {
  if (!name || name.trim() === '') {
    console.error('Preset name cannot be empty.');
    return;
  }
  const presets = getPresets();
  const existingIndex = presets.findIndex(p => p.name === name);
  const newPreset = { name, config };

  if (existingIndex > -1) {
    // A confirmation could be added here in a real scenario
    presets[existingIndex] = newPreset; // Update existing
  } else {
    presets.push(newPreset); // Add new
  }
  saveAllPresets(presets);
}

export function loadCustomPreset(name: string): DoughConfig | null {
  const presets = getPresets();
  const found = presets.find(p => p.name === name);
  return found ? found.config : null;
}

export function listCustomPresets(): { name: string }[] {
  return getPresets().map(p => ({ name: p.name })).sort((a, b) => a.name.localeCompare(b.name));
}

export function deleteCustomPreset(name: string): void {
  const presets = getPresets();
  const updatedPresets = presets.filter(p => p.name !== name);
  saveAllPresets(updatedPresets);
}
