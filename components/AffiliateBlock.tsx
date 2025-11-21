
import React from 'react';
import { AFFILIATE_LINKS } from '../data/affiliateLinks';
import type { AffiliatePlacement } from '../data/affiliatePlacements';
import { ExternalLinkIcon, ShoppingBagIcon } from './IconComponents';
import { useUser } from '../contexts/UserProvider';
import { isFreeUser } from '../lib/permissions'; // Corrigido para lib/permissions

type Props = {
  placement: AffiliatePlacement;
};

export const AffiliateBlock: React.FC<Props> = ({ placement }) => {
  const { user } = useUser();
  const url = AFFILIATE_LINKS[placement.linkKey];

  // Only show ads to Free users
  if (!isFreeUser(user)) return null;
  if (!url) return null;

  return (
    <div className="mt-6 rounded-xl border border-slate-200 bg-slate-50 p-5 text-sm transition-all hover:border-slate-300 hover:shadow-sm">
      <div className="flex items-center gap-2 mb-2">
        <ShoppingBagIcon className="h-4 w-4 text-lime-600" />
        <p className="text-xs font-bold uppercase tracking-wider text-slate-500">
          Suggested Gear
        </p>
      </div>
      
      <h3 className="font-bold text-slate-900 text-base">{placement.title}</h3>
      <p className="text-slate-600 mt-1 mb-4 leading-relaxed">
        {placement.description}
      </p>
      
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 rounded-md bg-white border border-slate-300 px-4 py-2 text-xs font-bold text-slate-700 shadow-sm transition-all hover:bg-lime-50 hover:text-lime-700 hover:border-lime-300 hover:shadow-md"
      >
        {placement.ctaLabel}
        <ExternalLinkIcon className="h-3 w-3" />
      </a>
      
      <p className="mt-3 text-[10px] text-slate-400 italic">
        Some links may be affiliate links. We only recommend tools that are technically relevant.
      </p>
    </div>
  );
};
