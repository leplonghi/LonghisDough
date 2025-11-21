import React, { useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import LoadingSpinner from '@/components/ui/LoadingSpinner';

interface RequireAuthProps {
  children: React.ReactNode;
  onOpenAuth?: () => void;
}

const RequireAuth: React.FC<RequireAuthProps> = ({ children, onOpenAuth }) => {
  const { firebaseUser, loading } = useAuth();

  useEffect(() => {
    if (!loading && !firebaseUser && onOpenAuth) {
      onOpenAuth();
    }
  }, [loading, firebaseUser, onOpenAuth]);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (!firebaseUser) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] p-8 text-center animate-fade-in">
        <div className="bg-slate-100 p-4 rounded-full mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-slate-500">
                <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 00-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
            </svg>
        </div>
        <h2 className="text-2xl font-bold text-slate-800 mb-2">Access Restricted</h2>
        <p className="text-slate-600 mb-6 max-w-md">
          Please sign in to access your lab, save recipes, and manage your profile.
        </p>
        {onOpenAuth && (
          <button
            onClick={onOpenAuth}
            className="rounded-lg bg-lime-500 py-2.5 px-6 text-sm font-bold text-white shadow-md hover:bg-lime-600 transition-colors"
          >
            Sign In
          </button>
        )}
      </div>
    );
  }

  return <>{children}</>;
};

export default RequireAuth;