import { DoughConfig, AutoStyleInsightsResult, YeastType } from '../types';
import { DOUGH_STYLE_PRESETS } from '../constants';

// Helper to get human-readable labels for config keys
const getConfigLabel = (key: keyof DoughConfig): string => {
  const labels: Record<string, string> = {
    recipeStyle: 'Estilo',
    hydration: 'Hidratação',
    salt: 'Sal',
    oil: 'Óleo/Azeite',
    sugar: 'Açúcar',
    flourId: 'Farinha',
  };
  return labels[key] || key;
};

export interface AdjustmentChange {
    key: string;
    label: string;
    from: any;
    to: any;
}

export interface AdjustmentResult {
    newConfig: DoughConfig;
    changes: AdjustmentChange[];
}

export function applySmartAdjustments(
  config: DoughConfig,
  insights: AutoStyleInsightsResult
): AdjustmentResult {
  const initialResult: AdjustmentResult = { newConfig: config, changes: [] };

  if (!insights.recommendedStyle) {
    return initialResult;
  }

  const recommendedPreset = DOUGH_STYLE_PRESETS.find(
    p => p.name === insights.recommendedStyle
  );

  if (!recommendedPreset) {
    return initialResult;
  }
  
  const updatedValues: Partial<DoughConfig> = {
    recipeStyle: recommendedPreset.recipeStyle,
    hydration: recommendedPreset.defaultHydration,
    salt: recommendedPreset.defaultSalt,
    oil: recommendedPreset.defaultOil,
    sugar: recommendedPreset.defaultSugar || 0,
    stylePresetId: recommendedPreset.id,
  };
  
  if (recommendedPreset.preferredFlourProfileId) {
    updatedValues.flourId = recommendedPreset.preferredFlourProfileId;
  }
  
  if (recommendedPreset.defaultYeastPct !== undefined && ![YeastType.SOURDOUGH_STARTER, YeastType.USER_LEVAIN].includes(config.yeastType)) {
      updatedValues.yeastPercentage = recommendedPreset.defaultYeastPct;
  }


  // Preserve user's production parameters but apply style changes
  const newConfig = {
    ...config,
    ...updatedValues,
  };
  
  const changes: AdjustmentChange[] = [];

  // Compare and find changes
  (Object.keys(updatedValues) as Array<keyof DoughConfig>).forEach(key => {
    const areDifferent = typeof newConfig[key] === 'number'
      ? Math.abs((newConfig[key] as number) - (config[key] as number)) > 0.01
      : newConfig[key] !== config[key];

    if (areDifferent) {
      changes.push({
        key,
        label: getConfigLabel(key),
        from: config[key],
        to: newConfig[key],
      });
    }
  });


  return { newConfig, changes };
}