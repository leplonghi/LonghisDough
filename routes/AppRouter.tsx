
import React from 'react';
import { Page, DoughConfig, DoughResult, Unit, UnitSystem, FormErrors, CalculationMode, OnboardingState } from '../types';
import { STYLES_DATA, getStyleById } from '../data/stylesData';
import RequireAuth from '../components/auth/RequireAuth';

// Core Pages
import CalculatorPage from '../pages/CalculatorPage';
import MyLabPage from '../pages/MyLabPage';
import CommunityPage from '../pages/community/CommunityPage';
import ShopPage from '../pages/ShopPage';
import LearnPage from '../pages/learn/LearnPage';

// Detail & Sub-pages
import BatchDetailPage from '../pages/BatchDetailPage';
import CommunityBatchDetailPage from '../pages/CommunityBatchDetailPage';
import { StyleDetailPage } from '../pages/styles/StyleDetailPage';
import DoughStylesPage from '../pages/styles/DoughStylesPage';

// Pages - Settings & Profile
import ProfilePage from '../pages/ProfilePage';
import SettingsPage from '../pages/settings/SettingsPage';
import LanguagePage from '../pages/settings/LanguagePage';

// Pages - My Lab
import MeuLabReceitasPage from '../pages/mylab/MeuLabReceitasPage';
import MeuLabLevainPetPage from '../pages/mylab/MeuLabLevainPetPage';
import MeuLabFornadasPage from '../pages/mylab/MeuLabFornadasPage';
import MeuLabFarinhasPage from '../pages/mylab/MeuLabFarinhasPage';
import MeuLabMassasPage from '../pages/mylab/MeuLabMassasPage';
import MeuLabDiarioSensorialPage from '../pages/mylab/MeuLabDiarioSensorialPage';
import MeuLabComparacoesPage from '../pages/mylab/MeuLabComparacoesPage';
import MeuLabInsightsPage from '../pages/mylab/MeuLabInsightsPage';
import TimelinePage from '../pages/mylab/TimelinePage';
import ObjectivesPage from '../pages/mylab/ObjectivesPage';
import CompareReceitasPage from '../pages/mylab/CompareReceitasPage';
import ConsistencyListPage from '../pages/mylab/ConsistencyListPage';
import ConsistencyDetailPage from '../pages/mylab/ConsistencyDetailPage';
import LevainListPage from '../pages/mylab/levain/LevainListPage';
import LevainDetailPage from '../pages/mylab/levain/LevainDetailPage';

// Pages - Tools & Resources
import FloursPage from '../pages/FloursPage';
import ReferencesPage from '../pages/ReferencesPage';
import { OvenAnalysisPage } from '../pages/OvenAnalysisPage';
import DoughbotPage from '../pages/DoughbotPage';

// Pages - Legal
import PlansPage from '../components/PlansPage'; // Note: PlansPage is in components in original structure
import ProActivatedPage from '../pages/pro/ProActivatedPage';
import LegalIndexPage from '../pages/legal/LegalIndexPage';

