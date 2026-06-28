<template>
  <Section bg="bg-amarillo" class="py-16 md:py-24 lg:py-32 xxl:py-48 md:px-7 lg:px-16 xxl:px-32">
    <template #background>
      <div
        class="w-full h-12 md:h-16 lg:h-24 xxl:h-32 absolute top-0 left-0 bg-linear-to-b from-negro to-transparent" />
      <div
        class="w-full h-12 md:h-16 lg:h-24 xxl:h-32 absolute bottom-0 left-0 bg-linear-to-t from-negro to-transparent" />
    </template>

    <div class="max-w-150 lg:max-w-200 flex flex-col items-center gap-2 lg:gap-4 text-center text-negro-puro px-4">
      <HeadingH2 class="font-bold!">
        Cuando creatividad, tecnología y producción trabajan juntos desde el día uno, los resultados son mejores.
      </HeadingH2>
      <p class="text-lg lg:text-xl font-medium">El mismo equipo, el mismo criterio y la misma visión de tu marca.</p>
    </div>

    <CarouselStatic class="md:hidden" :slides-per-view="{ base: 1.2, sm: 1.8, tab: 2.4 }"
      :gap="{ base: 8, md: 8, lg: 16, xl: 16, xxl: 16 }">
      <BeneficioCard v-for="b in beneficios" :key="b.title" :b="b" />
    </CarouselStatic>

    <div class="lg:max-w-300 hidden md:grid grid-cols-3 gap-2 lg:gap-4">
      <BeneficioCard v-for="b in beneficios" :key="b.title" :b="b" />
    </div>

    <ButtonPrimary to="#servicios" variant="dark">
      Conoce como trabajamos
    </ButtonPrimary>
  </Section>
</template>

<script setup>
import { beneficios } from '~/constants/home'
</script>
