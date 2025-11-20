
import React from 'react';
import { LightBulbIcon } from '../IconComponents';

interface StyleNoteListProps {
  notes: string[];
}

const StyleNoteList: React.FC<StyleNoteListProps> = ({ notes }) => {
  if (!notes || notes.length === 0) return null;

  return (
    <div className="rounded-lg border border-blue-200 bg-blue-50 p-4">
      <h4 className="mb-3 flex items-center gap-2 text-sm font-bold uppercase tracking-wide text-blue-800">
        <LightBulbIcon className="h-4 w-4" />
        Pro Tips
      </h4>
      <ul className="space-y-2">
        {notes.map((note, index) => (
          <li key={index} className="flex items-start gap-2 text-sm text-blue-900">
            <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-blue-400" />
            {note}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default StyleNoteList;
