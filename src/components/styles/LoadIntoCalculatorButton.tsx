
import React from 'react';
import { CalculatorIcon } from '../IconComponents';

interface LoadIntoCalculatorButtonProps {
  onClick: () => void;
  label?: string;
}

const LoadIntoCalculatorButton: React.FC<LoadIntoCalculatorButtonProps> = ({ onClick, label = "Load into Calculator" }) => {
  return (
    <button
      onClick={onClick}
      className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-lime-500 py-3 px-6 text-base font-bold text-white shadow-md shadow-lime-200 transition-all hover:bg-lime-600 hover:-translate-y-0.5 active:translate-y-0"
    >
      <CalculatorIcon className="h-5 w-5" />
      {label}
    </button>
  );
};

export default LoadIntoCalculatorButton;
