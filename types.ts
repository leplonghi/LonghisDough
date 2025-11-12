export enum BakeType {
  PIZZA = 'PIZZA',
  BREAD = 'BREAD',
}

export enum RecipeStyle {
  NEAPOLITAN = 'NEAPOLITAN',
  NY_STYLE = 'NY_STYLE',
  ROMAN = 'ROMAN',
  DETROIT = 'DETROIT',
  SICILIAN = 'SICILIAN',
  CHICAGO = 'CHICAGO',
  SOURDOUGH = 'SOURDOUGH',
  BAGUETTE = 'BAGUETTE',
  CIABATTA = 'CIABATTA',
  FOCACCIA = 'FOCACCIA',
  BRIOCHE = 'BRIOCHE',
  RYE = 'RYE',
}

export enum FermentationTechnique {
  DIRECT = 'DIRECT',
  POOLISH = 'POOLISH',
  BIGA = 'BIGA',
}

export enum YeastType {
  IDY = 'IDY',
  ADY = 'ADY',
  FRESH = 'FRESH',
  SOURDOUGH = 'SOURDOUGH',
}

export type Unit = 'g' | 'oz' | 'volume';

export enum UnitSystem {
  METRIC = 'METRIC',
  US_CUSTOMARY = 'US_CUSTOMARY',
}

export interface DoughConfig {
  bakeType: BakeType;
  recipeStyle: RecipeStyle;
  numPizzas: number;
  doughBallWeight: number;
  hydration: number;
  salt: number;
  oil: number;
  fermentationTechnique: FermentationTechnique;
  yeastType: YeastType;
  yeastPercentage: number;
  prefermentFlourPercentage: number;
  scale: number;
  notes: string;
}

export interface DoughIngredients {
  flour: number;
  water: number;
  salt: number;
  oil: number;
  yeast: number;
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
  finalDough?: DoughIngredients;
}

export interface SavedDoughConfig {
  name: string;
  config: DoughConfig;
  isFavorite?: boolean;
}

export interface ProRecipe {
  nameKey: string;
  descriptionKey: string;
  config: Partial<DoughConfig>;
}

export enum Gender {
  MALE = 'MALE',
  FEMALE = 'FEMALE',
  OTHER = 'OTHER',
  PREFER_NOT_TO_SAY = 'PREFER_NOT_TO_SAY',
}

export interface User {
  name: string;
  email: string;
  avatar?: string;
  birthDate?: string;
  gender?: Gender;
}

export type Locale = 'en' | 'pt' | 'es';

export type FormErrors = {
  [key in keyof Partial<DoughConfig>]: string | null;
};
