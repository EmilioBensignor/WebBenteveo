<template>
  <DefaultSection id="opiniones" bg="bg-negro"
    class="relative z-10 md:px-8 lg:px-12 xl:px-16 xxl:px-30 py-12 md:py-16 lg:py-20 xxl:py-24 mac:py-16"
    inner="gap-8 lg:gap-12">
    <UiHeadingH2 class="max-w-80 md:max-w-none text-center px-4 md:px-0">
      Confianza construida sobre resultados tangibles
    </UiHeadingH2>

    <div class="w-full max-w-362 flex flex-col gap-6 lg:gap-8">
      <UiCarouselStatic :slides-per-view="{ base: 1.2, sm: 1.5, tab: 2.2, md: 2.3, lg: 2.6, xl: 3, xxl: 3 }"
        :gap="{ base: 8, md: 16, lg: 16, xl: 16, xxl: 16 }"
        :button-position="{ top: '50%', transform: 'translateY(-50%)', left: { base: '1.25rem', md: '0rem', lg: '0rem', xl: '-1.25rem', xxl: '-1.25rem' }, right: { base: '1.25rem', md: '0rem', lg: '0rem', xl: '-1.25rem', xxl: '-1.25rem' } }">
        <SharedOpinionCard v-for="op in opiniones" :key="op.autor + op.empresa" :op="op" />
      </UiCarouselStatic>

      <UiCarouselStatic :slides-per-view="{ base: 1.2, sm: 1.5, tab: 1.8, md: 1.8, lg: 2, xl: 2, xxl: 2 }"
        :gap="{ base: 8, md: 16, lg: 16, xl: 16, xxl: 16 }"
        :button-position="{ top: '50%', transform: 'translateY(-50%)', left: { base: '1.25rem', md: '0rem', lg: '-1.25rem', xl: '-1.25rem', xxl: '-1.25rem' }, right: { base: '1.25rem', md: '0rem', lg: '-1.25rem', xl: '-1.25rem', xxl: '-1.25rem' } }">
        <button v-for="n in 2" :key="n" class="group relative overflow-hidden rounded-2xl aspect-video"
          aria-label="Reproducir video">
          <NuxtImg src="/img/transformacion/video-thumb.png" alt="" class="size-full object-cover" format="avif"
            sizes="288px lg:680px" />
          <span class="flex items-center justify-center absolute inset-0">
            <span
              class="size-12 lg:size-16 flex items-center justify-center bg-amarillo rounded-full transition-transform duration-300 lg:group-hover:scale-110">
              <Icon name="material-symbols:play-arrow-rounded" class="size-9! lg:size-12! text-negro" />
            </span>
          </span>
        </button>
      </UiCarouselStatic>
    </div>
  </DefaultSection>
</template>

<script setup>
import { opiniones } from '~/constants/transformacion'
</script>
