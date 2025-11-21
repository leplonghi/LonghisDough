import { 
  DoughConfig, 
  DoughResult, 
  TechnicalStep, 
  TechnicalPhase, 
  FermentationTechnique, 
  YeastType, 
  RecipeStyle, 
  AmbientTemperature
} from '../types';
import { getAllowedFermentationTechniques } from '../data/stylesData';

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
  const isLowHydration = config.hydration < 55;
  
  const isSourdough = config.yeastType === YeastType.SOURDOUGH_STARTER || config.yeastType === YeastType.USER_LEVAIN;
  
  // Validate technique against style rules
  const allowedTechniques = getAllowedFermentationTechniques(config.recipeStyle, config.bakeType);
  const effectiveTechnique = allowedTechniques.includes(config.fermentationTechnique) 
      ? config.fermentationTechnique 
      : (allowedTechniques[0] || FermentationTechnique.DIRECT);

  const isPoolish = effectiveTechnique === FermentationTechnique.POOLISH;
  const isBiga = effectiveTechnique === FermentationTechnique.BIGA;
  const isDirect = effectiveTechnique === FermentationTechnique.DIRECT;

  const isNeapolitan = config.recipeStyle === RecipeStyle.NEAPOLITAN;
  const isNY = config.recipeStyle === RecipeStyle.NEW_YORK || config.recipeStyle === RecipeStyle.NY_STYLE;
  const isPan = [RecipeStyle.PAN_PIZZA, RecipeStyle.DETROIT, RecipeStyle.SICILIAN, RecipeStyle.FOCACCIA, RecipeStyle.GRANDMA_STYLE].includes(config.recipeStyle);

  const isHotEnv = config.ambientTemperature === AmbientTemperature.HOT;
  const isColdEnv = config.ambientTemperature === AmbientTemperature.COLD;

  // --- PHASE 1: PREPARATION ---
  
  let waterTempAdvice = "Use cool water (18-20°C)";
  if (isHotEnv) waterTempAdvice = "Use ICE COLD water (4-10°C) to control fermentation";
  if (isColdEnv) waterTempAdvice = "Use warm water (25-28°C) to wake up the yeast";
  
  addStep(
    'PREP',
    'Precision Weighing & DDT',
    `Weigh ingredients using a digital scale. ${waterTempAdvice}. Your target Final Dough Temperature (DDT) is 23-25°C.`,
    {
      durationLabel: '15 min',
      technicalExplanation: 'Accurate weighing ensures the Baker\'s Percentage ratios are maintained. DDT control regulates enzymatic activity.',
      criticalPoint: isHighHydration ? 'For high hydration, use very cold water to prevent overheating during aggressive mixing.' : undefined
    }
  );

  // --- PHASE 2: PRE-FERMENT (Day -1) ---
  
  if (isPoolish && result.preferment) {
      addStep(
          'PREP',
          'Prepare Poolish (Day -1)',
          `Mix ${result.preferment.flour.toFixed(0)}g Flour and ${result.preferment.water.toFixed(0)}g Water (1:1 ratio) with ${result.preferment.yeast.toFixed(2)}g Yeast. Stir until smooth like pancake batter. Cover air-tight.`,
          {
              durationLabel: isHotEnv ? '10-12 hours' : '16-18 hours',
              temperatureLabel: '18-21°C',
              technicalExplanation: 'Poolish (100% hydration) favors protease activity (extensibility) and lactic acid production for a complex, creamy flavor.',
              criticalPoint: 'Ready when the surface is covered in bubbles and starts to collapse slightly in the center when tapped.'
          }
      );
  } else if (isBiga && result.preferment) {
      addStep(
          'PREP',
          'Prepare Biga (Day -1)',
          `Mix ${result.preferment.flour.toFixed(0)}g Flour, ${result.preferment.water.toFixed(0)}g Water and yeast. Mix shortly (2-3 mins) just to hydrate. Break into chunks ("shaggy mass").`,
          {
              durationLabel: '16-24 hours',
              temperatureLabel: '16-18°C',
              technicalExplanation: 'Biga (45-50% hydration) favors acetic acid (strength) and yeast multiplication in an aerobic environment.',
              criticalPoint: 'Do NOT knead the Biga. Overmixing tightens gluten too early. Keep it shaggy.'
          }
      );
  }

  // --- PHASE 3: MIXING (Day 0) ---

  if ((isHighHydration || isSourdough) && !isBiga) {
      addStep(
          'AUTO',
          'Autolyse',
          `Mix all Flour and about 90% of the Water (hold back salt and yeast/starter). Mix until no dry flour remains. Cover and rest.`,
          {
              durationLabel: '30-60 min',
              technicalExplanation: 'Passive gluten development via hydration. Protease enzymes relax the dough, reducing oxidation from mechanical kneading.',
              proTip: 'Essential for high hydration (>70%) to make the dough manageable.'
          }
      );
  }

  let mixInstruction = "";
  if (isDirect) {
      mixInstruction = "Dissolve salt in water, add 10% flour, mix. Add yeast, then gradually add remaining flour.";
      if (isNeapolitan) mixInstruction = "AVPN Sequence: Water first, dissolve salt, add 10% flour, add yeast, then add rest of flour gradually.";
  } else if (isPoolish && result.preferment) {
      mixInstruction = `Add the entire Poolish into the mixing bowl. Add remaining water (${result.finalDough?.water.toFixed(0)}g) and mix to loosen it. Add remaining flour and mix. Add salt last.`;
  } else if (isBiga && result.preferment) {
      mixInstruction = `Cut the Biga into small pieces. Mix with remaining water (${result.finalDough?.water.toFixed(0)}g) until milky. Add flour gradually. Add salt and reserve some water (bassinage) for the end.`;
  }

  addStep(
      'MIX',
      'Incorporation',
      mixInstruction,
      {
          durationLabel: '5-10 min',
          proTip: isHighHydration ? 'Bassinage technique: Hold back 10% of water and add it slowly ONLY after the gluten network has started to form.' : undefined
      }
  );

  // --- PHASE 4: KNEADING / STRENGTH ---

  if (isHighHydration) {
      addStep(
          'KNEAD',
          'Strength Building (Folds)',
          'Do not over-knead mechanically. Perform 3-4 sets of "Coil Folds" or "Slap & Fold" spaced by 30 mins.',
          {
              durationLabel: '2 hours total',
              technicalExplanation: 'High hydration dough relies on folding to align gluten strands without tearing them. It builds structure passively.',
          }
      );
  } else if (isLowHydration) {
      addStep(
          'KNEAD',
          'Intensive Kneading',
          'Knead vigorously until smooth and satiny. Low hydration requires mechanical energy to align gluten.',
          {
              durationLabel: '10-15 min',
              criticalPoint: 'Must pass the Windowpane Test: stretch a piece thin enough to see light through without tearing.'
          }
      );
  } else {
      addStep(
          'KNEAD',
          'Development',
          'Knead until smooth and elastic. If using a mixer, finish by hand to check tension.',
          {
              durationLabel: '8-10 min',
              technicalExplanation: 'Developing the gluten network now ensures gas retention (alveoli) during fermentation.'
          }
      );
  }

  // --- PHASE 5: BULK FERMENTATION ---

  let bulkDuration = "2-4 hours";
  if (isColdEnv) bulkDuration = "4-6 hours";
  if (isHotEnv) bulkDuration = "1-2 hours";

  if (isNeapolitan && isDirect) {
      addStep(
          'BULK',
          'Bulk Fermentation (Puntata)',
          'Let the dough mass rest in a covered container at room temperature.',
          {
              durationLabel: bulkDuration,
              technicalExplanation: 'Relaxation of the gluten network before dividing.',
          }
      );
  } else {
      // Cold Ferment path
      addStep(
          'BULK',
          'Cold Fermentation (Retard)',
          'Let sit at room temp for 1 hour to kickstart yeast, then place in the fridge (4°C).',
          {
              durationLabel: '24-72 hours',
              temperatureLabel: '4°C',
              technicalExplanation: 'Cold fermentation slows yeast (CO2) but allows enzymes (amylase/protease) to develop flavor and sugars for browning.',
              proTip: 'Cold dough is stiffer and easier to ball.'
          }
      );
  }

  // --- PHASE 6: DIVIDE & SHAPE ---

  addStep(
      'DIVIDE',
      'Divide & Ball (Staglio)',
      `Divide into ${config.numPizzas} portions (~${config.doughBallWeight}g). Shape into smooth, tight balls.`,
      {
          durationLabel: '20 min',
          criticalPoint: 'Ensure the bottom of the ball is sealed tight to trap gases.',
          technicalExplanation: 'Creating surface tension ("skin") forces expansion upwards (oven spring) rather than flattening out.'
      }
  );

  // --- PHASE 7: FINAL PROOF ---

  if (isPan) {
      addStep(
          'PROOF',
          'Pan Proofing',
          'Place dough in oiled pans. Relax 20 min, stretch. If it snaps back, wait 20 min and try again.',
          {
              durationLabel: '2-4 hours',
              technicalExplanation: 'Pan pizzas need gluten to fully relax to fill the corners without snapping back.'
          }
      );
  } else {
      addStep(
          'PROOF',
          'Final Proof (Appretto)',
          'Place balls in a dough box. They should relax and puff up, feeling like a marshmallow.',
          {
              durationLabel: isHotEnv ? '1-2 hours' : '2-4 hours',
              temperatureLabel: 'Room Temp',
              criticalPoint: 'Over-proofed dough collapses when stretched. Under-proofed dough is tough and elastic.'
          }
      );
  }

  // --- PHASE 8: BAKE ---

  if (isNeapolitan) {
      addStep(
          'BAKE',
          'The Neapolitan Slap',
          'Dredge in flour. Press air from center to rim (cornicione). Stretch gently. Top light.',
          {
              durationLabel: '60-90 sec',
              temperatureLabel: '430-480°C',
              proTip: 'Do not touch the rim or you will lose the air bubbles.',
              references: ['AVPN Guidelines']
          }
      );
  } else if (isNY) {
      addStep(
          'BAKE',
          'NY Style Launch',
          'Stretch thin (12-16"). Launch onto a preheated Steel/Stone.',
          {
              durationLabel: '5-7 min',
              temperatureLabel: '280-300°C',
              proTip: 'Rotate halfway for even browning. Finish on a rack to keep bottom crisp.'
          }
      );
  } else {
      addStep(
          'BAKE',
          'Baking',
          'Bake until golden brown. Ensure bottom is cooked.',
          {
              durationLabel: 'Varies',
              temperatureLabel: `${config.bakingTempC}°C`
          }
      );
  }

  return steps;
}