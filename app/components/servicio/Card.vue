<template>
  <article
    class="h-87 md:h-92 lg:h-114 flex flex-col justify-end gap-4 relative border border-white/33 rounded-2xl overflow-hidden p-4 pt-25">
    <div class="absolute inset-0 -z-10">
      <NuxtImg :src="s.image" alt="" class="size-full object-cover" format="avif,webp"
        sizes="(min-width:1080px) 384px, 320px" loading="lazy" />
      <div class="absolute inset-0 bg-linear-to-b from-transparent to-black to-50%" />
    </div>

    <span class="absolute -top-4 -right-2 text-8xl lg:text-9xl font-bold text-amarillo/50">{{ s.number }}</span>

    <div class="flex flex-col gap-2 lg:gap-4">
      <HeadingH3 class="text-sm text-amarillo font-bold">{{ s.title }}</HeadingH3>
      <p class="text-blanco text-xs lg:text-base font-medium">{{ s.text }}</p>
    </div>

    <div class="flex flex-wrap gap-2">
      <span v-for="tag in s.tags" :key="tag"
        class="bg-amarillo/10 border border-amarillo rounded-full text-blanco text-xs font-semibold px-4 py-2">{{ tag
        }}</span>
    </div>

    <NuxtLink :to="s.to" class="flex items-center gap-2 text-amarillo text-xs lg:text-sm font-bold">
      {{ s.cta }}
      <Icon name="material-symbols:arrow-forward-rounded" size="1.25rem" />
    </NuxtLink>
  </article>
</template>

<script setup>
defineProps({
  s: { type: Object, required: true }
})
</script>
