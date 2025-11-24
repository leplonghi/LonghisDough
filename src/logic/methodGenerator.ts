
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
    grandmaInstructions: string,
    options: Partial<Omit<TechnicalStep, 'id' | 'order' | 'phase' | 'title' | 'actionInstructions' | 'grandmaInstructions'>> = {}
  ) => {
    steps.push({
      id: `step-${orderCounter}`,
      order: orderCounter++,
      phase,
      title,
      actionInstructions,
      grandmaInstructions: grandmaInstructions || actionInstructions,
      ...options,
    });
  };

  // --- CONTEXT ANALYSIS ---
  const isHighHydration = config.hydration >= 70;
  const isSourdough = config.yeastType === YeastType.SOURDOUGH_STARTER || config.yeastType === YeastType.USER_LEVAIN;
  const isPoolish = config.fermentationTechnique === FermentationTechnique.POOLISH;
  const isBiga = config.fermentationTechnique === FermentationTechnique.BIGA;
  const isDirect = config.fermentationTechnique === FermentationTechnique.DIRECT;
  const isNeapolitan = config.recipeStyle === RecipeStyle.NEAPOLITAN;
  const isPan = [RecipeStyle.PAN_PIZZA, RecipeStyle.DETROIT, RecipeStyle.SICILIAN, RecipeStyle.FOCACCIA, RecipeStyle.GRANDMA_STYLE].includes(config.recipeStyle);
  const isColdEnv = config.ambientTemperature === AmbientTemperature.COLD;
  const isHotEnv = config.ambientTemperature === AmbientTemperature.HOT;

  // --- PHASE 1: PREPARATION ---
  let waterTempAdvice = "Room temperature water (20-22°C)";
  if (isHotEnv) waterTempAdvice = "Cold water (4-10°C)";
  if (isColdEnv) waterTempAdvice = "Warm water (25-28°C)";

  addStep(
    'PREP',
    'Mise en place',
    `Weigh all ingredients with a digital scale. ${waterTempAdvice}. Target DDT: ~24°C.`,
    'Get your ingredients ready. Use cold water if it\'s hot outside.',
    { technicalExplanation: 'Precision ensures consistent fermentation kinetics.' }
  );

  // --- PHASE 2: PRE-FERMENT ---
  if (isPoolish) {
      addStep(
          'PREP',
          'Prepare Poolish (Day -1)',
          `Mix Poolish Flour and Water (1:1) with tiny yeast. Ferment 12-16h at room temp.`,
          'Mix flour, water and a pinch of yeast in a jar. Wait until it gets bubbly (overnight).',
          { durationLabel: '12-16h' }
      );
  } else if (isBiga) {
       addStep(
          'PREP',
          'Prepare Biga (Day -1)',
          `Mix Biga ingredients to a shaggy mass (do not knead). Ferment 16-24h at 16-18°C.`,
          'Mix flour, water and yeast roughly. It should look dry and lumpy. Leave it overnight.',
          { durationLabel: '16-24h' }
      );
  }

  // --- PHASE 3: MIXING ---
  if (isHighHydration && !isBiga) {
      addStep(
          'AUTO',
          'Autolyse',
          'Mix Flour and Water (hold salt/yeast). Rest 30-60 min.',
          'Mix flour and water. Let it sit for 30 mins to soak.',
          { durationLabel: '30-60m' }
      );
  }

  addStep(
      'MIX',
      'Final Mixing',
      isBiga ? 'Break Biga into water. Add flour gradually. Salt last.' : 'Mix all ingredients until incorporated.',
      'Mix everything together until you have a dough.',
      {}
  );

  // --- PHASE 4: KNEADING ---
  if (isHighHydration) {
      addStep(
          'KNEAD',
          'Strength Building',
          'Perform Coil Folds every 30 mins. Do not tear the gluten.',
          'Fold the dough over itself a few times to make it strong.',
          { durationLabel: '2h' }
      );
  } else {
       addStep(
          'KNEAD',
          'Kneading',
          'Knead until smooth and elastic (Windowpane test).',
          'Knead well until smooth.',
          { durationLabel: '10m' }
      );
  }

  // --- PHASE 5: BULK ---
  addStep(
      'BULK',
      'Bulk Fermentation',
      'Let ferment until volume increases by 30-50%.',
      'Let it rise until it looks puffy.',
      { durationLabel: '2-4h' }
  );

  // --- PHASE 6: DIVIDE ---
  addStep(
      'DIVIDE',
      'Divide & Ball',
      `Divide into ${config.numPizzas} portions. Shape into tight balls.`,
      'Cut into pieces and make nice round balls.',
      {}
  );

  // --- PHASE 7: PROOF ---
  addStep(
      'PROOF',
      'Final Proof',
      isNeapolitan ? 'Proof 4-6h at room temp.' : 'Proof 2-4h or until doubled.',
      'Cover and let them rise again until soft and airy.',
      { durationLabel: isNeapolitan ? '4-6h' : '2-4h' }
  );

  // --- PHASE 8: BAKE ---
  addStep(
      'BAKE',
      'Baking',
      isPan ? 'Bake in pan until edges promote Maillard reaction (frico).' : 'Stretch, top, and bake at max temp.',
      'Put toppings on and bake until golden and crispy.',
      { temperatureLabel: `${config.bakingTempC}°C` }
  );

  return steps;
}
