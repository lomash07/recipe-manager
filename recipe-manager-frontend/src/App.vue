<!-- src/App.vue -->
<template>
  <div class="app-container">
    <el-config-provider :locale="locale">
      <el-container>
        <el-header height="70px">
          <nav class="main-navigation">
            <div class="nav-logo">
              <router-link to="/">
                <img src="./assets/logo.svg" alt="Recipe Manager" class="logo-image" />
                <span class="logo-text">Recipe Manager</span>
              </router-link>
            </div>
            <div class="nav-links">
              <router-link to="/" class="nav-link">Dashboard</router-link>
              <router-link to="/recipes/create" class="nav-link">Add Recipe</router-link>
              <!-- Add auth links for bonus feature -->
              <a v-if="authStore.isLoggedIn" class="nav-link user-link">
                Welcome, {{ authStore.user?.name }}
                <el-dropdown trigger="click">
                  <span class="el-dropdown-link">
                    <i class="el-icon-arrow-down"></i>
                  </span>
                  <template #dropdown>
                    <el-dropdown-menu>
                      <el-dropdown-item @click="handleLogout">Logout</el-dropdown-item>
                    </el-dropdown-menu>
                  </template>
                </el-dropdown>
              </a>
              <router-link v-else to="/login" class="nav-link">Login</router-link>
            </div>
          </nav>
        </el-header>

        <el-main>
          <router-view v-slot="{ Component }">
            <transition name="fade" mode="out-in">
              <component :is="Component" />
            </transition>
          </router-view>
        </el-main>

        <el-footer height="60px">
          <div class="footer-content">
            <p>&copy; {{ currentYear }} Recipe Manager. All rights reserved.</p>
          </div>
        </el-footer>
      </el-container>
    </el-config-provider>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import { ElMessage } from 'element-plus';
import { useAuthStore } from './stores/auth';
import en from 'element-plus/es/locale/lang/en';

const router = useRouter();
const authStore = useAuthStore();
const locale = en;

const currentYear = computed(() => new Date().getFullYear());

const handleLogout = async () => {
  await authStore.logout();
  ElMessage({
    message: 'You have been logged out successfully',
    type: 'success',
  });
  router.push('/login');
};
</script>

<style>
/* Global Styles */
:root {
  --primary-color: #409eff;
  --secondary-color: #67c23a;
  --danger-color: #f56c6c;
  --warning-color: #e6a23c;
  --text-color: #333;
  --text-light: #666;
  --border-color: #dcdfe6;
  --background-light: #f5f7fa;
}

body {
  margin: 0;
  padding: 0;
  font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
  color: var(--text-color);
  background-color: var(--background-light);
}

/* App Container */
.app-container {
  min-height: 100vh;
}

/* Header */
.el-header {
  background-color: white;
  border-bottom: 1px solid var(--border-color);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  padding: 0 20px;
}

.main-navigation {
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.nav-logo a {
  display: flex;
  align-items: center;
  text-decoration: none;
  color: var(--primary-color);
  font-weight: bold;
  font-size: 1.4rem;
}

.logo-image {
  height: 40px;
  margin-right: 10px;
}

.nav-links {
  display: flex;
  gap: 20px;
  align-items: center;
}

.nav-link {
  text-decoration: none;
  color: var(--text-color);
  padding: 5px 10px;
  border-radius: 4px;
  transition: all 0.2s ease;
}

.nav-link:hover {
  color: var(--primary-color);
  background-color: rgba(64, 158, 255, 0.1);
}

.nav-link.router-link-active {
  color: var(--primary-color);
  font-weight: 500;
}

.user-link {
  display: flex;
  align-items: center;
  gap: 5px;
}

/* Main Content */
.el-main {
  padding: 20px;
  min-height: calc(100vh - 130px);
}

/* Footer */
.el-footer {
  background-color: white;
  border-top: 1px solid var(--border-color);
  display: flex;
  justify-content: center;
  align-items: center;
}

.footer-content {
  text-align: center;
  color: var(--text-light);
  font-size: 0.9rem;
}

/* Page Transitions */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>