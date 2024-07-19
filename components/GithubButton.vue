<template>
  <UButton
    icon="i-tabler-brand-github-filled"
    square
    variant="ghost"
    color="white"
    :to="repositoryLink"
  />
</template>

<script setup lang="ts">
const repositoryLink = "https://github.com/andreiujica/yum-plan-v2";
</script>
