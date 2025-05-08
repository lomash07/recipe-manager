// src/router/index.ts
import {
  createRouter,
  createWebHistory, type RouteRecordRaw,
} from 'vue-router';
import { useAuthStore } from '../stores/auth';

// Import Views
import Dashboard from '../views/Dashboard.vue';
import CreateRecipe from '../views/CreateRecipe.vue';
import EditRecipe from '../views/EditRecipe.vue';
import RecipeView from '../views/RecipeView.vue';
import LoginView from '../views/LoginView.vue';
import RegisterView from '../views/RegisterView.vue';
import NotFoundView from '../views/NotFoundView.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'dashboard',
    component: Dashboard,
    meta: { title: 'Recipe Dashboard' }
  },
  {
    path: '/recipes/create',
    name: 'create-recipe',
    component: CreateRecipe,
    meta: {
      title: 'Create New Recipe',
      requiresAuth: true
    }
  },
  {
    path: '/recipes/:id',
    name: 'recipe-detail',
    component: RecipeView,
    meta: { title: 'Recipe Details' }
  },
  {
    path: '/recipes/:id/edit',
    name: 'edit-recipe',
    component: EditRecipe,
    meta: {
      title: 'Edit Recipe',
      requiresAuth: true
    }
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView,
    meta: { title: 'Login' }
  },
  {
    path: '/register',
    name: 'register',
    component: RegisterView,
    meta: { title: 'Register' }
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: NotFoundView,
    meta: { title: 'Page Not Found' }
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    }
    return { top: 0 };
  }
});

// Navigation guard for auth routes
router.beforeEach((to, from, next) => {
  // Update page title
  document.title = `${to.meta.title || 'Recipe Manager'}`;

  // Check if route requires authentication
  if (to.matched.some(record => record.meta.requiresAuth)) {
    const authStore = useAuthStore();
    if (!authStore.isLoggedIn) {
      // Redirect to login page with intended destination
      next({
        name: 'login',
        query: { redirect: to.fullPath }
      });
      return;
    }
  }

  next();
});

export default router;
