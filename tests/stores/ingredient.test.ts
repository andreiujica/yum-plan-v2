import { describe, test, expect, beforeEach } from "vitest";
import { setActivePinia, createPinia } from "pinia";
import { useIngredientStore } from "~/stores/ingredient";

describe("Ingredient store", () => {
  let ingredientStore = useIngredientStore();

  beforeEach(() => {
    setActivePinia(createPinia());
    ingredientStore = useIngredientStore();
  });

  test("getIngredientById returns the correct ingredient", () => {
    const ingredient = ingredientStore.getIngredientById(1);
    expect(ingredient?.name).toBe("flour");
  });

  test("getAllIngredients returns all ingredients", () => {
    const ingredients = ingredientStore.getAllIngredients;
    expect(ingredients.length).toBe(20);
  });
});
