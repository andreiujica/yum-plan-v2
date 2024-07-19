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
    getIngredientNameById: (state) => (id: number) => {
      const ingredient = state.ingredients.find(
        (ingredient) => ingredient.id === id
      );
      return ingredient?.name;
    },
    getAllIngredients: (state) => {
      return state.ingredients;
    },
    getAutocompleteIngredients: (state) => {
      return state.ingredients.map((ingredient) => ingredient.name);
    },
    getIngredientIdByName: (state) => (name: string) => {
      const ingredient = state.ingredients.find(
        (ingredient) => ingredient.name === name
      );
      return ingredient?.id;
    },
  },
});
