
import React, { useState, useEffect } from 'react';
import { useTranslation } from '../i18n';
// FIX: Added LevainStatus to import
import { Levain, LevainStatus, OvenType } from '../types';
import { OVEN_TYPE_OPTIONS } from '../constants';
import { CloseIcon } from './IconComponents';

interface LevainModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (levainData: Omit<Levain, 'id' | 'isDefault' | 'feedingHistory'> | (Partial<Levain> & { id: string })) => void;
  levainToEdit: Levain | null;
}

// FIX: Added missing properties createdAt and status to satisfy the Omit type.
const DEFAULT_LEVAIN_STATE: Omit<Levain, 'id' | 'isDefault' | 'feedingHistory'> = {
    name: '',
    hydration: 100,
    totalWeight: 200,
    lastFeeding: new Date().toISOString(),
    notes: '',
    createdAt: '', // Will be set by provider, but needed for type
    status: 'ativo' as LevainStatus, // Will be set by provider
}

const LevainModal: React.FC<LevainModalProps> = ({
  isOpen,
  onClose,
  onSave,
  levainToEdit,
}) => {
  const [formData, setFormData] = useState<Omit<Levain, 'id' | 'isDefault' | 'feedingHistory'>>(DEFAULT_LEVAIN_STATE);

  useEffect(() => {
    if (levainToEdit) {
      setFormData({
        name: levainToEdit.name,
        hydration: levainToEdit.hydration,
        totalWeight: levainToEdit.totalWeight,
        lastFeeding: levainToEdit.lastFeeding,
        notes: levainToEdit.notes || '',
        createdAt: levainToEdit.createdAt,
        status: levainToEdit.status,
      });
    } else {
      setFormData(DEFAULT_LEVAIN_STATE);
    }
  }, [levainToEdit, isOpen]);

  if (!isOpen) return null;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({...prev, [name]: type === 'number' ? Number(value) : value }));
  };
  
  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      // Handles both date and time and combines them
      const newDate = new Date(formData.lastFeeding);
      if (e.target.type === 'date') {
          const [year, month, day] = e.target.value.split('-').map(Number);
          newDate.setFullYear(year, month - 1, day);
      } else { // time
          const [hours, minutes] = e.target.value.split(':').map(Number);
          newDate.setHours(hours, minutes);
      }
      setFormData(prev => ({ ...prev, lastFeeding: newDate.toISOString() }));
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name.trim() === '') {
        alert('O nome do Levain é obrigatório.');
        return;
    }
    onSave(formData);
  };
  
  const isoDate = formData.lastFeeding.split('T')[0];
  const isoTime = formData.lastFeeding.split('T')[1].substring(0, 5);

  return (
    <div
      className="fixed inset-0 z-40 flex items-center justify-center bg-black/60 backdrop-blur-sm"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div
        className="relative mx-4 w-full max-w-lg rounded-2xl bg-white p-6 shadow-xl dark:border dark:border-slate-700 dark:bg-slate-800"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between border-b border-slate-200 pb-4 dark:border-slate-700">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">
            {levainToEdit ? 'Editar Levain' : 'Criar Novo Levain'}
          </h2>
          <button
            onClick={onClose}
            className="-mt-2 -mr-2 rounded-full p-1 text-slate-500 hover:bg-slate-200 dark:text-slate-400 dark:hover:bg-slate-700"
          >
            <CloseIcon className="h-6 w-6" />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <div>
                <label htmlFor="name" className="block text-sm font-medium text-slate-700 dark:text-slate-300">Nome do Levain</label>
                <input type="text" name="name" id="name" value={formData.name} onChange={handleInputChange} required className="mt-1 block w-full rounded-md border-slate-300 bg-white py-2 px-3 shadow-sm focus:border-lime-500 focus:outline-none focus:ring-lime-500 dark:border-slate-600 dark:bg-slate-700 dark:text-white" placeholder="Ex: Isauri, o Levain" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                 <div>
                    <label htmlFor="hydration" className="block text-sm font-medium text-slate-700 dark:text-slate-300">Hidratação (%)</label>
                    <input type="number" name="hydration" id="hydration" value={formData.hydration} onChange={handleInputChange} className="mt-1 block w-full rounded-md border-slate-300 bg-white py-2 px-3 shadow-sm focus:border-lime-500 focus:outline-none focus:ring-lime-500 dark:border-slate-600 dark:bg-slate-700 dark:text-white" />
                </div>
                <div>
                    <label htmlFor="totalWeight" className="block text-sm font-medium text-slate-700 dark:text-slate-300">Peso Total (g)</label>
                    <input type="number" name="totalWeight" id="totalWeight" value={formData.totalWeight} onChange={handleInputChange} className="mt-1 block w-full rounded-md border-slate-300 bg-white py-2 px-3 shadow-sm focus:border-lime-500 focus:outline-none focus:ring-lime-500 dark:border-slate-600 dark:bg-slate-700 dark:text-white" />
                </div>
            </div>
             <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">Última Alimentação</label>
                <div className="grid grid-cols-2 gap-2 mt-1">
                     <input type="date" name="lastFeedingDate" value={isoDate} onChange={handleDateChange} className="block w-full rounded-md border-slate-300 bg-white py-2 px-3 shadow-sm focus:border-lime-500 focus:outline-none focus:ring-lime-500 dark:border-slate-600 dark:bg-slate-700 dark:text-white" />
                     <input type="time" name="lastFeedingTime" value={isoTime} onChange={handleDateChange} className="block w-full rounded-md border-slate-300 bg-white py-2 px-3 shadow-sm focus:border-lime-500 focus:outline-none focus:ring-lime-500 dark:border-slate-600 dark:bg-slate-700 dark:text-white" />
                </div>
            </div>
            <div>
                <label htmlFor="notes" className="block text-sm font-medium text-slate-700 dark:text-slate-300">Anotações</label>
                <textarea name="notes" id="notes" value={formData.notes || ''} onChange={handleInputChange} rows={3} className="mt-1 block w-full rounded-md border-slate-300 bg-white py-2 px-3 shadow-sm focus:border-lime-500 focus:outline-none focus:ring-lime-500 dark:border-slate-600 dark:bg-slate-700 dark:text-white"></textarea>
            </div>
            <div className="flex justify-end gap-4 pt-4 border-t border-slate-200 dark:border-slate-700">
                <button type="button" onClick={onClose} className="rounded-md py-2 px-4 text-sm font-semibold text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-700">Cancelar</button>
                <button type="submit" className="rounded-md bg-lime-500 py-2 px-4 text-sm font-semibold text-white shadow-sm hover:bg-lime-600">Salvar</button>
            </div>
        </form>
      </div>
    </div>
  );
};

export default LevainModal;
