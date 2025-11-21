
import { DoughStyleDefinition, FermentationTechnique } from '../types';

export const STYLES_DATA: DoughStyleDefinition[] = [
  {
    id: 'neapolitan_avpn',
    name: 'Neapolitan Pizza (AVPN)',
    category: 'Pizza',
    country: 'Italy (Naples)',
    year: '1984 (Official Regulation)',
    description: 'The certified Neapolitan style: soft, elastic, easily foldable, with a characteristic raised rim (cornicione) and leopard spotting. Strictly no fat or sugar.',
    history: 'Protected by the Associazione Verace Pizza Napoletana (AVPN). Requires wood-fired oven at 430-480°C and hand-stretching technique.',
    isPro: false,
    technical: {
      hydration: 62, // Range: 58-65%
      salt: 2.8,     // Range: 2.5-3%
      oil: 0,
      sugar: 0,
      fermentation: 'Long Ambient (8-24h)',
      fermentationTechnique: FermentationTechnique.DIRECT,
      bakingTempC: 450, // Range: 430-480°C
    },
    ingredients: [
      { id: 'flour', name: '00 Flour (W260-310)', type: 'solid', role: 'flour', bakerPercentage: 100 },
      { id: 'water', name: 'Water', type: 'liquid', role: 'water', bakerPercentage: 62 },
      { id: 'salt', name: 'Sea Salt', type: 'solid', role: 'salt', bakerPercentage: 2.8 },
      { id: 'yeast', name: 'Fresh Yeast', type: 'solid', role: 'yeast', bakerPercentage: 0.1 }
    ],
    variations: ['AVPN Classica', 'Moderna (higher hydration)', 'Canotto (very puffy rim)'],
    risks: ['Pale crust if fermentation is too short', 'Tearing if flour is too weak (W<260)'],
    notes: ['Hand stretch only (no rolling pin).', 'Must be baked in 60-90 seconds.'],
    references: ['AVPN International Regulation', 'Modernist Pizza']
  },
  {
    id: 'country_sourdough',
    name: 'Country Sourdough (Tartine Style)',
    category: 'Pão',
    country: 'USA (San Francisco)',
    year: '2002',
    description: 'Modern artisan bread with a thick caramelized crust, open crumb, and mild acidity. Relies on high hydration and young levain.',
    history: 'Popularized by Chad Robertson at Tartine Bakery, this style revolutionized modern bread baking by focusing on high hydration and gentle handling.',
    isPro: false,
    technical: {
      hydration: 75, // Range: 70-85%
      salt: 2.0,     // Range: 2-2.2%
      oil: 0,
      sugar: 0,
      fermentation: 'Bulk (3-5h) + Cold Retard (12-20h)',
      fermentationTechnique: FermentationTechnique.DIRECT, // Uses Levain
      bakingTempC: 250,
    },
    ingredients: [
      { id: 'flour', name: 'Bread/Whole Wheat Blend', type: 'solid', role: 'flour', bakerPercentage: 100 },
      { id: 'water', name: 'Water', type: 'liquid', role: 'water', bakerPercentage: 75 },
      { id: 'salt', name: 'Sea Salt', type: 'solid', role: 'salt', bakerPercentage: 2.0 },
      { id: 'levain', name: 'Young Levain', type: 'solid', role: 'starter', bakerPercentage: 20.0 }
    ],
    variations: ['High Hydration (85%)', 'Whole Grain Heavy'],
    risks: ['Structure collapse if hydration exceeds flour strength', 'Over-proofing in fridge'],
    notes: ['Requires Autolyse.', 'Gentle folding during bulk is essential.'],
    references: ['Tartine Bread (Chad Robertson)', 'The Perfect Loaf']
  },
  {
    id: 'shokupan_basic',
    name: 'Shokupan (Japanese Milk Bread)',
    category: 'Pão',
    country: 'Japan',
    year: '1960s',
    description: 'An incredibly soft, fluffy, white bread with a shreddable crumb. Uses the Tangzhong (water roux) method to retain moisture.',
    history: 'Developed in Japan to suit local tastes for soft, sweet, moist bread. The Tangzhong method gelatinizes starches to hold more water.',
    isPro: false,
    technical: {
      hydration: 68, // Range: 65-70% total
      salt: 1.8,     // Range: 1.8-2%
      oil: 10.0,     // Butter: 8-12%
      sugar: 10.0,   // Range: 8-12%
      fermentation: 'Warm Bulk (60-90m) + Proof (45-60m)',
      fermentationTechnique: FermentationTechnique.DIRECT,
      bakingTempC: 180,
    },
    ingredients: [
      { id: 'flour', name: 'Bread Flour', type: 'solid', role: 'flour', bakerPercentage: 100 },
      { id: 'milk', name: 'Milk', type: 'liquid', role: 'water', bakerPercentage: 68 },
      { id: 'butter', name: 'Butter', type: 'solid', role: 'fat', bakerPercentage: 10.0 },
      { id: 'sugar', name: 'Sugar', type: 'solid', role: 'sugar', bakerPercentage: 10.0 },
      { id: 'salt', name: 'Salt', type: 'solid', role: 'salt', bakerPercentage: 1.8 },
      { id: 'yeast', name: 'Instant Yeast', type: 'solid', role: 'yeast', bakerPercentage: 1.5 }
    ],
    variations: ['Yudane Method (boiling water)', 'Cream Shokupan'],
    risks: ['Rubberiness if over-mixed', 'Collapse if Tangzhong is too hot when mixing'],
    notes: ['Tangzhong: Cook 5-10% of flour with 5x water to 65°C.', 'Bake in a Pullman tin.'],
    references: ['65°C Bread Doctor', 'Just One Cookbook']
  },
  {
    id: 'panettone_milanese',
    name: 'Panettone Milanese (Base)',
    category: 'Doce',
    country: 'Italy (Milan)',
    year: '15th Century',
    description: 'The Mount Everest of baking. A complex, enriched dough leavened solely by a stiff sourdough starter (Lievito Madre).',
    history: 'A protected traditional product of Italy. Requires precise temperature control, pH management, and multi-stage fermentation.',
    isPro: false,
    technical: {
      hydration: 48, // Range: 45-50%
      salt: 1.0,     // Low salt
      oil: 20.0,     // Butter: 18-22% (Base recipe, can go higher)
      sugar: 20.0,   // Range: 18-22%
      fermentation: 'Multi-stage: First Dough (12h) + Second Dough (6h)',
      fermentationTechnique: FermentationTechnique.DIRECT, // Lievito Madre
      bakingTempC: 165,
    },
    ingredients: [
      { id: 'flour', name: 'Manitoba/Panettone Flour (W350+)', type: 'solid', role: 'flour', bakerPercentage: 100 },
      { id: 'water', name: 'Water', type: 'liquid', role: 'water', bakerPercentage: 48 },
      { id: 'yolks', name: 'Egg Yolks', type: 'liquid', role: 'other', bakerPercentage: 15.0 },
      { id: 'butter', name: 'Butter', type: 'solid', role: 'fat', bakerPercentage: 20.0 },
      { id: 'sugar', name: 'Sugar', type: 'solid', role: 'sugar', bakerPercentage: 20.0 },
      { id: 'lievito', name: 'Lievito Madre (Stiff)', type: 'solid', role: 'starter', bakerPercentage: 25.0 },
      { id: 'fruit', name: 'Candied Fruit/Raisins', type: 'solid', role: 'other', bakerPercentage: 70.0 }
    ],
    variations: ['Modern High Fat', 'Pandoro', 'Colomba'],
    risks: ['Acidification of Lievito causes collapse', 'Emulsion breaking if butter added too fast'],
    notes: ['Must hang upside down to cool.', 'Lievito needs 3 refreshments before use.'],
    references: ['Disciplinare di Produzione', 'Iginio Massari', 'Roy Shvartzapel']
  },
  {
    id: 'ny_style',
    name: 'New York Style',
    category: 'Pizza',
    country: 'USA',
    year: '1905',
    description: 'Large, foldable slices with a crisp crust and soft interior. The everyday pizza.',
    history: 'Brought by Neapolitan immigrants, adapted to NYC coal/gas ovens and American high-protein flour.',
    isPro: true,
    technical: {
      hydration: 65,
      salt: 2.0,
      oil: 2.0,
      sugar: 1.0,
      fermentation: 'Long cold ferment (24-72h)',
      fermentationTechnique: FermentationTechnique.DIRECT,
      bakingTempC: 280,
    },
    ingredients: [
      { id: 'flour', name: 'Bread Flour', type: 'solid', role: 'flour', bakerPercentage: 100 },
      { id: 'water', name: 'Water', type: 'liquid', role: 'water', bakerPercentage: 65 },
      { id: 'salt', name: 'Salt', type: 'solid', role: 'salt', bakerPercentage: 2.0 },
      { id: 'sugar', name: 'Sugar', type: 'solid', role: 'sugar', bakerPercentage: 1.0 },
      { id: 'oil', name: 'Oil/Olive Oil', type: 'liquid', role: 'fat', bakerPercentage: 2.0 },
      { id: 'yeast', name: 'Yeast', type: 'solid', role: 'yeast', bakerPercentage: 0.4 }
    ],
    variations: ['New Haven (thinner and more charred)'],
    risks: ['Drying out if baked too long in a cool oven.'],
    notes: ['Ideal for home ovens.', 'Sugar helps with browning.'],
    references: ['Serious Eats', 'Pizza Bible']
  },
  {
    id: 'focaccia_genovese',
    name: 'Focaccia Genovese',
    category: 'Pão',
    country: 'Italy',
    year: 'Ancient',
    description: 'Flatbread, oily, with characteristic dimples and a salty crust.',
    history: 'A classic from Liguria, served for breakfast or as a snack. Brine (water + salt) and olive oil on top are essential.',
    isPro: true,
    technical: {
      hydration: 75,
      salt: 2.5,
      oil: 5.0, // In dough
      sugar: 1.0,
      fermentation: 'Medium (direct or poolish)',
      fermentationTechnique: FermentationTechnique.DIRECT,
      bakingTempC: 230,
    },
    ingredients: [
      { id: 'flour', name: 'Medium/Strong Flour', type: 'solid', role: 'flour', bakerPercentage: 100 },
      { id: 'water', name: 'Water', type: 'liquid', role: 'water', bakerPercentage: 75 },
      { id: 'salt', name: 'Salt', type: 'solid', role: 'salt', bakerPercentage: 2.5 },
      { id: 'oil', name: 'Olive Oil (Dough)', type: 'liquid', role: 'fat', bakerPercentage: 5.0 },
      { id: 'yeast', name: 'Yeast', type: 'solid', role: 'yeast', bakerPercentage: 0.5 },
      { id: 'sugar', name: 'Malt/Sugar', type: 'solid', role: 'sugar', bakerPercentage: 1.0 }
    ],
    risks: ['Sticking to the pan if not oiled enough.', 'Dense crumb if under-proofed.'],
    notes: ['Dimple vigorously with fingers.', 'Drizzle with brine before baking.'],
    references: ['Ezra Pound', 'Samin Nosrat']
  },
  {
      id: 'teglia_romana',
      name: 'Roman Pan Pizza (Teglia)',
      category: 'Pizza',
      country: 'Italy',
      year: '1980s (modern)',
      description: 'High hydration, baked in rectangular pans. Crispy bottom, very airy crumb.',
      history: 'The reinvention of Roman pizza al taglio, focused on digestibility and open crumb structure.',
      isPro: true,
      technical: {
        hydration: 80,
        salt: 2.5,
        oil: 3.0,
        sugar: 0,
        fermentation: 'Long cold ferment (24-48h)',
        fermentationTechnique: FermentationTechnique.DIRECT,
        bakingTempC: 250,
      },
      ingredients: [
        { id: 'flour', name: 'Very Strong Flour (W320+)', type: 'solid', role: 'flour', bakerPercentage: 100 },
        { id: 'water', name: 'Ice Water', type: 'liquid', role: 'water', bakerPercentage: 80 },
        { id: 'salt', name: 'Salt', type: 'solid', role: 'salt', bakerPercentage: 2.5 },
        { id: 'oil', name: 'Olive Oil', type: 'liquid', role: 'fat', bakerPercentage: 3.0 },
        { id: 'yeast', name: 'Yeast', type: 'solid', role: 'yeast', bakerPercentage: 0.6 }
      ],
      risks: ['Hard to handle (very wet).', 'Requires stretch & fold.'],
      notes: ['Use semolina for stretching.', 'Bake on the bottom rack for a crispy base.'],
      references: ['Gabriele Bonci']
  }
];

export function getStyleById(id: string): DoughStyleDefinition | undefined {
  return STYLES_DATA.find(s => s.id === id);
}
