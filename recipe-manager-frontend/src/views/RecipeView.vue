<!-- src/views/RecipeView.vue -->
<template>
  <div class="recipe-detail-container">
    <div v-if="loading" class="loading-container">
      <el-skeleton :rows="10" animated />
    </div>

    <el-result
        v-else-if="error"
        icon="error"
        :title="error"
        sub-title="Sorry, the recipe could not be loaded."
    >
      <template #extra>
        <el-button type="primary" @click="goBack">Back to Recipes</el-button>
      </template>
    </el-result>

    <div v-else-if="recipe" class="recipe-detail">
      <div class="recipe-header">
        <div class="recipe-title-section">
          <h1>{{ recipe.title }}</h1>
          <div class="recipe-meta">
            <el-tag :type="difficultyTagType(recipe.difficulty)">
              {{ recipe.difficulty }}
            </el-tag>
            <span class="recipe-creator">
              Created by {{ recipe.creatorName }} on {{ formatDate(recipe.createdDate) }}
            </span>
          </div>
        </div>

        <div class="recipe-actions">
          <el-button type="primary" @click="editRecipe(recipe.id)">
            Edit Recipe
          </el-button>
          <el-button type="danger" @click="confirmDelete(recipe)">
            Delete Recipe
          </el-button>
        </div>
      </div>

      <div class="recipe-content">
        <div class="recipe-main">
          <div v-if="recipe.imageUrl" class="recipe-image">
            <img :src="recipe.imageUrl" :alt="recipe.title" />
          </div>

          <div class="recipe-instructions">
            <h2>Instructions</h2>
            <div class="instructions-content">
              {{ recipe.instructions }}
            </div>
          </div>
        </div>

        <div class="recipe-sidebar">
          <h2>Ingredients</h2>
          <div class="ingredients-count">{{ recipe.ingredients.length }} ingredients</div>
          <el-divider />
          <ul class="ingredients-list">
            <li v-for="(ingredient, index) in recipe.ingredients" :key="index">
              {{ ingredient.ingredientName }}
            </li>
          </ul>
        </div>
      </div>

      <div class="recipe-footer">
        <el-button @click="goBack" plain>Back to Recipes</el-button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { ElMessage, ElMessageBox } from 'element-plus';
import { useRecipeStore } from '../stores/recipe';
import type { Recipe } from '../types';
import { formatDate } from '../utils/formatters';

const route = useRoute();
const router = useRouter();
const recipeStore = useRecipeStore();

const recipe = ref<Recipe | null>(null);
const loading = ref(true);
const error = ref<string | null>(null);

// Method to determine tag type based on difficulty
const difficultyTagType = (difficulty: string) => {
  switch (difficulty) {
    case 'Easy': return 'success';
    case 'Medium': return 'warning';
    case 'Hard': return 'danger';
    default: return 'info';
  }
};

// Edit recipe
const editRecipe = (id: number) => {
  router.push(`/recipes/${id}/edit`);
};

// Delete recipe
const confirmDelete = (recipe: Recipe) => {
  ElMessageBox.confirm(
      `Are you sure you want to delete the recipe "${recipe.title}"?`,
      'Warning',
      {
        confirmButtonText: 'Delete',
        cancelButtonText: 'Cancel',
        type: 'warning',
      }
  ).then(async () => {
    const success = await recipeStore.deleteRecipe(recipe.id);
    if (success) {
      ElMessage({
        type: 'success',
        message: `Recipe "${recipe.title}" has been deleted.`,
      });
      router.push('/');
    }
  }).catch(() => {
    // User canceled the action
  });
};

// Go back to recipe list
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
.recipe-detail-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.loading-container {
  padding: 40px;
}

.recipe-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 30px;
  border-bottom: 1px solid #eee;
  padding-bottom: 20px;
}

.recipe-title-section h1 {
  margin-bottom: 10px;
  color: #333;
  font-size: 2.2rem;
}

.recipe-meta {
  display: flex;
  align-items: center;
  gap: 15px;
  color: #666;
  font-size: 0.9rem;
}

.recipe-content {
  display: flex;
  gap: 40px;
  margin-bottom: 40px;
}

.recipe-main {
  flex: 3;
}

.recipe-sidebar {
  flex: 1;
  background-color: #f9f9f9;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
}

.recipe-image {
  margin-bottom: 30px;
  border-radius: 8px;
  overflow: hidden;
}

.recipe-image img {
  width: 100%;
  max-height: 400px;
  object-fit: cover;
}

.recipe-instructions h2,
.recipe-sidebar h2 {
  margin-bottom: 15px;
  color: #333;
  font-size: 1.5rem;
}

.instructions-content {
  white-space: pre-line;
  line-height: 1.6;
}

.ingredients-count {
  color: #666;
  font-size: 0.9rem;
  margin-bottom: 5px;
}

.ingredients-list {
  list-style: disc;
  padding-left: 20px;
}

.ingredients-list li {
  margin-bottom: 8px;
  line-height: 1.4;
}

.recipe-footer {
  margin-top: 30px;
  border-top: 1px solid #eee;
  padding-top: 20px;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .recipe-header {
    flex-direction: column;
    gap: 20px;
  }

  .recipe-content {
    flex-direction: column;
  }

  .recipe-actions {
    width: 100%;
    display: flex;
    justify-content: space-between;
  }
}
</style>