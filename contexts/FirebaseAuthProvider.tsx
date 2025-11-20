
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, onAuthStateChanged } from '@firebase/auth';
import { auth } from '../firebase/auth';
import { ensureUserDocument } from '../firebase/userDoc';

interface FirebaseUserContextType {
  firebaseUser: User | null;
  isLoading: boolean;
}

const FirebaseUserContext = createContext<FirebaseUserContextType | undefined>(undefined);

export const FirebaseAuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [firebaseUser, setFirebaseUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (auth) {
      const unsubscribe = onAuthStateChanged(auth, async (user) => {
        if (user) {
          try {
            // Ensure the user document exists in Firestore
            await ensureUserDocument(user);
          } catch (error) {
            console.error("Error ensuring user document:", error);
          }
        }
        setFirebaseUser(user);
        setIsLoading(false);
      });

      // Cleanup subscription on unmount
      return () => unsubscribe();
    } else {
      // If Firebase auth is not initialized, we are not loading and there's no user.
      setIsLoading(false);
      setFirebaseUser(null);
    }
  }, []);

  const value = { firebaseUser, isLoading };

  return (
    <FirebaseUserContext.Provider value={value}>
      {children}
    </FirebaseUserContext.Provider>
  );
};

export const useFirebaseUser = (): FirebaseUserContextType => {
  const context = useContext(FirebaseUserContext);
  if (context === undefined) {
    throw new Error('useFirebaseUser must be used within a FirebaseAuthProvider');
  }
  return context;
};
