import React, {
  useState,
  createContext,
  useContext,
  ReactNode,
  FC,
  useCallback,
  useEffect,
} from 'react';
import { Locale } from './types';

// Fallback mechanism for missing translations
const en = {
  header: {
    user_profile_tooltip: 'User Profile',
    switch_to_dark: 'Switch to dark theme',
    switch_to_light: 'Switch to light theme',
    go_pro: 'Go Pro',
    pro_member: 'Pro Member',
  },
  form: {
    bake_type: 'Bake Type',
    pizzas: 'Pizza',
    breads: 'Bread',
    recipe_style: 'Recipe Style',
    neapolitan: 'Neapolitan',
    ny_style: 'NY Style',
    roman: 'Roman',
    detroit: 'Detroit',
    sicilian: 'Sicilian',
    chicago: 'Chicago',
    sourdough: 'Sourdough',
    baguette: 'Baguette',
    ciabatta: 'Ciabatta',
    focaccia: 'Focaccia',
    brioche: 'Brioche',
    rye: 'Rye',
    core_parameters: 'Core Parameters',
    num_pizzas: 'Number of Pizzas',
    num_loaves: 'Number of Loaves',
    num_units_note: '1-100 units',
    weight_per_pizza: 'Weight per Pizza',
    weight_per_loaf: 'Weight per Loaf',
    weight_per_unit_note: 'Typically {style} is {range}',
    hydration: 'Hydration',
    hydration_tooltip:
      "The ratio of water to flour by weight. Higher hydration results in a lighter, more open crumb but can be harder to handle.",
    scale: 'Scale Recipe',
    scale_tooltip:
      'Multiply your entire recipe. Useful for testing a small batch or scaling up for a party.',
    fermentation: 'Fermentation',
    direct: 'Direct',
    poolish: 'Poolish',
    biga: 'Biga',
    preferment_flour: 'Preferment Flour',
    preferment_flour_tooltip:
      'The percentage of total flour to be used in the preferment. Common ranges are 20-50%.',
    yeast_type: 'Yeast/Starter Type',
    yeast_type_tooltip:
      'IDY is standard. ADY needs activation. Sourdough percentage is based on total flour weight (as levain).',
    yeast: 'Yeast',
    yeast_tooltip:
      'Percentage of Instant Dry Yeast (IDY) relative to flour. Other yeast types are converted automatically.',
    yeast_idy: 'Instant Dry Yeast (IDY)',
    yeast_ady: 'Active Dry Yeast (ADY)',
    yeast_fresh: 'Fresh Yeast',
    yeast_sourdough: 'Sourdough Starter',
    settings: 'Settings & Preferences',
    unit_system: 'Unit System',
    unit_system_tooltip:
      'US Customary uses a ~237ml cup. Metric uses a 250ml cup. This affects all volumetric conversions.',
    us_customary: 'US Customary',
    metric: 'Metric',
    recipe_notes: 'Recipe Notes',
    notes_placeholder: 'Add notes about your process, timing, results, etc.',
    reset: 'Reset to Defaults',
    reset_aria: 'Reset all form fields to their default values',
    prompt_config_name: 'Enter a name for this recipe:',
    errors: {
      num_pizzas_range: 'Please enter a value between 1 and 100.',
      dough_ball_weight_range: 'Please enter a value between 100 and 2000.',
    },
  },
  results: {
    title: 'Your Recipe',
    share_recipe_aria: 'Share Recipe',
    export_pdf_aria: 'Export as PDF',
    grams: 'Grams',
    ounces: 'Ounces',
    cups: 'Cups',
    unit_system_display: 'Using {system} cups',
    conversion_tooltip:
      '1 cup of {ingredient} is approx. {grams}g in the {system} system. Source: King Arthur Baking.',
    flour: 'Flour',
    water: 'Water',
    salt: 'Salt',
    oil: 'Oil',
    yeast: 'Yeast',
    total_dough: 'Total Dough Weight',
    preferment_title: '{technique} Preferment',
    final_dough_title: 'Final Dough',
    preferment_label: '{technique}',
    notes_title: 'Your Notes',
    summary_pizza:
      'Makes <span class="font-bold text-lime-600 dark:text-lime-400">{count}</span> pizzas at <span class="font-bold text-lime-600 dark:text-lime-400">{weight}</span>g each.',
    summary_bread:
      'Makes <span class="font-bold text-lime-600 dark:text-lime-400">{count}</span> loaves at <span class="font-bold text-lime-600 dark:text-lime-400">{weight}</span>g each.',
    steps: {
      title: 'Method',
      direct: {
        step1:
          '<b>Combine:</b> In a large bowl, mix together the flour and water until no dry spots remain. Cover and let it rest (autolyse) for 20-30 minutes.',
        step2:
          '<b>Knead:</b> Add the salt, yeast, and oil. Knead for 8-12 minutes on a stand mixer, or 15-20 minutes by hand, until the dough is smooth and passes the windowpane test.',
        step3:
          '<b>Bulk Ferment:</b> Place the dough in a lightly oiled container, cover, and let it rise at room temperature for 1-2 hours, or until it has increased in volume by about 50%.',
        step4:
          '<b>Divide & Shape:</b> Turn the dough out onto a lightly floured surface. Divide it into {count} equal pieces. Shape each piece into a tight ball.',
        step5:
          '<b>Cold Ferment (Optional):</b> Place the dough balls in a covered container or on a tray and refrigerate for 1-3 days for improved flavor.',
        step6:
          '<b>Final Proof & Bake:</b> Take the dough out of the fridge 2-3 hours before baking. Let it come to room temperature. Stretch, top, and bake in a preheated oven.',
      },
      indirect: {
        preferment: {
          step1:
            '<b>Mix Preferment:</b> In a small bowl, mix the preferment flour, water, and yeast. Cover and let it ferment at room temperature for 8-12 hours, or until bubbly and active.',
          step2:
            '<b>Check for Ripeness:</b> The preferment is ready when it has domed and just begun to recede in the center. It should smell sweet and slightly alcoholic.',
        },
        finalDough: {
          step1:
            '<b>Combine:</b> In a large bowl, combine the final dough flour and water with the ripe preferment. Mix until combined and let it autolyse for 20-30 minutes.',
          step2:
            '<b>Knead:</b> Add the salt, remaining yeast, and oil. Knead for 8-12 minutes until the dough is strong and elastic.',
          step3:
            '<b>Bulk Ferment & Shape:</b> Ferment for 30-60 minutes at room temperature. After this short bulk, divide, shape, and proceed with cold fermentation as you would for a direct dough.',
          step4:
            '<b>Final Proof & Bake:</b> Proof and bake as you would for a direct dough, keeping in mind fermentation may be slightly faster.',
        },
      },
       baguette: {
        step1: "<b>Autolyse:</b> Combine flour and water, mix until just incorporated. Rest for 30 minutes.",
        step2: "<b>Mix:</b> Add salt and yeast, mix on low for 5 minutes. Increase speed and mix for another 5-7 minutes until dough is smooth.",
        step3: "<b>Bulk Ferment:</b> Ferment for 2 hours with folds every 45 minutes.",
        step4: "<b>Divide & Preshape:</b> Divide dough into portions. Gently preshape into logs. Rest for 20-30 minutes.",
        step5: "<b>Shape:</b> Shape into final baguette form.",
        step6: "<b>Proof:</b> Proof on a floured couche for 45-60 minutes.",
        step7: "<b>Bake:</b> Score and bake at 245°C (475°F) with steam for 20-25 minutes."
      },
      ciabatta: {
        step1: "<b>Mix:</b> Combine all ingredients. Mix on low until combined, then on high for 10-15 minutes until dough is very extensible.",
        step2: "<b>Bulk Ferment:</b> Ferment for 3-4 hours in an oiled container, with folds every hour.",
        step3: "<b>Divide:</b> Turn dough out onto a well-floured surface. Dust the top with flour and divide into portions using a bench scraper.",
        step4: "<b>Shape:</b> Gently stretch each piece into a rectangle. No tight shaping is needed.",
        step5: "<b>Proof:</b> Proof on a floured couche for 30-45 minutes.",
        step6: "<b>Bake:</b> Bake at 230°C (450°F) with steam for 20-25 minutes."
      }
    },
    ingredients: {
      flour: 'Flour',
      water: 'Water',
      salt: 'Salt',
      oil: 'Oil',
      yeast: 'Yeast',
    },
    notes: {
      flour: '100% (Baker\'s Percentage)',
      water: 'Hydration',
      salt: 'Salt Percentage',
      oil: 'Oil/Fat Percentage',
      yeast: 'Calculated as IDY',
      preferment: 'To be added in final mix',
    },
  },
  units: {
    g: 'g',
    oz: 'oz',
    cups: 'cups',
    tbsp: 'tbsp',
    tsp: 'tsp',
  },
  ads: {
    advertisement: 'Advertisement',
  },
  footer: {
    total_dough: 'Total Dough',
    save_recipe: 'Save Recipe',
    saved_recipes: 'Saved Recipes',
    upgrade_to_pro: 'Upgrade to Pro'
  },
  load_modal: {
    title: 'Load a Recipe',
    close_aria: 'Close modal',
    no_configs: "You don't have any saved recipes yet.",
    load: 'Load',
    delete_aria: 'Delete recipe',
  },
  pro: {
    go_pro_header: 'Go Pro',
    locked_tooltip: 'This is a Pro feature. Click to upgrade!',
  },
  paywall: {
    title: 'Unlock DoughLabPro',
    subtitle: 'Upgrade to unlock all features and perfect your craft.',
    feature_save: 'Save & Load Recipes',
    feature_save_desc: 'Save your favorite configurations for one-click access.',
    feature_pro_recipes: 'Pro Recipes & Techniques',
    feature_pro_recipes_desc:
      'Access expert recipes and advanced baking guides.',
    feature_ads: 'Ad-Free Experience',
    feature_ads_desc: 'Enjoy a clean, focused interface with no interruptions.',
    feature_export: 'Export to PDF',
    feature_export_desc: 'Save and print your recipes for your kitchen.',
    feature_scaling: 'Recipe Scaling',
    feature_scaling_desc: 'Easily scale any recipe up or down.',
    cta_button: 'Upgrade to Pro (Lifetime)',
    cta_pass_button: 'Use for 24h (Simulated Ad)',
    pass_cooldown_message: 'Next pass available in {hours}h',
    restore_purchase: 'View plans & restore purchase',
    success_title_pro: 'You are now a Pro!',
    success_title_pass: '24h Pass Activated!',
    success_message: 'All features are now unlocked. Happy baking!',
  },
  pro_recipes: {
    modal_title: 'Pro Recipes',
    neapolitan_title: 'Classic Neapolitan',
    neapolitan_desc:
      'A traditional, soft, and foldable pizza with a puffy crust. Perfect for high-heat ovens.',
    sourdough_title: 'Artisan Sourdough Loaf',
    sourdough_desc:
      'A classic high-hydration sourdough with an open crumb and tangy flavor.',
    focaccia_title: 'High Hydration Focaccia',
    focaccia_desc:
      'A light, airy, and dimpled flatbread, perfect for sandwiches or as a side.',
    ny_style_title: 'New York Style',
    ny_style_desc:
      'A large, foldable slice with a crisp crust. A classic from the Big Apple.',
    roman_desc: 'Crispy, airy, and light pizza in pala or teglia style.',
    detroit_desc:
      'A rectangular pizza with a thick, chewy crust and crispy, cheesy edges.',
    sicilian_desc: 'A thick, spongy, rectangular pizza, often topped with herbs.',
    chicago_desc: 'A deep-dish pizza with a high crust and inverted layers.',
    baguette_desc:
      'A classic French bread with a crisp crust and chewy interior.',
    ciabatta_desc:
      'An Italian white bread with a very high hydration and open crumb.',
    brioche_desc: 'A rich bread with a high butter and egg content.',
    rye_desc: 'A dense, flavorful bread made with flour from rye grain.',
  },
  plans_page: {
    title: 'Choose Your Plan',
    subtitle: 'Unlock the full potential of your baking with DoughLabPro.',
    feature: 'Feature',
    free_tier: 'Free',
    pro_tier: 'Pro',
    feature_calculator: 'Advanced Dough Calculator',
    feature_styles: 'Multiple Pizza & Bread Styles',
    feature_units: 'Grams, Ounces & Volume',
    feature_ads: 'Contains Ads',
    feature_save_load: 'Save & Load Recipes',
    feature_export: 'Export to PDF & Share',
    feature_scaling: 'Recipe Scaling',
    feature_pro_recipes: 'Exclusive Recipes & Techniques',
    upgrade_button: 'Upgrade to Pro',
  },
   tips_page: {
    title: 'Pro Tips & Techniques',
    subtitle: 'Master the fundamentals to elevate your baking.',
    hydration_title: "Understanding Hydration",
    hydration_p1: "Hydration, expressed as a percentage, is the weight of the water relative to the weight of the flour. A 70% hydration dough has 70g of water for every 100g of flour. Lower hydration (55-65%) is easier to handle and creates a denser crumb, typical for NY style pizza. Higher hydration (70-85%+) creates a lighter, more open crumb with larger holes, perfect for Ciabatta or Roman pizza, but requires more skill to manage.",
    hydration_p2: "When experimenting, increase hydration in small 2-3% increments. The type of flour matters greatly; whole wheat and high-protein flours can absorb more water than standard all-purpose flour.",
    fermentation_title: "Mastering Fermentation",
    fermentation_p1: "Fermentation is where flavor develops. It's a balance of time and temperature. A longer, colder fermentation (e.g., 24-72 hours in the refrigerator) slows down yeast activity, allowing complex flavors to develop without over-proofing the dough. This is key for artisanal bread and Neapolitan pizza.",
    fermentation_p2: "For a faster turnaround, you can ferment at room temperature, but the flavor will be less complex. Watch the dough, not the clock. It's ready for the next step when it's airy, light, and has increased in volume by about 50-100%, depending on the recipe.",
    salt_title: "The Role of Salt",
    salt_p1: "Salt is not just for flavor; it's crucial for dough structure. It tightens the gluten network, adding strength and elasticity to your dough. It also regulates yeast activity, preventing it from fermenting too quickly. A typical salt percentage for both pizza and bread is between 1.8% and 3%. Without enough salt, your dough will be slack, sticky, and taste flat.",
  },
  auth: {
    sign_in: 'Sign In',
    sign_out: 'Sign Out',
    view_profile: 'View Profile',
    modal_title: 'Welcome Back!',
    modal_subtitle: 'Sign in to access your profile and saved recipes.',
    google_button: 'Sign in with Google',
    or_continue_with: 'Or continue with',
    email_label: 'Email Address',
    password_label: 'Password',
    login_button: 'Login',
  },
  profile: {
    title: 'My Profile',
    name: 'Name',
    email: 'Email',
    membership_status: 'Membership Status',
    membership_free: 'Free Member',
    membership_pro: 'Pro Member',
  }
};

