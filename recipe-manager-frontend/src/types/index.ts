// src/types/index.ts
export enum DifficultyLevel {
    EASY = 'Easy',
    MEDIUM = 'Medium',
    HARD = 'Hard',
}

export interface Ingredient {
    id?: number;
    recipeId?: number;
    ingredientName: string;
}

export interface Recipe {
    id: number;
    title: string;
    difficulty: DifficultyLevel;
    instructions: string;
    imageUrl?: string;
    creatorName: string;
    createdDate: string;
    ingredients: Ingredient[];
}

export interface RecipeFormData {
    title: string;
    difficulty: DifficultyLevel;
    instructions: string;
    imageFile?: File;
    imageUrl?: string;
    creatorName: string;
    ingredients: Ingredient[];
}

export interface FilterOptions {
    difficulty: string;
    ingredientCount: number | null;
    searchTerm: string;
}

export interface PaginationOptions {
    currentPage: number;
    pageSize: number;
    total: number;
}