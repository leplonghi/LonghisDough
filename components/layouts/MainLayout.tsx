
import React from 'react';
import Navigation from '../Navigation';
import Footer from '../Footer';
import { PaywallModal } from '../PaywallModal';
import AuthModal from '../AuthModal';
import LevainOnboardingModal from '../onboarding/LevainOnboardingModal';
import FloatingActionButton from '../FloatingActionButton';
import AssistantPage from '../AssistantPage';
import ErrorBoundary from '../ErrorBoundary';
import { Page, DoughConfig, DoughResult, Batch, FlourDefinition, Oven } from '../../types';
import { useUser } from '../../contexts/UserProvider';
import { useTranslation } from '../../i18n';

interface MainLayoutProps {
  children: React.ReactNode;
  activePage: Page;
  onNavigate: (page: Page, params?: string) => void;
  
  // UI State for Modals controlled by App/Global logic
  isAuthModalOpen: boolean;
  setIsAuthModalOpen: (isOpen: boolean) => void;
  showLevainOnboarding: boolean;
  setShowLevainOnboarding: (show: boolean) => void;
  showAssistant: boolean;
  setShowAssistant: (show: boolean) => void;
  
  // Data for Assistant context
  assistantData: {
    config: DoughConfig;
    results: DoughResult | null;
    lastBatch?: Batch;
    selectedFlour?: FlourDefinition;
    defaultOven?: Oven;
  };
}

const MainLayout: React.FC<MainLayoutProps> = ({
  children,
  activePage,
  onNavigate,
  isAuthModalOpen,
  setIsAuthModalOpen,
  showLevainOnboarding,
  setShowLevainOnboarding,
  showAssistant,
  setShowAssistant,
  assistantData
}) => {
  const { t } = useTranslation();
  const { 
    isPaywallOpen, 
    closePaywall, 
    paywallOrigin, 
  } = useUser();

  return (
    <div className="flex min-h-screen flex-col bg-slate-50 font-sans text-slate-900 transition-colors duration-300">
      <Navigation 
        activePage={activePage} 
        onNavigate={onNavigate} 
        onOpenAuth={() => setIsAuthModalOpen(true)} 
      />
      
      <main className="flex-grow px-4 py-8 sm:px-6 lg:px-8 pt-20">
        <ErrorBoundary>
          {children}
        </ErrorBoundary>
      </main>
      
      <Footer onNavigate={onNavigate} />
      
      {/* Global Modals & Overlays */}
      <PaywallModal 
        isOpen={isPaywallOpen} 
        onClose={closePaywall} 
        onNavigateToPlans={() => onNavigate('plans')}
        origin={paywallOrigin}
      />
      
      <AuthModal 
        isOpen={isAuthModalOpen} 
        onClose={() => setIsAuthModalOpen(false)} 
      />
      
      {showLevainOnboarding && (
        <LevainOnboardingModal 
            onComplete={() => setShowLevainOnboarding(false)} 
            onNavigate={onNavigate}
        />
      )}

      {/* Floating Assistant */}
      {showAssistant && (
          <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex justify-end">
              <div className="w-full max-w-lg bg-white h-full shadow-xl animate-slide-in-right">
                  <div className="p-4 border-b flex justify-between items-center">
                      <h3 className="font-bold">Doughy Assistant</h3>
                      <button onClick={() => setShowAssistant(false)} className="p-2 hover:bg-slate-100 rounded-full"><span className="sr-only">Close</span>&times;</button>
                  </div>
                  <AssistantPage 
                    t={t} 
                    config={assistantData.config} 
                    results={assistantData.results} 
                    lastBatch={assistantData.lastBatch}
                    selectedFlour={assistantData.selectedFlour}
                    defaultOven={assistantData.defaultOven}
                  />
              </div>
          </div>
      )}
      
      <FloatingActionButton onClick={() => setShowAssistant(true)} label="Open Assistant" />
    </div>
  );
};

export default MainLayout;
