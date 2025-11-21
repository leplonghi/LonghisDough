# DoughLabPro Technical Blueprint
**Generated based on current codebase analysis.**
**Date:** Current Session
**Scope:** All files in `src/` and root.

---

## 1. App Structure

### Root
- `index.html`: Application entry point. Imports Tailwind via CDN, Google Fonts, and `index.tsx`. Defines global styles for sliders and scrollbars. Import map for React/Firebase.
- `index.tsx`: React root mount. Wraps App in `ErrorBoundary` and `React.StrictMode`.
- `App.tsx`: Main application controller. Handles routing (hash-based), global state initialization checks, and high-level layout structure (Nav, Main, Footer).
- `types.ts`: Central type definitions for the entire domain (User, Batch, Config, etc.).
- `constants.ts`: Configuration constants (Presets, Yeast Options, Temp Guidelines).
- `i18n.ts`: Localization logic (en-US hardcoded fallback) and translation strings.
- `flours-constants.ts`: Static database of flour types.
- `pizzas-constants.ts`: Static database of pizza recipes.
- `toppings-constants.ts`: Static database of topping combinations.
- `learn-constants.ts`: Static database of learning tutorials.
- `references-constants.ts`: Static database of technical references.

### Contexts
- `contexts/AuthContext.tsx`: Handles Firebase Authentication (Google/Email) and maps Firebase User to AppUser. Handles "Dev Login" mocking.
- `contexts/FirebaseAuthProvider.tsx`: Wrapper to initialize Firebase Auth listener and ensure user document exists in Firestore.
- `contexts/UserProvider.tsx`: **God Object**. Manages all user data (Batches, Ovens, Levains, Goals, Series) via Firestore subscriptions. Handles entitlements/paywall logic locally.

### Firebase
- `firebase/app.ts`: Initializes Firebase App.
- `firebase/auth.ts`: Exports Auth instance and Google Provider.
- `firebase/config.ts`: Contains placeholders for API keys.
- `firebase/db.ts`: Exports Firestore instance.
- `firebase/levainPetStore.ts`: Standalone Firestore logic for `levainStarters` root collection (Note: Effectively unused by `UserProvider` which uses subcollections).
- `firebase/userDoc.ts`: Logic to ensure `/users/{uid}` document creation.

### Logic (Business Domain)
- `logic/affiliateSuggestions.ts`: Rules engine for suggesting affiliate products based on dough config.
- `logic/applySmartAdjustments.ts`: Logic to diff and apply `AutoStyleInsights` to `DoughConfig`.
- `logic/autoStyleAdvisor.ts`: Scoring system comparing Config vs. Style characteristics.
- `logic/customPresets.ts`: LocalStorage CRUD for user-defined dough presets.
- `logic/doughMath.ts`: **Core Engine**. Calculates dough formulas, preferments, and ingredient weights.
- `logic/environmentAdjustments.ts`: Logic to calculate DDT and surface adjustments (appears redundant with `environmentAdvisor.ts`).
- `logic/environmentAdvisor.ts`: Logic to generate advice based on oven/ambient inputs.
- `logic/flourMath.ts`: Weighted average calculations for flour blends (W, Protein).
- `logic/insights.ts`: Calculates user stats (hydration avg, most used style) from Batches.
- `logic/levainPetUtils.ts`: Helper to calculate Levain status (Active/Resting).
- `logic/mylabSelectors.ts`: Helpers to sort/filter batches and get suggestions.
- `logic/recipeStepsGenerator.ts`: Generates procedural recipe steps based on `DoughConfig`.
- `logic/smartAdjustments.ts`: Rule engine for warnings (e.g., "No oil in Neapolitan").

### Services
- `services/analytics.ts`: Mock analytics logger (console.log).
- `services/exportService.ts`: PDF (jspdf) and JSON export logic.
- `services/importService.ts`: JSON import validation and parsing.
- `services/levainDataService.ts`: JSON import/export for Levain data.
- `services/notifications.ts`: Mock notification scheduler.

### AI
- `ai/assistantClient.ts`: Client for Google GenAI (Gemini 2.5 Flash). Handles streaming chat.
- `ai/prompts.ts`: Prompt engineering (Persona, Safety Rules, Context injection).

### Components
- **Layout:** `Navigation`, `Footer`, `UserMenu`, `MobileSummaryBar`.
- **Core:** `CalculatorForm`, `ResultsDisplay`, `SliderInput`, `RecipeTimeline`.
- **Modals:** `AuthModal`, `PaywallModal`, `OvenModal`, `LevainModal`, `ImportReceitaModal`, `GoalModal`, `ConsistencySeriesModal`.
- **Cards/Tiles:** `AffiliateBlock`, `ProFeatureLock`, `ProBadge`.
- **Sub-features:** `Calculator/` (Ingredients, Blends, Insights), `Community/` (Feed, Create, Profile), `MyLab/` (Layouts), `Onboarding/` (Tooltips, Modals).

