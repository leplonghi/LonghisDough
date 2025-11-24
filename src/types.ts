

import React from 'react';
import { Timestamp } from "firebase/firestore";

export type Locale = 'en';

export enum BakeType {
  PIZZAS = 'PIZZAS',
  BREADS_SAVORY = 'BREADS_SAVORY',
  SWEETS_PASTRY = 'SWEETS_PASTRY',
}

export enum RecipeStyle {
  // --- PIZZAS ---
  NEAPOLITAN = 'NEAPOLITAN',
  NEW_YORK = 'NEW_YORK',
  PAN_PIZZA = 'PAN_PIZZA',
  CHICAGO_DEEP_DISH = 'CHICAGO_DEEP_DISH',
  ROMANA_TONDA = 'ROMANA_TONDA',
  SICILIANA = 'SICILIANA',
  GRANDMA_STYLE = 'GRANDMA_STYLE',
  DETROIT = 'DETROIT',
  ROMAN = 'ROMAN', // Teglia/Pala
  THIN_CRUST = 'THIN_CRUST',

  // --- BREADS & SAVORY ---
  PAO_FRANCES = 'PAO_FRANCES',
  BAGUETTE = 'BAGUETTE',
  CIABATTA = 'CIABATTA',
  PUMPERNICKEL = 'PUMPERNICKEL',
  RYE = 'RYE',
  PAO_DE_BATATA = 'PAO_DE_BATATA', // Potato Bread
  FOCACCIA = 'FOCACCIA',
  CHALLAH = 'CHALLAH',
  BAGEL = 'BAGEL',
  ENGLISH_MUFFIN = 'ENGLISH_MUFFIN',
  PITA = 'PITA',
  MASSA_PODRE = 'MASSA_PODRE',
  MASSA_ESFIHA = 'MASSA_ESFIHA',
  MASSA_TORTA = 'MASSA_TORTA',
  BURGER_BUN = 'BURGER_BUN',
  HOKKAIDO_MILK_BREAD = 'HOKKAIDO_MILK_BREAD',
  SOURDOUGH = 'SOURDOUGH',
  COUNTRY_LOAF = 'COUNTRY_LOAF',
  SANDWICH_LOAF = 'SANDWICH_LOAF',
  FLATBREAD = 'FLATBREAD',
  BRIOCHE = 'BRIOCHE',
  DINNER_ROLLS = 'DINNER_ROLLS',

  // --- NEW STYLES (BREADS) ---
  BREAD_RUSTIC_SOURDOUGH = 'BREAD_RUSTIC_SOURDOUGH',
  BREAD_BAGUETTE_CLASSIC = 'BREAD_BAGUETTE_CLASSIC',
  BREAD_SANDWICH_SOFT = 'BREAD_SANDWICH_SOFT',
  
  // --- NEW STYLES (ENRICHED) ---
  ENRICHED_BRIOCHE_CLASSIC = 'ENRICHED_BRIOCHE_CLASSIC',
  ENRICHED_DINNER_ROLL = 'ENRICHED_DINNER_ROLL',

  // --- NEW STYLES (BUNS) ---
  BURGER_BUN_BRIOCHE = 'BURGER_BUN_BRIOCHE',
  BURGER_BUN_POTATO = 'BURGER_BUN_POTATO',
  BURGER_BUN_SOFT = 'BURGER_BUN_SOFT',

  // --- SWEETS & PASTRY ---
  PATE_SUCREE = 'PATE_SUCREE',
  SABLEE = 'SABLEE',
  POUND_CAKE = 'POUND_CAKE',
  COOKIES = 'COOKIES',
  COOKIE_NY_CHOC_CHIP = 'COOKIE_NY_CHOC_CHIP',
  CINNAMON_ROLL = 'CINNAMON_ROLL',
  SWEET_ROLL = 'SWEET_ROLL',
  BABKA = 'BABKA',
  DONUT = 'DONUT',
  SHORTBREAD = 'SHORTBREAD',
  PIE_DOUGH = 'PIE_DOUGH',
  BOLO_SIMPLES = 'BOLO_SIMPLES',
  BROWNIE = 'BROWNIE',
  SWEETS_PASTRY = 'SWEETS_PASTRY',
  
