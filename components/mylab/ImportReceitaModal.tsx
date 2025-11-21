
import React, { useState, useRef } from 'react';
import { useTranslation } from '../../i18n';
import { useUser } from '../../contexts/UserProvider';
import { useToast } from '../ToastProvider';
import { importReceitaFromJSON } from '../../services/importService';
import { CloseIcon } from '../IconComponents';

interface ImportReceitaModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ImportReceitaModal: React.FC<ImportReceitaModalProps> = ({ isOpen, onClose }) => {
  const { t } = useTranslation();
  const { addBatch } = useUser();
  const { addToast } = useToast();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type === 'application/json') {
      setSelectedFile(file);
    } else {
      setSelectedFile(null);
      if(file) {
        // FIX: Changed addToast call to conform to new signature
        addToast({message: 'Please select a valid .json file.', type: 'error'});
      }
    }
  };
  
  const resetState = () => {
    setSelectedFile(null);
    setIsLoading(false);
    if (fileInputRef.current) {
        fileInputRef.current.value = '';
    }
  };
  
  const handleClose = () => {
    resetState();
    onClose();
  };

  const handleImport = async () => {
    if (!selectedFile) {
      // FIX: Changed addToast call to conform to new signature
      addToast({message: 'No file selected.', type: 'error'});
      return;
    }
    setIsLoading(true);
    try {
      const newBatchData = await importReceitaFromJSON(selectedFile);
      addBatch(newBatchData);
      // FIX: Changed addToast call to conform to new signature
      addToast({message: 'Recipe imported successfully.', type: 'success'});
      handleClose();
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred.';
      // FIX: Changed addToast call to conform to new signature
      addToast({message: errorMessage, type: 'error'});
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-40 flex items-center justify-center bg-black/60 backdrop-blur-sm animate-[fadeIn_0.3s_ease-out]"
      onClick={handleClose}
      role="dialog"
      aria-modal="true"
    >
      <div
        className="relative mx-4 w-full max-w-lg rounded-2xl bg-white p-6 shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between border-b border-slate-200 pb-4">
          <h2 className="text-xl font-bold text-slate-900">Import Recipe</h2>
          <button onClick={handleClose} className="-mt-2 -mr-2 rounded-full p-1 text-slate-500 hover:bg-slate-200">
            <CloseIcon className="h-6 w-6" />
          </button>
        </div>
        
        <div className="mt-6 space-y-4">
            <p className="text-sm text-slate-600">
                Select a .json file exported from DoughLabPro. Each import creates a new recipe draft.
            </p>
            <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Recipe File</label>
                <input
                    ref={fileInputRef}
                    type="file"
                    accept=".json,application/json"
                    onChange={handleFileChange}
                    className="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-lime-50 file:text-lime-700 hover:file:bg-lime-100"
                />
            </div>
        </div>

        <div className="flex justify-end gap-4 pt-6 mt-6 border-t border-slate-200">
            <button type="button" onClick={handleClose} className="rounded-md py-2 px-4 text-sm font-semibold text-slate-600 hover:bg-slate-100">
                {t('common.cancel')}
            </button>
            <button 
                type="button" 
                onClick={handleImport} 
                disabled={!selectedFile || isLoading}
                className="flex items-center justify-center gap-2 rounded-md bg-lime-500 py-2 px-4 text-sm font-semibold text-white shadow-sm hover:bg-lime-600 disabled:bg-slate-400 disabled:cursor-not-allowed"
            >
                {isLoading ? 'Importing...' : 'Import'}
            </button>
        </div>
      </div>
    </div>
  );
};

export default ImportReceitaModal;