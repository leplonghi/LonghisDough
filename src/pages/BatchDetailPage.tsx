
import React, { useState, useEffect } from 'react';
import { useUser } from '@/contexts/UserProvider';
import { Batch, BatchStatus, Page, CommunityBatch, DoughConfig, DoughResult } from '@/types';
import { useTranslation } from '@/i18n';
import { useToast } from '@/components/ToastProvider';
import {
  SaveIcon,
  StarIcon,
  SolidStarIcon,
  PencilIcon,
  InfoIcon,
  BatchesIcon,
  DocumentDuplicateIcon,
  TrashIcon,
  DownloadIcon,
  PhotoIcon,
  YeastIcon,
  ClockIcon,
  FireIcon
} from '@/components/ui/Icons';
import { saveCommunityBatch } from '@/data/communityStore';
import { FLOURS } from '@/flours-constants';
import { exportBatchToPDF } from '@/services/exportService';

interface BatchDetailPageProps {
  batchId: string | null;
  onNavigate: (page: Page, params?: string) => void;
  onLoadAndNavigate: (config: DoughConfig) => void;
}

const DetailRow: React.FC<{ label: string; value: React.ReactNode }> = ({ label, value }) => (
    <div>
        <dt className="text-sm font-medium text-slate-500">{label}</dt>
        <dd className="mt-1 text-slate-900">{value}</dd>
    </div>
);

