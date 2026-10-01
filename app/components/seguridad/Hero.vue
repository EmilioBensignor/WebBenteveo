<template>
  <SharedHeroPuntos>
    <span class="flex items-center gap-2 border border-amarillo/35 bg-amarillo/10 backdrop-blur-md rounded-full text-amarillo text-xs lg:text-sm px-4 py-2">
      <Icon name="material-symbols:lock-outline" size="16" class="shrink-0" />
      Entorno 100% anónimo
    </span>
    <h1 class="text-hueso text-4xl md:text-6xl lg:text-7xl xxl:text-[5.5rem] font-bold leading-[1.02] tracking-tight text-balance">
      ¿Hasta qué punto están expuestos <span class="text-amarillo">tus datos</span> al usar IA?
    </h1>
    <p class="max-w-160 text-hueso text-base md:text-lg lg:text-xl font-light leading-normal text-balance">
      No necesitas conocimientos técnicos ni jurídicos. Responde de forma honesta sobre las herramientas que usa tu equipo y conoce tu riesgo actual en 3 minutos.
    </p>
    <UiButtonPrimary variant="glass" size="glass" class="w-full sm:w-max gap-2 mt-2" @click="scrollToEl('test-seguridad', -80)">
      Comenzar el test
      <Icon name="material-symbols:arrow-downward-rounded" size="20" class="shrink-0" />
    </UiButtonPrimary>
  </SharedHeroPuntos>
</template>

<script setup>
import { scrollToEl } from '~/composables/useSmoothScroll'
</script>
