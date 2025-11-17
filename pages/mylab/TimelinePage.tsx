

import React, { useMemo, ReactNode } from 'react';
import { Page, Batch, Levain } from '../../types';
import MyLabLayout from './MyLabLayout';
import { useUser } from '../../contexts/UserProvider';
import { useTranslation } from '../../i18n';
import { ClockIcon, BatchesIcon, BeakerIcon, PlusCircleIcon } from '../../components/IconComponents';

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
        description: `Receita de ${t(`form.${batch.doughConfig.recipeStyle.toLowerCase()}`, { defaultValue: batch.doughConfig.recipeStyle })}, ${batch.doughConfig.hydration}% hidratação.`,
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
        title: `Levain criado: ${levain.name}`,
        description: 'Um novo starter foi adicionado ao seu lab.',
        date: levain.createdAt,
        link: { page: 'mylab/levain/detail', params: levain.id },
        icon: <BeakerIcon className="h-5 w-5 text-white" />,
      });

      levain.feedingHistory.forEach(feeding => {
        events.push({
          id: `levain-fed-${feeding.id}`,
          type: 'LEVAIN_FED',
          title: `Levain alimentado: ${levain.name}`,
          description: `Alimentação com ${feeding.flourAmount}g de farinha e ${feeding.waterAmount}g de água.`,
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
        <span className={`absolute -left-3 flex h-6 w-6 items-center justify-center rounded-full ${bgColors[type]} ring-8 ring-white dark:ring-neutral-800`}>
            {icon}
        </span>
    );
  };

  return (
    <MyLabLayout activePage="mylab/timeline" onNavigate={onNavigate}>
      <div className="mb-6">
        <h1 className="text-2xl font-semibold tracking-tight text-neutral-900 dark:text-white">Linha do tempo</h1>
        <p className="mt-1 text-sm text-neutral-500">Acompanhe sua evolução na panificação.</p>
      </div>

      {timelineEvents.length === 0 ? (
        <div className="flex h-64 items-center justify-center rounded-xl border-2 border-dashed border-neutral-300 bg-neutral-50 dark:border-neutral-700 dark:bg-neutral-800 p-6 text-center">
          <p className="text-neutral-500 dark:text-neutral-400">
            Sua jornada está começando. As próximas fornadas vão aparecer aqui.
          </p>
        </div>
      ) : (
        <ol className="relative border-l border-neutral-200 dark:border-neutral-700">
            {timelineEvents.map(event => (
                 <li key={event.id} className="mb-10 ml-6">
                    <EventIcon type={event.type} icon={event.icon} />
                    <button onClick={() => onNavigate(event.link.page, event.link.params)} className="text-left w-full p-4 bg-neutral-50 border border-neutral-200 rounded-lg shadow-sm hover:bg-neutral-100 dark:bg-neutral-800 dark:border-neutral-700 dark:hover:bg-neutral-700/50">
                        <div className="flex items-center justify-between mb-2">
                             <h3 className="font-semibold text-neutral-900 dark:text-white">{event.title}</h3>
                             <time className="text-xs font-normal text-neutral-500 dark:text-neutral-400">{new Date(event.date).toLocaleDateString()}</time>
                        </div>
                        <p className="text-sm text-neutral-600 dark:text-neutral-300">{event.description}</p>
                    </button>
                </li>
            ))}
        </ol>
      )}
    </MyLabLayout>
  );
};

export default TimelinePage;