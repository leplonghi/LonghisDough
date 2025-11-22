
import { DoughStyleDefinition, FermentationTechnique, RecipeStyle, BakeType } from '../types';

export const STYLES_DATA: DoughStyleDefinition[] = [
  {
    id: 'napolitana_classica',
    name: 'Neapolitan (AVPN Standards)',
    family: 'Pizza Napoletana',
    category: 'pizza',
    origin: { country: 'Italy', region: 'Naples', period: '18th Century' },
    country: 'Italy', // Legacy
    year: '2024 Revision', // Legacy
    releaseDate: '2024-06-01',
    description: 'The strict international standard for True Neapolitan Pizza. Soft, elastic, and baked in 60-90 seconds.',
    history: 'Originating in Naples, the "Verace Pizza Napoletana" is protected by STG regulations. It strictly defines ingredients (flour, water, salt, yeast) and methods (hand-opening, wood-fire).',
    culturalContext: 'More than a dish, it is a UNESCO Intangible Cultural Heritage element. The focus is on digestion, simplicity, and the perfect balance of the "cornicione" (rim).',
    isCanonical: true,
    source: 'official',
    isPro: false,
    recipeStyle: RecipeStyle.NEAPOLITAN,
    technical: {
      hydration: 62, // AVPN allows 55.5-62.5%
      salt: 2.8,
      oil: 0,
      sugar: 0,
      fermentation: '8-24h at room temp',
      fermentationTechnique: FermentationTechnique.DIRECT,
      bakingTempC: 485,
    },
    technicalProfile: {
      hydration: [55.5, 62.5],
      salt: [2.5, 3.0],
      oil: [0, 0],
      sugar: [0, 0],
      flourStrength: "W280-320 (Medium/Strong)",
      fermentation: {
        bulk: "2h",
        proof: "6-22h (Ball)",
        coldRetard: "Allowed but not traditional"
      },
      ovenRecommendations: "Wood-fired or Gas oven capable of 485°C (905°F).",
      difficulty: "Hard",
      recommendedUse: "Authentic experience, high-heat ovens only."
    },
    references: [
      { source: "AVPN International Regulations", url: "https://www.pizzanapoletana.org/en/ricetta_pizza_napoletana" },
      { source: "Modernist Pizza", author: "Nathan Myhrvold", year: "2021" }
    ],
    allowedFermentationTechniques: [FermentationTechnique.DIRECT, FermentationTechnique.BIGA, FermentationTechnique.POOLISH, FermentationTechnique.SOURDOUGH], 
    defaultFermentationTechnique: FermentationTechnique.DIRECT,
    ingredients: [
      { id: 'flour', name: '00 Flour (W280+)', type: 'solid', role: 'flour', bakerPercentage: 100 },
      { id: 'water', name: 'Water', type: 'liquid', role: 'water', bakerPercentage: 62 },
      { id: 'salt', name: 'Sea Salt', type: 'solid', role: 'salt', bakerPercentage: 2.8 },
      { id: 'yeast', name: 'Fresh Yeast', type: 'solid', role: 'yeast', bakerPercentage: 0.15 }
    ],
    tags: ['classic', 'high-heat', 'soft']
  },
  {
    id: 'ny_style',
    name: 'New York Style (Slice Shop)',
    family: 'North American Pizza',
    category: 'pizza',
    origin: { country: 'USA', region: 'New York', period: '1905' },
    country: 'USA', // Legacy
    year: '1905', // Legacy
    description: 'Large, thin, foldable slices with a crisp bottom and chewy crust. The everyday pizza.',
    history: 'Adapted from Neapolitan by immigrants using coal ovens and high-protein American flour. The addition of oil and sugar helps browning in cooler ovens (280-300°C).',
    culturalContext: 'The "slice culture" of NYC defines this style. It is meant to be eaten on the go, folded in half.',
    isCanonical: true,
    source: 'official',
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
    technicalProfile: {
      hydration: [63, 67],
      salt: [2.0, 2.5],
      oil: [1.0, 3.0],
      sugar: [1.0, 2.0],
      flourStrength: "W320+ or High Protein Bread Flour (13-14%)",
      fermentation: {
        bulk: "2h Room Temp",
        proof: "24-72h Cold Retard (Ball)",
      },
      ovenRecommendations: "Home oven with Steel or Deck Oven (280-300°C).",
      difficulty: "Medium",
      recommendedUse: "Best all-rounder for home ovens."
    },
    references: [
      { source: "The Pizza Bible", author: "Tony Gemignani" },
      { source: "Serious Eats", author: "J. Kenji López-Alt" }
    ],
    allowedFermentationTechniques: [FermentationTechnique.DIRECT, FermentationTechnique.POOLISH, FermentationTechnique.BIGA, FermentationTechnique.SOURDOUGH],
    defaultFermentationTechnique: FermentationTechnique.DIRECT,
    ingredients: [
      { id: 'flour', name: 'Bread Flour', type: 'solid', role: 'flour', bakerPercentage: 100 },
      { id: 'water', name: 'Water', type: 'liquid', role: 'water', bakerPercentage: 65 },
      { id: 'salt', name: 'Salt', type: 'solid', role: 'salt', bakerPercentage: 2.0 },
      { id: 'sugar', name: 'Sugar', type: 'solid', role: 'sugar', bakerPercentage: 1.0 },
      { id: 'oil', name: 'Oil/Olive Oil', type: 'liquid', role: 'fat', bakerPercentage: 2.0 },
      { id: 'yeast', name: 'IDY', type: 'solid', role: 'yeast', bakerPercentage: 0.4 }
    ],
    tags: ['crispy', 'home-oven', 'foldable']
  },
  {
    id: 'detroit_style',
    name: 'Detroit Style (Red Top)',
    family: 'North American Pizza',
    category: 'pizza',
    origin: { country: 'USA', region: 'Detroit', period: '1946' },
    country: 'USA',
    year: '1946',
    description: 'Rectangular pan pizza with a thick, airy crust and caramelized cheese edges (frico).',
    history: 'Originated at Buddy\'s Rendezvous, baked in blue steel automotive parts pans. The high sides and oil create a fried texture.',
    culturalContext: 'A symbol of Motor City ingenuity. The "Red Top" refers to sauce ladled on top of the cheese after baking.',
    isCanonical: true,
    source: 'official',
    isPro: true,
    recipeStyle: RecipeStyle.DETROIT,
    technical: {
      hydration: 72,
      salt: 2.2,
      oil: 0, // Oil is in the pan, not dough
      sugar: 0,
      fermentation: 'Medium (4-24h)',
      fermentationTechnique: FermentationTechnique.DIRECT,
      bakingTempC: 260,
    },
    technicalProfile: {
      hydration: [70, 75],
      salt: [2.0, 2.5],
      oil: [0, 0], // Oil used liberally in pan
      sugar: [0, 1.0],
      flourStrength: "Bread Flour (12-13%)",
      fermentation: {
        bulk: "2h",
        proof: "2-4h in Pan (until jiggly)",
      },
      ovenRecommendations: "260°C (500°F). Requires Steel/Aluminum Pan.",
      difficulty: "Easy",
      recommendedUse: "Great for parties and beginners."
    },
    references: [
        { source: "Modernist Pizza", author: "Nathan Myhrvold" },
        { source: "Pizza Today", notes: "Detroit Style Guidelines" }
    ],
    allowedFermentationTechniques: [FermentationTechnique.DIRECT, FermentationTechnique.POOLISH],
    defaultFermentationTechnique: FermentationTechnique.DIRECT,
    ingredients: [
      { id: 'flour', name: 'Bread Flour', type: 'solid', role: 'flour', bakerPercentage: 100 },
      { id: 'water', name: 'Water', type: 'liquid', role: 'water', bakerPercentage: 72 },
      { id: 'salt', name: 'Salt', type: 'solid', role: 'salt', bakerPercentage: 2.2 },
      { id: 'yeast', name: 'IDY', type: 'solid', role: 'yeast', bakerPercentage: 0.6 }
    ],
    tags: ['pan', 'thick', 'cheese-crust']
  },

  // ========================================================================
  // BREADS (New)
  // ========================================================================
  {
    id: 'bread_rustic_sourdough',
    name: 'Rustic Sourdough Loaf',
    family: 'Artisan Breads',
    category: 'bread',
    origin: { country: 'France/USA', region: 'General', period: 'Modern' },
    country: 'International',
    year: 'Ancient/Revival',
    description: 'Crusty, open-crumb bread with a mild sour tang. The gold standard of artisan baking.',
    history: 'Uses wild yeast (levain) instead of commercial yeast. Requires careful fermentation management.',
    culturalContext: 'The symbol of the modern baking revival.',
    isCanonical: true,
    source: 'official',
    isPro: false,
    recipeStyle: RecipeStyle.BREAD_RUSTIC_SOURDOUGH,
    technical: {
      hydration: 75,
      salt: 2.0,
      oil: 0,
      sugar: 0,
      fermentation: 'Long bulk + Cold retard',
      fermentationTechnique: FermentationTechnique.SOURDOUGH,
      bakingTempC: 240,
    },
    technicalProfile: {
      hydration: [70, 85],
      salt: [1.8, 2.2],
      oil: [0, 0],
      sugar: [0, 0],
      flourStrength: "Strong Bread / Whole Wheat mix",
      fermentation: {
        bulk: "4-6h (folds)",
        proof: "12-24h Cold",
      },
      ovenRecommendations: "Dutch Oven or Steam Injection. 240°C.",
      difficulty: "Expert",
      recommendedUse: "Table bread, Toast."
    },
    allowedFermentationTechniques: [FermentationTechnique.SOURDOUGH],
    defaultFermentationTechnique: FermentationTechnique.SOURDOUGH,
    ingredients: [
      { id: 'flour', name: 'Bread Flour', type: 'solid', role: 'flour', bakerPercentage: 90 },
      { id: 'whole', name: 'Whole Wheat', type: 'solid', role: 'flour', bakerPercentage: 10 },
      { id: 'water', name: 'Water', type: 'liquid', role: 'water', bakerPercentage: 75 },
      { id: 'salt', name: 'Sea Salt', type: 'solid', role: 'salt', bakerPercentage: 2.0 },
      { id: 'levain', name: 'Active Starter', type: 'solid', role: 'starter', bakerPercentage: 20 }
    ],
    tags: ['sourdough', 'artisan', 'vegan']
  },
  {
    id: 'bread_baguette_classic',
    name: 'Classic French Baguette',
    family: 'French Lean Breads',
    category: 'bread',
    origin: { country: 'France', period: '19th Century' },
    country: 'France',
    year: '1920',
    description: 'Thin, crisp crust with a creamy, open interior. Requires steam to bake properly.',
    history: 'Iconic symbol of France. Traditionally made with a poolish for flavor and extensibility.',
    culturalContext: 'Daily bread.',
    isCanonical: true,
    source: 'official',
    isPro: true,
    recipeStyle: RecipeStyle.BREAD_BAGUETTE_CLASSIC,
    technical: {
      hydration: 68,
      salt: 2.0,
      oil: 0,
      sugar: 0,
      fermentation: 'Poolish',
      fermentationTechnique: FermentationTechnique.POOLISH,
      bakingTempC: 250,
    },
    allowedFermentationTechniques: [FermentationTechnique.POOLISH, FermentationTechnique.DIRECT, FermentationTechnique.SOURDOUGH],
    defaultFermentationTechnique: FermentationTechnique.POOLISH,
    ingredients: [
      { id: 'flour', name: 'T65 / Bread Flour', type: 'solid', role: 'flour', bakerPercentage: 100 },
      { id: 'water', name: 'Water', type: 'liquid', role: 'water', bakerPercentage: 68 },
      { id: 'salt', name: 'Salt', type: 'solid', role: 'salt', bakerPercentage: 2.0 },
      { id: 'yeast', name: 'Fresh Yeast', type: 'solid', role: 'yeast', bakerPercentage: 0.6 }
    ],
    tags: ['classic', 'crispy', 'challenging']
  },
  {
    id: 'bread_sandwich_loaf',
    name: 'Soft Sandwich Loaf',
    family: 'Pan Breads',
    category: 'bread',
    origin: { country: 'USA/UK', period: '20th Century' },
    country: 'International',
    year: 'Modern',
    description: 'Soft, tight crumb, perfect for slicing and sandwiches. Enriched with a little fat and sugar.',
    history: 'Designed for the pullman pan (pain de mie).',
    isCanonical: true,
    source: 'official',
    isPro: false,
    recipeStyle: RecipeStyle.BREAD_SANDWICH_SOFT,
    technical: {
      hydration: 62,
      salt: 1.8,
      oil: 4.0, // Butter or Oil
      sugar: 4.0,
      fermentation: 'Direct',
      fermentationTechnique: FermentationTechnique.DIRECT,
      bakingTempC: 190,
    },
    allowedFermentationTechniques: [FermentationTechnique.DIRECT, FermentationTechnique.POOLISH],
    defaultFermentationTechnique: FermentationTechnique.DIRECT,
    ingredients: [
      { id: 'flour', name: 'AP Flour', type: 'solid', role: 'flour', bakerPercentage: 100 },
      { id: 'water', name: 'Water/Milk', type: 'liquid', role: 'water', bakerPercentage: 62 },
      { id: 'sugar', name: 'Sugar', type: 'solid', role: 'sugar', bakerPercentage: 4.0 },
      { id: 'oil', name: 'Butter/Oil', type: 'solid', role: 'fat', bakerPercentage: 4.0 },
      { id: 'salt', name: 'Salt', type: 'solid', role: 'salt', bakerPercentage: 1.8 },
      { id: 'yeast', name: 'Instant Yeast', type: 'solid', role: 'yeast', bakerPercentage: 1.0 }
    ],
    tags: ['soft', 'family', 'easy']
  },
  {
    id: 'bread_ciabatta',
    name: 'Ciabatta (Classic)',
    family: 'Italian Rustic Breads',
    category: 'bread',
    origin: { country: 'Italy', region: 'Veneto', period: '1982' },
    country: 'Italy',
    year: '1982',
    description: 'High hydration Italian slipper bread. Chewy crust, very open crumb.',
    history: 'Created to compete with the baguette. Relies on Biga.',
    isCanonical: true,
    source: 'official',
    isPro: false,
    recipeStyle: RecipeStyle.CIABATTA,
    technical: {
      hydration: 78,
      salt: 2.2,
      oil: 2.0,
      sugar: 0,
      fermentation: 'Biga',
      fermentationTechnique: FermentationTechnique.BIGA,
      bakingTempC: 230,
    },
    allowedFermentationTechniques: [FermentationTechnique.BIGA, FermentationTechnique.POOLISH],
    defaultFermentationTechnique: FermentationTechnique.BIGA,
    ingredients: [
      { id: 'flour', name: 'Strong Flour', type: 'solid', role: 'flour', bakerPercentage: 100 },
      { id: 'water', name: 'Water', type: 'liquid', role: 'water', bakerPercentage: 78 },
      { id: 'salt', name: 'Salt', type: 'solid', role: 'salt', bakerPercentage: 2.2 },
      { id: 'oil', name: 'Olive Oil', type: 'liquid', role: 'fat', bakerPercentage: 2.0 },
      { id: 'yeast', name: 'Yeast', type: 'solid', role: 'yeast', bakerPercentage: 0.8 }
    ],
    tags: ['airy', 'rustic', 'chewy']
  },

  // ========================================================================
  // ENRICHED BREADS
  // ========================================================================
  {
    id: 'enriched_brioche_classic',
    name: 'Brioche à Tête',
    family: 'Viennoiserie',
    category: 'enriched_bread',
    origin: { country: 'France', region: 'Paris', period: '17th Century' },
    country: 'France',
    year: 'Classic',
    description: 'Rich, buttery, egg-heavy dough. Soft and flaky.',
    history: 'The high butter content necessitates intensive kneading and cold fermentation to handle.',
    isCanonical: true,
    source: 'official',
    isPro: true,
    recipeStyle: RecipeStyle.ENRICHED_BRIOCHE_CLASSIC,
    technical: {
      hydration: 10, // Liquid mostly from eggs
      salt: 2.0,
      oil: 50.0, // Butter
      sugar: 12.0,
      fermentation: 'Cold Retard',
      fermentationTechnique: FermentationTechnique.DIRECT,
      bakingTempC: 180,
    },
    allowedFermentationTechniques: [FermentationTechnique.DIRECT, FermentationTechnique.POOLISH, FermentationTechnique.SOURDOUGH],
    defaultFermentationTechnique: FermentationTechnique.DIRECT,
    ingredients: [
      { id: 'flour', name: 'Strong Flour', type: 'solid', role: 'flour', bakerPercentage: 100 },
      { id: 'eggs', name: 'Eggs', type: 'liquid', role: 'other', bakerPercentage: 50 },
      { id: 'butter', name: 'Butter (Cold)', type: 'solid', role: 'fat', bakerPercentage: 50 },
      { id: 'sugar', name: 'Sugar', type: 'solid', role: 'sugar', bakerPercentage: 12 },
      { id: 'milk', name: 'Milk', type: 'liquid', role: 'water', bakerPercentage: 10 },
      { id: 'salt', name: 'Salt', type: 'solid', role: 'salt', bakerPercentage: 2.0 },
      { id: 'yeast', name: 'Osmo-tolerant Yeast', type: 'solid', role: 'yeast', bakerPercentage: 2.5 }
    ],
    tags: ['rich', 'buttery', 'decadent']
  },
  {
    id: 'enriched_milk_bread_hokkaido',
    name: 'Hokkaido Milk Bread',
    family: 'Asian Breads',
    category: 'enriched_bread',
    origin: { country: 'Japan', region: 'Hokkaido', period: 'Modern' },
    country: 'Japan',
    year: '20th Century',
    description: 'Super soft, fluffy, shreddable crumb using Tangzhong.',
    history: 'Tangzhong (water roux) gelatinizes starch to hold more water, extending shelf life and softness.',
    isCanonical: true,
    source: 'official',
    isPro: true,
    recipeStyle: RecipeStyle.HOKKAIDO_MILK_BREAD,
    technical: {
      hydration: 70,
      salt: 1.5,
      oil: 8.0, // Butter
      sugar: 10.0,
      fermentation: 'Direct + Tangzhong',
      fermentationTechnique: FermentationTechnique.DIRECT,
      bakingTempC: 175,
    },
    allowedFermentationTechniques: [FermentationTechnique.DIRECT],
    defaultFermentationTechnique: FermentationTechnique.DIRECT,
    ingredients: [
      { id: 'flour', name: 'Bread Flour', type: 'solid', role: 'flour', bakerPercentage: 100 },
      { id: 'milk', name: 'Milk', type: 'liquid', role: 'water', bakerPercentage: 70 },
      { id: 'tangzhong', name: 'Tangzhong (Flour)', type: 'solid', role: 'other', bakerPercentage: 5 },
      { id: 'butter', name: 'Butter', type: 'solid', role: 'fat', bakerPercentage: 8 },
      { id: 'sugar', name: 'Sugar', type: 'solid', role: 'sugar', bakerPercentage: 10 },
      { id: 'salt', name: 'Salt', type: 'solid', role: 'salt', bakerPercentage: 1.5 },
      { id: 'yeast', name: 'Instant Yeast', type: 'solid', role: 'yeast', bakerPercentage: 1.2 }
    ],
    tags: ['soft', 'asian', 'tangzhong']
  },
  {
    id: 'enriched_dinner_roll_soft',
    name: 'Soft Dinner Rolls',
    family: 'Buns',
    category: 'enriched_bread',
    origin: { country: 'USA', period: 'Modern' },
    country: 'USA',
    year: 'Modern',
    description: 'Classic American soft rolls, perfect for holiday dinners.',
    history: 'A simpler enriched dough than brioche, often using milk and a moderate amount of butter.',
    isCanonical: true,
    source: 'official',
    isPro: false,
    recipeStyle: RecipeStyle.ENRICHED_DINNER_ROLL,
    technical: {
      hydration: 60,
      salt: 1.8,
      oil: 10.0, // Butter
      sugar: 8.0,
      fermentation: 'Direct',
      fermentationTechnique: FermentationTechnique.DIRECT,
      bakingTempC: 190,
    },
    allowedFermentationTechniques: [FermentationTechnique.DIRECT],
    defaultFermentationTechnique: FermentationTechnique.DIRECT,
    ingredients: [
      { id: 'flour', name: 'AP Flour', type: 'solid', role: 'flour', bakerPercentage: 100 },
      { id: 'milk', name: 'Milk', type: 'liquid', role: 'water', bakerPercentage: 60 },
      { id: 'butter', name: 'Butter', type: 'solid', role: 'fat', bakerPercentage: 10 },
      { id: 'sugar', name: 'Sugar', type: 'solid', role: 'sugar', bakerPercentage: 8 },
      { id: 'salt', name: 'Salt', type: 'solid', role: 'salt', bakerPercentage: 1.8 },
      { id: 'yeast', name: 'Instant Yeast', type: 'solid', role: 'yeast', bakerPercentage: 1.5 }
    ],
    tags: ['easy', 'soft', 'family']
  },

  // ========================================================================
  // BURGER BUNS
  // ========================================================================
  {
    id: 'burger_bun_brioche',
    name: 'Brioche Burger Bun',
    family: 'Buns',
    category: 'burger_bun',
    origin: { country: 'France/USA', period: 'Modern' },
    country: 'International',
    year: 'Modern',
    description: 'Sturdy enough for a patty, soft enough to bite. The premium standard.',
    history: 'Adapted from brioche dough but with slightly less butter for structural integrity.',
    isCanonical: true,
    source: 'official',
    isPro: false,
    recipeStyle: RecipeStyle.BURGER_BUN_BRIOCHE,
    technical: {
      hydration: 55,
      salt: 2.0,
      oil: 15.0, // Butter
      sugar: 8.0,
      fermentation: 'Direct',
      fermentationTechnique: FermentationTechnique.DIRECT,
      bakingTempC: 190,
    },
    allowedFermentationTechniques: [FermentationTechnique.DIRECT, FermentationTechnique.POOLISH],
    defaultFermentationTechnique: FermentationTechnique.DIRECT,
    ingredients: [
      { id: 'flour', name: 'Bread Flour', type: 'solid', role: 'flour', bakerPercentage: 100 },
      { id: 'milk', name: 'Milk', type: 'liquid', role: 'water', bakerPercentage: 55 },
      { id: 'butter', name: 'Butter', type: 'solid', role: 'fat', bakerPercentage: 15 },
      { id: 'eggs', name: 'Eggs', type: 'liquid', role: 'other', bakerPercentage: 10 },
      { id: 'sugar', name: 'Sugar', type: 'solid', role: 'sugar', bakerPercentage: 8 },
      { id: 'salt', name: 'Salt', type: 'solid', role: 'salt', bakerPercentage: 2.0 },
      { id: 'yeast', name: 'Instant Yeast', type: 'solid', role: 'yeast', bakerPercentage: 1.2 }
    ],
    tags: ['gourmet', 'sturdy', 'soft']
  },
  {
    id: 'burger_bun_potato',
    name: 'Potato Bun',
    family: 'Buns',
    category: 'burger_bun',
    origin: { country: 'USA', region: 'Pennsylvania', period: 'Dutch Tradition' },
    country: 'USA',
    year: 'Traditional',
    description: 'Famous for its squishiness and ability to steam. Martin\'s style.',
    history: 'Potato flour or mash retains moisture, creating an incredibly soft shelf-stable bun.',
    isCanonical: true,
    source: 'official',
    isPro: true,
    recipeStyle: RecipeStyle.BURGER_BUN_POTATO,
    technical: {
      hydration: 60,
      salt: 2.0,
      oil: 10.0,
      sugar: 12.0,
      fermentation: 'Direct',
      fermentationTechnique: FermentationTechnique.DIRECT,
      bakingTempC: 190,
    },
    allowedFermentationTechniques: [FermentationTechnique.DIRECT],
    defaultFermentationTechnique: FermentationTechnique.DIRECT,
    ingredients: [
      { id: 'flour', name: 'Bread Flour', type: 'solid', role: 'flour', bakerPercentage: 100 },
      { id: 'potato', name: 'Potato Flour/Mash', type: 'solid', role: 'other', bakerPercentage: 15 },
      { id: 'water', name: 'Water', type: 'liquid', role: 'water', bakerPercentage: 60 },
      { id: 'butter', name: 'Butter', type: 'solid', role: 'fat', bakerPercentage: 10 },
      { id: 'sugar', name: 'Sugar', type: 'solid', role: 'sugar', bakerPercentage: 12 },
      { id: 'salt', name: 'Salt', type: 'solid', role: 'salt', bakerPercentage: 2.0 },
      { id: 'yeast', name: 'Instant Yeast', type: 'solid', role: 'yeast', bakerPercentage: 1.5 }
    ],
    tags: ['soft', 'moist', 'commercial-style']
  },
  {
    id: 'burger_bun_classic_soft',
    name: 'Classic Soft Bun',
    family: 'Buns',
    category: 'burger_bun',
    origin: { country: 'USA', period: 'Modern' },
    country: 'USA',
    year: 'Modern',
    description: 'Simple white bun. Soft crust, neutral flavor.',
    history: 'The standard backyard burger bun.',
    isCanonical: true,
    source: 'official',
    isPro: false,
    recipeStyle: RecipeStyle.BURGER_BUN_SOFT,
    technical: {
      hydration: 58,
      salt: 2.0,
      oil: 6.0,
      sugar: 6.0,
      fermentation: 'Direct',
      fermentationTechnique: FermentationTechnique.DIRECT,
      bakingTempC: 200,
    },
    allowedFermentationTechniques: [FermentationTechnique.DIRECT],
    defaultFermentationTechnique: FermentationTechnique.DIRECT,
    ingredients: [
      { id: 'flour', name: 'AP Flour', type: 'solid', role: 'flour', bakerPercentage: 100 },
      { id: 'water', name: 'Water', type: 'liquid', role: 'water', bakerPercentage: 58 },
      { id: 'oil', name: 'Vegetable Oil', type: 'liquid', role: 'fat', bakerPercentage: 6 },
      { id: 'sugar', name: 'Sugar', type: 'solid', role: 'sugar', bakerPercentage: 6 },
      { id: 'salt', name: 'Salt', type: 'solid', role: 'salt', bakerPercentage: 2.0 },
      { id: 'yeast', name: 'Instant Yeast', type: 'solid', role: 'yeast', bakerPercentage: 1.2 }
    ],
    tags: ['simple', 'fast', 'everyday']
  },

  // ========================================================================
  // PASTRY (Yeasted)
  // ========================================================================
  {
    id: 'pastry_cinnamon_roll',
    name: 'Cinnamon Roll',
    family: 'Sweet Rolls',
    category: 'pastry',
    origin: { country: 'USA/Sweden', period: '1920s' },
    country: 'International',
    year: '1920s',
    description: 'Sweet leavened dough rolled with cinnamon and sugar.',
    history: 'Evolved from the Swedish Kanelbulle but richer and frosted.',
    isCanonical: true,
    source: 'official',
    isPro: false,
    recipeStyle: RecipeStyle.PASTRY_CINNAMON_ROLL,
    technical: {
      hydration: 55,
      salt: 1.5,
      oil: 15.0, // Butter
      sugar: 15.0,
      fermentation: 'Direct',
      fermentationTechnique: FermentationTechnique.DIRECT,
      bakingTempC: 180,
    },
    allowedFermentationTechniques: [FermentationTechnique.DIRECT, FermentationTechnique.POOLISH],
    defaultFermentationTechnique: FermentationTechnique.DIRECT,
    ingredients: [
      { id: 'flour', name: 'AP Flour', type: 'solid', role: 'flour', bakerPercentage: 100 },
      { id: 'milk', name: 'Milk', type: 'liquid', role: 'water', bakerPercentage: 55 },
      { id: 'butter', name: 'Butter', type: 'solid', role: 'fat', bakerPercentage: 15 },
      { id: 'sugar', name: 'Sugar', type: 'solid', role: 'sugar', bakerPercentage: 15 },
      { id: 'salt', name: 'Salt', type: 'solid', role: 'salt', bakerPercentage: 1.5 },
      { id: 'yeast', name: 'Instant Yeast', type: 'solid', role: 'yeast', bakerPercentage: 1.5 }
    ],
    tags: ['sweet', 'breakfast', 'comfort']
  },
  {
    id: 'pastry_babka',
    name: 'Chocolate Babka',
    family: 'Sweet Breads',
    category: 'pastry',
    origin: { country: 'Poland/Ukraine', period: 'Jewish Tradition' },
    country: 'Eastern Europe',
    year: 'Traditional',
    description: 'Twisted sweet bread with chocolate or cinnamon filling.',
    history: 'Jewish origin, made popular worldwide. Dough is similar to brioche but rolled and twisted.',
    isCanonical: true,
    source: 'official',
    isPro: true,
    recipeStyle: RecipeStyle.BABKA,
    technical: {
      hydration: 50, // Milk/Eggs
      salt: 1.5,
      oil: 25.0, // Butter
      sugar: 15.0,
      fermentation: 'Cold Retard',
      fermentationTechnique: FermentationTechnique.DIRECT,
      bakingTempC: 175,
    },
    allowedFermentationTechniques: [FermentationTechnique.DIRECT],
    defaultFermentationTechnique: FermentationTechnique.DIRECT,
    ingredients: [
      { id: 'flour', name: 'AP Flour', type: 'solid', role: 'flour', bakerPercentage: 100 },
      { id: 'milk', name: 'Milk', type: 'liquid', role: 'water', bakerPercentage: 30 },
      { id: 'eggs', name: 'Eggs', type: 'liquid', role: 'other', bakerPercentage: 20 },
      { id: 'butter', name: 'Butter', type: 'solid', role: 'fat', bakerPercentage: 25 },
      { id: 'sugar', name: 'Sugar', type: 'solid', role: 'sugar', bakerPercentage: 15 },
      { id: 'salt', name: 'Salt', type: 'solid', role: 'salt', bakerPercentage: 1.5 },
      { id: 'yeast', name: 'Instant Yeast', type: 'solid', role: 'yeast', bakerPercentage: 1.5 }
    ],
    tags: ['twisted', 'chocolate', 'rich']
  },
  {
    id: 'pastry_donut_yeasted',
    name: 'Yeasted Donut',
    family: 'Fried Dough',
    category: 'pastry',
    origin: { country: 'Global', period: 'Various' },
    country: 'International',
    year: 'Classic',
    description: 'Light, airy fried dough, glazed or filled.',
    history: 'Distinct from cake donuts (chemical leavening). Requires proofing to float in oil.',
    isCanonical: true,
    source: 'official',
    isPro: false,
    recipeStyle: RecipeStyle.DONUT,
    technical: {
      hydration: 55,
      salt: 1.5,
      oil: 12.0, // Butter/Shortening
      sugar: 10.0,
      fermentation: 'Direct',
      fermentationTechnique: FermentationTechnique.DIRECT,
      bakingTempC: 190, // Frying temp
    },
    allowedFermentationTechniques: [FermentationTechnique.DIRECT],
    defaultFermentationTechnique: FermentationTechnique.DIRECT,
    ingredients: [
      { id: 'flour', name: 'AP Flour', type: 'solid', role: 'flour', bakerPercentage: 100 },
      { id: 'milk', name: 'Milk', type: 'liquid', role: 'water', bakerPercentage: 55 },
      { id: 'butter', name: 'Butter/Shortening', type: 'solid', role: 'fat', bakerPercentage: 12 },
      { id: 'sugar', name: 'Sugar', type: 'solid', role: 'sugar', bakerPercentage: 10 },
      { id: 'salt', name: 'Salt', type: 'solid', role: 'salt', bakerPercentage: 1.5 },
      { id: 'yeast', name: 'Instant Yeast', type: 'solid', role: 'yeast', bakerPercentage: 1.5 }
    ],
    tags: ['fried', 'glazed', 'sweet']
  },

  // ========================================================================
  // COOKIES (Chemical Leavening)
  // ========================================================================
  {
    id: 'cookie_chocolate_chip_classic',
    name: 'Classic Chocolate Chip',
    family: 'Drop Cookies',
    category: 'cookie',
    origin: { country: 'USA', period: '1938' },
    country: 'USA',
    year: '1938',
    description: 'The Toll House standard. Crisp edges, chewy center.',
    history: 'Invented by Ruth Wakefield. Relies on baking soda/powder interaction.',
    isCanonical: true,
    source: 'official',
    isPro: false,
    recipeStyle: RecipeStyle.COOKIE_CLASSIC_CHOC_CHIP,
    technical: {
      hydration: 0,
      salt: 1.2,
      oil: 50.0, // Butter
      sugar: 75.0,
      fermentation: 'None (Chemical)',
      fermentationTechnique: FermentationTechnique.CHEMICAL,
      bakingTempC: 190,
    },
    allowedFermentationTechniques: [FermentationTechnique.CHEMICAL, FermentationTechnique.NO_FERMENT, FermentationTechnique.DIRECT],
    defaultFermentationTechnique: FermentationTechnique.CHEMICAL,
    ingredients: [
      { id: 'flour', name: 'AP Flour', type: 'solid', role: 'flour', bakerPercentage: 100 },
      { id: 'butter', name: 'Butter', type: 'solid', role: 'fat', bakerPercentage: 50 },
      { id: 'sugar', name: 'Sugar (Brown/White)', type: 'solid', role: 'sugar', bakerPercentage: 75 },
      { id: 'eggs', name: 'Eggs', type: 'liquid', role: 'other', bakerPercentage: 20 },
      { id: 'chocolate', name: 'Chocolate Chips', type: 'solid', role: 'other', bakerPercentage: 60 },
      { id: 'leavening', name: 'Baking Soda', type: 'solid', role: 'other', bakerPercentage: 1.0 },
      { id: 'salt', name: 'Salt', type: 'solid', role: 'salt', bakerPercentage: 1.2 }
    ],
    tags: ['classic', 'sweet', 'quick']
  },
  {
    id: 'cookie_brown_butter',
    name: 'Brown Butter Cookie',
    family: 'Gourmet Cookies',
    category: 'cookie',
    origin: { country: 'Modern', period: '2000s' },
    country: 'International',
    year: 'Modern',
    description: 'Deep toffee flavor from browned butter (beurre noisette).',
    history: 'A modern elevation of the classic cookie enhancing nutty notes.',
    isCanonical: true,
    source: 'official',
    isPro: true,
    recipeStyle: RecipeStyle.COOKIE_BROWN_BUTTER,
    technical: {
      hydration: 0,
      salt: 1.5,
      oil: 55.0, // Browned Butter
      sugar: 70.0,
      fermentation: 'Chill 24h',
      fermentationTechnique: FermentationTechnique.CHEMICAL,
      bakingTempC: 180,
    },
    allowedFermentationTechniques: [FermentationTechnique.CHEMICAL, FermentationTechnique.NO_FERMENT],
    defaultFermentationTechnique: FermentationTechnique.CHEMICAL,
    ingredients: [
      { id: 'flour', name: 'AP Flour', type: 'solid', role: 'flour', bakerPercentage: 100 },
      { id: 'butter', name: 'Browned Butter', type: 'solid', role: 'fat', bakerPercentage: 55 },
      { id: 'sugar', name: 'Dark Brown Sugar', type: 'solid', role: 'sugar', bakerPercentage: 70 },
      { id: 'eggs', name: 'Eggs', type: 'liquid', role: 'other', bakerPercentage: 20 },
      { id: 'chocolate', name: 'Chocolate Chunks', type: 'solid', role: 'other', bakerPercentage: 70 },
      { id: 'leavening', name: 'Baking Soda', type: 'solid', role: 'other', bakerPercentage: 1.0 },
      { id: 'salt', name: 'Sea Salt', type: 'solid', role: 'salt', bakerPercentage: 1.5 }
    ],
    tags: ['gourmet', 'nutty', 'rich']
  },
  {
    id: 'cookie_shortbread',
    name: 'Shortbread',
    family: 'Butter Cookies',
    category: 'cookie',
    origin: { country: 'Scotland', period: 'Medieval' },
    country: 'Scotland',
    year: 'Traditional',
    description: '1:2:3 Ratio of Sugar, Butter, Flour. No leavening.',
    history: 'A classic Scottish biscuit. Friable (short) texture due to high fat and no gluten development.',
    isCanonical: true,
    source: 'official',
    isPro: false,
    recipeStyle: RecipeStyle.COOKIE_SHORTBREAD,
    technical: {
      hydration: 0,
      salt: 0.5,
      oil: 65.0, // Butter
      sugar: 35.0,
      fermentation: 'None',
      fermentationTechnique: FermentationTechnique.NO_FERMENT,
      bakingTempC: 160,
    },
    allowedFermentationTechniques: [FermentationTechnique.NO_FERMENT],
    defaultFermentationTechnique: FermentationTechnique.NO_FERMENT,
    ingredients: [
      { id: 'flour', name: 'AP Flour', type: 'solid', role: 'flour', bakerPercentage: 100 },
      { id: 'butter', name: 'Butter', type: 'solid', role: 'fat', bakerPercentage: 65 },
      { id: 'sugar', name: 'Caster Sugar', type: 'solid', role: 'sugar', bakerPercentage: 35 },
      { id: 'salt', name: 'Salt', type: 'solid', role: 'salt', bakerPercentage: 0.5 }
    ],
    tags: ['3-ingredient', 'buttery', 'dense']
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
    if (bakeType === BakeType.SWEETS_PASTRY) {
        return [FermentationTechnique.CHEMICAL, FermentationTechnique.NO_FERMENT, FermentationTechnique.DIRECT];
    }
    return [
        FermentationTechnique.DIRECT,
        FermentationTechnique.POOLISH,
        FermentationTechnique.BIGA,
        FermentationTechnique.SOURDOUGH
    ];
}
