import { defineStore } from "pinia";
import { ingredients } from "~/server/data/ingredient";

export const useIngredientStore = defineStore("ingredient", {
  state: () => ({
    ingredients: ingredients,
  }),
  getters: {
    getIngredientById: (state) => (id: number) => {
      return state.ingredients.find((ingredient) => ingredient.id === id);
    },
    getAllIngredients: (state) => {
      return state.ingredients;
    },
  },
});
