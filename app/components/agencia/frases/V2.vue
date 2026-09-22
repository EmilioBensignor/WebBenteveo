<template>
  <DefaultSection bg="bg-negro"
    class="relative z-10 py-12 md:py-16 lg:py-20 xxl:py-24 mac:py-16" inner="max-w-none! gap-8 lg:gap-12">
    <div class="w-full max-w-362 flex flex-col items-center gap-3 lg:gap-4 text-center px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 xxl:px-30">
      <UiHeadingH2 class="max-w-80 md:max-w-none">
        ¿Te suena <span class="text-amarillo">alguna de estas frases?</span>
      </UiHeadingH2>
      <p class="text-hueso text-sm lg:text-base font-light">Las escuchamos todas las semanas.</p>
    </div>

    <div class="w-full flex flex-col gap-3 lg:gap-6 overflow-hidden"
      style="mask-image: linear-gradient(90deg, transparent, #000 12%, #000 88%, transparent)">
      <div v-for="(fila, f) in filas" :key="f" class="flex w-max" :class="f === 1 ? 'cinta-inversa' : 'cinta'">
        <span v-for="(frase, i) in [...fila, ...fila]" :key="i"
          class="group flex items-center gap-6 lg:gap-10 shrink-0 px-3 lg:px-5">
          <span
            class="text-3xl md:text-5xl lg:text-7xl font-bold leading-none tracking-tight whitespace-nowrap text-transparent [-webkit-text-stroke:1px_rgba(252,183,22,0.5)] transition-all duration-500 lg:group-hover:[-webkit-text-stroke:1px_transparent] lg:group-hover:text-amarillo">
            “{{ frase }}”
          </span>
          <Icon name="material-symbols:asterisk-rounded" class="size-6 lg:size-10 shrink-0 text-amarillo/40" />
        </span>
      </div>
    </div>

    <div class="w-full flex flex-col items-center gap-4 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 xxl:px-30">
      <p class="text-center text-amarillo text-base lg:text-[1.75rem] font-medium">Para eso estamos.</p>
      <UiButtonPrimary to="#contacto" variant="glass" size="glass" class="gap-3 pl-6 pr-4">
        Hablemos de tu marca
        <Icon name="material-symbols:arrow-forward-rounded" class="size-4 lg:size-6 shrink-0" />
      </UiButtonPrimary>
    </div>
  </DefaultSection>
</template>

<script setup>
import { frases } from '~/constants/agencia'

const filas = [frases, [...frases].reverse()]
</script>

<style scoped>
.cinta {
  animation: correr 45s linear infinite;
}

.cinta-inversa {
  animation: correr 38s linear infinite reverse;
}

@keyframes correr {
  from { transform: translateX(0); }
  to { transform: translateX(-50%); }
}

@media (prefers-reduced-motion: reduce) {
  .cinta,
  .cinta-inversa { animation: none; }
}
</style>
