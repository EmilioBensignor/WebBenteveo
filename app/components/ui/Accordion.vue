<template>
  <div
    class="rounded-2xl border bg-white/5 backdrop-blur-[20px] py-4 px-5 lg:py-5 lg:px-6 transition-colors duration-300"
    :class="open ? 'border-amarillo' : 'border-white/15 lg:hover:border-white/30'">
    <button class="group w-full flex justify-between items-center gap-4 cursor-pointer text-left" @click="open = !open"
      :aria-expanded="open">
      <span class="text-sm lg:text-base font-semibold leading-snug transition-colors duration-300"
        :class="open ? 'text-amarillo' : 'text-hueso'">{{ question }}</span>
      <span class="size-8 lg:size-10 shrink-0 flex justify-center items-center glass-boton rounded-full text-hueso"
        :class="{ activo: open }">
        <Icon name="material-symbols:add-rounded" size="1.25rem" class="transition-transform duration-300"
          :class="{ 'rotate-45': open }" />
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
