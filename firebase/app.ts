
import { initializeApp, getApps, getApp, FirebaseApp } from "@firebase/app";
import { firebaseConfig, isFirebaseConfigured } from "./config";

export let app: FirebaseApp | null = null;

if (isFirebaseConfigured) {
  try {
    if (getApps().length > 0) {
      app = getApp();
    } else {
      app = initializeApp(firebaseConfig);
    }
  } catch (error) {
    console.warn("Failed to initialize Firebase App:", error);
    app = null;
  }
} else {
  console.warn("Firebase configuration missing. App running in Mock/Offline mode.");
}
