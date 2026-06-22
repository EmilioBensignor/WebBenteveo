<template>
  <article class="flex flex-col gap-4 border border-white/33 bg-black rounded-2xl backdrop-blur-[20px] p-4">
    <Icon name="material-symbols:format-quote-outline-rounded" size="32" class="text-amarillo" />
    <p class="text-blanco text-sm font-medium">{{ op.text }}</p>
    <div class="flex flex-col gap-2">
      <span class="w-8 h-0.5 bg-amarillo" />
      <p class="text-amarillo text-xs font-semibold">{{ op.autor }}</p>
      <p class="text-gris text-xs font-medium">{{ op.empresa }}</p>
    </div>
  </article>
</template>

<script setup>
defineProps({
  op: { type: Object, required: true }
})
</script>
