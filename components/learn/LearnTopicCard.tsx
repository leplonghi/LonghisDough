import React from 'react';

interface LearnTopicCardProps {
    icon: React.ReactNode;
    title: string;
    description: string;
    onClick: () => void;
}

const LearnTopicCard: React.FC<LearnTopicCardProps> = ({ icon, title, description, onClick }) => (
    <button
        onClick={onClick}
        className="group h-full w-full text-left flex flex-col rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition-all hover:shadow-lg hover:-translate-y-1 dark:border-slate-700 dark:bg-slate-800"
    >
        <div className="flex-shrink-0 text-lime-500">{icon}</div>
        <div className="mt-4 flex-grow">
            <h3 className="text-lg font-bold text-slate-800 dark:text-white group-hover:text-lime-600 dark:group-hover:text-lime-400 transition-colors">
                {title}
            </h3>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">{description}</p>
        </div>
        <p className="mt-4 text-sm font-semibold text-slate-500 dark:text-slate-400 group-hover:text-lime-500 transition-colors">
            Explorar &rarr;
        </p>
    </button>
);

export default LearnTopicCard;