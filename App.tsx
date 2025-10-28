import React, { useState, useEffect, useCallback, useMemo } from 'react';
import CalculatorForm from './components/CalculatorForm';
import ResultsDisplay from './components/ResultsDisplay';
import {
  DoughConfig,
  DoughResult,
  BakeType,
  RecipeStyle,
  YeastType,
  FermentationTechnique,
  Unit,
  UnitSystem,
  SavedDoughConfig,
  ProRecipe,
} from './types';
import { RECIPE_STYLE_PRESETS } from './constants';
import { I18nProvider, useTranslation } from './i18n';
import { EntitlementProvider, useEntitlements } from './entitlements';
import { AuthProvider, useAuth } from './auth';
import ThemeToggle from './components/ThemeToggle';
import LanguageSwitcher from './components/LanguageSwitcher';
import LoadConfigModal from './components/LoadConfigModal';
import PaywallModal from './components/PaywallModal';
import MobileSummaryBar from './components/MobileSummaryBar';
import UserMenu from './components/UserMenu';
import AuthModal from './components/AuthModal';
import ProfilePage from './components/ProfilePage';
import PlansPage from './components/PlansPage';
import TipsAndTechniquesPage from './components/TipsAndTechniquesPage';
import { DoughLabLogoIcon, BookOpenIcon, StarIcon } from './components/IconComponents';

type Page = 'calculator' | 'plans' | 'tips' | 'profile';

