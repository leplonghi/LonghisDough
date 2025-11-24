import React, { useState, useEffect, useMemo } from 'react';
import { DoughConfig, Page, Batch, CommunityBatch, BatchStatus } from '@/types';
import CommunityFeed from '@/components/community/CommunityFeed';
import CommunityProfileSidebar from '@/components/community/CommunityProfileSidebar';
import { useTranslation } from '@/i18n';
import CommunityCreatePost from '@/components/community/CommunityCreatePost';
import { FeedIcon } from '@/components/ui/Icons';
import { getAllCommunityBatches } from '@/data/communityStore';

interface CommunityPageProps {
  onLoadInspiration: (config: Partial<DoughConfig>) => void;
  onNavigate: (page: Page, params?: string) => void;
}

const CommunityPage: React.FC<CommunityPageProps> = ({ onLoadInspiration, onNavigate }) => {
    const { t } = useTranslation();
    const [communityBatches, setCommunityBatches] = useState<CommunityBatch[]>([]);

    useEffect(() => {
        const batches = getAllCommunityBatches();
        setCommunityBatches(batches.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()));
    }, []);

    // Adapt CommunityBatch[] to Batch[] to fit the existing CommunityFeed and CommunityPostCard components
    const adaptedBatches = useMemo((): Batch[] => {
        return communityBatches.map(cb => ({
            id: cb.id,
            name: cb.title,
            doughConfig: cb.baseConfig,
            createdAt: cb.createdAt,
            updatedAt: cb.createdAt,
            status: BatchStatus.COMPLETED, // Assume community batches are completed
            isFavorite: false,
            isPublic: true,
            notes: cb.description,
            photoUrl: cb.photoUrl || cb.thumbnailUrl,
            rating: cb.ratingAverage,
            // Add other missing fields from Batch with default values
            ovenType: cb.ovenType,
        }));
    }, [communityBatches]);

    return (
        <div className="mx-auto max-w-7xl animate-[fadeIn_0.5s_ease-in_out]">
            <div className="text-center mb-12">
                <FeedIcon className="mx-auto h-12 w-12 text-lime-500" />
                <h1 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
                    {t('community_page.title')}
                </h1>
                <p className="mt-4 max-w-3xl mx-auto text-lg text-slate-600 dark:text-slate-300">
                    {t('community_page.subtitle')}
                </p>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                {/* Create Post (Right on desktop, top on mobile) */}
                <div className="col-span-1 lg:col-span-3 lg:order-3">
                    <CommunityCreatePost />
                </div>

                {/* Main Feed (Center) */}
                <div className="col-span-1 lg:col-span-6 lg:order-2">
                    <CommunityFeed
                        batches={adaptedBatches}
                        onLoadInspiration={onLoadInspiration}
                        onNavigate={onNavigate}
                    />
                </div>

                {/* Profile Sidebar (Left) - visible on large screens */}
                <div className="lg:col-span-3 lg:order-1">
                    <CommunityProfileSidebar />
                </div>
            </div>
        </div>
    );
};

export default CommunityPage;