import React from 'react';
import { Batch, DoughConfig, Page } from '../../types';
import CommunityPostCard from './CommunityPostCard';
import CommunityPostCardSkeleton from './CommunityPostCardSkeleton';
import { useTranslation } from '../../i18n';

interface CommunityFeedProps {
    batches: Batch[];
    onLoadInspiration: (config: Partial<DoughConfig>) => void;
    onNavigate: (page: Page, params?: string) => void;
}

const CommunityFeed: React.FC<CommunityFeedProps> = ({ batches, onLoadInspiration, onNavigate }) => {
    const { t } = useTranslation();
    const [isLoading, setIsLoading] = React.useState(true);

    // Simulate loading, in a real app this would be handled by the parent's data fetching state
    React.useEffect(() => {
        const timer = setTimeout(() => setIsLoading(false), 500);
        return () => clearTimeout(timer);
    }, []);

    if (isLoading) {
        return (
            <div className="space-y-6">
                {Array.from({ length: 4 }).map((_, index) => (
                    <CommunityPostCardSkeleton key={index} />
                ))}
            </div>
        );
    }

    if (batches.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center h-64 rounded-lg bg-slate-50 border-2 border-dashed border-slate-300">
                <h3 className="text-lg font-semibold text-slate-700">{t('community_page.empty_title')}</h3>
                <p className="mt-2 text-sm text-slate-500">{t('community_page.empty_subtitle')}</p>
            </div>
        );
    }
    
    return (
        <main>
            <div className="space-y-6">
                {batches.map(batch => (
                    <CommunityPostCard 
                        key={batch.id} 
                        batch={batch}
                        onClone={() => onLoadInspiration(batch.doughConfig)}
                        onNavigateToDetail={() => onNavigate('community', batch.id)}
                    />
                ))}
            </div>
        </main>
    );
};

export default CommunityFeed;
