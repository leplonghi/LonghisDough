


import React, {
  useState,
  useEffect,
  useCallback,
  useMemo,
  createContext,
  useContext,
  ReactNode,
  useRef,
} from 'react';
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
  FormErrors,
  User,
} from './types';
import { RECIPE_STYLE_PRESETS } from './constants';
import { I18nProvider, useTranslation } from './i18n';
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
import {
  DoughLabLogoIcon,
  BookOpenIcon,
  StarIcon,
  ExclamationCircleIcon,
  CheckCircleIcon,
  InfoIcon,
  CloseIcon,
} from './components/IconComponents';

type Page = 'calculator' | 'plans' | 'tips' | 'profile';

// --- Toast Functionality ---
type ToastType = 'success' | 'error' | 'info';

interface ToastMessage {
  id: number;
  message: string;
  type: ToastType;
}

interface ToastContextType {
  addToast: (message: string, type: ToastType) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

let toastId = 0;

const ToastProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const addToast = useCallback((message: string, type: ToastType) => {
    setToasts((prevToasts) => [...prevToasts, { id: toastId++, message, type }]);
  }, []);

  const removeToast = useCallback((id: number) => {
    setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ addToast }}>
      {children}
      <ToastContainer toasts={toasts} removeToast={removeToast} />
    </ToastContext.Provider>
  );
};

const useToast = (): ToastContextType => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};

interface ToastContainerProps {
  toasts: ToastMessage[];
  removeToast: (id: number) => void;
}

const ToastContainer: React.FC<ToastContainerProps> = ({
  toasts,
  removeToast,
}) => {
  return (
    <div className="fixed top-4 right-4 z-50 w-full max-w-xs space-y-3">
      {toasts.map((toast) => (
        <Toast key={toast.id} toast={toast} onDismiss={removeToast} />
      ))}
    </div>
  );
};

interface ToastProps {
  toast: ToastMessage;
  onDismiss: (id: number) => void;
}

const ICONS: Record<ToastType, React.ReactNode> = {
  success: <CheckCircleIcon className="h-6 w-6 text-green-500" />,
  error: <ExclamationCircleIcon className="h-6 w-6 text-red-500" />,
  info: <InfoIcon className="h-6 w-6 text-blue-500" />,
};

const BG_COLORS: Record<ToastType, string> = {
  success:
    'bg-green-50 dark:bg-green-500/10 border-green-200 dark:border-green-500/20',
  error: 'bg-red-50 dark:bg-red-500/10 border-red-200 dark:border-red-500/20',
  info: 'bg-blue-50 dark:bg-blue-500/10 border-blue-200 dark:border-blue-500/20',
};

const Toast: React.FC<ToastProps> = ({ toast, onDismiss }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onDismiss(toast.id);
    }, 5000);

    return () => {
      clearTimeout(timer);
    };
  }, [toast.id, onDismiss]);

  return (
    <div
      className={`relative flex w-full items-start gap-3 overflow-hidden rounded-lg border p-4 shadow-lg ring-1 ring-black ring-opacity-5 animate-slide-in-right ${
        BG_COLORS[toast.type]
      }`}
      role="alert"
    >
      <div className="flex-shrink-0">{ICONS[toast.type]}</div>
      <div className="flex-1 text-sm font-medium text-slate-800 dark:text-slate-200">
        {toast.message}
      </div>
      <div className="flex-shrink-0">
        <button
          onClick={() => onDismiss(toast.id)}
          className="-m-1.5 rounded-full p-1.5 text-slate-500 hover:bg-slate-200/50 dark:text-slate-400 dark:hover:bg-slate-700/50"
          aria-label="Dismiss"
        >
          <CloseIcon className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
};

// --- Combined User (Auth + Entitlements) Context ---
const AUTH_KEY = 'dough-lab-auth';
const ENTITLEMENTS_KEY = 'dough-lab-entitlements';

interface Entitlements {
  isPro: boolean;
  passUntil: number | null;
  lastPassGrantedAt: number | null;
}

interface UserContextType {
  isAuthenticated: boolean;
  user: User | null;
  login: (user: User) => void;
  logout: () => void;
  updateUser: (updatedData: Partial<User>) => void;
  hasProAccess: boolean;
  grantProAccess: () => void;
  grantSessionProAccess: () => void;
  grant24hPass: () => void;
  isPassOnCooldown: boolean;
  cooldownHoursRemaining: number;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // --- Auth State ---
  const [user, setUser] = useState<User | null>(null);

  // --- Entitlements State ---
  const [entitlements, setEntitlements] = useState<Entitlements>({
    isPro: false,
    passUntil: null,
    lastPassGrantedAt: null,
  });
  const [isSessionPro, setIsSessionPro] = useState<boolean>(false);
  const [cooldownHours, setCooldownHours] = useState(0);

