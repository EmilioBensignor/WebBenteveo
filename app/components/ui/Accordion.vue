<template>
  <div
    class="rounded-2xl border bg-negro backdrop-blur-[20px] py-4 px-5 lg:py-5 lg:px-6 transition-colors duration-300"
    :class="open ? 'border-amarillo/50' : 'border-white/20 lg:hover:border-white/40'">
    <button class="w-full flex justify-between items-center gap-4 cursor-pointer text-left" @click="open = !open"
      :aria-expanded="open">
      <span class="text-sm lg:text-base font-semibold leading-snug transition-colors duration-300"
        :class="open ? 'text-amarillo' : 'text-hueso'">{{ question }}</span>
      <span
        class="shrink-0 flex items-center justify-center size-9 rounded-full border transition-all duration-300"
        :class="open ? 'border-amarillo bg-amarillo/10 rotate-180' : 'border-white/30'">
        <Icon name="material-symbols:keyboard-arrow-down-rounded" size="24" class="text-amarillo" />
      </span>
    </button>

    <div class="grid transition-all duration-300 ease-in-out"
      :class="open ? 'grid-rows-[1fr] pt-3' : 'grid-rows-[0fr]'">
      <div class="overflow-hidden">
        <p class="text-xs lg:text-sm text-hueso font-light leading-relaxed">{{ answer }}</p>
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
