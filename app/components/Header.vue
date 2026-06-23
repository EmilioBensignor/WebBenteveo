<template>
  <header class="w-full flex justify-center absolute top-8 left-0 z-50">
    <div class="w-full max-w-344 flex justify-between items-center px-4 md:px-7 lg:px-16 xxl:px-30 mx-auto">
      <div class="w-full lg:w-auto flex justify-between items-center lg:gap-6">
        <NuxtLink :to="ROUTE_NAMES.home" aria-label="Benteveo">
          <img src="/img/transformacion/logo-benteveo.svg" alt="Benteveo" class="w-32 h-8" width="128" height="32">
        </NuxtLink>

        <nav class="hidden lg:flex items-center">
          <NuxtLink v-for="link in links" :key="link.label" :to="link.to"
            class="hover:bg-amarillo/10 rounded-full text-blanco hover:text-amarillo [&.router-link-active]:text-amarillo font-semibold transition-colors duration-300 py-3 px-6">
            {{ link.label }}
          </NuxtLink>
        </nav>
      </div>
      <ButtonPrimary to="#contacto" class="hidden! lg:inline-flex!">Contacto</ButtonPrimary>

      <button class="size-12 lg:hidden flex justify-center items-center text-amarillo cursor-pointer"
        aria-label="Abrir menú" @click="open = true">
        <Icon name="material-symbols:menu-rounded" size="28" />
      </button>
    </div>

    <Transition enter-active-class="transition-transform duration-300 ease-out"
      leave-active-class="transition-transform duration-300 ease-in" enter-from-class="translate-x-full"
      leave-to-class="translate-x-full">
      <div v-if="open"
        class="w-full max-w-97 h-dvh lg:hidden flex flex-col items-center gap-6 fixed top-0 right-0 z-60 bg-[linear-gradient(180deg,#000000_0%,#131313_33%,#131313_66%,#000000_100%)] py-6 px-4 md:px-6">
        <div class="w-full flex flex-col items-end">
          <div class="w-full flex justify-end items-center">
            <button class="size-12 flex justify-center items-center cursor-pointer" aria-label="Cerrar menú"
              @click="open = false">
              <div class="size-6 flex justify-center items-center bg-blanco rounded-full text-negro">
                <Icon name="material-symbols:close-small-rounded" size="24" />
              </div>
            </button>
          </div>

          <nav class="w-full flex flex-col items-start">
            <NuxtLink v-for="link in links" :key="link.label" :to="link.to"
              class="w-full flex items-center [&.router-link-active]:bg-amarillo/10 rounded-full text-blanco [&.router-link-active]:text-amarillo text-sm font-semibold px-5 py-4"
              @click="open = false">
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
  { label: 'Agencia', to: '#' },
  { label: 'Transformación', to: ROUTE_NAMES.transformacion },
  { label: 'Eventos', to: '#' },
  { label: 'Nosotros', to: '#' }
]
const open = ref(false)
</script>
