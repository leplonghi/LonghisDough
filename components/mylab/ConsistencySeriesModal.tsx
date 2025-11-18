import React, { useState, useEffect } from 'react';
import { TestSeries, TestSeriesVariable } from '../../types';
import { CloseIcon } from '../IconComponents';

interface ConsistencySeriesModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (seriesData: Omit<TestSeries, 'id' | 'createdAt' | 'updatedAt' | 'relatedBakes'> | (Partial<TestSeries> & { id: string })) => void;
  seriesToEdit: TestSeries | null;
}

const DEFAULT_STATE = {
    name: '',
    description: '',
    variable: 'hidratação' as TestSeriesVariable,
    steps: '', // will be a string in the form "60, 65, 70"
};

const ConsistencySeriesModal: React.FC<ConsistencySeriesModalProps> = ({ isOpen, onClose, onSave, seriesToEdit }) => {
    const [formData, setFormData] = useState(DEFAULT_STATE);

    useEffect(() => {
        if (seriesToEdit) {
            setFormData({
                name: seriesToEdit.name,
                description: seriesToEdit.description,
                variable: seriesToEdit.parameters.variable,
                steps: seriesToEdit.parameters.steps.join(', '),
            });
        } else {
            setFormData(DEFAULT_STATE);
        }
    }, [seriesToEdit, isOpen]);

    if (!isOpen) return null;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (formData.name.trim() === '' || formData.steps.trim() === '') {
            alert('Nome e Passos são obrigatórios.');
            return;
        }

        const stepsArray = formData.steps.split(',').map(s => {
            const num = parseFloat(s.trim());
            return isNaN(num) ? s.trim() : num;
        });

        const dataToSave = {
            name: formData.name,
            description: formData.description,
            parameters: {
                variable: formData.variable,
                steps: stepsArray,
            }
        };

        if (seriesToEdit) {
            onSave({ id: seriesToEdit.id, ...dataToSave });
        } else {
            onSave(dataToSave);
        }
    };

    const variableOptions: { value: TestSeriesVariable; label: string }[] = [
        { value: 'hidratação', label: 'Hidratação (%)' },
        { value: 'farinha', label: 'Tipo de Farinha' },
        { value: 'tempo_fermentacao', label: 'Tempo de Fermentação (h)' },
        { value: 'outro', label: 'Outro' },
    ];

    return (
        <div
            className="fixed inset-0 z-40 flex items-center justify-center bg-black/60 backdrop-blur-sm animate-[fadeIn_0.3s_ease-out]"
            onClick={onClose}
        >
            <div
                className="relative mx-4 w-full max-w-lg rounded-2xl bg-white p-6 shadow-xl"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="flex items-start justify-between border-b border-slate-200 pb-4">
                    <h2 className="text-xl font-bold text-slate-900">
                        {seriesToEdit ? 'Editar Série de Testes' : 'Criar Nova Série'}
                    </h2>
                    <button onClick={onClose} className="-mt-2 -mr-2 rounded-full p-1 text-slate-500 hover:bg-slate-200">
                        <CloseIcon className="h-6 w-6" />
                    </button>
                </div>
                <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-slate-700">Nome da Série</label>
                        <input type="text" name="name" value={formData.name} onChange={handleChange} required className="mt-1 block w-full rounded-md border-slate-300 bg-white py-2 px-3 shadow-sm focus:border-lime-500" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-700">Descrição</label>
                        <textarea name="description" value={formData.description} onChange={handleChange} rows={2} className="mt-1 block w-full rounded-md border-slate-300 bg-white py-2 px-3 shadow-sm focus:border-lime-500"></textarea>
                    </div>
                     <div className="grid grid-cols-2 gap-4">
                         <div>
                            <label className="block text-sm font-medium text-slate-700">Variável a Testar</label>
                            <select name="variable" value={formData.variable} onChange={handleChange} className="mt-1 block w-full rounded-md border-slate-300 bg-white py-2 px-3 shadow-sm focus:border-lime-500">
                                {variableOptions.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700">Passos (separados por vírgula)</label>
                            <input type="text" name="steps" value={formData.steps} onChange={handleChange} placeholder="60, 62, 64" required className="mt-1 block w-full rounded-md border-slate-300 bg-white py-2 px-3 shadow-sm focus:border-lime-500" />
                        </div>
                     </div>
                    <div className="flex justify-end gap-4 pt-4 border-t border-slate-200">
                        <button type="button" onClick={onClose} className="rounded-md py-2 px-4 text-sm font-semibold text-slate-600 hover:bg-slate-100">Cancelar</button>
                        <button type="submit" className="rounded-md bg-lime-500 py-2 px-4 text-sm font-semibold text-white shadow-sm hover:bg-lime-600">Salvar Série</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ConsistencySeriesModal;