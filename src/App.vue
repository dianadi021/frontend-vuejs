<script setup lang="ts">
import { RouterLink, RouterView, useRoute } from 'vue-router'
import { Sparkles } from '@lucide/vue'

const route = useRoute()
</script>

<template>
  <div class="min-h-screen flex flex-col">
    <header class="py-4 border-b border-gray-200 dark:border-gray-800 mb-6">
      <div class="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div class="flex items-center gap-3">
          <img alt="Vue logo" class="logo" src="@/assets/icons/logo.svg" width="36" height="36" />
          <div>
            <h1 class="text-lg font-bold tracking-tight">Vue 3 + TypeScript Starter</h1>
            <p class="text-xs text-gray-500">Laravel 12 & Standalone SPA Ready Template</p>
          </div>
        </div>

        <nav class="flex items-center gap-2">
          <RouterLink
            to="/"
            class="px-3.5 py-1.5 rounded-lg text-sm font-medium transition"
            :class="
              route.path === '/'
                ? 'bg-primary text-white shadow-sm'
                : 'text-gray-600 hover:text-primary dark:text-gray-300'
            "
          >
            Home
          </RouterLink>
          <RouterLink
            to="/about"
            class="px-3.5 py-1.5 rounded-lg text-sm font-medium transition inline-flex items-center gap-1.5"
            :class="
              route.path === '/about'
                ? 'bg-primary text-white shadow-sm'
                : 'text-gray-600 hover:text-primary dark:text-gray-300'
            "
          >
            <Sparkles class="w-4 h-4" />
            Showcase (/about)
          </RouterLink>
        </nav>
      </div>
    </header>

    <main class="flex-1 w-full">
      <RouterView />
    </main>
  </div>
</template>
