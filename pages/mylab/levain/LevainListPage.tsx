import React, { useState, useEffect, useRef } from 'react';
import { Levain, Page } from '../../../types';
import { useTranslation } from '../../../i18n';
import { BeakerIcon, PlusCircleIcon, DownloadIcon, ShareIcon } from '../../../components/IconComponents';
import { useUser } from '../../../contexts/UserProvider';
import LevainModal from '../../../components/LevainModal';
import { logEvent } from '../../../services/analytics';
import { exportLevainData, importLevainData } from '../../../services/levainDataService';
import { useToast } from '../../../components/ToastProvider';

interface LevainListPageProps {
    onNavigate: (page: Page, params?: string) => void;
}

const LevainListPage: React.FC<LevainListPageProps> = ({ onNavigate }) => {
    const { t } = useTranslation();
    const { user, levains, addLevain, importLevains: importLevainsToContext } = useUser();
    const { addToast } = useToast();
    const [isLoading, setIsLoading] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (user) {
            logEvent('levain_pet_opened', { userId: user.email });
        }
    }, [user]);

    // FIX: Changed the type of levainData to match the `onSave` prop of `LevainModal` and handle data transformation before calling `addLevain`.
    const handleSaveLevain = (levainData: Omit<Levain, 'id' | 'isDefault' | 'feedingHistory'> | (Partial<Levain> & { id: string })) => {
        // This component only creates levains.
        if (!('id' in levainData)) {
            const { createdAt, status, ...restOfData } = levainData;
            addLevain(restOfData as Omit<Levain, 'id' | 'isDefault' | 'feedingHistory' | 'status' | 'createdAt'>);
        }
        setIsModalOpen(false);
    };
    
    const formatTimeSince = (dateString: string) => {
        if (!dateString) return 'nunca';
        const seconds = Math.floor((new Date().getTime() - new Date(dateString).getTime()) / 1000);
        let interval = seconds / 31536000;
        if (interval > 1) return `aprox. ${Math.floor(interval)} anos`;
        interval = seconds / 2592000;
        if (interval > 1) return `aprox. ${Math.floor(interval)} meses`;
        interval = seconds / 86400;
        if (interval > 1) return `aprox. ${Math.floor(interval)} dias`;
        interval = seconds / 3600;
        if (interval > 1) return `aprox. ${Math.floor(interval)} horas`;
        interval = seconds / 60;
        if (interval > 1) return `aprox. ${Math.floor(interval)} minutos`;
        return `aprox. ${Math.floor(seconds)} segundos`;
    };

    const handleExport = () => {
        const jsonString = exportLevainData(levains);
        const blob = new Blob([jsonString], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `doughlabpro_levain_backup_${new Date().toISOString().split('T')[0]}.json`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        addToast('Dados exportados com sucesso.', 'success');
    };

    const handleImportClick = () => {
        fileInputRef.current?.click();
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (e) => {
            const text = e.target?.result;
            if (typeof text === 'string') {
                const result = importLevainData(text);
                if (result.error) {
                    addToast(result.error, 'error');
                } else {
                    importLevainsToContext(result.newLevains);
                    addToast('Dados do Levain Pet importados com sucesso.', 'success');
                }
            }
        };
        reader.readAsText(file);
        event.target.value = ''; // Reset file input
    };

    const statusStyles = {
        ativo: { text: 'Ativo', color: 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300' },
        precisa_atencao: { text: 'Precisa de Atenção', color: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-300' },
        descanso: { text: 'Em Descanso', color: 'bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300' },
        arquivado: { text: 'Arquivado', color: 'bg-neutral-100 text-neutral-800 dark:bg-neutral-700 dark:text-neutral-300' },
    };
    
    if (isLoading) {
        return <div className="p-8 text-center">Carregando...</div>;
    }

    return (
        <>
        <div className="mx-auto max-w-7xl animate-[fadeIn_0.5s_ease-in-out]">
            <div className="mb-8 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
                <div>
                    <h1 className="text-2xl font-semibold tracking-tight text-neutral-900 dark:text-white">
                        Levain Pet
                    </h1>
                    <p className="mt-2 text-sm text-neutral-500">
                        Acompanhe seus starters como parceiros do seu laboratório de massas.
                    </p>
                </div>
                 <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="inline-flex items-center justify-center gap-2 rounded-lg bg-lime-500 py-2 px-4 font-semibold text-white shadow-md transition-all hover:bg-lime-600"
                    >
                        <PlusCircleIcon className="h-5 w-5"/>
                        <span>Adicionar levain</span>
                    </button>
                    <div className="flex gap-2">
                         <button onClick={handleImportClick} className="w-full inline-flex items-center justify-center gap-2 rounded-lg bg-neutral-200 py-2 px-4 font-semibold text-neutral-700 shadow-sm hover:bg-neutral-300 dark:bg-neutral-700 dark:text-neutral-200 dark:hover:bg-neutral-600">
                            <DownloadIcon className="h-5 w-5"/> Importar
                         </button>
                         <button onClick={handleExport} disabled={levains.length === 0} className="w-full inline-flex items-center justify-center gap-2 rounded-lg bg-neutral-200 py-2 px-4 font-semibold text-neutral-700 shadow-sm hover:bg-neutral-300 dark:bg-neutral-700 dark:text-neutral-200 dark:hover:bg-neutral-600 disabled:opacity-50">
                            <ShareIcon className="h-5 w-5"/> Exportar
                         </button>
                         <input type="file" ref={fileInputRef} onChange={handleFileChange} accept=".json" style={{ display: 'none' }} />
                    </div>
                </div>
            </div>

            {levains.length === 0 ? (
                <div className="text-center rounded-xl border border-neutral-200 bg-neutral-50 dark:border-neutral-700 p-10 shadow-sm">
                    <BeakerIcon className="mx-auto h-12 w-12 text-lime-400" />
                    <h2 className="mt-4 text-lg font-medium text-neutral-900 dark:text-white">
                        Você ainda não tem um Levain Pet.
                    </h2>
                    <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-300">
                        Crie seu primeiro starter e acompanhe tudo — alimentação, rotina, observações e uso nas receitas.
                    </p>
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="mt-6 rounded-md bg-lime-500 py-2 px-4 font-semibold text-white shadow-sm hover:bg-lime-600"
                    >
                        Criar Levain
                    </button>
                </div>
            ) : (
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {levains.map(starter => {
                        return (
                        <div key={starter.id} className="rounded-xl border border-neutral-200 bg-white p-6 shadow-sm transition-all hover:shadow-lg dark:border-neutral-700 dark:bg-neutral-800">
                            <div className="flex items-start justify-between">
                                <h3 className="text-lg font-medium text-neutral-900 dark:text-white">{starter.name}</h3>
                                <span className={`px-2 py-1 text-xs font-semibold rounded-full ${statusStyles[starter.status].color}`}>
                                    {statusStyles[starter.status].text}
                                </span>
                            </div>
                             <p className="mt-2 text-sm text-neutral-500 dark:text-neutral-400">
                                Última alimentação: há {formatTimeSince(starter.lastFeeding)}
                             </p>
                             <div className="mt-4 border-t border-neutral-200 dark:border-neutral-700 pt-4">
                                <button
                                    onClick={() => onNavigate('mylab/levain/detail', starter.id)}
                                    className="text-sm font-semibold text-lime-600 hover:underline dark:text-lime-400"
                                >
                                    Ver Detalhes &rarr;
                                </button>
                             </div>
                        </div>
                    )})}
                </div>
            )}
        </div>
        <LevainModal 
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            onSave={handleSaveLevain}
            levainToEdit={null}
        />
        </>
    );
};

export default LevainListPage;