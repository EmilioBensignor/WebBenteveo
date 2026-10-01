<template>
  <section ref="root" class="w-full h-dvh sticky top-0 overflow-hidden bg-negro px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 xxl:px-30"
    :class="cubierto && 'invisible'" @pointermove="mover" @pointerleave="soltar">
    <SharedLuces ref="luces" class="z-0 opacity-30" />

    <ul ref="palabras" class="absolute inset-x-0 top-0 bottom-0 mac:top-[7%] z-1 pointer-events-none [@media(max-height:480px)]:hidden" aria-hidden="true">
      <li v-for="p in palabrasVista" :key="p.texto" class="absolute -translate-1/2 whitespace-nowrap will-change-transform"
        :class="p.visibilidad" :style="p.posicion">
        <span class="block will-change-transform">
          <span class="block text-hueso font-bold leading-none will-change-transform" :class="p.estilo" :style="{ opacity: p.opacidad }">
            {{ p.texto }}
          </span>
        </span>
      </li>
    </ul>

    <div class="w-full h-full flex justify-center items-center relative z-2">
      <div class="w-full max-w-180 flex flex-col items-center gap-5 lg:gap-8 text-center [@media(max-height:480px)]:gap-3 [@media(max-height:480px)]:pt-16">
        <UiHeadingH1 ref="titulo" class="text-amarillo text-balance">Un equipo, una visión</UiHeadingH1>
        <p class="max-w-120 text-hueso text-sm md:text-base lg:text-xl font-light text-balance">La creatividad como herramienta para construir conexiones potentes.</p>
        <NosotrosHeroAcciones class="mt-2" />
      </div>
    </div>
  </section>

  <div ref="recorrido" class="w-full h-[120vh] pointer-events-none" aria-hidden="true" />
</template>

<script setup>
import { useGsapContext } from '~/composables/useGsapContext'

const root = useTemplateRef('root')
const palabras = useTemplateRef('palabras')
const titulo = useTemplateRef('titulo')
const recorrido = useTemplateRef('recorrido')
const luces = useTemplateRef('luces')

const cubierto = ref(false)

const TAMANOS = [
  'text-[clamp(1.25rem,3vw,3.5rem)]',
  'text-[clamp(0.875rem,2vw,2.25rem)]',
  'text-[clamp(0.8125rem,0.6rem+0.8vw,1.375rem)]'
]

const DESENFOQUE = ['blur-[2px]', '', 'blur-[1px]']

const OPACIDAD = [0.18, 0.35, 0.8]

const PALABRAS = [
  ['Ideas', 12, 24, 0], ['Estrategia', 34, 20, 1], ['Contenido', 60, 25, 0], ['Diseño', 85, 21, 2],
  ['Video', 22, 34, 2, false, true], ['Experiencias', 76, 33, 2, false, true],
  ['Producción', 11, 46, 1, true], ['Marca', 16, 58, 2, true], ['Redes', 89, 45, 1, true], ['Datos', 86, 58, 0, true],
  ['Performance', 19, 74, 1], ['Campañas', 34, 84, 0], ['Eventos', 56, 76, 2, false, true], ['Tecnología', 76, 85, 0]
].map(([texto, x, y, capa, lado = false, centro = false]) => ({ texto, x, y, capa, lado, centro }))

const palabrasVista = computed(() => PALABRAS.map((p) => ({
  texto: p.texto,
  posicion: { left: `${p.x}%`, top: `${p.y}%` },
  visibilidad: {
    'hidden md:block': p.lado,
    'max-lg:[@media(max-height:640px)]:hidden': p.centro
  },
  estilo: [TAMANOS[p.capa], DESENFOQUE[p.capa]],
  opacidad: OPACIDAD[p.capa]
})))

let seguir = []

function revisar() {
  if (!recorrido.value || !root.value) return
  cubierto.value = window.scrollY >= recorrido.value.offsetHeight + root.value.offsetHeight
}

function mover(e) {
  if (e.pointerType !== 'mouse') return
  const r = root.value.getBoundingClientRect()
  const dx = (e.clientX - r.left) / r.width - 0.5
  const dy = (e.clientY - r.top) / r.height - 0.5
  seguir.forEach(([x, y], i) => {
    const prof = [10, 22, 40][PALABRAS[i].capa]
    x(-dx * prof * 2)
    y(-dy * prof * 2)
  })
}

function soltar() {
  seguir.forEach(([x, y]) => {
    x(0)
    y(0)
  })
}

onMounted(() => window.addEventListener('scroll', revisar, { passive: true }))
onBeforeUnmount(() => window.removeEventListener('scroll', revisar))

useGsapContext(root, (ctx, gsap, ScrollTrigger) => {
  const items = [...palabras.value.children]
  const internos = items.map((li) => li.firstElementChild)
  const flotantes = internos.map((el) => el.firstElementChild)
  const h1 = titulo.value.$el

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

  gsap.from(flotantes, { autoAlpha: 0, scale: 0.6, duration: 1.2, stagger: { each: 0.05, from: 'random' }, ease: 'power3.out' })
  flotantes.forEach((el, i) => {
    gsap.to(el, { y: (i % 2 ? 1 : -1) * (6 + (i % 3) * 4), duration: 2.6 + (i % 4) * 0.6, ease: 'sine.inOut', repeat: -1, yoyo: true, delay: 1.2 })
  })

  seguir = items.map((li) => [
    gsap.quickTo(li, 'x', { duration: 1.2, ease: 'power3.out' }),
    gsap.quickTo(li, 'y', { duration: 1.2, ease: 'power3.out' })
  ])

  const tl = gsap.timeline({
    scrollTrigger: {
      start: 0,
      end: () => recorrido.value.offsetHeight,
      scrub: 0.6,
      invalidateOnRefresh: true
    }
  })

  PALABRAS.forEach((p, i) => {
    tl.to(internos[i], {
      x: () => (50 - p.x) / 100 * root.value.clientWidth,
      y: () => root.value.clientHeight / 2 - palabras.value.offsetTop - p.y / 100 * palabras.value.clientHeight,
      scale: 0.2,
      opacity: 0,
      ease: 'power2.in',
      duration: 0.6
    }, (i % 5) * 0.06)
  })

  tl.fromTo(h1, { textShadow: '0 0 0 rgba(252,183,22,0)' }, { textShadow: '0 0 36px rgba(252,183,22,0.65)', scale: 1.06, ease: 'power2.out', duration: 0.3 }, 0.55)
    .to(luces.value.root, { opacity: 0.7, duration: 0.3 }, 0.55)
    .to({}, { duration: 0.25 })

  ScrollTrigger.refresh()
})
</script>
