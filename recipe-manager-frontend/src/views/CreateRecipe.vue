<!-- src/views/CreateRecipe.vue -->
<template>
  <div class="create-recipe-container">
    <div class="page-header">
      <h1>Create New Recipe</h1>
      <p class="subtitle">Share your culinary masterpiece with the world</p>
    </div>

    <recipe-form :is-edit="false" @cancel="handleCancel" />
  </div>
</template>

<script lang="ts" setup>
import { useRouter } from 'vue-router';
import RecipeForm from '../components/RecipeForm.vue';

const router = useRouter();

const handleCancel = () => {
  router.push('/');
};
</script>

<style scoped>
.create-recipe-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.page-header {
  margin-bottom: 30px;
  text-align: center;
}

.page-header h1 {
  font-size: 2rem;
  color: #333;
  margin-bottom: 10px;
}

.subtitle {
  color: #666;
  font-size: 1.1rem;
}
</style>