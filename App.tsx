
import React, {
  useState,
  useEffect,
  useCallback,
  useMemo,
  useRef,
} from 'react';
import CalculatorPage from './pages/CalculatorPage';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import BatchDetailPage from './pages/BatchDetailPage';

import {
  DoughConfig,
  DoughResult,
  BakeType,
  YeastType,
  FermentationTechnique,
  Unit,
  UnitSystem,
  BatchStatus,
  ProRecipe,
  FormErrors,
  Page,
  PrimaryPage,
  FlourDefinition,
  CalculationMode,
  DoughStyleDefinition,
} from './types';
import { DOUGH_STYLE_PRESETS, DEFAULT_CONFIG } from './constants';
import { STYLES_DATA, getStyleById } from './data/stylesData';
import { PaywallModal } from './components/PaywallModal';
import AuthModal from './components/AuthModal';
import ProfilePage from './pages/ProfilePage';
import PlansPage from './components/PlansPage';
import LearnPage from './pages/learn/LearnPage';
import ReferencesPage from './pages/ReferencesPage';
import { FLOURS } from './flours-constants';
import MyLabPage from './pages/MyLabPage';
import LevainManagerPage from './pages/LevainManagerPage';
import { ToastProvider, useToast } from './components/ToastProvider';
import { UserProvider, useUser } from './contexts/UserProvider';
import AssistantPage from './components/AssistantPage';
import FloatingActionButton from './components/FloatingActionButton';
import { OvenAnalysisPage } from './pages/OvenAnalysisPage';
import DoughStylesPage from './pages/styles/DoughStylesPage';
import { StyleDetailPage } from './pages/styles/StyleDetailPage';
import SettingsPage from './pages/SettingsPage';
import LanguagePage from './pages/settings/LanguagePage';
import TermsPage from './pages/legal/TermsPage';
import PrivacyPage from './pages/legal/PrivacyPage';
import CookiesPage from './pages/legal/CookiesPage';
import EulaPage from './pages/legal/EulaPage';
import IpPage from './pages/legal/IpPage';
import ContactPage from './pages/legal/ContactPage';
import LegalIndexPage from './pages/legal/LegalIndexPage';
import TechniquesPage from './pages/learn/TechniquesPage';
import FermentationPage from './pages/learn/FermentationPage';
import DoughSciencePage from './pages/learn/DoughSciencePage';
import TroubleshootingPage from './pages/learn/TroubleshootingPage';
import IngredientsPage from './pages/learn/IngredientsPage';
import ChemistryLibraryPage from './pages/learn/ChemistryLibraryPage';
import StyleGuidePage from './pages/learn/StyleGuidePage';
import GlossaryPage from './pages/learn/GlossaryPage';
import CheesesPage from './pages/learn/ingredients/CheesesPage';
import MeatsPage from './pages/learn/ingredients/MeatsPage';
import VegetablesPage from './pages/learn/ingredients/VegetablesPage';
import SaucesPage from './pages/learn/ingredients/SaucesPage';
import OilsSpicesPage from './pages/learn/ingredients/OilsSpicesPage';
import OilsPage from './pages/learn/ingredients/OilsPage';
import ClassicCombosPage from './pages/learn/ingredients/ClassicCombosPage';
import BoldCombosPage from './pages/learn/ingredients/BoldCombosPage';
import SensoryGuidePage from './pages/learn/SensoryGuidePage';
import PairingToolPage from './pages/learn/ingredients/PairingToolPage';
import ReadyToppingsPage from './pages/learn/ingredients/ReadyToppingsPage';
import MeuLabReceitasPage from './pages/mylab/MeuLabReceitasPage';
import MeuLabLevainPetPage from './pages/mylab/MeuLabLevainPetPage';
import ErrorBoundary from './components/ErrorBoundary';
import OvenSciencePage from './pages/learn/OvenSciencePage';
import IngredientsFloursPage from './pages/learn/ingredients/FloursPage';
import YeastsPage from './pages/learn/ingredients/YeastsPage';
import PrefermentsPage from './pages/learn/PrefermentsPage';
import TemperatureControlPage from './pages/learn/TemperatureControlPage';
import StoragePage from './pages/learn/StoragePage';
import HygieneSafetyPage from './pages/learn/HygieneSafetyPage';
import EquipmentPage from './pages/learn/EquipmentPage';
import OvenSpringPage from './pages/learn/OvenSpringPage';
import FermentationBiochemistryPage from './pages/learn/FermentationBiochemistryPage';
import CrumbStructurePage from './pages/learn/CrumbStructurePage';
import DoughAgingPage from './pages/learn/DoughAgingPage';
import AmbientVsColdFermentationPage from './pages/learn/AmbientVsColdFermentationPage';
import MixingTechniquesPage from './pages/learn/MixingTechniquesPage';
import BallingTechniquePage from './pages/learn/BallingTechniquePage';
import SensoryMaturationPage from './pages/learn/SensoryMaturationPage';
import ParbakingPage from './pages/learn/ParbakingPage';
import WaterPage from './pages/learn/WaterPage';
import SaltPage from './pages/learn/SaltPage';
import SugarsPage from './pages/learn/SugarsPage';
import FatsPage from './pages/learn/FatsPage';
import TomatoPreservationPage from './pages/learn/TomatoPreservationPage';
import WhiteSaucesPage from './pages/learn/WhiteSaucesPage';
import SpecialSaucesPage from './pages/learn/SpecialSaucesPage';
import LowMoistureCheesesPage from './pages/learn/LowMoistureCheesesPage';
import SmokedCheesesPage from './pages/learn/SmokedCheesesPage';
import CuredMeatsPage from './pages/learn/CuredMeatsPage';
import SmokedAromaticsPage from './pages/learn/SmokedAromaticsPage';
import WaterRichVegetablesPage from './pages/learn/WaterRichVegetablesPage';
import CaramelizableVegetablesPage from './pages/learn/CaramelizableVegetablesPage';
import RegionalCombosPage from './pages/learn/RegionalCombosPage';
import SensoryProfilesPage from './pages/learn/SensoryProfilesPage';
import MeuLabFornadasPage from './pages/mylab/MeuLabFornadasPage';
import MeuLabFarinhasPage from './pages/mylab/MeuLabFarinhasPage';
import MeuLabMassasPage from './pages/mylab/MeuLabMassasPage';
import MeuLabDiarioSensorialPage from './pages/mylab/MeuLabDiarioSensorialPage';
import MeuLabComparacoesPage from './pages/mylab/MeuLabComparacoesPage';
import MeuLabInsightsPage from './pages/mylab/MeuLabInsightsPage';
import TimelinePage from './pages/mylab/TimelinePage';
import ObjectivesPage from './pages/mylab/ObjectivesPage';
import FundamentalsPage from './pages/learn/FundamentalsPage';
import MethodsPage from './pages/learn/MethodsPage';
import CriticalIngredientsPage from './pages/learn/CriticalIngredientsPage';
import OvensHeatPage from './pages/learn/OvensHeatPage';
import TroubleshootingGuidePage from './pages/learn/TroubleshootingGuidePage';
import { AuthProvider } from './contexts/AuthContext';
import LevainListPage from './pages/mylab/levain/LevainListPage';
import LevainDetailPage from './pages/mylab/levain/LevainDetailPage';
import LevainOnboardingModal from './components/onboarding/LevainOnboardingModal';
import { logEvent } from './services/analytics';
import CompareReceitasPage from './pages/mylab/CompareReceitasPage';
import ConsistencyListPage from './pages/mylab/ConsistencyListPage';
import ConsistencyDetailPage from './pages/mylab/ConsistencyDetailPage';
import { calculateDoughUniversal, syncIngredientsFromConfig } from './logic/doughMath';
import { I18nProvider } from './i18n';
import ShopPage from './pages/ShopPage';
import CommunityPage from './pages/CommunityPage';
import ProActivatedPage from './pages/pro/ProActivatedPage';


