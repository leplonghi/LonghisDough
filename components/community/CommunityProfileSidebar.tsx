import React from 'react';
import { useUser } from '../../contexts/UserProvider';
import { UserCircleIcon, ShieldCheckIcon } from '../IconComponents';

const CommunityProfileSidebar: React.FC = () => {
    const { user } = useUser();
    
    return (
        <aside className="hidden lg:block sticky top-24">
            <div className="rounded-lg bg-white p-6 shadow-sm ring-1 ring-slate-200/50 dark:border dark:border-slate-700/50 dark:bg-slate-800">
                <div className="flex flex-col items-center text-center">
                    {user?.avatar ? (
                        <img src={user.avatar} alt={user.name} className="h-20 w-20 rounded-full object-cover" />
                    ) : (
                        <UserCircleIcon className="h-20 w-20 text-slate-400" />
                    )}
                    <h2 className="mt-4 text-xl font-bold text-slate-900 dark:text-white">{user?.name || 'Visitante'}</h2>
                    <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                        "Apaixonado por fermentação natural e pizzas de longa maturação. Sempre em busca da borda perfeita!"
                    </p>
                </div>

                <div className="mt-6 border-t border-slate-200 dark:border-slate-700 pt-6">
                    <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">Badges</h3>
                    <div className="mt-4 flex flex-wrap justify-center gap-4">
                        <div className="text-center" title="Mestre da Fermentação">
                            <ShieldCheckIcon className="h-10 w-10 text-lime-500" />
                            <span className="mt-1 text-xs text-slate-500 dark:text-slate-400 block">Fermento</span>
                        </div>
                        <div className="text-center" title="Forno Quente">
                             <ShieldCheckIcon className="h-10 w-10 text-red-500" />
                            <span className="mt-1 text-xs text-slate-500 dark:text-slate-400 block">Forno</span>
                        </div>
                         <div className="text-center" title="Pizzaiolo Pro">
                             <ShieldCheckIcon className="h-10 w-10 text-blue-500" />
                            <span className="mt-1 text-xs text-slate-500 dark:text-slate-400 block">Pro</span>
                        </div>
                    </div>
                </div>

                 <div className="mt-6 border-t border-slate-200 dark:border-slate-700 pt-6">
                    <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">Minhas Publicações</h3>
                    <ul className="mt-4 space-y-2">
                        <li><a href="#" className="text-sm text-lime-600 hover:underline dark:text-lime-400">Minha Napolitana 72h</a></li>
                        <li><a href="#" className="text-sm text-lime-600 hover:underline dark:text-lime-400">Teste de Focaccia com Azeite...</a></li>
                        <li><a href="#" className="text-sm text-lime-600 hover:underline dark:text-lime-400">Pão Rústico com Centeio</a></li>
                    </ul>
                </div>
            </div>
        </aside>
    );
};

export default CommunityProfileSidebar;