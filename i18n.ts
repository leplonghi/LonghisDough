import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
  FC,
  useCallback,
  useMemo,
} from 'react';
import { Locale } from './types';

interface TranslationContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: string, replacements?: { [key: string]: string | number }) => string;
}

const TranslationContext = createContext<TranslationContextType | undefined>(
  undefined,
);

const translations: Record<string, any> = {
  en: {
    nav: {
      calculator: 'Calculator',
      tips: 'Tips',
      plans: 'Pro Plans',
    },
    header: {
      title: 'Dough Lab Pro',
      subtitle: 'The Ultimate Pizza & Bread Dough Calculator',
      switch_to_dark: 'Switch to dark mode',
      switch_to_light: 'Switch to light mode',
    },
    footer: {
      total_dough: 'Total Dough',
      save_recipe: 'Save recipe',
      saved_recipes: 'Load saved recipes',
      copyright: '© {year} Dough Lab Pro. All rights reserved.',
    },
    form: {
      bake_type: 'Bake Type',
      pizzas: 'Pizza',
      breads: 'Bread',
      recipe_style: 'Recipe Style',
      napoletana: 'Napoletana',
      ny: 'NY Style',
      romana: 'Romana',
      sicilian: 'Sicilian',
      focaccia: 'Focaccia',
      detroit: 'Detroit',
      chicago_deep_dish: 'Chicago',
      artisan_loaf: 'Artisan Loaf',
      baguette: 'Baguette',
      ciabatta: 'Ciabatta',
      pumpernickel: 'Pumpernickel',
      sourdough_boule: 'Sourdough',
      rye_bread: 'Rye Bread',
      style_tooltips: {
        napoletana: 'Classic soft, thin-crust pizza with a puffy cornicione.',
        ny: 'Large, foldable slices with a crispy yet chewy crust.',
        romana: 'Thin, crispy, and rectangular pizza (pizza al taglio).',
        sicilian: 'Thick, spongy, rectangular pizza with a crispy base.',
        focaccia: 'Flat oven-baked bread, often dimpled and topped with herbs.',
        detroit: 'Rectangular pizza with a thick, chewy crust and crispy, cheesy edges.',
        chicago_deep_dish: 'Deep, thick-crust pizza baked in a pan, resembling a pie.',
        artisan_loaf: 'Crusty, rustic bread with an open, airy crumb.',
        baguette: 'Long, thin loaf of French bread with a crisp crust.',
        ciabatta: 'Italian white bread with a light, open crumb.',
        pumpernickel: 'Heavy, slightly sweet rye bread, traditionally dense and dark.',
        sourdough_boule: 'Naturally leavened round loaf with a tangy flavor.',
        rye_bread: 'Bread made with flour from rye grain, often dense and dark.',
      },
      core_parameters: 'Core Parameters',
      num_pizzas: 'Number of Pizzas',
      num_loaves: 'Number of Loaves',
      num_units_note: 'How many dough balls to prepare.',
      weight_per_pizza: 'Weight per Pizza (g)',
      weight_per_loaf: 'Weight per Loaf (g)',
      weight_per_unit_note: 'Typical for {style}: {range}',
      hydration: 'Hydration',
      hydration_tooltip: 'The amount of water relative to the amount of flour. Higher hydration results in a wetter, stickier dough and often a more open crumb.',
      scale: 'Scale Recipe',
      scale_tooltip: 'Adjust the overall size of your recipe. For example, a scale of 2x will double all ingredients.',
      fermentation: 'Fermentation & Yeast',
      direct: 'Direct',
      poolish: 'Poolish',
      biga: 'Biga',
      preferment_flour: 'Preferment Flour',
      preferment_flour_tooltip: 'The percentage of the total flour that will be used in the preferment (poolish or biga).',
      yeast_type: 'Yeast Type',
      yeast_type_tooltip: 'Different yeast types have different potencies. IDY is Instant Dry Yeast, ADY is Active Dry Yeast.',
      yeast: 'Yeast',
      yeast_tooltip: 'The amount of yeast relative to the amount of flour. Adjust based on fermentation time and temperature.',
      settings: 'Settings & Notes',
      unit_system: 'Unit System',
      unit_system_tooltip: 'Choose between Metric and US Customary cups for volume conversions. All primary calculations are in grams.',
      us_customary: 'US Customary',
      metric: 'Metric',
      recipe_notes: 'Recipe Notes',
      notes_placeholder: 'Add your personal notes, fermentation schedule, or baking instructions here...',
      reset: 'Reset to Default',
      reset_aria: 'Reset form to default values',
      prompt_config_name: 'Enter a name for your recipe:',
      errors: {
        num_pizzas_range: 'Please enter a number between 1 and 100.',
        dough_ball_weight_range: 'Please enter a weight between 100g and 2000g.',
      },
    },
    results: {
      title: 'Your Recipe',
      share_recipe_aria: 'Share recipe link',
      export_pdf_aria: 'Export recipe as PDF',
      grams: 'Grams',
      ounces: 'Ounces',
      cups: 'Volume',
      unit_system_display: 'Volume conversions use {system} cups.',
      preferment_title: '{technique} Preferment',
      final_dough_title: 'Final Dough',
      preferment_label: 'Add {technique}',
      flour: 'Flour',
      water: 'Water',
      salt: 'Salt',
      oil: 'Oil',
      yeast: 'Yeast',
      total_dough: 'Total Dough Weight',
      summary_pizza: 'Makes {count} pizzas of {weight}g each.',
      summary_bread: 'Makes {count} loaves of {weight}g each.',
      conversion_tooltip: '1 US cup of {ingredient} is about {grams}g. This can vary. For accuracy, use a scale. Volume conversions use {system} standards.',
      ingredients: {
          flour: 'all-purpose flour',
          water: 'water',
          salt: 'fine sea salt',
          oil: 'olive oil',
          yeast: 'instant dry yeast',
          wholeWheat: 'whole wheat flour',
          rye: 'rye flour',
      },
      notes: {
          flour: '100% (Baker\'s Percentage)',
          water: 'Room temperature (approx. 20°C / 68°F)',
          salt: 'Fine sea salt recommended',
          oil: 'Extra virgin olive oil',
          yeast: 'Based on yeast type selected',
          preferment: 'Mix and let ferment before adding to final dough',
      },
      steps: {
          title: 'Instructions',
          direct: {
              step1: '<b>Combine:</b> In a large bowl, whisk together the flour, salt, and yeast. Add the water and oil.',
              step2: '<b>Mix & Knead:</b> Mix until a shaggy dough forms. Knead for 8-10 minutes on a lightly floured surface until smooth and elastic. The dough should pass the "windowpane test".',
              step3: '<b>Bulk Fermentation:</b> Place the dough in a lightly oiled bowl, cover, and let it rise in a warm place for 1.5-2 hours, or until doubled in size.',
              step4: '<b>Divide & Shape:</b> Gently deflate the dough, divide it into {count} equal pieces, and shape each piece into a tight ball.',
              step5: '<b>Final Proof:</b> Place the dough balls on a floured tray, cover, and let them proof for another 30-60 minutes, or refrigerate for a cold ferment (1-3 days).',
              step6: '<b>Bake:</b> Preheat your oven and baking surface. Stretch the dough, add your toppings, and bake until the crust is golden brown.',
          },
          indirect: {
              preferment: {
                  step1: '<b>Prepare Preferment:</b> In a small bowl, mix the preferment flour, water, and yeast. Cover and let it ferment at room temperature for 12-16 hours, or until bubbly and active.',
                  step2: '<b>Check for Ripeness:</b> The preferment is ready when it has risen, is full of bubbles, and may have just started to collapse on itself.',
              },
              finalDough: {
                  step1: '<b>Combine:</b> In a large bowl, combine the final dough flour and water. Add the fully ripened preferment and mix until incorporated.',
                  step2: '<b>Add Remaining Ingredients:</b> Add the salt, oil, and any remaining yeast. Mix and knead for 8-10 minutes until smooth and elastic.',
                  step3: '<b>Bulk & Proof:</b> Follow steps 3-5 from the Direct Method instructions for bulk fermentation, dividing, shaping, and final proofing.',
                  step4: '<b>Bake:</b> Preheat your oven and baking surface. Stretch, top, and bake your creation.',
              },
          },
          baguette: {
              step1: 'Follow indirect method for preferment (poolish) and final dough mixing.',
              step2: 'Bulk ferment for 1.5 hours with folds every 30 minutes.',
              step3: 'Divide dough and preshape into logs. Rest for 20-30 minutes.',
              step4: 'Shape into final baguette form.',
              step5: 'Proof on a floured couche or linen for 45-60 minutes.',
              step6: 'Score the loaves just before baking.',
              step7: 'Bake in a steamy oven at high heat (240°C / 475°F) until golden brown.',
          },
          ciabatta: {
              step1: 'Follow indirect method for preferment (biga) and final dough mixing. This will be a very wet dough.',
              step2: 'Bulk ferment for 2-3 hours, performing several sets of stretch-and-folds in the bowl.',
              step3: 'Gently pour the dough onto a well-floured surface. Do not degas it heavily.',
              step4: 'Divide into desired portions using a bench scraper.',
              step5: 'Gently stretch each piece into a rough rectangle and place on parchment paper.',
              step6: 'Proof for 30-45 minutes, then bake at high heat (230°C / 450°F).',
          }
      },
      notes_title: 'Your Notes',
    },
    units: {
        g: 'g',
        oz: 'oz',
        cups: 'cups',
        tbsp: 'tbsp',
        tsp: 'tsp',
    },
    yeast: {
        idy: 'Instant Dry Yeast (IDY)',
        ady: 'Active Dry Yeast (ADY)',
        fresh: 'Fresh Yeast',
    },
    pro: {
        go_pro_header: 'Go Pro',
        locked_tooltip: 'This is a Pro feature. Click to upgrade!',
    },
    load_modal: {
        title: 'Load Saved Recipe',
        load: 'Load',
        delete_aria: 'Delete recipe',
        no_configs: 'You have no saved recipes yet.',
        close_aria: 'Close modal',
    },
    pro_recipes: {
        modal_title: 'Pro Recipe Book',
        neapolitan: {
            name: 'Classic Neapolitan',
            description: 'Authentic high-hydration dough for a classic soft, leopard-spotted crust.'
        },
        focaccia: {
            name: 'High-Hydration Focaccia',
            description: 'A wet, bubbly dough for a light and airy focaccia with a crispy crust.'
        },
        ny_style: {
            name: 'NY Style Pizza',
            description: 'Perfect for large, foldable slices with a satisfyingly chewy crust.'
        },
        sourdough: {
            name: 'No-Knead "Sourdough" Loaf',
            description: 'An easy, artisan-style loaf with a complex flavor from long fermentation.'
        },
    },
    paywall: {
        title: 'Unlock Dough Lab Pro',
        subtitle: 'Take your baking to the next level with these powerful features.',
        feature_save: 'Save & Load Recipes',
        feature_save_desc: 'Never lose a great recipe. Save your configurations and load them anytime.',
        feature_export: 'Export to PDF',
        feature_export_desc: 'Get a clean, printable PDF of your recipe to use in the kitchen.',
        feature_scale: 'Scale Recipes',
        feature_scale_desc: 'Easily scale any recipe up or down to fit your needs.',
        feature_ads: 'Ad-Free Experience',
        feature_ads_desc: 'Enjoy a clean, focused interface without any interruptions.',
        feature_pro_recipes: 'Pro Recipe Book',
        feature_pro_recipes_desc: 'Access a curated collection of professionally developed recipes.',
        cta_button: 'Upgrade to Pro Now',
        disclaimer: 'This is a demo. Clicking this button will grant you Pro access for this session.',
    },
    plans_page: {
        title: 'Choose Your Plan',
        subtitle: 'Dough Lab Pro offers powerful features to perfect your baking.',
        feature: 'Feature',
        free_tier: 'Free',
        pro_tier: 'Pro',
        feature_calculator: 'Advanced Dough Calculator',
        feature_styles: 'Multiple Pizza & Bread Styles',
        feature_units: 'Gram, Ounce & Volume Units',
        feature_ads: 'Ad-Supported',
        feature_save_load: 'Save & Load Recipes',
        feature_export: 'Export to PDF',
        feature_scaling: 'Recipe Scaling',
        feature_pro_recipes: 'Pro Recipe Book Access',
        upgrade_button: 'Get Pro Access',
    },
    tips_page: {
        title: 'Baking Tips & Techniques',
        subtitle: 'Master the fundamentals to improve your dough-making skills.',
        load_recipe_button: 'Load This Recipe',
        pro_recipes_cta_title: 'Start with a Great Recipe',
        pro_recipes_cta_description: 'These professionally developed recipes are a perfect starting point. Load one and start baking!',
        bakers_percentage_title: 'Understanding Baker\'s Percentage',
        bakers_percentage_content: 'All ingredients in a recipe are expressed as a percentage of the total flour weight, which is always 100%. For example, 65% hydration means the weight of the water is 65% of the weight of the flour. This makes it easy to scale recipes up or down!',
        fermentation_title: 'The Magic of Fermentation',
        fermentation_content: 'Fermentation is where yeast consumes sugars and produces CO2 and alcohol, developing flavor and leavening the dough. <strong>Bulk fermentation</strong> (the first rise) builds flavor and strength. <strong>Proofing</strong> (the final rise) happens after shaping and prepares the dough for baking.',
        kneading_title: 'Kneading and Gluten Development',
        kneading_content: 'Kneading develops the gluten network, which gives dough its structure and elasticity. A well-developed dough will be smooth and pass the "windowpane test" — you can stretch a small piece thin enough to see light through it without tearing.',
    },
    ads: {
        advertisement: 'Advertisement',
    },
    login: {
      title: 'Sign in to Dough Lab Pro',
    },
    auth: {
      sign_out: 'Sign out',
    },
    loading: 'Loading...',
  },
  pt: {
    nav: {
      calculator: 'Calculadora',
      tips: 'Dicas',
      plans: 'Planos Pro',
    },
    header: {
      title: 'Dough Lab Pro',
      subtitle: 'A Calculadora Definitiva de Massa de Pizza e Pão',
      switch_to_dark: 'Mudar para modo escuro',
      switch_to_light: 'Mudar para modo claro',
    },
    footer: {
      total_dough: 'Massa Total',
      save_recipe: 'Salvar receita',
      saved_recipes: 'Carregar receitas salvas',
      copyright: '© {year} Dough Lab Pro. Todos os direitos reservados.',
    },
    form: {
      bake_type: 'Tipo de Cozedura',
      pizzas: 'Pizza',
      breads: 'Pão',
      recipe_style: 'Estilo da Receita',
      napoletana: 'Napoletana',
      ny: 'Estilo NY',
      romana: 'Romana',
      sicilian: 'Siciliana',
      focaccia: 'Focaccia',
      detroit: 'Detroit',
      chicago_deep_dish: 'Chicago',
      artisan_loaf: 'Pão Artesanal',
      baguette: 'Baguete',
      ciabatta: 'Ciabatta',
      pumpernickel: 'Pumpernickel',
      sourdough_boule: 'Sourdough',
      rye_bread: 'Pão de Centeio',
      style_tooltips: {
        napoletana: 'Massa clássica macia e fina com uma borda fofa.',
        ny: 'Fatias grandes e dobráveis com uma crosta crocante e mastigável.',
        romana: 'Pizza fina, crocante e retangular (pizza al taglio).',
        sicilian: 'Pizza retangular grossa e esponjosa com uma base crocante.',
        focaccia: 'Pão achatado assado no forno, muitas vezes com covinhas e coberto com ervas.',
        detroit: 'Pizza retangular com uma crosta grossa e mastigável e bordas crocantes e queijudas.',
        chicago_deep_dish: 'Pizza de massa grossa e profunda assada em uma forma, parecendo uma torta.',
        artisan_loaf: 'Pão rústico e crocante com miolo aberto e arejado.',
        baguette: 'Pão francês longo e fino com uma crosta crocante.',
        ciabatta: 'Pão branco italiano com miolo leve e aberto.',
        pumpernickel: 'Pão de centeio pesado, ligeiramente doce, tradicionalmente denso e escuro.',
        sourdough_boule: 'Pão redondo de fermentação natural com um sabor azedo.',
        rye_bread: 'Pão feito com farinha de centeio, muitas vezes denso e escuro.',
      },
      core_parameters: 'Parâmetros Principais',
      num_pizzas: 'Número de Pizzas',
      num_loaves: 'Número de Pães',
      num_units_note: 'Quantas bolas de massa preparar.',
      weight_per_pizza: 'Peso por Pizza (g)',
      weight_per_loaf: 'Peso por Pão (g)',
      weight_per_unit_note: 'Típico para {style}: {range}',
      hydration: 'Hidratação',
      hydration_tooltip: 'A quantidade de água em relação à quantidade de farinha. Maior hidratação resulta em uma massa mais úmida e pegajosa e, muitas vezes, um miolo mais aberto.',
      scale: 'Escalar Receita',
      scale_tooltip: 'Ajuste o tamanho geral da sua receita. Por exemplo, uma escala de 2x dobrará todos os ingredientes.',
      fermentation: 'Fermentação e Fermento',
      direct: 'Direta',
      poolish: 'Poolish',
      biga: 'Biga',
      preferment_flour: 'Farinha do Pré-fermento',
      preferment_flour_tooltip: 'A percentagem da farinha total que será utilizada no pré-fermento (poolish ou biga).',
      yeast_type: 'Tipo de Fermento',
      yeast_type_tooltip: 'Diferentes tipos de fermento têm diferentes potências. IDY é Fermento Seco Instantâneo, ADY é Fermento Seco Ativo.',
      yeast: 'Fermento',
      yeast_tooltip: 'A quantidade de fermento em relação à quantidade de farinha. Ajuste com base no tempo e temperatura de fermentação.',
      settings: 'Configurações e Notas',
      unit_system: 'Sistema de Unidades',
      unit_system_tooltip: 'Escolha entre xícaras Métricas e US Customary para conversões de volume. Todos os cálculos primários são em gramas.',
      us_customary: 'US Customary',
      metric: 'Métrico',
      recipe_notes: 'Notas da Receita',
      notes_placeholder: 'Adicione suas notas pessoais, cronograma de fermentação ou instruções de cozimento aqui...',
      reset: 'Redefinir para o Padrão',
      reset_aria: 'Redefinir formulário para valores padrão',
      prompt_config_name: 'Digite um nome para sua receita:',
      errors: {
        num_pizzas_range: 'Por favor, insira um número entre 1 e 100.',
        dough_ball_weight_range: 'Por favor, insira um peso entre 100g e 2000g.',
      },
    },
    results: {
      title: 'Sua Receita',
      share_recipe_aria: 'Compartilhar link da receita',
      export_pdf_aria: 'Exportar receita como PDF',
      grams: 'Gramas',
      ounces: 'Onças',
      cups: 'Volume',
      unit_system_display: 'As conversões de volume usam xícaras {system}.',
      preferment_title: 'Pré-fermento {technique}',
      final_dough_title: 'Massa Final',
      preferment_label: 'Adicionar {technique}',
      flour: 'Farinha',
      water: 'Água',
      salt: 'Sal',
      oil: 'Azeite',
      yeast: 'Fermento',
      total_dough: 'Peso Total da Massa',
      summary_pizza: 'Faz {count} pizzas de {weight}g cada.',
      summary_bread: 'Faz {count} pães de {weight}g cada.',
      conversion_tooltip: '1 xícara US de {ingredient} é cerca de {grams}g. Isso pode variar. Para precisão, use uma balança. As conversões de volume usam padrões {system}.',
      ingredients: {
          flour: 'farinha de trigo',
          water: 'água',
          salt: 'sal marinho fino',
          oil: 'azeite de oliva',
          yeast: 'fermento seco instantâneo',
          wholeWheat: 'farinha de trigo integral',
          rye: 'farinha de centeio',
      },
      notes: {
          flour: '100% (Percentagem do Padeiro)',
          water: 'Temperatura ambiente (aprox. 20°C / 68°F)',
          salt: 'Sal marinho fino recomendado',
          oil: 'Azeite de oliva extra virgem',
          yeast: 'Baseado no tipo de fermento selecionado',
          preferment: 'Misture e deixe fermentar antes de adicionar à massa final',
      },
      steps: {
          title: 'Instruções',
          direct: {
              step1: '<b>Combinar:</b> Em uma tigela grande, misture a farinha, o sal e o fermento. Adicione a água e o azeite.',
              step2: '<b>Misturar e Sovar:</b> Misture até formar uma massa rústica. Sovar por 8-10 minutos em uma superfície levemente enfarinhada até ficar lisa e elástica. A massa deve passar no "teste da janela".',
              step3: '<b>Primeira Fermentação:</b> Coloque a massa em uma tigela levemente untada, cubra e deixe crescer em um local quente por 1,5-2 horas, ou até dobrar de tamanho.',
              step4: '<b>Dividir e Modelar:</b> Desinfle suavemente a massa, divida-a em {count} pedaços iguais e modele cada pedaço em uma bola apertada.',
              step5: '<b>Fermentação Final:</b> Coloque as bolas de massa em uma bandeja enfarinhada, cubra e deixe-as fermentar por mais 30-60 minutos, ou refrigere para uma fermentação a frio (1-3 dias).',
              step6: '<b>Assar:</b> Pré-aqueça seu forno e superfície de cozimento. Estique a massa, adicione seus recheios e asse até a crosta ficar dourada.',
          },
          indirect: {
              preferment: {
                  step1: '<b>Preparar Pré-fermento:</b> Em uma tigela pequena, misture a farinha, a água e o fermento do pré-fermento. Cubra e deixe fermentar em temperatura ambiente por 12-16 horas, ou até ficar borbulhante e ativo.',
                  step2: '<b>Verificar Maturação:</b> O pré-fermento está pronto quando cresceu, está cheio de bolhas e pode ter acabado de começar a colapsar sobre si mesmo.',
              },
              finalDough: {
                  step1: '<b>Combinar:</b> Em uma tigela grande, combine a farinha e a água da massa final. Adicione o pré-fermento totalmente maduro e misture até incorporar.',
                  step2: '<b>Adicionar Ingredientes Restantes:</b> Adicione o sal, o azeite e qualquer fermento restante. Misture e sove por 8-10 minutos até ficar lisa e elástica.',
                  step3: '<b>Primeira e Fermentação Final:</b> Siga os passos 3-5 das instruções do Método Direto para a primeira fermentação, divisão, modelagem e fermentação final.',
                  step4: '<b>Assar:</b> Pré-aqueça seu forno e superfície de cozimento. Estique, cubra e asse sua criação.',
              },
          },
          baguette: {
              step1: 'Siga o método indireto para o pré-fermento (poolish) e a mistura da massa final.',
              step2: 'Fermentação em massa por 1,5 horas com dobras a cada 30 minutos.',
              step3: 'Divida a massa e pré-modele em toras. Descanse por 20-30 minutos.',
              step4: 'Modele na forma final de baguete.',
              step5: 'Fermente em uma couche enfarinhada ou linho por 45-60 minutos.',
              step6: 'Faça cortes nos pães pouco antes de assar.',
              step7: 'Asse em forno a vapor em alta temperatura (240°C / 475°F) até dourar.',
          },
          ciabatta: {
              step1: 'Siga o método indireto para o pré-fermento (biga) e a mistura da massa final. Esta será uma massa muito úmida.',
              step2: 'Fermentação em massa por 2-3 horas, realizando várias séries de esticar e dobrar na tigela.',
              step3: 'Despeje suavemente a massa em uma superfície bem enfarinhada. Não a desgasifique muito.',
              step4: 'Divida em porções desejadas usando um raspador de massa.',
              step5: 'Estique suavemente cada pedaço em um retângulo áspero e coloque em papel manteiga.',
              step6: 'Fermente por 30-45 minutos e, em seguida, asse em alta temperatura (230°C / 450°F).',
          }
      },
      notes_title: 'Suas Notas',
    },
    units: {
        g: 'g',
        oz: 'oz',
        cups: 'xícaras',
        tbsp: 'colheres de sopa',
        tsp: 'colheres de chá',
    },
    yeast: {
        idy: 'Fermento Seco Instantâneo (IDY)',
        ady: 'Fermento Seco Ativo (ADY)',
        fresh: 'Fermento Fresco',
    },
    pro: {
        go_pro_header: 'Seja Pro',
        locked_tooltip: 'Este é um recurso Pro. Clique para atualizar!',
    },
    load_modal: {
        title: 'Carregar Receita Salva',
        load: 'Carregar',
        delete_aria: 'Excluir receita',
        no_configs: 'Você ainda não tem receitas salvas.',
        close_aria: 'Fechar modal',
    },
    pro_recipes: {
        modal_title: 'Livro de Receitas Pro',
        neapolitan: {
            name: 'Napoletana Clássica',
            description: 'Massa autêntica de alta hidratação para uma crosta clássica macia e com manchas de leopardo.'
        },
        focaccia: {
            name: 'Focaccia de Alta Hidratação',
            description: 'Uma massa úmida e borbulhante para uma focaccia leve e arejada com uma crosta crocante.'
        },
        ny_style: {
            name: 'Pizza Estilo NY',
            description: 'Perfeita para fatias grandes e dobráveis com uma crosta satisfatoriamente mastigável.'
        },
        sourdough: {
            name: 'Pão "Sourdough" Sem Amassar',
            description: 'Um pão artesanal fácil com um sabor complexo de longa fermentação.'
        },
    },
    paywall: {
        title: 'Desbloqueie o Dough Lab Pro',
        subtitle: 'Leve sua panificação para o próximo nível com esses recursos poderosos.',
        feature_save: 'Salvar e Carregar Receitas',
        feature_save_desc: 'Nunca perca uma ótima receita. Salve suas configurações e carregue-as a qualquer momento.',
        feature_export: 'Exportar para PDF',
        feature_export_desc: 'Obtenha um PDF limpo e imprimível de sua receita para usar na cozinha.',
        feature_scale: 'Escalar Receitas',
        feature_scale_desc: 'Escale facilmente qualquer receita para cima ou para baixo para atender às suas necessidades.',
        feature_ads: 'Experiência Sem Anúncios',
        feature_ads_desc: 'Desfrute de uma interface limpa e focada, sem interrupções.',
        feature_pro_recipes: 'Livro de Receitas Pro',
        feature_pro_recipes_desc: 'Acesse uma coleção selecionada de receitas desenvolvidas profissionalmente.',
        cta_button: 'Atualizar para Pro Agora',
        disclaimer: 'Esta é uma demonstração. Clicar neste botão concederá acesso Pro para esta sessão.',
    },
    plans_page: {
        title: 'Escolha Seu Plano',
        subtitle: 'Dough Lab Pro oferece recursos poderosos para aperfeiçoar sua panificação.',
        feature: 'Recurso',
        free_tier: 'Grátis',
        pro_tier: 'Pro',
        feature_calculator: 'Calculadora Avançada de Massa',
        feature_styles: 'Múltiplos Estilos de Pizza e Pão',
        feature_units: 'Unidades de Grama, Onça e Volume',
        feature_ads: 'Com Anúncios',
        feature_save_load: 'Salvar e Carregar Receitas',
        feature_export: 'Exportar para PDF',
        feature_scaling: 'Escala de Receitas',
        feature_pro_recipes: 'Acesso ao Livro de Receitas Pro',
        upgrade_button: 'Obter Acesso Pro',
    },
    tips_page: {
        title: 'Dicas e Técnicas de Panificação',
        subtitle: 'Domine os fundamentos para melhorar suas habilidades de fazer massa.',
        load_recipe_button: 'Carregar Esta Receita',
        pro_recipes_cta_title: 'Comece com uma Ótima Receita',
        pro_recipes_cta_description: 'Estas receitas desenvolvidas profissionalmente são um ponto de partida perfeito. Carregue uma e comece a assar!',
        bakers_percentage_title: 'Entendendo a Porcentagem do Padeiro',
        bakers_percentage_content: 'Todos os ingredientes em uma receita são expressos como uma porcentagem do peso total da farinha, que é sempre 100%. Por exemplo, 65% de hidratação significa que o peso da água é 65% do peso da farinha. Isso facilita a escala de receitas para cima ou para baixo!',
        fermentation_title: 'A Magia da Fermentação',
        fermentation_content: 'A fermentação é onde o fermento consome açúcares e produz CO2 e álcool, desenvolvendo sabor e levedando a massa. A <strong>fermentação em massa</strong> (a primeira subida) constrói sabor e força. A <strong>fermentação final</strong> (a subida final) acontece após a modelagem e prepara a massa para assar.',
        kneading_title: 'Amassar e Desenvolvimento do Glúten',
        kneading_content: 'Amassar desenvolve a rede de glúten, que dá à massa sua estrutura e elasticidade. Uma massa bem desenvolvida será lisa e passará no "teste da janela" — você pode esticar um pequeno pedaço fino o suficiente para ver a luz através dele sem rasgar.',
    },
    ads: {
        advertisement: 'Anúncio',
    },
    login: {
      title: 'Entrar no Dough Lab Pro',
    },
    auth: {
      sign_out: 'Sair',
    },
    loading: 'Carregando...',
  },
  es: {
    nav: {
      calculator: 'Calculadora',
      tips: 'Consejos',
      plans: 'Planes Pro',
    },
    header: {
      title: 'Dough Lab Pro',
      subtitle: 'La Calculadora Definitiva de Masa de Pizza y Pan',
      switch_to_dark: 'Cambiar a modo oscuro',
      switch_to_light: 'Cambiar a modo claro',
    },
    footer: {
      total_dough: 'Masa Total',
      save_recipe: 'Guardar receta',
      saved_recipes: 'Cargar recetas guardadas',
      copyright: '© {year} Dough Lab Pro. Todos los derechos reservados.',
    },
    form: {
      bake_type: 'Tipo de Horneado',
      pizzas: 'Pizza',
      breads: 'Pan',
      recipe_style: 'Estilo de Receta',
      napoletana: 'Napoletana',
      ny: 'Estilo NY',
      romana: 'Romana',
      sicilian: 'Siciliana',
      focaccia: 'Focaccia',
      detroit: 'Detroit',
      chicago_deep_dish: 'Chicago',
      artisan_loaf: 'Pan Artesanal',
      baguette: 'Baguette',
      ciabatta: 'Ciabatta',
      pumpernickel: 'Pumpernickel',
      sourdough_boule: 'Masa Madre',
      rye_bread: 'Pan de Centeno',
      style_tooltips: {
        napoletana: 'Masa clásica suave y de corteza fina con un cornicione hinchado.',
        ny: 'Rebanadas grandes y plegables con una corteza crujiente pero masticable.',
        romana: 'Pizza fina, crujiente y rectangular (pizza al taglio).',
        sicilian: 'Pizza rectangular gruesa y esponjosa con una base crujiente.',
        focaccia: 'Pan plano horneado, a menudo con hoyuelos y cubierto con hierbas.',
        detroit: 'Pizza rectangular con una corteza gruesa y masticable y bordes crujientes y con queso.',
        chicago_deep_dish: 'Pizza de masa profunda y gruesa horneada en un molde, parecida a un pastel.',
        artisan_loaf: 'Pan rústico y crujiente con una miga abierta y aireada.',
        baguette: 'Pan francés largo y delgado con una corteza crujiente.',
        ciabatta: 'Pan blanco italiano con una miga ligera y abierta.',
        pumpernickel: 'Pan de centeno pesado, ligeramente dulce, tradicionalmente denso y oscuro.',
        sourdough_boule: 'Pan redondo de fermentación natural con un sabor ácido.',
        rye_bread: 'Pan hecho con harina de centeno, a menudo denso y oscuro.',
      },
      core_parameters: 'Parámetros Principales',
      num_pizzas: 'Número de Pizzas',
      num_loaves: 'Número de Panes',
      num_units_note: 'Cuántas bolas de masa preparar.',
      weight_per_pizza: 'Peso por Pizza (g)',
      weight_per_loaf: 'Peso por Pan (g)',
      weight_per_unit_note: 'Típico para {style}: {range}',
      hydration: 'Hidratación',
      hydration_tooltip: 'La cantidad de agua en relación con la cantidad de harina. Una mayor hidratación resulta en una masa más húmeda y pegajosa y, a menudo, una miga más abierta.',
      scale: 'Escalar Receta',
      scale_tooltip: 'Ajusta el tamaño general de tu receta. Por ejemplo, una escala de 2x duplicará todos los ingredientes.',
      fermentation: 'Fermentación y Levadura',
      direct: 'Directa',
      poolish: 'Poolish',
      biga: 'Biga',
      preferment_flour: 'Harina de Prefermento',
      preferment_flour_tooltip: 'El porcentaje de la harina total que se utilizará en el prefermento (poolish o biga).',
      yeast_type: 'Tipo de Levadura',
      yeast_type_tooltip: 'Diferentes tipos de levadura tienen diferentes potencias. IDY es Levadura Seca Instantánea, ADY es Levadura Seca Activa.',
      yeast: 'Levadura',
      yeast_tooltip: 'La cantidad de levadura en relación con la cantidad de harina. Ajusta según el tiempo y la temperatura de fermentación.',
      settings: 'Configuración y Notas',
      unit_system: 'Sistema de Unidades',
      unit_system_tooltip: 'Elige entre tazas Métricas y US Customary para conversiones de volumen. Todos los cálculos primarios son en gramos.',
      us_customary: 'US Customary',
      metric: 'Métrico',
      recipe_notes: 'Notas de la Receta',
      notes_placeholder: 'Agrega tus notas personales, programa de fermentación o instrucciones de horneado aquí...',
      reset: 'Restablecer a Valores Predeterminados',
      reset_aria: 'Restablecer formulario a valores predeterminados',
      prompt_config_name: 'Introduce un nombre para tu receta:',
      errors: {
        num_pizzas_range: 'Por favor, introduce un número entre 1 y 100.',
        dough_ball_weight_range: 'Por favor, introduce un peso entre 100g y 2000g.',
      },
    },
    results: {
      title: 'Tu Receta',
      share_recipe_aria: 'Compartir enlace de la receta',
      export_pdf_aria: 'Exportar receta como PDF',
      grams: 'Gramos',
      ounces: 'Onzas',
      cups: 'Volumen',
      unit_system_display: 'Las conversiones de volumen usan tazas {system}.',
      preferment_title: 'Prefermento {technique}',
      final_dough_title: 'Masa Final',
      preferment_label: 'Añadir {technique}',
      flour: 'Harina',
      water: 'Agua',
      salt: 'Sal',
      oil: 'Aceite',
      yeast: 'Levadura',
      total_dough: 'Peso Total de la Masa',
      summary_pizza: 'Hace {count} pizzas de {weight}g cada una.',
      summary_bread: 'Hace {count} panes de {weight}g cada uno.',
      conversion_tooltip: '1 taza US de {ingredient} es aproximadamente {grams}g. Esto puede variar. Para mayor precisión, usa una báscula. Las conversiones de volumen usan estándares {system}.',
      ingredients: {
          flour: 'harina de trigo todo uso',
          water: 'agua',
          salt: 'sal marina fina',
          oil: 'aceite de oliva',
          yeast: 'levadura seca instantánea',
          wholeWheat: 'harina de trigo integral',
          rye: 'harina de centeno',
      },
      notes: {
          flour: '100% (Porcentaje de Panadero)',
          water: 'Temperatura ambiente (aprox. 20°C / 68°F)',
          salt: 'Sal marina fina recomendada',
          oil: 'Aceite de oliva virgen extra',
          yeast: 'Basado en el tipo de levadura seleccionado',
          preferment: 'Mezclar y dejar fermentar antes de añadir a la masa final',
      },
      steps: {
          title: 'Instrucciones',
          direct: {
              step1: '<b>Combinar:</b> En un bol grande, mezcla la harina, la sal y la levadura. Añade el agua y el aceite.',
              step2: '<b>Mezclar y Amasar:</b> Mezcla hasta que se forme una masa irregular. Amasa durante 8-10 minutos sobre una superficie ligeramente enharinada hasta que esté suave y elástica. La masa debe pasar la "prueba de la ventana".',
              step3: '<b>Primera Fermentación:</b> Coloca la masa en un bol ligeramente aceitado, cubre y deja que suba en un lugar cálido durante 1.5-2 horas, o hasta que duplique su tamaño.',
              step4: '<b>Dividir y Formar:</b> Desinfla suavemente la masa, divídela en {count} trozos iguales y forma cada trozo en una bola apretada.',
              step5: '<b>Fermentación Final:</b> Coloca las bolas de masa en una bandeja enharinada, cubre y déjalas fermentar durante otros 30-60 minutos, o refrigera para una fermentación en frío (1-3 días).',
              step6: '<b>Hornear:</b> Precalienta tu horno y superficie de horneado. Estira la masa, añade tus ingredientes y hornea hasta que la corteza esté dorada.',
          },
          indirect: {
              preferment: {
                  step1: '<b>Preparar Prefermento:</b> En un bol pequeño, mezcla la harina, el agua y la levadura del prefermento. Cubre y deja que fermente a temperatura ambiente durante 12-16 horas, o hasta que esté burbujeante y activo.',
                  step2: '<b>Comprobar Madurez:</b> El prefermento está listo cuando ha subido, está lleno de burbujas y puede haber comenzado a colapsar sobre sí mismo.',
              },
              finalDough: {
                  step1: '<b>Combinar:</b> En un bol grande, combina la harina y el agua de la masa final. Añade el prefermento completamente maduro y mezcla hasta que se incorpore.',
                  step2: '<b>Añadir Ingredientes Restantes:</b> Añade la sal, el aceite y cualquier levadura restante. Mezcla y amasa durante 8-10 minutos hasta que esté suave y elástica.',
                  step3: '<b>Primera y Fermentación Final:</b> Sigue los pasos 3-5 de las instrucciones del Método Directo para la primera fermentación, división, formación y fermentación final.',
                  step4: '<b>Hornear:</b> Precalienta tu horno y superficie de horneado. Estira, cubre y hornea tu creación.',
              },
          },
          baguette: {
              step1: 'Sigue el método indirecto para el prefermento (poolish) y la mezcla de la masa final.',
              step2: 'Fermentación en bloque durante 1.5 horas con pliegues cada 30 minutos.',
              step3: 'Divide la masa y preforma en troncos. Deja reposar durante 20-30 minutos.',
              step4: 'Forma la baguette final.',
              step5: 'Fermenta en una tela enharinada o lino durante 45-60 minutos.',
              step6: 'Haz cortes en los panes justo antes de hornear.',
              step7: 'Hornea en un horno con vapor a alta temperatura (240°C / 475°F) hasta que estén dorados.',
          },
          ciabatta: {
              step1: 'Sigue el método indirecto para el prefermento (biga) y la mezcla de la masa final. Esta será una masa muy húmeda.',
              step2: 'Fermentación en bloque durante 2-3 horas, realizando varias series de estiramientos y pliegues en el bol.',
              step3: 'Vierte suavemente la masa sobre una superficie bien enharinada. No la desgasifiques en exceso.',
              step4: 'Divide en las porciones deseadas usando un raspador de masa.',
              step5: 'Estira suavemente cada trozo en un rectángulo tosco y colócalo sobre papel de horno.',
              step6: 'Fermenta durante 30-45 minutos y luego hornea a alta temperatura (230°C / 450°F).',
          }
      },
      notes_title: 'Tus Notas',
    },
    units: {
        g: 'g',
        oz: 'oz',
        cups: 'tazas',
        tbsp: 'cucharadas',
        tsp: 'cucharaditas',
    },
    yeast: {
        idy: 'Levadura Seca Instantánea (IDY)',
        ady: 'Levadura Seca Activa (ADY)',
        fresh: 'Levadura Fresca',
    },
    pro: {
        go_pro_header: 'Hazte Pro',
        locked_tooltip: 'Esta es una característica Pro. ¡Haz clic para actualizar!',
    },
    load_modal: {
        title: 'Cargar Receta Guardada',
        load: 'Cargar',
        delete_aria: 'Eliminar receta',
        no_configs: 'Aún no tienes recetas guardadas.',
        close_aria: 'Cerrar modal',
    },
    pro_recipes: {
        modal_title: 'Libro de Recetas Pro',
        neapolitan: {
            name: 'Napolitana Clásica',
            description: 'Auténtica masa de alta hidratación para una corteza clásica suave y con manchas de leopardo.'
        },
        focaccia: {
            name: 'Focaccia de Alta Hidratación',
            description: 'Una masa húmeda y burbujeante para una focaccia ligera y aireada con una corteza crujiente.'
        },
        ny_style: {
            name: 'Pizza Estilo NY',
            description: 'Perfecta para rebanadas grandes y plegables con una corteza masticable y satisfactoria.'
        },
        sourdough: {
            name: 'Pan de Masa Madre "Sin Amasar"',
            description: 'Un pan artesanal fácil con un sabor complejo de larga fermentación.'
        },
    },
    paywall: {
        title: 'Desbloquea Dough Lab Pro',
        subtitle: 'Lleva tu horneado al siguiente nivel con estas potentes funciones.',
        feature_save: 'Guardar y Cargar Recetas',
        feature_save_desc: 'Nunca pierdas una gran receta. Guarda tus configuraciones y cárgalas en cualquier momento.',
        feature_export: 'Exportar a PDF',
        feature_export_desc: 'Obtén un PDF limpio e imprimible de tu receta para usar en la cocina.',
        feature_scale: 'Escalar Recetas',
        feature_scale_desc: 'Escala fácilmente cualquier receta hacia arriba o hacia abajo para adaptarla a tus necesidades.',
        feature_ads: 'Experiencia Sin Anuncios',
        feature_ads_desc: 'Disfruta de una interfaz limpia y enfocada sin interrupciones.',
        feature_pro_recipes: 'Libro de Recetas Pro',
        feature_pro_recipes_desc: 'Accede a una colección curada de recetas desarrolladas profesionalmente.',
        cta_button: 'Actualizar a Pro Ahora',
        disclaimer: 'Esto es una demostración. Al hacer clic en este botón, se te concederá acceso Pro para esta sesión.',
    },
    plans_page: {
        title: 'Elige Tu Plan',
        subtitle: 'Dough Lab Pro ofrece potentes funciones para perfeccionar tu horneado.',
        feature: 'Característica',
        free_tier: 'Gratis',
        pro_tier: 'Pro',
        feature_calculator: 'Calculadora Avanzada de Masa',
        feature_styles: 'Múltiples Estilos de Pizza y Pan',
        feature_units: 'Unidades de Gramo, Onza y Volumen',
        feature_ads: 'Con Anuncios',
        feature_save_load: 'Guardar y Cargar Recetas',
        feature_export: 'Exportar a PDF',
        feature_scaling: 'Escalado de Recetas',
        feature_pro_recipes: 'Acceso al Libro de Recetas Pro',
        upgrade_button: 'Obtener Acceso Pro',
    },
    tips_page: {
        title: 'Consejos y Técnicas de Horneado',
        subtitle: 'Domina los fundamentos para mejorar tus habilidades de elaboración de masa.',
        load_recipe_button: 'Cargar Esta Receta',
        pro_recipes_cta_title: 'Empieza con una Gran Receta',
        pro_recipes_cta_description: 'Estas recetas desarrolladas profesionalmente son un punto de partida perfecto. ¡Carga una y empieza a hornear!',
        bakers_percentage_title: 'Entendiendo el Porcentaje de Panadero',
        bakers_percentage_content: 'Todos los ingredientes de una receta se expresan como un porcentaje del peso total de la harina, que siempre es 100%. Por ejemplo, un 65% de hidratación significa que el peso del agua es el 65% del peso de la harina. ¡Esto facilita escalar las recetas hacia arriba o hacia abajo!',
        fermentation_title: 'La Magia de la Fermentación',
        fermentation_content: 'La fermentación es donde la levadura consume azúcares y produce CO2 y alcohol, desarrollando sabor y leudando la masa. La <strong>fermentación en bloque</strong> (la primera subida) desarrolla sabor y fuerza. La <strong>fermentación final</strong> (la subida final) ocurre después de dar forma y prepara la masa para el horneado.',
        kneading_title: 'Amasado y Desarrollo del Gluten',
        kneading_content: 'El amasado desarrolla la red de gluten, que le da a la masa su estructura y elasticidad. Una masa bien desarrollada será suave y pasará la "prueba de la ventana": puedes estirar un pequeño trozo lo suficientemente fino como para ver la luz a través de él sin que se rompa.',
    },
    ads: {
        advertisement: 'Anuncio',
    },
    login: {
      title: 'Iniciar sesión en Dough Lab Pro',
    },
    auth: {
      sign_out: 'Cerrar sesión',
    },
    loading: 'Cargando...',
  },
};

