// src/services/api.ts
import axios from 'axios';
import type { RecipeFormData } from '../types';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api';

export const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

export const recipeService = {
    async getAllRecipes() {
        return api.get('/recipes');
    },

    async getRecipeById(id: number) {
        return api.get(`/recipes/${id}`);
    },

    async createRecipe(recipe: RecipeFormData) {
        // Handle image upload if present
        if (recipe.imageFile) {
            const formData = new FormData();
            formData.append('imageFile', recipe.imageFile);
            formData.append('recipe', JSON.stringify({
                title: recipe.title,
                difficulty: recipe.difficulty,
                instructions: recipe.instructions,
                creatorName: recipe.creatorName,
                ingredients: recipe.ingredients
            }));

            return api.post('/recipes', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
        }

        // No image upload
        return api.post('/recipes', recipe);
    },

    async updateRecipe(id: number, recipe: RecipeFormData) {
        // Handle image upload if present
        if (recipe.imageFile) {
            const formData = new FormData();
            formData.append('imageFile', recipe.imageFile);
            formData.append('recipe', JSON.stringify({
                title: recipe.title,
                difficulty: recipe.difficulty,
                instructions: recipe.instructions,
                creatorName: recipe.creatorName,
                ingredients: recipe.ingredients
            }));

            return api.put(`/recipes/${id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
        }

        // No image upload
        return api.put(`/recipes/${id}`, recipe);
    },

    async deleteRecipe(id: number) {
        return api.delete(`/recipes/${id}`);
    }
};

// Add request interceptor for authentication (bonus feature)
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('auth_token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Add response interceptor for error handling
api.interceptors.response.use(
    (response) => response,
    (error) => {
        // Handle common errors (401, 403, 500, etc.)
        if (error.response) {
            switch (error.response.status) {
                case 401:
                    // Handle unauthorized
                    localStorage.removeItem('auth_token');
                    // Optional: redirect to login
                    break;
                case 403:
                    // Handle forbidden
                    break;
                case 404:
                    // Handle not found
                    break;
                case 500:
                    // Handle server error
                    break;
            }
        }
        return Promise.reject(error);
    }
);