export const useShoppingListStore = defineStore("shoppingList", {
  state: () => ({
    shoppingMap: new Map(),
  }),
  getters: {
    getShoppingList: (state) => {
      return Array.from(state.shoppingMap.entries());
    },
  },
  actions: {
    addRecipe(recipeId: number) {
      if (this.shoppingMap.has(recipeId)) {
        this.shoppingMap.set(recipeId, this.shoppingMap.get(recipeId) + 1);
      } else {
        this.shoppingMap.set(recipeId, 1);
      }
    },
    removeRecipe(recipeId: number) {
      if (this.shoppingMap.has(recipeId)) {
        const currentCount = this.shoppingMap.get(recipeId);
        if (currentCount > 1) {
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