const pt: Record<string, any> = {
  header: {
    user_profile_tooltip: 'Perfil do Usuário',
    switch_to_dark: 'Mudar para tema escuro',
    switch_to_light: 'Mudar para tema claro',
    go_pro: 'Seja Pro',
    pro_member: 'Membro Pro',
  },
  form: {
    bake_type: 'Tipo de Massa',
    pizzas: 'Pizza',
    breads: 'Pão',
    recipe_style: 'Estilo da Receita',
    neapolitan: 'Napolitana',
    ny_style: 'NY Style',
    roman: 'Romana',
    detroit: 'Detroit',
    sicilian: 'Siciliana',
    chicago: 'Chicago',
    sourdough: 'Massa Fermentada',
    baguette: 'Baguete',
    ciabatta: 'Ciabatta',
    focaccia: 'Focaccia',
    brioche: 'Brioche',
    rye: 'Centeio',
    core_parameters: 'Parâmetros Principais',
    num_pizzas: 'Número de Pizzas',
    num_loaves: 'Número de Pães',
    num_units_note: '1-100 unidades',
    weight_per_pizza: 'Peso por Pizza',
    weight_per_loaf: 'Peso por Pão',
    weight_per_unit_note: 'Tipicamente {style} tem {range}',
    hydration: 'Hidratação',
    hydration_tooltip:
      'A proporção de água para farinha por peso. Hidratação mais alta resulta em um miolo mais leve e aberto, mas pode ser mais difícil de manusear.',
    scale: 'Escalar Receita',
    scale_tooltip:
      'Multiplique sua receita inteira. Útil para testar um lote pequeno ou aumentar para uma festa.',
    fermentation: 'Fermentação',
    direct: 'Direto',
    poolish: 'Poolish',
    biga: 'Biga',
    preferment_flour: 'Farinha no Pré-fermento',
    preferment_flour_tooltip:
      'A porcentagem da farinha total a ser usada no pré-fermento. Faixas comuns são de 20-50%.',
    yeast_type: 'Tipo de Fermento/Levain',
    yeast_type_tooltip:
      'IDY é o padrão. ADY precisa de ativação. A porcentagem de levain é baseada no peso total da farinha.',
    yeast: 'Fermento',
    yeast_tooltip:
      'Porcentagem de Fermento Biológico Seco Instantâneo (IDY) em relação à farinha. Outros tipos de fermento são convertidos automaticamente.',
    yeast_idy: 'Fermento Biológico Seco Instantâneo (IDY)',
    yeast_ady: 'Fermento Biológico Seco Ativo (ADY)',
    yeast_fresh: 'Fermento Fresco',
    yeast_sourdough: 'Levain (Fermento Natural)',
    settings: 'Configurações e Preferências',
    unit_system: 'Sistema de Unidades',
    unit_system_tooltip:
      'O sistema US Customary usa uma xícara de ~237ml. O sistema Métrico usa uma xícara de 250ml. Isso afeta todas as conversões volumétricas.',
    us_customary: 'US Customary',
    metric: 'Métrico',
    recipe_notes: 'Notas da Receita',
    notes_placeholder: 'Adicione notas sobre seu processo, tempos, resultados, etc.',
    reset: 'Redefinir para Padrões',
    reset_aria: 'Redefinir todos os campos do formulário para seus valores padrão',
    prompt_config_name: 'Digite um nome para esta receita:',
    errors: {
      num_pizzas_range: 'Por favor, insira um valor entre 1 e 100.',
      dough_ball_weight_range: 'Por favor, insira um valor entre 100 e 2000.',
    },
  },
  results: {
    title: 'Sua Receita',
    share_recipe_aria: 'Compartilhar Receita',
    export_pdf_aria: 'Exportar como PDF',
    grams: 'Gramas',
    ounces: 'Onças',
    cups: 'Xícaras',
    unit_system_display: 'Usando xícaras {system}',
    conversion_tooltip:
      '1 xícara de {ingredient} tem aprox. {grams}g no sistema {system}. Fonte: King Arthur Baking.',
    flour: 'Farinha',
    water: 'Água',
    salt: 'Sal',
    oil: 'Azeite',
    yeast: 'Fermento',
    total_dough: 'Peso Total da Massa',
    preferment_title: 'Pré-fermento {technique}',
    final_dough_title: 'Massa Final',
    preferment_label: '{technique}',
    notes_title: 'Suas Notas',
    summary_pizza:
      'Rende <span class="font-bold text-lime-600 dark:text-lime-400">{count}</span> pizzas de <span class="font-bold text-lime-600 dark:text-lime-400">{weight}</span>g cada.',
    summary_bread:
      'Rende <span class="font-bold text-lime-600 dark:text-lime-400">{count}</span> pães de <span class="font-bold text-lime-600 dark:text-lime-400">{weight}</span>g cada.',
    steps: {
      title: 'Método',
      direct: {
        step1: '<b>Combinar:</b> Em uma tigela grande, misture a farinha e a água até não haver pontos secos. Cubra e deixe descansar (autólise) por 20-30 minutos.',
        step2: '<b>Sovar:</b> Adicione o sal, o fermento e o azeite. Sove por 8-12 minutos na batedeira ou 15-20 minutos à mão, até a massa ficar lisa e passar no teste do ponto de véu.',
        step3: '<b>Primeira Fermentação:</b> Coloque a massa em um recipiente levemente untado, cubra e deixe crescer em temperatura ambiente por 1-2 horas, ou até aumentar de volume em cerca de 50%.',
        step4: '<b>Dividir e Modelar:</b> Vire a massa em uma superfície levemente enfarinhada. Divida em {count} pedaços iguais. Modele cada pedaço em uma bola firme.',
        step5: '<b>Fermentação a Frio (Opcional):</b> Coloque as bolas de massa em um recipiente coberto ou em uma bandeja e refrigere por 1-3 dias para melhor sabor.',
        step6: '<b>Segunda Fermentação e Assar:</b> Retire a massa da geladeira 2-3 horas antes de assar. Deixe atingir a temperatura ambiente. Abra, cubra e asse em forno pré-aquecido.'
      },
      indirect: {
        preferment: {
          step1: '<b>Misturar Pré-fermento:</b> Em uma tigela pequena, misture a farinha, a água e o fermento do pré-fermento. Cubra e deixe fermentar em temperatura ambiente por 8-12 horas, ou até ficar borbulhante e ativo.',
          step2: '<b>Verificar Maturação:</b> O pré-fermento está pronto quando tiver formado uma cúpula e começado a afundar no centro. Deve ter um cheiro doce e levemente alcoólico.'
        },
        finalDough: {
          step1: '<b>Combinar:</b> Em uma tigela grande, combine a farinha e a água da massa final com o pré-fermento maturado. Misture até incorporar e deixe autolisar por 20-30 minutos.',
          step2: '<b>Sovar:</b> Adicione o sal, o fermento restante e o azeite. Sove por 8-12 minutos até a massa ficar forte e elástica.',
          step3: '<b>Primeira Fermentação e Modelar:</b> Fermente por 30-60 minutos em temperatura ambiente. Após esta curta fermentação, divida, modele e prossiga com a fermentação a frio como faria com uma massa direta.',
          step4: '<b>Segunda Fermentação e Assar:</b> Fermente e asse como faria com uma massa direta, lembrando que a fermentação pode ser um pouco mais rápida.'
        }
      },
       baguette: {
        step1: "<b>Autólise:</b> Combine farinha e água, misture até incorporar. Descanse por 30 minutos.",
        step2: "<b>Misturar:</b> Adicione sal e fermento, misture em velocidade baixa por 5 minutos. Aumente a velocidade e misture por mais 5-7 minutos até a massa ficar lisa.",
        step3: "<b>Primeira Fermentação:</b> Fermente por 2 horas com dobras a cada 45 minutos.",
        step4: "<b>Dividir e Pré-modelar:</b> Divida a massa em porções. Pré-modele gentilmente em toras. Descanse por 20-30 minutos.",
        step5: "<b>Modelar:</b> Modele na forma final de baguete.",
        step6: "<b>Segunda Fermentação:</b> Fermente em uma couche enfarinhada por 45-60 minutos.",
        step7: "<b>Assar:</b> Faça os cortes e asse a 245°C (475°F) com vapor por 20-25 minutos."
      },
      ciabatta: {
        step1: "<b>Misturar:</b> Combine todos os ingredientes. Misture em velocidade baixa até incorporar, depois em alta por 10-15 minutos até a massa ficar bem extensível.",
        step2: "<b>Primeira Fermentação:</b> Fermente por 3-4 horas em um recipiente untado, com dobras a cada hora.",
        step3: "<b>Dividir:</b> Vire a massa em uma superfície bem enfarinhada. Polvilhe o topo com farinha e divida em porções com uma espátula.",
        step4: "<b>Modelar:</b> Estique gentilmente cada pedaço em um retângulo. Não é necessária uma modelagem apertada.",
        step5: "<b>Segunda Fermentação:</b> Fermente em uma couche enfarinhada por 30-45 minutos.",
        step6: "<b>Assar:</b> Asse a 230°C (450°F) com vapor por 20-25 minutos."
      }
    },
    ingredients: {
      flour: 'Farinha',
      water: 'Água',
      salt: 'Sal',
      oil: 'Azeite',
      yeast: 'Fermento'
    },
    notes: {
      flour: "100% (Percentual do Padeiro)",
      water: "Hidratação",
      salt: "Percentual de Sal",
      oil: "Percentual de Gordura",
      yeast: "Calculado como IDY",
      preferment: "A ser adicionado na mistura final"
    }
  },
  units: {
    g: 'g',
    oz: 'oz',
    cups: 'xícaras',
    tbsp: 'cs',
    tsp: 'cc'
  },
  ads: {
    advertisement: 'Publicidade'
  },
  footer: {
    total_dough: 'Massa Total',
    save_recipe: 'Salvar Receita',
    saved_recipes: 'Receitas Salvas',
    upgrade_to_pro: 'Seja Pro'
  },
  load_modal: {
    title: 'Carregar uma Receita',
    close_aria: 'Fechar modal',
    no_configs: 'Você ainda não tem receitas salvas.',
    load: 'Carregar',
    delete_aria: 'Deletar receita'
  },
  pro: {
    go_pro_header: 'Seja Pro',
    locked_tooltip: 'Este é um recurso Pro. Clique para fazer o upgrade!'
  },
  paywall: {
    title: 'Desbloqueie o DoughLabPro',
    subtitle: 'Faça o upgrade para desbloquear todos os recursos e aperfeiçoar sua arte.',
    feature_save: 'Salvar e Carregar Receitas',
    feature_save_desc: 'Salve suas configurações favoritas para acesso com um clique.',
    feature_pro_recipes: 'Receitas e Técnicas Pro',
    feature_pro_recipes_desc: 'Acesse receitas de especialistas e guias de panificação avançados.',
    feature_ads: 'Experiência Sem Anúncios',
    feature_ads_desc: 'Desfrute de uma interface limpa e focada, sem interrupções.',
    feature_export: 'Exportar para PDF',
    feature_export_desc: 'Salve e imprima suas receitas para sua cozinha.',
    feature_scaling: 'Escala de Receitas',
    feature_scaling_desc: 'Aumente ou diminua facilmente qualquer receita.',
    cta_button: 'Fazer Upgrade para Pro (Vitalício)',
    cta_pass_button: 'Usar por 24h (Anúncio Simulado)',
    pass_cooldown_message: 'Próximo passe em {hours}h',
    restore_purchase: 'Ver planos e restaurar compra',
    success_title_pro: 'Você agora é Pro!',
    success_title_pass: 'Passe de 24h Ativado!',
    success_message: 'Todos os recursos estão desbloqueados. Boa panificação!'
  },
  pro_recipes: {
    modal_title: 'Receitas Pro',
    neapolitan_title: 'Napolitana Clássica',
    neapolitan_desc: 'Uma pizza tradicional, macia e dobrável com uma borda aerada. Perfeita para fornos de alta temperatura.',
    sourdough_title: 'Pão de Fermentação Natural Artesanal',
    sourdough_desc: 'Um pão clássico de alta hidratação com miolo aberto e sabor ácido.',
    focaccia_title: 'Focaccia de Alta Hidratação',
    focaccia_desc: 'Um pão chato, leve e aerado, perfeito para sanduíches ou como acompanhamento.',
    ny_style_title: 'Estilo Nova York',
    ny_style_desc: 'Uma fatia grande e dobrável com uma crosta crocante. Um clássico da Big Apple.',
    roman_desc: 'Pizza crocante, aerada e leve no estilo pala ou teglia.',
    detroit_desc: 'Uma pizza retangular com uma massa espessa, mastigável e bordas crocantes de queijo.',
    sicilian_desc: 'Uma pizza retangular, espessa e esponjosa, geralmente coberta com ervas.',
    chicago_desc: 'Uma pizza de prato fundo com uma crosta alta e camadas invertidas.',
    baguette_desc: 'Um pão francês clássico com uma crosta crocante e interior mastigável.',
    ciabatta_desc: 'Um pão branco italiano com hidratação muito alta e miolo aberto.',
    brioche_desc: 'Um pão rico com alto teor de manteiga e ovos.',
    rye_desc: 'Um pão denso e saboroso feito com farinha de centeio.'
  },
  plans_page: {
    title: 'Escolha Seu Plano',
    subtitle: 'Desbloqueie todo o potencial da sua panificação com o DoughLabPro.',
    feature: 'Recurso',
    free_tier: 'Grátis',
    pro_tier: 'Pro',
    feature_calculator: 'Calculadora de Massa Avançada',
    feature_styles: 'Vários Estilos de Pizza e Pão',
    feature_units: 'Gramas, Onças e Volume',
    feature_ads: 'Contém Anúncios',
    feature_save_load: 'Salvar e Carregar Receitas',
    feature_export: 'Exportar para PDF e Compartilhar',
    feature_scaling: 'Escala de Receitas',
    feature_pro_recipes: 'Receitas e Técnicas Exclusivas',
    upgrade_button: 'Fazer Upgrade para Pro'
  },
  tips_page: {
    title: 'Dicas e Técnicas Pro',
    subtitle: 'Domine os fundamentos para elevar sua panificação.',
    hydration_title: "Entendendo a Hidratação",
    hydration_p1: "A hidratação, expressa como porcentagem, é o peso da água em relação ao peso da farinha. Uma massa com 70% de hidratação tem 70g de água para cada 100g de farinha. Hidratação mais baixa (55-65%) é mais fácil de manusear e cria um miolo mais denso, típico da pizza estilo NY. Hidratação mais alta (70-85%+) cria um miolo mais leve e aberto com buracos maiores, perfeito para Ciabatta ou pizza Romana, mas requer mais habilidade para gerenciar.",
    hydration_p2: "Ao experimentar, aumente a hidratação em pequenos incrementos de 2-3%. O tipo de farinha importa muito; farinhas integrais e de alta proteína podem absorver mais água do que a farinha de trigo comum.",
    fermentation_title: "Dominando a Fermentação",
    fermentation_p1: "A fermentação é onde o sabor se desenvolve. É um equilíbrio de tempo e temperatura. Uma fermentação mais longa e fria (por exemplo, 24-72 horas na geladeira) retarda a atividade do fermento, permitindo que sabores complexos se desenvolvam sem super-fermentar a massa. Isso é fundamental para pães artesanais e pizza Napolitana.",
    fermentation_p2: "Para um resultado mais rápido, você pode fermentar em temperatura ambiente, mas o sabor será menos complexo. Observe a massa, não o relógio. Ela está pronta para o próximo passo quando está aerada, leve e aumentou de volume em cerca de 50-100%, dependendo da receita.",
    salt_title: "O Papel do Sal",
    salt_p1: "O sal não é apenas para sabor; é crucial para a estrutura da massa. Ele fortalece a rede de glúten, adicionando força e elasticidade à sua massa. Ele também regula a atividade do fermento, impedindo que fermente muito rápido. Uma porcentagem de sal típica para pizza e pão é entre 1.8% e 3%. Sem sal suficiente, sua massa ficará frouxa, pegajosa e com sabor insosso."
  },
  auth: {
    sign_in: 'Entrar',
    sign_out: 'Sair',
    view_profile: 'Ver Perfil',
    modal_title: 'Bem-vindo de volta!',
    modal_subtitle: 'Faça login para acessar seu perfil e receitas salvas.',
    google_button: 'Entrar com o Google',
    or_continue_with: 'Ou continue com',
    email_label: 'Endereço de Email',
    password_label: 'Senha',
    login_button: 'Login'
  },
  profile: {
    title: 'Meu Perfil',
    name: 'Nome',
    email: 'Email',
    membership_status: 'Status da Assinatura',
    membership_free: 'Membro Gratuito',
    membership_pro: 'Membro Pro'
  }
};

