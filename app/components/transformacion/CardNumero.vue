<template>
  <article
    class="w-full overflow-hidden flex flex-col justify-between gap-6 lg:gap-10 sticky bg-negro border border-blanco/20 rounded-3xl shadow-[0_-12px_40px_rgba(0,0,0,0.6)] p-6 lg:p-10"
    :style="`top: calc(var(--card-offset, 6rem) + ${index * 1.75}rem); rotate: ${index % 2 === 0 ? -2 : 2}deg`">
    <span
      class="absolute -top-7 lg:-top-9 -right-2 text-8xl lg:text-9xl font-bold text-blanco/10 leading-none pointer-events-none">{{
        number }}</span>

    <span class="size-14 lg:size-18 flex items-center justify-center rounded-full bg-amarillo/10 text-amarillo">
      <Icon :name="icon" class="size-8! lg:size-10!" />
    </span>

    <div class="flex flex-col gap-3 lg:gap-4">
      <HeadingH3 class="max-w-150 text-amarillo font-bold">
        <span v-html="title" />
      </HeadingH3>
      <p class="max-w-150 text-sm lg:text-base text-blanco font-medium">{{ text }}</p>
    </div>
  </article>
</template>

<script setup>
defineProps({
  icon: String,
  number: String,
  title: String,
  text: String,
  index: { type: Number, default: 0 }
})
</script>
