<template>
  <DefaultSection id="test-seguridad" bg="bg-negro"
    class="relative z-10 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 xxl:px-30 py-12 md:py-16 lg:py-20 xxl:py-24">
    <Transition name="paso" mode="out-in">
      <div v-if="!terminado" :key="paso"
        class="w-full min-h-136 lg:min-h-144 grid grid-cols-1 lg:grid-cols-[1fr_1.6fr] gap-5 md:gap-8 lg:gap-16 relative overflow-hidden pt-8 lg:pt-12">
        <div class="absolute top-0 inset-x-0 h-px bg-blanco/15" />
        <div class="absolute top-0 left-0 h-px bg-amarillo shadow-amarilla transition-[width] duration-500 ease-out"
          :style="{ width: `${((paso + 1) / total) * 100}%` }" />

        <div class="min-w-0 flex flex-col items-start gap-2 lg:gap-4">
          <p class="flex items-baseline gap-1 tabular-nums" :aria-label="`Pregunta ${paso + 1} de ${total}`">
            <span class="text-amarillo text-[3.5rem] md:text-[5.5rem] lg:text-[8rem] xxl:text-[10rem] font-bold leading-[0.8]">
              {{ String(paso + 1).padStart(2, '0') }}
            </span>
            <span class="text-hueso/50 text-sm md:text-base lg:text-xl font-light">/{{ total }}</span>
          </p>
          <p class="text-amarillo text-xs lg:text-sm font-semibold uppercase tracking-wider">{{ actual.tema }}</p>
        </div>

        <div class="min-w-0 flex flex-col gap-5 md:gap-6 lg:gap-8 pb-4">
          <div class="flex flex-col gap-3">
            <h2 class="text-hueso text-xl md:text-3xl lg:text-[2.5rem] font-semibold leading-[1.15] text-pretty">{{ actual.pregunta }}</h2>
            <p class="text-hueso/60 text-sm lg:text-base font-light leading-normal">{{ actual.ayuda }}</p>
          </div>

          <div class="flex flex-col">
            <button v-for="(o, i) in actual.opciones" :key="o.texto" type="button" :aria-pressed="respuestas[paso] === i"
              class="group w-full flex items-center gap-4 border-t border-blanco/15 last:border-b text-left text-sm md:text-base lg:text-lg cursor-pointer transition-colors duration-200 py-3.5 md:py-4 lg:py-5"
              :class="respuestas[paso] === i ? 'text-amarillo' : 'text-hueso lg:hover:text-amarillo'"
              @click="responder(i)">
              <span class="size-8 lg:size-10 flex justify-center items-center shrink-0 glass-boton rounded-full"
                :class="{ activo: respuestas[paso] === i }">
                <Icon :name="respuestas[paso] === i ? 'material-symbols:check-rounded' : 'material-symbols:arrow-forward-rounded'" size="1.25rem" />
              </span>
              <span class="flex-1">{{ o.texto }}</span>
            </button>
          </div>

          <button v-if="paso > 0" type="button"
            class="w-max flex items-center gap-1 text-hueso/70 text-sm font-light cursor-pointer transition-colors duration-200 lg:hover:text-amarillo"
            @click="volver">
            <Icon name="material-symbols:arrow-back-rounded" size="18" class="shrink-0" />
            Pregunta anterior
          </button>
        </div>
      </div>

      <SeguridadResultado v-else :key="indiceNivel" :nivel="nivel" :indice-nivel="indiceNivel" @reiniciar="reiniciar" />
    </Transition>
  </DefaultSection>
</template>

<script setup>
import { useTestSeguridad } from '~/composables/useTestSeguridad'

const { total, paso, respuestas, terminado, actual, nivel, indiceNivel, responder, volver, reiniciar } = useTestSeguridad()
</script>

<style scoped>
.paso-enter-active {
  transition: opacity 0.35s ease-out, transform 0.35s cubic-bezier(0.22, 1, 0.36, 1);
}

.paso-leave-active {
  transition: opacity 0.15s ease-in;
}

.paso-enter-from {
  opacity: 0;
  transform: translateY(24px);
}

.paso-leave-to {
  opacity: 0;
}

@media (prefers-reduced-motion: reduce) {
  .paso-enter-active,
  .paso-leave-active {
    transition: none;
  }
}
</style>
