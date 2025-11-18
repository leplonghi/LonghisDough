import React from 'react';
import { Timestamp } from "firebase/firestore";

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

  // --- BREADS & SAVORY ---
  PAO_FRANCES = 'PAO_FRANCES',
  BAGUETTE = 'BAGUETTE',
  CIABATTA = 'CIABATTA',
  PUMPERNICKEL = 'PUMPERNICKEL',
  RYE = 'RYE',
  PAO_DE_BATATA = 'PAO_DE_BATATA',
  FOCACCIA = 'FOCACCIA',
  CHALLAH = 'CHALLAH',
  BAGEL = 'BAGEL',
  ENGLISH_MUFFIN = 'ENGLISH_MUFFIN',
  PITA = 'PITA',
  MASSA_PODRE = 'MASSA_PODRE',
  MASSA_ESFIHA = 'MASSA_ESFIHA',
  MASSA_TORTA = 'MASSA_TORTA',

  // --- SWEETS & PASTRY ---
  PATE_SUCREE = 'PATE_SUCREE',
  SABLEE = 'SABLEE',
  POUND_CAKE = 'POUND_CAKE',
  COOKIES = 'COOKIES',
  PIE_DOUGH = 'PIE_DOUGH',
  BOLO_SIMPLES = 'BOLO_SIMPLES',
  
  // Kept for potential compatibility with old saved data
  ROMAN = 'ROMAN', // Replaced by more specific Romana Tonda
  THIN_CRUST = 'THIN_CRUST',
  COUNTRY_LOAF = 'COUNTRY_LOAF',
  SANDWICH_LOAF = 'SANDWICH_LOAF',
  FLATBREAD = 'FLATBREAD',
  DETROIT = 'DETROIT',
  NY_STYLE = 'NY_STYLE',
  SICILIAN = 'SICILIAN',
  CHICAGO = 'CHICAGO',
  SOURDOUGH = 'SOURDOUGH',
  BRIOCHE = 'BRIOCHE',
}

export enum FermentationTechnique {
  DIRECT = 'DIRECT',
  POOLISH = 'POOLISH',
  BIGA = 'BIGA',
}

