<template>
  <div class="gracias w-full flex flex-col items-center gap-5 lg:gap-6 text-center">
    <span class="size-16 lg:size-20 flex justify-center items-center rounded-full bg-amarillo text-negro shadow-amarilla">
      <Icon name="material-symbols:check-rounded" size="40" />
    </span>
    <h3 class="text-amarillo text-xl md:text-2xl lg:text-[1.75rem] font-bold leading-tight text-balance">
      Gracias, ya tenemos un poco más de contexto
    </h3>
    <p class="max-w-120 text-hueso text-sm lg:text-lg font-light leading-normal text-balance">
      Lo revisaremos antes de la reunión para aprovechar mejor la conversación.
    </p>
    <p class="text-hueso text-sm lg:text-lg font-semibold">
      Nos vemos el {{ dia }} a las {{ hora }}.
    </p>
  </div>
</template>

<script setup>
import { useFechaCita } from '~/composables/useCita'

const { dia, hora } = useFechaCita()
</script>

<style scoped>
.gracias {
  animation: entrar 0.5s cubic-bezier(0.22, 1, 0.36, 1) both;
}

@keyframes entrar {
  from { opacity: 0; transform: translateY(12px); }
  to { opacity: 1; transform: none; }
}

@media (prefers-reduced-motion: reduce) {
  .gracias { animation: none; }
}
</style>
