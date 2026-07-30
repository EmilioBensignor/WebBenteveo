<template>
  <article
    class="flex flex-col gap-6 lg:gap-4 rounded-2xl bg-[linear-gradient(180deg,#000000_0%,#131313_33%,#131313_66%,#000000_100%)] backdrop-blur-[20px] p-4 lg:p-6">
    <span class="size-12 lg:size-18 self-start bg-amarillo/10 rounded-full p-3">
      <Icon :name="b.icon" class="size-6! lg:size-12! text-amarillo" />
    </span>
    <div class="flex flex-col gap-4">
      <HeadingH3 class="text-amarillo font-bold">{{ b.title }}</HeadingH3>
      <p class="text-blanco text-sm lg:text-base font-medium">{{ b.text }}</p>
    </div>
  </article>
</template>

<script setup>
defineProps({
  b: { type: Object, required: true }
})
</script>
