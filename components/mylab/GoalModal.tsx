import React, { useState, useEffect } from 'react';
import { Goal, GoalTargetType } from '../../types';
import { CloseIcon } from '../IconComponents';

interface GoalModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (goalData: Omit<Goal, 'id' | 'createdAt' | 'updatedAt' | 'status' | 'progress'> | (Partial<Goal> & { id: string })) => void;
  goalToEdit: Goal | null;
}

const DEFAULT_STATE = {
    title: '',
    description: '',
    targetType: 'estilo' as GoalTargetType,
    targetValue: '',
};

const GoalModal: React.FC<GoalModalProps> = ({ isOpen, onClose, onSave, goalToEdit }) => {
    const [formData, setFormData] = useState(DEFAULT_STATE);

    useEffect(() => {
        if (goalToEdit) {
            setFormData({
                title: goalToEdit.title,
                description: goalToEdit.description,
                targetType: goalToEdit.targetType,
                targetValue: String(goalToEdit.targetValue),
            });
        } else {
            setFormData(DEFAULT_STATE);
        }
    }, [goalToEdit, isOpen]);

    if (!isOpen) return null;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (formData.title.trim() === '') {
            alert('O título do objetivo é obrigatório.');
            return;
        }
        
        const dataToSave = {
            ...formData,
            targetValue: formData.targetType === 'hidratação' ? Number(formData.targetValue) : formData.targetValue,
        };

        if (goalToEdit) {
            onSave({ id: goalToEdit.id, ...dataToSave });
        } else {
            onSave(dataToSave);
        }
    };

    const targetTypeOptions = [
        { value: 'estilo', label: 'Estilo' },
        { value: 'hidratação', label: 'Hidratação' },
        { value: 'frequência', label: 'Frequência' },
        { value: 'levain', label: 'Levain' },
    ];

    return (
        <div
            className="fixed inset-0 z-40 flex items-center justify-center bg-black/60 backdrop-blur-sm animate-[fadeIn_0.3s_ease-out]"
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
                        {goalToEdit ? 'Editar Objetivo' : 'Criar Novo Objetivo'}
                    </h2>
                    <button onClick={onClose} className="-mt-2 -mr-2 rounded-full p-1 text-slate-500 hover:bg-slate-200">
                        <CloseIcon className="h-6 w-6" />
                    </button>
                </div>
                <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-slate-700">Título</label>
                        <input type="text" name="title" value={formData.title} onChange={handleChange} required className="mt-1 block w-full rounded-md border-slate-300 bg-white py-2 px-3 shadow-sm focus:border-lime-500" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-700">Descrição</label>
                        <textarea name="description" value={formData.description} onChange={handleChange} rows={3} className="mt-1 block w-full rounded-md border-slate-300 bg-white py-2 px-3 shadow-sm focus:border-lime-500"></textarea>
                    </div>
                     <div className="grid grid-cols-2 gap-4">
                         <div>
                            <label className="block text-sm font-medium text-slate-700">Tipo de Alvo</label>
                            <select name="targetType" value={formData.targetType} onChange={handleChange} className="mt-1 block w-full rounded-md border-slate-300 bg-white py-2 px-3 shadow-sm focus:border-lime-500">
                                {targetTypeOptions.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700">Valor do Alvo</label>
                            <input 
                                type={formData.targetType === 'hidratação' ? 'number' : 'text'}
                                name="targetValue"
                                value={formData.targetValue}
                                onChange={handleChange} 
                                className="mt-1 block w-full rounded-md border-slate-300 bg-white py-2 px-3 shadow-sm focus:border-lime-500" />
                        </div>
                     </div>
                    <div className="flex justify-end gap-4 pt-4 border-t border-slate-200">
                        <button type="button" onClick={onClose} className="rounded-md py-2 px-4 text-sm font-semibold text-slate-600 hover:bg-slate-100">Cancelar</button>
                        <button type="submit" className="rounded-md bg-lime-500 py-2 px-4 text-sm font-semibold text-white shadow-sm hover:bg-lime-600">Salvar Objetivo</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default GoalModal;