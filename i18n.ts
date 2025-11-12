import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
  FC,
  useCallback,
  useEffect,
} from 'react';
import { Locale } from './types';

/**
 * @file i18n.ts
 * @description Internationalization (i18n) setup for the DoughLabPro application.
 *
 * @strategy
 * This file implements a simple, yet powerful i18n system using React Context.
 * 1.  **Translations Store**: All UI text strings (translations) for supported languages are stored here in nested objects. This makes them easy to manage and access.
 * 2.  **Provider**: The `I18nProvider` component wraps the entire application, making the translation logic available everywhere.
 * 3.  **Hook**: The `useTranslation` hook provides components with access to the current language (`locale`) and the translation function (`t`).
 * 4.  **Language Detection**: It automatically detects the user's browser language on the first visit to set an appropriate default.
 * 5.  **Dynamic Replacements**: The `t` function supports dynamic values in translation strings (e.g., "Hello, {name}!").
 *
 * @cloning_notes
 * To clone this system, you only need to:
 * - Add or modify the translation objects (`en`, `pt`, `es`) for your texts.
 * - Ensure the `I18nProvider` wraps your root component (`App`).
 * - Use the `useTranslation()` hook in any component that needs text.
 */

// --- TRANSLATION OBJECTS ---
// Each language has its own object. The structure is hierarchical, mirroring the component
// structure of the app (e.g., `form`, `results`, `header`). This keeps translations organized.
// The `en` object serves as the primary and fallback language.

