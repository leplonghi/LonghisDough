import React from 'react';
import { SparklesIcon } from './IconComponents';

interface FloatingActionButtonProps {
  onClick: () => void;
  label: string;
  isShifted?: boolean;
}

const FloatingActionButton: React.FC<FloatingActionButtonProps> = ({ onClick, label, isShifted = false }) => {
  const positionClass = isShifted ? 'bottom-20' : 'bottom-6';

  return (
    <button
      onClick={onClick}
      className={`fixed right-6 z-20 flex items-center gap-2 rounded-full bg-lime-500 py-3 px-5 text-base font-semibold text-white shadow-lg transition-all duration-300 hover:scale-105 hover:bg-lime-600 focus:outline-none focus:ring-2 focus:ring-lime-500 focus:ring-offset-2 ${positionClass}`}
      aria-label={label}
    >
      <SparklesIcon className="h-6 w-6" />
      <span className="hidden sm:inline">Doughy</span>
    </button>
  );
};

export default FloatingActionButton;