// --- Placeholder Pages ---
function HelpPage() {
  return <div className="p-8 text-center">Help & Support (Coming Soon)</div>;
}
function LandingPage() {
  return <div className="p-8 text-center">Landing Page (Coming Soon)</div>;
}

// --- Validation Logic ---
const validateConfig = (
  config: DoughConfig
): FormErrors => {
  const errors: FormErrors = {};

  if (config.numPizzas < 1 || config.numPizzas > 100) {
    errors.numPizzas = 'A value between 1 and 100 is recommended.';
  }
  if (config.doughBallWeight < 100 || config.doughBallWeight > 2000) {
    errors.doughBallWeight = 'A value between 100g and 2000g is recommended.';
  }
  if (config.hydration < 0 || config.hydration > 120) {
    errors.hydration = 'A value between 0% and 120% is recommended.';
  }
  if (config.scale < 0.25 || config.scale > 4) {
    errors.scale = 'A scale multiplier between 0.25x and 4x is recommended.';
  }
  if (config.bakingTempC < 150 || config.bakingTempC > 500) {
    errors.bakingTempC = 'A value between 150°C and 500°C is recommended.';
  }
  const maxYeast = isAnySourdough(config.yeastType) ? 50 : 5;
  if (config.yeastPercentage < 0 || config.yeastPercentage > maxYeast) {
    errors.yeastPercentage = `A value between 0% and ${maxYeast}% is recommended.`;
  }
  if (config.fermentationTechnique !== FermentationTechnique.DIRECT) {
    if (
      config.prefermentFlourPercentage < 10 ||
      config.prefermentFlourPercentage > 100
    ) {
      errors.prefermentFlourPercentage = 'A value between 10% and 100% is recommended.';
    }
  }

  return errors;
};

