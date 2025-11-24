
import { DoughConfig, Oven, RecipeStyle, AutoStyleInsightsResult, BakeType } from '../types';

const STYLE_CHARACTERISTICS: Record<
  RecipeStyle,
  {
    hydrationRange: [number, number];
    idealW: [number, number];
    idealOvenTemp: [number, number];
    name: string;
  }
> = {
  [RecipeStyle.NEAPOLITAN]: { hydrationRange: [55, 62], idealW: [250, 310], idealOvenTemp: [450, 500], name: 'Neapolitan' },
  [RecipeStyle.NEW_YORK]: { hydrationRange: [63, 67], idealW: [320, 360], idealOvenTemp: [280, 450], name: 'NY Style' },
  [RecipeStyle.DETROIT]: { hydrationRange: [67, 75], idealW: [300, 360], idealOvenTemp: [250, 300], name: 'Detroit' },
  [RecipeStyle.ROMAN]: { hydrationRange: [75, 85], idealW: [340, 400], idealOvenTemp: [250, 320], name: 'Roman (Teglia)' },
  [RecipeStyle.FOCACCIA]: { hydrationRange: [70, 85], idealW: [300, 380], idealOvenTemp: [220, 260], name: 'Focaccia' },
  [RecipeStyle.COUNTRY_LOAF]: { hydrationRange: [70, 85], idealW: [320, 400], idealOvenTemp: [230, 260], name: 'Rustic Loaf' },
  [RecipeStyle.BAGUETTE]: { hydrationRange: [65, 75], idealW: [280, 330], idealOvenTemp: [240, 270], name: 'Baguette' },
  [RecipeStyle.PAN_PIZZA]: { hydrationRange: [65, 75], idealW: [280, 340], idealOvenTemp: [240, 280], name: 'Pan Pizza' },
  [RecipeStyle.THIN_CRUST]: { hydrationRange: [50, 60], idealW: [220, 280], idealOvenTemp: [250, 300], name: 'Thin & Crispy' },
  [RecipeStyle.SANDWICH_LOAF]: { hydrationRange: [60, 70], idealW: [240, 300], idealOvenTemp: [180, 210], name: 'Sandwich Loaf' },
  [RecipeStyle.FLATBREAD]: { hydrationRange: [60, 70], idealW: [200, 260], idealOvenTemp: [250, 350], name: 'Flatbread' },
  [RecipeStyle.NY_STYLE]: { hydrationRange: [63, 67], idealW: [320, 360], idealOvenTemp: [280, 450], name: 'NY Style' },
  [RecipeStyle.SICILIAN]: { hydrationRange: [65, 75], idealW: [280, 340], idealOvenTemp: [240, 280], name: 'Sicilian' },
  [RecipeStyle.CHICAGO]: { hydrationRange: [55, 65], idealW: [280, 340], idealOvenTemp: [220, 250], name: 'Chicago Deep Dish' },
  [RecipeStyle.SOURDOUGH]: { hydrationRange: [70, 85], idealW: [320, 400], idealOvenTemp: [230, 260], name: 'Sourdough Bread' },
  [RecipeStyle.CIABATTA]: { hydrationRange: [80, 90], idealW: [340, 400], idealOvenTemp: [230, 260], name: 'Ciabatta' },
  [RecipeStyle.BRIOCHE]: { hydrationRange: [50, 60], idealW: [280, 350], idealOvenTemp: [170, 190], name: 'Brioche' },
  [RecipeStyle.RYE]: { hydrationRange: [70, 90], idealW: [180, 240], idealOvenTemp: [210, 240], name: 'Rye Bread' },
  [RecipeStyle.CHICAGO_DEEP_DISH]: { hydrationRange: [55, 65], idealW: [280, 340], idealOvenTemp: [220, 250], name: 'Chicago Deep Dish' },
  [RecipeStyle.ROMANA_TONDA]: { hydrationRange: [55, 62], idealW: [250, 300], idealOvenTemp: [300, 350], name: 'Romana Tonda' },
  [RecipeStyle.SICILIANA]: { hydrationRange: [65, 75], idealW: [280, 340], idealOvenTemp: [240, 280], name: 'Sicilian' },
  [RecipeStyle.GRANDMA_STYLE]: { hydrationRange: [68, 78], idealW: [280, 340], idealOvenTemp: [240, 280], name: 'Grandma Style' },
  [RecipeStyle.PAO_FRANCES]: { hydrationRange: [58, 65], idealW: [240, 290], idealOvenTemp: [200, 230], name: 'French Bread' },
  [RecipeStyle.PUMPERNICKEL]: { hydrationRange: [80, 100], idealW: [150, 200], idealOvenTemp: [150, 180], name: 'Pumpernickel' },
  [RecipeStyle.PAO_DE_BATATA]: { hydrationRange: [60, 70], idealW: [220, 280], idealOvenTemp: [180, 200], name: 'Potato Bread' },
  [RecipeStyle.CHALLAH]: { hydrationRange: [55, 65], idealW: [250, 320], idealOvenTemp: [180, 200], name: 'Challah' },
  [RecipeStyle.BAGEL]: { hydrationRange: [50, 60], idealW: [300, 380], idealOvenTemp: [220, 250], name: 'Bagel' },
  [RecipeStyle.ENGLISH_MUFFIN]: { hydrationRange: [65, 75], idealW: [240, 300], idealOvenTemp: [150, 180], name: 'English Muffin' },
  [RecipeStyle.PITA]: { hydrationRange: [60, 70], idealW: [240, 300], idealOvenTemp: [250, 300], name: 'Pita' },
  [RecipeStyle.MASSA_PODRE]: { hydrationRange: [30, 40], idealW: [180, 240], idealOvenTemp: [180, 200], name: 'Shortcrust' },
  [RecipeStyle.MASSA_ESFIHA]: { hydrationRange: [55, 65], idealW: [220, 280], idealOvenTemp: [200, 230], name: 'Esfiha Dough' },
  [RecipeStyle.MASSA_TORTA]: { hydrationRange: [40, 50], idealW: [200, 260], idealOvenTemp: [180, 200], name: 'Savory Pie Dough' },
  [RecipeStyle.PATE_SUCREE]: { hydrationRange: [30, 40], idealW: [150, 200], idealOvenTemp: [170, 190], name: 'Pâte Sucrée' },
  [RecipeStyle.SABLEE]: { hydrationRange: [25, 35], idealW: [150, 200], idealOvenTemp: [170, 190], name: 'Sablée' },
  [RecipeStyle.POUND_CAKE]: { hydrationRange: [50, 60], idealW: [150, 200], idealOvenTemp: [160, 180], name: 'Pound Cake' },
  [RecipeStyle.COOKIES]: { hydrationRange: [30, 50], idealW: [180, 240], idealOvenTemp: [170, 190], name: 'Cookies' },
  [RecipeStyle.PIE_DOUGH]: { hydrationRange: [35, 45], idealW: [180, 240], idealOvenTemp: [190, 210], name: 'Pie Dough' },
  [RecipeStyle.BOLO_SIMPLES]: { hydrationRange: [50, 70], idealW: [150, 220], idealOvenTemp: [170, 190], name: 'Simple Cake' },
  [RecipeStyle.BURGER_BUN]: { hydrationRange: [45, 60], idealW: [240, 300], idealOvenTemp: [180, 220], name: 'Burger Bun' },
  [RecipeStyle.HOKKAIDO_MILK_BREAD]: { hydrationRange: [65, 75], idealW: [300, 380], idealOvenTemp: [170, 190], name: 'Hokkaido Milk Bread' },
  [RecipeStyle.COOKIE_NY_CHOC_CHIP]: { hydrationRange: [0, 15], idealW: [180, 240], idealOvenTemp: [190, 210], name: 'NY Cookie' },
  [RecipeStyle.CINNAMON_ROLL]: { hydrationRange: [50, 60], idealW: [240, 320], idealOvenTemp: [180, 200], name: 'Cinnamon Roll' },
  [RecipeStyle.DINNER_ROLLS]: { hydrationRange: [55, 65], idealW: [220, 280], idealOvenTemp: [180, 200], name: 'Dinner Rolls' },
  [RecipeStyle.SWEET_ROLL]: { hydrationRange: [50, 60], idealW: [240, 320], idealOvenTemp: [180, 200], name: 'Sweet Rolls' },
  [RecipeStyle.BABKA]: { hydrationRange: [30, 45], idealW: [280, 350], idealOvenTemp: [170, 190], name: 'Babka' },
  [RecipeStyle.DONUT]: { hydrationRange: [50, 60], idealW: [240, 300], idealOvenTemp: [180, 200], name: 'Yeast Donut' },
  [RecipeStyle.SHORTBREAD]: { hydrationRange: [0, 10], idealW: [150, 200], idealOvenTemp: [160, 170], name: 'Shortbread' },
  [RecipeStyle.BROWNIE]: { hydrationRange: [20, 30], idealW: [150, 200], idealOvenTemp: [160, 180], name: 'Brownie' },
  [RecipeStyle.SWEETS_PASTRY]: { hydrationRange: [5, 20], idealW: [150, 220], idealOvenTemp: [160, 190], name: 'Pastry & Sweets' },
  
  // New Styles from Types
  [RecipeStyle.BREAD_RUSTIC_SOURDOUGH]: { hydrationRange: [70, 80], idealW: [280, 350], idealOvenTemp: [230, 250], name: 'Rustic Sourdough' },
  [RecipeStyle.BREAD_BAGUETTE_CLASSIC]: { hydrationRange: [65, 75], idealW: [260, 300], idealOvenTemp: [240, 260], name: 'Classic Baguette' },
  [RecipeStyle.BREAD_SANDWICH_SOFT]: { hydrationRange: [60, 68], idealW: [240, 300], idealOvenTemp: [180, 200], name: 'Soft Sandwich Loaf' },
  [RecipeStyle.ENRICHED_BRIOCHE_CLASSIC]: { hydrationRange: [10, 20], idealW: [280, 350], idealOvenTemp: [180, 200], name: 'Classic Brioche' },
  [RecipeStyle.ENRICHED_DINNER_ROLL]: { hydrationRange: [60, 65], idealW: [240, 280], idealOvenTemp: [190, 210], name: 'Dinner Roll' },
  [RecipeStyle.BURGER_BUN_BRIOCHE]: { hydrationRange: [55, 65], idealW: [260, 320], idealOvenTemp: [190, 210], name: 'Brioche Burger Bun' },
  [RecipeStyle.BURGER_BUN_POTATO]: { hydrationRange: [60, 70], idealW: [240, 300], idealOvenTemp: [190, 210], name: 'Potato Bun' },
  [RecipeStyle.BURGER_BUN_SOFT]: { hydrationRange: [58, 65], idealW: [240, 280], idealOvenTemp: [200, 220], name: 'Soft Burger Bun' },
  [RecipeStyle.PASTRY_CINNAMON_ROLL]: { hydrationRange: [50, 60], idealW: [240, 300], idealOvenTemp: [180, 200], name: 'Cinnamon Roll' },
  [RecipeStyle.PASTRY_DANISH]: { hydrationRange: [45, 55], idealW: [280, 340], idealOvenTemp: [200, 220], name: 'Danish Pastry' },
  [RecipeStyle.COOKIE_CLASSIC_CHOC_CHIP]: { hydrationRange: [0, 10], idealW: [150, 200], idealOvenTemp: [175, 190], name: 'Classic Choc Chip' },
  [RecipeStyle.COOKIE_BROWN_BUTTER]: { hydrationRange: [0, 10], idealW: [150, 200], idealOvenTemp: [175, 190], name: 'Brown Butter Cookie' },
  [RecipeStyle.COOKIE_SHORTBREAD]: { hydrationRange: [0, 5], idealW: [120, 160], idealOvenTemp: [160, 170], name: 'Shortbread' },
};


