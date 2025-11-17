import React, { useState, useEffect, useCallback, createContext, useContext, ReactNode } from 'react';
import { User, Oven, Batch, Levain, FeedingEvent, UserContextType, BatchStatus, LevainStatus, Goal, GoalStatus, TestSeries } from '../types';
import { useToast } from '../components/ToastProvider';
import { DEFAULT_CONFIG } from '../constants';
import { hoursBetween } from '../helpers';
import { logEvent } from '../services/analytics';
import { scheduleNotification, cancelNotificationsForLevain } from '../services/notifications';

const AUTH_KEY = 'dough-lab-auth';
const ENTITLEMENTS_KEY = 'dough-lab-entitlements';
const OVENS_KEY = 'dough-lab-ovens';
const USER_SETTINGS_KEY = 'dough-lab-user-settings';
const BATCHES_KEY = 'dough-lab-batches';
const LEVAINS_KEY = 'dough-lab-levains';
const GOALS_KEY = 'dough-lab-goals';
const TEST_SERIES_KEY = 'dough-lab-test-series';
const LEGACY_SAVED_CONFIGS_KEY = 'dough-lab-saved-configs';

interface UserSettings {
    preferredFlourId: string | null;
}

interface Entitlements {
  isPro: boolean;
  passUntil: number | null;
  lastPassGrantedAt: number | null;
}

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
  const [user, setUser] = useState<User | null>(null);
  const [ovens, setOvens] = useState<Oven[]>([]);
  const [batches, setBatches] = useState<Batch[]>([]);
  const [levains, setLevains] = useState<Levain[]>([]);
  const [goals, setGoals] = useState<Goal[]>([]);
  const [testSeries, setTestSeries] = useState<TestSeries[]>([]);
  const [userSettings, setUserSettings] = useState<UserSettings>({
      preferredFlourId: null,
  });

  // --- Entitlements State ---
  const [entitlements, setEntitlements] = useState<Entitlements>({
    isPro: false,
    passUntil: null,
    lastPassGrantedAt: null,
  });
  const [isSessionPro, setIsSessionPro] = useState<boolean>(false);
  const [cooldownHours, setCooldownHours] = useState(0);

  // --- Auth & Data Loading Effects ---
  useEffect(() => {
    try {
      const storedUser = localStorage.getItem(AUTH_KEY);
      if (storedUser) setUser(JSON.parse(storedUser));

      const storedOvens = localStorage.getItem(OVENS_KEY);
      if(storedOvens) setOvens(JSON.parse(storedOvens));

      const storedSettings = localStorage.getItem(USER_SETTINGS_KEY);
      if(storedSettings) setUserSettings(JSON.parse(storedSettings));
      
      const storedLevainsRaw = localStorage.getItem(LEVAINS_KEY);
      if (storedLevainsRaw) {
        const loadedLevains = JSON.parse(storedLevainsRaw);
        // Recalculate status on load
        const updatedLevains = loadedLevains.map((l: Levain) => ({
            ...l,
            status: getStatusFromLastFeeding(l)
        }));
        setLevains(updatedLevains);
      }
      
      const storedGoals = localStorage.getItem(GOALS_KEY);
      if(storedGoals) setGoals(JSON.parse(storedGoals));

      const storedTestSeries = localStorage.getItem(TEST_SERIES_KEY);
      if(storedTestSeries) setTestSeries(JSON.parse(storedTestSeries));

      // --- Batches Loading & Migration ---
      const legacyConfigsRaw = localStorage.getItem(LEGACY_SAVED_CONFIGS_KEY);
      const storedBatchesRaw = localStorage.getItem(BATCHES_KEY);
      let loadedBatches: Batch[] = [];

      if (legacyConfigsRaw) {
        // Migrate legacy data
        console.log("Migrating legacy saved configs to new batch format...");
        const legacyConfigs = JSON.parse(legacyConfigsRaw);
        loadedBatches = legacyConfigs.map((c: any) => ({
          id: c.id || crypto.randomUUID(),
          name: c.name || 'Receita Migrada',
          doughConfig: c.config,
          createdAt: c.createdAt || new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          status: BatchStatus.COMPLETED, // Assume old recipes are completed
          isFavorite: c.isFavorite || false,
        }));
        localStorage.setItem(BATCHES_KEY, JSON.stringify(loadedBatches));
        localStorage.removeItem(LEGACY_SAVED_CONFIGS_KEY);
        // This is a special case where we can't use the hook yet, so we pass the key.
        // The toast provider will handle the translation.
        addToast('info.legacy_migration', 'info');
      } else if (storedBatchesRaw) {
        loadedBatches = JSON.parse(storedBatchesRaw);
      }
      setBatches(loadedBatches);


    } catch (error) {
      console.error('Failed to load user data from localStorage', error);
      addToast('info.error.generic', 'error');
    }
  }, [addToast]);
  
  const login = useCallback((userData: User) => {
    setUser(userData);
    try {
      localStorage.setItem(AUTH_KEY, JSON.stringify(userData));
    } catch (error) {
      console.error('Failed to save user to localStorage', error);
    }
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    setOvens([]); // Clear ovens on logout
    setBatches([]);
    setLevains([]);
    setGoals([]);
    setTestSeries([]);
    setUserSettings({ preferredFlourId: null });
    try {
      localStorage.removeItem(AUTH_KEY);
      localStorage.removeItem(OVENS_KEY);
      localStorage.removeItem(USER_SETTINGS_KEY);
      localStorage.removeItem(BATCHES_KEY);
      localStorage.removeItem(LEVAINS_KEY);
      localStorage.removeItem(GOALS_KEY);
      localStorage.removeItem(TEST_SERIES_KEY);
    } catch (error) {
      console.error('Failed to remove user data from localStorage', error);
    }
  }, []);

  const updateUser = useCallback(
    (updatedData: Partial<User>) => {
      if (user) {
        const newUser = { ...user, ...updatedData };
        setUser(newUser);
        try {
          localStorage.setItem(AUTH_KEY, JSON.stringify(newUser));
        } catch (error) {
          console.error('Failed to save updated user to localStorage', error);
        }
      }
    },
    [user],
  );

  // --- User Settings Management ---
  useEffect(() => {
    try {
      localStorage.setItem(USER_SETTINGS_KEY, JSON.stringify(userSettings));
    } catch (error) {
        console.error('Failed to save user settings to localStorage:', error);
    }
  }, [userSettings]);

  const setPreferredFlour = useCallback((id: string | null) => {
      setUserSettings(prev => ({...prev, preferredFlourId: id}));
  }, []);

  // --- Oven Management ---
  useEffect(() => {
    try {
      localStorage.setItem(OVENS_KEY, JSON.stringify(ovens));
    } catch (error) {
      console.error('Failed to save ovens to localStorage:', error);
    }
  }, [ovens]);

  const addOven = useCallback((newOvenData: Omit<Oven, 'id' | 'isDefault'>) => {
    setOvens(prev => {
        const newOven: Oven = {
            ...newOvenData,
            id: crypto.randomUUID(),
            isDefault: prev.length === 0, // Make first oven default
        };
        return [...prev, newOven];
    });
  }, []);

  const updateOven = useCallback((updatedOven: Oven) => {
    setOvens(prev => prev.map(o => o.id === updatedOven.id ? updatedOven : o));
  }, []);

  const deleteOven = useCallback((id: string) => {
    setOvens(prev => prev.filter(o => o.id !== id));
  }, []);

  const setDefaultOven = useCallback((id: string) => {
    setOvens(prev => prev.map(o => ({...o, isDefault: o.id === id})));
  }, []);

  // --- Batch Management ---
  useEffect(() => {
    try {
      localStorage.setItem(BATCHES_KEY, JSON.stringify(batches));
    } catch(error) {
      console.error('Failed to save batches to localStorage:', error);
    }
  }, [batches]);

  const addBatch = useCallback((newBatchData: Omit<Batch, 'id' | 'createdAt' | 'updatedAt'>) => {
    const now = new Date().toISOString();
    const newBatch: Batch = {
      ...newBatchData,
      id: crypto.randomUUID(),
      createdAt: now,
      updatedAt: now,
    };
    setBatches(prev => [...prev, newBatch]);
    return newBatch;
  }, []);

  const createDraftBatch = useCallback(() => {
    const now = new Date().toISOString();
    const draftBatch: Batch = {
        id: crypto.randomUUID(),
        name: 'Nova Fornada (Rascunho)',
        doughConfig: DEFAULT_CONFIG,
        status: BatchStatus.DRAFT,
        isFavorite: false,
        createdAt: now,
        updatedAt: now,
    };
     setBatches(prev => [...prev, draftBatch]);
     return draftBatch;
  }, []);

  const updateBatch = useCallback((updatedBatch: Batch) => {
    setBatches(prev => prev.map(b => b.id === updatedBatch.id ? {...updatedBatch, updatedAt: new Date().toISOString()} : b));
  }, []);

  const deleteBatch = useCallback((id: string) => {
    setBatches(prev => {
      const batchToDelete = prev.find(b => b.id === id);
      if(batchToDelete){
        addToast(`Fornada "${batchToDelete.name}" excluída.`, 'info');
        return prev.filter(b => b.id !== id);
      }
      return prev;
    });
  }, [addToast]);

  // --- Levain Management ---
  useEffect(() => {
    try {
      localStorage.setItem(LEVAINS_KEY, JSON.stringify(levains));
    } catch (error) {
      console.error('Failed to save levains to localStorage:', error);
    }
  }, [levains]);

  const addLevain = useCallback((newLevainData: Omit<Levain, 'id' | 'isDefault' | 'feedingHistory' | 'status' | 'createdAt'>) => {
    setLevains(prev => {
      const now = new Date().toISOString();
      const newLevain: Levain = {
        ...newLevainData,
        id: crypto.randomUUID(),
        createdAt: now,
        lastFeeding: now,
        status: 'ativo',
        isDefault: prev.length === 0,
        feedingHistory: [],
      };
      if (user) {
        logEvent('levain_pet_created', { userId: user.email, levainId: newLevain.id });
      }
      return [...prev, newLevain];
    });
  }, [user]);

  const updateLevain = useCallback((updatedData: Partial<Levain> & { id: string }) => {
    setLevains(prev => prev.map(l => {
        if (l.id === updatedData.id) {
            const wasEnabled = l.notificationEnabled;
            const updatedLevain = { ...l, ...updatedData };

            if (user) {
                logEvent('levain_pet_profile_updated', { userId: user.email, levainId: l.id });
            }

            if (wasEnabled && !updatedLevain.notificationEnabled) {
                cancelNotificationsForLevain(l.id);
            }
            return updatedLevain;
        }
        return l;
    }));
  }, [user]);

  const deleteLevain = useCallback((id: string) => {
    setLevains(prev => prev.filter(l => l.id !== id));
  }, []);

  const setDefaultLevain = useCallback((id: string) => {
    setLevains(prev => prev.map(l => ({...l, isDefault: l.id === id})));
  }, []);

  const addFeedingEvent = useCallback((levainId: string, eventData: Omit<FeedingEvent, 'id' | 'date'>) => {
    setLevains(prev => prev.map(levain => {
      if (levain.id === levainId) {
        const now = new Date().toISOString();
        const newEvent: FeedingEvent = {
          id: crypto.randomUUID(),
          date: now,
          flourAmount: eventData.flourAmount || 0,
          waterAmount: eventData.waterAmount || 0,
          ratio: eventData.ratio,
          flourType: eventData.flourType,
          ambientTemperature: eventData.ambientTemperature,
          notes: eventData.notes,
        };
        const updatedLevain: Levain = {
          ...levain,
          lastFeeding: now,
          status: 'ativo',
          feedingHistory: [newEvent, ...levain.feedingHistory],
        };

        if (user) {
            logEvent('levain_pet_feeding_logged', { userId: user.email, levainId });
        }
        
        if (updatedLevain.notificationEnabled && updatedLevain.idealFeedingIntervalHours) {
            const scheduledTime = new Date();
            scheduledTime.setHours(scheduledTime.getHours() + updatedLevain.idealFeedingIntervalHours);
            scheduleNotification(updatedLevain.name, updatedLevain.id, scheduledTime);
        }
        
        return updatedLevain;
      }
      return levain;
    }));
  }, [user]);

  const importLevains = useCallback((levainsToImport: Levain[]) => {
    setLevains(prev => {
      const existingIds = new Set(prev.map(l => l.id));
      const newUniqueLevains = levainsToImport.filter(l => !existingIds.has(l.id));
      return [...prev, ...newUniqueLevains];
    });
  }, []);

  // --- Goal Management ---
  useEffect(() => {
    try {
      localStorage.setItem(GOALS_KEY, JSON.stringify(goals));
    } catch (error) {
        console.error('Failed to save goals to localStorage:', error);
    }
  }, [goals]);

  const addGoal = useCallback((newGoalData: Omit<Goal, 'id' | 'createdAt' | 'updatedAt' | 'status' | 'progress'>): Goal => {
    const now = new Date().toISOString();
    const newGoal: Goal = {
        ...newGoalData,
        id: crypto.randomUUID(),
        createdAt: now,
        updatedAt: now,
        status: 'ativo',
        progress: 0,
    };
    setGoals(prev => [...prev, newGoal]);
    addToast('Novo objetivo criado!', 'success');
    return newGoal;
  }, [addToast]);

  const updateGoal = useCallback((updatedData: Partial<Goal> & { id: string }) => {
    setGoals(prev => prev.map(g => 
        g.id === updatedData.id 
        ? { ...g, ...updatedData, updatedAt: new Date().toISOString() } 
        : g
    ));
    addToast('Objetivo atualizado.', 'info');
  }, [addToast]);

  const deleteGoal = useCallback((id: string) => {
    setGoals(prev => prev.filter(g => g.id !== id));
    addToast('Objetivo excluído.', 'info');
  }, [addToast]);

  const completeGoal = useCallback((id: string) => {
    setGoals(prev => prev.map(g => 
        g.id === id 
        ? { ...g, status: 'concluido' as GoalStatus, progress: 100, updatedAt: new Date().toISOString() } 
        : g
    ));
    addToast('Parabéns! Objetivo concluído!', 'success');
  }, [addToast]);

  // --- Consistency Mode Management ---
  useEffect(() => {
    try {
      localStorage.setItem(TEST_SERIES_KEY, JSON.stringify(testSeries));
    } catch (error) {
        console.error('Failed to save test series to localStorage:', error);
    }
  }, [testSeries]);

  const addTestSeries = useCallback((seriesData: Omit<TestSeries, 'id' | 'createdAt' | 'updatedAt' | 'relatedBakes'>): TestSeries => {
    const now = new Date().toISOString();
    const newSeries: TestSeries = {
        ...seriesData,
        id: crypto.randomUUID(),
        createdAt: now,
        updatedAt: now,
        relatedBakes: [],
    };
    setTestSeries(prev => [...prev, newSeries]);
    addToast(`Série de testes "${newSeries.name}" criada.`, 'success');
    return newSeries;
  }, [addToast]);

  const updateTestSeries = useCallback((updatedData: Partial<TestSeries> & { id: string }) => {
    setTestSeries(prev => prev.map(s => 
        s.id === updatedData.id 
        ? { ...s, ...updatedData, updatedAt: new Date().toISOString() } 
        : s
    ));
    addToast('Série de testes atualizada.', 'info');
  }, [addToast]);

  const deleteTestSeries = useCallback((id: string) => {
    setTestSeries(prev => prev.filter(s => s.id !== id));
    addToast('Série de testes excluída.', 'info');
  }, [addToast]);
  
  const attachBakeToSeries = useCallback((seriesId: string, bakeId: string) => {
      setTestSeries(prev => prev.map(s => {
          if (s.id === seriesId) {
              if (s.relatedBakes.includes(bakeId)) {
                  addToast('Fornada já associada a esta série.', 'info');
                  return s;
              }
              addToast('Fornada associada com sucesso!', 'success');
              return { ...s, relatedBakes: [...s.relatedBakes, bakeId], updatedAt: new Date().toISOString() };
          }
          return s;
      }));
  }, [addToast]);

  // --- Entitlements Effects & Callbacks ---
  useEffect(() => {
    try {
      const stored = localStorage.getItem(ENTITLEMENTS_KEY);
      if (stored) {
        setEntitlements(JSON.parse(stored));
      }
    } catch {
      // Ignore errors
    }
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      const now = Date.now();
      if (entitlements.passUntil && now > entitlements.passUntil) {
        setEntitlements((prev) => {
          const newEntitlements = { ...prev, passUntil: null };
          try {
            localStorage.setItem(
              ENTITLEMENTS_KEY,
              JSON.stringify(newEntitlements),
            );
          } catch {}
          return newEntitlements;
        });
      }
      if (entitlements.lastPassGrantedAt) {
        const hoursSince = (now - entitlements.lastPassGrantedAt) / 3600000;
        if (hoursSince < 24) {
          setCooldownHours(24 - hoursSince);
        } else if (cooldownHours > 0) {
          setCooldownHours(0);
        }
      } else if (cooldownHours > 0) {
        setCooldownHours(0);
      }
    }, 60000);
    return () => clearInterval(interval);
  }, [entitlements, cooldownHours]);

  const saveEntitlements = (newEntitlements: Entitlements) => {
    try {
      localStorage.setItem(ENTITLEMENTS_KEY, JSON.stringify(newEntitlements));
      setEntitlements(newEntitlements);
    } catch (error) {
      console.error('Could not save entitlements', error);
    }
  };

  const grantProAccess = useCallback(() => {
    saveEntitlements({ ...entitlements, isPro: true, passUntil: null });
  }, [entitlements]);

  const grantSessionProAccess = useCallback(() => {
    setIsSessionPro(true);
  }, []);

  const grant24hPass = useCallback(() => {
    const now = Date.now();
    const twentyFourHours = 24 * 60 * 60 * 1000;
    if (
      entitlements.lastPassGrantedAt &&
      now - entitlements.lastPassGrantedAt < 24 * 60 * 60 * 1000
    ) {
      return;
    }
    saveEntitlements({
      ...entitlements,
      passUntil: now + twentyFourHours,
      lastPassGrantedAt: now,
    });
  }, [entitlements]);

  const hasProAccess =
    entitlements.isPro ||
    isSessionPro ||
    (entitlements.passUntil !== null && Date.now() < entitlements.passUntil);
  const isPassOnCooldown =
    entitlements.lastPassGrantedAt !== null &&
    Date.now() - entitlements.lastPassGrantedAt < 24 * 60 * 60 * 1000;

  const value: UserContextType = {
    isAuthenticated: !!user,
    user,
    login,
    logout,
    updateUser,
    hasProAccess,
    grantProAccess,
    grantSessionProAccess,
    grant24hPass,
    isPassOnCooldown,
    cooldownHoursRemaining: Math.ceil(cooldownHours),
    ovens,
    addOven,
    updateOven,
    deleteOven,
    setDefaultOven,
    preferredFlourId: userSettings.preferredFlourId,
    setPreferredFlour,
    batches,
    addBatch,
    updateBatch,
    deleteBatch,
    createDraftBatch,
    levains,
    addLevain,
    updateLevain,
    deleteLevain,
    setDefaultLevain,
    addFeedingEvent,
    importLevains,
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
