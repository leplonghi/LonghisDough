
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
import { AppUser, UserRole, SubscriptionPlan } from "../types";

const ADMIN_EMAILS = ["admin@doughlabpro.com"];

interface AuthContextValue {
  firebaseUser: FirebaseUser | null;
  appUser: AppUser | null;
  loading: boolean;
  loginWithGoogle: () => Promise<void>;
  loginWithEmail: (email: string, password: string) => Promise<void>;
  registerWithEmail: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  devLogin: (type: 'admin' | 'free') => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

// Placeholder for future Firestore integration
async function loadUserFromFirestore(uid: string): Promise<Partial<AppUser> | null> {
  // For now, return null (no overrides).
  // In the future, this will fetch users/{uid} and return { plan, role, isPro }.
  return null;
}

function mapFirebaseUserToAppUser(firebaseUser: FirebaseUser | null, firestoreData: any = null): AppUser | null {
  if (!firebaseUser) return null;

  const email = firebaseUser.email ?? null;
  const isAdminEmail = email ? ADMIN_EMAILS.includes(email) : false;

  let role: UserRole = "user";
  let plan: SubscriptionPlan = "free";
  let isPro = false;

  if (isAdminEmail) {
    role = "admin";
    plan = "pro";
    isPro = true;
  }

  // If firestore data exists, it can override defaults (unless admin email enforces pro)
  // For now we allow Firestore data to populate fields if present.
  if (firestoreData) {
      if (firestoreData.isPro !== undefined) isPro = firestoreData.isPro;
      if (firestoreData.plan) plan = firestoreData.plan;
      // In a real scenario, you might want to keep role as admin if email matches, regardless of DB.
      if (isAdminEmail) {
        role = "admin";
        plan = "pro";
        isPro = true;
      } else if (firestoreData.role) {
        role = firestoreData.role;
      }
  }

  const baseUser: AppUser = {
    uid: firebaseUser.uid,
    email: email,
    displayName: firebaseUser.displayName ?? firestoreData?.displayName ?? null,
    name: firebaseUser.displayName ?? firestoreData?.name ?? email?.split('@')[0] ?? "Baker",
    role,
    plan,
    isPro,
    trialEndsAt: firestoreData?.trialEndsAt ? (firestoreData.trialEndsAt.toDate ? firestoreData.trialEndsAt.toDate().toISOString() : firestoreData.trialEndsAt) : null,
    avatar: firebaseUser.photoURL || undefined,
  };

  return baseUser;
}

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [firebaseUser, setFirebaseUser] = useState<FirebaseUser | null>(null);
  const [appUser, setAppUser] = useState<AppUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!auth) {
      setLoading(false);
      return;
    }

    const unsub = onAuthStateChanged(auth, async (user) => {
      setFirebaseUser(user || null);

      if (!user) {
        // Only reset if we are not already in a mock state (optional, for now simple reset)
        if (!appUser || !appUser.uid.startsWith('dev-')) {
             setAppUser(null);
        }
        setLoading(false);
        return;
      }

      let firestoreData = null;
      try {
        const userRef = await ensureUserDocument(user);
        if (userRef) {
            const snap = await getDoc(userRef);
            firestoreData = snap.data();
        }
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }

      // Logic for admin overrides and mapping
      const mappedUser = mapFirebaseUserToAppUser(user, firestoreData);
      setAppUser(mappedUser);
      setLoading(false);
    });

    return () => unsub();
  }, []);

  const loginWithGoogle = async () => {
    if (!auth) return;
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
     if (!auth) {
         // Manual clear for dev mode
         setAppUser(null);
         setFirebaseUser(null);
         return;
     }
    await signOut(auth);
    setAppUser(null); // Explicitly clear for dev mode transition
  };
  
  const devLogin = async (type: 'admin' | 'free') => {
      const mockUser: AppUser = {
        uid: type === 'admin' ? 'dev-admin' : 'dev-free',
        email: type === 'admin' ? 'admin@doughlabpro.com' : 'free@user.com',
        displayName: type === 'admin' ? 'Dev Admin' : 'Dev Free',
        name: type === 'admin' ? 'Dev Admin' : 'Dev Free',
        role: type === 'admin' ? 'admin' : 'user',
        plan: type === 'admin' ? 'pro' : 'free',
        isPro: type === 'admin',
        trialEndsAt: null,
        avatar: undefined
      };
      
      // Force state update bypassing Firebase
      setAppUser(mockUser);
      // We can mock the firebaseUser too if needed by components, but usually appUser is enough
      setFirebaseUser({
          uid: mockUser.uid,
          email: mockUser.email,
          displayName: mockUser.displayName,
          photoURL: null,
          emailVerified: true,
          isAnonymous: false,
          metadata: {},
          providerData: [],
          refreshToken: '',
          tenantId: null,
          delete: async () => {},
          getIdToken: async () => '',
          getIdTokenResult: async () => ({} as any),
          reload: async () => {},
          toJSON: () => ({}),
          phoneNumber: null,
          providerId: 'firebase'
      } as any);
      setLoading(false);
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
        devLogin
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
