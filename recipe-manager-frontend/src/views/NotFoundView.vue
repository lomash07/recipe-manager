<!-- src/views/NotFoundView.vue -->
<template>
  <div class="not-found-container">
    <el-result
        icon="warning"
        title="404"
        sub-title="Sorry, the page you visited does not exist."
    >
      <template #extra>
        <el-button type="primary" @click="goHome">Back to Home</el-button>
      </template>
    </el-result>

    <div class="suggestions">
      <h3>You might be looking for:</h3>
      <ul>
        <li><router-link to="/">Recipe Dashboard</router-link></li>
        <li><router-link to="/recipes/create">Create New Recipe</router-link></li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useRouter } from 'vue-router';

const router = useRouter();

const goHome = () => {
  router.push('/');
};
</script>

<style scoped>
.not-found-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: calc(100vh - 200px);
  padding: 20px;
  text-align: center;
}

.suggestions {
  margin-top: 40px;
  padding: 20px;
  border-radius: 8px;
  background-color: #f9f9f9;
  max-width: 400px;
}

.suggestions h3 {
  color: #333;
  margin-bottom: 15px;
}

.suggestions ul {
  list-style: none;
  padding: 0;
  text-align: center;
}

.suggestions li {
  margin: 10px 0;
}

.suggestions a {
  color: var(--el-color-primary);
  text-decoration: none;
  padding: 5px 10px;
  border-radius: 4px;
  transition: background-color 0.2s;
}

.suggestions a:hover {
  background-color: rgba(64, 158, 255, 0.1);
}
</style>