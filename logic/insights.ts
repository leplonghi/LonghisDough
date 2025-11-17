import { Batch, UserInsights, RecipeStyle } from '../types';

export function calculateUserInsights(batches: Batch[]): UserInsights {
  if (batches.length === 0) {
    return {
      totalBatches: 0,
      batchesLast30Days: 0,
      mostUsedStyles: [],
    };
  }

  const now = new Date();
  const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);

  const batchesLast30Days = batches.filter(
    (b) => new Date(b.createdAt) > thirtyDaysAgo,
  ).length;

  const styleCounts: Record<string, number> = {};
  const hydrationByStyle: Record<string, { total: number; count: number }> = {};
  let totalHydration = 0;

  for (const batch of batches) {
    const style = batch.doughConfig.recipeStyle;
    
    // Count styles
    styleCounts[style] = (styleCounts[style] || 0) + 1;

    // Aggregate hydration
    if (!hydrationByStyle[style]) {
      hydrationByStyle[style] = { total: 0, count: 0 };
    }
    hydrationByStyle[style].total += batch.doughConfig.hydration;
    hydrationByStyle[style].count += 1;
    totalHydration += batch.doughConfig.hydration;
  }

  const mostUsedStyles = Object.entries(styleCounts)
    .map(([styleId, count]) => ({ styleId: styleId as RecipeStyle, count }))
    .sort((a, b) => b.count - a.count);

  const avgHydrationByStyle = Object.entries(hydrationByStyle)
    .map(([styleId, data]) => ({
      styleId: styleId as RecipeStyle,
      avgHydration: data.total / data.count,
    }))
    .sort((a, b) => b.avgHydration - a.avgHydration);

  const avgHydrationOverall = totalHydration / batches.length;
  
  const sortedByDate = [...batches].sort((a,b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  return {
    totalBatches: batches.length,
    batchesLast30Days,
    mostUsedStyles,
    avgHydrationOverall,
    avgHydrationByStyle,
    lastBatchDate: sortedByDate[0]?.createdAt,
  };
}