  // --- NEW STYLES (PASTRY/COOKIES) ---
  PASTRY_CINNAMON_ROLL = 'PASTRY_CINNAMON_ROLL',
  PASTRY_DANISH = 'PASTRY_DANISH',
  COOKIE_CLASSIC_CHOC_CHIP = 'COOKIE_CLASSIC_CHOC_CHIP',
  COOKIE_BROWN_BUTTER = 'COOKIE_BROWN_BUTTER',
  COOKIE_SHORTBREAD = 'COOKIE_SHORTBREAD',

  // Legacy/Duplicate Handling
  NY_STYLE = 'NY_STYLE',
  SICILIAN = 'SICILIAN',
  CHICAGO = 'CHICAGO',
}

export enum FermentationTechnique {
  DIRECT = 'DIRECT',
  POOLISH = 'POOLISH',
  BIGA = 'BIGA',
  SOURDOUGH = 'SOURDOUGH',
  CHEMICAL = 'CHEMICAL',
  NO_FERMENT = 'NO_FERMENT',
}

export enum YeastType {
  IDY = 'IDY',
  ADY = 'ADY',
  FRESH = 'FRESH',
  SOURDOUGH_STARTER = 'SOURDOUGH_STARTER', 
  USER_LEVAIN = 'USER_LEVAIN', 
}

export enum AmbientTemperature {
  COLD = 'COLD', // e.g., < 18°C
  MILD = 'MILD', // e.g., 18-24°C
  HOT = 'HOT', // e.g., > 24°C
}

export enum OvenType {
    GAS = 'GAS',
    ELECTRIC = 'ELECTRIC',
    WOOD = 'WOOD',
    OONI = 'OONI',
    STONE_OVEN = 'STONE_OVEN',
    OTHER = 'OTHER'
}

export interface FlourDefinition {
  id: string;
  name: string;
  category: '00' | 'bread' | 'all_purpose' | 'whole' | 'other';
  strengthW?: number;
  protein?: number;
  recommendedUses: Array<'pizza' | 'bread' | 'focaccia' | 'general'>;
  hydrationHint?: {
    min?: number;
    max?: number;
  };
  notes?: string;
  referenceTag?: string;
}

export type Unit = 'g' | 'oz' | 'volume';

export enum UnitSystem {
  METRIC = 'METRIC',
  US_CUSTOMARY = 'US_CUSTOMARY',
}

export type CalculationMode = 'mass' | 'flour';

export interface IngredientConfig {
  id: string;
  name: string;
  type: 'solid' | 'liquid';
  bakerPercentage: number; // 100 = base flour
  densityKey?: string; // for volume conversion
  role?: 'flour' | 'water' | 'salt' | 'fat' | 'sugar' | 'yeast' | 'starter' | 'other';
  manualOverride?: boolean; // If true, sliders won't update this ingredient
}

export interface DoughConfig {
  bakeType: BakeType;
  recipeStyle: RecipeStyle;
  stylePresetId?: string;
  selectedStyleId?: string;
  baseStyleName?: string;
  flourId: string;
  ambientTemperature: AmbientTemperature;
  numPizzas: number;
  doughBallWeight: number;
  totalFlour?: number;
  
  // Legacy fields (kept for UI compatibility, but synced with ingredients)
  hydration: number;
  salt: number;
  oil: number;
  sugar?: number;
  
