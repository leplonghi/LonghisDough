
import React, { useState, useEffect } from 'react';
import { useTranslation } from '../i18n';
import { Tutorial, Page } from '../types';
import { 
    CloseIcon, 
    ArrowTopRightOnSquareIcon,
    QuestionMarkCircleIcon,
    ListBulletIcon,
    LightBulbIcon,
    CalculatorIcon,
} from './IconComponents';
import ProFeatureLock from './ProFeatureLock';
import { useUser } from '../contexts/UserProvider';

interface TutorialDetailPanelProps {
  tutorial: Tutorial | null;
  onClose: () => void;
  onNavigate: (page: Page) => void;
  onCalculatorModeChange: (mode: 'basic' | 'advanced') => void;
}

const DetailSection: React.FC<{ icon: React.ReactNode; title: string; children: React.ReactNode }> = ({ icon, title, children }) => (
    <div className="rounded-lg bg-slate-50 dark:bg-slate-700/50 p-4">
        <div className="flex items-center gap-3">
            <div className="flex-shrink-0 text-lime-500">
                {icon}
            </div>
            <h3 className="text-base font-semibold text-slate-800 dark:text-slate-100">{title}</h3>
        </div>
        <div className="mt-2 pl-9 prose prose-sm max-w-none text-slate-600 dark:prose-invert dark:text-slate-300"
            dangerouslySetInnerHTML={{ __html: children as string }}
        >
        </div>
    </div>
);


const TutorialDetailPanel: React.FC<TutorialDetailPanelProps> = ({ tutorial, onClose, onNavigate, onCalculatorModeChange }) => {
  const { t } = useTranslation();
  const { hasProAccess } = useUser();
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    if (tutorial) {
      // Prevent body scroll when panel is open
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [tutorial]);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      onClose();
      setIsClosing(false);
    }, 400); // Animation duration
  };
  
  const handleTestInCalculator = () => {
    if (tutorial?.calculatorAction) {
        onCalculatorModeChange(tutorial.calculatorAction.mode);
        onNavigate('calculator');
        handleClose();
    }
  };

  if (!tutorial) return null;
  
  const isLocked = tutorial.accessLevel === 'pro' && !hasProAccess;

  return (
    <div
      className="fixed inset-0 z-50"
      role="dialog"
      aria-modal="true"
      aria-labelledby="tutorial-title"
    >
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm"
        onClick={handleClose}
      />
      <div
        className={`fixed top-0 right-0 h-full w-full md:w-1/2 lg:w-2/5 flex flex-col bg-white shadow-xl dark:border-l dark:border-slate-700 dark:bg-slate-800 ${isClosing ? 'animate-slide-out-right' : 'animate-slide-in-right'}`}
      >
        <div className="flex-shrink-0 p-4 sm:p-6 border-b border-slate-200 dark:border-slate-700 flex items-start justify-between">
          <h2
            id="tutorial-title"
            className="text-2xl font-bold text-slate-900 dark:text-white"
          >
            {tutorial.title}
          </h2>
          <button
            onClick={handleClose}
            className="-mt-2 -mr-2 rounded-full p-2 text-slate-500 hover:bg-slate-200 dark:text-slate-400 dark:hover:bg-slate-700"
            aria-label="Close tutorial"
          >
            <CloseIcon className="h-6 w-6" />
          </button>
        </div>

        <div className="flex-grow overflow-y-auto relative">
            <img src={tutorial.image} alt={tutorial.title} className="w-full h-56 object-cover"/>
            <div className="p-6 sm:p-8 space-y-6">
                 <p className="text-lg text-slate-700 dark:text-slate-200 leading-relaxed">{tutorial.intro}</p>

                <div className="space-y-4 relative">
                    <DetailSection icon={<QuestionMarkCircleIcon className="h-6 w-6"/>} title={t('learn.why_title')}>
                        {tutorial.why}
                    </DetailSection>
                    
                    {isLocked ? (
                         <ProFeatureLock origin='learn' title="Continue reading with Pro" description="Deep technical breakdowns, references and advanced methods are available in the Pro plan." className="mt-6">
                            <div className="filter blur-[4px] pointer-events-none select-none opacity-50">
                                <DetailSection icon={<ListBulletIcon className="h-6 w-6"/>} title={t('learn.howto_title')}>
                                     {tutorial.howTo}
                                </DetailSection>
                                <DetailSection icon={<LightBulbIcon className="h-6 w-6"/>} title={t('learn.tips_title')}>
                                    {`<ul>${tutorial.tips.map(tip => `<li>${tip}</li>`).join('')}</ul>`}
                                </DetailSection>
                            </div>
                         </ProFeatureLock>
                    ) : (
                        <>
                            <DetailSection icon={<ListBulletIcon className="h-6 w-6"/>} title={t('learn.howto_title')}>
                                {tutorial.howTo}
                            </DetailSection>
                            <DetailSection icon={<LightBulbIcon className="h-6 w-6"/>} title={t('learn.tips_title')}>
                                {`<ul>${tutorial.tips.map(tip => `<li>${tip}</li>`).join('')}</ul>`}
                            </DetailSection>
                        </>
                    )}

                </div>
                 {tutorial.calculatorAction && !isLocked && (
                    <div className="pt-6">
                        <button
                            onClick={handleTestInCalculator}
                            className="w-full flex items-center justify-center gap-2 rounded-lg bg-lime-500 py-3 px-4 text-base font-semibold text-white shadow-md transition-all hover:bg-lime-600 focus:outline-none focus:ring-2 focus:ring-lime-500 focus:ring-offset-2 dark:focus:ring-offset-slate-800"
                        >
                            <CalculatorIcon className="h-5 w-5" />
                            <span>Try in Calculator</span>
                        </button>
                    </div>
                )}
            </div>
        </div>
        
        {!isLocked && (
        <div className="flex-shrink-0 p-4 sm:p-6 border-t border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50">
            <div className="flex items-center justify-between">
                <span className="text-sm font-semibold text-slate-600 dark:text-slate-300">{t('learn.reference_title')}:</span>
                 <a
                  href={tutorial.reference.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-sm font-medium text-lime-600 hover:underline dark:text-lime-400"
                  aria-label={`Visit ${tutorial.reference.name}`}
                >
                  <span>{tutorial.reference.name}</span>
                  <ArrowTopRightOnSquareIcon className="h-4 w-4" />
                </a>
            </div>
        </div>
        )}

      </div>
    </div>
  );
};

export default TutorialDetailPanel;
