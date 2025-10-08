import {
  DoughConfig,
  YeastType,
  RecipeStyle,
  FermentationTechnique,
} from './types';

export const YEAST_OPTIONS = [
  {
    value: YeastType.IDY,
    label: 'Instant Dry Yeast (IDY)',
    defaultPercentage: 0.5,
  },
  {
    value: YeastType.ADY,
    label: 'Active Dry Yeast (ADY)',
    defaultPercentage: 0.7,
  },
  { value: YeastType.FRESH, label: 'Fresh Yeast', defaultPercentage: 1.5 },
];

export const RECIPE_STYLE_PRESETS: Record<RecipeStyle, Partial<DoughConfig>> =
  {
    [RecipeStyle.NAPOLETANA]: {
      doughBallWeight: 280,
      hydration: 62,
      oil: 0, // Traditional Neapolitan has no oil
      salt: 2.8,
    },
    [RecipeStyle.NY]: {
      doughBallWeight: 350,
      hydration: 63,
      oil: 2,
      salt: 2.5,
    },
    [RecipeStyle.ROMANA]: {
      doughBallWeight: 400,
      hydration: 78,
      oil: 3,
      salt: 2.5,
    },
  };

export const DEFAULT_CONFIG: DoughConfig = {
  numPizzas: 4,
  recipeStyle: RecipeStyle.NAPOLETANA,
  fermentationTechnique: FermentationTechnique.DIRECT,
  ...RECIPE_STYLE_PRESETS[RecipeStyle.NAPOLETANA],
  doughBallWeight: 280, // Explicitly set from preset
  hydration: 62, // Explicitly set from preset
  salt: 2.8, // Explicitly set from preset
  oil: 0, // Explicitly set from preset
  yeastType: YeastType.IDY,
  yeastPercentage: YEAST_OPTIONS.find((y) => y.value === YeastType.IDY)!
    .defaultPercentage,
  prefermentFlourPercentage: 30, // Default for when user switches to Biga/Poolish
};
