<template>
  <NuxtLayout>
    <SharedHeroPuntos ancho="max-w-200">
      <span class="text-amarillo text-8xl md:text-9xl lg:text-[12rem] font-bold leading-[0.85]! tracking-tight tabular-nums">
        {{ noEncontrada ? '404' : error.statusCode }}
      </span>
      <h1 class="text-hueso text-3xl md:text-5xl lg:text-6xl font-bold leading-[1.05] tracking-tight text-balance">
        {{ noEncontrada ? 'Esta página no existe' : 'Algo salió mal' }}
      </h1>
      <p class="max-w-140 text-hueso text-base md:text-lg font-light leading-normal text-balance">
        {{ noEncontrada
          ? 'Puede que el enlace esté roto o que la página se haya movido. Vuelve al inicio y sigue desde ahí.'
          : 'Tuvimos un problema al cargar esta página. Vuelve a intentarlo en unos minutos.' }}
      </p>
      <UiButtonPrimary variant="glass" size="glass" class="w-full sm:w-max gap-2 mt-2" @click="clearError({ redirect: ROUTE_NAMES.home })">
        <Icon name="material-symbols:arrow-back-rounded" size="20" class="shrink-0" />
        Volver al inicio
      </UiButtonPrimary>
    </SharedHeroPuntos>
  </NuxtLayout>
</template>

<script setup>
import { ROUTE_NAMES } from '~/constants/routes'

const props = defineProps({
  error: { type: Object, required: true }
})

const noEncontrada = computed(() => props.error.statusCode === 404)

useSeoMeta({
  title: () => noEncontrada.value ? 'Página no encontrada' : 'Error',
  robots: 'noindex, nofollow'
})
</script>
