
import { DoughStyle, StyleSourceType } from '../types';
import officialStyles from '../data/official_styles.json';

// Mock implementation for client-side demo (as real Firestore setup is external)
// In a real app, this would import db and use getDocs, setDoc, etc.

export const fetchOfficialStyles = async (): Promise<DoughStyle[]> => {
    // In real implementation, this might fetch from a collection or just return static data
    return officialStyles as unknown as DoughStyle[];
};

export const fetchCommunityStyles = async (): Promise<DoughStyle[]> => {
    // Mock community styles
    return [];
};

export const fetchUserStyles = async (userId: string): Promise<DoughStyle[]> => {
    // Mock user styles
    // In real app: query collection(`users/${userId}/user_styles`)
    const stored = localStorage.getItem(`doughlab_user_styles_${userId}`);
    return stored ? JSON.parse(stored) : [];
};

export const fetchStyleBySlug = async (slug: string): Promise<DoughStyle | undefined> => {
    // 1. Try official
    // @ts-ignore
    const official = officialStyles.find(s => s.slug === slug);
    if (official) return official as unknown as DoughStyle;

    // 2. Try community (mock)
    // 3. Try user (need userId context, so this function is usually context-aware or we fetch all)
    return undefined;
};

// Helper to simulate saving user styles locally for the demo
export const saveUserStyleLocally = (userId: string, style: DoughStyle) => {
    const currentStyles = JSON.parse(localStorage.getItem(`doughlab_user_styles_${userId}`) || '[]');
    const updated = [...currentStyles.filter((s: DoughStyle) => s.id !== style.id), style];
    localStorage.setItem(`doughlab_user_styles_${userId}`, JSON.stringify(updated));
    return style;
};

export const deleteUserStyleLocally = (userId: string, styleId: string) => {
    const currentStyles = JSON.parse(localStorage.getItem(`doughlab_user_styles_${userId}`) || '[]');
    const updated = currentStyles.filter((s: DoughStyle) => s.id !== styleId);
    localStorage.setItem(`doughlab_user_styles_${userId}`, JSON.stringify(updated));
};
