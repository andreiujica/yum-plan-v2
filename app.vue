<template>
  <Header />
  <main
    class="bg-white/75 dark:bg-gray-900/75 h-[calc(100vh-4rem)] mx-auto px-20 sm:px-28 lg:px-36 pt-8 flex flex-row gap-8"
  >
    <NewRecipeCard />
    <RecipeListCard />
  </main>
  <UNotifications />
</template>
