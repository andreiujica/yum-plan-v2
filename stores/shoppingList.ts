import type { Recipe, RecipeIngredient } from "~/types/recipe";

export const useShoppingListStore = defineStore("shoppingList", {
  state: () => ({
    shoppingMap: new Map<number, number>(),
  }),
  getters: {
    getShoppingList(): [Recipe, number][] {
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
      const ingredientTotals = new Map<number, RecipeIngredient>();
      const recipeStore = useRecipeStore();

      this.shoppingMap.forEach((count, recipeId) => {
        const recipe = recipeStore.getRecipeById(recipeId);
        if (recipe) {
          recipe.ingredients.forEach((ingredient) => {
            const currentTotal = ingredientTotals.get(ingredient.ingredientId);
            if (currentTotal) {
              ingredientTotals.set(ingredient.ingredientId, {
                ...currentTotal,
                quantity: currentTotal.quantity + ingredient.quantity * count,
              });
            } else {
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
