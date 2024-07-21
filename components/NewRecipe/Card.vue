<template>
  <UCard
    :ui="{
      base: 'w-full h-1/2 overflow-auto flex flex-col',
      body: {
        base: 'grow',
      },
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

      <NewRecipeNameInput
        :initialName="recipe.name"
        @update:recipeName="updateRecipeName"
      />

      <UAlert
        v-if="!isStepValid"
        icon="i-tabler-alert-triangle-filled"
        color="orange"
        variant="outline"
        title="Heads up!"
        description="No name, no fame! Give your recipe a name to proceed. Need help? Hit 'Randomize' for a zany suggestion!"
      />
    </div>

    <div class="flex flex-col space-y-4" v-else-if="wizardStep === 1">
      <span class="font-light text-sm text-gray-800 dark:text-gray-200">
        Choose a color that best represents your recipe. This color will be used
        to style your recipe card.
      </span>

      <NewRecipeAvatarPicker :recipe="recipe" @colorSelected="setIconColor" />
    </div>

    <div class="flex flex-col space-y-4" v-else-if="wizardStep === 2">
      <span class="font-light text-sm text-gray-800 dark:text-gray-200">
        Create your recipe by adding ingredients using a smart and intuitive
        formula. Our system recognizes and understands your inputs, ensuring
        your recipe is accurate and easy to follow.
      </span>

      <NewRecipeFormulaParser
        v-model="formula"
        @error="formulaError = true"
        @valid="formulaError = false"
      />
      <UAlert
        v-if="!isStepValid"
        icon="i-tabler-alert-triangle-filled"
        color="orange"
        variant="outline"
        title="Whoopsie-daisy!"
        description="Your formula needs some tweaking. Make sure it looks like this: '100g * flour + 200ml * milk'."
      />
    </div>

    <div class="flex flex-col space-y-4" v-else>
      <span class="font-light text-sm text-gray-800 dark:text-gray-200">
        Great Job! Your recipe is ready to be saved. If everything looks good,
        hit the "Create Recipe" button to save your recipe to the database.
      </span>

      <RecipeRow :recipe="recipe" :displayOnly="true" />
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
          v-if="wizardStep < 2"
          :disabled="!isStepValid"
          icon="i-tabler-arrow-right"
          size="md"
          color="primary"
          variant="solid"
          label="Next"
          :trailing="true"
          @click="wizardStep++"
        />

        <UButton
          v-else-if="wizardStep === 2"
          :disabled="!isStepValid"
          icon="i-tabler-arrow-right"
          size="md"
          color="primary"
          variant="solid"
          label="Next"
          :trailing="true"
          @click="handleFormulaParsing"
        />

        <UButton
          v-else
          icon="i-tabler-plus"
          size="md"
          color="primary"
          variant="solid"
          label="Create Recipe"
          :trailing="true"
          @click="handleAddRecipe"
        />
      </div>
    </template>
  </UCard>
</template>

<script setup lang="ts">
import type { Recipe, RecipeIngredient, IconColor } from "~/types/recipe";
const wizardStep = ref(0);
const toast = useToast();

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

const formula = ref("");
const formulaError = ref(false);

const updateRecipeName = (newName: string) => {
  recipe.value.name = newName;
};

const setIconColor = (color: string) => {
  recipe.value.iconColor = color as IconColor;
};

const parseFormula = (formula: string): RecipeIngredient[] => {
  const ingredients: RecipeIngredient[] = [];
  const parts = formula.split("+").map((part) => part.trim());

  parts.forEach((part) => {
    const match = part.match(/^(\d+)(\w+)\s\*\s(.+)$/);
    if (match) {
      const [, quantity, usedUnit, ingredientName] = match;

      const ingredientId =
        useIngredientStore().getIngredientIdByName(ingredientName);

      if (!ingredientId) {
        console.error("Ingredient not found", ingredientName, ingredientId);
        formulaError.value = true;
        return;
      }

      ingredients.push({
        ingredientId,
        quantity: parseInt(quantity),
        usedUnit,
      });
    }
  });

  return ingredients;
};

const handleFormulaParsing = () => {
  if (!formulaError.value) {
    recipe.value.ingredients = parseFormula(formula.value);
    wizardStep.value++;
  }
};

const isStepValid = computed(() => {
  if (wizardStep.value === 0) {
    return recipe.value.name.trim() !== "";
  } else if (wizardStep.value === 2) {
    return !formulaError.value;
  }
  return true;
});

const handleAddRecipe = () => {
  useRecipeStore().addRecipe(recipe.value);
  toast.add({ title: "Recipe added successfully!" });
  wizardStep.value = 0;
  recipe.value = {
    id: 1,
    name: "",
    iconColor: "red" as IconColor,
    ingredients: [],
  };
};
</script>
