
import { Batch, MyLabEnvironmentSettings, Suggestion } from '../types';

/**
 * Sorts batches by creation date in descending order (most recent first).
 * @param batches - Array of Batch objects.
 * @returns A new array of sorted Batch objects.
 */
export const getSortedSavedConfigs = (batches: Batch[]): Batch[] => {
  if (!batches) return [];
  return [...batches].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
};

/**
 * Gets the most recently created batch from a list.
 * @param batches - Array of Batch objects.
 * @returns The most recent Batch object, or undefined if the array is empty.
 */
export const getLastSavedConfig = (batches: Batch[]): Batch | undefined => {
  if (!batches || batches.length === 0) {
    return undefined;
  }
  const sorted = getSortedSavedConfigs(batches);
  return sorted[0];
};

const MYLAB_ENVIRONMENT_KEY = 'doughlabpro.mylab.environment';

/**
 * Loads the user's environment settings from localStorage.
 * @returns The saved settings object, or null if not found or on error.
 */
export const loadEnvironmentSettings = (): MyLabEnvironmentSettings | null => {
  try {
    const rawData = localStorage.getItem(MYLAB_ENVIRONMENT_KEY);
    return rawData ? JSON.parse(rawData) : null;
  } catch (error) {
    console.error('Failed to load environment settings:', error);
    return null;
  }
};

/**
 * Saves the user's environment settings to localStorage.
 * @param settings - The settings object to save.
 */
export const saveEnvironmentSettings = (settings: MyLabEnvironmentSettings): void => {
  try {
    localStorage.setItem(MYLAB_ENVIRONMENT_KEY, JSON.stringify(settings));
  } catch (error) {
    console.error('Failed to save environment settings:', error);
  }
};

/**
 * Provides a recipe suggestion based on the user's environment.
 * @param environment - The user's saved environment settings.
 * @param batches - The user's saved batches (for future use).
 * @returns A Suggestion object or null.
 */
export function getTodaySuggestion(
  environment?: MyLabEnvironmentSettings | null,
  batches?: Batch[] // TODO: Use batches for more intelligent suggestions based on user history
): Suggestion | null {
  if (environment?.ambientTempC && environment.ambientTempC > 27) {
    return {
      id: 'hot_day_neapolitan',
      titleKey: 'suggestions.hot_day.title',
      descriptionKey: 'suggestions.hot_day.desc',
      presetId: 'pizza_napoletana_avpn', // Neapolitan preset
    };
  }

  if (
    (environment?.ovenType === 'HOME_GAS' || environment?.ovenType === 'HOME_ELECTRIC') &&
    environment?.bakingSurface === 'STEEL'
  ) {
    return {
      id: 'steel_ny_style',
      titleKey: 'suggestions.steel_oven.title',
      descriptionKey: 'suggestions.steel_oven.desc',
      presetId: 'pizza_newyork_slice', // NY Style preset
    };
  }

  if (environment?.ambientTempC && environment.ambientTempC < 20) {
    return {
      id: 'cold_day_detroit',
      titleKey: 'suggestions.cold_day.title',
      descriptionKey: 'suggestions.cold_day.desc',
      presetId: 'pizza_detroit', // Detroit style preset (good for long ferments)
    };
  }

  // Default fallback suggestion if no specific environment matches
  return {
      id: 'default_explore_focaccia',
      titleKey: 'suggestions.default.title',
      descriptionKey: 'suggestions.default.desc',
      presetId: 'focaccia_classic',
  };
}