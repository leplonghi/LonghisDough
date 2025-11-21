# Firestore Schema (Implementation)

**Note:** Data types correspond to interfaces defined in `types.ts`. All collections listed below are **subcollections** of the user document, except for the user document itself.

## Collection: `users`
- **Document ID:** `{uid}` (Firebase Auth UID)
- **Fields:**
  - `uid`: string
  - `email`: string
  - `displayName`: string
  - `isPro`: boolean
  - `plan`: string ('free' | 'pro')
  - `trialEndsAt`: timestamp | null
  - `createdAt`: timestamp

## Subcollection: `batches`
- **Path:** `users/{uid}/batches`
- **Document ID:** Auto-generated
- **Fields:** Maps to `Batch` interface.
  - `name`, `doughConfig` (Map), `doughResult` (Map), `status`, `rating`, `notes`, `createdAt`, `updatedAt`, `isFavorite`, `ovenType`.

## Subcollection: `ovens`
- **Path:** `users/{uid}/ovens`
- **Document ID:** Auto-generated
- **Fields:** Maps to `Oven` interface.
  - `name`, `type`, `maxTemperature`, `hasStone`, `hasSteel`, `isDefault`, `notes`.

## Subcollection: `levains`
- **Path:** `users/{uid}/levains`
- **Document ID:** Auto-generated
- **Fields:** Maps to `Levain` interface.
  - `name`, `hydration`, `status`, `lastFeeding`, `feedingHistory` (Array of Maps), `isDefault`, `createdAt`.
  - **Note:** `feedingHistory` is stored as an array within the document, not a subcollection, in `UserProvider.tsx`.

## Subcollection: `goals`
- **Path:** `users/{uid}/goals`
- **Document ID:** Auto-generated
- **Fields:** Maps to `Goal` interface.
  - `title`, `description`, `targetType`, `targetValue`, `status`, `progress`, `createdAt`.

## Subcollection: `testSeries`
- **Path:** `users/{uid}/testSeries`
- **Document ID:** Auto-generated
- **Fields:** Maps to `TestSeries` interface.
  - `name`, `description`, `parameters` (Map), `relatedBakes` (Array of IDs).
