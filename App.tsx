import React, { useState, useEffect, useCallback, useMemo } from 'react';
import {
  DoughConfig,
  DoughResult,
  Unit,
  RecipeStyle,
  FermentationTechnique,
} from './types';
import {
  DEFAULT_CONFIG,
  RECIPE_STYLE_PRESETS,
  YEAST_OPTIONS,
} from './constants';
import CalculatorForm from './components/CalculatorForm';
import ResultsDisplay from './components/ResultsDisplay';
import ThemeToggle from './components/ThemeToggle';
import LanguageSwitcher from './components/LanguageSwitcher';
import { LanguageProvider, useTranslation } from './i18n';
import MobileSummaryBar from './components/MobileSummaryBar';
import { PizzaIcon } from './components/IconComponents';

type Theme = 'light' | 'dark';

const calculateDough = (config: DoughConfig): DoughResult => {
  const totalDoughWeight = config.numPizzas * config.doughBallWeight;
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
  const [theme, setTheme] = useState<Theme>('light');

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

  const handleStyleChange = useCallback((style: RecipeStyle) => {
    const preset = RECIPE_STYLE_PRESETS[style];
    setConfig((prev) => ({
      ...prev,
      recipeStyle: style,
      ...preset,
    }));
  }, []);

  const handleReset = useCallback(() => {
    setConfig(DEFAULT_CONFIG);
  }, []);

  const results = useMemo(() => calculateDough(config), [config]);

  const showResultsOnMobile = () => {
    const resultsElement = document.getElementById('results-section');
    resultsElement?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800 transition-colors duration-300 dark:bg-slate-900 dark:text-slate-200">
      <header className="sticky top-0 z-20 border-b border-slate-200 bg-white/80 backdrop-blur-sm transition-colors duration-300 dark:border-slate-700 dark:bg-slate-900/80">
        <div className="mx-auto flex max-w-6xl items-center p-3 sm:p-4">
          {/* Left side: This column will balance the right side */}
          <div className="flex w-20 justify-start sm:w-24">
            {/* Empty for balance */}
          </div>
          {/* Center: Takes up remaining space */}
          <div className="flex flex-1 min-w-0 items-center justify-center gap-2">
            <PizzaIcon className="h-6 w-6 flex-shrink-0 text-lime-500" />
            <h1 className="truncate text-center text-base font-bold text-slate-900 dark:text-white sm:text-xl">
              {t('appName')}
            </h1>
          </div>
          {/* Right side: Controls */}
          <div className="flex w-20 items-center justify-end space-x-1 sm:w-24 sm:space-x-2">
            <LanguageSwitcher />
            <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl p-4 sm:p-6 lg:p-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:items-start">
          <div className="lg:sticky lg:top-24">
            <CalculatorForm
              config={config}
              onConfigChange={handleConfigChange}
              onStyleChange={handleStyleChange}
              onReset={handleReset}
            />
          </div>
          <div id="results-section">
            <ResultsDisplay
              results={results}
              config={config}
              unit={unit}
              onUnitChange={setUnit}
            />
          </div>
        </div>
      </main>

      <MobileSummaryBar
        totalDough={results.totalDough}
        unit={unit}
        onShowResults={showResultsOnMobile}
      />

      <footer className="mt-8 py-8 text-center text-sm text-slate-500 dark:text-slate-400 sm:mt-12">
        <p>
          &copy; {new Date().getFullYear()} DoughLabPro.{' '}
          {t('footer.pizza_making')}
        </p>
      </footer>
    </div>
  );
};

const App: React.FC = () => (
  <LanguageProvider>
    <AppContent />
  </LanguageProvider>
);

export default App;
