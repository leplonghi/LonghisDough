
import { DoughStyleDefinition, FermentationTechnique, RecipeStyle, BakeType } from '../types';

export const STYLES_DATA: DoughStyleDefinition[] = [
  // --- PIZZA ---
  {
    id: 'napolitana_classica',
    name: 'Neapolitan Pizza (Classic)',
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
    id: 'teglia_romana',
    name: 'Roman Pan Pizza (Teglia)',
    category: 'pizza',
    country: 'Italy',
    year: '1980s (modern)',
    description: 'High hydration, baked in rectangular pans. Crispy bottom, very airy crumb.',
    history: 'The reinvention of Roman pizza al taglio, focused on digestibility and open crumb structure.',
    isPro: true,
    recipeStyle: RecipeStyle.ROMAN,
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
    id: 'focaccia_genovese',
    name: 'Focaccia Genovese',
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

  // --- BREADS ---
  {
    id: 'bread_rustic_sourdough',
    name: 'Rustic Sourdough Loaf',
    category: 'bread',
    country: 'Global',
    year: 'Ancient',
    description: 'Thick crust, open crumb, complex flavor driven by wild yeast.',
    history: 'The oldest form of leavened bread, relying on a natural starter culture.',
    isPro: true,
    recipeStyle: RecipeStyle.COUNTRY_LOAF,
    technical: {
      hydration: 75,
      salt: 2.0,
      oil: 0,
      sugar: 0,
      fermentation: 'Long ambient/cold (24h+)',
      fermentationTechnique: FermentationTechnique.DIRECT,
      bakingTempC: 240,
    },
    allowedFermentationTechniques: [FermentationTechnique.DIRECT],
    defaultFermentationTechnique: FermentationTechnique.DIRECT,
    ingredients: [
      { id: 'flour', name: 'Bread/Whole Wheat Mix', type: 'solid', role: 'flour', bakerPercentage: 100 },
      { id: 'water', name: 'Water', type: 'liquid', role: 'water', bakerPercentage: 75 },
      { id: 'salt', name: 'Salt', type: 'solid', role: 'salt', bakerPercentage: 2.0 },
      { id: 'levain', name: 'Levain (100% Hyd)', type: 'solid', role: 'starter', bakerPercentage: 20 }
    ],
    notes: ['Requires active starter.', 'Bake in Dutch Oven for steam.'],
    tags: ['artisan', 'crusty', 'wild-yeast']
  },
  {
    id: 'bread_baguette_classic',
    name: 'Classic French Baguette',
    category: 'bread',
    country: 'France',
    year: '19th Century',
    description: 'Iconic long, thin loaf with a crisp crust and open, creamy crumb.',
    history: 'Regulated by French law (flour, water, salt, yeast). Poolish is often used for flavor.',
    isPro: true,
    recipeStyle: RecipeStyle.BAGUETTE,
    technical: {
      hydration: 70,
      salt: 2.0,
      oil: 0,
      sugar: 0,
      fermentation: 'Poolish + Bulk',
      fermentationTechnique: FermentationTechnique.POOLISH,
      bakingTempC: 250,
    },
    allowedFermentationTechniques: [FermentationTechnique.DIRECT, FermentationTechnique.POOLISH],
    defaultFermentationTechnique: FermentationTechnique.POOLISH,
    ingredients: [
      { id: 'flour', name: 'T65 / Bread Flour', type: 'solid', role: 'flour', bakerPercentage: 100 },
      { id: 'water', name: 'Water', type: 'liquid', role: 'water', bakerPercentage: 70 },
      { id: 'salt', name: 'Salt', type: 'solid', role: 'salt', bakerPercentage: 2.0 },
      { id: 'yeast', name: 'Yeast', type: 'solid', role: 'yeast', bakerPercentage: 0.5 }
    ],
    notes: ['Steam is essential for the crust.', 'Handle gently to preserve gas.'],
    tags: ['classic', 'crispy', 'challenging']
  },
  {
    id: 'bread_sandwich_loaf',
    name: 'Sandwich Loaf (Pullman)',
    category: 'bread',
    country: 'USA/UK',
    year: '20th Century',
    description: 'Soft, tight crumb, square shape. Perfect for toast and sandwiches.',
    history: 'Baked in a lidded pan (Pullman) to create a perfectly square cross-section.',
    isPro: false,
    recipeStyle: RecipeStyle.SANDWICH_LOAF,
    technical: {
      hydration: 62,
      salt: 2.0,
      oil: 5.0, // Butter/Oil
      sugar: 4.0,
      fermentation: 'Direct',
      fermentationTechnique: FermentationTechnique.DIRECT,
      bakingTempC: 190,
    },
    allowedFermentationTechniques: [FermentationTechnique.DIRECT, FermentationTechnique.POOLISH],
    defaultFermentationTechnique: FermentationTechnique.DIRECT,
    ingredients: [
      { id: 'flour', name: 'Bread Flour', type: 'solid', role: 'flour', bakerPercentage: 100 },
      { id: 'water', name: 'Water/Milk', type: 'liquid', role: 'water', bakerPercentage: 62 },
      { id: 'salt', name: 'Salt', type: 'solid', role: 'salt', bakerPercentage: 2.0 },
      { id: 'sugar', name: 'Sugar', type: 'solid', role: 'sugar', bakerPercentage: 4.0 },
      { id: 'oil', name: 'Butter/Oil', type: 'solid', role: 'fat', bakerPercentage: 5.0 },
      { id: 'yeast', name: 'Yeast', type: 'solid', role: 'yeast', bakerPercentage: 1.0 }
    ],
    tags: ['soft', 'everyday', 'family']
  },
  {
    id: 'bread_ciabatta',
    name: 'Ciabatta',
    category: 'bread',
    country: 'Italy',
    year: '1982',
    description: 'High hydration, rustic slipper-shaped bread with huge irregular holes.',
    history: 'Invented in Adria, Italy, as a response to the French baguette. Often uses Biga.',
    isPro: true,
    recipeStyle: RecipeStyle.CIABATTA,
    technical: {
      hydration: 80,
      salt: 2.2,
      oil: 3.0,
      sugar: 0,
      fermentation: 'Biga + High Hydration',
      fermentationTechnique: FermentationTechnique.BIGA,
      bakingTempC: 240,
    },
    allowedFermentationTechniques: [FermentationTechnique.BIGA, FermentationTechnique.POOLISH, FermentationTechnique.DIRECT],
    defaultFermentationTechnique: FermentationTechnique.BIGA,
    ingredients: [
      { id: 'flour', name: 'Strong Flour', type: 'solid', role: 'flour', bakerPercentage: 100 },
      { id: 'water', name: 'Water', type: 'liquid', role: 'water', bakerPercentage: 80 },
      { id: 'salt', name: 'Salt', type: 'solid', role: 'salt', bakerPercentage: 2.2 },
      { id: 'oil', name: 'Olive Oil', type: 'liquid', role: 'fat', bakerPercentage: 3.0 },
      { id: 'yeast', name: 'Yeast', type: 'solid', role: 'yeast', bakerPercentage: 0.5 }
    ],
    tags: ['rustic', 'airy', 'chewy']
  },

  // --- ENRICHED BREADS ---
  {
    id: 'enriched_brioche_classic',
    name: 'Classic Brioche',
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
      fermentation: 'Long cold ferment',
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
    risks: ['Butter melting during mix', 'Burning sugar'],
    tags: ['rich', 'buttery', 'soft']
  },
  {
    id: 'enriched_milk_bread_hokkaido',
    name: 'Hokkaido Milk Bread',
    category: 'enriched_bread',
    country: 'Japan',
    year: '20th Century',
    description: 'Incredibly soft, fluffy bread made with Tangzhong (water roux).',
    history: 'Uses the Tangzhong method to pre-gelatinize starches, holding more moisture.',
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
      { id: 'tangzhong', name: 'Tangzhong', type: 'solid', role: 'other', bakerPercentage: 5 },
      { id: 'butter', name: 'Butter', type: 'solid', role: 'fat', bakerPercentage: 8 },
      { id: 'sugar', name: 'Sugar', type: 'solid', role: 'sugar', bakerPercentage: 10 },
      { id: 'salt', name: 'Salt', type: 'solid', role: 'salt', bakerPercentage: 1.5 },
      { id: 'yeast', name: 'Instant Yeast', type: 'solid', role: 'yeast', bakerPercentage: 1.2 }
    ],
    tags: ['soft', 'asian', 'fluffy']
  },
  {
    id: 'enriched_dinner_roll_soft',
    name: 'Soft Dinner Rolls',
    category: 'enriched_bread',
    country: 'USA',
    year: 'Modern',
    description: 'Classic fluffy white rolls, slightly sweet, perfect for gravy.',
    history: 'A staple of American holiday dinners.',
    isPro: false,
    recipeStyle: RecipeStyle.DINNER_ROLLS,
    technical: {
      hydration: 62,
      salt: 1.8,
      oil: 10.0, // Butter
      sugar: 8.0,
      fermentation: 'Direct',
      fermentationTechnique: FermentationTechnique.DIRECT,
      bakingTempC: 190,
    },
    allowedFermentationTechniques: [FermentationTechnique.DIRECT, FermentationTechnique.POOLISH],
    defaultFermentationTechnique: FermentationTechnique.DIRECT,
    ingredients: [
      { id: 'flour', name: 'AP Flour', type: 'solid', role: 'flour', bakerPercentage: 100 },
      { id: 'milk', name: 'Milk/Water', type: 'liquid', role: 'water', bakerPercentage: 62 },
      { id: 'butter', name: 'Butter', type: 'solid', role: 'fat', bakerPercentage: 10.0 },
      { id: 'sugar', name: 'Sugar', type: 'solid', role: 'sugar', bakerPercentage: 8.0 },
      { id: 'salt', name: 'Salt', type: 'solid', role: 'salt', bakerPercentage: 1.8 },
      { id: 'yeast', name: 'Yeast', type: 'solid', role: 'yeast', bakerPercentage: 1.5 }
    ],
    tags: ['soft', 'side-dish', 'easy']
  },

  // --- BURGER BUNS ---
  {
    id: 'burger_bun_brioche',
    name: 'Brioche Burger Bun',
    category: 'burger_bun',
    country: 'USA/France',
    year: 'Modern',
    description: 'The ultimate burger vehicle. Soft, sturdy, and slightly sweet.',
    history: 'Adapted from French brioche to hold a juicy burger patty without disintegrating.',
    isPro: false,
    recipeStyle: RecipeStyle.BURGER_BUN,
    technical: {
        hydration: 55, 
        salt: 2.0,
        oil: 15.0, // Butter
        sugar: 8.0,
        fermentation: 'Direct',
        fermentationTechnique: FermentationTechnique.DIRECT,
        bakingTempC: 190
    },
    allowedFermentationTechniques: [FermentationTechnique.DIRECT, FermentationTechnique.POOLISH],
    defaultFermentationTechnique: FermentationTechnique.DIRECT,
    ingredients: [
        { id: 'flour', name: 'Bread Flour', type: 'solid', role: 'flour', bakerPercentage: 100 },
        { id: 'water', name: 'Water/Milk', type: 'liquid', role: 'water', bakerPercentage: 35 },
        { id: 'eggs', name: 'Eggs', type: 'liquid', role: 'other', bakerPercentage: 20 },
        { id: 'butter', name: 'Butter', type: 'solid', role: 'fat', bakerPercentage: 15 },
        { id: 'sugar', name: 'Sugar', type: 'solid', role: 'sugar', bakerPercentage: 8 },
        { id: 'salt', name: 'Salt', type: 'solid', role: 'salt', bakerPercentage: 2.0 },
        { id: 'yeast', name: 'Instant Yeast', type: 'solid', role: 'yeast', bakerPercentage: 1.0 }
    ],
    notes: ['Egg wash before baking for shine.', 'Toast the cut side before assembling.'],
    tags: ['soft', 'burger', 'sweet']
  },
  {
    id: 'burger_bun_potato',
    name: 'Potato Burger Bun',
    category: 'burger_bun',
    country: 'USA',
    year: '19th Century',
    description: 'Uses mashed potato or potato flour for extreme softness and moisture retention.',
    history: 'The secret to the softness of Martin\'s Potato Rolls, iconic in Shake Shack burgers.',
    isPro: false,
    recipeStyle: RecipeStyle.BURGER_BUN,
    technical: {
      hydration: 60, // Plus water in potatoes
      salt: 2.0,
      oil: 12.0,
      sugar: 12.0,
      fermentation: 'Direct',
      fermentationTechnique: FermentationTechnique.DIRECT,
      bakingTempC: 190,
    },
    allowedFermentationTechniques: [FermentationTechnique.DIRECT],
    defaultFermentationTechnique: FermentationTechnique.DIRECT,
    ingredients: [
      { id: 'flour', name: 'Bread Flour', type: 'solid', role: 'flour', bakerPercentage: 100 },
      { id: 'potato', name: 'Mashed Potato', type: 'solid', role: 'other', bakerPercentage: 30 },
      { id: 'water', name: 'Water', type: 'liquid', role: 'water', bakerPercentage: 45 },
      { id: 'butter', name: 'Butter', type: 'solid', role: 'fat', bakerPercentage: 12 },
      { id: 'sugar', name: 'Sugar', type: 'solid', role: 'sugar', bakerPercentage: 12 },
      { id: 'salt', name: 'Salt', type: 'solid', role: 'salt', bakerPercentage: 2.0 },
      { id: 'yeast', name: 'Yeast', type: 'solid', role: 'yeast', bakerPercentage: 1.5 }
    ],
    tags: ['soft', 'potato', 'moist']
  },
  {
    id: 'burger_bun_classic_soft',
    name: 'Classic Soft White Bun',
    category: 'burger_bun',
    country: 'USA',
    year: 'Modern',
    description: 'Simple, soft, commercial-style bun without heavy richness.',
    history: 'The standard barbecue bun, designed to be neutral and soft.',
    isPro: false,
    recipeStyle: RecipeStyle.BURGER_BUN,
    technical: {
      hydration: 60,
      salt: 1.8,
      oil: 6.0,
      sugar: 6.0,
      fermentation: 'Direct',
      fermentationTechnique: FermentationTechnique.DIRECT,
      bakingTempC: 190,
    },
    allowedFermentationTechniques: [FermentationTechnique.DIRECT],
    defaultFermentationTechnique: FermentationTechnique.DIRECT,
    ingredients: [
      { id: 'flour', name: 'AP Flour', type: 'solid', role: 'flour', bakerPercentage: 100 },
      { id: 'water', name: 'Water', type: 'liquid', role: 'water', bakerPercentage: 60 },
      { id: 'oil', name: 'Vegetable Oil', type: 'liquid', role: 'fat', bakerPercentage: 6.0 },
      { id: 'sugar', name: 'Sugar', type: 'solid', role: 'sugar', bakerPercentage: 6.0 },
      { id: 'salt', name: 'Salt', type: 'solid', role: 'salt', bakerPercentage: 1.8 },
      { id: 'yeast', name: 'Yeast', type: 'solid', role: 'yeast', bakerPercentage: 1.5 }
    ],
    tags: ['simple', 'soft', 'neutral']
  },

  // --- PASTRY ---
  {
    id: 'pastry_cinnamon_roll',
    name: 'Cinnamon Rolls',
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
    allowedFermentationTechniques: [FermentationTechnique.DIRECT],
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
  },
  {
    id: 'pastry_sweet_roll_enriched',
    name: 'Enriched Sweet Roll',
    category: 'pastry',
    country: 'Global',
    year: 'Modern',
    description: 'Base dough for various fillings (fruit, cheese, chocolate).',
    history: 'A versatile sweet dough used in many cultures for breakfast pastries.',
    isPro: false,
    recipeStyle: RecipeStyle.SWEET_ROLL,
    technical: {
      hydration: 58,
      salt: 1.5,
      oil: 12.0,
      sugar: 18.0,
      fermentation: 'Direct',
      fermentationTechnique: FermentationTechnique.DIRECT,
      bakingTempC: 180,
    },
    allowedFermentationTechniques: [FermentationTechnique.DIRECT],
    defaultFermentationTechnique: FermentationTechnique.DIRECT,
    ingredients: [
      { id: 'flour', name: 'AP Flour', type: 'solid', role: 'flour', bakerPercentage: 100 },
      { id: 'milk', name: 'Milk', type: 'liquid', role: 'water', bakerPercentage: 58 },
      { id: 'butter', name: 'Butter', type: 'solid', role: 'fat', bakerPercentage: 12 },
      { id: 'sugar', name: 'Sugar', type: 'solid', role: 'sugar', bakerPercentage: 18 },
      { id: 'salt', name: 'Salt', type: 'solid', role: 'salt', bakerPercentage: 1.5 },
      { id: 'yeast', name: 'Yeast', type: 'solid', role: 'yeast', bakerPercentage: 1.8 }
    ],
    tags: ['versatile', 'sweet', 'base']
  },
  {
    id: 'pastry_babka',
    name: 'Babka',
    category: 'pastry',
    country: 'Poland/Jewish',
    year: '19th Century',
    description: 'Dense, rich, twisted yeast cake, often with chocolate or cinnamon.',
    history: 'Originated in Jewish communities of Eastern Europe. Modern versions use high butter content.',
    isPro: true,
    recipeStyle: RecipeStyle.BABKA,
    technical: {
      hydration: 30, // Low water, high egg
      salt: 1.5,
      oil: 30.0, // Butter
      sugar: 15.0,
      fermentation: 'Cold Ferment (Mandatory)',
      fermentationTechnique: FermentationTechnique.DIRECT,
      bakingTempC: 175,
    },
    allowedFermentationTechniques: [FermentationTechnique.DIRECT],
    defaultFermentationTechnique: FermentationTechnique.DIRECT,
    ingredients: [
      { id: 'flour', name: 'AP Flour', type: 'solid', role: 'flour', bakerPercentage: 100 },
      { id: 'eggs', name: 'Eggs', type: 'liquid', role: 'other', bakerPercentage: 30 },
      { id: 'milk', name: 'Milk', type: 'liquid', role: 'water', bakerPercentage: 30 },
      { id: 'butter', name: 'Butter', type: 'solid', role: 'fat', bakerPercentage: 30 },
      { id: 'sugar', name: 'Sugar', type: 'solid', role: 'sugar', bakerPercentage: 15 },
      { id: 'salt', name: 'Salt', type: 'solid', role: 'salt', bakerPercentage: 1.5 },
      { id: 'yeast', name: 'Yeast', type: 'solid', role: 'yeast', bakerPercentage: 2.0 }
    ],
    notes: ['Twisting layers creates the pattern.', 'Syrup soak after baking is crucial.'],
    tags: ['rich', 'chocolate', 'twisted']
  },
  {
    id: 'pastry_donut_yeasted',
    name: 'Yeasted Donuts',
    category: 'pastry',
    country: 'Global',
    year: '19th Century',
    description: 'Light, airy fried dough. The classic glazed donut.',
    history: 'Distinct from cake donuts, these rely on yeast for lift and airy texture.',
    isPro: false,
    recipeStyle: RecipeStyle.DONUT,
    technical: {
      hydration: 55,
      salt: 1.5,
      oil: 10.0, // Shortening/Butter
      sugar: 12.0,
      fermentation: 'Proof then Fry',
      fermentationTechnique: FermentationTechnique.DIRECT,
      bakingTempC: 190, // Frying temp
    },
    allowedFermentationTechniques: [FermentationTechnique.DIRECT],
    defaultFermentationTechnique: FermentationTechnique.DIRECT,
    ingredients: [
      { id: 'flour', name: 'AP/Bread Flour', type: 'solid', role: 'flour', bakerPercentage: 100 },
      { id: 'milk', name: 'Milk', type: 'liquid', role: 'water', bakerPercentage: 55 },
      { id: 'fat', name: 'Shortening/Butter', type: 'solid', role: 'fat', bakerPercentage: 10 },
      { id: 'sugar', name: 'Sugar', type: 'solid', role: 'sugar', bakerPercentage: 12 },
      { id: 'salt', name: 'Salt', type: 'solid', role: 'salt', bakerPercentage: 1.5 },
      { id: 'yeast', name: 'Yeast', type: 'solid', role: 'yeast', bakerPercentage: 2.0 },
      { id: 'egg', name: 'Yolk', type: 'liquid', role: 'other', bakerPercentage: 8 }
    ],
    notes: ['Fry at 185-190°C.', 'Proof until they float in oil.'],
    tags: ['fried', 'airy', 'sweet']
  },

  // --- COOKIES ---
  {
    id: 'cookie_chocolate_chip_classic',
    name: 'Classic Chocolate Chip Cookie',
    category: 'cookie',
    country: 'USA',
    year: '1938',
    description: 'The standard. Crispy edge, chewy center, chocolate pools.',
    history: 'Invented by Ruth Wakefield at the Toll House Inn. Relies on brown sugar for chew.',
    isPro: false,
    recipeStyle: RecipeStyle.COOKIES,
    technical: {
        hydration: 0, // Liquid is egg
        salt: 1.2,
        oil: 55.0, // Butter
        sugar: 65.0,
        fermentation: 'Chill only',
        fermentationTechnique: FermentationTechnique.DIRECT,
        bakingTempC: 180
    },
    allowedFermentationTechniques: [FermentationTechnique.DIRECT],
    defaultFermentationTechnique: FermentationTechnique.DIRECT,
    ingredients: [
        { id: 'flour', name: 'AP Flour', type: 'solid', role: 'flour', bakerPercentage: 100 },
        { id: 'butter', name: 'Butter', type: 'solid', role: 'fat', bakerPercentage: 55 },
        { id: 'sugar', name: 'Sugar (White+Brown)', type: 'solid', role: 'sugar', bakerPercentage: 65 },
        { id: 'eggs', name: 'Eggs', type: 'liquid', role: 'other', bakerPercentage: 18 },
        { id: 'chips', name: 'Chocolate Chips', type: 'solid', role: 'other', bakerPercentage: 60 },
        { id: 'baking_soda', name: 'Baking Soda', type: 'solid', role: 'other', bakerPercentage: 1.0 },
        { id: 'salt', name: 'Salt', type: 'solid', role: 'salt', bakerPercentage: 1.2 }
    ],
    tags: ['classic', 'chewy', 'quick']
  },
  {
    id: 'ny_cookie',
    name: 'NY Chocolate Chip Cookie (Levain Style)',
    category: 'cookie',
    country: 'USA',
    year: 'Modern',
    description: 'Massive 6oz cookie. Thick, gooey center, crispy shell.',
    history: 'A modern heavy-weight style emphasizing volume and under-baking.',
    isPro: true,
    recipeStyle: RecipeStyle.COOKIE_NY_CHOC_CHIP,
    technical: {
        hydration: 0,
        salt: 1.5,
        oil: 60.0,
        sugar: 70.0,
        fermentation: 'Chill 24h',
        fermentationTechnique: FermentationTechnique.DIRECT,
        bakingTempC: 200
    },
    allowedFermentationTechniques: [FermentationTechnique.DIRECT],
    defaultFermentationTechnique: FermentationTechnique.DIRECT,
    ingredients: [
        { id: 'flour', name: 'AP/Cake Mix', type: 'solid', role: 'flour', bakerPercentage: 100 },
        { id: 'butter', name: 'Cold Butter', type: 'solid', role: 'fat', bakerPercentage: 60 },
        { id: 'sugar', name: 'Sugars', type: 'solid', role: 'sugar', bakerPercentage: 70 },
        { id: 'eggs', name: 'Eggs', type: 'liquid', role: 'other', bakerPercentage: 20 },
        { id: 'chocolate', name: 'Chunks', type: 'solid', role: 'other', bakerPercentage: 80 },
        { id: 'walnuts', name: 'Walnuts', type: 'solid', role: 'other', bakerPercentage: 40 },
        { id: 'leavening', name: 'Leavening', type: 'solid', role: 'other', bakerPercentage: 1.5 },
        { id: 'salt', name: 'Salt', type: 'solid', role: 'salt', bakerPercentage: 1.5 }
    ],
    notes: ['Do not flatten balls before baking.', 'Use cold butter for height.'],
    tags: ['thick', 'gooey', 'modern']
  },
  {
    id: 'cookie_brown_butter',
    name: 'Brown Butter Cookie',
    category: 'cookie',
    country: 'Global',
    year: 'Modern',
    description: 'Nutty, toffee-like flavor from browned butter (beurre noisette).',
    history: 'Browning the butter evaporates water and toasts milk solids, intensifying flavor.',
    isPro: true,
    recipeStyle: RecipeStyle.COOKIES,
    technical: {
      hydration: 0,
      salt: 1.5,
      oil: 50.0, // Butter (reduced)
      sugar: 60.0,
      fermentation: 'Chill',
      fermentationTechnique: FermentationTechnique.DIRECT,
      bakingTempC: 175,
    },
    allowedFermentationTechniques: [FermentationTechnique.DIRECT],
    defaultFermentationTechnique: FermentationTechnique.DIRECT,
    ingredients: [
      { id: 'flour', name: 'AP Flour', type: 'solid', role: 'flour', bakerPercentage: 100 },
      { id: 'butter', name: 'Browned Butter', type: 'solid', role: 'fat', bakerPercentage: 50 },
      { id: 'sugar', name: 'Dark Brown Sugar', type: 'solid', role: 'sugar', bakerPercentage: 60 },
      { id: 'eggs', name: 'Eggs', type: 'liquid', role: 'other', bakerPercentage: 18 },
      { id: 'salt', name: 'Sea Salt', type: 'solid', role: 'salt', bakerPercentage: 1.5 },
      { id: 'leavening', name: 'Baking Soda', type: 'solid', role: 'other', bakerPercentage: 1.0 }
    ],
    tags: ['nutty', 'gourmet', 'rich']
  },
  {
    id: 'cookie_shortbread',
    name: 'Shortbread',
    category: 'cookie',
    country: 'Scotland',
    year: 'Medieval',
    description: 'Buttery, crumbly, unleavened biscuit. 1 part sugar, 2 butter, 3 flour.',
    history: 'Classic Scottish biscuit. No eggs or leavening, relies on butter for texture.',
    isPro: false,
    recipeStyle: RecipeStyle.SHORTBREAD,
    technical: {
      hydration: 0,
      salt: 0.5,
      oil: 66.0, // Butter (2 parts to 3 parts flour approx)
      sugar: 33.0,
      fermentation: 'None',
      fermentationTechnique: FermentationTechnique.DIRECT,
      bakingTempC: 160,
    },
    allowedFermentationTechniques: [FermentationTechnique.DIRECT],
    defaultFermentationTechnique: FermentationTechnique.DIRECT,
    ingredients: [
      { id: 'flour', name: 'AP Flour', type: 'solid', role: 'flour', bakerPercentage: 100 },
      { id: 'butter', name: 'Butter', type: 'solid', role: 'fat', bakerPercentage: 66 },
      { id: 'sugar', name: 'Sugar', type: 'solid', role: 'sugar', bakerPercentage: 33 },
      { id: 'salt', name: 'Salt', type: 'solid', role: 'salt', bakerPercentage: 0.5 }
    ],
    notes: ['Bake low and slow.', 'Do not let it brown too much.'],
    tags: ['buttery', 'crumbly', 'simple']
  }
];

export function getStyleById(id: string): DoughStyleDefinition | undefined {
  return STYLES_DATA.find(s => s.id === id);
}

export function getAllowedFermentationTechniques(style: RecipeStyle, bakeType: BakeType): FermentationTechnique[] {
    const definition = STYLES_DATA.find(s => s.recipeStyle === style);
    if (definition && definition.allowedFermentationTechniques) {
        return definition.allowedFermentationTechniques;
    }
    
    // Fallback based on broad category if specific style def not found (though it should be)
    if (bakeType === BakeType.SWEETS_PASTRY) {
        return [FermentationTechnique.DIRECT];
    }

    return [
        FermentationTechnique.DIRECT,
        FermentationTechnique.POOLISH,
        FermentationTechnique.BIGA
    ];
}