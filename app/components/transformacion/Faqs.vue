<template>
  <DefaultSection bg="bg-negro"
    class="relative z-10 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 xxl:px-30 py-12 md:py-16 lg:py-20 xxl:py-24 mac:py-16"
    inner="gap-8 lg:gap-12">
    <UiHeadingH2 class="max-w-72 md:max-w-none text-center">
      Las preguntas que todos tienen
    </UiHeadingH2>

    <div class="w-full grid grid-cols-1 md:grid-cols-2 gap-3 lg:gap-4 items-start">
      <div v-for="(columna, i) in columnas" :key="i" class="flex flex-col gap-3 lg:gap-4">
        <UiAccordion v-for="q in columna" :key="q.question" :question="q.question" :answer="q.answer" />
      </div>
    </div>
  </DefaultSection>
</template>

<script setup>
import { faqs } from '~/constants/transformacion'

const columnas = computed(() => {
  const mitad = Math.ceil(faqs.length / 2)
  return [faqs.slice(0, mitad), faqs.slice(mitad)]
})
</script>
