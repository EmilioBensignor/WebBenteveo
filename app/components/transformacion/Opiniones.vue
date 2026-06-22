<template>
  <Section>
    <HeadingH2 class="text-center px-4">
      <span>Confianza construida sobre</span> <span class="text-amarillo">resultados tangibles</span>
    </HeadingH2>
    <CarouselStatic :slides-per-view="{ base: 1.3, sm: 1.5, tab: 2.2, md: 2.5, lg: 3, xl: 3, xxl: 3 }" :gap="8">
      <OpinionCard v-for="op in opiniones" :key="op.autor + op.empresa" :op="op" />
    </CarouselStatic>
    <CarouselStatic :slides-per-view="{ base: 1.3, sm: 1.5, tab: 1.8, md: 2, lg: 2, xl: 2, xxl: 2 }" :gap="8">
      <button class="group relative overflow-hidden rounded-2xl aspect-video" aria-label="Reproducir video">
        <NuxtImg src="/img/transformacion/video-thumb.png" alt="" class="size-full object-cover" format="avif,webp"
          sizes="(min-width: 1080px) 680px, 288px" />
        <span class="flex items-center justify-center absolute inset-0">
          <span class="flex items-center justify-center rounded-full bg-amarillo size-12">
            <Icon name="material-symbols:play-arrow-rounded" size="36" class="text-negro" />
          </span>
        </span>
      </button>
      <button class="group relative overflow-hidden rounded-2xl aspect-video" aria-label="Reproducir video">
        <NuxtImg src="/img/transformacion/video-thumb.png" alt="" class="size-full object-cover" format="avif,webp"
          sizes="(min-width: 1080px) 680px, 288px" />
        <span class="flex items-center justify-center absolute inset-0">
          <span class="flex items-center justify-center rounded-full bg-amarillo size-12">
            <Icon name="material-symbols:play-arrow-rounded" size="36" class="text-negro" />
          </span>
        </span>
      </button>
    </CarouselStatic>
  </Section>
</template>

<script setup>
import { opiniones } from '~/constants/transformacion'
</script>
