
export interface AffiliateProduct {
  id: string;
  name: string;
  description: string;
  url: string;
  category: 'tools' | 'ovens' | 'ingredients' | 'books';
}

export const AFFILIATE_LINKS: AffiliateProduct[] = [
  // --- Essential Tools ---
  {
    id: 'scale_precision',
    name: 'Precision Digital Scale (0.1g)',
    description: 'Essential for weighing yeast and salt accurately. Consistency starts here.',
    url: 'https://example.com/scale',
    category: 'tools',
  },
  {
    id: 'dough_scraper',
    name: 'Stainless Steel Bench Scraper',
    description: 'For dividing dough and cleaning work surfaces effectively.',
    url: 'https://example.com/scraper',
    category: 'tools',
  },
  {
    id: 'thermometer',
    name: 'Instant Read Thermometer',
    description: 'Crucial for controlling water temp and checking finished dough temp (DDT).',
    url: 'https://example.com/thermometer',
    category: 'tools',
  },
  {
    id: 'proofing_box',
    name: 'Dough Proofing Box',
    description: 'Maintain consistent temperature and humidity for fermentation.',
    url: 'https://example.com/proofing-box',
    category: 'tools',
  },

  // --- Ovens & Surfaces ---
  {
    id: 'baking_steel',
    name: 'Baking Steel (Heavy Duty)',
    description: 'Superior heat conduction for home ovens. Creates the perfect crust.',
    url: 'https://example.com/steel',
    category: 'ovens',
  },
  {
    id: 'pizza_stone',
    name: 'Cordierite Pizza Stone',
    description: 'Classic thermal mass for consistent baking.',
    url: 'https://example.com/stone',
    category: 'ovens',
  },
  {
    id: 'ooni_oven',
    name: 'Portable Pizza Oven (Gas/Wood)',
    description: 'Reach 500°C (932°F) for authentic Neapolitan pizza.',
    url: 'https://example.com/oven',
    category: 'ovens',
  },

  // --- Ingredients ---
  {
    id: 'flour_00',
    name: 'Italian Type 00 Flour',
    description: 'Finely milled, medium strength. The standard for Neapolitan pizza.',
    url: 'https://example.com/flour-00',
    category: 'ingredients',
  },
  {
    id: 'flour_high_protein',
    name: 'High Protein Bread Flour',
    description: 'High gluten potential for chewiness and structure (NY Style / Bread).',
    url: 'https://example.com/flour-bread',
    category: 'ingredients',
  },
  {
    id: 'yeast_saf',
    name: 'SAF Instant Yeast (Gold/Red)',
    description: 'Reliable fermentation power used by professionals.',
    url: 'https://example.com/yeast',
    category: 'ingredients',
  },

  // --- Books ---
  {
    id: 'book_fwsw',
    name: 'Flour Water Salt Yeast',
    description: 'The definitive guide to artisan bread and pizza by Ken Forkish.',
    url: 'https://example.com/book-fwsw',
    category: 'books',
  },
  {
    id: 'book_pizza_bible',
    name: 'The Pizza Bible',
    description: 'Comprehensive masterclass on pizza styles by Tony Gemignani.',
    url: 'https://example.com/book-bible',
    category: 'books',
  },
  {
    id: 'book_modernist',
    name: 'Modernist Pizza',
    description: 'The ultimate scientific deep dive into pizza.',
    url: 'https://example.com/book-modernist',
    category: 'books',
  },
];

export const getProductsByCategory = (category: AffiliateProduct['category']) => {
  return AFFILIATE_LINKS.filter(p => p.category === category);
};

export const getRecommendedProductsForStyle = (category: string) => {
  // Simple logic to recommend products based on style category
  if (category === 'Pizza') {
    return AFFILIATE_LINKS.filter(p => ['baking_steel', 'flour_00', 'ooni_oven'].includes(p.id));
  }
  if (category === 'Pão' || category === 'Bread') {
    return AFFILIATE_LINKS.filter(p => ['proofing_box', 'flour_high_protein', 'book_fwsw'].includes(p.id));
  }
  return AFFILIATE_LINKS.filter(p => p.category === 'tools').slice(0, 3);
};