// English Translations (Nested Structure)
const en = {
  form: {
    yeast_idy: 'Instant Dry Yeast',
    yeast_ady: 'Active Dry Yeast',
    yeast_fresh: 'Fresh Yeast',
    yeast_sourdough: 'Sourdough Starter',
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
    bake_type: 'Bake Type',
    pizzas: 'Pizzas',
    breads: 'Breads',
    recipe_style: 'Recipe Style',
    core_parameters: 'Core Parameters',
    num_pizzas: 'Number of Pizzas',
    num_loaves: 'Number of Loaves',
    num_units_note: 'Total dough balls or loaves.',
    weight_per_pizza: 'Weight per Pizza (g)',
    weight_per_loaf: 'Weight per Loaf (g)',
    weight_per_unit_note: 'Typical for {style}: {range}.',
    hydration: 'Hydration',
    hydration_tooltip:
      "The ratio of water to flour by weight. Higher hydration leads to a stickier, more open crumb.",
    scale: 'Scale Recipe',
    scale_tooltip:
      'Increase or decrease the total recipe size. Useful for making a test batch or a larger quantity.',
    fermentation: 'Fermentation',
    direct: 'Direct',
    poolish: 'Poolish',
    biga: 'Biga',
    sourdough_as_preferment: 'Sourdough starter acts as the preferment.',
    preferment_flour: 'Preferment Flour',
    preferment_flour_tooltip:
      'The percentage of the total flour that will be used in the preferment (poolish or biga).',
    yeast_type: 'Yeast Type',
    yeast_type_tooltip:
      'Different yeast types have different potencies. Sourdough is your starter/levain percentage.',
    yeast: 'Yeast',
    yeast_tooltip:
      'The percentage of yeast relative to the total flour. For sourdough, this is your levain percentage.',
    settings: 'Settings & Preferences',
    unit_system_tooltip:
      'Choose between Metric (grams) and US Customary (ounces, cups) for ingredient display.',
    unit_system: 'Unit System',
    us_customary: 'US Customary',
    metric: 'Metric',
    recipe_notes: 'Recipe Notes',
    notes_placeholder:
      'Add your personal notes, fermentation times, temperatures, etc. here...',
    reset_aria: 'Reset all form values to default',
    reset: 'Reset to Defaults',
    prompt_config_name: 'Enter a name for this recipe:',
    errors: {
      range: 'Value must be between {min} and {max}.',
      range_percent: 'Value must be between {min}% and {max}%.',
      range_multiplier: 'Value must be between {min}x and {max}x.',
    },
  },
  results: {
    title: 'Your Recipe',
    grams: 'Grams',
    ounces: 'Ounces',
    cups: 'Volume',
    unit_system_display: 'Using {system} Densities',
    preferment_title: '{technique} Preferment',
    sourdough_starter_title: 'Sourdough Starter (Levain)',
    final_dough_title: 'Final Dough',
    flour: 'Flour',
    water: 'Water',
    salt: 'Salt',
    oil: 'Oil',
    yeast: 'Yeast',
    total_dough: 'Total Dough Weight',
    summary_pizza: 'Makes {count} pizzas at {weight}g each.',
    summary_bread: 'Makes {count} loaves at {weight}g each.',
    notes_title: 'Your Notes',
    share_recipe_aria: 'Share this recipe',
    export_pdf_aria: 'Export recipe as PDF',
    exporting_pdf_aria: 'Generating PDF, please wait...',
    preferment_label: 'Add {technique}',
    conversion_tooltip:
      'Volume conversion assumes {grams}g per cup for {ingredient} ({system}).',
    notes: {
      flour: "100% | Baker's Percentage",
      water: 'High-hydration',
      salt: 'Fine sea salt recommended',
      oil: 'Olive oil or neutral oil',
      yeast: 'Adjust based on temperature',
      preferment: 'Mix and ferment separately',
      starter: '100% hydration starter',
    },
    ingredients: {
      flour: 'flour',
      water: 'water',
      salt: 'salt',
      oil: 'oil',
      yeast: 'yeast',
    },
    errors: {
      title: 'Invalid Parameters',
      message: 'Please correct the errors in the form to see your recipe.',
    },
    steps: {
        title: 'Instructions',
        direct: {
            step1: '<strong>Combine:</strong> In a large bowl, whisk together the flour, salt, and yeast.',
            step2: '<strong>Mix:</strong> Add water and oil. Mix until a shaggy dough forms and no dry flour remains.',
            step3: '<strong>Knead:</strong> Knead on a lightly floured surface for 8-10 minutes until the dough is smooth and elastic.',
            step4: '<strong>Bulk Ferment:</strong> Place in a lightly oiled bowl, cover, and let rise for 1-2 hours or until doubled in size.',
            step5: '<strong>Divide & Shape:</strong> Divide the dough into balls, shape them, and place them in proofing containers or on a tray.',
            step6: '<strong>Final Proof:</strong> Let it rest for another 30-60 minutes at room temperature, or for 1-3 days in the refrigerator for better flavor.',
        },
        indirect: {
            preferment: {
                step1: '<strong>Mix Preferment:</strong> The night before, mix the preferment ingredients (flour, water, tiny bit of yeast) until just combined.',
                step2: '<strong>Ferment Preferment:</strong> Cover and let it ferment at room temperature for 12-16 hours until bubbly and active.',
            },
            finalDough: {
                step1: '<strong>Combine:</strong> In a large bowl, combine the final dough flour and salt. Add the active preferment, the rest of the water, oil, and yeast.',
                step2: '<strong>Mix & Knead:</strong> Mix to form a shaggy dough, then knead for 8-10 minutes until smooth and elastic.',
                step3: '<strong>Bulk Ferment:</strong> Let it rise for about 1 hour, or until it has increased in volume by about 50%.',
                step4: '<strong>Divide & Final Proof:</strong> Divide, shape, and let it proof for another 1-2 hours at room temp, or move to the fridge for a long cold proof.',
            },
        },
        baguette: {
            step1: '<strong>Autolyse:</strong> Mix flour and water until just combined. Let it rest for 30 minutes.',
            step2: '<strong>Mix:</strong> Add salt and yeast. Mix on low speed for 5 minutes, then medium for 5-7 minutes until dough is smooth.',
            step3: '<strong>Bulk Ferment:</strong> Ferment for 2-3 hours at room temp, with 3-4 sets of folds every 30 minutes.',
            step4: '<strong>Divide & Preshape:</strong> Divide dough, gently preshape into logs. Rest for 20-30 minutes.',
            step5: '<strong>Final Shape:</strong> Shape into baguettes and place on a floured couche, seam-side up.',
            step6: '<strong>Proof:</strong> Proof for 45-60 minutes at room temperature, or overnight in the fridge.',
            step7: '<strong>Bake:</strong> Score the loaves. Bake at 240°C (475°F) with steam for 15 minutes, then without steam for 15-20 minutes until golden brown.',
        },
        ciabatta: {
            step1: '<strong>Mix:</strong> Combine all final dough ingredients with the preferment. Mix until a very wet, shaggy dough forms.',
            step2: '<strong>Bulk Ferment:</strong> Ferment for 3-4 hours, performing a set of folds every 45 minutes. The dough will be very sticky.',
            step3: '<strong>Divide:</strong> Generously flour your work surface. Gently pour the dough out and divide into desired shapes.',
            step4: '<strong>Proof:</strong> Gently transfer loaves to a floured couche or parchment paper. Proof for 30-45 minutes.',
            step5: '<strong>Bake:</strong> Bake at 230°C (450°F) with steam for 10-15 minutes, then without for another 15-20 minutes.',
            step6: '<strong>Cool:</strong> Let it cool completely before slicing to preserve the open crumb structure.',
        }
    }
  },
  units: {
    g: 'g',
    oz: 'oz',
    cups: 'cups',
    tbsp: 'tbsp',
    tsp: 'tsp',
  },
  header: {
    tips: 'Tips',
    switch_to_dark: 'Switch to dark mode',
    switch_to_light: 'Switch to light mode',
    user_profile_tooltip: 'User profile',
    go_pro: 'Go Pro',
  },
  footer: {
    total_dough: 'Total Dough',
    saved_recipes: 'Load saved recipes',
    save_recipe: 'Save current recipe',
    upgrade_to_pro: 'Upgrade to Pro',
  },
  load_modal: {
    title: 'Load Saved Recipe',
    close_aria: 'Close modal',
    load: 'Load',
    delete_aria: 'Delete recipe',
    no_configs: 'You have no saved recipes yet.',
  },
  ads: {
    advertisement: 'Advertisement',
  },
  pro: {
    locked_tooltip: 'This is a Pro feature. Click to learn more.',
    go_pro_header: 'Go Pro',
    feature_ads: 'With ads',
  },
  paywall: {
    title: 'Unlock DoughLab Pro',
    subtitle: 'Take your baking to the next level with powerful features.',
    feature_save: 'Save & Load Recipes',
    feature_save_desc:
      'Never lose a great recipe again. Save your configurations for one-click access.',
    feature_pro_recipes: 'Pro Recipes & Guides',
    feature_pro_recipes_desc:
      'Access a curated list of expert recipes and in-depth technique guides.',
    feature_ads: 'Ad-Free Experience',
    feature_ads_desc:
      'Enjoy a clean, focused interface without any interruptions.',
    cta_button: 'Upgrade to Pro (Demo)',
    cta_pass_button: 'Try for 24 hours (Demo)',
    pass_cooldown_message: 'Pass available in {hours}h',
    restore_purchase: 'View Plans & Pricing',
    success_title_pro: 'Pro Access Granted!',
    success_title_pass: '24h Pass Activated!',
    success_message:
      'You can now enjoy all Pro features. Happy baking!',
  },
  pro_recipes: {
    modal_title: 'Pro Recipes',
    neapolitan_title: 'Classic Neapolitan',
    sourdough_title: 'Artisan Sourdough Loaf',
    focaccia_title: 'High-Hydration Focaccia',
    ny_style_title: 'NY Style Pizza',
    neapolitan_desc: 'Classic Neapolitan pizza with a soft, chewy crust.',
    sourdough_desc:
      'A classic sourdough loaf with an open crumb and tangy flavor.',
    focaccia_desc:
      'A light, airy focaccia with a crispy crust, perfect for dimpling with olive oil and herbs.',
    ny_style_desc:
      'The iconic large, foldable slice with a crisp crust.',
    roman_desc:
      'Pizza "al taglio" (by the slice) with a very light, airy crust.',
    detroit_desc:
      'A rectangular pizza with a thick, crispy, cheesy crust.',
    sicilian_desc:
      'A thick, spongy rectangular pizza, often topped with breadcrumbs.',
    chicago_desc:
      'Deep-dish pizza with a tall crust, filled with cheese and chunky tomato sauce.',
    baguette_desc:
      'A classic French bread with a crisp crust and chewy interior.',
    ciabatta_desc:
      'An Italian white bread with a very high hydration, known for its holes.',
    brioche_desc:
      'A rich bread with a high egg and butter content, giving it a tender crumb.',
    rye_desc:
      'A dense, flavorful bread made with flour from rye grain.',
  },
  plans_page: {
    title: 'Choose Your Plan',
    subtitle:
      'Unlock powerful features and support the development of DoughLab.',
    feature: 'Feature',
    free_tier: 'Free',
    pro_tier: 'Pro',
    feature_calculator: 'Core Dough Calculator',
    feature_styles: 'Pizza & Bread Styles',
    feature_units: 'Metric & US Units',
    feature_save_load: 'Save & Load Recipes',
    feature_export: 'Export to PDF',
    feature_scaling: 'Recipe Scaling',
    feature_pro_recipes: 'Pro Recipes & Tips',
    upgrade_button: 'Upgrade to Pro',
  },
  tips_page: {
    title: 'Pro Tips & Techniques',
    subtitle: 'Master the art of dough with these expert guides and recipes.',
    pro_recipes_title: 'Expert Recipes',
    load_recipe_button: 'Load Recipe',
    hydration_title: 'Understanding Hydration',
    hydration_p1:
      "Hydration is simply the percentage of water relative to the amount of flour in your dough. It's a critical factor that influences the dough's consistency, handling, and the final texture of your crust.",
    hydration_p2:
      'Lower hydration (55-65%) results in a stiffer, easier-to-handle dough, often found in styles like NY or Chicago deep-dish. Higher hydration (70%+) creates a stickier, more extensible dough, leading to a lighter, airier crumb with larger holes, typical for Roman-style pizza or ciabatta.',
    fermentation_title: 'The Magic of Fermentation',
    fermentation_p1:
      "Fermentation is where yeast consumes sugars and produces carbon dioxide and alcohol. This process is what makes your dough rise, but more importantly, it develops complex flavors and improves the dough's structure and digestibility.",
    fermentation_p2:
      "Time and temperature are your main controls. A long, cold ferment (e.g., 24-72 hours in the fridge) slows down yeast activity while allowing enzymes to break down starches and proteins, resulting in a much more flavorful and tender final product. A short, warm ferment will be faster but less complex in flavor.",
    salt_title: 'The Role of Salt',
    salt_p1:
      'Salt is more than just for flavor! It plays a crucial role in controlling yeast activity, preventing the dough from over-fermenting. It also strengthens the gluten network, making the dough less sticky and more elastic, which helps it hold its shape and trap gas during fermentation. Typically, salt is used at 2-3% of the flour weight.',
    pronunciation_title: 'Pronunciation Guide',
    pronunciation_subtitle:
      'Hear the correct pronunciation for common baking terms.',
    pronounce_button_aria: 'Pronounce {term}',
  },
  auth: {
    sign_in: 'Sign In',
    view_profile: 'View Profile',
    sign_out: 'Sign Out',
    modal_title: 'Sign In / Sign Up',
    modal_subtitle: 'Continue with your social account to get started.',
    continue_with_google: 'Continue with Google',
    terms_notice: 'By continuing, you agree to our Terms of Service.',
  },
  profile: {
    not_logged_in: 'You are not logged in.',
    settings_title: 'Account Settings',
    settings_desc: 'Manage your account settings here.',
    name: 'Full Name',
    email: 'Email Address',
    birthDate: 'Date of Birth',
    gender: 'Gender',
    membership: 'Membership Status',
    free_member: 'Free Member',
    pro_member: 'Pro Member',
    edit_profile: 'Edit Profile',
    save_changes: 'Save Changes',
    cancel: 'Cancel',
    genders: {
      male: 'Male',
      female: 'Female',
      other: 'Other',
      prefer_not_to_say: 'Prefer not to say',
    },
  },
};

