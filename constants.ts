import { RecipeStyle, YeastType, ProRecipe, BakeType, FermentationTechnique, AmbientTemperature, OvenType, DoughStylePreset, AdviceOvenType, SurfaceType, InspirationBatch, DoughConfig } from './types';

export const YEAST_OPTIONS = [
  { value: YeastType.IDY, labelKey: 'form.yeast_idy' },
  { value: YeastType.ADY, labelKey: 'form.yeast_ady' },
  { value: YeastType.FRESH, labelKey: 'form.yeast_fresh' },
  { value: YeastType.SOURDOUGH_STARTER, labelKey: 'form.yeast_sourdough_starter' },
  { value: YeastType.USER_LEVAIN, labelKey: 'form.yeast_user_levain' },
];

export const AMBIENT_TEMPERATURE_OPTIONS = [
  { value: AmbientTemperature.COLD, labelKey: 'form.temp_cold' },
  { value: AmbientTemperature.MILD, labelKey: 'form.temp_mild' },
  { value: AmbientTemperature.HOT, labelKey: 'form.temp_hot' },
];

export const OVEN_TYPE_OPTIONS = [
    { value: OvenType.GAS, labelKey: 'profile.ovens.types.gas' },
    { value: OvenType.ELECTRIC, labelKey: 'profile.ovens.types.electric' },
    { value: OvenType.WOOD, labelKey: 'profile.ovens.types.wood' },
    { value: OvenType.OONI, labelKey: 'profile.ovens.types.ooni' },
    { value: OvenType.STONE_OVEN, labelKey: 'profile.ovens.types.stone_oven' },
    { value: OvenType.OTHER, labelKey: 'profile.ovens.types.other' },
]

export const DOUGH_WEIGHT_RANGES: { [key in RecipeStyle]?: string } = {
  [RecipeStyle.NEAPOLITAN]: '200-280g',
  [RecipeStyle.NEW_YORK]: '280-450g',
  [RecipeStyle.ROMAN]: '180-250g',
  [RecipeStyle.DETROIT]: '300-450g',
  [RecipeStyle.SICILIAN]: '400-600g',
  [RecipeStyle.CHICAGO]: '350-500g',
  [RecipeStyle.COUNTRY_LOAF]: '500-1000g',
  [RecipeStyle.BAGUETTE]: '250-350g',
  [RecipeStyle.CIABATTA]: '400-600g',
  [RecipeStyle.FOCACCIA]: '500-1000g',
  [RecipeStyle.SANDWICH_LOAF]: '800-1200g',
};

export const DEFAULT_CONFIG: DoughConfig = {
  bakeType: BakeType.PIZZAS,
  recipeStyle: RecipeStyle.NEAPOLITAN,
  stylePresetId: 'pizza_napolitana',
  numPizzas: 4,
  doughBallWeight: 250,
  hydration: 62,
  salt: 2.5,
  oil: 0,
  sugar: 1,
  fermentationTechnique: FermentationTechnique.DIRECT,
  yeastType: YeastType.IDY,
  yeastPercentage: 0.2,
  prefermentFlourPercentage: 30,
  scale: 1,
  flourId: 'generic_all_purpose',
  ambientTemperature: AmbientTemperature.MILD,
  notes: '',
  bakingTempC: 250,
};

