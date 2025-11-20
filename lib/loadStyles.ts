
import { OFFICIAL_STYLES } from '../data/officialStyles';
import { DoughStyle, DoughCategory } from '../types';

// The TS file already exports an array, but we cast it to ensure type alignment
const styles: DoughStyle[] = OFFICIAL_STYLES as unknown as DoughStyle[];

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