### Pages
- **Main:** `CalculatorPage`, `MyLabPage`, `CommunityPage`, `ShopPage`, `LearnPage`.
- **Detail:** `BatchDetailPage`, `CommunityBatchDetailPage`, `StyleDetailPage`.
- **MyLab Subpages:** `MeuLabFornadasPage`, `LevainListPage`, `LevainDetailPage`, `ObjectivesPage`, `ConsistencyListPage`, `ConsistencyDetailPage`.
- **Static/Info:** `FloursPage`, `ReferencesPage`, `ToppingsIndexPage`, `SettingsPage`, `ProfilePage`.
- **Legal:** `LegalIndexPage` (and subpages redirecting to it).
- **Tools:** `OvenAnalysisPage`, `DoughbotPage`, `PantryPizzaPage` (Tools).

---

## 2. Routing Map (Client-Side Hash Routing)

Implemented in `App.tsx`.

| Route | Component | Contexts Used | Notes |
| :--- | :--- | :--- | :--- |
| `calculator` (default) | `CalculatorPage` | UserContext | Main tool. Handles Onboarding. |
| `mylab` | `MyLabPage` | UserContext | Dashboard. Pro gated UI elements. |
| `mylab/fornadas` | `MeuLabFornadasPage` | UserContext | List of user batches. |
| `mylab/levain` | `LevainListPage` | UserContext | List of levains. |
| `mylab/levain/detail/{id}` | `LevainDetailPage` | UserContext | Levain details & feeding log. |
| `mylab/levain-pet` | `MeuLabLevainPetPage` | - | Placeholder. |
| `mylab/receitas` | `MeuLabReceitasPage` | - | Placeholder/Import UI. |
| `mylab/receitas/comparar` | `CompareReceitasPage` | UserContext | Compare 2 batches via query params. |
| `mylab/farinhas` | `MeuLabFarinhasPage` | - | Placeholder. |
| `mylab/diario-sensorial` | `MeuLabDiarioSensorialPage` | - | Placeholder. |
| `mylab/comparacoes` | `MeuLabComparacoesPage` | UserContext | Selection UI for comparison. |
| `mylab/insights` | `MeuLabInsightsPage` | - | Links to other sections. |
| `mylab/timeline` | `TimelinePage` | UserContext | Combined timeline of Batches + Levain events. |
| `mylab/objetivos` | `ObjectivesPage` | UserContext | Goal tracking. |
| `mylab/consistency` | `ConsistencyListPage` | UserContext | List test series. |
| `mylab/consistency/detail/{id}`| `ConsistencyDetailPage` | UserContext | Series details + linked batches. |
| `styles` | `DoughStylesPage` | UserContext | List of presets (`stylesData`). |
| `styles/detail/{id}` | `StyleDetailPage` | UserContext | Detailed style view. |
| `learn` | `LearnPage` | - | Knowledge base hub. |
| `learn/*` | (Various Subpages) | - | Static technical content. |
| `shop` | `ShopPage` | - | Affiliate links. |
| `community` | `CommunityPage` | UserContext | Feed of batches (LocalStorage). |
| `community/{id}` | `CommunityBatchDetailPage`| UserContext | View community batch details. |
| `batch/{id}` | `BatchDetailPage` | UserContext | View/Edit user batch. |
| `flours` | `FloursPage` | UserContext | Static flour list + User preference. |
| `references` | `ReferencesPage` | - | Static references. |
| `tools-oven-analysis` | `OvenAnalysisPage` | - | Tool placeholder. |
| `tools-doughbot` | `DoughbotPage` | - | Tool placeholder. |
| `profile` | `ProfilePage` | UserContext, Auth | User profile management. |
| `plans` | `PlansPage` | UserContext | Upgrade UI. |
| `settings` | `SettingsPage` | - | Unit system toggles. |
| `pro/activated` | `ProActivatedPage` | UserContext | Success screen. |
| `legal/*` | `LegalIndexPage` | - | Unified legal docs. |

---

## 3. Global Contexts

### `AuthProvider` (`contexts/AuthContext.tsx`)
- **State:** `firebaseUser` (Raw Firebase), `appUser` (Mapped AppUser), `loading`.
- **Functions:** `loginWithGoogle`, `loginWithEmail`, `registerWithEmail`, `logout`, `devLogin` (Mock).
- **Logic:** Listens to Firebase Auth state. Fetches `/users/{uid}` from Firestore to augment user data (roles, pro status). Maps Admin emails to Pro/Admin roles.

### `FirebaseAuthProvider` (`contexts/FirebaseAuthProvider.tsx`)
- **State:** `firebaseUser`, `isLoading`.
- **Logic:** Initializes Firebase Auth listener. Calls `ensureUserDocument` to create Firestore doc on first login.

### `UserProvider` (`contexts/UserProvider.tsx`)
- **State:** Mirrors Firestore collections locally (`batches`, `ovens`, `levains`, `goals`, `testSeries`). Holds `userSettings` (LocalStorage). Holds `entitlements` (Paywall state).
- **Functions:** CRUD for all data types (Add/Update/Delete Batch, Oven, Levain, etc.).
- **Sync:** Subscribes to `users/{uid}/{collection}` for real-time updates.
- **Paywall:** Manages `isPaywallOpen`, `paywallOrigin`, `grantProAccess`, `grantSessionProAccess`.
- **Dev Mode:** If `uid` starts with `dev-`, bypasses Firestore and uses in-memory state.

