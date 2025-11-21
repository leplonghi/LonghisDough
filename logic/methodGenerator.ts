
import { 
  DoughConfig, 
  DoughResult, 
  TechnicalStep, 
  TechnicalPhase, 
  FermentationTechnique, 
  YeastType, 
  RecipeStyle, 
  AmbientTemperature,
  BakeType
} from '../types';

/**
 * Generates a dynamic, scientifically-grounded step-by-step method for the dough.
 * Adapts to hydration, fermentation technique, yeast type, and environmental conditions.
 */
export function generateTechnicalMethod(config: DoughConfig, result: DoughResult): TechnicalStep[] {
  const steps: TechnicalStep[] = [];
  let orderCounter = 1;

  const addStep = (
    phase: TechnicalPhase,
    title: string,
    actionInstructions: string,
    options: Partial<Omit<TechnicalStep, 'id' | 'order' | 'phase' | 'title' | 'actionInstructions'>> = {}
  ) => {
    steps.push({
      id: `step-${orderCounter}`,
      order: orderCounter++,
      phase,
      title,
      actionInstructions,
      ...options,
    });
  };

  // --- CONTEXT ANALYSIS ---
  const isHighHydration = config.hydration >= 70;
  const isVeryHighHydration = config.hydration >= 80;
  const isLowHydration = config.hydration < 60;
  
  const isSourdough = config.yeastType === YeastType.SOURDOUGH_STARTER || config.yeastType === YeastType.USER_LEVAIN;
  
  const isPoolish = config.fermentationTechnique === FermentationTechnique.POOLISH;
  const isBiga = config.fermentationTechnique === FermentationTechnique.BIGA;
  const isDirect = config.fermentationTechnique === FermentationTechnique.DIRECT;

  const isNeapolitan = config.recipeStyle === RecipeStyle.NEAPOLITAN;
  const isNY = config.recipeStyle === RecipeStyle.NEW_YORK || config.recipeStyle === RecipeStyle.NY_STYLE;
  const isPan = [RecipeStyle.PAN_PIZZA, RecipeStyle.DETROIT, RecipeStyle.SICILIAN, RecipeStyle.FOCACCIA, RecipeStyle.GRANDMA_STYLE].includes(config.recipeStyle);
  const isTeglia = config.recipeStyle === RecipeStyle.ROMANA_TONDA || config.recipeStyle === RecipeStyle.ROMAN;

  const isHotEnv = config.ambientTemperature === AmbientTemperature.HOT;
  const isColdEnv = config.ambientTemperature === AmbientTemperature.COLD;

  // --- PHASE 1: PREPARATION ---
  
  let waterTempAdvice = "Room temperature water (20-22°C)";
  if (isHotEnv) waterTempAdvice = "Cold water (4-10°C) to control fermentation speed";
  if (isColdEnv) waterTempAdvice = "Warm water (25-28°C) to wake up the yeast";
  if (config.bakingTempC > 400) {
      // Neapolitan often uses ambient water, but context matters
  }

  addStep(
    'PREP',
    'Mise en place & DDT',
    `Weigh all ingredients with a digital scale (0.1g precision recommended for yeast/salt). ${waterTempAdvice}. Target a Final Dough Temperature (DDT) of ~24°C.`,
    {
      technicalExplanation: 'Precision in weighing and temperature ensures the rate of fermentation is predictable (kinetic control).',
      criticalPoint: isHighHydration ? 'For high hydration, ensure water is very cold to prevent overheating during aggressive mixing.' : undefined
    }
  );

  // --- PHASE 2: PRE-FERMENT (Day 1) ---
  
  if (isPoolish) {
      addStep(
          'PREP',
          'Prepare Poolish (Day -1)',
          `Mix the calculated Poolish Flour and Poolish Water (1:1 ratio) with the tiny amount of Poolish Yeast. Cover and let ferment at room temperature.`,
          {
              durationLabel: isHotEnv ? '8-12 hours' : '12-16 hours',
              temperatureLabel: '18-21°C',
              technicalExplanation: 'Poolish favors protease activity (extensibility) and lactic acid production, creating a creamy, nutty flavor profile.',
              criticalPoint: 'The Poolish is ready when it is bubbly, has tripled in volume, and starts to collapse in the center.'
          }
      );
  } else if (isBiga) {
      addStep(
          'PREP',
          'Prepare Biga (Day -1)',
          `Mix Biga Flour, Water (~45-50% hydration), and Yeast. Mix shortly just to hydrate the flour; do not knead. Break it into small, ragged chunks ("shaggy mass").`,
          {
              durationLabel: '16-24 hours',
              temperatureLabel: '16-18°C',
              technicalExplanation: 'Biga favors acetic acid production (strength/structure) and yeast multiplication in an aerobic environment due to its loose structure.',
              criticalPoint: 'Do not knead the Biga! Overmixing tightens the gluten too early and reduces yeast activity potential.'
          }
      );
  }

  // --- PHASE 3: MIXING (Day 0) ---

  if (isHighHydration || isSourdough || isTeglia) {
      // Autolyse step for difficult doughs
      addStep(
          'AUTO',
          'Autolyse (Optional but Recommended)',
          `Mix all the Flour and about 90% of the Water (hold back salt and yeast/starter). Mix just until no dry flour remains. Cover and rest.`,
          {
              durationLabel: '30-60 minutes',
              technicalExplanation: 'Allows passive gluten development via hydration and protease activity. Reduces oxidation from kneading.',
              proTip: 'For Biga doughs, you can skip autolyse or do a "fermentolyse" by adding the Biga during this stage.'
          }
      );
  }

  let mixInstruction = "";
  if (isDirect) {
      mixInstruction = "Dissolve salt in water, add 10% of flour, mix. Add yeast, then gradually add remaining flour.";
      if (isNeapolitan) mixInstruction = "Standard Neapolitan sequence: Water -> Salt -> Yeast -> Flour (gradually).";
  } else {
      mixInstruction = `Dissolve the ${isPoolish ? 'Poolish' : 'Biga'} in the water. Add the flour and start mixing. Add salt last.`;
      if (isBiga) mixInstruction = "Cut the Biga into small pieces. Mix with water until milky. Add flour gradually. Add salt and remaining water (bassinage) at the end.";
  }

  addStep(
      'MIX',
      'Final Mixing',
      mixInstruction,
      {
          proTip: isHighHydration ? 'Use the "Bassinage" technique: hold back 10-15% of water and add it slowly after the gluten network is formed.' : undefined
      }
  );

  // --- PHASE 4: KNEADING / STRENGTH ---

  if (isHighHydration) {
      addStep(
          'KNEAD',
          'Strength Building (Folds)',
          'Do not over-knead mechanically. Instead, perform a series of "Coil Folds" or "Slap & Fold" on the bench.',
          {
              durationLabel: '3-4 sets over 2 hours',
              technicalExplanation: 'High hydration dough relies on folding to align gluten strands without tearing them. It builds structure passively.',
          }
      );
  } else if (isLowHydration) {
      addStep(
          'KNEAD',
          'Intensive Kneading',
          'Knead vigorously (machine or hand) until smooth. Low hydration doughs are tough and require mechanical energy to align gluten.',
          {
              durationLabel: '10-15 minutes',
              criticalPoint: 'The dough should feel satiny and pass a basic windowpane test.'
          }
      );
  } else {
      // Standard hydration (60-65%)
      addStep(
          'KNEAD',
          'Development',
          'Knead until the dough is smooth and elastic. It should spring back when poked.',
          {
              durationLabel: '8-10 minutes',
              technicalExplanation: 'Developing the gluten network now ensures gas retention during fermentation.'
          }
      );
  }

  // --- PHASE 5: BULK FERMENTATION ---

  let bulkDuration = "2-4 hours";
  let bulkTemp = "Room Temp";
  let bulkTip = "";

  if (isColdEnv) {
      bulkDuration = "4-6 hours";
      bulkTip = "Find a warmer spot (e.g., oven with light on) if rising is too slow.";
  } else if (isHotEnv) {
      bulkDuration = "1-2 hours";
      bulkTip = "Watch closely; heat accelerates enzymatic activity which can degrade gluten.";
  }

  if (isNeapolitan && isDirect) {
      addStep(
          'BULK',
          'Bulk Fermentation (Puntata)',
          'Let the dough mass rest in a covered container. Ideally at a controlled temp of 20-22°C.',
          {
              durationLabel: '2 hours',
              technicalExplanation: 'Relaxation of the gluten network before dividing.',
          }
      );
  } else {
      // Suggest Cold Ferment for most modern styles
      addStep(
          'BULK',
          'Bulk Fermentation & Cold Retard',
          'Let sit at room temp for 1 hour to start activity, then place in the fridge (4°C).',
          {
              durationLabel: '24-48 hours (Cold)',
              temperatureLabel: '4°C',
              technicalExplanation: 'Cold fermentation (retarding) slows yeast but allows enzymes to develop complex flavors and sugars for browning.',
              proTip: 'Cold dough is also easier to handle and shape later.'
          }
      );
  }

  // --- PHASE 6: DIVIDE & SHAPE ---

  addStep(
      'DIVIDE',
      'Divide & Ball (Staglio)',
      `Divide dough into ${config.numPizzas} portions of ~${config.doughBallWeight}g. Shape into smooth, tight balls to create surface tension.`,
      {
          criticalPoint: 'Seal the bottom of the balls well to prevent gases escaping during the final rise.',
          technicalExplanation: 'Surface tension ("skin") forces the dough to expand upwards (oven spring) rather than flattening out.'
      }
  );

  // --- PHASE 7: FINAL PROOF ---

  let proofTime = "2-4 hours";
  if (isNeapolitan) proofTime = "4-6 hours (at ~22°C)";
  if (isHotEnv) proofTime = "1-2 hours";
  
  if (isPan) {
      addStep(
          'PROOF',
          'Pan Proofing',
          'Place dough directly into oiled pans. Let it relax for 20 mins, then stretch to corners. If it shrinks back, wait 20 mins and try again.',
          {
              durationLabel: '2-3 hours total',
              technicalExplanation: 'Pan pizzas need the gluten to fully relax to fill the tray without snapping back.',
          }
      );
  } else {
      addStep(
          'PROOF',
          'Final Proof (Appretto)',
          'Place balls in a dough box or on a floured tray, covered. They should puff up and feel pillowy.',
          {
              durationLabel: proofTime,
              temperatureLabel: 'Room Temp',
              criticalPoint: 'Dough is ready when it looks relaxed, has expanded, and a gentle poke springs back slowly.'
          }
      );
  }

  // --- PHASE 8: BAKE ---

  if (isNeapolitan) {
      addStep(
          'BAKE',
          'The Neapolitan Slap & Bake',
          'Dip ball in flour/semolina. Press from center to rim to push air into the cornicione. Stretch gently. Top efficiently.',
          {
              durationLabel: '60-90 seconds',
              temperatureLabel: '450-480°C',
              proTip: 'Do not touch the rim (cornicione) or you will lose the air bubbles.',
              references: ['AVPN Guidelines']
          }
      );
  } else if (isPan) {
      addStep(
          'BAKE',
          'Pan Bake',
          'Top the pizza (sauce stripes for Detroit). Bake until cheese caramelizes at the edges (Frico).',
          {
              durationLabel: '12-18 minutes',
              temperatureLabel: '250-280°C',
              technicalExplanation: 'The metal pan conducts heat to fry the bottom crust in the oil.',
          }
      );
  } else if (isNY) {
      addStep(
          'BAKE',
          'NY Style Launch',
          'Stretch thin (12-16"). Launch onto a preheated Steel or Stone. Rotate halfway through.',
          {
              durationLabel: '5-8 minutes',
              temperatureLabel: '280-300°C',
              proTip: 'Use a Baking Steel for best results in home ovens (higher thermal conductivity than stone).',
          }
      );
  } else {
      // Generic / Bread
      addStep(
          'BAKE',
          'Baking',
          'Score the top if making bread. Bake with steam for the first 10-15 mins if possible (or Dutch Oven).',
          {
              durationLabel: '30-45 minutes',
              temperatureLabel: '230-250°C',
              technicalExplanation: 'Steam keeps the crust soft initially, allowing maximum expansion (oven spring) before crust sets.'
          }
      );
  }

  return steps;
}
