import React from 'react';

const CommunityPostCardSkeleton: React.FC = () => {
    return (
        <div className="flex flex-col rounded-xl border border-slate-200 bg-white shadow-md dark:border-slate-700 dark:bg-slate-800 animate-pulse">
            <div className="aspect-video w-full rounded-t-xl bg-slate-200 dark:bg-slate-700"></div>
            <div className="flex-grow p-4">
                <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-full bg-slate-200 dark:bg-slate-700"></div>
                    <div className="flex-1 space-y-2">
                        <div className="h-3 w-3/4 rounded bg-slate-200 dark:bg-slate-700"></div>
                        <div className="h-2 w-1/2 rounded bg-slate-200 dark:bg-slate-700"></div>
                    </div>
                </div>

                <div className="mt-4 border-t border-slate-200 dark:border-slate-700 pt-3 flex justify-between">
                    <div className="h-4 w-1/4 rounded bg-slate-200 dark:bg-slate-700"></div>
                    <div className="h-4 w-1/4 rounded bg-slate-200 dark:bg-slate-700"></div>
                    <div className="h-4 w-1/4 rounded bg-slate-200 dark:bg-slate-700"></div>
                </div>
            </div>
            <div className="flex items-center justify-end gap-2 rounded-b-xl border-t border-slate-200 bg-slate-50 p-2 dark:border-slate-700 dark:bg-slate-800/50">
                 <div className="h-7 w-12 rounded-md bg-slate-200 dark:bg-slate-700"></div>
                 <div className="h-7 w-12 rounded-md bg-slate-200 dark:bg-slate-700"></div>
                 <div className="h-7 w-8 rounded-md bg-slate-200 dark:bg-slate-700"></div>
            </div>
        </div>
    );
};

export default CommunityPostCardSkeleton;