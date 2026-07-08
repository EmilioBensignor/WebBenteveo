<template>
  <Hero :image="image" :title="title" :text="subtitulo">
    <template #actions>
      <ButtonPrimary class="w-72 lg:w-auto">
        <Icon name="material-symbols:calendar-month-outline-rounded" size="24" />
        Hablemos
      </ButtonPrimary>
      <ButtonPrimary variant="light" class="w-72 lg:w-auto">
        Ver casos de éxito
        <Icon name="material-symbols:arrow-forward-rounded" size="24" />
      </ButtonPrimary>
    </template>
  </Hero>
</template>

<script setup>
defineProps({
  title: { type: String, required: true },
  subtitulo: { type: String, default: '' },
  image: { type: String, default: '/img/transformacion/hero-bg.png' },
})
</script>
