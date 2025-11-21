
import React, {
  useState,
  useEffect,
  useCallback,
  useMemo,
} from 'react';

// Layouts & Routes
import MainLayout from './components/layouts/MainLayout';
import AppRouter from './routes/AppRouter';

// Contexts
import { UserProvider, useUser } from './contexts/UserProvider';
import { AuthProvider } from './contexts/AuthContext';
import { FirebaseAuthProvider } from './contexts/FirebaseAuthProvider';
import { I18nProvider, useTranslation } from './i18n';
import { ToastProvider } from './components/ToastProvider';

// Logic & Types
import { calculateDoughUniversal, syncIngredientsFromConfig } from './logic/doughMath';
import {
  DoughConfig,
  DoughResult,
  BatchStatus,
  FormErrors,
  Page,
  CalculationMode,
  UnitSystem,
} from './types';
import { DEFAULT_CONFIG } from './constants';
import { FLOURS } from './flours-constants';
import { logEvent } from './services/analytics';

// --- Validation Logic (Kept close to state) ---
const validateConfig = (config: DoughConfig): FormErrors => {
  const errors: FormErrors = {};
  // ... existing validation logic kept simple for brevity in this refactor ...
  if (config.numPizzas < 1 || config.numPizzas > 100) errors.numPizzas = 'Value between 1 and 100 recommended.';
  if (config.hydration < 0 || config.hydration > 120) errors.hydration = 'Value between 0% and 120% recommended.';
  return errors;
};

