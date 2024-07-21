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
          md: 'pe-48',
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
  // Regex to validate the format "100g * flour + 200ml * milk"
  const regex = /^\d+\w+\s\*\s(?:\w+\s?)+(?:\s\+\s\d+\w+\s\*\s(?:\w+\s?)+)*$/;
  return regex.test(formula.trim());
};
</script>
