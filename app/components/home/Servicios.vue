<template>
  <Section id="servicios"
    class="bg-linear-to-b from-negro from-33% to-black py-6 md:py-8 lg:py-12 xxl:py-16 md:px-7 lg:px-16 xxl:px-30">
    <HeadingH2 class="text-center text-amarillo mx-4 md:mx-0">Todo lo que tu marca necesita. Bajo un mismo techo.
    </HeadingH2>

    <CarouselStatic class="md:hidden" :slides-per-view="{ base: 1.2, sm: 1.8, tab: 2.4 }"
      :gap="{ base: 8, md: 8, lg: 16, xl: 16, xxl: 16 }">
      <ServicioCard v-for="s in servicios" :key="s.number" :s="s" />
    </CarouselStatic>

    <div class="hidden md:grid grid-cols-3 gap-2 lg:gap-4 px-4 md:px-0">
      <ServicioCard v-for="s in servicios" :key="s.number" :s="s" />
    </div>
  </Section>
</template>

<script setup>
import { servicios } from '~/constants/home'
</script>
