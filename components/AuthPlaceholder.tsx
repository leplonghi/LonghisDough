
import React from 'react';
import { useUser } from '../contexts/UserProvider';
import { UserCircleIcon, GoogleIcon } from './IconComponents';

const AuthPlaceholder: React.FC = () => {
  const { login } = useUser();

  return (
    <div className="mx-auto max-w-2xl flex flex-col items-center justify-center p-8 text-center rounded-2xl border border-slate-200 bg-white shadow-sm mt-10">
      <div className="mb-6 rounded-full bg-slate-100 p-6">
        <UserCircleIcon className="h-16 w-16 text-slate-400" />
      </div>
      <h2 className="text-2xl font-bold text-slate-900 mb-2">Sign in to access this feature</h2>
      <p className="text-slate-600 mb-8 max-w-md">
        Keep your dough formulas, bakes, and levain history synced across devices.
      </p>
      <button
        onClick={login}
        className="inline-flex items-center justify-center gap-3 rounded-lg bg-lime-500 px-6 py-3 text-base font-semibold text-white shadow-md transition-all hover:bg-lime-600 focus:outline-none focus:ring-2 focus:ring-lime-500 focus:ring-offset-2"
      >
        <GoogleIcon className="h-5 w-5 text-white fill-white" />
        Sign in with Google
      </button>
    </div>
  );
};

export default AuthPlaceholder;
