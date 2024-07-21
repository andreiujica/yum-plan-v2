<template>
  <UCard
    :ui="{
      base: 'w-2/5 h-1/2 overflow-auto',
    }"
  >
    <template #header>
      <div class="flex flex-col space-y-2">
        <span class="text-lg font-semibold">Your Recipe Collection</span>
        <span class="text-sm font-light text-gray-800 dark:text-gray-200">
          Explore both your custom recipes and our built-in favorites. Click on
          the ingredients button to learn more and add items to your cart. Happy
          cooking!
        </span>
      </div>
    </template>

    <div class="flex flex-col space-y-2">
      <RecipeRow
        v-for="recipe in recipes"
        :key="recipe.id"
        :recipe="recipe"
        @delete="deleteRecipe"
      />
    </div>
  </UCard>
</template>

<script setup lang="ts">
import type { Recipe } from "~/types/recipe";
const recipes = useRecipeStore().getAllRecipes;
const toast = useToast();

const deleteRecipe = (recipe: Recipe) => {
  useRecipeStore().deleteRecipe(recipe.id);
  toast.add({
    title: "Recipe successfully deleted.",
  });
};
</script>
