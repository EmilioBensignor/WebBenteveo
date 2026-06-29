<template>
  <Section class="px-4 md:px-7 lg:px-16 xxl:px-30">
    <HeadingH2 class="text-center text-blanco">
      Todo lo que necesitás, <span class="text-amarillo">resuelto en un solo lugar</span>
    </HeadingH2>

    <div class="w-full grid tab:grid-cols-2 md:grid-cols-3 gap-2 lg:gap-4">
      <EventosNecesidadCard v-for="n in necesidades" :key="n.title" :b="n" />
    </div>

    <div class="flex flex-col items-center gap-4">
      <p class="lg:text-xl text-blanco font-medium">¿Ya tenés algo en mente?</p>
      <ButtonPrimary to="#contacto">Hablemos de tu evento</ButtonPrimary>
    </div>
  </Section>
</template>

<script setup>
import { necesidades } from '~/constants/eventos'
</script>
