import React, { useState, useEffect, useCallback } from 'react';
import CalculatorForm from './components/CalculatorForm';
import ResultsDisplay from './components/ResultsDisplay';
import {
  DoughConfig,
  DoughResult,
  Unit,
  UnitSystem,
  BakeType,
  RecipeStyle,
  YeastType,
  SavedDoughConfig,
  ProRecipe,
} from './types';
import { DEFAULT_CONFIG, RECIPE_STYLE_PRESETS, YEAST_OPTIONS } from './constants';
import ThemeToggle from './components/ThemeToggle';
import LanguageSwitcher from './components/LanguageSwitcher';
import { PizzaIcon, BookOpenIcon } from './components/IconComponents';
import MobileSummaryBar from './components/MobileSummaryBar';
import LoadConfigModal from './components/LoadConfigModal';
import PaywallModal from './components/PaywallModal';
import ProRecipesModal from './components/ProRecipesModal';
import { I18nProvider, useTranslation } from './i18n';
import { EntitlementProvider, useEntitlements } from './entitlements';
import PlansPage from './components/PlansPage'; // To satisfy the build, though not used in this layout

const SAVED_CONFIGS_KEY = 'doughlab_saved_configs';

const calculateDough = (config: DoughConfig): DoughResult => {
  const {
    numPizzas,
    doughBallWeight,
    hydration,
    salt,
    oil,
    yeastPercentage,
    fermentationTechnique,
    prefermentFlourPercentage,
    scale,
  } = config;

  const totalDoughWeight = numPizzas * doughBallWeight * scale;

  const totalPercentage =
    100 + hydration + salt + oil;

  const totalFlour = (totalDoughWeight / totalPercentage) * 100;
  const totalWater = (totalFlour * hydration) / 100;
  const totalSalt = (totalFlour * salt) / 100;
  const totalOil = (totalFlour * oil) / 100;
  const totalYeast = (totalFlour * yeastPercentage) / 100;
  
  const result: DoughResult = {
    totalFlour,
    totalWater,
    totalSalt,
    totalOil,
    totalYeast,
    totalDough: totalDoughWeight,
  };

  if (fermentationTechnique !== 'DIRECT') {
    const prefermentFlour = (totalFlour * prefermentFlourPercentage) / 100;
    let prefermentWater = prefermentFlour; // Poolish is 100% hydration
    if (fermentationTechnique === 'BIGA') {
      prefermentWater = prefermentFlour * 0.5; // Biga is often ~50%
    }
    
    // Use a tiny amount of yeast for the preferment, e.g., 0.1% of preferment flour weight
    const prefermentYeast = prefermentFlour * 0.001;

    result.preferment = {
      flour: prefermentFlour,
      water: prefermentWater,
      yeast: prefermentYeast,
    };

    result.finalDough = {
      flour: totalFlour - prefermentFlour,
      water: totalWater - prefermentWater,
      salt: totalSalt,
      oil: totalOil,
      yeast: totalYeast - prefermentYeast,
    };
  }

  return result;
};


