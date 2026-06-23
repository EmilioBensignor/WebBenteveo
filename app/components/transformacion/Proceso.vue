<template>
  <Section class="md:px-7 lg:px-16">
    <div class="flex flex-col items-center gap-3 md:gap-2 text-center px-4">
      <HeadingH2 class="text-amarillo">
        No necesitas entender de IA para comenzar
      </HeadingH2>
      <p class="text-blancofont-medium">Es fácil, son solo 3 pasos.</p>
    </div>
    <CarouselStatic :slides-per-view="{ base: 1.3, sm: 1.8, tab: 2.4, md: 3, lg: 3, xl: 3, xxl: 3 }"
      :gap="{ base: 8, md: 16, lg: 16, xl: 16, xxl: 16 }">
      <ProcesoCard v-for="p in proceso" :key="p.number" :p="p" />
    </CarouselStatic>
    <ButtonPrimary>Quiero empezar</ButtonPrimary>
  </Section>
</template>

<script setup>
import { proceso } from '~/constants/transformacion'
</script>
