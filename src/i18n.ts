
import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { Locale } from './types';

const translations = {
  en: {
    common: {
      save: 'Save',
      cancel: 'Cancel',
      close: 'Close',
      details: 'Details',
      delete: 'Delete',
      edit: 'Edit',
      add: 'Add',
      loading: 'Loading...',
      back: 'Back',
      next: 'Next',
      finish: 'Finish',
      skip: 'Skip',
      thinking: 'Thinking...',
      save_changes: 'Save Changes',
      not_applicable: 'N/A',
    },
    nav: {
      home: 'Home',
      calculator: 'Calculator',
      learn: 'Learn',
      lab: 'My Lab',
      profile: 'Profile',
      shop: 'Shop',
      styles: 'Styles',
    },
    dashboard: {
      greeting_morning: 'Good morning, {name}',
      greeting_afternoon: 'Good afternoon, {name}',
      greeting_evening: 'Good evening, {name}',
      greeting_subtext: 'Ready to bake something amazing today?',
      action_new_dough: 'New Dough',
      recent_batches_view_all: 'View All Bakes',
      levain_status_fed: 'Fed {time} ago',
      levain_empty_state: 'No levain active.',
      action_open_levain: 'Open Levain',
      summary_last_batch: 'Last Bake',
    },
    form: {
      recipe_style: 'Recipe Style',
      dough_ball_weight: 'Dough Ball Weight',
      hydration: 'Hydration',
      salt: 'Salt',
      oil: 'Oil/Fat',
      sugar: 'Sugar',
      yeast: 'Yeast',
      yeast_type: 'Yeast Type',
      flour_type: 'Flour Type',
      fermentation: 'Fermentation',
      room_temp: 'Room Temp',
      unit_system: 'Unit System',
      metric: 'Metric (g, °C)',
      us_customary: 'US Customary (oz, °F)',
      unit_system_tooltip: 'Changes display units for weight and temperature.',
      tooltips: {
        ui_mode: 'Basic mode uses presets. Advanced mode unlocks all sliders.',
      },
      neapolitan: 'Neapolitan',
      new_york: 'New York Style',
      pan_pizza: 'Pan Pizza',
      chicago_deep_dish: 'Chicago Deep Dish',
      romana_tonda: 'Romana Tonda',
      siciliana: 'Sicilian',
      grandma_style: 'Grandma Style',
      pao_frances: 'French Bread',
      baguette: 'Baguette',
      ciabatta: 'Ciabatta',
      sourdough: 'Sourdough',
      focaccia: 'Focaccia',
      yeast_idy: 'Instant Dry Yeast',
      yeast_ady: 'Active Dry Yeast',
      yeast_fresh: 'Fresh Yeast',
      yeast_sourdough_starter: 'Sourdough Starter',
      yeast_user_levain: 'My Levain',
      temp_cold: 'Cold',
      temp_mild: 'Mild',
      temp_hot: 'Hot',
    },
    results: {
      title: 'Dough Recipe',
      total_flour: 'Total Flour',
      total_water: 'Total Water',
      total_salt: 'Total Salt',
      total_oil: 'Total Oil',
      total_sugar: 'Total Sugar',
      total_yeast: 'Total Yeast',
      total_dough: 'Total Dough Weight',
      single_ball: 'Weight per Ball',
      final_dough_title: 'Final Dough Mix',
      flour: 'Flour',
      water: 'Water',
      salt: 'Salt',
      oil: 'Oil',
      sugar: 'Sugar',
      yeast: 'Yeast',
      share_link: 'Link copied to clipboard!',
      share_error: 'Could not copy link.',
      export_pdf_aria: 'Exporting PDF...',
      export_json_aria: 'Exporting JSON...',
    },
    auth: {
      modal_title: 'Sign in to DoughLabPro',
      modal_subtitle: 'Save your recipes, track your levain, and access pro features.',
      continue_with_google: 'Continue with Google',
      sign_out: 'Sign Out',
      terms_notice: 'By continuing, you agree to our Terms of Service and Privacy Policy.',
    },
    profile: {
      not_logged_in: 'Please log in to view your profile.',
      settings_title: 'Profile Settings',
      edit_profile: 'Edit Profile',
      name: 'Name',
      email: 'Email',
      birthDate: 'Birth Date',
      gender: 'Gender',
      save_changes: 'Save Changes',
      cancel: 'Cancel',
      membership: 'Membership',
      pro_member: 'Pro Member',
      free_member: 'Free Member',
      genders: {
        male: 'Male',
        female: 'Female',
        other: 'Other',
        prefer_not_to_say: 'Prefer not to say',
      },
      resources: {
        title: 'Resources',
        tech_references: 'Technical References',
        tech_references_desc: 'Standards and scientific bases.',
        flours_library: 'Flour Library',
        flours_library_desc: 'Types, W strength, and specs.',
      },
      ovens: {
        title: 'My Ovens',
        add_oven: 'Add Oven',
        empty_state: 'No ovens registered.',
        default_oven: 'Default',
        set_as_default: 'Set as Default',
        types: {
          gas: 'Gas',
          electric: 'Electric',
          wood: 'Wood Fired',
          ooni: 'Portable (Ooni)',
          stone_oven: 'Stone Oven',
          other: 'Other',
        },
      },
      levains: {
        title: 'My Levains',
        add_levain: 'Add Levain',
        empty_state: 'No levains registered.',
        default: 'Default',
        hydration: 'Hydration',
        manage: 'Manage',
        set_as_default: 'Set as Default',
      },
    },
    levain_pet: {
      title: 'Levain Pet',
      status: {
        ativo: 'Active',
        precisa_atencao: 'Needs Attention',
        descanso: 'Resting',
        arquivado: 'Archived',
      },
      create_button: 'Create Levain',
      detail_page: {
        assistant: {
          modal_title: 'Levain Assistant',
          placeholder: 'Ask about feeding or health...',
        },
      },
    },
    onboarding: {
      welcome_title: 'Welcome to DoughLab',
      welcome_subtitle: 'Your professional dough calculator.',
      start_tour: 'Start Tour',
      skip_tour: 'Skip',
      next: 'Next',
      back: 'Back',
      finish: 'Finish',
      step1_title: 'Configure',
      step1_desc: 'Set your parameters here.',
      step2_title: 'Quantity',
      step2_desc: 'Adjust number of balls or weight.',
      step3_title: 'Results',
      step3_desc: 'See your exact recipe here.',
      step4_title: 'Save',
      step4_desc: 'Save your batch to My Lab.',
    },
    levain_onboarding: {
      screen1_title: 'Meet your Levain Pet',
      screen1_text: 'Track feedings and health.',
      screen1_button: 'Next',
      screen2_title: 'Feedings',
      screen2_text: 'Log every feeding to build history.',
      screen2_button: 'Next',
      screen3_title: 'Insights',
      screen3_text: 'Get health scores and predictions.',
      screen3_button: 'Next',
      screen4_title: 'Recipes',
      screen4_text: 'Use your levain in calculator recipes.',
      screen4_button: 'Next',
      screen5_title: 'Ready?',
      screen5_text: 'Let\'s create your first starter.',
      screen5_button: 'Create Levain',
    },
    batch_detail: {
      not_found: 'Batch Not Found',
      not_found_desc: 'This batch may have been deleted.',
      back_to_diary: 'Back to My Lab',
      anonymous: 'Anonymous',
      data_title: 'Data',
      hydration: 'Hydration',
      yeast: 'Yeast',
      ingredients_title: 'Ingredients',
      process_title: 'Process Notes',
      notes_placeholder: 'Add notes here...',
      no_notes: 'No notes recorded.',
      rating: 'Rating',
      photos_title: 'Photos',
      actions_title: 'Actions',
      actions: {
        repeat: 'Load into Calculator',
        duplicate: 'Duplicate Batch',
        export_pdf: 'Export PDF',
        export_json: 'Export JSON',
        delete: 'Delete Batch',
      },
      badge: {
        great: 'Great',
        good: 'Good',
        regular: 'Adjust',
        adjust: 'Adjust',
      },
    },
    community_page: {
      title: 'Community',
      subtitle: 'Recipes shared by other bakers.',
      empty_title: 'No posts yet',
      empty_subtitle: 'Be the first to share!',
      by: 'by',
    },
    community_detail: {
      not_found: 'Recipe not found',
      not_found_desc: 'This recipe might have been removed.',
      back_to_community: 'Back to Community',
      by: 'by',
      on: 'on',
      recipe_params: 'Recipe Parameters',
      style: 'Style',
      units: 'Yield',
      hydration: 'Hydration',
      salt: 'Salt',
      oil: 'Oil',
      sugar: 'Sugar',
      yeast: 'Yeast',
      baking_temp: 'Baking Temp',
      env_process: 'Environment',
      ambient_temp: 'Ambient Temp',
      clone: 'Clone Recipe',
    },
    learn: {
      title: 'Learn',
      subtitle: 'Master the science of baking.',
      why_title: 'Why it matters',
      howto_title: 'How to apply',
      tips_title: 'Pro Tips',
      reference_title: 'Technical Reference',
    },
    flours_page: {
        title: 'Flours Library',
        subtitle: 'Understand the characteristics of different flours.',
        default: 'Default',
        set_default: 'Set as Default',
        hydration_rec: 'Recommended Hydration',
        strength: 'Strength (W)',
        back_to_calculator: 'Back to Calculator',
    },
    diary_page: {
        title: 'My Bakes',
        subtitle: 'History of your productions.',
        empty_title: 'No bakes yet',
        empty_subtitle: 'Start a new calculation to save your first bake.',
        create_first: 'Go to Calculator',
        new_batch: 'Log New Bake',
        card: {
            hydration: 'Hydration',
            weight: 'Ball Weight',
            units: 'Units',
            redo: 'Load',
            open: 'Details',
        }
    },
    info: {
        update_success: 'Updated successfully.',
    },
    confirmations: {
        delete_batch: 'Are you sure you want to delete "{name}"?',
        delete_oven: 'Are you sure you want to delete oven "{name}"?',
        delete_levain: 'Are you sure you want to delete levain "{name}"?',
    },
    mode_toggle: {
        basic: 'Guided',
        advanced: 'Advanced',
    },
    suggestions: {
        hot_day: { title: 'Hot Day', desc: 'Try lower yeast.' },
        cold_day: { title: 'Cold Day', desc: 'Try longer ferment.' },
        steel_oven: { title: 'Baking Steel', desc: 'Great for NY Style.' },
        default: { title: 'Try Focaccia', desc: 'A forgiving starter.' },
    },
    ads: {
        advertisement: 'Advertisement',
    },
    modals: {
        close: 'Close',
    },
    user_menu: {
        theme_light: 'Light',
        theme_dark: 'Dark',
        theme_system: 'System',
    }
  },
};

interface I18nContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: string, replacements?: { [key: string]: string | number | undefined }) => string;
}

const I18nContext = createContext<I18nContextType | undefined>(undefined);

export const I18nProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [locale, setLocale] = useState<Locale>('en');

  const t = useCallback((key: string, replacements?: { [key: string]: string | number | undefined }): string => {
    const keyParts = key.split('.');
    let translation: any = translations[locale];
    
    for (const part of keyParts) {
      if (translation && typeof translation === 'object' && part in translation) {
        translation = translation[part];
      } else {
        return (replacements as any)?.defaultValue ?? key;
      }
    }

    if (typeof translation !== 'string') {
         return (replacements as any)?.defaultValue ?? key;
    }

    let result = translation;
    if (replacements) {
      Object.entries(replacements).forEach(([placeholder, value]) => {
        if (placeholder !== 'defaultValue') {
            result = result.replace(`{${placeholder}}`, String(value));
        }
      });
    }
    return result;
  }, [locale]);

  return React.createElement(
    I18nContext.Provider,
    { value: { locale, setLocale, t } },
    children
  );
};

export const useTranslation = (): I18nContextType => {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error('useTranslation must be used within an I18nProvider');
  }
  return context;
};
