<template>
  <SharedHeroPuntos ancho="max-w-240">
    <template #background>
      <div class="absolute top-0 inset-x-0 h-1/2 bg-linear-to-b from-[#74ACDF]/10 to-transparent" />
    </template>

    <KitBandera class="w-12 lg:w-16 shadow-[0_8px_24px_rgba(0,0,0,0.4)]" />
    <h1 class="text-hueso text-5xl md:text-7xl lg:text-8xl xxl:text-[7.5rem] font-bold leading-[0.95] tracking-tight text-balance">
      ¿Qué es <span class="text-amarillo whitespace-nowrap">KIT 4.0</span>?
    </h1>
    <p class="max-w-160 text-hueso text-base md:text-lg lg:text-xl font-light leading-normal text-balance">
      KIT 4.0 es un programa nacional que facilita a las PyMEs la incorporación de tecnología para mejorar y digitalizar sus procesos.
    </p>
    <UiButtonPrimary variant="glass" size="glass" class="w-full sm:w-max gap-2 mt-2" @click="emit('calificar')">
      Quiero saber si mi empresa califica
      <Icon name="material-symbols:arrow-forward-rounded" size="20" class="hidden! iph:block! shrink-0" />
    </UiButtonPrimary>
  </SharedHeroPuntos>
</template>

<script setup>
const emit = defineEmits(['calificar'])
</script>
