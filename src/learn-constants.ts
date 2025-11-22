

import { Tutorial, TutorialSection, YeastType } from './types';

export const TUTORIALS: Tutorial[] = [
  {
    id: 'cold_fermentation',
    section: TutorialSection.FERMENTATION,
    title: 'Cold Maturation: Why and How',
    image: 'https://images.unsplash.com/photo-1627435199109-6_m8J4s_V-0?q=80&w=2070&auto=format&fit=crop',
    intro: 'Maturing dough in a refrigerated environment (typically 3-5°C for 12 to 72 hours) allows yeast to act slowly while flour enzymes—amylases, proteases—break down protein and starch complexes more effectively.',
    why: '<ul><li>Allows for greater flavor and aroma development;</li><li>Relaxes the gluten network = better extensibility and less risk of tearing;</li><li>More consistent and repeatable results, reducing guesswork.</li></ul>',
    howTo: '<ol><li>Use a scale to weigh ingredients precisely.</li><li>Mix and ball normally;</li><li>Place in a sealed container and refrigerate at 3-5°C for 12-72h;</li><li>Remove 1-2h before opening on the bench to acclimatize.</li></ol>',
    tips: [
      'Avoid placing warm containers directly in the fridge to prevent condensation;',
      'In summer (>28°C), prefer mixing in the morning and refrigerating immediately;',
      'Use strong flour (W ≥ 280) for best results.'
    ],
    reference: {
      name: "Gozney Blog – Pizza Dough Hydration Explained",
      url: "https://eu.gozney.com/blogs/news/pizza-dough-hydration-explained"
    },
    accessLevel: 'free'
  },
  {
    id: 'biga_vs_poolish',
    section: TutorialSection.FERMENTATION,
    title: 'Preferments: Biga vs Poolish – Technical Choice',
    image: 'https://images.unsplash.com/photo-1594311242637-a2d2a4585c54?q=80&w=2070&auto=format&fit=crop',
    intro: 'Among the most used preferments by technical pizza makers are poolish (~100% hydration) and biga (45-60% hydration) — each brings distinct characteristics to fermentation, flavor, and dough structure.',
    why: '<ul><li>Poolish favors light, open dough;</li><li>Biga favors strong structure, chewy texture;</li><li>Technical choice changes flavor, texture, and handling behavior.</li></ul>',
    howTo: '<p>– For Poolish: mix 100% flour/water + tiny yeast, ferment 8-18 h;<br>– For Biga: low hydration (~45-55%), ferment 12-24 h or more, incorporate as ~20-50% of total flour.</p>',
    tips: [
      'If you knead by hand, poolish can be easier to incorporate;',
      'Avoid poolish in very hot environments without refrigeration or the usage window will be short;',
      'Biga requires good flour and gluten strength to support high hydration in the final dough.'
    ],
    reference: {
      name: "PizzaBlab – Biga vs Poolish for Pizza Dough",
      url: "https://www.pizzablab.com/learning-and-resources/general-articles/biga-vs-poolish/"
    },
    accessLevel: 'pro'
  },
   {
    id: 'pizza_detroit',
    section: TutorialSection.TECHNIQUES,
    title: 'Detroit Style Pizza: Complete Guide',
    image: 'https://images.unsplash.com/photo-1633342537224-3c6c5233fe2a?q=80&w=2070&auto=format&fit=crop',
    intro: 'Detroit style pizza is known for its high hydration dough, baked in rectangular pans with high edges, cheese that goes all the way to the edges, and an airy texture, differing greatly from Neapolitan.',
    why: '<ul><li>High hydration generates extremely airy crumb;</li><li>Pan style favors generous portions and cuts;</li><li>Differs from Neapolitan in technique and equipment — enthusiasts gain a new dimension.</li></ul>',
    howTo: '<ol><li>Mix dough with ~65-70% hydration;</li><li>Ferment preferably with poolish or direct method, 18-24h;</li><li>Divide, place in oiled pan, stretch to corners;</li><li>Bake for 12-15 min in a very hot oven (~250-300°C).</li></ol>',
    tips: [
      'Use flour with protein ≥ 12.5% for better structure;',
      'Pan greased with olive oil or neutral oil ensures crispy edges;',
      'If oven is limited in temperature, increase baking time by 1-2 min and monitor base to avoid burning.'
    ],
    reference: {
      name: "Ooni Blog – Pizza Dough Hydration Explained",
      url: "https://ooni.com/blogs/ooni-insights/pizza-dough-hydration-explained"
    },
    accessLevel: 'pro',
    calculatorAction: {
        mode: 'basic',
        presetId: 'pizza_detroit'
    }
  },
  {
    id: 'high_hydration',
    section: TutorialSection.INGREDIENTS,
    title: 'High Hydration: 70%+ in Pizza Dough',
    image: 'https://images.unsplash.com/photo-1594311242637-a2d2a4585c54?q=80&w=2070&auto=format&fit=crop',
    intro: 'When we enter the universe of pizza doughs with hydration above 70%, we enter a refined technique that requires sensitivity and pronounced knowledge, resulting in airy crumbs and light crusts.',
    why: '<ul><li>Higher hydration = more internal steam = more open crumb;</li><li>Relaxed gluten network favors expansion and light texture;</li><li>Technical differentiation: delivers "pro-like" results at home.</li></ul>',
    howTo: '<ol><li>Select desired hydration % (e.g. 72%).</li><li>The system recalculates water, salt, oil, and yeast.</li><li>Adopt folding technique during bulk.</li><li>Prepare well-floured bench and use scraper to handle dough.</li></ol>',
    tips: [
      'Use high absorption flour or strong flour to sustain loose dough;',
      'In hot environment (> 28°C) reduce yeast or prolong fermentation;',
      'For limited oven (< 300°C) prefer hydration between 65-67% for easier control.'
    ],
    reference: {
      name: 'Ooni – Pizza Dough Hydration Explained',
      url: 'https://ooni.com/blogs/ooni-insights/pizza-dough-hydration-explained',
    },
    accessLevel: 'free',
    calculatorAction: {
      mode: 'advanced',
    },
  },
  {
    id: 'ddt_control',
    section: TutorialSection.ENVIRONMENT,
    title: 'Dough Temperature (DDT) – Control & Formula',
    image: 'https://images.unsplash.com/photo-1594311242637-a2d2a4585c54?q=80&w=2070&auto=format&fit=crop',
    intro: 'Desired Dough Temperature (DDT) is the target temperature after mixing. Controlling it ensures consistency in fermentation, even with weather or equipment variations.',
    why: '<ul><li>Without temperature control, fermentation can go off rhythm — too fast or too slow.</li><li>Controlling DDT brings predictability and repeatability, key for technical level results.</li><li>Teaching this concept raises the app\'s perceived value beyond "automatic recipe".</li></ul>',
    howTo: '<ol><li>Measure flour and ambient temperature with thermometer.</li><li>In app, select "Temperature Adjustment" and enter values.</li><li>System calculates ideal water temperature.</li><li>Proceed to mix and record result in diary.</li></ol>',
    tips: [
      'Fast reading digital thermometer speeds up process.',
      'In environments >28°C, reduce yeast or increase bulk time.',
      'In cold environments, initially heat dough or water to reach DDT target.'
    ],
    reference: {
      name: 'The Perfect Loaf – The Importance of Dough Temperature in Baking',
      url: 'https://www.theperfectloaf.com/the-importance-of-dough-temperature-in-baking/',
    },
    accessLevel: 'pro',
    calculatorAction: {
      mode: 'advanced',
    },
  },
  {
    id: 'baking_surfaces',
    section: TutorialSection.TECHNIQUES,
    title: 'Baking Surfaces: Stone vs Steel – Technical Choice',
    image: 'https://images.unsplash.com/photo-1594311242637-a2d2a4585c54?q=80&w=2070&auto=format&fit=crop',
    intro: 'The choice of surface (stone, steel) has direct impact on crust and texture. Steel heats up faster, ideal for home ovens, while stone is better for extreme heat, preventing burnt bases.',
    why: '<ul><li>Steel = rapid heating, ideal for home ovens.</li><li>Stone = better for extreme heat and authentic styles.</li><li>Wrong choice leads to burnt base or raw center.</li></ul>',
    howTo: '<ol><li>In equipment profile in app, select your base.</li><li>Enter oven type and max temperature.</li><li>In recipe, enable "Adapt to my base".</li><li>Calculator proposes adjustments automatically.</li></ol>',
    tips: [
      'Preheat base for 30-40 min.',
      'In home oven <300°C: choose steel to compensate for lower temperature.',
      'In oven >400°C: use stone to avoid burning base.'
    ],
    reference: {
      name: 'PizzaBlab – Steel vs. Stone for Pizza Surfaces',
      url: 'https://www.pizzablab.com/learning-and-resources/baking/pizza-baking-surfaces-guide/',
    },
    accessLevel: 'pro',
  },
  {
    id: 'levain_management',
    section: TutorialSection.FERMENTATION,
    title: 'Sourdough Starter Management',
    image: 'https://images.unsplash.com/photo-1594311242637-a2d2a4585c54?q=80&w=2070&auto=format&fit=crop',
    intro: 'Managing a sourdough starter (levain) is a technical differentiator. The "My Levain" module allows registering your culture, and the calculator uses this profile to adjust recipe to your own starter.',
    why: '<ul><li>Levain contributes complex flavor and slower, controlled fermentation.</li><li>Recording culture data increases repeatability and reduces variability.</li><li>Integrating this data into calculator reinforces "accessible professional tool" proposition.</li></ul>',
    howTo: '<ol><li>Access My Levain → New profile: enter name, hydration, etc.</li><li>In calculator, select "Use my Levain".</li><li>Enter desired levain % (e.g. 20%).</li><li>Tool updates hydration and bulk time automatically.</li></ol>',
    tips: [
      'In hot environments (> 28°C): decrease levain % to avoid accelerated fermentation.',
      'Use clear glass to observe bubbles and growth before using.',
      'Record culture notes after each use to generate history and learning.'
    ],
    reference: {
      name: 'King Arthur Baking – Hydration in Bread Dough, Explained',
      url: 'https://www.kingarthurbaking.com/blog/2023/01/11/bread-hydration',
    },
    accessLevel: 'pro',
    calculatorAction: {
      mode: 'advanced',
      yeastType: YeastType.USER_LEVAIN
    }
  },
  {
    id: 'toppings_ratios',
    section: TutorialSection.TECHNIQUES,
    title: 'Toppings & Ratios: Calculation Beyond Dough',
    image: 'https://images.unsplash.com/photo-1594311242637-a2d2a4585c54?q=80&w=2070&auto=format&fit=crop',
    intro: 'The "dough + topping" module expands app utility. It calculates ideal amount of cheese, sauce and toppings for pizza style and size, transforming app into complete tool.',
    why: '<ul><li>Well-dimensioned filling ensures balance of flavor and texture.</li><li>Adding this functionality turns app into complete tool.</li><li>Increases retention: user returns to adjust coverage and test variations.</li></ul>',
    howTo: '<ol><li>In Calculator select Pizza style.</li><li>Activate "Topping" tab and enter number of pizzas.</li><li>System shows suggested amounts.</li><li>Adjust % if you want and save as preset.</li></ol>',
    tips: [
      'In limited home oven (<300°C): prefer light topping.',
      'Use sauce separately if you want crispier dough.',
      'In larger batch, use "Topping Report" to calculate cost and inputs.'
    ],
    reference: {
      name: 'Serious Eats – The Pizza Lab: Sauce-to-Cheese Ratios & Build Tips',
      url: 'https://www.seriouseats.com/pizza-lab-sauce-cheese-ratios-build-tips-4167416',
    },
    accessLevel: 'pro',
  },
  {
    id: 'hydration_gluten',
    section: TutorialSection.INGREDIENTS,
    title: 'Hydration and Gluten Network: Science Behind the Dough',
    image: 'https://images.unsplash.com/photo-1594311242637-a2d2a4585c54?q=80&w=2070&auto=format&fit=crop',
    intro: 'Hydration is amount of liquid relative to flour. It activates proteins forming gluten. "Custom Hydration" mode allows total control over this crucial parameter.',
    why: '<ul><li>Hydration defines texture and crumb openness.</li><li>Strong gluten network depends on sufficient water.</li><li>Understanding hydration gives control and predictability to dough.</li></ul>',
    howTo: '<ol><li>In form, enter desired hydration %.</li><li>App recalculates all other ingredients.</li><li>Observe consistency: looser dough indicates high hydration.</li><li>Monitor "windowpane test" to evaluate gluten.</li></ol>',
    tips: [
      'If using whole wheat flour, increase hydration by +2% to +4%.',
      'Dough with > 80% hydration needs folds instead of kneading.',
      'Flour bench well to handle very hydrated doughs.'
    ],
    reference: {
      name: 'King Arthur Baking – Hydration in Bread Dough, Explained',
      url: 'https://www.kingarthurbaking.com/blog/2023/01/11/bread-hydration',
    },
    accessLevel: 'free',
  },
  {
    id: 'dough_troubleshooting',
    section: TutorialSection.TROUBLESHOOTING,
    title: 'Dough Troubleshooting: Snap-Back, Gum Line & Common Faults',
    image: 'https://images.unsplash.com/photo-1594311242637-a2d2a4585c54?q=80&w=2070&auto=format&fit=crop',
    intro: 'Problems like snap-back (dough shrinking) or gum line (raw base) are common. "Rapid Diagnosis" module offers checklist of symptoms and suggests automatic corrections.',
    why: '<ul><li>Dough problems cause frustration and app abandonment.</li><li>Accurate diagnosis strengthens retention and confidence.</li><li>Technical adjustments reduce trial and error.</li></ul>',
    howTo: '<ol><li>Access Diagnosis and select symptom.</li><li>App displays probable causes and suggests adjustment.</li><li>Apply adjustment and save learning.</li><li>Use history to avoid repeating error.</li></ol>',
    tips: [
      'Always weigh ingredients — small errors affect result.',
      'On hot days (>30°C), reduce yeast by –10%.',
      'Calibrate oven before big batch.'
    ],
    reference: {
      name: 'Pizza Today – Troubleshooting Your Pizza Dough',
      url: 'https://pizzatoday.com/news/troubleshooting-your-pizza-dough-a-guide-to-making-pizza-better/147346/',
    },
    accessLevel: 'pro',
  },
  {
    id: 'flour_library',
    section: TutorialSection.INGREDIENTS,
    title: 'Flour Database & Smart Substitutions',
    image: 'https://images.unsplash.com/photo-1594311242637-a2d2a4585c54?q=80&w=2070&auto=format&fit=crop',
    intro: 'Flour is the core of the dough. "Flour Database" allows registering brand, protein %, and consulting data from other users. If your flour runs out, app suggests alternative and adjusts recipe.',
    why: '<ul><li>Flour defines structure, texture, and stability.</li><li>Wrong substitution is frequent cause of failure.</li><li>Having database strengthens community.</li></ul>',
    howTo: '<ol><li>Access Flour Database > Add new.</li><li>Enter brand, %, etc.</li><li>When creating recipe, select your registered flour.</li><li>If unavailable, use substitution suggestion.</li></ol>',
    tips: [
      'When testing new flour, make small batch and record result.',
      'Whole wheat flours generally need +2-4% hydration.',
      'Use precision scale for consistent data.'
    ],
    reference: {
      name: 'BakerPedia – Gluten Hydration: Processes',
      url: 'https://bakerpedia.com/processes/gluten-hydration/',
    },
    accessLevel: 'pro',
  },
  {
    id: 'precision_scales',
    section: TutorialSection.FUNDAMENTALS,
    title: 'Scales, Precision & Baker\'s Percentage',
    image: 'https://images.unsplash.com/photo-1594311242637-a2d2a4585c54?q=80&w=2070&auto=format&fit=crop',
    intro: 'Imprecision in measurements is barrier to consistent results. Baker\'s percentage (flour = 100%) is professional method to scale and predict results, and is available in app.',
    why: '<ul><li>Baker\'s percentage brings clarity and scalability.</li><li>Precision with digital scale reduces errors.</li><li>Allows enthusiast to work like professional.</li></ul>',
    howTo: '<ol><li>In calculator, activate "Baker\'s Percentage Mode".</li><li>Enter total flour (e.g. 1000 g).</li><li>Use sliders for hydration, salt, oil, etc.</li><li>Calculator displays real weights and you can save preset.</li></ol>',
    tips: [
      'Use digital scale with 0.1 g precision for yeast and salt.',
      'Keep environment controlled to avoid external variables.',
      'Save your presets with clear name and date.'
    ],
    reference: {
      name: 'BakerPedia – The Baker’s Percentage and How to Use It',
      url: 'https://bakerpedia.com/processes/baker-percentages/',
    },
    accessLevel: 'free'
  },
  {
    id: 'modes_basic_advanced',
    section: TutorialSection.FUNDAMENTALS,
    title: 'Practical Mode vs. Advanced Mode',
    image: 'https://images.unsplash.com/photo-1594311242637-a2d2a4585c54?q=80&w=2070&auto=format&fit=crop',
    intro: 'App offers two modes: Practical, with automatic presets for quick use, and Advanced, allowing free alteration of all percentages for experimentation, accommodating both casual and technical users.',
    why: '<ul><li>Casual enthusiast wants simplicity.</li><li>Advanced user seeks complete control.</li><li>Two modes prevent app from being intimidating or too basic.</li></ul>',
    howTo: '<ol><li>Toggle between "Practical Mode" / "Advanced Mode".</li><li>In Practical: define only style, quantity, and weight.</li><li>In Advanced: all sliders (hydration, salt, etc.) are released.</li><li>Save presets in both modes.</li></ol>',
    tips: [
      'Use tooltips to understand difference between modes.',
      'App saves your mode preference for next time.',
      'In Advanced Mode, there is button to reset to original preset.'
    ],
    reference: {
      name: 'MyPizzaCorner – Common Dough Problems and How to Fix Them',
      url: 'https://mypizzacorner.com/pizza-tips/pizza-dough-problems/',
    },
    accessLevel: 'free'
  },
  {
    id: 'reverse_mode',
    section: TutorialSection.TECHNIQUES,
    title: 'Reverse Mode: Calculate with what you have',
    image: 'https://images.unsplash.com/photo-1594311242637-a2d2a4585c54?q=80&w=2070&auto=format&fit=crop',
    intro: '"Reverse Mode" allows entering a fixed variable (e.g. 350 g levain, 1 kg flour) and tool recalculates other ingredients, adapting to real situations and reducing waste.',
    why: '<ul><li>Meets real kitchen scenario: what do I have on hand?</li><li>Avoids waste and transforms problem into opportunity.</li><li>Differentiates app by functional and adaptive thinking.</li></ul>',
    howTo: '<ol><li>In calculator, select "Reverse Mode".</li><li>Enter parameter you know (e.g. "I have 350 g levain").</li><li>System calculates other ingredients.</li><li>Save this adapted recipe as new batch.</li></ol>',
    tips: [
      'Use this mode for leftover levain or flour.',
      'Mark as "special batch" to help history.',
      'Combine with diary to see how many times this mode was used.'
    ],
    reference: {
      name: 'Reddit r/Pizza – How to Calculate Biga and Poolish % in Pizza Dough',
      url: 'https://www.reddit.com/r/Cooking/comments/1bomiza/how_to_calculate_biga_and_poolish_in_pizza/',
    },
    accessLevel: 'pro'
  },
  {
    id: 'references_credibility',
    section: TutorialSection.FUNDAMENTALS,
    title: 'References & Credibility: Technical Foundations',
    image: 'https://images.unsplash.com/photo-1594311242637-a2d2a4585c54?q=80&w=2070&auto=format&fit=crop',
    intro: 'For DoughLabPro to be perceived as serious tool, every preset and tutorial is supported by real verifiable references, transmitting professionalism and trust.',
    why: '<ul><li>Users want proof technique works.</li><li>Transparency in sources increases credibility.</li><li>Helps create technical engaged community.</li></ul>',
    howTo: '<ol><li>In each preset/technique, we include "Technical Reference" section.</li><li>In "Learn" page, you can filter by "Validation".</li><li>Allows viewing original source.</li><li>We add "Technical Validation" badge for popular recipes.</li></ol>',
    tips: [
      'We use recognized sources: associations, magazines, and technical blogs.',
      'We update references periodically.',
      'Promote co-creation with experts signing "certified" recipes.'
    ],
    reference: {
      name: 'Scott’s Pizza Tours – The Dreaded “Gumline”',
      url: 'https://www.scottspizzatours.com/blog/gumline/',
    },
    accessLevel: 'free'
  },
  {
    id: 'no_knead_method',
    section: TutorialSection.TECHNIQUES,
    title: 'No-Knead Method for Easy Baking',
    image: 'https://images.unsplash.com/photo-1589301773952-79055811c47c?q=80&w=2070&auto=format&fit=crop',
    intro: '"No-Knead" method gained popularity for facilitating high-level technical doughs with minimal effort. Uses high hydration (~75%) and long fermentations (12h or more) to align gluten automatically.',
    why: '<ul><li>Allows enthusiasts with less equipment to make sophisticated doughs.</li><li>More open crumb texture, crisper crust.</li><li>Elevates technique without complicating interface.</li></ul>',
    howTo: '<ol><li>In Advanced calculator mode, activate "No-Knead".</li><li>Enter high hydration (e.g. 70-75%).</li><li>Configure long fermentation (e.g. 12-24h).</li><li>Follow rest instructions and record result in diary.</li></ol>',
    tips: [
      'In hot environment (>28°C) reduce hydration ~2% to avoid super fluid dough.',
      'Use closed container to ferment avoiding dry crust.',
      'Make small batch first time to validate process.'
    ],
    reference: {
      name: "No-knead Bread – Wikipedia",
      url: "https://en.wikipedia.org/wiki/No-knead_bread"
    },
    accessLevel: 'pro'
  },
  {
    id: 'scoring_techniques',
    section: TutorialSection.TECHNIQUES,
    title: 'Scoring Patterns and Dough Expansion',
    image: 'https://images.unsplash.com/photo-1585399103509-24d119a9f11f?q=80&w=2070&auto=format&fit=crop',
    intro: 'Cutting dough before baking (*scoring*) isn\'t just aesthetic: regulates where gas escapes, how dough expands, and affects texture and crust.',
    why: '<ul><li>Controlling dough expansion prevents unwanted ruptures.</li><li>Allows differentiated aesthetics.</li><li>Helps create consistency in final result.</li></ul>',
    howTo: '<ol><li>In "Techniques" module select "Scoring".</li><li>Choose pattern per bread style.</li><li>Before baking, execute pattern with blade.</li><li>In diary, mark used pattern and evaluate result.</li></ol>',
    tips: [
      'Use sharp blade or *lame* for clean cuts.',
      'In high hydration doughs (>70%), prefer deeper cuts (~0.5 cm).',
      'Photograph from top after cut to compare in next batches.'
    ],
    reference: {
      name: "King Arthur Baking – Bread Scoring Techniques",
      url: "https://www.kingarthurbaking.com/blog/2017/10/20/bread-scoring-techniques"
    },
    accessLevel: 'pro'
  },
  {
    id: 'baking_methods',
    section: TutorialSection.FUNDAMENTALS,
    title: 'Baking Methods: Straight, Sponge & Dough, Sourdough',
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?q=80&w=2070&auto=format&fit=crop',
    intro: 'Several preparation methods exist: *straight dough* (all together), *sponge & dough* (with preferment), or *sourdough* (mother dough). Each impacts time, flavor, and final texture.',
    why: '<ul><li>Method defines flavor, texture, and production rhythm.</li><li>Helps understand why some doughs "ask" for more time or technique.</li><li>Adds depth to app and makes user feel in control.</li></ul>',
    howTo: '<ol><li>In calculator, select "Dough Method".</li><li>Choose between Straight, Sponge or Sourdough.</li><li>System adjusts visible fields (e.g. % preferment for Sponge).</li><li>Execute process and record in diary.</li></ol>',
    tips: [
      'If less than 4h free, use Straight method.',
      'For complex flavor, reserve 12-24h for Sponge or Sourdough.',
      'Start with less yeast if Sourdough and record result.'
    ],
    reference: {
      name: "Bread-Making Methods: From Basic to Advanced",
      url: "https://hospitality.institute/bha101/bread-making-methods-basic-to-advanced/"
    },
    accessLevel: 'free'
  },
  {
    id: 'pizza_baking_science',
    section: TutorialSection.ENVIRONMENT,
    title: 'Pizza Baking Science – Physics & Thermodynamics',
    image: 'https://images.unsplash.com/photo-1590947132387-155cc02f3212?q=80&w=2070&auto=format&fit=crop',
    intro: 'Studies analyze how masonry vs. home ovens impact baking time and texture. App allows entering your oven type and base material to adapt recipe to your reality.',
    why: '<ul><li>Understanding equipment leads to real consistency.</li><li>Users feel empowered with data, not just "generic recipe".</li><li>High perceived value means greater retention.</li></ul>',
    howTo: '<ol><li>In oven configuration, enter type, base and temperature.</li><li>Activate "Baking Simulation" to see time/adjustment suggestions.</li><li>In diary, compare result with suggestion and adjust for next.</li></ol>',
    tips: [
      'Home ovens < 300°C: increase preheat to >30 min.',
      'Steel base heats faster than stone — watch base burn.',
      'Photograph crust and record actual bake time.'
    ],
    reference: {
      name: "The Physics of Baking Good Pizza – arXiv",
      url: "https://arxiv.org/abs/1806.08790"
    },
    accessLevel: 'pro'
  },
  {
    id: 'cold_retard_flavor',
    section: TutorialSection.FERMENTATION,
    title: 'Cold Retard Fermentation and Flavor Profile',
    image: 'https://images.unsplash.com/photo-1627435199109-6_m8J4s_V-0?q=80&w=2070&auto=format&fit=crop',
    intro: 'Cold retard (low temperature fermentation) used by professionals to develop flavor, structure, and aroma. App guides you setting up recipe for this advanced technique.',
    why: '<ul><li>Slow fermentation = greater flavor complexity.</li><li>User differentiates from basic fast dough practices.</li><li>Offers "professional level production" standard.</li></ul>',
    howTo: '<ol><li>In calculator, activate "Cold Retard".</li><li>Enter refrigeration time and temperature.</li><li>Engine adjusts yeast % and hydration.</li><li>After baking, save in diary and compare flavor/texture.</li></ol>',
    tips: [
      'Use sealed container to avoid dough drying.',
      'If fridge is >8°C, manually adjust condition.',
      'Make test batch before adopting full volume.'
    ],
    reference: {
      name: "The Science Behind Pizza Dough – PizzaVolta",
      url: "https://pizzavolta.com/the-science-behind-pizza-dough/"
    },
    accessLevel: 'pro'
  },
  {
    id: 'yeast_types_dosage',
    section: TutorialSection.INGREDIENTS,
    title: 'Yeasts: Types, Dosage and Effects',
    image: 'https://images.unsplash.com/photo-1617470715842-9ebd65b8a03f?q=80&w=2070&auto=format&fit=crop',
    intro: 'Understanding yeast type (IDY, ADY, Levain) and dosage is vital for consistency. Guide helps choose correct type and dosage for recipe.',
    why: '<ul><li>Incorrect dosage compromises texture.</li><li>User gains fine control over recipe.</li><li>Allows app to support batch scalability.</li></ul>',
    howTo: '<ol><li>In calculator, open "Yeast Type".</li><li>Choose between IDY, ADY, or Levain.</li><li>Enter suggested % or use default.</li><li>After batch, record actual fermentation time and adjust % for next.</li></ol>',
    tips: [
      'In hot environment (>30°C) reduce yeast ~10-20%.',
      'In cold environment (<18°C) warm water instead of increasing yeast.',
      'Keep diary record to evolve personal factor.'
    ],
    reference: {
      name: "Influence of Yeast Concentrations and Fermentation Times on Bread Dough",
      url: "https://www.sciencedirect.com/science/article/pii/S0023643824003426"
    },
    accessLevel: 'free'
  },
  {
    id: 'stretch_and_fold_technique',
    section: TutorialSection.TECHNIQUES,
    title: 'Stretch & Fold Technique: Improving Structure with Low Energy',
    image: 'https://images.unsplash.com/photo-1614532843595-3b74b1df092b?q=80&w=2070&auto=format&fit=crop',
    intro: '*Stretch & fold* technique is effective for high hydration doughs, reinforcing gluten and creating large stable bubbles with less effort than traditional kneading.',
    why: '<ul><li>Avoids excessive effort for those without mixer.</li><li>Improves texture of very hydrated doughs.</li><li>Offers accessible professional technique.</li></ul>',
    howTo: '<ol><li>In calculator form activate "Use Stretch & Fold".</li><li>Enter number of cycles (e.g. 3-4 every 30 min).</li><li>Engine calculates time and recommended hydration.</li><li>Record in diary and compare with traditional kneading.</li></ol>',
    tips: [
      'In very fluid doughs (>68% hydration), prefer folding to kneading.',
      'If bench is cold, slightly warm dough before starting.',
      'Photograph cut crumb to see openness and evolution.'
    ],
    reference: {
      name: "Advanced No-Knead Bread – Taste of Artisan",
      url: "https://tasteofartisan.com/no-knead-bread/"
    },
    accessLevel: 'pro'
  },
  {
    id: 'connected_oven_profile',
    section: TutorialSection.ENVIRONMENT,
    title: 'Connected Oven Profile: Automatic Recipe Adjustment',
    image: 'https://images.unsplash.com/photo-1579752048924-f53d5c58746b?q=80&w=2070&auto=format&fit=crop',
    intro: 'Knowing your exact oven profile makes difference. App allows registering equipment and with "Connected Profile", calculator recommends hydration, oil, and baking time adjustments.',
    why: '<ul><li>Ensures recipe works in your oven.</li><li>Reduces frustration of successive attempts.</li><li>Elevates technical app value for enthusiasts.</li></ul>',
    howTo: '<ol><li>In Settings > Oven Profile, enter equipment data.</li><li>Start "Oven Test" in app to record actual time/temp.</li><li>Activate "Auto-Base Adjustment" for calculator to adapt recipe.</li><li>In diary, mark "Used connected profile" to filter results.</li></ol>',
    tips: [
      'Preheat at least 30 min.',
      'In home oven ≤300°C, increase oil (~1%) or reduce hydration ~2%.',
      'Replace stone with steel if seeking extra crispness in limited oven.'
    ],
    reference: {
      name: "Exploring the Role of Baking Process on Technological Properties of Bread",
      url: "https://pubs.acs.org/doi/10.1021/acsfoodscitech.4c00987"
    },
    accessLevel: 'pro'
  },
  {
    id: 'error_logging_diary',
    section: TutorialSection.TROUBLESHOOTING,
    title: 'Error Logging & Diagnosis in Diary',
    image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?q=80&w=2070&auto=format&fit=crop',
    intro: 'Learning from what went wrong is essential. "Batch Diary" allows logging common errors (e.g. over-proof), associating with parameters used, and analyzing patterns to improve consistently.',
    why: '<ul><li>Learning from errors differentiates hobby from technique.</li><li>Creates daily logging habit, generating retention.</li><li>Prepares data for future "insights" features.</li></ul>',
    howTo: '<ol><li>After batch, click "Log Error/Observation" in diary.</li><li>Mark error type and enter parameters used.</li><li>Then, filter in Insights module to see patterns.</li><li>Adjust next bake based on diagnosis.</li></ol>',
    tips: [
      'Use before/after photos to visually understand error.',
      'Use standard tags ("over-proof") for quick filters.',
      'Compare errors over time to evolve technical level.'
    ],
    reference: {
      name: "Stages of Bread Making – VegPatch Kitchen",
      url: "https://vegpatchkitchen.co.uk/the-stages-of-bread-making/"
    },
    accessLevel: 'pro'
  },
  {
    id: 'recipe_scaling',
    section: TutorialSection.TECHNIQUES,
    title: 'Recipe Scaling: From 500g to 10kg Without Quality Loss',
    image: 'https://images.unsplash.com/photo-1627888636881-8985b671f49b?q=80&w=2070&auto=format&fit=crop',
    intro: 'Baker\'s percentage allows precise recipe scaling. "Batch Scale Mode" recalculates all ingredients and parameters, ensuring quality is maintained in larger batches.',
    why: '<ul><li>Maintains consistency when producing larger scale.</li><li>Increases app value for semi-professional environments.</li><li>Avoids ratio errors in large batches.</li></ul>',
    howTo: '<ol><li>In calculator, select "Batch Scale Mode".</li><li>Enter target flour weight (e.g. 5000 g).</li><li>Maintain or adjust percentages.</li><li>System recalculates everything.</li><li>Save as batch and record result.</li></ol>',
    tips: [
      'When scaling >10×, check equipment to ensure performance.',
      'In large batches, dough can heat up faster in mixer.',
      'Use diary logs to compare batches of different sizes.'
    ],
    reference: {
      name: "A Pizza Primer – The Fresh Loaf",
      url: "https://www.thefreshloaf.com/recipes/pizza"
    },
    accessLevel: 'pro'
  },
  {
    id: 'long_term_fermentation',
    section: TutorialSection.FERMENTATION,
    title: 'Long-Term Fermentation Technique: "Sour Ferment"',
    image: 'https://images.unsplash.com/photo-1594311242637-a2d2a4585c54?q=80&w=2070&auto=format&fit=crop',
    intro: 'Fermenting for 48h or more allows greater flavor development and starch breakdown. App teaches enabling "Ultra Long Fermentation Mode" and adjusts recipe for advanced technique.',
    why: '<ul><li>More complex flavor, better crumb alveoli, improved digestibility.</li><li>Perfect for enthusiasts wanting premium artisanal results.</li><li>High perceived value for app.</li></ul>',
    howTo: '<ol><li>In calculator, enable "Fermentation > 24h".</li><li>Adjust time and mode (e.g. cold/refrigeration).</li><li>System suggests yeast and hydration adjustments.</li><li>Execute and record dough photos and flavor/texture notes.</li></ol>',
    tips: [
      'Use transparent container to observe gas bubbles.',
      'In large batches, ensure temperature control.',
      'Compare normal batch vs ultra-fermented to feel difference.'
    ],
    reference: {
      name: "High Temperature 1H DOSY NMR Reveals Sourdough Fermentation Changes",
      url: "https://arxiv.org/abs/2503.07071"
    },
    accessLevel: 'pro'
  },
  {
    id: 'natural_fermentation_levain',
    section: TutorialSection.FERMENTATION,
    title: 'Natural Fermentation (Levain) for Premium Pizza & Bread',
    image: 'https://images.unsplash.com/photo-1560181313-a5370557e411?q=80&w=2070&auto=format&fit=crop',
    intro: 'Natural fermentation via levain brings flavor and technical complexity. App guides activating "Levain Mode", allowing culture registration and diary connection for full history.',
    why: '<ul><li>Artisanal value and flavor differential.</li><li>User feels app accompanies personal cultivation.</li><li>Facilitates transition from enthusiast to micro-entrepreneur.</li></ul>',
    howTo: '<ol><li>In "Levain Culture", register starter.</li><li>In calculator choose "Natural Fermentation (Levain)" and enter %.</li><li>Engine adjusts hydration/time per levain profile.</li><li>Record batch, log levain vigor, evaluate result.</li></ol>',
    tips: [
      'Use transparent glass to observe levain activity.',
      'Feed levain same time consistently.',
      'Save history to see which feeding generates best doughs.'
    ],
    reference: {
      name: "High Temperature 1H DOSY NMR – Sourdough Fermentation Study",
      url: "https://arxiv.org/abs/2503.07071"
    },
    accessLevel: 'pro'
  },
  {
    id: 'micro_batch_mode',
    section: TutorialSection.TECHNIQUES,
    title: 'Micro-Batch Mode: Bake 1 or 2 Units Precisely',
    image: 'https://images.unsplash.com/photo-1528731708534-816fe59f90cb?q=80&w=2070&auto=format&fit=crop',
    intro: '*Micro-Batch* mode allows making 1 or 2 pizzas/breads precisely using volume (cups/spoons), ideal for those without precision scale or wanting smaller batches.',
    why: '<ul><li>Expands user base to enthusiasts with less equipment.</li><li>Increases daily app usage, not just large productions.</li><li>Facilitates practice habit.</li></ul>',
    howTo: '<ol><li>In calculator select "Micro-Batch Mode".</li><li>Choose size (1 pizza or 2 loaves).</li><li>App swaps units to volume and adjusts recipe.</li><li>Save "Mini Batch" preset for quick repetition.</li></ol>',
    tips: [
      'Use measuring cups if no scale.',
      'Prefer known brand ingredients to minimize variation.',
      'Compare result vs larger batch to calibrate palate.'
    ],
    reference: {
      name: "Easy Homemade Pizza Dough – Girl Versus Dough",
      url: "https://www.girlversusdough.com/pizza-dough-recipe/"
    },
    accessLevel: 'free'
  },
  {
    id: 'visual_indicators_photography',
    section: TutorialSection.TROUBLESHOOTING,
    title: 'Visual Indicators & Photography of Dough and Crust',
    image: 'https://images.unsplash.com/photo-1513312999432-a7afa260d8a0?q=80&w=2070&auto=format&fit=crop',
    intro: 'Photographing dough, crumb, and crust provides visual data to calibrate parameters. App integrates "Add Technical Photo" to diary to generate visual evolution charts.',
    why: '<ul><li>Allows seeing concrete progress, more motivating.</li><li>Helps quick identification of visual problems.</li><li>Differentiates app as visual learning tool.</li></ul>',
    howTo: '<ol><li>In diary, when saving batch, select "Add Technical Photo".</li><li>Take photos of dough ball, crust, cross-section crumb.</li><li>App analyzes generates "indicator" (e.g. % alveoli).</li><li>Compare with previous batches and visualize evolution.</li></ol>',
    tips: [
      'Use consistent lighting for visual comparison.',
      'Collect photos of whole crust and cross-section crumb.',
      'Name photos with date and recipe profile for easy search.'
    ],
    reference: {
      name: "Homemade Pizza Dough from Scratch – Food & Style",
      url: "https://foodandstyle.com/pizza-dough/"
    },
    accessLevel: 'pro'
  },
  {
    id: 'prefermentos_poolish_biga_sponge',
    section: TutorialSection.FERMENTATION,
    title: 'Preferments: Poolish, Biga, Sponge',
    image: 'placeholder_url_prefermentos.jpg',
    intro: 'Preferments — like Poolish, Biga, Sponge — are techniques widely used by bakers to generate complex flavors, damage gluten less, improve texture. Per PizzaBlab, involves mixing flour/water (± minimal yeast) fermenting 6-24h before final dough.',
    why: '<ul><li>Generates deeper flavor via lactic bacteria action.</li><li>Allows lighter dough or open crumb per choice.</li><li>Elevates enthusiast from "dough maker" to "dough engineer".</li></ul>',
    howTo: '<ol><li>In calculator, select technique "With Preferment".</li><li>Choose type (Poolish/Biga).</li><li>Enter % flour in preferment (e.g. 30%).</li><li>App calculates flour/water/yeast of preferment and final dough.</li><li>Save as preset or batch.</li></ol>',
    tips: [
      'In hot environment (>28°C): reduce % preferment or decrease yeast.',
      'Observe bubbles in preferment — if over-fermented, excess acidity affects color/flavor.',
      'Record in diary preferment amount + result for comparison.'
    ],
    reference: {
      name: 'The Complete Guide to Preferment in Pizza Dough',
      url: 'https://www.pizzablab.com/learning-and-resources/general-articles/guide-to-preferments/'
    },
    accessLevel: 'pro'
  },
  {
    id: 'mistura_tempos_amassamento',
    section: TutorialSection.TECHNIQUES,
    title: 'Mixing and Kneading Times: Impact',
    image: 'placeholder_url_mistura_amassamento.jpg',
    intro: 'Mixing/kneading phase defines gluten formation, protein alignment, gas bubbles, affecting rise and bake. According to academic review, shear forces and flow patterns influence aroma, texture, final quality.',
    why: '<ul><li>Under-developing gluten → tears/doesn\'t rise.</li><li>Over-mixing → too elastic, hard to open, tight crumb.</li><li>Controlling variable helps repeat recipes accurately.</li></ul>',
    howTo: '<ol><li>In calculator, open "Time/Folds".</li><li>Select kneading technology (hand/mixer).</li><li>Go to advanced mode adjusting minutes/folds.</li><li>Execute and save result to compare performance.</li></ol>',
    tips: [
      'In high protein flours (>13%), prefer shorter kneading.',
      'Autolyse before (20-30 min) reduces need for intense kneading.',
      'Use thermometer: if dough heats >28°C in mixing, reduce time/add ice.'
    ],
    reference: {
      name: 'Impact of Mixing on Flavor and Aroma Development in Fermented Foods',
      url: 'https://arxiv.org/abs/2412.10190'
    },
    accessLevel: 'pro'
  },
  {
    id: 'controle_temp_umidade_ambiente',
    section: TutorialSection.ENVIRONMENT,
    title: 'Temp & Humidity Control',
    image: 'placeholder_url_controle_ambiente_massa.jpg',
    intro: 'Temperature and humidity of environment impact fermentation, bubble growth, maturation, flavor. App helps adjust recipe to compensate.',
    why: '<ul><li>Hot environment ferments too fast → structure/flavor loss.</li><li>Cold environment → slow fermentation, under-rise risk.</li><li>Adjusting with data increases precision.</li></ul>',
    howTo: '<ol><li>Use thermometer for room/flour temp.</li><li>In app, select "Environment" enter values.</li><li>System suggests: water temp / yeast % / bulk time.</li><li>Save condition and track variations.</li></ol>',
    tips: [
      'In > 30°C, add ice or reduce yeast ~10-20%.',
      'In dry climates (<30% RH), reduce hydration ~2%.',
      'Save history of environment vs result.'
    ],
    reference: {
      name: 'Hydration in Bread Dough, explained',
      url: 'https://www.kingarthurbaking.com/blog/2023/01/11/bread-hydration'
    },
    accessLevel: 'pro'
  },
  {
    id: 'metodos_cozimento_superficies',
    section: TutorialSection.TECHNIQUES,
    title: 'Baking Methods & Surfaces',
    image: 'placeholder_url_forno_superficie.jpg',
    intro: 'Oven type and surface (stone, steel, deck) radically change behavior. App allows adjusting oven profile, calculator suggests adjustments.',
    why: '<ul><li>"Universal" recipe ignores critical variables.</li><li>Adapting maximizes texture/crispness.</li><li>Empowers user to get pizzeria results at home.</li></ul>',
    howTo: '<ol><li>In profile, register oven: type, max °C, base.</li><li>In calculator, select oven, app auto-adjusts.</li><li>Record result for history.</li></ol>',
    tips: [
      'Home oven ≤ 300°C: increase oil (~1%) reduce hydration ~2%.',
      'Wood-fired 485°C: hydration ~60-62%, low conductivity base.',
      'Check stone/steel preheat ≥30 min.'
    ],
    reference: {
      name: 'The Physics of baking good Pizza',
      url: 'https://arxiv.org/abs/1806.08790'
    },
    accessLevel: 'pro'
  },
  {
    id: 'tecnica_autolise',
    section: TutorialSection.TECHNIQUES,
    title: 'Autolyse Technique – Increasing Extensibility',
    image: 'placeholder_url_autolyse.jpg',
    intro: 'Autolyse mixes flour/water only, resting before salt/yeast. Allows gluten development with less kneading, resulting in extensible dough.',
    why: '<ul><li>Facilitates handling high hydration.</li><li>Reduces kneading need.</li><li>Increases volume/texture.</li></ul>',
    howTo: '<ol><li>Activate "Use Autolyse" in calculator.</li><li>Enter time (e.g. 30 min).</li><li>App adjusts process instructions.</li><li>Record result comparing non-autolyse.</li></ol>',
    tips: [
      'High W flours (>300): 40-45 min autolyse improves structure.',
      'Cold environment (<20°C): warm water slightly.',
      'Use closed container.'
    ],
    reference: {
      name: 'Raymond Calvel – The Taste of Bread',
      url: 'https://en.wikipedia.org/wiki/Raymond_Calvel'
    },
    accessLevel: 'free'
  },
  {
    id: 'tecnica_tangzhong_yudane',
    section: TutorialSection.TECHNIQUES,
    title: 'Tangzhong/Yudane for Enriched Doughs',
    image: 'placeholder_url_tangzhong.jpg',
    intro: 'Tangzhong cooks part of flour with water/milk at ~65°C forming gel. Added to dough allows greater absorption, softness, shelf life.',
    why: '<ul><li>Increases hydration without losing control.</li><li>Hybrid profiles benefit.</li><li>Advanced technique differentiation.</li></ul>',
    howTo: '<ol><li>Check "Use Tangzhong".</li><li>Enter % flour (e.g. 20%).</li><li>App calculates hydration.</li><li>Save result.</li></ol>',
    tips: [
      'Ideal for oil/butter doughs (>2%).',
      'Keep rest hydration balanced.',
      'Tends to darken crust faster.'
    ],
    reference: {
      name: 'Tangzhong – Technique of Making Yeast Dough',
      url: 'https://en.wikipedia.org/wiki/Tangzhong'
    },
    accessLevel: 'pro'
  },
  {
    id: 'modo_reverso_adaptativo2',
    section: TutorialSection.TECHNIQUES,
    title: 'Adaptive Reverse Mode: Bake with What You Have',
    image: 'placeholder_url_modo_reverso_adaptativo2.jpg',
    intro: 'For enthusiasts with fixed ingredient (like 300g levain), "Reverse Mode" calculates rest of recipe, avoiding waste.',
    why: '<ul><li>Solves "what do I have?" scenario.</li><li>Increases retention.</li><li>Competitive differential.</li></ul>',
    howTo: '<ol><li>Select "Reverse Mode".</li><li>Enter known parameter.</li><li>System recalculates.</li><li>Save as batch.</li></ol>',
    tips: [
      'Use for leftovers.',
      'Mark "Used Reverse Mode".',
      'Observe patterns.'
    ],
    reference: {
      name: 'MyPizzaCorner – Common Dough Problems and How to Fix Them',
      url: 'https://mypizzacorner.com/pizza-tips/pizza-dough-problems/'
    },
    accessLevel: 'pro'
  },
  {
    id: 'alta_hidratacao_tecnicas',
    section: TutorialSection.INGREDIENTS,
    title: 'High Hydration: Techniques for Open Crumb',
    image: 'placeholder_url_alta_hidracao.jpg',
    intro: 'Doughs > 70% hydration offer open crumbs/light texture, require good handling/flour. Addresses risks/adjustments.',
    why: '<ul><li>Technical improvement.</li><li>Increases satisfaction.</li><li>Differentiation.</li></ul>',
    howTo: '<ol><li>Activate "Free Hydration".</li><li>App adjusts.</li><li>Follow handling (autolyse, folds).</li><li>Save/compare.</li></ol>',
    tips: [
      'Strong flour/powerful oven helps.',
      'Limited oven prefer 66-68%.',
      'Document each bake.'
    ],
    reference: {
      name: 'Baking Science: Dough Hydration',
      url: 'https://beginwithbutter.com/baking-science-dough-hydration/'
    },
    accessLevel: 'pro'
  },
  {
    id: 'gerenciar_batch_diario',
    section: TutorialSection.TROUBLESHOOTING,
    title: 'Batch Management & Diary',
    image: 'placeholder_url_diario_batches.jpg',
    intro: '*Batch Diary* offers photo logging, parameters, rating, notes, consistency analysis.',
    why: '<ul><li>Transform experiment to learning.</li><li>Increase engagement.</li><li>Prepare for insights.</li></ul>',
    howTo: '<ol><li>Click "Save Batch".</li><li>Fill details.</li><li>See "Reports".</li><li>Use filters.</li></ol>',
    tips: [
      'Consistent photos.',
      'Apply tags.',
      'Export reports.'
    ],
    reference: {
      name: 'Production of pizza dough with reduced fermentation time',
      url: 'https://www.redalyc.org/pdf/3959/395940114010.pdf'
    },
    accessLevel: 'free'
  },
  {
    id: 'cadastro_farinhas_substituicoes',
    section: TutorialSection.INGREDIENTS,
    title: 'Flour Registration & Substitutions',
    image: 'placeholder_url_cadastro_farinhas.jpg',
    intro: 'Understanding flour is differentiator. Register "My Flour", enter technical values, activate "suggested substitution".',
    why: '<ul><li>Avoid "feeling" dependence.</li><li>Creates history.</li><li>Avoids purchase frustration.</li></ul>',
    howTo: '<ol><li>"Flour" module > "Add new".</li><li>Enter details.</li><li>Select in calculator.</li><li>Activate substitution.</li></ol>',
    tips: [
      'Test small batch.',
      'Update on bag change.',
      'Compare brands.'
    ],
    reference: {
      name: 'Milling Technology: Interpreting Functional Properties',
      url: 'https://www.cerealscanada.ca/wp-content/uploads/2020/05/Milling-Technology-Interpretation.pdf'
    },
    accessLevel: 'pro'
  },
  {
    id: 'sustentabilidade_impacto_ambiental',
    section: TutorialSection.ENVIRONMENT,
    title: 'Sustainability & Impact',
    image: 'placeholder_url_sustentabilidade_massas.jpg',
    intro: '*Environmental Impact* estimates CO₂/water, suggests local flours, long ferments, reuse.',
    why: '<ul><li>Conscious value.</li><li>Positive feeling.</li><li>Partnership potential.</li></ul>',
    howTo: '<ol><li>"Sustainability" > "Calculate".</li><li>Enter details.</li><li>See estimate.</li><li>Get suggestions.</li></ol>',
    tips: [
      'Local flour.',
      'Long ferment.',
      'Reuse scraps.'
    ],
    reference: {
      name: 'Effect of different producing methods on physicochemical properties of dough',
      url: 'https://www.sciencedirect.com/science/article/pii/S0889157523001424'
    },
    accessLevel: 'pro'
  },
  {
    id: 'assistente_voz_comandos',
    section: TutorialSection.TECHNIQUES,
    title: 'Voice Assistant & Commands',
    image: 'placeholder_url_assistente_voz.jpg',
    intro: 'Voice integration (Google, Siri) for hands-free commands.',
    why: '<ul><li>Practical usability.</li><li>Professional feel.</li><li>Retention.</li></ul>',
    howTo: '<ol><li>Settings > Voice > Activate.</li><li>Link assistant.</li><li>Use voice.</li><li>Save commands.</li></ol>',
    tips: [
      'Isolated environment.',
      'Short commands.',
      'Note usage.'
    ],
    reference: {
      name: 'Modernist Bread – Techniques & Equipment',
      url: 'https://modernistcuisine.com/books/modernist-bread/'
    },
    accessLevel: 'pro'
  },
  {
    id: 'leaderboard_desafios_comunidade',
    section: TutorialSection.FUNDAMENTALS,
    title: 'Leaderboard & Challenges',
    image: 'placeholder_url_leaderboard_desafios.jpg',
    intro: 'Gamification with *Leaderboard* and *Weekly Challenges*.',
    why: '<ul><li>Engagement.</li><li>Community feedback.</li><li>Social platform.</li></ul>',
    howTo: '<ol><li>Activate "Community Mode".</li><li>Complete challenge.</li><li>Climb leaderboard.</li><li>Check ranking.</li></ol>',
    tips: [
      'Compete with friends.',
      'Share badges.',
      'Notifications.'
    ],
    reference: {
      name: 'Serious Eats – The Pizza Lab: Three Doughs to Know',
      url: 'https://www.seriouseats.com/the-pizza-lab-three-doughs-to-know'
    },
    accessLevel: 'pro'
  }
];