const AppContent: React.FC = () => {
  const { t } = useTranslation();
  const { hasProAccess, grantProAccess, grantSessionProAccess } = useEntitlements();
  const [config, setConfig] = useState<DoughConfig>(DEFAULT_CONFIG);
  const [results, setResults] = useState<DoughResult>(() => calculateDough(DEFAULT_CONFIG));
  const [unit, setUnit] = useState<Unit>('g');
  const [unitSystem, setUnitSystem] = useState<UnitSystem>(UnitSystem.METRIC);
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    if (typeof window !== 'undefined' && window.localStorage) {
      const storedTheme = window.localStorage.getItem('theme');
      if (storedTheme === 'dark' || storedTheme === 'light') return storedTheme;
      if (window.matchMedia('(prefers-color-scheme: dark)').matches) return 'dark';
    }
    return 'light';
  });
  
  const [savedConfigs, setSavedConfigs] = useState<SavedDoughConfig[]>([]);
  const [isLoadModalOpen, setIsLoadModalOpen] = useState(false);
  const [isPaywallModalOpen, setIsPaywallModalOpen] = useState(false);
  const [isProRecipesModalOpen, setIsProRecipesModalOpen] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
    localStorage.setItem('theme', theme);
  }, [theme]);
  
  // Effect for activating test mode via URL parameter
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('test_pro') === 'true') {
      grantSessionProAccess();
      // Clean up URL to remove the parameter after activation
      const newUrl = `${window.location.pathname}${window.location.hash}`;
      window.history.replaceState({}, document.title, newUrl);
    }
  }, [grantSessionProAccess]);


  useEffect(() => {
    try {
      const stored = localStorage.getItem(SAVED_CONFIGS_KEY);
      if (stored) {
        setSavedConfigs(JSON.parse(stored));
      }
    } catch (e) { console.error("Failed to load saved configs", e); }
  }, []);

  useEffect(() => {
    const newResults = calculateDough(config);
    setResults(newResults);
  }, [config]);

  const handleConfigChange = useCallback((newConfig: Partial<DoughConfig>) => {
    setConfig(prev => ({ ...prev, ...newConfig }));
  }, []);

  const handleYeastTypeChange = useCallback((newYeastType: YeastType) => {
    const yeastOption = YEAST_OPTIONS.find(y => y.value === newYeastType);
    setConfig(prev => ({
      ...prev,
      yeastType: newYeastType,
      yeastPercentage: yeastOption?.defaultPercentage || prev.yeastPercentage
    }));
  }, []);
  
  const handleBakeTypeChange = (bakeType: BakeType) => {
    const isPizza = bakeType === BakeType.PIZZA;
    const defaultStyle = isPizza ? RecipeStyle.NAPOLETANA : RecipeStyle.ARTISAN_LOAF;
    const stylePreset = RECIPE_STYLE_PRESETS[defaultStyle];

    setConfig(prev => ({
      ...prev,
      ...stylePreset,
      bakeType,
      recipeStyle: defaultStyle
    }));
  };

  const handleStyleChange = (style: RecipeStyle) => {
    const stylePreset = RECIPE_STYLE_PRESETS[style];
    setConfig(prev => ({
      ...prev,
      ...stylePreset,
      recipeStyle: style,
    }));
  };
  
  const handleReset = () => {
    setConfig(DEFAULT_CONFIG);
  };
  
  const handleSaveConfig = (name: string) => {
    const newSavedConfig = { name, config };
    const newConfigs = [newSavedConfig, ...savedConfigs.filter(c => c.name !== name)];
    setSavedConfigs(newConfigs);
    localStorage.setItem(SAVED_CONFIGS_KEY, JSON.stringify(newConfigs));
  };
  
  const handleLoadConfig = (loadedConfig: DoughConfig) => {
    setConfig(loadedConfig);
    setIsLoadModalOpen(false);
  };
  
  const handleDeleteConfig = (name: string) => {
    const newConfigs = savedConfigs.filter(c => c.name !== name);
    setSavedConfigs(newConfigs);
    localStorage.setItem(SAVED_CONFIGS_KEY, JSON.stringify(newConfigs));
  };

  const handleLoadProRecipe = (recipeConfig: ProRecipe['config']) => {
    setConfig(prev => ({...prev, ...recipeConfig}));
    setIsProRecipesModalOpen(false);
  };

  const toggleTheme = () => setTheme(theme === 'light' ? 'dark' : 'light');

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800 transition-colors duration-300 dark:bg-slate-900 dark:text-slate-200">
      <header className="sticky top-0 z-20 w-full border-b border-slate-200/80 bg-white/80 backdrop-blur-sm transition-colors duration-300 dark:border-slate-700/80 dark:bg-slate-900/80">
        <div className="mx-auto flex max-w-7xl items-center justify-between p-4">
          <div className="flex items-center gap-2">
            <PizzaIcon className="h-8 w-8 text-lime-500" />
            <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
              {t('header.title')}
              <span className="ml-2 rounded-md bg-lime-500 px-1.5 py-0.5 text-xs font-bold text-white">
                {t('header.subtitle')}
              </span>
            </h1>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsProRecipesModalOpen(true)}
              className="hidden sm:flex items-center gap-2 rounded-lg px-3 py-1.5 text-sm font-semibold text-slate-600 ring-1 ring-slate-200 transition-all hover:bg-slate-100 dark:text-slate-300 dark:ring-slate-700 dark:hover:bg-slate-800"
            >
              <BookOpenIcon className="h-5 w-5"/>
              Pro Recipes
            </button>
            <LanguageSwitcher />
            <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl p-4 sm:p-6 lg:p-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:items-start">
          <div className="lg:sticky lg:top-24">
            <CalculatorForm
              config={config}
              onConfigChange={(newConfig) => {
                if ('yeastType' in newConfig && newConfig.yeastType) {
                    handleYeastTypeChange(newConfig.yeastType as YeastType);
                } else {
                    handleConfigChange(newConfig);
                }
              }}
              onBakeTypeChange={handleBakeTypeChange}
              onStyleChange={handleStyleChange}
              onReset={handleReset}
              unitSystem={unitSystem}
              onUnitSystemChange={setUnitSystem}
              hasProAccess={hasProAccess()}
              onOpenPaywall={() => setIsPaywallModalOpen(true)}
            />
          </div>
          <div className="pb-24 sm:pb-0">
            <ResultsDisplay
              results={results}
              config={config}
              unit={unit}
              onUnitChange={setUnit}
              unitSystem={unitSystem}
              hasProAccess={hasProAccess()}
              onOpenPaywall={() => setIsPaywallModalOpen(true)}
            />
          </div>
        </div>
      </main>

      <div className="block sm:hidden">
        <MobileSummaryBar 
          totalDough={results.totalDough}
          unit={unit}
          onSave={handleSaveConfig}
          onLoad={() => setIsLoadModalOpen(true)}
        />
      </div>

      <LoadConfigModal
        isOpen={isLoadModalOpen}
        onClose={() => setIsLoadModalOpen(false)}
        configs={savedConfigs}
        onLoad={handleLoadConfig}
        onDelete={handleDeleteConfig}
      />
      <PaywallModal
        isOpen={isPaywallModalOpen}
        onClose={() => setIsPaywallModalOpen(false)}
        onSuccess={() => {
          grantProAccess();
          setIsPaywallModalOpen(false);
        }}
      />
      <ProRecipesModal
        isOpen={isProRecipesModalOpen}
        onClose={() => setIsProRecipesModalOpen(false)}
        onLoadRecipe={handleLoadProRecipe}
      />

    </div>
  );
};

const App: React.FC = () => {
  return (
    <I18nProvider>
      <EntitlementProvider>
        <AppContent />
      </EntitlementProvider>
    </I18nProvider>
  );
};

export default App;
