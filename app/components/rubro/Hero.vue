<template>
  <section ref="root" @pointermove="mover" @pointerleave="soltar" class="w-full min-h-dvh flex items-center sticky overflow-hidden bg-negro px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 xxl:px-30 pt-28 pb-12 md:pt-32 md:pb-16 lg:pt-32 lg:pb-12"
    :class="cubierto && 'invisible'" :style="{ top: `${tope}px` }">
    <SharedLuces class="z-0" />

    <div class="w-full max-w-362 grid grid-cols-1 md:grid-cols-2 items-center gap-10 md:gap-8 lg:gap-12 xxl:gap-20 relative z-1 mx-auto">
      <div ref="texto" class="max-w-160 flex flex-col gap-5 lg:gap-8">
        <div class="flex items-center gap-3">
          <span class="w-8 lg:w-12 h-px bg-amarillo" />
          <p class="text-hueso text-sm md:text-base lg:text-xl font-light">{{ rubro.h1 }}</p>
        </div>
        <UiHeadingH1 class="text-amarillo text-balance">{{ rubro.subtitulo }}</UiHeadingH1>
        <RubroHeroAcciones class="mt-2" />
      </div>

      <div ref="grupo" class="w-full max-w-104 md:max-w-120 lg:max-w-none mac:max-w-108 aspect-[10/11] md:aspect-auto md:h-112 lg:h-144 xl:h-160 mac:h-128 relative mx-auto">
        <div v-for="(src, i) in circulos" :key="i" class="absolute" :class="POSICIONES[i]">
          <div
            class="size-full group rounded-full overflow-hidden border border-blanco/33 bg-negro shadow-[0_0_40px_0_rgba(252,183,22,0.18)]">
            <NuxtImg :src="src" alt="" format="avif" sizes="xs:260px md:320px lg:420px xl:480px"
              class="size-full object-cover brightness-[1.6] contrast-[1.08] transition-transform duration-700 ease-out md:group-hover:scale-110"
              preload />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { useGsapContext } from '~/composables/useGsapContext'

const props = defineProps({
  rubro: { type: Object, required: true }
})

const PLACEHOLDERS = ['salud', 'agroindustria', 'ecommerce'].map((n) => `/img/transformacion/rubros/hero_${n}.webp`)

const POSICIONES = [
  'w-[46%] md:w-[min(46%,10rem)] aspect-square lg:size-52 xl:size-60 mac:size-44 top-0 md:top-[12%] lg:top-[6%] left-[54%] md:left-[min(54%,15rem)] lg:left-auto lg:right-[4%] xl:right-[14%] mac:right-[4%] z-2',
  'w-[72%] md:w-[min(72%,18rem)] aspect-square lg:size-88 xl:size-104 mac:size-80 top-1/2 left-0 lg:left-[4%] -translate-y-1/2 z-1',
  'w-[54%] md:w-[min(54%,12rem)] aspect-square lg:size-60 xl:size-68 mac:size-52 bottom-0 left-[46%] md:left-[min(46%,14rem)] lg:left-auto lg:right-[8%] xl:right-[18%] mac:right-[8%] z-3'
]

const circulos = computed(() => props.rubro.circulos ?? PLACEHOLDERS)

const PROFUNDIDAD = [14, 8, 22]
const FLOTE = [
  { y: -12, duration: 3.6 },
  { y: 10, duration: 4.4 },
  { y: -14, duration: 3.1 }
]

const root = useTemplateRef('root')
const texto = useTemplateRef('texto')
const grupo = useTemplateRef('grupo')
const cubierto = ref(false)
const tope = ref(0)
let seguir = []

function revisar() {
  if (!root.value) return
  cubierto.value = window.scrollY >= root.value.offsetHeight
}

// Si el hero es más alto que la pantalla, se fija recién al mostrar su parte inferior
function medir() {
  if (!root.value) return
  tope.value = Math.min(0, window.innerHeight - root.value.offsetHeight)
  revisar()
}

onMounted(() => {
  medir()
  window.addEventListener('scroll', revisar, { passive: true })
  window.addEventListener('resize', medir)
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', revisar)
  window.removeEventListener('resize', medir)
})

function mover(e) {
  if (e.pointerType !== 'mouse' || !seguir.length) return
  const { left, top, width, height } = root.value.getBoundingClientRect()
  const dx = (e.clientX - left) / width - 0.5
  const dy = (e.clientY - top) / height - 0.5
  seguir.forEach(([x, y], i) => {
    x(dx * PROFUNDIDAD[i] * 2)
    y(dy * PROFUNDIDAD[i] * 2)
  })
}

function soltar() {
  seguir.forEach(([x, y]) => {
    x(0)
    y(0)
  })
}

useGsapContext(root, (ctx, gsap) => {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

  const circulos = [...grupo.value.children]

  gsap.timeline({ defaults: { ease: 'power3.out' } })
    .from(circulos, { autoAlpha: 0, scale: 0.8, duration: 1.1, stagger: 0.15 }, 0)
    .from(texto.value.children, { autoAlpha: 0, y: 30, duration: 0.9, stagger: 0.1 }, 0.2)

  circulos.forEach((c, i) => {
    gsap.to(c.firstElementChild, { ...FLOTE[i], ease: 'sine.inOut', repeat: -1, yoyo: true, delay: 1.2 })
  })

  seguir = circulos.map((c) => [
    gsap.quickTo(c, 'x', { duration: 1.2, ease: 'power3.out' }),
    gsap.quickTo(c, 'y', { duration: 1.2, ease: 'power3.out' })
  ])
})
</script>
