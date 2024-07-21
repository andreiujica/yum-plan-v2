<template>
  <UCard
    :ui="{
      base: 'flex flex-col w-full h-full overflow-auto',
      body: {
        base: 'grow',
      },
    }"
  >
    <!-- Shopping Cart Summary (With an empty state for when we have no items)-->

    <template #header>
      <div class="flex flex-col space-y-2">
        <span class="text-lg font-semibold">Shopping Cart Summary</span>
        <span class="text-sm font-light text-gray-800 dark:text-gray-200">
          Review your selected recipes and see a complete list of all necessary
          ingredients to buy. Shopping carts, assemble!
        </span>
      </div>
    </template>

    <div class="flex flex-col justify-between h-full">
      <div
        class="flex flex-col divide-y divide-gray-200 dark:divide-gray-800 overflow-auto"
      >
        <template v-if="shoppingList.length > 0">
          <ShoppingListRow
            v-for="([recipe, count], index) in shoppingList"
            :key="recipe.id"
            :recipe="recipe"
            :count="count"
            @increase="increaseRecipe"
            @decrease="decreaseRecipe"
            class="pb-4 pt-4"
          />
        </template>
        <template v-else>
          <div class="flex flex-col items-center justify-center">
            <UIcon name="i-tabler-database" class="mt-4" />
            <span class="py-4 text-gray-500 dark:text-gray-400">
              Your shopping cart is empty.
            </span>
          </div>
        </template>
      </div>

      <!-- Ingredients List (Also with an empty state)-->

      <UCard :ui="{ base: 'w-full h-64 overflow-auto' }">
        <template #header>
          <div class="flex flex-col space-y-2">
            <span class="text-lg font-semibold">Ingredients List</span>
            <span class="text-sm font-light text-gray-800 dark:text-gray-200">
              Take a quick glance at all the ingredients you need to buy.
            </span>
          </div>
        </template>

        <div class="flex flex-col space-y-2">
          <template v-if="shoppingListStore.getIngredientTotals.length > 0">
            <span
              v-for="ingredient in shoppingListStore.getIngredientTotals"
              :key="ingredient.ingredientId"
              class="text-sm"
            >
              •
              {{
                useIngredientStore().getIngredientNameById(
                  ingredient.ingredientId
                )
              }}
              <span class="text-gray-500 dark:text-gray-400">
                ({{ ingredient.quantity }} {{ ingredient.usedUnit }})
              </span>
            </span>
          </template>
          <template v-else>
            <div class="flex flex-col items-center justify-center">
              <UIcon name="i-tabler-mood-sad" class="mt-4" />
              <span class="py-4 text-gray-500 dark:text-gray-400">
                No ingredients to show (yet).
              </span>
            </div>
          </template>
        </div>
      </UCard>
    </div>
  </UCard>
</template>

<script setup lang="ts">
import type { Recipe } from "~/types/recipe";

const shoppingListStore = useShoppingListStore();

const shoppingList = computed(() => shoppingListStore.getShoppingList);

const increaseRecipe = (recipe: Recipe) => {
  useShoppingListStore().addRecipe(recipe.id);
};

const decreaseRecipe = (recipe: Recipe) => {
  useShoppingListStore().removeRecipe(recipe.id);
};
</script>
