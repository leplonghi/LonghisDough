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