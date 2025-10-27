import React, {
  createContext,
  useState,
  useContext,
  useCallback,
  useMemo,
} from 'react';
import { Locale } from './types';

// Basic translations store
const translations: Record<Locale, Record<string, string>> = {
  en: {
    'yeast.idy': 'Instant Dry Yeast (IDY)',
    'yeast.ady': 'Active Dry Yeast (ADY)',
    'yeast.fresh': 'Fresh Yeast',
    'form.pizzas': 'Pizzas',
    'form.breads': 'Breads',
    'form.bake_type': 'Bake Type',
    'form.recipe_style': 'Recipe Style',
    'form.core_parameters': 'Core Parameters',
    'form.fermentation': 'Fermentation & Yeast',
    'form.settings': 'Settings & Units',
    'form.recipe_notes': 'Recipe Notes',
    'form.reset': 'Reset to Default',
    'form.reset_aria': 'Reset form to default values',
    'form.napoletana': 'Napoletana',
    'form.ny': 'NY Style',
    'form.romana': 'Romana',
    'form.sicilian': 'Sicilian',
    'form.focaccia': 'Focaccia',
    'form.detroit': 'Detroit',
    'form.chicago_deep_dish': 'Chicago Deep Dish',
    'form.artisan_loaf': 'Artisan Loaf',
    'form.baguette': 'Baguette',
    'form.ciabatta': 'Ciabatta',
    'form.pumpernickel': 'Pumpernickel',
    'form.sourdough_boule': 'Sourdough Boule',
    'form.rye_bread': 'Rye Bread',
    'form.num_pizzas': 'Number of Dough Balls',
    'form.num_loaves': 'Number of Loaves',
    'form.num_units_note': 'e.g., 4 dough balls for 4 pizzas',
    'form.weight_per_pizza': 'Weight per Dough Ball (g)',
    'form.weight_per_loaf': 'Weight per Loaf (g)',
    'form.weight_per_unit_note': '{style} style is typically {range}.',
    'form.hydration': 'Hydration',
    'form.hydration_tooltip':
      "The amount of water relative to the amount of flour, expressed as a percentage. Higher hydration leads to a wetter, stickier dough.",
    'form.scale': 'Scale Recipe',
    'form.scale_tooltip': 'Scale all ingredient quantities up or down. For example, 2x doubles the recipe.',
    'form.direct': 'Direct',
    'form.poolish': 'Poolish',
    'form.biga': 'Biga',
    'form.preferment_flour': 'Preferment Flour',
    'form.preferment_flour_tooltip':
      'The percentage of the total flour that is used in the preferment (poolish or biga).',
    'form.yeast_type': 'Yeast Type',
    'form.yeast_type_tooltip':
      'Different yeast types have different potencies. IDY is most common for home baking.',
    'form.yeast': 'Yeast',
    'form.yeast_tooltip':
      'The amount of yeast relative to the total flour. This can be adjusted based on fermentation time and temperature.',
    'form.unit_system': 'Measurement System',
    'form.unit_system_tooltip': 'Select your preferred measurement system. This affects volume conversions.',
    'form.us_customary': 'US Customary',
    'form.metric': 'Metric',
    'form.notes_placeholder': 'Add personal notes, fermentation times, temperatures, etc...',
    'form.prompt_config_name': 'Enter a name for this recipe:',
    'form.errors.num_pizzas_range': 'Please enter a value between 1 and 100.',
    'form.errors.dough_ball_weight_range': 'Please enter a value between 100 and 2000.',
    'results.title': 'Your Recipe',
    'results.grams': 'Grams',
    'results.ounces': 'Ounces',
    'results.cups': 'Volume',
    'results.flour': 'Flour',
    'results.water': 'Water',
    'results.salt': 'Salt',
    'results.oil': 'Oil',
    'results.yeast': 'Yeast',
    'results.total_dough': 'Total Dough Weight',
    'results.summary_pizza': 'Makes {count} dough balls at {weight}g each.',
    'results.summary_bread': 'Makes {count} loaves at {weight}g each.',
    'results.preferment_title': '{technique} Preferment',
    'results.final_dough_title': 'Final Dough',
    'results.preferment_label': '{technique}',
    'results.notes_title': 'My Notes',
    'results.share_recipe_aria': 'Share Recipe',
    'results.export_pdf_aria': 'Export as PDF',
    'results.unit_system_display': 'Volume conversions based on {system} system.',
    'results.conversion_tooltip': '1 cup of {ingredient} ≈ {grams}g in the {system} system.',
    'results.ingredients.flour': 'flour',
    'results.ingredients.water': 'water',
    'results.ingredients.salt': 'salt',
    'results.ingredients.oil': 'oil',
    'results.ingredients.yeast': 'yeast',
    'results.notes.flour': '100% (Baseline)',
    'results.notes.water': 'e.g. 65% Hydration',
    'results.notes.salt': 'Adjust to taste',
    'results.notes.oil': 'Optional, for softness/crispiness',
    'results.notes.yeast': 'Adjust for fermentation time',
    'results.notes.preferment': 'To be prepared in advance',
    'results.steps.title': 'General Instructions',
    'results.steps.direct.step1': '<strong>Combine:</strong> In a large bowl, whisk together the flour and salt. In a separate smaller bowl, dissolve the yeast in the warm water.',
    'results.steps.direct.step2': '<strong>Mix:</strong> Pour the yeast/water mixture and any oil into the flour mixture. Mix until a shaggy dough forms and no dry flour remains.',
    'results.steps.direct.step3': '<strong>Knead:</strong> Turn the dough out onto a lightly floured surface and knead for 8-10 minutes (or 5-7 minutes in a stand mixer with a dough hook) until smooth and elastic.',
    'results.steps.direct.step4': '<strong>Bulk Ferment:</strong> Place the dough in a lightly oiled bowl, cover, and let it rise in a warm place for 1-2 hours, or until doubled in size.',
    'results.steps.direct.step5': '<strong>Shape & Proof:</strong> Gently deflate the dough, divide it into portions, and shape into balls or loaves. Cover and let them proof for another 30-60 minutes.',
    'results.steps.direct.step6': '<strong>Bake:</strong> Preheat your oven to the desired temperature. Bake according to your recipe style until golden brown.',
    'results.steps.indirect.preferment.step1': '<strong>Mix Preferment:</strong> Combine all preferment ingredients ({technique}) in a bowl. Mix until well combined, cover, and let it ferment at room temperature for the time specified in your recipe (e.g., 8-12 hours for Poolish, 12-16 for Biga).',
    'results.steps.indirect.preferment.step2': '<strong>Check for Readiness:</strong> The preferment is ready when it is bubbly, domed, and has a distinct fermented aroma.',
    'results.steps.indirect.finalDough.step1': '<strong>Combine:</strong> In a large mixing bowl, combine the mature preferment with all the final dough ingredients.',
    'results.steps.indirect.finalDough.step2': '<strong>Mix & Knead:</strong> Mix until a cohesive dough forms, then knead for 8-10 minutes until smooth and elastic. The dough may be sticky.',
    'results.steps.indirect.finalDough.step3': '<strong>Bulk Ferment & Shape:</strong> Proceed with bulk fermentation (typically shorter, around 45-90 minutes), followed by dividing, shaping, and proofing.',
    'results.steps.indirect.finalDough.step4': "<strong>Bake:</strong> Bake as you would with a direct dough, following your recipe's instructions.",
    'results.steps.baguette.step1': 'Follow Poolish preferment instructions.',
    'results.steps.baguette.step2': 'For the final dough, use a gentle mixing method (like stretch and folds) to develop gluten without overworking it.',
    'results.steps.baguette.step3': 'After bulk fermentation (with 2-3 sets of folds), gently pre-shape the dough into logs.',
    'results.steps.baguette.step4': 'Rest for 20-30 minutes, then perform the final shaping into the classic baguette form.',
    'results.steps.baguette.step5': 'Proof seam-side up on a floured couche or linen towel for 45-60 minutes.',
    'results.steps.baguette.step6': 'Score the top with a lame or sharp knife just before baking.',
    'results.steps.baguette.step7': 'Bake in a hot, steamy oven (e.g., 240°C / 475°F) until deeply golden and crisp.',
    'results.steps.ciabatta.step1': 'Follow Biga preferment instructions. The Biga will be quite stiff.',
    'results.steps.ciabatta.step2': 'For the final dough, break the Biga into small pieces and combine with the final dough ingredients. Mix on low speed until combined, then increase speed to develop the gluten. This will be a very wet, slack dough.',
    'results.steps.ciabatta.step3': 'Perform a long bulk fermentation (2-3 hours) with several sets of stretch and folds in an oiled container to build strength.',
    'results.steps.ciabatta.step4': 'Gently pour the dough onto a well-floured surface, trying not to deflate it. Dust the top with flour.',
    'results.steps.ciabatta.step5': 'Cut the dough into rectangular shapes. Gently stretch them into the classic slipper shape and transfer to parchment paper for a short final proof (20-30 mins).',
    'results.steps.ciabatta.step6': 'Bake in a very hot oven (240°C / 475°F) with steam.',
    'units.g': 'g',
    'units.oz': 'oz',
    'units.cups': 'cups',
    'units.tbsp': 'tbsp',
    'units.tsp': 'tsp',
    'footer.total_dough': 'Total Dough',
    'footer.save_recipe': 'Save',
    'footer.saved_recipes': 'My Recipes',
    'header.title': 'DoughLab',
    'header.subtitle': 'Pro',
    'header.switch_to_dark': 'Switch to dark mode',
    'header.switch_to_light': 'Switch to light mode',
    'load_modal.title': 'Load Saved Recipe',
    'load_modal.close_aria': 'Close modal',
    'load_modal.no_configs': 'You have no saved recipes.',
    'load_modal.load': 'Load',
    'load_modal.delete_aria': 'Delete recipe',
    'pro.go_pro_header': 'Go Pro',
    'pro.locked_tooltip': 'This is a Pro feature. Click to unlock!',
    'pro.title': 'Unlock DoughLab Pro',
    'pro.subtitle': 'Take your baking to the next level with these exclusive features.',
    'pro.feature_ads': 'Ad-Free Experience',
    'pro.feature_scale': 'Scale Recipes to Any Size',
    'pro.feature_notes': 'Save Personal Recipe Notes',
    'pro.feature_save_load': 'Save & Load Your Recipes',
    'pro.feature_export': 'Export to PDF & Share Links',
    'pro.feature_pro_recipes': 'Access Pro Recipes & Techniques',
    'pro.buy_button': 'Go Pro for {price}',
    'pro.buy_note': 'One-time purchase. Lifetime access.',
    'pro_recipes.modal_title': 'Pro Recipes',
    'pro_recipes.neapolitan.name': 'Classic Neapolitan',
    'pro_recipes.neapolitan.description': 'A quick, classic recipe perfect for high-temp ovens.',
    'pro_recipes.focaccia.name': 'High-Hydration Focaccia',
    'pro_recipes.focaccia.description': 'Wet, airy dough. Ideal for a flavorful, dimpled crust.',
    'pro_recipes.ny_style.name': 'NY Style Pizza',
    'pro_recipes.ny_style.description': 'Great for a long cold ferment. Crispy and chewy results.',
    'pro_recipes.sourdough.name': 'Simple "Faux" Sourdough Loaf',
    'pro_recipes.sourdough.description': 'Simulates sourdough flavor with a long, cool fermentation.',
    'ads.advertisement': 'Advertisement',
  },
  es: {},
  pt: {},
};

// Fill in missing translations with English
(Object.keys(translations) as Locale[]).forEach(lang => {
    if (lang !== 'en') {
        translations[lang] = { ...translations.en, ...translations[lang] };
    }
});


interface I18nContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: string, replacements?: { [key: string]: string | number }) => string;
}

const I18nContext = createContext<I18nContextType | null>(null);

export const I18nProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [locale, setLocale] = useState<Locale>('en');

  const t = useCallback(
    (key: string, replacements?: { [key: string]: string | number }) => {
      let translation = translations[locale][key] || key;
      if (replacements) {
        Object.entries(replacements).forEach(([key, value]) => {
          translation = translation.replace(`{${key}}`, String(value));
        });
      }
      return translation;
    },
    [locale],
  );
  
  const value = useMemo(() => ({
    locale,
    setLocale,
    t
  }), [locale, t]);

  // FIX: Replace JSX with `React.createElement` to prevent parsing errors in a .ts file.
  return React.createElement(
    I18nContext.Provider,
    { value: value },
    children,
  );
};

export const useTranslation = (): I18nContextType => {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error('useTranslation must be used within an I18nProvider');
  }
  return context;
};
