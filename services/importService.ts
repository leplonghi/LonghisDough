import { Batch, DoughConfig, RecipeStyle, BatchStatus } from '../types';
import { DEFAULT_CONFIG } from '../constants';

// Interface for the expected JSON structure
interface ImportedRecipe {
    version: string;
    name: string;
    style: string;
    hydration: number;
    flours?: any[]; // Keep it flexible for validation
    preferment?: any; // Keep it flexible
    process?: string;
    notes?: string;
}

// Type guard to validate the imported JSON
function isImportedRecipe(obj: any): obj is ImportedRecipe {
    return (
        obj &&
        obj.version === '1.0' &&
        typeof obj.name === 'string' &&
        typeof obj.style === 'string' &&
        typeof obj.hydration === 'number' &&
        Array.isArray(obj.flours) &&
        typeof obj.process === 'string'
    );
}

// Function to map string to RecipeStyle enum, with a fallback
function mapStringToRecipeStyle(style: string): RecipeStyle {
    const upperStyle = style.toUpperCase().replace(/\s/g, '_') as keyof typeof RecipeStyle;
    return RecipeStyle[upperStyle] || RecipeStyle.NEAPOLITAN; // Fallback to Neapolitan
}


/**
 * Reads a JSON file, validates its structure, and converts it into a new Batch object.
 * @param file The .json file to import.
 * @returns A promise that resolves with the data for a new batch, ready to be added.
 * @throws An error with a user-friendly message if validation fails.
 */
export async function importReceitaFromJSON(file: File): Promise<Omit<Batch, 'id' | 'createdAt' | 'updatedAt'>> {
    const fileContent = await file.text();
    let parsedData: any;

    try {
        parsedData = JSON.parse(fileContent);
    } catch (e) {
        throw new Error('Arquivo JSON inválido ou corrompido.');
    }

    if (!isImportedRecipe(parsedData)) {
        throw new Error('O arquivo não está no formato de receita do DoughLabPro.');
    }

    const importedRecipe: ImportedRecipe = parsedData;
    
    // Combine notes
    const combinedNotes = [importedRecipe.process, importedRecipe.notes].filter(Boolean).join('\n\n---\n\n');

    // Create a new DoughConfig based on the imported data, falling back to defaults
    const newDoughConfig: DoughConfig = {
        ...DEFAULT_CONFIG,
        recipeStyle: mapStringToRecipeStyle(importedRecipe.style),
        hydration: importedRecipe.hydration,
        notes: combinedNotes,
        // For now, complex fields like preferment are captured in the notes.
    };
    
    const newBatchData: Omit<Batch, 'id' | 'createdAt' | 'updatedAt'> = {
        name: importedRecipe.name,
        doughConfig: newDoughConfig,
        status: BatchStatus.DRAFT,
        isFavorite: false,
        isPublic: false,
        doughResult: null, // Will be calculated when loaded in the calculator
    };

    return newBatchData;
}