const es: Record<string, any> = {
  header: {
    user_profile_tooltip: 'Perfil de Usuario',
    switch_to_dark: 'Cambiar a tema oscuro',
    switch_to_light: 'Cambiar a tema claro',
    go_pro: 'Hazte Pro',
    pro_member: 'Miembro Pro',
  },
  form: {
    bake_type: 'Tipo de Masa',
    pizzas: 'Pizza',
    breads: 'Pan',
    recipe_style: 'Estilo de Receta',
    neapolitan: 'Napolitana',
    ny_style: 'Estilo NY',
    roman: 'Romana',
    detroit: 'Detroit',
    sicilian: 'Siciliana',
    chicago: 'Chicago',
    sourdough: 'Masa Madre',
    baguette: 'Baguette',
    ciabatta: 'Ciabatta',
    focaccia: 'Focaccia',
    brioche: 'Brioche',
    rye: 'Centeno',
    core_parameters: 'Parámetros Principales',
    num_pizzas: 'Número de Pizzas',
    num_loaves: 'Número de Panes',
    num_units_note: '1-100 unidades',
    weight_per_pizza: 'Peso por Pizza',
    weight_per_loaf: 'Peso por Pan',
    weight_per_unit_note: 'Típicamente {style} pesa {range}',
    hydration: 'Hidratación',
    hydration_tooltip:
      'La proporción de agua a harina por peso. Una mayor hidratación resulta en una miga más ligera y abierta, pero puede ser más difícil de manejar.',
    scale: 'Escalar Receta',
    scale_tooltip:
      'Multiplica tu receta completa. Útil para probar un lote pequeño o escalar para una fiesta.',
    fermentation: 'Fermentación',
    direct: 'Directo',
    poolish: 'Poolish',
    biga: 'Biga',
    preferment_flour: 'Harina en Prefermento',
    preferment_flour_tooltip:
      'El porcentaje de la harina total a utilizar en el prefermento. Los rangos comunes son 20-50%.',
    yeast_type: 'Tipo de Levadura/Masa Madre',
    yeast_type_tooltip:
      'IDY es el estándar. ADY necesita activación. El porcentaje de masa madre se basa en el peso total de la harina (como levain).',
    yeast: 'Levadura',
    yeast_tooltip:
      'Porcentaje de Levadura Seca Instantánea (IDY) en relación con la harina. Otros tipos de levadura se convierten automáticamente.',
    yeast_idy: 'Levadura Seca Instantánea (IDY)',
    yeast_ady: 'Levadura Seca Activa (ADY)',
    yeast_fresh: 'Levadura Fresca',
    yeast_sourdough: 'Masa Madre',
    settings: 'Ajustes y Preferencias',
    unit_system: 'Sistema de Unidades',
    unit_system_tooltip:
      'El sistema US Customary usa una taza de ~237ml. El sistema Métrico usa una taza de 250ml. Esto afecta a todas las conversiones volumétricas.',
    us_customary: 'US Customary',
    metric: 'Métrico',
    recipe_notes: 'Notas de la Receta',
    notes_placeholder: 'Añade notas sobre tu proceso, tiempos, resultados, etc.',
    reset: 'Restablecer a Predeterminados',
    reset_aria: 'Restablecer todos los campos del formulario a sus valores predeterminados',
    prompt_config_name: 'Introduce un nombre para esta receta:',
    errors: {
      num_pizzas_range: 'Por favor, introduce un valor entre 1 y 100.',
      dough_ball_weight_range: 'Por favor, introduce un valor entre 100 y 2000.',
    },
  },
  results: {
    title: 'Tu Receta',
    share_recipe_aria: 'Compartir Receta',
    export_pdf_aria: 'Exportar como PDF',
    grams: 'Gramos',
    ounces: 'Onzas',
    cups: 'Tazas',
    unit_system_display: 'Usando tazas {system}',
    conversion_tooltip:
      '1 taza de {ingredient} es aprox. {grams}g en el sistema {system}. Fuente: King Arthur Baking.',
    flour: 'Harina',
    water: 'Agua',
    salt: 'Sal',
    oil: 'Aceite',
    yeast: 'Levadura',
    total_dough: 'Peso Total de la Masa',
    preferment_title: 'Prefermento {technique}',
    final_dough_title: 'Masa Final',
    preferment_label: '{technique}',
    notes_title: 'Tus Notas',
    summary_pizza:
      'Rinde <span class="font-bold text-lime-600 dark:text-lime-400">{count}</span> pizzas de <span class="font-bold text-lime-600 dark:text-lime-400">{weight}</span>g cada una.',
    summary_bread:
      'Rinde <span class="font-bold text-lime-600 dark:text-lime-400">{count}</span> panes de <span class="font-bold text-lime-600 dark:text-lime-400">{weight}</span>g cada uno.',
     steps: {
      title: 'Método',
      direct: {
        step1: '<b>Combinar:</b> En un tazón grande, mezcla la harina y el agua hasta que no queden partes secas. Cubre y deja reposar (autólisis) durante 20-30 minutos.',
        step2: '<b>Amasar:</b> Añade la sal, la levadura y el aceite. Amasa durante 8-12 minutos en una batidora de pie, o 15-20 minutos a mano, hasta que la masa esté suave y pase la prueba de la ventana.',
        step3: '<b>Fermentación en Bloque:</b> Coloca la masa en un recipiente ligeramente aceitado, cúbrela y déjala levar a temperatura ambiente durante 1-2 horas, o hasta que haya aumentado su volumen en un 50%.',
        step4: '<b>Dividir y Formar:</b> Saca la masa sobre una superficie ligeramente enharinada. Divídela en {count} piezas iguales. Forma cada pieza en una bola apretada.',
        step5: '<b>Fermentación en Frío (Opcional):</b> Coloca las bolas de masa en un recipiente cubierto o en una bandeja y refrigéralas durante 1-3 días para mejorar el sabor.',
        step6: '<b>Prueba Final y Horneado:</b> Saca la masa del refrigerador 2-3 horas antes de hornear. Deja que alcance la temperatura ambiente. Estira, añade los ingredientes y hornea en un horno precalentado.'
      },
      indirect: {
        preferment: {
          step1: '<b>Mezclar Prefermento:</b> En un tazón pequeño, mezcla la harina, el agua y la levadura del prefermento. Cúbrelo y déjalo fermentar a temperatura ambiente durante 8-12 horas, o hasta que esté burbujeante y activo.',
          step2: '<b>Comprobar Madurez:</b> El prefermento está listo cuando ha formado una cúpula y acaba de empezar a hundirse en el centro. Debe oler dulce y ligeramente alcohólico.'
        },
        finalDough: {
          step1: '<b>Combinar:</b> En un tazón grande, combina la harina y el agua de la masa final con el prefermento maduro. Mezcla hasta que se combinen y deja en autólisis durante 20-30 minutos.',
          step2: '<b>Amasar:</b> Añade la sal, la levadura restante y el aceite. Amasa durante 8-12 minutos hasta que la masa esté fuerte y elástica.',
          step3: '<b>Fermentación en Bloque y Formado:</b> Fermenta durante 30-60 minutos a temperatura ambiente. Después de esta corta fermentación, divide, forma y procede con la fermentación en frío como lo harías con una masa directa.',
          step4: '<b>Prueba Final y Horneado:</b> Prueba y hornea como lo harías con una masa directa, teniendo en cuenta que la fermentación puede ser un poco más rápida.'
        }
      },
       baguette: {
        step1: "<b>Autólisis:</b> Combina harina y agua, mezcla hasta que se incorporen. Reposa 30 minutos.",
        step2: "<b>Mezclado:</b> Añade sal y levadura, mezcla a baja velocidad por 5 minutos. Aumenta la velocidad y mezcla por otros 5-7 minutos hasta que la masa esté suave.",
        step3: "<b>Fermentación en Bloque:</b> Fermenta por 2 horas con pliegues cada 45 minutos.",
        step4: "<b>Dividir y Preformar:</b> Divide la masa en porciones. Preforma suavemente en troncos. Reposa 20-30 minutos.",
        step5: "<b>Formado:</b> Forma las baguettes finales.",
        step6: "<b>Prueba Final:</b> Prueba sobre una tela enharinada (couche) por 45-60 minutos.",
        step7: "<b>Horneado:</b> Marca y hornea a 245°C (475°F) con vapor por 20-25 minutos."
      },
      ciabatta: {
        step1: "<b>Mezclado:</b> Combina todos los ingredientes. Mezcla a baja velocidad hasta que se combinen, luego a alta velocidad por 10-15 minutos hasta que la masa sea muy extensible.",
        step2: "<b>Fermentación en Bloque:</b> Fermenta por 3-4 horas en un recipiente aceitado, con pliegues cada hora.",
        step3: "<b>Dividir:</b> Vuelca la masa sobre una superficie bien enharinada. Espolvorea la parte superior con harina y divide en porciones con una rasqueta.",
        step4: "<b>Formado:</b> Estira suavemente cada pieza en un rectángulo. No se necesita un formado apretado.",
        step5: "<b>Prueba Final:</b> Prueba sobre una tela enharinada por 30-45 minutos.",
        step6: "<b>Horneado:</b> Hornea a 230°C (450°F) con vapor por 20-25 minutos."
      }
    },
    ingredients: {
      flour: 'Harina',
      water: 'Agua',
      salt: 'Sal',
      oil: 'Aceite',
      yeast: 'Levadura'
    },
    notes: {
      flour: "100% (Porcentaje de Panadero)",
      water: "Hidratación",
      salt: "Porcentaje de Sal",
      oil: "Porcentaje de Grasa",
      yeast: "Calculado como IDY",
      preferment: "Para añadir en la mezcla final"
    }
  },
  units: {
    g: 'g',
    oz: 'oz',
    cups: 'tazas',
    tbsp: 'cs',
    tsp: 'cc'
  },
  ads: {
    advertisement: 'Publicidad'
  },
  footer: {
    total_dough: 'Masa Total',
    save_recipe: 'Guardar Receta',
    saved_recipes: 'Recetas Guardadas',
    upgrade_to_pro: 'Hazte Pro'
  },
  load_modal: {
    title: 'Cargar una Receta',
    close_aria: 'Cerrar modal',
    no_configs: 'Aún no tienes recetas guardadas.',
    load: 'Cargar',
    delete_aria: 'Eliminar receta'
  },
  pro: {
    go_pro_header: 'Hazte Pro',
    locked_tooltip: 'Esta es una función Pro. ¡Haz clic para mejorar!'
  },
  paywall: {
    title: 'Desbloquea DoughLabPro',
    subtitle: 'Mejora para desbloquear todas las funciones y perfeccionar tu arte.',
    feature_save: 'Guardar y Cargar Recetas',
    feature_save_desc: 'Guarda tus configuraciones favoritas para acceder con un clic.',
    feature_pro_recipes: 'Recetas y Técnicas Pro',
    feature_pro_recipes_desc: 'Accede a recetas de expertos y guías de horneado avanzadas.',
    feature_ads: 'Experiencia Sin Anuncios',
    feature_ads_desc: 'Disfruta de una interfaz limpia y enfocada, sin interrupciones.',
    feature_export: 'Exportar a PDF',
    feature_export_desc: 'Guarda e imprime tus recetas para tu cocina.',
    feature_scaling: 'Escalado de Recetas',
    feature_scaling_desc: 'Aumenta o disminuye fácilmente cualquier receta.',
    cta_button: 'Mejorar a Pro (Vitalicio)',
    cta_pass_button: 'Usar por 24h (Anuncio Simulado)',
    pass_cooldown_message: 'Próximo pase en {hours}h',
    restore_purchase: 'Ver planes y restaurar compra',
    success_title_pro: '¡Ahora eres Pro!',
    success_title_pass: '¡Pase de 24h Activado!',
    success_message: 'Todas las funciones están desbloqueadas. ¡Feliz horneado!'
  },
  pro_recipes: {
    modal_title: 'Recetas Pro',
    neapolitan_title: 'Napolitana Clásica',
    neapolitan_desc: 'Una pizza tradicional, suave y plegable con un borde inflado. Perfecta para hornos de alta temperatura.',
    sourdough_title: 'Pan de Masa Madre Artesanal',
    sourdough_desc: 'Un pan clásico de alta hidratación con una miga abierta y sabor ácido.',
    focaccia_title: 'Focaccia de Alta Hidratación',
    focaccia_desc: 'Un pan plano, ligero y aireado, perfecto para sándwiches o como acompañamiento.',
    ny_style_title: 'Estilo Nueva York',
    ny_style_desc: 'Una porción grande y plegable con una corteza crujiente. Un clásico de la Gran Manzana.',
    roman_desc: 'Pizza crujiente, aireada y ligera al estilo pala o teglia.',
    detroit_desc: 'Una pizza rectangular con una masa gruesa y masticable y bordes crujientes de queso.',
    sicilian_desc: 'Una pizza rectangular, gruesa y esponjosa, a menudo cubierta con hierbas.',
    chicago_desc: 'Una pizza de plato hondo con una corteza alta y capas invertidas.',
    baguette_desc: 'Un pan francés clásico con una corteza crujiente e interior masticable.',
    ciabatta_desc: 'Un pan blanco italiano con una hidratación muy alta y miga abierta.',
    brioche_desc: 'Un pan rico con un alto contenido de mantequilla y huevo.',
    rye_desc: 'Un pan denso y sabroso hecho con harina de centeno.'
  },
  plans_page: {
    title: 'Elige Tu Plan',
    subtitle: 'Desbloquea todo el potencial de tu horneado con DoughLabPro.',
    feature: 'Característica',
    free_tier: 'Gratis',
    pro_tier: 'Pro',
    feature_calculator: 'Calculadora de Masa Avanzada',
    feature_styles: 'Múltiples Estilos de Pizza y Pan',
    feature_units: 'Gramos, Onzas y Volumen',
    feature_ads: 'Contiene Anuncios',
    feature_save_load: 'Guardar y Cargar Recetas',
    feature_export: 'Exportar a PDF y Compartir',
    feature_scaling: 'Escalado de Recetas',
    feature_pro_recipes: 'Recetas y Técnicas Exclusivas',
    upgrade_button: 'Mejorar a Pro'
  },
  tips_page: {
    title: 'Consejos y Técnicas Pro',
    subtitle: 'Domina los fundamentos para elevar tu horneado.',
    hydration_title: "Entendiendo la Hidratación",
    hydration_p1: "La hidratación, expresada como porcentaje, es el peso del agua en relación con el peso de la harina. Una masa con 70% de hidratación tiene 70g de agua por cada 100g de harina. Una hidratación más baja (55-65%) es más fácil de manejar y crea una miga más densa, típica de la pizza estilo NY. Una hidratación más alta (70-85%+) crea una miga más ligera y abierta con agujeros más grandes, perfecta para Ciabatta o pizza Romana, pero requiere más habilidad para manejarla.",
    hydration_p2: "Cuando experimentes, aumenta la hidratación en pequeños incrementos del 2-3%. El tipo de harina importa mucho; las harinas integrales y de alta proteína pueden absorber más agua que la harina de trigo común.",
    fermentation_title: "Dominando la Fermentación",
    fermentation_p1: "La fermentación es donde se desarrolla el sabor. Es un equilibrio de tiempo y temperatura. Una fermentación más larga y fría (por ejemplo, 24-72 horas en el refrigerador) ralentiza la actividad de la levadura, permitiendo que se desarrollen sabores complejos sin sobrefermentar la masa. Esto es clave para el pan artesanal y la pizza Napolitana.",
    fermentation_p2: "Para un resultado más rápido, puedes fermentar a temperatura ambiente, pero el sabor será menos complejo. Vigila la masa, no el reloj. Está lista para el siguiente paso cuando está aireada, ligera y ha aumentado su volumen en un 50-100%, dependiendo de la receta.",
    salt_title: "El Papel de la Sal",
    salt_p1: "La sal no es solo para dar sabor; es crucial para la estructura de la masa. Refuerza la red de gluten, añadiendo fuerza y elasticidad a tu masa. También regula la actividad de la levadura, evitando que fermente demasiado rápido. Un porcentaje de sal típico para pizza y pan está entre el 1.8% y el 3%. Sin suficiente sal, tu masa estará floja, pegajosa y tendrá un sabor plano."
  },
   auth: {
    sign_in: 'Iniciar Sesión',
    sign_out: 'Cerrar Sesión',
    view_profile: 'Ver Perfil',
    modal_title: '¡Bienvenido de nuevo!',
    modal_subtitle: 'Inicia sesión para acceder a tu perfil y recetas guardadas.',
    google_button: 'Iniciar sesión con Google',
    or_continue_with: 'O continuar con',
    email_label: 'Dirección de Correo Electrónico',
    password_label: 'Contraseña',
    login_button: 'Iniciar Sesión',
  },
  profile: {
    title: 'Mi Perfil',
    name: 'Nombre',
    email: 'Correo Electrónico',
    membership_status: 'Estado de la Membresía',
    membership_free: 'Miembro Gratuito',
    membership_pro: 'Miembro Pro',
  }
};


