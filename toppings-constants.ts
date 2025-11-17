
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
       notes: 'Tomate, mozzarella de qualidade, manjericão e fio de azeite ao final.',
       referenceTag: 'AVPN-inspired'
     },
     {
       id: 'margherita_casual',
       name: 'Margherita caseira',
       category: 'classic',
       compatibleStyles: [RecipeStyle.NEW_YORK, RecipeStyle.PAN_PIZZA],
       sizes: [
         { sizeCm: 30, sauceGrams: 70, cheeseGrams: 100, oilFinishGrams: 4 },
         { sizeCm: 35, sauceGrams: 90, cheeseGrams: 130, oilFinishGrams: 5 }
       ],
       notes: 'Versão mais “queijuda”, adaptada para forno doméstico.',
       referenceTag: 'home-oven'
     },
     {
       id: 'pepperoni_ny',
       name: 'Pepperoni NY',
       category: 'classic',
       compatibleStyles: [RecipeStyle.NEW_YORK, RecipeStyle.THIN_CRUST],
       sizes: [
         { sizeCm: 35, sauceGrams: 100, cheeseGrams: 180, toppingsGrams: 80 },
         { sizeCm: 40, sauceGrams: 120, cheeseGrams: 220, toppingsGrams: 100 }
       ],
       notes: 'Molho generoso, muito queijo, pepperoni fatiado fino.',
       referenceTag: 'NY-slice'
     },
     {
       id: 'quattro_formaggi',
       name: 'Quatro Queijos',
       category: 'classic',
       compatibleStyles: [RecipeStyle.NEAPOLITAN, RecipeStyle.NEW_YORK, RecipeStyle.PAN_PIZZA],
       sizes: [
         { sizeCm: 30, sauceGrams: 30, cheeseGrams: 120 },
         { sizeCm: 35, sauceGrams: 40, cheeseGrams: 150 }
       ],
       notes: 'Base com pouco molho ou sem molho; mistura de 3–4 queijos.',
       referenceTag: 'cheese-heavy'
     },
     {
       id: 'calabresa_brasileira',
       name: 'Calabresa brasileira',
       category: 'classic',
       compatibleStyles: [RecipeStyle.PAN_PIZZA, RecipeStyle.NEW_YORK],
       sizes: [
         { sizeCm: 30, sauceGrams: 70, cheeseGrams: 90, toppingsGrams: 90 },
         { sizeCm: 35, sauceGrams: 90, cheeseGrams: 110, toppingsGrams: 110 }
       ],
       notes: 'Calabresa fatiada + cebola, bem comum em pizzarias brasileiras.',
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
       notes: 'Presunto, ovo, ervilha, cebola e azeitona, típica em pizzarias no Brasil.',
       referenceTag: 'br-classic'
     },
     {
       id: 'margherita_romana',
       name: 'Margherita Romana em Teglia',
       category: 'classic',
       compatibleStyles: [RecipeStyle.ROMAN],
       sizes: [
         { sizeCm: 30, sauceGrams: 80, cheeseGrams: 100, oilFinishGrams: 8 }
       ],
       notes: 'Focada em assadeira, mais molho, bom uso de azeite.',
       referenceTag: 'roman-pan'
     },
     {
       id: 'vegetariana_mediterranea',
       name: 'Vegetariana Mediterrânea',
       category: 'modern',
       compatibleStyles: [RecipeStyle.NEAPOLITAN, RecipeStyle.PAN_PIZZA],
       sizes: [
         { sizeCm: 30, sauceGrams: 70, cheeseGrams: 80, toppingsGrams: 90 },
         { sizeCm: 35, sauceGrams: 90, cheeseGrams: 100, toppingsGrams: 110 }
       ],
       notes: 'Legumes assados, azeite e ervas; mantém equilíbrio entre cobertura e massa.',
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
       notes: 'Base de barbecue, frango, queijo e, opcionalmente, cebola roxa.',
       referenceTag: 'bbq-special'
     },
     {
       id: 'white_garlic',
       name: 'Pizza Branca de Alho',
       category: 'modern',
       compatibleStyles: [RecipeStyle.NEAPOLITAN, RecipeStyle.THIN_CRUST],
       sizes: [
         { sizeCm: 30, sauceGrams: 0, cheeseGrams: 110, toppingsGrams: 20, oilFinishGrams: 6 },
         { sizeCm: 35, sauceGrams: 0, cheeseGrams: 140, toppingsGrams: 25, oilFinishGrams: 8 }
       ],
       notes: 'Sem molho vermelho; base de azeite, alho e queijos.',
       referenceTag: 'white-pizza'
     }
   ];
