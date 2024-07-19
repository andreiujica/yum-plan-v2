import { describe, test, expect, beforeEach } from "vitest";
import { setActivePinia, createPinia } from "pinia";
import { useRecipeStore } from "~/stores/recipe";
import type { IconColor, Recipe } from "~/types/recipe";

describe("Recipe store", () => {
  let recipeStore = useRecipeStore();

  beforeEach(() => {
    setActivePinia(createPinia());
    recipeStore = useRecipeStore();
  });

  test("getRecipeById returns the correct recipe", () => {
    const recipe = recipeStore.getRecipeById(1);
    expect(recipe?.name).toBe("Brownie");
  });

  test("getAllRecipes returns all recipes", () => {
    const recipes = recipeStore.getAllRecipes;
    // We have 3 built-in recipes
    expect(recipes.length).toBeGreaterThanOrEqual(3);
  });

  test("addRecipe adds a recipe", () => {
    const newRecipe: Recipe = {
      id: 4,
      name: "New Recipe",
      iconColor: "green" as IconColor,
      ingredients: [],
    };

    recipeStore.addRecipe(newRecipe);

    /* We can't use .toContain because it uses === to compare objects
     * and the new recipe is a different object reference. So we use
     * Jest's matchers for deep equality instead.
     */
    const allRecipes = recipeStore.getAllRecipes;
    expect(allRecipes).toEqual(
      expect.arrayContaining([expect.objectContaining(newRecipe)])
    );
  });
});
