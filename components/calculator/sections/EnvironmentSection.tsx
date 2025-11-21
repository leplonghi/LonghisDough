import React from 'react';
import { DoughConfig } from '@/types';
import FormSection from '@/components/calculator/AccordionSection';
import SliderInput from '@/components/ui/SliderInput';
import { FireIcon } from '@/components/ui/Icons';
import { FLOURS } from '@/flours-constants';
import { AMBIENT_TEMPERATURE_OPTIONS } from '@/constants';

interface EnvironmentSectionProps {
  config: DoughConfig;
  onConfigChange: (newConfig: Partial<DoughConfig>) => void;
  getSelectClasses: () => string;
  errors: any;
}

const EnvironmentSection: React.FC<EnvironmentSectionProps> = ({
  config,
  onConfigChange,
  getSelectClasses,
  errors,
}) => {
  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    onConfigChange({ [name]: value });
  };

  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    onConfigChange({ [name]: Number(value) });
  };

  return (
    <FormSection
      title="Environmental Conditions"
      description="Factors that influence fermentation."
      icon={<FireIcon className="h-6 w-6" />}
    >
      <div className="space-y-6">
        <div>
          <label
            htmlFor="flourId"
            className="mb-1 block text-sm font-medium text-slate-700"
          >
            Flour Type
          </label>
          <select
            id="flourId"
            name="flourId"
            value={config.flourId}
            onChange={handleSelectChange}
            className={getSelectClasses()}
          >
            {FLOURS.map((opt) => (
              <option key={opt.id} value={opt.id}>
                {opt.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label
            htmlFor="ambientTemperature"
            className="mb-1 block text-sm font-medium text-slate-700"
          >
            Room Temperature
          </label>
          <select
            id="ambientTemperature"
            name="ambientTemperature"
            value={config.ambientTemperature}
            onChange={handleSelectChange}
            className={getSelectClasses()}
          >
            {AMBIENT_TEMPERATURE_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.labelKey}
              </option>
            ))}
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