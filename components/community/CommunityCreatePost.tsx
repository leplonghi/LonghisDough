
import React, { useState, useMemo } from 'react';
import { PhotoIcon, ExclamationCircleIcon } from '@/components/ui/Icons';
import { OVEN_TYPE_OPTIONS } from '@/constants';
import { useUser } from '@/contexts/UserProvider';
import { getLastSavedConfig } from '@/logic/mylabSelectors';
import { useToast } from '@/components/ToastProvider';
import { blobToBase64 } from '@/helpers';

const MAX_DESC_LENGTH = 600;

const CommunityCreatePost: React.FC = () => {
    const { batches } = useUser();
    const { addToast } = useToast();
    const lastBatch = useMemo(() => getLastSavedConfig(batches), [batches]);
    
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [photoPreview, setPhotoPreview] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const base64 = await blobToBase64(file);
            setPhotoPreview(base64);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!title.trim() || !photoPreview) {
            addToast('Foto e nome da receita são obrigatórios.', 'error');
            return;
        }
        setIsSubmitting(true);
        setTimeout(() => {
            // In a real app, this would be an async call to Firebase/Firestore
            addToast('Publicação criada com sucesso!', 'success');
            setTitle('');
            setDescription('');
            setPhotoPreview(null);
            setIsSubmitting(false);
        }, 1000);
    };

    return (
        <aside className="lg:sticky lg:top-24">
            <div className="rounded-lg bg-white p-6 shadow-sm ring-1 ring-slate-200/50">
                <h2 className="text-lg font-bold text-slate-800 mb-4">
                    Criar Publicação
                </h2>

                {!lastBatch && (
                     <div className="flex items-start gap-3 rounded-md bg-yellow-50 p-3 text-yellow-900 ring-1 ring-inset ring-yellow-200 mb-4">
                        <ExclamationCircleIcon className="h-5 w-5 flex-shrink-0 text-yellow-500" />
                        <p className="text-sm font-medium">Você precisa registrar uma fornada no "Meu Lab" para preencher os dados automaticamente.</p>
                    </div>
                )}

                <form className="space-y-4" onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="photo-upload" className="flex flex-col items-center justify-center w-full h-32 border-2 border-slate-300 border-dashed rounded-lg cursor-pointer bg-slate-50 hover:bg-slate-100">
                           {photoPreview ? (
                                <img src={photoPreview} alt="Preview" className="w-full h-full object-cover rounded-lg" />
                           ) : (
                             <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                <PhotoIcon className="w-8 h-8 mb-3 text-slate-400" />
                                <p className="mb-2 text-sm text-slate-500"><span className="font-semibold">Clique para enviar</span></p>
                                <p className="text-xs text-slate-500">PNG, JPG</p>
                            </div>
                           )}
                            <input id="photo-upload" type="file" className="hidden" accept="image/png, image/jpeg" onChange={handleFileChange} />
                        </label>
                    </div>

                    <div>
                        <label htmlFor="recipe-name" className="block text-sm font-medium text-slate-700">Nome da Receita</label>
                        <input type="text" id="recipe-name" value={title} onChange={e => setTitle(e.target.value)} placeholder="Ex: Pizza Napolitana 72h" className="mt-1 block w-full rounded-md border-slate-300 bg-white py-2 px-3 shadow-sm focus:border-lime-500 focus:outline-none focus:ring-lime-500 sm:text-sm" />
                    </div>

                    <div>
                        <label htmlFor="description" className="block text-sm font-medium text-slate-700">Descrição</label>
                        <textarea id="description" rows={3} value={description} onChange={e => setDescription(e.target.value)} maxLength={MAX_DESC_LENGTH} className="mt-1 block w-full rounded-md border-slate-300 bg-white py-2 px-3 shadow-sm focus:border-lime-500 focus:outline-none focus:ring-lime-500 sm:text-sm" placeholder="Conte um pouco sobre sua fornada..."></textarea>
                        <p className="text-right text-xs mt-1 text-slate-400">{description.length} / {MAX_DESC_LENGTH}</p>
                    </div>

                     <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label htmlFor="oven-type" className="block text-sm font-medium text-slate-700">Forno</label>
                             <select id="oven-type" defaultValue={lastBatch?.ovenType} disabled={!lastBatch} className="mt-1 block w-full rounded-md border-slate-300 bg-slate-100 py-2 px-3 shadow-sm sm:text-sm disabled:opacity-50">
                                {OVEN_TYPE_OPTIONS.map(opt => <option key={opt.value} value={opt.value}>{opt.labelKey.split('.').pop()}</option>)}
                            </select>
                        </div>
                        <div>
                            <label htmlFor="hydration" className="block text-sm font-medium text-slate-700">Hidratação (%)</label>
                            <input type="number" id="hydration" value={lastBatch?.doughConfig.hydration || ''} disabled className="mt-1 block w-full rounded-md border-slate-300 bg-slate-100 py-2 px-3 shadow-sm sm:text-sm disabled:opacity-50" />
                        </div>
                     </div>
                     
                    <button type="submit" disabled={isSubmitting || !lastBatch} className="w-full rounded-md bg-lime-500 py-2 px-4 text-sm font-semibold text-white shadow-sm hover:bg-lime-600 disabled:bg-slate-400 disabled:cursor-not-allowed">
                        {isSubmitting ? 'Publicando...' : 'Publicar'}
                    </button>
                </form>
            </div>
        </aside>
    );
};

export default CommunityCreatePost;
