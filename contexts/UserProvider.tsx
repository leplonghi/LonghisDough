
import React, { useState, useEffect, useCallback, createContext, useContext, ReactNode, useMemo } from 'react';
import { User, Oven, Batch, Levain, FeedingEvent, UserContextType, BatchStatus, LevainStatus, Goal, TestSeries, PaywallOrigin, CustomIngredientDefinition, DoughStyleDefinition, BakeType, RecipeStyle, DoughConfig, YeastType, AmbientTemperature } from '../types';
import { useToast } from '../components/ToastProvider';
import { DEFAULT_CONFIG } from '../constants';
import { hoursBetween } from '../helpers';
import { logEvent } from '../services/analytics';
import { useAuth } from './AuthContext';
import { firestoreService } from '../services/firestoreService';
import { isProUser } from '../lib/permissions';

const UserContext = createContext<UserContextType | undefined>(undefined);

// Helper for Levain status calculation
const getStatusFromLastFeeding = (levain: Levain): LevainStatus => {
    if (levain.status === 'arquivado') return 'arquivado';
    const hoursSinceLastFeeding = hoursBetween(new Date().toISOString(), levain.lastFeeding);
    const SEVEN_DAYS_IN_HOURS = 7 * 24;

    if (hoursSinceLastFeeding <= 48) return 'ativo';
    else if (hoursSinceLastFeeding > 48 && hoursSinceLastFeeding <= SEVEN_DAYS_IN_HOURS) return 'precisa_atencao';
    else return 'descanso';
};

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { addToast } = useToast();
  const { firebaseUser, appUser, loginWithGoogle, logout: authLogout, devLogin: authDevLogin } = useAuth();

  // --- Global State ---
  const [user, setUser] = useState<User | null>(null);
  const [ovens, setOvens] = useState<Oven[]>([]);
  const [batches, setBatches] = useState<Batch[]>([]);
  const [levains, setLevains] = useState<Levain[]>([]);
  const [goals, setGoals] = useState<Goal[]>([]);
  const [testSeries, setTestSeries] = useState<TestSeries[]>([]);
  const [customIngredientLibrary, setCustomIngredientLibrary] = useState<CustomIngredientDefinition[]>([]);
  const [favoriteStyleIds, setFavoriteStyleIds] = useState<string[]>([]);

  // --- Local Storage Settings ---
  const [userSettings, setUserSettings] = useState<any>(() => {
    try {
        const stored = localStorage.getItem('dough-lab-user-settings');
        return stored ? JSON.parse(stored) : { preferredFlourId: null };
    } catch { return { preferredFlourId: null }; }
  });

  // Load Local Storage Data
  useEffect(() => {
      try {
          const storedIng = localStorage.getItem('dough-lab-custom-ingredients');
          if (storedIng) setCustomIngredientLibrary(JSON.parse(storedIng));
          
          const storedFavs = localStorage.getItem('dough-lab-fav-styles');
          if (storedFavs) setFavoriteStyleIds(JSON.parse(storedFavs));
      } catch (e) { console.error("Failed to load local storage data", e); }
  }, []);

  // Save Settings to LS
  useEffect(() => {
    try {
      localStorage.setItem('dough-lab-user-settings', JSON.stringify(userSettings));
    } catch (error) { console.error(error); }
  }, [userSettings]);

  // --- Paywall / Entitlements State ---
  const [entitlements, setEntitlements] = useState<any>({ isPro: false, passUntil: null, lastPassGrantedAt: null });
  const [isSessionPro, setIsSessionPro] = useState<boolean>(false);
  const [cooldownHours] = useState(0);
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

  // Sync AppUser to User state
  useEffect(() => {
    if (appUser) {
        setUser({
            uid: appUser.uid,
            role: appUser.role,
            name: appUser.name || "Baker",
            displayName: appUser.displayName,
            email: appUser.email || "",
            avatar: appUser.avatar,
            isPro: appUser.isPro,
            trialEndsAt: appUser.trialEndsAt,
            plan: appUser.plan
        });
    } else {
        setUser(null);
    }
  }, [appUser]);

  // --- Data Subscriptions (Real-time) ---
  useEffect(() => {
    // If using dev login (mock), don't try to connect to Firestore
    if (!firebaseUser || firebaseUser.uid.startsWith('dev-')) {
        if (!firebaseUser) {
            setBatches([]);
            setOvens([]);
            setLevains([]);
            setGoals([]);
            setTestSeries([]);
        }
        return;
    }

    const uid = firebaseUser.uid;

    // Use the service to subscribe
    const unsubBatches = firestoreService.subscribeToUserCollection<Batch>(uid, 'batches', setBatches);
    const unsubOvens = firestoreService.subscribeToUserCollection<Oven>(uid, 'ovens', setOvens);
    const unsubGoals = firestoreService.subscribeToUserCollection<Goal>(uid, 'goals', setGoals);
    const unsubTestSeries = firestoreService.subscribeToUserCollection<TestSeries>(uid, 'testSeries', setTestSeries);
    
    // Levains need post-processing for status
    const unsubLevains = firestoreService.subscribeToUserCollection<Levain>(
        uid, 
        'levains', 
        setLevains, 
        undefined, 
        (l: Levain) => ({ ...l, status: getStatusFromLastFeeding(l) })
    );

    return () => {
        unsubBatches();
        unsubOvens();
        unsubLevains();
        unsubGoals();
        unsubTestSeries();
    };
  }, [firebaseUser]);

  // --- Auth Actions ---
  const login = useCallback(() => loginWithGoogle(), [loginWithGoogle]);
  const devLogin = useCallback((type: 'admin' | 'free') => authDevLogin(type), [authDevLogin]);
  const logout = useCallback(() => { authLogout(); setUser(null); }, [authLogout]);

  const updateUser = useCallback(async (updatedData: Partial<User>) => {
      if (user && firebaseUser) {
         await firestoreService.updateUserProfile(firebaseUser.uid, updatedData);
      }
  }, [user, firebaseUser]);

  // --- Settings Actions ---
  const setPreferredFlour = useCallback((id: string | null) => {
      setUserSettings((prev: any) => ({...prev, preferredFlourId: id}));
  }, []);

  // --- DATA CRUD OPERATIONS (Delegating to Service) ---

  // BATCHES
  const addBatch = useCallback(async (newBatchData: Omit<Batch, 'id' | 'createdAt' | 'updatedAt'>): Promise<Batch> => {
    if (!firebaseUser) throw new Error("User not authenticated");
    const batch = await firestoreService.addDocument<Batch>(firebaseUser.uid, 'batches', newBatchData);
    
    // Dev Mode Manual Update
    if(user?.uid.startsWith('dev-')) setBatches(prev => [batch, ...prev]);
    return batch;
  }, [firebaseUser, user]);

  const createDraftBatch = useCallback(async (): Promise<Batch> => {
    return await addBatch({ name: 'New Bake (Draft)', doughConfig: DEFAULT_CONFIG, status: BatchStatus.DRAFT, isFavorite: false });
  }, [addBatch]);

  const updateBatch = useCallback((updatedBatch: Batch) => {
      if (!firebaseUser) return;
      firestoreService.updateDocument(firebaseUser.uid, 'batches', updatedBatch.id, updatedBatch);
      // Dev Mode Manual Update
      if(user?.uid.startsWith('dev-')) setBatches(prev => prev.map(b => b.id === updatedBatch.id ? updatedBatch : b));
  }, [firebaseUser, user]);

  const deleteBatch = useCallback(async (id: string) => {
    if (!firebaseUser) return;
    const batchToDelete = batches.find(b => b.id === id);
    await firestoreService.deleteDocument(firebaseUser.uid, 'batches', id);
    // Dev Mode Manual Update
    if(user?.uid.startsWith('dev-')) setBatches(prev => prev.filter(b => b.id !== id));
    // FIX: Changed addToast call to conform to new signature
    if (batchToDelete) addToast({message: `Bake "${batchToDelete.name}" deleted.`, type: 'info'});
  }, [firebaseUser, batches, addToast, user]);

  // OVENS
  const addOven = useCallback(async (newOvenData: Omit<Oven, 'id'|'isDefault'>) => {
      if (!firebaseUser) return;
      const oven = await firestoreService.addDocument<Oven>(firebaseUser.uid, 'ovens', {...newOvenData, isDefault: ovens.length === 0});
      if(user?.uid.startsWith('dev-')) setOvens(prev => [...prev, oven]);
  }, [firebaseUser, ovens.length, user]);
  
  const updateOven = useCallback((updatedOven: Oven) => {
      if (!firebaseUser) return;
      firestoreService.updateDocument(firebaseUser.uid, 'ovens', updatedOven.id, updatedOven);
      if(user?.uid.startsWith('dev-')) setOvens(prev => prev.map(o => o.id === updatedOven.id ? updatedOven : o));
  }, [firebaseUser, user]);

  const deleteOven = useCallback((id: string) => {
      if (!firebaseUser) return;
      firestoreService.deleteDocument(firebaseUser.uid, 'ovens', id);
      if(user?.uid.startsWith('dev-')) setOvens(prev => prev.filter(o => o.id !== id));
  }, [firebaseUser, user]);
  
  const setDefaultOven = useCallback(async (id: string) => {
    if (!firebaseUser) return;
    if (firebaseUser.uid.startsWith('dev-')) {
        setOvens(prev => prev.map(o => ({...o, isDefault: o.id === id})));
        return;
    }
    await firestoreService.setAsDefault(firebaseUser.uid, 'ovens', id, ovens);
  }, [firebaseUser, ovens]);
  
  // LEVAINS
  const addLevain = useCallback(async (newLevainData: Omit<Levain, 'id'|'isDefault'|'feedingHistory'|'status'|'createdAt'>) => {
    if (!firebaseUser) return;
    const data = { ...newLevainData, status: 'ativo', lastFeeding: new Date().toISOString(), isDefault: levains.length === 0, feedingHistory: [] };
    const newLevain = await firestoreService.addDocument<Levain>(firebaseUser.uid, 'levains', data);
    
    if(user?.uid.startsWith('dev-')) setLevains(prev => [...prev, newLevain]);
    // FIX: Changed logEvent call to conform to new signature
    if (user) logEvent({ name: 'levain_pet_created', params: { userId: user.email, levainId: newLevain.id } });
  }, [firebaseUser, levains.length, user]);
  
  const updateLevain = useCallback(async (updatedData: Partial<Levain> & {id: string}) => {
    if (!firebaseUser) return;
    await firestoreService.updateDocument(firebaseUser.uid, 'levains', updatedData.id, updatedData);
    
    if(user?.uid.startsWith('dev-')) setLevains(prev => prev.map(l => l.id === updatedData.id ? {...l, ...updatedData} : l));
    // FIX: Changed logEvent call to conform to new signature
    if (user) logEvent({ name: 'levain_pet_profile_updated', params: { userId: user.email, levainId: updatedData.id } });
  }, [firebaseUser, user]);
  
  const deleteLevain = useCallback((id: string) => {
      if (!firebaseUser) return;
      firestoreService.deleteDocument(firebaseUser.uid, 'levains', id);
      if(user?.uid.startsWith('dev-')) setLevains(prev => prev.filter(l => l.id !== id));
  }, [firebaseUser, user]);
  
  const setDefaultLevain = useCallback(async (id: string) => {
    if (!firebaseUser) return;
     if (firebaseUser.uid.startsWith('dev-')) {
        setLevains(prev => prev.map(l => ({...l, isDefault: l.id === id})));
        return;
    }
    await firestoreService.setAsDefault(firebaseUser.uid, 'levains', id, levains);
  }, [firebaseUser, levains]);

  const addFeedingEvent = useCallback(async (levainId: string, eventData: Omit<FeedingEvent, 'id'|'date'>) => {
    if (!firebaseUser) return;
    const levain = levains.find(l => l.id === levainId);
    if (!levain) return;

    const now = new Date().toISOString();
    const newEvent = { id: crypto.randomUUID(), date: now, ...eventData };
    const updatedHistory = [newEvent, ...levain.feedingHistory];
    const updateData = { feedingHistory: updatedHistory, lastFeeding: now, status: 'ativo' };
    
    if(user?.uid.startsWith('dev-')) {
        setLevains(prev => prev.map(l => l.id === levainId ? { ...l, ...updateData } : l));
    } else {
        await firestoreService.updateDocument(firebaseUser.uid, 'levains', levainId, updateData);
    }
    // FIX: Changed logEvent call to conform to new signature
    if (user) logEvent({ name: 'levain_pet_feeding_logged', params: { userId: user.email, levainId } });
  }, [levains, firebaseUser, user]);

  const importLevains = useCallback(async (levainsToImport: Levain[]) => {
    if (!firebaseUser) return;
    if (firebaseUser.uid.startsWith('dev-')) {
         setLevains(prev => [...prev, ...levainsToImport]);
         return;
    }
    await firestoreService.bulkImport(firebaseUser.uid, 'levains', levainsToImport);
  }, [firebaseUser]);
  
  // GOALS
  const addGoal = useCallback(async (goalData: Omit<Goal, 'id' | 'createdAt' | 'updatedAt' | 'status' | 'progress'>): Promise<Goal> => {
    if (!firebaseUser) throw new Error("User not authenticated");
    const newGoal = await firestoreService.addDocument<Goal>(firebaseUser.uid, 'goals', {...goalData, status: 'ativo', progress: 0});
    if(user?.uid.startsWith('dev-')) setGoals(prev => [...prev, newGoal]);
    // FIX: Changed addToast call to conform to new signature
    addToast({message: 'New goal created!', type: 'success'});
    return newGoal;
  }, [firebaseUser, addToast, user]);

  const updateGoal = useCallback(async (updatedData: any) => { 
      if (!firebaseUser) return;
      await firestoreService.updateDocument(firebaseUser.uid, 'goals', updatedData.id, updatedData);
      if(user?.uid.startsWith('dev-')) setGoals(prev => prev.map(g => g.id === updatedData.id ? {...g, ...updatedData} : g));
      // FIX: Changed addToast call to conform to new signature
      addToast({message: 'Goal updated.', type: 'info'}); 
  }, [firebaseUser, addToast, user]);

  const deleteGoal = useCallback(async (id: string) => { 
      if (!firebaseUser) return;
      await firestoreService.deleteDocument(firebaseUser.uid, 'goals', id); 
      if(user?.uid.startsWith('dev-')) setGoals(prev => prev.filter(g => g.id !== id));
      // FIX: Changed addToast call to conform to new signature
      addToast({message: 'Goal deleted.', type: 'info'}); 
  }, [firebaseUser, addToast, user]);

  const completeGoal = useCallback(async (id: string) => { 
      if (!firebaseUser) return;
      await firestoreService.updateDocument(firebaseUser.uid, 'goals', id, { status: 'concluido', progress: 100 });
      if(user?.uid.startsWith('dev-')) setGoals(prev => prev.map(g => g.id === id ? {...g, status: 'concluido', progress: 100} : g));
      // FIX: Changed addToast call to conform to new signature
      addToast({message: 'Goal completed!', type: 'success'}); 
  }, [firebaseUser, addToast, user]);

  // TEST SERIES
  const addTestSeries = useCallback(async (seriesData: Omit<TestSeries, 'id' | 'createdAt' | 'updatedAt' | 'relatedBakes'>): Promise<TestSeries> => {
    if (!firebaseUser) throw new Error("User not authenticated");
    const newSeries = await firestoreService.addDocument<TestSeries>(firebaseUser.uid, 'testSeries', {...seriesData, relatedBakes: []});
    if(user?.uid.startsWith('dev-')) setTestSeries(prev => [...prev, newSeries]);
    // FIX: Changed addToast call to conform to new signature
    addToast({message: `Test series created.`, type: 'success'});
    return newSeries;
  }, [firebaseUser, addToast, user]);

  const updateTestSeries = useCallback(async (updatedData: any) => { 
      if (!firebaseUser) return;
      await firestoreService.updateDocument(firebaseUser.uid, 'testSeries', updatedData.id, updatedData);
      if(user?.uid.startsWith('dev-')) setTestSeries(prev => prev.map(s => s.id === updatedData.id ? {...s, ...updatedData} : s));
      // FIX: Changed addToast call to conform to new signature
      addToast({message: 'Series updated.', type: 'info'}); 
  }, [firebaseUser, addToast, user]);

  const deleteTestSeries = useCallback(async (id: string) => { 
      if (!firebaseUser) return;
      await firestoreService.deleteDocument(firebaseUser.uid, 'testSeries', id);
      if(user?.uid.startsWith('dev-')) setTestSeries(prev => prev.filter(s => s.id !== id));
      // FIX: Changed addToast call to conform to new signature
      addToast({message: 'Series deleted.', type: 'info'}); 
  }, [firebaseUser, addToast, user]);

  const attachBakeToSeries = useCallback(async (seriesId: string, bakeId: string) => {
      if (!firebaseUser) return;
      const series = testSeries.find(s => s.id === seriesId);
      if(series && !series.relatedBakes.includes(bakeId)) {
        await firestoreService.updateDocument(firebaseUser.uid, 'testSeries', seriesId, { relatedBakes: [...series.relatedBakes, bakeId] });
         if(user?.uid.startsWith('dev-')) setTestSeries(prev => prev.map(s => s.id === seriesId ? {...s, relatedBakes: [...s.relatedBakes, bakeId]} : s));
        // FIX: Changed addToast call to conform to new signature
        addToast({message: 'Bake associated successfully!', type: 'success'});
      } else {
        // FIX: Changed addToast call to conform to new signature
        addToast({message: 'Bake already associated.', type: 'info'});
      }
  }, [testSeries, firebaseUser, addToast, user]);

  // --- Helper Logic ---
  const addCustomIngredient = useCallback((ingredient: CustomIngredientDefinition) => {
      if (customIngredientLibrary.some(i => i.name.toLowerCase() === ingredient.name.toLowerCase())) return;
      const updated = [...customIngredientLibrary, ingredient];
      setCustomIngredientLibrary(updated);
      try { localStorage.setItem('dough-lab-custom-ingredients', JSON.stringify(updated)); } catch (e) { console.error(e); }
  }, [customIngredientLibrary]);
  
  const toggleStyleFavorite = useCallback((id: string) => {
      setFavoriteStyleIds(prev => {
          const newFavs = prev.includes(id) ? prev.filter(fav => fav !== id) : [...prev, id];
          try { localStorage.setItem('dough-lab-fav-styles', JSON.stringify(newFavs)); } catch (e) { console.error(e); }
          return newFavs;
      });
  }, []);
  
  const createBatchFromStyle = useCallback(async (style: DoughStyleDefinition): Promise<string> => {
     let recipeStyle = RecipeStyle.NEAPOLITAN; // Default fallback
     if (style.category === 'Pão') recipeStyle = RecipeStyle.COUNTRY_LOAF;
     else if (style.category === 'Doce') recipeStyle = RecipeStyle.BRIOCHE;
     
     const config: DoughConfig = {
        bakeType: style.category === 'Pizza' ? BakeType.PIZZAS : style.category === 'Pão' ? BakeType.BREADS_SAVORY : BakeType.SWEETS_PASTRY,
        recipeStyle: recipeStyle,
        baseStyleName: style.name,
        hydration: style.technical.hydration,
        salt: style.technical.salt,
        oil: style.technical.oil,
        sugar: style.technical.sugar,
        bakingTempC: style.technical.bakingTempC,
        fermentationTechnique: style.technical.fermentationTechnique,
        ingredients: style.ingredients.map(ing => ({...ing, manualOverride: false})),
        numPizzas: 4,
        doughBallWeight: 250,
        yeastType: YeastType.IDY,
        yeastPercentage: 0.5,
        prefermentFlourPercentage: 20,
        scale: 1,
        flourId: style.ingredients.find(i => i.role === 'flour')?.id || 'generic_all_purpose',
        ambientTemperature: AmbientTemperature.MILD,
        notes: `Created from style: ${style.name}`,
    };

    const newBatch = await addBatch({
        name: style.name,
        doughConfig: config,
        status: BatchStatus.DRAFT,
        isFavorite: false,
    });
    
    return newBatch.id;
  }, [addBatch]);

  // --- Entitlements ---
  const grantProAccess = useCallback(() => {
      if (user) updateUser({ isPro: true });
      setIsSessionPro(true);
  }, [user, updateUser]);

  const grantSessionProAccess = useCallback(() => setIsSessionPro(true), []);
  const grant24hPass = useCallback(() => setIsSessionPro(true), []);
  const hasProAccess = isProUser(user) || isSessionPro;
  const isPassOnCooldown = false;
  
  // Value Memoization
  const value: UserContextType = useMemo(() => ({
    isAuthenticated: !!firebaseUser,
    user, login, devLogin, logout, updateUser,
    hasProAccess, grantProAccess, grantSessionProAccess, grant24hPass, isPassOnCooldown, cooldownHoursRemaining: cooldownHours,
    isPaywallOpen, paywallOrigin, openPaywall, closePaywall,
    ovens, addOven, updateOven, deleteOven, setDefaultOven,
    preferredFlourId: userSettings.preferredFlourId, setPreferredFlour,
    batches, addBatch, updateBatch, deleteBatch, createDraftBatch,
    levains, addLevain, updateLevain, deleteLevain, setDefaultLevain, addFeedingEvent, importLevains,
    goals, addGoal, updateGoal, deleteGoal, completeGoal,
    testSeries, addTestSeries, updateTestSeries, deleteTestSeries, attachBakeToSeries,
    customIngredientLibrary, addCustomIngredient,
    createBatchFromStyle, favoriteStyleIds, toggleStyleFavorite
  }), [
    firebaseUser, user, login, devLogin, logout, updateUser, 
    hasProAccess, grantProAccess, grantSessionProAccess, grant24hPass, isPassOnCooldown, cooldownHours,
    isPaywallOpen, paywallOrigin, openPaywall, closePaywall,
    ovens, addOven, updateOven, deleteOven, setDefaultOven,
    userSettings.preferredFlourId, setPreferredFlour,
    batches, addBatch, updateBatch, deleteBatch, createDraftBatch,
    levains, addLevain, updateLevain, deleteLevain, setDefaultLevain, addFeedingEvent, importLevains,
    goals, addGoal, updateGoal, deleteGoal, completeGoal,
    testSeries, addTestSeries, updateTestSeries, deleteTestSeries, attachBakeToSeries,
    customIngredientLibrary, addCustomIngredient,
    createBatchFromStyle, favoriteStyleIds, toggleStyleFavorite
  ]);

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (context === undefined) throw new Error('useUser must be used within a UserProvider');
  return context;
};