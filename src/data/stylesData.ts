
import { DoughStyleDefinition, FermentationTechnique, RecipeStyle, BakeType } from '../types';

export const STYLES_DATA: DoughStyleDefinition[] = [
  // ========================================================================
  // FAMILY: PIZZA NAPOLETANA
  // ========================================================================
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
    allowedFermentationTechniques: [FermentationTechnique.DIRECT, FermentationTechnique.BIGA], 
    defaultFermentationTechnique: FermentationTechnique.DIRECT,
    ingredients: [
      { id: 'flour', name: '00 Flour (W280+)', type: 'solid', role: 'flour', bakerPercentage: 100 },
      { id: 'water', name: 'Water', type: 'liquid', role: 'water', bakerPercentage: 62 },
      { id: 'salt', name: 'Sea Salt', type: 'solid', role: 'salt', bakerPercentage: 2.8 },
      { id: 'yeast', name: 'Fresh Yeast', type: 'solid', role: 'yeast', bakerPercentage: 0.15 }
    ],
    tags: ['classic', 'high-heat', 'soft']
  },

  // ========================================================================
  // FAMILY: NORTH AMERICAN PIZZA
  // ========================================================================
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
    allowedFermentationTechniques: [FermentationTechnique.DIRECT, FermentationTechnique.POOLISH],
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
    allowedFermentationTechniques: [FermentationTechnique.DIRECT],
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
  // FAMILY: ITALIAN RUSTIC BREADS
  // ========================================================================
  {
    id: 'ciabatta_modernist',
    name: 'Ciabatta (High Hydration)',
    family: 'Italian Rustic Breads',
    category: 'bread',
    origin: { country: 'Italy', region: 'Veneto', period: '1982' },
    country: 'Italy',
    year: '1982',
    releaseDate: '2024-09-15',
    description: 'Crystal thin crust, massive open crumb. The modern standard for artisan slippers.',
    history: 'Created in Adria, Italy by Arnaldo Cavallari to combat the baguette. Relies heavily on Biga for structure and flavor.',
    culturalContext: 'A symbol of modern Italian baking renaissance.',
    isCanonical: true,
    source: 'official',
    isPro: true,
    recipeStyle: RecipeStyle.CIABATTA,
    technical: {
      hydration: 82,
      salt: 2.2,
      oil: 0,
      sugar: 0,
      fermentation: 'Biga (16h) + Bulk (3h)',
      fermentationTechnique: FermentationTechnique.BIGA,
      bakingTempC: 240,
    },
    technicalProfile: {
      hydration: [78, 85],
      salt: [2.0, 2.4],
      oil: [0, 2.0],
      sugar: [0, 0],
      flourStrength: "W320+ (Strong)",
      prefermentDescription: "Biga at 45-50% hydration",
      fermentation: {
        bulk: "2-3h with folds",
        proof: "45-60 min (gentle)",
      },
      ovenRecommendations: "Steam essential. 240°C falling to 220°C.",
      difficulty: "Hard",
      recommendedUse: "Sandwiches, dipping."
    },
    references: [
        { source: "Bread: A Baker's Book", author: "Jeffrey Hamelman" },
        { source: "The Taste of Bread", author: "Raymond Calvel" }
    ],
    allowedFermentationTechniques: [FermentationTechnique.BIGA, FermentationTechnique.POOLISH],
    defaultFermentationTechnique: FermentationTechnique.BIGA,
    ingredients: [
      { id: 'flour', name: 'High Gluten Flour', type: 'solid', role: 'flour', bakerPercentage: 100 },
      { id: 'water', name: 'Water', type: 'liquid', role: 'water', bakerPercentage: 82 },
      { id: 'salt', name: 'Salt', type: 'solid', role: 'salt', bakerPercentage: 2.2 },
      { id: 'yeast', name: 'Fresh Yeast', type: 'solid', role: 'yeast', bakerPercentage: 1.0 }
    ],
    tags: ['artisan', 'airy', 'advanced']
  },
  {
    id: 'focaccia_genovese',
    name: 'Focaccia Genovese (Classic)',
    family: 'Italian Rustic Breads',
    category: 'flatbread',
    origin: { country: 'Italy', region: 'Liguria', period: 'Ancient' },
    country: 'Italy',
    year: 'Ancient',
    description: 'Flatbread, oily, with characteristic dimples and a salty crust.',
    history: 'A classic from Liguria. The secret is the "salamoia" (brine) poured over the dimples before baking.',
    culturalContext: 'Traditionally eaten at breakfast dipped in cappuccino, or as a street food snack.',
    isCanonical: true,
    source: 'official',
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
    technicalProfile: {
      hydration: [65, 75],
      salt: [2.0, 2.5],
      oil: [5.0, 10.0], // Including surface oil
      sugar: [0, 1.5],
      flourStrength: "W260-280 (Medium)",
      fermentation: {
        bulk: "1.5h",
        proof: "1h in pan -> Dimple -> 45min",
      },
      ovenRecommendations: "230°C. No steam (oil provides moisture barrier).",
      difficulty: "Easy",
      recommendedUse: "Snack, Breakfast."
    },
    references: [
        { source: "Salt, Fat, Acid, Heat", author: "Samin Nosrat" },
        { source: "Eataly Guide to Focaccia" }
    ],
    allowedFermentationTechniques: [FermentationTechnique.DIRECT, FermentationTechnique.BIGA],
    defaultFermentationTechnique: FermentationTechnique.DIRECT,
    ingredients: [
      { id: 'flour', name: 'AP/Bread Mix', type: 'solid', role: 'flour', bakerPercentage: 100 },
      { id: 'water', name: 'Water', type: 'liquid', role: 'water', bakerPercentage: 75 },
      { id: 'oil', name: 'Olive Oil (Dough)', type: 'liquid', role: 'fat', bakerPercentage: 5.0 },
      { id: 'salt', name: 'Salt', type: 'solid', role: 'salt', bakerPercentage: 2.5 },
      { id: 'yeast', name: 'IDY', type: 'solid', role: 'yeast', bakerPercentage: 0.8 }
    ],
    tags: ['oily', 'salty', 'beginner']
  },

  // ========================================================================
  // FAMILY: FRENCH LEAN BREADS
  // ========================================================================
  {
    id: 'baguette_tradition',
    name: 'Baguette de Tradition',
    family: 'French Lean Breads',
    category: 'bread',
    origin: { country: 'France', period: '1993 (Decree)' },
    country: 'France',
    year: '1993',
    description: 'The legally defined French standard. Creamy crumb, thin crisp crust.',
    history: 'Protected by the 1993 "Décret Pain". No additives allowed. Poolish or cold ferment mandatory for flavor.',
    culturalContext: 'A daily ritual in France. The law was passed to protect artisanal baking from industrialization.',
    isCanonical: true,
    source: 'official',
    isPro: true,
    recipeStyle: RecipeStyle.BAGUETTE,
    technical: {
      hydration: 72,
      salt: 2.0,
      oil: 0,
      sugar: 0,
      fermentation: 'Poolish (12h) + Bulk',
      fermentationTechnique: FermentationTechnique.POOLISH,
      bakingTempC: 250,
    },
    technicalProfile: {
      hydration: [68, 75],
      salt: [1.8, 2.0],
      oil: [0, 0],
      sugar: [0, 0],
      flourStrength: "T65 (French designation) or AP/Bread Mix",
      prefermentDescription: "Poolish (100% Hyd) - 20-40% of flour",
      fermentation: {
        bulk: "1h cold or ambient",
        proof: "45 min (Couche)",
      },
      ovenRecommendations: "250°C. Steam injection critical.",
      difficulty: "Expert",
      recommendedUse: "Daily bread."
    },
    references: [
        { source: "Décret n°93-1074", notes: "French Law" },
        { source: "Ferrandi: French Pâtisserie" }
    ],
    allowedFermentationTechniques: [FermentationTechnique.POOLISH, FermentationTechnique.DIRECT, FermentationTechnique.BIGA],
    defaultFermentationTechnique: FermentationTechnique.POOLISH,
    ingredients: [
      { id: 'flour', name: 'T65 Flour', type: 'solid', role: 'flour', bakerPercentage: 100 },
      { id: 'water', name: 'Water', type: 'liquid', role: 'water', bakerPercentage: 72 },
      { id: 'salt', name: 'Salt', type: 'solid', role: 'salt', bakerPercentage: 2.0 },
      { id: 'yeast', name: 'Fresh Yeast', type: 'solid', role: 'yeast', bakerPercentage: 0.5 }
    ],
    tags: ['classic', 'technical', 'crispy']
  },

  // ========================================================================
  // FAMILY: VIENNOISERIE & ENRICHED
  // ========================================================================
  {
    id: 'brioche_nanterre',
    name: 'Brioche Nanterre',
    family: 'Viennoiserie',
    category: 'enriched_bread',
    origin: { country: 'France', region: 'Normandy' },
    country: 'France',
    year: 'Classic',
    description: 'Rich, tender crumb with 50% butter. The gold standard of enriched doughs.',
    history: 'Originating in Normandy, famous for its high butter and egg content. Named after the city of Nanterre.',
    culturalContext: 'Served for breakfast or as a base for gourmet dishes.',
    isCanonical: true,
    source: 'official',
    isPro: true,
    recipeStyle: RecipeStyle.BRIOCHE,
    technical: {
      hydration: 15, // Milk only
      salt: 2.2,
      oil: 50.0, // Butter
      sugar: 12.0,
      fermentation: 'Cold Retard (Mandatory)',
      fermentationTechnique: FermentationTechnique.DIRECT,
      bakingTempC: 180,
    },
    technicalProfile: {
      hydration: [10, 20], // Liquid comes from eggs
      salt: [2.0, 2.5],
      oil: [40, 60], // Butter percentage
      sugar: [10, 15],
      flourStrength: "W350+ (Very Strong) to hold butter",
      fermentation: {
        bulk: "1h Room -> 12h Cold",
        proof: "2-3h Room (Warm)",
      },
      ovenRecommendations: "180°C. Egg wash essential.",
      difficulty: "Hard",
      recommendedUse: "Breakfast, Burger Buns."
    },
    references: [
        { source: "The Professional Pastry Chef", author: "Bo Friberg" },
        { source: "Larousse Gastronomique" }
    ],
    allowedFermentationTechniques: [FermentationTechnique.DIRECT],
    defaultFermentationTechnique: FermentationTechnique.DIRECT,
    ingredients: [
      { id: 'flour', name: 'Strong Flour', type: 'solid', role: 'flour', bakerPercentage: 100 },
      { id: 'eggs', name: 'Eggs', type: 'liquid', role: 'other', bakerPercentage: 50 },
      { id: 'butter', name: 'Butter', type: 'solid', role: 'fat', bakerPercentage: 50 },
      { id: 'sugar', name: 'Sugar', type: 'solid', role: 'sugar', bakerPercentage: 12 },
      { id: 'milk', name: 'Milk', type: 'liquid', role: 'water', bakerPercentage: 15 },
      { id: 'salt', name: 'Salt', type: 'solid', role: 'salt', bakerPercentage: 2.2 },
      { id: 'yeast', name: 'Osmo-tolerant Yeast', type: 'solid', role: 'yeast', bakerPercentage: 2.5 }
    ],
    tags: ['rich', 'buttery', 'advanced']
  },
  {
    id: 'hokkaido_milk',
    name: 'Hokkaido Milk Bread (Shokupan)',
    family: 'Asian Enriched',
    category: 'enriched_bread',
    origin: { country: 'Japan', period: '20th Century' },
    country: 'Japan',
    year: '20th Century',
    description: 'Feather-light crumb using the Tangzhong (Yudane) method.',
    history: 'Uses the Tangzhong method to pre-gelatinize starches, holding more moisture and keeping the bread soft for days.',
    culturalContext: 'The staple "Shokupan" in Japan, prized for its white, fluffy interior.',
    isCanonical: true,
    source: 'official',
    isPro: true,
    recipeStyle: RecipeStyle.HOKKAIDO_MILK_BREAD,
    technical: {
      hydration: 70,
      salt: 1.8,
      oil: 8.0,
      sugar: 10.0,
      fermentation: 'Direct + Tangzhong',
      fermentationTechnique: FermentationTechnique.DIRECT,
      bakingTempC: 175,
    },
    technicalProfile: {
      hydration: [68, 75],
      salt: [1.5, 2.0],
      oil: [6.0, 10.0],
      sugar: [8.0, 12.0],
      flourStrength: "Bread Flour",
      fermentation: {
        bulk: "1.5h",
        proof: "1h in Pullman Pan",
      },
      ovenRecommendations: "175°C. Lid on for square, off for domed.",
      difficulty: "Medium",
      recommendedUse: "Sandwiches, Toast."
    },
    references: [
        { source: "Modernist Bread", notes: "Tangzhong science" },
        { source: "Just One Cookbook" }
    ],
    allowedFermentationTechniques: [FermentationTechnique.DIRECT],
    defaultFermentationTechnique: FermentationTechnique.DIRECT,
    ingredients: [
      { id: 'flour', name: 'Bread Flour', type: 'solid', role: 'flour', bakerPercentage: 100 },
      { id: 'milk', name: 'Milk', type: 'liquid', role: 'water', bakerPercentage: 70 },
      { id: 'tangzhong', name: 'Tangzhong (Flour portion)', type: 'solid', role: 'other', bakerPercentage: 5 },
      { id: 'butter', name: 'Butter', type: 'solid', role: 'fat', bakerPercentage: 8 },
      { id: 'sugar', name: 'Sugar', type: 'solid', role: 'sugar', bakerPercentage: 10 },
      { id: 'salt', name: 'Salt', type: 'solid', role: 'salt', bakerPercentage: 1.8 },
      { id: 'yeast', name: 'IDY', type: 'solid', role: 'yeast', bakerPercentage: 1.2 }
    ],
    tags: ['soft', 'asian', 'tangzhong']
  },
  {
      id: 'teglia_romana',
      name: 'Roman Pan Pizza (Teglia)',
      family: 'Pizza Romana',
      category: 'pizza',
      origin: { country: 'Italy', region: 'Rome', period: 'Modern (1980s)' },
      country: 'Italy',
      year: '1980s (modern)',
      description: 'High hydration, baked in rectangular pans. Crispy bottom, very airy crumb.',
      history: 'The reinvention of Roman pizza al taglio, focused on digestibility and open crumb structure using high hydration.',
      culturalContext: 'A staple street food in Rome, sold by weight.',
      isCanonical: true,
      source: 'official',
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
      technicalProfile: {
        hydration: [75, 90],
        salt: [2.2, 2.8],
        oil: [2.0, 4.0],
        sugar: [0, 0],
        flourStrength: "W320+ (Strong)",
        fermentation: {
            bulk: "24-48h Cold",
            proof: "3-4h Room Temp"
        },
        ovenRecommendations: "250°C. Bake on bottom rack first.",
        difficulty: "Expert",
        recommendedUse: "Light, crunchy snack."
      },
      references: [
          { source: "Bonci", notes: "Gabriele Bonci methodology" }
      ],
      allowedFermentationTechniques: [FermentationTechnique.DIRECT, FermentationTechnique.POOLISH, FermentationTechnique.BIGA],
      defaultFermentationTechnique: FermentationTechnique.DIRECT,
      ingredients: [
        { id: 'flour', name: 'Very Strong Flour (W320+)', type: 'solid', role: 'flour', bakerPercentage: 100 },
        { id: 'water', name: 'Ice Water', type: 'liquid', role: 'water', bakerPercentage: 80 },
        { id: 'salt', name: 'Salt', type: 'solid', role: 'salt', bakerPercentage: 2.5 },
        { id: 'oil', name: 'Olive Oil', type: 'liquid', role: 'fat', bakerPercentage: 3.0 },
        { id: 'yeast', name: 'Yeast', type: 'solid', role: 'yeast', bakerPercentage: 0.6 }
      ],
      tags: ['high-hydration', 'crispy', 'airy']
  },
  
  // ========================================================================
  // FAMILY: COOKIES & CONFECTIONERY
  // ========================================================================
  {
    id: 'ny_cookie_levain',
    name: 'NY Giant Cookie',
    family: 'American Cookies',
    category: 'cookie',
    origin: { country: 'USA', region: 'New York', period: '1995' },
    country: 'USA',
    year: '1995',
    description: '6oz monster cookie. Walnut-packed, gooey center, crispy shell.',
    history: 'Popularized by Levain Bakery in NYC. Uses cold butter and very high temperature to arrest spread.',
    culturalContext: 'A dessert that challenges the traditional flat cookie.',
    isCanonical: true,
    source: 'official',
    isPro: false,
    recipeStyle: RecipeStyle.COOKIE_NY_CHOC_CHIP,
    technical: {
      hydration: 0,
      salt: 1.2,
      oil: 60.0, // Butter
      sugar: 70.0,
      fermentation: 'Chilling (Physical)',
      fermentationTechnique: FermentationTechnique.DIRECT,
      bakingTempC: 210,
    },
    technicalProfile: {
      hydration: [0, 0],
      salt: [1.0, 1.5],
      oil: [55, 65],
      sugar: [65, 80],
      flourStrength: "Low protein (Cake/AP blend)",
      fermentation: {
        bulk: "N/A",
        proof: "Chill 12h+ to hydrate flour",
      },
      ovenRecommendations: "210°C (Hot!) to set outside quickly.",
      difficulty: "Easy",
      recommendedUse: "Dessert."
    },
    references: [
        { source: "Serious Eats", author: "Stella Parks" },
        { source: "Modernist Cuisine" }
    ],
    allowedFermentationTechniques: [FermentationTechnique.DIRECT],
    defaultFermentationTechnique: FermentationTechnique.DIRECT,
    ingredients: [
      { id: 'flour', name: 'Cake/AP Flour', type: 'solid', role: 'flour', bakerPercentage: 100 },
      { id: 'butter', name: 'Cold Butter', type: 'solid', role: 'fat', bakerPercentage: 60 },
      { id: 'sugar', name: 'Brown/White Mix', type: 'solid', role: 'sugar', bakerPercentage: 70 },
      { id: 'eggs', name: 'Eggs', type: 'liquid', role: 'other', bakerPercentage: 20 },
      { id: 'chocolate', name: 'Chunks', type: 'solid', role: 'other', bakerPercentage: 80 },
      { id: 'walnuts', name: 'Walnuts', type: 'solid', role: 'other', bakerPercentage: 40 },
      { id: 'baking_powder', name: 'Baking Powder', type: 'solid', role: 'other', bakerPercentage: 1.5 }
    ],
    tags: ['sweet', 'dense', 'gooey']
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
        return [FermentationTechnique.DIRECT];
    }
    return [
        FermentationTechnique.DIRECT,
        FermentationTechnique.POOLISH,
        FermentationTechnique.BIGA
    ];
}
