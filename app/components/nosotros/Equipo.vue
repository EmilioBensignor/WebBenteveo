<template>
  <section ref="root" class="w-full flex flex-col justify-center items-center gap-8 lg:gap-12 relative z-10 overflow-hidden bg-negro px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 xxl:px-30 py-12 md:py-16 lg:py-20 xxl:py-24 mac:py-14">
    <div ref="encabezado" class="relative z-1 flex flex-col items-center gap-3 lg:gap-4 text-center">
      <UiHeadingH2 class="text-balance">Quiénes lo hacen posible</UiHeadingH2>
      <p class="text-hueso text-sm lg:text-base font-light leading-[1.4] text-balance">Estrategas, creativos y productores, todos en la misma mesa.</p>
    </div>

    <div ref="escena"
      class="w-full h-60 sm:h-64 md:h-80 lg:h-84 xl:h-96 mac:h-72 relative z-1 flex justify-center items-center touch-pan-y select-none cursor-grab active:cursor-grabbing"
      aria-hidden="true" @pointerdown="agarrar" @pointermove="arrastrar" @pointerup="soltar" @pointercancel="soltar">
      <div ref="anillo" class="size-0 absolute left-1/2 top-1/2 transform-3d">
        <div v-for="(persona, i) in tarjetas" :key="i"
          class="w-(--card) aspect-3/4 absolute left-0 top-0 rounded-2xl overflow-hidden border bg-negro [--card:6.5rem] sm:[--card:7.5rem] md:[--card:9.5rem] lg:[--card:10rem] xl:[--card:11.5rem] mac:[--card:9rem]">
          <div class="absolute inset-x-0 bottom-0 h-3/4 bg-[radial-gradient(ellipse_at_bottom,rgba(252,183,22,0.3)_0%,rgba(252,183,22,0)_70%)]" />
          <img :src="persona.foto" alt="" width="600" height="800" loading="eager" draggable="false"
            class="size-full absolute inset-0 object-cover object-top">
        </div>
      </div>

      <div ref="cartel" :style="{ width: anchoCartel }"
        class="glass h-10 lg:h-12 absolute left-1/2 top-full z-2 -translate-x-1/2 -translate-y-1/2 rounded-full overflow-hidden transition-[width] duration-500 ease-out">
        <div ref="medida" class="invisible absolute flex flex-col items-center whitespace-nowrap px-5 lg:px-6">
          <span class="text-xs lg:text-sm font-semibold">{{ frente.nombre }}</span>
          <span class="text-[0.625rem] lg:text-xs font-light">{{ frente.rol }}</span>
        </div>
        <Transition mode="out-in" enter-active-class="transition duration-300 ease-out" leave-active-class="transition duration-200 ease-in"
          enter-from-class="opacity-0 translate-y-1.5 blur-xs" leave-to-class="opacity-0 -translate-y-1.5 blur-xs">
          <div :key="frente.nombre + frente.rol" class="size-full flex flex-col justify-center items-center whitespace-nowrap">
            <span class="text-hueso text-xs lg:text-sm font-semibold">{{ frente.nombre }}</span>
            <span class="text-amarillo text-[0.625rem] lg:text-xs font-light">{{ frente.rol }}</span>
          </div>
        </Transition>
      </div>
    </div>
  </section>
</template>

<script setup>
import { equipo } from '~/constants/nosotros'
import { useGsapContext } from '~/composables/useGsapContext'

const root = useTemplateRef('root')
const encabezado = useTemplateRef('encabezado')
const escena = useTemplateRef('escena')
const anillo = useTemplateRef('anillo')
const cartel = useTemplateRef('cartel')
const medida = useTemplateRef('medida')

const CRUCERO = -0.045
const n = equipo.length
const huecos = ref(n)
const tarjetas = computed(() => Array.from({ length: huecos.value }, (_, i) => equipo[i % n]))
const indiceFrente = ref(0)
const frente = computed(() => tarjetas.value[indiceFrente.value] ?? equipo[0])
const anchoCartel = ref('auto')

function medirCartel() {
  anchoCartel.value = `${medida.value.offsetWidth + 2}px`
}

watch(frente, () => nextTick(medirCartel))

let angulo = 0
let velocidad = CRUCERO
let raf = null
let io = null
let visible = true
let reducido = false
let arrastre = null
let radio = 0

