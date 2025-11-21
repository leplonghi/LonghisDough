
import { Tutorial, TutorialSection, YeastType } from './types';

export const TUTORIALS: Tutorial[] = [
  {
    id: 'cold_fermentation',
    section: TutorialSection.FERMENTATION,
    title: 'Cold Fermentation (Cold Retard)',
    image: 'https://images.unsplash.com/photo-1627435199109-6_m8J4s_V-0?q=80&w=2070&auto=format&fit=crop',
    intro: 'Maturing dough in a refrigerated environment (typically 3-5°C for 12 to 72 hours) allows yeast to work slowly while enzymes like amylases and proteases break down proteins and starches more effectively.',
    why: '<ul><li>Allows for greater flavor and aroma development;</li><li>Relaxes the gluten network = better extensibility and less tearing;</li><li>More consistent and repeatable results, reducing guesswork.</li></ul>',
    howTo: '<ol><li>Weigh ingredients precisely.</li><li>Mix and ball the dough normally;</li><li>Place in a sealed container and refrigerate at 3-5°C for 12-72h;</li><li>Remove 1-2h before shaping to bring to room temperature.</li></ol>',
    tips: [
      'Avoid placing warm dough boxes directly in the fridge to prevent condensation;',
      'In summer (>28°C), mix in the morning and refrigerate immediately;',
      'Use strong flour (W ≥ 280) for best results with long fermentation.'
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
    title: 'Preferments: Biga vs Poolish',
    image: 'https://images.unsplash.com/photo-1594311242637-a2d2a4585c54?q=80&w=2070&auto=format&fit=crop',
    intro: 'Among the most used preferments by technical pizza makers are poolish (~100% hydration) and biga (~45-60% hydration) — each brings distinct characteristics to fermentation, flavor, and dough structure.',
    why: '<ul><li>Poolish favors a light, open crumb;</li><li>Biga favors strong structure and a chewy texture;</li><li>The technical choice changes flavor, texture, and handling behavior.</li></ul>',
    howTo: '<p>– For Poolish: mix 100% flour/water + tiny yeast, ferment 8-18h;<br>– For Biga: low hydration (~45-55%), ferment 12-24h or more, incorporate as ~20-50% of total flour.</p>',
    tips: [
      'If kneading by hand, poolish can be easier to incorporate;',
      'Avoid poolish in very hot environments without refrigeration or the usage window will be short;',
      'Biga requires good flour and strong gluten to support high hydration in the final dough.'
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
    why: '<ul><li>High hydration creates an extremely airy crumb;</li><li>Pan style favors generous portions;</li><li>Differs from Neapolitan in technique and equipment — giving enthusiasts a new dimension.</li></ul>',
    howTo: '<ol><li>Mix dough with ~65-70% hydration;</li><li>Ferment preferably with poolish or direct method, 18-24h;</li><li>Divide, place in oiled pan, stretch to corners;</li><li>Bake for 12-15 min in a very hot oven (~250-300°C).</li></ol>',
    tips: [
      'Use flour with protein ≥ 12.5% for better structure;',
      'Pan oiled with olive oil or neutral oil ensures crispy edges;',
      'If your oven is limited in temperature, increase bake time by 1-2 min and monitor the base.'
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
    intro: 'When entering the universe of pizza doughs with hydration above 70%, we enter a refined technique that requires sensitivity and pronounced knowledge, resulting in airy crumbs and light crusts.',
    why: '<ul><li>Higher hydration = more internal steam = more open crumb;</li><li>Relaxed gluten network favors expansion and light texture;</li><li>Technical differentiation: delivers "pro-like" results at home.</li></ul>',
    howTo: '<ol><li>Select desired hydration % (e.g., 72%).</li><li>The system recalculates water, salt, oil, and yeast.</li><li>Adopt the fold technique during bulk fermentation.</li><li>Prepare a well-floured bench and use a scraper to handle the dough.</li></ol>',
    tips: [
      'Use high-absorption flour or strong flour to support loose dough;',
      'In hot environments (> 28°C) reduce yeast or prolong fermentation;',
      'For limited ovens (< 300°C) prefer hydration between 65-67% for easier control.'
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
    title: 'Dough Temperature (DDT) – Control for Consistency',
    image: 'https://images.unsplash.com/photo-1594311242637-a2d2a4585c54?q=80&w=2070&auto=format&fit=crop',
    intro: 'Desired Dough Temperature (DDT) is the target temperature after mixing. Controlling it ensures consistent fermentation, regardless of weather or equipment variations.',
    why: '<ul><li>Without temperature control, fermentation can go off track — too fast or too slow.</li><li>Controlling DDT brings predictability and repeatability, key for technical-level results.</li><li>Teaching this concept raises the perceived value of the app beyond a "recipe generator".</li></ul>',
    howTo: '<ol><li>Measure flour and ambient temperature with a thermometer.</li><li>In the app, select "Temperature Adjustment" and enter values.</li><li>The system calculates the ideal water temperature.</li><li>Proceed to mix and record the result in the diary.</li></ol>',
    tips: [
      'A fast-reading digital thermometer speeds up the process.',
      'In environments >28°C, reduce yeast or increase bulk time.',
      'In cold environments, warm the flour or water initially to reach DDT target.'
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
    title: 'Baking Surfaces: Stone vs Steel',
    image: 'https://images.unsplash.com/photo-1594311242637-a2d2a4585c54?q=80&w=2070&auto=format&fit=crop',
    intro: 'The choice of surface (stone, steel) has a direct impact on crust and texture. Steel heats up faster, ideal for home ovens, while stone is better for extreme heat, preventing burnt bases.',
    why: '<ul><li>Steel = rapid heating, ideal for home ovens.</li><li>Stone = better for extreme heat and authentic styles.</li><li>Wrong choice leads to burnt bases or raw centers.</li></ul>',
    howTo: '<ol><li>In the equipment profile in the app, select your base.</li><li>Enter oven type and max temperature.</li><li>In the recipe, enable "Adapt to my base".</li><li>The calculator proposes adjustments automatically.</li></ol>',
    tips: [
      'Preheat the base for 30-40 min.',
      'In home ovens <300°C: choose steel to compensate for lower temperature.',
      'In ovens >400°C: use stone/biscotto to avoid burning the base.'
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
    intro: 'Managing a sourdough starter (levain) is a technical differentiator. The "My Levain" module allows you to register your culture, and the calculator uses this profile to adjust the recipe to your own starter.',
    why: '<ul><li>Levain contributes complex flavor and slower, controlled fermentation.</li><li>Recording culture data increases repeatability and reduces variability.</li><li>Integrating this data into the calculator reinforces the "accessible professional tool" proposition.</li></ul>',
    howTo: '<ol><li>Access My Levain → New profile: enter name, hydration, etc.</li><li>In the calculator, select "Use my Levain".</li><li>Enter desired levain % (e.g., 20%).</li><li>The tool updates hydration and bulk time automatically.</li></ol>',
    tips: [
      'In hot environments (> 28°C): decrease levain % to avoid accelerated fermentation.',
      'Use a clear jar to observe bubbles and growth before using.',
      'Record notes on the culture after each use to generate history and learning.'
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
    title: 'Toppings & Ratios: Beyond the Dough',
    image: 'https://images.unsplash.com/photo-1594311242637-a2d2a4585c54?q=80&w=2070&auto=format&fit=crop',
    intro: 'The "dough + topping" module expands the app\'s utility. It calculates the ideal amount of cheese, sauce, and toppings for your pizza style and size, turning the app into a complete tool.',
    why: '<ul><li>Well-dimensioned toppings ensure balance of flavor and texture.</li><li>Adding this functionality turns the app into a complete tool.</li><li>Increases retention: the user returns to adjust coverage and test variations.</li></ul>',
    howTo: '<ol><li>In Calculator select Pizza style.</li><li>Activate "Toppings" tab and enter number of pizzas.</li><li>The system shows suggested amounts.</li><li>Adjust % if you want and save as preset.</li></ol>',
    tips: [
      'In limited home oven (<300°C): prefer light toppings.',
      'Use sauce separately if you want crispier dough.',
      'In larger batches, use "Topping Report" to calculate cost and supplies.'
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
    title: 'Hydration and Gluten Network',
    image: 'https://images.unsplash.com/photo-1594311242637-a2d2a4585c54?q=80&w=2070&auto=format&fit=crop',
    intro: 'Hydration is the amount of liquid relative to flour. It activates the proteins that form gluten. The "Custom Hydration" mode allows full control over this crucial parameter.',
    why: '<ul><li>Hydration defines texture and crumb openness.</li><li>Strong gluten network depends on sufficient water.</li><li>Understanding hydration gives control and predictability to the dough.</li></ul>',
    howTo: '<ol><li>In the form, enter desired hydration %.</li><li>The app recalculates all other ingredients.</li><li>Observe consistency: looser dough indicates high hydration.</li><li>Monitor the "windowpane test" to evaluate gluten.</li></ol>',
    tips: [
      'If using whole wheat flour, increase hydration by +2% to +4%.',
      'Dough with > 80% hydration needs folds instead of kneading.',
      'Flour the bench well to handle very hydrated doughs.'
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
    intro: 'Problems like snap-back (dough shrinking) or gum line (raw base) are common. The "Rapid Diagnosis" module offers a checklist of symptoms and suggests automatic corrections.',
    why: '<ul><li>Dough problems cause frustration and app abandonment.</li><li>Accurate diagnosis strengthens retention and trust.</li><li>Technical adjustments reduce trial and error.</li></ul>',
    howTo: '<ol><li>Access Diagnosis and select the symptom.</li><li>The app displays probable causes and suggests an adjustment.</li><li>Apply the adjustment and save the learning.</li><li>Use history to avoid repeating the error.</li></ol>',
    tips: [
      'Always weigh ingredients — small errors affect the result.',
      'On hot days (>30°C), reduce yeast by –10%.',
      'Calibrate your oven before a big bake.'
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
    intro: 'Flour is the core of the dough. The "Flour Database" allows you to register brand, protein content, and consult data from other users. If your flour runs out, the app suggests an alternative and adjusts the recipe.',
    why: '<ul><li>Flour defines structure, texture, and stability.</li><li>Wrong substitution is a frequent cause of failure.</li><li>Having a database strengthens the community.</li></ul>',
    howTo: '<ol><li>Access Flour Database > Add new.</li><li>Enter brand, protein %, etc.</li><li>When creating a recipe, select your registered flour.</li><li>If unavailable, use the substitution suggestion.</li></ol>',
    tips: [
      'When testing a new flour, make a small batch and record the result.',
      'Whole wheat flours generally need +2-4% hydration.',
      'Use a precision scale for consistent data.'
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
    title: 'Scales, Precision & Baker’s Percentage',
    image: 'https://images.unsplash.com/photo-1594311242637-a2d2a4585c54?q=80&w=2070&auto=format&fit=crop',
    intro: 'Imprecision in measurements is a barrier to consistent results. Baker\'s percentage (flour = 100%) is the professional method for scaling and predicting results, and is available in the app.',
    why: '<ul><li>Baker\'s percentage brings clarity and scalability.</li><li>Precision with digital scales reduces errors.</li><li>Allows the enthusiast to work like a professional.</li></ul>',
    howTo: '<ol><li>In the calculator, activate "Baker\'s Percentage Mode".</li><li>Enter total flour (e.g., 1000g).</li><li>Use sliders for hydration, salt, oil, etc.</li><li>The calculator displays real weights and you can save the preset.</li></ol>',
    tips: [
      'Use a digital scale with 0.1g precision for yeast and salt.',
      'Keep the environment controlled to avoid external variables.',
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
    title: 'Guided Mode vs. Advanced Mode',
    image: 'https://images.unsplash.com/photo-1594311242637-a2d2a4585c54?q=80&w=2070&auto=format&fit=crop',
    intro: 'The app offers two modes: Guided, with automatic presets for quick use, and Advanced, which allows free alteration of all percentages for experimentation, accommodating both casual and technical users.',
    why: '<ul><li>Casual enthusiasts want simplicity.</li><li>Advanced users seek complete control.</li><li>Two modes prevent the app from being intimidating or too basic.</li></ul>',
    howTo: '<ol><li>Toggle between "Guided Mode" / "Advanced Mode".</li><li>In Guided: define only style, quantity, and weight.</li><li>In Advanced: all sliders (hydration, salt, etc.) are unlocked.</li><li>Save presets in both modes.</li></ol>',
    tips: [
      'Use tooltips to understand the difference between modes.',
      'The app saves your mode preference for next time.',
      'In Advanced Mode, there is a button to reset to the original preset.'
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
    intro: 'The "Reverse Mode" allows you to enter a fixed variable (e.g., 350g of starter, 1kg of flour) and the tool recalculates the other ingredients, adapting to real situations and reducing waste.',
    why: '<ul><li>Meets the real kitchen scenario: what do I have on hand?</li><li>Avoids waste and turns a problem into an opportunity.</li><li>Differentiates the app by functional and adaptive thinking.</li></ul>',
    howTo: '<ol><li>In the calculator, select "Reverse Mode" (Calculation by Flour).</li><li>Enter the parameter you know.</li><li>The system calculates the other ingredients.</li><li>Save this adapted recipe as a new batch.</li></ol>',
    tips: [
      'Use this mode for leftover levain or flour.',
      'Mark as "special batch" to help in history.',
      'Combine with the diary to see how many times this mode was used.'
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
    title: 'References & Credibility: Technical Basis',
    image: 'https://images.unsplash.com/photo-1594311242637-a2d2a4585c54?q=80&w=2070&auto=format&fit=crop',
    intro: 'For DoughLabPro to be perceived as a serious tool, every preset and tutorial is supported by real and verifiable references, conveying professionalism and trust.',
    why: '<ul><li>Users want proof that the technique works.</li><li>Transparency in sources increases credibility.</li><li>Helps create a technical and engaged community.</li></ul>',
    howTo: '<ol><li>In each preset/technique, we include a "Technical Reference" section.</li><li>In the "Learn" page, you can filter by "Validation".</li><li>We allow viewing the original source.</li><li>We add a "Technical Validation" badge for popular recipes.</li></ol>',
    tips: [
      'We use recognized sources: associations, magazines, and technical blogs.',
      'We update references periodically.',
      'We promote co-creation with experts who sign "certified" recipes.'
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
    intro: 'The "No-Knead" method gained popularity for facilitating high-level technical doughs with minimal effort. It uses high hydration (~75%) and long fermentations (12h or more) to align gluten automatically.',
    why: '<ul><li>Allows enthusiasts with less equipment to make sophisticated doughs.</li><li>More open crumb texture, crisper crust.</li><li>Elevates technique without complicating the interface.</li></ul>',
    howTo: '<ol><li>In advanced calculator mode, activate "No-Knead".</li><li>Enter high hydration (e.g., 70-75%).</li><li>Configure long fermentation (e.g., 12-24h).</li><li>Follow resting instructions and record result in diary.</li></ol>',
    tips: [
      'In hot environments (>28°C) reduce hydration ~2% to avoid overly fluid dough.',
      'Use a closed container to ferment to avoid dry crust.',
      'Make a small batch the first time to validate the process.'
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
    title: 'Scoring Techniques & Dough Expansion',
    image: 'https://images.unsplash.com/photo-1585399103509-24d119a9f11f?q=80&w=2070&auto=format&fit=crop',
    intro: 'Cutting the dough before baking (*scoring*) is not just aesthetic: it regulates where gas escapes, how the dough expands, and affects texture and crust.',
    why: '<ul><li>Controlling dough expansion prevents unwanted ruptures.</li><li>Allows differentiated aesthetics.</li><li>Helps create consistency in the final result.</li></ul>',
    howTo: '<ol><li>In "Techniques" module select "Scoring".</li><li>Choose pattern according to bread style.</li><li>Before baking, execute pattern with a blade.</li><li>In diary, mark which pattern used and evaluate result.</li></ol>',
    tips: [
      'Use sharp blade or *lame* for clean cuts.',
      'In high hydration doughs (>70%), prefer deeper cuts (~0.5 cm).',
      'Photograph from above after cutting to compare in next batches.'
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
    title: 'Baking Methods: Straight, Sponge, Sourdough',
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?q=80&w=2070&auto=format&fit=crop',
    intro: 'There are several preparation methods: *straight dough* (all together), *sponge & dough* (with preferment), or *sourdough* (starter). Each impacts time, flavor, and final texture.',
    why: '<ul><li>Method defines flavor, texture, and production rhythm.</li><li>Helps understand why some doughs "ask" for more time or technique.</li><li>Adds depth to the app and makes the user feel in control.</li></ul>',
    howTo: '<ol><li>In calculator, select "Dough Method".</li><li>Choose between Straight, Sponge or Sourdough.</li><li>System adjusts visible fields (e.g., % preferment for Sponge).</li><li>Execute process and record in diary.</li></ol>',
    tips: [
      'If you have less than 4h free, use Straight method.',
      'For more complex flavor, reserve 12-24h for Sponge or Sourdough.',
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
    intro: 'Studies analyze how masonry vs. home ovens impact baking time and texture. The app allows entering your oven type and base material to adapt the recipe to your reality.',
    why: '<ul><li>Understanding equipment leads to real consistency.</li><li>Users feel empowered with data, not just "generic recipe".</li><li>High perceived value means greater retention.</li></ul>',
    howTo: '<ol><li>In Oven settings, enter type, base, and temperature.</li><li>Enable "Baking Simulation" to see time/adjustment suggestions.</li><li>In diary, compare result with suggestion and adjust for next time.</li></ol>',
    tips: [
      'Home ovens < 300°C: increase preheat to >30 min.',
      'Steel base heats faster than stone — watch for burning base.',
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
    title: 'Cold Retard Fermentation & Flavor Profile',
    image: 'https://images.unsplash.com/photo-1627435199109-6_m8J4s_V-0?q=80&w=2070&auto=format&fit=crop',
    intro: 'Cold retard (low temperature fermentation) is used by professionals to develop flavor, structure, and aroma. The app guides you to configure the recipe for this advanced technique.',
    why: '<ul><li>Slow fermentation = greater flavor complexity.</li><li>User differentiates from basic quick dough practices.</li><li>Offers "professional level production" standard.</li></ul>',
    howTo: '<ol><li>In calculator, enable "Cold Retard".</li><li>Enter refrigeration time and temperature.</li><li>Engine adjusts yeast % and hydration.</li><li>After baking, save in diary and compare flavor/texture.</li></ol>',
    tips: [
      'Use a sealed container to avoid drying out the dough.',
      'If your fridge is >8°C, manually adjust condition.',
      'Make a test batch before adopting for full volume.'
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
    title: 'Yeasts: Types, Dosage, and Effects',
    image: 'https://images.unsplash.com/photo-1617470715842-9ebd65b8a03f?q=80&w=2070&auto=format&fit=crop',
    intro: 'Understanding yeast type (IDY, ADY, Levain) and dosage is vital for consistency. This guide helps you choose the correct type and dosage for your recipe.',
    why: '<ul><li>Incorrect dosage compromises texture.</li><li>User gains fine control over recipe.</li><li>Allows app to support batch scalability.</li></ul>',
    howTo: '<ol><li>In calculator, open "Yeast Type".</li><li>Choose between IDY, ADY, or Levain.</li><li>Enter suggested % or use default value.</li><li>After batch, record actual fermentation time and adjust % for next time.</li></ol>',
    tips: [
      'In hot environments (>30°C) reduce yeast ~10-20%.',
      'In cold environments (<18°C) warm water instead of increasing yeast.',
      'Keep a record in diary to evolve your personal factor.'
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
    title: 'Stretch & Fold Technique: Strength with Less Energy',
    image: 'https://images.unsplash.com/photo-1614532843595-3b74b1df092b?q=80&w=2070&auto=format&fit=crop',
    intro: 'The *stretch & fold* technique is effective for high hydration doughs, reinforcing gluten and creating large, stable bubbles with less effort than traditional kneading.',
    why: '<ul><li>Avoids excessive effort for those without mixers.</li><li>Improves texture of very hydrated doughs.</li><li>Offers an accessible professional technique.</li></ul>',
    howTo: '<ol><li>In calculator form enable "Use Stretch & Fold".</li><li>Enter number of cycles (e.g., 3-4 every 30 min).</li><li>Engine calculates time and recommended hydration.</li><li>Record in diary and compare with traditional kneading.</li></ol>',
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
    intro: 'Knowing your oven\'s exact profile makes a difference. The app allows you to register your equipment and, with the "Connected Profile", the calculator recommends hydration, oil, and baking time adjustments.',
    why: '<ul><li>Ensures recipe works in your oven.</li><li>Reduces frustration of successive attempts.</li><li>Elevates technical value of app for enthusiasts.</li></ul>',
    howTo: '<ol><li>In Settings > Oven Profile, enter your equipment data.</li><li>Start "Oven Test" in app to record actual time and temperature.</li><li>Enable "Auto-Base Adjustment" for calculator to adapt recipe.</li><li>In diary, mark "Used connected profile" to filter results.</li></ol>',
    tips: [
      'Preheat for at least 30 min.',
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
    intro: 'Learning from what went wrong is essential. The "Batch Diary" allows logging common errors (e.g., over-proof), associating them with parameters used, and analyzing patterns to improve consistently.',
    why: '<ul><li>Learning from errors differentiates hobby from technique.</li><li>Creates daily recording habit, generating retention.</li><li>Prepares data for future "insights" functionalities.</li></ul>',
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
    intro: 'Baker\'s percentage allows scaling recipes precisely. The "Batch Scale Mode" recalculates all ingredients and parameters, ensuring quality is maintained in larger batches.',
    why: '<ul><li>Maintains consistency when producing at larger scale.</li><li>Increases app value for semi-professional environments.</li><li>Avoids ratio errors in large batches.</li></ul>',
    howTo: '<ol><li>In calculator, select "Batch Scale Mode".</li><li>Enter target flour weight (e.g., 5000 g).</li><li>Maintain or adjust percentages.</li><li>System recalculates everything for you.</li><li>Save as batch and record result.</li></ol>',
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
    title: 'Long-Term Fermentation: "Sour Ferment"',
    image: 'https://images.unsplash.com/photo-1594311242637-a2d2a4585c54?q=80&w=2070&auto=format&fit=crop',
    intro: 'Fermenting for 48h or more allows greater flavor development and starch breakdown. The app teaches enabling "Ultra Long Fermentation Mode" and adjusts recipe for this advanced technique.',
    why: '<ul><li>More complex flavor, better alveoli crumb, and improved digestibility.</li><li>Perfect for enthusiasts wanting premium artisanal results.</li><li>High perceived value for the app.</li></ul>',
    howTo: '<ol><li>In calculator, enable "Fermentation > 24h".</li><li>Adjust time and mode (e.g., cold/refrigeration).</li><li>System suggests yeast and hydration adjustments.</li><li>Execute and record dough photos and flavor/texture notes.</li></ol>',
    tips: [
      'Use a transparent container to observe gas bubbles.',
      'In large batches, ensure temperature control.',
      'Compare a normal batch vs. an ultra-fermented one to feel the difference.'
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
    intro: 'Natural fermentation via levain brings flavor and technical complexity. The app guides you in activating "Levain Mode", allowing you to register your culture and connect with the diary for a complete history.',
    why: '<ul><li>Artisanal value and flavor differential.</li><li>User feels the app accompanies their personal cultivation.</li><li>Facilitates transition from enthusiast to micro-entrepreneur.</li></ul>',
    howTo: '<ol><li>In "Levain Culture", register your starter.</li><li>In calculator choose "Natural Fermentation (Levain)" and enter %.</li><li>Engine adjusts hydration/time according to your levain profile.</li><li>Record batch, log levain vigor, and evaluate result.</li></ol>',
    tips: [
      'Use a transparent jar to observe levain activity.',
      'Feed levain at same time consistently.',
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
    title: 'Micro-Batch Mode: Bake 1 or 2 Units with Precision',
    image: 'https://images.unsplash.com/photo-1528731708534-816fe59f90cb?q=80&w=2070&auto=format&fit=crop',
    intro: 'The *Micro-Batch* mode allows making 1 or 2 pizzas/loaves accurately using volume measurements (cups/spoons), ideal for those without precision scales or wanting smaller batches.',
    why: '<ul><li>Expands user base to enthusiasts with less equipment.</li><li>Increases daily app usage, not just for large productions.</li><li>Facilitates habit of practicing.</li></ul>',
    howTo: '<ol><li>In calculator select "Micro-Batch Mode".</li><li>Choose size (1 pizza or 2 loaves).</li><li>App swaps units to volume and adjusts recipe.</li><li>Save "Mini Batch" preset for quick repetition.</li></ol>',
    tips: [
      'Use measuring cups if no scale available.',
      'Prefer known brand ingredients to minimize variation.',
      'Compare result vs. larger batch to calibrate your palate.'
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
    intro: 'Photographing dough, crumb, and crust provides visual data to calibrate parameters. The app integrates "Add Technical Photo" to diary to generate visual evolution charts.',
    why: '<ul><li>Allows seeing concrete progress, which is more motivating.</li><li>Helps quick identification of visual problems.</li><li>Differentiates app as visual learning tool.</li></ul>',
    howTo: '<ol><li>In diary, when saving a batch, select "Add Technical Photo".</li><li>Take photos of dough ball, crust, and cross-section crumb.</li><li>App analyzes and generates an "indicator" (e.g., % alveoli).</li><li>Compare with previous batches and visualize evolution.</li></ol>',
    tips: [
      'Use consistent lighting for visual comparisons.',
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
    title: 'Preferments: Poolish, Biga, and Sponge',
    image: 'placeholder_url_prefermentos.jpg',
    intro: 'Preferments — like Poolish, Biga, and Sponge — are techniques widely used by bakers to generate more complex flavors, damage gluten network less, and improve dough texture. As per PizzaBlab guide, these methods involve mixing a portion of flour and water (± minimal yeast) and fermenting for 6-24h before incorporating into final dough.',
    why: '<ul><li>Generates deeper flavor by allowing lactic bacteria action before final dough.</li><li>Allows lighter dough or more open crumb, depending on technique choice.</li><li>Elevates enthusiast from "dough maker" to "dough engineer".</li></ul>',
    howTo: '<ol><li>In calculator, select "With Preferment" technique.</li><li>Choose type (Poolish/Biga).</li><li>Enter % of flour in preferment (e.g., 30%).</li><li>App automatically calculates flour/water/yeast of preferment and final dough.</li><li>Save as preset or batch.</li></ol>',
    tips: [
      'In hot environment (>28°C): reduce % preferment or decrease yeast in preferment.',
      'Observe visible bubbles in preferment — if over-fermented, excessive acidity can affect color and flavor.',
      'Record in diary amount of preferment + result for future comparisons.'
    ],
    reference: {
      name: 'The Complete Guide to Preferment in Pizza Dough',
      url: 'https://www.pizzablab.com/learning-and-resources/general-articles/guide-to-preferments/'
    },
    accessLevel: 'pro'
  },
  {
    id: 'mixing_times',
    section: TutorialSection.TECHNIQUES,
    title: 'Mixing and Kneading Times: Impact on Dough',
    image: 'placeholder_url_mistura_amassamento.jpg',
    intro: 'The mixing/kneading phase defines gluten network formation, protein alignment, and gas bubbles, affecting how dough rises and bakes. According to academic review on mixing in fermented foods, shear forces and flow patterns influence aroma, texture, and final quality.',
    why: '<ul><li>Under-developing gluten → dough tears or doesn\'t rise properly.</li><li>Over-mixing → dough too elastic, hard to open, and tight crumb.</li><li>Controlling this variable helps repeat recipes accurately.</li></ul>',
    howTo: '<ol><li>In calculator, open "Time/Folds" option.</li><li>Select kneading technology (hand/mixer).</li><li>Go to advanced mode to adjust minutes or folds.</li><li>Execute and save result in diary to compare performance.</li></ol>',
    tips: [
      'In high protein flours (>13%), prefer shorter kneading time to avoid toughening.',
      'Doing autolyse before (20-30 min) reduces need for intense kneading.',
      'Use thermometer: if dough heats > ~28°C in mixing, reduce time or add ice.'
    ],
    reference: {
      name: 'Impact of Mixing on Flavor and Aroma Development in Fermented Foods',
      url: 'https://arxiv.org/abs/2412.10190'
    },
    accessLevel: 'pro'
  },
  {
    id: 'env_temp_humidity_control',
    section: TutorialSection.ENVIRONMENT,
    title: 'Temperature & Humidity Control',
    image: 'placeholder_url_controle_ambiente_massa.jpg',
    intro: 'The temperature and humidity of the environment where dough is prepared and fermented have direct impact on fermentation, bubble growth, enzymatic maturation, and final flavor. The app helps adjust recipe to compensate these variations.',
    why: '<ul><li>Dough in hot environment ferments too fast → can lose structure or flavor.</li><li>Cold environment → slow fermentation, risk of under-rise or dense texture.</li><li>Adjusting with data increases precision and avoids "it depends" errors.</li></ul>',
    howTo: '<ol><li>Use thermometer to measure room temp and flour temp.</li><li>In app, select "Environment" and enter values.</li><li>System suggests or auto-adjusts: water temp / yeast % / bulk time.</li><li>Save condition in diary and track variations.</li></ol>',
    tips: [
      'In environments > 30°C, add ice to water or reduce yeast ~10-20%.',
      'In dry climates (<30% RH), reduce hydration by ~2% to compensate faster absorption.',
      'Save history of environment vs. result to build personal standard.'
    ],
    reference: {
      name: 'Hydration in Bread Dough, explained',
      url: 'https://www.kingarthurbaking.com/blog/2023/01/11/bread-hydration'
    },
    accessLevel: 'pro'
  },
  {
    id: 'baking_methods_surfaces',
    section: TutorialSection.TECHNIQUES,
    title: 'Baking Methods & Oven Surfaces',
    image: 'placeholder_url_forno_superficie.jpg',
    intro: 'Oven type and baking surface (stone, steel, deck) radically change dough behavior. The app allows adjusting your oven profile and calculator suggests recipe adjustments to adapt to your reality.',
    why: '<ul><li>A "universal" recipe ignores critical oven variables.</li><li>Adapting baking to your equipment maximizes texture and crispness.</li><li>Empowers user to get pizzeria results in home oven.</li></ul>',
    howTo: '<ol><li>In user profile, register your oven: type, max °C, base (steel/stone).</li><li>In calculator, select your oven and app auto-adjusts parameters.</li><li>After baking, record result for history and future adjustments.</li></ol>',
    tips: [
      'In home oven ≤ 300°C: increase oil (~1%) and reduce hydration ~2%.',
      'Wood-fired pizza 485°C: hydration ~60-62%, low conductivity stone base.',
      'Check if stone or steel are properly preheated for ≥30 min.'
    ],
    reference: {
      name: 'The Physics of baking good Pizza',
      url: 'https://arxiv.org/abs/1806.08790'
    },
    accessLevel: 'pro'
  },
  {
    id: 'autolyse_technique',
    section: TutorialSection.TECHNIQUES,
    title: 'Autolyse Technique – Increasing Extensibility and Volume',
    image: 'placeholder_url_autolyse.jpg',
    intro: 'Autolyse consists of mixing only flour and water, resting, and only then adding salt and yeast. This pause allows gluten to develop with less kneading, resulting in more extensible dough.',
    why: '<ul><li>Facilitates handling of high hydration doughs.</li><li>Reduces need for prolonged kneading.</li><li>Increases volume and crumb texture without changing formula.</li></ul>',
    howTo: '<ol><li>Activate "Use Autolyse" in calculator.</li><li>Enter desired autolyse time (e.g., 30 min).</li><li>App adjusts process and displays rest instructions before kneading.</li><li>Record result in diary and compare with non-autolyse versions.</li></ol>',
    tips: [
      'In high W flours (>300): 40-45 min autolyse can improve structure.',
      'If environment is cold (<20°C): warm water a few degrees.',
      'Use closed container to avoid drying out.'
    ],
    reference: {
      name: 'Raymond Calvel – The Taste of Bread',
      url: 'https://en.wikipedia.org/wiki/Raymond_Calvel'
    },
    accessLevel: 'free'
  },
  {
    id: 'tangzhong_yudane',
    section: TutorialSection.TECHNIQUES,
    title: 'Tangzhong/Yudane Technique for Enriched Doughs',
    image: 'placeholder_url_tangzhong.jpg',
    intro: 'Tangzhong (or Yudane) technique involves cooking part of the flour with water/milk at ~65°C to form a gel. Added to dough, allows greater liquid absorption, softness, and longer freshness.',
    why: '<ul><li>Allows increasing hydration without making dough uncontrollable.</li><li>Hybrid pizza profiles (e.g., bread-style rim) benefit.</li><li>Differentiates app with an advanced technique.</li></ul>',
    howTo: '<ol><li>In calculator, check "Use Tangzhong".</li><li>Enter % flour to use in tangzhong (e.g., 20%).</li><li>App calculates and adjusts final dough hydration.</li><li>Save result and record perceived improvements.</li></ol>',
    tips: [
      'Ideal for doughs with oil or butter (>2%).',
      'Keep rest of dough hydration balanced.',
      'Tangzhong tends to darken crust faster.'
    ],
    reference: {
      name: 'Tangzhong – Technique of Making Yeast Dough',
      url: 'https://en.wikipedia.org/wiki/Tangzhong'
    },
    accessLevel: 'pro'
  },
  {
    id: 'adaptive_reverse_mode',
    section: TutorialSection.TECHNIQUES,
    title: 'Adaptive Reverse Mode: Bake with What You Have',
    image: 'placeholder_url_modo_reverso_adaptativo2.jpg',
    intro: 'For enthusiasts who already have a fixed ingredient (like 300g levain), "Reverse Mode" allows entering this parameter and automatically calculating the rest of the recipe, avoiding waste.',
    why: '<ul><li>Solves real kitchen scenario "what do I have on hand?".</li><li>Increases user retention.</li><li>Creates competitive differential against simple calculators.</li></ul>',
    howTo: '<ol><li>Select "Reverse Mode" in calculator.</li><li>Enter known parameter.</li><li>System recalculates remaining ingredients.</li><li>Save as new preset or batch.</li></ol>',
    tips: [
      'Use for leftover levain, flour, or limited times.',
      'Mark in diary "Used Reverse Mode" to consult frequently.',
      'Observe patterns to calibrate personally.'
    ],
    reference: {
      name: 'MyPizzaCorner – Common Dough Problems and How to Fix Them',
      url: 'https://mypizzacorner.com/pizza-tips/pizza-dough-problems/'
    },
    accessLevel: 'pro'
  },
  {
    id: 'high_hydration_techniques',
    section: TutorialSection.INGREDIENTS,
    title: 'High Hydration: Techniques for Open Crumb and Light Texture',
    image: 'placeholder_url_alta_hidracao.jpg',
    intro: 'Doughs with elevated hydration (> 70%) offer more open crumbs and light texture, but require good handling and quality flour. This card addresses context, risks, and recommended adjustments.',
    why: '<ul><li>Technical improvement for those seeking pizzaiolo level.</li><li>Increases satisfaction and "pride of result".</li><li>Allows app differentiation.</li></ul>',
    howTo: '<ol><li>In advanced mode, activate "Free Hydration" and enter value.</li><li>App automatically adjusts recommendations.</li><li>Follow handling instructions (autolyse, folds).</li><li>Save result, record, and compare.</li></ol>',
    tips: [
      'Using strong flour (>13% protein) and powerful oven (>400°C) facilitates.',
      'In limited home oven, prefer 66-68%.',
      'Document each bake to understand your kitchen\'s tolerance.'
    ],
    reference: {
      name: 'Baking Science: Dough Hydration',
      url: 'https://beginwithbutter.com/baking-science-dough-hydration/'
    },
    accessLevel: 'pro'
  },
  {
    id: 'batch_diary_management',
    section: TutorialSection.TROUBLESHOOTING,
    title: 'Batch Management & Baking Diary',
    image: 'placeholder_url_diario_batches.jpg',
    intro: 'The *Batch Diary* module offers photo logging, parameters, rating, and notes, with automatic consistency analysis to transform experimentation into learning.',
    why: '<ul><li>Transform experimentation into learning and repeatability.</li><li>Increase user engagement.</li><li>Prepare base for advanced "insights" modules.</li></ul>',
    howTo: '<ol><li>After finishing, click "Save Batch".</li><li>Fill in photo, rating, and notes.</li><li>Periodically, access "Reports" to see charts.</li><li>Use filters to identify best parameters.</li></ol>',
    tips: [
      'Use consistent photos for visual comparisons.',
      'Apply tags ("error: over-proof") for quick filter.',
      'Export quarterly report to see progress.'
    ],
    reference: {
      name: 'Production of pizza dough with reduced fermentation time',
      url: 'https://www.redalyc.org/pdf/3959/395940114010.pdf'
    },
    accessLevel: 'free'
  },
  {
    id: 'flour_registration',
    section: TutorialSection.INGREDIENTS,
    title: 'Flour Registration & Smart Substitutions',
    image: 'placeholder_url_cadastro_farinhas.jpg',
    intro: 'Understanding your flour is a differentiator. The app allows registering "My Flour", entering technical values, and activating "suggested substitution" if your brand is unavailable.',
    why: '<ul><li>Without knowing your flour, you depend on "feeling".</li><li>Registration creates history and premium perceived value.</li><li>Substitutions avoid frustration at purchase time.</li></ul>',
    howTo: '<ol><li>Access "Flour" module > "Add new".</li><li>Enter brand, batch, % protein, etc.</li><li>In calculator, select registered flour.</li><li>Activate "Automatically substitute with similar".</li></ol>',
    tips: [
      'Test new flour with small batch.',
      'Update batch when changing flour bag.',
      'Compare brands and save rating in diary.'
    ],
    reference: {
      name: 'Milling Technology: Interpreting Functional Properties',
      url: 'https://www.cerealscanada.ca/wp-content/uploads/2020/05/Milling-Technology-Interpretation.pdf'
    },
    accessLevel: 'pro'
  },
  {
    id: 'sustainability_impact',
    section: TutorialSection.ENVIRONMENT,
    title: 'Sustainability & Environmental Impact in Dough',
    image: 'placeholder_url_sustentabilidade_massas.jpg',
    intro: 'The *Environmental Impact* module estimates CO₂ and water per batch, gives suggestions for local flours, long fermentations (less energy), and reusing leftovers.',
    why: '<ul><li>Differentiate app with value aligned to conscious consumption.</li><li>User feels good seeing positive impact.</li><li>Can open path for partnerships with sustainable brands.</li></ul>',
    howTo: '<ol><li>In "Sustainability" module, activate "Calculate impact".</li><li>Enter ingredients and origin.</li><li>System calculates impact estimate.</li><li>Receive improvement suggestions.</li></ol>',
    tips: [
      'Use locally sourced flour to reduce transport impact.',
      'Do long fermentations for lower energy consumption.',
      'Reuse dough scraps for new products.'
    ],
    reference: {
      name: 'Effect of different producing methods on physicochemical properties of dough',
      url: 'https://www.sciencedirect.com/science/article/pii/S0889157523001424'
    },
    accessLevel: 'pro'
  },
  {
    id: 'voice_assistant',
    section: TutorialSection.TECHNIQUES,
    title: 'Voice Assistant & Kitchen Commands',
    image: 'placeholder_url_assistente_voz.jpg',
    intro: 'Integration with voice assistants (Google, Siri) allows commands like "next step" or "bulk time remaining", ideal for when your hands are in the dough.',
    why: '<ul><li>Increases practical usability.</li><li>Strengthens perception of "professional level tool".</li><li>Increases retention as app accompanies production.</li></ul>',
    howTo: '<ol><li>In Settings > Voice Assistant > Activate.</li><li>Link assistant and record custom commands.</li><li>During production, use voice to advance steps or add notes.</li><li>Save favorite commands.</li></ol>',
    tips: [
      'Use microphone in isolated environment to avoid accidental triggers.',
      'Record short and clear commands.',
      'Note how often used voice mode and see if it speeds up process.'
    ],
    reference: {
      name: 'Modernist Bread – Techniques & Equipment',
      url: 'https://modernistcuisine.com/books/modernist-bread/'
    },
    accessLevel: 'pro'
  },
  {
    id: 'leaderboard_challenges',
    section: TutorialSection.FUNDAMENTALS,
    title: 'Leaderboard & Community Weekly Challenges',
    image: 'placeholder_url_leaderboard_desafios.jpg',
    intro: 'Gamification with *Batch Leaderboard* and *Weekly Challenges* makes app more engaging, with progress badges and point ranking to motivate daily production.',
    why: '<ul><li>Continuous engagement: users return to compete and learn.</li><li>Community creates feedback loop.</li><li>Elevates app from utility to social platform.</li></ul>',
    howTo: '<ol><li>Activate "Community Mode" in profile.</li><li>Complete first weekly challenge.</li><li>Climb leaderboard and earn first badge.</li><li>Consult ranking and compare points with community.</li></ol>',
    tips: [
      'Encourage friends to compete.',
      'Offer visual badges to share on Instagram.',
      'Use notifications to remind of challenges.'
    ],
    reference: {
      name: 'Serious Eats – The Pizza Lab: Three Doughs to Know',
      url: 'https://www.seriouseats.com/the-pizza-lab-three-doughs-to-know'
    },
    accessLevel: 'pro'
  }
];
