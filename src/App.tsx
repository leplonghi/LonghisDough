
import React, {
  useState,
  useEffect,
  useCallback,
  useMemo,
  useRef,
  Suspense,
} from 'react';
import Navigation from '@/components/layout/Navigation';
import Footer from '@/components/layout/Footer';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import RequireAuth from '@/components/RequireAuth';
import RequirePro from '@/components/RequirePro';
import ErrorBoundary from '@/components/ui/ErrorBoundary';
import FloatingActionButton from '@/components/ui/FloatingActionButton';

// Constants & Types
import {
  DoughConfig,
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
  CalculationMode,
  DoughStyleDefinition,
} from '@/types';
import { DOUGH_STYLE_PRESETS, DEFAULT_CONFIG } from '@/constants';
import { FLOURS } from '@/flours-constants';
import { getStyleById, getAllowedFermentationTechniques } from '@/data/stylesData';

// Logic & Services
import { calculateDoughUniversal, syncIngredientsFromConfig } from '@/logic/doughMath';
import { normalizeDoughConfig } from '@/logic/normalization';
import { logEvent } from '@/services/analytics';

// Contexts
import { ToastProvider, useToast } from '@/components/ToastProvider';
import { UserProvider, useUser } from '@/contexts/UserProvider';
import { AuthProvider } from '@/contexts/AuthContext';
import { I18nProvider } from '@/i18n';

// Modals
import { PaywallModal } from '@/components/PaywallModal';
import AuthModal from '@/components/AuthModal';
import LevainOnboardingModal from '@/components/onboarding/LevainOnboardingModal';

// Lazy Load Pages
const CalculatorPage = React.lazy(() => import('@/pages/CalculatorPage'));
const BatchDetailPage = React.lazy(() => import('@/pages/BatchDetailPage'));
const ProfilePage = React.lazy(() => import('@/pages/ProfilePage'));
const PlansPage = React.lazy(() => import('@/components/PlansPage'));
const LearnPage = React.lazy(() => import('@/pages/learn/LearnPage'));
const ReferencesPage = React.lazy(() => import('@/pages/ReferencesPage'));
const MyLabPage = React.lazy(() => import('@/pages/MyLabPage'));
const AssistantPage = React.lazy(() => import('@/components/AssistantPage'));
const OvenAnalysisPage = React.lazy(() => import('@/pages/OvenAnalysisPage'));
const DoughStylesPage = React.lazy(() => import('@/pages/styles/DoughStylesPage'));
const StyleDetailPage = React.lazy(() => import('@/pages/styles/StyleDetailPage').then(module => ({ default: module.StyleDetailPage })));
const SettingsPage = React.lazy(() => import('@/pages/SettingsPage'));
const LanguagePage = React.lazy(() => import('@/pages/settings/LanguagePage'));
const TermsPage = React.lazy(() => import('@/pages/legal/TermsPage'));
const PrivacyPage = React.lazy(() => import('@/pages/legal/PrivacyPage'));
const CookiesPage = React.lazy(() => import('@/pages/legal/CookiesPage'));
const EulaPage = React.lazy(() => import('@/pages/legal/EulaPage'));
const IpPage = React.lazy(() => import('@/pages/legal/IpPage'));
const ContactPage = React.lazy(() => import('@/pages/legal/ContactPage'));
const LegalIndexPage = React.lazy(() => import('@/pages/legal/LegalIndexPage'));