// Portuguese Translations
const pt = {
  form: {
    yeast_idy: 'Fermento Biológico Seco Instantâneo',
    yeast_ady: 'Fermento Biológico Seco Ativo',
    yeast_fresh: 'Fermento Fresco',
    yeast_sourdough: 'Levain (Massa Madre)',
    neapolitan: 'Napolitana',
    ny_style: 'NY Style',
    roman: 'Romana',
    detroit: 'Detroit',
    sicilian: 'Siciliana',
    chicago: 'Chicago',
    sourdough: 'Pão de Fermentação Natural',
    baguette: 'Baguete',
    ciabatta: 'Ciabatta',
    focaccia: 'Focaccia',
    brioche: 'Brioche',
    rye: 'Pão de Centeio',
    bake_type: 'Tipo de Massa',
    pizzas: 'Pizzas',
    breads: 'Pães',
    recipe_style: 'Estilo da Receita',
    core_parameters: 'Parâmetros Principais',
    num_pizzas: 'Número de Pizzas',
    num_loaves: 'Número de Pães',
    num_units_note: 'Total de massas individuais.',
    weight_per_pizza: 'Peso por Pizza (g)',
    weight_per_loaf: 'Peso por Pão (g)',
    weight_per_unit_note: 'Típico para {style}: {range}.',
    hydration: 'Hidratação',
    hydration_tooltip:
      'A proporção de água em relação à farinha por peso. Hidratação mais alta resulta em uma massa mais pegajosa e um miolo mais aberto.',
    scale: 'Escalar Receita',
    scale_tooltip:
      'Aumente ou diminua o tamanho total da receita. Útil para fazer um lote de teste ou uma quantidade maior.',
    fermentation: 'Fermentação',
    direct: 'Direta',
    poolish: 'Poolish',
    biga: 'Biga',
    sourdough_as_preferment: 'O levain (massa madre) atua como o pré-fermento.',
    preferment_flour: 'Farinha no Pré-fermento',
    preferment_flour_tooltip:
      'A porcentagem da farinha total que será usada no pré-fermento (poolish ou biga).',
    yeast_type: 'Tipo de Fermento',
    yeast_type_tooltip:
      'Diferentes tipos de fermento têm potências diferentes. Levain é a porcentagem do seu fermento natural.',
    yeast: 'Fermento',
    yeast_tooltip:
      'A porcentagem de fermento em relação à farinha total. Para levain, esta é a sua porcentagem de massa madre.',
    settings: 'Configurações e Preferências',
    unit_system_tooltip:
      'Escolha entre o sistema Métrico (gramas) e o Americano (onças, xícaras) para exibição dos ingredientes.',
    unit_system: 'Sistema de Unidades',
    us_customary: 'Americano',
    metric: 'Métrico',
    recipe_notes: 'Anotações da Receita',
    notes_placeholder:
      'Adicione suas anotações pessoais, tempos de fermentação, temperaturas, etc. aqui...',
    reset_aria: 'Redefinir todos os valores do formulário para o padrão',
    reset: 'Redefinir para Padrão',
    prompt_config_name: 'Digite um nome para esta receita:',
    errors: {
      range: 'O valor deve estar entre {min} e {max}.',
      range_percent: 'O valor deve estar entre {min}% e {max}%.',
      range_multiplier: 'O valor deve estar entre {min}x e {max}x.',
    },
  },
  results: {
    title: 'Sua Receita',
    grams: 'Gramas',
    ounces: 'Onças',
    cups: 'Volume',
    unit_system_display: 'Usando Densidades {system}',
    preferment_title: 'Pré-fermento ({technique})',
    sourdough_starter_title: 'Levain (Massa Madre)',
    final_dough_title: 'Massa Final',
    flour: 'Farinha',
    water: 'Água',
    salt: 'Sal',
    oil: 'Azeite/Óleo',
    yeast: 'Fermento',
    total_dough: 'Peso Total da Massa',
    summary_pizza: 'Rende {count} pizzas de {weight}g cada.',
    summary_bread: 'Rende {count} pães de {weight}g cada.',
    notes_title: 'Suas Anotações',
    share_recipe_aria: 'Compartilhar esta receita',
    export_pdf_aria: 'Exportar receita como PDF',
    exporting_pdf_aria: 'Gerando PDF, por favor aguarde...',
    preferment_label: 'Adicionar {technique}',
    conversion_tooltip:
      'A conversão de volume assume {grams}g por xícara para {ingredient} ({system}).',
    notes: {
      flour: "100% | Porcentagem de Padeiro",
      water: 'Alta hidratação',
      salt: 'Sal marinho fino recomendado',
      oil: 'Azeite de oliva ou óleo neutro',
      yeast: 'Ajuste com base na temperatura',
      preferment: 'Misturar e fermentar separadamente',
      starter: 'Fermento com 100% de hidratação',
    },
    ingredients: {
      flour: 'farinha',
      water: 'água',
      salt: 'sal',
      oil: 'azeite/óleo',
      yeast: 'fermento',
    },
    errors: {
      title: 'Parâmetros Inválidos',
      message: 'Por favor, corrija os erros no formulário para ver sua receita.',
    },
    steps: {
        title: 'Instruções',
        direct: {
            step1: '<strong>Combinar:</strong> Em uma tigela grande, misture a farinha, o sal e o fermento.',
            step2: '<strong>Misturar:</strong> Adicione a água e o azeite. Misture até formar uma massa homogênea e sem farinha seca.',
            step3: '<strong>Sovar:</strong> Sove em uma superfície levemente enfarinhada por 8-10 minutos até a massa ficar lisa e elástica.',
            step4: '<strong>Primeira Fermentação:</strong> Coloque em uma tigela levemente untada, cubra e deixe crescer por 1-2 horas ou até dobrar de tamanho.',
            step5: '<strong>Dividir e Modelar:</strong> Divida a massa em bolas, modele-as e coloque em recipientes para fermentação ou em uma assadeira.',
            step6: '<strong>Fermentação Final:</strong> Deixe descansar por mais 30-60 minutos em temperatura ambiente, ou por 1-3 dias na geladeira para mais sabor.',
        },
        indirect: {
            preferment: {
                step1: '<strong>Misturar Pré-fermento:</strong> Na noite anterior, misture os ingredientes do pré-fermento (farinha, água, um pouco de fermento) até incorporar.',
                step2: '<strong>Fermentar Pré-fermento:</strong> Cubra e deixe fermentar em temperatura ambiente por 12-16 horas até ficar borbulhante e ativo.',
            },
            finalDough: {
                step1: '<strong>Combinar:</strong> Em uma tigela grande, combine a farinha e o sal da massa final. Adicione o pré-fermento ativo, o resto da água, o azeite e o fermento.',
                step2: '<strong>Misturar e Sovar:</strong> Misture para formar uma massa, depois sove por 8-10 minutos até ficar lisa e elástica.',
                step3: '<strong>Primeira Fermentação:</strong> Deixe crescer por cerca de 1 hora, ou até aumentar o volume em 50%.',
                step4: '<strong>Dividir e Fermentação Final:</strong> Divida, modele e deixe fermentar por mais 1-2 horas em temperatura ambiente, ou leve à geladeira para uma longa fermentação a frio.',
            },
        },
        baguette: {
          step1: '<strong>Autólise:</strong> Misture farinha e água até incorporar. Deixe descansar por 30 minutos.',
          step2: '<strong>Misturar:</strong> Adicione sal e fermento. Misture em velocidade baixa por 5 min, depois média por 5-7 min até a massa ficar lisa.',
          step3: '<strong>Fermentação:</strong> Fermente por 2-3 horas em temp. ambiente, com 3-4 séries de dobras a cada 30 min.',
          step4: '<strong>Dividir e Pré-modelar:</strong> Divida a massa, pré-modele suavemente em toras. Descanse por 20-30 minutos.',
          step5: '<strong>Modelagem Final:</strong> Modele as baguetes e coloque em um couche enfarinhado, com a costura para cima.',
          step6: '<strong>Crescimento Final:</strong> Deixe crescer por 45-60 min em temp. ambiente, ou durante a noite na geladeira.',
          step7: '<strong>Assar:</strong> Faça os cortes. Asse a 240°C com vapor por 15 min, depois sem vapor por 15-20 min até dourar.',
        },
        ciabatta: {
          step1: '<strong>Misturar:</strong> Combine todos os ingredientes da massa final com o pré-fermento. Misture até formar uma massa bem úmida e irregular.',
          step2: '<strong>Fermentação:</strong> Fermente por 3-4 horas, fazendo uma série de dobras a cada 45 minutos. A massa será bem pegajosa.',
          step3: '<strong>Dividir:</strong> Enharinhe generosamente a bancada. Despeje a massa com cuidado e divida nos formatos desejados.',
          step4: '<strong>Crescimento Final:</strong> Transfira os pães com cuidado para um couche enfarinhado ou papel manteiga. Deixe crescer por 30-45 minutos.',
          step5: '<strong>Assar:</strong> Asse a 230°C com vapor por 10-15 minutos, depois sem por mais 15-20 minutos.',
          step6: '<strong>Esfriar:</strong> Deixe esfriar completamente antes de fatiar para preservar a estrutura do miolo aberto.',
        }
    }
  },
  units: {
    g: 'g',
    oz: 'oz',
    cups: 'xícaras',
    tbsp: 'cs',
    tsp: 'cc',
  },
  header: {
    tips: 'Dicas',
    switch_to_dark: 'Mudar para modo escuro',
    switch_to_light: 'Mudar para modo claro',
    user_profile_tooltip: 'Perfil de usuário',
    go_pro: 'Seja Pro',
  },
  footer: {
    total_dough: 'Massa Total',
    saved_recipes: 'Carregar receitas salvas',
    save_recipe: 'Salvar receita atual',
    upgrade_to_pro: 'Virar Pro',
  },
  load_modal: {
    title: 'Carregar Receita Salva',
    close_aria: 'Fechar modal',
    load: 'Carregar',
    delete_aria: 'Deletar receita',
    no_configs: 'Você ainda não tem receitas salvas.',
  },
  ads: {
    advertisement: 'Publicidade',
  },
  pro: {
    locked_tooltip: 'Este é um recurso Pro. Clique para saber mais.',
    go_pro_header: 'Seja Pro',
    feature_ads: 'Com anúncios',
  },
  paywall: {
    title: 'Desbloqueie o DoughLab Pro',
    subtitle: 'Leve sua panificação para o próximo nível com recursos poderosos.',
    feature_save: 'Salvar e Carregar Receitas',
    feature_save_desc:
      'Nunca mais perca uma ótima receita. Salve suas configurações para acesso com um clique.',
    feature_pro_recipes: 'Receitas e Guias Pro',
    feature_pro_recipes_desc:
      'Acesse uma lista selecionada de receitas de especialistas e guias de técnicas detalhados.',
    feature_ads: 'Experiência Sem Anúncios',
    feature_ads_desc:
      'Desfrute de uma interface limpa e focada, sem interrupções.',
    cta_button: 'Virar Pro (Demonstração)',
    cta_pass_button: 'Testar por 24 horas (Demo)',
    pass_cooldown_message: 'Passe disponível em {hours}h',
    restore_purchase: 'Ver Planos e Preços',
    success_title_pro: 'Acesso Pro Concedido!',
    success_title_pass: 'Passe de 24h Ativado!',
    success_message:
      'Agora você pode desfrutar de todos os recursos Pro. Boas fornadas!',
  },
  pro_recipes: {
    modal_title: 'Receitas Pro',
    neapolitan_title: 'Napolitana Clássica',
    sourdough_title: 'Pão de Fermentação Natural',
    focaccia_title: 'Focaccia de Alta Hidratação',
    ny_style_title: 'Pizza Estilo NY',
    neapolitan_desc: 'Pizza napolitana clássica com uma crosta macia e elástica.',
    sourdough_desc:
      'Um pão de fermentação natural clássico com miolo aberto e sabor ácido.',
    focaccia_desc:
      'Uma focaccia leve e aerada com uma crosta crocante, perfeita para regar com azeite e ervas.',
    ny_style_desc:
      'A icônica fatia grande e dobrável com uma crosta crocante.',
    roman_desc:
      'Pizza "al taglio" (em fatias) com uma crosta muito leve e aerada.',
    detroit_desc:
      'Uma pizza retangular com uma crosta grossa, crocante e queijuda.',
    sicilian_desc:
      'Uma pizza retangular espessa e esponjosa, geralmente coberta com farinha de rosca.',
    chicago_desc:
      'Pizza de forma funda com uma crosta alta, recheada com queijo e molho de tomate robusto.',
    baguette_desc:
      'Um pão francês clássico com uma crosta crocante e interior elástico.',
    ciabatta_desc:
      'Um pão branco italiano com hidratação muito alta, conhecido por seus alvéolos.',
    brioche_desc:
      'Um pão rico com alto teor de ovos e manteiga, o que lhe confere um miolo macio.',
    rye_desc:
      'Um pão denso e saboroso feito com farinha de centeio.',
  },
  plans_page: {
    title: 'Escolha Seu Plano',
    subtitle:
      'Desbloqueie recursos poderosos e apoie o desenvolvimento do DoughLab.',
    feature: 'Recurso',
    free_tier: 'Grátis',
    pro_tier: 'Pro',
    feature_calculator: 'Calculadora de Massa Principal',
    feature_styles: 'Estilos de Pizza e Pão',
    feature_units: 'Unidades Métricas e Americanas',
    feature_save_load: 'Salvar e Carregar Receitas',
    feature_export: 'Exportar para PDF',
    feature_scaling: 'Escalar Receitas',
    feature_pro_recipes: 'Receitas e Dicas Pro',
    upgrade_button: 'Virar Pro',
  },
  tips_page: {
    title: 'Dicas e Técnicas Pro',
    subtitle: 'Domine a arte da massa com estes guias e receitas de especialistas.',
    pro_recipes_title: 'Receitas de Especialistas',
    load_recipe_button: 'Carregar Receita',
    hydration_title: 'Entendendo a Hidratação',
    hydration_p1:
      'A hidratação é simplesmente a porcentagem de água em relação à quantidade de farinha em sua massa. É um fator crítico que influencia a consistência da massa, o manuseio e a textura final da sua crosta.',
    hydration_p2:
      'Hidratação mais baixa (55-65%) resulta em uma massa mais firme e fácil de manusear, frequentemente encontrada em estilos como NY ou Chicago. Hidratação mais alta (70%+) cria uma massa mais pegajosa e extensível, levando a um miolo mais leve e aerado com alvéolos maiores, típico de pizza ao estilo romano ou ciabatta.',
    fermentation_title: 'A Magia da Fermentação',
    fermentation_p1:
      'A fermentação é onde o fermento consome açúcares e produz dióxido de carbono e álcool. Este processo faz sua massa crescer, mas, mais importante, desenvolve sabores complexos e melhora a estrutura e a digestibilidade da massa.',
    fermentation_p2:
      'Tempo e temperatura são seus principais controles. Uma fermentação longa e fria (ex: 24-72 horas na geladeira) desacelera a atividade do fermento, permitindo que as enzimas quebrem amidos e proteínas, resultando em um produto final muito mais saboroso e macio. Uma fermentação curta e quente será mais rápida, mas menos complexa em sabor.',
    salt_title: 'O Papel do Sal',
    salt_p1:
      'O sal é mais do que apenas para dar sabor! Ele desempenha um papel crucial no controle da atividade do fermento, evitando que a massa fermente demais. Ele também fortalece a rede de glúten, tornando a massa menos pegajosa e mais elástica, o que a ajuda a manter sua forma e a reter o gás durante a fermentação. Normalmente, o sal é usado a 2-3% do peso da farinha.',
    pronunciation_title: 'Guia de Pronúncia',
    pronunciation_subtitle:
      'Ouça a pronúncia correta de termos comuns de panificação.',
    pronounce_button_aria: 'Pronunciar {term}',
  },
  auth: {
    sign_in: 'Entrar',
    view_profile: 'Ver Perfil',
    sign_out: 'Sair',
    modal_title: 'Entrar / Cadastrar',
    modal_subtitle: 'Continue com sua conta social para começar.',
    continue_with_google: 'Continuar com Google',
    terms_notice: 'Ao continuar, você concorda com nossos Termos de Serviço.',
  },
  profile: {
    not_logged_in: 'Você não está conectado.',
    settings_title: 'Configurações da Conta',
    settings_desc: 'Gerencie as configurações da sua conta aqui.',
    name: 'Nome Completo',
    email: 'Endereço de E-mail',
    birthDate: 'Data de Nascimento',
    gender: 'Gênero',
    membership: 'Status da Assinatura',
    free_member: 'Membro Gratuito',
    pro_member: 'Membro Pro',
    edit_profile: 'Editar Perfil',
    save_changes: 'Salvar Alterações',
    cancel: 'Cancelar',
    genders: {
      male: 'Masculino',
      female: 'Feminino',
      other: 'Outro',
      prefer_not_to_say: 'Prefiro não dizer',
    },
  },
};

