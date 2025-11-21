# App Flows

## 1. New Dough Calculation
1. User lands on **CalculatorPage**.
2. Selects **Style** (e.g., Neapolitan) -> Loads presets.
3. Adjusts **Quantity** (Pizzas/Weight).
4. Adjusts **Hydration/Salt/Yeast**.
5. `doughMath.ts` recalculates `DoughResult` instantly.
6. User clicks **Save Bake**.
7. **Auth Check:** If not logged in -> `AuthModal`.
8. **Pro Check:** If free user limits reached (hypothetically, currently soft limits) -> `PaywallModal`.
9. **Save:** Creates `Batch` in Firestore `users/{uid}/batches`.
10. Redirects to `BatchDetailPage`.

## 2. Using Levain
1. User creates Levain in **MyLab** -> `LevainModal`.
2. Saves to Firestore `users/{uid}/levains`.
3. Goes to **CalculatorPage**.
4. Selects Yeast Type: **My Levain Pet**.
5. Dropdown appears to select specific Levain.
6. Calculator uses Levain's hydration to adjust water/flour ratios.

## 3. Community Publish
1. User views their own **BatchDetail**.
2. Toggles "Public" or clicks "Publish to CrustCrew".
3. `saveCommunityBatch` writes batch data to **LocalStorage** `doughlabpro.community`.
4. Other users (on same browser/device) see it in `CommunityPage`.
   *(Note: This is a simulation; real backend sharing is not implemented in current code).*

## 4. AI Assistant
1. User clicks **FloatingActionButton** ("Doughy").
2. `AssistantPage` overlay opens.
3. User types question.
4. `assistantClient.ts` gathers current Calculator state (`DoughConfig`), Flour, Oven, Last Batch.
5. Builds XML context prompt.
6. Streams response from Google Gemini API.
