import type { Recipe, RecipeIngredient } from "~/types/recipe";

export const useShoppingListStore = defineStore("shoppingList", {
  state: () => ({
    shoppingMap: new Map<number, number>(),
  }),
  getters: {
    getShoppingList(): [Recipe, number][] {
      /* This getter turns the shoppingMap into an array of [Recipe, number] tuples
       * where the number is the count of the recipe in the shopping list.
       */
      const recipeStore = useRecipeStore();
      const shoppingList: [Recipe, number][] = [];

      this.shoppingMap.forEach((count, recipeId) => {
        const recipe = recipeStore.getRecipeById(recipeId);
        if (recipe) {
          shoppingList.push([recipe, count]);
        }
      });

      return shoppingList;
    },
    getIngredientTotals(): RecipeIngredient[] {
      // This getter calculates the total quantity of each ingredient in the shopping list.

      const ingredientTotals = new Map<number, RecipeIngredient>();
      const recipeStore = useRecipeStore();

      this.shoppingMap.forEach((count, recipeId) => {
        const recipe = recipeStore.getRecipeById(recipeId);
        if (recipe) {
          recipe.ingredients.forEach((ingredient) => {
            // If the ingredient is already in the map, increment the quantity
            const currentTotal = ingredientTotals.get(ingredient.ingredientId);
            if (currentTotal) {
              ingredientTotals.set(ingredient.ingredientId, {
                ...currentTotal,
                quantity: currentTotal.quantity + ingredient.quantity * count,
              });
            } else {
              // If the ingredient is not in the map, add it with the correct quantity
              ingredientTotals.set(ingredient.ingredientId, {
                ingredientId: ingredient.ingredientId,
                quantity: ingredient.quantity * count,
                usedUnit: ingredient.usedUnit,
              });
            }
          });
        }
      });

      return Array.from(ingredientTotals.values());
    },
  },
  actions: {
    addRecipe(recipeId: number) {
      const recipeCount = this.shoppingMap.get(recipeId);

      if (recipeCount) {
        this.shoppingMap.set(recipeId, recipeCount + 1);
      } else {
        this.shoppingMap.set(recipeId, 1);
      }
    },
    removeRecipe(recipeId: number) {
      if (this.shoppingMap.has(recipeId)) {
        const currentCount = this.shoppingMap.get(recipeId);
        if (currentCount && currentCount > 1) {
          this.shoppingMap.set(recipeId, currentCount - 1);
        } else {
          this.shoppingMap.delete(recipeId);
        }
      }
    },
    clearShoppingList() {
      this.shoppingMap.clear();
    },
  },
});
