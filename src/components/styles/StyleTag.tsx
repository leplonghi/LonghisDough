
import React from 'react';

interface StyleTagProps {
  label: string;
  color?: 'blue' | 'green' | 'red' | 'yellow' | 'gray' | 'purple';
}

const StyleTag: React.FC<StyleTagProps> = ({ label, color = 'gray' }) => {
  const colors = {
    blue: 'bg-blue-100 text-blue-800 border-blue-200',
    green: 'bg-green-100 text-green-800 border-green-200',
    red: 'bg-red-100 text-red-800 border-red-200',
    yellow: 'bg-yellow-100 text-yellow-800 border-yellow-200',
    gray: 'bg-slate-100 text-slate-800 border-slate-200',
    purple: 'bg-purple-100 text-purple-800 border-purple-200',
  };

  return (
    <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold ${colors[color]}`}>
      {label}
    </span>
  );
};

export default StyleTag;