export const DOUGH_STYLE_PRESETS: DoughStylePreset[] = [
  // --- PIZZAS ---
  { id: 'pizza_napolitana', name: 'Napolitana', type: BakeType.PIZZAS, recipeStyle: RecipeStyle.NEAPOLITAN, defaultHydration: 62, defaultSalt: 2.5, defaultOil: 0, defaultSugar: 1 },
  { id: 'pizza_new_york', name: 'New York', type: BakeType.PIZZAS, recipeStyle: RecipeStyle.NEW_YORK, defaultHydration: 58.5, defaultSalt: 2.25, defaultOil: 1.5, defaultSugar: 1 },
  { id: 'pizza_pan', name: 'Pan Pizza', type: BakeType.PIZZAS, recipeStyle: RecipeStyle.PAN_PIZZA, defaultHydration: 68.5, defaultSalt: 2.25, defaultOil: 5, defaultSugar: 3 },
  { id: 'pizza_chicago', name: 'Chicago Deep Dish', type: BakeType.PIZZAS, recipeStyle: RecipeStyle.CHICAGO_DEEP_DISH, defaultHydration: 50, defaultSalt: 1.75, defaultOil: 7, defaultSugar: 1.5 },
  { id: 'pizza_romana_tonda', name: 'Romana Tonda', type: BakeType.PIZZAS, recipeStyle: RecipeStyle.ROMANA_TONDA, defaultHydration: 56.5, defaultSalt: 2.5, defaultOil: 2, defaultSugar: 0 },
  { id: 'pizza_siciliana', name: 'Siciliana', type: BakeType.PIZZAS, recipeStyle: RecipeStyle.SICILIANA, defaultHydration: 70, defaultSalt: 2.25, defaultOil: 4, defaultSugar: 2 },
  { id: 'pizza_grandma', name: 'Grandma/Retangular', type: BakeType.PIZZAS, recipeStyle: RecipeStyle.GRANDMA_STYLE, defaultHydration: 72.5, defaultSalt: 2, defaultOil: 3, defaultSugar: 2 },

  // --- BREADS & SAVORY ---
  { id: 'bread_pao_frances', name: 'Pão Francês', type: BakeType.BREADS_SAVORY, recipeStyle: RecipeStyle.PAO_FRANCES, defaultHydration: 62.5, defaultSalt: 2, defaultOil: 0, defaultSugar: 1 },
  { id: 'bread_baguette', name: 'Baguette', type: BakeType.BREADS_SAVORY, recipeStyle: RecipeStyle.BAGUETTE, defaultHydration: 70, defaultSalt: 2, defaultOil: 0, defaultSugar: 0 },
  { id: 'bread_ciabatta', name: 'Ciabatta', type: BakeType.BREADS_SAVORY, recipeStyle: RecipeStyle.CIABATTA, defaultHydration: 80, defaultSalt: 2, defaultOil: 1.5, defaultSugar: 1 },
  { id: 'bread_pumpernickel', name: 'Pumpernickel', type: BakeType.BREADS_SAVORY, recipeStyle: RecipeStyle.PUMPERNICKEL, defaultHydration: 75, defaultSalt: 1.5, defaultOil: 0, defaultSugar: 4 },
  { id: 'bread_rye', name: 'Rye (Centeio)', type: BakeType.BREADS_SAVORY, recipeStyle: RecipeStyle.RYE, defaultHydration: 72.5, defaultSalt: 2, defaultOil: 0.5, defaultSugar: 1.5 },
  { id: 'bread_pao_de_batata', name: 'Pão de batata', type: BakeType.BREADS_SAVORY, recipeStyle: RecipeStyle.PAO_DE_BATATA, defaultHydration: 62.5, defaultSalt: 2, defaultOil: 4, defaultSugar: 9 },
  { id: 'bread_focaccia', name: 'Focaccia', type: BakeType.BREADS_SAVORY, recipeStyle: RecipeStyle.FOCACCIA, defaultHydration: 75, defaultSalt: 2.5, defaultOil: 7.5, defaultSugar: 0 },
  { id: 'bread_challah', name: 'Challah', type: BakeType.BREADS_SAVORY, recipeStyle: RecipeStyle.CHALLAH, defaultHydration: 62.5, defaultSalt: 1.75, defaultOil: 8.5, defaultSugar: 13.5 },
  { id: 'bread_bagel', name: 'Bagel', type: BakeType.BREADS_SAVORY, recipeStyle: RecipeStyle.BAGEL, defaultHydration: 57.5, defaultSalt: 2, defaultOil: 2.5, defaultSugar: 4 },
  { id: 'bread_english_muffin', name: 'English Muffin', type: BakeType.BREADS_SAVORY, recipeStyle: RecipeStyle.ENGLISH_MUFFIN, defaultHydration: 69.5, defaultSalt: 2, defaultOil: 2.5, defaultSugar: 3 },
  { id: 'bread_pita', name: 'Pita', type: BakeType.BREADS_SAVORY, recipeStyle: RecipeStyle.PITA, defaultHydration: 62.5, defaultSalt: 2, defaultOil: 2, defaultSugar: 1 },
  { id: 'savory_massa_podre', name: 'Massa Podre Salgada', type: BakeType.BREADS_SAVORY, recipeStyle: RecipeStyle.MASSA_PODRE, defaultHydration: 42.5, defaultSalt: 1.5, defaultOil: 45, defaultSugar: 0 },
  { id: 'savory_massa_esfiha', name: 'Massa Esfiha/Quibe', type: BakeType.BREADS_SAVORY, recipeStyle: RecipeStyle.MASSA_ESFIHA, defaultHydration: 62.5, defaultSalt: 2, defaultOil: 2.5, defaultSugar: 4 },
  { id: 'savory_massa_torta', name: 'Massa básica torta salgada', type: BakeType.BREADS_SAVORY, recipeStyle: RecipeStyle.MASSA_TORTA, defaultHydration: 50, defaultSalt: 2, defaultOil: 35, defaultSugar: 0 },

  // --- SWEETS & PASTRY ---
  { id: 'pastry_pate_sucree', name: 'Pâte Sucrée', type: BakeType.SWEETS_PASTRY, recipeStyle: RecipeStyle.PATE_SUCREE, defaultHydration: 5, defaultSalt: 0.5, defaultOil: 45, defaultSugar: 45 },
  { id: 'pastry_sablee', name: 'Sablée', type: BakeType.SWEETS_PASTRY, recipeStyle: RecipeStyle.SABLEE, defaultHydration: 0, defaultSalt: 0.5, defaultOil: 52.5, defaultSugar: 52.5 },
  { id: 'pastry_pound_cake', name: 'Pound Cake', type: BakeType.SWEETS_PASTRY, recipeStyle: RecipeStyle.POUND_CAKE, defaultHydration: 20, defaultSalt: 0.5, defaultOil: 100, defaultSugar: 100 },
  { id: 'pastry_cookies', name: 'Cookies', type: BakeType.SWEETS_PASTRY, recipeStyle: RecipeStyle.COOKIES, defaultHydration: 10, defaultSalt: 1, defaultOil: 55, defaultSugar: 50 },
  { id: 'pastry_pie_dough', name: 'Pie dough', type: BakeType.SWEETS_PASTRY, recipeStyle: RecipeStyle.PIE_DOUGH, defaultHydration: 20, defaultSalt: 1, defaultOil: 40, defaultSugar: 2 },
  { id: 'pastry_bolo_simples', name: 'Bolo simples', type: BakeType.SWEETS_PASTRY, recipeStyle: RecipeStyle.BOLO_SIMPLES, defaultHydration: 40, defaultSalt: 1, defaultOil: 60, defaultSugar: 60 },
];


