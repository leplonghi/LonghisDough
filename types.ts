export enum BakeType {
  PIZZA = 'PIZZA',
  BREAD = 'BREAD',
}

export enum RecipeStyle {
  // Pizza
  NAPOLETANA = 'NAPOLETANA',
  NY = 'NY',
  ROMANA = 'ROMANA',
  SICILIAN = 'SICILIAN',
  FOCACCIA = 'FOCACCIA',
  DETROIT = 'DETROIT',
  CHICAGO_DEEP_DISH = 'CHICAGO_DEEP_DISH',
  // Bread
  ARTISAN_LOAF = 'ARTISAN_LOAF',
  BAGUETTE = 'BAGUETTE',
  CIABATTA = 'CIABATTA',
  PUMPERNICKEL = 'PUMPERNICKEL',
  SOURDOUGH_BOULE = 'SOURDOUGH_BOULE',
  RYE_BREAD = 'RYE_BREAD',
}

export enum YeastType {
  IDY = 'IDY', // Instant Dry Yeast
  ADY = 'ADY', // Active Dry Yeast
  FRESH = 'FRESH',
}

export enum FermentationTechnique {
  DIRECT = 'DIRECT',
  POOLISH = 'POOLISH',
  BIGA = 'BIGA',
}

export type Unit = 'g' | 'oz' | 'cups';

export type Locale = 'en' | 'pt' | 'es';

export interface DoughConfig {
  numPizzas: number;
  doughBallWeight: number;
  scale: number;
  hydration: number;
  salt: number;
  oil: number;
  yeastPercentage: number;
  fermentationTechnique: FermentationTechnique;
  prefermentFlourPercentage: number;
  yeastType: YeastType;
  bakeType: BakeType;
  recipeStyle: RecipeStyle;
  notes: string;
}

export interface DoughResult {
  totalFlour: number;
  totalWater: number;
  totalSalt: number;
  totalOil: number;
  totalYeast: number;
  totalDough: number;
  preferment?: {
    flour: number;
    water: number;
    yeast: number;
  };
  finalDough?: {
    flour: number;
    water: number;
    salt: number;
    oil: number;
    yeast: number;
  };
}

export interface SavedDoughConfig {
  name: string;
  config: DoughConfig;
}
