package com.recipemanager.model.entity;

public enum DifficultyLevel {
    EASY("Easy"),
    MEDIUM("Medium"),
    HARD("Hard");

    private final String displayName;

    DifficultyLevel(String displayName) {
        this.displayName = displayName;
    }

    public String getDisplayName() {
        return displayName;
    }

    public static DifficultyLevel fromDisplayName(String displayName) {
        for (DifficultyLevel level : values()) {
            if (level.getDisplayName().equalsIgnoreCase(displayName)) {
                return level;
            }
        }
        throw new IllegalArgumentException("No difficulty level found for: " + displayName);
    }
}