<!-- src/components/RecipeForm.vue -->
<template>
  <div class="recipe-form">
    <el-form
        ref="formRef"
        :model="form"
        :rules="rules"
        label-width="120px"
        @submit.prevent="handleSubmit"
    >
      <!-- Recipe Title -->
      <el-form-item label="Recipe Title" prop="title">
        <el-input v-model="form.title" placeholder="Enter recipe title" />
      </el-form-item>

      <!-- Difficulty Level -->
      <el-form-item label="Difficulty" prop="difficulty">
        <el-select v-model="form.difficulty" placeholder="Select difficulty">
          <el-option label="Easy" value="Easy" />
          <el-option label="Medium" value="Medium" />
          <el-option label="Hard" value="Hard" />
        </el-select>
      </el-form-item>

      <!-- Creator Name -->
      <el-form-item label="Creator Name" prop="creatorName">
        <el-input v-model="form.creatorName" placeholder="Your name" />
      </el-form-item>

      <!-- Ingredients -->
      <el-form-item label="Ingredients" prop="ingredients">
        <div
            v-for="(ingredient, index) in form.ingredients"
            :key="index"
            class="ingredient-row"
        >
          <el-input
              v-model="ingredient.ingredientName"
              placeholder="Ingredient name and quantity"
              :class="{ 'invalid-input': ingredientErrors[index] }"
          />
          <el-button
              type="danger"
              icon="Delete"
              circle
              @click="removeIngredient(index)"
          />
        </div>
        <div class="ingredient-error" v-if="ingredientsHaveError">
          Please fill in all ingredient fields
        </div>
        <el-button type="primary" icon="Plus" @click="addIngredient">
          Add Ingredient
        </el-button>
      </el-form-item>

      <!-- Instructions -->
      <el-form-item label="Instructions" prop="instructions">
        <el-input
            v-model="form.instructions"
            type="textarea"
            rows="6"
            placeholder="Enter detailed recipe instructions"
        />
      </el-form-item>

      <!-- Image Upload -->
      <el-form-item label="Recipe Image">
        <el-upload
            class="recipe-image-uploader"
            :auto-upload="false"
            :show-file-list="true"
            :limit="1"
            :on-change="handleImageChange"
            :on-remove="handleImageRemove"
            accept="image/*"
        >
          <template #trigger>
            <el-button type="primary">Select Image</el-button>
          </template>
          <template #tip>
            <div class="el-upload__tip">
              JPG/PNG files with a size less than 2MB
            </div>
          </template>
        </el-upload>
        <div v-if="imagePreview" class="image-preview">
          <img :src="imagePreview" alt="Recipe preview" />
        </div>
      </el-form-item>

      <!-- Form Actions -->
      <el-form-item>
        <el-button type="primary" native-type="submit" :loading="isSubmitting">
          {{ isEdit ? 'Update Recipe' : 'Create Recipe' }}
        </el-button>
        <el-button @click="handleCancel">Cancel</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive, computed, onMounted, type PropType } from 'vue';
import { useRouter } from 'vue-router';
import { ElMessage } from 'element-plus';
import type { FormInstance } from 'element-plus';
import { useRecipeStore } from '../stores/recipe';
import type { Recipe, RecipeFormData, Ingredient, DifficultyLevel } from '../types';

const props = defineProps({
  recipe: {
    type: Object as PropType<Recipe>,
    default: null,
  },
  isEdit: {
    type: Boolean,
    default: false,
  },
});

const emits = defineEmits(['cancel']);

const router = useRouter();
const recipeStore = useRecipeStore();
const formRef = ref<FormInstance>();
const isSubmitting = ref(false);
const imageFile = ref<File | null>(null);
const imagePreview = ref<string | null>(null);
const ingredientErrors = ref<boolean[]>([]);
const ingredientsHaveError = ref(false);

