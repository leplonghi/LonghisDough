
import { DoughStyleDefinition, FermentationTechnique, RecipeStyle, BakeType } from '../types';

export const STYLES_DATA: DoughStyleDefinition[] = [
  {
    id: 'napolitana_classica',
    name: 'Neapolitan Pizza (Classic)',
    family: 'Pizza Napoletana',
    category: 'pizza',
    country: 'Italy',
    year: '18th Century',
    description: 'The queen of pizzas. Soft, elastic, with a high, airy rim (cornicione) and a thin center.',
    history: 'Originating in Naples, protected by STG (Specialità Tradizionale Garantita) regulations. Made only with flour, water, salt, and yeast, baked in an ultra-hot wood-fired oven.',
    isPro: false,
    recipeStyle: RecipeStyle.NEAPOLITAN,
    technical: {
      hydration: 62,
      salt: 2.8,
      oil: 0,
      sugar: 0,
      fermentation: 'Medium/Long (8-24h)',
      fermentationTechnique: FermentationTechnique.DIRECT,
      bakingTempC: 450,
    },
    allowedFermentationTechniques: [FermentationTechnique.DIRECT, FermentationTechnique.POOLISH, FermentationTechnique.BIGA],
    defaultFermentationTechnique: FermentationTechnique.DIRECT,
    ingredients: [
      { id: 'flour', name: '00 Flour (W280+)', type: 'solid', role: 'flour', bakerPercentage: 100 },
      { id: 'water', name: 'Water', type: 'liquid', role: 'water', bakerPercentage: 62 },
      { id: 'salt', name: 'Sea Salt', type: 'solid', role: 'salt', bakerPercentage: 2.8 },
      { id: 'yeast', name: 'Yeast', type: 'solid', role: 'yeast', bakerPercentage: 0.2 }
    ],
    variations: ['Canotto (very high rim)', 'Ruota di Carro (cartwheel - large and thin)'],
    risks: ['Requires very hot oven (>400°C)', 'Delicate dough to handle'],
    notes: ['Never use a rolling pin.', 'Consume immediately after baking.'],
    tags: ['classic', 'high-heat', 'soft']
  },
  {
    id: 'ny_style',
    name: 'New York Style',
    family: 'North American Pizza',
    category: 'pizza',
    country: 'USA',
    year: '1905',
    description: 'Large, foldable slices with a crisp crust and soft interior. The everyday pizza.',
    history: 'Brought by Neapolitan immigrants, adapted to NYC coal/gas ovens and American high-protein flour.',
    isPro: false,
    recipeStyle: RecipeStyle.NEW_YORK,
    technical: {
      hydration: 65,
      salt: 2.0,
      oil: 2.0,
      sugar: 1.0,
      fermentation: 'Long cold ferment (24-72h)',
      fermentationTechnique: FermentationTechnique.DIRECT,
      bakingTempC: 280,
    },
    allowedFermentationTechniques: [FermentationTechnique.DIRECT, FermentationTechnique.POOLISH, FermentationTechnique.BIGA],
    defaultFermentationTechnique: FermentationTechnique.DIRECT,
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
    notes: ['Ideal for home ovens.', 'Sugar helps with browning.'],
    tags: ['crispy', 'home-oven', 'foldable']
  },
  {
    id: 'focaccia_genovese',
    name: 'Focaccia Genovese',
    family: 'Italian Rustic Breads',
    category: 'bread',
    country: 'Italy',
    year: 'Ancient',
    description: 'Flatbread, oily, with characteristic dimples and a salty crust.',
    history: 'A classic from Liguria, served for breakfast or as a snack. Brine (water + salt) and olive oil on top are essential.',
    isPro: false,
    recipeStyle: RecipeStyle.FOCACCIA,
    technical: {
      hydration: 75,
      salt: 2.5,
      oil: 5.0, // In dough
      sugar: 1.0,
      fermentation: 'Medium (direct or poolish)',
      fermentationTechnique: FermentationTechnique.DIRECT,
      bakingTempC: 230,
    },
    allowedFermentationTechniques: [FermentationTechnique.DIRECT, FermentationTechnique.POOLISH, FermentationTechnique.BIGA],
    defaultFermentationTechnique: FermentationTechnique.DIRECT,
    ingredients: [
      { id: 'flour', name: 'Medium/Strong Flour', type: 'solid', role: 'flour', bakerPercentage: 100 },
      { id: 'water', name: 'Water', type: 'liquid', role: 'water', bakerPercentage: 75 },
      { id: 'salt', name: 'Salt', type: 'solid', role: 'salt', bakerPercentage: 2.5 },
      { id: 'oil', name: 'Olive Oil (Dough)', type: 'liquid', role: 'fat', bakerPercentage: 5.0 },
      { id: 'yeast', name: 'Yeast', type: 'solid', role: 'yeast', bakerPercentage: 0.5 },
      { id: 'sugar', name: 'Malt/Sugar', type: 'solid', role: 'sugar', bakerPercentage: 1.0 }
    ],
    risks: ['Sticking to the pan if not oiled enough.', 'Dense crumb if under-proofed.'],
    notes: ['Dimple vigorously with fingers.', 'Drizzle with brine before baking.'],
    tags: ['easy', 'oily', 'snack']
  },
  {
    id: 'brioche_classico',
    name: 'French Brioche',
    family: 'Viennoiserie',
    category: 'enriched_bread',
    country: 'France',
    year: '17th Century',
    description: 'Enriched dough, buttery, soft, and golden. The pinnacle of viennoiserie.',
    history: 'Originating in Normandy, famous for its high butter and egg content.',
    isPro: true,
    recipeStyle: RecipeStyle.BRIOCHE,
    technical: {
      hydration: 15, // Milk/Water is low, hydration comes from eggs
      salt: 2.0,
      oil: 50.0, // Butter
      sugar: 12.0,
      fermentation: 'Long cold ferment (mandatory for handling)',
      fermentationTechnique: FermentationTechnique.DIRECT,
      bakingTempC: 180,
    },
    allowedFermentationTechniques: [FermentationTechnique.DIRECT],
    defaultFermentationTechnique: FermentationTechnique.DIRECT,
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
    notes: ['Use cold ingredients.', 'Knead to windowpane before adding butter.'],
    tags: ['rich', 'buttery', 'soft']
  },
  {
      id: 'teglia_romana',
      name: 'Roman Pan Pizza (Teglia)',
      family: 'Pizza Romana',
      category: 'pizza',
      country: 'Italy',
      year: '1980s (modern)',
      description: 'High hydration, baked in rectangular pans. Crispy bottom, very airy crumb.',
      history: 'The reinvention of Roman pizza al taglio, focused on digestibility and open crumb structure.',
      isPro: true,
      recipeStyle: RecipeStyle.ROMANA_TONDA, // Mapping to existing enum for Roman style
      technical: {
        hydration: 80,
        salt: 2.5,
        oil: 3.0,
        sugar: 0,
        fermentation: 'Long cold ferment (24-48h)',
        fermentationTechnique: FermentationTechnique.DIRECT,
        bakingTempC: 250,
      },
      allowedFermentationTechniques: [FermentationTechnique.DIRECT, FermentationTechnique.POOLISH, FermentationTechnique.BIGA],
      defaultFermentationTechnique: FermentationTechnique.DIRECT,
      ingredients: [
        { id: 'flour', name: 'Very Strong Flour (W320+)', type: 'solid', role: 'flour', bakerPercentage: 100 },
        { id: 'water', name: 'Ice Water', type: 'liquid', role: 'water', bakerPercentage: 80 },
        { id: 'salt', name: 'Salt', type: 'solid', role: 'salt', bakerPercentage: 2.5 },
        { id: 'oil', name: 'Olive Oil', type: 'liquid', role: 'fat', bakerPercentage: 3.0 },
        { id: 'yeast', name: 'Yeast', type: 'solid', role: 'yeast', bakerPercentage: 0.6 }
      ],
      risks: ['Hard to handle (very wet).', 'Requires stretch & fold.'],
      notes: ['Use semolina for stretching.', 'Bake on the bottom rack for a crispy base.'],
      tags: ['high-hydration', 'crispy', 'airy']
  },
  {
    id: 'burger_bun_brioche',
    name: 'Brioche Burger Bun',
    family: 'Buns',
    category: 'burger_bun',
    country: 'USA/France',
    year: 'Modern',
    description: 'The ultimate burger vehicle. Soft, sturdy, and slightly sweet.',
    history: 'Adapted from French brioche to hold a juicy burger patty without disintegrating.',
    isPro: false,
    recipeStyle: RecipeStyle.BURGER_BUN,
    technical: {
        hydration: 50, // Low water, high egg/butter
        salt: 2.0,
        oil: 15.0, // Butter
        sugar: 8.0,
        fermentation: 'Standard (2-4h total)',
        fermentationTechnique: FermentationTechnique.DIRECT,
        bakingTempC: 190
    },
    allowedFermentationTechniques: [FermentationTechnique.DIRECT, FermentationTechnique.POOLISH],
    defaultFermentationTechnique: FermentationTechnique.DIRECT,
    ingredients: [
        { id: 'flour', name: 'Bread Flour', type: 'solid', role: 'flour', bakerPercentage: 100 },
        { id: 'water', name: 'Water/Milk', type: 'liquid', role: 'water', bakerPercentage: 30 },
        { id: 'eggs', name: 'Eggs', type: 'liquid', role: 'other', bakerPercentage: 20 },
        { id: 'butter', name: 'Butter', type: 'solid', role: 'fat', bakerPercentage: 15 },
        { id: 'sugar', name: 'Sugar', type: 'solid', role: 'sugar', bakerPercentage: 8 },
        { id: 'salt', name: 'Salt', type: 'solid', role: 'salt', bakerPercentage: 2.0 },
        { id: 'yeast', name: 'Instant Yeast', type: 'solid', role: 'yeast', bakerPercentage: 1.0 }
    ],
    notes: ['Egg wash before baking for shine.', 'Toast the cut side before assembling.'],
    tags: ['soft', 'bbq', 'sandwich']
  },
  {
    id: 'hokkaido_milk_bread',
    name: 'Hokkaido Milk Bread',
    family: 'Asian Breads',
    category: 'enriched_bread',
    country: 'Japan',
    year: '20th Century',
    description: 'Incredibly soft, fluffy bread made with Tangzhong (water roux).',
    history: 'Uses the Tangzhong method to pre-gelatinize starches, holding more moisture and keeping the bread soft for days.',
    isPro: true,
    recipeStyle: RecipeStyle.HOKKAIDO_MILK_BREAD,
    technical: {
        hydration: 70,
        salt: 1.5,
        oil: 8.0, // Butter
        sugar: 10.0,
        fermentation: 'Standard direct',
        fermentationTechnique: FermentationTechnique.DIRECT,
        bakingTempC: 175
    },
    allowedFermentationTechniques: [FermentationTechnique.DIRECT],
    defaultFermentationTechnique: FermentationTechnique.DIRECT,
    ingredients: [
        { id: 'flour', name: 'Bread Flour', type: 'solid', role: 'flour', bakerPercentage: 100 },
        { id: 'milk', name: 'Milk', type: 'liquid', role: 'water', bakerPercentage: 70 },
        { id: 'tangzhong', name: 'Tangzhong (Flour)', type: 'solid', role: 'other', bakerPercentage: 5 }, // 5% of total flour pre-cooked
        { id: 'butter', name: 'Butter', type: 'solid', role: 'fat', bakerPercentage: 8 },
        { id: 'sugar', name: 'Sugar', type: 'solid', role: 'sugar', bakerPercentage: 10 },
        { id: 'salt', name: 'Salt', type: 'solid', role: 'salt', bakerPercentage: 1.5 },
        { id: 'yeast', name: 'Instant Yeast', type: 'solid', role: 'yeast', bakerPercentage: 1.2 }
    ],
    notes: ['Requires making a roux (Tangzhong) first.', 'Very sticky dough initially.'],
    tags: ['soft', 'asian', 'fluffy']
  },
  {
    id: 'ny_cookie',
    name: 'NY Chocolate Chip Cookie',
    family: 'Cookies',
    category: 'cookie',
    country: 'USA',
    year: 'Modern',
    description: 'Thick, gooey center, crispy edges. Levain Bakery style.',
    history: 'A modern classic that emphasizes a huge 6oz cookie size and very short bake time at high temp.',
    isPro: false,
    recipeStyle: RecipeStyle.COOKIE_NY_CHOC_CHIP,
    technical: {
        hydration: 0, // No water usually, just eggs/butter
        salt: 1.5,
        oil: 60.0, // Butter
        sugar: 70.0, // Brown + White
        fermentation: 'Chill 24h (no yeast)',
        fermentationTechnique: FermentationTechnique.DIRECT, // Mapped to direct for calc
        bakingTempC: 200
    },
    allowedFermentationTechniques: [FermentationTechnique.DIRECT], // Cookies are always direct
    defaultFermentationTechnique: FermentationTechnique.DIRECT,
    ingredients: [
        { id: 'flour', name: 'AP/Cake Flour Mix', type: 'solid', role: 'flour', bakerPercentage: 100 },
        { id: 'butter', name: 'Cold Butter', type: 'solid', role: 'fat', bakerPercentage: 60 },
        { id: 'sugar', name: 'Sugar (Brown+White)', type: 'solid', role: 'sugar', bakerPercentage: 70 },
        { id: 'eggs', name: 'Eggs', type: 'liquid', role: 'other', bakerPercentage: 20 },
        { id: 'chocolate', name: 'Chocolate Chunks', type: 'solid', role: 'other', bakerPercentage: 80 },
        { id: 'leavening', name: 'Baking Powder/Soda', type: 'solid', role: 'other', bakerPercentage: 1.5 },
        { id: 'salt', name: 'Sea Salt', type: 'solid', role: 'salt', bakerPercentage: 1.5 }
    ],
    notes: ['Do not overmix.', 'Chill dough for 24h to develop flavor and prevent spreading.'],
    tags: ['sweet', 'dessert', 'dense']
  },
  {
    id: 'cinnamon_roll',
    name: 'Classic Cinnamon Roll',
    family: 'Viennoiserie',
    category: 'pastry',
    country: 'Sweden/USA',
    year: '1920s',
    description: 'Sweet rolled dough with cinnamon-sugar filling and frosting.',
    history: 'Evolved from Swedish Kanelbulle, Americanized with cream cheese frosting and softer texture.',
    isPro: false,
    recipeStyle: RecipeStyle.CINNAMON_ROLL,
    technical: {
        hydration: 55,
        salt: 1.5,
        oil: 15.0,
        sugar: 15.0,
        fermentation: 'Standard',
        fermentationTechnique: FermentationTechnique.DIRECT,
        bakingTempC: 190
    },
    allowedFermentationTechniques: [FermentationTechnique.DIRECT, FermentationTechnique.POOLISH],
    defaultFermentationTechnique: FermentationTechnique.DIRECT,
    ingredients: [
        { id: 'flour', name: 'All Purpose', type: 'solid', role: 'flour', bakerPercentage: 100 },
        { id: 'milk', name: 'Warm Milk', type: 'liquid', role: 'water', bakerPercentage: 55 },
        { id: 'butter', name: 'Melted Butter', type: 'solid', role: 'fat', bakerPercentage: 15 },
        { id: 'sugar', name: 'Sugar', type: 'solid', role: 'sugar', bakerPercentage: 15 },
        { id: 'yeast', name: 'Instant Yeast', type: 'solid', role: 'yeast', bakerPercentage: 1.5 },
        { id: 'salt', name: 'Salt', type: 'solid', role: 'salt', bakerPercentage: 1.5 }
    ],
    notes: ['Filling is extra (butter/cinnamon/sugar).', 'Cut with dental floss for clean spirals.'],
    tags: ['sweet', 'breakfast', 'soft']
  }
];

export function getStyleById(id: string): DoughStyleDefinition | undefined {
  return STYLES_DATA.find(s => s.id === id);
}

/**
 * Returns the allowed fermentation techniques for a given style and bake type.
 * If a specific style definition exists, it uses that.
 * Otherwise, it falls back to defaults based on the BakeType category.
 */
export function getAllowedFermentationTechniques(style: RecipeStyle, bakeType: BakeType): FermentationTechnique[] {
    // 1. Check if we have a specific definition in STYLES_DATA
    const definition = STYLES_DATA.find(s => s.recipeStyle === style);
    if (definition && definition.allowedFermentationTechniques) {
        return definition.allowedFermentationTechniques;
    }

    // 2. Fallback logic based on BakeType categories
    if (bakeType === BakeType.SWEETS_PASTRY) {
        // Most pastries (cookies, cakes, pie dough) use chemical leavening or physical aeration (butter),
        // so "Direct" is the only logical mapping for the "fermentation" slot in this context.
        return [FermentationTechnique.DIRECT];
    }

    // Pizzas and Breads generally allow all preferment types
    return [
        FermentationTechnique.DIRECT,
        FermentationTechnique.POOLISH,
        FermentationTechnique.BIGA
    ];
}