---

## 4. Data Models (`types.ts` & Code Analysis)

### Key Interfaces
- **DoughConfig:** Core recipe state (`hydration`, `salt`, `flourId`, `ingredients[]`, `fermentationTechnique`, `yeastType`, etc.).
- **DoughResult:** Calculated output (`totalFlour`, `totalWater`, `preferment`, `finalDough`).
- **Batch:** A saved bake (`id`, `name`, `doughConfig`, `doughResult`, `status`, `notes`, `rating`, `ovenType`).
- **Levain:** Starter profile (`id`, `hydration`, `feedingHistory[]`, `status`).
- **Oven:** User equipment (`id`, `maxTemperature`, `hasStone`, `type`).
- **Goal:** User objective (`targetType`, `targetValue`, `progress`).
- **TestSeries:** Experiments (`parameters`, `relatedBakes[]`).
- **CommunityBatch:** Flattened/Adapted batch for public feed.

### Enums
- `BakeType`: PIZZAS, BREADS_SAVORY, SWEETS_PASTRY.
- `RecipeStyle`: NEAPOLITAN, NEW_YORK, etc.
- `YeastType`: IDY, ADY, FRESH, SOURDOUGH_STARTER, USER_LEVAIN.
- `FermentationTechnique`: DIRECT, POOLISH, BIGA.

---

## 5. Firestore Schema (Reconstructed)

Based on `UserProvider.tsx` subscriptions:

**Root Collection:** `users`
- **Document:** `{uid}`
  - Fields: `uid`, `email`, `displayName`, `isPro`, `plan`, `trialEndsAt`.
  - **Subcollection:** `batches` (Docs: `Batch` object)
  - **Subcollection:** `ovens` (Docs: `Oven` object)
  - **Subcollection:** `levains` (Docs: `Levain` object including `feedingHistory` array)
  - **Subcollection:** `goals` (Docs: `Goal` object)
  - **Subcollection:** `testSeries` (Docs: `TestSeries` object)

**Note:** `communityStore.ts` uses **LocalStorage** (`doughlabpro.community`), NOT Firestore. The Community feature is currently local-simulation only or shared via non-backend means in this codebase version.

---

## 6. Module Specifications (Implementation Reality)

### Calculator Module
- **Inputs:** `CalculatorForm` (Sliders/Inputs). Handles Mode (Basic/Advanced).
- **Logic:** `calculateDoughUniversal` in `doughMath.ts`. Normalizes legacy fields into `ingredients` array. Handles blends via `FlourBlendEditor`.
- **Output:** `ResultsDisplay`. Shows weights/volumes. Generates `RecipeTimeline`.
- **Persist:** "Save Bake" creates a `Batch` in Firestore.

### My Lab Module
- **Dashboard:** Aggregates data from contexts.
- **Levain:** Tracks starter health. Health score calculated in `LevainInsights` based on feeding frequency/recency.
- **Consistency:** Creates `TestSeries`. Allows attaching `Batches` to a series.
- **Timeline:** Merges Batch creation + Levain logs into a linear time view.

### Styles Module
- **Source:** `stylesData.ts` (Hardcoded array of `DoughStyleDefinition`).
- **Flow:** Browse -> Select -> "Load in Calculator".
- **Pro:** Some styles marked `isPro: true`.

### Community Module
- **Storage:** LocalStorage (`communityStore.ts`).
- **Flow:** `BatchDetailPage` -> "Publish" -> Saves to LS. `CommunityPage` reads from LS.
- **Note:** No real backend social features implemented.

### AI Module
- **Client:** `assistantClient.ts` calls Google Gemini API.
- **Context:** Injects `doughConfig`, `lastBatch`, `oven`, `flour` into system prompt via `buildContextPrompt`.
- **UI:** `AssistantPage` (Floating chat). Supports streaming response.

---

## 7. Paywall & Subscription Logic
- **Gating:** Implemented via `isProUser` check (Plan='pro' or `isPro` flag or valid trial).
- **Locks:** `ProFeatureLock` component blurs content or blocks buttons.
- **Triggers:** `openPaywall(origin)` sets global state to show `PaywallModal`.
- **Simulated Flow:** `PaywallModal` -> "Subscribe" -> `grantProAccess` (updates local state/Firestore `isPro=true`). No real Stripe integration found in `UserProvider`, only fields in `userDoc`.

---

## 8. Known Issues / TODOs detected
- `LevainFormPage.tsx`: Placeholder content.
- `ToppingsEvaluatorPage.tsx`: "Coming soon".
- `OvenAnalysisPage.tsx`: Logic labeled "TODO".
- `DoughbotPage.tsx`: Logic labeled "TODO".
- `PantryPizzaPage.tsx`: Logic labeled "Placeholder".
- `communityStore.ts`: Uses LocalStorage, mocking a backend.
- `importService.ts`: Basic JSON validation.
- `UserProvider.tsx`: `userSettings` stored in LocalStorage, not Firestore.
- `i18n.ts`: Hardcoded to 'en', `setLocale` is no-op.