  // New Universal Model
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

export interface DoughIngredients {
  flour: number;
  water: number;
  salt: number;
  oil: number;
  sugar: number;
  yeast: number;
  [key: string]: number; // Allow dynamic ingredients
}

export interface DoughResult {
  totalFlour: number;
  totalWater: number;
  totalSalt: number;
  totalOil: number;
  totalSugar: number;
  totalYeast: number;
  totalDough: number;
  preferment?: {
    flour: number;
    water: number;
    yeast: number;
  };
  finalDough?: DoughIngredients;
  ingredientWeights?: Array<{
      id: string;
      name: string;
      weight: number;
      role?: string;
      bakerPercentage: number;
  }>;
}

export enum BatchStatus {
    DRAFT = 'DRAFT',
    PLANNED = 'PLANNED',
    IN_PROGRESS = 'IN_PROGRESS',
    COMPLETED = 'COMPLETED',
    FAILED = 'FAILED',
}

export interface Batch {
    id: string;
    name: string;
    doughConfig: DoughConfig;
    doughResult?: DoughResult | null;
    createdAt: string;
    updatedAt: string;
    rating?: number; // 1 to 5
    status: BatchStatus;
    notes?: string;
    photoUrl?: string; 
    isFavorite: boolean;
    isPublic?: boolean;
    bulkTimeHours?: number;
    proofTimeHours?: number;
    ovenType?: OvenType;
    styleId?: string; 
}

export type SavedDoughConfig = Batch;

export interface ProRecipe {
  nameKey: string;
  descriptionKey: string;
  config: Partial<DoughConfig>;
}

export enum Gender {
  MALE = 'MALE',
  FEMALE = 'FEMALE',
  OTHER = 'OTHER',
  PREFER_NOT_TO_SAY = 'PREFER_NOT_TO_SAY',
}

export interface User {
  name: string;
  email: string;
  avatar?: string;
  birthDate?: string;
  gender?: Gender;
  isPro?: boolean;
  plan?: 'free' | 'pro';
  trialEndsAt?: string | null; 
  stripeCustomerId?: string | null;
  stripeSubscriptionId?: string | null;
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

export type LevainStatus = "ativo" | "precisa_atencao" | "descanso" | "arquivado";

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

export interface Levain {
  id: string;
  name: string;
  hydration: number; 
  baseFlourType?: string;
  createdAt: string; 
  updatedAt?: string;
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

// Aliases for firebase compatibility
export type LevainStarter = Levain;
export interface LevainFeedingLog {
  id: string;
  levainId: string;
  dateTime: Timestamp;
  flourAmount: number;
  waterAmount: number;
  ratio?: string;
  flourType?: string;
  ambientTemperature?: number;
  notes?: string;
}

export type GoalStatus = "ativo" | "concluido";
export type GoalTargetType = "style" | "hydration" | "frequency" | "levain";

export interface Goal {
  id: string;
  title: string;
  description: string;
  status: GoalStatus;
  progress: number; 
  createdAt: string; 
  updatedAt: string; 
  targetType: GoalTargetType;
  targetValue: string | number;
}

export type TestSeriesVariable = "hydration" | "flour" | "fermentation_time" | "other";

export interface TestSeries {
  id: string;
  name: string;
  description: string;
  createdAt: string; 
  updatedAt: string; 
  parameters: {
    variable: TestSeriesVariable;
    steps: (string | number)[];
  };
  relatedBakes: string[]; 
}

export type PaywallOrigin = 'levain' | 'mylab' | 'calculator' | 'styles' | 'learn' | 'general';

// --- Styles System Extensions ---

export type StyleSource = "official" | "user_manual" | "user_ai";

export interface StyleOrigin {
    country: string;
    region?: string;
    period?: string;
}

export interface StyleTechnicalProfile {
    hydration: [number, number];
    salt: [number, number];
    oil?: [number, number]; // Range
    sugar?: [number, number]; // Range
    prefermentDescription?: string;
    flourStrength?: string; // e.g. "W280-320"
    fermentation?: {
        bulk: string;
        proof: string;
        coldRetard?: string;
    };
    ovenRecommendations?: string;
    difficulty: 'Easy' | 'Medium' | 'Hard' | 'Expert';
    recommendedUse: string;
}

export interface Reference {
  source: string;
  author?: string;
  year?: string;
  url?: string;
  notes?: string;
}

export type StyleCategory = "pizza" | "bread" | "enriched_bread" | "burger_bun" | "pastry" | "cookie" | "flatbread" | "other";

export interface DoughStyleDefinition {
    id: string;
    name: string; // Variant Name in UI
    family?: string; // Grouping key e.g. "Italian Rustic", "Viennoiserie"
    category: StyleCategory;
    
