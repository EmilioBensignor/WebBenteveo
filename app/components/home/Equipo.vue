<template>
  <DefaultSection bg="bg-negro"
    class="relative z-10 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 xxl:px-30 py-12 md:py-16 lg:py-20 xxl:py-24 mac:py-14">
    <div class="w-full max-w-362 flex flex-col items-center gap-8 md:flex-row md:items-center md:gap-6 lg:gap-12">
      <div class="w-full md:flex-1 md:min-w-0 flex flex-col items-center md:items-start gap-6">
        <UiHeadingH2 class="text-center md:text-left" v-html="equipo.title" />

        <p class="text-center md:text-left text-hueso text-sm lg:text-base leading-[1.4] font-light">
          <span class="text-amarillo font-bold">{{ equipo.destacado }}</span>{{ equipo.text }}
        </p>

        <UiButtonPrimary :to="equipo.to" variant="glass" size="glass" class="pl-6 pr-4" @click.prevent="irAContacto">
          {{ equipo.cta }}
          <Icon name="material-symbols:arrow-forward-rounded" class="size-4 lg:size-6" />
        </UiButtonPrimary>
      </div>

      <div class="w-full md:flex-1 md:min-w-0 lg:flex-none lg:w-xl shrink-0">
        <HomeOrbita />
      </div>
    </div>
  </DefaultSection>
</template>

<script setup>
import { equipo } from '~/constants/home'
import { scrollToEl } from '~/composables/useSmoothScroll'

function irAContacto() {
  scrollToEl('contacto', -100)
}
</script>
