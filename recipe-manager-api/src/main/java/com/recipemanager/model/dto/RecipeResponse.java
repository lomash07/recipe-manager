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

// Response DTO for sending recipe data to the client
@Data
@NoArgsConstructor
@AllArgsConstructor
public class RecipeResponse {

    private Long id;
    private String title;
    private String difficulty;
    private String instructions;
    private String imageUrl;
    private String creatorName;
    private LocalDateTime createdDate;
    private List<IngredientDto> ingredients = new ArrayList<>();
}