function resolve(path: string, obj: any): string | null {
  const resolved = path
    .split('.')
    .reduce((prev, curr) => (prev ? prev[curr] : null), obj);
  return typeof resolved === 'string' ? resolved : null;
}

export const TranslationProvider: FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [locale, setLocaleState] = useState<Locale>('en');

  const setLocale = useCallback((newLocale: Locale) => {
    setLocaleState(newLocale);
  }, []);

  const t = useCallback(
    (key: string, replacements?: { [key:string]: string | number }): string => {
      let translation =
        resolve(key, translations[locale]) || resolve(key, translations.en);

      if (!translation) {
        console.warn(`Translation not found for key: ${key}`);
        return key;
      }
      
      if (replacements) {
          Object.keys(replacements).forEach(rKey => {
              translation = translation!.replace(`{${rKey}}`, String(replacements[rKey]));
          })
      }

      return translation;
    },
    [locale],
  );

  const value = useMemo(
    () => ({
      locale,
      setLocale,
      t,
    }),
    [locale, setLocale, t],
  );

  return React.createElement(TranslationContext.Provider, { value: value }, children);
};

export const useTranslation = (): TranslationContextType => {
  const context = useContext(TranslationContext);
  if (context === undefined) {
    throw new Error('useTranslation must be used within a TranslationProvider');
  }
  return context;
};