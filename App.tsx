import React, { useState, useEffect, useReducer, useMemo, useCallback } from 'react';
import CalculatorForm from './components/CalculatorForm';
import ResultsDisplay from './components/ResultsDisplay';
import MobileSummaryBar from './components/MobileSummaryBar';
import LoadConfigModal from './components/LoadConfigModal';
import PaywallModal from './components/PaywallModal';
import ProRecipesModal from './components/ProRecipesModal';
import LanguageSwitcher from './components/LanguageSwitcher';
import ThemeToggle from './components/ThemeToggle';
import PlansPage from './components/PlansPage';
import TipsAndTechniquesPage from './components/TipsAndTechniquesPage';
import LoginPage from './pages/Login'; // Import the new Login page
import { SessionContextProvider, useSession } from './components/SessionContextProvider'; // Import SessionContextProvider and useSession
import {
  DoughConfig,
  DoughResult,
  Unit,
  BakeType,
  RecipeStyle,
  SavedDoughConfig,
  FermentationTechnique,
  YeastType,
  UnitSystem,
  ProRecipe,
} from './types';
import {
  DEFAULT_CONFIG,
  RECIPE_STYLE_PRESETS,
  YEAST_OPTIONS,
  PIZZA_STYLES,
} from './constants';
import { EntitlementProvider, useEntitlements } from './entitlements';
import { TranslationProvider, useTranslation } from './i18n';
import { PizzaIcon, BookOpenIcon, StarIcon } from './components/IconComponents';

type Page = 'calculator' | 'tips' | 'plans';

// Reducer for complex state management of the dough configuration
const doughConfigReducer = (
  state: DoughConfig,
  action: { type: string; payload: any },
): DoughConfig => {
  switch (action.type) {
    case 'SET_CONFIG':
      return { ...state, ...action.payload };
    case 'RESET':
      return DEFAULT_CONFIG;
    case 'CHANGE_BAKE_TYPE': {
      const newBakeType = action.payload as BakeType;
      const isPizza = newBakeType === BakeType.PIZZA;
      const newRecipeStyle = isPizza ? RecipeStyle.NAPOLETANA : RecipeStyle.ARTISAN_LOAF;
      const preset = RECIPE_STYLE_PRESETS[newRecipeStyle];
      return {
        ...DEFAULT_CONFIG,
        ...preset,
        bakeType: newBakeType,
        recipeStyle: newRecipeStyle,
        numPizzas: isPizza ? 4 : 2,
      };
    }
    case 'CHANGE_STYLE': {
      const newRecipeStyle = action.payload as RecipeStyle;
      const preset = RECIPE_STYLE_PRESETS[newRecipeStyle];
      return {
        ...state,
        ...preset,
        recipeStyle: newRecipeStyle,
      };
    }
    case 'CHANGE_YEAST_TYPE': {
      const newYeastType = action.payload as YeastType;
      const yeastOption = YEAST_OPTIONS.find((y) => y.value === newYeastType);
      return {
        ...state,
        yeastType: newYeastType,
        yeastPercentage: yeastOption?.defaultPercentage || state.yeastPercentage,
      };
    }
    default:
      return state;
  }
};

