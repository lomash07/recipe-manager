package com.recipemanager.repository;

import com.recipemanager.model.entity.Ingredient;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface IngredientRepository extends JpaRepository<Ingredient, Long> {

    // Find ingredients by recipe ID
    List<Ingredient> findByRecipeId(Long recipeId);

    // Delete all ingredients associated with a recipe
    void deleteByRecipeId(Long recipeId);
}