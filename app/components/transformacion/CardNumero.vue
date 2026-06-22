<template>
  <div
    class="flex flex-col gap-6 relative rounded-2xl border border-white/33 bg-negro backdrop-blur-[20px] overflow-hidden p-4 pt-11">
    <span class="absolute -top-4 -right-2 text-8xl font-bold leading-none text-blanco/10">
      {{ number }}
    </span>

    <span class="w-14 h-14 flex items-center justify-center rounded-full bg-amarillo/10 text-amarillo">
      <Icon :name="icon" size="32" />
    </span>

    <div class="flex flex-col gap-3">
      <HeadingH3 class="text-amarillo font-bold" v-html="title" />
      <p class="text-blanco text-sm font-medium">{{ text }}</p>
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
