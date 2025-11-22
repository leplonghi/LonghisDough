
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
    grandmaInstructions: string,
    options: Partial<Omit<TechnicalStep, 'id' | 'order' | 'phase' | 'title' | 'actionInstructions' | 'grandmaInstructions'>> = {}
  ) => {
    steps.push({
      id: `step-${orderCounter}`,
      order: orderCounter++,
      phase,
      title,
      actionInstructions,
      grandmaInstructions,
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
  let grandmaWaterAdvice = "Use cold water from the tap.";
  if (isHotEnv) {
      waterTempAdvice = "Use ICE COLD water (4-10°C) to control fermentation";
      grandmaWaterAdvice = "It's hot today! Use water from the fridge or add an ice cube so the dough doesn't rise too fast.";
  }
  if (isColdEnv) {
      waterTempAdvice = "Use warm water (25-28°C) to wake up the yeast";
      grandmaWaterAdvice = "It's a bit chilly. Use water that feels slightly warm to the touch, like baby bath water.";
  }
  
  addStep(
    'PREP',
    'Preparation',
    `Weigh ingredients using a digital scale. ${waterTempAdvice}. Your target Final Dough Temperature (DDT) is 23-25°C.`,
    `Get your bowls ready. ${grandmaWaterAdvice} Measure everything carefully—baking is magic, but it needs the right amounts!`,
    {
      durationLabel: '15 min',
      technicalExplanation: 'Accurate weighing ensures the Baker\'s Percentage ratios are maintained. DDT control regulates enzymatic activity.',
      criticalPoint: isHighHydration ? 'For high hydration, use very cold water to prevent overheating during aggressive mixing.' : undefined
    }
  );

  // --- PHASE 2: PRE-FERMENT (Day -1) ---
  
  if (isPoolish && result.preferment) {
      let poolishInstructions = `Mix ${result.preferment.flour.toFixed(0)}g Flour and ${result.preferment.water.toFixed(0)}g Water (1:1 ratio) with ${result.preferment.yeast.toFixed(2)}g Yeast. Stir until smooth like pancake batter.`;
      let grandmaPoolish = `Mix equal parts flour and water with a tiny pinch of yeast in a jar. Stir it until it looks like pancake batter.`;
      let poolishTemp = '18-21°C';
      let poolishDuration = isHotEnv ? '10-12 hours' : '16-18 hours';

      if (isHotEnv) {
          poolishInstructions += ` In a hot environment (>25°C), leave at room temp for 1 hour, then place in the FRIDGE to prevent over-acidification.`;
          grandmaPoolish += ` Let it sit on the counter for an hour, then pop it in the fridge so it doesn't get too sour.`;
          poolishTemp = '4°C (Fridge)';
          poolishDuration = '16-24 hours';
      } else {
          poolishInstructions += ` Cover air-tight and ferment at room temperature (18-20°C).`;
          grandmaPoolish += ` Cover it loosely and leave it on the counter overnight. It's ready when it's bubbly and smells sweet.`;
      }

      addStep(
          'PREP',
          'Prepare Poolish (Day -1)',
          poolishInstructions,
          grandmaPoolish,
          {
              durationLabel: poolishDuration,
              temperatureLabel: poolishTemp,
              technicalExplanation: 'Poolish favors protease activity (extensibility). High temperatures accelerate it too much, degrading gluten; cold preserves structure.',
              criticalPoint: 'Ready when surface is bubbly and starts to collapse slightly ("drop"). If it smells strongly of vinegar/acetone, it is over-fermented.'
          }
      );
  } else if (isBiga && result.preferment) {
      let bigaInstructions = `Mix ${result.preferment.flour.toFixed(0)}g Flour, ${result.preferment.water.toFixed(0)}g Water and ${result.preferment.yeast.toFixed(2)}g Yeast. Mix shortly (2-3 mins) just to hydrate. Break into chunks ("shaggy mass").`;
      let grandmaBiga = `Mix the flour, water, and yeast just enough so there's no dry flour left. Don't knead it smooth! It should look messy and chunky, like damp sand.`;
      let bigaTemp = '16-18°C';
      
      if (isHotEnv) {
          bigaInstructions += ` Biga implies 16-18°C. Since your room is hot, leave it out for 30-60 mins, then put it in the FRIDGE.`;
          grandmaBiga += ` Since it's hot, put it in the fridge after 30 minutes or it will grow too fast.`;
          bigaTemp = '4°C (Fridge)';
      } else {
          bigaInstructions += ` Cover loosely. Ideally ferment at 16-18°C (wine cooler temp). If your kitchen is >21°C, consider using the fridge.`;
          grandmaBiga += ` Cover it and find a cool spot in the house (not the fridge, unless it's really hot). Let it sleep overnight.`;
      }

      addStep(
          'PREP',
          'Prepare Biga (Day -1)',
          bigaInstructions,
          grandmaBiga,
          {
              durationLabel: '16-24 hours',
              temperatureLabel: bigaTemp,
              technicalExplanation: 'Biga (45-50% hydration) favors acetic acid (strength). It generates heat while fermenting; refrigeration helps control this in hot climates.',
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
          `Mix just the flour and most of the water in a bowl until it looks shaggy. Cover it with a towel and let it nap for 30 minutes. This helps the dough relax.`,
          {
              durationLabel: '30-60 min',
              technicalExplanation: 'Passive gluten development via hydration. Protease enzymes relax the dough, reducing oxidation from mechanical kneading.',
              proTip: 'Essential for high hydration (>70%) to make the dough manageable.'
          }
      );
  }

  let mixInstruction = "";
  let grandmaMix = "";
  
  if (isDirect) {
      mixInstruction = "Dissolve salt in water, add 10% flour, mix. Add yeast, then gradually add remaining flour.";
      grandmaMix = "Dissolve the salt in the water. Add a handful of flour and mix. Add the yeast, then slowly mix in the rest of the flour until it comes together.";
      
      if (isNeapolitan) {
          mixInstruction = "AVPN Sequence: Water first, dissolve salt, add 10% flour, add yeast, then add rest of flour gradually.";
      }
  } else if (isPoolish && result.preferment) {
      mixInstruction = `Add the entire Poolish into the mixing bowl. Add remaining water (${result.finalDough?.water.toFixed(0)}g) and mix to loosen it. Add remaining flour (${result.finalDough?.flour.toFixed(0)}g) and mix. Add salt last.`;
      grandmaMix = `Pour that bubbly starter (Poolish) into your big bowl. Add the rest of the water and swish it around to loosen it up. Add the flour and mix well. Sprinkle the salt in last.`;
  } else if (isBiga && result.preferment) {
      mixInstruction = `Cut the Biga into small pieces. Mix with remaining water (${result.finalDough?.water.toFixed(0)}g) until milky. Add remaining flour (${result.finalDough?.flour.toFixed(0)}g) gradually. Add salt and reserve some water (bassinage) for the end.`;
      grandmaMix = `Tear the Biga into little chunks and toss them in the water. Squeeze them until the water looks milky. Add the flour bit by bit. Add the salt at the end.`;
  }

  let mixProTip: string | undefined;
  if (isHighHydration) {
      mixProTip = 'Bassinage technique: Hold back 10% of water and add it slowly ONLY after the gluten network has started to form.';
  } else if (isBiga) {
      mixProTip = 'Biga adds significant strength. Ensure you break it down thoroughly in the water step to avoid lumps of dry preferment in the final dough.';
  }

  addStep(
      'MIX',
      'Incorporation',
      mixInstruction,
      grandmaMix,
      {
          durationLabel: '5-10 min',
          proTip: mixProTip
      }
  );

  // --- PHASE 4: KNEADING / STRENGTH ---

  if (isHighHydration) {
      addStep(
          'KNEAD',
          'Strength Building (Folds)',
          'Do not over-knead mechanically. Perform 3-4 sets of "Coil Folds" or "Slap & Fold" spaced by 30 mins.',
          `This dough is very wet, so don't knead it like normal bread! Just lift it up in the middle and let the ends fold under (coil fold). Do this a few times every 30 minutes.`,
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
          `This is a tough dough! Knead it hard on the table with the heel of your hand. Push away, fold back. Do this until it's smooth as silk.`,
          {
              durationLabel: '10-15 min',
              criticalPoint: 'Must pass the Windowpane Test: stretch a piece thin enough to see light through without tearing.'
          }
      );
  } else {
      let kneadDuration = '8-10 min';
      let kneadTip = 'Developing the gluten network now ensures gas retention (alveoli) during fermentation.';
      let grandmaKnead = `Knead the dough on the counter. Push it away, fold it back. Keep going until it feels smooth, elastic, and bounces back when you poke it.`;
      
      if (isPoolish) {
          kneadDuration = '5-8 min';
          kneadTip = 'Poolish doughs develop gluten faster due to protease activity. Be careful not to overmix.';
          grandmaKnead = `Knead gently. Because of the starter, it will come together quickly. Stop when it's smooth.`;
      } else if (isBiga) {
          kneadDuration = '10-15 min';
          kneadTip = 'Ensure all Biga chunks are fully incorporated. The dough may feel tough initially but will smooth out.';
          grandmaKnead = `Knead firmly to make sure all those Biga chunks disappear into the dough. It takes a little muscle!`;
      }

      addStep(
          'KNEAD',
          'Development',
          'Knead until smooth and elastic. If using a mixer, finish by hand to check tension.',
          grandmaKnead,
          {
              durationLabel: kneadDuration,
              technicalExplanation: kneadTip
          }
      );
  }

  // --- PHASE 5: BULK FERMENTATION ---

  let bulkDuration = "2-4 hours";
  let bulkTip = "Relaxation of the gluten network before dividing.";
  
  if (isPoolish || isBiga) {
      bulkDuration = "1-2 hours"; // Pre-ferments accelerate activity
      bulkTip = "Preferments kickstart fermentation. Watch closely; it may rise faster than direct dough.";
  }
  
  if (isColdEnv) bulkDuration = "4-6 hours";
  if (isHotEnv) bulkDuration = "1-2 hours";

  if (isNeapolitan && isDirect) {
      addStep(
          'BULK',
          'Bulk Fermentation',
          'Let the dough mass rest in a covered container at room temperature.',
          `Put the dough ball in a bowl, cover it with a damp cloth, and let it rest on the kitchen counter.`,
          {
              durationLabel: bulkDuration,
              technicalExplanation: bulkTip,
          }
      );
  } else {
      // Cold Ferment path
      addStep(
          'BULK',
          'Cold Fermentation',
          'Let sit at room temp for 1 hour to kickstart yeast, then place in the fridge (4°C).',
          `Leave it out for an hour to get started, then put the covered bowl in the fridge. Go to sleep! The cold makes it taste better.`,
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
      'Divide & Ball',
      `Divide into ${config.numPizzas} portions (~${config.doughBallWeight}g). Shape into smooth, tight balls.`,
      `Cut the dough into ${config.numPizzas} equal pieces. Roll each one on the table under your cupped hand until it's a nice tight ball.`,
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
          `Put the dough in your oiled pan. Push it to the edges. If it shrinks back, let it rest for 20 minutes and try again. It needs to relax.`,
          {
              durationLabel: '2-4 hours',
              technicalExplanation: 'Pan pizzas need gluten to fully relax to fill the corners without snapping back.'
          }
      );
  } else {
      addStep(
          'PROOF',
          'Final Proof',
          'Place balls in a dough box. They should relax and puff up, feeling like a marshmallow.',
          `Put the balls on a tray (not touching!) and cover them. Let them rest until they look puffy and feel soft like a marshmallow when you poke them.`,
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
          `Dip the ball in flour. Use your fingers to push the air from the middle to the edge (making the crust). Stretch it gently. Don't put too much sauce!`,
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
          `Stretch it big and thin! Put it on your peel, add toppings, and slide it onto the hot stone/steel in your oven.`,
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
          `Bake it until the crust is golden brown and the cheese is bubbling. Check the bottom to make sure it's not pale!`,
          {
              durationLabel: 'Varies',
              temperatureLabel: `${config.bakingTempC}°C`
          }
      );
  }

  return steps;
}
