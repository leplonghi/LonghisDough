
import React, { createContext, useContext, useEffect, useState } from "react";
import { 
  onAuthStateChanged, 
  signInWithPopup, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signOut, 
  User as FirebaseUser 
} from "@firebase/auth";
import { auth, googleProvider } from "../firebase/auth";
import { ensureUserDocument } from "../firebase/userDoc";
import { getDoc } from "firebase/firestore";
import { User } from "../types";

// Extended user type for the app state
interface AppUser extends Partial<User> {
  uid: string;
  email: string;
  displayName: string | null;
  isPro: boolean;
  plan: "free" | "pro";
  trialEndsAt: string | null;
}

interface AuthContextValue {
  firebaseUser: FirebaseUser | null;
  appUser: AppUser | null;
  loading: boolean;
  loginWithGoogle: () => Promise<void>;
  loginWithEmail: (email: string, password: string) => Promise<void>;
  registerWithEmail: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [firebaseUser, setFirebaseUser] = useState<FirebaseUser | null>(null);
  const [appUser, setAppUser] = useState<AppUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!auth) {
      // If auth is null (e.g. config missing), stop loading immediately
      setLoading(false);
      return;
    }

    const unsub = onAuthStateChanged(auth, async (user) => {
      setFirebaseUser(user || null);

      if (!user) {
        setAppUser(null);
        setLoading(false);
        return;
      }

      try {
        // Ensure the user document exists in Firestore /users/{uid}
        const userRef = await ensureUserDocument(user);
        
        if (userRef) {
          const snap = await getDoc(userRef);
          const data = snap.data();

          setAppUser({
            uid: user.uid,
            email: user.email || "",
            name: user.displayName || data?.name || "Baker", 
            displayName: user.displayName || data?.displayName || null,
            isPro: !!data?.isPro,
            plan: data?.plan || "free",
            trialEndsAt: data?.trialEndsAt ? (data.trialEndsAt.toDate ? data.trialEndsAt.toDate().toISOString() : data.trialEndsAt) : null,
            avatar: user.photoURL || undefined,
          });
        }
      } catch (error) {
        console.error("Error fetching user profile:", error);
      } finally {
        setLoading(false);
      }
    });

    return () => unsub();
  }, []);

  const loginWithGoogle = async () => {
    if (!auth) {
      console.warn("Authentication is not configured.");
      return;
    }
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  const loginWithEmail = async (email: string, password: string) => {
     if (!auth) return;
    await signInWithEmailAndPassword(auth, email, password);
  };

  const registerWithEmail = async (email: string, password: string) => {
     if (!auth) return;
    await createUserWithEmailAndPassword(auth, email, password);
  };

  const logout = async () => {
     if (!auth) return;
    await signOut(auth);
  };

  return (
    <AuthContext.Provider
      value={{
        firebaseUser,
        appUser,
        loading,
        loginWithGoogle,
        loginWithEmail,
        registerWithEmail,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return ctx;
}