function calculateFitScore(
  config: DoughConfig,
  style: RecipeStyle,
  flourStrength: number | undefined,
  oven: Oven | undefined
): number {
  const characteristics = STYLE_CHARACTERISTICS[style];
  if (!characteristics) return 0;

  let score = 0;

  // Hydration score (40 points)
  const [minH, maxH] = characteristics.hydrationRange;
  if (config.hydration >= minH && config.hydration <= maxH) {
    score += 40;
  } else if (config.hydration >= minH - 5 && config.hydration <= maxH + 5) {
    score += 20; // Partially correct
  }

  // Flour strength score (30 points)
  if (flourStrength) {
    const [minW, maxW] = characteristics.idealW;
    if (flourStrength >= minW && flourStrength <= maxW) {
      score += 30;
    } else if (flourStrength >= minW - 50 && flourStrength <= maxW + 50) {
      score += 15;
    }
  } else {
    score += 10; // No flour info, give some points
  }

  // Oven score (30 points)
  if (oven) {
    const [minT, maxT] = characteristics.idealOvenTemp;
    if (oven.maxTemperature >= minT) {
      score += 30;
    } else if (oven.maxTemperature >= minT - 50) {
      score += 15;
    }
  } else {
    score += 10; // No oven info
  }
  
  return Math.min(100, score);
}


