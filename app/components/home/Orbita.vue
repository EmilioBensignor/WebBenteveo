<template>
  <div ref="rootRef" class="w-full aspect-square max-w-90 md:max-w-none md:aspect-4/3 lg:aspect-16/10 relative">
    <svg viewBox="0 0 400 300" class="w-full h-full absolute inset-0" aria-hidden="true">
      <defs>
        <radialGradient id="orbita-halo" cx="0.5" cy="0.5">
          <stop offset="0%" stop-color="#FCB716" stop-opacity="0.28" />
          <stop offset="100%" stop-color="#FCB716" stop-opacity="0" />
        </radialGradient>
        <linearGradient v-for="(d, i) in disciplinas" :id="`orbita-trazo-${i}`" :key="d.nombre" x1="0" y1="0" x2="1"
          y2="0" gradientUnits="objectBoundingBox">
          <stop offset="0%" stop-color="#FCB716" stop-opacity="0.05" />
          <stop offset="100%" stop-color="#FCB716" stop-opacity="0.55" />
        </linearGradient>
      </defs>

      <circle cx="200" cy="150" r="120" fill="url(#orbita-halo)" />

      <g ref="trazosRef" fill="none" stroke-width="1" stroke-linecap="round">
        <path v-for="(d, i) in disciplinas" :key="d.nombre" :d="d.path" :stroke="`url(#orbita-trazo-${i})`" />
      </g>

      <circle ref="pulsoRef" cx="200" cy="150" r="46" fill="none" stroke="#FCB716" stroke-opacity="0.35"
        stroke-width="1" />

      <g ref="chispasRef">
        <circle v-for="d in disciplinas" :key="d.nombre" r="2.5" fill="#FCB716" />
      </g>
    </svg>

    <div class="absolute inset-0 grid place-items-center">
      <div
        class="flex flex-col items-center gap-0.5 rounded-full bg-negro border border-amarillo/40 shadow-amarilla px-6 py-4">
        <span class="text-gris text-[10px] tracking-[0.18em] uppercase">Tu</span>
        <span class="text-hueso text-sm lg:text-base font-semibold">negocio</span>
      </div>
    </div>

    <div ref="chipsRef" class="absolute inset-0">
      <span v-for="d in disciplinas" :key="d.nombre"
        class="flex items-center gap-2 absolute glass glass-solido rounded-full text-hueso text-xs lg:text-sm whitespace-nowrap px-3 py-1.5 lg:px-4 lg:py-2"
        :style="d.pos">
        <Icon :name="d.icon" class="size-4 text-amarillo" />
        {{ d.nombre }}
      </span>
    </div>
  </div>
</template>

<script setup>
const disciplinas = [
  {
    nombre: 'Tecnología',
    icon: 'material-symbols:terminal-rounded',
    path: 'M330 62 C 300 92, 268 108, 232 128',
    pos: { top: '12%', right: '2%' }
  },
  {
    nombre: 'Producción',
    icon: 'material-symbols:videocam-outline-rounded',
    path: 'M330 246 C 296 220, 268 196, 232 174',
    pos: { bottom: '14%', right: '6%' }
  },
  {
    nombre: 'Creatividad',
    icon: 'material-symbols:brush-outline-rounded',
    path: 'M62 154 C 104 154, 132 152, 168 151',
    pos: { top: '46%', left: '0%' }
  }
]

const rootRef = ref(null)
const trazosRef = ref(null)
const chispasRef = ref(null)
const chipsRef = ref(null)
const pulsoRef = ref(null)

let ctx = null

onMounted(async () => {
  if (typeof window === 'undefined') return

  const { gsap } = await import('gsap')
  const { ScrollTrigger } = await import('gsap/ScrollTrigger')
  gsap.registerPlugin(ScrollTrigger)

  const trazos = [...trazosRef.value.children]
  const chispas = [...chispasRef.value.children]
  const chips = [...chipsRef.value.children]

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    chispas.forEach((chispa, i) => colocar(chispa, trazos[i], 1))
    return
  }

  ctx = gsap.context(() => {
    trazos.forEach((trazo) => {
      const largo = trazo.getTotalLength()
      gsap.set(trazo, { strokeDasharray: largo, strokeDashoffset: largo })
    })

    const entrada = gsap.timeline({
      scrollTrigger: { trigger: rootRef.value, start: 'top 75%' }
    })

    entrada
      .to(trazos, { strokeDashoffset: 0, duration: 1.1, ease: 'power3.out', stagger: 0.14 })
      .from(chips, { opacity: 0, scale: 0.88, duration: 0.6, ease: 'power3.out', stagger: 0.14 }, '-=0.8')

    chispas.forEach((chispa, i) => {
      gsap.to({ t: 0 }, {
        t: 1,
        duration: 3.2,
        repeat: -1,
        ease: 'power1.inOut',
        delay: i * 0.9,
        onUpdate() {
          colocar(chispa, trazos[i], this.targets()[0].t)
        }
      })
    })

    gsap.to(pulsoRef.value, {
      attr: { r: 58 },
      opacity: 0,
      duration: 2.8,
      repeat: -1,
      ease: 'power2.out'
    })
  }, rootRef.value)
})

onBeforeUnmount(() => {
  ctx?.revert()
  ctx = null
})

function colocar(chispa, trazo, t) {
  const punto = trazo.getPointAtLength(trazo.getTotalLength() * (1 - t))
  chispa.setAttribute('cx', punto.x)
  chispa.setAttribute('cy', punto.y)
  chispa.setAttribute('opacity', Math.sin(t * Math.PI))
}
</script>
