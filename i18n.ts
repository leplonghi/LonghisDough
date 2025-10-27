// FIX: Import `useCallback` from react to resolve "Cannot find name 'useCallback'" error.
import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  useCallback,
} from 'react';
import { Locale } from './types';

// Translation data
const translations = {
  en: {
    appName: 'DoughLabPro',
    header: {
      switch_to_dark: 'Switch to dark mode',
      switch_to_light: 'Switch to light mode',
      user_profile: 'User profile',
      user_profile_tooltip: 'Profile & Settings (coming soon)',
    },
    footer: {
      pizza_making: 'Happy baking!',
      save_recipe: 'Save Recipe',
      saved_recipes: 'Saved Recipes',
      total_dough: 'Total Dough:',
    },
    ads: {
      advertisement: 'Advertisement',
    },
    form: {
      bake_type: 'Bake Type',
      pizzas: 'Pizzas',
      breads: 'Breads',
      recipe_style: 'Recipe Style',
      napoletana: 'Napoletana',
      ny: 'New York',
      romana: 'Romana',
      sicilian: 'Sicilian',
      focaccia: 'Focaccia',
      detroit: 'Detroit Style',
      chicago_deep_dish: 'Chicago Deep Dish',
      artisan_loaf: 'Artisan Loaf',
      baguette: 'Baguette',
      ciabatta: 'Ciabatta',
      pumpernickel: 'Pumpernickel',
      sourdough_boule: 'Sourdough Boule',
      rye_bread: 'Rye Bread',
      style_tooltips: {
        napoletana:
          'Characterized by a soft, thin base with a puffy, airy crust (cornicione). Baked hot and fast, traditionally with minimal toppings.',
        ny: 'A large, thin, and foldable slice with a crispy outer crust and a chewy interior. Often sold by the slice.',
        romana:
          "Known as 'pizza al taglio' (by the slice) or 'in teglia' (in a pan). It has a very high hydration, resulting in a light, airy, and crispy rectangular pizza.",
        sicilian:
          'A thick, spongy, rectangular pizza with a crispy, fried-like base. Toppings are often placed under the cheese.',
        focaccia:
          'A flat, oven-baked Italian bread, often dimpled and topped with olive oil, salt, and herbs. Can be thick and soft or thin and crispy.',
        detroit:
          "A rectangular pizza with a thick, chewy, and airy crust. Famous for its crispy, caramelized cheese edge (frico) baked against the sides of a deep steel pan.",
        chicago_deep_dish:
          "Characterized by a high-edged, buttery crust forming a deep bowl. It's filled with massive amounts of cheese and toppings, with the tomato sauce on top.",
        artisan_loaf:
          'A rustic, crusty bread with an open, irregular crumb. Typically made with simple ingredients and a long fermentation for complex flavor.',
        baguette:
          'A long, thin French loaf with a crisp crust and a chewy interior. Defined by its characteristic slashes (scoring) on top.',
        ciabatta:
          'An Italian white bread with very high hydration, known for its large, irregular holes and a light, airy texture.',
        pumpernickel:
          'A dense, dark, and slightly sweet rye bread originating from Germany. Traditionally made with coarsely ground rye flour and a long, slow baking time.',
        sourdough_boule:
          'A classic round loaf made with a natural sourdough starter, giving it a tangy flavor, chewy crumb, and a thick, crunchy crust.',
        rye_bread:
          'A bread made with flour from rye grain. It can range from light to dark, often denser than wheat bread, with a distinct earthy flavor.',
      },
      core_parameters: 'Core Parameters',
      num_pizzas: 'Number of Pizzas',
      num_loaves: 'Number of Loaves',
      num_units_note: 'Enter the total number of units you want to make.',
      weight_per_pizza: 'Weight per Pizza (g)',
      weight_per_loaf: 'Weight per Loaf (g)',
      weight_per_unit_note: 'Typical range for {style} style: {range}.',
      hydration: 'Hydration',
      hydration_tooltip:
        'The amount of water relative to flour. Higher hydration leads to a softer, airier crumb but can be harder to handle.',
      scale: 'Recipe Scale',
      scale_tooltip:
        'Scales the entire recipe up or down. For example, a value of 1.5 will increase all ingredient amounts by 50%.',
      fermentation: 'Fermentation',
      direct: 'Direct',
      poolish: 'Poolish',
      biga: 'Biga',
      preferment_flour: 'Preferment Flour',
      preferment_flour_tooltip:
        'The percentage of total flour used in the preferment. Higher percentages develop more flavor but reduce fermentation time.',
      yeast_type: 'Yeast Type',
      yeast_type_tooltip:
        'IDY: Mix directly with flour. ADY: Activate in warm water first. Fresh: Crumble and dissolve; use about 3x the amount of IDY.',
      yeast: 'Yeast',
      yeast_tooltip:
        'Controls the speed of fermentation. Adjust based on your desired proofing time and ambient temperature.',
      settings: 'Settings & Preferences',
      unit_system: 'Unit System',
      us_customary: 'US Customary',
      metric: 'Metric',
      unit_system_tooltip:
        "Changes the volume for 'cup' measurements. US Customary cups are ~237ml, while Metric cups are 250ml. This affects ingredient density for volumetric conversions.",
      recipe_notes: 'Recipe Notes',
      notes_placeholder: 'Add your personal tips or observations here...',
      reset: 'Reset to Defaults',
      reset_aria: 'Reset form to default values',
      save_config: 'Save Configuration',
      load_config: 'Load Configuration',
      prompt_config_name: 'Enter a name for your configuration:',
      config_saved: 'Configuration saved!',
      config_exists_overwrite:
        'A configuration with this name already exists. Overwrite it?',
    },
    yeast: {
      idy: 'Instant Dry Yeast (IDY)',
      ady: 'Active Dry Yeast (ADY)',
      fresh: 'Fresh Yeast',
    },
    results: {
      title: 'Your Recipe',
      export_pdf_aria: 'Export recipe to PDF',
      share_recipe_aria: 'Share recipe via link',
      copied_to_clipboard: 'Copied!',
      grams: 'Grams',
      ounces: 'Ounces',
      cups: 'Cups',
      preferment_title: 'Preferment ({technique})',
      final_dough_title: 'Final Dough',
      preferment_label: 'Preferment ({technique})',
      flour: 'Flour',
      water: 'Water',
      salt: 'Salt',
      oil: 'Oil',
      yeast: 'Yeast',
      total_dough: 'Total Dough',
      summary_pizza:
        '{count} pizza dough ball at {weight}g each | {count} pizza dough balls at {weight}g each',
      summary_bread:
        '{count} loaf at {weight}g each | {count} loaves at {weight}g each',
      notes_title: 'My Notes',
      ingredients: {
        flour: 'All-purpose flour',
        water: 'Water',
        salt: 'Fine sea salt',
        oil: 'Olive oil',
        yeast: 'Instant Dry Yeast',
      },
      conversion_tooltip:
        'System: {system} | 1 cup ≈ {grams}g ({ingredient}). Source: Standard baking conversions.',
      notes: {
        flour:
          "The foundation of your dough. '00' flour is traditional for Neapolitan.",
        water:
          'Controls dough consistency. Use cold water for long fermentation.',
        salt: 'Strengthens gluten and adds flavor. Add away from yeast.',
        oil: 'Adds flavor and softness. Omitted in traditional Neapolitan.',
        yeast: 'ADY may need activation. IDY can be mixed in directly.',
        preferment: 'Add the mature preferment to the final dough mix.',
      },
      steps: {
        title: 'Method',
        direct: {
          step1:
            '<strong>Combine Dry Ingredients:</strong> In a large bowl, whisk together the flour and yeast.',
          step2:
            '<strong>Dissolve Salt:</strong> In a separate container, dissolve the salt into the water. If using oil, add it to the water now.',
          step3:
            '<strong>Mix Dough:</strong> Pour the water mixture into the flour and mix with a spoon or your hands until a shaggy dough forms. Cover and let rest for 20-30 minutes (autolyse).',
          step4:
            '<strong>Knead:</strong> Turn the dough out onto a lightly floured surface and knead for 10-15 minutes until it becomes smooth and elastic.',
          step5:
            '<strong>Bulk Ferment:</strong> Place the dough in a lightly oiled bowl, cover, and let it rise until it has doubled in size (approx. 1-2 hours at room temperature).',
          step6:
            '<strong>Shape & Proof:</strong> Divide the dough into individual portions, shape them into tight balls, and place them in a proofing box or covered container. For best flavor, cold ferment in the refrigerator for 24-72 hours.',
        },
        indirect: {
          preferment: {
            step1:
              'In a container, mix the preferment flour, water, and yeast until just combined. Do not overmix.',
            step2:
              'Cover and let it ferment. A common method is 1 hour at room temperature, then 16-24 hours in the refrigerator.',
          },
          finalDough: {
            step1:
              'In a large bowl, combine the mature preferment with the remaining water. Use your hands to break up and dissolve the preferment.',
            step2:
              'Add the remaining flour and salt. Mix until a shaggy dough forms, then let it rest for 20-30 minutes.',
            step3:
              'Knead the dough for 10-15 minutes. If using oil, add it halfway through kneading. The dough should be smooth and elastic.',
            step4:
              'Proceed with <strong>Bulk Ferment</strong> and <strong>Shape & Proof</strong> as described in the Direct method (steps 5 and 6).',
          },
        },
        baguette: {
          step1:
            '<strong>Mix Poolish:</strong> In a container, mix the preferment flour, water, and yeast. Cover and let it ferment (1h at room temp, then 16-24h in the fridge).',
          step2:
            '<strong>Final Mix:</strong> In a large bowl, combine the mature poolish with the remaining water. Add the final dough flour and salt. Mix until a shaggy dough forms and rest for 30 minutes.',
          step3:
            '<strong>Knead & Bulk:</strong> Knead for 5-7 minutes. Place in an oiled container. Perform 2-3 sets of stretch-and-folds during a 2-hour bulk fermentation.',
          step4:
            '<strong>Preshape:</strong> Gently turn the dough onto a lightly floured surface. Divide into portions and preshape into loose logs. Rest for 20 minutes.',
          step5:
            '<strong>Final Shape:</strong> Gently flatten each log and fold it into a tight cylinder. Roll and stretch to the desired baguette length.',
          step6:
            '<strong>Proof:</strong> Place shaped baguettes on a floured couche or parchment paper, seam-side down. Cover and proof for 45-60 minutes.',
          step7:
            '<strong>Score & Bake:</strong> Preheat oven with a baking stone and steam pan to 240°C (475°F). Transfer baguettes to a peel, score the top with a lame, and bake with steam for 10 minutes. Remove steam and bake for another 15-20 minutes until golden brown.',
        },
        ciabatta: {
          step1:
            '<strong>Mix Biga:</strong> In a container, mix the preferment flour, water, and yeast to form a stiff dough. Cover and ferment (1h at room temp, then 16-24h in the fridge).',
          step2:
            '<strong>Final Mix:</strong> In a stand mixer, break up the mature biga into the remaining water. Add the final dough flour, salt, and oil. Mix on low speed until combined, then on medium speed for 10-12 minutes until the dough pulls from the sides (it will be very sticky).',
          step3:
            '<strong>Bulk Ferment:</strong> Transfer the extremely wet dough to a well-oiled, straight-sided container. Perform 3-4 sets of stretch-and-folds every 30 minutes for the first 2 hours. Let it triple in size (about 3-4 hours total).',
          step4:
            '<strong>Divide & Shape:</strong> Generously flour your work surface. Gently pour the dough out, keeping the bubbly side up. Flour the top. Using a bench scraper, divide the dough into rectangular portions.',
          step5:
            '<strong>Proof:</strong> Gently stretch each piece into a rough "slipper" shape and transfer to a heavily floured couche or parchment paper. Be careful not to degas it. Proof for 30-45 minutes.',
          step6:
            '<strong>Bake:</strong> Preheat oven with a baking stone and steam pan to 230°C (450°F). Carefully transfer the ciabattas to the stone. Bake with steam for 10-12 minutes, then remove steam and bake for another 10-15 minutes until golden and hollow-sounding.',
        },
      },
    },
    units: {
      g: 'g',
      oz: 'oz',
      cups: 'cups',
      tbsp: 'tbsp',
      tsp: 'tsp',
      scale: 'x',
    },
    load_modal: {
      title: 'Load Configuration',
      no_configs: 'You have no saved configurations yet.',
      load: 'Load',
      delete: 'Delete',
      delete_aria: 'Delete configuration',
      close_aria: 'Close modal',
    },
  },
  pt: {
    appName: 'DoughLabPro',
    header: {
      switch_to_dark: 'Mudar para modo escuro',
      switch_to_light: 'Mudar para modo claro',
      user_profile: 'Perfil do usuário',
      user_profile_tooltip: 'Perfil e Configurações (em breve)',
    },
    footer: {
      pizza_making: 'Boas fornadas!',
      save_recipe: 'Salvar Receita',
      saved_recipes: 'Receitas Salvas',
      total_dough: 'Massa Total:',
    },
    ads: {
      advertisement: 'Publicidade',
    },
    form: {
      bake_type: 'Tipo de Massa',
      pizzas: 'Pizzas',
      breads: 'Pães',
      recipe_style: 'Estilo da Receita',
      napoletana: 'Napolitana',
      ny: 'New York',
      romana: 'Romana',
      sicilian: 'Siciliana',
      focaccia: 'Focaccia',
      detroit: 'Estilo Detroit',
      chicago_deep_dish: 'Chicago Deep Dish',
      artisan_loaf: 'Pão Artesanal',
      baguette: 'Baguete',
      ciabatta: 'Ciabatta',
      pumpernickel: 'Pumpernickel',
      sourdough_boule: 'Pão de Fermentação Natural',
      rye_bread: 'Pão de Centeio',
      style_tooltips: {
        napoletana:
          'Caracterizada por uma base macia e fina com uma borda fofa e aerada (cornicione). Assada em alta temperatura e rapidamente, tradicionalmente com poucas coberturas.',
        ny: 'Uma fatia grande, fina e dobrável com uma crosta externa crocante e um interior macio. Frequentemente vendida em fatias.',
        romana:
          "Conhecida como 'pizza al taglio' (à fatia) ou 'in teglia' (na assadeira). Tem uma hidratação muito alta, resultando numa pizza retangular leve, aerada e crocante.",
        sicilian:
          'Uma pizza retangular, espessa e esponjosa com uma base crocante, quase frita. As coberturas são frequentemente colocadas debaixo do queijo.',
        focaccia:
          'Um pão italiano plano, assado no forno, muitas vezes com covinhas e coberto com azeite, sal e ervas. Pode ser grosso e macio ou fino e crocante.',
        detroit:
          'Uma pizza retangular com uma crosta espessa, macia e aerada. Famosa pela sua borda de queijo crocante e caramelizada (frico), formada ao assar o queijo contra as laterais de uma forma de aço funda.',
        chicago_deep_dish:
          'Caracterizada por uma crosta alta e amanteigada que forma uma tigela funda. É recheada com enormes quantidades de queijo e coberturas, com o molho de tomate por cima.',
        artisan_loaf:
          'Um pão rústico e crocante com um miolo aberto e irregular. Tipicamente feito com ingredientes simples e uma longa fermentação para um sabor complexo.',
        baguette:
          'Um pão francês longo e fino com uma crosta estaladiça e um interior macio. Definido pelos seus cortes característicos (pestanas) no topo.',
        ciabatta:
          'Um pão branco italiano com hidratação muito alta, conhecido pelos seus grandes buracos irregulares e uma textura leve e aerada.',
        pumpernickel:
          'Um pão de centeio denso, escuro e ligeiramente doce, originário da Alemanha. Tradicionalmente feito com farinha de centeio moída grosseiramente e um tempo de cozedura longo e lento.',
        sourdough_boule:
          'Um pão redondo clássico feito com um fermento natural (massa mãe), o que lhe confere um sabor ácido, miolo macio e uma crosta espessa e estaladiça.',
        rye_bread:
          'Um pão feito com farinha de grão de centeio. Pode variar de claro a escuro, muitas vezes mais denso que o pão de trigo, com um sabor terroso distinto.',
      },
      core_parameters: 'Parâmetros Principais',
      num_pizzas: 'Número de Pizzas',
      num_loaves: 'Número de Pães',
      num_units_note: 'Digite o número total de unidades que você quer fazer.',
      weight_per_pizza: 'Peso por Pizza (g)',
      weight_per_loaf: 'Peso por Pão (g)',
      weight_per_unit_note: 'Típico para o estilo {style}: {range}.',
      hydration: 'Hidratação',
      hydration_tooltip:
        'A quantidade de água relativa à farinha. Maior hidratação resulta em um miolo mais macio e aerado, mas pode ser mais difícil de manusear.',
      scale: 'Escala da Receita',
      scale_tooltip:
        'Aumenta ou diminui a receita inteira. Por exemplo, um valor de 1.5 aumentará todas as quantidades de ingredientes em 50%.',
      fermentation: 'Fermentação',
      direct: 'Direta',
      poolish: 'Poolish',
      biga: 'Biga',
      preferment_flour: 'Farinha do Pré-fermento',
      preferment_flour_tooltip:
        'A porcentagem da farinha total usada no pré-fermento. Porcentagens maiores desenvolvem más sabor, mas reduzem o tempo de fermentação.',
      yeast_type: 'Tipo de Fermento',
      yeast_type_tooltip:
        'IDY: Misture diretamente com a farinha. ADY: Ative em água morna primeiro. Fresco: Esfarele e dissolva; use cerca de 3x a quantidade de IDY.',
      yeast: 'Fermento',
      yeast_tooltip:
        'Controla a velocidade da fermentação. Ajuste com base no tempo de fermentação desejado e na temperatura ambiente.',
      settings: 'Configurações e Preferências',
      unit_system: 'Sistema de Unidades',
      us_customary: 'Americano (US)',
      metric: 'Métrico',
      unit_system_tooltip:
        "Altera o volume para medições de 'xícara'. Xícaras americanas têm ~237ml, enquanto xícaras métricas têm 250ml. Isso afeta a densidade do ingrediente para conversões volumétricas.",
      recipe_notes: 'Notas da Receita',
      notes_placeholder: 'Adicione suas dicas ou observações pessoais aqui...',
      reset: 'Redefinir Padrões',
      reset_aria: 'Redefinir formulário para os valores padrão',
      save_config: 'Salvar Configuração',
      load_config: 'Carregar Configuração',
      prompt_config_name: 'Digite um nome para a sua configuração:',
      config_saved: 'Configuração salva!',
      config_exists_overwrite:
        'Já existe uma configuração com este nome. Deseja substituí-la?',
    },
    yeast: {
      idy: 'Fermento Biológico Seco Instantâneo (IDY)',
      ady: 'Fermento Biológico Seco Ativo (ADY)',
      fresh: 'Fermento Fresco',
    },
    results: {
      title: 'Sua Receita',
      export_pdf_aria: 'Exportar receita para PDF',
      share_recipe_aria: 'Compartilhar receita via link',
      copied_to_clipboard: 'Copiado!',
      grams: 'Gramas',
      ounces: 'Onças',
      cups: 'Xícaras',
      preferment_title: 'Pré-fermento ({technique})',
      final_dough_title: 'Massa Final',
      preferment_label: 'Pré-fermento ({technique})',
      flour: 'Farinha',
      water: 'Água',
      salt: 'Sal',
      oil: 'Azeite',
      yeast: 'Fermento',
      total_dough: 'Massa Total',
      summary_pizza:
        '{count} massa de pizza de {weight}g | {count} massas de pizza de {weight}g',
      summary_bread: '{count} pão de {weight}g | {count} pães de {weight}g',
      notes_title: 'Minhas Notas',
      ingredients: {
        flour: 'Farinha de trigo',
        water: 'Água',
        salt: 'Sal marinho fino',
        oil: 'Azeite',
        yeast: 'Fermento Biológico Seco Instantâneo',
      },
      conversion_tooltip:
        'Sistema: {system} | 1 xícara ≈ {grams}g ({ingredient}). Fonte: Conversões padrão de panificação.',
      notes: {
        flour:
          "A base da sua massa. Farinha '00' é tradicional para Napolitana.",
        water:
          'Controla a consistência da massa. Use água fria para longas fermentações.',
        salt: 'Fortalece o glúten e adiciona sabor. Adicione longe do fermento.',
        oil: 'Adiciona sabor e maciez. Omitido na Napolitana tradicional.',
        yeast:
          'ADY pode precisar de ativação. IDY pode ser misturado diretamente.',
        preferment: 'Adicione o pré-fermento maturado à mistura da massa final.',
      },
      steps: {
        title: 'Modo de Preparo',
        direct: {
          step1:
            '<strong>Combinar Secos:</strong> Em uma tigela grande, misture a farinha e o fermento.',
          step2:
            '<strong>Dissolver Sal:</strong> Em outro recipiente, dissolva o sal na água. Se for usar azeite, adicione-o agora.',
          step3:
            '<strong>Misturar Massa:</strong> Despeje a mistura de água na farinha e mexa com uma colher ou com as mãos até formar uma massa homogênea. Cubra e deixe descansar por 20-30 minutos (autólise).',
          step4:
            '<strong>Sovar:</strong> Coloque a massa em uma superfície levemente enfarinhada e sove por 10-15 minutos até que fique lisa e elástica.',
          step5:
            '<strong>Primeira Fermentação:</strong> Coloque a massa em uma tigela levemente untada com azeite, cubra e deixe crescer até dobrar de tamanho (aprox. 1-2 horas em temperatura ambiente).',
          step6:
            '<strong>Modelar e Fermentar:</strong> Divida a massa em porções individuais, modele em bolas firmes e coloque-as em uma caixa de fermentação ou recipiente coberto. Para melhor sabor, faça uma fermentação a frio na geladeira por 24-72 horas.',
        },
        indirect: {
          preferment: {
            step1:
              'Em um recipiente, misture a farinha, a água e o fermento do pré-fermento até combinar. Não misture demais.',
            step2:
              'Cubra e deixe fermentar. Um método comum é 1 hora em temperatura ambiente, seguido de 16-24 horas na geladeira.',
          },
          finalDough: {
            step1:
              'Em uma tigela grande, combine o pré-fermento maturado com o restante da água. Use as mãos para quebrar e dissolver o pré-fermento.',
            step2:
              'Adicione o restante da farinha e o sal. Misture até formar uma massa disforme e deixe descansar por 20-30 minutos.',
            step3:
              'Sove a massa por 10-15 minutos. Se usar azeite, adicione na metade do tempo. A massa deve ficar lisa e elástica.',
            step4:
              'Prossiga com a <strong>Primeira Fermentação</strong> e <strong>Modelar e Fermentar</strong> conforme descrito no método Direto (passos 5 e 6).',
          },
        },
        baguette: {
          step1:
            '<strong>Misturar Poolish:</strong> Num recipiente, misture a farinha do pré-fermento, água e fermento. Cubra e deixe fermentar (1h à temp. ambiente, depois 16-24h na geladeira).',
          step2:
            '<strong>Massa Final:</strong> Numa tigela grande, combine o poolish maturado com a água restante. Adicione a farinha final e o sal. Misture até formar uma massa inicial e deixe repousar por 30 minutos.',
          step3:
            '<strong>Sovar e Fermentar:</strong> Sove por 5-7 minutos. Coloque num recipiente untado. Faça 2-3 séries de dobras durante uma fermentação de 2 horas.',
          step4:
            '<strong>Pré-modelar:</strong> Vire a massa gentilmente numa superfície com pouca farinha. Divida em porções e pré-modele em cilindros largos. Deixe descansar por 20 minutos.',
          step5:
            '<strong>Modelagem Final:</strong> Achate cada cilindro e enrole-o firmemente. Role e estique até ao comprimento desejado da baguete.',
          step6:
            '<strong>Levedar:</strong> Coloque as baguetes modeladas sobre um pano de padeiro (couche) enfarinhado ou papel vegetal, com a costura para baixo. Cubra e deixe levedar por 45-60 minutos.',
          step7:
            '<strong>Cortar e Assar:</strong> Pré-aqueça o forno com uma pedra de cozimento e uma bandeja de vapor a 240°C (475°F). Transfira as baguetes para uma pá, faça cortes no topo com uma lâmina e asse com vapor por 10 minutos. Remova o vapor e asse por mais 15-20 minutos até ficarem douradas.',
        },
        ciabatta: {
          step1:
            '<strong>Misturar Biga:</strong> Num recipiente, misture a farinha do pré-fermento, água e fermento para formar uma massa firme. Cubra e fermente (1h à temp. ambiente, depois 16-24h na geladeira).',
          step2:
            '<strong>Massa Final:</strong> Numa batedeira, desfaça a biga maturada na água restante. Adicione a farinha final, sal e azeite. Misture em velocidade baixa até combinar, depois em velocidade média por 10-12 minutos até a massa se soltar das laterais (ficará muito pegajosa).',
          step3:
            '<strong>Fermentação em Bloco:</strong> Transfira a massa extremamente húmida para um recipiente de lados retos e bem untado. Faça 3-4 séries de dobras a cada 30 minutos nas primeiras 2 horas. Deixe-a triplicar de tamanho (cerca de 3-4 horas no total).',
          step4:
            '<strong>Dividir e Modelar:</strong> Enhfarinhe generosamente a sua superfície de trabalho. Despeje a massa com cuidado, mantendo o lado com bolhas para cima. Enhfarinhe o topo. Use um raspador de massa para dividir a massa em porções retangulares.',
          step5:
            '<strong>Levedar:</strong> Estique gentilmente cada pedaço numa forma de "chinelo" (ciabatta) e transfira para um couche bem enfarinhado ou papel vegetal. Tenha cuidado para não perder o gás. Levede por 30-45 minutos.',
          step6:
            '<strong>Assar:</strong> Pré-aqueça o forno com uma pedra de cozimento e uma bandeja de vapor a 230°C (450°F). Transfira cuidadosamente as ciabattas para a pedra. Asse com vapor por 10-12 minutos, depois remova o vapor e asse por mais 10-15 minutos até ficarem douradas e soarem ocas ao bater.',
        },
      },
    },
    units: {
      g: 'g',
      oz: 'oz',
      cups: 'xícaras',
      tbsp: 'cs',
      tsp: 'cc',
      scale: 'x',
    },
    load_modal: {
      title: 'Carregar Configuração',
      no_configs: 'Você ainda não tem configurações salvas.',
      load: 'Carregar',
      delete: 'Excluir',
      delete_aria: 'Excluir configuração',
      close_aria: 'Fechar modal',
    },
  },
  es: {
    appName: 'DoughLabPro',
    header: {
      switch_to_dark: 'Cambiar a modo oscuro',
      switch_to_light: 'Cambiar a modo claro',
      user_profile: 'Perfil de usuario',
      user_profile_tooltip: 'Perfil y Ajustes (próximamente)',
    },
    footer: {
      pizza_making: '¡Feliz horneado!',
      save_recipe: 'Guardar Receta',
      saved_recipes: 'Recetas Guardadas',
      total_dough: 'Masa Total:',
    },
    ads: {
      advertisement: 'Publicidad',
    },
    form: {
      bake_type: 'Tipo de Masa',
      pizzas: 'Pizzas',
      breads: 'Panes',
      recipe_style: 'Estilo de Receta',
      napoletana: 'Napolitana',
      ny: 'New York',
      romana: 'Romana',
      sicilian: 'Siciliana',
      focaccia: 'Focaccia',
      detroit: 'Estilo Detroit',
      chicago_deep_dish: 'Chicago Deep Dish',
      artisan_loaf: 'Pan Artesano',
      baguette: 'Baguette',
      ciabatta: 'Ciabatta',
      pumpernickel: 'Pumpernickel',
      sourdough_boule: 'Pan de Masa Madre',
      rye_bread: 'Pan de Centeno',
      style_tooltips: {
        napoletana:
          'Se caracteriza por una base suave y delgada con un borde inflado y aireado (cornicione). Horneada a alta temperatura y rápidamente, tradicionalmente con pocos ingredientes.',
        ny: 'Una porción grande, delgada y plegable con una corteza exterior crujiente y un interior masticable. A menudo se vende por porciones.',
        romana:
          "Conocida como 'pizza al taglio' (al corte) o 'in teglia' (en bandeja). Tiene una hidratación muy alta, lo que resulta en una pizza rectangular ligera, aireada y crujiente.",
        sicilian:
          'Una pizza rectangular, gruesa y esponjosa con una base crujiente, casi frita. Los ingredientes a menudo se colocan debajo del queso.',
        focaccia:
          'Un pan italiano plano horneado, a menudo con hoyuelos y cubierto con aceite de oliva, sal y hierbas. Puede ser grueso y suave o delgado y crujiente.',
        detroit:
          'Una pizza rectangular con una corteza gruesa, masticable y aireada. Famosa por su borde de queso crujiente y caramelizado (frico) que se forma al hornear el queso contra los lados de un molde de acero profundo.',
        chicago_deep_dish:
          'Se caracteriza por una corteza alta y mantecosa que forma un cuenco profundo. Se rellena con enormes cantidades de queso e ingredientes, con la salsa de tomate por encima.',
        artisan_loaf:
          'Un pan rústico y crujiente con una miga abierta e irregular. Típicamente hecho con ingredientes simples y una fermentación larga para un sabor complejo.',
        baguette:
          'Una barra de pan francés larga y delgada con una corteza crujiente y un interior masticable. Se define por sus característicos cortes en la parte superior.',
        ciabatta:
          'Un pan blanco italiano con una hidratación muy alta, conocido por sus grandes agujeros irregulares y una textura ligera y aireada.',
        pumpernickel:
          'Un pan de centeno denso, oscuro y ligeramente dulce originario de Alemania. Tradicionalmente hecho con harina de centeno molida gruesa y un tiempo de horneado largo y lento.',
        sourdough_boule:
          'Un pan redondo clásico hecho con un fermento natural (masa madre), lo que le da un sabor ácido, una miga masticable y una corteza gruesa y crujiente.',
        rye_bread:
          'Un pan hecho con harina de grano de centeno. Puede variar de claro a oscuro, a menudo más denso que el pan de trigo, con un sabor terroso distintivo.',
      },
      core_parameters: 'Parámetros Principales',
      num_pizzas: 'Número de Pizzas',
      num_loaves: 'Número de Panes',
      num_units_note:
        'Ingrese el número total de unidades que desea hacer.',
      weight_per_pizza: 'Peso por Pizza (g)',
      weight_per_loaf: 'Peso por Pan (g)',
      weight_per_unit_note: 'Rango típico para el estilo {style}: {range}.',
      hydration: 'Hidratación',
      hydration_tooltip:
        'La cantidad de agua en relación con la harina. Una mayor hidratación produce una miga más suave y aireada, pero puede ser más difícil de manejar.',
      scale: 'Escala de Receta',
      scale_tooltip:
        'Aumenta o disminuye toda la receta. Por ejemplo, un valor de 1.5 aumentará todas las cantidades de ingredientes en un 50%.',
      fermentation: 'Fermentación',
      direct: 'Directa',
      poolish: 'Poolish',
      biga: 'Biga',
      preferment_flour: 'Harina del Prefermento',
      preferment_flour_tooltip:
        'El porcentaje de harina total utilizado en el prefermento. Porcentajes más altos desarrollan más sabor pero reducen el tiempo de fermentación.',
      yeast_type: 'Tipo de Levadura',
      yeast_type_tooltip:
        'IDY: Mezclar directamente con la harina. ADY: Activar primero en agua tibia. Fresca: Desmenuzar y disolver; usar ~3x la cantidad de IDY.',
      yeast: 'Levadura',
      yeast_tooltip:
        'Controla la velocidad de la fermentación. Ajuste según el tiempo de levado deseado y la temperatura ambiente.',
      settings: 'Ajustes y Preferencias',
      unit_system: 'Sistema de Unidades',
      us_customary: 'EE.UU. (US)',
      metric: 'Métrico',
      unit_system_tooltip:
        "Cambia el volumen para las medidas de 'taza'. Las tazas de EE.UU. son ~237ml, mientras que las tazas métricas son 250ml. Esto afecta la densidad del ingrediente para las conversiones volumétricas.",
      recipe_notes: 'Notas de la Receta',
      notes_placeholder: 'Añade aquí tus consejos u observaciones personales...',
      reset: 'Restablecer Valores',
      reset_aria: 'Restablecer formulario a los valores predeterminados',
      save_config: 'Guardar Configuración',
      load_config: 'Cargar Configuración',
      prompt_config_name: 'Ingrese un nombre para su configuración:',
      config_saved: '¡Configuración guardada!',
      config_exists_overwrite:
        'Ya existe una configuración con este nombre. ¿Desea sobrescribirla?',
    },
    yeast: {
      idy: 'Levadura Seca Instantánea (IDY)',
      ady: 'Levadura Seca Activa (ADY)',
      fresh: 'Levadura Fresca',
    },
    results: {
      title: 'Tu Receta',
      export_pdf_aria: 'Exportar receta a PDF',
      share_recipe_aria: 'Compartir receta por enlace',
      copied_to_clipboard: '¡Copiado!',
      grams: 'Gramos',
      ounces: 'Onzas',
      cups: 'Tazas',
      preferment_title: 'Prefermento ({technique})',
      final_dough_title: 'Masa Final',
      preferment_label: 'Prefermento ({technique})',
      flour: 'Harina',
      water: 'Agua',
      salt: 'Sal',
      oil: 'Aceite',
      yeast: 'Levadura',
      total_dough: 'Masa Total',
      summary_pizza:
        '{count} bollo de pizza de {weight}g | {count} bollos de pizza de {weight}g',
      summary_bread: '{count} pan de {weight}g | {count} panes de {weight}g',
      notes_title: 'Mis Notas',
      ingredients: {
        flour: 'Harina de todo uso',
        water: 'Agua',
        salt: 'Sal marina fina',
        oil: 'Aceite de oliva',
        yeast: 'Levadura Seca Instantánea',
      },
      conversion_tooltip:
        'Sistema: {system} | 1 taza ≈ {grams}g ({ingredient}). Fuente: Conversiones estándar de repostería.',
      notes: {
        flour:
          'La base de tu masa. La harina "00" es tradicional para la Napolitana.',
        water:
          'Controla la consistencia de la masa. Use agua fría para fermentaciones largas.',
        salt: 'Fortalece el gluten y añade sabor. Añadir lejos de la levadura.',
        oil: 'Añade sabor y suavidad. Omitido en la Napolitana tradicional.',
        yeast:
          'La levadura ADY puede necesitar activación. La IDY se puede mezclar directamente.',
        preferment: 'Añada el prefermento maduro a la mezcla de la masa final.',
      },
      steps: {
        title: 'Método',
        direct: {
          step1:
            '<strong>Combinar Secos:</strong> En un bol grande, mezclar la harina y la levadura.',
          step2:
            '<strong>Disolver Sal:</strong> En otro recipiente, disolver la sal en el agua. Si usas aceite, añádelo ahora.',
          step3:
            '<strong>Mezclar Masa:</strong> Vierte la mezcla de agua en la harina y mezcla con una cuchara o las manos hasta formar una masa irregular. Cubre y deja reposar 20-30 minutos (autólisis).',
          step4:
            '<strong>Amasar:</strong> Pasa la masa a una superficie ligeramente enharinada y amasa durante 10-15 minutos hasta que esté suave y elástica.',
          step5:
            '<strong>Fermentación en Bloque:</strong> Coloca la masa en un bol ligeramente aceitado, cúbrela y déjala levar hasta que doble su tamaño (aprox. 1-2 horas a temperatura ambiente).',
          step6:
            '<strong>Formar y Levar:</strong> Divide la masa en porciones individuales, forma bolas apretadas y colócalas en una caja de fermentación o recipiente cubierto. Para mejor sabor, fermenta en frío en el refrigerador durante 24-72 horas.',
        },
        indirect: {
          preferment: {
            step1:
              'En un recipiente, mezcla la harina, el agua y la levadura del prefermento hasta que se combinen. No amases en exceso.',
            step2:
              'Cubre y deja fermentar. Un método común es 1 hora a temperatura ambiente, y luego 16-24 horas en el refrigerador.',
          },
          finalDough: {
            step1:
              'En un bol grande, combina el prefermento maduro con el agua restante. Usa las manos para romper y disolver el prefermento.',
            step2:
              'Añade la harina restante y la sal. Mezcla hasta obtener una masa irregular y déjala reposar durante 20-30 minutos.',
            step3:
              'Amasa durante 10-15 minutos. Si usas aceite, añádelo a la mitad del amasado. La masa debe quedar suave y elástica.',
            step4:
              'Procede con la <strong>Fermentación en Bloque</strong> y <strong>Formar y Levar</strong> como se describe en el método Directo (pasos 5 y 6).',
          },
        },
        baguette: {
          step1:
            '<strong>Mezclar Poolish:</strong> En un recipiente, mezclar la harina del prefermento, agua y levadura. Cubrir y dejar fermentar (1h a temp. ambiente, luego 16-24h en la nevera).',
          step2:
            '<strong>Mezcla Final:</strong> En un bol grande, combinar el poolish maduro con el agua restante. Añadir la harina final y la sal. Mezclar hasta formar una masa inicial y dejar reposar 30 minutos.',
          step3:
            '<strong>Amasado y Fermentación:</strong> Amasar durante 5-7 minutos. Colocar en un recipiente aceitado. Realizar 2-3 series de pliegues durante una fermentación de 2 horas.',
          step4:
            '<strong>Preformado:</strong> Volcar suavemente la masa sobre una superficie ligeramente enharinada. Dividir en porciones y preformar en cilindros sueltos. Dejar reposar 20 minutos.',
          step5:
            '<strong>Formado Final:</strong> Aplanar suavemente cada cilindro y enrollarlo en un cilindro apretado. Rodar y estirar hasta la longitud deseada de la baguette.',
          step6:
            '<strong>Levado:</strong> Colocar las baguettes formadas sobre una tela enharinada (couche) o papel de horno, con la costura hacia abajo. Cubrir y levar durante 45-60 minutos.',
          step7:
            '<strong>Grecado y Horneado:</strong> Precalentar el horno con una piedra de hornear y una bandeja de vapor a 240°C (475°F). Transferir las baguettes a una pala, hacer cortes en la parte superior con una cuchilla y hornear con vapor durante 10 minutos. Retirar el vapor y hornear por otros 15-20 minutos hasta que estén doradas.',
        },
        ciabatta: {
          step1:
            '<strong>Mezclar Biga:</strong> En un recipiente, mezclar la harina del prefermento, agua y levadura para formar una masa firme. Cubrir y fermentar (1h a temp. ambiente, luego 16-24h en la nevera).',
          step2:
            '<strong>Mezcla Final:</strong> En una amasadora, deshacer la biga madura en el agua restante. Añadir la harina final, la sal y el aceite. Mezclar a baja velocidad hasta combinar, luego a velocidad media durante 10-12 minutos hasta que la masa se despegue de los lados (será muy pegajosa).',
          step3:
            '<strong>Fermentación en Bloque:</strong> Transferir la masa extremadamente húmeda a un recipiente de lados rectos y bien aceitado. Realizar 3-4 series de pliegues cada 30 minutos durante las primeras 2 horas. Dejar que triplique su tamaño (unas 3-4 horas en total).',
          step4:
            '<strong>Dividir y Formar:</strong> Enharinar generosamente la superficie de trabajo. Volcar la masa con cuidado, manteniendo el lado con burbujas hacia arriba. Enharinar la parte superior. Con una rasqueta, dividir la masa en porciones rectangulares.',
          step5:
            '<strong>Levado:</strong> Estirar suavemente cada pieza en forma de "zapatilla" (ciabatta) y transferirla a una couche muy enharinada o papel de horno. Tener cuidado de no desgasificarla. Levar durante 30-45 minutos.',
          step6:
            '<strong>Horneado:</strong> Precalentar el horno con una piedra de hornear y una bandeja de vapor a 230°C (450°F). Transferir con cuidado las ciabattas a la piedra. Hornear con vapor durante 10-12 minutos, luego retirar el vapor y hornear por otros 10-15 minutos hasta que estén doradas y suenen huecas.',
        },
      },
    },
    units: {
      g: 'g',
      oz: 'oz',
      cups: 'tazas',
      tbsp: 'cda',
      tsp: 'cdta',
      scale: 'x',
    },
    load_modal: {
      title: 'Cargar Configuración',
      no_configs: 'Aún no tienes configuraciones guardadas.',
      load: 'Cargar',
      delete: 'Eliminar',
      delete_aria: 'Eliminar configuración',
      close_aria: 'Cerrar modal',
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

      // Handle plurals first
      if (key.startsWith('results.summary') && replacements?.count) {
        const count =
          typeof replacements.count === 'string'
            ? parseInt(
                replacements.count.replace(/<[^>]*>/g, ''), // strip tags for check
                10,
              )
            : replacements.count;

        if (result.includes('|')) {
          const [singular, plural] = result.split(' | ').map((s) => s.trim());
          resultString = count > 1 ? plural : singular;
        }
      }

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
