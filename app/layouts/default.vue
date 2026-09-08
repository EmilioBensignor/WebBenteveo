<template>
  <div class="min-h-screen flex flex-col bg-negro text-blanco">
    <DefaultCursor />
    <DefaultHeader />
    <main class="flex flex-col grow">
      <slot />
    </main>
    <DefaultFooter />
  </div>
</template>

<script setup>
import { useSmoothScroll } from '~/composables/useSmoothScroll'

useSmoothScroll()
</script>
