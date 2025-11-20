
import React from 'react';
import { FireIcon, BeakerIcon, BookOpenIcon, CubeIcon, GlobeAltIcon, UserCircleIcon } from '../IconComponents';
import { DoughCategory, StyleSourceType } from '../../types';

export const CategoryBadge: React.FC<{ category: DoughCategory }> = ({ category }) => {
    let colorClass = 'bg-slate-100 text-slate-700';
    let icon = <CubeIcon className="h-3 w-3 mr-1" />;

    if (category === 'Pizza') {
        colorClass = 'bg-orange-100 text-orange-800 border-orange-200';
        icon = <FireIcon className="h-3 w-3 mr-1" />;
    } else if (category === 'Pão') {
        colorClass = 'bg-amber-100 text-amber-800 border-amber-200';
        icon = <BeakerIcon className="h-3 w-3 mr-1" />;
    } else if (category === 'Doce') {
        colorClass = 'bg-pink-100 text-pink-800 border-pink-200';
        icon = <BookOpenIcon className="h-3 w-3 mr-1" />;
    }

    return (
        <span className={`inline-flex items-center rounded-full border px-2 py-0.5 text-xs font-semibold ${colorClass}`}>
            {icon}
            {category}
        </span>
    );
};

export const SourceBadge: React.FC<{ source: StyleSourceType }> = ({ source }) => {
    if (source === 'official') {
        return (
            <span className="inline-flex items-center rounded-full bg-blue-100 px-2 py-0.5 text-[10px] font-bold text-blue-700 uppercase tracking-wide border border-blue-200">
                Official
            </span>
        );
    }
    if (source === 'community') {
        return (
             <span className="inline-flex items-center rounded-full bg-purple-100 px-2 py-0.5 text-[10px] font-bold text-purple-700 uppercase tracking-wide border border-purple-200">
                <GlobeAltIcon className="h-3 w-3 mr-1" />
                Community
            </span>
        );
    }
    return (
         <span className="inline-flex items-center rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-bold text-slate-700 uppercase tracking-wide border border-slate-200">
            <UserCircleIcon className="h-3 w-3 mr-1" />
            Custom
        </span>
    );
};