function AppContent() {
  const { t } = useTranslation(); // Initialize useTranslation hook for AppContent

  // --- STATE MANAGEMENT ---
  const [route, setRoute] = useState<Page>('mylab');
  const [routeParams, setRouteParams] = useState<string | null>(null);
  
  // Calculator State (Lifted up to persist across navigation)
  const [config, setConfig] = useState<DoughConfig>(DEFAULT_CONFIG);
  const [results, setResults] = useState<DoughResult | null>(null);
  const [errors, setErrors] = useState<FormErrors>({});
  const [calculatorMode, setCalculatorMode] = useState<'basic' | 'advanced'>('basic');
  const [calculationMode, setCalculationMode] = useState<CalculationMode>('mass');
  const [unit, setUnit] = useState<'g' | 'oz' | 'volume'>('g');
  const [unitSystem, setUnitSystem] = useState<UnitSystem>(UnitSystem.METRIC); // Corrected type to UnitSystem

  // UI State (Controlled by MainLayout or Pages)
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [showLevainOnboarding, setShowLevainOnboarding] = useState(false);
  const [showAssistant, setShowAssistant] = useState(false);

  const { 
    user, 
    grantSessionProAccess, 
    hasProAccess, 
    ovens, 
    batches, 
    addBatch, 
    createDraftBatch, 
    levains, 
    openPaywall, 
  } = useUser();

  const defaultOven = useMemo(() => ovens.find(o => o.isDefault) || ovens[0], [ovens]);
  const selectedFlour = useMemo(() => FLOURS.find(f => f.id === config.flourId), [config.flourId]);
  
  // Handle URL Hash Navigation
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.slice(2); // Remove #/
      if (!hash) {
        setRoute('mylab');
        return;
      }

      // Simple manual router parser
      const parts = hash.split('/');
      
      // Special handling for nested routes
      if (hash.startsWith('mylab/levain/detail')) {
           setRoute('mylab/levain/detail');
           setRouteParams(parts[3] || null);
      } else if (hash.startsWith('batch/')) {
           setRoute('batch');
           setRouteParams(parts[1]);
      } else if (hash.startsWith('community/')) {
          setRoute('community');
          setRouteParams(parts[1]);
      } else if (hash.startsWith('styles/')) {
          setRoute('styles/detail');
          setRouteParams(parts[1]);
      } else if (hash.startsWith('mylab/consistency/')) {
          setRoute('mylab/consistency/detail');
          setRouteParams(parts[2]);
      } else {
          setRoute(hash as Page);
          setRouteParams(null);
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    handleHashChange(); // Initial check
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleNavigate = (page: Page, params?: string) => {
    let path = page;
    if (page === 'batch' && params) path = `batch/${params}` as Page;
    else if (page === 'community' && params) path = `community/${params}` as Page;
    else if (page === 'styles/detail' && params) path = `styles/${params}` as Page;
    else if (page === 'mylab/levain/detail' && params) path = `mylab/levain/detail/${params}` as Page;
    else if (page === 'mylab/consistency/detail' && params) path = `mylab/consistency/${params}` as Page;
    else if (page === 'toppings') path = 'toppings' as Page; // Added for toppings page

    window.location.hash = `/${path}`;
    setRoute(page);
    setRouteParams(params || null);
    window.scrollTo(0, 0);
  };

  // --- CALCULATOR LOGIC ---
  const handleConfigChange = useCallback((newConfig: Partial<DoughConfig>) => {
      setConfig((prev) => {
        const updated = { ...prev, ...newConfig };
        if (!updated.ingredients || newConfig.hydration !== undefined || newConfig.salt !== undefined || newConfig.oil !== undefined || newConfig.yeastPercentage !== undefined || newConfig.sugar !== undefined) {
           updated.ingredients = syncIngredientsFromConfig(updated);
        }
        return updated;
      });
  }, []);

  const handleLoadConfig = (newConfig: Partial<DoughConfig>) => {
    const merged = { ...DEFAULT_CONFIG, ...newConfig };
    handleConfigChange(merged);
    handleNavigate('calculator');
  };

  useEffect(() => {
    const validationErrors = validateConfig(config);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length === 0) {
      const userLevain = levains.find(l => l.id === config.levainId) || levains.find(l => l.isDefault);
      const res = calculateDoughUniversal(config, calculatorMode, calculationMode, userLevain);
      setResults(res);
    } else {
      setResults(null);
    }
  }, [config, calculatorMode, calculationMode, levains]);

  const handleStartBatch = async () => {
      if (!results) return;
      const newBatch = await addBatch({
          name: `Bake ${new Date().toLocaleDateString()}`,
          doughConfig: config,
          doughResult: results,
          status: BatchStatus.PLANNED,
          isFavorite: false,
          isPublic: false,
          ovenType: defaultOven?.type
      });
      // FIX: Changed logEvent call to conform to new signature
      if (user) logEvent({ name: 'batch_started', params: { userId: user.email, batchId: newBatch.id, style: config.recipeStyle } });
      handleNavigate('batch', newBatch.id);
  };

  const handleLoadAndNavigate = (loadedConfig: DoughConfig) => {
      setConfig(loadedConfig);
      handleNavigate('calculator');
  };

  const handleResetCalculatorConfig = useCallback(() => {
    setConfig(DEFAULT_CONFIG);
    setCalculatorMode('basic');
    setCalculationMode('mass');
    setUnit('g');
    setUnitSystem(UnitSystem.METRIC);
    setErrors({});
    setResults(null);
  }, []);

  const lastBatch = useMemo(() => {
    if (batches.length === 0) return undefined;
    return [...batches].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())[0];
  }, [batches]);

  return (
    <MainLayout 
      activePage={route} 
      onNavigate={handleNavigate}
      isAuthModalOpen={isAuthModalOpen}
      setIsAuthModalOpen={setIsAuthModalOpen}
      showLevainOnboarding={showLevainOnboarding}
      setShowLevainOnboarding={setShowLevainOnboarding}
      showAssistant={showAssistant}
      setShowAssistant={setShowAssistant}
      assistantData={{ config, results, lastBatch, selectedFlour, defaultOven }}
    >
      <AppRouter 
        route={route}
        routeParams={routeParams}
        onNavigate={handleNavigate}
        
        // State
        config={config}
        results={results}
        errors={errors}
        calculatorMode={calculatorMode}
        calculationMode={calculationMode}
        unit={unit}
        unitSystem={unitSystem}
        
        // Actions
        handleConfigChange={handleConfigChange}
        handleLoadConfig={handleLoadConfig}
        handleLoadAndNavigate={handleLoadAndNavigate}
        handleStartBatch={handleStartBatch}
        createDraftBatch={createDraftBatch}
        grantSessionProAccess={grantSessionProAccess}
        
        // Setters
        setUnit={setUnit}
        setCalculationMode={setCalculationMode}
        setCalculatorMode={setCalculatorMode}
        setUnitSystem={setUnitSystem} // Added setter for unitSystem
        onResetCalculatorConfig={handleResetCalculatorConfig} // Pass reset function
        
        // Data
        defaultOven={defaultOven}
        selectedFlour={selectedFlour}
        hasProAccess={hasProAccess}
        openPaywall={openPaywall}
        t={t} // Pass translation function to AppRouter
      />
    </MainLayout>
  );
}

export default function App() {
  return (
    <FirebaseAuthProvider>
        <AuthProvider>
            <ToastProvider>
                <I18nProvider>
                    <UserProvider>
                        <AppContent />
                    </UserProvider>
                </I18nProvider>
            </ToastProvider>
        </AuthProvider>
    </FirebaseAuthProvider>
  );
}