    // Expanded Metadata
    origin: StyleOrigin;
    history: string;
    culturalContext?: string;
    isCanonical: boolean;
    source: StyleSource;
    createdBy?: string; // UID if user-generated
    createdAt?: string | Timestamp;
    
    // Legacy fields maintained for compatibility
    country: string; 
    year?: string;
    releaseDate?: string; 
    description: string;
    isPro: boolean;
    recipeStyle?: RecipeStyle;
    
    technical: {
        hydration: number;
        salt: number;
        oil: number;
        sugar: number;
        fermentation: string; 
        fermentationTechnique: FermentationTechnique;
        bakingTempC: number;
    };

    technicalProfile?: StyleTechnicalProfile;
    references?: Reference[]; 
    allowedFermentationTechniques: FermentationTechnique[]; 
    defaultFermentationTechnique: FermentationTechnique;
    ingredients: IngredientConfig[];
    ingredientDetails?: IngredientConfig[];
    variations?: string[];
    risks?: string[];
    notes?: string[];
    tags?: string[];
}

export type DoughStylePreset = any; // Legacy alias

export interface UserContextType {
  isAuthenticated: boolean;
  user: User | null;
  login: (user: User) => void;
  logout: () => void;
  updateUser: (updatedData: Partial<User>) => void;
  
  // Entitlements & Paywall
  hasProAccess: boolean;
  grantProAccess: () => void;
  grantSessionProAccess: () => void;
  grant24hPass: () => void;
  isPassOnCooldown: boolean;
  cooldownHoursRemaining: number;
  isPaywallOpen: boolean;
  paywallOrigin: PaywallOrigin | null;
  openPaywall: (origin?: PaywallOrigin) => void;
  closePaywall: () => void;

  ovens: Oven[];
  addOven: (oven: Omit<Oven, 'id' | 'isDefault'>) => void;
  updateOven: (oven: Oven) => void;
  deleteOven: (id: string) => void;
  setDefaultOven: (id: string) => void;
  levains: Levain[];
  addLevain: (levain: Omit<Levain, 'id' | 'isDefault' | 'feedingHistory' | 'status' | 'createdAt'>) => void;
  updateLevain: (levain: Partial<Levain> & { id: string }) => void;
  deleteLevain: (id: string) => void;
  setDefaultLevain: (id: string) => void;
  addFeedingEvent: (levainId: string, event: Omit<FeedingEvent, 'id' | 'date'>) => void;
  importLevains: (levainsToImport: Levain[]) => void;
  
  // Styles Management
  userStyles: DoughStyleDefinition[];
  addUserStyle: (style: Omit<DoughStyleDefinition, 'id' | 'createdAt'>) => Promise<DoughStyleDefinition>;
  deleteUserStyle: (id: string) => Promise<void>;

