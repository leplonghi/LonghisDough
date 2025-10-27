
import React from 'react';

const createIcon = (
  path: React.ReactNode,
  viewBox: string = '0 0 24 24',
) => (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox={viewBox}
    strokeWidth={1.5}
    stroke="currentColor"
    className="h-6 w-6"
    {...props}
  >
    {path}
  </svg>
);

// --- App Logo & Ingredient Icons (Solid Style) ---

export const PizzaIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6" {...props}>
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1.5 13.01c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm3-4c-.83 0-1.5-.67-1.5-1.5S12.67 8 13.5 8s1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm2 4c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm-8-4c-.83 0-1.5-.67-1.5-1.5S8.67 8 9.5 8s1.5.67 1.5 1.5S10.33 11.01 9.5 11.01z" />
    <path d="M12 4c-4.41 0-8 3.59-8 8s3.59 8 8 8 8-3.59 8-8-3.59-8-8-8zm0 14c-3.31 0-6-2.69-6-6s2.69-6 6-6 6 2.69 6 6-2.69 6-6 6z" opacity="0" />
  </svg>
);

export const FlourIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6" {...props}>
    <path d="M20,11h-3.34c-0.23-1.6-1-3-2.16-4.16C13.6,5.94,12.84,5.43,12,5.1V2h-1v3.1c-0.84,0.33-1.6,0.84-2.5,1.74 C7.34,8,6.58,9.4,6.34,11H3v2h3.34c0.23,1.6,1,3,2.16,4.16c0.9,0.9,1.66,1.41,2.5,1.74V22h1v-3.1c0.84-0.33,1.6-0.84,2.5-1.74 c1.16-1.16,1.92-2.56,2.16-4.16H20V11z M12,18c-3.31,0-6-2.69-6-6s2.69-6,6-6s6,2.69,6,6S15.31,18,12,18z" />
  </svg>
);

export const WaterIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6" {...props}>
    <path d="M12,2c-5.33,4.55-8,8.48-8,11.42C4,17.62,7.58,22,12,22s8-4.38,8-8.58C20,10.48,17.33,6.55,12,2z M12,20 c-3.31,0-6-2.69-6-6c0-2.31,2.1-5.08,6-8.48c3.9,3.4,6,6.17,6,8.48C18,17.31,15.31,20,12,20z" />
  </svg>
);

export const SaltIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6" {...props}>
    <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5-10-5-10 5z" />
  </svg>
);

export const OilIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6" {...props}>
    <path d="M13,2.05v3.03c3.39,0.49,6,3.39,6,6.92c0,3.87-3.13,7-7,7s-7-3.13-7-7c0-3.53,2.61-6.43,6-6.92V2.05 C7.06,2.56,4,6.81,4,12c0,4.41,3.59,8,8,8s8-3.59,8-8C20,6.81,16.94,2.56,13,2.05z" />
    <path d="M12,14c1.1,0,2-0.9,2-2c0-1.1-0.9-2-2-2s-2,0.9-2,2C10,13.1,10.9,14,12,14z" />
  </svg>
);

export const YeastIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6" {...props}>
    <path d="M12,2C6.48,2,2,6.48,2,12s4.48,10,10,10s10-4.48,10-10S17.52,2,12,2z M11,16H9v-2H7v-2h2v-2h2v2h2v2h-2V16z M15,10h-2V8h-2v2h-2V8h-2v2h2v2h2v-2h2V10z" />
  </svg>
);

// --- Core UI Icons (Line Art Style) ---

export const WeightIcon = createIcon(
  <path
    strokeLinecap="round"
    strokeLinejoin="round"
    d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
  />,
  '0 0 24 24',
);

export const PrefermentIcon = createIcon(
  <path
    strokeLinecap="round"
    strokeLinejoin="round"
    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
  />,
);

// --- Form Section Icons ---

export const BakeTypeIcon = createIcon(
  <path
    strokeLinecap="round"
    strokeLinejoin="round"
    d="M15.362 5.214A8.252 8.252 0 0112 21 8.25 8.25 0 016.038 7.048 8.287 8.287 0 009 9.6a8.983 8.983 0 013.362-3.797zM2.25 9.75A2.25 2.25 0 014.5 7.5h15a2.25 2.25 0 012.175 2.922l-1.996 5.446A2.25 2.25 0 0117.25 18h-10.5a2.25 2.25 0 01-2.175-2.632L2.578 9.922A2.25 2.25 0 012.25 9.75z"
  />,
);

export const RecipeIcon = createIcon(
  <path
    strokeLinecap="round"
    strokeLinejoin="round"
    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
  />,
);

export const ParametersIcon = createIcon(
  <path
    strokeLinecap="round"
    strokeLinejoin="round"
    d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75"
  />,
);

export const FermentationIcon = createIcon(
  <path
    strokeLinecap="round"
    strokeLinejoin="round"
    d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
  />,
);

