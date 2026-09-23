<template>
  <section ref="root"
    class="sobre-media w-full h-dvh sticky top-0 isolate overflow-hidden bg-negro-puro"
    :class="cubierto && 'invisible'">
    <video :src="heroAgencia.video" :poster="heroAgencia.poster" class="size-full absolute inset-0 object-cover" autoplay
      loop muted playsinline preload="metadata" />
    <div class="absolute inset-0 bg-linear-to-r from-black/85 via-black/70 to-black/55" />
    <SharedLuces class="opacity-40" />

    <div
      class="w-full h-full relative z-10 flex justify-center items-center px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 xxl:px-30 py-28 md:py-32 lg:py-36 mac:py-28">
      <div
        class="w-full max-w-362 flex flex-col items-center lg:items-start gap-6 lg:gap-10 text-center lg:text-left">
        <UiHeadingH1 class="text-balance">
          <span class="text-blanco">{{ heroAgencia.title }}</span><br>
          <span class="text-amarillo">{{ heroAgencia.accent }}</span>
        </UiHeadingH1>

        <p
          class="w-full min-h-[3.2em] md:min-h-[1.4em] flex flex-wrap justify-center lg:justify-start items-baseline gap-x-2 text-hueso text-base md:text-xl lg:text-2xl font-light">
          <span>Creamos</span>
          <span class="text-amarillo font-medium">
            {{ escrito }}<span class="text-sm lg:text-base animate-pulse" aria-hidden="true">|</span>
          </span>
        </p>

        <div
          class="w-full flex flex-col md:flex-row items-stretch md:items-center md:justify-center lg:justify-start gap-2 lg:gap-4">
          <UiButtonPrimary to="#contacto" variant="glass" size="glass" class="gap-3 pl-6 pr-4">
            Hablemos
            <Icon name="material-symbols:calendar-month-outline-rounded" class="size-4 lg:size-6 shrink-0" />
          </UiButtonPrimary>
          <UiButtonPrimary to="#proyectos" variant="glass" size="glass" class="gap-3 pl-6 pr-4">
            Ver trabajos
            <Icon name="material-symbols:arrow-forward-rounded" class="size-4 lg:size-6 shrink-0" />
          </UiButtonPrimary>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { heroAgencia, heroFrases } from '~/constants/agencia'

const ESPERA = 2200
const TIPEO = 70
const BORRADO = 35

const escrito = ref('')
const root = useTemplateRef('root')
const cubierto = ref(false)

let indice = 0
let caracter = 0
let borrando = false
let reloj = null

function paso() {
  const frase = heroFrases[indice]
  caracter += borrando ? -1 : 1
  escrito.value = frase.slice(0, caracter)

  let demora = borrando ? BORRADO : TIPEO

  if (borrando && caracter === 0) {
    borrando = false
    indice = (indice + 1) % heroFrases.length
    demora = 400
  } else if (!borrando && caracter === frase.length) {
    borrando = true
    demora = ESPERA
  }

  reloj = setTimeout(paso, demora)
}

function revisar() {
  if (!root.value) return
  cubierto.value = window.scrollY >= root.value.offsetHeight
}

onMounted(() => {
  revisar()
  window.addEventListener('scroll', revisar, { passive: true })

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    escrito.value = heroFrases[0]
    return
  }
  reloj = setTimeout(paso, 500)
})

onBeforeUnmount(() => {
  clearTimeout(reloj)
  window.removeEventListener('scroll', revisar)
})
</script>