  preferredFlourId: string | null;
  setPreferredFlour: (id: string | null) => void;
  batches: Batch[];
  addBatch: (newBatch: Omit<Batch, 'id' | 'createdAt' | 'updatedAt'>) => Promise<Batch>;
  updateBatch: (updatedBatch: Batch) => void;
  deleteBatch: (id: string) => void;
  createDraftBatch: () => Promise<Batch>;
  goals: Goal[];
  addGoal: (goal: Omit<Goal, 'id' | 'createdAt' | 'updatedAt' | 'status' | 'progress'>) => Promise<Goal>;
  updateGoal: (goal: Partial<Goal> & { id: string }) => void;
  deleteGoal: (id: string) => void;
  completeGoal: (id: string) => void;
  testSeries: TestSeries[];
  addTestSeries: (series: Omit<TestSeries, 'id' | 'createdAt' | 'updatedAt' | 'relatedBakes'>) => Promise<TestSeries>;
  updateTestSeries: (series: Partial<TestSeries> & { id: string }) => void;
  deleteTestSeries: (id: string) => void;
  attachBakeToSeries: (seriesId: string, bakeId: string) => void;
  customIngredientLibrary?: IngredientConfig[];
  addCustomIngredient?: (ing: IngredientConfig) => void;
}

export type FormErrors = {
  [key in keyof Partial<DoughConfig>]: string | null;
};

export type PrimaryPage = 'mylab' | 'calculator' | 'learn' | 'styles' | 'profile';

export type Page = string;

export interface NavLinkItem {
  id: Page;
  labelKey: string;
  path: string;
  icon?: React.ReactNode;
  section: 'main' | 'secondary';
  isDropdown?: boolean;
  requiresPro?: boolean;
}

export interface SmartAdjustmentSuggestion {
    key: keyof DoughConfig;
    value: number;
    message: string;
};

export interface SmartAdjustment {
    messages: string[];
    riskWarnings: string[];
    suggestions: SmartAdjustmentSuggestion[];
}

export type SmartAdjustmentResult = SmartAdjustment;

export interface AutoStyleInsightsResult {
  idealHydrationRange: string;
  idealFermentationRange: string;
  styleFitScore: number; // 0-100
  recommendedStyle: string | null;
  mismatchWarnings: string[];
  professionalNotes: string[];
}

export enum TutorialSection {
  FUNDAMENTALS = 'FUNDAMENTALS',
  FERMENTATION = 'FERMENTATION',
  ENVIRONMENT = 'ENVIRONMENT',
  INGREDIENTS = 'INGREDIENTS',
  TROUBLESHOOTING = 'TROUBLESHOOTING',
  TECHNIQUES = 'TECHNIQUES',
}

export interface Tutorial {
  id: string;
  section: TutorialSection;
  title: string;
  image: string;
  intro: string;
  why: string;
  howTo: string;
  tips: string[];
  reference: {
    name: string;
    url: string;
  };
  accessLevel: 'free' | 'pro';
  calculatorAction?: {
    mode: 'basic' | 'advanced';
    presetId?: string;
    yeastType?: YeastType;
  };
}

export interface ReferenceItem {
  id: string;
  source: string;
  title: string;
  type: 'Book' | 'Website' | 'Technical Guide' | 'Standard' | 'Community';
  link: string;
  summary: string;
  tags: string[];
}

export type AdviceOvenType = 'wood_fired' | 'gas_home' | 'electric_home' | 'portable_high_temp';
export type SurfaceType = 'steel' | 'stone' | 'biscotto' | 'pan';

export interface EnvironmentInput {
  ambientTemperatureC: number;
  flourTemperatureC?: number;
  targetDDT?: number;
  ovenType: AdviceOvenType;
  surfaceType?: SurfaceType;
  styleId?: RecipeStyle;
}

export interface EnvironmentAdvice {
  recommendedWaterTempC?: number;
  notes: string[];
  warnings: string[];
  recommendedBakeTempC?: number;
  recommendedBakeTimeSeconds?: [number, number];
  recommendedSurfaceOverride?: SurfaceType;
  flags?: Array<'STRICT_AVPN' | 'HOME_OVEN_COMPROMISE'>;
}

export interface CommunityBatch {
  id: string;
  ownerDisplayName: string;
  styleId?: RecipeStyle;
  title: string;
  description?: string;
  thumbnailUrl?: string;
  createdAt: string;
  baseConfig: DoughConfig;
  hydrationPercentage: number;
  ambientTemperatureC?: number;
  ovenType?: OvenType;
  surfaceType?: SurfaceType;
  ratingAverage?: number;
  ratingCount?: number;
  isFeatured?: boolean;
  tags?: string[];
  photoUrl?: string;
  likes?: number;
  commentCount?: number;
  bakingTempC?: number;
}

export interface InspirationBatch {
    id: string;
    name: string;
    config: Partial<DoughConfig>;
}

export interface CommunityMeta {
    likedBatchIds: string[];
    favoritedBatchIds: string[];
}

export interface MyLabEnvironmentSettings {
   ambientTempC?: number;
   ovenType?: 'HOME_ELECTRIC' | 'HOME_GAS' | 'PORTABLE_WFO' | 'WOOD_FIRED';
   bakingSurface?: 'STEEL' | 'STONE' | 'BISCOTTO' | 'TRAY';
   maxOvenTempC?: number;
}

export interface Suggestion {
  id: string;
  titleKey: string;
  descriptionKey: string;
  presetId: string;
}

export interface ChatMessage {
  role: 'assistant' | 'user' | 'error';
  content: string;
}

export interface UserInsights {
  totalBatches: number;
  batchesLast30Days: number;
  mostUsedStyles: { styleId: RecipeStyle; count: number }[];
  avgHydrationOverall?: number;
  avgHydrationByStyle?: { styleId: RecipeStyle; avgHydration: number }[];
  lastBatchDate?: string;
}

export interface Pattern {
  title: string;
  message: string;
  confidence: number; // 0-1
  rawValue?: number;
  meta?: any;
}

export interface GlobalInsights {
  avgHydration: number;
  mostUsedTechnique: {
    technique: FermentationTechnique;
    percentage: number;
  };
  avgRatingByFlour: { [flourId: string]: { avg: number; count: number } };
}

export interface Comparison {
  id: string;
  title: string;
  userValue: number | string;
  globalValue: number | string;
  message: string;
  type: 'percentage' | 'rating' | 'text';
}

export interface Badge {
  id: string;
  title: string;
  description: string;
  icon: string; // e.g., emoji or icon name
  achieved: boolean;
}

export interface Trophy {
  id: string;
  title: string;
  description: string;
  batchId?: string;
  batchName?: string;
}

export interface Streak {
  current: number;
  longest: number;
}

export interface TimelineDataPoint {
  month: string;
  avgRating: number;
}

export interface Recommendation {
  id: string;
  title: string;
  message: string;
}

export interface InsightsSummaryData {
  avgHydration: number;
  successRate: number;
  avgFermentationHours: number;
  batchesLast30Days: number;
}

export interface InsightsChartsData {
  hydrationHistory: { batch: number; hydration: number }[];
  stylesFrequency: { name: string; count: number }[];
  consistencyScore: number;
}

export interface InsightsData {
  summary: InsightsSummaryData;
  charts: InsightsChartsData;
  patterns: Pattern[];
  comparisons: Comparison[];
  streaks: Streak;
  badges: Badge[];
  trophies: Trophy[];
  timeline: TimelineDataPoint[];
  recommendations: Recommendation[];
}

export interface LeaderboardUser {
    rank: number;
    name: string;
    avatarUrl?: string;
    points: number;
    streak: number;
}

export interface OnboardingState {
  isActive: boolean;
  step: number;
}

export interface PizzaRecipe {
  id: string;
  name: string;
  image?: string;
  origin?: string;
  dough: {
    ballWeightG: number;
    hydration: number;
    styleId: string; 
  };
  oven: {
    tempC: number;
  };
  sauce: {
    type: 'Tomato' | 'White' | 'Pesto' | 'None' | 'Other';
    grams: number;
  };
  toppings: {
    main: string[];
    grams: number;
  };
  techniqueNotes?: string;
}

export interface ToppingSizeProfile {
  sizeCm: number;
  sauceGrams?: number;
  cheeseGrams?: number;
  toppingsGrams?: number;
  oilFinishGrams?: number;
}

export interface ToppingCombination {
  id: string;
  name: string;
  category: 'classic' | 'modern' | 'experimental';
  compatibleStyles: RecipeStyle[];
  sizes: ToppingSizeProfile[];
  notes: string;
  referenceTag?: string;
}

export type TechnicalPhase = 'PREP' | 'MIX' | 'AUTO' | 'KNEAD' | 'BULK' | 'DIVIDE' | 'PROOF' | 'BAKE' | 'COOL';

export interface TechnicalStep {
  id: string;
  order: number;
  phase: TechnicalPhase;
  title: string;
  durationLabel?: string;
  temperatureLabel?: string;
  actionInstructions: string;
  grandmaInstructions: string; // Simple, accessible language
  technicalExplanation?: string;
  proTip?: string;
  criticalPoint?: string;
  references?: string[];
}
