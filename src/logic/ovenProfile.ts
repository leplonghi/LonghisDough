
export interface OvenProfileInput {
  ovenType: string;
  maxTemperature: number;
  preheatMinutes: number;
  surface: string;
  rackPosition: string;
  convectionMode: boolean;
}

export interface OvenAnalysisResult {
  category: string;
  summary: string;
  preheatAdvice: string[];
  bakingStrategy: string[];
  doughAdjustments: string[];
}

export interface OvenValidationResult {
  isValid: boolean;
  errors: Partial<Record<keyof OvenProfileInput, string>>;
}

export function validateOvenInput(input: OvenProfileInput): OvenValidationResult {
  const errors: Partial<Record<keyof OvenProfileInput, string>> = {};

  if (isNaN(input.maxTemperature) || input.maxTemperature < 150 || input.maxTemperature > 550) {
    errors.maxTemperature = "Temperature must be between 150°C and 550°C.";
  }

  if (isNaN(input.preheatMinutes) || input.preheatMinutes < 0 || input.preheatMinutes > 180) {
    errors.preheatMinutes = "Preheat time must be realistic (0-180 mins).";
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}

export function computeOvenCategory(input: OvenProfileInput): string {
  if (input.ovenType === 'wood') return 'Wood-Fired Oven';
  if (input.maxTemperature >= 350) return 'High-Heat / Pro Deck Oven';
  if (input.maxTemperature >= 280) return 'High-Performance Home Oven';
  if (input.maxTemperature > 250) return 'Standard Home Oven';
  return 'Low-Power Home Oven';
}

export function analyzeOvenProfile(input: OvenProfileInput): OvenAnalysisResult {
  const category = computeOvenCategory(input);
  const { maxTemperature, preheatMinutes, surface, convectionMode, rackPosition, ovenType } = input;

  const result: OvenAnalysisResult = {
    category,
    summary: '',
    preheatAdvice: [],
    bakingStrategy: [],
    doughAdjustments: [],
  };

  // --- 1. Summary & General Categorization ---
  if (category === 'Wood-Fired Oven') {
    result.summary = "Your setup allows for authentic Neapolitan-style baking (90 seconds or less). The challenge is managing the intense radiant heat from the flame versus the conduction from the floor.";
  } else if (category.includes('High-Heat')) {
    result.summary = "Excellent range for crispy artisan pizzas and authentic NY Style. You have enough heat to get significant oven spring without drying out the crust.";
  } else if (category === 'Standard Home Oven') {
    result.summary = "A versatile range for NY Style, Pan Pizza, and Focaccia. While true Neapolitan is out of reach, you can achieve excellent crispy crusts with the right surface management.";
  } else {
    result.summary = "Temperature is a limiting factor for thin-crust styles. This oven is best suited for Pan Pizzas, Detroit Style, or Focaccia where longer bake times allow the dough to cook through without burning.";
  }

  // --- 2. Preheat Advice ---
  if (ovenType === 'wood') {
    result.preheatAdvice.push("Ensure the floor is saturated with heat (usually 400°C+) before pushing the fire aside.");
    result.preheatAdvice.push("Scrub the floor with a damp rag immediately before launching to temper surface ash.");
  } else {
    // Home/Deck Ovens
    if (surface !== 'none') {
      if (preheatMinutes < 45) {
        result.preheatAdvice.push(`Your preheat of ${preheatMinutes} mins is likely insufficient for a ${surface}. Extend to 45-60 mins to fully saturate the thermal mass.`);
      } else {
        result.preheatAdvice.push("Your preheat time is good. A saturated stone/steel ensures the bottom cooks as fast as the top.");
      }
    } else {
        result.preheatAdvice.push("Without a stone or steel, preheat is less critical for thermal mass, but ensuring the air temp is stable is still key (20-30 mins).");
    }

    if (convectionMode) {
        result.preheatAdvice.push("Convection helps preheat faster, but ensure the stone/steel core temp has caught up to the air temp.");
    }
  }

  // --- 3. Baking Strategy ---
  if (convectionMode) {
    result.bakingStrategy.push("Convection accelerates browning. Monitor the crust closely; you may need to reduce the set temperature by 10–20°C compared to static recipes.");
    result.bakingStrategy.push("Ideally, turn off convection for the first 5 minutes of bread/pizza baking to allow steam to work (if applicable), then turn on for color.");
  }

  if (surface === 'steel') {
    if (maxTemperature > 300) {
      result.bakingStrategy.push("Warning: Baking Steel at >300°C transfers heat extremely fast. Watch for burnt bottoms before the top is done.");
    } else {
      result.bakingStrategy.push("Excellent choice. Steel is the best way to mimic a professional oven in a standard home range.");
    }
  } else if (surface === 'none') {
    result.bakingStrategy.push("Consider using the 'floor' of the oven (if gas) or the lowest rack to maximize bottom heat.");
    result.bakingStrategy.push("Heavily oil your baking pan if making pan pizza to fry the bottom crust.");
  }

  if (ovenType === 'home_electric' || ovenType === 'home_gas') {
     if (rackPosition === 'top' && surface !== 'none') {
         result.bakingStrategy.push("Top rack is good for radiant heat (browning), but ensure your stone gets enough heat from below.");
     } else if (rackPosition === 'bottom') {
         result.bakingStrategy.push("Bottom rack maximizes conductive heat from the oven floor elements. Good for setting the crust.");
     }
     
     if (maxTemperature < 280) {
         result.bakingStrategy.push("Broiler Method Tip: Turn on the broiler (grill) for the last 1-2 minutes of the bake to char the crust/cheese.");
     }
  }

  if (ovenType === 'wood') {
      result.bakingStrategy.push("Rotate the pizza frequently toward the flame to ensure even cooking.");
      result.bakingStrategy.push("Lift the pizza to the dome for a few seconds at the end to finish the toppings.");
  }

  // --- 4. Dough Adjustments ---
  if (category === 'Low-Power Home Oven') {
    result.doughAdjustments.push("Add Sugar or Malt (1-3%): Helps browning at lower temperatures/longer bake times.");
    result.doughAdjustments.push("Add Oil (2-4%): Keeps the crumb soft preventing it from drying out during a 10+ minute bake.");
    result.doughAdjustments.push("Slightly lower hydration (60-65%) helps the dough crisp up rather than steam in a cooler oven.");
  } else if (category === 'Standard Home Oven') {
    result.doughAdjustments.push("Sugar/Oil are optional but recommended for NY Style profiles.");
    result.doughAdjustments.push("Hydration can be pushed to 65-70% if using a steel.");
  } else if (category.includes('High-Heat') || category === 'Wood-Fired Oven') {
    result.doughAdjustments.push("REMOVE Sugar and Oil: At these temps (>350°C), they will cause the crust to burn before it cooks.");
    result.doughAdjustments.push("Use '00' flour if possible; it resists high heat better than malted bread flour.");
  }

  return result;
}
