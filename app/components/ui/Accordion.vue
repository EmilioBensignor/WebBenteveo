<template>
  <div class="rounded-lg border border-white/33 bg-black backdrop-blur-[20px] py-3 px-4">
    <button class="w-full flex justify-between items-center gap-2 cursor-pointer text-left"
      @click="open = !open" :aria-expanded="open">
      <span class="text-sm text-blanco font-semibold">{{ question }}</span>
      <Icon name="material-symbols:arrow-drop-down-rounded" size="24"
        class="shrink-0 text-amarillo transition-transform duration-300" :class="open ? 'rotate-180' : ''" />
    </button>

    <div class="grid transition-all duration-300 ease-in-out" :class="open ? 'grid-rows-[1fr] pt-2' : 'grid-rows-[0fr]'">
      <div class="overflow-hidden">
        <slot />
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  question: { type: String, required: true }
})

const open = ref(false)
</script>
