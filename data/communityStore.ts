import { CommunityBatch, BakeType, DoughConfig, AmbientTemperature, FermentationTechnique, YeastType, RecipeStyle } from '../types';
import { DOUGH_STYLE_PRESETS } from '../constants';

const COMMUNITY_STORAGE_KEY = 'doughlabpro.community';

function getMockUser() {
    return { name: 'Chef D.' };
}

// Seed with some default data based on presets if the store is empty
export function seedDefaultCommunityBatchesIfEmpty() {
    const existing = getAllCommunityBatches();
    if (existing.length > 0) {
        return;
    }

    const user = getMockUser();
    const seedBatches: CommunityBatch[] = DOUGH_STYLE_PRESETS.slice(0, 4).map((preset) => {
        const config: DoughConfig = {
            hydration: preset.defaultHydration,
            salt: preset.defaultSalt,
            oil: preset.defaultOil,
            sugar: preset.defaultSugar || 0,
            recipeStyle: preset.recipeStyle,
// FIX: Corrected BakeType.PIZZA to BakeType.PIZZAS and BakeType.BREAD to BakeType.BREADS_SAVORY.
            bakeType: preset.type === BakeType.PIZZAS ? BakeType.PIZZAS : BakeType.BREADS_SAVORY,
            stylePresetId: preset.id,
            flourId: preset.preferredFlourProfileId || 'generic_all_purpose',
            ambientTemperature: AmbientTemperature.MILD,
            numPizzas: 4,
            doughBallWeight: 250,
            fermentationTechnique: FermentationTechnique.DIRECT,
            yeastType: YeastType.IDY,
            yeastPercentage: preset.defaultYeastPct || 0.4,
            prefermentFlourPercentage: 30,
            scale: 1,
            notes: preset.notes || '',
            levainId: null,
            bakingTempC: 280,
        };

        return {
            id: `seed_${preset.id}`,
            ownerDisplayName: user.name,
            title: `Exemplo: ${preset.name}`,
            description: preset.notes,
            createdAt: new Date().toISOString(),
            baseConfig: config,
            styleId: preset.recipeStyle,
            hydrationPercentage: preset.defaultHydration,
            isFeatured: true,
            ratingAverage: 4.5,
            ratingCount: Math.floor(Math.random() * 100),
            bakingTempC: 280,
        };
    });
    
    try {
        localStorage.setItem(COMMUNITY_STORAGE_KEY, JSON.stringify(seedBatches));
    } catch (error) {
        console.error("Failed to seed community batches:", error);
    }
}


export function getAllCommunityBatches(): CommunityBatch[] {
  try {
    const rawData = localStorage.getItem(COMMUNITY_STORAGE_KEY);
    return rawData ? JSON.parse(rawData) : [];
  } catch (error) {
    console.error('Failed to read community batches from localStorage:', error);
    return [];
  }
}

export function getCommunityBatchById(id: string): CommunityBatch | undefined {
    return getAllCommunityBatches().find(b => b.id === id);
}

export function saveCommunityBatch(batch: CommunityBatch) {
  const allBatches = getAllCommunityBatches();
  const existingIndex = allBatches.findIndex(b => b.id === batch.id);

  if (existingIndex > -1) {
    // Update existing batch
    allBatches[existingIndex] = batch;
  } else {
    // Add new batch
    allBatches.push(batch);
  }

  try {
    localStorage.setItem(COMMUNITY_STORAGE_KEY, JSON.stringify(allBatches));
  } catch (error) {
    console.error('Failed to save community batch to localStorage:', error);
  }
}

// Initialize with seed data on first load
seedDefaultCommunityBatchesIfEmpty();
