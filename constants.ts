
import { RecipeStyle, YeastType, ProRecipe, BakeType, FermentationTechnique } from './types';

export const YEAST_OPTIONS = [
  { value: YeastType.IDY, labelKey: 'form.yeast_idy' },
  { value: YeastType.ADY, labelKey: 'form.yeast_ady' },
  { value: YeastType.FRESH, labelKey: 'form.yeast_fresh' },
  { value: YeastType.SOURDOUGH, labelKey: 'form.yeast_sourdough' },
];

export const PIZZA_STYLES: RecipeStyle[] = [
  RecipeStyle.NEAPOLITAN,
  RecipeStyle.NY_STYLE,
  RecipeStyle.ROMAN,
  RecipeStyle.DETROIT,
  RecipeStyle.SICILIAN,
  RecipeStyle.CHICAGO,
];

export const BREAD_STYLES: RecipeStyle[] = [
  RecipeStyle.SOURDOUGH,
  RecipeStyle.BAGUETTE,
  RecipeStyle.CIABATTA,
  RecipeStyle.FOCACCIA,
  RecipeStyle.BRIOCHE,
  RecipeStyle.RYE,
];

export const DOUGH_WEIGHT_RANGES: { [key in RecipeStyle]?: string } = {
  [RecipeStyle.NEAPOLITAN]: '200-280g',
  [RecipeStyle.NY_STYLE]: '250-400g',
  [RecipeStyle.ROMAN]: '180-250g',
  [RecipeStyle.DETROIT]: '300-450g',
  [RecipeStyle.SICILIAN]: '400-600g',
  [RecipeStyle.CHICAGO]: '350-500g',
  [RecipeStyle.SOURDOUGH]: '500-1000g',
  [RecipeStyle.BAGUETTE]: '250-350g',
  [RecipeStyle.CIABATTA]: '400-600g',
  [RecipeStyle.FOCACCIA]: '500-1000g',
  [RecipeStyle.BRIOCHE]: '400-800g',
  [RecipeStyle.RYE]: '600-1200g',
};

export const RECIPE_STYLE_PRESETS: {
  [key in RecipeStyle]?: {
    hydration: number;
    salt: number;
    oil: number;
    yeastPercentage?: number;
    description: string;
  };
} = {
  [RecipeStyle.NEAPOLITAN]: {
    hydration: 62,
    salt: 2.8,
    oil: 0,
    yeastPercentage: 0.2,
    description: 'pro_recipes.neapolitan_desc',
  },
  [RecipeStyle.NY_STYLE]: {
    hydration: 65,
    salt: 2.2,
    oil: 2,
    yeastPercentage: 0.4,
    description: 'pro_recipes.ny_style_desc',
  },
  [RecipeStyle.ROMAN]: {
    hydration: 75,
    salt: 2.5,
    oil: 3,
    yeastPercentage: 0.3,
    description: 'pro_recipes.roman_desc',
  },
  [RecipeStyle.DETROIT]: {
    hydration: 70,
    salt: 2.0,
    oil: 2,
    yeastPercentage: 1.0,
    description: 'pro_recipes.detroit_desc',
  },
  [RecipeStyle.SICILIAN]: {
    hydration: 68,
    salt: 2.0,
    oil: 4,
    yeastPercentage: 1.2,
    description: 'pro_recipes.sicilian_desc',
  },
  [RecipeStyle.CHICAGO]: {
    hydration: 58,
    salt: 1.8,
    oil: 8,
    yeastPercentage: 1.5,
    description: 'pro_recipes.chicago_desc',
  },
  [RecipeStyle.SOURDOUGH]: {
    hydration: 78,
    salt: 2.0,
    oil: 0,
    yeastPercentage: 20,
    description: 'pro_recipes.sourdough_desc',
  },
  [RecipeStyle.BAGUETTE]: {
    hydration: 70,
    salt: 1.8,
    oil: 0,
    yeastPercentage: 0.5,
    description: 'pro_recipes.baguette_desc',
  },
  [RecipeStyle.CIABATTA]: {
    hydration: 85,
    salt: 2.2,
    oil: 2,
    yeastPercentage: 0.3,
    description: 'pro_recipes.ciabatta_desc',
  },
  [RecipeStyle.FOCACCIA]: {
    hydration: 80,
    salt: 2.5,
    oil: 5,
    yeastPercentage: 0.8,
    description: 'pro_recipes.focaccia_desc',
  },
  [RecipeStyle.BRIOCHE]: {
    hydration: 55,
    salt: 1.5,
    oil: 20, // Technically butter, but we use oil field
    yeastPercentage: 2.0,
    description: 'pro_recipes.brioche_desc',
  },
  [RecipeStyle.RYE]: {
    hydration: 80,
    salt: 1.8,
    oil: 0,
    yeastPercentage: 15,
    description: 'pro_recipes.rye_desc',
  },
};

export const PRO_RECIPES: ProRecipe[] = [
  {
    nameKey: 'pro_recipes.neapolitan_title',
    descriptionKey: 'pro_recipes.neapolitan_desc',
    config: {
      bakeType: BakeType.PIZZA,
      recipeStyle: RecipeStyle.NEAPOLITAN,
      numPizzas: 4,
      doughBallWeight: 250,
      hydration: 62,
      salt: 2.8,
      oil: 0,
      fermentationTechnique: FermentationTechnique.DIRECT,
      yeastType: YeastType.IDY,
      yeastPercentage: 0.2,
    },
  },
  {
    nameKey: 'pro_recipes.sourdough_title',
    descriptionKey: 'pro_recipes.sourdough_desc',
    config: {
      bakeType: BakeType.BREAD,
      recipeStyle: RecipeStyle.SOURDOUGH,
      numPizzas: 2,
      doughBallWeight: 750,
      hydration: 78,
      salt: 2.0,
      oil: 0,
      fermentationTechnique: FermentationTechnique.DIRECT,
      yeastType: YeastType.SOURDOUGH,
      yeastPercentage: 20, // As levain %
    },
  },
  {
    nameKey: 'pro_recipes.focaccia_title',
    descriptionKey: 'pro_recipes.focaccia_desc',
    config: {
      bakeType: BakeType.BREAD,
      recipeStyle: RecipeStyle.FOCACCIA,
      numPizzas: 1,
      doughBallWeight: 1000,
      hydration: 80,
      salt: 2.5,
      oil: 5,
      fermentationTechnique: FermentationTechnique.POOLISH,
      prefermentFlourPercentage: 30,
      yeastType: YeastType.IDY,
      yeastPercentage: 0.8,
    },
  },
  {
    nameKey: 'pro_recipes.ny_style_title',
    descriptionKey: 'pro_recipes.ny_style_desc',
    config: {
        bakeType: BakeType.PIZZA,
        recipeStyle: RecipeStyle.NY_STYLE,
        numPizzas: 3,
        doughBallWeight: 350,
        hydration: 65,
        salt: 2.2,
        oil: 2,
        fermentationTechnique: FermentationTechnique.DIRECT,
        yeastType: YeastType.IDY,
        yeastPercentage: 0.4,
    }
  }
];
