import { DoughConfig, Oven, RecipeStyle, AutoStyleInsightsResult } from '../types';

const STYLE_CHARACTERISTICS: Record<
  RecipeStyle,
  {
    hydrationRange: [number, number];
    idealW: [number, number];
    idealOvenTemp: [number, number];
    name: string;
  }
> = {
  [RecipeStyle.NEAPOLITAN]: { hydrationRange: [55, 62], idealW: [250, 310], idealOvenTemp: [450, 500], name: 'Napolitana' },
  [RecipeStyle.NEW_YORK]: { hydrationRange: [63, 67], idealW: [320, 360], idealOvenTemp: [280, 450], name: 'NY Style' },
  [RecipeStyle.DETROIT]: { hydrationRange: [67, 75], idealW: [300, 360], idealOvenTemp: [250, 300], name: 'Detroit' },
  [RecipeStyle.ROMAN]: { hydrationRange: [75, 85], idealW: [340, 400], idealOvenTemp: [250, 320], name: 'Romana (Teglia)' },
  [RecipeStyle.FOCACCIA]: { hydrationRange: [70, 85], idealW: [300, 380], idealOvenTemp: [220, 260], name: 'Focaccia' },
  [RecipeStyle.COUNTRY_LOAF]: { hydrationRange: [70, 85], idealW: [320, 400], idealOvenTemp: [230, 260], name: 'Pão Rústico' },
  [RecipeStyle.BAGUETTE]: { hydrationRange: [65, 75], idealW: [280, 330], idealOvenTemp: [240, 270], name: 'Baguette' },
  // Add other styles with default values to prevent errors
  [RecipeStyle.PAN_PIZZA]: { hydrationRange: [65, 75], idealW: [280, 340], idealOvenTemp: [240, 280], name: 'Pan Pizza' },
  [RecipeStyle.THIN_CRUST]: { hydrationRange: [50, 60], idealW: [220, 280], idealOvenTemp: [250, 300], name: 'Fina e Crocante' },
  [RecipeStyle.SANDWICH_LOAF]: { hydrationRange: [60, 70], idealW: [240, 300], idealOvenTemp: [180, 210], name: 'Pão de Forma' },
  [RecipeStyle.FLATBREAD]: { hydrationRange: [60, 70], idealW: [200, 260], idealOvenTemp: [250, 350], name: 'Flatbread' },
  [RecipeStyle.NY_STYLE]: { hydrationRange: [63, 67], idealW: [320, 360], idealOvenTemp: [280, 450], name: 'NY Style' },
  [RecipeStyle.SICILIAN]: { hydrationRange: [65, 75], idealW: [280, 340], idealOvenTemp: [240, 280], name: 'Siciliana' },
  [RecipeStyle.CHICAGO]: { hydrationRange: [55, 65], idealW: [280, 340], idealOvenTemp: [220, 250], name: 'Chicago Deep Dish' },
  [RecipeStyle.SOURDOUGH]: { hydrationRange: [70, 85], idealW: [320, 400], idealOvenTemp: [230, 260], name: 'Pão de Fermentação Natural' },
  [RecipeStyle.CIABATTA]: { hydrationRange: [80, 90], idealW: [340, 400], idealOvenTemp: [230, 260], name: 'Ciabatta' },
  [RecipeStyle.BRIOCHE]: { hydrationRange: [50, 60], idealW: [280, 350], idealOvenTemp: [170, 190], name: 'Brioche' },
  [RecipeStyle.RYE]: { hydrationRange: [70, 90], idealW: [180, 240], idealOvenTemp: [210, 240], name: 'Pão de Centeio' },
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
  
  if (environmentTempC) {
    if (environmentTempC < 20) insights.idealFermentationRange = "24–72 horas (frio ou ambiente)";
    else if (environmentTempC <= 24) insights.idealFermentationRange = "12–24 horas";
    else if (environmentTempC <= 28) insights.idealFermentationRange = "8–12 horas";
    else insights.idealFermentationRange = "4–8 horas (ou reduza o fermento)";
  }

  // 2. Calculate Fit Score for the current configuration
  insights.styleFitScore = calculateFitScore(config, currentStyle, flourStrength, oven);
  
  // 3. Generate Warnings and Notes
  if (flourStrength) {
      const [minW, maxW] = currentStyleChars.idealW;
      if(flourStrength < minW) insights.mismatchWarnings.push(`Sua farinha (W ${flourStrength}) pode ser fraca demais para o estilo ${currentStyleChars.name}, que performa melhor com W ${minW}-${maxW}.`);
      if(flourStrength > maxW) insights.mismatchWarnings.push(`Sua farinha (W ${flourStrength}) é mais forte que o necessário para ${currentStyleChars.name}.`);
  }
  
  if (oven) {
      const [minT] = currentStyleChars.idealOvenTemp;
      if(oven.maxTemperature < minT) {
          insights.mismatchWarnings.push(`Seu forno (${oven.maxTemperature}°C) não atinge a temperatura ideal de ${minT}°C para o estilo ${currentStyleChars.name}.`);
          if (currentStyle === RecipeStyle.NEAPOLITAN) {
              insights.professionalNotes.push("Dica de mestre: Para fornos domésticos, um estilo como NY Style com uma chapa de aço ('baking steel') geralmente produz um resultado superior à tentativa de uma Napolitana adaptada.");
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
      insights.professionalNotes.push(`Com base no seu forno e farinha, o estilo ${insights.recommendedStyle} parece ser uma combinação ainda melhor.`);
  }

  return insights;
}
