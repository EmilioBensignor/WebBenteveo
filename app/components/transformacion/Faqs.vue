<template>
  <Section class="px-4 md:px-7 lg:px-16 xxl:px-30">
    <HeadingH2 class="max-w-56 sm:max-w-full text-center">
      Las preguntas que <span class="text-amarillo">todos nos hacen</span>
    </HeadingH2>
    <div class="w-full flex flex-col gap-2 md:gap-3 lg:gap-4">
      <UiAccordion v-for="q in faqs" :key="q.question" :question="q.question" :answer="q.answer" />
    </div>
  </Section>
</template>

<script setup>
import { faqs } from '~/constants/transformacion'
</script>
