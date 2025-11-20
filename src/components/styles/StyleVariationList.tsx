
import React from 'react';
import { StyleVariation } from '../../types';

interface StyleVariationListProps {
  variations: StyleVariation[];
}

const StyleVariationList: React.FC<StyleVariationListProps> = ({ variations }) => {
  if (!variations || variations.length === 0) return null;

  return (
    <div className="mt-6">
      <h4 className="text-sm font-bold uppercase tracking-wide text-slate-500 mb-3">Common Variations</h4>
      <div className="grid gap-3 sm:grid-cols-2">
        {variations.map((variation, index) => (
          <div key={index} className="rounded-lg border border-slate-200 bg-white p-3 shadow-sm">
            <div className="flex justify-between items-start">
                <p className="font-bold text-slate-800">{variation.name}</p>
                {variation.hydration && (
                    <span className="text-xs font-mono bg-slate-100 px-2 py-0.5 rounded text-slate-600">
                        {variation.hydration}% Hyd.
                    </span>
                )}
            </div>
            {variation.description && <p className="text-xs text-slate-500 mt-1">{variation.description}</p>}
          </div>
        ))}
      </div>
    </div>
  );
};

export default StyleVariationList;
