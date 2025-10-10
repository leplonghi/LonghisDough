import {
  DoughConfig,
  YeastType,
  RecipeStyle,
  FermentationTechnique,
  BakeType,
} from './types';

export const YEAST_OPTIONS = [
  {
    value: YeastType.IDY,
    labelKey: 'yeast.idy',
    defaultPercentage: 0.5,
  },
  {
    value: YeastType.ADY,
    labelKey: 'yeast.ady',
    defaultPercentage: 0.7,
  },
  {
    value: YeastType.FRESH,
    labelKey: 'yeast.fresh',
    defaultPercentage: 1.5,
  },
];

export const PIZZA_STYLES: RecipeStyle[] = [
  RecipeStyle.NAPOLETANA,
  RecipeStyle.NY,
  RecipeStyle.ROMANA,
  RecipeStyle.SICILIAN,
  RecipeStyle.FOCACCIA,
  RecipeStyle.DETROIT,
  RecipeStyle.CHICAGO_DEEP_DISH,
];

export const BREAD_STYLES: RecipeStyle[] = [
  RecipeStyle.ARTISAN_LOAF,
  RecipeStyle.BAGUETTE,
  RecipeStyle.CIABATTA,
  RecipeStyle.PUMPERNICKEL,
  RecipeStyle.SOURDOUGH_BOULE,
  RecipeStyle.RYE_BREAD,
];

export const RECIPE_STYLE_PRESETS: Record<
  RecipeStyle,
  Partial<DoughConfig> & { description: string }
> = {
  [RecipeStyle.NAPOLETANA]: {
    doughBallWeight: 280,
    hydration: 60,
    oil: 0,
    salt: 2.5,
    description: 'form.style_tooltips.napoletana',
  },
  [RecipeStyle.NY]: {
    doughBallWeight: 350,
    hydration: 60,
    oil: 2.5,
    salt: 2.5,
    description: 'form.style_tooltips.ny',
  },
  [RecipeStyle.ROMANA]: {
    doughBallWeight: 400,
    hydration: 75,
    oil: 3,
    salt: 2.5,
    description: 'form.style_tooltips.romana',
  },
  [RecipeStyle.SICILIAN]: {
    doughBallWeight: 800,
    hydration: 70,
    oil: 4,
    salt: 2,
    description: 'form.style_tooltips.sicilian',
  },
  [RecipeStyle.FOCACCIA]: {
    doughBallWeight: 1000,
    hydration: 80,
    oil: 5,
    salt: 2.2,
    description: 'form.style_tooltips.focaccia',
  },
  [RecipeStyle.DETROIT]: {
    doughBallWeight: 750,
    hydration: 75,
    oil: 3,
    salt: 2,
    description: 'form.style_tooltips.detroit',
  },
  [RecipeStyle.CHICAGO_DEEP_DISH]: {
    doughBallWeight: 600,
    hydration: 58,
    oil: 8,
    salt: 1.8,
    description: 'form.style_tooltips.chicago_deep_dish',
  },
  [RecipeStyle.ARTISAN_LOAF]: {
    doughBallWeight: 900,
    hydration: 75,
    oil: 2,
    salt: 2,
    fermentationTechnique: FermentationTechnique.DIRECT,
    description: 'form.style_tooltips.artisan_loaf',
  },
  [RecipeStyle.BAGUETTE]: {
    doughBallWeight: 350,
    hydration: 70,
    oil: 1,
    salt: 2,
    fermentationTechnique: FermentationTechnique.POOLISH,
    description: 'form.style_tooltips.baguette',
  },
  [RecipeStyle.CIABATTA]: {
    doughBallWeight: 500,
    hydration: 85,
    oil: 3,
    salt: 2.2,
    fermentationTechnique: FermentationTechnique.BIGA,
    description: 'form.style_tooltips.ciabatta',
  },
  [RecipeStyle.PUMPERNICKEL]: {
    doughBallWeight: 900,
    hydration: 80,
    oil: 0,
    salt: 1.8,
    fermentationTechnique: FermentationTechnique.DIRECT,
    description: 'form.style_tooltips.pumpernickel',
  },
  [RecipeStyle.SOURDOUGH_BOULE]: {
    doughBallWeight: 850,
    hydration: 78,
    oil: 0,
    salt: 2,
    fermentationTechnique: FermentationTechnique.DIRECT,
    description: 'form.style_tooltips.sourdough_boule',
  },
  [RecipeStyle.RYE_BREAD]: {
    doughBallWeight: 750,
    hydration: 75,
    oil: 2,
    salt: 2,
    fermentationTechnique: FermentationTechnique.DIRECT,
    description: 'form.style_tooltips.rye_bread',
  },
};

export const DOUGH_WEIGHT_RANGES: Record<RecipeStyle, string> = {
  [RecipeStyle.NAPOLETANA]: '250-300g',
  [RecipeStyle.NY]: '300-400g',
  [RecipeStyle.ROMANA]: '350-450g',
  [RecipeStyle.SICILIAN]: '700-900g',
  [RecipeStyle.FOCACCIA]: '900-1200g',
  [RecipeStyle.DETROIT]: '650-850g',
  [RecipeStyle.CHICAGO_DEEP_DISH]: '500-700g',
  [RecipeStyle.ARTISAN_LOAF]: '750-1000g',
  [RecipeStyle.BAGUETTE]: '300-400g',
  [RecipeStyle.CIABATTA]: '450-600g',
  [RecipeStyle.PUMPERNICKEL]: '800-1000g',
  [RecipeStyle.SOURDOUGH_BOULE]: '750-950g',
  [RecipeStyle.RYE_BREAD]: '650-850g',
};

// Destructure to separate config from metadata
const { description: _, ...napoletanaPreset } =
  RECIPE_STYLE_PRESETS[RecipeStyle.NAPOLETANA];

export const DEFAULT_CONFIG: DoughConfig = {
  numPizzas: 4,
  bakeType: BakeType.PIZZA,
  recipeStyle: RecipeStyle.NAPOLETANA,
  fermentationTechnique: FermentationTechnique.DIRECT,
  ...napoletanaPreset,
  doughBallWeight: 280,
  hydration: 62,
  salt: 2.8,
  oil: 0,
  yeastType: YeastType.IDY,
  yeastPercentage: YEAST_OPTIONS.find((y) => y.value === YeastType.IDY)!
    .defaultPercentage,
  prefermentFlourPercentage: 30,
  notes: '',
  scale: 1,
};