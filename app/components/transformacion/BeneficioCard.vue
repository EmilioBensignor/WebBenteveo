<template>
  <article class="w-full flex flex-col gap-6 lg:gap-8">
    <div
      class="w-full h-46.5 md:h-60 lg:h-72 xxl:h-80 flex flex-col justify-end relative border border-blanco/33 rounded-2xl overflow-hidden p-px">
      <NuxtImg :src="beneficio.image" :alt="beneficio.title" class="size-full absolute inset-0 object-cover"
        format="avif" sizes="xs:100vw sm:100vw tab:50vw md:340px lg:300px xl:360px xxl:400px" loading="lazy" />
      <div class="absolute inset-0 bg-linear-to-b from-black/25 to-black" />

      <span
        class="relative text-amarillo text-[5.5rem] lg:text-[8rem] font-bold -mb-4 md:-mb-6 lg:-mb-10 -ml-2 md:-ml-3 lg:-ml-4">
        {{ beneficio.number }}
      </span>
    </div>

    <div class="w-full flex flex-col gap-2 text-hueso px-3 lg:px-4">
      <h3 class="text-base lg:text-xl">{{ beneficio.title }}</h3>
      <p class="text-sm lg:text-base leading-[1.4] font-light">{{ beneficio.text }}</p>
    </div>
  </article>
</template>

<script setup>
defineProps({
  beneficio: { type: Object, required: true }
})
</script>
