
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
  // Test helper
  toggleMockPlan?: () => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

// --- MOCK DATA FOR TESTING ---
const MOCK_USER_PRO: AppUser = {
  uid: 'mock-user-123',
  email: 'test@doughlab.com',
  displayName: 'Test User (Mock)',
  name: 'Test Baker',
  isPro: true,
  plan: 'pro',
  trialEndsAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30).toISOString(), // 30 days
};

const MOCK_USER_FREE: AppUser = {
  ...MOCK_USER_PRO,
  isPro: false,
  plan: 'free',
  trialEndsAt: null,
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [firebaseUser, setFirebaseUser] = useState<FirebaseUser | null>(null);
  const [appUser, setAppUser] = useState<AppUser | null>(null);
  const [loading, setLoading] = useState(true);

  // Mock state
  const [isMockMode, setIsMockMode] = useState(false);

  useEffect(() => {
    if (auth) {
      const unsubscribe = onAuthStateChanged(auth, async (user) => {
        setFirebaseUser(user);

        if (user) {
          try {
            const userRef = await ensureUserDocument(user);
            if (userRef) {
              const snap = await getDoc(userRef);
              const data = snap.data();

              setAppUser({
                uid: user.uid,
                email: user.email || "",
                name: user.displayName || data?.name || "Baker", 
                displayName: user.displayName || data?.displayName || null,
                isPro: !!data?.isPro || data?.plan === 'pro',
                plan: data?.plan || "free",
                trialEndsAt: data?.trialEndsAt ? (data.trialEndsAt.toDate ? data.trialEndsAt.toDate().toISOString() : data.trialEndsAt) : null,
                avatar: user.photoURL || undefined,
              });
            }
          } catch (error) {
            console.error("Error fetching user profile:", error);
          }
        } else {
          setAppUser(null);
        }
        setLoading(false);
      });
      return () => unsubscribe();
    } else {
      // Firebase not configured -> Enable Mock Mode
      console.log("AuthContext: Running in Mock Mode");
      setIsMockMode(true);
      
      // Check for stored mock user
      const stored = localStorage.getItem('doughlab_mock_user');
      if (stored) {
        const user = JSON.parse(stored);
        setAppUser(user);
        setFirebaseUser({ uid: user.uid, email: user.email } as any);
      }
      setLoading(false);
    }
  }, []);

  const loginWithGoogle = async () => {
    if (auth && googleProvider) {
      try {
        await signInWithPopup(auth, googleProvider);
      } catch (error) {
        console.error("Google login failed:", error);
        throw error;
      }
    } else {
      // Mock Login
      console.log("Mock Login: Signing in as Pro User");
      const user = MOCK_USER_PRO;
      setAppUser(user);
      setFirebaseUser({ uid: user.uid, email: user.email } as any);
      localStorage.setItem('doughlab_mock_user', JSON.stringify(user));
    }
  };

  const loginWithEmail = async (email: string, password: string) => {
    if (auth) {
      await signInWithEmailAndPassword(auth, email, password);
    } else {
      // Mock Email Login
      const user = { ...MOCK_USER_FREE, email };
      setAppUser(user);
      setFirebaseUser({ uid: user.uid, email } as any);
      localStorage.setItem('doughlab_mock_user', JSON.stringify(user));
    }
  };

  const registerWithEmail = async (email: string, password: string) => {
    if (auth) {
      await createUserWithEmailAndPassword(auth, email, password);
    } else {
      // Mock Register
      const user = { ...MOCK_USER_FREE, email };
      setAppUser(user);
      setFirebaseUser({ uid: user.uid, email } as any);
      localStorage.setItem('doughlab_mock_user', JSON.stringify(user));
    }
  };

  const logout = async () => {
    if (auth) {
      await signOut(auth);
    } else {
      // Mock Logout
      setAppUser(null);
      setFirebaseUser(null);
      localStorage.removeItem('doughlab_mock_user');
    }
  };

  const toggleMockPlan = () => {
    if (!isMockMode || !appUser) return;
    const newPlan: "free" | "pro" = appUser.plan === 'pro' ? 'free' : 'pro';
    const newUser: AppUser = { 
        ...appUser, 
        isPro: newPlan === 'pro',
        plan: newPlan
    };
    setAppUser(newUser);
    localStorage.setItem('doughlab_mock_user', JSON.stringify(newUser));
    window.location.reload();
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
        toggleMockPlan: isMockMode ? toggleMockPlan : undefined
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
