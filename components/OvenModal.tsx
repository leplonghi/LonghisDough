
import React, { useState, useEffect } from 'react';
import { Oven, OvenType } from '../types';
import { OVEN_TYPE_OPTIONS } from '../constants';
import { CloseIcon } from './IconComponents';

interface OvenModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (ovenData: Omit<Oven, 'id' | 'isDefault'> | Oven) => void;
  ovenToEdit: Oven | null;
}

const DEFAULT_OVEN_STATE = {
    name: '',
    type: OvenType.GAS,
    maxTemperature: 250,
    hasStone: false,
    hasSteel: false,
    notes: ''
}

const OvenModal: React.FC<OvenModalProps> = ({
  isOpen,
  onClose,
  onSave,
  ovenToEdit,
}) => {
  const [formData, setFormData] = useState<Omit<Oven, 'id' | 'isDefault'>>(DEFAULT_OVEN_STATE);

  useEffect(() => {
    if (ovenToEdit) {
      setFormData({
        name: ovenToEdit.name,
        type: ovenToEdit.type,
        maxTemperature: ovenToEdit.maxTemperature,
        hasStone: ovenToEdit.hasStone,
        hasSteel: ovenToEdit.hasSteel,
        notes: ovenToEdit.notes || '',
      });
    } else {
      setFormData(DEFAULT_OVEN_STATE);
    }
  }, [ovenToEdit, isOpen]);

  if (!isOpen) return null;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
        const { checked } = e.target as HTMLInputElement;
        setFormData(prev => ({ ...prev, [name]: checked }));
    } else {
        setFormData(prev => ({...prev, [name]: type === 'number' ? Number(value) : value }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name.trim() === '') {
        alert('Oven name is required.'); // Simple validation
        return;
    }
    if (ovenToEdit) {
      onSave({ ...ovenToEdit, ...formData });
    } else {
      onSave(formData);
    }
  };

  return (
    <div
      className="fixed inset-0 z-40 flex items-center justify-center bg-black/60 backdrop-blur-sm"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div
        className="relative mx-4 w-full max-w-lg rounded-2xl bg-white p-6 shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between border-b border-slate-200 pb-4">
          <h2 className="text-xl font-bold text-slate-900">
            {ovenToEdit ? 'Edit Oven' : 'Add Oven'}
          </h2>
          <button
            onClick={onClose}
            className="-mt-2 -mr-2 rounded-full p-1 text-slate-500 hover:bg-slate-200"
            aria-label="Close"
          >
            <CloseIcon className="h-6 w-6" />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <div>
                <label htmlFor="name" className="block text-sm font-medium text-slate-700">Oven Name</label>
                <input type="text" name="name" id="name" value={formData.name} onChange={handleInputChange} required className="mt-1 block w-full rounded-md border-slate-300 bg-white py-2 px-3 shadow-sm focus:border-lime-500 focus:outline-none focus:ring-lime-500" placeholder="e.g., My Home Oven" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                    <label htmlFor="type" className="block text-sm font-medium text-slate-700">Type</label>
                    <select name="type" id="type" value={formData.type} onChange={handleInputChange} className="mt-1 block w-full rounded-md border-slate-300 bg-white py-2 px-3 shadow-sm focus:border-lime-500 focus:outline-none focus:ring-lime-500">
                        {OVEN_TYPE_OPTIONS.map(opt => (
                            <option key={opt.value} value={opt.value}>{opt.labelKey}</option>
                        ))}
                    </select>
                </div>
                 <div>
                    <label htmlFor="maxTemperature" className="block text-sm font-medium text-slate-700">Max Temperature (°C)</label>
                    <input type="number" name="maxTemperature" id="maxTemperature" value={formData.maxTemperature} onChange={handleInputChange} className="mt-1 block w-full rounded-md border-slate-300 bg-white py-2 px-3 shadow-sm focus:border-lime-500 focus:outline-none focus:ring-lime-500" />
                </div>
            </div>
             <div className="space-y-2">
                <label className="flex items-center gap-2">
                    <input type="checkbox" name="hasStone" checked={formData.hasStone} onChange={handleInputChange} className="h-4 w-4 rounded border-slate-300 text-lime-600 focus:ring-lime-500" />
                    <span className="text-sm text-slate-700">Has baking stone</span>
                </label>
                 <label className="flex items-center gap-2">
                    <input type="checkbox" name="hasSteel" checked={formData.hasSteel} onChange={handleInputChange} className="h-4 w-4 rounded border-slate-300 text-lime-600 focus:ring-lime-500" />
                    <span className="text-sm text-slate-700">Has baking steel</span>
                </label>
            </div>
            <div>
                <label htmlFor="notes" className="block text-sm font-medium text-slate-700">Notes</label>
                <textarea name="notes" id="notes" value={formData.notes} onChange={handleInputChange} rows={3} className="mt-1 block w-full rounded-md border-slate-300 bg-white py-2 px-3 shadow-sm focus:border-lime-500 focus:outline-none focus:ring-lime-500" placeholder="e.g., Takes 45min to preheat"></textarea>
            </div>
            <div className="flex justify-end gap-4 pt-4 border-t border-slate-200">
                <button type="button" onClick={onClose} className="rounded-md py-2 px-4 text-sm font-semibold text-slate-600 hover:bg-slate-100">Cancel</button>
                <button type="submit" className="rounded-md bg-lime-500 py-2 px-4 text-sm font-semibold text-white shadow-sm hover:bg-lime-600">Save Changes</button>
            </div>
        </form>
      </div>
    </div>
  );
};

export default OvenModal;
