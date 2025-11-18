import { FlourDefinition } from './types';

export const FLOURS: FlourDefinition[] = [
  {
    id: 'generic_all_purpose',
    name: 'All-Purpose Flour (Standard)',
    category: 'all_purpose',
    strengthW: 220,
    protein: 10.5,
    recommendedUses: ['pizza', 'bread', 'focaccia', 'general'],
    hydrationHint: {
      min: 58,
      max: 65,
    },
    notes: 'Versatile supermarket flour, good for short fermentations and moderate hydration.',
  },
  {
    id: '00_pizza_napoletana',
    name: '00 Neapolitan Pizza Flour (W 250-310)',
    category: '00',
    strengthW: 280,
    protein: 12.5,
    recommendedUses: ['pizza'],
    hydrationHint: {
      min: 58,
      max: 67,
    },
    notes:
      'Ideal for classic Neapolitan pizza, with 8-24 hours fermentation. Balances extensibility and strength.',
  },
  {
    id: '00_strong',
    name: '00 Strong Flour (W 320+)',
    category: '00',
    strengthW: 340,
    protein: 13,
    recommendedUses: ['pizza', 'bread'],
    hydrationHint: {
      min: 65,
      max: 75,
    },
    notes:
      'Strong and resistant, ideal for biga, long fermentations (48h+), and high hydration breads.',
  },
  {
    id: 'bread_flour',
    name: 'Bread Flour',
    category: 'bread',
    strengthW: 350,
    protein: 13.5,
    recommendedUses: ['bread', 'pizza'],
    hydrationHint: {
      min: 65,
      max: 80,
    },
    notes: 'High protein content, excellent for rustic breads, sourdough, and doughs requiring structure.',
  },
  {
    id: 'whole_wheat',
    name: 'Whole Wheat Flour',
    category: 'whole',
    protein: 13,
    recommendedUses: ['bread'],
    hydrationHint: {
      min: 70,
      max: 85,
    },
    notes: 'Absorbs more water ("thirsty"). Usually mixed 20-50% with white flour for better structure.',
  },
  {
    id: 'rye_flour',
    name: 'Rye Flour',
    category: 'whole',
    protein: 9,
    recommendedUses: ['bread'],
    hydrationHint: {
      min: 75,
      max: 90,
    },
    notes: 'Distinct earthy flavor, low gluten. Often used in denser breads or mixed with wheat flour for structure. Absorbs plenty of water.',
  },
  {
    id: 'manitoba_strong',
    name: 'Manitoba Flour (Super Strong)',
    category: 'bread',
    strengthW: 400,
    protein: 14.5,
    recommendedUses: ['bread', 'pizza'],
    hydrationHint: {
      min: 70,
      max: 90,
    },
    notes: 'Very strong flour (W > 380), ideal for extremely long fermentations (panettone) and for reinforcing weaker flours.',
  },
];