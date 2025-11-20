
import { doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore";
import { db } from "./db";

export async function ensureUserDocument(user: { uid: string; email?: string | null; displayName?: string | null }) {
  if (!db) return;

  const ref = doc(db, "users", user.uid);
  const snap = await getDoc(ref);

  if (!snap.exists()) {
    await setDoc(ref, {
      uid: user.uid,
      email: user.email || null,
      displayName: user.displayName || null,
      createdAt: serverTimestamp(),
      // Monetization / Plan fields:
      isPro: false,
      trialEndsAt: null,
      stripeCustomerId: null,
      stripeSubscriptionId: null,
      plan: "free", // "free" | "pro"
    });
  }

  return ref;
}