export enum YeastType {
  IDY = 'IDY',
  ADY = 'ADY',
  FRESH = 'FRESH',
  SOURDOUGH_STARTER = 'SOURDOUGH_STARTER', // Represents a generic 100% hydration starter
  USER_LEVAIN = 'USER_LEVAIN', // Represents a user-defined starter from their profile
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

export interface DoughConfig {
  bakeType: BakeType;
  recipeStyle: RecipeStyle;
  stylePresetId?: string; // ID of the preset this config was based on
  flourId: string;
  ambientTemperature: AmbientTemperature;
  numPizzas: number;
  doughBallWeight: number;
  totalFlour?: number;
  hydration: number;
  salt: number;
  oil: number;
  sugar?: number; // Optional sugar percentage
  fermentationTechnique: FermentationTechnique;
  yeastType: YeastType;
  yeastPercentage: number;
  prefermentFlourPercentage: number;
  scale: number;
  notes: string;
  levainId?: string | null; // ID of the user's levain if yeastType is USER_LEVAIN
  bakingTempC: number;
}

export interface DoughIngredients {
  flour: number;
  water: number;
  salt: number;
  oil: number;
  sugar: number;
  yeast: number;
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
    photoUrl?: string; // for future use
    isFavorite: boolean;
    isPublic?: boolean;
    // Added for insights calculation
    bulkTimeHours?: number;
    proofTimeHours?: number;
    ovenType?: OvenType;
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

// Levain / Sourdough Starter Types
export interface FeedingEvent {
  id: string;
  date: string; // ISO String
  flourAmount: number; // in grams
  waterAmount: number; // in grams
  flourType?: string;
  ratio?: string; // e.g., "1:2:2"
  ambientTemperature?: number;
  notes?: string;
}

export interface Levain {
  id: string;
  name: string;
  hydration: number; // in percentage
  baseFlourType?: string;
  createdAt: string; // ISO String
  lastFeeding: string; // ISO String
  totalWeight: number; // in grams
  isDefault: boolean;
  status: LevainStatus;
  typicalUse?: string;
  notes?: string; // sensory notes
  feedingHistory: FeedingEvent[];
  // New fields for notifications
  notificationEnabled?: boolean;
  idealFeedingIntervalHours?: number;
}

// Goals Module
export type GoalStatus = "ativo" | "concluido";
export type GoalTargetType = "estilo" | "hidratação" | "frequência" | "levain";

export interface Goal {
  id: string;
  title: string;
  description: string;
  status: GoalStatus;
  progress: number; // 0-100
  createdAt: string; // ISO String
  updatedAt: string; // ISO String
  targetType: GoalTargetType;
  targetValue: string | number;
}

// Consistency Mode Module
export type TestSeriesVariable = "hidratação" | "farinha" | "tempo_fermentacao" | "outro";

export interface TestSeries {
  id: string;
  name: string;
  description: string;
  createdAt: string; // ISO String
  updatedAt: string; // ISO String
  parameters: {
    variable: TestSeriesVariable;
    steps: (string | number)[];
  };
  relatedBakes: string[]; // Array of Batch IDs
}

export interface UserContextType {
  isAuthenticated: boolean;
  user: User | null;
  login: (user: User) => void;
  logout: () => void;
  updateUser: (updatedData: Partial<User>) => void;
  hasProAccess: boolean;
  grantProAccess: () => void;
  grantSessionProAccess: () => void;
  grant24hPass: () => void;
  isPassOnCooldown: boolean;
  cooldownHoursRemaining: number;
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
  preferredFlourId: string | null;
  setPreferredFlour: (id: string | null) => void;
  batches: Batch[];
  addBatch: (newBatch: Omit<Batch, 'id' | 'createdAt' | 'updatedAt'>) => Batch;
  updateBatch: (updatedBatch: Batch) => void;
  deleteBatch: (id: string) => void;
  createDraftBatch: () => Batch;
  goals: Goal[];
  addGoal: (goal: Omit<Goal, 'id' | 'createdAt' | 'updatedAt' | 'status' | 'progress'>) => Goal;
  updateGoal: (goal: Partial<Goal> & { id: string }) => void;
  deleteGoal: (id: string) => void;
  completeGoal: (id: string) => void;
  testSeries: TestSeries[];
  addTestSeries: (series: Omit<TestSeries, 'id' | 'createdAt' | 'updatedAt' | 'relatedBakes'>) => TestSeries;
  updateTestSeries: (series: Partial<TestSeries> & { id: string }) => void;
  deleteTestSeries: (id: string) => void;
  attachBakeToSeries: (seriesId: string, bakeId: string) => void;
}


export type Locale = 'en' | 'pt' | 'es';

export type FormErrors = {
  [key in keyof Partial<DoughConfig>]: string | null;
};

// Represents the main pages accessible via the primary navigation
export type PrimaryPage = 'mylab' | 'calculator' | 'learn' | 'community';

// Represents all possible pages/views in the app
export type Page =
  | PrimaryPage
  | 'lab'
  | 'flours'
  | 'help'
  | 'references'
  | 'profile'
  | 'plans'
  | 'landing'
  | 'batch'
  | `batch/${string}`
  | `community/${string}`
  | 'mylab/levain'
  | `mylab/levain/${string}`
  | 'mylab/levain/detail' // Synthetic route for detail page
  | 'mylab/receitas'
  | 'mylab/receitas/comparar'
  | 'mylab/massas'
  | 'mylab/farinhas'
  | 'mylab/fornadas'
  | 'mylab/diario-sensorial'
  | 'mylab/comparacoes'
  | 'mylab/insights'
  | 'mylab/timeline'
  | 'mylab/objetivos'
  | 'mylab/consistency'
  | 'mylab/consistency/detail' // Synthetic route
  | `mylab/consistency/${string}` // Actual URL pattern
  | 'mylab/levain-pet'
  | 'usermenu'
  | 'pizzas'
  | 'breads-and-savory'
  | 'sweets-and-pastry'
  | 'tools-oven-analysis'
  | 'tools-doughbot'
  | 'tools-pantry-pizza'
  | 'settings'
  | 'settings/theme'
  | 'settings/language'
  | 'legal'
  | 'legal/terms'
  | 'legal/privacy'
  | 'legal/cookies'
  | 'legal/eula'
  | 'legal/ip'
  | 'legal/contact'
  | 'learn/techniques'
  | 'learn/fermentation'
  | 'learn/preferments'
  | 'learn/dough-science'
  | 'learn/troubleshooting'
  | 'learn/ingredients'
  | 'learn/chemistry-library'
  | 'learn/style-guide'
  | 'learn/glossary'
  | 'learn/oven-science'
  | 'learn/sensory-guide'
  | 'learn/temperature-control'
  | 'learn/storage'
  | 'learn/hygiene-safety'
  | 'learn/equipment'
  | 'learn/oven-spring'
  | 'learn/fermentation-biochemistry'
  | 'learn/crumb-structure'
  | 'learn/dough-aging'
  | 'learn/ambient-vs-cold-fermentation'
  | 'learn/mixing-techniques'
  | 'learn/balling-technique'
  | 'learn/sensory-maturation'
  | 'learn/parbaking'
  | 'learn/water'
  | 'learn/salt'
  | 'learn/sugars-malts-enzymes'
  | 'learn/fats'
  | 'learn/tomato-preservation'
  | 'learn/white-sauces'
  | 'learn/special-sauces'
  | 'learn/low-moisture-cheeses'
  | 'learn/smoked-cheeses'
  | 'learn/cured-meats'
  | 'learn/smoked-aromatics'
  | 'learn/water-rich-vegetables'
  | 'learn/caramelizable-vegetables'
  | 'learn/regional-combos'
  | 'learn/sensory-profiles'
  | 'learn/ingredients/flours'
  | 'learn/ingredients/yeasts'
  | 'learn/ingredients/cheeses'
  | 'learn/ingredients/meats'
  | 'learn/ingredients/vegetables'
  | 'learn/ingredients/sauces'
  | 'learn/ingredients/oils-spices'
  | 'learn/ingredients/oils'
  | 'learn/ingredients/herbs-spices'
  | 'learn/ingredients/classic-combos'
  | 'learn/ingredients/bold-combos'
  | 'learn/ingredients/pairing-tool'
  | 'learn/ingredients/ready-toppings'
  | 'learn/fundamentals'
  | 'learn/methods'
  | 'learn/critical-ingredients'
  | 'learn/ovens-heat'
  | 'learn/troubleshooting-guide';


export interface NavLinkItem {
  id: Page;
  labelKey: string;
  path: string;
  icon?: React.ReactNode;
  section: 'main' | 'secondary';
  isDropdown?: boolean;
  requiresPro?: boolean;
}


export interface DoughStylePreset {
  id: string;
  name: string;
  type: BakeType;
  recipeStyle: RecipeStyle;
  defaultHydration: number;
  defaultSalt: number;
  defaultOil: number;
  defaultSugar?: number;
  defaultYeastPct?: number;
  recommendedRange?: {
    hydrationMin?: number;
    hydrationMax?: number;
    saltMin?: number;
    saltMax?: number;
  };
  // Enriched fields for advisor
  preferredFlourProfileId?: string;
  recommendedFermentationHours?: { min: number; max: number; };
  recommendedOvenType?: AdviceOvenType;
  recommendedSurfaceType?: SurfaceType;
  regulatoryStrict?: boolean;
  notes?: string;
  referenceTag?: string;
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

// Learn Page
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

// References Page
export interface ReferenceItem {
  id: string;
  source: string;
  title: string;
  type: 'Livro' | 'Site' | 'Guia Técnico' | 'Regulamento Oficial' | 'Comunidade';
  link: string;
  summary: string;
  tags: string[];
}

// Environment Advisor Types
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

// Community
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

export interface CommunityFilterState {
  styleId?: RecipeStyle | 'ALL';
  minHydration?: number;
  maxHydration?: number;
  ovenType?: AdviceOvenType | 'ALL';
  searchTerm?: string;
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

// Insights Page Types
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
  category: string;
  compatibleStyles: RecipeStyle[];
  sizes: ToppingSizeProfile[];
  notes: string;
  referenceTag: string;
}

export interface ToppingSuggestion extends ToppingCombination {
  closestSizeProfile: ToppingSizeProfile;
}

export interface LeaderboardUser {
    rank: number;
    name: string;
    avatarUrl?: string;
    points: number;
    streak: number;
}

export interface LevainStarter {
    id: string;
    userId: string;
    name: string;
    flourType: string;
    hydrationTarget: number;
    createdAt: Timestamp;
    updatedAt: Timestamp;
    typicalUse: string;
    notes?: string;
    status: "ativo" | "precisa_atencao" | "descanso" | "arquivado";
}

export interface LevainFeedingLog {
    id: string;
    levainId: string;
    dateTime: Timestamp;
    ratio: string;
    flourType: string;
    ambientTemperature?: number;
    volumeIncrease?: string | number;
    notes?: string;
}

export interface OnboardingState {
  isActive: boolean;
  step: number;
}

export interface PizzaRecipe {
  id: string;
  name: string;
  // FIX: Add missing properties to align with usage in `ToppingsIndexPage`.
  image?: string;
  origin?: string;
  dough: {
    ballWeightG: number;
    hydration: number;
    styleId: string; // Corresponds to DoughStylePreset id
  };
  oven: {
    tempC: number;
  };
  sauce: {
    type: 'Tomate' | 'Branco' | 'Pesto' | 'Nenhum' | 'Outro';
    grams: number;
  };
  toppings: {
    main: string[];
    grams: number;
  };
  techniqueNotes?: string;
}
