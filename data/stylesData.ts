
import { DoughStyle, FermentationTechnique, RecipeStyle } from '../types';

export const STYLES_DATA: DoughStyle[] = [
  {
    id: 'napolitana_classica',
    slug: 'neapolitan-classic',
    name: 'Neapolitan Pizza (Classic)',
    category: 'Pizza',
    country: 'Italy',
    year: '18th Century',
    sourceType: 'official',
    visibility: 'public',
    accessTier: 'free',
    isFeatured: true,
    complexity: 'Advanced',
    description: 'The queen of pizzas. Soft, elastic, with a high, airy rim (cornicione) and a thin center.',
    history: 'Originating in Naples, protected by STG (Specialità Tradizionale Garantita) regulations. Made only with flour, water, salt, and yeast, baked in an ultra-hot wood-fired oven.',
    technical: {
      hydration: [58, 65],
      salt: [2.5, 3.0],
      fat: [0, 0],
      sugar: [0, 0],
      fermentation: { description: 'Medium/Long', ranges: ['8-24h @ Room Temp or Cold'] },
      fermentationTechnique: FermentationTechnique.DIRECT,
      bakingTempC: 450,
      flourStrength: 'W280–W320'
    },
    ingredients: [
      { id: 'flour', name: '00 Flour (W280+)', type: 'solid', role: 'flour', bakerPercentage: 100 },
      { id: 'water', name: 'Water', type: 'liquid', role: 'water', bakerPercentage: 62 },
      { id: 'salt', name: 'Sea Salt', type: 'solid', role: 'salt', bakerPercentage: 2.8 },
      { id: 'yeast', name: 'Yeast', type: 'solid', role: 'yeast', bakerPercentage: 0.2 }
    ],
    variations: [
        { name: 'Canotto', description: 'Contemporary style with very high hydration and huge rim.', hydration: 70 },
        { name: 'Ruota di Carro', description: 'Traditional "cartwheel" style, very large and thin.', hydration: 58 }
    ],
    risks: ['Requires very hot oven (>400°C) for authentic result', 'Delicate dough to handle at high hydration'],
    notes: ['Never use a rolling pin.', 'Consume immediately after baking.'],
    defaultPreset: {
        category: 'Pizza',
        recipeStyle: RecipeStyle.NEAPOLITAN,
        hydration: 62,
        salt: 2.8,
        oil: 0,
        sugar: 0,
        fermentationTechnique: FermentationTechnique.DIRECT,
        bakingTempC: 450
    },
    isPro: false
  },
  {
    id: 'ny_style',
    slug: 'new-york-style',
    name: 'New York Style',
    category: 'Pizza',
    country: 'USA',
    year: '1905',
    sourceType: 'official',
    visibility: 'public',
    accessTier: 'free',
    isFeatured: true,
    complexity: 'Intermediate',
    description: 'Large, foldable slices with a crisp crust and soft interior. The everyday pizza.',
    history: 'Brought by Neapolitan immigrants, adapted to NYC coal/gas ovens and American high-protein flour. Characterized by the addition of oil and sugar for browning at lower temps.',
    technical: {
      hydration: [60, 68],
      salt: [2.0, 2.5],
      fat: [1.0, 3.0],
      sugar: [1.0, 2.0],
      fermentation: { description: 'Long Cold Ferment', ranges: ['24-72h @ 4°C'] },
      fermentationTechnique: FermentationTechnique.DIRECT,
      bakingTempC: 280,
      flourStrength: 'High Protein / Bread Flour'
    },
    ingredients: [
      { id: 'flour', name: 'Bread Flour', type: 'solid', role: 'flour', bakerPercentage: 100 },
      { id: 'water', name: 'Water', type: 'liquid', role: 'water', bakerPercentage: 65 },
      { id: 'salt', name: 'Salt', type: 'solid', role: 'salt', bakerPercentage: 2.0 },
      { id: 'sugar', name: 'Sugar', type: 'solid', role: 'sugar', bakerPercentage: 1.0 },
      { id: 'oil', name: 'Oil/Olive Oil', type: 'liquid', role: 'fat', bakerPercentage: 2.0 },
      { id: 'yeast', name: 'Yeast', type: 'solid', role: 'yeast', bakerPercentage: 0.4 }
    ],
    risks: ['Drying out if baked too long in a cool oven.'],
    notes: ['Ideal for home ovens.', 'Sugar helps with browning.'],
    defaultPreset: {
        category: 'Pizza',
        recipeStyle: RecipeStyle.NEW_YORK,
        hydration: 65,
        salt: 2.2,
        oil: 2.0,
        sugar: 1.0,
        fermentationTechnique: FermentationTechnique.DIRECT,
        bakingTempC: 280
    },
    isPro: false
  },
  {
    id: 'teglia_romana',
    slug: 'roman-teglia',
    name: 'Roman Pan Pizza (Teglia)',
    category: 'Pizza',
    country: 'Italy',
    year: '1980s',
    sourceType: 'official',
    visibility: 'public',
    accessTier: 'pro',
    complexity: 'Advanced',
    description: 'High hydration, baked in rectangular pans. Crispy bottom, very airy crumb.',
    history: 'The reinvention of Roman pizza al taglio, focused on digestibility and open crumb structure. Requires high hydration and specific handling.',
    technical: {
      hydration: [75, 90],
      salt: [2.2, 2.5],
      fat: [2.0, 4.0],
      sugar: [0, 0],
      fermentation: { description: 'Long Cold Ferment', ranges: ['24-48h @ 4°C'] },
      fermentationTechnique: FermentationTechnique.DIRECT,
      bakingTempC: 250,
      flourStrength: 'W320+ (Very Strong)'
    },
    ingredients: [
      { id: 'flour', name: 'Very Strong Flour (W320+)', type: 'solid', role: 'flour', bakerPercentage: 100 },
      { id: 'water', name: 'Ice Water', type: 'liquid', role: 'water', bakerPercentage: 80 },
      { id: 'salt', name: 'Salt', type: 'solid', role: 'salt', bakerPercentage: 2.5 },
      { id: 'oil', name: 'Olive Oil', type: 'liquid', role: 'fat', bakerPercentage: 3.0 },
      { id: 'yeast', name: 'Yeast', type: 'solid', role: 'yeast', bakerPercentage: 0.6 }
    ],
    risks: ['Hard to handle (very wet).', 'Requires stretch & fold technique.'],
    notes: ['Use semolina for stretching.', 'Bake on the bottom rack for a crispy base.'],
    defaultPreset: {
        category: 'Pizza',
        recipeStyle: RecipeStyle.ROMANA_TONDA, // Closest match
        hydration: 80,
        salt: 2.5,
        oil: 3.0,
        sugar: 0,
        fermentationTechnique: FermentationTechnique.DIRECT,
        bakingTempC: 250
    },
    isPro: true
  },
  {
    id: 'focaccia_genovese',
    slug: 'focaccia-genovese',
    name: 'Focaccia Genovese',
    category: 'Pão',
    country: 'Italy',
    year: 'Ancient',
    sourceType: 'official',
    visibility: 'public',
    accessTier: 'free',
    complexity: 'Easy',
    description: 'Flatbread, oily, with characteristic dimples and a salty crust.',
    history: 'A classic from Liguria, served for breakfast or as a snack. Brine (water + salt) and olive oil on top are essential.',
    technical: {
      hydration: [65, 75],
      salt: [2.0, 2.5],
      fat: [4.0, 6.0],
      sugar: [0, 1.0],
      fermentation: { description: 'Direct or Poolish', ranges: ['2-4h Ambient'] },
      fermentationTechnique: FermentationTechnique.DIRECT,
      bakingTempC: 230,
    },
    ingredients: [
      { id: 'flour', name: 'Medium/Strong Flour', type: 'solid', role: 'flour', bakerPercentage: 100 },
      { id: 'water', name: 'Water', type: 'liquid', role: 'water', bakerPercentage: 70 },
      { id: 'salt', name: 'Salt', type: 'solid', role: 'salt', bakerPercentage: 2.5 },
      { id: 'oil', name: 'Olive Oil', type: 'liquid', role: 'fat', bakerPercentage: 5.0 },
      { id: 'yeast', name: 'Yeast', type: 'solid', role: 'yeast', bakerPercentage: 1.0 }
    ],
    risks: ['Sticking to the pan if not oiled enough.'],
    notes: ['Dimple vigorously with fingers.', 'Drizzle with brine before baking.'],
    defaultPreset: {
        category: 'Pão',
        recipeStyle: RecipeStyle.FOCACCIA,
        hydration: 70,
        salt: 2.5,
        oil: 5.0,
        sugar: 1.0,
        fermentationTechnique: FermentationTechnique.DIRECT,
        bakingTempC: 230
    },
    isPro: false
  },
  {
    id: 'brioche_classico',
    slug: 'brioche-classic',
    name: 'French Brioche',
    category: 'Doce',
    country: 'France',
    year: '17th Century',
    sourceType: 'official',
    visibility: 'public',
    accessTier: 'pro',
    complexity: 'Advanced',
    description: 'Enriched dough, buttery, soft, and golden. The pinnacle of viennoiserie.',
    history: 'Originating in Normandy, famous for its high butter and egg content.',
    technical: {
      hydration: [10, 20], // Liquid comes from eggs
      salt: [1.8, 2.2],
      fat: [40, 60], // Butter
      sugar: [10, 15],
      fermentation: { description: 'Cold Ferment Essential', ranges: ['12-24h'] },
      fermentationTechnique: FermentationTechnique.DIRECT,
      bakingTempC: 180,
      flourStrength: 'Strong'
    },
    ingredients: [
      { id: 'flour', name: 'Strong Flour', type: 'solid', role: 'flour', bakerPercentage: 100 },
      { id: 'eggs', name: 'Eggs', type: 'liquid', role: 'other', bakerPercentage: 50 },
      { id: 'butter', name: 'Butter', type: 'solid', role: 'fat', bakerPercentage: 50 },
      { id: 'sugar', name: 'Sugar', type: 'solid', role: 'sugar', bakerPercentage: 12 },
      { id: 'salt', name: 'Salt', type: 'solid', role: 'salt', bakerPercentage: 2.0 },
      { id: 'yeast', name: 'Osmo-tolerant Yeast', type: 'solid', role: 'yeast', bakerPercentage: 2.5 }
    ],
    risks: ['Dough heating up (butter melting).', 'Burning due to sugar content.'],
    notes: ['Use cold ingredients.', 'Knead to windowpane before adding butter.'],
    defaultPreset: {
        category: 'Doce',
        recipeStyle: RecipeStyle.BRIOCHE,
        hydration: 15,
        salt: 2.0,
        oil: 50,
        sugar: 12,
        fermentationTechnique: FermentationTechnique.DIRECT,
        bakingTempC: 180
    },
    isPro: true
  },
  // Coming Next Placeholder
  {
    id: 'panettone_milano',
    slug: 'panettone-milano',
    name: 'Panettone Artigianale',
    category: 'Special',
    country: 'Italy',
    year: '2024',
    sourceType: 'official',
    visibility: 'public',
    accessTier: 'coming_next',
    complexity: 'Advanced',
    description: 'The Mount Everest of baking. Complex sourdough management, multi-stage mixing.',
    history: 'Coming soon to DoughLabPro. The ultimate challenge.',
    technical: {
      hydration: [0, 0],
      salt: [0, 0],
      fat: [0, 0],
      sugar: [0, 0],
      fermentation: { description: 'Multi-stage Sourdough', ranges: [] },
      fermentationTechnique: FermentationTechnique.DIRECT,
      bakingTempC: 0,
    },
    ingredients: [],
    defaultPreset: { category: 'Special', hydration: 0, salt: 0, oil: 0, sugar: 0 },
    isPro: true
  }
];

export function getStyleById(id: string): DoughStyle | undefined {
  return STYLES_DATA.find(s => s.id === id);
}

export function getStyleBySlug(slug: string): DoughStyle | undefined {
    return STYLES_DATA.find(s => s.slug === slug);
}
