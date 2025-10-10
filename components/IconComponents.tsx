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
    d="M2.25 12.75l.447-.298a25.253 25.253 0 011.082-1.034 25.32 25.32 0 011.23-.976 25.417 25.417 0 011.362-.892c.371-.21.755-.398 1.15-.567C8.16 8.77 9.5 8.25 10.875 8.25c1.375 0 2.715.52 3.822 1.258.388.257.766.53 1.132.813.411.32.81.658 1.196 1.011a25.32 25.32 0 011.23.976 25.253 25.253 0 011.082 1.034l.447.298M3 8.25a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 8.25z"
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
  <>
    <circle cx="12" cy="12" r="1.5" stroke="none" fill="currentColor" />
    <circle cx="16.5" cy="7.5" r="1.5" stroke="none" fill="currentColor" />
    <circle cx="19.5" cy="13.5" r="1.5" stroke="none" fill="currentColor" />
    <circle cx="15" cy="18" r="1.5" stroke="none" fill="currentColor" />
    <circle cx="9" cy="18" r="1.5" stroke="none" fill="currentColor" />
    <circle cx="4.5" cy="13.5" r="1.5" stroke="none" fill="currentColor" />
    <circle cx="7.5" cy="7.5" r="1.5" stroke="none" fill="currentColor" />
  </>
);

export const OilIcon = createIcon(
  <path
    strokeLinecap="round"
    strokeLinejoin="round"
    d="M8.25 3.75c.998-1.025 2.38-1.5 3.75-1.5s2.752.475 3.75 1.5c.998 1.025 1.5 2.38 1.5 3.75s-.502 2.725-1.5 3.75c-.998 1.025-2.38 1.5-3.75 1.5s-2.752-.475-3.75-1.5c-1.025-.998-1.5-2.38-1.5-3.75s.475-2.752 1.5-3.75zM12 12.75V21"
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
  </>
);

export const WeightIcon = createIcon(
  <path
    strokeLinecap="round"
    strokeLinejoin="round"
    d="M4.5 7.5L2.25 3 0 7.5M12 21V3m0 0c-2.25-1.5-4.5-1.5-6.75 0S.75 6.75.75 9s1.5 3.75 4.5 4.5m13.5-10.5c2.25-1.5 4.5-1.5 6.75 0s4.5 3.75 4.5 6.75-1.5 3.75-4.5 4.5M12 3c2.25-1.5 4.5-1.5 6.75 0s4.5 3.75 4.5 6.75-1.5 3.75-4.5 4.5M19.5 7.5l2.25-4.5L24 7.5"
  />,
  '0 0 24 24'
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
    d="M19.5 12c0-3.33-3.37-6-7.5-6s-7.5 2.67-7.5 6v7.5h15V12zM4.5 12H3m18 0h-1.5M9 7.5s.75-2.25 3-2.25 3 2.25 3 2.25"
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
      d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM9.606 7.443a.75.75 0 01.934.22l2.358 3.537a.75.75 0 01-1.292.862l-2.357-3.537a.75.75 0 01.357-1.082zM8.25 12a.75.75 0 01.75-.75h6a.75.75 0 010 1.5H9a.75.75 0 01-.75-.75zm3 3.75a.75.75 0 01.75-.75h.008a.75.75 0 01.75.75v.008a.75.75 0 01-.75.75h-.008a.75.75 0 01-.75-.75v-.008z"
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
    d="M17.593 3.322c.1.121.176.26.224.406s.072.296.072.45V21l-7.25-3.625L3.25 21V4.178c0-.154.024-.306.072-.45s.124-.285.224-.406a1.86 1.86 0 01.688-.433 1.86 1.86 0 01.812-.211H16.09c.299 0 .59.08.841.233.252.153.459.358.608.608z"
  />
);

export const FolderIcon = createIcon(
  <path
    strokeLinecap="round"
    strokeLinejoin="round"
    d="M3.75 9.75h16.5m-16.5 0a2.25 2.25 0 01-2.25-2.25V5.25A2.25 2.25 0 013.75 3h5.25a2.25 2.25 0 012.25 2.25V9.75m0 0a2.25 2.25 0 002.25 2.25h3.75a2.25 2.25 0 002.25-2.25V5.25a2.25 2.25 0 00-2.25-2.25h-5.25"
  />
);