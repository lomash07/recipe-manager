<!-- src/views/Dashboard.vue -->
<template>
  <div class="dashboard">
    <h1>Recipe Dashboard</h1>

    <!-- Search and Filter Controls -->
    <div class="filter-controls">
      <el-row :gutter="20">
        <el-col :span="8">
          <el-input
              v-model="searchTerm"
              placeholder="Search recipes by title..."
              prefix-icon="el-icon-search"
              clearable
              @input="applyFilters"
          />
        </el-col>

        <el-col :span="6">
          <el-select
              v-model="selectedDifficulty"
              placeholder="Filter by difficulty"
              clearable
              @change="applyFilters"
          >
            <el-option label="Easy" value="Easy" />
            <el-option label="Medium" value="Medium" />
            <el-option label="Hard" value="Hard" />
          </el-select>
        </el-col>

        <el-col :span="6">
          <el-input-number
              v-model="ingredientCount"
              placeholder="# of ingredients"
              :min="0"
              @change="applyFilters"
          />
        </el-col>

        <el-col :span="4">
          <el-button type="primary" @click="addNewRecipe">
            Add New Recipe
          </el-button>
        </el-col>
      </el-row>
    </div>

    <!-- Loading Indicator -->
    <div v-if="recipeStore.loading" class="loading-container">
      <el-skeleton :rows="6" animated />
    </div>

    <!-- Error Message -->
    <el-alert
        v-if="recipeStore.error"
        :title="recipeStore.error"
        type="error"
        show-icon
    />

    <!-- Recipe Table -->
    <el-table
        v-else
        :data="recipeStore.paginatedRecipes"
        stripe
        style="width: 100%"
        v-loading="recipeStore.loading"
    >
      <el-table-column prop="title" label="Recipe Title" min-width="150">
        <template #default="{ row }">
          <router-link :to="`/recipes/${row.id}`">{{ row.title }}</router-link>
        </template>
      </el-table-column>

      <el-table-column prop="difficulty" label="Difficulty" width="120">
        <template #default="{ row }">
          <el-tag :type="difficultyTagType(row.difficulty)">
            {{ row.difficulty }}
          </el-tag>
        </template>
      </el-table-column>

      <el-table-column prop="ingredients" label="Ingredients" width="120">
        <template #default="{ row }">
          {{ row.ingredients.length }} ingredients
        </template>
      </el-table-column>

      <el-table-column prop="creatorName" label="Created By" width="150" />

      <el-table-column prop="createdDate" label="Date" width="180">
        <template #default="{ row }">
          {{ formatDate(row.createdDate) }}
        </template>
      </el-table-column>

      <el-table-column label="Actions" width="150">
        <template #default="{ row }">
          <el-button
              size="small"
              type="primary"
              @click="editRecipe(row.id)"
              icon="el-icon-edit"
          >
            Edit
          </el-button>
          <el-button
              size="small"
              type="danger"
              @click="confirmDelete(row)"
              icon="el-icon-delete"
          >
            Delete
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- Pagination -->
    <div class="pagination-container">
      <el-pagination
          v-model:currentPage="currentPage"
          :page-size="recipeStore.pageSize"
          :total="recipeStore.totalRecipes"
          layout="prev, pager, next, jumper"
          @current-change="handlePageChange"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, computed, watch } from 'vue';
import { useRouter } from 'vue-router';
import { ElMessage, ElMessageBox } from 'element-plus';
import { useRecipeStore } from '../stores/recipe';
import { formatDate } from '../utils/formatters';
import type { Recipe } from '../types';

const router = useRouter();
const recipeStore = useRecipeStore();

// Local state for filters
const searchTerm = ref('');
const selectedDifficulty = ref('');
const ingredientCount = ref<number | null>(null);
const currentPage = ref(1);

// Computed and methods
const difficultyTagType = (difficulty: string) => {
  switch (difficulty) {
    case 'Easy': return 'success';
    case 'Medium': return 'warning';
    case 'Hard': return 'danger';
    default: return 'info';
  }
};

const applyFilters = () => {
  recipeStore.setFilters({
    searchTerm: searchTerm.value,
    difficulty: selectedDifficulty.value,
    ingredientCount: ingredientCount.value,
  });
};

const addNewRecipe = () => {
  router.push('/recipes/create');
};

const editRecipe = (id: number) => {
  router.push(`/recipes/${id}/edit`);
};

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
    }
  }).catch(() => {
    // User canceled the action
  });
};

const handlePageChange = (page: number) => {
  recipeStore.setPage(page);
};

// Initialize data
onMounted(async () => {
  await recipeStore.fetchRecipes();
});

// Sync the local state with the store
watch(() => recipeStore.currentPage, (newPage) => {
  currentPage.value = newPage;
});

watch(() => recipeStore.filterOptions, (newFilters) => {
  searchTerm.value = newFilters.searchTerm;
  selectedDifficulty.value = newFilters.difficulty;
  ingredientCount.value = newFilters.ingredientCount;
}, { deep: true });
</script>

<style scoped>
.dashboard {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.filter-controls {
  margin-bottom: 20px;
}

.pagination-container {
  margin-top: 20px;
  display: flex;
  justify-content: center;
}

.loading-container {
  padding: 40px;
}
</style>