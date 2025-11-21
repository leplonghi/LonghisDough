
import { DoughConfig, DoughResult, TechnicalStep, TechnicalPhase, FermentationTechnique, YeastType, RecipeStyle, BakeType } from '../types';

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

  // 1. PREP PHASE
  const ddtTarget = 24; // Simplified DDT target
  addStep(
    'PREP',
    'Mise en place & DDT',
    `Weigh all ingredients accurately. To aim for a final dough temperature (DDT) of ~${ddtTarget}°C, measure your room and flour temperature first.`,
    {
      proTip: 'If your room is hot (>26°C), use ice water. If cold (<20°C), use warm water.',
      technicalExplanation: 'Controlling initial temperature ensures predictable fermentation rates.',
    }
  );

  // 2. PREFERMENT PHASE (Conditional)
  if (config.fermentationTechnique === FermentationTechnique.POOLISH) {
      addStep(
          'PREP',
          'Prepare Poolish (Day 1)',
          `Mix the calculated preferment flour and water (1:1 ratio) with a tiny pinch of yeast (or calculated amount). Cover and let ferment at room temp.`,
          {
              durationLabel: '12-16 hours',
              temperatureLabel: '18-21°C',
              technicalExplanation: 'Poolish improves extensibility and adds nutty, milky flavors via protease activity and lactic acid production.',
          }
      );
  } else if (config.fermentationTechnique === FermentationTechnique.BIGA) {
       addStep(
          'PREP',
          'Prepare Biga (Day 1)',
          `Mix the preferment flour, water (45-50% hydration), and yeast. Do not knead fully; keep it shaggy (clumpy).`,
          {
              durationLabel: '16-24 hours',
              temperatureLabel: '16-18°C',
              criticalPoint: 'Do not overmix the biga. It should be loose pieces, not a cohesive ball, to favor anaerobic fermentation.',
              technicalExplanation: 'Biga develops strong gluten structure and complex acidity (acetic), improving strength.',
          }
      );
  }

  // 3. MIX PHASE (Autolyse Logic)
  const isHighHydration = config.hydration >= 70;
  const isSourdough = config.yeastType === YeastType.SOURDOUGH_STARTER || config.yeastType === YeastType.USER_LEVAIN;
  const isWholeWheat = config.flourId === 'whole_wheat';

  if (isHighHydration || isSourdough || isWholeWheat) {
      addStep(
          'AUTO',
          'Autolyse',
          `Mix only the Flour and Water (minus holdback water if using bassinage) until no dry flour remains. Cover and rest.`,
          {
              durationLabel: '30-60 mins',
              technicalExplanation: 'Allows protease enzymes to relax the gluten and amylase to convert starch to sugar, reducing kneading time.',
          }
      );
  }

  // 4. KNEAD PHASE
  let kneadInstruction = "Add yeast/starter and mix. Then add salt and remaining water. Knead until smooth.";
  let kneadTip = "";

  if (isHighHydration) {
      kneadInstruction = "Add yeast/salt. Mix until incorporated. The dough will be sticky. Do not add extra flour.";
      kneadTip = "Use wet hands to handle sticky dough.";
      addStep(
          'KNEAD',
          'Incorporation',
          kneadInstruction,
          { proTip: kneadTip }
      );
      
      addStep(
          'KNEAD',
          'Strength Building (Folds)',
          'Perform "Slap and Fold" or "Coil Folds" every 30 minutes for the first 2 hours of bulk fermentation.',
          {
              durationLabel: '2 hours',
              technicalExplanation: 'For high hydration, mechanical kneading is less effective. Folding aligns gluten strands passively.',
          }
      );
  } else {
      addStep(
          'KNEAD',
          'Intensive Kneading',
          'Knead by hand or machine until the dough passes the "Windowpane Test" (stretches thin without tearing).',
          {
              durationLabel: '10-15 mins',
              criticalPoint: 'Stop if the dough temperature exceeds 26°C to avoid damaging the gluten network.',
          }
      );
  }

  // 5. BULK FERMENTATION
  // Logic for Cold Ferment vs Ambient
  // Assuming standard cold ferment for most "Pro" styles or if implicitly suggested by user habits/presets
  // But to keep it dynamic based on current config inputs (which might not explicitly say cold ferment in this version):
  // We'll use a heuristic: High protein flour + commercial yeast often implies cold ferment capability.
  
  // For V1 of this logic, let's provide a generic bulk step that mentions options.
  addStep(
      'BULK',
      'Bulk Fermentation',
      'Allow the dough to rise in a bulk container. Aim for a 30-50% increase in volume.',
      {
          durationLabel: config.ambientTemperature === 'COLD' ? '4-6 hours' : '2-4 hours',
          proTip: 'For better flavor and digestibility, place the bulk container in the fridge for 24-48 hours (Cold Retard) at this stage.',
      }
  );

  // 6. DIVIDE & SHAPE
  addStep(
      'DIVIDE',
      'Divide & Pre-shape',
      `Divide dough into ${config.numPizzas} pieces of ~${config.doughBallWeight}g. Gently shape into loose rounds. Rest for 20 mins (bench rest).`,
      {
          criticalPoint: 'Handle gently to preserve the gas bubbles created during bulk fermentation.',
      }
  );

  addStep(
      'DIVIDE',
      'Final Shaping (Balling)',
      'Tighten the dough balls to create surface tension ("skin"). Ensure the bottom is sealed.',
      {
          technicalExplanation: 'Surface tension forces the dough to rise upwards (oven spring) rather than spreading outwards.',
      }
  );

  // 7. FINAL PROOF
  addStep(
      'PROOF',
      'Final Proof (Appretto)',
      'Place balls in a dough box or covered tray. Let them relax and puff up.',
      {
          durationLabel: '2-4 hours (Room Temp)',
          technicalExplanation: 'The gluten needs to relax (extensibility) so you can stretch the pizza without it snapping back.',
      }
  );

  // 8. BAKE
  const bakeTemp = config.bakingTempC;
  let bakeInstruction = "";
  let bakeTime = "";
  let bakeTip = "";

  if (bakeTemp >= 400) {
      // Neapolitan / Ooni
      bakeInstruction = "Stretch gently pushing air to the rim. Launch into the ultra-hot oven. Turn frequently.";
      bakeTime = "60-90 seconds";
      bakeTip = "Don't overload toppings; the center will stay raw.";
  } else if (bakeTemp >= 250) {
       // Home Oven / NY Style
       bakeInstruction = "Stretch the dough. Top efficiently. Launch onto a pre-heated Steel or Stone.";
       bakeTime = "6-9 minutes";
       bakeTip = "Use a Baking Steel for best results in home ovens.";
  } else {
       // Pan Pizza / Low temp
       bakeInstruction = "Press dough into the oiled pan. Let it rise again in the pan before baking.";
       bakeTime = "15-20 minutes";
  }

  addStep(
      'BAKE',
      'Baking',
      bakeInstruction,
      {
          durationLabel: bakeTime,
          temperatureLabel: `${bakeTemp}°C`,
          proTip: bakeTip,
          references: ['Maillard Reaction', 'Oven Spring']
      }
  );

  return steps;
}
