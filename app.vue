<template>
  <Header />
  <main
    class="bg-white/75 dark:bg-gray-900/75 h-[calc(100vh-4rem)] mx-auto px-20 sm:px-28 lg:px-36 py-8 flex flex-row gap-8"
  >
    <div class="flex flex-col w-3/5 h-full gap-8">
      <NewRecipeCard />
      <RecipeListCard />
    </div>
    <div class="flex flex-col w-2/5 h-full">
      <ShoppingListCard />
    </div>
  </main>
  <UNotifications />
</template>
