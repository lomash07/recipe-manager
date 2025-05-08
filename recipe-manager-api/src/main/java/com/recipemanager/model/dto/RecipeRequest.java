package com.recipemanager.model.dto;

import com.recipemanager.model.entity.DifficultyLevel;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

// Request DTO for creating a new recipe
@Data
@NoArgsConstructor
@AllArgsConstructor
public class RecipeRequest {

    @NotBlank(message = "Title is required")
    @Size(min = 3, max = 100, message = "Title must be between 3 and 100 characters")
    private String title;

    @NotNull(message = "Difficulty level is required")
    private String difficulty;

    @NotBlank(message = "Instructions are required")
    @Size(min = 10, message = "Instructions must be at least 10 characters")
    private String instructions;

    @NotBlank(message = "Creator name is required")
    private String creatorName;

    @NotEmpty(message = "At least one ingredient is required")
    @Valid
    private List<IngredientDto> ingredients = new ArrayList<>();
}