const translations: Record<Locale, Record<string, any>> = {
  en,
  pt,
  es,
};


const getTranslation = (
  locale: Locale,
  key: string,
  replacements?: { [key: string]: string | number },
): string => {
  // Traverse the nested object to find the translation
  const translatedText = key.split('.').reduce((obj: any, k: string) => {
    return obj && obj[k] !== undefined ? obj[k] : null;
  }, translations[locale]);

  let text = (typeof translatedText === 'string' ? translatedText : key);

  if (replacements && typeof text === 'string') {
    Object.entries(replacements).forEach(([rKey, value]) => {
      text = text.replace(
        new RegExp(`{${rKey}}`, 'g'),
        String(value),
      );
    });
  }

  return text;
};

interface I18nContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: string, replacements?: { [key: string]: string | number }) => string;
}

const I18nContext = createContext<I18nContextType | undefined>(undefined);

export const I18nProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [locale, setLocaleState] = useState<Locale>('en');

  useEffect(() => {
    try {
      const storedLocale = localStorage.getItem('dough-lab-locale') as Locale;
      if (storedLocale && ['en', 'pt', 'es'].includes(storedLocale)) {
        setLocaleState(storedLocale);
      }
    } catch {
      // ignore
    }
  }, []);

  const setLocale = useCallback((newLocale: Locale) => {
    setLocaleState(newLocale);
    try {
      localStorage.setItem('dough-lab-locale', newLocale);
    } catch {
      // ignore
    }
  }, []);

  const t = useCallback(
    (key: string, replacements?: { [key: string]: string | number }) =>
      getTranslation(locale, key, replacements),
    [locale],
  );

  const value = { locale, setLocale, t };

  return React.createElement(I18nContext.Provider, { value }, children);
};

export const useTranslation = (): I18nContextType => {
  const context = useContext(I18nContext);
  if (context === undefined) {
    throw new Error('useTranslation must be used within an I18nProvider');
  }
  return context;
};