// Spanish Translations
const es = {
  form: {
    yeast_idy: 'Levadura Seca Instantánea',
    yeast_ady: 'Levadura Seca Activa',
    yeast_fresh: 'Levadura Fresca',
    yeast_sourdough: 'Masa Madre',
    neapolitan: 'Napolitana',
    ny_style: 'Estilo NY',
    roman: 'Romana',
    detroit: 'Detroit',
    sicilian: 'Siciliana',
    chicago: 'Chicago',
    sourdough: 'Pan de Masa Madre',
    baguette: 'Baguette',
    ciabatta: 'Ciabatta',
    focaccia: 'Focaccia',
    brioche: 'Brioche',
    rye: 'Pan de Centeno',
    bake_type: 'Tipo de Masa',
    pizzas: 'Pizzas',
    breads: 'Panes',
    recipe_style: 'Estilo de Receta',
    core_parameters: 'Parámetros Principales',
    num_pizzas: 'Número de Pizzas',
    num_loaves: 'Número de Panes',
    num_units_note: 'Total de bolas de masa o panes.',
    weight_per_pizza: 'Peso por Pizza (g)',
    weight_per_loaf: 'Peso por Pan (g)',
    weight_per_unit_note: 'Típico para {style}: {range}.',
    hydration: 'Hidratación',
    hydration_tooltip:
      'La proporción de agua respecto a la harina por peso. Una mayor hidratación produce una masa más pegajosa y una miga más abierta.',
    scale: 'Escalar Receta',
    scale_tooltip:
      'Aumenta o disminuye el tamaño total de la receta. Útil para hacer un lote de prueba o una cantidad mayor.',
    fermentation: 'Fermentación',
    direct: 'Directa',
    poolish: 'Poolish',
    biga: 'Biga',
    sourdough_as_preferment: 'La masa madre actúa como el prefermento.',
    preferment_flour: 'Harina en Prefermento',
    preferment_flour_tooltip:
      'El porcentaje de la harina total que se utilizará en el prefermento (poolish o biga).',
    yeast_type: 'Tipo de Levadura',
    yeast_type_tooltip:
      'Diferentes tipos de levadura tienen diferentes potencias. Masa Madre es el porcentaje de tu fermento natural.',
    yeast: 'Levadura',
    yeast_tooltip:
      'El porcentaje de levadura en relación con la harina total. Para masa madre, este es tu porcentaje de fermento.',
    settings: 'Ajustes y Preferencias',
    unit_system_tooltip:
      'Elige entre el sistema Métrico (gramos) y el Imperial (onzas, tazas) para la visualización de ingredientes.',
    unit_system: 'Sistema de Unidades',
    us_customary: 'Imperial',
    metric: 'Métrico',
    recipe_notes: 'Notas de la Receta',
    notes_placeholder:
      'Añade tus notas personales, tiempos de fermentación, temperaturas, etc. aquí...',
    reset_aria: 'Restablecer todos los valores del formulario a los predeterminados',
    reset: 'Restablecer a Predeterminados',
    prompt_config_name: 'Introduce un nombre para esta receta:',
    errors: {
      range: 'El valor debe estar entre {min} y {max}.',
      range_percent: 'El valor debe estar entre {min}% y {max}%.',
      range_multiplier: 'El valor debe estar entre {min}x y {max}x.',
    },
  },
  results: {
    title: 'Tu Receta',
    grams: 'Gramos',
    ounces: 'Onzas',
    cups: 'Volumen',
    unit_system_display: 'Usando Densidades {system}',
    preferment_title: 'Prefermento ({technique})',
    sourdough_starter_title: 'Masa Madre (Levain)',
    final_dough_title: 'Masa Final',
    flour: 'Harina',
    water: 'Agua',
    salt: 'Sal',
    oil: 'Aceite',
    yeast: 'Levadura',
    total_dough: 'Peso Total de la Masa',
    summary_pizza: 'Rinde {count} pizzas de {weight}g cada una.',
    summary_bread: 'Rinde {count} panes de {weight}g cada uno.',
    notes_title: 'Tus Notas',
    share_recipe_aria: 'Compartir esta receta',
    export_pdf_aria: 'Exportar receta como PDF',
    exporting_pdf_aria: 'Generando PDF, por favor espere...',
    preferment_label: 'Añadir {technique}',
    conversion_tooltip:
      'La conversión de volumen asume {grams}g por taza para {ingredient} ({system}).',
    notes: {
      flour: "100% | Porcentaje del Panadero",
      water: 'Alta hidratación',
      salt: 'Sal marina fina recomendada',
      oil: 'Aceite de oliva o aceite neutro',
      yeast: 'Ajustar según la temperatura',
      preferment: 'Mezclar y fermentar por separado',
      starter: 'Masa madre con 100% de hidratación',
    },
    ingredients: {
      flour: 'harina',
      water: 'agua',
      salt: 'sal',
      oil: 'aceite',
      yeast: 'levadura',
    },
    errors: {
      title: 'Parámetros Inválidos',
      message: 'Por favor, corrige los errores en el formulario para ver tu receta.',
    },
    steps: {
        title: 'Instrucciones',
        direct: {
            step1: '<strong>Combinar:</strong> En un bol grande, mezclar la harina, la sal y la levadura.',
            step2: '<strong>Mezclar:</strong> Añadir el agua y el aceite. Mezclar hasta formar una masa homogénea y sin harina seca.',
            step3: '<strong>Amasar:</strong> Amasar en una superficie ligeramente enharinada durante 8-10 minutos hasta que la masa esté suave y elástica.',
            step4: '<strong>Primera Fermentación:</strong> Colocar en un bol ligeramente aceitado, cubrir y dejar levar durante 1-2 horas o hasta que doble su tamaño.',
            step5: '<strong>Dividir y Formar:</strong> Dividir la masa en bolas, darles forma y colocarlas en recipientes de fermentación o en una bandeja.',
            step6: '<strong>Fermentación Final:</strong> Dejar reposar otros 30-60 minutos a temperatura ambiente, o de 1 a 3 días en el refrigerador para un mejor sabor.',
        },
        indirect: {
            preferment: {
                step1: '<strong>Mezclar Prefermento:</strong> La noche anterior, mezclar los ingredientes del prefermento (harina, agua, una pizca de levadura) hasta que se incorporen.',
                step2: '<strong>Fermentar Prefermento:</strong> Cubrir y dejar fermentar a temperatura ambiente durante 12-16 horas hasta que esté burbujeante y activo.',
            },
            finalDough: {
                step1: '<strong>Combinar:</strong> En un bol grande, combinar la harina y la sal de la masa final. Añadir el prefermento activo, el resto del agua, el aceite y la levadura.',
                step2: '<strong>Mezclar y Amasar:</strong> Mezclar para formar una masa, luego amasar durante 8-10 minutos hasta que esté suave y elástica.',
                step3: '<strong>Primera Fermentación:</strong> Dejar levar durante aproximadamente 1 hora, o hasta que haya aumentado su volumen en un 50%.',
                step4: '<strong>Dividir y Fermentación Final:</strong> Dividir, dar forma y dejar levar durante otras 1-2 horas a temperatura ambiente, o pasar al refrigerador para una fermentación larga en frío.',
            },
        },
        baguette: {
          step1: '<strong>Autólisis:</strong> Mezclar harina y agua hasta que se incorporen. Dejar reposar 30 minutos.',
          step2: '<strong>Mezclar:</strong> Añadir sal y levadura. Mezclar a baja velocidad 5 min, luego a media 5-7 min hasta que la masa esté suave.',
          step3: '<strong>Fermentación:</strong> Fermentar 2-3 horas a temp. ambiente, con 3-4 series de pliegues cada 30 min.',
          step4: '<strong>Dividir y Preformar:</strong> Dividir la masa, preformar suavemente en troncos. Reposar 20-30 minutos.',
          step5: '<strong>Formado Final:</strong> Formar las baguettes y colocar en un couche enharinado, con la costura hacia arriba.',
          step6: '<strong>Levado Final:</strong> Levar 45-60 min a temp. ambiente, o toda la noche en la nevera.',
          step7: '<strong>Hornear:</strong> Greñar los panes. Hornear a 240°C con vapor 15 min, luego sin vapor 15-20 min hasta que estén dorados.',
        },
        ciabatta: {
          step1: '<strong>Mezclar:</strong> Combinar todos los ingredientes de la masa final con el prefermento. Mezclar hasta formar una masa muy húmeda e irregular.',
          step2: '<strong>Fermentación:</strong> Fermentar 3-4 horas, realizando una serie de pliegues cada 45 minutos. La masa estará muy pegajosa.',
          step3: '<strong>Dividir:</strong> Enharinar generosamente la superficie de trabajo. Verter la masa con cuidado y dividir en las formas deseadas.',
          step4: '<strong>Levado Final:</strong> Transferir los panes con cuidado a un couche enharinado o papel de horno. Levar 30-45 minutos.',
          step5: '<strong>Hornear:</strong> Hornear a 230°C con vapor durante 10-15 minutos, luego sin vapor otros 15-20 minutos.',
          step6: '<strong>Enfriar:</strong> Dejar enfriar completamente antes de cortar para preservar la estructura de la miga abierta.',
        }
    }
  },
  units: {
    g: 'g',
    oz: 'oz',
    cups: 'tazas',
    tbsp: 'cs',
    tsp: 'cc',
  },
  header: {
    tips: 'Consejos',
    switch_to_dark: 'Cambiar a modo oscuro',
    switch_to_light: 'Cambiar a modo claro',
    user_profile_tooltip: 'Perfil de usuario',
    go_pro: 'Hazte Pro',
  },
  footer: {
    total_dough: 'Masa Total',
    saved_recipes: 'Cargar recetas guardadas',
    save_recipe: 'Guardar receta actual',
    upgrade_to_pro: 'Hazte Pro',
  },
  load_modal: {
    title: 'Cargar Receta Guardada',
    close_aria: 'Cerrar modal',
    load: 'Cargar',
    delete_aria: 'Eliminar receta',
    no_configs: 'Aún no tienes recetas guardadas.',
  },
  ads: {
    advertisement: 'Publicidad',
  },
  pro: {
    locked_tooltip: 'Esta es una función Pro. Haz clic para saber más.',
    go_pro_header: 'Hazte Pro',
    feature_ads: 'Con anuncios',
  },
  paywall: {
    title: 'Desbloquea DoughLab Pro',
    subtitle: 'Lleva tu horneado al siguiente nivel con potentes funciones.',
    feature_save: 'Guardar y Cargar Recetas',
    feature_save_desc:
      'No vuelvas a perder una gran receta. Guarda tus configuraciones para acceder con un solo clic.',
    feature_pro_recipes: 'Recetas y Guías Pro',
    feature_pro_recipes_desc:
      'Accede a una lista seleccionada de recetas de expertos y guías de técnicas detalladas.',
    feature_ads: 'Experiencia Sin Anuncios',
    feature_ads_desc:
      'Disfruta de una interfaz limpia y enfocada, sin interrupciones.',
    cta_button: 'Hazte Pro (Demo)',
    cta_pass_button: 'Probar por 24 horas (Demo)',
    pass_cooldown_message: 'Pase disponible en {hours}h',
    restore_purchase: 'Ver Planes y Precios',
    success_title_pro: '¡Acceso Pro Concedido!',
    success_title_pass: '¡Pase de 24h Activado!',
    success_message:
      'Ahora puedes disfrutar de todas las funciones Pro. ¡Feliz horneado!',
  },
  pro_recipes: {
    modal_title: 'Recetas Pro',
    neapolitan_title: 'Napolitana Clásica',
    sourdough_title: 'Hogaza de Masa Madre',
    focaccia_title: 'Focaccia de Alta Hidratación',
    ny_style_title: 'Pizza Estilo NY',
    neapolitan_desc: 'Pizza napolitana clásica con una corteza suave y elástica.',
    sourdough_desc:
      'Una hogaza de masa madre clásica con una miga abierta y sabor ácido.',
    focaccia_desc:
      'Una focaccia ligera y aireada con una corteza crujiente, perfecta para aderezar con aceite de oliva y hierbas.',
    ny_style_desc:
      'La icónica porción grande y plegable con una corteza crujiente.',
    roman_desc:
      'Pizza "al taglio" (por porción) con una corteza muy ligera y aireada.',
    detroit_desc:
      'Una pizza rectangular con una corteza gruesa, crujiente y con mucho queso.',
    sicilian_desc:
      'Una pizza rectangular gruesa y esponjosa, a menudo cubierta con pan rallado.',
    chicago_desc:
      'Pizza de molde profundo con una corteza alta, rellena de queso y salsa de tomate robusta.',
    baguette_desc:
      'Un pan francés clásico con una corteza crujiente y un interior elástico.',
    ciabatta_desc:
      'Un pan blanco italiano con una hidratación muy alta, conocido por sus alvéolos.',
    brioche_desc:
      'Un pan rico con un alto contenido de huevo y mantequilla, lo que le da una miga tierna.',
    rye_desc:
      'Un pan denso y sabroso hecho con harina de centeno.',
  },
  plans_page: {
    title: 'Elige Tu Plan',
    subtitle:
      'Desbloquea potentes funciones y apoya el desarrollo de DoughLab.',
    feature: 'Característica',
    free_tier: 'Gratis',
    pro_tier: 'Pro',
    feature_calculator: 'Calculadora de Masa Principal',
    feature_styles: 'Estilos de Pizza y Pan',
    feature_units: 'Unidades Métricas e Imperiales',
    feature_save_load: 'Guardar y Cargar Recetas',
    feature_export: 'Exportar a PDF',
    feature_scaling: 'Escalar Recetas',
    feature_pro_recipes: 'Recetas y Consejos Pro',
    upgrade_button: 'Hazte Pro',
  },
  tips_page: {
    title: 'Consejos y Técnicas Pro',
    subtitle: 'Domina el arte de la masa con estas guías y recetas de expertos.',
    pro_recipes_title: 'Recetas de Expertos',
    load_recipe_button: 'Cargar Receta',
    hydration_title: 'Entendiendo la Hidratación',
    hydration_p1:
      'La hidratación es simplemente el porcentaje de agua en relación a la cantidad de harina en tu masa. Es un factor crítico que influye en la consistencia de la masa, su manejo y la textura final de tu corteza.',
    hydration_p2:
      'Una hidratación más baja (55-65%) resulta en una masa más firme y fácil de manejar, a menudo encontrada en estilos como NY o Chicago. Una hidratación más alta (70%+) crea una masa más pegajosa y extensible, lo que lleva a una miga más ligera y aireada con agujeros más grandes, típica de la pizza al estilo romano o la ciabatta.',
    fermentation_title: 'La Magia de la Fermentación',
    fermentation_p1:
      'La fermentación es donde la levadura consume azúcares y produce dióxido de carbono y alcohol. Este proceso hace que tu masa suba, pero lo más importante, desarrolla sabores complejos y mejora la estructura y digestibilidad de la masa.',
    fermentation_p2:
      'El tiempo y la temperatura son tus principales controles. Una fermentación larga y fría (ej: 24-72 horas en el refrigerador) ralentiza la actividad de la levadura mientras permite que las enzimas descompongan almidones y proteínas, resultando en un producto final mucho más sabroso y tierno. Una fermentación corta y cálida será más rápida pero menos compleja en sabor.',
    salt_title: 'El Papel de la Sal',
    salt_p1:
      '¡La sal es más que solo para dar sabor! Juega un papel crucial en el control de la actividad de la levadura, evitando que la masa fermente en exceso. También fortalece la red de gluten, haciendo la masa menos pegajosa y más elástica, lo que le ayuda a mantener su forma y atrapar el gas durante la fermentación. Típicamente, la sal se usa al 2-3% del peso de la harina.',
    pronunciation_title: 'Guía de Pronunciación',
    pronunciation_subtitle:
      'Escucha la pronunciación correcta de términos comunes de panadería.',
    pronounce_button_aria: 'Pronunciar {term}',
  },
  auth: {
    sign_in: 'Iniciar Sesión',
    view_profile: 'Ver Perfil',
    sign_out: 'Cerrar Sesión',
    modal_title: 'Iniciar Sesión / Registrarse',
    modal_subtitle: 'Continúa con tu cuenta social para empezar.',
    continue_with_google: 'Continuar con Google',
    terms_notice: 'Al continuar, aceptas nuestros Términos de Servicio.',
  },
  profile: {
    not_logged_in: 'No has iniciado sesión.',
    settings_title: 'Configuración de la Cuenta',
    settings_desc: 'Gestiona la configuración de tu cuenta aquí.',
    name: 'Nombre Completo',
    email: 'Dirección de Correo Electrónico',
    birthDate: 'Fecha de Nacimiento',
    gender: 'Género',
    membership: 'Estado de la Suscripción',
    free_member: 'Miembro Gratuito',
    pro_member: 'Miembro Pro',
    edit_profile: 'Editar Perfil',
    save_changes: 'Guardar Cambios',
    cancel: 'Cancelar',
    genders: {
      male: 'Masculino',
      female: 'Femenino',
      other: 'Otro',
      prefer_not_to_say: 'Prefiero no decirlo',
    },
  },
};

