import { useState, useCallback, useEffect } from 'react';
import {
  collection,
  query,
  orderBy,
  onSnapshot,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  Timestamp,
  Firestore,
} from 'firebase/firestore';
import { User as FirebaseUser } from '@firebase/auth';
import { Batch, BatchStatus } from '@/types';
import { DEFAULT_CONFIG } from '@/constants';

export function useBatchManager(
  firebaseUser: FirebaseUser | null,
  db: Firestore | null,
  addToast: (msg: string, type: 'success' | 'error' | 'info') => void
) {
  const [batches, setBatches] = useState<Batch[]>([]);

  useEffect(() => {
    if (!firebaseUser || !db) {
      setBatches([]);
      return;
    }

    const uid = firebaseUser.uid;
    const collRef = collection(db, 'users', uid, 'batches');
    const q = query(collRef, orderBy('createdAt', 'desc'));

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const items = snapshot.docs.map((doc) => {
          const data = doc.data();
          Object.keys(data).forEach((key) => {
            if (data[key] instanceof Timestamp) {
              data[key] = data[key].toDate().toISOString();
            }
          });
          return { id: doc.id, ...data } as Batch;
        });
        setBatches(items);
      },
      (error) => {
        console.error('Error listening to batches:', error);
      }
    );

    return () => unsubscribe();
  }, [firebaseUser, db]);

  const addBatch = useCallback(
    async (newBatchData: Omit<Batch, 'id' | 'createdAt' | 'updatedAt'>): Promise<Batch> => {
      if (!firebaseUser || !db) throw new Error('User not authenticated or DB not available.');
      const collRef = collection(db, 'users', firebaseUser.uid, 'batches');
      const docData = {
        ...newBatchData,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      const docRef = await addDoc(collRef, docData);
      return { ...docData, id: docRef.id } as Batch;
    },
    [firebaseUser, db]
  );

  const createDraftBatch = useCallback(async (): Promise<Batch> => {
    return await addBatch({
      name: 'New Bake (Draft)',
      doughConfig: DEFAULT_CONFIG,
      status: BatchStatus.DRAFT,
      isFavorite: false,
    });
  }, [addBatch]);

  const updateBatch = useCallback(
    async (updatedBatch: Batch) => {
      if (!firebaseUser || !db) throw new Error('User not authenticated');
      const docRef = doc(db, 'users', firebaseUser.uid, 'batches', updatedBatch.id);
      await updateDoc(docRef, { ...updatedBatch, updatedAt: new Date().toISOString() });
    },
    [firebaseUser, db]
  );

  const deleteBatch = useCallback(
    async (id: string) => {
      if (!firebaseUser || !db) throw new Error('User not authenticated');
      const batchToDelete = batches.find((b) => b.id === id);
      const docRef = doc(db, 'users', firebaseUser.uid, 'batches', id);
      await deleteDoc(docRef);
      if (batchToDelete) addToast(`Bake "${batchToDelete.name}" deleted.`, 'info');
    },
    [firebaseUser, db, batches, addToast]
  );

  return {
    batches,
    addBatch,
    updateBatch,
    deleteBatch,
    createDraftBatch,
  };
}