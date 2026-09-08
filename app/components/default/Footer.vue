<template>
  <footer
    class="w-full flex justify-center relative z-10 bg-negro py-12 md:py-16 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 xxl:px-30">
    <div class="w-full max-w-362 flex flex-col gap-6 mx-auto">
      <img src="/img/logo-benteveo.svg" alt="Benteveo" class="w-32 h-8 self-center md:self-start object-contain"
        width="128" height="32">

      <div class="flex flex-col items-center gap-6 md:flex-row md:justify-between">
        <nav class="flex flex-col items-center gap-4 tab:flex-row tab:gap-6">
          <NuxtLink v-for="link in links" :key="link.label" :to="link.to"
            class="text-white font-semibold lg:hover:text-amarillo transition-colors duration-300">
            {{ link.label }}
          </NuxtLink>
        </nav>

        <div class="flex items-center gap-4">
          <NuxtLink v-for="red in redes" :key="red" to="#" :aria-label="red">
            <img :src="`/img/redes/${red}.svg`" :alt="red" class="size-8">
          </NuxtLink>
        </div>
      </div>

      <div class="w-full h-px bg-white" />

      <div class="flex flex-col items-center gap-4 sm:flex-row sm:justify-between">
        <p class="text-white text-sm">© {{ new Date().getFullYear() }} Benteveo Co-Workers</p>
        <NuxtLink to="#" class="text-white text-sm lg:hover:text-amarillo transition-colors duration-300">
          Privacidad
        </NuxtLink>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { ROUTE_NAMES } from '~/constants/routes'

const links = [
  { label: 'Agencia', to: ROUTE_NAMES.agencia },
  { label: 'Transformación IA', to: ROUTE_NAMES.transformacion },
  { label: 'Eventos', to: ROUTE_NAMES.eventos },
  { label: 'Nosotros', to: '#' },
  { label: 'Blog', to: '#' }
]

const redes = ['instagram', 'facebook', 'youtube', 'linkedin']
</script>
