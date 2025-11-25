

import { ReferenceItem } from './types';

export const REFERENCES: ReferenceItem[] = [
  {
    id: 'avpn',
    source: 'Associazione Verace Pizza Napoletana',
    title: 'AVPN International Regulations',
    type: 'Standard',
    link: 'https://www.pizzanapoletana.org/en/ricetta_pizza_napoletana',
    summary: 'Defines the strict rules for authentic Neapolitan pizza, including ingredients (00 flour W 250-310, water, salt, yeast), prohibiting fats and sugars. Details the fermentation process and baking in a wood-fired oven at 430-480°C.',
    tags: ['pizza', 'neapolitan', 'regulation', 'flour'],
  },
  {
    id: 'serious_eats_ny',
    source: 'Serious Eats',
    title: 'New York-Style Pizza Recipe',
    type: 'Website',
    link: 'https://www.seriouseats.com/new-york-style-pizza-recipes',
    summary: 'A detailed guide to NY style pizza, highlighting the use of high protein flour, addition of oil and sugar for color and texture, and the importance of long cold fermentation. Recommends using a "baking steel" for best results in home ovens.',
    tags: ['pizza', 'ny-style', 'oven', 'fermentation'],
  },
  {
    id: 'king_arthur_ddt',
    source: 'King Arthur Baking',
    title: 'Desired Dough Temperature (DDT)',
    type: 'Technical Guide',
    link: 'https://www.kingarthurbaking.com/pro/reference/desired-dough-temperature',
    summary: 'Explains the importance of controlling final dough temperature for predictable fermentation. Presents the formula to calculate necessary water temperature, taking into account ambient, flour temperature, and friction factor.',
    tags: ['technique', 'fermentation', 'temperature', 'ddt'],
  },
  {
    id: 'chainbaker_cold',
    source: 'ChainBaker',
    title: 'Cold Fermentation',
    type: 'Website',
    link: 'https://www.chainbaker.com/cold-bulk-fermentation/',
    summary: 'Analyzes the benefits of cold fermentation (fridge retard), which slows yeast gas production while enzymatic activity continues, resulting in complex flavors and more digestible, extensible dough.',
    tags: ['technique', 'fermentation', 'flavor'],
  },
  {
    id: 'pizzablab_gluten',
    source: 'PizzaBlab',
    title: 'Gluten Development',
    type: 'Technical Guide',
    link: 'https://pizzablab.com/gluten-development-for-pizza-dough/',
    summary: 'Details the formation of the gluten network from gliadin and glutenin proteins. Explains how hydration, kneading, and time (autolyse) contribute to creating dough with ideal elasticity and extensibility for pizza.',
    tags: ['technique', 'gluten', 'flour', 'kneading'],
  },
  {
    id: 'pizza_today_detroit',
    source: 'Pizza Today',
    title: 'The Detroiter: A Slice of the Motor City',
    type: 'Website',
    link: 'https://www.pizzatoday.com/departments/in-the-kitchen/the-detroiter-a-slice-of-the-motor-city/',
    summary: 'Describes the characteristics of Detroit style pizza, including high hydration dough (historically 70%+), use of "brick cheese", and baking in rectangular steel pans that create the iconic caramelized cheese crust (frico).',
    tags: ['pizza', 'detroit', 'pan-pizza'],
  },
];
