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

export const FlourIcon = createIcon(
  <path
    strokeLinecap="round"
    strokeLinejoin="round"
    d="M2.25 12.75l.447-.298a25.253 25.253 0 011.082-1.034.5.5 0 00.21-.421V8.25a.75.75 0 01.75-.75h14.5a.75.75 0 01.75.75v2.8a.5.5 0 00.21.421 25.253 25.253 0 011.529 1.332l.447.298M3 8.25a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75a.75.75 0 01-.75-.75z"
  />
);

export const WaterIcon = createIcon(
  <path
    strokeLinecap="round"
    strokeLinejoin="round"
    d="M15.362 5.214A8.252 8.252 0 0112 21 8.25 8.25 0 016.038 7.048 8.287 8.287 0 009 9.6a8.983 8.983 0 013.362-3.797z"
  />
);

export const SaltIcon = createIcon(
  <path
    fill="currentColor"
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth={0}
    d="M12 10a1 1 0 100-2 1 1 0 000 2zM15 13a1 1 0 100-2 1 1 0 000 2zM12 16a1 1 0 100-2 1 1 0 000 2zM9 13a1 1 0 100-2 1 1 0 000 2zM17 9a1 1 0 100-2 1 1 0 000 2zM7 9a1 1 0 100-2 1 1 0 000 2zM17 17a1 1 0 100-2 1 1 0 000 2zM7 17a1 1 0 100-2 1 1 0 000 2z"
  />
);

export const OilIcon = createIcon(
  <path
    strokeLinecap="round"
    strokeLinejoin="round"
    d="M12 8.25c-2.488 0-4.5 2.012-4.5 4.5s2.012 4.5 4.5 4.5 4.5-2.012 4.5-4.5-2.012-4.5-4.5-4.5z M12 3.75v4.5m0 9V21"
  />
);

export const YeastIcon = createIcon(
  <>
    <circle cx="12" cy="12" r=".75" stroke="none" fill="currentColor" />
    <circle cx="15.5" cy="15.5" r=".75" stroke="none" fill="currentColor" />
    <circle cx="8.5" cy="15.5" r=".75" stroke="none" fill="currentColor" />
    <circle cx="10" cy="9.5" r=".75" stroke="none" fill="currentColor" />
    <circle cx="14" cy="9.5" r=".75" stroke="none" fill="currentColor" />
    <circle cx="12" cy="6" r=".75" stroke="none" fill="currentColor" />
    <circle cx="8" cy="11.5" r=".75" stroke="none" fill="currentColor" />
    <circle cx="16" cy="11.5" r=".75" stroke="none" fill="currentColor" />
  </>
);

export const WeightIcon = createIcon(
  <path
    strokeLinecap="round"
    strokeLinejoin="round"
    d="M4.5 7.5L2.25 3 0 7.5M12 21V3m0 0c-2.25-1.5-4.5-1.5-6.75 0S.75 6.75.75 9s1.5 3.75 4.5 4.5m13.5-10.5c2.25-1.5 4.5-1.5 6.75 0s4.5 3.75 4.5 6.75-1.5 3.75-4.5 4.5M12 3c2.25-1.5 4.5-1.5 6.75 0s4.5 3.75 4.5 6.75-1.5 3.75-4.5 4.5M19.5 7.5l2.25-4.5L24 7.5"
  />,
  '0 0 24 24',
);

export const DownloadIcon = createIcon(
  <path
    strokeLinecap="round"
    strokeLinejoin="round"
    d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3"
  />
);

export const RecipeIcon = createIcon(
  <path
    strokeLinecap="round"
    strokeLinejoin="round"
    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
  />
);

export const LanguageIcon = createIcon(
  <path
    strokeLinecap="round"
    strokeLinejoin="round"
    d="M10.5 21l5.25-11.25L21 21m-9-3h7.5M3 5.621a48.474 48.474 0 016-.371m0 0c1.12 0 2.233.038 3.334.114M9 5.25V3m3.334 2.364C13.18 7.061 14.1 9.256 14.1 11.5c0 2.244-.92 4.439-2.266 5.886M3 5.621a48.474 48.474 0 016-.371m0 0c-1.12 0-2.233.038-3.334.114M3 5.621V3m3.334 2.364C5.18 7.061 4.1 9.256 4.1 11.5c0 2.244.92 4.439 2.266 5.886"
  />
);

export const CheckIcon = createIcon(
  <path
    strokeLinecap="round"
    strokeLinejoin="round"
    d="M4.5 12.75l6 6 9-13.5"
  />
);

