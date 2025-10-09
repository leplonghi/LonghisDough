// FIX: Import `useCallback` from react to resolve "Cannot find name 'useCallback'" error.
import React, { createContext, useState, useContext, useEffect, useCallback } from 'react';
import { Locale } from './types';

// Translation data
const translations = {
  en: {
    appName: 'DoughLabPro',
    header: {
      switch_to_dark: 'Switch to dark mode',
      switch_to_light: 'Switch to light mode',
    },
    footer: {
      pizza_making: 'Happy pizza making!',
    },
    form: {
      recipe_style: 'Recipe Style',
      napoletana: 'Napoletana',
      ny: 'New York',
      romana: 'Romana',
      core_parameters: 'Core Parameters',
      num_pizzas: 'Number of Pizzas',
      num_pizzas_note: 'Enter the total number of dough balls you want to make.',
      weight_per_pizza: 'Weight per Pizza (g)',
      weight_per_pizza_note:
        'Typical range: 250g-300g for Neapolitan style.',
      hydration: 'Hydration',
      hydration_tooltip:
        'The amount of water relative to flour. Higher hydration leads to a softer, airier crumb but can be harder to handle.',
      fermentation: 'Fermentation',
      direct: 'Direct',
      poolish: 'Poolish',
      biga: 'Biga',
      preferment_flour: 'Preferment Flour',
      preferment_flour_tooltip:
        'The percentage of total flour used in the preferment. Higher percentages develop more flavor but reduce fermentation time.',
      yeast_type: 'Yeast Type',
      yeast: 'Yeast',
      yeast_tooltip:
        'Controls the speed of fermentation. Adjust based on your desired proofing time and ambient temperature.',
      reset: 'Reset to Defaults',
      reset_aria: 'Reset form to default values',
    },
    yeast: {
      idy: 'Instant Dry Yeast (IDY)',
      ady: 'Active Dry Yeast (ADY)',
      fresh: 'Fresh Yeast',
    },
    results: {
      title: 'Your Recipe',
      export_pdf_aria: 'Export recipe to PDF',
      grams: 'Grams',
      ounces: 'Ounces',
      cups: 'Cups',
      preferment_title: 'Preferment ({technique})',
      final_dough_title: 'Final Dough',
      flour: 'Flour',
      water: 'Water',
      salt: 'Salt',
      oil: 'Oil',
      yeast: 'Yeast',
      total_dough: 'Total Dough',
      summary:
        '{count} dough ball{plural} at {weight}g each',
      notes: {
        flour:
          "The foundation of your dough. '00' flour is traditional for Neapolitan.",
        water:
          'Controls dough consistency. Use cold water for long fermentation.',
        salt: 'Strengthens gluten and adds flavor. Add away from yeast.',
        oil: 'Adds flavor and softness. Omitted in traditional Neapolitan.',
        yeast: 'ADY may need activation. IDY can be mixed in directly.',
      },
    },
    mobile_bar: {
      total_dough: 'Total Dough:',
      view_recipe: 'View Recipe',
      view_recipe_aria: 'Scroll to recipe',
    },
    units: {
      g: 'g',
      oz: 'oz',
      cups: 'cups',
      tbsp: 'tbsp',
      tsp: 'tsp',
    },
  },
  pt: {
    appName: 'DoughLabPro',
    header: {
      switch_to_dark: 'Mudar para modo escuro',
      switch_to_light: 'Mudar para modo claro',
    },
    footer: {
      pizza_making: 'Boas pizzas!',
    },
    form: {
      recipe_style: 'Estilo da Receita',
      napoletana: 'Napolitana',
      ny: 'Nova Iorque',
      romana: 'Romana',
      core_parameters: 'Parâmetros Principais',
      num_pizzas: 'Número de Pizzas',
      num_pizzas_note: 'Digite o número total de massas que você quer fazer.',
      weight_per_pizza: 'Peso por Pizza (g)',
      weight_per_pizza_note:
        'Típico: 250g-300g para o estilo Napolitano.',
      hydration: 'Hidratação',
      hydration_tooltip:
        'A quantidade de água relativa à farinha. Maior hidratação resulta em um miolo mais macio e aerado, mas pode ser mais difícil de manusear.',
      fermentation: 'Fermentação',
      direct: 'Direta',
      poolish: 'Poolish',
      biga: 'Biga',
      preferment_flour: 'Farinha do Pré-fermento',
      preferment_flour_tooltip:
        'A porcentagem da farinha total usada no pré-fermento. Porcentagens maiores desenvolvem más sabor, mas reduzem o tempo de fermentação.',
      yeast_type: 'Tipo de Fermento',
      yeast: 'Fermento',
      yeast_tooltip:
        'Controla a velocidade da fermentação. Ajuste com base no tempo de fermentação desejado e na temperatura ambiente.',
      reset: 'Redefinir Padrões',
      reset_aria: 'Redefinir formulário para os valores padrão',
    },
    yeast: {
      idy: 'Fermento Biológico Seco Instantâneo (IDY)',
      ady: 'Fermento Biológico Seco Ativo (ADY)',
      fresh: 'Fermento Fresco',
    },
    results: {
      title: 'Sua Receita',
      export_pdf_aria: 'Exportar receita para PDF',
      grams: 'Gramas',
      ounces: 'Onças',
      cups: 'Xícaras',
      preferment_title: 'Pré-fermento ({technique})',
      final_dough_title: 'Massa Final',
      flour: 'Farinha',
      water: 'Água',
      salt: 'Sal',
      oil: 'Azeite',
      yeast: 'Fermento',
      total_dough: 'Massa Total',
      summary: '{count} massa{plural} de {weight}g cada',
      notes: {
        flour:
          "A base da sua massa. Farinha '00' é tradicional para Napolitana.",
        water:
          'Controla a consistência da massa. Use água fria para longas fermentações.',
        salt: 'Fortalece o glúten e adiciona sabor. Adicione longe do fermento.',
        oil: 'Adiciona sabor e maciez. Omitido na Napolitana tradicional.',
        yeast: 'ADY pode precisar de ativação. IDY pode ser misturado diretamente.',
      },
    },
    mobile_bar: {
      total_dough: 'Massa Total:',
      view_recipe: 'Ver Receita',
      view_recipe_aria: 'Rolar para a receita',
    },
    units: {
      g: 'g',
      oz: 'oz',
      cups: 'xícaras',
      tbsp: 'cs',
      tsp: 'cc',
    },
  },
  es: {
    appName: 'DoughLabPro',
    header: {
      switch_to_dark: 'Cambiar a modo oscuro',
      switch_to_light: 'Cambiar a modo claro',
    },
    footer: {
      pizza_making: '¡Feliz preparación de pizza!',
    },
    form: {
      recipe_style: 'Estilo de Receta',
      napoletana: 'Napolitana',
      ny: 'Nueva York',
      romana: 'Romana',
      core_parameters: 'Parámetros Principales',
      num_pizzas: 'Número de Pizzas',
      num_pizzas_note:
        'Ingrese el número total de bollos de masa que desea hacer.',
      weight_per_pizza: 'Peso por Pizza (g)',
      weight_per_pizza_note:
        'Rango típico: 250g-300g para el estilo Napolitano.',
      hydration: 'Hidratación',
      hydration_tooltip:
        'La cantidad de agua en relación con la harina. Una mayor hidratación produce una miga más suave y aireada, pero puede ser más difícil de manejar.',
      fermentation: 'Fermentación',
      direct: 'Directa',
      poolish: 'Poolish',
      biga: 'Biga',
      preferment_flour: 'Harina del Prefermento',
      preferment_flour_tooltip:
        'El porcentaje de harina total utilizado en el prefermento. Porcentajes más altos desarrollan más sabor pero reducen el tiempo de fermentación.',
      yeast_type: 'Tipo de Levadura',
      yeast: 'Levadura',
      yeast_tooltip:
        'Controla la velocidad de la fermentación. Ajuste según el tiempo de levado deseado y la temperatura ambiente.',
      reset: 'Restablecer Valores',
      reset_aria: 'Restablecer formulario a los valores predeterminados',
    },
    yeast: {
      idy: 'Levadura Seca Instantánea (IDY)',
      ady: 'Levadura Seca Activa (ADY)',
      fresh: 'Levadura Fresca',
    },
    results: {
      title: 'Tu Receta',
      export_pdf_aria: 'Exportar receta a PDF',
      grams: 'Gramos',
      ounces: 'Onzas',
      cups: 'Tazas',
      preferment_title: 'Prefermento ({technique})',
      final_dough_title: 'Masa Final',
      flour: 'Harina',
      water: 'Agua',
      salt: 'Sal',
      oil: 'Aceite',
      yeast: 'Levadura',
      total_dough: 'Masa Total',
      summary: '{count} bollo{plural} de masa de {weight}g cada uno',
      notes: {
        flour:
          'La base de tu masa. La harina "00" es tradicional para la Napolitana.',
        water:
          'Controla la consistencia de la masa. Use agua fría para fermentaciones largas.',
        salt: 'Fortalece el gluten y añade sabor. Añadir lejos de la levadura.',
        oil: 'Añade sabor y suavidad. Omitido en la Napolitana tradicional.',
        yeast:
          'La levadura ADY puede necesitar activación. La IDY se puede mezclar directamente.',
      },
    },
    mobile_bar: {
      total_dough: 'Masa Total:',
      view_recipe: 'Ver Receta',
      view_recipe_aria: 'Desplazarse a la receta',
    },
    units: {
      g: 'g',
      oz: 'oz',
      cups: 'tazas',
      tbsp: 'cda',
      tsp: 'cdta',
    },
  },
};

