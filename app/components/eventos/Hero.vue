<template>
  <section ref="root" class="h-dvh w-full sticky top-0 isolate overflow-hidden bg-negro-puro"
    :class="cubierto && 'invisible'">
    <video ref="reproductor" :src="heroEventos.video" :poster="heroEventos.poster" class="size-full absolute inset-0 object-cover" autoplay
      loop muted playsinline preload="metadata" />

    <div ref="capa" class="absolute inset-0 flex justify-center items-center bg-negro-puro mix-blend-multiply">
      <span class="text-white text-[18vw] font-bold leading-none tracking-[-0.05em] whitespace-nowrap select-none" aria-hidden="true">
        <span v-for="(letra, i) in palabra" ref="letras" :key="i" class="inline-block leading-none">{{ letra }}</span>
      </span>
    </div>

    <SharedLuces ref="luces" class="opacity-50">
      <div ref="tapa" class="absolute inset-0 flex justify-center items-center">
        <span class="text-negro-puro text-[18vw] font-bold leading-none tracking-[-0.05em] whitespace-nowrap select-none">
          <span v-for="(letra, i) in palabra" :key="i" class="inline-block leading-none">{{ letra }}</span>
        </span>
      </div>
    </SharedLuces>

    <svg class="size-0 absolute" aria-hidden="true">
      <filter id="contorno-eventos" x="-5%" y="-5%" width="110%" height="110%" color-interpolation-filters="sRGB">
        <feMorphology in="SourceAlpha" operator="dilate" :radius="grosor" result="engrosado" />
        <feComposite in="engrosado" in2="SourceAlpha" operator="out" result="borde" />
        <feFlood flood-color="#FCB716" />
        <feComposite in2="borde" operator="in" />
      </filter>
    </svg>

    <div ref="trazo" class="absolute inset-0 flex justify-center items-center pointer-events-none" aria-hidden="true">
      <span
        class="text-white text-[18vw] font-bold leading-none tracking-[-0.05em] whitespace-nowrap select-none [filter:url(#contorno-eventos)]">
        <span v-for="(letra, i) in palabra" :key="i" class="inline-block leading-none">{{ letra }}</span>
      </span>
    </div>

    <div class="absolute inset-0 z-10 flex justify-center items-center pointer-events-none">
      <span
        class="inline-block relative text-transparent text-[18vw] font-bold leading-none tracking-[-0.05em] whitespace-nowrap select-none">
        <span v-for="(letra, i) in palabra" :key="i" class="inline-block leading-none" aria-hidden="true">{{ letra }}</span>
        <span ref="intro"
          class="block absolute inset-x-0 top-[86%] text-center text-amarillo text-sm lg:text-xl font-light leading-[1.25] tracking-normal whitespace-normal pt-4 md:pt-6 lg:pt-8">
          {{ heroEventos.eyebrow }}
        </span>
      </span>
    </div>

    <div ref="sombra" class="absolute inset-0 bg-black/50 opacity-0" />

    <div ref="final"
      class="absolute inset-0 z-10 flex flex-col justify-center items-center gap-6 lg:gap-10 text-center invisible opacity-0 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 xxl:px-30">
      <div class="flex flex-col items-center gap-3 lg:gap-5">
        <p class="text-hueso text-sm lg:text-xl font-light">{{ heroEventos.eyebrow }}</p>
        <h1
          class="max-w-80 md:max-w-2xl lg:max-w-4xl xxl:max-w-5xl text-amarillo text-3xl md:text-5xl lg:text-6xl xxl:text-7xl font-bold leading-[1.05] tracking-[-0.02em]">
          {{ heroEventos.title }}
        </h1>
      </div>

      <div class="flex flex-col md:flex-row items-stretch md:items-center gap-2 lg:gap-4">
        <UiButtonPrimary to="#contacto" variant="glass" size="glass" class="gap-3 pl-6 pr-4">
          Hablemos de tu evento
          <Icon name="material-symbols:calendar-month-outline-rounded" class="size-4 lg:size-6 shrink-0" />
        </UiButtonPrimary>
        <UiButtonPrimary to="#proyectos" variant="glass" size="glass" class="gap-3 pl-6 pr-4">
          Ver casos de éxito
          <Icon name="material-symbols:arrow-forward-rounded" class="size-4 lg:size-6 shrink-0" />
        </UiButtonPrimary>
      </div>
    </div>
  </section>

  <div ref="recorrido" class="w-full h-[180vh]" aria-hidden="true" />
</template>

<script setup>
import { heroEventos } from '~/constants/eventos'
import { useGsapContext } from '~/composables/useGsapContext'

const root = useTemplateRef('root')
const reproductor = useTemplateRef('reproductor')
const recorrido = useTemplateRef('recorrido')
const capa = useTemplateRef('capa')
const luces = useTemplateRef('luces')
const tapa = useTemplateRef('tapa')
const trazo = useTemplateRef('trazo')
const letras = useTemplateRef('letras')
const intro = useTemplateRef('intro')
const sombra = useTemplateRef('sombra')
const final = useTemplateRef('final')

const palabra = 'EVENTOS'.split('')
const INDICE_T = 4
const grosor = ref(2)
const cubierto = ref(false)

function medirGrosor() {
  const ancho = window.innerWidth
  grosor.value = ancho >= 1080 ? 2.5 : ancho >= 768 ? 2 : 1.5
}

function revisar() {
  if (!root.value || !recorrido.value) return
  const tapado = window.scrollY >= recorrido.value.offsetHeight + root.value.offsetHeight
  if (tapado === cubierto.value) return

  cubierto.value = tapado
  if (tapado) reproductor.value?.pause()
  else reproductor.value?.play().catch(() => { })
}

onMounted(() => {
  medirGrosor()
  revisar()
  window.addEventListener('resize', medirGrosor)
  window.addEventListener('scroll', revisar, { passive: true })
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', medirGrosor)
  window.removeEventListener('scroll', revisar)
})

function origen() {
  const letra = letras.value[INDICE_T].getBoundingClientRect()
  const marco = capa.value.getBoundingClientRect()
  return `${letra.left - marco.left + letra.width / 2}px ${letra.top - marco.top + letra.height * 0.55}px`
}

useGsapContext(root, (ctx, gsap) => {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    gsap.set([capa.value, luces.value.root, trazo.value, intro.value], { autoAlpha: 0 })
    gsap.set(sombra.value, { opacity: 1 })
    gsap.set(final.value, { autoAlpha: 1 })
    return
  }

  gsap.timeline({
    scrollTrigger: {
      start: 0,
      end: () => recorrido.value.offsetHeight,
      scrub: 1,
      invalidateOnRefresh: true
    }
  })
    .to(intro.value, { autoAlpha: 0, y: -20, ease: 'none', duration: 0.25 }, 0)
    .fromTo([capa.value, tapa.value, trazo.value],
      { scale: 1, transformOrigin: origen },
      { scale: 70, ease: 'power3.in', duration: 1 },
      0
    )
    .to(trazo.value, { autoAlpha: 0, ease: 'none', duration: 0.3 }, 0.15)
    .to([capa.value, luces.value.root], { autoAlpha: 0, ease: 'none', duration: 0.1 }, 0.9)
    .to(sombra.value, { opacity: 1, ease: 'none', duration: 0.3 }, 0.95)
    .fromTo(final.value, { autoAlpha: 0, y: 40 }, { autoAlpha: 1, y: 0, ease: 'power2.out', duration: 0.4 }, 1.05)
    .to({}, { duration: 0.45 })
})
</script>
