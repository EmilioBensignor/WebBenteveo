<template>
  <article
    class="self-stretch flex flex-col gap-3 md:gap-4 border border-blanco/33 bg-negro-puro rounded-2xl p-4 md:p-5 lg:p-6">
    <Icon name="material-symbols:format-quote-outline-rounded" class="size-8! md:size-10! text-amarillo shrink-0" />
    <p class="flex-1 text-hueso text-sm lg:text-base font-light leading-snug">
      {{ op.text }}
    </p>
    <div class="flex flex-col gap-1.5 shrink-0">
      <span class="w-8 h-0.5 bg-amarillo" />
      <p class="text-amarillo text-sm lg:text-base font-semibold">{{ op.autor }}</p>
      <p class="text-gris text-xs lg:text-sm font-light">{{ op.empresa }}</p>
    </div>
  </article>
</template>

<script setup>
defineProps({
  op: { type: Object, required: true }
})
</script>
