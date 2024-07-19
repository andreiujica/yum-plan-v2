<template>
  <div
    class="rounded-full w-8 h-8 md:w-14 md:h-14 lg:w-24 lg:h-24 flex items-center justify-center"
    :class="avatarClass"
  >
    <span class="text-xl md:text-2xl lg:text-3xl font-semibold">
      {{ getRecipeInitials(props.recipe.name) }}
    </span>
  </div>
</template>

<script setup lang="ts">
import type { Recipe, IconColor } from "~/types/recipe";

const props = defineProps<{
  recipe: Recipe;
}>();

const getRecipeInitials = (name: string) => {
  // Split the name into words, get the first letter of each word,
  // and join them together to form the initials. Limited to 2 characters.
  return name
    .split(" ")
    .map((word) => word.charAt(0))
    .join("")
    .slice(0, 2)
    .toUpperCase();
};

const avatarClass = computed(() => {
  const color = props.recipe.iconColor;
  return `text-${color}-500 dark:text-${color}-400 bg-${color}-100`;
});
</script>
