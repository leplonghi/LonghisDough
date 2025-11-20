
import { getFirestore, Firestore } from "firebase/firestore";
import { firebaseApp } from "./app";

export let db: Firestore | null = null;

if (firebaseApp) {
  try {
    db = getFirestore(firebaseApp);
  } catch (error) {
    console.error("Failed to initialize Firestore:", error);
  }
}