// Lazy Load Learn Sub-Pages
const FundamentalsPage = React.lazy(() => import('@/pages/learn/FundamentalsPage'));
const MethodsPage = React.lazy(() => import('@/pages/learn/MethodsPage'));
const CriticalIngredientsPage = React.lazy(() => import('@/pages/learn/CriticalIngredientsPage'));
const OvensHeatPage = React.lazy(() => import('@/pages/learn/OvensHeatPage'));
const TroubleshootingGuidePage = React.lazy(() => import('@/pages/learn/TroubleshootingGuidePage'));
const FermentationPage = React.lazy(() => import('@/pages/learn/FermentationPage'));
const DoughSciencePage = React.lazy(() => import('@/pages/learn/DoughSciencePage'));
const TroubleshootingPage = React.lazy(() => import('@/pages/learn/TroubleshootingPage'));
const IngredientsPage = React.lazy(() => import('@/pages/learn/IngredientsPage'));
const ChemistryLibraryPage = React.lazy(() => import('@/pages/learn/ChemistryLibraryPage'));
const StyleGuidePage = React.lazy(() => import('@/pages/learn/StyleGuidePage'));
const GlossaryPage = React.lazy(() => import('@/pages/learn/GlossaryPage'));
const OvenSciencePage = React.lazy(() => import('@/pages/learn/OvenSciencePage'));
const OvenSpringPage = React.lazy(() => import('@/pages/learn/OvenSpringPage'));
const FermentationBiochemistryPage = React.lazy(() => import('@/pages/learn/FermentationBiochemistryPage'));
const CrumbStructurePage = React.lazy(() => import('@/pages/learn/CrumbStructurePage'));
const DoughAgingPage = React.lazy(() => import('@/pages/learn/DoughAgingPage'));
const AmbientVsColdFermentationPage = React.lazy(() => import('@/pages/learn/AmbientVsColdFermentationPage'));
const MixingTechniquesPage = React.lazy(() => import('@/pages/learn/MixingTechniquesPage'));
const BallingTechniquePage = React.lazy(() => import('@/pages/learn/BallingTechniquePage'));
const SensoryMaturationPage = React.lazy(() => import('@/pages/learn/SensoryMaturationPage'));
const ParbakingPage = React.lazy(() => import('@/pages/learn/ParbakingPage'));
const WaterPage = React.lazy(() => import('@/pages/learn/WaterPage'));
const SaltPage = React.lazy(() => import('@/pages/learn/SaltPage'));
const SugarsPage = React.lazy(() => import('@/pages/learn/SugarsPage'));
const FatsPage = React.lazy(() => import('@/pages/learn/FatsPage'));
const TomatoPreservationPage = React.lazy(() => import('@/pages/learn/TomatoPreservationPage'));
const WhiteSaucesPage = React.lazy(() => import('@/pages/learn/WhiteSaucesPage'));
const SpecialSaucesPage = React.lazy(() => import('@/pages/learn/SpecialSaucesPage'));
const LowMoistureCheesesPage = React.lazy(() => import('@/pages/learn/LowMoistureCheesesPage'));
const SmokedCheesesPage = React.lazy(() => import('@/pages/learn/SmokedCheesesPage'));
const CuredMeatsPage = React.lazy(() => import('@/pages/learn/CuredMeatsPage'));
const SmokedAromaticsPage = React.lazy(() => import('@/pages/learn/SmokedAromaticsPage'));
const WaterRichVegetablesPage = React.lazy(() => import('@/pages/learn/WaterRichVegetablesPage'));
const CaramelizableVegetablesPage = React.lazy(() => import('@/pages/learn/CaramelizableVegetablesPage'));
const RegionalCombosPage = React.lazy(() => import('@/pages/learn/RegionalCombosPage'));
const SensoryProfilesPage = React.lazy(() => import('@/pages/learn/SensoryProfilesPage'));
const AutolysePage = React.lazy(() => import('@/pages/learn/AutolysePage'));
const TechniquesPage = React.lazy(() => import('@/pages/learn/TechniquesPage'));
const PrefermentsPage = React.lazy(() => import('@/pages/learn/PrefermentsPage'));
const TemperatureControlPage = React.lazy(() => import('@/pages/learn/TemperatureControlPage'));
const StoragePage = React.lazy(() => import('@/pages/learn/StoragePage'));
const HygieneSafetyPage = React.lazy(() => import('@/pages/learn/HygieneSafetyPage'));
const EquipmentPage = React.lazy(() => import('@/pages/learn/EquipmentPage'));
const SensoryGuidePage = React.lazy(() => import('@/pages/learn/SensoryGuidePage'));


