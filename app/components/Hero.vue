<template>
  <Section class="px-4 md:px-7 lg:px-16 pt-30 md:pt-32 pb-8 lg:pt-45 lg:pb-20 xxl:pb-28" :inner="inner">
    <template #background>
      <video v-if="video" :src="video" class="size-full object-cover" autoplay loop muted playsinline />
      <NuxtImg v-else-if="image" :src="image" alt="" class="size-full object-cover" />
      <div class="absolute inset-0 bg-black/75" />
    </template>

    <div class="w-full flex flex-col items-center gap-4 md:gap-6 lg:gap-10 text-center" :class="contentClass">
      <div class="flex flex-col items-center gap-2 lg:gap-3">
        <p v-if="eyebrow" class="text-blanco lg:text-xl font-medium leading-none">
          {{ eyebrow }}
        </p>
        <HeadingH1 class="max-w-72 sm:max-w-80 md:max-w-124 lg:max-w-235 text-amarillo" :class="titleClass">
          {{ title }}
        </HeadingH1>
        <p v-if="text" class="text-blanco lg:text-xl font-medium">
          {{ text }}
        </p>
      </div>

      <div class="w-full md:max-w-115 lg:max-w-120 flex flex-col md:flex-row md:justify-center items-center gap-2 lg:gap-4" :class="actionsClass">
        <slot name="actions" />
      </div>
    </div>
  </Section>
</template>

<script setup>
defineProps({
  video: { type: String, default: '' },
  image: { type: String, default: '' },
  eyebrow: { type: String, default: '' },
  title: { type: String, required: true },
  text: { type: String, default: '' },
  inner: { type: String, default: '' },
  contentClass: { type: String, default: '' },
  titleClass: { type: String, default: '' },
  actionsClass: { type: String, default: '' }
})
</script>
