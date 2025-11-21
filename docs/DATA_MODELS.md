# Data Models

## Core Entities

```typescript
export interface User {
  uid: string;
  name: string;
  email: string | null;
  displayName: string | null;
  avatar?: string;
  birthDate?: string;
  gender?: Gender;
  role: UserRole;
  plan: SubscriptionPlan;
  isPro: boolean;
  trialEndsAt: string | null;
}

export interface DoughConfig {
  bakeType: BakeType;
  recipeStyle: RecipeStyle;
  stylePresetId?: string;
  baseStyleName?: string;
  flourId: string;
  ambientTemperature: AmbientTemperature;
  numPizzas: number;
  doughBallWeight: number;
  totalFlour?: number;
  hydration: number;
  salt: number;
  oil: number;
  sugar?: number;
  ingredients?: IngredientConfig[];
  fermentationTechnique: FermentationTechnique;
  yeastType: YeastType;
  yeastPercentage: number;
  prefermentFlourPercentage: number;
  scale: number;
  notes: string;
  levainId?: string | null;
  bakingTempC: number;
}

export interface DoughResult {
  totalFlour: number;
  totalWater: number;
  totalSalt: number;
  totalOil: number;
  totalSugar: number;
  totalYeast: number;
  totalDough: number;
  preferment?: { flour: number; water: number; yeast: number };
  finalDough?: DoughIngredients;
  ingredientWeights?: Array<{ id: string; name: string; weight: number; role?: string; bakerPercentage: number }>;
}

export interface Batch {
  id: string;
  name: string;
  doughConfig: DoughConfig;
  doughResult?: DoughResult | null;
  createdAt: string;
  updatedAt: string;
  rating?: number;
  status: BatchStatus;
  notes?: string;
  photoUrl?: string;
  isFavorite: boolean;
  isPublic?: boolean;
  bulkTimeHours?: number;
  proofTimeHours?: number;
  ovenType?: OvenType;
}

export interface Levain {
  id: string;
  name: string;
  hydration: number;
  baseFlourType?: string;
  createdAt: string;
  lastFeeding: string;
  totalWeight: number;
  isDefault: boolean;
  status: LevainStatus;
  typicalUse?: string;
  notes?: string;
  feedingHistory: FeedingEvent[];
  notificationEnabled?: boolean;
  idealFeedingIntervalHours?: number;
}

export interface FeedingEvent {
  id: string;
  date: string;
  flourAmount: number;
  waterAmount: number;
  flourType?: string;
  ratio?: string;
  ambientTemperature?: number;
  notes?: string;
}

export interface Oven {
  id: string;
  name: string;
  type: OvenType;
  maxTemperature: number;
  hasStone: boolean;
  hasSteel: boolean;
  isDefault: boolean;
  notes?: string;
}
```

## Enums

- **BakeType:** PIZZAS, BREADS_SAVORY, SWEETS_PASTRY.
- **RecipeStyle:** NEAPOLITAN, NEW_YORK, PAN_PIZZA, CHICAGO_DEEP_DISH, ROMANA_TONDA, SICILIANA, GRANDMA_STYLE, PAO_FRANCES, BAGUETTE, CIABATTA, etc.
- **FermentationTechnique:** DIRECT, POOLISH, BIGA.
- **YeastType:** IDY, ADY, FRESH, SOURDOUGH_STARTER, USER_LEVAIN.
- **OvenType:** GAS, ELECTRIC, WOOD, OONI, STONE_OVEN, OTHER.
- **BatchStatus:** DRAFT, PLANNED, IN_PROGRESS, COMPLETED, FAILED.
