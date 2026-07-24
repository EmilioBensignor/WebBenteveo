<template>
  <Section bg="bg-amarillo" class="px-4 md:px-7 lg:px-16 xxl:px-30 py-14 md:py-16 lg:py-24">
    <template #background>
      <div class="w-full h-16 md:h-20 absolute top-0 left-0 bg-linear-to-b from-negro to-transparent" />
      <div class="w-full h-16 md:h-20 absolute bottom-0 left-0 bg-linear-to-t from-negro to-transparent" />
    </template>

    <div class="flex flex-col items-center gap-3 md:gap-4 text-center">
      <HeadingH2 class="text-negro-puro font-bold">Mira cómo funciona en la práctica</HeadingH2>
      <p class="max-w-72 sm:max-w-96 tab:max-w-120 md:max-w-146 lg:max-w-236 lg:text-xl text-negro font-medium"
        v-html="pasos.subtitulo" />
    </div>

    <div class="flex items-center gap-6 md:gap-12 lg:gap-16">
      <button v-for="(paso, i) in pasos.items" :key="paso.texto" type="button" :aria-label="paso.texto"
        class="cursor-pointer transition-transform duration-300 hover:scale-110" @click="active = i">
        <span class="text-7xl md:text-8xl lg:text-9xl font-bold leading-none tabular-nums transition-all duration-300"
          :class="active === i ? 'text-negro-puro' : 'hollow'">
          {{ i + 1 }}
        </span>
      </button>
    </div>

    <Transition name="paso" mode="out-in">
      <div :key="active" class="w-full max-w-260 flex flex-col items-center gap-4 lg:gap-6">
        <p class="text-center text-negro-puro text-lg lg:text-2xl font-bold">{{ pasos.items[active].texto }}</p>
        <NuxtImg :src="pasos.items[active].imagen" :alt="pasos.items[active].texto"
          class="w-full border-3 border-negro-puro rounded-2xl shadow-[0_18px_50px_rgba(0,0,0,0.35)]" />
      </div>
    </Transition>
  </Section>
</template>

<script setup>
defineProps({
  pasos: { type: Object, required: true }
})

const active = ref(0)
</script>

<style scoped>
.hollow {
  color: transparent;
  -webkit-text-stroke: 2px rgba(0, 0, 0, 0.45);
}

.paso-enter-active,
.paso-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.paso-enter-from {
  opacity: 0;
  transform: translateY(16px);
}

.paso-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>
