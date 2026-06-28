<template>
  <Section class="md:px-8 lg:px-16 xxl:px-30">
    <HeadingH2 class="max-w-80 sm:max-w-full text-center px-4 md:px-0">
      <span>Confianza construida sobre</span> <span class="text-amarillo">resultados tangibles</span>
    </HeadingH2>
    <CarouselStatic :slides-per-view="{ base: 1.3, sm: 1.8, tab: 2.4, md: 3, lg: 3, xl: 3, xxl: 4 }"
      :gap="{ base: 8, md: 16, lg: 16, xl: 16, xxl: 16 }"
      :button-position="{ top: '50%', transform: 'translateY(-50%)', left: { base: '0.5rem', md: '1rem', lg: '2.75rem', xl: '2.75rem', xxl: '6.25rem' }, right: { base: '0.5rem', md: '1rem', lg: '2.75rem', xl: '2.75rem', xxl: '6.25rem' } }">
      <OpinionCard v-for="op in opiniones" :key="op.autor + op.empresa" :op="op" />
    </CarouselStatic>
    <CarouselStatic :slides-per-view="{ base: 1.3, sm: 1.8, tab: 2, md: 2, lg: 2, xl: 2, xxl: 2 }"
      :gap="{ base: 8, md: 16, lg: 16, xl: 16, xxl: 16 }">
      <button v-for="n in 2" :key="n" class="group relative overflow-hidden rounded-2xl aspect-video"
        aria-label="Reproducir video">
        <NuxtImg src="/img/transformacion/video-thumb.png" alt="" class="size-full object-cover" format="avif,webp"
          sizes="(min-width: 1080px) 680px, 288px" />
        <span class="flex items-center justify-center absolute inset-0">
          <span class="flex items-center justify-center rounded-full bg-amarillo size-12 lg:size-16">
            <Icon name="material-symbols:play-arrow-rounded" class="size-9! lg:size-12! text-negro" />
          </span>
        </span>
      </button>
    </CarouselStatic>
  </Section>
</template>

<script setup>
import { opiniones } from '~/constants/transformacion'
</script>