// Ingredient Sub-Pages
const IngredientsFloursPage = React.lazy(() => import('@/pages/learn/ingredients/FloursPage'));
const YeastsPage = React.lazy(() => import('@/pages/learn/ingredients/YeastsPage'));
const CheesesPage = React.lazy(() => import('@/pages/learn/ingredients/CheesesPage'));
const MeatsPage = React.lazy(() => import('@/pages/learn/ingredients/MeatsPage'));
const VegetablesPage = React.lazy(() => import('@/pages/learn/ingredients/VegetablesPage'));
const SaucesPage = React.lazy(() => import('@/pages/learn/ingredients/SaucesPage'));
const OilsSpicesPage = React.lazy(() => import('@/pages/learn/ingredients/OilsSpicesPage'));
const OilsPage = React.lazy(() => import('@/pages/learn/ingredients/OilsPage'));
const ClassicCombosPage = React.lazy(() => import('@/pages/learn/ingredients/ClassicCombosPage'));
const BoldCombosPage = React.lazy(() => import('@/pages/learn/ingredients/BoldCombosPage'));
const PairingToolPage = React.lazy(() => import('@/pages/learn/ingredients/PairingToolPage'));
const ReadyToppingsPage = React.lazy(() => import('@/pages/learn/ingredients/ReadyToppingsPage'));

// My Lab Pages
const MeuLabReceitasPage = React.lazy(() => import('@/pages/mylab/MeuLabReceitasPage'));
const MeuLabLevainPetPage = React.lazy(() => import('@/pages/mylab/MeuLabLevainPetPage'));
const MeuLabFornadasPage = React.lazy(() => import('@/pages/mylab/MeuLabFornadasPage'));
const MeuLabFarinhasPage = React.lazy(() => import('@/pages/mylab/MeuLabFarinhasPage'));
const MeuLabMassasPage = React.lazy(() => import('@/pages/mylab/MeuLabMassasPage'));
const MeuLabDiarioSensorialPage = React.lazy(() => import('@/pages/mylab/MeuLabDiarioSensorialPage'));
const MeuLabComparacoesPage = React.lazy(() => import('@/pages/mylab/MeuLabComparacoesPage'));
const MeuLabInsightsPage = React.lazy(() => import('@/pages/mylab/MeuLabInsightsPage'));
const TimelinePage = React.lazy(() => import('@/pages/mylab/TimelinePage'));
const ObjectivesPage = React.lazy(() => import('@/pages/mylab/ObjectivesPage'));
const LevainListPage = React.lazy(() => import('@/pages/mylab/levain/LevainListPage'));
const LevainDetailPage = React.lazy(() => import('@/pages/mylab/levain/LevainDetailPage'));
const CompareReceitasPage = React.lazy(() => import('@/pages/mylab/CompareReceitasPage'));
const ConsistencyListPage = React.lazy(() => import('@/pages/mylab/ConsistencyListPage'));
const ConsistencyDetailPage = React.lazy(() => import('@/pages/mylab/ConsistencyDetailPage'));

// Feature Pages
const ShopPage = React.lazy(() => import('@/pages/ShopPage'));
const CommunityPage = React.lazy(() => import('@/pages/CommunityPage'));
const CommunityBatchDetailPage = React.lazy(() => import('@/pages/CommunityBatchDetailPage'));
const ProActivatedPage = React.lazy(() => import('@/pages/pro/ProActivatedPage'));
const FloursPage = React.lazy(() => import('@/pages/FloursPage'));
const DoughbotPage = React.lazy(() => import('@/pages/DoughbotPage'));

