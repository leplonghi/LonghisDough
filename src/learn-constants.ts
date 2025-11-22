
import { Tutorial, TutorialSection, YeastType } from './types';

export const TUTORIALS: Tutorial[] = [
  {
    id: 'maturacao_fria',
    section: TutorialSection.FERMENTATION,
    title: 'Cold Maturation: The Science of Patience',
    image: 'https://images.unsplash.com/photo-1627435199109-6_m8J4s_V-0?q=80&w=2070&auto=format&fit=crop',
    intro: 'Cold maturation (retarding the dough at 3-5°C for 12 to 72 hours) allows yeast activity to slow down while enzymes like amylase and protease break down starches and proteins more effectively.',
    why: '<ul><li>Enhances flavor and aroma complexity through enzymatic activity.</li><li>Relaxes the gluten network for better extensibility and easier handling.</li><li>Provides consistent, repeatable results by controlling fermentation speed.</li></ul>',
    howTo: '<ol><li>Weigh ingredients precisely.</li><li>Mix and ball your dough as usual.</li><li>Place in airtight containers and refrigerate at 3-5°C for 12-72 hours.</li><li>Remove from the fridge 1-2 hours before stretching to bring to room temperature.</li></ol>',
    tips: [
      'Avoid putting warm dough boxes directly into the fridge to prevent condensation.',
      'In hot environments (>28°C), mix in the morning and refrigerate immediately to control yeast activity.',
      'Use strong flour (W ≥ 280) to withstand long fermentation times.'
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
    title: 'Preferments: Biga vs. Poolish',
    image: 'https://images.unsplash.com/photo-1594311242637-a2d2a4585c54?q=80&w=2070&auto=format&fit=crop',
    intro: 'Professional pizzaiolos use preferments like Poolish (100% hydration) and Biga (45-60% hydration) to add distinct characteristics to the final dough.',
    why: '<ul><li><strong>Poolish:</strong> Creates a light, airy crumb and a crisp, thin crust.</li><li><strong>Biga:</strong> Builds a strong gluten structure and complex, nutty flavor profile.</li><li>Choosing the right preferment transforms the texture and handling of your dough.</li></ul>',
    howTo: '<p><strong>Poolish:</strong> Mix equal parts flour and water with a tiny amount of yeast. Ferment 8-18 hours.<br><strong>Biga:</strong> Mix flour, water (~45-50%), and yeast into a shaggy mass. Ferment 12-24+ hours.</p>',
    tips: [
      'Poolish is easier to incorporate by hand due to its liquid state.',
      'Avoid using Poolish in very hot environments without refrigeration as it over-ferments quickly.',
      'Biga requires strong flour to support the gluten structure in high-hydration doughs.'
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
    intro: 'Detroit Style is characterized by high-hydration dough baked in rectangular steel pans. The cheese is spread to the edges, creating a caramelized crust (frico), with sauce often added on top.',
    why: '<ul><li>High hydration yields an exceptionally light and airy crumb.</li><li>The pan method creates a fried, crispy bottom unlike any other style.</li><li>Offers a unique texture profile distinct from Neapolitan or NY styles.</li></ul>',
    howTo: '<ol><li>Mix dough with 65-75% hydration.</li><li>Ferment (Poolish or Direct) for 18-24 hours.</li><li>Place dough in an oiled pan and gently stretch to the corners.</li><li>Bake at 250-280°C for 12-15 minutes until the cheese edge is dark and crispy.</li></ol>',
    tips: [
      'Use flour with at least 12.5% protein for sufficient structure.',
      'Generously oil the pan with neutral oil or olive oil for a fried crust effect.',
      'If your oven temp is limited, extend bake time by 1-2 minutes but watch the bottom closely.'
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
    id: 'hidratacao_alta',
    section: TutorialSection.INGREDIENTS,
    title: 'High Hydration: Mastering 70%+ Doughs',
    image: 'https://images.unsplash.com/photo-1594311242637-a2d2a4585c54?q=80&w=2070&auto=format&fit=crop',
    intro: 'Doughs with hydration above 70% enter the realm of advanced baking. This technique requires skill but rewards you with incredibly open crumbs and light crusts.',
    why: '<ul><li>More water creates more steam, opening up the crumb structure.</li><li>A relaxed gluten network expands easily, resulting in a lighter texture.</li><li>Achieves professional-level artisan results at home.</li></ul>',
    howTo: '<ol><li>Set your desired hydration (e.g., 72%) in the calculator.</li><li>The app adjusts flour, water, and yeast ratios.</li><li>Use "coil folds" or "slap and fold" techniques to build strength without overworking.</li><li>Handle gently with wet hands and a bench scraper.</li></ol>',
    tips: [
      'Use high-protein or "strong" flour to hold the water structure.',
      'In hot weather (>28°C), use cold water or reduce yeast to control rise.',
      'For standard home ovens (<300°C), 65-67% hydration is often easier to manage.'
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
    title: 'Dough Temperature (DDT): Control for Consistency',
    image: 'https://images.unsplash.com/photo-1594311242637-a2d2a4585c54?q=80&w=2070&auto=format&fit=crop',
    intro: 'Desired Dough Temperature (DDT) is the target temperature of your dough right after mixing. Controlling this ensures fermentation happens at a predictable rate.',
    why: '<ul><li>Inconsistent temps lead to unpredictable fermentation (too fast or too slow).</li><li>DDT control is the secret to professional consistency.</li><li>Empowers you to adapt to seasonal changes in your kitchen.</li></ul>',
    howTo: '<ol><li>Measure air and flour temperature.</li><li>Use the app\'s environment settings to calculate the ideal water temperature.</li><li>Mix with water at the calculated temperature.</li><li>Check final dough temp to verify accuracy.</li></ol>',
    tips: [
      'A digital thermometer is essential for quick checks.',
      'In hot kitchens (>28°C), use ice water or reduce bulk fermentation time.',
      'In cold kitchens, use warmer water to help the yeast wake up.'
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
    id: 'superficies_assamento',
    section: TutorialSection.TECHNIQUES,
    title: 'Baking Surfaces: Stone vs. Steel',
    image: 'https://images.unsplash.com/photo-1594311242637-a2d2a4585c54?q=80&w=2070&auto=format&fit=crop',
    intro: 'Your baking surface dictates heat transfer. Steel conducts heat rapidly (great for home ovens), while stone radiates gentler heat (better for high-temp ovens).',
    why: '<ul><li><strong>Steel:</strong> Fast heat transfer, ideal for crisping bases in standard ovens (250-300°C).</li><li><strong>Stone/Biscotto:</strong> Prevents burning in high-heat ovens (>400°C).</li><li>Choosing the right surface matches your oven to your pizza style.</li></ul>',
    howTo: '<ol><li>Select your surface type in the app\'s oven profile.</li><li>Input your oven\'s max temperature.</li><li>Enable "Smart Adjustments" for tailored recipe advice.</li><li>Follow the calculator\'s recommendations.</li></ol>',
    tips: [
      'Always preheat your surface for at least 45-60 minutes.',
      'In home ovens, steel is usually superior for pizza.',
      'In professional ovens, use biscotto (clay) to avoid scorched bottoms.'
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
    title: 'Sourdough Starter (Levain) Management',
    image: 'https://images.unsplash.com/photo-1594311242637-a2d2a4585c54?q=80&w=2070&auto=format&fit=crop',
    intro: 'Maintaining a sourdough starter adds complex flavor and natural leavening to your dough. The "Levain Pet" module helps you track its health and feeding schedule.',
    why: '<ul><li>Natural fermentation creates superior flavor depth.</li><li>Tracking feedings improves consistency and starter strength.</li><li>Adapting recipes to your starter\'s hydration is crucial for accuracy.</li></ul>',
    howTo: '<ol><li>Register your starter in "Levain Pet".</li><li>In the calculator, select "My Levain" as the yeast type.</li><li>The app adjusts flour and water in the final dough based on your starter\'s hydration.</li></ol>',
    tips: [
      'Feed your starter at peak activity for best leavening power.',
      'In hot weather, feed with colder water or use a lower inoculation ratio.',
      'Keep a feeding log to learn your starter\'s rhythm.'
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
    id: 'recheios_proporcoes',
    section: TutorialSection.TECHNIQUES,
    title: 'Toppings & Ratios: The Balance',
    image: 'https://images.unsplash.com/photo-1594311242637-a2d2a4585c54?q=80&w=2070&auto=format&fit=crop',
    intro: 'A great pizza is a balance of dough, sauce, and cheese. Overloading destroys the bake. This guide helps you calculate the perfect ratios.',
    why: '<ul><li>Prevents soggy centers and "gum lines".</li><li>Ensures even cooking of dough and toppings.</li><li>Saves money by reducing waste.</li></ul>',
    howTo: '<ol><li>Select your pizza style and size in the calculator.</li><li>Check the "Toppings" tab for recommended weights.</li><li>Use a scale to portion cheese and sauce.</li><li>Adjust based on personal preference and save as a preset.</li></ol>',
    tips: [
      'For home ovens, go lighter on toppings to ensure the dough cooks through.',
      'Drain wet ingredients (like fresh mozzarella) thoroughly.',
      'Apply sauce sparingly; it spreads as it cooks.'
    ],
    reference: {
      name: 'Serious Eats – The Pizza Lab: Sauce-to-Cheese Ratios & Build Tips',
      url: 'https://www.seriouseats.com/pizza-lab-sauce-cheese-ratios-build-tips-4167416',
    },
    accessLevel: 'pro',
  },
  {
    id: 'hidratacao_gluten',
    section: TutorialSection.INGREDIENTS,
    title: 'Hydration & Gluten: The Science',
    image: 'https://images.unsplash.com/photo-1594311242637-a2d2a4585c54?q=80&w=2070&auto=format&fit=crop',
    intro: 'Hydration is the ratio of water to flour. It dictates the openness of the crumb and the crispiness of the crust. Understanding this is key to mastering dough.',
    why: '<ul><li>Determines crumb structure (open vs. tight).</li><li>Influences dough handling and stickiness.</li><li>Affects oven spring and final texture.</li></ul>',
    howTo: '<ol><li>Input desired hydration % in the calculator.</li><li>The app balances the recipe.</li><li>Higher hydration requires more gentle handling (folds).</li><li>Lower hydration requires more kneading.</li></ol>',
    tips: [
      'Whole wheat flours absorb more water; increase hydration by 2-4%.',
      'For hydration >75%, use the "coil fold" method instead of kneading.',
      'Use rice flour for dusting to prevent sticking.'
    ],
    reference: {
      name: 'King Arthur Baking – Hydration in Bread Dough, Explained',
      url: 'https://www.kingarthurbaking.com/blog/2023/01/11/bread-hydration',
    },
    accessLevel: 'free',
  },
  {
    id: 'troubleshooting_massa',
    section: TutorialSection.TROUBLESHOOTING,
    title: 'Troubleshooting: Common Dough Issues',
    image: 'https://images.unsplash.com/photo-1594311242637-a2d2a4585c54?q=80&w=2070&auto=format&fit=crop',
    intro: 'From snap-back (shrinking dough) to gum lines (raw centers), learn to diagnose and fix common pizza problems.',
    why: '<ul><li>Saves failed batches and reduces waste.</li><li>Teaches you to "read" the dough.</li><li>Improves consistency over time.</li></ul>',
    howTo: '<ol><li>Identify the symptom (e.g., "Dough won\'t stretch").</li><li>Check potential causes (e.g., "Cold dough", "High protein flour").</li><li>Apply the suggested fix (e.g., "Rest longer", "Increase hydration").</li></ol>',
    tips: [
      'Always weigh ingredients; small errors compound.',
      'If dough snaps back, let it rest 10-20 minutes.',
      'If crust is pale, check oven temp or add diastatic malt/sugar.'
    ],
    reference: {
      name: 'Pizza Today – Troubleshooting Your Pizza Dough',
      url: 'https://pizzatoday.com/news/troubleshooting-your-pizza-dough-a-guide-to-making-pizza-better/147346/',
    },
    accessLevel: 'pro',
  },
  {
    id: 'banco_farinhas',
    section: TutorialSection.INGREDIENTS,
    title: 'Flour Library & Substitutions',
    image: 'https://images.unsplash.com/photo-1594311242637-a2d2a4585c54?q=80&w=2070&auto=format&fit=crop',
    intro: 'Different flours absorb water differently. The Flour Library helps you track protein content and W-strength, ensuring accurate hydration adjustments.',
    why: '<ul><li>Protein content dictates water absorption.</li><li>Using the right flour for the style is crucial.</li><li>Helps you adapt recipes when your usual flour is unavailable.</li></ul>',
    howTo: '<ol><li>Add your flours to the library with protein/W specs.</li><li>Select your specific flour in the calculator.</li><li>The app suggests hydration adjustments based on flour strength.</li></ol>',
    tips: [
      'High protein (>13%) needs more water.',
      'Low protein (<10%) creates a softer, cake-like crumb.',
      '00 Flour is ideal for high-heat ovens; Bread Flour is better for home ovens.'
    ],
    reference: {
      name: 'BakerPedia – Gluten Hydration: Processes',
      url: 'https://bakerpedia.com/processes/gluten-hydration/',
    },
    accessLevel: 'pro',
  },
  {
    id: 'escalas_precisao',
    section: TutorialSection.FUNDAMENTALS,
    title: 'Scales & Baker\'s Percentage',
    image: 'https://images.unsplash.com/photo-1594311242637-a2d2a4585c54?q=80&w=2070&auto=format&fit=crop',
    intro: 'Baking is chemistry. Precision scales and Baker\'s Percentage (ratios relative to flour) are the professional standard for consistent results.',
    why: '<ul><li>Volume measurements (cups) are inaccurate and inconsistent.</li><li>Baker\'s % allows easy scaling of recipes.</li><li>Ensures repeatability of successful batches.</li></ul>',
    howTo: '<ol><li>Use a digital scale for all ingredients.</li><li>Understand that Flour is always 100%.</li><li>Water, salt, and yeast are calculated as a % of the flour weight.</li></ol>',
    tips: [
      'Use a micro-scale (0.01g) for yeast and salt.',
      'Weigh water too; 1ml = 1g.',
      'Always zero (tare) your scale before adding ingredients.'
    ],
    reference: {
      name: 'BakerPedia – The Baker’s Percentage and How to Use It',
      url: 'https://bakerpedia.com/processes/baker-percentages/',
    },
    accessLevel: 'free'
  },
  {
    id: 'modo_pratico_avancado',
    section: TutorialSection.FUNDAMENTALS,
    title: 'Practical vs. Advanced Mode',
    image: 'https://images.unsplash.com/photo-1594311242637-a2d2a4585c54?q=80&w=2070&auto=format&fit=crop',
    intro: 'DoughLab offers two modes: Practical for quick, reliable presets, and Advanced for full control over every variable.',
    why: '<ul><li><strong>Practical:</strong> Quick start, guaranteed good results.</li><li><strong>Advanced:</strong> For experimentation and specific adjustments.</li><li>Choose the level of control that fits your current need.</li></ul>',
    howTo: '<ol><li>Toggle the mode switch in the calculator.</li><li>Practical locks ratios to style standards.</li><li>Advanced unlocks all sliders for custom hydration, salt, etc.</li></ol>',
    tips: [
      'Start with Practical mode to learn the baseline.',
      'Switch to Advanced to tweak hydration for your specific flour.',
      'Save your custom Advanced configurations as presets.'
    ],
    reference: {
      name: 'MyPizzaCorner – Common Dough Problems and How to Fix Them',
      url: 'https://mypizzacorner.com/pizza-tips/pizza-dough-problems/',
    },
    accessLevel: 'free'
  },
  {
    id: 'modo_reverso',
    section: TutorialSection.TECHNIQUES,
    title: 'Reverse Mode: Bake What You Have',
    image: 'https://images.unsplash.com/photo-1594311242637-a2d2a4585c54?q=80&w=2070&auto=format&fit=crop',
    intro: 'Have a fixed amount of starter or flour? Reverse Mode calculates the rest of the recipe to match what you have on hand.',
    why: '<ul><li>Reduces waste of expensive ingredients.</li><li>Adapts recipes to real-world constraints.</li><li>Perfect for using up discard starter.</li></ul>',
    howTo: '<ol><li>Select "Reverse Mode" (coming soon feature).</li><li>Input the fixed amount (e.g., 200g starter).</li><li>The app calculates the flour and water needed to maintain ratios.</li></ol>',
    tips: [
      'Great for using up the last of a flour bag.',
      'Use it to scale a recipe to fit a specific mixing bowl.',
      'Prevents "dough math" headaches.'
    ],
    reference: {
      name: 'Reddit r/Pizza – How to Calculate Biga and Poolish % in Pizza Dough',
      url: 'https://www.reddit.com/r/Cooking/comments/1bomiza/how_to_calculate_biga_and_poolish_in_pizza/',
    },
    accessLevel: 'pro'
  },
  {
    id: 'referencias_credibilidade',
    section: TutorialSection.FUNDAMENTALS,
    title: 'References & Credibility',
    image: 'https://images.unsplash.com/photo-1594311242637-a2d2a4585c54?q=80&w=2070&auto=format&fit=crop',
    intro: 'Our formulas aren\'t random. We rely on established standards (AVPN) and scientific literature (Modernist Cuisine) to ensure reliability.',
    why: '<ul><li>Provides a solid foundation for learning.</li><li>Ensures recipes work as described.</li><li>Connects you to the broader baking community knowledge.</li></ul>',
    howTo: '<ol><li>Check the "Reference" link at the bottom of tutorials.</li><li>Explore the "References" page for book recommendations.</li><li>Trust the default presets as tested starting points.</li></ol>',
    tips: [
      'Read the source material for deeper understanding.',
      'Compare different sources to see where consensus lies.',
      'Experiment to find what works best in your specific kitchen.'
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
    title: 'The No-Knead Method',
    image: 'https://images.unsplash.com/photo-1589301773952-79055811c47c?q=80&w=2070&auto=format&fit=crop',
    intro: 'Time replaces energy. The No-Knead method uses long fermentation and high hydration to align gluten passively, creating effortless artisan dough.',
    why: '<ul><li>Requires minimal physical effort or equipment.</li><li>Produces fantastic open crumb structure.</li><li>Accessible to beginner bakers.</li></ul>',
    howTo: '<ol><li>Mix ingredients just until combined (shaggy mass).</li><li>Cover and let sit for 12-18 hours at room temp.</li><li>Gently fold and shape.</li><li>Proof and bake.</li></ol>',
    tips: [
      'Use a high hydration ratio (>70%).',
      'Time is the key ingredient; don\'t rush it.',
      'Use a Dutch oven for baking bread to trap steam.'
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
    title: 'Scoring: Controlling Expansion',
    image: 'https://images.unsplash.com/photo-1585399103509-24d119a9f11f?q=80&w=2070&auto=format&fit=crop',
    intro: 'Scoring (slashing) dough before baking controls where it expands, preventing blowouts and creating beautiful "ears".',
    why: '<ul><li>Directs oven spring energy.</li><li>Prevents uncontrolled tearing.</li><li>Creates aesthetic appeal.</li></ul>',
    howTo: '<ol><li>Use a sharp blade (lame) or razor.</li><li>Cut firmly and swiftly at a 45-degree angle.</li><li>Score just before baking.</li></ol>',
    tips: [
      'Cold dough scores easier than warm dough.',
      'Dip the blade in water or oil to prevent sticking.',
      'Commit to the cut; hesitation causes dragging.'
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
    title: 'Baking Methods: Direct vs. Indirect',
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?q=80&w=2070&auto=format&fit=crop',
    intro: 'Understanding the difference between straight dough (Direct) and using preferments (Indirect) allows you to manipulate flavor and schedule.',
    why: '<ul><li><strong>Direct:</strong> Simple, one-step, good for same-day dough.</li><li><strong>Indirect (Poolish/Biga):</strong> Two-step, develops complex flavor and structure.</li></ul>',
    howTo: '<ol><li>Choose your method in the calculator.</li><li>Direct calculates all ingredients for one mix.</li><li>Indirect calculates the preferment stage separately.</li></ol>',
    tips: [
      'Start with Direct method to master the basics.',
      'Move to Indirect when you want to elevate flavor.',
      'Indirect methods require planning a day ahead.'
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
    title: 'Pizza Baking Science',
    image: 'https://images.unsplash.com/photo-1590947132387-155cc02f3212?q=80&w=2070&auto=format&fit=crop',
    intro: 'Heat transfer (conduction, convection, radiation) determines how your pizza bakes. Understanding your oven physics is key to a perfect crust.',
    why: '<ul><li>Conduction cooks the bottom (stone/steel).</li><li>Radiation cooks the top (broiler/dome).</li><li>Balancing these prevents burnt bottoms or raw tops.</li></ul>',
    howTo: '<ol><li>Preheat your stone/steel thoroughly for conduction.</li><li>Use the broiler for top radiation if needed.</li><li>Adjust rack position to balance heat sources.</li></ol>',
    tips: [
      'Steel transfers heat faster than stone (good for home ovens).',
      'If bottom burns, move higher up. If top burns, move lower.',
      'Rotation ensures even baking.'
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
    title: 'Flavor Development via Cold Retard',
    image: 'https://images.unsplash.com/photo-1627435199109-6_m8J4s_V-0?q=80&w=2070&auto=format&fit=crop',
    intro: 'Slowing yeast down in the fridge (cold retard) allows bacteria and enzymes to produce organic acids and sugars, creating superior flavor.',
    why: '<ul><li>Produces complex notes (nutty, slight sourness).</li><li>Improves crust color (Maillard reaction).</li><li>Makes dough easier to handle.</li></ul>',
    howTo: '<ol><li>Mix and bulk ferment for 1-2 hours.</li><li>Ball the dough and place in fridge for 24-72 hours.</li><li>Remove 2 hours before baking.</li></ol>',
    tips: [
      '24-48 hours is the sweet spot for most flours.',
      'Ensure containers are airtight to prevent drying.',
      'If dough smells strongly of acetone/alcohol, it fermented too long.'
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
    title: 'Yeast Types & Dosage',
    image: 'https://images.unsplash.com/photo-1617470715842-9ebd65b8a03f?q=80&w=2070&auto=format&fit=crop',
    intro: 'Instant, Active Dry, Fresh, Sourdough. Each behaves differently. Knowing how to convert and dose them is vital.',
    why: '<ul><li>Wrong dosage leads to under/over proofing.</li><li>Each type has a different potency.</li><li>Sourdough adds flavor but is slower/less predictable.</li></ul>',
    howTo: '<ol><li>Select your yeast type in the calculator.</li><li>The app suggests a percentage based on fermentation time.</li><li>Active Dry needs activating in water; Instant does not.</li></ol>',
    tips: [
      'Instant Yeast (IDY) is potent and easy to use.',
      'Fresh yeast has a short shelf life.',
      'Store yeast in the fridge or freezer.'
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
    title: 'Stretch & Fold Technique',
    image: 'https://images.unsplash.com/photo-1614532843595-3b74b1df092b?q=80&w=2070&auto=format&fit=crop',
    intro: 'A gentle method to develop gluten structure in wet doughs without intensive kneading.',
    why: '<ul><li>Builds strength without oxidation.</li><li>Organizes gluten strands.</li><li>Easy to do by hand.</li></ul>',
    howTo: '<ol><li>During bulk ferment, grab one side of dough.</li><li>Stretch it up and fold it over the center.</li><li>Rotate bowl and repeat 4 times.</li><li>Perform 3-4 sets at 30-min intervals.</li></ol>',
    tips: [
      'Wet your hands to prevent sticking.',
      'Stop if the dough fights back (let it rest).',
      'Essential for high hydration doughs.'
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
    title: 'Connected Oven Profile (Feature)',
    image: 'https://images.unsplash.com/photo-1579752048924-f53d5c58746b?q=80&w=2070&auto=format&fit=crop',
    intro: 'Define your oven specs (Max Temp, Stone/Steel) to receive tailored recipe adjustments.',
    why: '<ul><li>Adapts hydration and oil for your specific equipment.</li><li>Prevents burning or undercooking.</li><li>Makes recipes portable between different kitchens.</li></ul>',
    howTo: '<ol><li>Go to Settings > Oven Profile.</li><li>Enter your details.</li><li>The calculator will now flag warnings or suggestions.</li></ol>',
    tips: [
      'Be honest about your max temperature.',
      'Update if you change from stone to steel.',
      'Use an oven thermometer to verify accuracy.'
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
    title: 'Error Logging & Diary',
    image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?q=80&w=2070&auto=format&fit=crop',
    intro: 'Track your successes and failures. The Diary feature lets you log notes, photos, and ratings for every bake.',
    why: '<ul><li>Identify patterns (e.g., "Always over-proofed in summer").</li><li>Refine your personal recipes.</li><li>Track your improvement over time.</li></ul>',
    howTo: '<ol><li>Save your batch in the calculator.</li><li>After baking, go to My Lab.</li><li>Add a rating, notes, and photo to the batch.</li></ol>',
    tips: [
      'Be specific in notes (e.g., "Dough was sticky", "Crust was pale").',
      'Log ambient temp if possible.',
      'Review past notes before starting a new similar batch.'
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
    title: 'Recipe Scaling',
    image: 'https://images.unsplash.com/photo-1627888636881-8985b671f49b?q=80&w=2070&auto=format&fit=crop',
    intro: 'Easily scale recipes up or down using Baker\'s Percentage logic.',
    why: '<ul><li>Make 1 pizza or 100 without math errors.</li><li>Maintains consistent ratios and texture.</li><li>Professional standard for production.</li></ul>',
    howTo: '<ol><li>Change the "Number of Pizzas" or "Ball Weight".</li><li>The app automatically scales all ingredients.</li><li>Or switch to "Total Flour" mode to start with a bag size.</li></ol>',
    tips: [
      'Scaling yeast is linear, but large batches heat up faster.',
      'Rounding errors are minimized by the app.',
      'Check your bowl capacity before scaling up massively.'
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
    title: 'Long-Term Fermentation',
    image: 'https://images.unsplash.com/photo-1594311242637-a2d2a4585c54?q=80&w=2070&auto=format&fit=crop',
    intro: 'Pushing fermentation beyond 48 hours requires careful management but yields unique results.',
    why: '<ul><li>Maximum flavor development.</li><li>High digestibility.</li><li>Unique blistering on the crust.</li></ul>',
    howTo: '<ol><li>Reduce yeast significantly.</li><li>Ensure cold fridge temp (3-4°C).</li><li>Use strong flour to prevent gluten breakdown.</li></ol>',
    tips: [
      'Watch for "dough soup" (enzyme degradation).',
      'If dough is weak, ball it tightly and give a short rest.',
      'Ideally use within 72-96 hours.'
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
    title: 'Natural Fermentation (Levain)',
    image: 'https://images.unsplash.com/photo-1560181313-a5370557e411?q=80&w=2070&auto=format&fit=crop',
    intro: 'Using wild yeast starter instead of commercial yeast.',
    why: '<ul><li>Distinct sour flavor profile.</li><li>Better keeping qualities.</li><li>Chewier crust texture.</li></ul>',
    howTo: '<ol><li>Select "My Levain" in the calculator.</li><li>Input the percentage (usually 10-20%).</li><li>Account for the flour/water in the starter (app does this).</li></ol>',
    tips: [
      'Ensure starter is active and bubbly.',
      'Bulk fermentation takes longer (4-8 hours).',
      'Acid degrades gluten, so watch the timing.'
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
    title: 'Micro-Batch Baking',
    image: 'https://images.unsplash.com/photo-1528731708534-816fe59f90cb?q=80&w=2070&auto=format&fit=crop',
    intro: 'Techniques for making just one or two pizzas without waste.',
    why: '<ul><li>Perfect for solo dinners or testing.</li><li>Reduces ingredient waste.</li><li>Fast experimentation cycle.</li></ul>',
    howTo: '<ol><li>Set number of pizzas to 1 or 2.</li><li>Use a small bowl or jar for mixing.</li><li>Techniques remain the same, just smaller scale.</li></ol>',
    tips: [
      'Measurements must be very precise (use 0.1g scale).',
      'Temperature swings happen faster in small dough mass.',
      'Great way to test a new flour or variable.'
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
    title: 'Visual Indicators & Photography',
    image: 'https://images.unsplash.com/photo-1513312999432-a7afa260d8a0?q=80&w=2070&auto=format&fit=crop',
    intro: 'Using photos to track and improve your pizza.',
    why: '<ul><li>Objective record of results.</li><li>Helps diagnose crumb and crust issues.</li><li>Tracks visual progress over time.</li></ul>',
    howTo: '<ol><li>Take photos of the dough ball (before/after rise).</li><li>Take photos of the final pizza (top and bottom).</li><li>Take a "crumb shot" (cross section of the rim).</li></ol>',
    tips: [
      'Good lighting is key.',
      'Attach photos to your Batch Diary logs.',
      'Compare crumb shots to check fermentation.'
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
    title: 'Preferments In-Depth',
    image: 'placeholder_url_prefermentos.jpg',
    intro: 'A detailed look at Poolish, Biga, and Sponge methods.',
    why: '<ul><li>Understand the specific benefits of each.</li><li>Match the preferment to your desired style.</li><li>Master advanced flavor building.</li></ul>',
    howTo: '<ol><li>Select "With Preferment" in the calculator.</li><li>Choose type (Poolish/Biga).</li><li>Set percentage (typically 20-50%).</li></ol>',
    tips: [
      'Poolish (100% hyd) = Extensibility, nuttiness.',
      'Biga (50% hyd) = Strength, earthiness.',
      'Sponge = General purpose, often for enriched doughs.'
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
    title: 'Mixing Times & Techniques',
    image: 'placeholder_url_mistura_amassamento.jpg',
    intro: 'How mixing affects oxidation, gluten development, and final crumb color.',
    why: '<ul><li>Prevent over-oxidation (bleached flavor).</li><li>Ensure optimal gluten development.</li><li>Control dough temperature.</li></ul>',
    howTo: '<ol><li>Mix just until ingredients are combined (shaggy).</li><li>Rest (autolyse).</li><li>Mix to windowpane or use folds.</li></ol>',
    tips: [
      'Mix on low speed to minimize friction heat.',
      'Don\'t mix to full development if doing long ferment.',
      'Stop if dough tears; let it rest.'
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
    title: 'Ambient Temp & Humidity',
    image: 'placeholder_url_controle_ambiente_massa.jpg',
    intro: 'How your kitchen environment affects fermentation.',
    why: '<ul><li>Seasonality affects recipe performance.</li><li>Humidity affects flour absorption.</li><li>Temperature drives fermentation rate.</li></ul>',
    howTo: '<ol><li>Monitor room specs.</li><li>Adjust water temp to compensate.</li><li>Adjust hydration for very dry/humid days.</li></ol>',
    tips: [
      'Summer: Use ice water, less yeast.',
      'Winter: Use warm water, proof in oven with light on.',
      'High humidity: Hold back 2-3% water initially.'
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
    intro: 'Choosing the right tool for the job: Stone, Steel, or Pan.',
    why: '<ul><li>Maximize your oven\'s potential.</li><li>Achieve specific crust textures.</li><li>Avoid baking failures.</li></ul>',
    howTo: '<ol><li>Identify your oven type (Gas, Electric, Wood).</li><li>Match surface to style (Steel for NY, Pan for Detroit).</li><li>Position rack correctly (bottom for steel, middle for stone).</li></ol>',
    tips: [
      'Steel is heavy; handle with care.',
      'Never wash stone with soap.',
      'Season pans for non-stick performance.'
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
    title: 'Autolyse Technique',
    image: 'placeholder_url_autolyse.jpg',
    intro: 'Resting flour and water before adding salt/yeast.',
    why: '<ul><li>Improves extensibility (easier stretching).</li><li>Reduces kneading time.</li><li>Makes dough easier to handle.</li></ul>',
    howTo: '<ol><li>Mix flour and water only.</li><li>Cover and rest 20-60 minutes.</li><li>Add salt and yeast and finish mixing.</li></ol>',
    tips: [
      'Essential for high hydration doughs.',
      'Don\'t add yeast during autolyse (that\'s fermentolyse).',
      'Even 15 minutes makes a difference.'
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
    title: 'Tangzhong & Yudane',
    image: 'placeholder_url_tangzhong.jpg',
    intro: 'Asian techniques for softer, fluffier breads.',
    why: '<ul><li>Pre-gelatinized starch holds moisture.</li><li>Extends shelf life significantly.</li><li>Creates "shreddable" soft crumb.</li></ul>',
    howTo: '<ol><li>Cook ~5% of flour with water/milk to make a roux.</li><li>Cool roux.</li><li>Add to main dough mix.</li></ol>',
    tips: [
      'Use for milk breads, burger buns, cinnamon rolls.',
      'Ratio is usually 1:5 (flour:liquid) for Tangzhong.',
      'Yudane uses boiling water on flour (no cooking).'
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
    title: 'Adaptive Reverse Mode',
    image: 'placeholder_url_modo_reverso_adaptativo2.jpg',
    intro: 'Calculate recipes based on available ingredients.',
    why: '<ul><li>Prevents waste.</li><li>Flexible baking.</li><li>Empowers creativity.</li></ul>',
    howTo: '<ol><li>Enter known quantity (e.g., 500g flour).</li><li>App calculates other ingredients to match ratios.</li><li>Bake confidently.</li></ol>',
    tips: [
      'Works for any ingredient (starter, water, etc.).',
      'Great for using up ends of bags.',
      'Validates if you have enough for a recipe.'
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
    title: 'High Hydration Techniques',
    image: 'placeholder_url_alta_hidracao.jpg',
    intro: 'Handling wet doughs without fear.',
    why: '<ul><li>Open, airy crumb.</li><li>Crispy, thin crust.</li><li>Artisan quality.</li></ul>',
    howTo: '<ol><li>Use wet hands or oil.</li><li>Use a bench scraper.</li><li>Focus on folds, not kneading.</li></ol>',
    tips: [
      'Confidence is key; don\'t hesitate.',
      'Cold dough is less sticky.',
      'Use rice flour for dusting banettons/peels.'
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
    title: 'Batch Management',
    image: 'placeholder_url_diario_batches.jpg',
    intro: 'Organize your baking life.',
    why: '<ul><li>Keep track of what works.</li><li>Plan future bakes.</li><li>Build a personal recipe book.</li></ul>',
    howTo: '<ol><li>Log every bake in the app.</li><li>Use tags and ratings.</li><li>Review before baking again.</li></ol>',
    tips: [
      'Consistency in logging leads to consistency in baking.',
      'Note weather conditions.',
      'Share successful batches with community.'
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
    title: 'Flour Registration',
    image: 'placeholder_url_cadastro_farinhas.jpg',
    intro: 'Managing your flour inventory.',
    why: '<ul><li>Know what you have.</li><li>Understand protein levels.</li><li>Make smart substitutions.</li></ul>',
    howTo: '<ol><li>Add flours to My Lab.</li><li>Note protein % and brand.</li><li>Use in recipes.</li></ol>',
    tips: [
      'Different brands absorb water differently.',
      'Keep flours sealed and cool.',
      'Note "best by" dates.'
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
    title: 'Sustainability in Baking',
    image: 'placeholder_url_sustentabilidade_massas.jpg',
    intro: 'Minimizing your baking footprint.',
    why: '<ul><li>Responsible consumption.</li><li>Energy efficiency.</li><li>Waste reduction.</li></ul>',
    howTo: '<ol><li>Bake multiple items at once.</li><li>Use local grains.</li><li>Compost scraps.</li></ol>',
    tips: [
      'Preheat only as long as necessary.',
      'Don\'t discard starter; use discard recipes.',
      'Buy flour in bulk to reduce packaging.'
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
    title: 'Voice Assistant',
    image: 'placeholder_url_assistente_voz.jpg',
    intro: 'Hands-free baking help.',
    why: '<ul><li>Keep hands in dough.</li><li>Hygiene.</li><li>Convenience.</li></ul>',
    howTo: '<ol><li>Enable voice features.</li><li>Ask for next steps or timers.</li><li>Dictate notes.</li></ol>',
    tips: [
      'Speak clearly.',
      'Use specific keywords.',
      'Great for setting multiple timers.'
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
    title: 'Community Challenges',
    image: 'placeholder_url_leaderboard_desafios.jpg',
    intro: 'Gamified baking improvement.',
    why: '<ul><li>Motivation to bake.</li><li>Learn new styles.</li><li>Community engagement.</li></ul>',
    howTo: '<ol><li>Join a weekly challenge.</li><li>Submit your results.</li><li>Earn badges.</li></ol>',
    tips: [
      'Focus on learning, not just winning.',
      'Share tips with others.',
      'Try styles outside your comfort zone.'
    ],
    reference: {
      name: 'Serious Eats – The Pizza Lab: Three Doughs to Know',
      url: 'https://www.seriouseats.com/the-pizza-lab-three-doughs-to-know'
    },
    accessLevel: 'pro'
  }
];