const ResultBadge: React.FC<{ rating?: number }> = ({ rating }) => {
    const { t } = useTranslation();
    if (!rating || rating < 1) return null;

    let text = t('batch_detail.badge.adjust');
    let color = 'bg-yellow-100 text-yellow-800';
    if (rating >= 4.5) {
        text = t('batch_detail.badge.great');
        color = 'bg-green-100 text-green-800';
    } else if (rating >= 3.5) {
        text = t('batch_detail.badge.good');
        color = 'bg-blue-100 text-blue-800';
    } else if (rating >= 2.5) {
        text = t('batch_detail.badge.regular');
        color = 'bg-orange-100 text-orange-800';
    }
    return <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${color}`}>{text}</span>;
};

const KeyStatCard: React.FC<{ label: string; value: React.ReactNode; icon: React.ReactNode }> = ({ label, value, icon }) => (
    <div className="flex items-center gap-3">
        <div className="flex-shrink-0 text-slate-400">{icon}</div>
        <div>
            <dt className="text-sm text-slate-500">{label}</dt>
            <dd className="font-semibold text-slate-900">{value}</dd>
        </div>
    </div>
);

const IngredientTable: React.FC<{ result: DoughResult, doughConfig: DoughConfig }> = ({ result, doughConfig }) => {
    const { t } = useTranslation();
    const renderRow = (label: string, value: number, note?: string) => (
        <tr className="border-b border-slate-200">
            <td className="py-2 pr-2 font-medium">{label}</td>
            <td className="py-2 text-right font-mono">{value.toFixed(1)}g</td>
            {note && <td className="py-2 pl-4 text-right text-xs text-slate-500">{note}</td>}
        </tr>
    );

    return (
        <table className="w-full text-sm">
            <thead>
                <tr className="border-b-2 border-slate-300">
                    <th className="text-left py-2">Ingredient</th>
                    <th className="text-right py-2">Quantity</th>
                    <th className="text-right py-2"></th>
                </tr>
            </thead>
            <tbody>
                {result.preferment && (
                    <>
                        <tr className="bg-slate-50">
                            <td colSpan={3} className="py-1 px-2 font-bold text-xs uppercase tracking-wider text-slate-600">{t(`form.${doughConfig.fermentationTechnique.toLowerCase()}`)}</td>
                        </tr>
                        {renderRow('Flour', result.preferment.flour)}
                        {renderRow('Water', result.preferment.water)}
                        {result.preferment.yeast > 0 && renderRow('Yeast', result.preferment.yeast)}
                        <tr className="bg-slate-50">
                            <td colSpan={3} className="py-1 px-2 font-bold text-xs uppercase tracking-wider text-slate-600">{t('results.final_dough_title')}</td>
                        </tr>
                        {result.finalDough && renderRow(t(`form.${doughConfig.fermentationTechnique.toLowerCase()}`), result.preferment.flour + result.preferment.water + result.preferment.yeast)}
                    </>
                )}
                {result.finalDough ? (
                    <>
                        {renderRow(t('results.flour'), result.finalDough.flour)}
                        {renderRow(t('results.water'), result.finalDough.water)}
                        {renderRow(t('results.salt'), result.finalDough.salt, `${doughConfig.salt.toFixed(1)}%`)}
                        {result.finalDough.oil > 0 && renderRow(t('results.oil'), result.finalDough.oil, `${doughConfig.oil.toFixed(1)}%`)}
                        {result.finalDough.yeast > 0 && renderRow(t('results.yeast'), result.finalDough.yeast)}
                    </>
                ) : (
                    <>
                        {renderRow(t('results.flour'), result.totalFlour)}
                        {renderRow(t('results.water'), result.totalWater, `${doughConfig.hydration}%`)}
                        {renderRow(t('results.salt'), result.totalSalt, `${doughConfig.salt}%`)}
                        {result.totalOil > 0 && renderRow(t('results.oil'), result.totalOil, `${doughConfig.oil}%`)}
                        {result.totalYeast > 0 && renderRow(t('results.yeast'), result.totalYeast)}
                    </>
                )}
                 <tr className="border-t-2 border-slate-300">
                    <td className="py-2 font-bold">{t('results.total_dough')}</td>
                    <td className="py-2 text-right font-bold font-mono">{result.totalDough.toFixed(0)}g</td>
                    <td></td>
                </tr>
            </tbody>
        </table>
    );
};

const BatchDetailPage: React.FC<BatchDetailPageProps> = ({ batchId, onNavigate, onLoadAndNavigate }) => {
  const { user, batches, updateBatch, addBatch, deleteBatch, hasProAccess, openPaywall } = useUser();
  const { t } = useTranslation();
  const { addToast } = useToast();

  const [editableBatch, setEditableBatch] = useState<Batch | null>(null);
  const [isEditingNotes, setIsEditingNotes] = useState(false);
  const [tempNotes, setTempNotes] = useState('');

  useEffect(() => {
    const foundBatch = batches.find((b) => b.id === batchId);
    if (foundBatch) {
      setEditableBatch(JSON.parse(JSON.stringify(foundBatch)));
      setIsEditingNotes(!foundBatch.notes);
    } else {
      setEditableBatch(null);
    }
  }, [batchId, batches]);
  
  const handleRatingChange = (newRating: number) => {
    if (!editableBatch) return;
    setEditableBatch({ ...editableBatch, rating: editableBatch.rating === newRating ? undefined : newRating });
  };

  const handleSaveNotesClick = () => {
    if (!editableBatch) return;
    setEditableBatch({ ...editableBatch, notes: tempNotes });
    setIsEditingNotes(false);
  };
  
  const handleSave = async () => {
    if (editableBatch) {
      await updateBatch(editableBatch);
      if (editableBatch.isPublic) {
          const communityVersion: CommunityBatch = {
              id: editableBatch.id,
              ownerDisplayName: user?.name || t('batch_detail.anonymous'),
              title: editableBatch.name,
              description: editableBatch.notes,
              createdAt: editableBatch.createdAt,
              baseConfig: editableBatch.doughConfig,
              styleId: editableBatch.doughConfig.recipeStyle,
              hydrationPercentage: editableBatch.doughConfig.hydration,
              ratingAverage: editableBatch.rating,
              bakingTempC: editableBatch.doughConfig.bakingTempC,
          };
          saveCommunityBatch(communityVersion);
      }
      addToast(t('info.update_success'), 'success');
    }
  };

  const handleDuplicate = async () => {
      if(!editableBatch) return;
      const savedBatches = batches.filter(b => b.status !== BatchStatus.DRAFT);
      if (!hasProAccess && savedBatches.length >= 1) {
          openPaywall('mylab');
          return;
      }

      const newBatchData: Omit<Batch, 'id' | 'createdAt'|'updatedAt'> = {
          ...JSON.parse(JSON.stringify(editableBatch)),
          name: `${editableBatch.name} (Copy)`,
          status: BatchStatus.DRAFT,
          rating: undefined,
          isPublic: false,
      };
      const added = await addBatch(newBatchData);
      addToast(`Batch "${editableBatch.name}" duplicated.`, 'success');
      onNavigate('batch', added.id);
  };
  
  const handleDelete = async () => {
    if(editableBatch && window.confirm(t('confirmations.delete_batch', {name: editableBatch.name}))) {
        await deleteBatch(editableBatch.id);
        onNavigate('mylab/fornadas');
    }
  };

  const handleExportPDF = () => {
    if (!hasProAccess) {
        openPaywall('mylab');
        return;
    }
    if (!editableBatch) return;
    try {
      exportBatchToPDF(editableBatch, t);
    } catch (e) {
      addToast('Could not export PDF at this time.', 'error');
    }
  };

  if (!editableBatch) {
    return (
      <div className="text-center p-8">
        <h2 className="text-xl font-bold">{t('batch_detail.not_found')}</h2>
        <p className="mt-2">{t('batch_detail.not_found_desc')}</p>
        <button onClick={() => onNavigate('mylab/fornadas')} className="mt-4 rounded-md bg-lime-500 py-2 px-4 text-sm font-semibold text-white shadow-sm hover:bg-lime-600">
          {t('batch_detail.back_to_diary')}
        </button>
      </div>
    );
  }
  
  const { doughConfig, doughResult } = editableBatch;
  const flour = FLOURS.find(f => f.id === doughConfig.flourId);

  return (
    <div className="animate-[fadeIn_0.5s_ease-in-out]">
      <button 
        onClick={() => window.history.back()} 
        className="mb-6 inline-flex items-center gap-1 text-sm font-medium text-slate-500 hover:text-slate-800 transition-colors"
      >
        &larr; Back
      </button>

      {/* Header */}
      <div className="mb-8 space-y-2">
          <input
              type="text"
              name="name"
              value={editableBatch.name}
              onChange={(e) => setEditableBatch({ ...editableBatch, name: e.target.value })}
              className="w-full bg-transparent text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl focus:outline-none focus:ring-0 border-0 p-0"
          />
          <div className="flex items-center gap-4">
              <p className="text-sm text-slate-500">
                  {new Date(editableBatch.createdAt).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}
              </p>
              <ResultBadge rating={editableBatch.rating} />
          </div>
      </div>
      
      <div className="flex flex-col lg:flex-row gap-8 items-start">
        {/* Main Content */}
        <div className="w-full lg:w-2/3 space-y-6">
            <div className="rounded-xl bg-white p-6 shadow-sm ring-1 ring-slate-200/50">
                <h3 className="font-bold text-lg mb-4">{t('batch_detail.data_title')}</h3>
                <dl className="grid grid-cols-2 md:grid-cols-3 gap-x-4 gap-y-6">
                    <KeyStatCard label={t('batch_detail.hydration')} value={`${doughConfig.hydration}%`} icon={<InfoIcon className="h-6 w-6"/>} />
                    <KeyStatCard label={t('form.flour_type')} value={flour?.name || 'N/A'} icon={<InfoIcon className="h-6 w-6"/>} />
                    <KeyStatCard label={t('batch_detail.yeast')} value={t(`form.yeast_${doughConfig.yeastType.toLowerCase()}`)} icon={<YeastIcon className="h-6 w-6"/>} />
                    <KeyStatCard label="Total Time" value={`${(editableBatch.bulkTimeHours || 0) + (editableBatch.proofTimeHours || 0)}h`} icon={<ClockIcon className="h-6 w-6"/>} />
                    <KeyStatCard label="Avg Temp" value={t(`form.temp_${doughConfig.ambientTemperature.toLowerCase()}`)} icon={<InfoIcon className="h-6 w-6"/>} />
                    <KeyStatCard label="Oven" value={editableBatch.ovenType ? t(`profile.ovens.types.${editableBatch.ovenType.toLowerCase()}`) : 'N/A'} icon={<FireIcon className="h-6 w-6"/>} />
                </dl>
            </div>

            {doughResult && (
                 <div className="rounded-xl bg-white p-6 shadow-sm ring-1 ring-slate-200/50">
                    <h3 className="font-bold text-lg mb-4">{t('batch_detail.ingredients_title')}</h3>
                    <IngredientTable result={doughResult} doughConfig={doughConfig} />
                </div>
            )}
            
            <div className="rounded-xl bg-white p-6 shadow-sm ring-1 ring-slate-200/50">
                 <div className="flex justify-between items-center mb-4">
                    <h3 className="font-bold text-lg">{t('batch_detail.process_title')}</h3>
                    {!isEditingNotes && (
                        <button onClick={() => setIsEditingNotes(true)} className="flex items-center gap-1.5 rounded-md py-1 px-2.5 text-xs font-semibold text-slate-600 hover:bg-slate-100">
                           <PencilIcon className="h-3 w-3" />
                           <span>{editableBatch.notes ? 'Edit' : 'Add'}</span>
                        </button>
                    )}
                 </div>
                 {isEditingNotes ? (
                     <div>
                        <textarea rows={10} value={tempNotes} onChange={(e) => setTempNotes(e.target.value)} placeholder={t('batch_detail.notes_placeholder')} className="block w-full rounded-md border-slate-300 bg-white shadow-sm focus:border-lime-500" autoFocus />
                        <div className="mt-2 flex justify-end gap-2">
                            <button onClick={() => setIsEditingNotes(false)} className="rounded-md py-1.5 px-3 text-sm font-semibold">{t('common.cancel')}</button>
                            <button onClick={handleSaveNotesClick} className="rounded-md bg-lime-500 py-1.5 px-3 text-sm font-semibold text-white">{t('common.save')}</button>
                        </div>
                     </div>
                 ) : (
                    <div className="prose prose-sm max-w-none min-h-[10rem] whitespace-pre-wrap">{editableBatch.notes || <p className="italic text-slate-400">{t('batch_detail.no_notes')}</p>}</div>
                 )}
            </div>
        </div>
        
        {/* Sidebar */}
        <div className="w-full lg:w-1/3 space-y-6 lg:sticky lg:top-24">
             <div className="rounded-xl bg-white p-6 shadow-sm ring-1 ring-slate-200/50">
                <h3 className="font-bold text-lg mb-4">{t('batch_detail.rating')}</h3>
                <div className="flex items-center justify-center gap-1">
                    {[1, 2, 3, 4, 5].map(star => (
                        <button key={star} onClick={() => handleRatingChange(star)} className="p-1">
                            {editableBatch.rating && editableBatch.rating >= star ? <SolidStarIcon className="h-8 w-8 text-yellow-400" /> : <StarIcon className="h-8 w-8 text-slate-300 hover:text-yellow-400" />}
                        </button>
                    ))}
                </div>
            </div>
            <div className="rounded-xl bg-white p-6 shadow-sm ring-1 ring-slate-200/50">
                <h3 className="font-bold text-lg mb-4">{t('batch_detail.photos_title')}</h3>
                <div className="aspect-video w-full rounded-lg bg-slate-100 flex items-center justify-center">
                    <PhotoIcon className="h-10 w-10 text-slate-400" />
                </div>
                <button className="w-full mt-4 rounded-md bg-slate-200 text-slate-700 py-2 text-sm font-semibold hover:bg-slate-300">
                    {t('common.add')} Photo
                </button>
            </div>
             <div className="rounded-xl bg-white p-6 shadow-sm ring-1 ring-slate-200/50">
                <h3 className="font-bold text-lg mb-4">{t('batch_detail.actions_title')}</h3>
                <div className="space-y-3">
                    <button onClick={() => onLoadAndNavigate(doughConfig)} className="w-full flex items-center justify-center gap-2 rounded-lg bg-slate-200 py-2.5 font-semibold text-slate-700 hover:bg-slate-300"><BatchesIcon className="h-5 w-5"/> {t('batch_detail.actions.repeat')}</button>
                    <button onClick={handleDuplicate} className="w-full flex items-center justify-center gap-2 rounded-lg bg-slate-200 py-2.5 font-semibold text-slate-700 hover:bg-slate-300"><DocumentDuplicateIcon className="h-5 w-5"/> {t('batch_detail.actions.duplicate')}</button>
                    <button onClick={handleExportPDF} className="w-full flex items-center justify-center gap-2 rounded-lg bg-slate-200 py-2.5 font-semibold text-slate-700 hover:bg-slate-300"><DownloadIcon className="h-5 w-5"/> {t('batch_detail.actions.export_pdf')}</button>
                    <button onClick={handleDelete} className="w-full flex items-center justify-center gap-2 rounded-lg text-red-600 py-2.5 font-semibold hover:bg-red-50"><TrashIcon className="h-5 w-5"/> {t('batch_detail.actions.delete')}</button>
                </div>
             </div>
        </div>
      </div>
      <div className="mt-8 flex items-center justify-between border-t border-slate-200 pt-6">
        <button onClick={() => onNavigate('mylab/fornadas')} className="text-sm font-medium text-lime-600 hover:underline">
                &larr; {t('batch_detail.back_to_diary')}
            </button>
        <button onClick={handleSave} className="flex items-center gap-2 rounded-lg bg-lime-500 py-2.5 px-5 text-sm font-semibold text-white shadow-md transition-all hover:bg-lime-600">
            <SaveIcon className="h-5 w-5" />
            {t('common.save_changes')}
        </button>
      </div>
    </div>
  );
};

export default BatchDetailPage;
