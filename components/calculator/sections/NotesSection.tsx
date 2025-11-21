
import React, { useState } from 'react';
import { DoughConfig } from '../../../types';
import FormSection from '../AccordionSection';
import { PencilIcon, LockClosedIcon, BookmarkSquareIcon } from '../../IconComponents';
import { useToast } from '../../ToastProvider';
import * as customPresets from '../../../logic/customPresets';

interface NotesSectionProps {
  config: DoughConfig;
  onConfigChange: (newConfig: Partial<DoughConfig>) => void;
  hasProAccess: boolean;
  onOpenPaywall: () => void;
  refreshPresets?: () => void;
}

const NotesSection: React.FC<NotesSectionProps> = ({ config, onConfigChange, hasProAccess, onOpenPaywall, refreshPresets }) => {
  const { addToast } = useToast();

  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onConfigChange({ [e.target.name]: e.target.value });
  };

  const handleSavePreset = () => {
    const name = prompt('Name your preset:');
    if (name && name.trim()) {
      customPresets.saveCustomPreset(name, config);
      // FIX: Changed addToast call to conform to new signature
      addToast({message: `Preset "${name}" saved!`, type: 'success'});
      if (refreshPresets) refreshPresets();
    }
  };

  return (
    <>
        <FormSection title="Notes" description="Log observations about this formula." icon={<PencilIcon className="h-6 w-6" />}>
            <div className="relative">
            <textarea
                id="notes"
                name="notes"
                rows={4}
                value={config.notes || ''}
                onChange={handleTextareaChange}
                placeholder={hasProAccess ? "E.g., Fermented for 24h in the fridge..." : "This is a Pro feature."}
                className="w-full rounded-lg border-slate-300 bg-slate-50 p-2 text-slate-900 focus:border-lime-500 focus:ring-lime-500 disabled:bg-slate-100"
                disabled={!hasProAccess}
            />
            {!hasProAccess && (
                <div
                className="absolute inset-0 z-10 flex cursor-pointer items-center justify-center rounded-lg bg-white/50 backdrop-blur-sm"
                onClick={onOpenPaywall}
                title="Pro Feature"
                >
                <div className="flex items-center gap-2 rounded-full bg-lime-500 px-3 py-1 text-xs font-semibold text-white shadow-md">
                    <LockClosedIcon className="h-4 w-4" />
                    Go Pro
                </div>
                </div>
            )}
            </div>
        </FormSection>

        <FormSection title="Save Custom Preset" description="Save the current configuration for future use." icon={<BookmarkSquareIcon className="h-6 w-6" />}>
                <button
                onClick={handleSavePreset}
                className="w-full flex items-center justify-center gap-2 rounded-md bg-lime-500 py-2 px-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-lime-600"
            >
                Save as Custom Style
            </button>
        </FormSection>
    </>
  );
};

export default NotesSection;