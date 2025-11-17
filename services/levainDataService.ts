import { Levain, FeedingEvent } from '../types';

interface LevainBackup {
    version: string;
    exportedAt: string;
    starters: Levain[];
    feedings: (FeedingEvent & { originalLevainId: string })[];
}

/**
 * Exports all levain data to a JSON string.
 * @param levains Array of Levain objects from the user context.
 * @returns A JSON string representing the backup.
 */
export const exportLevainData = (levains: Levain[]): string => {
    const allFeedings: (FeedingEvent & { originalLevainId: string })[] = [];
    
    const startersToExport = levains.map(levain => {
        const starterCopy = JSON.parse(JSON.stringify(levain));
        starterCopy.feedingHistory.forEach((log: FeedingEvent) => {
            allFeedings.push({ ...log, originalLevainId: levain.id });
        });
        delete starterCopy.feedingHistory;
        return starterCopy;
    });

    const backupData: LevainBackup = {
        version: "1.0",
        exportedAt: new Date().toISOString(),
        starters: startersToExport,
        feedings: allFeedings
    };

    return JSON.stringify(backupData, null, 2);
};

interface ImportResult {
    newLevains: Levain[];
    error?: string;
}

/**
 * Imports levain data from a JSON string.
 * @param jsonString The JSON string from a backup file.
 * @returns An object containing the new levain objects or an error message.
 */
export const importLevainData = (jsonString: string): ImportResult => {
    try {
        const data = JSON.parse(jsonString) as LevainBackup;

        if (data.version !== "1.0" || !Array.isArray(data.starters) || !Array.isArray(data.feedings)) {
            return { newLevains: [], error: 'Arquivo de backup inválido ou corrompido.' };
        }

        const newLevains: Levain[] = [];
        const idMap = new Map<string, string>();

        for (const oldStarter of data.starters) {
            const newId = crypto.randomUUID();
            idMap.set(oldStarter.id, newId);
            
            const newStarter: Levain = {
                ...oldStarter,
                id: newId,
                isDefault: false,
                feedingHistory: [],
            };
            newLevains.push(newStarter);
        }

        for (const feeding of data.feedings) {
            const newLevainId = idMap.get(feeding.originalLevainId);
            if (newLevainId) {
                const targetLevain = newLevains.find(l => l.id === newLevainId);
                if (targetLevain) {
                    const newFeeding: FeedingEvent = {
                        ...feeding,
                        id: crypto.randomUUID()
                    };
                    // @ts-ignore
                    delete newFeeding.originalLevainId;
                    targetLevain.feedingHistory.push(newFeeding);
                }
            }
        }
        
        newLevains.forEach(l => l.feedingHistory.sort((a,b) => new Date(b.date).getTime() - new Date(a.date).getTime()));

        return { newLevains };

    } catch (e) {
        console.error("Import error:", e);
        return { newLevains: [], error: 'Não foi possível ler os dados do Levain Pet.' };
    }
};