const isAnySourdough = (yeastType: YeastType) => 
    [YeastType.SOURDOUGH_STARTER, YeastType.USER_LEVAIN].includes(yeastType);



function AppContent() {
  const [route, setRoute] = useState<Page>('mylab');
  const [routeParams, setRouteParams] = useState<string | null>(null);

  const { user, grantSessionProAccess, hasProAccess, preferredFlourId, ovens, batches, addBatch, createDraftBatch, levains, isPaywallOpen, closePaywall, openPaywall, paywallOrigin } = useUser();
  
  // Last batch calculation
  const lastBatch = useMemo(() => {
    if (batches.length === 0) return undefined;
    return [...batches]
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())[0];
  }, [batches]);

  const [calculatorMode, setCalculatorMode] = useState<'basic' | 'advanced'>(() => {
    try {
      const storedMode = localStorage.getItem('doughlab_mode');
      return storedMode === 'advanced' ? 'advanced' : 'basic';
    } catch {
      return 'basic';
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('doughlab_mode', calculatorMode);
    } catch (error) {
      console.error('Failed to save mode to localStorage', error);
    }
  }, [calculatorMode]);
  
  const initialConfig = useMemo(() => {
    let config = {...DEFAULT_CONFIG, stylePresetId: undefined };
    const preset = DOUGH_STYLE_PRESETS.find(p => p.id === DEFAULT_CONFIG.stylePresetId);
    if (preset?.preferredFlourProfileId) {
        config.flourId = preset.preferredFlourProfileId;
    } else if (preferredFlourId) {
        config.flourId = preferredFlourId;
    }
    return config;
  }, [preferredFlourId]);

  const [config, setConfig] = useState<DoughConfig>(initialConfig);
  const [calculationMode, setCalculationMode] = useState<CalculationMode>('mass');
  const [unit, setUnit] = useState<Unit>('g');
  const [unitSystem, setUnitSystem] = useState<UnitSystem>(UnitSystem.METRIC);
  const [errors, setErrors] = useState<FormErrors>({});

  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isAssistantOpen, setIsAssistantOpen] = useState(false);

  const [showLevainOnboarding, setShowLevainOnboarding] = useState(false);

  useEffect(() => {
    const hasSeenOnboarding = localStorage.getItem('levain_pet_onboarding_seen_v1');
    if (!hasSeenOnboarding && route.startsWith('mylab/levain')) {
        setShowLevainOnboarding(true);
    }
  }, [route]);

  const handleOnboardingComplete = () => {
    try {
      localStorage.setItem('levain_pet_onboarding_seen_v1', 'true');
    } catch (error) {
        console.error("Failed to save onboarding status to localStorage", error);
    }
    setShowLevainOnboarding(false);
  };


  const { addToast } = useToast();
  const previousErrorsRef = useRef<FormErrors>({});

  const navigate = useCallback((page: Page, params?: string) => {
    const newHash = params ? `#/${page}/${params}` : `#/${page}`;
    if (window.location.hash !== newHash) {
        window.location.hash = newHash;
    } else {
        const hash = (page as string) + (params ? `/${params}` : '');
        const parts = hash.split('?')[0].split('/');
        
        if (page === 'styles' && params) {
            setRoute('styles/detail');
            setRouteParams(params);
        } else if ((parts[0] === 'batch') && parts.length > 1) {
            setRoute(parts[0] as Page);
            setRouteParams(parts[1]);
        } else if (hash.startsWith('mylab/levain/') && parts.length > 2) {
            setRoute('mylab/levain/detail');
            setRouteParams(parts[2]);
        } else if (hash.startsWith('mylab/consistency/') && parts.length > 2) {
            setRoute('mylab/consistency/detail');
            setRouteParams(parts[2]);
        } else if (hash.startsWith('community/') && parts.length > 1) {
            setRoute('community/detail');
            setRouteParams(parts[1]);
        } else {
            setRoute(hash as Page);
            setRouteParams(null);
        }
    }
  }, []);

  // --- Routing ---
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.slice(2);
      if (!hash) {
        navigate('mylab');
        return;
      }
      
      const parts = hash.split('?')[0].split('/');
      
      if ((parts[0] === 'batch') && parts.length > 1) {
          setRoute(parts[0] as Page);
          setRouteParams(parts[1]);
      } else if (hash.startsWith('styles/') && parts.length > 1) {
          setRoute('styles/detail');
          setRouteParams(parts[1]);
      } else if (hash.startsWith('mylab/levain/') && parts.length > 2) {
          setRoute('mylab/levain/detail');
          setRouteParams(parts[2]);
      } else if (hash.startsWith('mylab/consistency/') && parts.length > 2) {
          setRoute('mylab/consistency/detail');
          setRouteParams(parts[2]);
      } else if (hash.startsWith('community/') && parts.length > 1) {
          setRoute('community/detail');
          setRouteParams(parts[1]);
      } else {
          setRoute(hash.split('?')[0] as Page);
          setRouteParams(null);
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    handleHashChange(); // Handle initial load

    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, [navigate]);

  useEffect(() => {
    const validationErrors = validateConfig(config);
    setErrors(validationErrors);
  }, [config]);

  useEffect(() => {
    const currentErrors = errors;
    const previousErrors = previousErrorsRef.current;

    Object.entries(currentErrors).forEach(([key, message]) => {
      if (typeof message === 'string' && previousErrors[key as keyof FormErrors] !== message) {
        addToast(message, 'error');
      }
    });

    previousErrorsRef.current = currentErrors;
  }, [errors, addToast]);


  const hasErrors = useMemo(() => Object.keys(errors).length > 0, [errors]);

  const results = useMemo(() => {
    if (hasErrors) return null;
    const userLevain = config.yeastType === YeastType.USER_LEVAIN
      ? levains.find(l => l.id === config.levainId)
      : null;
    return calculateDoughUniversal(config, calculatorMode, calculationMode, userLevain);
  }, [config, hasErrors, levains, calculatorMode, calculationMode]);

  const isSummaryBarVisible = route === 'calculator' && !!results;

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('test_pro') === 'true') {
      grantSessionProAccess();
      window.history.replaceState({}, document.title, window.location.pathname);
    }
  }, [grantSessionProAccess]);

  const handleConfigChange = useCallback((newConfig: Partial<DoughConfig>) => {
    const updatedConfig = { 
        ...config, 
        ...newConfig, 
        stylePresetId: calculatorMode === 'basic' ? config.stylePresetId : undefined 
    };
    
    const syncedIngredients = syncIngredientsFromConfig(updatedConfig);
    updatedConfig.ingredients = syncedIngredients;

    setConfig(updatedConfig);
  }, [calculatorMode, config]);

  const onCalculatorModeChange = useCallback((newMode: 'basic' | 'advanced') => {
    setCalculatorMode(newMode);
    if (newMode === 'basic') {
      const preset = DOUGH_STYLE_PRESETS.find(p => p.recipeStyle === config.recipeStyle);
      if (preset) {
        const { defaultHydration, defaultSalt, defaultOil, defaultSugar } = preset;
        const newConf = {
          ...config,
          hydration: defaultHydration,
          salt: defaultSalt,
          oil: defaultOil,
          sugar: defaultSugar || 0,
          stylePresetId: preset.id,
        };
        // Sync ingredients
        newConf.ingredients = syncIngredientsFromConfig(newConf);
        setConfig(newConf);
      }
    }
  }, [config.recipeStyle, config]);

  const handleBakeTypeChange = useCallback(
    (bakeType: BakeType) => {
      const firstMatchingPreset = DOUGH_STYLE_PRESETS.find(
        (p) => p.type === bakeType,
      );

      if (firstMatchingPreset) {
        const { recipeStyle, defaultHydration, defaultSalt, defaultOil, defaultYeastPct, defaultSugar, preferredFlourProfileId } =
          firstMatchingPreset;
        const presetValues: Partial<DoughConfig> = {
          hydration: defaultHydration,
          salt: defaultSalt,
          oil: defaultOil,
          sugar: defaultSugar || 0,
        };
        
        if (defaultYeastPct !== undefined && !isAnySourdough(config.yeastType)) {
            presetValues.yeastPercentage = defaultYeastPct;
        }
        if (preferredFlourProfileId) {
            presetValues.flourId = preferredFlourProfileId;
        }

        const newConf = {
          ...initialConfig,
          ...config,
          bakeType,
          recipeStyle: recipeStyle,
          ...presetValues,
          stylePresetId: firstMatchingPreset.id,
        };
        newConf.ingredients = syncIngredientsFromConfig(newConf);
        setConfig(newConf);
      } else {
        const newConf = { ...config, bakeType, stylePresetId: undefined };
        newConf.ingredients = syncIngredientsFromConfig(newConf);
        setConfig(newConf);
      }
    },
    [initialConfig, config.yeastType, config],
  );

  const handleStyleChange = useCallback((presetId: string) => {
    const preset = DOUGH_STYLE_PRESETS.find((p) => p.id === presetId);
    if (preset) {
      const { defaultHydration, defaultSalt, defaultOil, defaultYeastPct, defaultSugar, preferredFlourProfileId, recipeStyle } = preset;
      const presetValues: Partial<DoughConfig> = {
        hydration: defaultHydration,
        salt: defaultSalt,
        oil: defaultOil,
        sugar: defaultSugar || 0,
      };
      if (defaultYeastPct !== undefined && !isAnySourdough(config.yeastType)) {
          presetValues.yeastPercentage = defaultYeastPct;
      }
      if (preferredFlourProfileId) {
          presetValues.flourId = preferredFlourProfileId;
      }
      const newConf = { ...config, recipeStyle, ...presetValues, stylePresetId: preset.id };
      newConf.ingredients = syncIngredientsFromConfig(newConf);
      setConfig(newConf);
    }
  }, [config.yeastType, config]);

  const handleYeastTypeChange = useCallback((yeastType: YeastType) => {
    setConfig((prev) => {
      const newConfig: Partial<DoughConfig> = { ...prev, yeastType, stylePresetId: undefined };
      if (isAnySourdough(yeastType)) {
        newConfig.fermentationTechnique = FermentationTechnique.DIRECT;
        if(!isAnySourdough(prev.yeastType)) {
            newConfig.yeastPercentage = 20;
        }
        if(yeastType === YeastType.USER_LEVAIN && levains.length > 0) {
            const defaultLevain = levains.find(l => l.isDefault) || levains[0];
            newConfig.levainId = defaultLevain.id;
            if (user) {
                logEvent('levain_pet_used_in_recipe', { userId: user.email, levainId: defaultLevain.id, recipeId: prev.stylePresetId || 'custom' });
            }
        }
      } else if (isAnySourdough(prev.yeastType)) {
        newConfig.fermentationTechnique = FermentationTechnique.DIRECT;
        newConfig.yeastPercentage = 0.4;
      }
      
      const merged = { ...prev, ...newConfig } as DoughConfig;
      merged.ingredients = syncIngredientsFromConfig(merged);
      return merged;
    });
  }, [levains, user]);

  const handleLoadProRecipe = (newConfig: ProRecipe['config']) => {
    const fullConfig = { ...config, ...newConfig, stylePresetId: undefined };
    fullConfig.ingredients = syncIngredientsFromConfig(fullConfig);
    setConfig(fullConfig);
    navigate('calculator');
  };
  
  const handleStartBatch = useCallback(async () => {
    if (!results) return;

    const batchName = prompt("Name this bake:", `${config.recipeStyle} Bake`);
    if (batchName) {
        const newBatch = await addBatch({
            name: batchName,
            doughConfig: config,
            doughResult: results,
            status: BatchStatus.PLANNED,
            isFavorite: false,
        });
        addToast(`Bake "${newBatch.name}" started!`, 'success');
        navigate('mylab/fornadas');
    }
  }, [config, results, addBatch, navigate]);


  const handleLoadAndNavigate = useCallback((configToLoad: Partial<DoughConfig>) => {
    const merged = { ...config, ...configToLoad };
    merged.ingredients = syncIngredientsFromConfig(merged);
    setConfig(merged);
    addToast(`Style "${configToLoad.recipeStyle || 'Preset'}" loaded.`, 'info');
    navigate('calculator');
  }, [navigate, config]);

  // Handle loading a Data-Driven Style Module
  const handleLoadStyleFromModule = useCallback((style: DoughStyleDefinition) => {
      const newDoughConfig: Partial<DoughConfig> = {
        bakeType: style.category === 'Pizza' ? BakeType.PIZZAS : 
                  style.category === 'Pão' ? BakeType.BREADS_SAVORY : BakeType.SWEETS_PASTRY,
        baseStyleName: style.name,
        hydration: style.technical.hydration,
        salt: style.technical.salt,
        oil: style.technical.oil,
        sugar: style.technical.sugar,
        bakingTempC: style.technical.bakingTempC,
        fermentationTechnique: style.technical.fermentationTechnique,
        ingredients: style.ingredients.map(ing => ({...ing, manualOverride: false})),
        stylePresetId: undefined
      };
      setCalculatorMode('advanced');
      handleLoadAndNavigate(newDoughConfig);
  }, [handleLoadAndNavigate]);


  const handleCreateDraftAndNavigate = useCallback(async () => {
    const draft = await createDraftBatch();
    navigate(`batch/${draft.id}`);
  }, [createDraftBatch, navigate]);

  const renderPage = () => {
    const defaultOven = ovens.find(o => o.isDefault) || (ovens.length > 0 ? ovens[0] : undefined);
    const selectedFlour = FLOURS.find(f => f.id === config.flourId);
    
    // Handle Dynamic Routes
    if (route === 'batch') {
        return <BatchDetailPage batchId={routeParams} onNavigate={navigate} onLoadAndNavigate={handleLoadAndNavigate} />;
    }
    if (route === 'mylab/levain/detail' && routeParams) {
        return <LevainDetailPage levainId={routeParams} onNavigate={navigate} />;
    }
    if (route === 'mylab/consistency/detail' && routeParams) {
        return <ConsistencyDetailPage seriesId={routeParams} onNavigate={navigate} />;
    }
    if (route === 'styles/detail' && routeParams) {
        const style = getStyleById(routeParams);
        if (style) {
             return <StyleDetailPage style={style} onLoadAndNavigate={handleLoadStyleFromModule} onBack={() => navigate('styles')} />;
        }
    }

    switch (route) {
      case 'mylab':
      case 'lab': // Legacy redirect
        return (
          <MyLabPage
            onNavigate={navigate}
            onCreateDraftBatch={handleCreateDraftAndNavigate}
            onLoadAndNavigate={handleLoadAndNavigate}
          />
        );
      case 'mylab/receitas':
        return <MeuLabReceitasPage onNavigate={navigate} />;
      case 'mylab/receitas/comparar':
        return <CompareReceitasPage onNavigate={navigate} onLoadAndNavigate={handleLoadAndNavigate} />;
      case 'mylab/massas':
        return <MeuLabMassasPage onNavigate={navigate} />;
      case 'mylab/farinhas':
        return <MeuLabFarinhasPage onNavigate={navigate} />;
      case 'mylab/fornadas':
        return <MeuLabFornadasPage onLoadAndNavigate={handleLoadAndNavigate} onNavigate={navigate} onCreateDraftBatch={handleCreateDraftAndNavigate} />;
      case 'mylab/diario-sensorial':
        return <MeuLabDiarioSensorialPage onNavigate={navigate} />;
      case 'mylab/comparacoes':
        return <MeuLabComparacoesPage onNavigate={navigate} />;
      case 'mylab/insights':
        return <MeuLabInsightsPage onNavigate={navigate} />;
      case 'mylab/timeline':
        return <TimelinePage onNavigate={navigate} />;
      case 'mylab/objetivos':
        return <ObjectivesPage onNavigate={navigate} />;
      case 'mylab/consistency':
        return <ConsistencyListPage onNavigate={navigate} />;
      case 'mylab/levain-pet':
        return <MeuLabLevainPetPage />;
      case 'mylab/levain':
        return <LevainListPage onNavigate={navigate} />;
      case 'plans':
        return (
          <PlansPage
            onGrantAccess={() => {}}
            onNavigateHome={() => navigate('mylab')}
          />
        );
      case 'pro/activated':
        return <ProActivatedPage onNavigate={navigate} />;
      case 'learn':
        return <LearnPage onNavigate={navigate} />;
      case 'learn/fundamentals':
        return <FundamentalsPage onNavigate={navigate} />;
      case 'learn/methods':
        return <MethodsPage onNavigate={navigate} />;
      case 'learn/critical-ingredients':
        return <CriticalIngredientsPage onNavigate={navigate} />;
      case 'learn/ovens-heat':
        return <OvensHeatPage onNavigate={navigate} />;
      case 'learn/troubleshooting-guide':
        return <TroubleshootingGuidePage onNavigate={navigate} />;
      case 'learn/techniques':
        return <TechniquesPage />;
      case 'learn/fermentation':
        return <FermentationPage />;
      case 'learn/preferments':
        return <PrefermentsPage />;
      case 'learn/dough-science':
        return <DoughSciencePage />;
      case 'learn/oven-science':
        return <OvenSciencePage />;
      case 'learn/temperature-control':
        return <TemperatureControlPage />;
      case 'learn/storage':
        return <StoragePage />;
      case 'learn/hygiene-safety':
        return <HygieneSafetyPage />;
      case 'learn/equipment':
        return <EquipmentPage />;
      case 'learn/troubleshooting':
        return <TroubleshootingPage />;
      case 'learn/ingredients':
        return <IngredientsPage onNavigate={navigate} />;
      case 'learn/ingredients/flours':
        return <IngredientsFloursPage />;
      case 'learn/ingredients/yeasts':
        return <YeastsPage />;
      case 'learn/ingredients/cheeses':
        return <CheesesPage />;
      case 'learn/ingredients/meats':
        return <MeatsPage />;
      case 'learn/ingredients/vegetables':
        return <VegetablesPage />;
      case 'learn/ingredients/sauces':
        return <SaucesPage />;
      case 'learn/ingredients/oils-spices':
        return <OilsSpicesPage />;
       case 'learn/ingredients/oils':
        return <OilsPage />;
      case 'learn/ingredients/classic-combos':
        return <ClassicCombosPage />;
      case 'learn/ingredients/bold-combos':
        return <BoldCombosPage />;
      case 'learn/sensory-guide':
        return <SensoryGuidePage />;
      case 'learn/ingredients/pairing-tool':
        return <PairingToolPage />;
      case 'learn/ingredients/ready-toppings':
        return <ReadyToppingsPage />;
      case 'learn/chemistry-library':
        return <ChemistryLibraryPage />;
      case 'learn/style-guide':
        return <StyleGuidePage />;
      case 'learn/glossary':
        return <GlossaryPage />;
      case 'learn/oven-spring':
        return <OvenSpringPage />;
      case 'learn/fermentation-biochemistry':
        return <FermentationBiochemistryPage />;
      case 'learn/crumb-structure':
        return <CrumbStructurePage />;
      case 'learn/dough-aging':
        return <DoughAgingPage />;
      case 'learn/ambient-vs-cold-fermentation':
        return <AmbientVsColdFermentationPage />;
      case 'learn/mixing-techniques':
        return <MixingTechniquesPage />;
      case 'learn/balling-technique':
        return <BallingTechniquePage />;
      case 'learn/sensory-maturation':
        return <SensoryMaturationPage />;
      case 'learn/parbaking':
        return <ParbakingPage />;
      case 'learn/water':
        return <WaterPage />;
      case 'learn/salt':
        return <SaltPage />;
      case 'learn/sugars-malts-enzymes':
        return <SugarsPage />;
      case 'learn/fats':
        return <FatsPage />;
      case 'learn/tomato-preservation':
        return <TomatoPreservationPage />;
      case 'learn/white-sauces':
        return <WhiteSaucesPage />;
      case 'learn/special-sauces':
        return <SpecialSaucesPage />;
      case 'learn/low-moisture-cheeses':
        return <LowMoistureCheesesPage />;
      case 'learn/smoked-cheeses':
        return <SmokedCheesesPage />;
      case 'learn/cured-meats':
        return <CuredMeatsPage />;
      case 'learn/smoked-aromatics':
        return <SmokedAromaticsPage />;
      case 'learn/water-rich-vegetables':
        return <WaterRichVegetablesPage />;
      case 'learn/caramelizable-vegetables':
        return <CaramelizableVegetablesPage />;
      case 'learn/regional-combos':
        return <RegionalCombosPage />;
      case 'learn/sensory-profiles':
        return <SensoryProfilesPage />;
      case 'profile':
        return <ProfilePage onNavigate={navigate} />;
      case 'references':
        return <ReferencesPage />;
      case 'help':
        return <HelpPage />;
      case 'settings':
        return <SettingsPage />;
      case 'settings/language':
        return <LanguagePage />;
      case 'legal':
        return <LegalIndexPage onNavigate={navigate} />;
      case 'legal/terms':
      case 'terms':
        return <TermsPage />;
      case 'legal/privacy':
      case 'privacy':
        return <PrivacyPage />;
      case 'legal/cookies':
        return <CookiesPage />;
      case 'legal/eula':
        return <EulaPage />;
      case 'legal/ip':
        return <IpPage />;
      case 'legal/contact':
        return <ContactPage />;
      case 'landing':
        return <LandingPage />;
      case 'styles':
        return <DoughStylesPage onNavigateToDetail={(id) => navigate('styles', id)} />;
      case 'tools-oven-analysis':
        return <OvenAnalysisPage />;
      case 'shop':
        return <ShopPage />;
      case 'calculator':
        return (
          <CalculatorPage
            config={config}
            errors={errors}
            onConfigChange={handleConfigChange}
            onBakeTypeChange={handleBakeTypeChange}
            onStyleChange={handleStyleChange}
            onYeastTypeChange={handleYeastTypeChange}
            onReset={() => setConfig({...initialConfig, stylePresetId: undefined, ingredients: syncIngredientsFromConfig(initialConfig) })}
            results={results}
            unit={unit}
            onUnitChange={setUnit}
            unitSystem={unitSystem}
            onStartBatch={handleStartBatch}
            defaultOven={defaultOven}
            selectedFlour={selectedFlour}
            calculationMode={calculationMode}
            onCalculationModeChange={setCalculationMode}
            calculatorMode={calculatorMode}
            onCalculatorModeChange={onCalculatorModeChange}
            hasProAccess={hasProAccess}
            onOpenPaywall={() => openPaywall('calculator')}
          />
        );
      case 'flours':
        return <MeuLabFarinhasPage onNavigate={navigate} />;
      case 'community':
        return <CommunityPage onLoadInspiration={handleLoadAndNavigate} onNavigate={navigate} />;
      default:
        return (
          <MyLabPage
            onNavigate={navigate}
            onCreateDraftBatch={handleCreateDraftAndNavigate}
            onLoadAndNavigate={handleLoadAndNavigate}
          />
        );
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 transition-colors duration-300 flex flex-col">
      <Navigation
        activePage={route as PrimaryPage}
        onNavigate={navigate}
        onOpenAuth={() => setIsAuthModalOpen(true)}
      />

      <main className="flex-grow container mx-auto px-4 py-8 md:py-10 mt-20">
        {isAssistantOpen ? (
          <AssistantPage 
            config={config} 
            results={results} 
            defaultOven={ovens.find(o => o.isDefault) || ovens[0]}
            selectedFlour={FLOURS.find(f => f.id === config.flourId)}
            lastBatch={lastBatch}
          />
        ) : (
          <ErrorBoundary>
            {renderPage()}
          </ErrorBoundary>
        )}
      </main>
      
      <Footer onNavigate={navigate} />

      {!isAssistantOpen && (
         <FloatingActionButton 
            onClick={() => setIsAssistantOpen(true)} 
            label="Doughy"
            isShifted={isSummaryBarVisible}
         />
      )}

      {showLevainOnboarding && (
        <LevainOnboardingModal
            onComplete={handleOnboardingComplete}
            onNavigate={navigate}
        />
      )}


      <PaywallModal
        isOpen={isPaywallOpen}
        onClose={closePaywall}
        onNavigateToPlans={() => {
          closePaywall();
          navigate('plans');
        }}
        origin={paywallOrigin}
      />
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
      />
      
      
    </div>
  );
}

function App() {
  return (
      <AuthProvider>
        <ToastProvider>
         <I18nProvider>
           <UserProvider>
            <AppContent />
           </UserProvider>
         </I18nProvider>
        </ToastProvider>
      </AuthProvider>
  );
}

export default App;