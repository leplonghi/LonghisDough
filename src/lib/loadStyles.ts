
import officialStyles from '../data/official_styles.json';
import { DoughStyle, DoughCategory } from '../types';

// Force cast to DoughStyle[] because JSON import inference can be tricky with specific types/enums
const styles: DoughStyle[] = officialStyles as unknown as DoughStyle[];

export function loadAllStyles(): DoughStyle[] {
  return styles;
}

export function loadStyleBySlug(slug: string): DoughStyle | undefined {
  return styles.find((s) => s.slug === slug);
}

export function getStylesByAccessTier(tier: 'free' | 'pro' | 'coming_next'): DoughStyle[] {
  return styles.filter((s) => s.accessTier === tier);
}

export function getStylesByCategory(category: DoughCategory | string): DoughStyle[] {
  return styles.filter((s) => s.category.toLowerCase() === category.toLowerCase());
}