const translations: Record<Locale, Record<string, any>> = {
  en,
  pt,
  es,
};

// --- REACT CONTEXT ---
interface I18nContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (
    key: string,
    options?: {
      defaultValue?: string;
      [key: string]: string | number | undefined;
    },
  ) => string;
}

const I18nContext = createContext<I18nContextType | undefined>(undefined);

/**
 * @component I18nProvider
 * @description A React Context Provider that supplies the i18n functionality to its children.
 * It manages the current `locale` state and provides the `t` function.
 */
export const I18nProvider: FC<{ children: ReactNode }> = ({ children }) => {
  // State for the current active language. Defaults to 'en'.
  const [locale, setLocaleState] = useState<Locale>('en');

  /**
   * @effect
   * On initial mount, this effect attempts to detect the user's browser language.
   * If the browser language is one of the supported locales ('en', 'pt', 'es'),
   * it sets it as the active locale. Otherwise, it defaults to 'en'.
   */
  useEffect(() => {
    try {
      const browserLang = navigator.language.split('-')[0] as Locale;
      if (['en', 'pt', 'es'].includes(browserLang)) {
        setLocaleState(browserLang);
      }
    } catch (e) {
      console.error('Could not access navigator language', e);
    }
  }, []);

  /**
   * @function setLocale
   * @description A callback to change the application's language.
   * This is passed down through the context to components like the LanguageSwitcher.
   */
  const setLocale = useCallback((newLocale: Locale) => {
    setLocaleState(newLocale);
  }, []);

  /**
   * @function t
   * @description The core translation function.
   * It takes a key (e.g., 'form.hydration_tooltip') and returns the corresponding string
   * for the currently active `locale`.
   *
   * @param key - A dot-separated string that navigates the nested translation object.
   * @param options - An optional object for providing a default value or dynamic replacements.
   *   - `defaultValue`: A fallback string if the key is not found.
   *   - `[other]`: Any other key-value pair will be used to replace placeholders in the
   *     translation string (e.g., `{name}`).
   * @returns The translated (and interpolated) string.
   */
  const t = useCallback(
    (
      key: string,
      options?: {
        defaultValue?: string;
        [key: string]: string | number | undefined;
      },
    ) => {
      // 1. Navigate the nested object using the dot-separated key.
      const keys = key.split('.');
      let result = translations[locale] || translations.en;
      for (const k of keys) {
        if (result && typeof result === 'object' && k in result) {
          result = result[k];
        } else {
          result = undefined; // Key not found
          break;
        }
      }

      // 2. Determine the final string, falling back to defaultValue or the key itself.
      let translation = result || options?.defaultValue || key;

      // 3. Perform dynamic replacements if options are provided.
      if (typeof translation === 'string' && options) {
        Object.keys(options).forEach((replacementKey) => {
          if (replacementKey === 'defaultValue') return;
          const value = options[replacementKey];
          translation = (translation as string).replace(
            new RegExp(`\\{${replacementKey}\\}`, 'g'),
            String(value),
          );
        });
      }
      return String(translation);
    },
    [locale],
  );

  const value = { locale, setLocale, t };

  return React.createElement(I18nContext.Provider, { value }, children);
};

/**
 * @hook useTranslation
 * @description A custom hook for easy access to the I18nContext.
 * It provides components with the `locale`, `setLocale`, and `t` function.
 * Throws an error if used outside of an `I18nProvider`.
 */
export const useTranslation = (): I18nContextType => {
  const context = useContext(I18nContext);
  if (context === undefined) {
    throw new Error('useTranslation must be used within an I18nProvider');
  }
  return context;
};
