import React, { useState, useEffect, useCallback, createContext, useContext, ReactNode } from 'react';
import { CheckCircleIcon, ExclamationCircleIcon, InfoIcon, CloseIcon } from './IconComponents';

type ToastType = 'success' | 'error' | 'info';

interface ToastMessage {
  id: number;
  message: string;
  type: ToastType;
}

interface ToastContextType {
  addToast: (message: string, type: ToastType) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

let toastId = 0;

export const ToastProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const addToast = useCallback((message: string, type: ToastType) => {
    setToasts((prevToasts) => [...prevToasts, { id: toastId++, message, type }]);
  }, []);

  const removeToast = useCallback((id: number) => {
    setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ addToast }}>
      {children}
      <ToastContainer toasts={toasts} removeToast={removeToast} />
    </ToastContext.Provider>
  );
};

export const useToast = (): ToastContextType => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};

interface ToastContainerProps {
  toasts: ToastMessage[];
  removeToast: (id: number) => void;
}

const ToastContainer: React.FC<ToastContainerProps> = ({
  toasts,
  removeToast,
}) => {
  return (
    <div className="fixed top-4 right-4 z-50 w-full max-w-xs space-y-3">
      {toasts.map((toast) => (
        <Toast key={toast.id} toast={toast} onDismiss={removeToast} />
      ))}
    </div>
  );
};

interface ToastProps {
  toast: ToastMessage;
  onDismiss: (id: number) => void;
}

const Toast: React.FC<ToastProps> = ({ toast, onDismiss }) => {
  const ICONS: Record<ToastType, React.ReactNode> = {
    success: <CheckCircleIcon className="h-6 w-6 text-green-500" />,
    error: <ExclamationCircleIcon className="h-6 w-6 text-red-500" />,
    info: <InfoIcon className="h-6 w-6 text-blue-500" />,
  };

  const BG_COLORS: Record<ToastType, string> = {
    success:
      'bg-green-50 border-green-200',
    error: 'bg-red-50 border-red-200',
    info: 'bg-blue-50 border-blue-200',
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      onDismiss(toast.id);
    }, 5000);

    return () => {
      clearTimeout(timer);
    };
  }, [toast.id, onDismiss]);

  return (
    <div
      className={`relative flex w-full items-start gap-3 overflow-hidden rounded-lg border p-4 shadow-lg ring-1 ring-black ring-opacity-5 animate-slide-in-right ${
        BG_COLORS[toast.type]
      }`}
      role="alert"
    >
      <div className="flex-shrink-0">{ICONS[toast.type]}</div>
      <div className="flex-1 text-sm font-medium text-slate-800">
        {toast.message}
      </div>
      <div className="flex-shrink-0">
        <button
          onClick={() => onDismiss(toast.id)}
          className="-m-1.5 rounded-full p-1.5 text-slate-500 hover:bg-slate-200/50"
          aria-label="Dismiss"
        >
          <CloseIcon className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
};
