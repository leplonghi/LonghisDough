
import React from 'react';
import { SavedDoughConfig, DoughConfig } from '../types';
import { useTranslation } from '../i18n';
import { TrashIcon, CloseIcon } from './IconComponents';

interface LoadConfigModalProps {
  isOpen: boolean;
  onClose: () => void;
  configs: SavedDoughConfig[];
  onLoad: (config: DoughConfig) => void;
  onDelete: (name: string) => void;
}

const LoadConfigModal: React.FC<LoadConfigModalProps> = ({
  isOpen,
  onClose,
  configs,
  onLoad,
  onDelete,
}) => {
  const { t } = useTranslation();

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
        className="relative mx-4 w-full max-w-md rounded-2xl bg-white p-6 shadow-xl dark:border dark:border-slate-700 dark:bg-slate-800"
        onClick={(e) => e.stopPropagation()} // Prevent closing modal when clicking inside
      >
        <div className="flex items-center justify-between border-b border-slate-200 pb-4 dark:border-slate-700">
          <h2
            id="load-config-title"
            className="text-xl font-bold text-slate-900 dark:text-white"
          >
            {t('load_modal.title')}
          </h2>
          <button
            onClick={onClose}
            className="rounded-full p-1 text-slate-500 hover:bg-slate-200 dark:text-slate-400 dark:hover:bg-slate-700"
            aria-label={t('load_modal.close_aria')}
          >
            <CloseIcon className="h-6 w-6" />
          </button>
        </div>

        <div className="mt-4 max-h-80 space-y-2 overflow-y-auto pr-2">
          {configs.length > 0 ? (
            configs.map(({ name, config }) => (
              <div
                key={name}
                className="flex items-center justify-between rounded-lg bg-slate-50 p-3 dark:bg-slate-700/50"
              >
                <span className="font-medium text-slate-800 dark:text-slate-200">
                  {name}
                </span>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => onLoad(config)}
                    className="rounded-md bg-lime-500 py-1.5 px-3 text-sm font-semibold text-white shadow-sm hover:bg-lime-600"
                  >
                    {t('load_modal.load')}
                  </button>
                  <button
                    onClick={() => onDelete(name)}
                    className="rounded-full p-2 text-red-500 hover:bg-red-100 dark:hover:bg-red-500/10"
                    aria-label={`${t('load_modal.delete_aria')} ${name}`}
                  >
                    <TrashIcon className="h-5 w-5" />
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="py-8 text-center text-slate-500 dark:text-slate-400">
              {t('load_modal.no_configs')}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default LoadConfigModal;
