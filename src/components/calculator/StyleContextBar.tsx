
import React, { useState } from 'react';
import { DoughStyleDefinition } from '@/types';
import { BookOpenIcon, ChevronDownIcon, GlobeAltIcon, SparklesIcon } from '@/components/ui/Icons';

interface StyleContextBarProps {
  style: DoughStyleDefinition;
}

const StyleContextBar: React.FC<StyleContextBarProps> = ({ style }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="rounded-lg border border-slate-200 bg-white shadow-sm mb-6 overflow-hidden">
      {/* Header Bar */}
      <div 
        onClick={() => setIsExpanded(!isExpanded)}
        className="flex items-center justify-between p-4 cursor-pointer bg-slate-50 hover:bg-slate-100 transition-colors"
      >
        <div className="flex items-center gap-3">
          <div className="p-2 bg-white rounded-full border border-slate-200 shadow-sm text-lime-600">
            {style.source === 'official' ? <BookOpenIcon className="h-5 w-5" /> : <SparklesIcon className="h-5 w-5" />}
          </div>
          <div>
            <p className="text-[10px] uppercase font-bold tracking-wider text-slate-500">
                Active Style • {style.family}
            </p>
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                {style.name}
                {style.origin && (
                    <span className="text-xs font-normal text-slate-500 flex items-center gap-1 bg-white px-2 py-0.5 rounded-full border border-slate-200">
                        <GlobeAltIcon className="h-3 w-3" />
                        {style.origin.country}
                    </span>
                )}
            </h3>
          </div>
        </div>
        <div className={`text-slate-400 transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`}>
             <ChevronDownIcon className="h-5 w-5" />
        </div>
      </div>

      {/* Expanded Content */}
      {isExpanded && (
        <div className="p-4 border-t border-slate-200 bg-white animate-fade-in">
             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 <div>
                     <h4 className="text-xs font-bold uppercase text-slate-400 mb-2">Description</h4>
                     <p className="text-sm text-slate-700 leading-relaxed">{style.description}</p>
                     
                     {style.history && (
                         <div className="mt-4">
                             <h4 className="text-xs font-bold uppercase text-slate-400 mb-2">History</h4>
                             <p className="text-xs text-slate-600">{style.history}</p>
                         </div>
                     )}
                 </div>
                 <div>
                     {style.culturalContext && (
                         <div className="mb-4">
                             <h4 className="text-xs font-bold uppercase text-slate-400 mb-2">Cultural Context</h4>
                             <p className="text-xs text-slate-600 italic">"{style.culturalContext}"</p>
                         </div>
                     )}
                     
                     {style.references && style.references.length > 0 && (
                         <div>
                             <h4 className="text-xs font-bold uppercase text-slate-400 mb-2">Validated Sources</h4>
                             <ul className="text-xs text-slate-500 space-y-1">
                                 {style.references.map((ref, i) => (
                                     <li key={i} className="flex items-center gap-1">
                                         • {ref.source}
                                     </li>
                                 ))}
                             </ul>
                         </div>
                     )}
                     
                     {style.technicalProfile && (
                         <div className="mt-4 p-3 bg-slate-50 rounded-lg border border-slate-100">
                            <h4 className="text-xs font-bold uppercase text-slate-400 mb-2">Technical Profile</h4>
                            <div className="grid grid-cols-2 gap-2 text-xs">
                                <div>
                                    <span className="text-slate-500">Hydration:</span>
                                    <span className="font-bold text-slate-700 ml-1">{style.technicalProfile.hydration[0]}-{style.technicalProfile.hydration[1]}%</span>
                                </div>
                                <div>
                                    <span className="text-slate-500">Salt:</span>
                                    <span className="font-bold text-slate-700 ml-1">{style.technicalProfile.salt[0]}-{style.technicalProfile.salt[1]}%</span>
                                </div>
                            </div>
                         </div>
                     )}
                 </div>
             </div>
        </div>
      )}
    </div>
  );
};

export default StyleContextBar;
