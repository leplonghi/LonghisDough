
import React from 'react';
import { SpinnerIcon } from './Icons';

const LoadingSpinner: React.FC = () => (
  <div className="flex h-full min-h-[50vh] w-full items-center justify-center">
    <SpinnerIcon className="h-10 w-10 animate-spin text-lime-500" />
  </div>
);

export default LoadingSpinner;