const calculateDough = (config: DoughConfig): DoughResult => {
  const totalDoughWeight =
    config.numPizzas * config.doughBallWeight * config.scale;

  const totalPercentage = 100 + config.hydration + config.salt + config.oil;
  const flourMultiplier = 100 / totalPercentage;

  const totalFlour = totalDoughWeight * flourMultiplier;
  const totalWater = totalFlour * (config.hydration / 100);
  const totalSalt = totalFlour * (config.salt / 100);
  const totalOil = totalFlour * (config.oil / 100);

  let yeastPercentage = config.yeastPercentage;
  if (config.yeastType === YeastType.SOURDOUGH) {
    // Sourdough is treated as levain percentage
  } else if (config.yeastType === YeastType.ADY) {
    yeastPercentage /= 1.25; // convert to IDY equivalent for calculation consistency
  } else if (config.yeastType === YeastType.FRESH) {
    yeastPercentage /= 3; // convert to IDY equivalent
  }
  const totalYeast = totalFlour * (yeastPercentage / 100);

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
    let prefermentWater = prefermentFlour; // Poolish: 100% hydration
    if (config.fermentationTechnique === FermentationTechnique.BIGA) {
      prefermentWater = prefermentFlour * 0.5; // Biga: ~50% hydration
    }
    const prefermentYeast = prefermentFlour * 0.002; // Tiny amount for preferment

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

const DEFAULT_CONFIG: DoughConfig = {
  bakeType: BakeType.PIZZA,
  recipeStyle: RecipeStyle.NEAPOLITAN,
  numPizzas: 4,
  doughBallWeight: 250,
  hydration: 62,
  salt: 2.8,
  oil: 0,
  fermentationTechnique: FermentationTechnique.DIRECT,
  yeastType: YeastType.IDY,
  yeastPercentage: 0.2,
  prefermentFlourPercentage: 30,
  scale: 1,
  notes: '',
};

function AppContent() {
  const { t } = useTranslation();
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [currentPage, setCurrentPage] = useState<Page>('calculator');
  const { grantProAccess, grantSessionProAccess, hasProAccess } = useEntitlements();
  const [config, setConfig] = useState<DoughConfig>(DEFAULT_CONFIG);
  const [unit, setUnit] = useState<Unit>('g');
  const [unitSystem, setUnitSystem] = useState<UnitSystem>(UnitSystem.METRIC);
  const [savedConfigs, setSavedConfigs] = useState<SavedDoughConfig[]>([]);

  const [isLoadModalOpen, setIsLoadModalOpen] = useState(false);
  const [isPaywallModalOpen, setIsPaywallModalOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  const results = useMemo(() => calculateDough(config), [config]);

  useEffect(() => {
    // Test Pro Mode via URL parameter
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('test_pro') === 'true') {
      grantSessionProAccess();
      // Clean up URL
      window.history.replaceState({}, document.title, window.location.pathname);
    }
  }, [grantSessionProAccess]);


  useEffect(() => {
    // Theme logic
    const root = window.document.documentElement;
    const storedTheme = localStorage.getItem('theme') as 'light' | 'dark';
    const initialTheme =
      storedTheme ||
      (window.matchMedia('(prefers-color-scheme: dark)').matches
        ? 'dark'
        : 'light');
    setTheme(initialTheme);
  }, []);

  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const handleConfigChange = useCallback((newConfig: Partial<DoughConfig>) => {
    setConfig((prev) => ({ ...prev, ...newConfig }));
  }, []);

  const handleBakeTypeChange = useCallback((bakeType: BakeType) => {
    const isPizza = bakeType === BakeType.PIZZA;
    const newStyle = isPizza ? RecipeStyle.NEAPOLITAN : RecipeStyle.SOURDOUGH;
    const preset = RECIPE_STYLE_PRESETS[newStyle] || {};
    setConfig((prev) => ({
      ...DEFAULT_CONFIG,
      ...prev,
      bakeType,
      recipeStyle: newStyle,
      ...preset,
    }));
  }, []);

  const handleStyleChange = useCallback((style: RecipeStyle) => {
    const preset = RECIPE_STYLE_PRESETS[style] || {};
    setConfig((prev) => ({ ...prev, recipeStyle: style, ...preset }));
  }, []);

  const handleLoadProRecipe = (newConfig: ProRecipe['config']) => {
    setConfig((prev) => ({ ...prev, ...newConfig }));
    setCurrentPage('calculator');
  };
  
  const handleGrantAccess = () => {
      grantProAccess();
      setCurrentPage('calculator');
  }

  const renderPage = () => {
    switch (currentPage) {
      case 'plans':
        return <PlansPage onGrantAccess={handleGrantAccess} onNavigateHome={() => setCurrentPage('calculator')} />;
      case 'tips':
        return <TipsAndTechniquesPage onLoadRecipe={handleLoadProRecipe} />;
      case 'profile':
        return <ProfilePage />;
      case 'calculator':
      default:
        return (
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:items-start">
            <div className="lg:sticky lg:top-24">
              <CalculatorForm
                config={config}
                onConfigChange={handleConfigChange}
                onBakeTypeChange={handleBakeTypeChange}
                onStyleChange={handleStyleChange}
                onReset={() => setConfig(DEFAULT_CONFIG)}
                unitSystem={unitSystem}
                onUnitSystemChange={setUnitSystem}
                hasProAccess={hasProAccess}
                onOpenPaywall={() => setIsPaywallModalOpen(true)}
              />
            </div>
            <div>
              <ResultsDisplay
                results={results}
                config={config}
                unit={unit}
                onUnitChange={setUnit}
                unitSystem={unitSystem}
                hasProAccess={hasProAccess}
                onOpenPaywall={() => setIsPaywallModalOpen(true)}
              />
            </div>
          </div>
        );
    }
  };

  const Header = () => (
    <header className="sticky top-0 z-20 border-b border-slate-200/80 bg-white/80 backdrop-blur-sm dark:border-slate-700/80 dark:bg-slate-900/80">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <button onClick={() => setCurrentPage('calculator')} aria-label="Home" className="flex items-center gap-2.5">
          <DoughLabLogoIcon className="h-8 w-auto text-lime-500" />
          <span className="hidden text-xl font-bold tracking-tight text-slate-900 dark:text-white sm:block">DoughLabPro</span>
        </button>
        <div className="flex items-center gap-2">
           <button 
             onClick={() => hasProAccess ? setCurrentPage('tips') : setCurrentPage('plans')}
             className="hidden items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-semibold text-slate-600 ring-1 ring-slate-200 transition-all hover:bg-slate-100 dark:text-slate-300 dark:ring-slate-700 dark:hover:bg-slate-800 sm:flex"
           >
              <BookOpenIcon className="h-4 w-4" />
              <span>{t('header.tips')}</span>
           </button>
           
           {!hasProAccess && (
             <button
               onClick={() => setCurrentPage('plans')}
               className="flex items-center gap-1.5 rounded-full bg-lime-500 px-3 py-1.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-lime-600"
             >
                <StarIcon className="h-4 w-4" />
                <span>{t('header.go_pro')}</span>
             </button>
           )}

          <ThemeToggle
            theme={theme}
            toggleTheme={() => setTheme(theme === 'light' ? 'dark' : 'light')}
          />
          <LanguageSwitcher />
          <UserMenu onNavigate={setCurrentPage} onOpenAuthModal={() => setIsAuthModalOpen(true)} />
        </div>
      </div>
    </header>
  );

  return (
    <div className="min-h-screen bg-slate-100 font-sans text-slate-800 transition-colors duration-300 dark:bg-slate-900 dark:text-slate-200">
      <Header />

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {renderPage()}
      </main>

      <LoadConfigModal
        isOpen={isLoadModalOpen}
        onClose={() => setIsLoadModalOpen(false)}
        configs={savedConfigs}
        onLoad={setConfig}
        onDelete={() => {}}
      />
      <PaywallModal
        isOpen={isPaywallModalOpen}
        onClose={() => setIsPaywallModalOpen(false)}
        onNavigateToPlans={() => {
          setIsPaywallModalOpen(false);
          setCurrentPage('plans');
        }}
      />
      <AuthModal 
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
      />
      
      {currentPage === 'calculator' && (
        <MobileSummaryBar
          totalDough={results.totalDough}
          unit={unit}
          onSave={() => {}}
          onLoad={() => setIsLoadModalOpen(true)}
          onNavigateToPlans={() => setCurrentPage('plans')}
        />
      )}
    </div>
  );
}

function App() {
  return (
    <I18nProvider>
      <AuthProvider>
        <EntitlementProvider>
          <AppContent />
        </EntitlementProvider>
      </AuthProvider>
    </I18nProvider>
  );
}

export default App;