<template>
  <UButtonGroup
    orientation="horizontal"
    :ui="{
      wrapper: {
        horizontal: 'w-full flex items-center grow',
      },
    }"
  >
    <UInput
      v-model="recipeName"
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
</template>

<script setup lang="ts">
import { ref, watch } from "vue";

const props = defineProps({
  initialName: String,
});

const emit = defineEmits(["update:recipeName"]);

const recipeName = ref(props.initialName);

watch(recipeName, (newName) => {
  emit("update:recipeName", newName);
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
  recipeName.value = getRandomCakeName();
};
</script>
