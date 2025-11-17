import React from 'react';
import { useUser } from '../../contexts/UserProvider';
import { getLastSavedConfig } from '../../logic/mylabSelectors';
import { DoughConfig, Page, RecipeStyle } from '../../types';
import { 
    DocumentDuplicateIcon, 
    BatchesIcon,
    FireIcon,
    PizzaSliceIcon,
    BookmarkSquareIcon,
    RecipeIcon
} from '../IconComponents';

interface MyLabLastBatchCardProps {
  onLoadAndNavigate: (config: DoughConfig) => void;
  onNavigate: (page: Page, params?: string) => void;
}

const MyLabLastBatchCard: React.FC<MyLabLastBatchCardProps> = ({ onLoadAndNavigate, onNavigate }) => {
  const { batches } = useUser();
  const lastBatch = getLastSavedConfig(batches);

  const getStyleIcon = (style: RecipeStyle) => {
    const iconProps = { className: "h-5 w-5 text-slate-400 dark:text-slate-500", "aria-hidden": true };
    switch (style) {
      case RecipeStyle.NEAPOLITAN:
        return <FireIcon {...iconProps} />;
      case RecipeStyle.NEW_YORK:
      case RecipeStyle.THIN_CRUST:
        return <PizzaSliceIcon {...iconProps} />;
      case RecipeStyle.DETROIT:
      case RecipeStyle.ROMAN:
      case RecipeStyle.PAN_PIZZA:
      case RecipeStyle.SICILIAN:
      case RecipeStyle.CHICAGO:
      case RecipeStyle.FOCACCIA:
        return <BookmarkSquareIcon {...iconProps} />;
      default: // All bread styles and others
        return <RecipeIcon {...iconProps} />;
    }
  };

  const handleRedo = () => {
    if (lastBatch) {
      onLoadAndNavigate(lastBatch.doughConfig);
    }
  };

  const handleDetails = () => {
    if (lastBatch) {
      onNavigate('batch', lastBatch.id);
    }
  };
  
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString(undefined, {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    });
  };

  return (
    <div className="rounded-lg bg-white p-6 shadow-sm ring-1 ring-slate-200/50 dark:border dark:border-slate-700/50 dark:bg-slate-800">
      <h2 className="text-lg font-bold text-slate-800 dark:text-slate-100 mb-4">
        Última Fornada
      </h2>
      {lastBatch ? (
        <div>
          <div className="mb-4 border-b border-slate-200 pb-4 dark:border-slate-700">
            <div className="flex items-center gap-2">
                <h3 className="text-xl font-semibold text-lime-600 dark:text-lime-400">{lastBatch.name}</h3>
                <span title={lastBatch.doughConfig.recipeStyle}>
                    {getStyleIcon(lastBatch.doughConfig.recipeStyle)}
                </span>
            </div>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
              {lastBatch.doughConfig.recipeStyle} &bull; {formatDate(lastBatch.createdAt)}
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4 text-sm mb-6">
            <div>
              <div className="font-bold text-slate-800 dark:text-slate-100">{lastBatch.doughConfig.hydration}%</div>
              <div className="text-xs text-slate-500 dark:text-slate-400">Hidratação</div>
            </div>
             <div>
              <div className="font-bold text-slate-800 dark:text-slate-100">{lastBatch.doughConfig.numPizzas} x {lastBatch.doughConfig.doughBallWeight}g</div>
              <div className="text-xs text-slate-500 dark:text-slate-400">Unidades</div>
            </div>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <button 
                onClick={handleRedo}
                className="flex w-full items-center justify-center gap-2 rounded-md bg-slate-200 py-2 px-4 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-300 dark:bg-slate-700 dark:text-slate-200 dark:hover:bg-slate-600"
            >
                <DocumentDuplicateIcon className="h-5 w-5" />
                Refazer no DoughLabPro
            </button>
            <button 
                onClick={handleDetails}
                className="flex w-full items-center justify-center gap-2 rounded-md bg-lime-500 py-2 px-4 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-lime-600"
            >
                <BatchesIcon className="h-5 w-5" />
                Detalhes
            </button>
          </div>
        </div>
      ) : (
        <div className="flex h-40 items-center justify-center rounded-md border-2 border-dashed border-slate-300 dark:border-slate-600">
          <p className="text-center text-slate-500 dark:text-slate-400">
            Você ainda não salvou nenhuma fornada.
          </p>
        </div>
      )}
    </div>
  );
};

export default MyLabLastBatchCard;