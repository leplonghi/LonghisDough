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

// English Translations
const en = {
  dashboard: {
    title: "My Lab",
    subtitle: "Your dashboard for doughs, levains, and results—all in one place.",
    greeting_morning: "Good morning, {name}.",
    greeting_afternoon: "Good afternoon, {name}.",
    greeting_evening: "Good evening, {name}.",
    greeting_subtext: "Let's take another dough out of guesswork today?",
    actions_title: "Quick Actions",
    action_new_dough: "New Dough",
    action_log_batch: "Log Bake",
    action_open_levain: "Open Levain Pet",
    summary_title: "Your Lab's Summary",
    summary_active_levains: "Active Levains",
    summary_batches_7_days: "Bakes in last 7 days",
    summary_last_batch: "Last bake registered",
    summary_last_batch_value: "{time} ago",
    summary_frequent_style: "Most Frequent Style",
    recent_batches_title: "Recent Bakes",
    recent_batches_subtext: "Quickly see what you've tested lately.",
    recent_batches_view_all: "View all bakes",
    levain_title: "Levain Pet – Overview",
    levain_status_active: "Active",
    levain_status_attention: "Needs attention",
    levain_status_fed: "last fed {time} ago",
    levain_empty_state: "You don't have a Levain Pet yet. Create your first starter to track everything.",
    levain_view_all: "View all starters",
    presets_title: "Presets & Favorite Recipes",
    presets_subtext: "Quickly access what works best in your kitchen.",
    presets_action: "Use in calculator",
    insights_title: "Your Dough Insights",
    insights_subtext: "A quick look at the patterns that are emerging.",
    insights_avg_hydration: "Avg. hydration (last 5)",
    insights_most_used: "You've been using more",
    insights_avg_fermentation: "Avg. fermentation time",
    insights_view_details: "View insights in detail",
    learn_title: "Learn – Suggested Content",
    learn_subtext: "Curated content for what you're doing now.",
    learn_action: "View tutorial",
    shortcuts_title: "Quick Shortcuts",
    shortcuts_calculator: "Calculator",
    shortcuts_learn: "Learn",
    shortcuts_community: "CrustCrew",
    shortcuts_levain: "Levain Pet",
    shortcuts_legal: "Legal",
  },
  // TODO: Translate all levain_pet keys
  levain_pet: {
    title: "Levain Pet",
    subtitle: "Track your starters as partners in your dough lab.",
    add_button: "Add levain",
    import_button: "Import",
    export_button: "Export",
    empty_state_title: "You don't have a Levain Pet yet.",
    empty_state_desc: "Create your first starter and track everything—feeding, routine, observations, and use in recipes.",
    create_button: "Create Levain",
    detail_page: {
      back_link: "Back to Levain Pet",
      not_found: "Levain not found",
      tabs: {
        summary: "Summary",
        feedings: "Feedings",
        profile: "Profile",
        insights: "Insights",
      },
      summary: {
        title: "Summary",
        hydration: "Hydration",
        base_flour: "Base Flour",
        created_at: "Created on",
        status: {
          ativo: "Your levain is responding well.",
          precisa_atencao: "It's been longer than ideal since the last feeding.",
          descanso: "This levain is in a prolonged rest.",
          arquivado: "Archived starter. You can reactivate it at any time.",
        }
      },
      feedings: {
        title: "Feedings",
        register_button: "Log feeding",
        empty_state: "No feedings logged yet.",
        log: {
          ratio: "Ratio",
          flour: "Flour",
        }
      },
      profile: {
        title: "Starter Profile",
        typical_use_label: "Typical use",
        typical_use_placeholder: "Select for which doughs you use this levain.",
        sensory_notes_label: "Sensory notes",
        sensory_notes_placeholder: "Describe smell, activity, texture, behavior.",
        save_button: "Save changes",
        notifications: {
          enable_label: "Remind me to feed this levain",
          interval_label: "Ideal interval between feedings (hours)",
          interval_placeholder: "24",
        }
      },
      insights: {
        title: "Levain Insights",
        empty_state: "Not enough data to generate insights yet.",
        empty_state_charts: "Not enough data to display graphs yet.",
        kpi: {
          avg_frequency: "Avg. feeding frequency",
          avg_temp: "Average temperature",
          used_in_recipes: "Used in recipes",
        },
        charts: {
          feeding_frequency_title: "Interval between feedings (h)",
          temperature_title: "Recorded temperature (°C)",
        }
      },
      assistant: {
        title: "Questions about this levain?",
        button: "Ask the assistant",
        modal_title: "Levain Pet Assistant",
        placeholder: "Type your question about this levain...",
        initial_message: "Based on your levain's records, I can help you adjust routine, ratios, and usage time.",
        scope_rejection: "I can only help with technical adjustments for the levain and dough. For health or specific dietary questions, please consult a specialized professional.",
      },
      form: {
        title: "Log feeding",
        date_label: "Date and time",
        date_placeholder: "Now",
        flour_amount_label: "Flour (g)",
        water_amount_label: "Water (g)",
        ratio_label: "Ratio",
        ratio_placeholder: "e.g., 1:2:2",
        temp_label: "Ambient temperature (°C)",
        temp_placeholder: "e.g., 24",
        flour_type_label: "Flour type",
        flour_type_placeholder: "Select flour type",
        notes_label: "Observations",
        notes_placeholder: "Notes on smell, texture, growth...",
        save_button: "Save log",
        cancel_button: "Cancel",
      },
      notifications: {
        success_save: "Changes saved successfully.",
        success_feed: "Feeding logged successfully.",
        success_export: "Data exported successfully.",
        success_import: "Levain Pet data imported successfully.",
        error_import_invalid: "Invalid or corrupted backup file.",
        error_import_read: "Could not read Levain Pet data.",
      },
    },
    time_since: {
      never: "never",
      years: "approx. {count} years",
      months: "approx. {count} months",
      days: "approx. {count} days",
      hours: "approx. {count} hours",
      minutes: "approx. {count} minutes",
      seconds: "approx. {count} seconds",
    },
    status: {
      ativo: "Active",
      precisa_atencao: "Needs Attention",
      descanso: "Resting",
      arquivado: "Archived",
    },
  },
  common: {
    edit: 'Edit',
    add: 'Add',
    cancel: 'Cancel',
    save: 'Save',
    save_changes: 'Save Changes',
    delete: 'Delete',
    load: 'Load',
    not_applicable: 'N/A',
    by: 'By',
    back: 'Back',
    next: 'Next',
    finish: 'Finish',
    close: 'Close',
    details: 'Details',
    explore: 'Explore',
    thinking: 'Thinking...',
    error: 'Error',
    success: 'Success',
    warning: 'Warning',
    skip: 'Skip',
  },
  nav: {
    lab: "My Lab",
    diary: "Diary",
    calculator: "Calculator",
    learn: "Learn",
    community: "CrustCrew",
    insights: "Insights",
    flours: "Flours",
    help: "Help",
    references: "References",
    profile: "Profile",
    tools: "Tools"
  },
  user_menu: {
    profile: "Profile",
    settings: "General Settings",
    theme: "Theme",
    theme_light: "Light",
    theme_dark: "Dark",
    theme_system: "System",
    language: "Language",
    help: "Help",
    sign_out: "Sign Out",
    legal: "Legal",
    general: "General",
  },
  header: {
    switch_to_dark: 'Switch to dark theme',
    switch_to_light: 'Switch to light theme',
    user_profile_tooltip: 'User menu'
  },
  auth: {
    sign_in: 'Sign In',
    sign_out: 'Sign Out',
    modal_title: 'Access your account',
    modal_subtitle: 'Save your batches, ovens, and more.',
    continue_with_google: 'Continue with Google',
    terms_notice: 'By continuing, you agree to our Terms of Service.',
    view_profile: 'View Profile'
  },
  mode_toggle: {
    basic: 'Guided Mode',
    advanced: 'Free Mode',
    basic_tooltip: 'Follow a style with recommended parameters for greater consistency. Ideal for learning.',
    advanced_tooltip: 'Freely edit all parameters and create your own recipe.',
    basic_tag: 'Guided Mode',
    advanced_tag: 'Free Mode',
  },
  form: {
    pizzas: 'Pizzas',
    breads: 'Breads',
    sections: {
      style: {
        title: "Dough Style",
        description: "Start by choosing the result you're aiming for."
      },
      production: {
        title: "Quantity",
        description: "Define how many dough balls or the total flour weight."
      },
      ingredients: {
        title: "Ingredients",
        description: "Adjust the percentages of each component."
      },
      fermentation: {
        title: "Fermentation Technique",
        description: "Choose between a direct method or a preferment."
      },
      conditionals: {
        title: "Environmental Conditions",
        description: "Factors that influence your dough's behavior."
      },
      tools: {
        title: "Load Preset",
        description: "Start from one of your saved recipes."
      },
      notes: {
        title: "Your Notes",
        description: "Log observations and learnings about this recipe."
      },
      save_preset: {
        title: "Save Preset",
        description: "Save the current configuration for future use."
      }
    },
    num_pizzas: 'Number of Dough Balls',
    num_loaves: 'Number of Loaves',
    weight_per_pizza: 'Weight per Ball (g)',
    weight_per_loaf: 'Weight per Loaf (g)',
    total_flour: 'Total Flour (g)',
    calc_mode_mass: 'By Total Weight',
    calc_mode_flour: 'By Flour Weight',
    hydration: 'Hydration',
    sugar: 'Sugar',
    yeast_type: 'Yeast Type',
    yeast: 'Yeast',
    levain: 'Levain',
    sourdough_as_preferment: 'Levain (Sourdough Starter) acts as the preferment. Options like Biga/Poolish are disabled.',
    direct: 'Direct',
    poolish: 'Poolish',
    biga: 'Biga',
    preferment_flour: '% Flour in Preferment',
    flour_type: 'Flour Type',
    ambient_temperature: 'Ambient Temperature',
    baking_temp: "Baking Temperature",
    reset: 'Reset Fields',
    settings: 'Settings',
    unit_system: 'Unit System (Volume)',
    us_customary: 'US Customary',
    metric: 'Metric',
    // Tooltips
    hydration_tooltip: 'Hydration is the water-to-flour ratio. It affects the final lightness and texture. Stronger flours generally absorb more water.',
    salt_tooltip: 'Salt controls fermentation, strengthens gluten, and adds flavor.',
    oil_tooltip: 'Oil/fat adds softness and helps with crust browning, especially in lower-temperature ovens.',
    sugar_tooltip: 'Percentage of sugar. Used for color and softness. It is not typically used in some traditional styles.',
    yeast_type_tooltip: 'Each type has different potency. The choice also impacts the final flavor of the dough. <a href="#/learn" class="text-lime-500 hover:underline">Learn more in our tutorials.</a>',
    yeast_tooltip: 'The percentage of yeast relative to the flour. This varies with yeast type, temperature, and desired fermentation time.',
    preferment_flour_tooltip: 'The percentage of total flour used in the preferment. Common ranges are 20-50% for Poolish and 30-60% for Biga.',
    unit_system_tooltip: 'Affects the conversion from grams to cups/spoons. The metric system (1 cup = 250ml) differs from the US customary system (1 cup = ~236ml).',
    advanced_mode_tooltip: 'This parameter is set by the selected style. Switch to Free Mode to edit it.',
    baking_temp_tooltip: "The target temperature of your baking surface (°C). This affects the analysis and suggestions.",
    tooltips: {
      ui_mode: '<b>Guided Mode:</b> Guided, with locked parameters for consistency.<br><b>Free Mode:</b> Full control over all recipe parameters.',
      calculation_mode: '<b>By Total Weight:</b> Ideal for beginners. Define how many pizzas and the weight of each.<br><b>By Flour:</b> Professional method. Define the total flour weight as the base (100%).',
      num_pizzas: 'The number of dough balls (or loaves) you want to produce.',
      dough_ball_weight: 'The final weight of each dough ball. Different styles call for different weights (e.g., Neapolitan 250-280g, NY 350-450g).',
      total_flour: 'Specify the total weight of flour. All other ingredients will be calculated based on this value (Baker\'s Percentage).',
      fermentation_technique: '<b>Direct:</b> All ingredients are mixed at once.<br><b>Poolish/Biga:</b> A pre-ferment is prepared beforehand, resulting in more flavor complexity and better texture.',
      yeast_type: 'Choose the type of yeast. The quantities will be automatically adjusted based on the potency of each. Levain uses your registered profile in "My Lab".',
      flour_type: 'The flour selection affects hydration recommendations and the intelligent dough analysis.',
      ambient_temperature: 'The ambient temperature influences the speed of fermentation. The app uses this information to suggest adjustments.',
      notes: 'Your notes are saved with the batch in "My Lab". Write down what went right, what went wrong, and what you learned.',
      save_preset: 'Saves the current configuration as a reusable recipe in Free Mode.',
      load_preset: 'Loads one of your saved recipes, overwriting the current values.',
      unit_selection: 'Switch between grams, ounces, or volume units (cups/spoons). The conversion to volume is an approximation based on the density of each ingredient.',
      start_batch: 'This is the final weight of your dough. Use the "Start Batch" button below to save this recipe to your diary.',
      batch_status: 'Update the status to organize your batch diary. E.g., "Planned", "In Progress", "Completed".',
      batch_rating: 'Rate your batch from 1 to 5 stars. This helps track your best results in the Insights.',
      publish_community: 'By checking this option and saving, a copy of this batch (recipe and notes) will be visible to other users in the CrustCrew tab.',
    },
    // Yeast Types
    yeast_idy: 'Instant Dry (IDY)',
    yeast_ady: 'Active Dry (ADY)',
    yeast_fresh: 'Fresh',
    yeast_sourdough_starter: 'Levain (100% Hydration)',
    yeast_user_levain: 'My Levain Pet',
    // Temps
    temp_cold: 'Cold (< 18°C)',
    temp_mild: 'Mild (18-24°C)',
    temp_hot: 'Hot (> 24°C)',
    // Presets
    reset_preset_button: 'Reset to "{name}" recommended values',
    load_preset: "Load Preset",
    save_preset: "Save Current as Preset",
    delete_preset: "Delete Preset",
    no_presets: "No saved presets",
    select_preset_aria: "Select saved preset",
    // Levain selection
    select_levain: "Select your Levain Pet",
    using_levain: "Using",
    levain_hydration: "Hydration",
    levain_fed: "Fed",
    levain_hours_ago: "hours ago",
    no_levain_found: "No Levain Pet found.",
    create_one_link: "Create one to use here.",
    // Errors
    errors: {
      range: 'A value between {min} and {max} is recommended here.',
      range_percent: 'A value between {min}% and {max}% is recommended.',
      range_multiplier: 'A value between {min}x and {max}x works well.',
      range_tempC: "A value between {min}°C and {max}°C is recommended.",
      total_flour_range: 'The recommended total flour is between {min} and {max}g.',
    },
  },
  results: {
    title: 'Calculated Recipe',
    flour: 'Flour',
    water: 'Water',
    salt: 'Salt',
    oil: 'Oil / Olive Oil',
    yeast: 'Yeast',
    total_dough: 'Total Dough',
    notes: {
      flour: '100% (Calculation base)',
      water: '{hydration}% hydration',
      salt: '{salt}% salt',
      oil: '{oil}% oil',
      yeast: 'Based on type and percentage',
      starter: 'Levain / Sourdough Starter',
      preferment: 'To be added to the final dough'
    },
    summary_pizza: '{count} dough balls of {weight}g each',
    summary_bread: '{count} loaves of {weight}g each',
    grams: 'Grams',
    ounces: 'Ounces',
    cups: 'Cups/Spoons',
    unit_system_display: 'Volume calc: {system}',
    share_recipe_aria: 'Share recipe',
    exporting_pdf_aria: 'Exporting PDF...',
    export_pdf_aria: 'Export as PDF',
    preferment_title: 'Preferment ({technique})',
    final_dough_title: 'Final Dough',
    levain_details: 'Levain Details',
    total_levain: 'Total Levain',
    steps: {
      title: 'Suggested Steps',
      direct: {
          step1: "In a large bowl, dissolve the salt in the water.",
          step2: "Add about 10% of the flour and all the yeast, mixing to create a slurry. This helps hydrate the yeast.",
          step3: "Gradually add the remaining flour, mixing until just combined. Add the oil (if using).",
          step4: "Knead the dough for 10-15 minutes on a lightly floured surface until smooth and elastic.",
          step5: "Let the dough rest for the bulk fermentation period according to your recipe.",
          step6: "Divide and shape into balls. Let them rest for the final proof.",
          step7: "Open the dough, add toppings, and bake.",
      },
      indirect: {
          preferment: {
              step1: "Mix the preferment ingredients (flour, water, yeast) until just combined.",
              step2: "Let it ferment at room temperature for the time specified in your recipe (e.g., 8-16 hours for Poolish, 12-24 for Biga)."
          },
          finalDough: {
              step1: "In a large bowl, dissolve the salt in the water.",
              step2: "Add the preferment and break it up in the water.",
              step3: "Gradually add the flour and any remaining yeast, mixing until combined. Add the oil (if using).",
              step4: "Knead for 10-15 minutes until the dough is smooth and elastic.",
              step5: "Proceed with bulk fermentation, dividing, and proofing as per your recipe.",
              step6: "Open the dough, add toppings, and bake.",
          }
      }
    },
    notes_title: 'Your Notes',
    yield: {
      title: "Estimated Yield",
      units: "Dough balls",
      loaves: "Loaves",
      weight_per_unit: "Weight per unit"
    },
    adjustments: {
      intelligent: "Intelligent Analysis",
      environmental: "Environmental Adjustments",
      style_analysis: "Dough Style Analysis"
    },
    errors: {
      title: 'Attention to Parameters',
      message: 'One or more values are outside the usual range, which might affect the result. You can check the fields in the form.'
    },
    conversion_tooltip: 'Based on {ingredient} density ({system}): 1 cup ≈ {grams}g.',
    ingredients: {
      flour: 'flour',
      water: 'water',
      salt: 'salt',
      oil: 'oil',
      yeast: 'yeast'
    },
    share_error: 'Could not copy recipe link to clipboard.',
    pdf_error_alert: 'Sorry, there was an error exporting the PDF. Please try again later.',
    pdf_error_console: 'PDF generation failed: A required library or element is missing.',
  },
  footer: {
    total_dough: 'Total Dough',
    start_batch: 'Save & Start Batch'
  },
  pro: {
    locked_tooltip: 'This is a Pro feature.',
    go_pro_header: 'Go Pro'
  },
  units: {
    g: 'g',
    oz: 'oz',
    cups: 'c',
    tbsp: 'tbsp',
    tsp: 'tsp',
  },
  learn: {
    title: "Learn: The Science of Dough",
    subtitle: "The right knowledge, organized for you. Less searching. More understanding.",
    search_placeholder: "Search concepts (e.g., 'cold fermentation')",
    all_filter: "All",
    view_tutorial: "Read more",
    empty_state_title: "No tutorials found.",
    empty_state_subtitle: "Try adjusting your filters or search term.",
    why_title: "Why It Matters",
    howto_title: "Key Steps",
    tips_title: "Key Takeaways",
    reference_title: "Technical Reference",
    test_in_calculator: "Try in Calculator",
    sections: {
      FUNDAMENTALS: "Fundamentals",
      FERMENTATION: "Fermentation",
      ENVIRONMENT: "Environment",
      INGREDIENTS: "Ingredients",
      TROUBLESHOOTING: "Troubleshooting",
      TECHNIQUES: "Techniques",
    }
  },
  info: {
    preset_loaded: 'Preset "{name}" loaded.',
    preset_saved: 'Preset "{name}" saved!',
    preset_deleted: 'Preset "{name}" deleted.',
    batch_deleted: 'Batch "{name}" deleted.',
    batch_started: 'Batch "{name}" started!',
    legacy_migration: "Your saved recipes have been updated to the new 'Batches' format!",
    save_success: 'Pronto! Ajuste salvo com sucesso.',
    update_success: 'Massas atualizadas. Suas alterações foram aplicadas.',
    error: {
      generic: 'Algo não saiu como esperado. Tente novamente ou revise os campos.'
    }
  },
  prompts: {
    batch_name_title: "Name this batch:",
    batch_name_default: "Batch of {style}",
    preset_name_title: "Name this preset:",
  },
  confirmations: {
    delete_oven: 'Are you sure you want to delete the oven "{name}"?',
    delete_levain: 'Are you sure you want to delete the levain "{name}"?',
    delete_preset: 'Are you sure you want to delete the preset "{name}"?',
    delete_batch: 'Tem certeza que deseja excluir a fornada "{name}"?',
  },
  profile: {
    not_logged_in: 'Please log in to view your profile.',
    settings_title: 'Profile Settings',
    edit_profile: 'Edit Profile',
    name: 'Name',
    email: 'Email',
    birthDate: 'Birth Date',
    gender: 'Gender',
    membership: 'Membership',
    pro_member: 'Pro Member',
    free_member: 'Free Member',
    cancel: 'Cancel',
    save_changes: 'Save Changes',
    genders: {
      male: 'Male',
      female: 'Female',
      other: 'Other',
      prefer_not_to_say: 'Prefer not to say'
    },
    ovens: {
      title: 'My Ovens',
      add_oven: 'Add Oven',
      edit_oven: 'Edit Oven',
      empty_state: 'You have not registered any ovens yet.',
      default_oven: 'Default',
      confirm_delete: 'Are you sure you want to delete the oven "{name}"?',
      set_as_default: 'Set as default',
      types: {
        gas: 'Gas',
        electric: 'Electric',
        wood: 'Wood-fired',
        ooni: 'Portable (Ooni, etc)',
        stone_oven: 'Stone Oven',
        other: 'Other',
      },
      form: {
        name: 'Oven Name',
        name_placeholder: 'e.g., My Home Oven',
        type: 'Type',
        max_temp: 'Max Temperature (°C)',
        has_stone: 'Has baking stone',
        has_steel: 'Has baking steel',
        notes: 'Notes',
        notes_placeholder: 'e.g., Takes 45min to preheat',
      }
    },
    levains: {
      title: 'My Levains',
      add_levain: 'Add Levain',
      edit_levain: 'Edit Levain',
      manage: 'Manage',
      empty_state: 'You have not registered a levain yet.',
      default: 'Default',
      hydration: 'Hydration',
      set_as_default: 'Set as Default',
      form: {
        name: 'Levain Name',
        name_placeholder: 'e.g., Isauri, the Levain',
        last_feeding: 'Last Feeding',
        total_weight: 'Total Weight (g)',
        notes: 'Notes'
      }
    },
    resources: {
      title: 'Resources',
      tech_references: 'Technical References',
      tech_references_desc: 'Books, standards, and study sources.',
      flours_library: 'Flour Library',
      flours_library_desc: 'Explore flour types and set your defaults.'
    }
  },
  levain_manager: {
    title: 'Levain Manager',
    title_with_name: 'Levain Manager: {name}',
    empty_state_title: 'You do not have a registered levain yet.',
    create_levain: 'Create My Levain',
    status: {
      title: 'Current Status',
      strength: 'Estimated Strength',
      last_feeding: 'Last Feeding',
      hydration: 'Hydration',
      total_weight: 'Total Weight',
      strength_strong: 'Strong (Peak)',
      strength_great: 'Great',
      strength_stable: 'Stable',
      strength_weak: 'Weak (Feed me!)'
    },
    feed: {
      title: 'Feed Levain',
      flour: 'Flour (g)',
      water: 'Water (g)',
      register: 'Register Feed',
      alert: 'Please fill in the flour and water amounts.'
    },
    ddt: {
      title: 'Water Temp (DDT)',
      ambient: 'Ambient (°C)',
      flour: 'Flour (°C)',
      water_temp_recommendation: 'Use water at approx.:'
    },
    history: {
      title: 'Feeding History',
      date: 'Date',
      flour: 'Flour',
      water: 'Water',
      ratio: 'Ratio'
    }
  },
  modals: {
    close: 'Close',
    load: {
      title: 'Load Recipe',
      all: 'All Recipes',
      favorites: 'Favorites',
      empty: 'No saved recipes yet.',
      empty_favorites: 'You have no favorite recipes.',
      delete_aria: 'Delete recipe',
    },
    presets: {
      title: 'My Presets',
      select_aria: 'Select saved preset',
      empty: 'No saved presets',
      delete_title: 'Delete Preset',
      load: 'Load Preset',
      save: 'Save Current'
    },
    adjustments: {
      title: 'Apply Suggestions',
      subtitle: 'Confirm the suggested changes.',
      header_from: 'From',
      header_to: 'To',
      apply: 'Apply Changes',
      cancel: 'Cancel',
      change_labels: {
        recipeStyle: 'Style',
        hydration: 'Hydration',
        salt: 'Salt',
        oil: 'Oil/Olive Oil',
        sugar: 'Sugar',
        flourId: 'Flour',
      }
    }
  },
  diary_page: {
    title: 'My Batches',
    subtitle: 'Track your dough journey, from planning to baking.',
    empty_title: 'Welcome to your Diary!',
    empty_subtitle: 'This is where you can track your dough batches. Create your first recipe to get started!',
    create_first: 'Create First Recipe',
    new_batch: 'New Batch',
    my_recipes: 'My Recipes',
    explore: 'Explore',
    card: {
      hydration: 'Hydration',
      weight: 'Weight',
      units: 'Units',
      open: 'Details',
      redo: 'Redo Batch',
    }
  },
  batch_detail: {
    not_found: 'Batch not found',
    not_found_desc: 'The batch you are looking for does not exist or has been deleted.',
    back_to_diary: 'Back to Diary',
    created_on: 'Created on',
    status: 'Status',
    rating: 'Rating',
    notes: 'Process Notes',
    notes_placeholder: 'e.g., Fermented for 48h in the fridge, baked at 280°C for 5 minutes...',
    recipe_summary: 'Recipe Summary',
    style: 'Style',
    units: 'Units',
    hydration: 'Hydration',
    salt: 'Salt',
    oil: 'Oil/Olive Oil',
    sugar: 'Sugar',
    yeast: 'Yeast',
    baking_temp: "Baking Temp.",
    publish: 'Publish to CrustCrew',
    publish_desc: 'Make this batch visible to other users.',
    back: 'Back',
    save: 'Save Changes',
    edit_notes: 'Edit',
    add_notes: 'Add',
    cancel_notes: 'Cancel',
    save_notes: 'Save Notes',
    no_notes: 'No notes yet.',
    anonymous: 'Anonymous',
    data_title: 'Dados da Massa',
    preferment_title: 'Pré-fermento',
    ingredients_title: 'Ingredientes',
    process_title: 'Processo & Observações',
    photos_title: 'Fotos',
    actions_title: 'Ações',
    actions: {
        repeat: 'Repetir na Calculadora',
        duplicate: 'Duplicar Fornada',
        export_pdf: 'Exportar PDF',
        export_json: 'Exportar JSON',
        delete: 'Excluir Fornada'
    },
    badge: {
        great: 'Ótima',
        good: 'Boa',
        regular: 'Regular',
        adjust: 'Ajustar',
    }
  },
  community_page: {
    title: 'CrustCrew',
    subtitle: 'Junte-se à CrustCrew e compartilhe suas fornadas.',
    search_placeholder: 'Search by name...',
    all_styles: 'All Styles',
    featured: 'Community Highlights',
    all_batches: 'All Batches',
    empty_title: 'No batches found.',
    empty_subtitle: 'Try adjusting your filters or publish one of your batches!',
    by: 'By',
    feed_tab: "Feed",
    reviews_tab: "Reviews",
    leaderboard_tab: "Leaderboard",
    clone_confirm_title: "Clone Recipe",
    clone_confirm_q: "Do you want to adapt this recipe to your default equipment profile?",
    clone_confirm_yes: "Yes, adapt",
    clone_confirm_no: "No, clone original",
    create_post_title: "Create Post",
    create_post_no_batch_warning: 'You need to register a batch in "My Lab" to auto-fill the data.',
    photo_upload_label: 'Click to upload',
    photo_upload_types: 'PNG, JPG',
    recipe_name_label: 'Recipe Name',
    recipe_name_placeholder: 'e.g., 72h Neapolitan Pizza',
    description_label: 'Description',
    description_placeholder: 'Tell us a bit about your batch...',
    oven_label: 'Oven',
    hydration_label: 'Hydration (%)',
    publish_button: 'Publish',
    publishing_button: 'Publishing...',
    photo_and_name_required: 'Photo and recipe name are required.',
    post_created_success: 'Post created successfully!',
    clone_recipe_label: 'Clone Recipe',
    save_label: 'Save',
  },
  community_detail: {
    not_found: 'CrustCrew Batch not found',
    not_found_desc: 'This batch does not exist or has been removed.',
    back_to_community: 'Voltar para a CrustCrew',
    by: 'By',
    on: 'on',
    recipe_params: 'Recipe Parameters',
    env_process: 'Environment & Process',
    style: 'Style',
    units: 'Units',
    hydration: 'Hydration',
    salt: 'Salt',
    oil: 'Oil/Olive Oil',
    sugar: 'Sugar',
    yeast: 'Yeast',
    ambient_temp: 'Ambient Temp.',
    baking_temp: "Baking Temp.",
    clone: 'Clone to Calculator',
    comments_section: "Comments",
  },
  flours_page: {
    title: 'Flour Library',
    subtitle: 'Explore different types of flour and set a default to pre-load in the calculator.',
    hydration_rec: 'Rec. Hydration',
    strength: 'Strength',
    set_default: 'Set as Default',
    default: 'Default',
    back_to_calculator: 'Back to Calculator',
  },
  references_page: {
    title: 'Technical References',
    subtitle: 'A curated collection of books, standards, and resources to deepen your knowledge.',
    visit: 'Visit',
    sections: {
      official: 'Pizza – Official Rules and Associations',
      books: 'Baking – Technical Books',
      flour: 'Flour – Technical Data and Strength (W)',
      concepts: 'Terminology and Concepts'
    },
    types: {
      association: 'Association / Standard',
      book: 'Book',
      concept: 'Technical Concept',
      site: 'Site / Manufacturer',
      community: 'Community / Site'
    }
  },
  assistant: {
    system_prompt: 'Você é a Doughy, uma assistente amigável e especialista em massas de pizza para o DoughLabPro. Seu objetivo é ajudar os usuários a entender suas receitas, resolver problemas e aprender a ciência da panificação. Responda sempre em português do Brasil. Seja prestativa, concisa e encorajadora.',
    context: {
        active_recipe: "Receita Ativa na Calculadora",
        style: "Estilo",
        hydration: "Hidratação",
        salt: "Sal",
        oil: "Óleo/Azeite",
        yeast: "Fermento",
        technique: "Técnica",
        ambient: "Ambiente",
        style_warning: {
            title: "Aviso de Estilo",
            neapolitan: "A receita Napolitana tradicional (AVPN) não usa óleo ou açúcar.",
            ny_style: "O estilo NY geralmente se beneficia de um pouco de óleo para maciez."
        },
        selected_flour: "Farinha Selecionada",
        strength_w: "Força W",
        protein: "Proteína",
        default_oven: "Forno Padrão",
        max_temp: "Temp. Máx.",
        surface: "Superfície",
        steel: "Aço",
        stone: "Pedra",
        none: "Nenhuma",
        last_batch: "Última Fornada Registrada",
        rating: "Avaliação",
        stars: "estrelas",
        header: "Contexto Atual",
        no_context: "Sem contexto de receita ativo.",
        user_question: "Pergunta do Usuário"
    }
  },
  assistant_page: {
    title: 'Doughy',
    greeting: "Olá! Sou a Doughy, sua assistente de massas. Como posso te ajudar a entender melhor sua receita hoje?",
    thinking: 'Pensando...',
    placeholder: 'Ask something about your dough...',
    send: 'Send',
    error: 'I could not answer right now. Please try again in a few moments.',
    title_short: 'Doughy',
    greeting_short: "Olá, sou a Doughy! Pronta para ajudar com sua massa.",
    placeholder_short: "Pergunte à Doughy o que sua massa precisa..."
  },
  suggestions: {
      hot_day: {
          title: "Hot day? Try a classic Napolitana",
          desc: "High temperatures accelerate fermentation. A direct, short-fermentation dough is a great option."
      },
      steel_oven: {
          title: "Perfect for your setup: NY Style",
          desc: "Your baking steel is ideal for the characteristic crispy crust of a New York style pizza."
      },
      cold_day: {
          title: "Cold weather? Time for a long ferment",
          desc: "A Detroit Style pizza benefits from a longer, controlled fermentation, which is easier to manage on cooler days."
      },
      default: {
          title: "Explore something new: Focaccia",
          desc: "A high-hydration dough that's fun to make and results in a delicious, airy bread."
      }
  },
  insights_page: {
    title: "Your Insights",
    subtitle: "A summary of your baking journey.",
    empty_title: "Your Insights will appear here.",
    empty_subtitle: "Start creating batches to see your progress and trends.",
    go_to_calculator: "Go to Calculator",
    summary_tab: "Summary",
    history_tab: "History",
    community_tab: "Community",
    total_batches: "Total Batches",
    batches_last_30_days: "Batches (30d)",
    most_used_style: "Most Used Style",
    avg_hydration: "Avg. Hydration",
    avg_hydration_by_style: "Avg. Hydration by Style",
    batch_history: "Batch History",
    filter_by_style: "Filter by Style",
    all_styles: "All Styles",
    filter_by_rating: "Filter by Rating",
    all_ratings: "All Ratings",
    export_csv: "Export to CSV",
    date: "Date",
    rating: "Rating",
    no_rating: "No rating",
    community_benchmark: "Community Benchmark",
    community_benchmark_desc: "See how your stats compare to other bakers.",
    hydration_comparison: "Your avg. hydration ({user_avg}%) is slightly above the community average ({community_avg}%) for Neapolitan pizza.",
    top_baker: "You are in the top {percent}% of most active bakers this month!",
    overall_performance: "Overall Performance",
    dough_trends: "Dough Trends",
    hydration_evolution_title: "Hydration Evolution (Last 10 Batches)",
    most_used_styles_title: "Most Used Styles",
    consistency_index_title: "Consistency Index",
    consistency_evolution_title: "Consistency & Evolution",
    intelligent_comparisons_title: "Intelligent Comparisons",
    your_avg_hydration_vs_community: "Your Avg. Hydration vs. Community (Neapolitan)",
    your_fermentation_time_vs_standard: "Your Fermentation Time vs. Technical Standard (NY Style)",
    performance_by_flour_type: "Performance by Flour Type",
    you: "You",
    community: "Community",
    recommended: "Recommended",
    best_ratings_with: "Your best ratings (avg. {rating} ★) are with {flour_type} flour."
  },
  onboarding: {
    welcome_title: "Welcome to DoughLabPro!",
    welcome_subtitle: "Let's make your first perfect pizza together. We'll guide you step-by-step through our award-winning Neapolitan recipe.",
    start_tour: "Let's Start!",
    skip_tour: "No thanks, I'll explore on my own.",
    step1_title: "The Calculator",
    step1_desc: "This is the heart of DoughLabPro. We've pre-selected a classic Neapolitan style for you.",
    step2_title: "Set the Quantity",
    step2_desc: "Just tell us how many pizzas you want. All ingredients will adjust automatically. Let's start with 2.",
    step3_title: "See Your Recipe",
    step3_desc: "And that's it! Your recipe is ready. Here are the exact amounts you'll need.",
    step4_title: "Save Your Bake",
    step4_desc: "Now, the most important part: save this bake to your 'My Lab' diary to track your process and results.",
    step5_title: "Welcome to My Lab!",
    step5_desc: "Success! Your first bake has been saved. This is your personal baking diary.",
    step6_title: "What's Next?",
    step6_desc: "After baking, click 'Details' to add photos, notes on how it went, and a rating. This is how you'll improve. Happy baking!",
    final_title: "You're all set!",
    final_desc: "You've learned the core loop of DoughLabPro. Now feel free to explore all the advanced features. Enjoy!",
    start_exploring: "Start Exploring!",
    next: "Next",
    back: "Back",
    finish: "Finish",
    batch_name_default: 'My first Neapolitan',
  },
  levain_onboarding: {
    screen1_title: "Welcome to Levain Pet",
    screen1_text: "Your levain is a living organism. Here you can track everything—feeding, routine, strength, and behavior—without mess or guesswork.",
    screen1_button: "Continue",
    screen2_title: "Track your routine with precision",
    screen2_text: "Log each feeding with ratio, flour, and temperature. DoughLabPro organizes everything and identifies patterns.",
    screen2_button: "Next",
    screen3_title: "Understand your levain's state",
    screen3_text: "The app shows if it's active, needs attention, or is resting. Total clarity before you use it.",
    screen3_button: "Next",
    screen4_title: "Use your Levain Pet in recipes",
    screen4_text: "In the calculator, choose your levain and DoughLabPro adjusts everything automatically.",
    screen4_button: "Almost there",
    screen5_title: "Your lab starts now",
    screen5_text: "Create your first Levain Pet and let the app organize your fermentation.",
    screen5_button: "Create Levain",
  },
  paywall: {
    or_divider: 'OR',
  },
  language_switcher: {
    label: 'Change language'
  },
  ads: {
    advertisement: 'Advertisement'
  },
  help_page: {
    title: 'Help Page (Dough S.O.S.) - Under construction'
  },
  landing_page: {
    title: 'Landing Page - Under construction'
  },
  oven_modal: {
    name_required_alert: 'Oven name is required.'
  },
  levain_modal: {
    name_required_alert: 'Levain name is required.'
  },
  navigation: {
    home_aria: 'Home',
    menu: 'Menu',
    tools: {
      tech_references: 'Technical References',
      oven_analysis: 'Oven Analysis',
      toppings_combos: 'Toppings & Combos',
      doughbot: 'Massabo',
      pantry_pizza: 'Pantry Pizza'
    }
  },
  mylab_page: {
    overview: {
      title: 'MyLab Overview',
      subtitle: 'Your personal center to track and analyze your creations.',
      last_batch: 'Last Batch',
      most_used_style: 'Most Used Style',
      default_flour: 'Default Flour',
      no_batch: 'None',
      no_flour: 'None',
      next_experiment_title: 'Next Experiment',
      next_experiment_desc: 'Ready for a new batch? Head to the calculator to get started.',
      go_to_calculator: 'Go to Calculator'
    },
    header: {
      title: 'My Lab',
      subtitle: 'Your personal dough laboratory. Record, compare, understand, and evolve.',
      new_batch_button: 'Create New Dough'
    },
    last_batch_card: {
      title: 'Last Batch',
      redo_button: 'Redo in DoughLabPro',
      empty_state: 'You haven\'t saved any batches yet.'
    },
    learn_card: {
      title: 'Quick Learn',
      hydration_title: 'Hydration explained',
      hydration_desc: 'Understand how water transforms your dough.',
      ddt_title: 'Temperature Control (DDT)',
      ddt_desc: 'The secret to predictable fermentation.',
      steel_vs_stone_title: 'Steel vs. Stone',
      steel_vs_stone_desc: 'Which surface is best for your oven?',
      read_more: 'Read more'
    },
    recent_batches_card: {
      title: 'Recent Batches',
      empty_state: 'Your recent batches will appear here.',
      view_all: 'View all batches'
    },
    environment_card: {
      title: 'My Environment',
      ambient: 'Ambient',
      oven: 'Oven',
      surface: 'Surface',
      max_temp: 'Max Temp.',
      adjust_button: 'Adjust Environment',
      quick_tip: 'Quick Tip',
      suggestion_ny: 'Ideal combo for NY Style and adapted Neapolitan in a home oven.',
      suggestion_neapolitan: 'Perfect setup for authentic Neapolitan Pizza. Ensures the base doesn\'t burn.',
      suggestion_default: 'Adjust your environment to receive more accurate recipe suggestions.',
      select_placeholder: 'Select...',
    },
    recipes_page: {
      title: 'My Recipes',
      subtitle: 'Your collection of saved recipes and presets.',
      coming_soon: 'Coming soon: Manage your saved recipe presets for quick use in the calculator.'
    },
    flours_page: {
      title: 'My Flours',
      subtitle: 'Your personal library of flours, with notes on performance and hydration.',
      add: 'Add new flour',
    },
  },
};

