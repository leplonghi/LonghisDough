
import { DoughStyleDefinition, FermentationTechnique } from '../types';

export const STYLES_DATA: DoughStyleDefinition[] = [
  {
    id: 'napolitana_classica',
    name: 'Neapolitan Pizza (Classic)',
    category: 'Pizza',
    country: 'Italy',
    year: '18th Century',
    description: 'The queen of pizzas. Soft, elastic, with a high, airy rim (cornicione) and a thin center.',
    history: 'Originating in Naples, protected by STG (Specialità Tradizionale Garantita) regulations. Made only with flour, water, salt, and yeast, baked in an ultra-hot wood-fired oven.',
    isPro: false,
    technical: {
      hydration: 62,
      salt: 2.8,
      oil: 0,
      sugar: 0,
      fermentation: 'Medium/Long (8-24h)',
      fermentationTechnique: FermentationTechnique.DIRECT,
      bakingTempC: 450,
    },
    ingredients: [
      { id: 'flour', name: '00 Flour (W280+)', type: 'solid', role: 'flour', bakerPercentage: 100 },
      { id: 'water', name: 'Water', type: 'liquid', role: 'water', bakerPercentage: 62 },
      { id: 'salt', name: 'Sea Salt', type: 'solid', role: 'salt', bakerPercentage: 2.8 },
      { id: 'yeast', name: 'Yeast', type: 'solid', role: 'yeast', bakerPercentage: 0.2 }
    ],
    variations: ['Canotto (very high rim)', 'Ruota di Carro (cartwheel - large and thin)'],
    risks: ['Requires very hot oven (>400°C)', 'Delicate dough to handle'],
    notes: ['Never use a rolling pin.', 'Consume immediately after baking.']
  },
  {
    id: 'ny_style',
    name: 'New York Style',
    category: 'Pizza',
    country: 'USA',
    year: '1905',
    description: 'Large, foldable slices with a crisp crust and soft interior. The everyday pizza.',
    history: 'Brought by Neapolitan immigrants, adapted to NYC coal/gas ovens and American high-protein flour.',
    isPro: false,
    technical: {
      hydration: 65,
      salt: 2.0,
      oil: 2.0,
      sugar: 1.0,
      fermentation: 'Long cold ferment (24-72h)',
      fermentationTechnique: FermentationTechnique.DIRECT,
      bakingTempC: 280,
    },
    ingredients: [
      { id: 'flour', name: 'Bread Flour', type: 'solid', role: 'flour', bakerPercentage: 100 },
      { id: 'water', name: 'Water', type: 'liquid', role: 'water', bakerPercentage: 65 },
      { id: 'salt', name: 'Salt', type: 'solid', role: 'salt', bakerPercentage: 2.0 },
      { id: 'sugar', name: 'Sugar', type: 'solid', role: 'sugar', bakerPercentage: 1.0 },
      { id: 'oil', name: 'Oil/Olive Oil', type: 'liquid', role: 'fat', bakerPercentage: 2.0 },
      { id: 'yeast', name: 'Yeast', type: 'solid', role: 'yeast', bakerPercentage: 0.4 }
    ],
    variations: ['New Haven (thinner and more charred)'],
    risks: ['Drying out if baked too long in a cool oven.'],
    notes: ['Ideal for home ovens.', 'Sugar helps with browning.']
  },
  {
    id: 'focaccia_genovese',
    name: 'Focaccia Genovese',
    category: 'Bread',
    country: 'Italy',
    year: 'Ancient',
    description: 'Flatbread, oily, with characteristic dimples and a salty crust.',
    history: 'A classic from Liguria, served for breakfast or as a snack. Brine (water + salt) and olive oil on top are essential.',
    isPro: false,
    technical: {
      hydration: 75,
      salt: 2.5,
      oil: 5.0, // In dough
      sugar: 1.0,
      fermentation: 'Medium (direct or poolish)',
      fermentationTechnique: FermentationTechnique.DIRECT,
      bakingTempC: 230,
    },
    ingredients: [
      { id: 'flour', name: 'Medium/Strong Flour', type: 'solid', role: 'flour', bakerPercentage: 100 },
      { id: 'water', name: 'Water', type: 'liquid', role: 'water', bakerPercentage: 75 },
      { id: 'salt', name: 'Salt', type: 'solid', role: 'salt', bakerPercentage: 2.5 },
      { id: 'oil', name: 'Olive Oil (Dough)', type: 'liquid', role: 'fat', bakerPercentage: 5.0 },
      { id: 'yeast', name: 'Yeast', type: 'solid', role: 'yeast', bakerPercentage: 0.5 },
      { id: 'sugar', name: 'Malt/Sugar', type: 'solid', role: 'sugar', bakerPercentage: 1.0 }
    ],
    risks: ['Sticking to the pan if not oiled enough.', 'Dense crumb if under-proofed.'],
    notes: ['Dimple vigorously with fingers.', 'Drizzle with brine before baking.']
  },
  {
    id: 'brioche_classico',
    name: 'French Brioche',
    category: 'Pastry',
    country: 'France',
    year: '17th Century',
    description: 'Enriched dough, buttery, soft, and golden. The pinnacle of viennoiserie.',
    history: 'Originating in Normandy, famous for its high butter and egg content.',
    isPro: true,
    technical: {
      hydration: 15, // Milk/Water is low, hydration comes from eggs
      salt: 2.0,
      oil: 50.0, // Butter
      sugar: 12.0,
      fermentation: 'Long cold ferment (mandatory for handling)',
      fermentationTechnique: FermentationTechnique.DIRECT,
      bakingTempC: 180,
    },
    ingredients: [
      { id: 'flour', name: 'Strong Flour', type: 'solid', role: 'flour', bakerPercentage: 100 },
      { id: 'eggs', name: 'Eggs', type: 'liquid', role: 'other', bakerPercentage: 50 },
      { id: 'butter', name: 'Butter', type: 'solid', role: 'fat', bakerPercentage: 50 },
      { id: 'sugar', name: 'Sugar', type: 'solid', role: 'sugar', bakerPercentage: 12 },
      { id: 'milk', name: 'Milk', type: 'liquid', role: 'water', bakerPercentage: 15 },
      { id: 'salt', name: 'Salt', type: 'solid', role: 'salt', bakerPercentage: 2.0 },
      { id: 'yeast', name: 'Osmo-tolerant Yeast', type: 'solid', role: 'yeast', bakerPercentage: 2.5 }
    ],
    risks: ['Dough heats up and butter melts during mixing.', 'Burns quickly due to sugar.'],
    notes: ['Use cold ingredients.', 'Knead to windowpane before adding butter.']
  },
  {
      id: 'teglia_romana',
      name: 'Roman Pan Pizza (Teglia)',
      category: 'Pizza',
      country: 'Italy',
      year: '1980s (modern)',
      description: 'High hydration, baked in rectangular pans. Crispy bottom, very airy crumb.',
      history: 'The reinvention of Roman pizza al taglio, focused on digestibility and open crumb structure.',
      isPro: true,
      technical: {
        hydration: 80,
        salt: 2.5,
        oil: 3.0,
        sugar: 0,
        fermentation: 'Long cold ferment (24-48h)',
        fermentationTechnique: FermentationTechnique.DIRECT,
        bakingTempC: 250,
      },
      ingredients: [
        { id: 'flour', name: 'Very Strong Flour (W320+)', type: 'solid', role: 'flour', bakerPercentage: 100 },
        { id: 'water', name: 'Ice Water', type: 'liquid', role: 'water', bakerPercentage: 80 },
        { id: 'salt', name: 'Salt', type: 'solid', role: 'salt', bakerPercentage: 2.5 },
        { id: 'oil', name: 'Olive Oil', type: 'liquid', role: 'fat', bakerPercentage: 3.0 },
        { id: 'yeast', name: 'Yeast', type: 'solid', role: 'yeast', bakerPercentage: 0.6 }
      ],
      risks: ['Hard to handle (very wet).', 'Requires stretch & fold.'],
      notes: ['Use semolina for stretching.', 'Bake on the bottom rack for a crispy base.']
  }
];

export function getStyleById(id: string): DoughStyleDefinition | undefined {
  return STYLES_DATA.find(s => s.id === id);
}
