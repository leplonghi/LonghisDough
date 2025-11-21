
import { DoughConfig, RecipeStyle, FermentationTechnique } from '../types';
import { SHOP_PRODUCTS } from '../data/affiliateLinks';
import { isFreeUser } from '../lib/permissions'; // Corrigido para lib/permissions

export interface AffiliateSuggestion {
  id: string;
  title: string;
  description: string;
  linkUrl: string;
  icon?: 'tool' | 'oven' | 'book';
}

// Helper to get URL by ID
const getLink = (id: string) => {
  const product = SHOP_PRODUCTS.find(p => p.id === id);
  return product ? product.url : '/shop'; // Fallback to shop root
};

export function getAffiliateSuggestionsForConfig(config: DoughConfig): AffiliateSuggestion[] {
  const suggestions: AffiliateSuggestion[] = [];

  // 1. High Hydration Rule
  if (config.hydration >= 70) {
    suggestions.push({
      id: 'high_hydration_tools',
      title: 'High hydration dough?',
      description: 'Wet doughs are much easier to handle with a good stainless steel bench scraper.',
      linkUrl: getLink('dough_scraper'),
      icon: 'tool'
    });
  }

  // 2. Long Fermentation Rule (Cold Ferment or Biga/Poolish)
  const isIndirect = config.fermentationTechnique !== FermentationTechnique.DIRECT;
  // Simple heuristic: if yeast is very low (<0.1%) or explicitly using preferments
  if (isIndirect || config.yeastPercentage < 0.1) {
    suggestions.push({
      id: 'fermentation_control',
      title: 'Long fermentation control',
      description: 'Maintain consistent temperature and humidity for your preferments with a proofing box.',
      linkUrl: getLink('proofing_box'),
      icon: 'tool'
    });
  }

  // 3. Neapolitan Style Rule
  if (config.recipeStyle === RecipeStyle.NEAPOLITAN) {
    suggestions.push({
      id: 'neapolitan_heat',
      title: 'Baking Neapolitan Style',
      description: 'To achieve the authentic leopard spotting, you need temperatures above 450°C (850°F).',
      linkUrl: getLink('ooni_oven'),
      icon: 'oven'
    });
  }

  // 4. NY Style / Home Oven Rule
  if (config.recipeStyle === RecipeStyle.NEW_YORK || config.recipeStyle === RecipeStyle.PAN_PIZZA) {
     suggestions.push({
      id: 'home_oven_steel',
      title: 'Crispy base in a home oven',
      description: 'A baking steel conducts heat faster than stone, perfect for NY Style in domestic ovens.',
      linkUrl: getLink('baking_steel'),
      icon: 'oven'
    });
  }

  // 5. Precision Rule (Universal)
  // If we have room for one more and haven't suggested scale yet
  if (suggestions.length === 0) {
      suggestions.push({
          id: 'precision_scale',
          title: 'Precision is key',
          description: 'Ensure your hydration and yeast ratios are exact with a 0.1g precision scale.',
          linkUrl: getLink('scale_precision'),
          icon: 'tool'
      });
  }

  // Return max 2 suggestions to be non-intrusive
  return suggestions.slice(0, 2);
}

export function getAffiliateSuggestionsForTopic(topicTitle: string): AffiliateSuggestion | null {
    const title = topicTitle.toLowerCase();

    if (title.includes('forno') || title.includes('oven') || title.includes('assamento') || title.includes('heat')) {
        return {
            id: 'topic_oven',
            title: 'Upgrade your baking setup',
            description: 'See our curated list of baking steels, stones, and pizza ovens.',
            linkUrl: '/shop', // Directs to shop generally or specific anchor
            icon: 'oven'
        };
    }

    if (title.includes('ferment') || title.includes('levedura') || title.includes('yeast')) {
        return {
            id: 'topic_fermentation',
            title: 'Fermentation Control',
            description: 'Thermometers and proofing boxes help master the fermentation environment.',
            linkUrl: '/shop',
            icon: 'tool'
        };
    }

    if (title.includes('hidrat') || title.includes('water') || title.includes('água')) {
        return {
            id: 'topic_hydration',
            title: 'Handling Wet Dough',
            description: 'High hydration requires precise weighing and the right scrapers.',
            linkUrl: '/shop',
            icon: 'tool'
        };
    }

    // Default generic suggestion
    return {
        id: 'topic_generic',
        title: 'DoughLabPro Shop',
        description: 'Check out tools and ingredients recommended for this technique.',
        linkUrl: '/shop',
        icon: 'book'
    };
}
