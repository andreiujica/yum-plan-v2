import { describe, test, expect, beforeEach } from "vitest";
import { setActivePinia, createPinia } from "pinia";
import { useShoppingListStore } from "~/stores/shoppingList";
import { useIngredientStore } from "~/stores/ingredient";
import { useRecipeStore } from "~/stores/recipe";

describe("Shopping List store", () => {
  let shoppingListStore = useShoppingListStore();
  let ingredientsStore = useIngredientStore();
  let recipeStore = useRecipeStore();

  beforeEach(() => {
    setActivePinia(createPinia());
    shoppingListStore = useShoppingListStore();

    ingredientsStore = useIngredientStore();
    recipeStore = useRecipeStore();
  });

  test("getShoppingList returns an empty array initially", () => {
    const shoppingList = shoppingListStore.getShoppingList;
    expect(shoppingList).toEqual([]);
  });

  test("addRecipe adds a recipe to the shopping list", () => {
    const recipeId = 1;
    shoppingListStore.addRecipe(recipeId);

    const shoppingList = shoppingListStore.getShoppingList;
    expect(shoppingList).toEqual([[recipeStore.getRecipeById(recipeId), 1]]);
  });

  test("addRecipe increments the count if the recipe is already in the shopping list", () => {
    const recipeId = 1;
    shoppingListStore.addRecipe(recipeId);
    shoppingListStore.addRecipe(recipeId);

    const shoppingList = shoppingListStore.getShoppingList;
    expect(shoppingList).toEqual([[recipeStore.getRecipeById(recipeId), 2]]);
  });

  test("removeRecipe decrements the count if the recipe count is more than 1", () => {
    const recipeId = 1;
    shoppingListStore.addRecipe(recipeId);
    shoppingListStore.addRecipe(recipeId);
    shoppingListStore.removeRecipe(recipeId);

    const shoppingList = shoppingListStore.getShoppingList;
    expect(shoppingList).toEqual([[recipeStore.getRecipeById(recipeId), 1]]);
  });

  test("removeRecipe removes the recipe if the count is 1", () => {
    const recipeId = 1;
    shoppingListStore.addRecipe(recipeId);
    shoppingListStore.removeRecipe(recipeId);

    const shoppingList = shoppingListStore.getShoppingList;
    expect(shoppingList).toEqual([]);
  });

  test("clearShoppingList clears the entire shopping list", () => {
    const recipeId1 = 1;
    const recipeId2 = 2;
    shoppingListStore.addRecipe(recipeId1);
    shoppingListStore.addRecipe(recipeId2);

    shoppingListStore.clearShoppingList();

    const shoppingList = shoppingListStore.getShoppingList;
    expect(shoppingList).toEqual([]);
  });

  test("getIngredientTotals calculates the correct ingredient totals", () => {
    shoppingListStore.addRecipe(1);
    shoppingListStore.addRecipe(2);

    const ingredientTotals = shoppingListStore.getIngredientTotals;

    expect(ingredientTotals).toEqual([
      { ingredientId: 1, quantity: 300, usedUnit: "g" },
      { ingredientId: 2, quantity: 200, usedUnit: "g" },
      { ingredientId: 3, quantity: 7, usedUnit: "piece" },
      { ingredientId: 4, quantity: 100, usedUnit: "g" },
      { ingredientId: 6, quantity: 150, usedUnit: "g" },
      { ingredientId: 5, quantity: 100, usedUnit: "g" },
    ]);
  });
});
