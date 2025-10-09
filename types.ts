// FIX: Define and export enums and types. The previous content was incorrect, causing circular dependencies.
export enum YeastType {
  IDY = 'IDY',
  ADY = 'ADY',
  FRESH = 'FRESH',
}

export enum RecipeStyle {
  NAPOLETANA = 'NAPOLETANA',
  NY = 'NY',
  ROMANA = 'ROMANA',
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
  hydration: number;
  salt: number;
  oil: number;
  yeastPercentage: number;
  yeastType: YeastType;
  recipeStyle: RecipeStyle;
  fermentationTechnique: FermentationTechnique;
  prefermentFlourPercentage: number;
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
