<template>
  <UCard
    :ui="{
      body: {
        padding: 'px-2 py-3 sm:p-4',
      },
    }"
  >
    <div class="flex flex-row items-center justify-between">
      <div class="flex flex-row items-center gap-6">
        <RecipeAvatar :recipe="recipe" size="small" />

        <div class="flex flex-col items-start">
          <span class="text-sm md:text-md lg:text-lg font-semibold">
            {{ recipe.name }}
          </span>
          <UBadge
            variant="subtle"
            :color="recipe.iconColor"
            size="sm"
            class="mt-1"
          >
            {{ isRecipeBuiltIn ? "Built-in" : "Custom" }}
          </UBadge>
        </div>
      </div>

      <div class="flex flex-row items-end gap-12">
        <UPopover :popper="{ placement: 'bottom-end' }">
          <UButton
            color="primary"
            variant="soft"
            trailing-icon="i-tabler-chevron-down"
          >
            {{ noOfIngredients }}
            {{ noOfIngredients > 1 ? "Ingredients" : "Ingredient" }}
          </UButton>
          <template #panel>
            <div class="p-2 flex flex-col text-sm">
              <span
                v-for="ingredient in recipe.ingredients"
                :key="ingredient.ingredientId"
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
            </div>
          </template>
        </UPopover>

        <div class="flex flex-row items-center gap-2">
          <UButton
            icon="i-tabler-shopping-cart-plus"
            size="md"
            color="primary"
            variant="solid"
            :disabled="displayOnly"
            @click="$emit('shoppingCart', recipe)"
          />
          <UButton
            icon="i-tabler-trash"
            size="md"
            color="red"
            variant="soft"
            :disabled="displayOnly"
            @click="$emit('delete', recipe)"
          />
        </div>
      </div>
    </div>
  </UCard>
</template>

<script setup lang="ts">
import type { Recipe } from "~/types/recipe";

const props = defineProps({
  recipe: {
    type: Object as PropType<Recipe>,
    required: true,
  },
  displayOnly: {
    type: Boolean,
    default: false,
  },
});

const noOfIngredients = computed(() => {
  return props.recipe.ingredients.length;
});

const isRecipeBuiltIn = computed(() => {
  // If the id is 1,2 or 3, it's a builtin recipe
  return props.recipe.id <= 3 && props.recipe.id > 0;
});
</script>
