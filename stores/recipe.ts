import type { Recipe } from "~/types/recipe";
import { defineStore } from "pinia";
import { builtInRecipes } from "~/server/data/recipe";

export const useRecipeStore = defineStore("recipe", {
  state: () => ({
    recipes: builtInRecipes,
  }),
  persist: true,
  getters: {
    getRecipeById: (state) => (id: number) => {
      return state.recipes.find((recipe) => recipe.id === id);
    },
    getAllRecipes: (state) => {
      return state.recipes;
    },
  },
  actions: {
    addRecipe(recipe: Recipe) {
      // Find the highest id in the current recipes and add 1 to it
      const highestId = Math.max(...this.recipes.map((recipe) => recipe.id));
      recipe.id = highestId + 1;

      // Add the new recipe to the beginning of the array to show it first
      this.recipes.unshift(recipe);
    },
    deleteRecipe(recipeId: number) {
      const index = this.recipes.findIndex((recipe) => recipe.id === recipeId);
      if (index !== -1) {
        this.recipes.splice(index, 1);
      }
    },
  },
});
