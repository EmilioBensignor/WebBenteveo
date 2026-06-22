<template>
  <Section>
    <div class="flex flex-col items-center gap-3 text-center px-4">
      <HeadingH2 class="text-amarillo">
        No necesitas entender de IA para comenzar
      </HeadingH2>
      <p class="text-blancofont-medium">Es fácil, son solo 3 pasos.</p>
    </div>
    <CarouselStatic :slides-per-view="{ base: 1.3, sm: 1.5, tab: 2.2, md: 2.5, lg: 3, xl: 3, xxl: 3 }" :gap="8">
      <ProcesoCard v-for="p in proceso" :key="p.number" :p="p" />
    </CarouselStatic>
    <ButtonPrimary>Quiero empezar</ButtonPrimary>
  </Section>
</template>

<script setup>
import { proceso } from '~/constants/transformacion'
</script>
