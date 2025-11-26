
import React, { useState, useEffect, useRef } from 'react';
import { InfoIcon, LockClosedIcon, ExclamationCircleIcon } from '@/components/ui/Icons';

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
  disabled?: boolean;
  disabledTooltip?: string;
  hasError?: boolean;
  presetValue?: number;
  isProFeature?: boolean;
  recommendedMin?: number;
  recommendedMax?: number;
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
  disabled = false,
  disabledTooltip,
  hasError = false,
  presetValue,
  isProFeature = false,
  recommendedMin,
  recommendedMax,
}) => {
  const [internalValue, setInternalValue] = useState(value);
  const debounceTimeout = useRef<number | null>(null);

  useEffect(() => {
    setInternalValue(value);
  }, [value]);

  useEffect(() => {
    return () => {
      if (debounceTimeout.current) {
        clearTimeout(debounceTimeout.current);
      }
    };
  }, []);

  const handleDebouncedChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = Number(e.target.value);
    setInternalValue(newValue);

    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current);
    }

    debounceTimeout.current = window.setTimeout(() => {
      const syntheticEvent = {
        target: {
          name: name,
          value: String(newValue),
        },
      } as React.ChangeEvent<HTMLInputElement>;
      onChange(syntheticEvent);
    }, 150);
  };

  const isOutOfRange = (recommendedMin !== undefined && value < recommendedMin) || 
                       (recommendedMax !== undefined && value > recommendedMax);

  const formattedValue = internalValue.toFixed(2).replace(/\.00$/, '').replace(/\.([1-9])0$/, '.$1');
  const wrapperClasses = `relative ${disabled ? 'opacity-70' : ''}`;
  const inputContainerClasses = `flex items-center gap-4 ${disabled ? 'rounded-lg border-2 border-dashed border-sky-300 bg-sky-50/50 p-2' : ''}`;

  return (
    <div className={wrapperClasses}>
      <div className="mb-2 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <label htmlFor={name} className="block text-sm font-medium text-slate-700 flex items-center gap-2">
            {label}
            {isProFeature && (
                <span className="inline-flex items-center gap-0.5 rounded-full bg-lime-100 px-1.5 py-0.5 text-[10px] font-bold text-lime-700 uppercase tracking-wide border border-lime-200">
                   <LockClosedIcon className="h-2.5 w-2.5" /> PRO
                </span>
            )}
          </label>
          {tooltip && (
            <div className="group relative flex items-center">
              <InfoIcon className="h-4 w-4 cursor-help text-slate-400" />
              <div className="pointer-events-none absolute bottom-full left-1/2 z-10 mb-2 w-72 -translate-x-1/2 rounded-md bg-slate-800 p-3 text-xs text-white opacity-0 shadow-lg transition-opacity duration-300 group-hover:opacity-100">
                <p dangerouslySetInnerHTML={{ __html: tooltip }} />
                <svg
                  className="absolute left-0 top-full h-2 w-full text-slate-800"
                  x="0px" y="0px" viewBox="0 0 255 255" xmlSpace="preserve"
                >
                  <polygon className="fill-current" points="0,0 127.5,127.5 255,0" />
                </svg>
              </div>
            </div>
          )}
        </div>
        <div className="flex items-center gap-2">
            {isOutOfRange && (
                 <div className="group relative flex items-center text-amber-500">
                    <ExclamationCircleIcon className="h-4 w-4" />
                    <div className="pointer-events-none absolute bottom-full right-0 z-10 mb-2 w-64 rounded-md bg-amber-100 p-2 text-xs text-amber-900 shadow-sm transition-opacity duration-300 opacity-0 group-hover:opacity-100 border border-amber-200">
                        Value is outside the recommended stylistic range ({recommendedMin}-{recommendedMax}{unit}).
                    </div>
                </div>
            )}
            <span className={`rounded-md px-2 py-0.5 text-lg font-bold transition-colors ${
                hasError
                ? 'bg-red-100 text-red-700'
                : isOutOfRange ? 'text-amber-600' : 'text-slate-800'
            }`}>
            {formattedValue}{unit}
            </span>
        </div>
      </div>
      
      <div className={inputContainerClasses}>
        <input
          type="range"
          id={name}
          name={name}
          value={internalValue}
          onChange={handleDebouncedChange}
          min={min}
          max={max}
          step={step}
          disabled={disabled}
          className={`h-2 w-full appearance-none rounded-lg ${
            disabled ? 'cursor-not-allowed' : 'cursor-pointer'
          }`}
        />
        {disabled && presetValue !== undefined && (
          <span className="flex-shrink-0 rounded-md bg-sky-100 px-2 py-1 text-sm font-semibold text-sky-800">
            {presetValue.toFixed(1)}{unit}
          </span>
        )}
      </div>
      
      {recommendedMin !== undefined && recommendedMax !== undefined && !disabled && (
          <div className="flex justify-between px-1 mt-1">
             <span className="text-[10px] text-slate-400"></span>
             <span className="text-[10px] text-slate-400">Rec: {recommendedMin}-{recommendedMax}{unit}</span>
          </div>
      )}

      {disabled && disabledTooltip && (
         <div className="group absolute inset-0 z-10 cursor-not-allowed">
           <div className="pointer-events-none absolute bottom-full left-1/2 z-10 mb-2 w-64 -translate-x-1/2 rounded-md bg-slate-800 p-2 text-xs text-white opacity-0 shadow-lg transition-opacity duration-300 group-hover:opacity-100">
             {disabledTooltip}
             <svg
                className="absolute left-0 top-full h-2 w-full text-slate-800"
                x="0px" y="0px" viewBox="0 0 255 255" xmlSpace="preserve"
             >
                <polygon className="fill-current" points="0,0 127.5,127.5 255,0" />
             </svg>
           </div>
         </div>
      )}
    </div>
  );
};

export default SliderInput;
