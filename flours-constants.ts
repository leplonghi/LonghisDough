import { FlourDefinition } from './types';

export const FLOURS: FlourDefinition[] = [
  {
    id: 'generic_all_purpose',
    name: 'Farinha de Trigo Tipo 1 (Padrão)',
    category: 'all_purpose',
    strengthW: 220,
    protein: 10.5,
    recommendedUses: ['pizza', 'bread', 'focaccia', 'general'],
    hydrationHint: {
      min: 58,
      max: 65,
    },
    notes: 'Farinha de supermercado versátil, boa para fermentações curtas e hidratação moderada.',
  },
  {
    id: '00_pizza_napoletana',
    name: 'Farinha 00 Pizza Napoletana (W 250-310)',
    category: '00',
    strengthW: 280,
    protein: 12.5,
    recommendedUses: ['pizza'],
    hydrationHint: {
      min: 58,
      max: 67,
    },
    notes:
      'Ideal para pizza napolitana clássica, com fermentação de 8 a 24 horas. Equilibra extensibilidade e força.',
  },
  {
    id: '00_strong',
    name: 'Farinha 00 Reforçada (W 320+)',
    category: '00',
    strengthW: 340,
    protein: 13,
    recommendedUses: ['pizza', 'bread'],
    hydrationHint: {
      min: 65,
      max: 75,
    },
    notes:
      'Forte e resistente, ideal para biga, fermentações longas (48h+) e pães de alta hidratação.',
  },
  {
    id: 'bread_flour',
    name: 'Farinha para Pão (Bread Flour)',
    category: 'bread',
    strengthW: 350,
    protein: 13.5,
    recommendedUses: ['bread', 'pizza'],
    hydrationHint: {
      min: 65,
      max: 80,
    },
    notes: 'Alto teor de proteína, excelente para pães rústicos, sourdough e massas que exigem estrutura.',
  },
  {
    id: 'whole_wheat',
    name: 'Farinha Integral',
    category: 'whole',
    protein: 13,
    recommendedUses: ['bread'],
    hydrationHint: {
      min: 70,
      max: 85,
    },
    notes: 'Absorve mais água ("sedenta"). Geralmente misturada 20-50% com farinha branca para melhor estrutura.',
  },
  {
    id: 'rye_flour',
    name: 'Farinha de Centeio',
    category: 'whole',
    protein: 9,
    recommendedUses: ['bread'],
    hydrationHint: {
      min: 75,
      max: 90,
    },
    notes: 'Sabor distinto e terroso, baixo glúten. Frequentemente usada em pães mais densos ou misturada com farinha de trigo para estrutura. Absorve bastante água.',
  },
  {
    id: 'manitoba_strong',
    name: 'Farinha Manitoba (Super Forte)',
    category: 'bread',
    strengthW: 400,
    protein: 14.5,
    recommendedUses: ['bread', 'pizza'],
    hydrationHint: {
      min: 70,
      max: 90,
    },
    notes: 'Farinha muito forte (W > 380), ideal para fermentações longuíssimas (panetone, colomba) e para reforçar farinhas mais fracas.',
  },
];