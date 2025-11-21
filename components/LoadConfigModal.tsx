
import React, { useState, useMemo } from 'react';
import { SavedDoughConfig, DoughConfig } from '../types';
import { TrashIcon, CloseIcon, StarIcon, SolidStarIcon } from './IconComponents';
import { useTranslation } from '../i18n'; // Import useTranslation

interface LoadConfigModalProps {
  isOpen: boolean;
  onClose: () => void;
  configs: SavedDoughConfig[];
  onLoad: (config: DoughConfig) => void;
  onDelete: (id: string) => void;
  onToggleFavorite: (id: string) => void;
}

const LoadConfigModal: React.FC<LoadConfigModalProps> = ({
  isOpen,
  onClose,
  configs,
  onLoad,
  onDelete,
  onToggleFavorite,
}) => {
  const { t } = useTranslation(); // Initialize useTranslation
  const [view, setView] = useState<'all' | 'favorites'>('all');

  const filteredConfigs = useMemo(() => {
    const sorted = [...configs].sort((a, b) => {
      // Favorites first, then alphabetically
      if (a.isFavorite && !b.isFavorite) return -1;
      if (!a.isFavorite && b.isFavorite) return 1;
      return a.name.localeCompare(b.name);
    });
    if (view === 'favorites') {
      return sorted.filter((c) => c.isFavorite);
    }
    return sorted;
  }, [configs, view]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-30 flex items-center justify-center bg-black/60 backdrop-blur-sm"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="load-config-title"
    >
      <div
        className="relative mx-4 w-full max-w-md rounded-2xl bg-white p-6 shadow-xl"
        onClick={(e) => e.stopPropagation()} // Prevent closing modal when clicking inside
      >
        <div className="flex items-center justify-between border-b border-slate-200 pb-4">
          <h2
            id="load-config-title"
            className="text-xl font-bold text-slate-900"
          >
            {t('modals.load.title')}
          </h2>
          <button
            onClick={onClose}
            className="rounded-full p-1 text-slate-500 hover:bg-slate-200"
            aria-label={t('modals.close')}
          >
            <CloseIcon className="h-6 w-6" />
          </button>
        </div>

        <div className="mt-4 flex w-full items-center justify-center rounded-full bg-slate-100 p-1">
          <button
            onClick={() => setView('all')}
            className={`w-1/2 rounded-full py-1.5 text-sm font-semibold transition-all duration-300 ${
              view === 'all'
                ? 'bg-white text-lime-600 shadow-sm'
                : 'bg-transparent text-slate-600'
            }`}
          >
            {t('modals.load.all')}
          </button>
          <button
            onClick={() => setView('favorites')}
            className={`w-1/2 rounded-full py-1.5 text-sm font-semibold transition-all duration-300 ${
              view === 'favorites'
                ? 'bg-white text-lime-600 shadow-sm'
                : 'bg-transparent text-slate-600'
            }`}
          >
            {t('modals.load.favorites')}
          </button>
        </div>

        <div className="mt-4 max-h-80 min-h-[10rem] space-y-2 overflow-y-auto pr-2">
          {filteredConfigs.length > 0 ? (
            filteredConfigs.map((savedConfig) => (
              <div
                key={savedConfig.id}
                className="flex items-center justify-between rounded-lg bg-slate-50 p-3"
              >
                <span className="font-medium text-slate-800">
                  {savedConfig.name}
                </span>
                <div className="flex items-center space-x-1 sm:space-x-2">
                  <button
                    onClick={() => onToggleFavorite(savedConfig.id)}
                    className={`rounded-full p-2 transition-colors hover:bg-yellow-100 ${
                      savedConfig.isFavorite ? 'text-yellow-400' : 'text-slate-400'
                    }`}
                    aria-label={t('modals.presets.delete_title', { name: savedConfig.name })}
                  >
                    {savedConfig.isFavorite ? (
                      <SolidStarIcon className="h-5 w-5" />
                    ) : (
                      <StarIcon className="h-5 w-5" />
                    )}
                  </button>
                  <button
                    onClick={() => {
                      onLoad(savedConfig.doughConfig);
                      onClose();
                    }}
                    className="rounded-md bg-lime-500 py-1.5 px-3 text-sm font-semibold text-white shadow-sm hover:bg-lime-600"
                  >
                    {t('common.load')}
                  </button>
                  <button
                    onClick={() => onDelete(savedConfig.id)}
                    className="rounded-full p-2 text-red-500 hover:bg-red-100"
                    aria-label={t('modals.load.delete_aria', { name: savedConfig.name })}
                  >
                    <TrashIcon className="h-5 w-5" />
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="py-8 text-center text-slate-500">
              {view === 'favorites'
                ? t('modals.load.empty_favorites')
                : t('modals.load.empty')}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default LoadConfigModal;