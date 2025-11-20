
import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { 
  UserContextType, 
  User, 
  Oven, 
  Levain, 
  Batch, 
  Goal, 
  TestSeries, 
  CustomIngredientDefinition, 
  DoughConfig,
  DoughStyle,
  BakeType,
  FermentationTechnique,
  BatchStatus,
  LevainStatus,
  FeedingEvent,
  PaywallOrigin,
  LevainStarter
} from '../types';
import { useAuth } from './AuthContext';
import { DEFAULT_CONFIG } from '../constants';
import { logEvent } from '../services/analytics';

// Firestore Stores
import { 
    createBatchInFirestore, 
    updateBatchInFirestore, 
    deleteBatchInFirestore, 
    listBatchesByUser 
} from '../firebase/batchStore';

import {
    createOvenInFirestore,
    updateOvenInFirestore,
    deleteOvenInFirestore,
    listOvensByUser
} from '../firebase/ovenStore';

import {
    createLevainStarter,
    updateLevainStarter,
    listLevainStartersByUser,
    createFeedingLog,
    listFeedingLogs,
    archiveLevainStarter
} from '../firebase/levainPetStore';
import { calculateLevainStatus } from '../logic/levainPetUtils';

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { appUser, loginWithGoogle, devLogin, logout: authLogout } = useAuth();
  
  // State
  const [ovens, setOvens] = useState<Oven[]>([]);
  const [levains, setLevains] = useState<Levain[]>([]);
  const [batches, setBatches] = useState<Batch[]>([]);
  const [goals, setGoals] = useState<Goal[]>([]);
  const [testSeries, setTestSeries] = useState<TestSeries[]>([]);
  const [customIngredientLibrary, setCustomIngredientLibrary] = useState<CustomIngredientDefinition[]>([]);
  const [favoriteStyleIds, setFavoriteStyleIds] = useState<string[]>([]);
  const [preferredFlourId, setPreferredFlourId] = useState<string | null>(null);

  // Paywall & Pro State
  const [isPaywallOpen, setIsPaywallOpen] = useState(false);
  const [paywallOrigin, setPaywallOrigin] = useState<PaywallOrigin | null>(null);
  const [sessionPro, setSessionPro] = useState(false);
  const [passCooldown, setPassCooldown] = useState(0); // Mock

  const hasProAccess = appUser?.isPro || sessionPro;

  // --- DATA LOADING ---
  useEffect(() => {
      const loadData = async () => {
          if (appUser) {
              // --- Authenticated: Load from Firestore ---
              try {
                  // 1. Ovens
                  const firestoreOvens = await listOvensByUser(appUser.uid);
                  setOvens(firestoreOvens);

                  // 2. Batches
                  const firestoreBatches = await listBatchesByUser(appUser.uid);
                  // Sort by date descending
                  setBatches(firestoreBatches.sort((a,b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()));

                  // 3. Levains (Complex: Need to fetch starters AND recent logs to build "Levain" object)
                  const starters = await listLevainStartersByUser(appUser.uid);
                  const fullLevains: Levain[] = [];
                  
                  for (const starter of starters) {
                      const logs = await listFeedingLogs(starter.id, 50);
                      // Map to app's Levain type
                      fullLevains.push({
                          id: starter.id,
                          name: starter.name,
                          hydration: starter.hydration,
                          baseFlourType: starter.baseFlourType,
                          createdAt: starter.createdAt.toDate().toISOString(),
                          // If logs exist, use latest log date, else creation date
                          lastFeeding: logs.length > 0 ? logs[0].dateTime.toDate().toISOString() : starter.createdAt.toDate().toISOString(),
                          totalWeight: 200, // default/calc
                          isDefault: false, // logic needed
                          status: calculateLevainStatus(starter, logs),
                          typicalUse: starter.typicalUse,
                          notes: starter.notes,
                          notificationEnabled: starter.notificationEnabled,
                          idealFeedingIntervalHours: starter.idealFeedingIntervalHours,
                          feedingHistory: logs.map(log => ({
                              id: log.id,
                              date: log.dateTime.toDate().toISOString(),
                              flourAmount: log.flourAmount,
                              waterAmount: log.waterAmount,
                              flourType: log.flourType,
                              ratio: log.ratio,
                              ambientTemperature: log.ambientTemperature,
                              notes: log.notes
                          }))
                      });
                  }
                  
                  // Ensure at least one default if list not empty
                  if (fullLevains.length > 0 && !fullLevains.some(l => l.isDefault)) {
                      fullLevains[0].isDefault = true;
                  }
                  setLevains(fullLevains);

                  // Goals & others (still local or todo)
                  // For now we stick to local storage for minor features to reduce complexity
                  const loadLocal = (key: string, setter: any) => {
                      try { const s = localStorage.getItem(`doughlab_${key}`); if (s) setter(JSON.parse(s)); } catch(e){}
                  };
                  loadLocal('goals', setGoals);
                  loadLocal('testSeries', setTestSeries);
                  loadLocal('favorites', setFavoriteStyleIds);

              } catch (error) {
                  console.error("Failed to load data from Firestore:", error);
              }

          } else {
              // --- Guest: Load from LocalStorage ---
              const loadLocal = (key: string, setter: any) => {
                  try {
                    const stored = localStorage.getItem(`doughlab_${key}`);
                    if (stored) setter(JSON.parse(stored));
                  } catch (e) {
                    console.error(`Failed to load ${key}`, e);
                  }
              };
              loadLocal('ovens', setOvens);
              loadLocal('levains', setLevains);
              loadLocal('batches', setBatches);
              loadLocal('goals', setGoals);
              loadLocal('testSeries', setTestSeries);
              loadLocal('customIngredients', setCustomIngredientLibrary);
              loadLocal('favorites', setFavoriteStyleIds);
              loadLocal('prefFlour', setPreferredFlourId);
          }
      };
      
      loadData();
  }, [appUser]);

  // Persist data on change (ONLY FOR GUEST)
  useEffect(() => {
      if (!appUser) {
          localStorage.setItem('doughlab_ovens', JSON.stringify(ovens));
          localStorage.setItem('doughlab_levains', JSON.stringify(levains));
          localStorage.setItem('doughlab_batches', JSON.stringify(batches));
          localStorage.setItem('doughlab_goals', JSON.stringify(goals));
          localStorage.setItem('doughlab_testSeries', JSON.stringify(testSeries));
          localStorage.setItem('doughlab_customIngredients', JSON.stringify(customIngredientLibrary));
          localStorage.setItem('doughlab_favorites', JSON.stringify(favoriteStyleIds));
          if(preferredFlourId) localStorage.setItem('doughlab_prefFlour', JSON.stringify(preferredFlourId));
      }
  }, [ovens, levains, batches, goals, testSeries, customIngredientLibrary, favoriteStyleIds, preferredFlourId, appUser]);

  // Methods
  const updateUser = (data: Partial<User>) => {
      console.log('Update user', data);
  };

  const grantProAccess = () => {
      setSessionPro(true);
  };
  
  const grantSessionProAccess = () => setSessionPro(true);
  const grant24hPass = () => setSessionPro(true); // Mock

  const openPaywall = (origin?: PaywallOrigin) => {
      setPaywallOrigin(origin || 'general');
      setIsPaywallOpen(true);
  };
  const closePaywall = () => setIsPaywallOpen(false);

  // --- Ovens ---
  const addOven = async (ovenData: Omit<Oven, 'id' | 'isDefault'>) => {
      if (appUser) {
          // Firestore
          // Determine default status based on existing ovens
          const isDefault = ovens.length === 0;
          const ovenPayload = { ...ovenData, isDefault };
          const newOven = await createOvenInFirestore(appUser.uid, ovenPayload);
          setOvens(prev => [...prev, newOven]);
      } else {
          // Local
          const newOven = { ...ovenData, id: crypto.randomUUID(), isDefault: ovens.length === 0 };
          setOvens(prev => [...prev, newOven]);
      }
  };
  
  const updateOven = async (oven: Oven) => {
      if (appUser) {
          await updateOvenInFirestore(oven.id, oven);
          setOvens(prev => prev.map(o => o.id === oven.id ? oven : o));
      } else {
          setOvens(prev => prev.map(o => o.id === oven.id ? oven : o));
      }
  };
  
  const deleteOven = async (id: string) => {
      if (appUser) {
          await deleteOvenInFirestore(id);
          setOvens(prev => prev.filter(o => o.id !== id));
      } else {
          setOvens(prev => prev.filter(o => o.id !== id));
      }
  };
  
  const setDefaultOven = (id: string) => {
      // This logic might need a "preference" store in Firestore, but for now we handle state.
      // In a full implementation, we'd update all ovens in DB to set isDefault=false/true.
      setOvens(prev => prev.map(o => ({ ...o, isDefault: o.id === id })));
  };

  // --- Levains ---
  const addLevain = async (levainData: Omit<Levain, 'id' | 'isDefault' | 'feedingHistory' | 'status' | 'createdAt'>) => {
      if (appUser) {
          const starter = await createLevainStarter({
              userId: appUser.uid,
              name: levainData.name,
              hydration: levainData.hydration,
              baseFlourType: levainData.baseFlourType,
              typicalUse: levainData.typicalUse,
              notes: levainData.notes,
              notificationEnabled: levainData.notificationEnabled,
              idealFeedingIntervalHours: levainData.idealFeedingIntervalHours
          });
          
          const newLevain: Levain = {
              ...levainData,
              id: starter.id,
              isDefault: levains.length === 0,
              feedingHistory: [],
              status: 'precisa_atencao',
              createdAt: starter.createdAt.toDate().toISOString(),
              lastFeeding: starter.createdAt.toDate().toISOString(),
              totalWeight: levainData.totalWeight
          };
          setLevains(prev => [...prev, newLevain]);
      } else {
          const newLevain: Levain = {
              ...levainData,
              id: crypto.randomUUID(),
              isDefault: levains.length === 0,
              feedingHistory: [],
              status: 'ativo',
              createdAt: new Date().toISOString(),
              lastFeeding: new Date().toISOString(),
          };
          setLevains(prev => [...prev, newLevain]);
      }
  };
  
  const updateLevain = async (data: Partial<Levain> & { id: string }) => {
      if (appUser) {
          // Map local Levain type fields back to Firestore LevainStarter fields
          const updates: any = {};
          if (data.name) updates.name = data.name;
          if (data.hydration) updates.hydration = data.hydration;
          if (data.notes) updates.notes = data.notes;
          if (data.typicalUse) updates.typicalUse = data.typicalUse;
          
          await updateLevainStarter(data.id, updates);
          setLevains(prev => prev.map(l => l.id === data.id ? { ...l, ...data } : l));
      } else {
          setLevains(prev => prev.map(l => l.id === data.id ? { ...l, ...data } : l));
      }
  };

  const deleteLevain = async (id: string) => {
      if (appUser) {
          await archiveLevainStarter(id); // Soft delete
          setLevains(prev => prev.filter(l => l.id !== id));
      } else {
          setLevains(prev => prev.filter(l => l.id !== id));
      }
  };
  const setDefaultLevain = (id: string) => {
      setLevains(prev => prev.map(l => ({ ...l, isDefault: l.id === id })));
  };
  
  const addFeedingEvent = async (levainId: string, event: Omit<FeedingEvent, 'id' | 'date'>) => {
      if (appUser) {
          const log = await createFeedingLog({
              levainId,
              flourAmount: event.flourAmount,
              waterAmount: event.waterAmount,
              ratio: event.ratio,
              flourType: event.flourType,
              ambientTemperature: event.ambientTemperature,
              notes: event.notes
          });
          
          const newEvent: FeedingEvent = {
              ...event,
              id: log.id,
              date: log.dateTime.toDate().toISOString()
          };
          
           setLevains(prev => prev.map(l => {
              if (l.id !== levainId) return l;
              return { 
                  ...l, 
                  feedingHistory: [newEvent, ...l.feedingHistory], 
                  lastFeeding: newEvent.date, 
                  status: 'ativo' // Optimistic update
              };
          }));
      } else {
          const newEvent: FeedingEvent = { ...event, id: crypto.randomUUID(), date: new Date().toISOString() };
          setLevains(prev => prev.map(l => {
              if (l.id !== levainId) return l;
              return { ...l, feedingHistory: [newEvent, ...l.feedingHistory], lastFeeding: newEvent.date, status: 'ativo' };
          }));
      }
  };
  
  const importLevains = (newLevains: Levain[]) => {
      // Basic import: just append locally for now, implementing deep import to Firestore is complex
      // If user is logged in, we might want to loop and create them
      if (appUser) {
          // TODO: Implement batch import to Firestore
          console.warn("Import to Firestore not fully implemented yet. Adding locally.");
      }
      setLevains(prev => [...prev, ...newLevains]);
  };

  // --- Batches ---
  const addBatch = async (newBatch: Omit<Batch, 'id' | 'createdAt' | 'updatedAt'>) => {
      if (appUser) {
          const batch = await createBatchInFirestore(appUser.uid, newBatch);
          setBatches(prev => [batch, ...prev]);
          return batch;
      } else {
          const batch: Batch = {
              ...newBatch,
              id: crypto.randomUUID(),
              createdAt: new Date().toISOString(),
              updatedAt: new Date().toISOString(),
          };
          setBatches(prev => [batch, ...prev]);
          return batch;
      }
  };
  
  const updateBatch = async (updated: Batch) => {
      if (appUser) {
          const { id, ...rest } = updated;
          await updateBatchInFirestore(id, rest);
          setBatches(prev => prev.map(b => b.id === updated.id ? { ...updated, updatedAt: new Date().toISOString() } : b));
      } else {
          setBatches(prev => prev.map(b => b.id === updated.id ? { ...updated, updatedAt: new Date().toISOString() } : b));
      }
  };
  
  const deleteBatch = async (id: string) => {
      if (appUser) {
          await deleteBatchInFirestore(id);
          setBatches(prev => prev.filter(b => b.id !== id));
      } else {
          setBatches(prev => prev.filter(b => b.id !== id));
      }
  };
  
  const createDraftBatch = async () => {
      const draft: Omit<Batch, 'id' | 'createdAt' | 'updatedAt'> = {
          name: 'New Draft',
          doughConfig: { ...DEFAULT_CONFIG },
          status: BatchStatus.DRAFT,
          isFavorite: false,
      };
      return addBatch(draft);
  };

  // Goals & Test Series (Local only for now to save complexity, but structure ready for Firestore expansion)
  const addGoal = async (g: any) => { 
      const newGoal = { ...g, id: crypto.randomUUID(), createdAt: new Date().toISOString(), status: 'ativo', progress: 0 };
      setGoals(prev => [...prev, newGoal]);
      return newGoal;
  };
  const updateGoal = (g: any) => setGoals(prev => prev.map(i => i.id === g.id ? { ...i, ...g } : i));
  const deleteGoal = (id: string) => setGoals(prev => prev.filter(i => i.id !== id));
  const completeGoal = (id: string) => updateGoal({ id, status: 'concluido', progress: 100 });

  const addTestSeries = async (s: any) => {
      const newSeries = { ...s, id: crypto.randomUUID(), createdAt: new Date().toISOString(), relatedBakes: [] };
      setTestSeries(prev => [...prev, newSeries]);
      return newSeries;
  };
  const updateTestSeries = (s: any) => setTestSeries(prev => prev.map(i => i.id === s.id ? { ...i, ...s } : i));
  const deleteTestSeries = (id: string) => setTestSeries(prev => prev.filter(i => i.id !== id));
  const attachBakeToSeries = (seriesId: string, bakeId: string) => {
      setTestSeries(prev => prev.map(s => s.id === seriesId ? { ...s, relatedBakes: [...s.relatedBakes, bakeId] } : s));
  };

  const addCustomIngredient = (ing: CustomIngredientDefinition) => {
      if (!customIngredientLibrary.some(i => i.name === ing.name)) {
          setCustomIngredientLibrary(prev => [...prev, ing]);
      }
  };

  const toggleStyleFavorite = (id: string) => {
      setFavoriteStyleIds(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
  };

  const createBatchFromStyle = useCallback(async (style: DoughStyle): Promise<string> => {
      const defaultPreset = style.defaultPreset;
      const category = defaultPreset?.category || style.category;
      
      let bakeType = BakeType.PIZZAS;
      const c = category.toLowerCase();
      
      if (c.includes('pizza')) {
          bakeType = BakeType.PIZZAS;
      } else if (c.includes('pão') || c.includes('bread') || c.includes('flatbread') || c.includes('savory')) {
          bakeType = BakeType.BREADS_SAVORY;
      } else {
          bakeType = BakeType.SWEETS_PASTRY;
      }

      const config: DoughConfig = {
          ...DEFAULT_CONFIG,
          bakeType: bakeType,
          recipeStyle: defaultPreset?.recipeStyle || DEFAULT_CONFIG.recipeStyle,
          hydration: defaultPreset?.hydration ?? 60,
          salt: defaultPreset?.salt ?? 2,
          oil: defaultPreset?.oil ?? defaultPreset?.fat ?? 0,
          sugar: defaultPreset?.sugar ?? 0,
          fermentationTechnique: defaultPreset?.fermentationTechnique || FermentationTechnique.DIRECT,
          bakingTempC: defaultPreset?.bakingTempC || 250,
          baseStyleName: style.name,
      };

      const batch = await addBatch({
          name: `Batch: ${style.name}`,
          doughConfig: config,
          status: BatchStatus.DRAFT,
          isFavorite: false,
          styleId: style.id,
          styleName: style.name,
          styleCategory: style.category,
          styleSourceType: style.sourceType,
      });
      
      return batch.id;
  }, [addBatch]);


  return (
    <UserContext.Provider value={{
        isAuthenticated: !!appUser,
        user: appUser,
        login: loginWithGoogle,
        devLogin,
        logout: authLogout,
        updateUser,
        hasProAccess,
        grantProAccess,
        grantSessionProAccess,
        grant24hPass,
        isPassOnCooldown: false,
        cooldownHoursRemaining: 0,
        isPaywallOpen,
        paywallOrigin,
        openPaywall,
        closePaywall,
        ovens,
        addOven,
        updateOven,
        deleteOven,
        setDefaultOven,
        levains,
        addLevain,
        updateLevain,
        deleteLevain,
        setDefaultLevain,
        addFeedingEvent,
        importLevains,
        preferredFlourId,
        setPreferredFlour: setPreferredFlourId,
        batches,
        addBatch,
        updateBatch,
        deleteBatch,
        createDraftBatch,
        goals,
        addGoal,
        updateGoal,
        deleteGoal,
        completeGoal,
        testSeries,
        addTestSeries,
        updateTestSeries,
        deleteTestSeries,
        attachBakeToSeries,
        customIngredientLibrary,
        addCustomIngredient,
        favoriteStyleIds,
        toggleStyleFavorite,
        createBatchFromStyle,
    }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
