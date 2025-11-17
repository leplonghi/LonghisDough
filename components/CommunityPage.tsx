import React from 'react';
import { DoughConfig, Page } from '../types';
import CommunityFeed from './community/CommunityFeed';
import CommunityCreatePost from './community/CommunityCreatePost';
import CommunityProfileSidebar from './community/CommunityProfileSidebar';


interface CommunityPageProps {
  onLoadInspiration: (config: Partial<DoughConfig>) => void;
  onNavigate: (page: Page) => void;
}

const CommunityPage: React.FC<CommunityPageProps> = ({ onNavigate }) => {
    return (
        <div className="mx-auto max-w-7xl">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                {/* Create Post (Right on desktop, top on mobile) */}
                <div className="col-span-1 lg:col-span-3 lg:order-3">
                    <CommunityCreatePost />
                </div>

                {/* Main Feed (Center) */}
                <div className="col-span-1 lg:col-span-6 lg:order-2">
                    <CommunityFeed />
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