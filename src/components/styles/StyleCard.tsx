
import React from 'react';
import { DoughStyle } from '../../types';
import { StarIcon, SolidStarIcon, LockClosedIcon, ClockIcon } from '../IconComponents';
import { ProBadge } from '../ProBadge';
import { CategoryBadge, SourceBadge } from './StyleBadge';

interface StyleCardProps {
  style: DoughStyle;
  isFavorite?: boolean;
  onToggleFavorite?: (styleId: string) => void;
  onClick?: () => void;
  lockReason?: 'pro_only' | 'coming_next' | null;
}

const StyleCard: React.FC<StyleCardProps> = ({ style, isFavorite, onToggleFavorite, onClick, lockReason }) => {
  const handleFavoriteClick = (e: React.MouseEvent) => {
      e.stopPropagation();
      if (onToggleFavorite) onToggleFavorite(style.id);
  };

  const isBlurred = lockReason === 'coming_next';

  return (
    <div 
        onClick={onClick}
        className={`group relative flex flex-col rounded-xl border bg-white shadow-sm transition-all duration-200 h-full
        ${isBlurred ? 'opacity-70 cursor-not-allowed border-slate-200' : 'hover:shadow-md hover:-translate-y-1 cursor-pointer border-slate-200'}
        `}
    >
        <div className={`p-5 flex-grow flex flex-col ${isBlurred ? 'blur-[2px]' : ''}`}>
            <div className="flex justify-between items-start mb-2">
                <div className="flex flex-col gap-1">
                    <h3 className="font-bold text-lg text-slate-900 group-hover:text-lime-600 transition-colors line-clamp-1">
                        {style.name}
                    </h3>
                    <span className="text-xs text-slate-500">{style.country}</span>
                </div>
                <div className="flex items-center gap-1">
                    {(style.isPro || style.accessTier === 'pro') && <ProBadge />}
                    {onToggleFavorite && (
                         <button onClick={handleFavoriteClick} className="p-1 rounded-full hover:bg-slate-100 text-slate-400 hover:text-yellow-400 transition-colors">
                            {isFavorite ? <SolidStarIcon className="h-5 w-5 text-yellow-400" /> : <StarIcon className="h-5 w-5" />}
                        </button>
                    )}
                </div>
            </div>
            
            <div className="mb-3 flex flex-wrap gap-2">
                <CategoryBadge category={style.category} />
                <SourceBadge source={style.sourceType} />
                {style.complexity && <span className="text-xs text-slate-500 bg-slate-50 px-2 py-0.5 rounded border border-slate-100">{style.complexity}</span>}
            </div>

            <p className="text-sm text-slate-600 mb-4 line-clamp-2">
                {style.description}
            </p>
            
            {/* Technical Mini-Matrix */}
            <div className="mt-auto pt-3 border-t border-slate-100 grid grid-cols-2 gap-2 text-xs text-slate-500">
                 <div className="flex flex-col">
                     <span className="uppercase text-[10px] font-bold text-slate-400">Hydration</span>
                     <span className="font-mono text-slate-700">{style.technical.hydration[0]}-{style.technical.hydration[1]}%</span>
                 </div>
                 <div className="flex flex-col">
                     <span className="uppercase text-[10px] font-bold text-slate-400">Fermentation</span>
                     <span className="font-mono text-slate-700 truncate" title={style.technical.fermentation.description}>{style.technical.fermentation.description}</span>
                 </div>
            </div>
        </div>

        {/* Lock Overlay */}
        {lockReason && (
            <div className="absolute inset-0 flex flex-col items-center justify-center z-10 bg-white/40 rounded-xl">
                {lockReason === 'coming_next' ? (
                    <div className="bg-slate-900 text-white px-3 py-1.5 rounded-full text-xs font-bold shadow-lg flex items-center gap-2">
                        <ClockIcon className="h-4 w-4" />
                        Coming Next Month
                    </div>
                ) : (
                     <div className="bg-white border border-lime-200 text-lime-700 px-3 py-1.5 rounded-full text-xs font-bold shadow-lg flex items-center gap-2">
                        <LockClosedIcon className="h-4 w-4" />
                        Pro Style
                    </div>
                )}
            </div>
        )}
    </div>
  );
};

export default StyleCard;
