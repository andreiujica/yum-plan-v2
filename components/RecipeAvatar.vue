<template>
  <div
    :class="[
      'rounded-full flex items-center justify-center',
      sizeClass,
      avatarClass,
    ]"
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
  size?: "large" | "small";
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

const sizeClass = computed(() => {
  // If the size is small, use the small avatar size, else use the large avatar size.
  return props.size === "small"
    ? "w-6 h-6 md:w-8 md:h-8 lg:w-16 lg:h-16"
    : "w-8 h-8 md:w-14 md:h-14 lg:w-24 lg:h-24";
});

const textClass = computed(() => {
  return props.size === "small"
    ? "text-xs md:text-md lg:text-md"
    : "text-xl md:text-2xl lg:text-3xl";
});
</script>
