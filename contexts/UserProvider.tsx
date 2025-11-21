
import React, { useState, useEffect, useCallback, createContext, useContext, ReactNode } from 'react';
import { User, Oven, Batch, Levain, FeedingEvent, UserContextType, BatchStatus, LevainStatus, Goal, GoalStatus, TestSeries, PaywallOrigin } from '../types';
import { useToast } from '../components/ToastProvider';
import { DEFAULT_CONFIG } from '../constants';
import { hoursBetween } from '../helpers';
import { logEvent } from '../services/analytics';
import { useAuth } from './AuthContext';
import { db } from '../firebase/db';
import {
  collection,
  query,
  onSnapshot,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  writeBatch,
  Timestamp,
  orderBy,
  where
} from 'firebase/firestore';
import { isProUser } from '../lib/permissions';


const UserContext = createContext<UserContextType | undefined>(undefined);

const getStatusFromLastFeeding = (levain: Levain): LevainStatus => {
    if (levain.status === 'arquivado') return 'arquivado';

    const hoursSinceLastFeeding = hoursBetween(new Date().toISOString(), levain.lastFeeding);
    const SEVEN_DAYS_IN_HOURS = 7 * 24;

    if (hoursSinceLastFeeding <= 48) {
      return 'ativo';
    } else if (hoursSinceLastFeeding > 48 && hoursSinceLastFeeding <= SEVEN_DAYS_IN_HOURS) {
      return 'precisa_atencao';
    } else {
      return 'descanso';
    }
  };

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { addToast } = useToast();
  const { firebaseUser, appUser, loginWithGoogle, logout: authLogout } = useAuth();

  // Local state mirrors for UI responsiveness
  const [user, setUser] = useState<User | null>(null);
  const [ovens, setOvens] = useState<Oven[]>([]);
  const [batches, setBatches] = useState<Batch[]>([]);
  const [levains, setLevains] = useState<Levain[]>([]);
  const [goals, setGoals] = useState<Goal[]>([]);
  const [testSeries, setTestSeries] = useState<TestSeries[]>([]);
  
  // Settings are simple, keep them in localStorage for now
  const [userSettings, setUserSettings] = useState<any>(() => {
    try {
        const stored = localStorage.getItem('dough-lab-user-settings');
        return stored ? JSON.parse(stored) : { preferredFlourId: null };
    } catch {
        return { preferredFlourId: null };
    }
  });

  // --- Entitlements State ---
  const [entitlements, setEntitlements] = useState<any>({
    isPro: false,
    passUntil: null,
    lastPassGrantedAt: null,
  });
  const [isSessionPro, setIsSessionPro] = useState<boolean>(false);
  const [cooldownHours, setCooldownHours] = useState(0);
  
  // --- Global Paywall State ---
  const [isPaywallOpen, setIsPaywallOpen] = useState(false);
  const [paywallOrigin, setPaywallOrigin] = useState<PaywallOrigin | null>(null);

  const openPaywall = useCallback((origin: PaywallOrigin = 'general') => {
      setPaywallOrigin(origin);
      setIsPaywallOpen(true);
  }, []);
  
  const closePaywall = useCallback(() => {
      setIsPaywallOpen(false);
      setPaywallOrigin(null);
  }, []);

  // Sync AppUser (from AuthContext) to User state
  useEffect(() => {
    if (appUser) {
        setUser({
            name: appUser.name || "Baker",
            email: appUser.email || "",
            avatar: appUser.avatar,
            isPro: appUser.isPro,
            trialEndsAt: appUser.trialEndsAt
        });
    } else {
        setUser(null);
    }
  }, [appUser]);

  // Firestore real-time data listeners
  useEffect(() => {
    if (!firebaseUser || !db) {
        setBatches([]);
        setOvens([]);
        setLevains([]);
        setGoals([]);
        setTestSeries([]);
        return;
    }

    const uid = firebaseUser.uid;

    const createCollectionSubscription = (
        collectionName: string, 
        setter: React.Dispatch<React.SetStateAction<any[]>>,
        postProcess?: (item: any) => any
    ) => {
        const collRef = collection(db, 'users', uid, collectionName);
        const q = query(collRef, orderBy('createdAt', 'desc'));

        return onSnapshot(q, (snapshot) => {
            const items = snapshot.docs.map(doc => {
                const data = doc.data();
                // Convert Firestore Timestamps to ISO strings
                Object.keys(data).forEach(key => {
                    if (data[key] instanceof Timestamp) {
                        data[key] = data[key].toDate().toISOString();
                    }
                });
                const processedItem = { id: doc.id, ...data };
                return postProcess ? postProcess(processedItem) : processedItem;
            });
            setter(items);
        }, (error) => {
            console.error(`Error listening to ${collectionName}:`, error);
        });
    };

    const unsubBatches = createCollectionSubscription('batches', setBatches);
    const unsubOvens = createCollectionSubscription('ovens', setOvens);
    const unsubLevains = createCollectionSubscription('levains', setLevains, (l: Levain) => ({ ...l, status: getStatusFromLastFeeding(l) }));
    const unsubGoals = createCollectionSubscription('goals', setGoals);
    const unsubTestSeries = createCollectionSubscription('testSeries', setTestSeries);

    return () => {
        unsubBatches();
        unsubOvens();
        unsubLevains();
        unsubGoals();
        unsubTestSeries();
    };

  }, [firebaseUser]);

  
  const login = useCallback((userData: User) => {
     // This is now handled by AuthContext, but we keep the interface signature for compatibility.
     // In a real flow, this button triggers loginWithGoogle from AuthContext
     loginWithGoogle();
  }, [loginWithGoogle]);

  const logout = useCallback(() => {
    authLogout();
    setUser(null);
  }, [authLogout]);

  const updateUser = useCallback(
    async (updatedData: Partial<User>) => {
      // In a real app, we'd update the /users/{uid} doc here
      if (user && firebaseUser && db) {
         const userRef = doc(db, 'users', firebaseUser.uid);
         await updateDoc(userRef, updatedData);
         // Local state update happens via AuthContext/Firestore subscription usually, 
         // but we can optimistically update here if needed.
      }
    },
    [user, firebaseUser],
  );

  // --- User Settings Management ---
  useEffect(() => {
    try {
      localStorage.setItem('dough-lab-user-settings', JSON.stringify(userSettings));
    } catch (error) { console.error(error); }
  }, [userSettings]);

  const setPreferredFlour = useCallback((id: string | null) => {
      setUserSettings((prev: any) => ({...prev, preferredFlourId: id}));
  }, []);

  // --- Generic CRUD functions ---
  const createDoc = useCallback(async (collectionName: string, data: any) => {
    if (!firebaseUser || !db) throw new Error("User not authenticated or DB not available.");
    const collRef = collection(db, 'users', firebaseUser.uid, collectionName);
    const docData = { ...data, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() };
    const docRef = await addDoc(collRef, docData);
    return { ...docData, id: docRef.id };
  }, [firebaseUser]);

  const updateDocFn = useCallback(async (collectionName: string, id: string, data: any) => {
    if (!firebaseUser || !db) throw new Error("User not authenticated or DB not available.");
    const docRef = doc(db, 'users', firebaseUser.uid, collectionName, id);
    await updateDoc(docRef, { ...data, updatedAt: new Date().toISOString() });
  }, [firebaseUser]);
  
  const deleteDocFn = useCallback(async (collectionName: string, id: string) => {
    if (!firebaseUser || !db) throw new Error("User not authenticated or DB not available.");
    const docRef = doc(db, 'users', firebaseUser.uid, collectionName, id);
    await deleteDoc(docRef);
  }, [firebaseUser]);

  // --- Specific implementations ---
  const addBatch = useCallback(async (newBatchData: Omit<Batch, 'id' | 'createdAt' | 'updatedAt'>): Promise<Batch> => {
    return (await createDoc('batches', newBatchData)) as Batch;
  }, [createDoc]);
  const createDraftBatch = useCallback(async (): Promise<Batch> => {
    return await addBatch({ name: 'New Bake (Draft)', doughConfig: DEFAULT_CONFIG, status: BatchStatus.DRAFT, isFavorite: false });
  }, [addBatch]);
  const updateBatch = useCallback((updatedBatch: Batch) => updateDocFn('batches', updatedBatch.id, updatedBatch), [updateDocFn]);
  const deleteBatch = useCallback(async (id: string) => {
    const batchToDelete = batches.find(b => b.id === id);
    await deleteDocFn('batches', id);
    if (batchToDelete) addToast(`Bake "${batchToDelete.name}" deleted.`, 'info');
  }, [deleteDocFn, batches, addToast]);

  const addOven = useCallback((newOvenData: Omit<Oven, 'id'|'isDefault'>) => createDoc('ovens', {...newOvenData, isDefault: ovens.length === 0}), [createDoc, ovens.length]);
  const updateOven = useCallback((updatedOven: Oven) => updateDocFn('ovens', updatedOven.id, updatedOven), [updateDocFn]);
  const deleteOven = useCallback((id: string) => deleteDocFn('ovens', id), [deleteDocFn]);
  const setDefaultOven = useCallback(async (id: string) => {
    if (!firebaseUser || !db) return;
    const batch = writeBatch(db);
    ovens.forEach(oven => {
        const docRef = doc(db, 'users', firebaseUser.uid, 'ovens', oven.id);
        batch.update(docRef, { isDefault: oven.id === id });
    });
    await batch.commit();
  }, [firebaseUser, ovens]);
  
  const addLevain = useCallback(async (newLevainData: Omit<Levain, 'id'|'isDefault'|'feedingHistory'|'status'|'createdAt'>) => {
    const data = { ...newLevainData, status: 'ativo', lastFeeding: new Date().toISOString(), isDefault: levains.length === 0, feedingHistory: [] };
    const newLevain = await createDoc('levains', data);
    if (user) logEvent('levain_pet_created', { userId: user.email, levainId: newLevain.id });
  }, [createDoc, levains.length, user]);
  
  const updateLevain = useCallback(async (updatedData: Partial<Levain> & {id: string}) => {
    await updateDocFn('levains', updatedData.id, updatedData);
     if (user) logEvent('levain_pet_profile_updated', { userId: user.email, levainId: updatedData.id });
  }, [updateDocFn, user]);
  
  const deleteLevain = useCallback((id: string) => deleteDocFn('levains', id), [deleteDocFn]);
  const setDefaultLevain = useCallback(async (id: string) => {
    if (!firebaseUser || !db) return;
    const batch = writeBatch(db);
    levains.forEach(l => {
        const docRef = doc(db, 'users', firebaseUser.uid, 'levains', l.id);
        batch.update(docRef, { isDefault: l.id === id });
    });
    await batch.commit();
  }, [firebaseUser, levains]);

  const addFeedingEvent = useCallback(async (levainId: string, eventData: Omit<FeedingEvent, 'id'|'date'>) => {
    const levain = levains.find(l => l.id === levainId);
    if (!levain) return;
    const now = new Date().toISOString();
    const newEvent = { id: crypto.randomUUID(), date: now, ...eventData };
    const updatedHistory = [newEvent, ...levain.feedingHistory];
    await updateDocFn('levains', levainId, { feedingHistory: updatedHistory, lastFeeding: now, status: 'ativo' });
    if (user) logEvent('levain_pet_feeding_logged', { userId: user.email, levainId });
  }, [levains, updateDocFn, user]);

  const importLevains = useCallback(async (levainsToImport: Levain[]) => {
    if (!firebaseUser || !db) return;
    const batch = writeBatch(db);
    levainsToImport.forEach(levain => {
        const docRef = doc(collection(db, 'users', firebaseUser.uid, 'levains'));
        batch.set(docRef, levain);
    });
    await batch.commit();
  }, [firebaseUser]);
  
  const addGoal = useCallback(async (goalData: Omit<Goal, 'id' | 'createdAt' | 'updatedAt' | 'status' | 'progress'>): Promise<Goal> => {
    const newGoal = await createDoc('goals', {...goalData, status: 'ativo', progress: 0});
    addToast('New goal created!', 'success');
    return newGoal as Goal;
  }, [createDoc, addToast]);
  const updateGoal = useCallback(async (updatedData: any) => { await updateDocFn('goals', updatedData.id, updatedData); addToast('Goal updated.', 'info'); }, [updateDocFn, addToast]);
  const deleteGoal = useCallback(async (id: string) => { await deleteDocFn('goals', id); addToast('Goal deleted.', 'info'); }, [deleteDocFn, addToast]);
  const completeGoal = useCallback(async (id: string) => { await updateDocFn('goals', id, { status: 'concluido', progress: 100 }); addToast('Goal completed!', 'success'); }, [updateDocFn, addToast]);

  const addTestSeries = useCallback(async (seriesData: Omit<TestSeries, 'id' | 'createdAt' | 'updatedAt' | 'relatedBakes'>): Promise<TestSeries> => {
    const newSeries = await createDoc('testSeries', {...seriesData, relatedBakes: []});
    addToast(`Test series created.`, 'success');
    return newSeries as TestSeries;
  }, [createDoc, addToast]);
  const updateTestSeries = useCallback(async (updatedData: any) => { await updateDocFn('testSeries', updatedData.id, updatedData); addToast('Series updated.', 'info'); }, [updateDocFn, addToast]);
  const deleteTestSeries = useCallback(async (id: string) => { await deleteDocFn('testSeries', id); addToast('Series deleted.', 'info'); }, [deleteDocFn, addToast]);
  const attachBakeToSeries = useCallback(async (seriesId: string, bakeId: string) => {
      const series = testSeries.find(s => s.id === seriesId);
      if(series && !series.relatedBakes.includes(bakeId)) {
        await updateDocFn('testSeries', seriesId, { relatedBakes: [...series.relatedBakes, bakeId] });
        addToast('Bake associated successfully!', 'success');
      } else {
        addToast('Bake already associated.', 'info');
      }
  }, [testSeries, updateDocFn, addToast]);


  // --- Entitlements ---
  const saveEntitlements = (newEntitlements: any) => { setEntitlements(newEntitlements); };
  const grantProAccess = useCallback(() => {
      if (user && firebaseUser) {
          updateUser({ isPro: true }); 
      }
      saveEntitlements({ ...entitlements, isPro: true, passUntil: null });
      setIsSessionPro(true);
  }, [entitlements, user, updateUser, firebaseUser]);

  const grantSessionProAccess = useCallback(() => setIsSessionPro(true), []);
  const grant24hPass = useCallback(() => { 
      setIsSessionPro(true);
  }, []);
  
  const hasProAccess = isProUser(user) || isSessionPro;
  const isPassOnCooldown = false;
  
  const value: UserContextType = {
    isAuthenticated: !!firebaseUser,
    user,
    login,
    logout,
    updateUser,
    hasProAccess, grantProAccess, grantSessionProAccess, grant24hPass, isPassOnCooldown, cooldownHoursRemaining: cooldownHours,
    isPaywallOpen, paywallOrigin, openPaywall, closePaywall,
    ovens, addOven, updateOven, deleteOven, setDefaultOven,
    preferredFlourId: userSettings.preferredFlourId, setPreferredFlour,
    batches, addBatch, updateBatch, deleteBatch, createDraftBatch,
    levains, addLevain, updateLevain, deleteLevain, setDefaultLevain, addFeedingEvent, importLevains,
    goals, addGoal, updateGoal, deleteGoal, completeGoal,
    testSeries, addTestSeries, updateTestSeries, deleteTestSeries, attachBakeToSeries,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
