
import { initializeApp, getApps, getApp, FirebaseApp } from "@firebase/app";
import { firebaseConfig } from "./config";

export let firebaseApp: FirebaseApp | null = null;

// Simple check to see if we have valid-looking keys (not placeholders)
const isValid = 
  firebaseConfig.apiKey && 
  firebaseConfig.apiKey !== "YOUR_API_KEY_HERE" && 
  firebaseConfig.projectId !== "YOUR_PROJECT_ID";

if (isValid) {
  try {
    firebaseApp = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
  } catch (error) {
    console.error("Failed to initialize Firebase App:", error);
  }
} else {
  console.warn("Firebase config is missing or uses placeholders. Auth and DB features will be disabled.");
}
