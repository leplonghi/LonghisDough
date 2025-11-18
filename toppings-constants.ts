
import { ToppingCombination, RecipeStyle } from './types';

export const TOPPING_COMBINATIONS: ToppingCombination[] = [
    {
       id: 'margherita_doc',
       name: 'Margherita D.O.C',
       category: 'classic',
       compatibleStyles: [RecipeStyle.NEAPOLITAN],
       sizes: [
         { sizeCm: 30, sauceGrams: 60, cheeseGrams: 80, oilFinishGrams: 5 },
         { sizeCm: 32, sauceGrams: 70, cheeseGrams: 90, oilFinishGrams: 6 }
       ],
       notes: 'Tomato, quality mozzarella, basil, and a drizzle of oil at the end.',
       referenceTag: 'AVPN-inspired'
     },
     {
       id: 'margherita_casual',
       name: 'Homemade Margherita',
       category: 'classic',
       compatibleStyles: [RecipeStyle.NEW_YORK, RecipeStyle.PAN_PIZZA],
       sizes: [
         { sizeCm: 30, sauceGrams: 70, cheeseGrams: 100, oilFinishGrams: 4 },
         { sizeCm: 35, sauceGrams: 90, cheeseGrams: 130, oilFinishGrams: 5 }
       ],
       notes: 'Cheesier version, adapted for home ovens.',
       referenceTag: 'home-oven'
     },
     {
       id: 'pepperoni_ny',
       name: 'NY Pepperoni',
       category: 'classic',
       compatibleStyles: [RecipeStyle.NEW_YORK, RecipeStyle.THIN_CRUST],
       sizes: [
         { sizeCm: 35, sauceGrams: 100, cheeseGrams: 180, toppingsGrams: 80 },
         { sizeCm: 40, sauceGrams: 120, cheeseGrams: 220, toppingsGrams: 100 }
       ],
       notes: 'Generous sauce, lots of cheese, thin-sliced pepperoni.',
       referenceTag: 'NY-slice'
     },
     {
       id: 'quattro_formaggi',
       name: 'Four Cheese',
       category: 'classic',
       compatibleStyles: [RecipeStyle.NEAPOLITAN, RecipeStyle.NEW_YORK, RecipeStyle.PAN_PIZZA],
       sizes: [
         { sizeCm: 30, sauceGrams: 30, cheeseGrams: 120 },
         { sizeCm: 35, sauceGrams: 40, cheeseGrams: 150 }
       ],
       notes: 'White base (little or no sauce); blend of 3–4 cheeses.',
       referenceTag: 'cheese-heavy'
     },
     {
       id: 'calabresa_brasileira',
       name: 'Brazilian Calabresa',
       category: 'classic',
       compatibleStyles: [RecipeStyle.PAN_PIZZA, RecipeStyle.NEW_YORK],
       sizes: [
         { sizeCm: 30, sauceGrams: 70, cheeseGrams: 90, toppingsGrams: 90 },
         { sizeCm: 35, sauceGrams: 90, cheeseGrams: 110, toppingsGrams: 110 }
       ],
       notes: 'Sliced calabresa sausage + onions, very common in Brazil.',
       referenceTag: 'br-style'
     },
     {
       id: 'portuguesa',
       name: 'Portuguesa',
       category: 'classic',
       compatibleStyles: [RecipeStyle.PAN_PIZZA, RecipeStyle.NEW_YORK],
       sizes: [
         { sizeCm: 30, sauceGrams: 70, cheeseGrams: 90, toppingsGrams: 110 },
         { sizeCm: 35, sauceGrams: 90, cheeseGrams: 120, toppingsGrams: 140 }
       ],
       notes: 'Ham, boiled egg, peas, onion, and olives.',
       referenceTag: 'br-classic'
     },
     {
       id: 'margherita_romana',
       name: 'Roman Margherita (Tray)',
       category: 'classic',
       compatibleStyles: [RecipeStyle.ROMAN],
       sizes: [
         { sizeCm: 30, sauceGrams: 80, cheeseGrams: 100, oilFinishGrams: 8 }
       ],
       notes: 'Focused on the pan, more sauce, good use of olive oil.',
       referenceTag: 'roman-pan'
     },
     {
       id: 'vegetariana_mediterranea',
       name: 'Mediterranean Veggie',
       category: 'modern',
       compatibleStyles: [RecipeStyle.NEAPOLITAN, RecipeStyle.PAN_PIZZA],
       sizes: [
         { sizeCm: 30, sauceGrams: 70, cheeseGrams: 80, toppingsGrams: 90 },
         { sizeCm: 35, sauceGrams: 90, cheeseGrams: 100, toppingsGrams: 110 }
       ],
       notes: 'Roasted vegetables, olive oil, and herbs; balances toppings and dough.',
       referenceTag: 'med-style'
     },
     {
       id: 'bbq_chicken',
       name: 'BBQ Chicken',
       category: 'modern',
       compatibleStyles: [RecipeStyle.NEW_YORK, RecipeStyle.PAN_PIZZA],
       sizes: [
         { sizeCm: 30, sauceGrams: 40, cheeseGrams: 100, toppingsGrams: 100 },
         { sizeCm: 35, sauceGrams: 50, cheeseGrams: 130, toppingsGrams: 130 }
       ],
       notes: 'Barbecue base, chicken, cheese, and optionally red onion.',
       referenceTag: 'bbq-special'
     },
     {
       id: 'white_garlic',
       name: 'White Garlic',
       category: 'modern',
       compatibleStyles: [RecipeStyle.NEAPOLITAN, RecipeStyle.THIN_CRUST],
       sizes: [
         { sizeCm: 30, sauceGrams: 0, cheeseGrams: 110, toppingsGrams: 20, oilFinishGrams: 6 },
         { sizeCm: 35, sauceGrams: 0, cheeseGrams: 140, toppingsGrams: 25, oilFinishGrams: 8 }
       ],
       notes: 'No red sauce; olive oil base, garlic, and cheeses.',
       referenceTag: 'white-pizza'
     }
   ];
