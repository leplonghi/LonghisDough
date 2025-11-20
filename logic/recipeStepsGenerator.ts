
import { DoughConfig, FermentationTechnique, RecipeStyle, YeastType } from '../types';

export interface RecipeStep {
  phase: 'Prep' | 'Mix' | 'Ferment' | 'Shape' | 'Bake';
  title: string;
  description: string;
  tip?: string;
  duration?: string;
  critical?: boolean; // Highlights critical control points (CCP)
}

/**
 * Generates specific, technically validated steps based on the dough configuration.
 * References: AVPN, Modernist Pizza, King Arthur Baking.
 */
export const generateRecipeSteps = (config: DoughConfig): RecipeStep[] => {
  const steps: RecipeStep[] = [];
  const isLevain = config.yeastType === YeastType.SOURDOUGH_STARTER || config.yeastType === YeastType.USER_LEVAIN;
  const isNeapolitan = config.recipeStyle === RecipeStyle.NEAPOLITAN;
  const isPan = [RecipeStyle.PAN_PIZZA, RecipeStyle.DETROIT, RecipeStyle.FOCACCIA, RecipeStyle.SICILIAN].includes(config.recipeStyle);
  const isHighHydration = config.hydration >= 70;

  // --- PHASE 1: PREPARATION ---
  steps.push({
    phase: 'Prep',
    title: 'Precision Weighing (Mise en place)',
    description: `Weigh all ingredients using a digital scale. Dissolve the salt in the water first (unless using yeast that requires activation in water separately).`,
    tip: isNeapolitan 
      ? 'AVPN Rule: Use water between 20°C-22°C to control final dough temperature.' 
      : 'For consistent results, measure water temperature to hit a DDT (Desired Dough Temp) of 24-26°C.',
    critical: true
  });

  // --- PHASE 2: PRE-FERMENT (If applicable) ---
  if (config.fermentationTechnique === FermentationTechnique.POOLISH) {
    steps.push({
      phase: 'Prep',
      title: 'Prepare the Poolish (Day Before)',
      description: `Mix the calculated Poolish flour, water, and a tiny pinch of yeast (honey optional). It should look like a thick pancake batter. Cover and ferment at room temperature for 12-16 hours.`,
      duration: '12-16 hours',
      tip: 'The Poolish is ready when the surface is covered in bubbles and it starts to collapse slightly in the center.'
    });
    steps.push({
      phase: 'Mix',
      title: 'Incorporating Poolish',
      description: `Add the water for the final dough into the bowl. Add the Poolish and mix to break it up into a milky liquid. Then add flour and remaining ingredients.`,
    });
  } else if (config.fermentationTechnique === FermentationTechnique.BIGA) {
    steps.push({
      phase: 'Prep',
      title: 'Prepare the Biga (Day Before)',
      description: `Mix the Biga ingredients briefly. Do NOT knead. It should look "shaggy" and disconnected, not a smooth ball. Ferment at 16-18°C for 18-24 hours.`,
      duration: '18-24 hours',
      tip: 'Biga builds strength. If kneading by hand later, cut the Biga into small pieces into the water to help it dissolve.'
    });
  } else if (isLevain) {
     steps.push({
      phase: 'Prep',
      title: 'Feed Your Levain',
      description: `Ensure your starter was fed 4-12 hours ago and is at its peak activity (tripled in volume, floats in water).`,
      critical: true
    });
  }

  // --- PHASE 3: MIXING ---
  if (isNeapolitan) {
    steps.push({
      phase: 'Mix',
      title: 'The Neapolitan Mix',
      description: 'Add 10% of the flour to the salted water and mix to create a "crema". Add yeast. Gradually add the rest of the flour while mixing.',
      tip: 'Stop mixing when the dough is smooth and not sticky. Final temperature target: 23-26°C.'
    });
  } else if (config.fermentationTechnique === FermentationTechnique.DIRECT && !isLevain) {
    steps.push({
      phase: 'Mix',
      title: 'Direct Method Mixing',
      description: `Combine flour and salt. Dissolve yeast in water. Add liquid to dry ingredients. ${config.oil > 0 ? 'Add oil last, after the flour has absorbed the water.' : ''}`,
      tip: 'Do not let salt and yeast sit in direct contact for long periods before mixing.'
    });
  } else if (isLevain) {
    steps.push({
      phase: 'Mix',
      title: 'Autolyse (Recommended)',
      description: 'Mix flour and water only. Let rest for 30-60 minutes. Then add Levain and Salt.',
      duration: '30-60 min',
      tip: 'Autolyse jumpstarts gluten development without mechanical work.'
    });
  }

  // --- PHASE 4: KNEADING / STRENGTH ---
  if (isHighHydration || isPan) {
    steps.push({
      phase: 'Mix',
      title: 'Stretch & Fold (Strength Building)',
      description: 'The dough will be sticky. Do not add extra flour. Perform 3-4 sets of "Stretch and Folds" spaced 20-30 minutes apart.',
      tip: 'Wet your hands to handle sticky dough without it sticking to you.',
      critical: true
    });
  } else {
    steps.push({
      phase: 'Mix',
      title: 'Kneading to Windowpane',
      description: 'Knead for 10-15 minutes (hand) or 8-10 minutes (machine) until the dough is smooth, elastic, and passes the "Windowpane Test".',
    });
  }

  // --- PHASE 5: BULK FERMENTATION ---
  if (config.ambientTemperature === 'COLD' || config.fermentationTechnique === FermentationTechnique.BIGA) {
     steps.push({
      phase: 'Ferment',
      title: 'Bulk Fermentation',
      description: 'Let the dough rise in a covered container as one large mass. In a cold environment, this may take longer.',
      duration: '2-4 hours (or until 50% increase)'
    });
  } else {
     steps.push({
      phase: 'Ferment',
      title: 'Bulk Fermentation',
      description: 'Let the dough rise in a bulk container until it has increased in volume by roughly 30-50%.',
      duration: '1-2 hours'
    });
  }
  
  // --- PHASE 6: DIVIDE & SHAPE ---
  if (isPan) {
     steps.push({
      phase: 'Shape',
      title: 'Pan & Final Proof',
      description: 'Transfer dough to an oiled pan. Gently stretch to corners. If it resists, wait 20 min and try again. Cover and proof until bubbly.',
      tip: 'For Detroit/Focaccia, the dough should feel like a waterbed when ready.'
    });
  } else {
    steps.push({
      phase: 'Shape',
      title: 'Divide & Ball (Staglio)',
      description: `Divide dough into ${config.numPizzas} pieces of ${config.doughBallWeight}g. Shape into tight, smooth balls to create surface tension.`,
      tip: 'Ensure the bottom of the ball is sealed tight to prevent gases escaping.'
    });
  }

  // --- PHASE 7: FINAL PROOF ---
  steps.push({
    phase: 'Ferment',
    title: 'Final Proof (Appretto)',
    description: 'Let the dough balls rest. They should relax and puff up. When poked, the indentation should spring back slowly.',
    duration: isNeapolitan ? '8-24 hours (Cold)' : '1-4 hours (Ambient)',
    critical: true
  });

  // --- PHASE 8: BAKING ---
  if (isNeapolitan) {
    steps.push({
      phase: 'Bake',
      title: 'The Slap & Bake',
      description: 'Dunk ball in flour/semolina. Slap to extend. Top lightly. Bake at max temp (>430°C).',
      duration: '60-90 seconds',
      tip: 'Do not use a rolling pin. Push air from center to the "cornicione" (rim).'
    });
  } else if (isPan) {
    steps.push({
      phase: 'Bake',
      title: 'Par-bake (Optional) & Finish',
      description: 'For heavy toppings, par-bake the dough with just sauce for 5-7 mins. Add cheese/toppings and finish.',
      duration: '15-20 mins total',
      tip: 'Ensure the oven is preheated for at least 45 mins with a steel/stone if possible.'
    });
  } else {
    steps.push({
      phase: 'Bake',
      title: 'Stretch & Bake',
      description: 'Open the dough on a floured surface. Top and slide onto a preheated stone/steel.',
      duration: '6-10 mins',
      tip: 'Launch with confidence. Use a wooden peel for launching and metal for retrieving.'
    });
  }
  
  // --- PHASE 9: COOLING (Bread only) ---
  if (config.bakeType !== 'PIZZAS') {
      steps.push({
          phase: 'Bake',
          title: 'Cooling',
          description: 'Let the bread cool completely on a wire rack before slicing. This sets the crumb structure.',
          duration: 'Min 60 mins',
          critical: true
      })
  }

  return steps;
};
