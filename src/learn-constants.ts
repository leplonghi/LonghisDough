

import { Tutorial, TutorialSection, YeastType } from './types';

export const TUTORIALS: Tutorial[] = [
  {
    id: 'maturacao_fria',
    section: TutorialSection.FERMENTATION,
    title: 'Cold Fermentation: Why and How',
    image: 'https://images.unsplash.com/photo-1627435199109-6_m8J4s_V-0?q=80&w=2070&auto=format&fit=crop',
    intro: 'Dough maturation in a refrigerated environment (typically 3-5°C for 12 to 72 hours) allows yeast to work more slowly while enzymes in the flour—amylases and proteases—break down protein and starch complexes more effectively.',
    why: '<ul><li>Allows for greater flavor and aroma development.</li><li>Relaxes the gluten network, improving extensibility and reducing tearing risk.</li><li>Provides more consistent and repeatable results, reducing guesswork.</li></ul>',
    howTo: '<ol><li>Use a scale to weigh ingredients precisely.</li><li>Mix and ball the dough normally.</li><li>Place in a sealed container and refrigerate at 3-5°C for 12-72h.</li><li>Remove 1-2h before opening on the workbench to bring to room temp.</li></ol>',
    tips: [
      'Avoid putting warm dough boxes directly in the fridge to prevent condensation.',
      'In hot environments (>28°C), mix in the morning and refrigerate immediately.',
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
    title: 'Preferments: Biga vs Poolish – The Technical Choice',
    image: 'https://images.unsplash.com/photo-1594311242637-a2d2a4585c54?q=80&w=2070&auto=format&fit=crop',
    intro: 'Among the most used preferments by technical pizza makers are Poolish (~100% hydration) and Biga (~45-60% hydration). Each brings distinct characteristics to fermentation, flavor, and dough structure.',
    why: '<ul><li>Poolish favors a light, more open crumb.</li><li>Biga favors a strong structure and chewy texture.</li><li>The choice changes flavor profile, texture, and handling.</li></ul>',
    howTo: '<p>– For Poolish: Mix 100% flour/water + small amount of yeast, ferment 8-18h.<br>– For Biga: Low hydration (~45-55%), ferment 12-24h, incorporate as ~20% of total flour.</p>',
    tips: [
      'If kneading by hand, Poolish is easier to incorporate.',
      'Avoid Poolish in very hot environments without refrigeration as it degrades quickly.',
      'Biga requires strong flour to support the fermentation structure.'
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
    title: 'Detroit Style Pizza: A Complete Guide',
    image: 'https://images.unsplash.com/photo-1633342537224-3c6c5233fe2a?q=80&w=2070&auto=format&fit=crop',
    intro: 'Detroit Style pizza is known for its high hydration dough baked in rectangular steel pans with high edges, cheese spread to the perimeter, and an airy texture.',
    why: '<ul><li>High hydration yields an extremely airy crumb.</li><li>The pan style creates caramelized cheese edges (frico).</li><li>Differs from Neapolitan in technique and equipment.</li></ul>',
    howTo: '<ol><li>Mix dough with ~65-75% hydration.</li><li>Ferment using direct method or poolish for 18-24h.</li><li>Place in oiled pan and stretch to corners.</li><li>Bake for 12-15 min in a hot oven (~260°C).</li></ol>',
    tips: [
      'Use high-protein bread flour (≥ 12.5%) for structure.',
      'Grease the pan generously with oil for a fried bottom crust.',
      'If using a home oven, bake on the bottom rack to ensure crispness.'
    ],
    reference: {
      name: "Ooni Blog – Detroit Style Pizza",
      url: "https://ooni.com/blogs/ooni-insights/pizza-dough-hydration-explained"
    },
    accessLevel: 'pro',
    calculatorAction: {
        mode: 'basic',
        presetId: 'pizza_detroit'
    }
  },
  {
    id: 'hidratacao_alta',
    section: TutorialSection.INGREDIENTS,
    title: 'High Hydration: 70%+ in Pizza Dough',
    image: 'https://images.unsplash.com/photo-1594311242637-a2d2a4585c54?q=80&w=2070&auto=format&fit=crop',
    intro: 'Entering the world of >70% hydration requires refined technique and sensitivity, resulting in highly aerated crumbs and light crusts.',
    why: '<ul><li>Higher hydration = more steam = more open alveoli.</li><li>Relaxed gluten network favors expansion.</li><li>Delivers professional-level lightness.</li></ul>',
    howTo: '<ol><li>Select desired hydration % (e.g., 72%).</li><li>Use the "Coil Fold" technique during bulk fermentation.</li><li>Handle gently on a well-floured surface.</li><li>Bake at high temperature to spring quickly.</li></ol>',
    tips: [
      'Use high absorption flour (W300+) to hold the water.',
      'In hot environments (>28°C), use cold water to slow fermentation.',
      'For home ovens, stick to 65-68% hydration for easier handling.'
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
    id: 'ddt_controle',
    section: TutorialSection.ENVIRONMENT,
    title: 'Desired Dough Temperature (DDT) Control',
    image: 'https://images.unsplash.com/photo-1594311242637-a2d2a4585c54?q=80&w=2070&auto=format&fit=crop',
    intro: 'DDT is the target temperature of your dough after mixing. Controlling it ensures consistent fermentation rates regardless of the season.',
    why: '<ul><li>Without temperature control, fermentation is unpredictable.</li><li>DDT brings consistency and repeatability.</li><li>Crucial for timing your bake schedule perfectly.</li></ul>',
    howTo: '<ol><li>Measure flour and room temperature.</li><li>Use the app\'s DDT logic to calculate water temp.</li><li>Adjust water temperature (use ice if needed).</li><li>Mix and verify final temp with a probe thermometer.</li></ol>',
    tips: [
      'Target 23-25°C for most doughs.',
      'In summer, chill your flour or use ice water.',
      'Friction from mixing adds heat; account for your mixer type.'
    ],
    reference: {
      name: 'The Perfect Loaf – Importance of Dough Temperature',
      url: 'https://www.theperfectloaf.com/the-importance-of-dough-temperature-in-baking/',
    },
    accessLevel: 'pro',
    calculatorAction: {
      mode: 'advanced',
    },
  },
  {
    id: 'superficies_assamento',
    section: TutorialSection.TECHNIQUES,
    title: 'Baking Surfaces: Stone vs Steel',
    image: 'https://images.unsplash.com/photo-1594311242637-a2d2a4585c54?q=80&w=2070&auto=format&fit=crop',
    intro: 'The surface you bake on dictates heat transfer. Steel conducts faster (good for home ovens), while stone/biscotto is gentler (good for high heat).',
    why: '<ul><li>Steel: Fast heat transfer, great for 250-300°C ovens.</li><li>Stone: Balanced heat, standard for deck ovens.</li><li>Biscotto: Low conductivity, essential for 485°C Neapolitan ovens.</li></ul>',
    howTo: '<ol><li>Identify your oven type.</li><li>If home oven (max 250°C), get a Baking Steel.</li><li>If high-temp oven (>400°C), use a stone or Saputo biscotto.</li><li>Preheat the surface for at least 45-60 minutes.</li></ol>',
    tips: [
      'Steel can burn bottoms if used above 350°C.',
      'Thicker stones retain more heat for consecutive bakes.',
      'Never wash a hot stone with water (it will crack).'
    ],
    reference: {
      name: 'PizzaBlab – Steel vs. Stone for Pizza Surfaces',
      url: 'https://www.pizzablab.com/learning-and-resources/baking/pizza-baking-surfaces-guide/',
    },
    accessLevel: 'pro',
  },
  {
    id: 'gestao_levain',
    section: TutorialSection.FERMENTATION,
    title: 'Sourdough Management & Integration',
    image: 'https://images.unsplash.com/photo-1594311242637-a2d2a4585c54?q=80&w=2070&auto=format&fit=crop',
    intro: 'Using natural leaven (sourdough/levain) adds complexity and digestibility. The "My Levain" module helps you track and integrate it into recipes.',
    why: '<ul><li>Complex flavor profile from wild yeast and bacteria.</li><li>Improved digestibility and keeping quality.</li><li>Personalizes your product uniquely.</li></ul>',
    howTo: '<ol><li>Register your starter in "Levain Pet".</li><li>In calculator, select "My Levain" as yeast type.</li><li>Input percentage (e.g., 20%).</li><li>App adjusts water/flour in final dough automatically.</li></ol>',
    tips: [
      'Feed starter at peak activity for sweet, active dough.',
      'Use a stiff starter (Liebig) for panettone or strong breads.',
      'Track feeding ratios (1:2:2 vs 1:5:5) to control acidity.'
    ],
    reference: {
      name: 'King Arthur Baking – Sourdough Guide',
      url: 'https://www.kingarthurbaking.com/learn/guides/sourdough',
    },
    accessLevel: 'pro',
    calculatorAction: {
      mode: 'advanced',
      yeastType: YeastType.USER_LEVAIN
    }
  },
  {
    id: 'recheios_proporcoes',
    section: TutorialSection.TECHNIQUES,
    title: 'Toppings & Ratios: Balancing the Pizza',
    image: 'https://images.unsplash.com/photo-1594311242637-a2d2a4585c54?q=80&w=2070&auto=format&fit=crop',
    intro: 'A great dough can be ruined by overloading. This guide covers ideal sauce-to-cheese ratios for different styles.',
    why: '<ul><li>Ensures proper bake (no soggy center).</li><li>Balances flavors (salt, acid, fat).</li><li>Professional consistency in every slice.</li></ul>',
    howTo: '<ol><li>Check the "Toppings" tab in the Style Guide.</li><li>Weigh your cheese and sauce.</li><li>Distribute evenly, leaving the rim clear (for Neapolitan).</li><li>For Neapolitan: ~80g sauce, ~100g cheese.</li></ol>',
    tips: [
      'Less is more. Allow the dough flavor to shine.',
      'Drain wet mozzarella to prevent soupiness.',
      'Add delicate herbs (basil) post-bake.'
    ],
    reference: {
      name: 'Serious Eats – The Pizza Lab: Sauce-to-Cheese Ratios',
      url: 'https://www.seriouseats.com/pizza-lab-sauce-cheese-ratios-build-tips-4167416',
    },
    accessLevel: 'pro',
  },
  {
    id: 'hidratacao_gluten',
    section: TutorialSection.INGREDIENTS,
    title: 'Hydration & Gluten Science',
    image: 'https://images.unsplash.com/photo-1594311242637-a2d2a4585c54?q=80&w=2070&auto=format&fit=crop',
    intro: 'Water activates gluten. Understanding how hydration affects gluten structure is key to mastering open crumb.',
    why: '<ul><li>Water allows gluten proteins to slide and align.</li><li>More water = more steam = more lift (oven spring).</li><li>High hydration requires gentle handling to keep gas.</li></ul>',
    howTo: '<ol><li>Start with 60-65% hydration to master kneading.</li><li>Move to 70%+ once comfortable with sticky dough.</li><li>Use autolyse to help gluten formation.</li><li>Use folds instead of kneading for wet doughs.</li></ol>',
    tips: [
      'Whole wheat drinks more water; increase hydration.',
      'Salt tightens gluten; water relaxes it.',
      'Use wet hands to handle high hydration dough.'
    ],
    reference: {
      name: 'BakerPedia – Gluten Hydration',
      url: 'https://bakerpedia.com/processes/gluten-hydration/',
    },
    accessLevel: 'free',
  },
  {
    id: 'troubleshooting_massa',
    section: TutorialSection.TROUBLESHOOTING,
    title: 'Dough Troubleshooting: Common Faults',
    image: 'https://images.unsplash.com/photo-1594311242637-a2d2a4585c54?q=80&w=2070&auto=format&fit=crop',
    intro: 'Sticky dough? Dense crumb? Pale crust? Diagnose and fix common pizza problems.',
    why: '<ul><li>Identify root causes (fermentation, hydration, heat).</li><li>Stop repeating the same mistakes.</li><li>Learn to adjust variables on the fly.</li></ul>',
    howTo: '<ol><li>Identify the symptom (e.g., "Dough snaps back").</li><li>Check the Troubleshooting guide.</li><li>Apply the fix (e.g., "Rest dough 20 mins").</li><li>Note the change in your journal.</li></ol>',
    tips: [
      'Snap-back = Gluten too tight. Let it rest.',
      'Sticky = Too much water or under-kneaded.',
      'Pale = Undercooked or over-fermented (no sugar left).',
      'Dense = Under-fermented or dead yeast.'
    ],
    reference: {
      name: 'Pizza Today – Troubleshooting Pizza Dough',
      url: 'https://pizzatoday.com/news/troubleshooting-your-pizza-dough-a-guide-to-making-pizza-better/147346/',
    },
    accessLevel: 'pro',
  },
  {
    id: 'banco_farinhas',
    section: TutorialSection.INGREDIENTS,
    title: 'Flour Library & Characteristics',
    image: 'https://images.unsplash.com/photo-1594311242637-a2d2a4585c54?q=80&w=2070&auto=format&fit=crop',
    intro: 'Not all flours are created equal. Protein content (W), P/L ratio, and absorption vary wildly.',
    why: '<ul><li>00 Flour is for high heat; Bread Flour for home ovens.</li><li>Protein % dictates gluten potential.</li><li>Using the wrong flour causes tearing or toughness.</li></ul>',
    howTo: '<ol><li>Check your flour bag for protein %.</li><li>Use the "Flours" section to find your type.</li><li>Adjust hydration based on flour strength.</li><li>Record the flour used in your batches.</li></ol>',
    tips: [
      'Caputo Pizzeria (Blue) is the gold standard for Neapolitan.',
      'High gluten flour (14%+) creates chewy NY style crust.',
      'All-purpose is often too weak for long fermentation.'
    ],
    reference: {
      name: 'The Perfect Loaf – Flour Guide',
      url: 'https://www.theperfectloaf.com/guides/flour-guide/',
    },
    accessLevel: 'pro',
  },
  {
    id: 'escalas_precisao',
    section: TutorialSection.FUNDAMENTALS,
    title: 'Scales & Baker\'s Percentage',
    image: 'https://images.unsplash.com/photo-1594311242637-a2d2a4585c54?q=80&w=2070&auto=format&fit=crop',
    intro: 'Baking is chemistry. Precision is key. Baker\'s percentage makes scaling recipes easy.',
    why: '<ul><li>Volume (cups) is inaccurate. Weight (grams) is precise.</li><li>Baker\'s % allows scaling up or down instantly.</li><li>Flour is always 100%. Everything else is a ratio.</li></ul>',
    howTo: '<ol><li>Get a digital scale (0.1g precision for yeast).</li><li>Input your desired total flour or dough weight.</li><li>The app calculates everything based on percentages.</li><li>Follow the weights exactly.</li></ol>',
    tips: [
      '1g of yeast can make a huge difference.',
      'Salt should be 2-3% of flour weight.',
      'Water % = Hydration.'
    ],
    reference: {
      name: 'King Arthur Baking – Baker\'s Percentage',
      url: 'https://www.kingarthurbaking.com/pro/reference/bakers-percentage',
    },
    accessLevel: 'free'
  },
  {
    id: 'modo_pratico_avancado',
    section: TutorialSection.FUNDAMENTALS,
    title: 'Basic vs. Advanced Mode',
    image: 'https://images.unsplash.com/photo-1594311242637-a2d2a4585c54?q=80&w=2070&auto=format&fit=crop',
    intro: 'DoughLab offers two ways to calculate: Guided (Basic) for quick presets, and Advanced for full control.',
    why: '<ul><li>Guided: Best for beginners or quick standard recipes.</li><li>Advanced: Unlock every slider for experimentation.</li><li>Grow with the tool as you learn.</li></ul>',
    howTo: '<ol><li>Toggle the mode switch at the top of the calculator.</li><li>Basic restricts inputs to safe ranges.</li><li>Advanced unlocks fermentation methods, oil, sugar, etc.</li></ol>',
    tips: [
      'Start with Basic presets to get a feel.',
      'Switch to Advanced when you want to tweak hydration or yeast.',
      'Save your custom parameters as a user preset.'
    ],
    reference: {
      name: 'DoughLab User Guide',
      url: '#',
    },
    accessLevel: 'free'
  },
  {
    id: 'modo_reverso',
    section: TutorialSection.TECHNIQUES,
    title: 'Reverse Calculation Mode',
    image: 'https://images.unsplash.com/photo-1594311242637-a2d2a4585c54?q=80&w=2070&auto=format&fit=crop',
    intro: 'Have a fixed amount of flour or starter? Use Reverse Mode to calculate the rest of the recipe around it.',
    why: '<ul><li>Reduce waste by using up leftovers.</li><li>Calculate based on available flour bag size.</li><li>Adapt recipes to specific constraints.</li></ul>',
    howTo: '<ol><li>Select "By Flour Weight" in the Quantity section.</li><li>Enter the amount of flour you have.</li><li>The app calculates total dough and other ingredients.</li></ol>',
    tips: [
      'Great for using up discard starter.',
      'Perfect for "one bag of flour" batches.',
    ],
    reference: {
      name: 'DoughLab Features',
      url: '#',
    },
    accessLevel: 'pro'
  },
  {
    id: 'referencias_credibilidade',
    section: TutorialSection.FUNDAMENTALS,
    title: 'Technical Credibility & Sources',
    image: 'https://images.unsplash.com/photo-1594311242637-a2d2a4585c54?q=80&w=2070&auto=format&fit=crop',
    intro: 'Our calculator isn\'t magic; it\'s math and science. We base our logic on industry standards.',
    why: '<ul><li>Reliable results depend on proven ratios.</li><li>We cite sources like AVPN, Modernist Cuisine, and master bakers.</li><li>Transparency builds trust in your tools.</li></ul>',
    howTo: '<ol><li>Check the "References" page for our library.</li><li>Read the "Why" section in tutorials.</li><li>Verify logic against standard textbooks.</li></ol>',
    tips: [
      'Always question "magic" recipes.',
      'Trust ratios over absolute recipes.',
      'Experiment and log your own results.'
    ],
    reference: {
      name: 'DoughLab References',
      url: '#/references',
    },
    accessLevel: 'free'
  },
  {
    id: 'no_knead_method',
    section: TutorialSection.TECHNIQUES,
    title: 'No-Knead Method',
    image: 'https://images.unsplash.com/photo-1589301773952-79055811c47c?q=80&w=2070&auto=format&fit=crop',
    intro: 'Let time do the work. The No-Knead method uses long fermentation and high hydration to develop gluten passively.',
    why: '<ul><li>Effortless dough development.</li><li>Creates complex flavor via long fermentation.</li><li>Requires no mixer or heavy labor.</li></ul>',
    howTo: '<ol><li>Mix ingredients just until combined (shaggy mass).</li><li>Cover and let sit for 12-18 hours at room temp.</li><li>Gluten forms itself. Shape and bake.</li></ol>',
    tips: [
      'Works best with hydration > 70%.',
      'Use a Dutch Oven to bake bread for steam retention.',
      'Great for focaccia and rustic breads.'
    ],
    reference: {
      name: "Jim Lahey / NYT – No-Knead Bread",
      url: "https://cooking.nytimes.com/recipes/11376-no-knead-bread"
    },
    accessLevel: 'pro'
  },
  {
    id: 'scoring_techniques',
    section: TutorialSection.TECHNIQUES,
    title: 'Scoring: The Art of the Cut',
    image: 'https://images.unsplash.com/photo-1585399103509-24d119a9f11f?q=80&w=2070&auto=format&fit=crop',
    intro: 'Scoring isn\'t just decoration. It controls how dough expands in the oven, preventing blowouts.',
    why: '<ul><li>Directs oven spring expansion.</li><li>Prevents uncontrolled tearing.</li><li>Creates the "ear" (grigne) in artisan bread.</li></ul>',
    howTo: '<ol><li>Use a lame or razor blade.</li><li>Cut decisively at a 45-degree angle.</li><li>Score just before baking.</li></ol>',
    tips: [
      'Cold dough scores easier.',
      'One long slash for baguettes/batards.',
      'Deep cuts for maximum opening.'
    ],
    reference: {
      name: "King Arthur Baking – Scoring Bread",
      url: "https://www.kingarthurbaking.com/blog/2017/10/20/bread-scoring-techniques"
    },
    accessLevel: 'pro'
  },
  {
    id: 'baking_methods',
    section: TutorialSection.FUNDAMENTALS,
    title: 'Baking Methods Overview',
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?q=80&w=2070&auto=format&fit=crop',
    intro: 'Straight dough, sponge & dough, sourdough. Understanding the mixing methods.',
    why: '<ul><li>Straight: All ingredients at once. Fast, simple.</li><li>Sponge: Preferment + Final Mix. Better flavor/texture.</li><li>Sourdough: Wild yeast. Complex, sour, longest process.</li></ul>',
    howTo: '<ol><li>Choose method based on time available.</li><li>Direct is fine for same-day pizza.</li><li>Use preferments for next-day optimization.</li></ol>',
    tips: [
      'Autolyse can be added to any method.',
      'Mixing order matters (Salt last usually).',
      'Temperature control is vital for all.'
    ],
    reference: {
      name: "Baker's Manual",
      url: "#"
    },
    accessLevel: 'free'
  },
  {
    id: 'pizza_baking_science',
    section: TutorialSection.ENVIRONMENT,
    title: 'The Physics of Pizza Baking',
    image: 'https://images.unsplash.com/photo-1590947132387-155cc02f3212?q=80&w=2070&auto=format&fit=crop',
    intro: 'Thermodynamics in the oven: Conduction, Convection, and Radiation.',
    why: '<ul><li>Conduction: Heat from stone to base (crispness).</li><li>Radiation: Heat from flame/dome to top (browning).</li><li>Convection: Air movement (even cooking).</li></ul>',
    howTo: '<ol><li>Balance top and bottom heat.</li><li>Use steel for conduction in home ovens.</li><li>Use broiler (grill) for radiation in home ovens.</li></ol>',
    tips: [
      'Preheat surfaces thoroughly.',
      'Rotate pizza for even radiation exposure.',
      'Steam interferes with crust formation (except for bread).'
    ],
    reference: {
      name: "Modernist Cuisine – The Physics of Food",
      url: "https://modernistcuisine.com/"
    },
    accessLevel: 'pro'
  },
  {
    id: 'cold_retard_flavor',
    section: TutorialSection.FERMENTATION,
    title: 'Cold Retard & Flavor Development',
    image: 'https://images.unsplash.com/photo-1627435199109-6_m8J4s_V-0?q=80&w=2070&auto=format&fit=crop',
    intro: 'Retarding dough in the fridge (cold fermentation) is the secret to professional flavor.',
    why: '<ul><li>Slows yeast, allows enzymes to create sugars/acids.</li><li>Produces blisters on crust.</li><li>Fits baking into your schedule.</li></ul>',
    howTo: '<ol><li>Mix and bulk ferment a bit.</li><li>Place in fridge for 24-72 hours.</li><li>Remove 2h before baking to warm up.</li></ol>',
    tips: [
      '48-72 hours is the sweet spot for pizza.',
      'Ensure airtight seal to prevent drying.',
      'Cold dough is easier to handle initially.'
    ],
    reference: {
      name: "Serious Eats – The Pizza Lab",
      url: "https://www.seriouseats.com/the-pizza-lab-how-long-should-i-let-my-dough-cold-ferment"
    },
    accessLevel: 'pro'
  },
  {
    id: 'yeast_types_dosage',
    section: TutorialSection.INGREDIENTS,
    title: 'Yeast Types & Dosage',
    image: 'https://images.unsplash.com/photo-1617470715842-9ebd65b8a03f?q=80&w=2070&auto=format&fit=crop',
    intro: 'Instant (IDY), Active Dry (ADY), Fresh (Cake). What\'s the difference?',
    why: '<ul><li>IDY: Concentrated, mix directly.</li><li>ADY: Needs activation in water.</li><li>Fresh: Perishable, traditional, fast acting.</li></ul>',
    howTo: '<ol><li>IDY use 1/3 of Fresh weight.</li><li>ADY use 40-50% of Fresh weight.</li><li>Use the app to convert automatically.</li></ol>',
    tips: [
      'IDY is the most consistent for home use.',
      'Fresh yeast gives great pop but expires fast.',
      'Never kill yeast with hot water (>50°C).'
    ],
    reference: {
      name: "The Spruce Eats – Yeast Types",
      url: "https://www.thespruceeats.com/yeast-varieties-1328651"
    },
    accessLevel: 'free'
  },
  {
    id: 'stretch_and_fold_technique',
    section: TutorialSection.TECHNIQUES,
    title: 'Stretch & Fold Technique',
    image: 'https://images.unsplash.com/photo-1614532843595-3b74b1df092b?q=80&w=2070&auto=format&fit=crop',
    intro: 'Build strength without kneading. Perfect for wet doughs.',
    why: '<ul><li>Organizes gluten strands gently.</li><li>Traps air for open crumb.</li><li>Easy on the hands.</li></ul>',
    howTo: '<ol><li>Grab edge of dough, stretch up, fold over center.</li><li>Rotate bowl 90 degrees. Repeat 4 times.</li><li>Do this every 30 mins during bulk fermentation.</li></ol>',
    tips: [
      'Wet hands prevent sticking.',
      'Be gentle, don\'t tear the dough.',
      'Stop when dough holds shape.'
    ],
    reference: {
      name: "Peter Reinhart – Artisan Breads Every Day",
      url: "#"
    },
    accessLevel: 'pro'
  },
  {
    id: 'connected_oven_profile',
    section: TutorialSection.ENVIRONMENT,
    title: 'Oven Profiling',
    image: 'https://images.unsplash.com/photo-1579752048924-f53d5c58746b?q=80&w=2070&auto=format&fit=crop',
    intro: 'Understand your oven\'s weak and hot spots.',
    why: '<ul><li>Every oven is different.</li><li>Calibration ensures recipe success.</li><li>Adapt baking times to your reality.</li></ul>',
    howTo: '<ol><li>Use an oven thermometer to check real temp.</li><li>Map hot spots using the "toast test".</li><li>Adjust rack position for balance.</li></ol>',
    tips: [
      'Most home ovens run cooler than stated.',
      'Preheat fully (cycle on/off).',
      'Use a stone/steel to stabilize temp.'
    ],
    reference: {
      name: "The Kitchn – Oven Hot Spots",
      url: "https://www.thekitchn.com/how-to-find-your-ovens-hot-spots-165634"
    },
    accessLevel: 'pro'
  },
  {
    id: 'error_logging_diary',
    section: TutorialSection.TROUBLESHOOTING,
    title: 'Logging Errors to Learn',
    image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?q=80&w=2070&auto=format&fit=crop',
    intro: 'Your failures are your best teachers. Log them.',
    why: '<ul><li>Identify patterns (e.g., always over-proofing in summer).</li><li>Fine-tune variables.</li><li>Track progress over time.</li></ul>',
    howTo: '<ol><li>Use the "Notes" section in your batches.</li><li>Record ambient temp, times, and visual results.</li><li>Rate your bake honestly.</li></ol>',
    tips: [
      'Take photos of crumb and crust.',
      'Note what you changed from last time.',
      'Review notes before next bake.'
    ],
    reference: {
      name: "The Bread Baker's Apprentice",
      url: "#"
    },
    accessLevel: 'pro'
  },
  {
    id: 'recipe_scaling',
    section: TutorialSection.TECHNIQUES,
    title: 'Recipe Scaling',
    image: 'https://images.unsplash.com/photo-1627888636881-8985b671f49b?q=80&w=2070&auto=format&fit=crop',
    intro: 'Doubling or halving recipes safely.',
    why: '<ul><li>Baker\'s % makes scaling linear.</li><li>Yeast doesn\'t always scale linearly (thermal mass).</li><li>Mixer capacity constraints.</li></ul>',
    howTo: '<ol><li>Use the app to scale based on flour weight.</li><li>Watch dough temperature in large batches.</li><li>Don\'t overload your mixer.</li></ol>',
    tips: [
      'Large batches retain heat more; use colder water.',
      'Divide dough into manageable chunks.',
      'Check fermentation earlier for large masses.'
    ],
    reference: {
      name: "Professional Baking – Wayne Gisslen",
      url: "#"
    },
    accessLevel: 'pro'
  },
  {
    id: 'long_term_fermentation',
    section: TutorialSection.FERMENTATION,
    title: 'Extended Fermentation',
    image: 'https://images.unsplash.com/photo-1594311242637-a2d2a4585c54?q=80&w=2070&auto=format&fit=crop',
    intro: 'Pushing fermentation to 48, 72, or 96 hours.',
    why: '<ul><li>Maximum flavor development.</li><li>Full gluten breakdown for tenderness.</li><li>Digestibility benefits.</li></ul>',
    howTo: '<ol><li>Reduce yeast significantly.</li><li>Keep temp very low (fridge).</li><li>Use strong flour to withstand breakdown.</li></ol>',
    tips: [
      'Watch for dough degradation (becoming soup).',
      'Acid load increases significantly.',
      'Sugars deplete; crust might be pale.'
    ],
    reference: {
      name: "The Pizza Bible",
      url: "#"
    },
    accessLevel: 'pro'
  },
  {
    id: 'natural_fermentation_levain',
    section: TutorialSection.FERMENTATION,
    title: 'Natural Fermentation (Levain)',
    image: 'https://images.unsplash.com/photo-1560181313-a5370557e411?q=80&w=2070&auto=format&fit=crop',
    intro: 'Baking with wild yeast.',
    why: '<ul><li>Unique flavor profile.</li><li>Gut health benefits.</li><li>Self-sufficiency.</li></ul>',
    howTo: '<ol><li>Maintain a healthy starter.</li><li>Use app to calculate levain amount.</li><li>Expect longer rise times.</li></ol>',
    tips: [
      'Starter health is key.',
      'Float test is unreliable; watch volume.',
      'Temperature control is crucial for sourness.'
    ],
    reference: {
      name: "Tartine Bread",
      url: "#"
    },
    accessLevel: 'pro'
  },
  {
    id: 'micro_batch_mode',
    section: TutorialSection.TECHNIQUES,
    title: 'Micro-Batch Baking',
    image: 'https://images.unsplash.com/photo-1528731708534-816fe59f90cb?q=80&w=2070&auto=format&fit=crop',
    intro: 'Making just one pizza or loaf.',
    why: '<ul><li>Testing new flours.</li><li>Lunch for one.</li><li>Practicing skills cheaply.</li></ul>',
    howTo: '<ol><li>Set Quantity to 1.</li><li>Use small bowls.</li><li>Hand mixing is often easier.</li></ol>',
    tips: [
      'Measuring small yeast amounts is hard; use a 0.01g scale.',
      'Small doughs cool/warm fast.',
      'Great for experiments.'
    ],
    reference: {
      name: "DoughLab Tips",
      url: "#"
    },
    accessLevel: 'free'
  },
  {
    id: 'visual_indicators_photography',
    section: TutorialSection.TROUBLESHOOTING,
    title: 'Visual Indicators',
    image: 'https://images.unsplash.com/photo-1513312999432-a7afa260d8a0?q=80&w=2070&auto=format&fit=crop',
    intro: 'Knowing when dough is ready by sight and touch.',
    why: '<ul><li>Time is just an estimate.</li><li>Dough tells you when it\'s ready.</li><li>Volume, jiggle, poke test.</li></ul>',
    howTo: '<ol><li>Poke test: Indentation should spring back slowly.</li><li>Volume: Mark container to see 2x/3x rise.</li><li>Jiggle: Should wobble like jelly.</li></ol>',
    tips: [
      'Watch the dough, not the clock.',
      'Take photos to learn your dough\'s look.',
      'Different flours look different.'
    ],
    reference: {
      name: "The Bread Baker's Apprentice",
      url: "#"
    },
    accessLevel: 'pro'
  },
  {
    id: 'prefermentos_poolish_biga_sponge',
    section: TutorialSection.FERMENTATION,
    title: 'Poolish vs Biga vs Sponge',
    image: 'placeholder_url_prefermentos.jpg',
    intro: 'Detailed comparison of preferment types.',
    why: '<ul><li>Poolish: 100% hydration, enzyme activity, extensibility.</li><li>Biga: 50% hydration, strength, acidity.</li><li>Sponge: General term, often enriched.</li></ul>',
    howTo: '<ol><li>Choose based on desired crust texture.</li><li>Biga = Chewy/Crispy.</li><li>Poolish = Light/Crispy.</li></ol>',
    tips: [
      'Dissolve poolish in water first.',
      'Chop biga into water to incorporate.',
      'Account for preferment flour in total hydration.'
    ],
    reference: {
      name: "King Arthur Baking",
      url: "#"
    },
    accessLevel: 'pro'
  },
  {
    id: 'mistura_tempos_amassamento',
    section: TutorialSection.TECHNIQUES,
    title: 'Mixing Times & Gluten',
    image: 'placeholder_url_mistura_amassamento.jpg',
    intro: 'How long to knead?',
    why: '<ul><li>Under-mixed: Poor structure, dense.</li><li>Optimally mixed: Windowpane, strong.</li><li>Over-mixed: Breakdown, sticky, white.</li></ul>',
    howTo: '<ol><li>Mix until shaggy.</li><li>Rest (autolyse).</li><li>Knead until smooth.</li><li>Check windowpane.</li></ol>',
    tips: [
      'It\'s hard to over-mix by hand.',
      'Mixers can over-heat dough quickly.',
      'Extensibility vs Elasticity balance.'
    ],
    reference: {
      name: "Modernist Bread",
      url: "#"
    },
    accessLevel: 'pro'
  },
  {
    id: 'controle_temp_umidade_ambiente',
    section: TutorialSection.ENVIRONMENT,
    title: 'Ambient Temp & Humidity',
    image: 'placeholder_url_controle_ambiente_massa.jpg',
    intro: 'Your kitchen environment affects your dough.',
    why: '<ul><li>Heat accelerates fermentation.</li><li>Dry air forms skin on dough.</li><li>Humidity affects hydration absorption.</li></ul>',
    howTo: '<ol><li>Monitor room temp.</li><li>Cover dough to protect from dry air.</li><li>Adjust water temp to compensate for room temp.</li></ol>',
    tips: [
      'Summer baking requires cold water.',
      'Winter baking needs a warm spot.',
      'Use a proofing box for consistency.'
    ],
    reference: {
      name: "The Perfect Loaf",
      url: "#"
    },
    accessLevel: 'pro'
  },
  {
    id: 'metodos_cozimento_superficies',
    section: TutorialSection.TECHNIQUES,
    title: 'Advanced Baking Surfaces',
    image: 'placeholder_url_forno_superficie.jpg',
    intro: 'Going beyond the stone.',
    why: '<ul><li>Steel: Maximum conductivity.</li><li>Biscotto: Controlled heat for 900F.</li><li>Screen: Airflow, prevents burning.</li></ul>',
    howTo: '<ol><li>Match surface to oven temp and pizza style.</li><li>Season your steels/pans.</li><li>Clean stones by heat, not water.</li></ol>',
    tips: [
      'Thicker steel = more thermal mass.',
      'Screens help set pizza before moving to stone.',
      'Don\'t shock stones thermally.'
    ],
    reference: {
      name: "Pizza Making Forum",
      url: "#"
    },
    accessLevel: 'pro'
  },
  {
    id: 'tecnica_autolise',
    section: TutorialSection.TECHNIQUES,
    title: 'Autolyse',
    image: 'placeholder_url_autolyse.jpg',
    intro: 'The pause that refreshes dough.',
    why: '<ul><li>Hydrates flour fully.</li><li>Starts enzyme activity.</li><li>Relaxes gluten for easier kneading.</li></ul>',
    howTo: '<ol><li>Mix flour and water only.</li><li>Rest 20-60 mins.</li><li>Add salt/yeast and knead.</li></ol>',
    tips: [
      'Essential for whole wheat.',
      'Shortens kneading time.',
      'Don\'t add salt during autolyse (usually).'
    ],
    reference: {
      name: "Raymond Calvel",
      url: "#"
    },
    accessLevel: 'free'
  },
  {
    id: 'tecnica_tangzhong_yudane',
    section: TutorialSection.TECHNIQUES,
    title: 'Tangzhong & Yudane',
    image: 'placeholder_url_tangzhong.jpg',
    intro: 'Asian techniques for soft, fluffy bread.',
    why: '<ul><li>Pre-gelatinized starch holds water.</li><li>Higher hydration without stickiness.</li><li>Extends shelf life.</li></ul>',
    howTo: '<ol><li>Cook 5-10% of flour with water/milk (1:5 ratio).</li><li>Cool to room temp.</li><li>Add to dough mix.</li></ol>',
    tips: [
      'Cook until lines appear in roux.',
      'Account for water in roux in total hydration.',
      'Makes incredible burger buns.'
    ],
    reference: {
      name: "The Woks of Life",
      url: "#"
    },
    accessLevel: 'pro'
  },
  {
    id: 'modo_reverso_adaptativo2',
    section: TutorialSection.TECHNIQUES,
    title: 'Adaptive Reverse Mode',
    image: 'placeholder_url_modo_reverso_adaptativo2.jpg',
    intro: 'Advanced reverse calculations.',
    why: '<ul><li>Handling complex preferment leftovers.</li><li>Balancing multiple flours.</li></ul>',
    howTo: '<ol><li>Enter what you have.</li><li>App balances the rest.</li></ol>',
    tips: [
      'Double check your inputs.',
      'Weigh leftovers accurately.'
    ],
    reference: {
      name: "DoughLab Pro",
      url: "#"
    },
    accessLevel: 'pro'
  },
  {
    id: 'alta_hidratacao_tecnicas',
    section: TutorialSection.INGREDIENTS,
    title: 'Mastering High Hydration',
    image: 'placeholder_url_alta_hidracao.jpg',
    intro: 'Handling dough like water.',
    why: '<ul><li>Open crumb.</li><li>Crispy crust.</li><li>Artisan quality.</li></ul>',
    howTo: '<ol><li>Use basin/tub for bulk.</li><li>Coil folds are mandatory.</li><li>Gentle shaping.</li></ol>',
    tips: [
      'Don\'t add flour during shaping; use water or oil on hands.',
      'Bake dark for best flavor.',
      'Requires strong flour.'
    ],
    reference: {
      name: "Open Crumb Mastery",
      url: "#"
    },
    accessLevel: 'pro'
  },
  {
    id: 'gerenciar_batch_diario',
    section: TutorialSection.TROUBLESHOOTING,
    title: 'Journaling Mastery',
    image: 'placeholder_url_diario_batches.jpg',
    intro: 'How to keep a useful baking log.',
    why: '<ul><li>Memory is fallible.</li><li>Data reveals trends.</li><li>Replication requires records.</li></ul>',
    howTo: '<ol><li>Log immediately after baking.</li><li>Be specific about changes.</li><li>Rate objectively.</li></ol>',
    tips: [
      'Note ambient temp.',
      'Note flour brand.',
      'Note feelings/texture.'
    ],
    reference: {
      name: "DoughLab",
      url: "#"
    },
    accessLevel: 'free'
  },
  {
    id: 'cadastro_farinhas_substituicoes',
    section: TutorialSection.INGREDIENTS,
    title: 'Flour Substitution Logic',
    image: 'placeholder_url_cadastro_farinhas.jpg',
    intro: 'Swapping flours safely.',
    why: '<ul><li>Different protein levels.</li><li>Different absorption.</li><li>Availability issues.</li></ul>',
    howTo: '<ol><li>Match protein content closest.</li><li>Adjust water if moving from white to whole.</li><li>Expect texture changes.</li></ol>',
    tips: [
      'AP != Bread Flour.',
      'Cake flour is too weak for pizza.',
      'Semolina adds crunch.'
    ],
    reference: {
      name: "The Joy of Cooking",
      url: "#"
    },
    accessLevel: 'pro'
  },
  {
    id: 'sustentabilidade_impacto_ambiental',
    section: TutorialSection.ENVIRONMENT,
    title: 'Sustainable Baking',
    image: 'placeholder_url_sustentabilidade_massas.jpg',
    intro: 'Baking with the planet in mind.',
    why: '<ul><li>Ovens use energy.</li><li>Ingredients have footprints.</li><li>Waste reduction.</li></ul>',
    howTo: '<ol><li>Bake multiple items at once.</li><li>Source local flour.</li><li>Don\'t waste discard.</li></ol>',
    tips: [
      'Preheat efficiently.',
      'Use discard for crackers/pancakes.',
      'Buy bulk.'
    ],
    reference: {
      name: "Sustainable Food Trust",
      url: "#"
    },
    accessLevel: 'pro'
  },
  {
    id: 'assistente_voz_comandos',
    section: TutorialSection.TECHNIQUES,
    title: 'Hands-Free Baking',
    image: 'placeholder_url_assistente_voz.jpg',
    intro: 'Using voice assistants in the kitchen.',
    why: '<ul><li>Doughy hands can\'t touch screens.</li><li>Timers are essential.</li><li>Recipe read-back.</li></ul>',
    howTo: '<ol><li>"Set timer for 20 mins".</li><li>"Convert grams to cups".</li></ol>',
    tips: [
      'Keep device clean.',
      'Use smart displays for visual aid.',
    ],
    reference: {
      name: "Tech in Kitchen",
      url: "#"
    },
    accessLevel: 'pro'
  },
  {
    id: 'leaderboard_desafios_comunidade',
    section: TutorialSection.FUNDAMENTALS,
    title: 'Community Challenges',
    image: 'placeholder_url_leaderboard_desafios.jpg',
    intro: 'Gamifying your baking.',
    why: '<ul><li>Motivation to practice.</li><li>Learn new styles.</li><li>Connect with others.</li></ul>',
    howTo: '<ol><li>Check weekly challenge.</li><li>Bake and post.</li><li>Earn badges.</li></ol>',
    tips: [
      'Be supportive of others.',
      'Try something outside your comfort zone.',
      'Have fun!'
    ],
    reference: {
      name: "DoughLab Community",
      url: "#"
    },
    accessLevel: 'pro'
  }
];