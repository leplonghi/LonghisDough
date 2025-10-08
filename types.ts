// Fix: Replaced incorrect content with actual type definitions. This file should define and export types, not constants.
export enum YeastType {
  IDY = 'IDY',
  ADY = 'ADY',
  FRESH = 'FRESH',
}

export enum RecipeStyle {
  NAPOLETANA = 'Napoletana',
  NY = 'NY',
  ROMANA = 'Romana',
}

export enum FermentationTechnique {
  DIRECT = 'Direct',
  POOLISH = 'Poolish',
  BIGA = 'Biga',
}

export type Unit = 'g' | 'oz';

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
