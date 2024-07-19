<template>
  <div class="flex flex-row items-center justify-between">
    <RecipeAvatar :recipe="recipe" class="mr-16" />

    <div
      v-for="color in colors"
      :key="color"
      class="w-6 h-6 md:w-10 md:h-10 lg:w-12 lg:h-12 rounded-full mr-4 cursor-pointer flex items-center justify-center aspect-square"
      :class="`bg-${color}-500 dark:bg-${color}-400`"
      @click="$emit('colorSelected', color)"
    >
      <UIcon
        v-if="props.recipe.iconColor === color"
        name="i-tabler-circle-check"
        class="w-4 h-4 md:w-8 md:h-8 lg:w-10 lg:h-10"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Recipe } from "~/types/recipe";

const props = defineProps({
  recipe: {
    type: Object as PropType<Recipe>,
    required: true,
  },
});

const colors = ["red", "orange", "yellow", "green", "blue", "violet"];
</script>
