<template>
  <Section class="px-4 md:px-7 lg:px-16 xxl:px-30">
    <div class="flex flex-col items-center gap-3 lg:gap-4 md:gap-2 text-center">
      <HeadingH2 class="max-w-64 md:max-w-full">
        <span class="text-blanco">Deja de apagar incendios</span> <span class="text-amarillo">y empieza a crecer</span>
      </HeadingH2>
      <p class="max-w-64 sm:max-w-80 md:max-w-full lg:text-xl text-blanco font-medium">
        Cuatro cosas que cambian en tu empresa cuando integras IA a tus procesos:
      </p>
    </div>

    <div class="flex flex-col items-center gap-2 lg:gap-8 tab:grid tab:grid-cols-2">
      <TransformacionCardNumero v-for="b in beneficios" :key="b.number" :icon="b.icon" :number="b.number"
        :title="b.title" :text="b.text" />
    </div>

    <ButtonPrimary>Quiero aplicarlo a mi empresa</ButtonPrimary>
  </Section>
</template>

<script setup>
import { beneficios } from '~/constants/transformacion'
</script>
