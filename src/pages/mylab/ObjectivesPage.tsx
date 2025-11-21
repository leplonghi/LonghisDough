import React, { useState, useMemo } from 'react';
import { Page, Goal, GoalTargetType } from '../../types';
import MyLabLayout from './MyLabLayout';
import { useUser } from '../../contexts/UserProvider';
import { useTranslation } from '../../i18n';
import { SparklesIcon, PlusCircleIcon, CheckCircleIcon, TrashIcon, PencilIcon } from '../../components/IconComponents';
import GoalModal from '../../components/mylab/GoalModal';

interface SuggestedGoal {
    title: string;
    description: string;
    targetType: GoalTargetType;
    targetValue: string | number;
}

// Basic hook/function for AI suggestions
function suggestGoalsFromHistory(userHistory: any[]): SuggestedGoal[] {
    const suggestions: SuggestedGoal[] = [];

    if (userHistory.length > 2) {
        suggestions.push({
            title: "Increase hydration to 75%",
            description: "You've done several bakes. How about a high hydration challenge for a more open crumb?",
            targetType: 'hydration',
            targetValue: 75
        });
    }

    suggestions.push({
        title: "Master a new style: Focaccia",
        description: "Explore the complexities of high-hydration Focaccia.",
        targetType: 'style',
        targetValue: 'FOCACCIA'
    });

    suggestions.push({
        title: "Bake 4 times next month",
        description: "Maintain consistency in your practice to accelerate learning.",
        targetType: 'frequency',
        targetValue: '4_per_month'
    });

    return suggestions.slice(0, 3);
}


const ObjectivesPage: React.FC<{ onNavigate: (page: Page) => void }> = ({ onNavigate }) => {
    const { goals, addGoal, updateGoal, deleteGoal, completeGoal, batches } = useUser();
    const { t } = useTranslation();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingGoal, setEditingGoal] = useState<Goal | null>(null);
    const [filter, setFilter] = useState<'ativo' | 'concluido'>('ativo');

    const suggestions = useMemo(() => suggestGoalsFromHistory(batches), [batches]);

    const handleOpenModal = (goal: Goal | null = null) => {
        setEditingGoal(goal);
        setIsModalOpen(true);
    };

    // FIX: Make function async to handle promises from context.
    const handleSaveGoal = async (goalData: Omit<Goal, 'id' | 'createdAt' | 'updatedAt' | 'status' | 'progress'> | (Partial<Goal> & { id: string })) => {
        if ('id' in goalData) {
            await updateGoal(goalData);
        } else {
            await addGoal(goalData);
        }
        setIsModalOpen(false);
    };
    
    // FIX: Make function async to handle promises from context.
    const handleQuickAddSuggestion = async (suggestion: SuggestedGoal) => {
        await addGoal(suggestion);
    };

    const filteredGoals = useMemo(() => goals.filter(g => g.status === filter), [goals, filter]);

    const GoalItem: React.FC<{goal: Goal}> = ({ goal }) => (
        <div className="rounded-lg bg-white p-4 border border-neutral-200 shadow-sm">
            <div className="flex justify-between items-start">
                <div>
                    <h4 className="font-semibold text-neutral-800">{goal.title}</h4>
                    <p className="text-sm text-neutral-600 mt-1">{goal.description}</p>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0 ml-4">
                    <button onClick={() => handleOpenModal(goal)} title="Edit"><PencilIcon className="h-5 w-5 text-neutral-400 hover:text-neutral-600"/></button>
                    {goal.status === 'ativo' && <button onClick={() => completeGoal(goal.id)} title="Complete"><CheckCircleIcon className="h-5 w-5 text-green-400 hover:text-green-600"/></button>}
                    <button onClick={() => deleteGoal(goal.id)} title="Delete"><TrashIcon className="h-5 w-5 text-red-400 hover:text-red-600"/></button>
                </div>
            </div>
            {goal.status === 'ativo' && (
                 <div className="mt-3">
                    <div className="flex justify-between items-center text-xs mb-1">
                        <span className="text-neutral-600">Progress</span>
                        <span className="font-bold text-lime-600">{goal.progress}%</span>
                    </div>
                    <div className="h-2 w-full rounded-full bg-neutral-200">
                        <div className="h-2 rounded-full bg-lime-500" style={{ width: `${goal.progress}%` }}/>
                    </div>
                </div>
            )}
        </div>
    );

    return (
        <>
        <MyLabLayout activePage="mylab/objetivos" onNavigate={onNavigate}>
            <div className="mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-semibold tracking-tight text-neutral-900">My Goals</h1>
                    <p className="mt-1 text-sm text-neutral-600">Set small challenges to evolve your baking skills.</p>
                </div>
                <button onClick={() => handleOpenModal()} className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-lg bg-lime-500 py-2 px-4 font-semibold text-white shadow-sm hover:bg-lime-600">
                    <PlusCircleIcon className="h-5 w-5"/>
                    Create New Goal
                </button>
            </div>

            <div className="space-y-8">
                {/* AI Suggestions */}
                <div>
                    <h3 className="text-lg font-medium mb-3 flex items-center gap-2 text-slate-800"><SparklesIcon className="h-5 w-5 text-lime-500" /> AI Suggestions</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {suggestions.map(sugg => (
                            <div key={sugg.title} className="rounded-lg bg-neutral-50 p-4 border border-neutral-200">
                                <h4 className="font-semibold text-sm text-neutral-800">{sugg.title}</h4>
                                <p className="text-xs text-neutral-600 mt-1">{sugg.description}</p>
                                <button onClick={() => handleQuickAddSuggestion(sugg)} className="mt-3 text-xs font-bold text-lime-600 hover:underline">Add goal</button>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Goals List */}
                <div>
                    <div className="border-b border-neutral-200 mb-4">
                        <nav className="-mb-px flex space-x-4" aria-label="Tabs">
                            <button onClick={() => setFilter('ativo')} className={`whitespace-nowrap py-3 px-1 border-b-2 font-medium text-sm ${filter === 'ativo' ? 'border-lime-500 text-lime-600' : 'border-transparent text-neutral-500 hover:text-neutral-700'}`}>Active</button>
                            <button onClick={() => setFilter('concluido')} className={`whitespace-nowrap py-3 px-1 border-b-2 font-medium text-sm ${filter === 'concluido' ? 'border-lime-500 text-lime-600' : 'border-transparent text-neutral-500 hover:text-neutral-700'}`}>Completed</button>
                        </nav>
                    </div>

                    {filteredGoals.length > 0 ? (
                        <div className="space-y-4">
                            {filteredGoals.map(goal => <GoalItem key={goal.id} goal={goal} />)}
                        </div>
                    ) : (
                         <div className="text-center py-12 text-neutral-600">
                            <p>No {filter === 'ativo' ? 'active' : 'completed'} goals at the moment.</p>
                         </div>
                    )}
                </div>
            </div>
        </MyLabLayout>
        <GoalModal 
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            onSave={handleSaveGoal}
            goalToEdit={editingGoal}
        />
        </>
    );
};

export default ObjectivesPage;