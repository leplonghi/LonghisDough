
import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  getDocs,
  query,
  where,
} from 'firebase/firestore';
import { db } from './db';
import { Oven } from '../types';

const OVENS_COLLECTION = 'ovens';

export const createOvenInFirestore = async (
  userId: string,
  ovenData: Omit<Oven, 'id'>
): Promise<Oven> => {
  if (!db) throw new Error("Firestore not initialized");

  const docRef = await addDoc(collection(db, OVENS_COLLECTION), {
    ...ovenData,
    userId,
  });

  return {
    ...ovenData,
    id: docRef.id,
  };
};

export const updateOvenInFirestore = async (
  ovenId: string,
  updates: Partial<Oven>
): Promise<void> => {
  if (!db) return;
  const docRef = doc(db, OVENS_COLLECTION, ovenId);
  const { id, ...cleanUpdates } = updates as any;
  await updateDoc(docRef, cleanUpdates);
};

export const deleteOvenInFirestore = async (ovenId: string): Promise<void> => {
  if (!db) return;
  await deleteDoc(doc(db, OVENS_COLLECTION, ovenId));
};

export const listOvensByUser = async (userId: string): Promise<Oven[]> => {
  if (!db) return [];
  const q = query(
    collection(db, OVENS_COLLECTION),
    where('userId', '==', userId)
  );
  
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Oven));
};
