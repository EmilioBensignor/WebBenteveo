<template>
  <Section class="px-4 md:px-7 lg:px-16 xxl:px-30 py-6 md:py-10 lg:py-16">
    <HeadingH2 class="max-w-72 sm:max-w-96 md:max-w-none text-center text-blanco">
      Todo empieza con una idea. <span class="text-amarillo">Todo sucede en el mismo equipo.</span>
    </HeadingH2>

    <PasosTimeline class="mt-2 md:mt-8" :items="pasos" />
  </Section>
</template>

<script setup>
import { pasos } from '~/constants/agencia'
</script>