// Learn Subpages Imports
import TechniquesPage from '../pages/learn/TechniquesPage';
import FermentationPage from '../pages/learn/FermentationPage';
import DoughSciencePage from '../pages/learn/DoughSciencePage';
import TroubleshootingPage from '../pages/learn/TroubleshootingPage';
import IngredientsPage from '../pages/learn/IngredientsPage';
import ChemistryLibraryPage from '../pages/learn/ChemistryLibraryPage';
import StyleGuidePage from '../pages/learn/StyleGuidePage';
import GlossaryPage from '../pages/learn/GlossaryPage';
import CheesesPage from '../pages/learn/ingredients/CheesesPage';
import MeatsPage from '../pages/learn/ingredients/MeatsPage';
import VegetablesPage from '../pages/learn/ingredients/VegetablesPage';
import SaucesPage from '../pages/learn/ingredients/SaucesPage';
import OilsSpicesPage from '../pages/learn/ingredients/OilsSpicesPage';
import OilsPage from '../pages/learn/ingredients/OilsPage';
import ClassicCombosPage from '../pages/learn/ingredients/ClassicCombosPage';
import BoldCombosPage from '../pages/learn/ingredients/BoldCombosPage';
import SensoryGuidePage from '../pages/learn/SensoryGuidePage';
import PairingToolPage from '../pages/learn/ingredients/PairingToolPage';
import ReadyToppingsPage from '../pages/learn/ingredients/ReadyToppingsPage';
import OvenSciencePage from '../pages/learn/OvenSciencePage';
import IngredientsFloursPage from '../pages/learn/ingredients/FloursPage';
import YeastsPage from '../pages/learn/ingredients/YeastsPage';
import PrefermentsPage from '../pages/learn/PrefermentsPage';
import TemperatureControlPage from '../pages/learn/TemperatureControlPage';
import StoragePage from '../pages/learn/StoragePage';
import HygieneSafetyPage from '../pages/learn/HygieneSafetyPage';
import EquipmentPage from '../pages/learn/EquipmentPage';
import OvenSpringPage from '../pages/learn/OvenSpringPage';
import FermentationBiochemistryPage from '../pages/learn/FermentationBiochemistryPage';
import CrumbStructurePage from '../pages/learn/CrumbStructurePage';
import DoughAgingPage from '../pages/learn/DoughAgingPage';
import AmbientVsColdFermentationPage from '../pages/learn/AmbientVsColdFermentationPage';
import MixingTechniquesPage from '../pages/learn/MixingTechniquesPage';
import BallingTechniquePage from '../pages/learn/BallingTechniquePage';
import SensoryMaturationPage from '../pages/learn/SensoryMaturationPage';
import ParbakingPage from '../pages/learn/ParbakingPage';
import WaterPage from '../pages/learn/WaterPage';
import SaltPage from '../pages/learn/SaltPage';
import SugarsPage from '../pages/learn/SugarsPage';
import FatsPage from '../pages/learn/FatsPage';
import TomatoPreservationPage from '../pages/learn/TomatoPreservationPage';
import WhiteSaucesPage from '../pages/learn/WhiteSaucesPage';
import SpecialSaucesPage from '../pages/learn/SpecialSaucesPage';
import LowMoistureCheesesPage from '../pages/learn/LowMoistureCheesesPage';
import SmokedCheesesPage from '../pages/learn/SmokedCheesesPage';
import CuredMeatsPage from '../pages/learn/CuredMeatsPage';
import SmokedAromaticsPage from '../pages/learn/SmokedAromaticsPage';
import WaterRichVegetablesPage from '../pages/learn/WaterRichVegetablesPage';
import CaramelizableVegetablesPage from '../pages/learn/CaramelizableVegetablesPage';
import RegionalCombosPage from '../pages/learn/RegionalCombosPage';
import SensoryProfilesPage from '../pages/learn/SensoryProfilesPage';
import FundamentalsPage from '../pages/learn/FundamentalsPage';
import MethodsPage from '../pages/learn/MethodsPage';
import CriticalIngredientsPage from '../pages/learn/CriticalIngredientsPage';
import OvensHeatPage from '../pages/learn/OvensHeatPage';
import TroubleshootingGuidePage from '../pages/learn/TroubleshootingGuidePage';

function LandingPage() {
  return <div className="p-8 text-center">Landing Page (Coming Soon)</div>;
}

interface AppRouterProps {
  route: Page;
  routeParams: string | null;
  onNavigate: (page: Page, params?: string) => void;
  
  // Calculator State
  config: DoughConfig;
  results: DoughResult | null;
  errors: FormErrors;
  calculatorMode: 'basic' | 'advanced';
  calculationMode: CalculationMode;
  unit: Unit;
  unitSystem: UnitSystem;
  
