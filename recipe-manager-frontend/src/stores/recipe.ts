// src/stores/recipe.ts
import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import type { Recipe, RecipeFormData, Ingredient, FilterOptions } from '../types';
import { api } from '../services/api';

export const useRecipeStore = defineStore('recipe', () => {
    // State
    const recipes = ref<Recipe[]>([]);
    const currentRecipe = ref<Recipe | null>(null);
    const loading = ref<boolean>(false);
    const error = ref<string | null>(null);
    const filterOptions = ref<FilterOptions>({
        difficulty: '',
        ingredientCount: null,
        searchTerm: '',
    });
    const totalRecipes = ref<number>(0);
    const currentPage = ref<number>(1);
    const pageSize = ref<number>(10);

    // Getters
    const filteredRecipes = computed(() => {
        let filtered = [...recipes.value];
        const { difficulty, ingredientCount, searchTerm } = filterOptions.value;

        if (difficulty) {
            filtered = filtered.filter(recipe => recipe.difficulty === difficulty);
        }

        if (ingredientCount !== null) {
            filtered = filtered.filter(recipe => recipe.ingredients.length === ingredientCount);
        }

        if (searchTerm) {
            const term = searchTerm.toLowerCase();
            filtered = filtered.filter(recipe =>
                recipe.title.toLowerCase().includes(term) ||
                recipe.creatorName.toLowerCase().includes(term)
            );
        }

        totalRecipes.value = filtered.length;
        return filtered;
    });

    const paginatedRecipes = computed(() => {
        const start = (currentPage.value - 1) * pageSize.value;
        const end = start + pageSize.value;
        return filteredRecipes.value.slice(start, end);
    });

    // Actions
    async function fetchRecipes() {
        loading.value = true;
        error.value = null;
        try {
            const response = await api.get('/recipes');
            recipes.value = response.data;
        } catch (err: any) {
            error.value = err.message || 'Failed to fetch recipes';
            console.error('Error fetching recipes:', err);
        } finally {
            loading.value = false;
        }
    }

    async function fetchRecipeById(id: number) {
        loading.value = true;
        error.value = null;
        try {
            const response = await api.get(`/recipes/${id}`);
            currentRecipe.value = response.data;
            return response.data;
        } catch (err: any) {
            error.value = err.message || `Failed to fetch recipe #${id}`;
            console.error(`Error fetching recipe #${id}:`, err);
            return null;
        } finally {
            loading.value = false;
        }
    }

    async function createRecipe(recipeData: RecipeFormData) {
        loading.value = true;
        error.value = null;
        try {
            const response = await api.post('/recipes', recipeData);
            recipes.value.push(response.data);
            return response.data;
        } catch (err: any) {
            error.value = err.message || 'Failed to create recipe';
            console.error('Error creating recipe:', err);
            return null;
        } finally {
            loading.value = false;
        }
    }

    async function updateRecipe(id: number, recipeData: RecipeFormData) {
        loading.value = true;
        error.value = null;
        try {
            const response = await api.put(`/recipes/${id}`, recipeData);
            const index = recipes.value.findIndex(r => r.id === id);
            if (index !== -1) {
                recipes.value[index] = response.data;
            }
            return response.data;
        } catch (err: any) {
            error.value = err.message || `Failed to update recipe #${id}`;
            console.error(`Error updating recipe #${id}:`, err);
            return null;
        } finally {
            loading.value = false;
        }
    }

    async function deleteRecipe(id: number) {
        loading.value = true;
        error.value = null;
        try {
            await api.delete(`/recipes/${id}`);
            recipes.value = recipes.value.filter(r => r.id !== id);
            return true;
        } catch (err: any) {
            error.value = err.message || `Failed to delete recipe #${id}`;
            console.error(`Error deleting recipe #${id}:`, err);
            return false;
        } finally {
            loading.value = false;
        }
    }

    function setFilters(newFilters: Partial<FilterOptions>) {
        filterOptions.value = { ...filterOptions.value, ...newFilters };
        currentPage.value = 1; // Reset to first page when filters change
    }

    function resetFilters() {
        filterOptions.value = {
            difficulty: '',
            ingredientCount: null,
            searchTerm: '',
        };
        currentPage.value = 1;
    }

    function setPage(page: number) {
        currentPage.value = page;
    }

    return {
        // State
        recipes,
        currentRecipe,
        loading,
        error,
        filterOptions,
        currentPage,
        pageSize,
        totalRecipes,

        // Getters
        filteredRecipes,
        paginatedRecipes,

        // Actions
        fetchRecipes,
        fetchRecipeById,
        createRecipe,
        updateRecipe,
        deleteRecipe,
        setFilters,
        resetFilters,
        setPage,
    };
});