  // --- Auth Effects & Callbacks ---
  useEffect(() => {
    try {
      const storedUser = localStorage.getItem(AUTH_KEY);
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    } catch (error) {
      console.error('Failed to load user from localStorage', error);
    }
  }, []);

  const login = useCallback((userData: User) => {
    setUser(userData);
    try {
      localStorage.setItem(AUTH_KEY, JSON.stringify(userData));
    } catch (error) {
      console.error('Failed to save user to localStorage', error);
    }
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    try {
      localStorage.removeItem(AUTH_KEY);
    } catch (error) {
      console.error('Failed to remove user from localStorage', error);
    }
  }, []);

  const updateUser = useCallback(
    (updatedData: Partial<User>) => {
      if (user) {
        const newUser = { ...user, ...updatedData };
        setUser(newUser);
        try {
          localStorage.setItem(AUTH_KEY, JSON.stringify(newUser));
        } catch (error) {
          console.error('Failed to save updated user to localStorage', error);
        }
      }
    },
    [user],
  );

  // --- Entitlements Effects & Callbacks ---
  useEffect(() => {
    try {
      const stored = localStorage.getItem(ENTITLEMENTS_KEY);
      if (stored) {
        setEntitlements(JSON.parse(stored));
      }
    } catch {
      // Ignore errors
    }
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      const now = Date.now();
      if (entitlements.passUntil && now > entitlements.passUntil) {
        setEntitlements((prev) => {
          const newEntitlements = { ...prev, passUntil: null };
          try {
            localStorage.setItem(
              ENTITLEMENTS_KEY,
              JSON.stringify(newEntitlements),
            );
          } catch {}
          return newEntitlements;
        });
      }
      if (entitlements.lastPassGrantedAt) {
        const hoursSince = (now - entitlements.lastPassGrantedAt) / 3600000;
        if (hoursSince < 24) {
          setCooldownHours(24 - hoursSince);
        } else if (cooldownHours > 0) {
          setCooldownHours(0);
        }
      } else if (cooldownHours > 0) {
        setCooldownHours(0);
      }
    }, 60000);
    return () => clearInterval(interval);
  }, [entitlements, cooldownHours]);

  const saveEntitlements = (newEntitlements: Entitlements) => {
    try {
      localStorage.setItem(ENTITLEMENTS_KEY, JSON.stringify(newEntitlements));
      setEntitlements(newEntitlements);
    } catch (error) {
      console.error('Could not save entitlements', error);
    }
  };

  const grantProAccess = useCallback(() => {
    saveEntitlements({ ...entitlements, isPro: true, passUntil: null });
  }, [entitlements]);

  const grantSessionProAccess = useCallback(() => {
    setIsSessionPro(true);
  }, []);

  const grant24hPass = useCallback(() => {
    const now = Date.now();
    const twentyFourHours = 24 * 60 * 60 * 1000;
    if (
      entitlements.lastPassGrantedAt &&
      now - entitlements.lastPassGrantedAt < twentyFourHours
    ) {
      return;
    }
    saveEntitlements({
      ...entitlements,
      passUntil: now + twentyFourHours,
      lastPassGrantedAt: now,
    });
  }, [entitlements]);

  const hasProAccess =
    entitlements.isPro ||
    isSessionPro ||
    (entitlements.passUntil !== null && Date.now() < entitlements.passUntil);
  const isPassOnCooldown =
    entitlements.lastPassGrantedAt !== null &&
    Date.now() - entitlements.lastPassGrantedAt < 24 * 60 * 60 * 1000;

  const value = {
    isAuthenticated: !!user,
    user,
    login,
    logout,
    updateUser,
    hasProAccess,
    grantProAccess,
    grantSessionProAccess,
    grant24hPass,
    isPassOnCooldown,
    cooldownHoursRemaining: Math.ceil(cooldownHours),
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

// --- Calculator Logic ---

const SAVED_CONFIGS_KEY = 'dough-lab-saved-configs';

const calculateDough = (config: DoughConfig): DoughResult => {
  const totalDoughWeight =
    config.numPizzas * config.doughBallWeight * config.scale;

  const totalPercentage = 100 + config.hydration + config.salt + config.oil;
  const flourMultiplier = 100 / totalPercentage;

  const totalFlour = totalDoughWeight * flourMultiplier;
  const totalWater = totalFlour * (config.hydration / 100);
  const totalSalt = totalFlour * (config.salt / 100);
  const totalOil = totalFlour * (config.oil / 100);

  const result: DoughResult = {
    totalFlour,
    totalWater,
    totalSalt,
    totalOil,
    totalYeast: 0, // Will be set based on type
    totalDough: totalDoughWeight,
  };

  if (config.yeastType === YeastType.SOURDOUGH) {
    const totalStarter = totalFlour * (config.yeastPercentage / 100);
    // Assume 100% hydration starter (equal parts flour and water by weight)
    const starterFlour = totalStarter / 2;
    const starterWater = totalStarter / 2;

    result.totalYeast = totalStarter; // Represents total starter weight

    result.preferment = {
      flour: starterFlour,
      water: starterWater,
      yeast: 0, // No commercial yeast in the starter
    };

    result.finalDough = {
      flour: totalFlour - starterFlour,
      water: totalWater - starterWater,
      salt: totalSalt,
      oil: totalOil,
      yeast: 0, // No additional commercial yeast
    };
  } else {
    // Commercial yeast logic
    let yeastPercentage = config.yeastPercentage;
    if (config.yeastType === YeastType.ADY) {
      yeastPercentage /= 1.25;
    } else if (config.yeastType === YeastType.FRESH) {
      yeastPercentage /= 3;
    }
    const totalYeast = totalFlour * (yeastPercentage / 100);
    result.totalYeast = totalYeast;

    if (config.fermentationTechnique !== FermentationTechnique.DIRECT) {
      const prefermentFlour =
        totalFlour * (config.prefermentFlourPercentage / 100);
      let prefermentWater = prefermentFlour; // Poolish
      if (config.fermentationTechnique === FermentationTechnique.BIGA) {
        prefermentWater = prefermentFlour * 0.5; // Biga
      }
      const prefermentYeast = prefermentFlour * 0.002;

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
        yeast: Math.max(0, totalYeast - prefermentYeast), // Prevent negative yeast
      };
    }
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

// --- Validation Logic ---
const validateConfig = (
  config: DoughConfig,
  t: (key: string, replacements?: { [key: string]: string | number }) => string,
): FormErrors => {
  const errors: FormErrors = {};

  if (config.numPizzas < 1 || config.numPizzas > 100) {
    errors.numPizzas = t('form.errors.range', { min: 1, max: 100 });
  }
  if (config.doughBallWeight < 100 || config.doughBallWeight > 2000) {
    errors.doughBallWeight = t('form.errors.range', { min: 100, max: 2000 });
  }
  if (config.hydration < 50 || config.hydration > 100) {
    errors.hydration = t('form.errors.range_percent', { min: 50, max: 100 });
  }
  if (config.scale < 0.25 || config.scale > 4) {
    errors.scale = t('form.errors.range_multiplier', { min: 0.25, max: 4 });
  }
  const maxYeast = config.yeastType === YeastType.SOURDOUGH ? 50 : 5;
  if (config.yeastPercentage < 0 || config.yeastPercentage > maxYeast) {
    errors.yeastPercentage = t('form.errors.range_percent', {
      min: 0,
      max: maxYeast,
    });
  }
  if (config.fermentationTechnique !== FermentationTechnique.DIRECT) {
    if (
      config.prefermentFlourPercentage < 10 ||
      config.prefermentFlourPercentage > 100
    ) {
      errors.prefermentFlourPercentage = t('form.errors.range_percent', {
        min: 10,
        max: 100,
      });
    }
  }

  return errors;
};

function AppContent() {
  const { t } = useTranslation();
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [currentPage, setCurrentPage] = useState<Page>('calculator');
  const { grantProAccess, grantSessionProAccess, hasProAccess } = useUser();
  const [config, setConfig] = useState<DoughConfig>(DEFAULT_CONFIG);
  const [unit, setUnit] = useState<Unit>('g');
  const [unitSystem, setUnitSystem] = useState<UnitSystem>(UnitSystem.METRIC);
  const [savedConfigs, setSavedConfigs] = useState<SavedDoughConfig[]>([]);
  const [errors, setErrors] = useState<FormErrors>({});

  const [isLoadModalOpen, setIsLoadModalOpen] = useState(false);
  const [isPaywallModalOpen, setIsPaywallModalOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  const { addToast } = useToast();
  const previousErrorsRef = useRef<FormErrors>({});

  // Perform validation whenever config changes
  useEffect(() => {
    const validationErrors = validateConfig(config, t);
    setErrors(validationErrors);
  }, [config, t]);

  // Show toasts for new or changed errors
  useEffect(() => {
    const currentErrors = errors;
    const previousErrors = previousErrorsRef.current;

    Object.entries(currentErrors).forEach(([key, message]) => {
      if (message && previousErrors[key as keyof FormErrors] !== message) {
        addToast(message, 'error');
      }
    });

    previousErrorsRef.current = currentErrors;
  }, [errors, addToast]);

  const hasErrors = useMemo(() => Object.keys(errors).length > 0, [errors]);

  const results = useMemo(() => {
    if (hasErrors) return null;
    return calculateDough(config);
  }, [config, hasErrors]);

  // Load saved configs from localStorage on mount
  useEffect(() => {
    try {
      const storedConfigs = localStorage.getItem(SAVED_CONFIGS_KEY);
      if (storedConfigs) {
        setSavedConfigs(JSON.parse(storedConfigs));
      }
    } catch (error) {
      // FIX: Use multiple arguments for console.error for better error formatting and to avoid potential TypeScript type issues with concatenation.
      console.error(
        'Failed to load saved configs from localStorage:',
        error,
      );
    }
  }, []);

  // Persist saved configs to localStorage whenever they change
  useEffect(() => {
    try {
      localStorage.setItem(SAVED_CONFIGS_KEY, JSON.stringify(savedConfigs));
    } catch (error) {
      // FIX: Use multiple arguments for console.error for better error formatting and to avoid potential TypeScript type issues with concatenation.
      console.error(
        'Failed to save configs to localStorage:',
        error,
      );
    }
  }, [savedConfigs]);

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

  const handleYeastTypeChange = useCallback((yeastType: YeastType) => {
    setConfig((prev) => {
      const newConfig = { ...prev, yeastType };
      if (yeastType === YeastType.SOURDOUGH) {
        // Sourdough acts as its own preferment. We set technique to POOLISH
        // to trigger the indirect UI, and set a default 20% starter.
        newConfig.fermentationTechnique = FermentationTechnique.POOLISH;
        newConfig.yeastPercentage = 20;
      } else if (prev.yeastType === YeastType.SOURDOUGH) {
        // If switching away from sourdough, revert to a sane default.
        newConfig.fermentationTechnique = FermentationTechnique.DIRECT;
        newConfig.yeastPercentage = 0.4;
      }
      return newConfig;
    });
  }, []);

  const handleLoadProRecipe = (newConfig: ProRecipe['config']) => {
    setConfig((prev) => ({ ...prev, ...newConfig }));
    setCurrentPage('calculator');
  };

  const handleGrantAccess = () => {
    grantProAccess();
    setCurrentPage('calculator');
  };

  const handleSaveConfig = useCallback(
    (name: string) => {
      setSavedConfigs((prev) => {
        const existingIndex = prev.findIndex((c) => c.name === name);
        // Create new config, default favorite to false
        const newConfig: SavedDoughConfig = {
          name,
          config,
          isFavorite: false,
        };

        if (existingIndex > -1) {
          // If recipe name exists, overwrite it but preserve its favorite status
          newConfig.isFavorite = prev[existingIndex].isFavorite;
          const updatedConfigs = [...prev];
          updatedConfigs[existingIndex] = newConfig;
          alert(`Recipe "${name}" updated.`);
          return updatedConfigs;
        }
        return [...prev, newConfig];
      });
    },
    [config],
  );

  const handleDeleteConfig = useCallback((name: string) => {
    if (confirm(`Are you sure you want to delete the recipe "${name}"?`)) {
      setSavedConfigs((prev) => prev.filter((c) => c.name !== name));
    }
  }, []);

  const handleToggleFavorite = useCallback((name: string) => {
    setSavedConfigs((prev) =>
      prev.map((c) =>
        c.name === name ? { ...c, isFavorite: !c.isFavorite } : c,
      ),
    );
  }, []);

  const renderPage = () => {
    switch (currentPage) {
      case 'plans':
        return (
          <PlansPage
            onGrantAccess={handleGrantAccess}
            onNavigateHome={() => setCurrentPage('calculator')}
          />
        );
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
                errors={errors}
                onConfigChange={handleConfigChange}
                onBakeTypeChange={handleBakeTypeChange}
                onStyleChange={handleStyleChange}
                onYeastTypeChange={handleYeastTypeChange}
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
        <button
          onClick={() => setCurrentPage('calculator')}
          aria-label="Home"
          className="flex items-center gap-2.5"
        >
          <DoughLabLogoIcon className="h-8 w-auto text-lime-500" />
          <span className="hidden text-xl font-bold tracking-tight text-slate-900 dark:text-white sm:block">
            DoughLabPro
          </span>
        </button>
        <div className="flex items-center gap-2">
          <button
            onClick={() =>
              hasProAccess ? setCurrentPage('tips') : setCurrentPage('plans')
            }
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
          <UserMenu
            onNavigate={setCurrentPage}
            onOpenAuthModal={() => setIsAuthModalOpen(true)}
          />
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
        onDelete={handleDeleteConfig}
        onToggleFavorite={handleToggleFavorite}
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

      {currentPage === 'calculator' && results && (
        <MobileSummaryBar
          totalDough={results.totalDough}
          unit={unit}
          onSave={handleSaveConfig}
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
      <UserProvider>
        <ToastProvider>
          <AppContent />
        </ToastProvider>
      </UserProvider>
    </I18nProvider>
  );
}

export default App;