// --- Placeholder Pages ---
function HelpPage() {
  return <div className="p-8 text-center">Help & Support (Coming Soon)</div>;
}
function LandingPage() {
  return <div className="p-8 text-center">Landing Page (Coming Soon)</div>;
}

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
  
  // State to track if user has interacted with calculator to show results
  const [hasInteracted, setHasInteracted] = useState(false);

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

  // Use the validation logic directly inside useEffect
  useEffect(() => {
      const validationErrors: FormErrors = {};

      if (config.numPizzas < 1 || config.numPizzas > 100) {
        validationErrors.numPizzas = 'A value between 1 and 100 is recommended.';
      }
      if (config.doughBallWeight < 100 || config.doughBallWeight > 2000) {
        validationErrors.doughBallWeight = 'A value between 100g and 2000g is recommended.';
      }
      if (config.hydration < 0 || config.hydration > 120) {
        validationErrors.hydration = 'A value between 0% and 120% is recommended.';
      }
      if (config.scale < 0.25 || config.scale > 4) {
        validationErrors.scale = 'A scale multiplier between 0.25x and 4x is recommended.';
      }
      if (config.bakingTempC < 150 || config.bakingTempC > 500) {
        validationErrors.bakingTempC = 'A value between 150°C and 500°C is recommended.';
      }
      const maxYeast = isAnySourdough(config.yeastType) ? 50 : 5;
      if (config.yeastPercentage < 0 || config.yeastPercentage > maxYeast) {
        validationErrors.yeastPercentage = `A value between 0% and ${maxYeast}% is recommended.`;
      }
      if (config.fermentationTechnique !== FermentationTechnique.DIRECT) {
        if (
          config.prefermentFlourPercentage < 10 ||
          config.prefermentFlourPercentage > 100
        ) {
          validationErrors.prefermentFlourPercentage = 'A value between 10% and 100% is recommended.';
        }
      }
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
    if (!hasInteracted && route === 'calculator' && !routeParams) {
        return null;
    }
    
    const userLevain = config.yeastType === YeastType.USER_LEVAIN
      ? levains.find(l => l.id === config.levainId)
      : null;
    return calculateDoughUniversal(config, calculatorMode, calculationMode, userLevain);
  }, [config, hasErrors, levains, calculatorMode, calculationMode, hasInteracted, route, routeParams]);

  const isSummaryBarVisible = route === 'calculator' && !!results;

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('test_pro') === 'true') {
      grantSessionProAccess();
      window.history.replaceState({}, document.title, window.location.pathname);
    }
  }, [grantSessionProAccess]);

  const handleConfigChange = useCallback((newConfig: Partial<DoughConfig>) => {
    setHasInteracted(true);
    
    let updatedConfig = { 
        ...config, 
        ...newConfig, 
        stylePresetId: calculatorMode === 'basic' ? config.stylePresetId : undefined 
    };

    updatedConfig = normalizeDoughConfig(updatedConfig);
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
        let newConf = {
          ...config,
          hydration: defaultHydration,
          salt: defaultSalt,
          oil: defaultOil,
          sugar: defaultSugar || 0,
          stylePresetId: preset.id,
        };
        newConf = normalizeDoughConfig(newConf);
        newConf.ingredients = syncIngredientsFromConfig(newConf);
        setConfig(newConf);
      }
    }
  }, [config.recipeStyle, config]);

  const handleBakeTypeChange = useCallback(
    (bakeType: BakeType) => {
      setHasInteracted(true);
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

        let newConf = {
          ...initialConfig,
          ...config,
          bakeType,
          recipeStyle: recipeStyle,
          ...presetValues,
          stylePresetId: firstMatchingPreset.id,
        };
        newConf = normalizeDoughConfig(newConf);
        newConf.ingredients = syncIngredientsFromConfig(newConf);
        setConfig(newConf);
      } else {
        let newConf = { ...config, bakeType, stylePresetId: undefined };
        newConf = normalizeDoughConfig(newConf);
        newConf.ingredients = syncIngredientsFromConfig(newConf);
        setConfig(newConf);
      }
    },
    [initialConfig, config.yeastType, config],
  );

  const handleStyleChange = useCallback((presetId: string) => {
    setHasInteracted(true);
    const preset = DOUGH_STYLE_PRESETS.find((p) => p.id === presetId);
    if (preset) {
      const { defaultHydration, defaultSalt, defaultOil, defaultYeastPct, defaultSugar, preferredFlourProfileId, recipeStyle, type } = preset;
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

      let newConf = { 
          ...config, 
          recipeStyle, 
          ...presetValues, 
          stylePresetId: preset.id,
      };
      newConf = normalizeDoughConfig(newConf);
      newConf.ingredients = syncIngredientsFromConfig(newConf);
      setConfig(newConf);
    }
  }, [config.yeastType, config]);

  const handleYeastTypeChange = useCallback((yeastType: YeastType) => {
    setHasInteracted(true);
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
      
      let merged = { ...prev, ...newConfig } as DoughConfig;
      merged = normalizeDoughConfig(merged);
      merged.ingredients = syncIngredientsFromConfig(merged);
      return merged;
    });
  }, [levains, user]);

  const handleLoadProRecipe = (newConfig: ProRecipe['config']) => {
    setHasInteracted(true);
    let fullConfig = { ...config, ...newConfig, stylePresetId: undefined };
    fullConfig = normalizeDoughConfig(fullConfig);
    fullConfig.ingredients = syncIngredientsFromConfig(fullConfig);
    setConfig(fullConfig);
    navigate('calculator');
  };
  
  const handleStartBatch = useCallback(async () => {
    if (!results) return;

    const savedBatches = batches.filter(b => b.status !== BatchStatus.DRAFT);
    if (!hasProAccess && savedBatches.length >= 1) {
        addToast("Free plan includes 1 saved bake. Pro gives you unlimited bake history.", "error");
        setTimeout(() => addToast("One failed dough costs more than Pro.", "info"), 2000);
        openPaywall('mylab');
        return;
    }

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
  }, [config, results, addBatch, navigate, hasProAccess, batches, openPaywall, addToast]);


  const handleLoadAndNavigate = useCallback((configToLoad: Partial<DoughConfig>) => {
    setHasInteracted(true);
    let merged = { ...config, ...configToLoad };
    merged = normalizeDoughConfig(merged);
    merged.ingredients = syncIngredientsFromConfig(merged);
    setConfig(merged);
    addToast(`Style "${configToLoad.recipeStyle || 'Preset'}" loaded.`, 'info');
    navigate('calculator');
  }, [navigate, config]);

  const handleLoadStyleFromModule = useCallback((style: DoughStyleDefinition) => {
      let bakeType = BakeType.PIZZAS;
      if (style.category === 'bread' || style.category === 'enriched_bread' || style.category === 'burger_bun') {
          bakeType = BakeType.BREADS_SAVORY;
      } else if (style.category === 'pastry' || style.category === 'cookie') {
          bakeType = BakeType.SWEETS_PASTRY;
      }

      let newDoughConfig: Partial<DoughConfig> = {
        bakeType,
        baseStyleName: style.name,
        recipeStyle: style.recipeStyle,
        hydration: style.technical.hydration,
        salt: style.technical.salt,
        oil: style.technical.oil,
        sugar: style.technical.sugar,
        bakingTempC: style.technical.bakingTempC,
        fermentationTechnique: style.technical.fermentationTechnique,
        ingredients: style.ingredients.map(ing => ({...ing, manualOverride: false})),
        stylePresetId: undefined,
        selectedStyleId: style.id
      };
      
      const tempConfig = { ...config, ...newDoughConfig };
      const normalized = normalizeDoughConfig(tempConfig);
      
      newDoughConfig = {
          ...newDoughConfig,
          fermentationTechnique: normalized.fermentationTechnique,
          yeastType: normalized.yeastType
      };

      setCalculatorMode('advanced');
      handleLoadAndNavigate(newDoughConfig);
  }, [handleLoadAndNavigate, config]);


  const handleCreateDraftAndNavigate = useCallback(async () => {
    const draft = await createDraftBatch();
    navigate(`batch/${draft.id}`);
  }, [createDraftBatch, navigate]);

  const protect = (component: React.ReactNode) => (
    <RequireAuth onOpenAuth={() => setIsAuthModalOpen(true)}>
      {component}
    </RequireAuth>
  );

  const protectPro = (component: React.ReactNode) => (
    <RequireAuth onOpenAuth={() => setIsAuthModalOpen(true)}>
      <RequirePro>
        {component}
      </RequirePro>
    </RequireAuth>
  );

  const renderPage = () => {
    const defaultOven = ovens.find(o => o.isDefault) || (ovens.length > 0 ? ovens[0] : undefined);
    const selectedFlour = FLOURS.find(f => f.id === config.flourId);
    
    if (route === 'batch') {
        return protect(<BatchDetailPage batchId={routeParams} onNavigate={navigate} onLoadAndNavigate={handleLoadAndNavigate} />);
    }
    if (route === 'mylab/levain/detail' && routeParams) {
        return protect(<LevainDetailPage levainId={routeParams} onNavigate={navigate} />);
    }
    if (route === 'mylab/consistency/detail' && routeParams) {
        return protectPro(<ConsistencyDetailPage seriesId={routeParams} onNavigate={navigate} />);
    }
    if (route === 'styles/detail' && routeParams) {
        const style = getStyleById(routeParams);
        if (style) {
             return protect(<StyleDetailPage style={style} onLoadAndNavigate={handleLoadStyleFromModule} onBack={() => navigate('styles')} />);
        }
    }
    
    if (route === 'community/detail' && routeParams) {
        return protect(<CommunityBatchDetailPage batchId={routeParams} onLoadAndNavigate={handleLoadAndNavigate} onNavigate={navigate} />);
    }

    switch (route) {
      case 'mylab':
      case 'lab':
        return protect(
          <MyLabPage
            onNavigate={navigate}
            onCreateDraftBatch={handleCreateDraftAndNavigate}
            onLoadAndNavigate={handleLoadAndNavigate}
          />
        );
      case 'mylab/receitas':
        return protectPro(<MeuLabReceitasPage onNavigate={navigate} />);
      case 'mylab/receitas/comparar':
        return protectPro(<CompareReceitasPage onNavigate={navigate} onLoadAndNavigate={handleLoadAndNavigate} />);
      case 'mylab/massas':
        return protectPro(<MeuLabMassasPage onNavigate={navigate} />);
      case 'mylab/farinhas':
        return protectPro(<MeuLabFarinhasPage onNavigate={navigate} />);
      case 'mylab/fornadas':
        return protect(<MeuLabFornadasPage onLoadAndNavigate={handleLoadAndNavigate} onNavigate={navigate} onCreateDraftBatch={handleCreateDraftAndNavigate} />);
      case 'mylab/diario-sensorial':
        return protectPro(<MeuLabDiarioSensorialPage onNavigate={navigate} />);
      case 'mylab/comparacoes':
        return protect(<MeuLabComparacoesPage onNavigate={navigate} onLoadAndNavigate={handleLoadAndNavigate} />);
      case 'mylab/insights':
        return protect(<MeuLabInsightsPage onNavigate={navigate} />);
      case 'mylab/timeline':
        return protect(<TimelinePage onNavigate={navigate} />);
      case 'mylab/objetivos':
        return protectPro(<ObjectivesPage onNavigate={navigate} />);
      case 'mylab/consistency':
        return protectPro(<ConsistencyListPage onNavigate={navigate} />);
      case 'mylab/levain-pet':
        return protectPro(<MeuLabLevainPetPage />);
      case 'mylab/levain':
        return protect(<LevainListPage onNavigate={navigate} />);
      case 'plans':
        return protect(
          <PlansPage
            onGrantAccess={() => {}}
            onNavigateHome={() => navigate('mylab')}
          />
        );
      case 'pro/activated':
        return protect(<ProActivatedPage onNavigate={navigate} />);
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
      case 'learn/autolyse':
        return <AutolysePage />;
      case 'profile':
        return protect(<ProfilePage onNavigate={navigate} />);
      case 'references':
        return <ReferencesPage />; // Public
      case 'help':
        return <HelpPage />; // Keeping public for assistance
      case 'settings':
        return protect(<SettingsPage />);
      case 'settings/language':
        return protect(<LanguagePage />);
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
        return protect(<DoughStylesPage doughConfig={config} onLoadStyle={handleLoadStyleFromModule} onNavigateToDetail={(id) => navigate(`styles/${id}`)} />);
      case 'tools-oven-analysis':
        return protectPro(<OvenAnalysisPage />);
      case 'tools-doughbot':
        return protectPro(<DoughbotPage />);
      case 'shop':
        return <ShopPage />; // Public
      case 'calculator':
        return protect(
          <CalculatorPage
            config={config}
            errors={errors}
            onConfigChange={handleConfigChange}
            onBakeTypeChange={handleBakeTypeChange}
            onStyleChange={handleStyleChange}
            onYeastTypeChange={handleYeastTypeChange}
            onReset={() => {
                setConfig({...initialConfig, stylePresetId: undefined, ingredients: syncIngredientsFromConfig(initialConfig) });
                setHasInteracted(false);
            }}
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
        return protect(<FloursPage onNavigate={navigate} />);
      case 'community':
        return protect(<CommunityPage onLoadInspiration={handleLoadAndNavigate} onNavigate={navigate} />);
      default:
        return protect(
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
          <Suspense fallback={<LoadingSpinner />}>
            {protectPro(
              <AssistantPage 
                config={config} 
                results={results} 
                defaultOven={ovens.find(o => o.isDefault) || ovens[0]}
                selectedFlour={FLOURS.find(f => f.id === config.flourId)}
                lastBatch={lastBatch}
                t={(key, replacements) => key}
              />
            )}
          </Suspense>
        ) : (
          <ErrorBoundary>
            <Suspense fallback={<LoadingSpinner />}>
              {renderPage()}
            </Suspense>
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
