<template>
  <Section class="px-4 md:px-7 lg:px-16 xxl:px-30">
    <div class="flex flex-col items-center gap-3 md:gap-2 text-center">
      <HeadingH2 class="text-amarillo">
        No necesitas entender de IA para comenzar
      </HeadingH2>
      <p class="text-blanco font-medium">Es fácil, son solo 3 pasos.</p>
    </div>

    <PasosTimeline class="mt-2 md:mt-8" :items="proceso" />

    <ButtonPrimary>Quiero empezar</ButtonPrimary>
  </Section>
</template>

<script setup>
import { proceso } from '~/constants/transformacion'
</script>
