<template>
  <article class="flex flex-col gap-4 md:gap-6 border border-white/33 bg-black rounded-2xl backdrop-blur-[20px] p-4">
    <Icon name="material-symbols:format-quote-outline-rounded" class="size-8! md:size-12! text-amarillo" />
    <p class="text-blanco text-sm lg:text-base font-medium">{{ op.text }}</p>
    <div class="flex flex-col gap-2">
      <span class="w-8 h-0.5 bg-amarillo text-xs lg:text-sm" />
      <p class="text-amarillo font-semibold">{{ op.autor }}</p>
      <p class="text-gris font-medium">{{ op.empresa }}</p>
    </div>
  </article>
</template>

<script setup>
defineProps({
  op: { type: Object, required: true }
})
</script>
