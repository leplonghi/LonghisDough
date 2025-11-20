
import React from 'react';
import { ExclamationCircleIcon } from '../IconComponents';

interface StyleRiskListProps {
  risks: string[];
}

const StyleRiskList: React.FC<StyleRiskListProps> = ({ risks }) => {
  if (!risks || risks.length === 0) return null;

  return (
    <div className="rounded-lg border border-amber-200 bg-amber-50 p-4">
      <h4 className="mb-3 flex items-center gap-2 text-sm font-bold uppercase tracking-wide text-amber-800">
        <ExclamationCircleIcon className="h-4 w-4" />
        Risks & Pitfalls
      </h4>
      <ul className="space-y-2">
        {risks.map((risk, index) => (
          <li key={index} className="flex items-start gap-2 text-sm text-amber-900">
            <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-amber-400" />
            {risk}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default StyleRiskList;
