
import React from 'react';
import { StyleTechnicalMatrix } from '../../types';
import { BeakerIcon, FireIcon, ClockIcon } from '../IconComponents';

interface StyleTechnicalBlockProps {
  technical: StyleTechnicalMatrix;
}

const StyleTechnicalBlock: React.FC<StyleTechnicalBlockProps> = ({ technical }) => {
  return (
    <div className="rounded-xl border border-slate-200 bg-slate-50 p-5">
      <h3 className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-slate-500 mb-4">
        <BeakerIcon className="h-4 w-4" />
        Technical Profile
      </h3>
      
      <div className="grid grid-cols-2 gap-x-8 gap-y-4 text-sm">
        <div className="flex justify-between border-b border-slate-200 pb-2">
          <span className="text-slate-600">Hydration</span>
          <span className="font-mono font-bold text-slate-900">{technical.hydration[0]}–{technical.hydration[1]}%</span>
        </div>
        <div className="flex justify-between border-b border-slate-200 pb-2">
          <span className="text-slate-600">Salt</span>
          <span className="font-mono font-bold text-slate-900">{technical.salt[0]}–{technical.salt[1]}%</span>
        </div>
        <div className="flex justify-between border-b border-slate-200 pb-2">
          <span className="text-slate-600">Fat/Oil</span>
          <span className="font-mono font-bold text-slate-900">{technical.fat[0]}–{technical.fat[1]}%</span>
        </div>
        <div className="flex justify-between border-b border-slate-200 pb-2">
          <span className="text-slate-600">Sugar</span>
          <span className="font-mono font-bold text-slate-900">{technical.sugar[0]}–{technical.sugar[1]}%</span>
        </div>
        <div className="col-span-2 pt-2">
           <div className="flex items-start gap-2 mb-3">
               <ClockIcon className="h-4 w-4 text-slate-400 mt-0.5" />
               <div>
                   <p className="font-bold text-slate-800">Fermentation</p>
                   <p className="text-slate-600">{technical.fermentation.description}</p>
                   <p className="text-xs text-slate-500 mt-1">{technical.fermentation.ranges.join(', ')}</p>
               </div>
           </div>
           <div className="flex items-start gap-2">
               <FireIcon className="h-4 w-4 text-slate-400 mt-0.5" />
               <div>
                   <p className="font-bold text-slate-800">Oven Temp</p>
                   <p className="text-slate-600">{technical.ovenTemp || technical.bakingTempC + '°C'}</p>
               </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default StyleTechnicalBlock;
