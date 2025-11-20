import { DoughStyle } from '../types';

export const OFFICIAL_STYLES: any[] = [
  {
    "id": "neapolitan_avpn",
    "slug": "neapolitan-avpn",
    "name": "Neapolitan Pizza AVPN",
    "category": "Pizza",
    "country": "Italy",
    "accessTier": "free",
    "sourceType": "official",
    "visibility": "public",
    "history": "The Neapolitan dough is one of the oldest codified dough styles in the world, regulated by the AVPN. It emphasizes simplicity—flour, water, salt, yeast—and extremely high heat.",
    "uniqueCharacteristics": [
      "High extensibility",
      "Zero fat traditional formula",
      "Baked at 430–480°C",
      "Fermented 16–24h at controlled room temperature"
    ],
    "definingTechniques": [
      "Long fermentation at room temperature",
      "Gentle hand-kneading",
      "Balling and relaxing phase",
      "Extremely fast bake under 90 seconds"
    ],
    "technical": {
      "hydration": [58, 65],
      "salt": [2.5, 3],
      "fat": [0, 1],
      "sugar": [0, 1],
      "flourStrength": "W260–W300",
      "fermentation": {
        "description": "Traditional long fermentation",
        "ranges": ["16–24h @ 18–22°C"]
      },
      "ovenTemp": "430–480°C"
    },
    "variations": [
      { "name": "AVPN Classic", "hydration": 58 },
      { "name": "Modern", "hydration": 62 },
      { "name": "High Hydration", "hydration": 65 }
    ],
    "risks": [
      "Weak flour collapses during fermentation",
      "Short fermentation generates poor flavor",
      "Overhydration reduces extensibility"
    ],
    "notes": [
      "Always use finely milled Italian-style flour",
      "Do not use rolling pins",
      "Bulk fermentation must remain controlled"
    ],
    "recommendedItems": [],
    "defaultPreset": {
      "hydration": 62,
      "salt": 2.8,
      "fat": 0,
      "sugar": 0,
      "recipeStyle": "NEAPOLITAN",
      "category": "Pizza",
      "fermentationTechnique": "DIRECT",
      "bakingTempC": 450
    }
  },

  {
    "id": "country_sourdough",
    "slug": "country-sourdough",
    "name": "Country Sourdough (Tartine Method)",
    "category": "Pão",
    "country": "USA",
    "accessTier": "free",
    "sourceType": "official",
    "visibility": "public",
    "history": "A modern artisan style popularized by Tartine Bakery, known for its open crumb, high hydration and long fermentation.",
    "uniqueCharacteristics": [
      "Open crumb",
      "High hydration",
      "Hybrid white/whole wheat blend"
    ],
    "definingTechniques": [
      "Autolyse",
      "Stretch & Fold",
      "Cold retard fermentation",
      "Steam baking"
    ],
    "technical": {
      "hydration": [70, 82],
      "salt": [2, 2.4],
      "fat": [0, 0],
      "sugar": [0, 2],
      "flourStrength": "Strong bread flour",
      "fermentation": {
        "description": "Slow fermentation with cold retard",
        "ranges": ["12–48h @ 4°C"]
      },
      "ovenTemp": "240–260°C"
    },
    "variations": [
      {"name": "Tartine Classic", "hydration": 75},
      {"name": "High Hydration", "hydration": 80}
    ],
    "risks": [
      "Weak starter leads to dense crumb",
      "Underdeveloped gluten collapses",
      "Insufficient steam prevents oven spring"
    ],
    "notes": [
      "Develop gluten gradually",
      "Do not skip cold retard",
      "Steam is essential for bloom"
    ],
    "recommendedItems": [],
    "defaultPreset": {
      "hydration": 75,
      "salt": 2.2,
      "recipeStyle": "COUNTRY_LOAF",
      "category": "Pão",
      "fermentationTechnique": "DIRECT",
      "bakingTempC": 245
    }
  },

  {
    "id": "panettone_milanese",
    "slug": "panettone-milanese",
    "name": "Panettone Milanese (Base Recipe)",
    "category": "Doce",
    "country": "Italy",
    "accessTier": "pro",
    "sourceType": "official",
    "visibility": "public",
    "history": "A traditional enriched dough from Milan, requiring two doughs and a very strong, stable lievito madre.",
    "uniqueCharacteristics": [
      "Highly enriched dough",
      "Two-stage fermentation",
      "Requires extremely strong natural yeast"
    ],
    "definingTechniques": [
      "First dough at night",
      "Second dough next morning",
      "Incorporation of butter at low temperature",
      "Hanging upside down after baking"
    ],
    "technical": {
      "hydration": [45, 55],
      "salt": [1.5, 2],
      "fat": [20, 35],
      "sugar": [20, 30],
      "flourStrength": "W350–W400",
      "fermentation": {
        "description": "Two dough method",
        "ranges": ["12–24h total process time"]
      },
      "ovenTemp": "165–175°C"
    },
    "variations": [
      {"name": "Classic Milanese", "hydration": 48},
      {"name": "Modern High Fat", "hydration": 52}
    ],
    "risks": [
      "Starter must be extremely strong",
      "Improper emulsification collapses structure",
      "Overmixing overheats dough"
    ],
    "notes": [
      "Always check dough temperature",
      "Quality of butter drastically affects result",
      "Gluten must remain silky and elastic"
    ],
    "recommendedItems": [],
    "defaultPreset": {
      "hydration": 50,
      "salt": 1.8,
      "recipeStyle": "PATE_SUCREE", // Using generic sweet style as fallback
      "category": "Doce",
      "fermentationTechnique": "DIRECT",
      "bakingTempC": 170
    }
  },

  {
    "id": "shokupan_basic",
    "slug": "shokupan-basic",
    "name": "Shokupan (Milk Bread – Basic)",
    "category": "Pão",
    "country": "Japan",
    "accessTier": "pro",
    "sourceType": "official",
    "visibility": "public",
    "history": "A soft and fluffy Japanese milk bread made with Tangzhong.",
    "uniqueCharacteristics": [
      "Extremely soft crumb",
      "High elasticity",
      "Tangzhong gelatinized starter"
    ],
    "definingTechniques": [
      "Tangzhong preparation",
      "Intensive kneading",
      "Rolled shaping"
    ],
    "technical": {
      "hydration": [60, 70],
      "salt": [1.5, 2],
      "fat": [8, 12],
      "sugar": [8, 12],
      "flourStrength": "Strong white flour",
      "fermentation": {
        "description": "Warm fermentation",
        "ranges": ["2–4h total"]
      },
      "ovenTemp": "180–190°C"
    },
    "variations": [
      {"name": "Richer", "fat": 12},
      {"name": "Sweeter", "sugar": 12}
    ],
    "risks": [
      "Underdeveloped gluten causes tearing",
      "Overproofing reduces oven spring"
    ],
    "notes": [
      "Tangzhong ratio must remain consistent",
      "Shape the dough tightly"
    ],
    "recommendedItems": [],
    "defaultPreset": {
      "hydration": 65,
      "salt": 1.8,
      "recipeStyle": "SANDWICH_LOAF",
      "category": "Pão",
      "fermentationTechnique": "DIRECT",
      "bakingTempC": 180
    }
  },
  {
    "id": "grandma_pizza",
    "slug": "grandma-pizza",
    "name": "Grandma Pizza",
    "category": "Pizza",
    "country": "USA (Long Island)",
    "year": "1970s",
    "accessTier": "pro",
    "isPro": true,
    "sourceType": "official",
    "visibility": "public",
    "history": "Criada por imigrantes italianos em Long Island, assada em bandejas caseiras de cozinha, fina e crocante.",
    "uniqueCharacteristics": [
      "Thin crispy pan crust",
      "Baked in rectangular sheet pans",
      "Garlic forward flavor"
    ],
    "definingTechniques": [
      "Short proofing directly in pan",
      "Raw sauce applied over cheese",
      "High oil usage for bottom frying"
    ],
    "technical": {
      "hydration": [60, 65],
      "salt": [2.5, 3],
      "fat": [2, 4],
      "sugar": [0, 1],
      "flourStrength": "W260–W300",
      "fermentation": {
        "description": "Fermentação curta; aberta diretamente na bandeja.",
        "ranges": ["4–12h total"]
      },
      "ovenTemp": "245–290°C"
    },
    "variations": [
      { "name": "Classic Grandma", "hydration": 62 },
      { "name": "Thin Crispy", "hydration": 60 },
      { "name": "Modern Grandma", "hydration": 65 }
    ],
    "risks": [
      "Abrir excessivamente fina causa ressecamento",
      "Pouco óleo impede formação da base crocante"
    ],
    "notes": [
      "Molho geralmente aplicado por cima do queijo",
      "Característica: textura crocante e leve"
    ],
    "recommendedItems": [],
    "defaultPreset": {
      "hydration": 62,
      "salt": 2.5,
      "fat": 3,
      "sugar": 0,
      "recipeStyle": "GRANDMA_STYLE",
      "category": "Pizza",
      "fermentationTechnique": "DIRECT",
      "bakingTempC": 250
    }
  },
  {
    "id": "sicilian_square",
    "slug": "sicilian-square",
    "name": "Sicilian Square (Sfincione)",
    "category": "Pizza",
    "country": "Italy (Sicily)",
    "year": "1900s",
    "accessTier": "pro",
    "isPro": true,
    "sourceType": "official",
    "visibility": "public",
    "history": "The classic Sicilian tray pizza, evolved from traditional 'sfincione'. Popularized in the USA after Sicilian immigration.",
    "uniqueCharacteristics": [
      "Spongy, airy crumb",
      "Baked in rectangular steel pans",
      "Generous olive oil on the pan"
    ],
    "definingTechniques": [
      "Pan proofing (Second fermentation in tray)",
      "High hydration for tray bake",
      "Long fermentation"
    ],
    "technical": {
      "hydration": [65, 75],
      "salt": [2.5, 3],
      "fat": [3, 6],
      "sugar": [0.5, 2],
      "flourStrength": "W280–W330",
      "fermentation": {
        "description": "Long cold ferment",
        "ranges": ["18–48h cold ferment"]
      },
      "ovenTemp": "260–315°C"
    },
    "variations": [
      { "name": "Traditional Sfincione", "hydration": 65 },
      { "name": "New York Sicilian", "hydration": 70 },
      { "name": "High Hydration Pan", "hydration": 75 }
    ],
    "risks": [
      "Excess oil makes base heavy",
      "Low hydration reduces lightness"
    ],
    "notes": [
      "Assada sempre com bastante óleo na forma",
      "Textura alta e aerada típica"
    ],
    "recommendedItems": [],
    "defaultPreset": {
      "hydration": 70,
      "salt": 2.5,
      "fat": 4,
      "sugar": 1,
      "recipeStyle": "SICILIANA",
      "category": "Pizza",
      "fermentationTechnique": "DIRECT",
      "bakingTempC": 280
    }
  },
  {
    "id": "detroit_style",
    "slug": "detroit-style",
    "name": "Detroit Style Pizza",
    "category": "Pizza",
    "country": "USA (Detroit)",
    "year": "1946",
    "accessTier": "pro",
    "isPro": true,
    "sourceType": "official",
    "visibility": "public",
    "history": "Baked in heavy rectangular steel pans originally used for automotive parts. Famous for its caramelized cheese edge (frico).",
    "uniqueCharacteristics": [
      "Caramelized cheese crown (frico)",
      "Sauce applied after baking (Red Top)",
      "Thick, airy, focaccia-like crust"
    ],
    "definingTechniques": [
      "Proofing in the pan",
      "High hydration",
      "Brick cheese application to edges"
    ],
    "technical": {
      "hydration": [70, 75],
      "salt": [2.2, 2.8],
      "fat": [1, 3],
      "sugar": [0, 2],
      "flourStrength": "W280–W320",
      "fermentation": {
        "description": "Ambient proof in pan",
        "ranges": ["2–4h in pan"]
      },
      "ovenTemp": "260–290°C"
    },
    "variations": [
      { "name": "Classic Red Top", "hydration": 70 },
      { "name": "Modern Airy", "hydration": 75 }
    ],
    "risks": [
      "Burning the cheese before dough cooks",
      "Gum line from sauce on raw dough"
    ],
    "notes": [
      "Use Wisconsin Brick Cheese or Cheddar/Mozz mix",
      "Apply sauce in stripes"
    ],
    "recommendedItems": [],
    "defaultPreset": {
      "hydration": 73,
      "salt": 2.5,
      "fat": 2,
      "sugar": 1,
      "recipeStyle": "DETROIT",
      "category": "Pizza",
      "fermentationTechnique": "DIRECT",
      "bakingTempC": 275
    }
  },
  {
    "id": "roman_teglia",
    "slug": "roman-teglia",
    "name": "Pizza in Teglia Romana",
    "category": "Pizza",
    "country": "Italy (Rome)",
    "year": "1980s",
    "accessTier": "pro",
    "isPro": true,
    "sourceType": "official",
    "visibility": "public",
    "history": "A modern classic of Rome, known for its incredible lightness, high hydration, and crunch (scrocchiarella).",
    "uniqueCharacteristics": [
      "Very high hydration (80%+)",
      "Open, honeycomb crumb",
      "Crunchy bottom, soft top"
    ],
    "definingTechniques": [
      "High hydration mixing",
      "Stretch and fold",
      "Cold fermentation (48-72h)"
    ],
    "technical": {
      "hydration": [75, 90],
      "salt": [2.2, 2.5],
      "fat": [2, 3],
      "sugar": [0, 0],
      "flourStrength": "W320–W380",
      "fermentation": {
        "description": "Long cold maturation",
        "ranges": ["48–72h @ 4°C"]
      },
      "ovenTemp": "250–280°C"
    },
    "variations": [
      { "name": "Standard Teglia", "hydration": 80 },
      { "name": "High Hydro", "hydration": 85 }
    ],
    "risks": [
      "Difficult to handle dough",
      "Sticking to pan"
    ],
    "notes": [
      "Use semolina for dusting",
      "Bake on floor of oven first"
    ],
    "recommendedItems": [],
    "defaultPreset": {
      "hydration": 80,
      "salt": 2.5,
      "fat": 2.5,
      "sugar": 0,
      "recipeStyle": "ROMANA_TONDA",
      "category": "Pizza",
      "fermentationTechnique": "DIRECT",
      "bakingTempC": 260
    }
  },
  {
    "id": "chicago_deep",
    "slug": "chicago-deep-dish",
    "name": "Chicago Deep Dish",
    "category": "Pizza",
    "country": "USA (Chicago)",
    "year": "1943",
    "accessTier": "pro",
    "isPro": true,
    "sourceType": "official",
    "visibility": "public",
    "history": "Invented in 1943 at Pizzeria Uno. It behaves more like a savory pie with a biscuit-like crust.",
    "uniqueCharacteristics": [
      "High fat content (butter/oil)",
      "Deep pan baking",
      "Inverted layers (cheese down, sauce up)"
    ],
    "definingTechniques": [
      "Laminating dough with fat",
      "Pressing into deep pan",
      "Long bake at lower temp"
    ],
    "technical": {
      "hydration": [50, 60],
      "salt": [1.5, 2],
      "fat": [15, 25],
      "sugar": [0, 2],
      "flourStrength": "W240–W280",
      "fermentation": {
        "description": "Short bulk",
        "ranges": ["2–4h ambient"]
      },
      "ovenTemp": "200–230°C"
    },
    "variations": [
      { "name": "Traditional Butter", "fat": 20 },
      { "name": "Cornmeal Crust", "fat": 15 }
    ],
    "risks": [
      "Underbaked center",
      "Soggy bottom crust"
    ],
    "notes": [
      "Don't overwork the dough",
      "Sauce goes on top to prevent burning cheese"
    ],
    "recommendedItems": [],
    "defaultPreset": {
      "hydration": 55,
      "salt": 1.8,
      "fat": 18,
      "sugar": 1,
      "recipeStyle": "CHICAGO_DEEP_DISH",
      "category": "Pizza",
      "fermentationTechnique": "DIRECT",
      "bakingTempC": 220
    }
  }
];