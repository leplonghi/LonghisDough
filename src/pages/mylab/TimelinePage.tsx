import React, { useMemo, ReactNode } from 'react';
import { Page, Batch, Levain } from '../../types';
import MyLabLayout from './MyLabLayout';
import { useUser } from '../../contexts/UserProvider';
import { useTranslation } from '../../i18n';
import { ClockIcon, BatchesIcon, BeakerIcon, PlusCircleIcon } from '../../components/IconComponents';
import ProFeatureLock from '../../components/ui/ProFeatureLock';

interface TimelineEvent {
  id: string;
  type: 'BATCH' | 'LEVAIN_CREATED' | 'LEVAIN_FED';
  title: string;
  description: string;
  date: string;
  link: {
    page: Page;
    params?: string;
  };
  icon: ReactNode;
}

const TimelinePage: React.FC<{ onNavigate: (page: Page, params?: string) => void }> = ({ onNavigate }) => {
  const { batches, levains } = useUser();
  const { t } = useTranslation();

  const timelineEvents = useMemo(() => {
    const events: TimelineEvent[] = [];

    // Map batches to events
    batches.forEach(batch => {
      events.push({
        id: `batch-${batch.id}`,
        type: 'BATCH',
        title: batch.name,
        description: `${t(`form.${batch.doughConfig.recipeStyle.toLowerCase()}`, { defaultValue: batch.doughConfig.recipeStyle })} Recipe, ${batch.doughConfig.hydration}% hydration.`,
        date: batch.createdAt,
        link: { page: 'batch', params: batch.id },
        icon: <BatchesIcon className="h-5 w-5 text-white" />,
      });
    });

    // Map levains (creation and feedings)
    levains.forEach(levain => {
      events.push({
        id: `levain-created-${levain.id}`,
        type: 'LEVAIN_CREATED',
        title: `Levain created: ${levain.name}`,
        description: 'A new starter was added to your lab.',
        date: levain.createdAt,
        link: { page: 'mylab/levain/detail', params: levain.id },
        icon: <BeakerIcon className="h-5 w-5 text-white" />,
      });

      levain.feedingHistory.forEach(feeding => {
        events.push({
          id: `levain-fed-${feeding.id}`,
          type: 'LEVAIN_FED',
          title: `Levain fed: ${levain.name}`,
          description: `Fed with ${feeding.flourAmount}g flour and ${feeding.waterAmount}g water.`,
          date: feeding.date,
          link: { page: 'mylab/levain/detail', params: levain.id },
          icon: <PlusCircleIcon className="h-5 w-5 text-white" />,
        });
      });
    });
    
    // Sort all events by date, most recent first
    return events.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  }, [batches, levains, t]);

  const EventIcon: React.FC<{ type: TimelineEvent['type'], icon: ReactNode }> = ({ type, icon }) => {
    const bgColors = {
        'BATCH': 'bg-blue-500',
        'LEVAIN_CREATED': 'bg-lime-500',
        'LEVAIN_FED': 'bg-amber-500',
    };
    return (
        <span className={`absolute -left-3 flex h-6 w-6 items-center justify-center rounded-full ${bgColors[type]} ring-8 ring-white`}>
            {icon}
        </span>
    );
  };

  return (
    <MyLabLayout activePage="mylab/timeline" onNavigate={onNavigate}>
      <div className="mb-6">
        <h1 className="text-2xl font-semibold tracking-tight text-neutral-900">Timeline</h1>
        <p className="mt-1 text-sm text-neutral-600">Track your baking evolution.</p>
      </div>

      <ProFeatureLock 
        origin='mylab' 
        featureName="Full Activity Timeline" 
        description="Pro users track everything — hydration, fermentation, bake outcomes. See your entire baking journey in one place."
        className="min-h-[18.75rem] flex items-center justify-center"
      >
          {timelineEvents.length === 0 ? (
            <div className="flex h-64 items-center justify-center rounded-xl border-2 border-dashed border-neutral-300 bg-neutral-50 p-6 text-center filter blur-sm pointer-events-none select-none opacity-60">
              <p className="text-neutral-600">
                Your journey is just beginning. Your next bakes will appear here.
              </p>
            </div>
          ) : (
            <ol className="relative border-l border-neutral-200 filter blur-sm pointer-events-none select-none opacity-60">
                {timelineEvents.slice(0, 5).map(event => (
                     <li key={event.id} className="mb-10 ml-6">
                        <EventIcon type={event.type} icon={event.icon} />
                        <div className="text-left w-full p-4 bg-neutral-50 border border-neutral-200 rounded-lg shadow-sm">
                            <div className="flex items-center justify-between mb-2">
                                 <h3 className="font-semibold text-neutral-900">{event.title}</h3>
                                 <time className="text-xs font-normal text-neutral-600">{new Date(event.date).toLocaleDateString()}</time>
                            </div>
                            <p className="text-sm text-neutral-700">{event.description}</p>
                        </div>
                    </li>
                ))}
            </ol>
          )}
      </ProFeatureLock>
    </MyLabLayout>
  );
};

export default TimelinePage;