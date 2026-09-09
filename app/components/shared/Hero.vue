<template>
  <DefaultSection class="sobre-media h-[90vh] flex items-center px-4 md:px-7 lg:px-16" :inner="inner">
    <template #background>
      <video v-if="video" :src="video" :poster="poster" class="size-full object-cover" autoplay loop muted playsinline preload="metadata" />
      <NuxtImg v-else-if="image" :src="image" alt="" format="avif" sizes="xs:100vw sm:100vw md:100vw lg:100vw xxl:100vw" class="size-full object-cover" />
      <div v-if="overlay" class="absolute inset-0 bg-black/65" />
    </template>

    <div class="w-full flex flex-col items-center gap-6 md:gap-8 lg:gap-12 text-center" :class="contentClass">
      <div class="w-full flex flex-col items-center gap-2 md:gap-4 lg:gap-5 xxl:gap-8">
        <p v-if="eyebrow" class="text-blanco lg:text-xl font-medium leading-none">
          {{ eyebrow }}
        </p>
        <UiHeadingH1 class="max-w-72 sm:max-w-80 md:max-w-3xl lg:max-w-7xl text-amarillo" :class="titleClass">
          <span v-html="title" />
        </UiHeadingH1>
        <p v-if="text || $slots.text" class="text-blanco lg:text-xl font-medium">
          <slot name="text">{{ text }}</slot>
        </p>
      </div>

      <div class="w-full md:max-w-115 lg:max-w-120 flex flex-col md:flex-row md:justify-center items-center gap-2 lg:gap-4" :class="actionsClass">
        <slot name="actions" />
      </div>
    </div>
  </DefaultSection>
</template>

<script setup>
defineProps({
  video: { type: String, default: '' },
  poster: { type: String, default: '' },
  image: { type: String, default: '' },
  overlay: { type: Boolean, default: true },
  eyebrow: { type: String, default: '' },
  title: { type: String, required: true },
  text: { type: String, default: '' },
  inner: { type: String, default: '' },
  contentClass: { type: String, default: '' },
  titleClass: { type: String, default: '' },
  actionsClass: { type: String, default: '' }
})
</script>
