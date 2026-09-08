<template>
  <SharedHero :image="image" :title="title" :text="subtitulo" :overlay="false">
    <template #actions>
      <UiButtonPrimary class="w-72 lg:w-auto">
        <Icon name="material-symbols:calendar-month-outline-rounded" size="24" />
        Hablemos
      </UiButtonPrimary>
      <UiButtonPrimary variant="light" class="w-72 lg:w-auto">
        Ver casos de éxito
        <Icon name="material-symbols:arrow-forward-rounded" size="24" />
      </UiButtonPrimary>
    </template>
  </SharedHero>
</template>

<script setup>
defineProps({
  title: { type: String, required: true },
  subtitulo: { type: String, default: '' },
  image: { type: String, default: '/img/transformacion/hero-bg.png' },
})
</script>
