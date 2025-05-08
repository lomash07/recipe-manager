<!-- src/views/RegisterView.vue -->
<template>
  <div class="register-container">
    <el-card class="register-card">
      <template #header>
        <div class="card-header">
          <h2>Create an Account</h2>
        </div>
      </template>

      <el-form
          ref="registerForm"
          :model="registerForm"
          :rules="rules"
          label-position="top"
          @submit.prevent="handleRegister"
      >
        <el-form-item label="Name" prop="name">
          <el-input
              v-model="registerForm.name"
              placeholder="Your full name"
              prefix-icon="User"
          />
        </el-form-item>

        <el-form-item label="Email" prop="email">
          <el-input
              v-model="registerForm.email"
              placeholder="your@email.com"
              type="email"
              prefix-icon="Message"
          />
        </el-form-item>

        <el-form-item label="Password" prop="password">
          <el-input
              v-model="registerForm.password"
              placeholder="Create a password"
              type="password"
              prefix-icon="Lock"
              show-password
          />
        </el-form-item>

        <el-form-item label="Confirm Password" prop="confirmPassword">
          <el-input
              v-model="registerForm.confirmPassword"
              placeholder="Confirm your password"
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
            Register
          </el-button>
        </div>

        <div class="form-footer">
          <p>Already have an account? <router-link to="/login">Login here</router-link></p>
        </div>
      </el-form>
    </el-card>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive } from 'vue';
import { useRouter } from 'vue-router';
import { ElMessage } from 'element-plus';
import { useAuthStore } from '../stores/auth';

const router = useRouter();
const authStore = useAuthStore();

const loading = ref(false);

// Register form
const registerForm = reactive({
  name: '',
  email: '',
  password: '',
  confirmPassword: ''
});

// Form validation rules
const validateConfirmPassword = (rule: any, value: string, callback: any) => {
  if (value !== registerForm.password) {
    callback(new Error('Passwords do not match'));
  } else {
    callback();
  }
};

const rules = {
  name: [
    { required: true, message: 'Please enter your name', trigger: 'blur' },
    { min: 3, message: 'Name must be at least 3 characters', trigger: 'blur' }
  ],
  email: [
    { required: true, message: 'Please enter your email', trigger: 'blur' },
    { type: 'email', message: 'Please enter a valid email address', trigger: 'blur' }
  ],
  password: [
    { required: true, message: 'Please enter a password', trigger: 'blur' },
    { min: 6, message: 'Password must be at least 6 characters', trigger: 'blur' }
  ],
  confirmPassword: [
    { required: true, message: 'Please confirm your password', trigger: 'blur' },
    { validator: validateConfirmPassword, trigger: 'blur' }
  ]
};

// Form reference for validation
const registerFormRef = ref();

// Handle registration submission
const handleRegister = async () => {
  if (!registerFormRef.value) return;

  await registerFormRef.value.validate(async (valid: boolean) => {
    if (!valid) {
      return false;
    }

    loading.value = true;

    try {
      const success = await authStore.register({
        name: registerForm.name,
        email: registerForm.email,
        password: registerForm.password,
        roles: ['user']
      });

      if (success) {
        ElMessage({
          type: 'success',
          message: 'Registration successful! You are now logged in.'
        });

        // Redirect to home page
        router.push('/');
      } else {
        ElMessage({
          type: 'error',
          message: authStore.error || 'Registration failed. Please try again.'
        });
      }
    } catch (error) {
      ElMessage({
        type: 'error',
        message: 'An error occurred. Please try again.'
      });
      console.error('Registration error:', error);
    } finally {
      loading.value = false;
    }
  });
};
</script>

<style scoped>
.register-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: calc(100vh - 130px);
  padding: 20px;
}

.register-card {
  width: 100%;
  max-width: 450px;
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