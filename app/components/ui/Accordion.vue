<template>
  <div class="rounded-lg border border-white/33 bg-black backdrop-blur-[20px] py-3 px-4">
    <button class="w-full flex justify-between items-center gap-2 cursor-pointer text-left" @click="open = !open"
      :aria-expanded="open">
      <span class="text-sm lg:text-base font-semibold transition-colors duration-300"
        :class="open ? 'text-amarillo' : 'text-blanco'">{{ question }}</span>
      <Icon name="material-symbols:arrow-drop-down-rounded" size="24"
        class="shrink-0 text-amarillo transition-transform duration-300" :class="open ? 'rotate-180' : ''" />
    </button>

    <div class="grid transition-all duration-300 ease-in-out"
      :class="open ? 'grid-rows-[1fr] pt-2' : 'grid-rows-[0fr]'">
      <div class="overflow-hidden">
        <p class="text-xs lg:text-sm text-blanco font-medium">{{ answer }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  question: { type: String, required: true },
  answer: { type: String, required: true }
})

const open = ref(false)
</script>