// Context setup
type LanguageContextType = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (
    key: string,
    replacements?: { [key: string]: string | number },
  ) => string;
};

const LanguageContext = createContext<LanguageContextType | null>(null);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [locale, setLocale] = useState<Locale>('en');

  useEffect(() => {
    const browserLang = navigator.language.split('-')[0] as Locale;
    if (browserLang in translations) {
      setLocale(browserLang);
    }
  }, []);

  const t = useCallback(
    (key: string, replacements?: { [key: string]: string | number }) => {
      const keys = key.split('.');
      let result: any = translations[locale];

      for (const k of keys) {
        result = result?.[k];
        if (result === undefined) {
          // Fallback to English if key not found in current locale
          result = translations.en;
          for (const en_k of keys) {
            result = result?.[en_k];
            if (result === undefined) return key;
          }
        }
      }

      if (typeof result !== 'string') return key;

      let resultString = result;
      if (replacements) {
        Object.keys(replacements).forEach((rKey) => {
          resultString = resultString.replace(
            `{${rKey}}`,
            String(replacements[rKey]),
          );
        });
      }

      return resultString;
    },
    [locale],
  );

  // FIX: Replace JSX with `React.createElement` to prevent parsing errors in a .ts file.
  // This resolves a series of cascading type and parsing errors.
  return React.createElement(
    LanguageContext.Provider,
    { value: { locale, setLocale, t } },
    children,
  );
};

export const useTranslation = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useTranslation must be used within a LanguageProvider');
  }
  return context;
};