
import { getAuth, GoogleAuthProvider, Auth } from "@firebase/auth";
import { firebaseApp } from "./app";

export let auth: Auth | null = null;
export const googleProvider = new GoogleAuthProvider();

if (firebaseApp) {
  try {
    auth = getAuth(firebaseApp);
  } catch (error) {
    console.error("Failed to initialize Firebase Auth:", error);
  }
}
