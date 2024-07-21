import { describe, test, expect, beforeEach } from "vitest";
import { setActivePinia, createPinia } from "pinia";
import { useShoppingListStore } from "~/stores/shoppingList";

describe("Shopping List store", () => {
  let shoppingListStore = useShoppingListStore();

  beforeEach(() => {
    setActivePinia(createPinia());
    shoppingListStore = useShoppingListStore();
  });

  test("getShoppingList returns an empty array initially", () => {
    const shoppingList = shoppingListStore.getShoppingList;
    expect(shoppingList).toEqual([]);
  });

  test("addRecipe adds a recipe to the shopping list", () => {
    const recipeId = 1;
    shoppingListStore.addRecipe(recipeId);

    const shoppingList = shoppingListStore.getShoppingList;
    expect(shoppingList).toEqual([[recipeId, 1]]);
  });

  test("addRecipe increments the count if the recipe is already in the shopping list", () => {
    const recipeId = 1;
    shoppingListStore.addRecipe(recipeId);
    shoppingListStore.addRecipe(recipeId);

    const shoppingList = shoppingListStore.getShoppingList;
    expect(shoppingList).toEqual([[recipeId, 2]]);
  });

  test("removeRecipe decrements the count if the recipe count is more than 1", () => {
    const recipeId = 1;
    shoppingListStore.addRecipe(recipeId);
    shoppingListStore.addRecipe(recipeId);
    shoppingListStore.removeRecipe(recipeId);

    const shoppingList = shoppingListStore.getShoppingList;
    expect(shoppingList).toEqual([[recipeId, 1]]);
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
});
