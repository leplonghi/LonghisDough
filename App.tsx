import React, { useState, useEffect, useCallback, useMemo } from 'react';
import {
  DoughConfig,
  DoughResult,
  Unit,
  RecipeStyle,
  FermentationTechnique,
  SavedDoughConfig,
  BakeType,
  UnitSystem,
} from './types';
import {
  DEFAULT_CONFIG,
  RECIPE_STYLE_PRESETS,
  YEAST_OPTIONS,
  BREAD_STYLES,
} from './constants';
import CalculatorForm from './components/CalculatorForm';
import ResultsDisplay from './components/ResultsDisplay';
import ThemeToggle from './components/ThemeToggle';
import LanguageSwitcher from './components/LanguageSwitcher';
import { LanguageProvider, useTranslation } from './i18n';
import MobileSummaryBar from './components/MobileSummaryBar';
import { PizzaIcon, UserIcon } from './components/IconComponents';
import LoadConfigModal from './components/LoadConfigModal';

type Theme = 'light' | 'dark';

const calculateDough = (config: DoughConfig): DoughResult => {
  const totalDoughWeight =
    config.numPizzas * config.doughBallWeight * config.scale;
  const totalPercentage =
    100 +
    config.hydration +
    config.salt +
    config.oil +
    config.yeastPercentage;

  const totalFlour = (totalDoughWeight * 100) / totalPercentage;
  const totalWater = totalFlour * (config.hydration / 100);
  const totalSalt = totalFlour * (config.salt / 100);
  const totalOil = totalFlour * (config.oil / 100);
  const totalYeast = totalFlour * (config.yeastPercentage / 100);

  const result: DoughResult = {
    totalFlour,
    totalWater,
    totalSalt,
    totalOil,
    totalYeast,
    totalDough: totalDoughWeight,
  };

  if (config.fermentationTechnique !== FermentationTechnique.DIRECT) {
    const prefermentFlour =
      totalFlour * (config.prefermentFlourPercentage / 100);
    let prefermentWater = 0;
    // Poolish is 100% hydration, Biga is typically 45-60%. We'll use 50%.
    if (config.fermentationTechnique === FermentationTechnique.POOLISH) {
      prefermentWater = prefermentFlour;
    } else if (config.fermentationTechnique === FermentationTechnique.BIGA) {
      prefermentWater = prefermentFlour * 0.5;
    }
    // A tiny amount of yeast for the preferment, e.g., 0.1% of preferment flour weight
    const prefermentYeast = prefermentFlour * 0.001;

    result.preferment = {
      flour: prefermentFlour,
      water: prefermentWater,
      yeast: prefermentYeast,
    };

    result.finalDough = {
      flour: totalFlour - prefermentFlour,
      water: Math.max(0, totalWater - prefermentWater),
      salt: totalSalt,
      oil: totalOil,
      // Ensure yeast in final dough is not negative
      yeast: Math.max(0, totalYeast - prefermentYeast),
    };
  }

  return result;
};