// Portuguese Translations
const pt = {
  // NOTE: This is a partial translation. In a real app, all keys would be translated.
  // ... (translations omitted for brevity, assuming they exist) ...
  ...en, // Using English as a fallback for missing keys
  common: {
    ...en.common,
    edit: 'Editar',
    add: 'Adicionar',
    cancel: 'Cancelar',
    save: 'Salvar',
    save_changes: 'Salvar Alterações',
    delete: 'Excluir',
    load: 'Carregar',
    by: 'Por',
    back: 'Voltar',
    next: 'Avançar',
    finish: 'Finalizar',
    close: 'Fechar',
    details: 'Detalhes',
    explore: 'Explorar',
  },
  nav: {
    ...en.nav,
    lab: "Meu Lab",
    calculator: "Calculadora",
    learn: "Aprender",
    community: "CrustCrew",
    insights: "Insights",
    flours: "Farinhas",
    help: "Ajuda",
    references: "Referências",
    profile: "Perfil",
    tools: "Ferramentas"
  },
  user_menu: {
    ...en.user_menu,
    profile: "Perfil",
    settings: "Configurações Gerais",
    theme: "Tema",
    theme_light: "Claro",
    theme_dark: "Escuro",
    theme_system: "Sistema",
    language: "Idioma",
    help: "Ajuda",
    sign_out: "Sair",
    legal: "Assuntos Legais",
  },
  auth: {
    ...en.auth,
    sign_in: 'Entrar',
    modal_title: 'Acesse sua conta',
    modal_subtitle: 'Salve suas fornadas, fornos e mais.',
    continue_with_google: 'Continuar com Google',
    terms_notice: 'Ao continuar, você concorda com nossos Termos de Serviço.',
  },
  mode_toggle: {
    ...en.mode_toggle,
    basic: 'Modo Guiado',
    advanced: 'Modo Livre',
  },
};

