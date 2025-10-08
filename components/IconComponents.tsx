import React from 'react';

export const PizzaIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    {...props}
  >
    <path d="M12 2C8.43 2 5.23 4.43 4.15 7.63C4.06 7.89 4.22 8.16 4.49 8.25C4.76 8.34 5.03 8.18 5.12 7.91C5.97 5.33 8.75 3.5 12 3.5C15.25 3.5 18.03 5.33 18.88 7.91C18.97 8.18 19.24 8.34 19.51 8.25C19.78 8.16 19.94 7.89 19.85 7.63C18.77 4.43 15.57 2 12 2Z" />
    <path d="M12 22C6.48 22 2 17.52 2 12C2 11.63 2.05 11.27 2.14 10.92C2.23 10.65 2.5 10.49 2.77 10.58C3.04 10.67 3.2 10.94 3.11 11.21C3.04 11.47 3 11.73 3 12C3 16.97 7.03 21 12 21C16.97 21 21 16.97 21 12C21 11.73 20.96 11.47 20.89 11.21C20.8 10.94 20.96 10.67 21.23 10.58C21.5 10.49 21.77 10.65 21.86 10.92C21.95 11.27 22 11.63 22 12C22 17.52 17.52 22 12 22Z" />
    <path d="M7 12C7 11.45 6.55 11 6 11C5.45 11 5 11.45 5 12C5 12.55 5.45 13 6 13C6.55 13 7 12.55 7 12Z" />
    <path d="M10 9C10 8.45 9.55 8 9 8C8.45 8 8 8.45 8 9C8 9.55 8.45 10 9 10C9.55 10 10 9.55 10 9Z" />
    <path d="M15 9C15 8.45 14.55 8 14 8C13.45 8 13 8.45 13 9C13 9.55 13.45 10 14 10C14.55 10 15 9.55 15 9Z" />
    <path d="M19 12C19 11.45 18.55 11 18 11C17.45 11 17 11.45 17 12C17 12.55 17.45 13 18 13C18.55 13 19 12.55 19 12Z" />
    <path d="M16 14C16 13.45 15.55 13 15 13C14.45 13 14 13.45 14 14C14 14.55 14.45 15 15 15C15.55 15 16 14.55 16 14Z" />
  </svg>
);

const IconWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="h-6 w-6">{children}</div>
);

export const FlourIcon: React.FC = () => (
  <IconWrapper>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
    >
      <path d="M19 4H5C3.34 4 2 5.34 2 7V17C2 18.66 3.34 20 5 20H19C20.66 20 22 18.66 22 17V7C22 5.34 20.66 4 19 4ZM5 18V8H19V18H5Z" />
      <path d="M7 12H9V14H7V12Z" />
    </svg>
  </IconWrapper>
);
export const WaterIcon: React.FC = () => (
  <IconWrapper>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
    >
      <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.58 20 4 16.42 4 12C4 10.13 4.72 8.45 5.9 7.14C7.89 9.32 10.86 11.5 12 12.5C13.14 11.5 16.11 9.32 18.1 7.14C19.28 8.45 20 10.13 20 12C20 16.42 16.42 20 12 20Z" />
    </svg>
  </IconWrapper>
);
export const SaltIcon: React.FC = () => (
  <IconWrapper>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
    >
      <path d="M12 2C8.13 2 5 5.13 5 9C5 12.87 12 22 12 22S19 12.87 19 9C19 5.13 15.87 2 12 2ZM12 11.5C10.62 11.5 9.5 10.38 9.5 9C9.5 7.62 10.62 6.5 12 6.5C13.38 6.5 14.5 7.62 14.5 9C14.5 10.38 13.38 11.5 12 11.5Z" />
      <path
        d="M12,4.5c-2.49,0-4.5,2.01-4.5,4.5c0,1.31,0.59,2.48,1.5,3.23V14h6v-1.77c0.91-0.75,1.5-1.92,1.5-3.23 C16.5,6.51,14.49,4.5,12,4.5z M12,10c-0.55,0-1-0.45-1-1s0.45-1,1-1s1,0.45,1,1S12.55,10,12,10z"
        opacity=".3"
      />
    </svg>
  </IconWrapper>
);
export const OilIcon: React.FC = () => (
  <IconWrapper>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
    >
      <path d="M12,2C8.13,2,5,5.13,5,9c0,1.88,0.78,3.54,2,4.72V19c0,1.1,0.9,2,2,2h6c1.1,0,2-0.9,2-2v-5.28c1.22-1.18,2-2.84,2-4.72 C19,5.13,15.87,2,12,2z M12,14c-1.1,0-2-0.9-2-2c0-1.1,2-4,2-4s2,2.9,2,4C14,13.1,13.1,14,12,14z" />
    </svg>
  </IconWrapper>
);
export const YeastIcon: React.FC = () => (
  <IconWrapper>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
    >
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" />
      <circle cx="12" cy="12" r="2" />
      <circle cx="16" cy="8" r="1" />
      <circle cx="8" cy="8" r="1" />
      <circle cx="16" cy="16" r="1" />
      <circle cx="8" cy="16" r="1" />
    </svg>
  </IconWrapper>
);
export const WeightIcon: React.FC = () => (
  <IconWrapper>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
    >
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zM11 6h2v5h-2zM11 13h2v5h-2z" />
    </svg>
  </IconWrapper>
);
export const RecipeIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <IconWrapper>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
      viewBox="0 0 24 24"
      {...props}
    >
      <path d="M14 2H6C4.9 2 4 2.9 4 4V20C4 21.1 4.9 22 6 22H18C19.1 22 20 21.1 20 20V8L14 2ZM18 20H6V4H13V9H18V20ZM8 12H16V14H8V12ZM8 16H16V18H8V16Z" />
    </svg>
  </IconWrapper>
);
export const DownloadIcon: React.FC<React.SVGProps<SVGSVGElement>> = (
  props,
) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    {...props}
  >
    <path d="M5 20h14v-2H5v2zM19 9h-4V3H9v6H5l7 7 7-7z" />
  </svg>
);
