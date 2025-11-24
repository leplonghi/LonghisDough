
import React, { useState, useEffect } from 'react';
import { useUser } from '@/contexts/UserProvider';
import { useTranslation } from '@/i18n';
import {
  ArrowRightOnRectangleIcon,
  PencilIcon,
  StarIcon,
  TrashIcon,
  SolidStarIcon,
  BookmarkSquareIcon,
  FlourIcon,
  ShieldCheckIcon,
  ArrowTopRightOnSquareIcon,
  BeakerIcon,
} from '@/components/ui/Icons';
import { User, Gender, Oven, Page, Levain } from '@/types';
import OvenModal from '@/components/OvenModal';
import LevainModal from '@/components/LevainModal';

interface ProfilePageProps {
  onNavigate: (page: Page, params?: string) => void;
}

const ProfilePage: React.FC<ProfilePageProps> = ({ onNavigate }) => {
  const {
    user,
    logout,
    updateUser,
    hasProAccess,
    ovens,
    addOven,
    updateOven,
    deleteOven,
    setDefaultOven,
    levains,
    addLevain,
    updateLevain,
    deleteLevain,
    setDefaultLevain,
  } = useUser();
  const { t } = useTranslation();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<Partial<User>>({});

  const [isOvenModalOpen, setIsOvenModalOpen] = useState(false);
  const [editingOven, setEditingOven] = useState<Oven | null>(null);

  const [isLevainModalOpen, setIsLevainModalOpen] = useState(false);
  const [editingLevain, setEditingLevain] = useState<Levain | null>(null);

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

  const handleSaveOven = (ovenData: Omit<Oven, 'id' | 'isDefault'> | Oven) => {
    if ('id' in ovenData) {
      updateOven(ovenData);
    } else {
      addOven(ovenData);
    }
    setIsOvenModalOpen(false);
    setEditingOven(null);
  };

  const handleDeleteOven = (id: string) => {
    const ovenToDelete = ovens.find(o => o.id === id);
    if(ovenToDelete && window.confirm(t('confirmations.delete_oven', {name: ovenToDelete.name}))) {
        deleteOven(id);
    }
  }
  
  const handleSaveLevain = (levainData: Omit<Levain, 'id' | 'isDefault' | 'feedingHistory'> | Levain) => {
    if ('id' in levainData) {
      // @ts-ignore
      updateLevain(levainData);
    } else {
      addLevain(levainData);
    }
    setIsLevainModalOpen(false);
    setEditingLevain(null);
  };
  
  const handleDeleteLevain = (id: string) => {
      const levainToDelete = levains.find(l => l.id === id);
      if(levainToDelete && window.confirm(t('confirmations.delete_levain', { name: levainToDelete.name }))) {
          deleteLevain(id);
      }
  }

  const renderInfoRow = (label: string, value: string | undefined) => (
    <div>
      <dt className="text-sm font-medium text-slate-500">
        {label}
      </dt>
      <dd className="mt-1 text-slate-900">{value || 'N/A'}</dd>
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
        className="block text-sm font-medium text-slate-700"
      >
        {label}
      </label>
      {type === 'select' ? (
        <select
          id={name}
          name={name}
          value={(formData[name] as any) || ''}
          onChange={handleInputChange}
          className="mt-1 block w-full rounded-md border-slate-300 bg-white py-2 px-3 shadow-sm focus:border-lime-500 focus:outline-none focus:ring-lime-500 sm:text-sm"
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
          value={(formData[name] as any) || ''}
          onChange={handleInputChange}
          className="mt-1 block w-full rounded-md border-slate-300 bg-white py-2 px-3 shadow-sm focus:border-lime-500 focus:outline-none focus:ring-lime-500 disabled:opacity-50 sm:text-sm"
          disabled={name === 'email'}
        />
      )}
    </div>
  );

  const genderOptions = Object.values(Gender).map((g) => ({
    value: g,
    label: t(`profile.genders.${(g as string).toLowerCase()}`),
  }));

  return (
    <>
    <div className="mx-auto max-w-2xl animate-[fadeIn_0.5s_ease-in-out]">
      <button 
        onClick={() => window.history.back()} 
        className="mb-6 inline-flex items-center gap-1 text-sm font-medium text-slate-500 hover:text-slate-800 transition-colors"
      >
        &larr; Back
      </button>

      <div className="rounded-2xl bg-white p-6 shadow-lg ring-1 ring-slate-200/50 sm:p-10">
        <div className="flex flex-col items-center text-center">
          {user.avatar ? (
            <img
              src={user.avatar}
              alt={user.name}
              className="h-24 w-24 rounded-full object-cover ring-4 ring-lime-200"
            />
          ) : (
            <div className="flex h-24 w-24 items-center justify-center rounded-full bg-slate-200 text-4xl font-bold text-slate-600 ring-4 ring-lime-200">
              {user.name.charAt(0)}
            </div>
          )}
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            {user.name}
          </h1>
          <p className="mt-2 text-lg text-slate-600">
            {user.email}
          </p>
        </div>

        <div className="mt-10 border-t border-slate-200 pt-8">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-slate-800">
              {t('profile.settings_title')}
            </h2>
            {!isEditing && (
              <button
                onClick={() => setIsEditing(true)}
                className="flex items-center gap-1.5 rounded-md bg-slate-200 py-1.5 px-3 text-sm font-semibold text-slate-700 hover:bg-slate-300"
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
                <div className="flex items-center justify-end gap-4 border-t border-slate-200 pt-6">
                  <button
                    onClick={handleCancel}
                    className="rounded-md py-2 px-4 text-sm font-semibold text-slate-600 hover:bg-slate-100"
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
                  user.gender
                    ? t(`profile.genders.${user.gender.toLowerCase()}`)
                    : undefined,
                )}
                <div>
                  <dt className="text-sm font-medium text-slate-500">
                    {t('profile.membership')}
                  </dt>
                  <dd className="mt-1">
                    <span
                      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold ${
                        hasProAccess
                          ? 'bg-lime-100 text-lime-800'
                          : 'bg-slate-100 text-slate-800'
                      }`}
                    >
                      {hasProAccess && <StarIcon className="h-3.5 w-3.5" />}
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
        
        {/* === SECTION: My Ovens === */}
        <div className="mt-10 border-t border-slate-200 pt-8">
             <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-slate-800">
                {t('profile.ovens.title')}
                </h2>
                <button
                    onClick={() => { setEditingOven(null); setIsOvenModalOpen(true); }}
                    className="rounded-md bg-lime-500 py-1.5 px-3 text-sm font-semibold text-white shadow-sm hover:bg-lime-600"
                >
                    {t('profile.ovens.add_oven')}
                </button>
             </div>
             <div className="mt-6 space-y-4">
                {ovens.length === 0 ? (
                    <p className="text-center text-slate-500 py-4">{t('profile.ovens.empty_state')}</p>
                ) : (
                    ovens.map(oven => (
                        <div key={oven.id} className="flex items-center justify-between rounded-lg bg-slate-50 p-4">
                            <div>
                                <p className="font-semibold text-slate-800">{oven.name} {oven.isDefault && <span className="ml-2 text-xs font-bold text-lime-600">({t('profile.ovens.default_oven')})</span>}</p>
                                <p className="text-sm text-slate-500">{t(`profile.ovens.types.${oven.type.toLowerCase()}`)} - {oven.maxTemperature}°C</p>
                            </div>
                            <div className="flex items-center gap-2">
                                <button onClick={() => setDefaultOven(oven.id)} title={t('profile.ovens.set_as_default')} className={`p-2 rounded-full ${oven.isDefault ? 'text-yellow-400' : 'text-slate-400 hover:text-yellow-400'}`}>
                                    {oven.isDefault ? <SolidStarIcon className="h-5 w-5"/> : <StarIcon className="h-5 w-5"/>}
                                </button>
                                <button onClick={() => { setEditingOven(oven); setIsOvenModalOpen(true); }} className="p-2 rounded-full text-slate-500 hover:bg-slate-200">
                                    <PencilIcon className="h-5 w-5"/>
                                </button>
                                <button onClick={() => handleDeleteOven(oven.id)} className="p-2 rounded-full text-red-500 hover:bg-red-100">
                                    <TrashIcon className="h-5 w-5"/>
                                </button>
                            </div>
                        </div>
                    ))
                )}
             </div>
        </div>
        
        {/* === SECTION: My Levains === */}
        <div className="mt-10 border-t border-slate-200 pt-8">
             <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
                  <BeakerIcon className="h-6 w-6 text-lime-500" />
                  {t('profile.levains.title')}
                </h2>
                <button
                    onClick={() => { setEditingLevain(null); setIsLevainModalOpen(true); }}
                    className="rounded-md bg-lime-500 py-1.5 px-3 text-sm font-semibold text-white shadow-sm hover:bg-lime-600"
                >
                    {t('profile.levains.add_levain')}
                </button>
             </div>
             <div className="mt-6 space-y-4">
                {levains.length === 0 ? (
                    <p className="text-center text-slate-500 py-4">{t('profile.levains.empty_state')}</p>
                ) : (
                    levains.map(levain => (
                        <div key={levain.id} className="flex items-center justify-between rounded-lg bg-slate-50 p-4">
                            <div>
                                <p className="font-semibold text-slate-800">{levain.name} {levain.isDefault && <span className="ml-2 text-xs font-bold text-lime-600">({t('profile.levains.default')})</span>}</p>
                                <p className="text-sm text-slate-500">{levain.hydration}% {t('profile.levains.hydration')}</p>
                            </div>
                            <div className="flex items-center gap-1 sm:gap-2">
                                <button onClick={() => onNavigate('mylab/levain')} title={t('profile.levains.manage')} className="p-2 rounded-md text-sm font-semibold text-lime-600 hover:bg-lime-100">
                                    {t('profile.levains.manage')}
                                </button>
                                <button onClick={() => setDefaultLevain(levain.id)} title={t('profile.levains.set_as_default')} className={`p-2 rounded-full ${levain.isDefault ? 'text-yellow-400' : 'text-slate-400 hover:text-yellow-400'}`}>
                                    {levain.isDefault ? <SolidStarIcon className="h-5 w-5"/> : <StarIcon className="h-5 w-5"/>}
                                </button>
                                <button onClick={() => { setEditingLevain(levain); setIsLevainModalOpen(true); }} className="p-2 rounded-full text-slate-500 hover:bg-slate-200">
                                    <PencilIcon className="h-5 w-5"/>
                                </button>
                                <button onClick={() => handleDeleteLevain(levain.id)} className="p-2 rounded-full text-red-500 hover:bg-red-100">
                                    <TrashIcon className="h-5 w-5"/>
                                </button>
                            </div>
                        </div>
                    ))
                )}
             </div>
        </div>

        {/* === SECTION: Resources === */}
        <div className="mt-10 border-t border-slate-200 pt-8">
            <h2 className="text-xl font-bold text-slate-800">
              {t('profile.resources.title')}
            </h2>
            <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
                <button
                    onClick={() => onNavigate('references')}
                    className="flex items-center gap-3 rounded-lg bg-slate-50 p-4 text-left transition hover:bg-slate-100"
                >
                    <BookmarkSquareIcon className="h-6 w-6 flex-shrink-0 text-lime-500" />
                    <div>
                        <p className="font-semibold text-slate-800">{t('profile.resources.tech_references')}</p>
                        <p className="text-sm text-slate-500">{t('profile.resources.tech_references_desc')}</p>
                    </div>
                </button>
                <button
                    onClick={() => onNavigate('flours')}
                    className="flex items-center gap-3 rounded-lg bg-slate-50 p-4 text-left transition hover:bg-slate-100"
                >
                    <FlourIcon className="h-6 w-6 flex-shrink-0 text-lime-500" />
                    <div>
                        <p className="font-semibold text-slate-800">{t('profile.resources.flours_library')}</p>
                        <p className="text-sm text-slate-500">{t('profile.resources.flours_library_desc')}</p>
                    </div>
                </button>
            </div>
        </div>

        {/* === SECTION: Legal === */}
        <div className="mt-10 border-t border-slate-200 pt-8">
            <h2 className="text-xl font-bold text-slate-800">Legal</h2>
            <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
                <button
                    onClick={() => onNavigate('terms')}
                    className="flex items-center justify-between rounded-lg bg-slate-50 p-3 text-left transition hover:bg-slate-100"
                >
                    <div className="flex items-center gap-2">
                        <ShieldCheckIcon className="h-5 w-5 text-slate-500" />
                        <span className="font-medium text-slate-700">Terms of Use</span>
                    </div>
                    <ArrowTopRightOnSquareIcon className="h-4 w-4 text-slate-400" />
                </button>
                <button
                    onClick={() => onNavigate('privacy')}
                    className="flex items-center justify-between rounded-lg bg-slate-50 p-3 text-left transition hover:bg-slate-100"
                >
                    <div className="flex items-center gap-2">
                        <ShieldCheckIcon className="h-5 w-5 text-slate-500" />
                        <span className="font-medium text-slate-700">Privacy Policy</span>
                    </div>
                    <ArrowTopRightOnSquareIcon className="h-4 w-4 text-slate-400" />
                </button>
            </div>
        </div>


        <div className="mt-10 border-t border-slate-200 pt-8">
          <button
            onClick={logout}
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-slate-200 py-3 px-6 text-base font-semibold text-slate-700 shadow-sm transition-all hover:bg-slate-300 sm:w-auto"
          >
            <ArrowRightOnRectangleIcon className="h-5 w-5" />
            <span>{t('auth.sign_out')}</span>
          </button>
        </div>
      </div>
    </div>
    <OvenModal
        isOpen={isOvenModalOpen}
        onClose={() => { setIsOvenModalOpen(false); setEditingOven(null); }}
        onSave={handleSaveOven}
        ovenToEdit={editingOven}
    />
    <LevainModal
        isOpen={isLevainModalOpen}
        onClose={() => { setIsLevainModalOpen(false); setEditingLevain(null); }}
        onSave={handleSaveLevain}
        levainToEdit={editingLevain}
    />
    </>
  );
};

export default ProfilePage;
