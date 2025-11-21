import React from 'react';

interface ChoiceButtonProps {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
  className?: string;
}

export const ChoiceButton: React.FC<ChoiceButtonProps> = ({ active, onClick, children, className = '' }) => (
  <button
    type="button"
    onClick={onClick}
    className={`w-full rounded-lg px-4 py-2 text-center text-sm font-medium transition-all duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-lime-500 focus:ring-offset-2 ${
      active
        ? 'bg-lime-500 text-white font-semibold shadow-md'
        : 'bg-slate-200 text-slate-700 hover:bg-slate-300'
    } ${className}`}
  >
    {children}
  </button>
);

export default ChoiceButton;