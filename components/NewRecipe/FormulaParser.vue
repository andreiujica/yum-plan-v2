<template>
  <UInput
    icon="i-tabler-math-function"
    size="md"
    placeholder="Your formula should look like '100g * flour + 200ml * milk'"
    @input="handleInput"
    @keydown="handleKeydown"
    :value="inputValue"
    :ui="{
      trailing: {
        padding: {
          md: 'pe-48', // 48px padding end for the trailing slot (autocomplete)
        },
      },
    }"
  >
    <template #trailing>
      <UBadge v-if="suggestion" variant="soft" color="primary" size="md">
        <div class="flex items-center gap-1">
          <span>Press</span>
          <UKbd>Tab</UKbd>
          <span>"{{ suggestion }}"</span>
        </div>
      </UBadge>
    </template>
  </UInput>
</template>

<script setup lang="ts">
const inputValue = ref("");
const suggestion = ref("");

const emit = defineEmits(["update:modelValue", "error", "valid"]);

const ingredients = useIngredientStore().getAutocompleteIngredients;

const handleInput = (event: InputEvent) => {
  /* This method is called whenever the user types in the input field.

   * It finds the last word in the input field and checks if it matches
   * any of the ingredients. If it does, it sets the suggestion ref to
   * the matched ingredient.
   */
  emit("update:modelValue", (event.target as HTMLInputElement).value);

  const input = event.target as HTMLInputElement;
  inputValue.value = input.value;

  const lastWord = inputValue.value.split(" ").pop()?.toLowerCase() || "";
  const match = ingredients.find((ingredient) =>
    ingredient.startsWith(lastWord)
  );

  if (match && lastWord) {
    suggestion.value = match;
  } else {
    suggestion.value = "";
  }

  const isValid = validateFormula(inputValue.value);
  if (isValid) {
    emit("update:modelValue", inputValue.value);
    emit("valid", inputValue.value);
  } else {
    emit("error", "Invalid formula");
  }
};

const handleKeydown = (event: KeyboardEvent) => {
  /* This method is called whenever the user presses a key in the input field.

   * If the user presses the Tab key and there is a suggestion, the suggestion
   * is added to the input field.
   */
  if (event.key === "Tab" && suggestion.value) {
    event.preventDefault();
    const words = inputValue.value.split(" ");
    words.pop();
    inputValue.value = words.join(" ") + " " + suggestion.value;
    emit("update:modelValue", inputValue.value);
    suggestion.value = "";
  }
};

const validateFormula = (formula: string): boolean => {
  /* This really complex regex pattern matches the following:
   * '100g * flour'
   * (\d+) - captures the quantity (100)
   * (\w+) - captures the unit (g)
   * \s\*\s - matches the '*' character with spaces around it
   * (.+) - captures the ingredient name (flour or dragon scales)
   * (?:) - non-capturing group which means a bunch of these can be chained
   */
  const regex = /^\d+\w+\s\*\s(?:\w+\s?)+(?:\s\+\s\d+\w+\s\*\s(?:\w+\s?)+)*$/;
  return regex.test(formula.trim());
};
</script>
