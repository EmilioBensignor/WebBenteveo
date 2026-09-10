<template>
  <article :data-cursor-label="`Conocer más de ${proyecto.title}`" data-cursor-arrow
    class="size-full flex flex-col justify-end relative bg-negro border border-blanco/33 rounded-2xl overflow-hidden p-3 md:p-6 lg:p-8">
    <NuxtImg :src="proyecto.image" :alt="proyecto.title" class="size-full absolute inset-0 object-cover" format="avif"
      sizes="xs:100vw sm:100vw tab:100vw md:520px lg:800px" loading="lazy" />
    <div class="absolute inset-0 bg-linear-to-b from-transparent to-black to-75%" />

    <div class="w-full flex flex-col gap-2 relative">
      <img :src="proyecto.logo" :alt="proyecto.title" class="w-28 h-10 lg:w-39 lg:h-15 object-contain object-left">
      <p class="text-hueso text-xs md:text-sm lg:text-base leading-[1.4] font-light">{{ proyecto.text }}</p>
    </div>
  </article>
</template>

<script setup>
defineProps({
  proyecto: { type: Object, required: true }
})
</script>