// Initialize form with default values or existing recipe
const form = reactive<RecipeFormData>({
  title: '',
  difficulty: 'Medium' as DifficultyLevel,
  instructions: '',
  imageUrl: '',
  creatorName: '',
  ingredients: [{ ingredientName: '' }],
});

// Form validation rules
const rules = reactive({
  title: [
    { required: true, message: 'Please enter a recipe title', trigger: 'blur' },
    { min: 3, max: 100, message: 'Title must be 3-100 characters', trigger: 'blur' },
  ],
  difficulty: [
    { required: true, message: 'Please select a difficulty level', trigger: 'change' },
  ],
  creatorName: [
    { required: true, message: 'Please enter your name', trigger: 'blur' },
  ],
  instructions: [
    { required: true, message: 'Please enter recipe instructions', trigger: 'blur' },
    { min: 10, message: 'Instructions should be at least 10 characters', trigger: 'blur' },
  ],
});

// Initialize form with existing recipe data if in edit mode
onMounted(() => {
  if (props.recipe) {
    form.title = props.recipe.title;
    form.difficulty = props.recipe.difficulty;
    form.instructions = props.recipe.instructions;
    form.creatorName = props.recipe.creatorName;
    form.imageUrl = props.recipe.imageUrl || '';
    form.ingredients = props.recipe.ingredients.length > 0
        ? [...props.recipe.ingredients]
        : [{ ingredientName: '' }];

    if (props.recipe.imageUrl) {
      imagePreview.value = props.recipe.imageUrl;
    }
  }
});

// Methods
const addIngredient = () => {
  form.ingredients.push({ ingredientName: '' });
  ingredientErrors.value.push(false);
};

const removeIngredient = (index: number) => {
  if (form.ingredients.length > 1) {
    form.ingredients.splice(index, 1);
    ingredientErrors.value.splice(index, 1);
  } else {
    ElMessage({
      message: 'Recipe must have at least one ingredient',
      type: 'warning',
    });
  }
};

const validateIngredients = (): boolean => {
  ingredientsHaveError.value = false;
  ingredientErrors.value = form.ingredients.map(ing => !ing.ingredientName.trim());

  if (ingredientErrors.value.some(error => error)) {
    ingredientsHaveError.value = true;
    return false;
  }
  return true;
};

const handleImageChange = (file: any) => {
  imageFile.value = file.raw;
  // Create preview
  if (file.raw) {
    imagePreview.value = URL.createObjectURL(file.raw);
  }
};

const handleImageRemove = () => {
  imageFile.value = null;
  imagePreview.value = props.recipe?.imageUrl || null;
};

const handleSubmit = async () => {
  if (!validateIngredients()) {
    ElMessage({
      message: 'Please fill in all ingredient fields',
      type: 'error',
    });
    return;
  }

  // Validate form using Element Plus form validation
  if (!formRef.value) return;

  await formRef.value.validate(async (valid) => {
    if (valid) {
      isSubmitting.value = true;

      try {
        // Prepare form data
        const recipeData: RecipeFormData = {
          ...form,
          imageFile: imageFile.value || undefined,
        };

        let result;
        if (props.isEdit && props.recipe) {
          // Update existing recipe
          result = await recipeStore.updateRecipe(props.recipe.id, recipeData);
        } else {
          // Create new recipe
          result = await recipeStore.createRecipe(recipeData);
        }

        if (result) {
          ElMessage({
            message: props.isEdit
                ? 'Recipe updated successfully!'
                : 'Recipe created successfully!',
            type: 'success',
          });
          router.push('/');
        }
      } catch (error) {
        console.error('Form submission error:', error);
        ElMessage({
          message: 'An error occurred while saving the recipe',
          type: 'error',
        });
      } finally {
        isSubmitting.value = false;
      }
    } else {
      ElMessage({
        message: 'Please fix the form errors before submitting',
        type: 'error',
      });
    }
  });
};

const handleCancel = () => {
  emits('cancel');
  router.push('/');
};
</script>

