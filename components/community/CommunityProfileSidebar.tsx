import React from 'react';
import { useUser } from '../../contexts/UserProvider';
import { UserCircleIcon, ShieldCheckIcon } from '../IconComponents';

const CommunityProfileSidebar: React.FC = () => {
    const { user } = useUser();
    
    return (
        <aside className="hidden lg:block sticky top-24">
            <div className="rounded-lg bg-white p-6 shadow-sm ring-1 ring-slate-200/50">
                <div className="flex flex-col items-center text-center">
                    {user?.avatar ? (
                        <img src={user.avatar} alt={user.name} className="h-20 w-20 rounded-full object-cover" />
                    ) : (
                        <UserCircleIcon className="h-20 w-20 text-slate-400" />
                    )}
                    <h2 className="mt-4 text-xl font-bold text-slate-900">{user?.name || 'Visitor'}</h2>
                    <p className="mt-2 text-sm text-slate-500">
                        "Passionate about sourdough and long fermentation pizza. Always chasing the perfect crust!"
                    </p>
                </div>

                <div className="mt-6 border-t border-slate-200 pt-6">
                    <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-500">Badges</h3>
                    <div className="mt-4 flex flex-wrap justify-center gap-4">
                        <div className="text-center" title="Yeast Master">
                            <ShieldCheckIcon className="h-10 w-10 text-lime-500" />
                            <span className="mt-1 text-xs text-slate-500 block">Yeast</span>
                        </div>
                        <div className="text-center" title="Hot Oven">
                             <ShieldCheckIcon className="h-10 w-10 text-red-500" />
                            <span className="mt-1 text-xs text-slate-500 block">Oven</span>
                        </div>
                         <div className="text-center" title="Pro Baker">
                             <ShieldCheckIcon className="h-10 w-10 text-blue-500" />
                            <span className="mt-1 text-xs text-slate-500 block">Pro</span>
                        </div>
                    </div>
                </div>

                 <div className="mt-6 border-t border-slate-200 pt-6">
                    <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-500">My Posts</h3>
                    <ul className="mt-4 space-y-2">
                        <li><a href="#" className="text-sm text-lime-600 hover:underline">My 72h Neapolitan</a></li>
                        <li><a href="#" className="text-sm text-lime-600 hover:underline">Olive Oil Focaccia Test...</a></li>
                        <li><a href="#" className="text-sm text-lime-600 hover:underline">Rustic Rye Bread</a></li>
                    </ul>
                </div>
            </div>
        </aside>
    );
};

export default CommunityProfileSidebar;