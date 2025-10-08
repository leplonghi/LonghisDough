import React, {
  useState,
  useMemo,
  useCallback,
  useRef,
  useEffect,
} from 'react';
import {
  DoughConfig,
  DoughResult,
  Unit,
  RecipeStyle,
  FermentationTechnique,
  YeastType,
} from './types';
import {
  DEFAULT_CONFIG,
  YEAST_OPTIONS,
  RECIPE_STYLE_PRESETS,
} from './constants';
import CalculatorForm from './components/CalculatorForm';
import ResultsDisplay from './components/ResultsDisplay';
import { PizzaIcon } from './components/IconComponents';
import MobileSummaryBar from './components/MobileSummaryBar';
import ThemeToggle from './components/ThemeToggle';

type Theme = 'light' | 'dark';

const App: React.FC = () => {
  const [config, setConfig] = useState<DoughConfig>(DEFAULT_CONFIG);
  const [unit, setUnit] = useState<Unit>('g');
  const [theme, setTheme] = useState<Theme>('light');
  const resultsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as Theme | null;
    const userPrefersDark =
      window.matchMedia &&
      window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (savedTheme) {
      setTheme(savedTheme);
    } else if (userPrefersDark) {
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

  const toggleTheme = useCallback(() => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  }, []);

  const results = useMemo<DoughResult>(() => {
    // Step 1: Calculate total ingredient weights based on baker's percentages
    const totalDoughWeight = config.numPizzas * config.doughBallWeight;
    const totalPercentage =
      1 +
      config.hydration / 100 +
      config.salt / 100 +
      config.oil / 100 +
      config.yeastPercentage / 100;

    const totalFlour = totalDoughWeight / totalPercentage;
    const totalWater = totalFlour * (config.hydration / 100);
    const totalSalt = totalFlour * (config.salt / 100);
    const totalOil = totalFlour * (config.oil / 100);
    const totalYeast = totalFlour * (config.yeastPercentage / 100);

    const baseResult = {
      totalFlour,
      totalWater,
      totalSalt,
      totalOil,
      totalYeast,
      totalDough: totalDoughWeight,
    };

    // Step 2: If using a preferment, calculate its composition and adjust the final dough
    if (config.fermentationTechnique === FermentationTechnique.DIRECT) {
      return baseResult;
    } else {
      // Step 2a: Calculate flour for the preferment
      const prefermentFlour =
        totalFlour * (config.prefermentFlourPercentage / 100);

      // Step 2b: Calculate water for the preferment based on its type.
      // Poolish is a liquid starter at 100% hydration (equal weights flour and water).
      // Biga is a stiff starter, typically 45-60% hydration. We use a standard 50%.
      const prefermentHydrationRatio =
        config.fermentationTechnique === FermentationTechnique.POOLISH
          ? 1.0
          : 0.5;
      const prefermentWater = prefermentFlour * prefermentHydrationRatio;

      // Step 2c: Calculate yeast for the preferment based on established formulas
      let prefermentYeast: number;
      if (config.fermentationTechnique === FermentationTechnique.POOLISH) {
        // Poolish yeast is ~0.3% of its flour weight for IDY. This is adjusted for other yeast types.
        let yeastMultiplier = 1.0;
        if (config.yeastType === YeastType.ADY) yeastMultiplier = 1.4;
        else if (config.yeastType === YeastType.FRESH) yeastMultiplier = 3.0;
        prefermentYeast = prefermentFlour * 0.003 * yeastMultiplier;
      } else {
        // Biga
        // Biga uses a very small amount of yeast for a slow, cold fermentation, typically ~0.1% of its flour.
        prefermentYeast = prefermentFlour * 0.001;
      }

      // Step 3: Define the final recipe with preferment and final dough ingredients
      return {
        ...baseResult,
        preferment: {
          flour: prefermentFlour,
          water: prefermentWater,
          yeast: prefermentYeast,
        },
        finalDough: {
          flour: totalFlour - prefermentFlour,
          water: Math.max(0, totalWater - prefermentWater),
          salt: totalSalt,
          oil: totalOil,
          // The remaining yeast is added to the final dough.
          yeast: Math.max(0, totalYeast - prefermentYeast),
        },
      };
    }
  }, [config]);

  const handleConfigChange = useCallback((newConfig: Partial<DoughConfig>) => {
    setConfig((prevConfig) => {
      const updatedConfig = { ...prevConfig, ...newConfig };

      if (
        'yeastType' in newConfig &&
        newConfig.yeastType !== prevConfig.yeastType
      ) {
        const selectedYeast = YEAST_OPTIONS.find(
          (y) => y.value === newConfig.yeastType,
        );
        if (selectedYeast) {
          updatedConfig.yeastPercentage = selectedYeast.defaultPercentage;
        }
      }

      return updatedConfig;
    });
  }, []);

  const handleStyleChange = useCallback((style: RecipeStyle) => {
    setConfig((prevConfig) => ({
      ...prevConfig,
      recipeStyle: style,
      ...RECIPE_STYLE_PRESETS[style],
    }));
  }, []);

  const handleReset = useCallback(() => {
    setConfig(DEFAULT_CONFIG);
  }, []);

  const handleUnitChange = useCallback((newUnit: Unit) => {
    setUnit(newUnit);
  }, []);

  const handleShowResults = useCallback(() => {
    resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, []);

  return (
    <>
      <div className="flex min-h-screen flex-col items-center bg-slate-50 p-4 text-slate-800 transition-colors duration-300 dark:bg-slate-900 dark:text-slate-100 sm:p-6 lg:p-8">
        <div className="mx-auto w-full max-w-6xl pb-24 lg:pb-0">
          <header className="relative mb-6 flex items-center justify-center text-center">
            <div className="flex items-center">
              <PizzaIcon className="mr-3 h-10 w-10 text-lime-500" />
              <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-50 sm:text-4xl">
                Longhi's Pizza Dough Calculator
              </h1>
            </div>
            <div className="absolute right-0 top-1/2 -translate-y-1/2">
              <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
            </div>
          </header>

          <main className="grid grid-cols-1 gap-y-6 lg:grid-cols-5 lg:gap-8">
            <div className="lg:col-span-3">
              <CalculatorForm
                config={config}
                onConfigChange={handleConfigChange}
                onStyleChange={handleStyleChange}
                onReset={handleReset}
              />
            </div>
            <div ref={resultsRef} className="lg:col-span-2">
              <ResultsDisplay
                results={results}
                config={config}
                unit={unit}
                onUnitChange={handleUnitChange}
              />
            </div>
          </main>

          <footer className="mt-8 text-center text-sm text-slate-500 dark:text-slate-200">
            <p>Happy pizza making!</p>
          </footer>
        </div>
      </div>
      <MobileSummaryBar
        totalDough={results.totalDough}
        unit={unit}
        onShowResults={handleShowResults}
      />
    </>
  );
};

export default App;