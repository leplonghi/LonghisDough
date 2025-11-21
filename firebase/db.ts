
import { getFirestore, Firestore } from "firebase/firestore";
import { app } from "./app";

export let db: Firestore | null = null;

if (app) {
  try {
    db = getFirestore(app);
  } catch (e) {
    console.warn("Firebase Firestore failed to initialize", e);
  }
}
