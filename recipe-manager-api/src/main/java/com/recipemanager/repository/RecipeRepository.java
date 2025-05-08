package com.recipemanager.repository;

import com.recipemanager.model.entity.DifficultyLevel;
import com.recipemanager.model.entity.Recipe;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RecipeRepository extends JpaRepository<Recipe, Long> {

    // Find recipes by difficulty level
    List<Recipe> findByDifficulty(DifficultyLevel difficulty);

    // Find recipes by creator name
    List<Recipe> findByCreatorNameContainingIgnoreCase(String creatorName);

    // Find recipes by title containing the search term
    List<Recipe> findByTitleContainingIgnoreCase(String title);

    // Find recipes with a specific number of ingredients
    @Query("SELECT r FROM Recipe r WHERE SIZE(r.ingredients) = :count")
    List<Recipe> findByIngredientCount(int count);

    // Find recipes containing a specific ingredient
    @Query("SELECT r FROM Recipe r JOIN r.ingredients i WHERE LOWER(i.ingredientName) LIKE LOWER(CONCAT('%', :ingredientName, '%'))")
    List<Recipe> findByIngredientName(String ingredientName);

    // Complex queries with multiple filters can be added as needed
}
