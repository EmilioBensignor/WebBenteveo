<template>
  <div class="w-full grid grid-cols-1 lg:grid-cols-[1fr_1.6fr] overflow-hidden border border-blanco/15 rounded-2xl lg:rounded-3xl">
    <div class="flex flex-col items-center gap-4 text-center border-b lg:border-b-0 lg:border-r border-blanco/10 px-5 py-8 md:px-8 lg:px-10 lg:py-10">
      <div class="w-full max-w-68 lg:max-w-80 relative">
        <svg viewBox="0 0 200 110" class="w-full overflow-visible" aria-hidden="true">
          <path v-for="(d, i) in TRAMOS" :key="d" :d="d" fill="none" stroke="currentColor" stroke-width="12"
            class="transition-colors duration-500" :style="{ transitionDelay: `${200 + i * 250}ms` }"
            :class="[encendido && i <= indiceNivel ? nivel.color : 'text-blanco/10', encendido && i === indiceNivel && 'tramo-activo']" />
        </svg>
        <p class="absolute inset-x-0 bottom-1 lg:bottom-2 flex flex-col items-center gap-1.5">
          <Icon :name="nivel.icon" class="size-7! lg:size-8!" :class="nivel.color" />
          <span class="text-xl lg:text-2xl font-bold leading-tight" :class="nivel.color">{{ nivel.nombre }}</span>
          <span class="text-hueso/50 text-[0.625rem] lg:text-xs uppercase tracking-wider">{{ nivel.bajada }}</span>
        </p>
      </div>

      <p class="text-hueso/80 text-sm font-light leading-normal">{{ nivel.texto }}</p>

      <button type="button"
        class="group flex items-center gap-1.5 glass-boton rounded-full text-hueso text-xs lg:text-sm cursor-pointer transition-colors duration-200 lg:hover:text-amarillo mt-1 pl-3 pr-4 py-2"
        @click="emit('reiniciar')">
        <Icon name="material-symbols:refresh-rounded" size="16" class="shrink-0 transition-transform duration-500 lg:group-hover:-rotate-180" />
        Hacer el test de nuevo
      </button>
    </div>

    <div class="flex flex-col justify-center gap-5 lg:gap-6 bg-blanco/4 px-5 py-8 md:px-8 lg:px-12 lg:py-10">
      <div class="flex flex-col gap-1.5">
        <p class="text-hueso text-lg lg:text-2xl font-semibold leading-[1.25] text-balance">
          Consigue tu diagnóstico detallado y la guía de recomendaciones
        </p>
        <p class="text-hueso/70 text-sm lg:text-base font-light">para comenzar a proteger tus activos digitales hoy.</p>
      </div>
      <SeguridadFormDiagnostico />
    </div>
  </div>
</template>

<script setup>
defineProps({
  nivel: { type: Object, required: true },
  indiceNivel: { type: Number, required: true }
})

const emit = defineEmits(['reiniciar'])

const TRAMOS = [
  'M 15.00 100.00 A 85 85 0 0 1 55.59 27.53',
  'M 59.44 25.30 A 85 85 0 0 1 140.56 25.30',
  'M 144.41 27.53 A 85 85 0 0 1 185.00 100.00'
]

const encendido = ref(false)

onMounted(() => requestAnimationFrame(() => (encendido.value = true)))
</script>

<style scoped>
.tramo-activo {
  filter: drop-shadow(0 0 6px currentColor);
}
</style>
