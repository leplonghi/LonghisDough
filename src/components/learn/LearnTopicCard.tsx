import React from 'react';

interface LearnTopicCardProps {
    icon: React.ReactNode;
    title: string;
    description: string;
    onClick: () => void;
    isPro?: boolean;
}

const LearnTopicCard: React.FC<LearnTopicCardProps> = ({ icon, title, description, onClick, isPro }) => (
    <button
        onClick={onClick}
        className="group h-full w-full text-left flex flex-col rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition-all hover:shadow-lg hover:-translate-y-1 relative overflow-hidden"
    >
        {isPro && (
            <div className="absolute top-0 right-0 bg-lime-500 text-white text-[10px] font-bold px-2 py-1 rounded-bl-lg shadow-sm z-10 uppercase tracking-wide">
                PRO
            </div>
        )}
        <div className="flex-shrink-0 text-lime-500">{icon}</div>
        <div className="mt-4 flex-grow">
            <h3 className="text-lg font-bold text-slate-800 group-hover:text-lime-600 transition-colors">
                {title}
            </h3>
            <p className="mt-2 text-sm text-slate-700 leading-relaxed">{description}</p>
        </div>
        <p className="mt-4 text-sm font-semibold text-slate-600 group-hover:text-lime-500 transition-colors">
            Explore &rarr;
        </p>
    </button>
);

export default LearnTopicCard;