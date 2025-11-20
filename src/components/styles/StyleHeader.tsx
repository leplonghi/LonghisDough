
import React from 'react';
import { DoughStyle } from '../../types';
import StyleTag from './StyleTag';
import { GlobeAltIcon } from '../IconComponents';

interface StyleHeaderProps {
  style: DoughStyle;
}

const StyleHeader: React.FC<StyleHeaderProps> = ({ style }) => {
  return (
    <header className="mb-6">
      <div className="flex flex-wrap items-center gap-3 mb-3">
        <StyleTag label={style.category} color="blue" />
        <span className="flex items-center gap-1 text-xs font-medium text-slate-500">
          <GlobeAltIcon className="h-3 w-3" />
          {style.country}
        </span>
        {style.year && <span className="text-xs text-slate-400">• {style.year}</span>}
      </div>
      <h1 className="text-3xl font-extrabold text-slate-900 sm:text-4xl">{style.name}</h1>
      {style.description && <p className="mt-4 text-lg text-slate-600 leading-relaxed">{style.description}</p>}
    </header>
  );
};

export default StyleHeader;
