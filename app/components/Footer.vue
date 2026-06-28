<template>
  <footer
    class="w-full flex justify-center  bg-[linear-gradient(180deg,#000_0%,#131313_33%,#131313_66%,#000_100%)] py-8 xxl:py-16 px-4 md:px-7 lg:px-16 xxl:px-30">
    <div class="w-full max-w-344 flex flex-col gap-6 mx-auto">
      <div class="flex flex-col gap-6 sm:flex-row sm:justify-between sm:items-center">
        <img src="/img/logo-benteveo.svg" alt="Benteveo" class="w-32 h-8 object-contain" width="128" height="32">
        <ButtonPrimary to="#contacto" class="self-start lg:self-auto">Contacto</ButtonPrimary>
      </div>

      <div class="flex flex-col gap-6 md:flex-row md:justify-between md:items-center">
        <nav class="flex flex-col gap-6 tab:flex-row tab:gap-6">
          <NuxtLink v-for="link in links" :key="link.label" :to="link.to"
            class="text-white font-semibold lg:hover:text-amarillo transition-colors duration-300">
            {{ link.label }}
          </NuxtLink>
        </nav>
        <div class="flex items-center gap-4">
          <NuxtLink v-for="red in redes" :key="red" to="#" :aria-label="red">
            <img :src="`/img/redes/${red}.svg`" :alt="red" class="size-8" />
          </NuxtLink>
        </div>
      </div>

      <div class="w-full h-px bg-white" />

      <div class="flex flex-col gap-6 sm:flex-row sm:justify-between">
        <p class="text-white text-sm font-medium">© {{ new Date().getFullYear() }} Benteveo Co-Workers</p>
        <NuxtLink to="#" class=" text-sm text-white font-medium">
          Privacidad</NuxtLink>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { ROUTE_NAMES } from '~/constants/routes'

const links = [
  { label: 'Agencia', to: '#' },
  { label: 'Transformación', to: ROUTE_NAMES.transformacion },
  { label: 'Eventos', to: '#' },
  { label: 'Nosotros', to: '#' }
]
const redes = ['instagram', 'facebook', 'youtube', 'linkedin']
</script>
