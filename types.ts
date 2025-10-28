// FIX: Removed self-import of 'DoughConfig' as it conflicts with the local declaration.

export enum BakeType {
  PIZZA = 'PIZZA',
  BREAD = 'BREAD',
}

export enum RecipeStyle {
  // Pizza
  NEAPOLITAN = 'NEAPOLITAN',
  NY_STYLE = 'NY_STYLE',
  ROMAN = 'ROMAN',
  DETROIT = 'DETROIT',
  SICILIAN = 'SICILIAN',
  CHICAGO = 'CHICAGO',
  // Bread
  SOURDOUGH = 'SOURDOUGH',
  BAGUETTE = 'BAGUETTE',
  CIABATTA = 'CIABATTA',
  FOCACCIA = 'FOCACCIA',
  BRIOCHE = 'BRIOCHE',
  RYE = 'RYE',
}

export enum YeastType {
  IDY = 'IDY', // Instant Dry Yeast
  ADY = 'ADY', // Active Dry Yeast
  FRESH = 'FRESH',
  SOURDOUGH = 'SOURDOUGH', // Sourdough starter / levain
}

export enum FermentationTechnique {
  DIRECT = 'DIRECT',
  POOLISH = 'POOLISH',
  BIGA = 'BIGA',
}

export type Unit = 'g' | 'oz' | 'volume';

export enum UnitSystem {
  METRIC = 'METRIC',
  US_CUSTOMARY = 'US_CUSTOMARY',
}

export type Locale = 'en' | 'pt' | 'es';

export interface User {
  name: string;
  email: string;
  avatar: string; // URL or initials
}

export interface DoughConfig {
  bakeType: BakeType;
  recipeStyle: RecipeStyle;
  numPizzas: number; // Also used for loaves
  doughBallWeight: number;
  hydration: number;
  salt: number;
  oil: number;
  yeastType: YeastType;
  yeastPercentage: number;
  fermentationTechnique: FermentationTechnique;
  prefermentFlourPercentage: number;
  scale: number;
  notes?: string;
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

export interface ProRecipe {
  nameKey: string;
  descriptionKey: string;
  config: Partial<DoughConfig>;
}

export interface SavedDoughConfig {
  name: string;
  config: DoughConfig;
}
