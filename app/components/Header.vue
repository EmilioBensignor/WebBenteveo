<template>
  <header class="w-full flex justify-center absolute top-8 left-0 z-50 px-4">
    <div class="w-full max-w-344 flex justify-between items-center">
      <NuxtLink :to="ROUTE_NAMES.home" aria-label="Benteveo">
        <img src="/img/transformacion/logo-benteveo.svg" alt="Benteveo" class="h-8 w-auto" width="128" height="32">
      </NuxtLink>

      <nav class="hidden lg:flex items-center gap-8">
        <NuxtLink v-for="link in links" :key="link.label" :to="link.to"
          class="text-blanco text-base font-semibold leading-none hover:text-amarillo transition-colors">
          {{ link.label }}
        </NuxtLink>
        <ButtonPrimary to="#contacto">Contacto</ButtonPrimary>
      </nav>

      <button class="size-12 lg:hidden flex justify-center items-center text-amarillo cursor-pointer"
        aria-label="Abrir menú" @click="open = true">
        <Icon name="material-symbols:menu-rounded" size="28" />
      </button>
    </div>

    <Transition enter-active-class="transition-opacity duration-200"
      leave-active-class="transition-opacity duration-200" enter-from-class="opacity-0" leave-to-class="opacity-0">
      <div v-if="open"
        class="w-full h-dvh lg:hidden flex flex-col items-center gap-6 fixed inset-0 z-60 bg-linear-to-b from-negro-puro via-negro to-negro-puro py-8 px-4">
        <div class="w-full">
          <div class="w-full max-w-72 flex justify-end items-center">
            <button class="size-12 flex justify-center items-center cursor-pointer" aria-label="Cerrar menú"
              @click="open = false">
              <div class="size-6 flex justify-center items-center bg-blanco rounded-full text-negro">
                <Icon name="material-symbols:close-small-rounded" size="24" />
              </div>
            </button>
          </div>

          <nav class="w-full max-w-72 flex flex-col items-start">
            <NuxtLink v-for="link in links" :key="link.label" :to="link.to"
              class="w-full flex items-center text-blanco text-sm font-semibold px-3 py-4" @click="open = false">
              {{ link.label }}
            </NuxtLink>
          </nav>
        </div>

        <div class="w-full flex flex-col items-center gap-6">
          <ButtonPrimary to="#contacto" @click="open = false">Contacto</ButtonPrimary>

          <img src="/img/transformacion/logo-benteveo.svg" alt="Benteveo" class="h-12 w-auto" width="192" height="48">
        </div>
      </div>
    </Transition>
  </header>
</template>

<script setup>
import { ROUTE_NAMES } from '~/constants/routes'

const links = [
  { label: 'Servicios', to: '#' },
  { label: 'Proyectos', to: '#' },
  { label: 'Nosotros', to: '#' },
  { label: 'Novedades', to: '#' }
]
const open = ref(false)
</script>