const AppContent: React.FC = () => {
  const { t } = useTranslation();
  const [config, setConfig] = useState<DoughConfig>(DEFAULT_CONFIG);
  const [unit, setUnit] = useState<Unit>('g');
  const [unitSystem, setUnitSystem] = useState<UnitSystem>(
    UnitSystem.US_CUSTOMARY,
  );
  const [theme, setTheme] = useState<Theme>('light');
  const [isLoadModalOpen, setIsLoadModalOpen] = useState(false);
  const [savedConfigs, setSavedConfigs] = useState<SavedDoughConfig[]>([]);

  const STORAGE_KEY = 'doughlabpro_configs';

  useEffect(() => {
    // Load config from URL first
    const urlParams = new URLSearchParams(window.location.search);
    const recipeData = urlParams.get('recipe');
    if (recipeData) {
      try {
        const decodedConfig = atob(recipeData);
        const parsedConfig: DoughConfig = JSON.parse(decodedConfig);
        // Basic validation to ensure it's a valid config object
        if (parsedConfig && typeof parsedConfig.numPizzas === 'number') {
          setConfig(parsedConfig);
          // Clean the URL to avoid reloading the same config on refresh
          window.history.replaceState({}, '', window.location.pathname);
          return; // Stop further execution to avoid overwriting with defaults
        }
      } catch (error) {
        console.error('Failed to parse recipe from URL:', error);
      }
    }
  }, []);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as Theme;
    const prefersDark =
      window.matchMedia &&
      window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (savedTheme) {
      setTheme(savedTheme);
    } else if (prefersDark) {
      setTheme('dark');
    }
  }, []);

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  const handleConfigChange = useCallback((newConfig: Partial<DoughConfig>) => {
    // If yeast type is changed, also update the yeast percentage to its default
    if (newConfig.yeastType) {
      const yeastDefaults = YEAST_OPTIONS.find(
        (y) => y.value === newConfig.yeastType,
      );
      if (yeastDefaults) {
        setConfig((prev) => ({
          ...prev,
          ...newConfig,
          yeastPercentage: yeastDefaults.defaultPercentage,
        }));
        return;
      }
    }
    setConfig((prev) => ({ ...prev, ...newConfig }));
  }, []);

  const handleBakeTypeChange = useCallback(
    (bakeType: BakeType) => {
      if (bakeType === config.bakeType) return; // No change

      // When switching bake type, select the default style for that type
      const defaultStyle =
        bakeType === BakeType.PIZZA
          ? RecipeStyle.NAPOLETANA
          : RecipeStyle.ARTISAN_LOAF;

      const { description: _, ...preset } = RECIPE_STYLE_PRESETS[defaultStyle];

      setConfig((prev) => ({
        ...prev,
        ...preset, // Apply the new preset values
        bakeType,
        recipeStyle: defaultStyle,
      }));
    },
    [config.bakeType],
  );

  const handleStyleChange = useCallback((style: RecipeStyle) => {
    const { description: _, ...presetConfig } = RECIPE_STYLE_PRESETS[style];
    const newBakeType = BREAD_STYLES.includes(style)
      ? BakeType.BREAD
      : BakeType.PIZZA;
    setConfig((prev) => ({
      ...prev,
      bakeType: newBakeType,
      recipeStyle: style,
      ...presetConfig,
    }));
  }, []);

  const handleReset = useCallback(() => {
    setConfig(DEFAULT_CONFIG);
  }, []);

  const results = useMemo(() => calculateDough(config), [config]);

  const handleSaveConfig = useCallback(
    (name: string) => {
      try {
        const rawData = localStorage.getItem(STORAGE_KEY);
        const configs: SavedDoughConfig[] = rawData ? JSON.parse(rawData) : [];
        const existingIndex = configs.findIndex((c) => c.name === name);

        if (existingIndex > -1) {
          if (!confirm(t('form.config_exists_overwrite'))) {
            return;
          }
          configs[existingIndex].config = config;
        } else {
          configs.push({ name, config });
        }

        localStorage.setItem(STORAGE_KEY, JSON.stringify(configs));
        alert(t('form.config_saved'));
      } catch (error) {
        console.error('Failed to save configuration:', error);
        alert('Error saving configuration.');
      }
    },
    [config, t],
  );

  const handleOpenLoadModal = useCallback(() => {
    try {
      const rawData = localStorage.getItem(STORAGE_KEY);
      const configs: SavedDoughConfig[] = rawData ? JSON.parse(rawData) : [];
      setSavedConfigs(configs);
      setIsLoadModalOpen(true);
    } catch (error) {
      console.error('Failed to load configurations:', error);
      setSavedConfigs([]);
      setIsLoadModalOpen(true);
    }
  }, []);

  const handleLoadConfig = useCallback((newConfig: DoughConfig) => {
    setConfig(newConfig);
    setIsLoadModalOpen(false);
  }, []);

  const handleDeleteConfig = useCallback((name: string) => {
    try {
      const rawData = localStorage.getItem(STORAGE_KEY);
      let configs: SavedDoughConfig[] = rawData ? JSON.parse(rawData) : [];
      configs = configs.filter((c) => c.name !== name);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(configs));
      setSavedConfigs(configs); // Update state to re-render modal
    } catch (error) {
      console.error('Failed to delete configuration:', error);
    }
  }, []);

  return (
    <div className="min-h-screen bg-slate-100 font-sans text-slate-800 transition-colors duration-300 dark:bg-slate-900 dark:text-slate-200">
      <header className="sticky top-0 z-20 border-b border-slate-200 bg-white/80 backdrop-blur-sm transition-colors duration-300 dark:border-slate-800 dark:bg-slate-900/80">
        <div className="mx-auto flex max-w-7xl items-center p-3 sm:p-4">
          <div className="flex flex-1 justify-start">
            {/* Can add a logo or other links here later */}
          </div>

          <div className="flex flex-shrink-0 items-center justify-center gap-2">
            <PizzaIcon className="h-7 w-7 text-lime-500" />
            <h1 className="truncate text-center text-lg font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-xl">
              {t('appName')}
            </h1>
          </div>

          <div className="flex flex-1 items-center justify-end space-x-2 sm:space-x-3">
            <LanguageSwitcher />
            <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
            <div className="group relative">
              <button
                className="rounded-full p-2 text-slate-500 transition-all hover:bg-slate-200 focus:outline-none focus:ring-2 focus:ring-lime-500 focus:ring-offset-2 dark:text-slate-400 dark:hover:bg-slate-700 dark:hover:text-slate-100 dark:focus:ring-offset-slate-900"
                aria-label={t('header.user_profile')}
              >
                <UserIcon className="h-6 w-6" />
              </button>
              <span className="pointer-events-none absolute top-full right-0 mt-2 w-max rounded-md bg-slate-800 px-2 py-1 text-xs text-white opacity-0 shadow-lg transition-opacity group-hover:opacity-100 dark:bg-slate-700">
                {t('header.user_profile_tooltip')}
              </span>
            </div>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl p-4 pb-32 sm:p-6 sm:pb-28 lg:p-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:items-start">
          <div className="lg:sticky lg:top-24">
            <CalculatorForm
              config={config}
              onConfigChange={handleConfigChange}
              onBakeTypeChange={handleBakeTypeChange}
              onStyleChange={handleStyleChange}
              onReset={handleReset}
              unitSystem={unitSystem}
              onUnitSystemChange={setUnitSystem}
            />
          </div>
          <div id="results-section">
            <ResultsDisplay
              results={results}
              config={config}
              unit={unit}
              onUnitChange={setUnit}
              unitSystem={unitSystem}
            />
          </div>
        </div>
      </main>

      <MobileSummaryBar
        totalDough={results.totalDough}
        unit={unit}
        onSave={handleSaveConfig}
        onLoad={handleOpenLoadModal}
      />

      <LoadConfigModal
        isOpen={isLoadModalOpen}
        onClose={() => setIsLoadModalOpen(false)}
        configs={savedConfigs}
        onLoad={handleLoadConfig}
        onDelete={handleDeleteConfig}
      />
    </div>
  );
};

const App: React.FC = () => (
  <LanguageProvider>
    <AppContent />
  </LanguageProvider>
);

export default App;
