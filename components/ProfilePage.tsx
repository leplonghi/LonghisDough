import React from 'react';
import { useAuth } from '../auth';
import { useEntitlements } from '../entitlements';
import { useTranslation } from '../i18n';
import { StarIcon, ArrowRightOnRectangleIcon } from './IconComponents';

const ProfilePage: React.FC = () => {
  const { user, logout } = useAuth();
  const { hasProAccess } = useEntitlements();
  const { t } = useTranslation();

  if (!user) {
    // This should ideally not be reached if routing is correct
    return (
      <div className="text-center text-slate-500 dark:text-slate-400">
        You are not signed in.
      </div>
    );
  }

  const membershipStatus = hasProAccess ? t('profile.membership_pro') : t('profile.membership_free');
  
  return (
    <div className="mx-auto max-w-2xl animate-[fadeIn_0.5s_ease-in-out]">
      <div className="rounded-2xl bg-white p-6 shadow-lg ring-1 ring-slate-200/50 dark:border dark:border-slate-700/50 dark:bg-slate-800 sm:p-10">
        <div className="flex flex-col items-center sm:flex-row sm:items-start sm:gap-6">
          <div className="flex-shrink-0">
            <div className="relative h-24 w-24 rounded-full bg-slate-200 text-5xl font-semibold uppercase text-slate-600 dark:bg-slate-700 dark:text-slate-200">
              <img
                src={user.avatar}
                alt={user.name}
                className="h-full w-full rounded-full object-cover"
              />
            </div>
          </div>
          <div className="mt-4 text-center sm:mt-0 sm:text-left">
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
              {user.name}
            </h1>
            <p className="mt-1 text-slate-600 dark:text-slate-400">
              {user.email}
            </p>
          </div>
        </div>

        <div className="mt-8 border-t border-slate-200 pt-6 dark:border-slate-700">
          <dl className="space-y-4">
            <div className="flex justify-between">
              <dt className="font-medium text-slate-600 dark:text-slate-300">{t('profile.membership_status')}</dt>
              <dd className={`flex items-center gap-1.5 font-semibold ${hasProAccess ? 'text-lime-600 dark:text-lime-400' : 'text-slate-800 dark:text-slate-100'}`}>
                {hasProAccess && <StarIcon className="h-5 w-5" />}
                {membershipStatus}
              </dd>
            </div>
          </dl>
        </div>

        <div className="mt-8 border-t border-slate-200 pt-6 dark:border-slate-700">
           <button
              onClick={logout}
              className="flex w-full items-center justify-center gap-2 rounded-lg bg-slate-200 py-3 px-4 font-semibold text-slate-700 shadow-sm transition-all hover:bg-slate-300 dark:bg-slate-700 dark:text-slate-200 dark:hover:bg-slate-600"
            >
              <ArrowRightOnRectangleIcon className="h-5 w-5" />
              <span>{t('auth.sign_out')}</span>
            </button>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;