import React, { useState } from 'react';
import { Batch } from '../../types';
import { useUser } from '../../contexts/UserProvider';
import { useTranslation } from '../../i18n';
import { HeartIcon, ChatBubbleLeftEllipsisIcon, DocumentDuplicateIcon, YeastIcon, PhotoIcon, BookmarkSquareIcon, CalculatorIcon } from '../IconComponents';

interface CommunityPostCardProps {
    batch: Batch;
    onClone: () => void;
    onNavigateToDetail: () => void;
}

const CommunityPostCard: React.FC<CommunityPostCardProps> = ({ batch, onClone, onNavigateToDetail }) => {
    const { user } = useUser();
    const { t } = useTranslation();
    const [imageError, setImageError] = useState(false);

    const { doughConfig } = batch;
    const yeastLabel = t(`form.yeast_${doughConfig.yeastType.toLowerCase()}`, { defaultValue: doughConfig.yeastType });

    return (
        <div className="flex flex-col rounded-xl border border-slate-200 bg-white shadow-md transition-all hover:shadow-lg">
            <button onClick={onNavigateToDetail} className="block aspect-video w-full rounded-t-xl bg-slate-100 flex items-center justify-center">
                {imageError || !batch.photoUrl ? (
                     <PhotoIcon className="h-12 w-12 text-slate-400" />
                ) : (
                    <img 
                        className="aspect-video w-full object-cover rounded-t-xl" 
                        src={batch.photoUrl} 
                        alt={batch.name}
                        onError={() => setImageError(true)}
                        loading="lazy"
                    />
                )}
            </button>
            <div className="flex-grow p-4">
                <div className="flex items-center gap-3">
                    <img className="h-8 w-8 rounded-full object-cover" src={user?.avatar} alt={user?.name} />
                    <div>
                        <p className="font-semibold text-slate-800 text-sm">{batch.name}</p>
                        <p className="text-xs text-slate-500">{t('community_page.by')} <a href="#" onClick={(e) => {e.preventDefault(); e.stopPropagation();}} className="hover:underline">{user?.name}</a></p>
                    </div>
                </div>
                 <p className="mt-3 text-sm text-slate-600 line-clamp-2">{batch.notes || "Sem anotações."}</p>
                <div className="mt-4 flex flex-wrap gap-x-4 gap-y-2 border-t border-slate-200 pt-3 text-xs text-slate-500">
                    <div className="flex items-center gap-1" title="Hidratação">
                        💧 <span className="font-semibold">{doughConfig.hydration}%</span>
                    </div>
                    <div className="flex items-center gap-1" title="Sal">
                       🧂 <span className="font-semibold">{doughConfig.salt}%</span>
                    </div>
                    <div className="flex items-center gap-1" title="Fermento">
                        <YeastIcon className="h-4 w-4" /> <span className="font-semibold">{yeastLabel}</span>
                    </div>
                    <div className="flex items-center gap-1" title="Técnica">
                        <span className="font-semibold">{doughConfig.fermentationTechnique}</span>
                    </div>
                </div>
            </div>
            <div className="flex items-center justify-between gap-1 rounded-b-xl border-t border-slate-200 bg-slate-50 p-2">
                 <div className="flex items-center">
                    <button aria-label="Like" className="flex items-center gap-1 rounded-md py-1.5 px-3 text-sm font-medium text-slate-600 hover:bg-slate-200">
                        <HeartIcon className="h-4 w-4" />
                        <span>{/* Placeholder */}</span>
                    </button>
                    <button aria-label="Comment" className="flex items-center gap-1 rounded-md py-1.5 px-3 text-sm font-medium text-slate-600 hover:bg-slate-200">
                        <ChatBubbleLeftEllipsisIcon className="h-4 w-4" />
                        <span>{/* Placeholder */}</span>
                    </button>
                 </div>
                 <div className="flex items-center">
                    <button onClick={(e) => { e.stopPropagation(); onClone(); }} title="Clonar Parâmetros" aria-label="Clonar Parâmetros na Calculadora" className="flex items-center gap-1.5 rounded-md py-1.5 px-3 text-sm font-semibold text-lime-600 hover:bg-lime-100">
                        <CalculatorIcon className="h-5 w-5" />
                        Clonar
                    </button>
                 </div>
            </div>
        </div>
    );
};

export default React.memo(CommunityPostCard);