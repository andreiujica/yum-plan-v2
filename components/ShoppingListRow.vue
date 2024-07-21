<template>
  <div class="flex flex-row items-center gap-8 justify-between">
    <div class="flex flex-row items-start gap-8">
      <RecipeAvatar :recipe="recipe" size="small" />

      <div class="flex flex-col items-start">
        <span class="text-lg font-semibold">{{ recipe.name }}</span>
        <UBadge
          variant="subtle"
          :color="recipe.iconColor"
          size="sm"
          class="mt-1"
        >
          {{ noOfIngredients }}
          {{ noOfIngredients > 1 ? "Ingredients" : "Ingredient" }}
        </UBadge>
      </div>
    </div>

    <UButtonGroup>
      <UButton
        icon="i-tabler-minus"
        size="md"
        color="primary"
        variant="soft"
        @click="$emit('decrease', recipe)"
      />
      <UButton
        size="md"
        color="primary"
        :label="String(count)"
        variant="ghost"
      />
      <UButton
        icon="i-tabler-plus"
        size="md"
        color="primary"
        variant="soft"
        @click="$emit('increase', recipe)"
      />
    </UButtonGroup>
  </div>
</template>

<script setup lang="ts">
import type { Recipe } from "~/types/recipe";

const props = defineProps({
  recipe: {
    type: Object as PropType<Recipe>,
    required: true,
  },
  count: {
    type: Number,
    default: 0,
  },
});

const noOfIngredients = computed(() => {
  return props.recipe.ingredients.length;
});
</script>
