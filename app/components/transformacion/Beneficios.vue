<template>
  <Section class="px-4">
    <div class="max-w-64 flex flex-col items-center gap-3 text-center">
      <HeadingH2>
        <span class="text-blanco">Deja de apagar incendios</span> <span class="text-amarillo">y empieza a crecer</span>
      </HeadingH2>
      <p class="text-blanco font-medium">
        Cuatro cosas que cambian en tu empresa cuando integras IA a tus procesos:
      </p>
    </div>

    <div class="flex flex-col items-center gap-2 lg:grid lg:grid-cols-2 lg:gap-4">
      <TransformacionCardNumero v-for="b in beneficios" :key="b.number" :icon="b.icon" :number="b.number"
        :title="b.title" :text="b.text" />
    </div>

    <ButtonPrimary>Quiero aplicarlo a mi empresa</ButtonPrimary>
  </Section>
</template>

<script setup>
import { beneficios } from '~/constants/transformacion'
</script>
