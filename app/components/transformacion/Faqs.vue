<template>
  <Section class="px-4">
    <HeadingH2 class="max-w-56 text-center">
      Las preguntas que <span class="text-amarillo">todos nos hacen</span>
    </HeadingH2>
    <div class="w-full flex flex-col gap-2">
      <UiAccordion v-for="q in faqs" :key="q" :question="q">
        <p class="text-xs text-blanco font-medium">Respuesta pendiente de contenido.</p>
      </UiAccordion>
    </div>
  </Section>
</template>

<script setup>
import { faqs } from '~/constants/transformacion'
</script>
