<template>
  <UCard
    :ui="{
      base: 'w-1/2',
    }"
  >
    <template #header>
      <div class="flex flex-col space-y-2">
        <span class="text-lg font-semibold">Build Your Own Recipe</span>
        <UProgress
          :value="wizardStep"
          :max="[
            'Step 1 - Name your recipe',
            'Step 2 - Add a nice icon',
            'Step 3 - Plug in your ingredients',
            'Step 4 - Check your recipe details',
          ]"
        />
      </div>
    </template>

    <div class="flex flex-col space-y-4" v-if="wizardStep === 0">
      <span class="font-light text-sm text-gray-800 dark:text-gray-200">
        Pick a unique and memorable name for your recipe. If you're feeling
        adventurous, you can click the "Randomize" button for a fun, randomly
        generated name.
      </span>

      <UButtonGroup
        orientation="horizontal"
        :ui="{
          wrapper: {
            horizontal: 'w-full flex items-center grow',
          },
        }"
      >
        <UInput
          v-model="recipe.name"
          icon="i-tabler-brand-cakephp"
          size="md"
          placeholder="Enter a name like 'Unicorn Brownie'"
          class="w-full"
        />

        <UButton
          icon="i-tabler-arrows-shuffle"
          size="sm"
          color="primary"
          variant="ghost"
          label="Randomize"
          @click="randomizeRecipeName"
        />
      </UButtonGroup>
    </div>

    <div class="flex flex-col space-y-4" v-else-if="wizardStep === 1">
      <span class="font-light text-sm text-gray-800 dark:text-gray-200">
        Choose a color that best represents your recipe. This color will be used
        to style your recipe card.
      </span>

      <div class="flex flex-row items-center justify-between">
        <RecipeAvatar :recipe="recipe" class="mr-16" />

        <div
          v-for="color in [
            'red',
            'orange',
            'yellow',
            'green',
            'blue',
            'violet',
          ]"
          :key="color"
          class="w-6 h-6 md:w-10 md:h-10 lg:w-12 lg:h-12 rounded-full mr-4 cursor-pointer flex items-center justify-center aspect-square"
          :class="`bg-${color}-500 dark:bg-${color}-400`"
          @click="setIconColor(color)"
        >
          <UIcon
            v-if="recipe.iconColor === color"
            name="i-tabler-circle-check"
            class="w-4 h-4 md:w-8 md:h-8 lg:w-10 lg:h-10"
          />
        </div>
      </div>
    </div>

    <template #footer>
      <div class="flex justify-end gap-4">
        <UButton
          v-if="wizardStep > 0"
          icon="i-tabler-arrow-left"
          size="md"
          color="primary"
          variant="soft"
          label="Back"
          :trailing="false"
          @click="wizardStep--"
        />

        <UButton
          v-if="wizardStep < 3"
          icon="i-tabler-arrow-right"
          size="md"
          color="primary"
          variant="solid"
          label="Next"
          :trailing="true"
          @click="wizardStep++"
        />

        <UButton
          v-else
          icon="i-tabler-plus"
          size="md"
          color="primary"
          variant="solid"
          label="Create Recipe"
          :trailing="true"
          @click="wizardStep = 0"
        />
      </div>
    </template>
  </UCard>
</template>

<script setup lang="ts">
import type { Recipe, IconColor } from "~/types/recipe";
const wizardStep = ref(0);

/* In order to match the Recipe type, a dummy id is added
 * to the recipe object. This id will be replaced with the
 * actual id inside the store when the recipe is saved.
 */
const recipe = ref<Recipe>({
  id: 1,
  name: "",
  iconColor: "red" as IconColor,
  ingredients: [],
});

const getRandomCakeName = () => {
  const adjectives = ["Unicorn", "Rainbow", "Chocolate", "Vanilla", "Fluffy"];
  const nouns = ["Cake", "Cookie", "Eclair", "Croissant", "Strudel"];

  const randomAdjective =
    adjectives[Math.floor(Math.random() * adjectives.length)];
  const randomNoun = nouns[Math.floor(Math.random() * nouns.length)];

  return `${randomAdjective} ${randomNoun}`;
};

const randomizeRecipeName = () => {
  recipe.value.name = getRandomCakeName();
};

const setIconColor = (color: string) => {
  recipe.value.iconColor = color as IconColor;
};
</script>
