package com.recipemanager.controller;

import com.recipemanager.model.dto.RecipeRequest;
import com.recipemanager.model.dto.RecipeResponse;
import com.recipemanager.service.RecipeService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/recipes")
@RequiredArgsConstructor
public class RecipeController {

    private final RecipeService recipeService;

    /**
     * Get all recipes
     */
    @GetMapping
    public ResponseEntity<List<RecipeResponse>> getAllRecipes(
            @RequestParam(required = false) String title,
            @RequestParam(required = false) String difficulty,
            @RequestParam(required = false) Integer ingredientCount) {

        List<RecipeResponse> recipes;

        if (title != null && !title.isEmpty()) {
            recipes = recipeService.findRecipesByTitle(title);
        } else if (difficulty != null && !difficulty.isEmpty()) {
            recipes = recipeService.findRecipesByDifficulty(difficulty);
        } else if (ingredientCount != null) {
            recipes = recipeService.findRecipesByIngredientCount(ingredientCount);
        } else {
            recipes = recipeService.getAllRecipes();
        }

        return ResponseEntity.ok(recipes);
    }

    /**
     * Get recipe by ID
     */
    @GetMapping("/{id}")
    public ResponseEntity<RecipeResponse> getRecipeById(@PathVariable Long id) {
        RecipeResponse recipe = recipeService.getRecipeById(id);
        return ResponseEntity.ok(recipe);
    }

    /**
     * Create a new recipe
     */
    @PostMapping
    @PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
    public ResponseEntity<RecipeResponse> createRecipe(
            @RequestPart(value = "recipe") @Valid RecipeRequest recipeRequest,
            @RequestPart(value = "imageFile", required = false) MultipartFile imageFile) {

        RecipeResponse createdRecipe = recipeService.createRecipe(recipeRequest, imageFile);
        return new ResponseEntity<>(createdRecipe, HttpStatus.CREATED);
    }

    /**
     * Update an existing recipe
     */
    @PutMapping("/{id}")
    @PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
    public ResponseEntity<RecipeResponse> updateRecipe(
            @PathVariable Long id,
            @RequestPart(value = "recipe") @Valid RecipeRequest recipeRequest,
            @RequestPart(value = "imageFile", required = false) MultipartFile imageFile) {

        RecipeResponse updatedRecipe = recipeService.updateRecipe(id, recipeRequest, imageFile);
        return ResponseEntity.ok(updatedRecipe);
    }

    /**
     * Delete a recipe
     */
    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
    public ResponseEntity<Void> deleteRecipe(@PathVariable Long id) {
        recipeService.deleteRecipe(id);
        return ResponseEntity.noContent().build();
    }
}