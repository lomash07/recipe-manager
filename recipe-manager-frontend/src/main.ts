// src/main.ts
import { createApp } from 'vue';
import { createPinia } from 'pinia';
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import * as ElementPlusIconsVue from '@element-plus/icons-vue';

import App from './App.vue';
import router from './router';
import { useAuthStore } from './stores/auth';

// Import global styles
import './assets/css/global.css';

// Create Vue application
const app = createApp(App);

// Register Element Plus icons
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component);
}

// Setup Pinia state management
const pinia = createPinia();
app.use(pinia);

// Setup Element Plus UI components
app.use(ElementPlus);

// Setup Vue Router
app.use(router);

// Initialize app
app.mount('#app');

// Verify authentication status on app startup
const authStore = useAuthStore();
authStore.checkAuth();