export const SettingsIcon = createIcon(
  <path
    strokeLinecap="round"
    strokeLinejoin="round"
    d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.438.995s.145.755.438.995l1.003.827c.48.398.668 1.03.26 1.431l-1.296 2.247a1.125 1.125 0 01-1.37.49l-1.217-.456c-.355-.133-.75-.072-1.075.124a6.57 6.57 0 01-.22.127c-.332.183-.582.495-.645.87l-.213 1.281c-.09.543-.56.94-1.11.94h-2.593c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.063-.374-.313-.686-.645-.87a6.52 6.52 0 01-.22-.127c-.324-.196-.72-.257-1.075-.124l-1.217.456a1.125 1.125 0 01-1.37-.49l-1.296-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.437-.995s-.145-.755-.437-.995l-1.004-.827a1.125 1.125 0 01-.26-1.431l1.296-2.247a1.125 1.125 0 011.37-.49l1.217.456c.355.133.75.072 1.075-.124.072-.044.146-.087.22-.127.332-.183.582-.495-.645-.87l.213-1.281z"
  />,
);

export const PencilIcon = createIcon(
  <path
    strokeLinecap="round"
    strokeLinejoin="round"
    d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 19.07a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"
  />,
);

// --- UI & Action Icons ---

export const InfoIcon = createIcon(
  <path
    strokeLinecap="round"
    strokeLinejoin="round"
    d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
  />,
);

export const DownloadIcon = createIcon(
  <path
    strokeLinecap="round"
    strokeLinejoin="round"
    d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 12m0 0l4.5-4.5M12 12v-9"
  />,
);

export const LanguageIcon = createIcon(
  <path
    strokeLinecap="round"
    strokeLinejoin="round"
    d="M21 12a9 9 0 11-18 0 9 9 0 0118 0zM3.75 9h16.5M16.5 9a9 9 0 01-9 9M9.75 21a9 9 0 01-6-15"
  />,
);

export const CheckIcon = createIcon(
  <path
    strokeLinecap="round"
    strokeLinejoin="round"
    d="M4.5 12.75l6 6 9-13.5"
  />,
);

export const TrashIcon = createIcon(
  <path
    strokeLinecap="round"
    strokeLinejoin="round"
    d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
  />,
);

export const CloseIcon = createIcon(
  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />,
);

export const ShareIcon = createIcon(
  <path
    strokeLinecap="round"
    strokeLinejoin="round"
    d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l9.566-5.314m-9.566 7.5l9.566 5.314m0 0a2.25 2.25 0 100-2.186m0 2.186c-.18-.324-.283-.696-.283-1.093s.103-.77.283 1.093m0 2.186l-9.566-5.314"
  />,
);

export const UserIcon = createIcon(
  <path
    strokeLinecap="round"
    strokeLinejoin="round"
    d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0"
  />,
);

export const SaveIcon = createIcon(
  <path
    strokeLinecap="round"
    strokeLinejoin="round"
    d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3"
  />,
);

export const FolderIcon = createIcon(
  <path
    strokeLinecap="round"
    strokeLinejoin="round"
    d="M2.25 12.75V12A2.25 2.25 0 014.5 9.75h15A2.25 2.25 0 0121.75 12v.75m-8.69-6.44l-2.12-2.12a1.5 1.5 0 00-1.061-.44H4.5A2.25 2.25 0 002.25 6v12a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9a2.25 2.25 0 00-2.25-2.25h-5.379a1.5 1.5 0 01-1.06-.44z"
  />,
);

export const LockClosedIcon = createIcon(
  <path
    strokeLinecap="round"
    strokeLinejoin="round"
    d="M16.5 10.5V6.75a4.5 4.5 0 00-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"
  />,
);

export const SparklesIcon = createIcon(
  <path
    strokeLinecap="round"
    strokeLinejoin="round"
    d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM18 15.75l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 20l-1.035.259a3.375 3.375 0 00-2.456 2.456L18 23.75l-.259-1.035a3.375 3.375 0 00-2.456-2.456L14.25 20l1.036-.259a3.375 3.375 0 002.455-2.456L18 15.75z"
  />,
);

export const ShieldCheckIcon = createIcon(
  <path
    strokeLinecap="round"
    strokeLinejoin="round"
    d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.57-.598-3.751h-.152c-3.196 0-6.1-1.249-8.25-3.286zm0 13.036h.008v.008h-.008v-.008z"
  />,
);

export const ScaleIcon = createIcon(
  <path
    strokeLinecap="round"
    strokeLinejoin="round"
    d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15"
  />,
);

export const BookOpenIcon = createIcon(
  <path
    strokeLinecap="round"
    strokeLinejoin="round"
    d="M12 6.25a1.5 1.5 0 011.5 1.5v10.5a1.5 1.5 0 01-3 0V7.75a1.5 1.5 0 011.5-1.5zM12 6.25a4.5 4.5 0 00-4.5 4.5v6.375a1.125 1.125 0 001.125 1.125h6.75a1.125 1.125 0 001.125-1.125V10.75a4.5 4.5 0 00-4.5-4.5z"
  />,
);
