<!-- src/views/EditRecipe.vue -->
<template>
  <div class="edit-recipe-container">
    <div v-if="loading" class="loading-container">
      <el-skeleton :rows="10" animated />
    </div>

    <el-result
        v-else-if="error"
        icon="error"
        :title="error"
        sub-title="Sorry, the recipe could not be loaded for editing."
    >
      <template #extra>
        <el-button type="primary" @click="goBack">Back to Recipes</el-button>
      </template>
    </el-result>

    <template v-else-if="recipe">
      <div class="page-header">
        <h1>Edit Recipe: {{ recipe.title }}</h1>
      </div>

      <recipe-form
          :recipe="recipe"
          :is-edit="true"
          @cancel="handleCancel"
      />
    </template>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import RecipeForm from '../components/RecipeForm.vue';
import { useRecipeStore } from '../stores/recipe';
import type { Recipe } from '../types';

const route = useRoute();
const router = useRouter();
const recipeStore = useRecipeStore();

const recipe = ref<Recipe | null>(null);
const loading = ref(true);
const error = ref<string | null>(null);

const handleCancel = () => {
  router.push('/');
};

const goBack = () => {
  router.push('/');
};

// Load recipe data on component mount
onMounted(async () => {
  const recipeId = Number(route.params.id);
  if (isNaN(recipeId)) {
    error.value = 'Invalid recipe ID';
    loading.value = false;
    return;
  }

  try {
    const fetchedRecipe = await recipeStore.fetchRecipeById(recipeId);
    if (fetchedRecipe) {
      recipe.value = fetchedRecipe;
    } else {
      error.value = 'Recipe not found';
    }
  } catch (err) {
    console.error('Error loading recipe:', err);
    error.value = 'Failed to load recipe';
  } finally {
    loading.value = false;
  }
});
</script>

<style scoped>
.edit-recipe-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.loading-container {
  padding: 40px;
}

.page-header {
  margin-bottom: 30px;
}

.page-header h1 {
  font-size: 2rem;
  color: #333;
}
</style>