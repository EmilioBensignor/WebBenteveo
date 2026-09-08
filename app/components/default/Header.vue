<template>
  <header
    class="w-full flex justify-center fixed inset-x-0 top-4 md:top-6 lg:top-8 z-50 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 xxl:px-30">
    <div
      class="w-full max-w-362 flex justify-between items-center gap-6 relative glass rounded-full mx-auto py-3 pl-5 pr-3 lg:py-4 lg:pl-8 lg:pr-4"
      :class="sinBlur && 'glass-solido'">
      <NuxtLink :to="ROUTE_NAMES.home" aria-label="Benteveo" class="shrink-0">
        <img src="/img/logo-benteveo.svg" alt="Benteveo" class="w-32 h-8 lg:w-36 lg:h-9" width="144" height="36">
      </NuxtLink>

      <nav class="hidden lg:flex items-center absolute left-1/2 -translate-x-1/2">
        <NuxtLink v-for="link in links" :key="link.label" :to="link.to"
          class="rounded-full text-blanco hover:text-amarillo [&.router-link-active]:text-amarillo text-sm xl:text-base font-semibold whitespace-nowrap transition-colors duration-300 py-3 px-3 xl:px-6">
          {{ link.label }}
        </NuxtLink>
      </nav>

      <UiButtonPrimary to="#contacto" class="hidden! lg:inline-flex! shrink-0" @click.prevent="irAContacto">
        Hablemos
      </UiButtonPrimary>

      <button class="size-10 lg:hidden flex justify-center items-center shrink-0 text-amarillo cursor-pointer"
        aria-label="Abrir menú" :aria-expanded="open" aria-controls="menu-mobile" @click="open = true">
        <Icon name="material-symbols:menu-rounded" size="28" />
      </button>
    </div>
  </header>

  <Teleport to="body">
    <Transition enter-active-class="transition-transform duration-300 ease-out"
      leave-active-class="transition-transform duration-300 ease-in" enter-from-class="translate-x-full"
      leave-to-class="translate-x-full">
      <div v-if="open" id="menu-mobile" data-lenis-prevent
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
          <UiButtonPrimary to="#contacto" @click.prevent="irAContacto">Hablemos</UiButtonPrimary>

          <img src="/img/logo-benteveo.svg" alt="Benteveo" class="h-12 w-auto" width="192" height="48">
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
import { ROUTE_NAMES } from '~/constants/routes'
import { scrollToEl } from '~/composables/useSmoothScroll'

const route = useRoute()

const links = [
  { label: 'Agencia', to: ROUTE_NAMES.agencia },
  { label: 'Transformación IA', to: ROUTE_NAMES.transformacion },
  { label: 'Eventos', to: ROUTE_NAMES.eventos },
  { label: 'Nosotros', to: '#' },
  { label: 'Blog', to: '#' }
]

const open = ref(false)
const sinBlur = ref(false)

function detectarBlur() {
  const sonda = document.createElement('div')
  sonda.style.cssText = 'position:fixed;top:-100px;left:0;width:10px;height:10px;backdrop-filter:blur(4px);-webkit-backdrop-filter:blur(4px)'
  document.body.appendChild(sonda)
  const aplicado = getComputedStyle(sonda).backdropFilter
  sonda.remove()

  const soportado = aplicado && aplicado !== 'none'
  const ahorro = window.matchMedia('(prefers-reduced-transparency: reduce)').matches
  const android = /Android/.test(navigator.userAgent)
  sinBlur.value = !soportado || ahorro || android
}

function cerrarConEsc(evento) {
  if (evento.key === 'Escape') open.value = false
}

onMounted(() => {
  detectarBlur()
  window.addEventListener('keydown', cerrarConEsc)
})

onBeforeUnmount(() => {
  window.removeEventListener('keydown', cerrarConEsc)
})

watch(() => route.path, () => {
  open.value = false
})

async function irAContacto() {
  open.value = false
  const desdeOtraPagina = route.path !== ROUTE_NAMES.home

  if (desdeOtraPagina) {
    await navigateTo(ROUTE_NAMES.home)
    await new Promise((resolve) => {
      let intentos = 0
      const buscar = () => {
        if (document.getElementById('contacto') || intentos++ > 60) resolve()
        else requestAnimationFrame(buscar)
      }
      buscar()
    })
  }

  scrollToEl('contacto', -100)
}
</script>

