import React, { useState, useEffect } from 'react';
import { MyLabEnvironmentSettings } from '../../types';
import { loadEnvironmentSettings, saveEnvironmentSettings } from '../../logic/mylabSelectors';
import { SunIcon, FireIcon, LightBulbIcon } from '../IconComponents';

const OVEN_TYPES: Record<NonNullable<MyLabEnvironmentSettings['ovenType']>, string> = {
  HOME_ELECTRIC: 'Elétrico Doméstico',
  HOME_GAS: 'A Gás Doméstico',
  PORTABLE_WFO: 'Portátil (Ooni, etc)',
  WOOD_FIRED: 'A Lenha',
};

const SURFACE_TYPES: Record<NonNullable<MyLabEnvironmentSettings['bakingSurface']>, string> = {
  STEEL: 'Aço (Steel)',
  STONE: 'Pedra Refratária',
  BISCOTTO: 'Biscotto (Argila)',
  TRAY: 'Assadeira (Bandeja)',
};

const MyLabEnvironmentCard: React.FC = () => {
  const [settings, setSettings] = useState<MyLabEnvironmentSettings>({});
  const [isEditing, setIsEditing] = useState(false);
  const [formState, setFormState] = useState<MyLabEnvironmentSettings>({});

  useEffect(() => {
    const loadedSettings = loadEnvironmentSettings();
    if (loadedSettings) {
      setSettings(loadedSettings);
      setFormState(loadedSettings);
    }
  }, []);

  const handleEdit = () => {
    setFormState(settings); // Reset form to current saved settings
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
  };
  
  const handleSave = () => {
    saveEnvironmentSettings(formState);
    setSettings(formState);
    setIsEditing(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormState(prev => ({
      ...prev,
      [name]: e.target.type === 'number' && value !== '' ? Number(value) : value,
    }));
  };

  const getSuggestion = () => {
    if (settings.ovenType?.includes('HOME') && settings.bakingSurface === 'STEEL') {
      return 'Combinação ideal para estilos como NY Style e Napolitana adaptada em forno doméstico.';
    }
    if (settings.ovenType === 'WOOD_FIRED' && settings.bakingSurface === 'BISCOTTO') {
      return 'Setup perfeito para a autêntica Pizza Napolitana. Garante que a base não queime.';
    }
    return 'Ajuste seu ambiente para receber sugestões de receitas mais precisas.';
  };
  
  const renderSummary = () => (
    <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="flex items-center gap-2">
                <SunIcon className="h-5 w-5 text-slate-500 dark:text-slate-400" />
                <div>
                    <div className="text-xs text-slate-500 dark:text-slate-400">Ambiente</div>
                    <div className="font-semibold text-slate-800 dark:text-slate-100">{settings.ambientTempC ? `${settings.ambientTempC}°C` : 'N/A'}</div>
                </div>
            </div>
            <div className="flex items-center gap-2">
                <FireIcon className="h-5 w-5 text-slate-500 dark:text-slate-400" />
                <div>
                    <div className="text-xs text-slate-500 dark:text-slate-400">Forno</div>
                    <div className="font-semibold text-slate-800 dark:text-slate-100 truncate">{settings.ovenType ? OVEN_TYPES[settings.ovenType] : 'N/A'}</div>
                </div>
            </div>
             <div className="flex items-center gap-2 col-start-2">
                <div>
                    <div className="text-xs text-slate-500 dark:text-slate-400">Superfície</div>
                    <div className="font-semibold text-slate-800 dark:text-slate-100">{settings.bakingSurface ? SURFACE_TYPES[settings.bakingSurface] : 'N/A'}</div>
                </div>
            </div>
             <div className="flex items-center gap-2 col-start-2">
                <div>
                    <div className="text-xs text-slate-500 dark:text-slate-400">Temp. Máxima</div>
                    <div className="font-semibold text-slate-800 dark:text-slate-100">{settings.maxOvenTempC ? `${settings.maxOvenTempC}°C` : 'N/A'}</div>
                </div>
            </div>
        </div>
        <button
            onClick={handleEdit}
            className="w-full mt-4 rounded-md bg-slate-200 py-2 px-4 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-300 dark:bg-slate-700 dark:text-slate-200 dark:hover:bg-slate-600"
        >
            Ajustar Ambiente
        </button>
    </div>
  );

  const renderForm = () => (
    <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
            <div>
                <label className="block text-xs font-medium text-slate-600 dark:text-slate-300">Temp. Ambiente (°C)</label>
                <input 
                    type="number"
                    name="ambientTempC"
                    value={formState.ambientTempC || ''}
                    onChange={handleChange}
                    className="mt-1 w-full rounded-md border-slate-300 bg-white py-1.5 px-2 text-sm shadow-sm dark:border-slate-600 dark:bg-slate-900"
                />
            </div>
            <div>
                <label className="block text-xs font-medium text-slate-600 dark:text-slate-300">Temp. Máx. Forno (°C)</label>
                <input 
                    type="number"
                    name="maxOvenTempC"
                    value={formState.maxOvenTempC || ''}
                    onChange={handleChange}
                    className="mt-1 w-full rounded-md border-slate-300 bg-white py-1.5 px-2 text-sm shadow-sm dark:border-slate-600 dark:bg-slate-900"
                />
            </div>
        </div>
        <div>
            <label className="block text-xs font-medium text-slate-600 dark:text-slate-300">Tipo de Forno</label>
            <select
                name="ovenType"
                value={formState.ovenType || ''}
                onChange={handleChange}
                className="mt-1 w-full rounded-md border-slate-300 bg-white py-1.5 px-2 text-sm shadow-sm dark:border-slate-600 dark:bg-slate-900"
            >
                <option value="">Selecione...</option>
                {Object.entries(OVEN_TYPES).map(([key, label]) => <option key={key} value={key}>{label}</option>)}
            </select>
        </div>
        <div>
            <label className="block text-xs font-medium text-slate-600 dark:text-slate-300">Superfície de Cozimento</label>
            <select
                name="bakingSurface"
                value={formState.bakingSurface || ''}
                onChange={handleChange}
                className="mt-1 w-full rounded-md border-slate-300 bg-white py-1.5 px-2 text-sm shadow-sm dark:border-slate-600 dark:bg-slate-900"
            >
                <option value="">Selecione...</option>
                {Object.entries(SURFACE_TYPES).map(([key, label]) => <option key={key} value={key}>{label}</option>)}
            </select>
        </div>
        <div className="flex gap-3 pt-2">
            <button
                onClick={handleCancel}
                className="w-full rounded-md bg-slate-200 py-2 px-4 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-300 dark:bg-slate-600 dark:text-slate-200 dark:hover:bg-slate-500"
            >
                Cancelar
            </button>
            <button
                onClick={handleSave}
                className="w-full rounded-md bg-lime-500 py-2 px-4 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-lime-600"
            >
                Salvar
            </button>
        </div>
    </div>
  );

  return (
    <div className="rounded-lg bg-white p-6 shadow-sm ring-1 ring-slate-200/50 dark:border dark:border-slate-700/50 dark:bg-slate-800">
      <h2 className="text-lg font-bold text-slate-800 dark:text-slate-100 mb-4">
        Meu Ambiente
      </h2>
      
      <div>
        {isEditing ? renderForm() : renderSummary()}
      </div>
      
      <div className="mt-6 rounded-lg border border-lime-200 bg-lime-50 p-4 dark:border-lime-500/30 dark:bg-lime-500/10">
        <div className="flex">
          <div className="flex-shrink-0">
            <LightBulbIcon
              className="h-5 w-5 text-lime-500"
              aria-hidden="true"
            />
          </div>
          <div className="ml-3 flex-1">
            <p className="text-sm text-lime-800 dark:text-lime-200">
              <span className="font-bold">Dica Rápida:</span> {getSuggestion()}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyLabEnvironmentCard;