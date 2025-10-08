import React from 'react';

interface SliderInputProps {
  label: string;
  name: string;
  value: number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  min: number;
  max: number;
  step: number;
  unit: string;
  tooltip?: string;
}

const SliderInput: React.FC<SliderInputProps> = ({
  label,
  name,
  value,
  onChange,
  min,
  max,
  step,
  unit,
  tooltip,
}) => {
  return (
    <div>
      <div className="mb-1 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <label
            htmlFor={name}
            className="block text-sm font-medium text-slate-700 dark:text-slate-300"
          >
            {label}
          </label>
          {tooltip && (
            <div className="group relative flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 cursor-help text-slate-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span className="pointer-events-none absolute bottom-full left-1/2 z-10 mb-2 w-64 -translate-x-1/2 rounded-md bg-slate-800 p-2 text-xs text-white opacity-0 shadow-lg transition-opacity duration-300 group-hover:opacity-100 dark:bg-slate-700 dark:text-slate-200">
                {tooltip}
                <svg
                  className="absolute left-0 top-full h-2 w-full text-slate-800 dark:text-slate-700"
                  x="0px"
                  y="0px"
                  viewBox="0 0 255 255"
                  xmlSpace="preserve"
                >
                  <polygon
                    className="fill-current"
                    points="0,0 127.5,127.5 255,0"
                  />
                </svg>
              </span>
            </div>
          )}
        </div>
        <span className="rounded-md bg-lime-100 px-2 py-1 text-sm font-semibold text-lime-700 dark:bg-lime-500/10 dark:text-lime-300">
          {value.toFixed(1)}
          {unit}
        </span>
      </div>
      <input
        type="range"
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        min={min}
        max={max}
        step={step}
        className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-gray-200"
      />
    </div>
  );
};

export default SliderInput;