<template>
  <div
    class="w-full tab:min-h-72 md:min-h-78 lg:min-h-64 flex flex-col gap-6 relative rounded-2xl border border-white/33 bg-negro backdrop-blur-[20px] overflow-hidden p-4 md:p-6 pt-11 md:pt-14 lg:pt-17">
    <span
      class="absolute -top-4 lg:-top-6 -right-2 lg:-right-3 text-8xl lg:text-9xl font-bold text-blanco/10">
      {{ number }}
    </span>

    <span class="size-14 lg:size-18 flex items-center justify-center rounded-full bg-amarillo/10 text-amarillo">
      <Icon :name="icon" class="size-8! lg:size-12!" />
    </span>

    <div class="flex flex-col gap-3 md:gap-4 lg:gap-6">
      <HeadingH3 class="text-amarillo font-bold">
        <span v-html="title" />
      </HeadingH3>
      <p class="text-sm lg:text-base text-blanco font-medium">{{ text }}</p>
    </div>
  </div>
</template>

<script setup>
defineProps({
  icon: String,
  number: String,
  title: String,
  text: String
})
</script>
