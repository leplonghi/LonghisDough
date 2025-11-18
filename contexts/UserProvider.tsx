import React, { useState, useEffect, useCallback, createContext, useContext, ReactNode } from 'react';
import { User, Oven, Batch, Levain, FeedingEvent, UserContextType, BatchStatus, LevainStatus, Goal, GoalStatus, TestSeries } from '../types';
import { useToast } from '../components/ToastProvider';
import { DEFAULT_CONFIG } from '../constants';
import { hoursBetween } from '../helpers';
import { logEvent } from '../services/analytics';
import { scheduleNotification, cancelNotificationsForLevain } from '../services/notifications';
import { useFirebaseUser } from './FirebaseAuthProvider';
import db from '../firebase/db';
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
  const { firebaseUser } = useFirebaseUser();

  const [user, setUser] = useState<User | null>(null); // App's user profile
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

    // Also load local user profile
    try {
        const storedUser = localStorage.getItem(`dough-lab-auth-${uid}`);
        if(storedUser) setUser(JSON.parse(storedUser));
    } catch (e) { console.error(e); }


    return () => {
        unsubBatches();
        unsubOvens();
        unsubLevains();
        unsubGoals();
        unsubTestSeries();
    };

  }, [firebaseUser]);

  
  const login = useCallback((userData: User) => {
    setUser(userData);
    if(firebaseUser) {
        try {
          localStorage.setItem(`dough-lab-auth-${firebaseUser.uid}`, JSON.stringify(userData));
        } catch (error) { console.error(error); }
    }
  }, [firebaseUser]);

  const logout = useCallback(() => {
    setUser(null);
    if(firebaseUser) {
        try { localStorage.removeItem(`dough-lab-auth-${firebaseUser.uid}`); } catch (error) { console.error(error); }
    }
  }, [firebaseUser]);

  const updateUser = useCallback(
    (updatedData: Partial<User>) => {
      if (user && firebaseUser) {
        const newUser = { ...user, ...updatedData };
        setUser(newUser);
        try {
          localStorage.setItem(`dough-lab-auth-${firebaseUser.uid}`, JSON.stringify(newUser));
        } catch (error) { console.error(error); }
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
      setUserSettings(prev => ({...prev, preferredFlourId: id}));
  }, []);

  // --- Generic CRUD functions ---
  const createDoc = useCallback(async (collectionName: string, data: any) => {
    if (!firebaseUser || !db) throw new Error("Usuário não autenticado ou DB não disponível.");
    const collRef = collection(db, 'users', firebaseUser.uid, collectionName);
    const docData = { ...data, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() };
    const docRef = await addDoc(collRef, docData);
    return { ...docData, id: docRef.id };
  }, [firebaseUser]);

  const updateDocFn = useCallback(async (collectionName: string, id: string, data: any) => {
    if (!firebaseUser || !db) throw new Error("Usuário não autenticado ou DB não disponível.");
    const docRef = doc(db, 'users', firebaseUser.uid, collectionName, id);
    await updateDoc(docRef, { ...data, updatedAt: new Date().toISOString() });
  }, [firebaseUser]);
  
  const deleteDocFn = useCallback(async (collectionName: string, id: string) => {
    if (!firebaseUser || !db) throw new Error("Usuário não autenticado ou DB não disponível.");
    const docRef = doc(db, 'users', firebaseUser.uid, collectionName, id);
    await deleteDoc(docRef);
  }, [firebaseUser]);

  // --- Specific implementations ---
  // FIX: Updated functions to be async and return the created document to match the updated context type.
  const addBatch = useCallback(async (newBatchData: Omit<Batch, 'id' | 'createdAt' | 'updatedAt'>): Promise<Batch> => {
    return (await createDoc('batches', newBatchData)) as Batch;
  }, [createDoc]);
  const createDraftBatch = useCallback(async (): Promise<Batch> => {
    return await addBatch({ name: 'Nova Fornada (Rascunho)', doughConfig: DEFAULT_CONFIG, status: BatchStatus.DRAFT, isFavorite: false });
  }, [addBatch]);
  const updateBatch = useCallback((updatedBatch: Batch) => updateDocFn('batches', updatedBatch.id, updatedBatch), [updateDocFn]);
  const deleteBatch = useCallback(async (id: string) => {
    const batchToDelete = batches.find(b => b.id === id);
    await deleteDocFn('batches', id);
    if (batchToDelete) addToast(`Fornada "${batchToDelete.name}" excluída.`, 'info');
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
  
  // FIX: Updated functions to be async and return the created document to match the updated context type.
  const addGoal = useCallback(async (goalData: Omit<Goal, 'id' | 'createdAt' | 'updatedAt' | 'status' | 'progress'>): Promise<Goal> => {
    const newGoal = await createDoc('goals', {...goalData, status: 'ativo', progress: 0});
    addToast('Novo objetivo criado!', 'success');
    return newGoal as Goal;
  }, [createDoc, addToast]);
  const updateGoal = useCallback(async (updatedData) => { await updateDocFn('goals', updatedData.id, updatedData); addToast('Objetivo atualizado.', 'info'); }, [updateDocFn, addToast]);
  const deleteGoal = useCallback(async (id) => { await deleteDocFn('goals', id); addToast('Objetivo excluído.', 'info'); }, [deleteDocFn, addToast]);
  const completeGoal = useCallback(async (id) => { await updateDocFn('goals', id, { status: 'concluido', progress: 100 }); addToast('Parabéns! Objetivo concluído!', 'success'); }, [updateDocFn, addToast]);

  // FIX: Updated functions to be async and return the created document to match the updated context type.
  const addTestSeries = useCallback(async (seriesData: Omit<TestSeries, 'id' | 'createdAt' | 'updatedAt' | 'relatedBakes'>): Promise<TestSeries> => {
    const newSeries = await createDoc('testSeries', {...seriesData, relatedBakes: []});
    addToast(`Série de testes criada.`, 'success');
    return newSeries as TestSeries;
  }, [createDoc, addToast]);
  const updateTestSeries = useCallback(async (updatedData) => { await updateDocFn('testSeries', updatedData.id, updatedData); addToast('Série de testes atualizada.', 'info'); }, [updateDocFn, addToast]);
  const deleteTestSeries = useCallback(async (id) => { await deleteDocFn('testSeries', id); addToast('Série de testes excluída.', 'info'); }, [deleteDocFn, addToast]);
  const attachBakeToSeries = useCallback(async (seriesId, bakeId) => {
      const series = testSeries.find(s => s.id === seriesId);
      if(series && !series.relatedBakes.includes(bakeId)) {
        await updateDocFn('testSeries', seriesId, { relatedBakes: [...series.relatedBakes, bakeId] });
        addToast('Fornada associada com sucesso!', 'success');
      } else {
        addToast('Fornada já associada a esta série.', 'info');
      }
  }, [testSeries, updateDocFn, addToast]);


  // --- Entitlements (remains local) ---
  const saveEntitlements = (newEntitlements: any) => { setEntitlements(newEntitlements); };
  const grantProAccess = useCallback(() => saveEntitlements({ ...entitlements, isPro: true, passUntil: null }), [entitlements]);
  const grantSessionProAccess = useCallback(() => setIsSessionPro(true), []);
  const grant24hPass = useCallback(() => { /* ... */ }, [entitlements]);
  const hasProAccess = entitlements.isPro || isSessionPro || (entitlements.passUntil !== null && Date.now() < entitlements.passUntil);
  const isPassOnCooldown = false;
  
  const value: UserContextType = {
    isAuthenticated: !!firebaseUser,
    user,
    login,
    logout,
    updateUser,
    hasProAccess, grantProAccess, grantSessionProAccess, grant24hPass, isPassOnCooldown, cooldownHoursRemaining: cooldownHours,
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
