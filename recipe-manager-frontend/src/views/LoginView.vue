<!-- src/views/LoginView.vue -->
<template>
  <div class="login-container">
    <el-card class="login-card">
      <template #header>
        <div class="card-header">
          <h2>Login to Recipe Manager</h2>
        </div>
      </template>

      <el-form
          ref="loginForm"
          :model="loginForm"
          :rules="rules"
          label-position="top"
          @submit.prevent="handleLogin"
      >
        <el-form-item label="Email" prop="email">
          <el-input
              v-model="loginForm.email"
              placeholder="your@email.com"
              type="email"
              prefix-icon="Message"
          />
        </el-form-item>

        <el-form-item label="Password" prop="password">
          <el-input
              v-model="loginForm.password"
              placeholder="Your password"
              type="password"
              prefix-icon="Lock"
              show-password
          />
        </el-form-item>

        <div class="form-actions">
          <el-button
              type="primary"
              native-type="submit"
              :loading="loading"
              class="submit-button"
          >
            Login
          </el-button>
        </div>

        <div class="form-footer">
          <p>Don't have an account? <router-link to="/register">Register here</router-link></p>
        </div>
      </el-form>
    </el-card>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { ElMessage } from 'element-plus';
import { useAuthStore } from '../stores/auth';

const router = useRouter();
const route = useRoute();
const authStore = useAuthStore();

const loading = ref(false);

// Get redirect path from query params
const redirectPath = route.query.redirect as string || '/';

// Login form
const loginForm = reactive({
  email: '',
  password: ''
});

// Form validation rules
const rules = {
  email: [
    { required: true, message: 'Please enter your email', trigger: 'blur' },
    { type: 'email', message: 'Please enter a valid email address', trigger: 'blur' }
  ],
  password: [
    { required: true, message: 'Please enter your password', trigger: 'blur' },
    { min: 6, message: 'Password must be at least 6 characters', trigger: 'blur' }
  ]
};

// Form reference for validation
const loginFormRef = ref();

// Handle login submission
const handleLogin = async () => {
  if (!loginFormRef.value) return;

  await loginFormRef.value.validate(async (valid: boolean) => {
    if (!valid) {
      return false;
    }

    loading.value = true;

    try {
      const success = await authStore.login({
        email: loginForm.email,
        password: loginForm.password
      });

      if (success) {
        ElMessage({
          type: 'success',
          message: 'Login successful!'
        });

        // Redirect to previous page or home
        router.push(redirectPath);
      } else {
        ElMessage({
          type: 'error',
          message: authStore.error || 'Login failed. Please check your credentials.'
        });
      }
    } catch (error) {
      ElMessage({
        type: 'error',
        message: 'An error occurred. Please try again.'
      });
      console.error('Login error:', error);
    } finally {
      loading.value = false;
    }
  });
};
</script>

<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: calc(100vh - 130px);
  padding: 20px;
}

.login-card {
  width: 100%;
  max-width: 400px;
}

.card-header {
  text-align: center;
}

.card-header h2 {
  margin: 0;
  font-size: 1.8rem;
  color: #333;
}

.form-actions {
  margin-top: 30px;
}

.submit-button {
  width: 100%;
  padding: 12px 0;
  font-size: 1.1rem;
}

.form-footer {
  margin-top: 20px;
  text-align: center;
  color: #666;
}

.form-footer a {
  color: var(--el-color-primary);
  text-decoration: none;
}

.form-footer a:hover {
  text-decoration: underline;
}
</style>