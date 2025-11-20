
import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  getDocs,
  query,
  where,
  Timestamp,
  orderBy,
  setDoc
} from 'firebase/firestore';
import { db } from './db';
import { Batch } from '../types';

const BATCHES_COLLECTION = 'batches';

export const createBatchInFirestore = async (
  userId: string,
  batchData: Omit<Batch, 'id' | 'createdAt' | 'updatedAt'>
): Promise<Batch> => {
  if (!db) throw new Error("Firestore not initialized");
  
  const now = new Date().toISOString();
  
  // We can use addDoc for auto-ID, or setDoc with a specific ID if we generate it client-side.
  // Using addDoc for simplicity here, but mapping to our Batch type.
  const docRef = await addDoc(collection(db, BATCHES_COLLECTION), {
    ...batchData,
    userId,
    createdAt: now,
    updatedAt: now,
  });

  return {
    ...batchData,
    id: docRef.id,
    createdAt: now,
    updatedAt: now,
  };
};

export const updateBatchInFirestore = async (
  batchId: string,
  updates: Partial<Batch>
): Promise<void> => {
  if (!db) return;
  const docRef = doc(db, BATCHES_COLLECTION, batchId);
  await updateDoc(docRef, {
    ...updates,
    updatedAt: new Date().toISOString(),
  });
};

export const deleteBatchInFirestore = async (batchId: string): Promise<void> => {
  if (!db) return;
  await deleteDoc(doc(db, BATCHES_COLLECTION, batchId));
};

export const listBatchesByUser = async (userId: string): Promise<Batch[]> => {
  if (!db) return [];
  const q = query(
    collection(db, BATCHES_COLLECTION),
    where('userId', '==', userId)
    // orderBy('createdAt', 'desc') // Requires composite index sometimes, safer to sort client-side if needed immediately
  );
  
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(doc => {
      const data = doc.data();
      return { 
          id: doc.id, 
          ...data 
      } as Batch;
  });
};
