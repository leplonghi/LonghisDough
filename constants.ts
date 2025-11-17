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
  bakeType: BakeType.PIZZA,
  recipeStyle: RecipeStyle.NEAPOLITAN,
  stylePresetId: 'pizza_napoletana_avpn',
  numPizzas: 4,
  doughBallWeight: 250,
  hydration: 62,
  salt: 2.8,
  oil: 0,
  sugar: 0,
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
    {
      id: 'pizza_napoletana_avpn',
      name: 'Pizza Napoletana AVPN',
      type: 'pizza',
      recipeStyle: RecipeStyle.NEAPOLITAN,
      defaultHydration: 60,
      defaultSalt: 2.8,
      defaultOil: 0,
      notes: `• Farinha: Tipo 00 de moagem fina com força adequada para extensibilidade.\n• Textura: Massa macia, elástica, com cornicione inflado e interior leve.\n• Comportamento Térmico: Assamento extremamente rápido em piso de baixa condutividade (biscotto), com predominância de radiação.\n• Sabor: Notas lácticas suaves, leve acidez da fermentação, com foco no equilíbrio dos ingredientes.\n• Pré-fermentos: Opcional, mas tradicionalmente método direto.\n• Molho: Cru, brilhante, fresco.\n• Queijo: Fior di latte ou mozzarella de búfala.\n• Compatibilidade: Ideal para fornos de altíssima radiação.\n• Referências: AVPN, Modernist Pizza.`
    },
    {
      id: 'pizza_new_york',
      name: 'New York Style',
      type: 'pizza',
      recipeStyle: RecipeStyle.NEW_YORK,
      defaultHydration: 63,
      defaultSalt: 2.5,
      defaultOil: 2.0,
      notes: `• Farinha: Farinha com força média a alta para suportar fatias grandes e dobráveis.\n• Textura: Base firme e levemente crocante, interior macio. Fatia dobrável sem quebrar.\n• Comportamento Térmico: Assamento moderado, com maior influência de condução e convecção.\n• Sabor: Molho cozido com notas profundas, toque de óleo opcional na massa.\n• Pré-fermentos: Opcional, muitos usam fermentação fria longa.\n• Molho: Cozido, mais encorpado e aromático.\n• Queijo: Mozzarella low-moisture (baixa umidade).\n• Compatibilidade: Excelente para fornos domésticos.\n• Referências: Modernist Pizza, Serious Eats.`
    },
    {
      id: 'pizza_romana_pala_teglia',
      name: 'Romana – Pala / Teglia',
      type: 'pizza',
      recipeStyle: RecipeStyle.ROMAN,
      defaultHydration: 78,
      defaultSalt: 2.2,
      defaultOil: 3.0,
      notes: `• Farinha: Farinhas fortes com alta tolerância a fermentações longas.\n• Textura: Extremamente leve, alvéolos grandes, crocância pronunciada, interior aerado.\n• Comportamento Térmico: Assamento prolongado, ênfase em condução (formas de ferro/aço).\n• Sabor: Notas complexas de fermentação longa, aroma de trigo intenso.\n• Pré-fermentos: Comum o uso de Biga ou Poolish.\n• Molho: Pode ser cru ou cozido.\n• Queijo: Variado, conforme tradição local.\n• Compatibilidade: Ideal para fornos elétricos de deck.\n• Referências: Modernist Pizza, Bonci/Pizzarium.`
    },
    {
      id: 'pizza_detroit',
      name: 'Detroit Style',
      type: 'pizza',
      recipeStyle: RecipeStyle.DETROIT,
      defaultHydration: 70,
      defaultSalt: 2.0,
      defaultOil: 2.0,
      notes: `• Farinha: Farinha de força para suportar alta hidratação e estrutura aerada.\n• Textura: Base espessa, macia e aerada, quase como uma focaccia, com bordas de queijo crocantes ("frico").\n• Comportamento Térmico: Assada em formas de aço retangulares que promovem uma base frita e crocante.\n• Sabor: Rico, com ênfase na borda de queijo caramelizado.\n• Pré-fermentos: Opcionais, mas a fermentação fria longa é comum.\n• Molho: Tradicionalmente aplicado em faixas sobre o queijo.\n• Queijo: Brick cheese ou mistura de mozzarella low-moisture.\n• Compatibilidade: Perfeita para fornos domésticos.\n• Referências: Pizza Today, Modernist Pizza.`
    },
    {
      id: 'pizza_teglia_pan_alta',
      name: 'Teglia / Pan Pizza Alta',
      type: 'pizza',
      recipeStyle: RecipeStyle.PAN_PIZZA,
      defaultHydration: 75,
      defaultSalt: 2.2,
      defaultOil: 4.0,
      notes: `• Farinha: Farinha de força para desenvolver um miolo aberto e aerado.\n• Textura: Miolo muito leve, macio e cheio de alvéolos, com uma base dourada e crocante devido ao óleo na forma.\n• Comportamento Térmico: Assamento mais lento em temperatura moderada para cozinhar o interior espesso.\n• Sabor: Foco na textura da massa e no sabor do azeite.\n• Pré-fermentos: Biga ou Poolish são frequentemente usados.\n• Molho/Queijo: Versátil, suporta coberturas mais generosas.\n• Compatibilidade: Excelente para fornos domésticos.\n• Referências: Panificação italiana moderna.`
    },
    {
      id: 'pizza_focaccia_americana',
      name: 'Focaccia / Pan Pizza Americana',
      type: 'pizza',
      recipeStyle: RecipeStyle.FOCACCIA,
      defaultHydration: 65,
      defaultSalt: 1.8,
      defaultOil: 5.0,
      notes: `• Farinha: Farinha de força média.\n• Textura: Massa rica e macia, com uma base distintamente frita e crocante, resultado do cozimento em uma forma bem untada com óleo.\n• Comportamento Térmico: Cozimento em temperatura moderada.\n• Sabor: Rico e amanteigado, com a massa sendo uma parte central da experiência.\n• Pré-fermentos: Geralmente método direto.\n• Molho/Queijo: Tradicionalmente com coberturas generosas que vão até a borda.\n• Compatibilidade: Estilo clássico de redes de pizzaria americanas, adaptado para fornos domésticos.\n• Referências: Pizza Hut pan pizza (histórico), Serious Eats.`
    },
    {
      id: 'massa_direta_universal',
      name: 'Massa Direta Universal',
      type: 'pizza',
      recipeStyle: RecipeStyle.THIN_CRUST,
      defaultHydration: 62,
      defaultSalt: 2.0,
      defaultOil: 2.0,
      notes: `• Farinha: Farinha de uso geral ou tipo 1, flexível.\n• Textura: Equilibrada, nem muito crocante, nem muito macia. Um ponto de partida.\n• Comportamento Térmico: Projetada para ser versátil em fornos domésticos.\n• Sabor: Perfil de sabor neutro, focado nos ingredientes da cobertura.\n• Pré-fermentos: Nenhum, método direto para simplicidade e rapidez.\n• Lógica: Um preset base para iniciantes, para ser modificado e explorado no Modo Avançado.\n• Referências: Princípios básicos de panificação.`
    },
    {
      id: 'fermentacao_natural_levain',
      name: 'Fermentação Natural — Levain',
      type: 'bread',
      recipeStyle: RecipeStyle.SOURDOUGH,
      defaultHydration: 75,
      defaultSalt: 2.0,
      defaultOil: 0,
      notes: `• Farinha: Requer farinhas com boa estrutura para suportar a acidez e a fermentação longa.\n• Textura: Miolo mais úmido e mastigável, com alvéolos irregulares.\n• Comportamento Térmico: A acidez pode promover um douramento mais rápido.\n• Sabor: Complexo, com notas ácidas (láticas e acéticas) que variam conforme a cultura do levain.\n• Pré-fermentos: O próprio levain é o pré-fermento.\n• Lógica: Este preset explica o impacto do levain em qualquer massa, mais do que um estilo próprio.\n• Referências: King Arthur Baking, Modernist Bread.`
    },
    {
      id: 'forno_domestico_otimizacao',
      name: 'Otimização para Forno Doméstico',
      type: 'pizza',
      recipeStyle: RecipeStyle.NY_STYLE,
      defaultHydration: 63,
      defaultSalt: 2.2,
      defaultOil: 2.0,
      notes: `• Farinha: Farinha de força média a alta.\n• Textura: Busca maximizar a crocância da base e a maciez interna em temperaturas limitadas.\n• Comportamento Térmico: Otimizada para assamento mais longo em temperaturas mais baixas. O uso de óleo e/ou açúcar ajuda na maciez e no douramento.\n• Lógica: Um preset conceitual que aplica os princípios para obter o melhor resultado possível em um forno doméstico, geralmente se aproximando de um NY Style.\n• Compatibilidade: Ideal com uma superfície de alta condução, como uma chapa de aço.\n• Referências: Serious Eats - The Pizza Lab.`
    },
    {
      id: 'pizza_fina_crocante',
      name: 'Pizza Fina Crocante (Cracker)',
      type: 'pizza',
      recipeStyle: RecipeStyle.THIN_CRUST,
      defaultHydration: 55,
      defaultSalt: 1.8,
      defaultOil: 4.0,
      notes: `• Farinha: Farinha de baixa a média força.\n• Textura: Extremamente fina, crocante e quebradiça, como uma bolacha. Sem borda inflada.\n• Comportamento Térmico: A massa é aberta com rolo para expelir o gás e garantir a finura. Assa rapidamente.\n• Sabor: Foco na crocância e nos ingredientes da cobertura.\n• Pré-fermentos: Nenhum, método direto.\n• Lógica: Baixa hidratação e um percentual de óleo mais alto são chaves para a textura crocante.\n• Referências: Panificação de massa laminada.`
    },
    {
      id: 'chicago_tavern_style',
      name: 'Chicago Tavern Style',
      type: 'pizza',
      recipeStyle: RecipeStyle.CHICAGO,
      defaultHydration: 58,
      defaultSalt: 1.5,
      defaultOil: 3.0,
      notes: `• Farinha: Farinha de força média.\n• Textura: Fina e muito crocante, quase como uma bolacha, mas firme o suficiente para suportar as coberturas. Sem borda.\n• Comportamento Térmico: Coberturas espalhadas até a borda. Cortada em quadrados ("party cut" ou "tavern cut").\n• Sabor: Foco na combinação de massa crocante e coberturas.\n• Lógica: É o estilo de pizza mais antigo e popular de Chicago, não o deep-dish.\n• Compatibilidade: Excelente para fornos domésticos.\n• Referências: Pizza a la Grande, Chicago food history.`
    },
    {
      id: 'siciliana_quadrada',
      name: 'Siciliana Quadrada',
      type: 'pizza',
      recipeStyle: RecipeStyle.SICILIAN,
      defaultHydration: 68,
      defaultSalt: 2.0,
      defaultOil: 4.0,
      notes: `• Farinha: Farinha de força média a alta.\n• Textura: Miolo espesso, muito macio e esponjoso, semelhante a uma focaccia. Base dourada e crocante devido ao óleo na forma.\n• Comportamento Térmico: Assada em forma retangular untada.\n• Sabor: Massa rica em sabor, com um molho de tomate simples e queijo.\n• Lógica: O estilo original siciliano, levado aos EUA por imigrantes.\n• Compatibilidade: Perfeita para fornos domésticos.\n• Referências: Tradição ítalo-americana.`
    },
    {
      id: 'grandma_style',
      name: 'Grandma Style',
      type: 'pizza',
      recipeStyle: RecipeStyle.PAN_PIZZA,
      defaultHydration: 65,
      defaultSalt: 2.0,
      defaultOil: 3.0,
      notes: `• Farinha: Farinha de uso geral ou de força média.\n• Textura: Massa mais fina que a Siciliana, com uma base distintamente crocante e frita. O miolo é mais denso que o de uma focaccia, mas ainda macio.\n• Comportamento Térmico: Fermentada diretamente na forma untada, resultando em uma textura única.\n• Sabor: Pizza caseira, com molho por cima do queijo.\n• Lógica: Originada das cozinhas de avós ítalo-americanas em Long Island, NY.\n• Compatibilidade: Perfeita para fornos domésticos.\n• Referências: História da pizza de Long Island, Bon Appétit.`
    },
    {
      id: 'pizza_classica_brasileira',
      name: 'Pizza "Clássica Brasileira"',
      type: 'pizza',
      recipeStyle: RecipeStyle.PAN_PIZZA,
      defaultHydration: 60,
      defaultSalt: 1.8,
      defaultOil: 3.0,
      notes: `• Farinha: Farinha de trigo tipo 1, de uso geral.\n• Textura: Massa de espessura média, macia e com uma base levemente crocante. Borda presente, mas não muito inflada.\n• Comportamento Térmico: Adaptada para fornos a gás ou elétricos de pizzarias, com assamento moderado.\n• Sabor: Foco na abundância de cobertura. A massa serve como uma base neutra e macia.\n• Molho/Queijo: Molho de tomate cozido e mozzarella em quantidade generosa são a base.\n• Lógica: Representa o estilo popularizado nas pizzarias de São Paulo e do Brasil desde meados do século XX.\n• Referências: História da gastronomia de São Paulo.`
    }
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
    nameKey: 'pro_recipes.ny_style_title',
    descriptionKey: 'pro_recipes.ny_style_desc',
    config: {
        bakeType: BakeType.PIZZA,
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
      bakeType: BakeType.BREAD,
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
        bakeType: BakeType.BREAD,
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
    nameKey: 'pro_recipes.roman_title',
    descriptionKey: 'pro_recipes.roman_desc',
    config: {
      bakeType: BakeType.PIZZA,
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
      bakeType: BakeType.PIZZA,
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
      bakeType: BakeType.BREAD,
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
      bakeType: BakeType.PIZZA,
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
      bakeType: BakeType.BREAD,
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
      bakeType: BakeType.PIZZA,
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
        config: { bakeType: BakeType.BREAD, recipeStyle: RecipeStyle.COUNTRY_LOAF, hydration: 78, salt: 2.0, yeastType: YeastType.SOURDOUGH_STARTER, yeastPercentage: 20 }
    },
    {
        id: 'insp-focaccia',
        name: 'Focaccia de Alta Hidratação',
        config: { bakeType: BakeType.BREAD, recipeStyle: RecipeStyle.FOCACCIA, hydration: 80, salt: 2.5, oil: 5 }
    },
];