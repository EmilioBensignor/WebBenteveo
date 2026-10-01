<template>
  <KitHero @calificar="quiz = true" />
  <KitFunciona />
  <KitCalculadora @calificar="quiz = true" />
  <KitCta />
  <KitQuiz v-model="quiz" />
</template>

<script setup>
const quiz = ref(false)

useSeoMeta({
  title: 'KIT 4.0',
  description: 'KIT 4.0 puede cubrir hasta el 50% del valor neto del desarrollo tecnológico de tu PyME. Calcula cuánto podría cubrir y descubre si tu empresa califica.'
})
</script>