  // Actions
  handleConfigChange: (newConfig: Partial<DoughConfig>) => void;
  handleLoadConfig: (newConfig: Partial<DoughConfig>) => void;
  handleLoadAndNavigate: (loadedConfig: DoughConfig) => void;
  handleStartBatch: () => void;
  createDraftBatch: () => void;
  grantSessionProAccess: () => void;
  
  // Settings
  setUnit: (unit: Unit) => void;
  setCalculationMode: (mode: CalculationMode) => void;
  setCalculatorMode: (mode: 'basic' | 'advanced') => void;
  
  // Data
  defaultOven: any;
  selectedFlour: any;
  hasProAccess: boolean;
  openPaywall: (origin: any) => void;
}

const AppRouter: React.FC<AppRouterProps> = ({
  route,
  routeParams,
  onNavigate,
  config,
  results,
  errors,
  calculatorMode,
  calculationMode,
  unit,
  unitSystem,
  handleConfigChange,
  handleLoadConfig,
  handleLoadAndNavigate,
  handleStartBatch,
  createDraftBatch,
  grantSessionProAccess,
  setUnit,
  setCalculationMode,
  setCalculatorMode,
  defaultOven,
  selectedFlour,
  hasProAccess,
  openPaywall
}) => {

  // --- MAIN PAGES ---
  if (route === 'calculator') {
      return (
          <CalculatorPage 
            config={config}
            errors={errors}
            results={results}
            onConfigChange={handleConfigChange}
            onBakeTypeChange={(type) => handleConfigChange({ bakeType: type })}
            onStyleChange={(id) => {
                const preset = STYLES_DATA.find(p => p.id === id); // Using STYLES_DATA now as generic source or DOUGH_STYLE_PRESETS
                // Note: We might need to import DOUGH_STYLE_PRESETS if STYLES_DATA structure is different
                // For now keeping logic abstract, assuming ID matches
                if (id) {
                   // Basic preset logic handled in CalculatorPage or passed down
                }
            }}
            onYeastTypeChange={(type) => handleConfigChange({ yeastType: type })}
            onReset={() => {/* handled in parent or form */}}
            unit={unit}
            onUnitChange={setUnit}
            unitSystem={unitSystem}
            onStartBatch={handleStartBatch}
            defaultOven={defaultOven}
            selectedFlour={selectedFlour}
            calculationMode={calculationMode}
            onCalculationModeChange={setCalculationMode}
            calculatorMode={calculatorMode}
            onCalculatorModeChange={setCalculatorMode}
            hasProAccess={hasProAccess}
            onOpenPaywall={() => openPaywall('calculator')}
          />
      );
  }

  if (route === 'mylab') {
      return (
        <RequireAuth>
          <MyLabPage 
            onNavigate={onNavigate} 
            onCreateDraftBatch={createDraftBatch}
            onLoadAndNavigate={handleLoadConfig}
          />
        </RequireAuth>
      );
  }

  if (route === 'styles') {
      return <DoughStylesPage onNavigateToDetail={(id) => onNavigate(`styles/${id}` as Page)} />;
  }
  
  if (route === 'styles/detail' && routeParams) {
       const style = getStyleById(routeParams);
       if (style) {
           return <StyleDetailPage style={style} onLoadAndNavigate={(s) => {
               const newConfig: Partial<DoughConfig> = {
                    recipeStyle: s.technical.fermentationTechnique ? s.technical.fermentationTechnique as any : config.recipeStyle, // Simplified mapping
                    hydration: s.technical.hydration,
                    salt: s.technical.salt,
                    oil: s.technical.oil,
                    sugar: s.technical.sugar,
                    bakingTempC: s.technical.bakingTempC,
                    fermentationTechnique: s.technical.fermentationTechnique,
                    baseStyleName: s.name,
                };
                handleConfigChange(newConfig);
                onNavigate('calculator');
           }} onBack={() => onNavigate('styles')} />;
       }
  }

  if (route === 'learn') return <LearnPage onNavigate={onNavigate} />;
  if (route === 'shop') return <ShopPage />;
  
  if (route === 'community') {
    return routeParams 
        ? <CommunityBatchDetailPage batchId={routeParams} onNavigate={onNavigate} onLoadAndNavigate={handleLoadAndNavigate} />
        : <CommunityPage onLoadInspiration={handleLoadConfig} onNavigate={onNavigate} />;
  }

  // --- MY LAB SUBPAGES (PROTECTED) ---
  if (route === 'mylab/fornadas') return <RequireAuth><MeuLabFornadasPage onLoadAndNavigate={handleLoadAndNavigate} onNavigate={onNavigate} onCreateDraftBatch={createDraftBatch} /></RequireAuth>;
  if (route === 'mylab/massas') return <RequireAuth><MeuLabMassasPage onNavigate={onNavigate} /></RequireAuth>;
  if (route === 'mylab/farinhas') return <RequireAuth><MeuLabFarinhasPage onNavigate={onNavigate} /></RequireAuth>;
  if (route === 'mylab/receitas') return <RequireAuth><MeuLabReceitasPage onNavigate={onNavigate} /></RequireAuth>;
  if (route === 'mylab/receitas/comparar') return <RequireAuth><CompareReceitasPage onNavigate={onNavigate} onLoadAndNavigate={handleLoadAndNavigate} /></RequireAuth>;
  if (route === 'mylab/diario-sensorial') return <RequireAuth><MeuLabDiarioSensorialPage onNavigate={onNavigate} /></RequireAuth>;
  if (route === 'mylab/comparacoes') return <RequireAuth><MeuLabComparacoesPage onNavigate={onNavigate} /></RequireAuth>;
  if (route === 'mylab/insights') return <RequireAuth><MeuLabInsightsPage onNavigate={onNavigate} /></RequireAuth>;
  if (route === 'mylab/timeline') return <RequireAuth><TimelinePage onNavigate={onNavigate} /></RequireAuth>;
  if (route === 'mylab/objetivos') return <RequireAuth><ObjectivesPage onNavigate={onNavigate} /></RequireAuth>;
  if (route === 'mylab/levain') return <RequireAuth><LevainListPage onNavigate={onNavigate} /></RequireAuth>;
  if (route === 'mylab/levain/detail' && routeParams) return <RequireAuth><LevainDetailPage levainId={routeParams} onNavigate={onNavigate} /></RequireAuth>;
  if (route === 'mylab/levain-pet') return <RequireAuth><MeuLabLevainPetPage /></RequireAuth>;
  if (route === 'mylab/consistency') return <RequireAuth><ConsistencyListPage onNavigate={onNavigate} /></RequireAuth>;
  if (route === 'mylab/consistency/detail' && routeParams) return <RequireAuth><ConsistencyDetailPage seriesId={routeParams} onNavigate={onNavigate} /></RequireAuth>;


  // --- BATCH DETAIL ---
  if (route === 'batch' && routeParams) {
      return <RequireAuth><BatchDetailPage batchId={routeParams} onNavigate={onNavigate} onLoadAndNavigate={handleLoadAndNavigate} /></RequireAuth>;
  }

  // --- TOOLS & RESOURCES ---
  if (route === 'flours') return <FloursPage onNavigate={onNavigate} />;
  if (route === 'references') return <ReferencesPage />;
  if (route === 'tools-oven-analysis') return <OvenAnalysisPage />;
  if (route === 'tools-doughbot') return <DoughbotPage />;
  
  // --- USER & SETTINGS ---
  if (route === 'profile') return <RequireAuth><ProfilePage onNavigate={onNavigate} /></RequireAuth>;
  if (route === 'plans') return <PlansPage onGrantAccess={() => { grantSessionProAccess(); onNavigate('pro/activated'); }} onNavigateHome={() => onNavigate('mylab')} />;
  if (route === 'settings') return <SettingsPage />;
  if (route === 'settings/language') return <LanguagePage />;
  if (route === 'pro/activated') return <ProActivatedPage onNavigate={onNavigate} />;

  // --- LEGAL ---
  if (route === 'legal' || route === 'terms' || route === 'privacy' || route === 'legal/terms' || route === 'legal/privacy') return <LegalIndexPage onNavigate={onNavigate} />;
  
  // --- LEARN SUBPAGES ---
  // Mapping simple strings to components for brevity
  const learnRoutes: Record<string, React.FC<any>> = {
      'learn/techniques': TechniquesPage,
      'learn/fermentation': FermentationPage,
      'learn/dough-science': DoughSciencePage,
      'learn/troubleshooting': TroubleshootingPage,
      'learn/ingredients': IngredientsPage,
      'learn/chemistry-library': ChemistryLibraryPage,
      'learn/style-guide': StyleGuidePage,
      'learn/glossary': GlossaryPage,
      'learn/oven-science': OvenSciencePage,
      'learn/ingredients/cheeses': CheesesPage,
      'learn/ingredients/meats': MeatsPage,
      'learn/ingredients/vegetables': VegetablesPage,
      'learn/ingredients/sauces': SaucesPage,
      'learn/ingredients/oils-spices': OilsSpicesPage,
      'learn/ingredients/oils': OilsPage,
      'learn/ingredients/classic-combos': ClassicCombosPage,
      'learn/ingredients/bold-combos': BoldCombosPage,
      'learn/sensory-guide': SensoryGuidePage,
      'learn/ingredients/pairing-tool': PairingToolPage,
      'learn/ingredients/ready-toppings': ReadyToppingsPage,
      'learn/ingredients/flours': IngredientsFloursPage,
      'learn/ingredients/yeasts': YeastsPage,
      'learn/preferments': PrefermentsPage,
      'learn/temperature-control': TemperatureControlPage,
      'learn/storage': StoragePage,
      'learn/hygiene-safety': HygieneSafetyPage,
      'learn/equipment': EquipmentPage,
      'learn/oven-spring': OvenSpringPage,
      'learn/fermentation-biochemistry': FermentationBiochemistryPage,
      'learn/crumb-structure': CrumbStructurePage,
      'learn/dough-aging': DoughAgingPage,
      'learn/ambient-vs-cold-fermentation': AmbientVsColdFermentationPage,
      'learn/mixing-techniques': MixingTechniquesPage,
      'learn/balling-technique': BallingTechniquePage,
      'learn/sensory-maturation': SensoryMaturationPage,
      'learn/parbaking': ParbakingPage,
      'learn/water': WaterPage,
      'learn/salt': SaltPage,
      'learn/sugars-malts-enzymes': SugarsPage,
      'learn/fats': FatsPage,
      'learn/tomato-preservation': TomatoPreservationPage,
      'learn/white-sauces': WhiteSaucesPage,
      'learn/special-sauces': SpecialSaucesPage,
      'learn/low-moisture-cheeses': LowMoistureCheesesPage,
      'learn/smoked-cheeses': SmokedCheesesPage,
      'learn/cured-meats': CuredMeatsPage,
      'learn/smoked-aromatics': SmokedAromaticsPage,
      'learn/water-rich-vegetables': WaterRichVegetablesPage,
      'learn/caramelizable-vegetables': CaramelizableVegetablesPage,
      'learn/regional-combos': RegionalCombosPage,
      'learn/sensory-profiles': SensoryProfilesPage,
      'learn/fundamentals': FundamentalsPage,
      'learn/methods': MethodsPage,
      'learn/critical-ingredients': CriticalIngredientsPage,
      'learn/ovens-heat': OvensHeatPage,
      'learn/troubleshooting-guide': TroubleshootingGuidePage,
  };
  
  if (learnRoutes[route]) {
      const Component = learnRoutes[route];
      return <Component onNavigate={onNavigate} />;
  }

  return <LandingPage />;
};

export default AppRouter;
