
export const AFFILIATE_LINKS = {
  digitalScales: "https://example.com/scales",
  doughScrapers: "https://example.com/scrapers",
  infraredThermometers: "https://example.com/infrared-thermometers",
  proofingContainers: "https://example.com/proofing-containers",
  bakingSteel: "https://example.com/baking-steel",
  bakingStone: "https://example.com/baking-stone",
  pizzaOven: "https://example.com/pizza-oven",
  type00Flour: "https://example.com/type00-flour",
  highProteinFlour: "https://example.com/high-protein-flour",
  wholeWheatFlour: "https://example.com/wholewheat-flour",
  dryYeast: "https://example.com/yeast",
  levainJars: "https://example.com/levain-jar",
  doughTubs: "https://example.com/dough-tubs",
  bookFWSY: "https://example.com/book-flour-water-salt-yeast",
  bookPizzaBible: "https://example.com/book-pizza-bible",
  bookModernistBread: "https://example.com/book-modernist-bread"
} as const;

export type AffiliateLinkKey = keyof typeof AFFILIATE_LINKS;

export interface AffiliateProduct {
  id: string;
  name: string;
  description: string;
  url: string;
  category: 'tools' | 'ovens' | 'ingredients' | 'books';
  linkKey?: AffiliateLinkKey;
}

// The UI consumes this array for the Shop and Suggestions
export const SHOP_PRODUCTS: AffiliateProduct[] = [
  // --- Essential Tools ---
  {
    id: 'scale_precision',
    name: 'Precision Digital Scale (0.1g)',
    description: 'Essential for weighing yeast and salt accurately. Consistency starts here.',
    url: AFFILIATE_LINKS.digitalScales,
    category: 'tools',
    linkKey: 'digitalScales'
  },
  {
    id: 'dough_scraper',
    name: 'Stainless Steel Bench Scraper',
    description: 'For dividing dough and cleaning work surfaces effectively.',
    url: AFFILIATE_LINKS.doughScrapers,
    category: 'tools',
    linkKey: 'doughScrapers'
  },
  {
    id: 'thermometer',
    name: 'Instant Read Thermometer',
    description: 'Crucial for controlling water temp and checking finished dough temp (DDT).',
    url: AFFILIATE_LINKS.infraredThermometers,
    category: 'tools',
    linkKey: 'infraredThermometers'
  },
  {
    id: 'proofing_box',
    name: 'Dough Proofing Box',
    description: 'Maintain consistent temperature and humidity for fermentation.',
    url: AFFILIATE_LINKS.proofingContainers,
    category: 'tools',
    linkKey: 'proofingContainers'
  },

  // --- Ovens & Surfaces ---
  {
    id: 'baking_steel',
    name: 'Baking Steel (Heavy Duty)',
    description: 'Superior heat conduction for home ovens. Creates the perfect crust.',
    url: AFFILIATE_LINKS.bakingSteel,
    category: 'ovens',
    linkKey: 'bakingSteel'
  },
  {
    id: 'pizza_stone',
    name: 'Cordierite Pizza Stone',
    description: 'Classic thermal mass for consistent baking.',
    url: AFFILIATE_LINKS.bakingStone,
    category: 'ovens',
    linkKey: 'bakingStone'
  },
  {
    id: 'ooni_oven',
    name: 'Portable Pizza Oven (Gas/Wood)',
    description: 'Reach 500°C (932°F) for authentic Neapolitan pizza.',
    url: AFFILIATE_LINKS.pizzaOven,
    category: 'ovens',
    linkKey: 'pizzaOven'
  },

  // --- Ingredients ---
  {
    id: 'flour_00',
    name: 'Italian Type 00 Flour',
    description: 'Finely milled, medium strength. The standard for Neapolitan pizza.',
    url: AFFILIATE_LINKS.type00Flour,
    category: 'ingredients',
    linkKey: 'type00Flour'
  },
  {
    id: 'flour_high_protein',
    name: 'High Protein Bread Flour',
    description: 'High gluten potential for chewiness and structure (NY Style / Bread).',
    url: AFFILIATE_LINKS.highProteinFlour,
    category: 'ingredients',
    linkKey: 'highProteinFlour'
  },
  {
    id: 'yeast_saf',
    name: 'SAF Instant Yeast (Gold/Red)',
    description: 'Reliable fermentation power used by professionals.',
    url: AFFILIATE_LINKS.dryYeast,
    category: 'ingredients',
    linkKey: 'dryYeast'
  },

  // --- Books ---
  {
    id: 'book_fwsw',
    name: 'Flour Water Salt Yeast',
    description: 'The definitive guide to artisan bread and pizza by Ken Forkish.',
    url: AFFILIATE_LINKS.bookFWSY,
    category: 'books',
    linkKey: 'bookFWSY'
  },
  {
    id: 'book_pizza_bible',
    name: 'The Pizza Bible',
    description: 'Comprehensive masterclass on pizza styles by Tony Gemignani.',
    url: AFFILIATE_LINKS.bookPizzaBible,
    category: 'books',
    linkKey: 'bookPizzaBible'
  },
  {
    id: 'book_modernist',
    name: 'Modernist Pizza',
    description: 'The ultimate scientific deep dive into pizza.',
    url: AFFILIATE_LINKS.bookModernistBread, // Using similar key for simplicity
    category: 'books',
    linkKey: 'bookModernistBread'
  },
];
