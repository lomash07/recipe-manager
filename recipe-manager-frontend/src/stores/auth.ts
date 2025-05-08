// src/stores/auth.ts
import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { api } from '../services/api';

interface User {
    id: number;
    name: string;
    email: string;
}

interface LoginCredentials {
    email: string;
    password: string;
}

interface RegisterData {
    name: string;
    email: string;
    password: string;
}

export const useAuthStore = defineStore('auth', () => {
    // State
    const user = ref<User | null>(null);
    const token = ref<string | null>(null);
    const loading = ref<boolean>(false);
    const error = ref<string | null>(null);

    // Initialize state from localStorage
    if (localStorage.getItem('auth_token')) {
        token.value = localStorage.getItem('auth_token');
        const storedUser = localStorage.getItem('auth_user');
        if (storedUser) {
            try {
                user.value = JSON.parse(storedUser);
            } catch (e) {
                console.error('Error parsing stored user:', e);
            }
        }
    }

    // Getters
    const isLoggedIn = computed(() => !!token.value);

    // Actions
    async function login(credentials: LoginCredentials) {
        loading.value = true;
        error.value = null;

        try {
            const response = await api.post('/auth/login', credentials);
            const { user: userData, token: authToken } = response.data;

            // Store in state
            user.value = userData;
            token.value = authToken;

            // Save to localStorage
            localStorage.setItem('auth_token', authToken);
            localStorage.setItem('auth_user', JSON.stringify(userData));

            return true;
        } catch (err: any) {
            error.value = err.response?.data?.message || 'Login failed';
            console.error('Login error:', err);
            return false;
        } finally {
            loading.value = false;
        }
    }

    async function register(registerData: RegisterData) {
        loading.value = true;
        error.value = null;

        try {
            const response = await api.post('/auth/register', registerData);
            const { user: userData, token: authToken } = response.data;

            // Store in state
            user.value = userData;
            token.value = authToken;

            // Save to localStorage
            localStorage.setItem('auth_token', authToken);
            localStorage.setItem('auth_user', JSON.stringify(userData));

            return true;
        } catch (err: any) {
            error.value = err.response?.data?.message || 'Registration failed';
            console.error('Registration error:', err);
            return false;
        } finally {
            loading.value = false;
        }
    }

    async function logout() {
        try {
            // Optional: Call logout endpoint if server needs to invalidate token
            await api.post('/auth/logout');
        } catch (err) {
            console.error('Logout error:', err);
        } finally {
            // Clear state regardless of API call
            user.value = null;
            token.value = null;
            localStorage.removeItem('auth_token');
            localStorage.removeItem('auth_user');
        }
    }

    async function checkAuth() {
        if (!token.value) return false;

        loading.value = true;
        try {
            const response = await api.get('/auth/me');
            user.value = response.data;
            return true;
        } catch (err) {
            // Token is invalid or expired
            user.value = null;
            token.value = null;
            localStorage.removeItem('auth_token');
            localStorage.removeItem('auth_user');
            return false;
        } finally {
            loading.value = false;
        }
    }

    return {
        // State
        user,
        token,
        loading,
        error,

        // Getters
        isLoggedIn,

        // Actions
        login,
        register,
        logout,
        checkAuth
    };
});