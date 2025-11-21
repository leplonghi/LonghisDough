import React from 'react';
import { DoughConfig, FormErrors } from '../../../types';
import FormSection from '../AccordionSection';
import { FireIcon } from '../../IconComponents';
import SliderInput from '../../SliderInput';
import { AMBIENT_TEMPERATURE_OPTIONS } from '../../../constants';

interface EnvironmentSectionProps {
  config: DoughConfig;
  onConfigChange: (newConfig: Partial<DoughConfig>) => void;
  errors: FormErrors;
}

const EnvironmentSection: React.FC<EnvironmentSectionProps> = ({ config, onConfigChange, errors }) => {
    
  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const numValue = value === '' ? 0 : Number(value);
    if (!isNaN(numValue)) {
      onConfigChange({ [name]: numValue });
    }
  };
  
  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    onConfigChange({ [name]: value });
  };

  const getSelectClasses = () => "w-full rounded-lg border-slate-300 bg-slate-50 p-2 text-slate-900 focus:border-lime-500 focus:ring-lime-500";

  return (
    <FormSection title="Environmental Conditions" description="Factors that influence fermentation." icon={<FireIcon className="h-6 w-6" />}>
        <div className="space-y-6">
          <div>
              <label htmlFor="ambientTemperature" className="mb-1 block text-sm font-medium text-slate-700">Room Temperature</label>
              <select id="ambientTemperature" name="ambientTemperature" value={config.ambientTemperature} onChange={handleSelectChange} className={getSelectClasses()}>
                  {AMBIENT_TEMPERATURE_OPTIONS.map((opt) => (<option key={opt.value} value={opt.value}>{opt.labelKey}</option>))}
              </select>
          </div>
          <SliderInput
            label="Baking Temperature"
            name="bakingTempC"
            value={config.bakingTempC}
            onChange={handleNumberChange}
            min={150}
            max={500}
            step={5}
            unit="°C"
            tooltip="Target temperature for your oven."
            hasError={!!errors.bakingTempC}
          />
        </div>
    </FormSection>
  );
};

export default EnvironmentSection;