export function getAutoStyleInsights(
  config: DoughConfig,
  environmentTempC?: number,
  flourStrength?: number,
  oven?: Oven,
): AutoStyleInsightsResult {
  const insights: AutoStyleInsightsResult = {
    idealHydrationRange: 'N/A',
    idealFermentationRange: 'N/A',
    styleFitScore: 0,
    recommendedStyle: null,
    mismatchWarnings: [],
    professionalNotes: [],
  };

  const currentStyle = config.recipeStyle;
  const currentStyleChars = STYLE_CHARACTERISTICS[currentStyle];

  if (!currentStyleChars) return insights; // Should not happen

  // 1. Set Ideal Ranges for current style
  insights.idealHydrationRange = `${currentStyleChars.hydrationRange[0]}% - ${currentStyleChars.hydrationRange[1]}%`;
  
  if (config.bakeType === BakeType.SWEETS_PASTRY) {
      insights.idealFermentationRange = "N/A (Chemical leavening or physical aeration)";
  } else if (environmentTempC) {
    if (environmentTempC < 20) insights.idealFermentationRange = "24–72 hours (cold or ambient)";
    else if (environmentTempC <= 24) insights.idealFermentationRange = "12–24 hours";
    else if (environmentTempC <= 28) insights.idealFermentationRange = "8–12 hours";
    else insights.idealFermentationRange = "4–8 hours (or reduce yeast)";
  }

  // 2. Calculate Fit Score for the current configuration
  insights.styleFitScore = calculateFitScore(config, currentStyle, flourStrength, oven);
  
  // 3. Generate Warnings and Notes
  if (flourStrength) {
      const [minW, maxW] = currentStyleChars.idealW;
      if(flourStrength < minW) insights.mismatchWarnings.push(`Your flour (W ${flourStrength}) might be too weak for ${currentStyleChars.name}, which performs better with W ${minW}-${maxW}.`);
      if(flourStrength > maxW) insights.mismatchWarnings.push(`Your flour (W ${flourStrength}) is stronger than necessary for ${currentStyleChars.name}.`);
  }
  
  if (oven) {
      const [minT] = currentStyleChars.idealOvenTemp;
      if(oven.maxTemperature < minT) {
          insights.mismatchWarnings.push(`Your oven (${oven.maxTemperature}°C) does not reach the ideal temperature of ${minT}°C for ${currentStyleChars.name}.`);
          if (currentStyle === RecipeStyle.NEAPOLITAN) {
              insights.professionalNotes.push("Master Tip: For home ovens, a style like NY Style with a baking steel generally yields a superior result compared to adapting Neapolitan.");
          }
      }
  }

  // 4. Find the best recommended style
  let bestFitScore = 0;
  let bestFitStyle: RecipeStyle | null = null;

  for (const style in STYLE_CHARACTERISTICS) {
    const recipeStyle = style as RecipeStyle;
    if(recipeStyle === currentStyle) continue;

    const score = calculateFitScore(config, recipeStyle, flourStrength, oven);
    if (score > bestFitScore) {
      bestFitScore = score;
      bestFitStyle = recipeStyle;
    }
  }

  if (bestFitStyle && bestFitScore > insights.styleFitScore + 18) {
      insights.recommendedStyle = STYLE_CHARACTERISTICS[bestFitStyle].name;
      insights.professionalNotes.push(`Based on your oven and flour, the style ${insights.recommendedStyle} seems to be an even better match.`);
  }

  return insights;
}
