<template>
  <DefaultSection bg="bg-negro"
    class="relative z-10 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 xxl:px-30 py-12 md:py-16 lg:py-20 xxl:py-24 mac:py-14">
    <div class="w-full max-w-362 flex flex-col items-center gap-8 md:flex-row md:items-center md:gap-12 lg:gap-20 xl:gap-28">
      <div class="w-full md:flex-1 md:min-w-0 flex flex-col items-center md:items-start gap-6">
        <UiHeadingH2 class="text-center md:text-left">
          Dónde la estrategia se encuentra con la producción
        </UiHeadingH2>

        <p class="text-center md:text-left text-hueso text-sm lg:text-base leading-[1.4] font-light">
          Benteveo Eventos suma el poder de una agencia creativa para producir experiencias estratégicas que
          <span class="text-amarillo font-bold">conectan a las marcas con sus clientes.</span>
        </p>

        <UiButtonPrimary to="#contacto" variant="glass" size="glass" class="gap-3 pl-6 pr-4">
          Cuéntanos tu idea
          <Icon name="material-symbols:arrow-forward-rounded" class="size-4 lg:size-6 shrink-0" />
        </UiButtonPrimary>
      </div>

      <button ref="tarjeta" type="button" aria-label="Ver el showreel" aria-haspopup="dialog"
        data-cursor-label="Ver showreel" data-cursor-arrow
        class="w-full md:flex-1 md:min-w-0 lg:flex-none lg:w-xl aspect-16/10 shrink-0 relative bg-negro-puro border border-blanco/33 rounded-2xl overflow-hidden cursor-pointer"
        @click="abrir">
        <video ref="miniatura" :src="showreelEventos.video" :poster="showreelEventos.poster"
          class="size-full absolute inset-0 object-cover" loop muted playsinline preload="metadata" />
        <div class="absolute inset-0 bg-linear-to-b from-transparent from-55% to-black/70" />

        <span
          class="size-10 lg:size-12 flex justify-center items-center absolute right-3 bottom-3 lg:right-4 lg:bottom-4 glass-boton rounded-full text-hueso">
          <Icon name="material-symbols:fullscreen-rounded" class="size-5 lg:size-6" />
        </span>
      </button>
    </div>
  </DefaultSection>

  <Teleport to="body">
    <Transition name="popup" @after-enter="cerrarBoton?.focus()">
      <div v-if="abierto" role="dialog" aria-modal="true" aria-label="Showreel de Benteveo Eventos" data-lenis-prevent
        class="size-full flex justify-center items-center fixed inset-0 z-70 bg-black/85 backdrop-blur-sm px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 xxl:px-30"
        @click.self="cerrar($event)">
        <div class="popup-caja w-full max-w-6xl flex flex-col items-end gap-3 lg:gap-4">
          <button ref="cerrarBoton" type="button" aria-label="Cerrar video"
            class="size-10 lg:size-12 flex justify-center items-center glass-boton rounded-full text-hueso cursor-pointer"
            @click="cerrar">
            <Icon name="material-symbols:close-rounded" class="size-5 lg:size-6" />
          </button>

          <video ref="reproductor" :src="showreelEventos.video" :poster="showreelEventos.poster"
            class="w-full max-h-[calc(100dvh-8rem)] aspect-video bg-negro-puro border border-blanco/33 rounded-2xl object-contain"
            controls autoplay playsinline />
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
import { showreelEventos } from '~/constants/eventos'

const tarjeta = useTemplateRef('tarjeta')
const miniatura = useTemplateRef('miniatura')
const reproductor = useTemplateRef('reproductor')
const cerrarBoton = useTemplateRef('cerrarBoton')

const abierto = ref(false)

let observer = null
let visible = false

function refrescarCursor(evento) {
  const debajo = document.elementFromPoint(evento.clientX, evento.clientY)
  debajo?.dispatchEvent(new PointerEvent('pointermove', { bubbles: true, clientX: evento.clientX, clientY: evento.clientY }))
}

function abrir(evento) {
  abierto.value = true
  miniatura.value?.pause()
  window.__lenis?.stop()
  document.documentElement.style.overflow = 'hidden'
  nextTick(() => {
    reproductor.value?.play().catch(() => { })
    refrescarCursor(evento)
  })
}

function cerrar(evento) {
  if (!abierto.value) return
  abierto.value = false
  window.__lenis?.start()
  document.documentElement.style.overflow = ''
  if (visible) miniatura.value?.play().catch(() => { })
  tarjeta.value?.focus({ preventScroll: true })
  if (evento?.clientX) nextTick(() => refrescarCursor(evento))
}

function cerrarConEsc(evento) {
  if (evento.key === 'Escape') cerrar()
}

onMounted(() => {
  window.addEventListener('keydown', cerrarConEsc)

  observer = new IntersectionObserver(([entrada]) => {
    visible = entrada.isIntersecting
    if (abierto.value) return
    if (visible) miniatura.value?.play().catch(() => { })
    else miniatura.value?.pause()
  })
  observer.observe(tarjeta.value)
})

onBeforeUnmount(() => {
  window.removeEventListener('keydown', cerrarConEsc)
  observer?.disconnect()
  if (abierto.value) cerrar()
})
</script>

<style scoped>
.popup-enter-active,
.popup-leave-active {
  transition: opacity 0.3s ease;
}

.popup-enter-active .popup-caja,
.popup-leave-active .popup-caja {
  transition: transform 0.3s ease;
}

.popup-enter-from,
.popup-leave-to {
  opacity: 0;
}

.popup-enter-from .popup-caja,
.popup-leave-to .popup-caja {
  transform: scale(0.96);
}
</style>
