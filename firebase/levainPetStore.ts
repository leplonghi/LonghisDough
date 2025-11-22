
import {
  collection,
  addDoc,
  updateDoc,
  doc,
  getDocs,
  query,
  where,
  Timestamp,
  orderBy,
  limit,
} from 'firebase/firestore';
import { db } from './db';
import { LevainStarter, LevainFeedingLog } from '../types';

const LEVAIN_STARTERS_COLLECTION = 'levainStarters';
const LEVAIN_FEEDING_LOGS_COLLECTION = 'levainFeedingLogs';

// --- Levain Starter Services ---

export const createLevainStarter = async (
  starterData: Omit<LevainStarter, 'id' | 'createdAt' | 'updatedAt' | 'status'>
): Promise<LevainStarter> => {
  const now = Timestamp.now();
  const docRef = await addDoc(collection(db!, LEVAIN_STARTERS_COLLECTION), {
    ...starterData,
    createdAt: now,
    updatedAt: now,
    status: 'precisa_atencao', // Starts needing attention
  });
  return { 
    ...starterData, 
    id: docRef.id, 
    createdAt: now.toDate().toISOString(), 
    updatedAt: now.toDate().toISOString(), 
    status: 'precisa_atencao' 
  };
};

export const updateLevainStarter = async (
  levainId: string,
  updates: Partial<Omit<LevainStarter, 'id' | 'createdAt'>>
): Promise<void> => {
  const docRef = doc(db!, LEVAIN_STARTERS_COLLECTION, levainId);
  await updateDoc(docRef, {
    ...updates,
    updatedAt: Timestamp.now(),
  });
};

export const archiveLevainStarter = async (levainId: string): Promise<void> => {
  await updateLevainStarter(levainId, { status: 'arquivado' });
};

export const rehydrateLevainStarter = async (levainId: string): Promise<void> => {
  await updateLevainStarter(levainId, { status: 'ativo' });
};

export const listLevainStartersByUser = async (userId: string): Promise<LevainStarter[]> => {
  const q = query(
    collection(db!, LEVAIN_STARTERS_COLLECTION),
    where('userId', '==', userId),
    where('status', '!=', 'arquivado')
  );
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(doc => {
    const data = doc.data();
    // Convert Timestamps to ISO strings for the frontend type
    const createdAt = data.createdAt instanceof Timestamp ? data.createdAt.toDate().toISOString() : data.createdAt;
    const updatedAt = data.updatedAt instanceof Timestamp ? data.updatedAt.toDate().toISOString() : data.updatedAt;
    return { 
        id: doc.id, 
        ...data,
        createdAt,
        updatedAt
    } as LevainStarter;
  });
};

// --- Feeding Log Services ---

export const createFeedingLog = async (
  logData: Omit<LevainFeedingLog, 'id' | 'dateTime'>
): Promise<LevainFeedingLog> => {
  const now = Timestamp.now();
  const docRef = await addDoc(collection(db!, LEVAIN_FEEDING_LOGS_COLLECTION), {
    ...logData,
    dateTime: now,
  });
  return { ...logData, id: docRef.id, dateTime: now };
};

export const listFeedingLogs = async (levainId: string, logLimit: number = 50): Promise<LevainFeedingLog[]> => {
  const q = query(
    collection(db!, LEVAIN_FEEDING_LOGS_COLLECTION),
    where('levainId', '==', levainId),
    orderBy('dateTime', 'desc'),
    limit(logLimit)
  );
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as LevainFeedingLog));
};
