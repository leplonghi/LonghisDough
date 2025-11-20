
import { RecipeStyle } from '../types';

export interface AdditionalIngredientDef {
  id: string;
  name: string;
  type: 'solid' | 'liquid';
  defaultPercentage: number;
  compatibleStyles: RecipeStyle[];
  description: string;
  reference?: string;
}

export const ADDITIONAL_INGREDIENTS_LIBRARY: AdditionalIngredientDef[] = [
  {
    id: 'diastatic_malt',
    name: 'Diastatic Malt Powder',
    type: 'solid',
    defaultPercentage: 0.5,
    compatibleStyles: [RecipeStyle.NEW_YORK, RecipeStyle.BAGUETTE, RecipeStyle.BAGEL],
    description: 'Enzymatic activity breaks down starch into sugars, improving browning and oven spring in longer fermentations.',
    reference: 'Modernist Pizza / Tony Gemignani',
  },
  {
    id: 'milk_powder',
    name: 'Dry Milk Powder',
    type: 'solid',
    defaultPercentage: 2.0,
    compatibleStyles: [RecipeStyle.PAN_PIZZA, RecipeStyle.BRIOCHE, RecipeStyle.SANDWICH_LOAF, RecipeStyle.PAO_DE_BATATA],
    description: 'Adds tenderness, sweetness, and improves crust browning due to lactose and proteins.',
    reference: 'King Arthur Baking',
  },
  {
    id: 'vital_wheat_gluten',
    name: 'Vital Wheat Gluten',
    type: 'solid',
    defaultPercentage: 1.0,
    compatibleStyles: [RecipeStyle.NEW_YORK, RecipeStyle.BAGEL, RecipeStyle.SOURDOUGH],
    description: 'Boosts protein content of all-purpose flour to mimic high-gluten bread flour. Use 1-2%.',
    reference: 'Serious Eats',
  },
  {
    id: 'honey',
    name: 'Honey',
    type: 'liquid',
    defaultPercentage: 1.5,
    compatibleStyles: [RecipeStyle.NEW_YORK, RecipeStyle.CHALLAH, RecipeStyle.BAGEL],
    description: 'Provides fermentable sugar and hygroscopic properties (retains moisture) for a softer crumb.',
    reference: 'The Bread Baker\'s Apprentice',
  },
  {
    id: 'olive_oil_extra',
    name: 'Olive Oil (Extra Virgin)',
    type: 'liquid',
    defaultPercentage: 3.0,
    compatibleStyles: [RecipeStyle.FOCACCIA, RecipeStyle.SICILIANA, RecipeStyle.ROMANA_TONDA],
    description: 'Adds distinct flavor and tenderness. Essential for Focaccia and Roman styles.',
    reference: 'Pizza in Teglia (Bonci)',
  },
  {
    id: 'butter',
    name: 'Butter (Unsalted)',
    type: 'solid',
    defaultPercentage: 5.0,
    compatibleStyles: [RecipeStyle.BRIOCHE, RecipeStyle.PAN_PIZZA, RecipeStyle.CHICAGO_DEEP_DISH, RecipeStyle.PAO_DE_BATATA],
    description: 'Provides rich flavor and a tender, flaky crumb structure.',
    reference: 'French Baking Tradition',
  },
  {
    id: 'semolina',
    name: 'Semolina Rimacinata',
    type: 'solid',
    defaultPercentage: 10.0,
    compatibleStyles: [RecipeStyle.SICILIANA, RecipeStyle.ROMANA_TONDA, RecipeStyle.COUNTRY_LOAF],
    description: 'Adds crunch and a nutty flavor. Often used as a 10-20% blend with white flour.',
    reference: 'Italian Regional Baking',
  },
  {
    id: 'sugar_brown',
    name: 'Brown Sugar',
    type: 'solid',
    defaultPercentage: 1.0,
    compatibleStyles: [RecipeStyle.PUMPERNICKEL, RecipeStyle.COOKIES, RecipeStyle.BAGEL],
    description: 'Adds moisture, acidity (molasses), and distinct caramel flavor.',
  },
  {
    id: 'egg_yolk',
    name: 'Egg Yolk',
    type: 'liquid',
    defaultPercentage: 5.0,
    compatibleStyles: [RecipeStyle.BRIOCHE, RecipeStyle.CHALLAH, RecipeStyle.PAO_DE_BATATA],
    description: 'Emulsifier (lecithin) that creates a rich, tender crumb and improves texture.',
  },
  {
    id: 'garlic_powder',
    name: 'Garlic Powder',
    type: 'solid',
    defaultPercentage: 0.5,
    compatibleStyles: [RecipeStyle.DETROIT, RecipeStyle.PAN_PIZZA],
    description: 'Flavor enhancer often used in American pan pizza styles.',
    reference: 'Detroit Style Pizza Guides',
  }
];