<template>
  <article class="flex flex-col gap-4 bg-negro backdrop-blur-[20px] border border-blanco/33 rounded-2xl p-6">
    <div class="flex items-center gap-4">
      <span class="size-12 shrink-0 flex items-center justify-center bg-amarillo/10 rounded-full p-3">
        <Icon :name="b.icon" class="size-6! text-amarillo" />
      </span>
      <h3 class="text-amarillo text-sm lg:text-base font-bold lg:font-semibold">{{ b.title }}</h3>
    </div>
    <p class="text-blanco text-xs lg:text-sm font-medium">{{ b.text }}</p>
  </article>
</template>

<script setup>
defineProps({
  b: { type: Object, required: true }
})
</script>