export const PrefermentIcon = createIcon(
  <path
    strokeLinecap="round"
    strokeLinejoin="round"
    d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
  />
);

export const PizzaIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    {...props}
  >
    <path
      fillRule="evenodd"
      d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM8.267 15.64a.75.75 0 01-1.06-1.06l1.06-1.06a.75.75 0 011.06 1.06l-1.06 1.06zM9.939 12.06a.75.75 0 01-1.06-1.06l1.06-1.06a.75.75 0 011.06 1.06l-1.06 1.06zm2.122-2.122a.75.75 0 01-1.06-1.06l1.06-1.06a.75.75 0 111.06 1.06l-1.06 1.06zM15.53 10.59a.75.75 0 01-1.06-1.06l1.06-1.06a.75.75 0 011.06 1.06l-1.06 1.06zM14.47 13.649a.75.75 0 01-1.06-1.06l1.06-1.06a.75.75 0 011.06 1.06l-1.06 1.06z"
      clipRule="evenodd"
    />
  </svg>
);

export const TrashIcon = createIcon(
  <path
    strokeLinecap="round"
    strokeLinejoin="round"
    d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
  />
);

export const CloseIcon = createIcon(
  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
);

export const PencilIcon = createIcon(
  <path
    strokeLinecap="round"
    strokeLinejoin="round"
    d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 19.07a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"
  />
);

export const ShareIcon = createIcon(
  <path
    strokeLinecap="round"
    strokeLinejoin="round"
    d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l9.566-5.314m-9.566 7.5l9.566 5.314m0 0a2.25 2.25 0 100-2.186m0 2.186c-.18-.324-.283-.696-.283-1.093s.103-.77.283 1.093m0 2.186l-9.566-5.314"
  />
);

export const UserIcon = createIcon(
  <path
    strokeLinecap="round"
    strokeLinejoin="round"
    d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
  />
);

export const SaveIcon = createIcon(
  <path
    strokeLinecap="round"
    strokeLinejoin="round"
    d="M9 3.75H6.912a2.25 2.25 0 00-2.15 1.588L2.35 13.177a2.25 2.25 0 002.15 2.823h12.15a2.25 2.25 0 002.15-2.823l-2.412-7.838A2.25 2.25 0 0017.088 3.75H15M12 3V9"
  />
);

export const FolderIcon = createIcon(
  <path
    strokeLinecap="round"
    strokeLinejoin="round"
    d="M2.25 12.75V12A2.25 2.25 0 014.5 9.75h15A2.25 2.25 0 0121.75 12v.75m-8.69-6.44l-2.12-2.12a1.5 1.5 0 00-1.061-.44H4.5A2.25 2.25 0 002.25 6v12a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9a2.25 2.25 0 00-2.25-2.25h-5.379a1.5 1.5 0 01-1.06-.44z"
  />
);

// New icons for form sections
export const BakeTypeIcon = createIcon(
  <path
    strokeLinecap="round"
    strokeLinejoin="round"
    d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4"
  />
);

export const ParametersIcon = createIcon(
  <path
    strokeLinecap="round"
    strokeLinejoin="round"
    d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75"
  />
);

export const FermentationIcon = createIcon(
  <path
    strokeLinecap="round"
    strokeLinejoin="round"
    d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
  />
);

export const SettingsIcon = createIcon(
  <path
    strokeLinecap="round"
    strokeLinejoin="round"
    d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.438.995s.145.755.438.995l1.003.827c.48.398.668 1.03.26 1.431l-1.296 2.247a1.125 1.125 0 01-1.37.49l-1.217-.456c-.355-.133-.75-.072-1.075.124a6.57 6.57 0 01-.22.127c-.332.183-.582.495-.645.87l-.213 1.281c-.09.543-.56.94-1.11.94h-2.593c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.063-.374-.313-.686-.645-.87a6.52 6.52 0 01-.22-.127c-.324-.196-.72-.257-1.075-.124l-1.217.456a1.125 1.125 0 01-1.37-.49l-1.296-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.437-.995s-.145-.755-.437-.995l-1.004-.827a1.125 1.125 0 01-.26-1.431l1.296-2.247a1.125 1.125 0 011.37-.49l1.217.456c.355.133.75.072 1.075-.124.072-.044.146-.087.22-.127.332-.183.582-.495.645-.87l.213-1.281z"
  />
);

export const InfoIcon = createIcon(
  <path
    strokeLinecap="round"
    strokeLinejoin="round"
    d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z"
  />
);
