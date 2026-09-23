<template>
  <DefaultSection bg="bg-negro"
    class="relative z-10 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 xxl:px-30 py-16 md:py-20 lg:py-28 xxl:py-32 mac:py-20"
    inner="lg:flex-row! lg:justify-between gap-14 md:gap-16 lg:gap-16">
    <div class="w-full lg:w-auto flex flex-col items-center lg:items-start gap-3 lg:gap-5 shrink-0 text-center lg:text-left">
      <UiHeadingH2 class="text-[1.05rem] iph:text-xl whitespace-nowrap">¿Te suena alguna de estas frases?</UiHeadingH2>
      <p class="text-amarillo text-sm lg:text-xl font-medium">Para eso estamos.</p>

      <div class="w-full max-w-xs flex flex-col gap-4 mt-4 lg:mt-10">
        <div class="flex justify-between items-center">
          <span class="text-hueso/50 text-sm lg:text-base font-medium tabular-nums">
            <span class="text-amarillo">{{ String(activo + 1).padStart(2, '0') }}</span>
            / {{ String(comentarios.length).padStart(2, '0') }}
          </span>
          <div class="flex gap-2">
            <button type="button"
              class="size-8 lg:size-10 flex justify-center items-center glass-boton rounded-full text-hueso cursor-pointer"
              aria-label="Frase anterior" @click="anterior">
              <Icon name="material-symbols:arrow-back-rounded" class="size-4! lg:size-5!" />
            </button>
            <button type="button"
              class="size-8 lg:size-10 flex justify-center items-center glass-boton rounded-full text-hueso cursor-pointer"
              aria-label="Frase siguiente" @click="siguiente">
              <Icon name="material-symbols:arrow-forward-rounded" class="size-4! lg:size-5!" />
            </button>
          </div>
        </div>

        <div ref="barras" class="flex gap-1.5">
          <span v-for="c in comentarios" :key="c.texto" class="h-0.5 flex-1 relative bg-blanco/15 rounded-full overflow-hidden">
            <span class="absolute inset-0 bg-amarillo origin-left scale-x-0" />
          </span>
        </div>
      </div>
    </div>

    <div ref="mazo"
      class="w-full max-w-md md:max-w-lg lg:max-w-xl h-64 md:h-68 lg:h-80 relative touch-pan-y select-none cursor-pointer" @pointerdown="agarrar" @pointerup="soltar">
      <article v-for="(c, i) in comentarios" :key="c.texto"
        class="size-full flex flex-col justify-between absolute inset-0 glass bg-negro/90! rounded-3xl p-6 md:p-8 lg:p-10"
        :class="CAPAS[i]">
        <Icon name="material-symbols:format-quote-rounded" class="size-9! lg:size-12! text-amarillo -my-2 lg:-my-3 -ml-1.5 lg:-ml-2" />
        <p class="text-hueso text-xl md:text-2xl lg:text-3xl font-light leading-[1.25] tracking-tight">{{ c.texto }}</p>
        <span class="text-gris text-xs lg:text-sm">{{ c.autor }}</span>
      </article>
    </div>
  </DefaultSection>
</template>

<script setup>
import { comentarios } from '~/constants/agencia'
import { useGsapContext } from '~/composables/useGsapContext'

const INTERVALO = 3.5
const PASO = 16
const GIROS = [-2.5, 2, -1.5, 3]
const TOTAL = comentarios.length
const CAPAS = ['z-4', 'z-1', 'z-2', 'z-3']
const ARRIBA = { xPercent: 6, yPercent: -45, rotate: 9, scale: 1.12 }

const mazo = useTemplateRef('mazo')
const barras = useTemplateRef('barras')
const orden = ref(comentarios.map((c, i) => (TOTAL - i) % TOTAL))
const activo = computed(() => orden.value[0])

let gsap = null
let reloj = null
let visible = false
let reducido = false
let animando = false
let inicioX = 0

const carta = (i) => mazo.value.children[i]
const relleno = (i) => barras.value.children[i].firstElementChild

function pose(idx, profundidad) {
  return {
    xPercent: 0,
    yPercent: 0,
    y: -profundidad * PASO,
    scale: 1 - profundidad * 0.05,
    rotate: profundidad ? GIROS[idx] : 0,
    zIndex: TOTAL - profundidad
  }
}

function acomodar(excluir) {
  orden.value.forEach((idx, profundidad) => {
    if (idx === excluir) return
    gsap.to(carta(idx), { ...pose(idx, profundidad), autoAlpha: 1, duration: 0.7, ease: 'power3.out', overwrite: 'auto' })
  })
}

function cronometrar() {
  reloj?.kill()
  comentarios.forEach((c, i) => gsap.set(relleno(i), { scaleX: i < activo.value ? 1 : 0 }))

  if (reducido) {
    gsap.set(relleno(activo.value), { scaleX: 1 })
    return
  }

  reloj = gsap.to(relleno(activo.value), {
    scaleX: 1,
    duration: INTERVALO,
    ease: 'none',
    paused: !visible,
    onComplete: siguiente
  })
}

function siguiente() {
  if (!gsap || animando) return
  animando = true

  const entrante = orden.value[TOTAL - 1]
  const el = carta(entrante)
  orden.value = [entrante, ...orden.value.slice(0, -1)]

  acomodar(entrante)
  gsap.fromTo(el, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.15, ease: 'none' })
  gsap.fromTo(el,
    { ...ARRIBA, zIndex: TOTAL + 1 },
    {
      ...pose(entrante, 0),
      zIndex: TOTAL + 1,
      duration: 0.8,
      ease: 'power3.out',
      overwrite: 'auto',
      onComplete: () => {
        gsap.set(el, { zIndex: TOTAL })
        animando = false
      }
    })
  cronometrar()
}

function anterior() {
  if (!gsap || animando) return
  animando = true

  const saliente = orden.value[0]
  const el = carta(saliente)
  orden.value = [...orden.value.slice(1), saliente]

  gsap.set(el, { zIndex: TOTAL + 1 })
  gsap.to(el, { autoAlpha: 0, duration: 0.15, delay: 0.35, ease: 'none' })
  gsap.to(el, {
    ...ARRIBA,
    duration: 0.5,
    ease: 'power2.in',
    overwrite: 'auto',
    onComplete: () => {
      gsap.set(el, { ...pose(saliente, TOTAL - 1), autoAlpha: 0 })
      acomodar()
      animando = false
    }
  })
  acomodar(saliente)
  cronometrar()
}

function agarrar(evento) {
  inicioX = evento.clientX
}

function soltar(evento) {
  if (evento.clientX - inicioX > 40) anterior()
  else siguiente()
}

useGsapContext(mazo, (ctx, g, ScrollTrigger) => {
  gsap = g
  reducido = window.matchMedia('(prefers-reduced-motion: reduce)').matches

  orden.value.forEach((idx, profundidad) => gsap.set(carta(idx), pose(idx, profundidad)))

  ScrollTrigger.create({
    trigger: mazo.value,
    start: 'top bottom',
    end: 'bottom top',
    onToggle: (estado) => {
      visible = estado.isActive
      if (visible) reloj?.play()
      else reloj?.pause()
    }
  })

  cronometrar()
})

onBeforeUnmount(() => reloj?.kill())
</script>
