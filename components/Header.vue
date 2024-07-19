<template>
  <header
    class="bg-white/75 dark:bg-gray-900/75 backdrop-blur border-b -mb-px sticky top-0 z-50 border-gray-200 dark:border-gray-800"
  >
    <div
      class="mx-auto px-20 sm:px-28 lg:px-36 flex items-center justify-between gap-3 h-16"
    >
      <Logo />

      <!-- Buttons section -->
      <div class="flex items-center gap-3">
        <ColorModeButton />
        <GithubButton />
      </div>
    </div>
  </header>
</template>