// Spanish Translations
const es = {
  ...en, // Using English as a fallback
  common: {
    ...en.common,
    edit: 'Editar',
    add: 'Añadir',
    cancel: 'Cancelar',
    save: 'Guardar',
  },
  nav: {
    ...en.nav,
    calculator: "Calculadora",
    learn: "Aprender",
    community: "CrustCrew",
  },
};

const translations = { en, pt, es };

interface I18nContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: string, replacements?: { [key: string]: string | number | undefined }) => string;
}

const I18nContext = createContext<I18nContextType | undefined>(undefined);

// FIX: Added export to make I18nProvider available for import.
export const I18nProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [locale, setLocaleState] = useState<Locale>(() => {
    try {
      const storedLocale = localStorage.getItem('doughlab_locale');
      if (storedLocale && ['en', 'pt', 'es'].includes(storedLocale)) {
        return storedLocale as Locale;
      }
    } catch (error) {
      console.error('Failed to load locale from localStorage', error);
    }
    const browserLang = navigator.language.split('-')[0];
    return ['en', 'pt', 'es'].includes(browserLang) ? (browserLang as Locale) : 'en';
  });

  const setLocale = useCallback((newLocale: Locale) => {
    setLocaleState(newLocale);
    try {
      localStorage.setItem('doughlab_locale', newLocale);
    } catch (error) {
      console.error('Failed to save locale to localStorage', error);
    }
  }, []);

  const t = useCallback((key: string, replacements?: { [key: string]: string | number | undefined }): string => {
    const keyParts = key.split('.');
    let translation = (translations[locale] || translations.en) as any;
    
    for (const part of keyParts) {
      if (translation && typeof translation === 'object' && part in translation) {
        translation = translation[part];
      } else {
        // Fallback to English if key not found in current locale
        translation = translations.en as any;
        for (const part_en of keyParts) {
             if (translation && typeof translation === 'object' && part_en in translation) {
                translation = translation[part_en];
             } else {
                return (replacements as any)?.defaultValue ?? key;
             }
        }
        break;
      }
    }

    if (typeof translation !== 'string') {
        const defaultValue = (replacements as any)?.defaultValue;
        if (defaultValue !== undefined) return defaultValue;
        
        // Fallback for nested keys that don't resolve to a string
        let fallback_translation = translations.en as any;
         for (const part of keyParts) {
             if (fallback_translation && typeof fallback_translation === 'object' && part in fallback_translation) {
                fallback_translation = fallback_translation[part];
             } else {
                 return key;
             }
         }
         if(typeof fallback_translation === 'string') {
             translation = fallback_translation;
         } else {
             return key;
         }
    }

    if (replacements) {
      return Object.entries(replacements).reduce((acc, [k, v]) => {
        return acc.replace(new RegExp(`{${k}}`, 'g'), String(v));
      }, translation);
    }

    return translation;
  }, [locale]);

  return React.createElement(
    I18nContext.Provider,
    { value: { locale, setLocale, t } },
    children
  );
};

// FIX: Added export to make useTranslation hook available for import.
export const useTranslation = (): I18nContextType => {
  const context = useContext(I18nContext);
  if (context === undefined) {
    throw new Error('useTranslation must be used within an I18nProvider');
  }
  return context;
};
