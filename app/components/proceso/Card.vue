<template>
  <article class="h-75 flex flex-col justify-end gap-4 relative rounded-2xl border border-white/33 overflow-hidden p-4 md:p-6">
    <div class="absolute inset-0 -z-10">
      <NuxtImg :src="p.image" alt="" class="size-full object-cover" format="avif,webp"
        sizes="(min-width:1080px) 304px, 256px" loading="lazy" />
      <div class="absolute inset-0 bg-linear-to-b from-transparent to-black to-75% backdrop-blur-[2px]" />
    </div>

    <span class="absolute -top-4 lg:-top-6 -right-2 lg:-right-3 text-8xl lg:text-9xl font-bold text-amarillo/50">{{ p.number }}</span>

    <div class="flex flex-col gap-3 md:gap-4">
      <HeadingH3 class="text-amarillo font-bold">{{ p.title }}</HeadingH3>
      <p class="text-blanco text-sm lg:text-base font-medium">{{ p.text }}</p>
    </div>
  </article>
</template>

<script setup>
defineProps({
  p: { type: Object, required: true }
})
</script>
