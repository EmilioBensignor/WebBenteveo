<template>
  <article class="h-88 md:h-100 lg:h-125 flex flex-col justify-between gap-4 relative rounded-2xl overflow-hidden p-6">
    <div class="absolute inset-0 -z-10">
      <NuxtImg :src="p.image" alt="" class="size-full object-cover" format="avif,webp"
        sizes="(min-width:1080px) 464px, 320px" loading="lazy" />
      <div class="absolute inset-0 bg-linear-to-b from-transparent to-black to-75%" />
    </div>

    <span class="self-start bg-amarillo rounded-full text-negro text-xs lg:text-sm font-bold py-3 px-6">{{ p.tag
      }}</span>

    <div class="flex flex-col gap-4">
      <img :src="p.logo" :alt="p.title" class="w-35 h-10 object-contain object-left">
      <HeadingH3 class="text-amarillo font-bold">{{ p.title }}</HeadingH3>
      <p class="text-sm lg:text-base text-blanco font-medium">{{ p.text }}</p>
    </div>
  </article>
</template>

<script setup>
defineProps({
  p: { type: Object, required: true }
})
</script>
