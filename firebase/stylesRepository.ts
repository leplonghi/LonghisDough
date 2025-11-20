
import { DoughStyle } from '../types';
import { OFFICIAL_STYLES } from '../data/officialStyles';
import { db } from './db';
import { collection, query, where, getDocs, addDoc, doc, deleteDoc } from 'firebase/firestore';

const USER_STYLES_COLLECTION = 'user_styles';

export const fetchOfficialStyles = async (): Promise<DoughStyle[]> => {
    return OFFICIAL_STYLES as unknown as DoughStyle[];
};

export const fetchCommunityStyles = async (): Promise<DoughStyle[]> => {
    // Placeholder for community styles logic
    return [];
};

export const fetchUserStyles = async (userId: string): Promise<DoughStyle[]> => {
    if (!db) {
        console.warn("Firestore not initialized, returning empty styles.");
        return [];
    }

    try {
        const q = query(
            collection(db, USER_STYLES_COLLECTION),
            where('createdByUserId', '==', userId)
        );
        const querySnapshot = await getDocs(q);
        return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as DoughStyle));
    } catch (error) {
        console.error("Error fetching user styles:", error);
        return [];
    }
};

export const saveUserStyle = async (userId: string, style: DoughStyle): Promise<DoughStyle> => {
    if (!db) throw new Error("Firestore not initialized");
    
    const styleData = { ...style, createdByUserId: userId };
    // Ensure we don't try to save the ID if it's a temp one, let Firestore generate it.
    const { id, ...dataToSave } = styleData;
    
    const docRef = await addDoc(collection(db, USER_STYLES_COLLECTION), dataToSave);
    return { ...styleData, id: docRef.id };
};

export const deleteUserStyle = async (styleId: string): Promise<void> => {
    if (!db) return;
    await deleteDoc(doc(db, USER_STYLES_COLLECTION, styleId));
};

export const fetchStyleBySlug = async (slug: string): Promise<DoughStyle | undefined> => {
    // 1. Try official
    // @ts-ignore
    const official = OFFICIAL_STYLES.find((s: any) => s.slug === slug || s.id === slug);
    if (official) return official as unknown as DoughStyle;

    return undefined;
};