export const YEAST_EQUIVALENCIES = {
  // Base is Instant Dry Yeast (IDY)
  IDY_TO_ADY: 1.25, // Use 25% more ADY than IDY
  IDY_TO_FRESH: 3.0,  // Use 3x more Fresh Yeast than IDY
  ADY_TO_IDY: 1 / 1.25, // 0.8
  FRESH_TO_IDY: 1 / 3.0, // 0.333
};

export const ENVIRONMENT_TEMPERATURE_GUIDELINES = {
    [AmbientTemperature.COLD]: {
        yeastAdjustment: 1.25, // Suggest ~25% more yeast
        notes: "A fermentação será mais lenta. Considere usar água morna (25-28°C) ou estender os tempos."
    },
    [AmbientTemperature.MILD]: {
        yeastAdjustment: 1.0, // No change
        notes: "Temperatura ideal para a maioria das receitas padrão."
    },
    [AmbientTemperature.HOT]: {
        yeastAdjustment: 0.7, // Suggest ~30% less yeast
        notes: "A fermentação será mais rápida. Considere usar água fria e reduzir o tempo de bulk."
    }
};

export const PRO_RECIPES: ProRecipe[] = [
  {
    nameKey: 'pro_recipes.neapolitan_title',
    descriptionKey: 'pro_recipes.neapolitan_desc',
    config: {
      bakeType: BakeType.PIZZAS,
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
    nameKey: 'pro_recipes.ny_style_title',
    descriptionKey: 'pro_recipes.ny_style_desc',
    config: {
        bakeType: BakeType.PIZZAS,
        recipeStyle: RecipeStyle.NEW_YORK,
        numPizzas: 3,
        doughBallWeight: 350,
        hydration: 65,
        salt: 2.2,
        oil: 2,
        fermentationTechnique: FermentationTechnique.DIRECT,
        yeastType: YeastType.IDY,
        yeastPercentage: 0.4,
    }
  },
  {
    nameKey: 'pro_recipes.sourdough_title',
    descriptionKey: 'pro_recipes.sourdough_desc',
    config: {
      bakeType: BakeType.BREADS_SAVORY,
      recipeStyle: RecipeStyle.COUNTRY_LOAF,
      numPizzas: 2,
      doughBallWeight: 750,
      hydration: 78,
      salt: 2.0,
      oil: 0,
      fermentationTechnique: FermentationTechnique.DIRECT,
      yeastType: YeastType.SOURDOUGH_STARTER,
      yeastPercentage: 20, // As levain %
    },
  },
  {
    nameKey: 'pro_recipes.sourdough_baguette_title',
    descriptionKey: 'pro_recipes.sourdough_baguette_desc',
    config: {
        bakeType: BakeType.BREADS_SAVORY,
        recipeStyle: RecipeStyle.BAGUETTE,
        numPizzas: 3, // loaves
        doughBallWeight: 300,
        hydration: 80,
        salt: 1.8,
        oil: 0,
        fermentationTechnique: FermentationTechnique.DIRECT,
        yeastType: YeastType.SOURDOUGH_STARTER,
        yeastPercentage: 20,
    }
  },
  {
    nameKey: 'pro_recipes.focaccia_title',
    descriptionKey: 'pro_recipes.focaccia_desc',
    config: {
      bakeType: BakeType.BREADS_SAVORY,
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
    nameKey: 'pro_recipes.roman_title',
    descriptionKey: 'pro_recipes.roman_desc',
    config: {
      bakeType: BakeType.PIZZAS,
      recipeStyle: RecipeStyle.ROMAN,
      numPizzas: 1,
      doughBallWeight: 1200,
      hydration: 80,
      salt: 2.5,
      oil: 4,
      fermentationTechnique: FermentationTechnique.BIGA,
      prefermentFlourPercentage: 50,
      yeastType: YeastType.IDY,
      yeastPercentage: 0.3,
    },
  },
  {
    nameKey: 'pro_recipes.detroit_title',
    descriptionKey: 'pro_recipes.detroit_desc',
    config: {
      bakeType: BakeType.PIZZAS,
      recipeStyle: RecipeStyle.DETROIT,
      numPizzas: 1,
      doughBallWeight: 500,
      hydration: 75,
      salt: 2.2,
      oil: 2,
      fermentationTechnique: FermentationTechnique.DIRECT,
      yeastType: YeastType.IDY,
      yeastPercentage: 0.8,
    },
  },
  {
    nameKey: 'pro_recipes.ciabatta_title',
    descriptionKey: 'pro_recipes.ciabatta_desc',
    config: {
      bakeType: BakeType.BREADS_SAVORY,
      recipeStyle: RecipeStyle.CIABATTA,
      numPizzas: 2, // loaves
      doughBallWeight: 500,
      hydration: 85,
      salt: 2.2,
      oil: 3,
      fermentationTechnique: FermentationTechnique.POOLISH,
      prefermentFlourPercentage: 40,
      yeastType: YeastType.IDY,
      yeastPercentage: 0.3,
    },
  },
  {
    nameKey: 'pro_recipes.thin_crust_title',
    descriptionKey: 'pro_recipes.thin_crust_desc',
    config: {
      bakeType: BakeType.PIZZAS,
      recipeStyle: RecipeStyle.THIN_CRUST,
      numPizzas: 4,
      doughBallWeight: 220,
      hydration: 55,
      salt: 2.0,
      oil: 4,
      fermentationTechnique: FermentationTechnique.DIRECT,
      yeastType: YeastType.IDY,
      yeastPercentage: 0.6,
    },
  },
  {
    nameKey: 'pro_recipes.sandwich_loaf_title',
    descriptionKey: 'pro_recipes.sandwich_loaf_desc',
    config: {
      bakeType: BakeType.BREADS_SAVORY,
      recipeStyle: RecipeStyle.SANDWICH_LOAF,
      numPizzas: 1,
      doughBallWeight: 900,
      hydration: 65,
      salt: 1.8,
      oil: 5,
      fermentationTechnique: FermentationTechnique.DIRECT,
      yeastType: YeastType.IDY,
      yeastPercentage: 1.2,
    },
  },
  {
    nameKey: 'pro_recipes.chicago_title',
    descriptionKey: 'pro_recipes.chicago_desc',
    config: {
      bakeType: BakeType.PIZZAS,
      recipeStyle: RecipeStyle.CHICAGO,
      numPizzas: 1,
      doughBallWeight: 600,
      hydration: 58,
      salt: 1.7,
      oil: 8,
      fermentationTechnique: FermentationTechnique.DIRECT,
      yeastType: YeastType.IDY,
      yeastPercentage: 1.0,
    },
  },
];


// --- Environment Advisor Constants ---
export const DEFAULT_DDT_C = 25; // Source: ChainBaker (24-26°C range), using 25 as a solid target.

export const BAKING_PROFILES: Record<string, Record<string, { tempC: number; timeSeconds: [number, number] }>> = {
  'wood_fired': {
    'biscotto': { tempC: 485, timeSeconds: [60, 90] }, // Source: AVPN
    'stone': { tempC: 430, timeSeconds: [70, 100] },
  },
  'portable_high_temp': { // e.g., Ooni
    'stone': { tempC: 400, timeSeconds: [90, 120] },
    'steel': { tempC: 380, timeSeconds: [100, 150] }, // Lower temp to avoid burning
  },
  'gas_home': {
    'steel': { tempC: 290, timeSeconds: [300, 420] }, // 5-7 min, Source: Serious Eats
    'stone': { tempC: 270, timeSeconds: [420, 600] }, // 7-10 min
    'pan': { tempC: 250, timeSeconds: [900, 1200] }, // 15-20 min for Detroit/Focaccia
  },
  'electric_home': {
    'steel': { tempC: 290, timeSeconds: [300, 420] },
    'stone': { tempC: 270, timeSeconds: [420, 600] },
    'pan': { tempC: 250, timeSeconds: [900, 1200] },
  },
};

export const BAKING_SURFACE_PROPERTIES: Record<SurfaceType, { conductivity: 'high' | 'medium' | 'low'; description: string }> = {
    'steel': { conductivity: 'high', description: 'Aço (Baking Steel) - Alta condutividade, ideal para fornos domésticos para uma base crocante. Fonte: PizzaBlab/Serious Eats.' },
    'stone': { conductivity: 'medium', description: 'Pedra Refratária - Condutividade média, versátil para a maioria dos fornos.' },
    'biscotto': { conductivity: 'low', description: 'Biscotto (Argila) - Baixa condutividade, essencial para fornos de altíssima temperatura (>450°C) para não queimar a base. Fonte: AVPN.' },
    'pan': { conductivity: 'medium', description: 'Assadeira (Pan) - Usada para estilos como Detroit e Focaccia, geralmente de metal.' },
};

// Community Inspirations
export const INSPIRATION_BATCHES: InspirationBatch[] = [
    {
        id: 'insp-neapolitan',
        name: 'Napolitana Clássica',
        config: { recipeStyle: RecipeStyle.NEAPOLITAN, hydration: 62, salt: 2.8, oil: 0 }
    },
    {
        id: 'insp-ny',
        name: 'New York Style (Fatia)',
        config: { recipeStyle: RecipeStyle.NEW_YORK, hydration: 65, salt: 2.2, oil: 2 }
    },
    {
        id: 'insp-sourdough',
        name: 'Pão Rústico (Sourdough)',
        config: { bakeType: BakeType.BREADS_SAVORY, recipeStyle: RecipeStyle.COUNTRY_LOAF, hydration: 78, salt: 2.0, yeastType: YeastType.SOURDOUGH_STARTER, yeastPercentage: 20 }
    },
    {
        id: 'insp-focaccia',
        name: 'Focaccia de Alta Hidratação',
        config: { bakeType: BakeType.BREADS_SAVORY, recipeStyle: RecipeStyle.FOCACCIA, hydration: 80, salt: 2.5, oil: 5 }
    },
];
