<template>
  <div class="flex flex-col items-center gap-3 md:flex-row md:gap-6 [@media(max-height:480px)]:flex-row [@media(max-height:480px)]:gap-4">
    <UiButtonPrimary to="#contacto" variant="glass" size="glass" class="pl-6 pr-4 whitespace-nowrap"
      @click.prevent="irAContacto">
      Hablemos
      <Icon name="material-symbols:arrow-forward-rounded" class="size-4 lg:size-6" />
    </UiButtonPrimary>

    <UiButtonPrimary to="#" variant="glass" size="glass" class="pl-4 pr-6 whitespace-nowrap">
      <Icon name="material-symbols:play-circle-outline-rounded" class="size-4 lg:size-6" />
      Ver trabajos
    </UiButtonPrimary>
  </div>
</template>

<script setup>
import { scrollToEl } from '~/composables/useSmoothScroll'

function irAContacto() {
  scrollToEl('contacto', -100)
}
</script>
