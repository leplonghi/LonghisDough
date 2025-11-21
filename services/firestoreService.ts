
import { 
  collection, 
  query, 
  onSnapshot, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  doc, 
  writeBatch, 
  orderBy, 
  Timestamp,
  QuerySnapshot,
  DocumentData,
  Firestore
} from 'firebase/firestore';
import { db } from '../firebase/db';

/**
 * Helper to process snapshot data into typed arrays.
 * Converts Firestore Timestamps to ISO strings.
 */
const processSnapshot = <T>(snapshot: QuerySnapshot<DocumentData>): T[] => {
  return snapshot.docs.map(doc => {
    const data = doc.data();
    Object.keys(data).forEach(key => {
      if (data[key] instanceof Timestamp) {
        data[key] = data[key].toDate().toISOString();
      }
    });
    return { id: doc.id, ...data } as T;
  });
};

/**
 * Generic Firestore Service
 * Abstracts the DB implementation details from the Context/UI.
 */
export const firestoreService = {
  
  /**
   * Subscribes to a subcollection of a user document.
   */
  subscribeToUserCollection: <T>(
    userId: string, 
    collectionName: string, 
    onUpdate: (data: T[]) => void,
    onError?: (error: Error) => void,
    processItem?: (item: any) => T
  ) => {
    // Mock/Dev Mode Bypass
    if (userId.startsWith('dev-')) {
        // In dev mode, we don't subscribe. The state is managed locally in the provider.
        return () => {}; 
    }

    if (!db) {
        console.warn("Firestore not initialized");
        return () => {};
    }

    const collRef = collection(db, 'users', userId, collectionName);
    const q = query(collRef, orderBy('createdAt', 'desc'));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const items = processSnapshot<T>(snapshot);
      const finalItems = processItem ? items.map(processItem) : items;
      onUpdate(finalItems);
    }, (error) => {
      console.error(`Error listening to ${collectionName}:`, error);
      if (onError) onError(error);
    });

    return unsubscribe;
  },

  /**
   * Adds a document to a user subcollection.
   */
  addDocument: async <T>(userId: string, collectionName: string, data: any): Promise<T> => {
    // Mock/Dev Mode
    if (userId.startsWith('dev-')) {
        const mockId = `${collectionName}-${crypto.randomUUID()}`;
        const now = new Date().toISOString();
        // Return mock data immediately
        return { ...data, id: mockId, createdAt: now, updatedAt: now } as T;
    }

    if (!db) throw new Error("Database not available");

    const collRef = collection(db, 'users', userId, collectionName);
    const now = new Date().toISOString();
    const docData = { ...data, createdAt: now, updatedAt: now };
    
    const docRef = await addDoc(collRef, docData);
    return { ...docData, id: docRef.id } as T;
  },

  /**
   * Updates a document in a user subcollection.
   */
  updateDocument: async (userId: string, collectionName: string, docId: string, data: any): Promise<void> => {
    // Mock/Dev Mode
    if (userId.startsWith('dev-')) return;

    if (!db) throw new Error("Database not available");

    const docRef = doc(db, 'users', userId, collectionName, docId);
    await updateDoc(docRef, { ...data, updatedAt: new Date().toISOString() });
  },

  /**
   * Deletes a document from a user subcollection.
   */
  deleteDocument: async (userId: string, collectionName: string, docId: string): Promise<void> => {
    // Mock/Dev Mode
    if (userId.startsWith('dev-')) return;

    if (!db) throw new Error("Database not available");

    const docRef = doc(db, 'users', userId, collectionName, docId);
    await deleteDoc(docRef);
  },

  /**
   * Batch update to set a default item (e.g., Oven or Levain).
   * Sets the target item to isDefault: true and all others to false.
   */
  setAsDefault: async (userId: string, collectionName: string, targetId: string, allItems: {id: string}[]): Promise<void> => {
     // Mock/Dev Mode
     if (userId.startsWith('dev-')) return;

     if (!db) throw new Error("Database not available");

     const batch = writeBatch(db);
     allItems.forEach(item => {
        const docRef = doc(db, 'users', userId, collectionName, item.id);
        batch.update(docRef, { isDefault: item.id === targetId });
     });
     await batch.commit();
  },

  /**
   * Bulk Import (Batch Write)
   */
  bulkImport: async (userId: string, collectionName: string, items: any[]): Promise<void> => {
      // Mock/Dev Mode
      if (userId.startsWith('dev-')) return;

      if (!db) throw new Error("Database not available");

      const batch = writeBatch(db);
      items.forEach(item => {
          // Create a new reference for each item
          const docRef = doc(collection(db, 'users', userId, collectionName));
          batch.set(docRef, item);
      });
      await batch.commit();
  },

  /**
   * Specific: Update User Profile
   */
  updateUserProfile: async (userId: string, data: any): Promise<void> => {
      if (userId.startsWith('dev-')) return;
      if (!db) throw new Error("Database not available");
      const userRef = doc(db, 'users', userId);
      await updateDoc(userRef, data);
  }
};
