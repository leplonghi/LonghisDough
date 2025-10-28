import React, { useState, useEffect } from 'react';
import { useAuth } from '../auth';
import { useTranslation } from '../i18n';
import { useEntitlements } from '../entitlements';
import {
  ArrowRightOnRectangleIcon,
  PencilIcon,
  StarIcon,
} from './IconComponents';
import { User, Gender } from '../types';

const ProfilePage: React.FC = () => {
  const { user, logout, updateUser } = useAuth();
  const { hasProAccess } = useEntitlements();
  const { t } = useTranslation();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<Partial<User>>({});

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name,
        email: user.email,
        birthDate: user.birthDate,
        gender: user.gender,
      });
    }
  }, [user]);

  if (!user) {
    return (
      <div className="mx-auto max-w-4xl text-center">
        <p>{t('profile.not_logged_in')}</p>
      </div>
    );
  }

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    updateUser(formData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setFormData({
      name: user.name,
      email: user.email,
      birthDate: user.birthDate,
      gender: user.gender,
    });
    setIsEditing(false);
  };

  const renderInfoRow = (label: string, value: string | undefined) => (
    <div>
      <dt className="text-sm font-medium text-slate-500 dark:text-slate-400">
        {label}
      </dt>
      <dd className="mt-1 text-slate-900 dark:text-white">{value || 'N/A'}</dd>
    </div>
  );

  const renderInputRow = (
    label: string,
    name: keyof User,
    type: string,
    options?: { value: string; label: string }[],
  ) => (
    <div>
      <label
        htmlFor={name}
        className="block text-sm font-medium text-slate-700 dark:text-slate-300"
      >
        {label}
      </label>
      {type === 'select' ? (
        <select
          id={name}
          name={name}
          value={formData[name] || ''}
          onChange={handleInputChange}
          className="mt-1 block w-full rounded-md border-slate-300 bg-white py-2 px-3 shadow-sm focus:border-lime-500 focus:outline-none focus:ring-lime-500 dark:border-slate-600 dark:bg-slate-700 dark:text-white sm:text-sm"
        >
          {options?.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      ) : (
        <input
          type={type}
          id={name}
          name={name}
          value={(formData[name] as string) || ''}
          onChange={handleInputChange}
          className="mt-1 block w-full rounded-md border-slate-300 bg-white py-2 px-3 shadow-sm focus:border-lime-500 focus:outline-none focus:ring-lime-500 dark:border-slate-600 dark:bg-slate-700 dark:text-white sm:text-sm"
          disabled={name === 'email'}
        />
      )}
    </div>
  );
  
  // FIX: Cast enum value to string to resolve TypeScript type inference issue.
  const genderOptions = Object.values(Gender).map(g => ({ value: g, label: t(`profile.genders.${(g as string).toLowerCase()}`) }));

  return (
    <div className="mx-auto max-w-2xl animate-[fadeIn_0.5s_ease-in-out]">
      <div className="rounded-2xl bg-white p-6 shadow-lg ring-1 ring-slate-200/50 dark:border dark:border-slate-700/50 dark:bg-slate-800 sm:p-10">
        <div className="flex flex-col items-center text-center">
          {user.avatar ? (
            <img
              src={user.avatar}
              alt={user.name}
              className="h-24 w-24 rounded-full object-cover ring-4 ring-lime-200 dark:ring-lime-500/50"
            />
          ) : (
            <div className="flex h-24 w-24 items-center justify-center rounded-full bg-slate-200 text-4xl font-bold text-slate-600 ring-4 ring-lime-200 dark:bg-slate-700 dark:text-slate-200 dark:ring-lime-500/50">
              {user.name.charAt(0)}
            </div>
          )}
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
            {user.name}
          </h1>
          <p className="mt-2 text-lg text-slate-600 dark:text-slate-400">
            {user.email}
          </p>
        </div>

        <div className="mt-10 border-t border-slate-200 pt-8 dark:border-slate-700">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100">
              {t('profile.settings_title')}
            </h2>
            {!isEditing && (
              <button
                onClick={() => setIsEditing(true)}
                className="flex items-center gap-1.5 rounded-md bg-slate-200 py-1.5 px-3 text-sm font-semibold text-slate-700 hover:bg-slate-300 dark:bg-slate-700 dark:text-slate-200 dark:hover:bg-slate-600"
              >
                <PencilIcon className="h-4 w-4" />
                <span>{t('profile.edit_profile')}</span>
              </button>
            )}
          </div>

          <div className="mt-6">
            {isEditing ? (
              <div className="space-y-6">
                {renderInputRow(t('profile.name'), 'name', 'text')}
                {renderInputRow(t('profile.email'), 'email', 'email')}
                {renderInputRow(t('profile.birthDate'), 'birthDate', 'date')}
                {renderInputRow(
                  t('profile.gender'),
                  'gender',
                  'select',
                  genderOptions,
                )}
                <div className="flex items-center justify-end gap-4">
                  <button
                    onClick={handleCancel}
                    className="rounded-md py-2 px-4 text-sm font-semibold text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-700"
                  >
                    {t('profile.cancel')}
                  </button>
                  <button
                    onClick={handleSave}
                    className="rounded-md bg-lime-500 py-2 px-4 text-sm font-semibold text-white shadow-sm hover:bg-lime-600"
                  >
                    {t('profile.save_changes')}
                  </button>
                </div>
              </div>
            ) : (
              <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
                {renderInfoRow(t('profile.name'), user.name)}
                {renderInfoRow(t('profile.email'), user.email)}
                {renderInfoRow(t('profile.birthDate'), user.birthDate)}
                {renderInfoRow(
                  t('profile.gender'),
                  user.gender ? t(`profile.genders.${user.gender.toLowerCase()}`) : undefined,
                )}
                <div>
                  <dt className="text-sm font-medium text-slate-500 dark:text-slate-400">
                    {t('profile.membership')}
                  </dt>
                  <dd className="mt-1">
                    <span
                      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold ${
                        hasProAccess
                          ? 'bg-lime-100 text-lime-800 dark:bg-lime-500/10 dark:text-lime-300'
                          : 'bg-slate-100 text-slate-800 dark:bg-slate-700 dark:text-slate-200'
                      }`}
                    >
                      {hasProAccess && (
                        <StarIcon className="h-3.5 w-3.5" />
                      )}
                      {hasProAccess
                        ? t('profile.pro_member')
                        : t('profile.free_member')}
                    </span>
                  </dd>
                </div>
              </dl>
            )}
          </div>
        </div>

        <div className="mt-10 border-t border-slate-200 pt-8 dark:border-slate-700">
          <button
            onClick={logout}
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-slate-200 py-3 px-6 text-base font-semibold text-slate-700 shadow-sm transition-all hover:bg-slate-300 dark:bg-slate-700 dark:text-slate-200 dark:hover:bg-slate-600 sm:w-auto"
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