function AppInternal() {
  const { t } = useTranslation();
  const { hasProAccess, grantSessionProAccess } = useEntitlements();
  const { session, isLoading: isSessionLoading } = useSession(); // Use session and loading state

  const [config, dispatch] = useReducer(doughConfigReducer, DEFAULT_CONFIG);

  const [results, setResults] = useState<DoughResult | null>(null);
  const [unit, setUnit] = useState<Unit>('g');
  const [unitSystem, setUnitSystem] = useState<UnitSystem>(UnitSystem.METRIC);
  const [savedConfigs, setSavedConfigs] = useState<SavedDoughConfig[]>([]);
  const [isLoadModalOpen, setIsLoadModalOpen] = useState(false);
  const [isPaywallModalOpen, setIsPaywallModalOpen] = useState(false);
  const [isProRecipesModalOpen, setIsProRecipesModalOpen] = useState(false);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [activePage, setActivePage] = useState<Page>('calculator');


  // Load saved configs from local storage on mount
  useEffect(() => {
    try {
      const storedConfigs = localStorage.getItem('dough-lab-saved-configs');
      if (storedConfigs) {
        setSavedConfigs(JSON.parse(storedConfigs));
      }
    } catch (error) {
      console.error('Failed to load saved configs:', error);
    }
  }, []);

  // Theme management
  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    try {
      localStorage.setItem('dough-lab-theme', theme);
    } catch (error) {
      console.error('Failed to save theme:', error);
    }
  }, [theme]);

  useEffect(() => {
    const savedTheme = localStorage.getItem('dough-lab-theme') as 'light' | 'dark' | null;
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (savedTheme) {
      setTheme(savedTheme);
    } else if (prefersDark) {
      setTheme('dark');
    }
  }, []);

  // Dough calculation logic
  useEffect(() => {
    const totalDoughWeight = config.numPizzas * config.doughBallWeight * config.scale;

    const totalPercentage =
      100 + config.hydration + config.salt + config.oil;

    const totalFlour = (totalDoughWeight / totalPercentage) * 100;
    const totalWater = (totalFlour * config.hydration) / 100;
    const totalSalt = (totalFlour * config.salt) / 100;
    const totalOil = (totalFlour * config.oil) / 100;
    const totalYeast = (totalFlour * config.yeastPercentage) / 100;

    let newResults: DoughResult = {
      totalFlour,
      totalWater,
      totalSalt,
      totalOil,
      totalYeast,
      totalDough: totalDoughWeight,
    };

    if (config.fermentationTechnique !== FermentationTechnique.DIRECT) {
      const prefermentFlour = totalFlour * (config.prefermentFlourPercentage / 100);
      let prefermentWater: number;
      
      // Biga is ~60% hydration, Poolish is 100%
      if (config.fermentationTechnique === FermentationTechnique.BIGA) {
        prefermentWater = prefermentFlour * 0.6;
      } else { // POOLISH
        prefermentWater = prefermentFlour;
      }

      // A tiny amount of yeast for the preferment
      const prefermentYeast = prefermentFlour * 0.002;

      newResults = {
        ...newResults,
        preferment: {
          flour: prefermentFlour,
          water: prefermentWater,
          yeast: prefermentYeast,
        },
        finalDough: {
          flour: totalFlour - prefermentFlour,
          water: totalWater - prefermentWater,
          salt: totalSalt,
          oil: totalOil,
          yeast: totalYeast - prefermentYeast,
        },
      };
    }

    setResults(newResults);
  }, [config]);
  
    const handleConfigChange = (newConfig: Partial<DoughConfig>) => {
        dispatch({ type: 'SET_CONFIG', payload: newConfig });
    };
    
    const handleBakeTypeChange = (bakeType: BakeType) => {
        dispatch({ type: 'CHANGE_BAKE_TYPE', payload: bakeType });
    };

    const handleStyleChange = (style: RecipeStyle) => {
        dispatch({ type: 'CHANGE_STYLE', payload: style });
    };
    
    const handleReset = () => {
        dispatch({ type: 'RESET', payload: null });
    };
    
    const handleSaveConfig = (name: string) => {
        if (!hasProAccess) {
            setIsPaywallModalOpen(true);
            return;
        }
        const newSavedConfig = { name, config };
        const updatedConfigs = [...savedConfigs.filter(c => c.name !== name), newSavedConfig];
        setSavedConfigs(updatedConfigs);
        try {
            localStorage.setItem('dough-lab-saved-configs', JSON.stringify(updatedConfigs));
        } catch (error) {
            console.error("Failed to save config:", error);
        }
    };
    
    const handleLoadConfig = (configToLoad: DoughConfig) => {
        dispatch({ type: 'SET_CONFIG', payload: configToLoad });
        setIsLoadModalOpen(false);
    };

    const handleDeleteConfig = (name: string) => {
        const updatedConfigs = savedConfigs.filter(c => c.name !== name);
        setSavedConfigs(updatedConfigs);
        try {
            localStorage.setItem('dough-lab-saved-configs', JSON.stringify(updatedConfigs));
        } catch (error) {
            console.error("Failed to delete config:", error);
        }
    };
    
    const handleOpenLoadModal = () => {
        if (!hasProAccess) {
            setIsPaywallModalOpen(true);
            return;
        }
        setIsLoadModalOpen(true);
    };
    
    const handleLoadProRecipe = (recipeConfig: ProRecipe['config']) => {
        dispatch({ type: 'SET_CONFIG', payload: recipeConfig });
        setIsProRecipesModalOpen(false);
        setActivePage('calculator');
    };
  
    const NavItem: React.FC<{
      page: Page;
      icon: React.ReactNode;
      label: string;
    }> = ({ page, icon, label }) => (
      <button
        onClick={() => setActivePage(page)}
        className={`flex flex-col items-center justify-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium transition-colors sm:flex-row sm:gap-2 ${
          activePage === page
            ? 'bg-lime-100 text-lime-700 dark:bg-lime-500/10 dark:text-lime-300'
            : 'text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-700/50'
        }`}
      >
        {icon}
        <span>{label}</span>
      </button>
    );

  if (isSessionLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-900">
        <p className="text-slate-700 dark:text-slate-300">{t('loading')}</p>
      </div>
    );
  }

  if (!session) {
    return <LoginPage />;
  }

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800 transition-colors duration-300 dark:bg-slate-900 dark:text-slate-200">
      <header className="sticky top-0 z-20 border-b border-slate-200/80 bg-white/80 backdrop-blur-sm dark:border-slate-700/80 dark:bg-slate-900/80">
        <div className="mx-auto flex max-w-7xl items-center justify-between p-4">
          <div className="flex items-center gap-3">
            <PizzaIcon className="h-8 w-8 text-lime-500" />
            <div>
              <h1 className="text-lg font-bold text-slate-900 dark:text-white sm:text-xl">
                {t('header.title')}
              </h1>
              <p className="hidden text-xs text-slate-500 dark:text-slate-400 sm:block">
                {t('header.subtitle')}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 sm:gap-4">
             <div className="hidden items-center gap-2 rounded-full bg-slate-100 p-1 dark:bg-slate-800 sm:flex">
               <NavItem page="calculator" icon={<PizzaIcon className="h-5 w-5" />} label={t('nav.calculator')} />
               <NavItem page="tips" icon={<BookOpenIcon className="h-5 w-5" />} label={t('nav.tips')} />
               <NavItem page="plans" icon={<StarIcon className="h-5 w-5" />} label={t('nav.plans')} />
             </div>
            <LanguageSwitcher />
            <ThemeToggle theme={theme} toggleTheme={() => setTheme(theme === 'light' ? 'dark' : 'light')} />
            <button 
              onClick={() => supabase.auth.signOut()} 
              className="rounded-full p-2 text-slate-500 transition-all hover:bg-slate-200 focus:outline-none focus:ring-2 focus:ring-lime-500 focus:ring-offset-2 dark:text-slate-300 dark:hover:bg-slate-700 dark:hover:text-slate-100 dark:focus:ring-offset-slate-900"
              aria-label={t('auth.sign_out')}
            >
              {/* You might want to use an actual icon here, e.g., LogOutIcon from lucide-react */}
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl p-4 sm:p-6 lg:p-8">
        {activePage === 'calculator' && (
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
                    hasProAccess={hasProAccess}
                    onOpenPaywall={() => setIsPaywallModalOpen(true)}
                  />
                </div>
                {results && (
                  <ResultsDisplay
                    results={results}
                    config={config}
                    unit={unit}
                    onUnitChange={setUnit}
                    unitSystem={unitSystem}
                    hasProAccess={hasProAccess}
                    onOpenPaywall={() => setIsPaywallModalOpen(true)}
                  />
                )}
              </div>
        )}
        {activePage === 'tips' && <TipsAndTechniquesPage onLoadRecipe={handleLoadProRecipe} />}
        {activePage === 'plans' && <PlansPage onGrantAccess={() => { grantSessionProAccess(); setActivePage('calculator'); }} />}
      </main>

      {results && activePage === 'calculator' && (
        <MobileSummaryBar
          totalDough={results.totalDough}
          unit={unit}
          onSave={handleSaveConfig}
          onLoad={handleOpenLoadModal}
          hasProAccess={hasProAccess}
        />
      )}
      
      <footer className="mx-auto max-w-7xl p-4 text-center text-xs text-slate-500 dark:text-slate-400">
        <p>
            {t('footer.copyright', { year: new Date().getFullYear() })}
        </p>
        <div className="mt-4 flex justify-center space-x-2 sm:hidden">
            <button onClick={() => setActivePage('calculator')} className="text-lime-600 dark:text-lime-400">{t('nav.calculator')}</button>
            <span>&middot;</span>
            <button onClick={() => setActivePage('tips')} className="text-lime-600 dark:text-lime-400">{t('nav.tips')}</button>
             <span>&middot;</span>
            <button onClick={() => setActivePage('plans')} className="text-lime-600 dark:text-lime-400">{t('nav.plans')}</button>
        </div>
      </footer>

      <LoadConfigModal
        isOpen={isLoadModalOpen}
        onClose={() => setIsLoadModalOpen(false)}
        configs={savedConfigs}
        onLoad={handleLoadConfig}
        onDelete={handleDeleteConfig}
      />
      
      <ProRecipesModal
        isOpen={isProRecipesModalOpen}
        onClose={() => setIsProRecipesModalOpen(false)}
        onLoadRecipe={handleLoadProRecipe}
      />
      
      <PaywallModal
        isOpen={isPaywallModalOpen}
        onClose={() => setIsPaywallModalOpen(false)}
        onGrantAccess={() => {
            grantSessionProAccess();
            setIsPaywallModalOpen(false);
        }}
      />
    </div>
  );
}

// Wrapper component to provide contexts
const App: React.FC = () => (
    <TranslationProvider>
        <EntitlementProvider>
            <SessionContextProvider> {/* Wrap with SessionContextProvider */}
                <AppInternal />
            </SessionContextProvider>
        </EntitlementProvider>
    </TranslationProvider>
);

export default App;