function medir() {
  const card = anillo.value.firstElementChild.offsetWidth
  const minimo = (card / 2 / Math.tan(Math.PI / n)) * 1.12
  radio = Math.max(minimo, root.value.offsetWidth * 0.5)
  escena.value.style.perspective = `${radio * 2}px`
  let cantidad = Math.max(n, Math.ceil((2 * Math.PI * radio) / (card * 1.12)))
  if (cantidad % n === 1) cantidad++
  huecos.value = cantidad
  encuadrar(card * (4 / 3))
  medirCartel()
  if (reducido) nextTick(pintar)
}

function encuadrar(alto) {
  const p = radio * 2
  const inclinacion = Math.PI / 30
  let arriba = 0
  let abajo = 0
  let frente = 0
  for (let g = 0; g < 360; g += 5) {
    const cos = Math.cos((g * Math.PI) / 180)
    const y = radio * cos * Math.sin(inclinacion)
    const escala = p / (p + radio - radio * cos * Math.cos(inclinacion))
    arriba = Math.min(arriba, (y - (alto / 2) * Math.cos(inclinacion)) * escala)
    abajo = Math.max(abajo, (y + (alto / 2) * Math.cos(inclinacion)) * escala)
    if (g === 0) frente = abajo
  }
  const centro = -arriba
  escena.value.style.height = `${abajo - arriba + cartel.value.offsetHeight / 2}px`
  escena.value.style.perspectiveOrigin = `50% ${centro}px`
  anillo.value.style.top = `${centro}px`
  cartel.value.style.top = `${centro + frente}px`
}

function pintar() {
  const cards = [...anillo.value.children]
  const paso = 360 / cards.length
  anillo.value.style.transform = `translateZ(${-radio}px) rotateX(-6deg) rotateY(${angulo}deg)`

  let mejor = 0
  let mejorCos = -2
  cards.forEach((el, i) => {
    const a = ((i * paso + angulo) * Math.PI) / 180
    const cos = Math.cos(a)
    if (cos > mejorCos) {
      mejorCos = cos
      mejor = i
    }
    el.style.transform = `translate(-50%, -50%) rotateY(${i * paso}deg) translateZ(${radio}px)`
    el.style.opacity = String(0.25 + Math.max(0, cos) * 0.75)
    el.style.filter = `brightness(${0.45 + Math.max(0, cos) * 0.65})`
    el.lastElementChild.style.filter = `grayscale(${1 - Math.min(1, Math.max(0, (cos - 0.93) / 0.055))})`
  })
  cards.forEach((el, i) => {
    el.style.borderColor = i === mejor ? 'rgba(252,183,22,0.9)' : 'rgba(248,248,248,0.33)'
    el.style.boxShadow = i === mejor ? '0 0 18px 0 rgba(252,183,22,0.33)' : 'none'
  })
  indiceFrente.value = mejor
}

function bucle() {
  raf = requestAnimationFrame(bucle)
  if (!visible) return
  if (!arrastre) {
    angulo += velocidad
    velocidad += (CRUCERO - velocidad) * 0.02
  }
  pintar()
}

function agarrar(e) {
  arrastre = { x: e.clientX, ultimo: e.clientX }
  escena.value.setPointerCapture(e.pointerId)
}

function arrastrar(e) {
  if (!arrastre) return
  const dx = e.clientX - arrastre.ultimo
  arrastre.ultimo = e.clientX
  angulo += dx * 0.15
  velocidad = dx * 0.25
}

function soltar() {
  arrastre = null
  velocidad = Math.max(-3, Math.min(3, velocidad))
}

useGsapContext(root, (ctx, gsap) => {
  reducido = window.matchMedia('(prefers-reduced-motion: reduce)').matches

  medir()
  const ro = new ResizeObserver(medir)
  ro.observe(escena.value)
  ctx.add(() => () => ro.disconnect())

  io = new IntersectionObserver(([e]) => (visible = e.isIntersecting))
  io.observe(root.value)

  if (reducido) {
    velocidad = 0
    return
  }

  raf = requestAnimationFrame(bucle)

  gsap.timeline({ defaults: { ease: 'power3.out' }, scrollTrigger: { trigger: root.value, start: 'top 75%', once: true } })
    .from(encabezado.value, { autoAlpha: 0, y: 40, duration: 1 }, 0)
    .from(escena.value, { autoAlpha: 0, y: 60, scale: 0.9, duration: 1.3 }, 0.1)
    .fromTo({ v: -4 }, { v: -4 }, {
      v: CRUCERO,
      duration: 2.2,
      ease: 'power2.out',
      onUpdate() {
        velocidad = this.targets()[0].v
      }
    }, 0.2)
})

onBeforeUnmount(() => {
  cancelAnimationFrame(raf)
  io?.disconnect()
})
</script>
