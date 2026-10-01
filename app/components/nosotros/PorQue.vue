<template>
  <section ref="root" class="w-full relative z-10 bg-negro">
    <div class="w-full min-h-176 md:min-h-160 lg:min-h-dvh relative overflow-hidden flex items-end px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 xxl:px-30 py-12 md:py-16 lg:py-20 xxl:py-24 mac:py-14">
      <div class="absolute inset-x-0 top-0 bottom-60 md:bottom-0 overflow-hidden">
        <NuxtImg ref="img" src="/img/nosotros/por-que.webp" alt="Equipo de Benteveo trabajando" width="1500" height="1001"
          sizes="100vw" loading="lazy" class="size-full absolute inset-0 object-cover grayscale scale-110" />
        <div class="absolute inset-0 bg-linear-to-t from-negro md:from-black via-black/70 to-black/30 lg:bg-linear-to-r lg:from-black/95 lg:via-black/70 lg:to-black/20" />
      </div>

      <div class="w-full max-w-362 mx-auto relative z-1 flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between lg:gap-16">
        <div ref="texto" class="w-full lg:max-w-160 flex flex-col gap-3 lg:gap-8">
          <UiHeadingH2 class="text-amarillo!">Por qué existimos</UiHeadingH2>
          <p class="text-hueso text-base md:text-2xl lg:text-3xl xxl:text-4xl font-light leading-tight text-balance">
            Nacimos porque estábamos cansados de ver una idea <span class="text-amarillo font-semibold">perderse en la traducción</span> entre quien la piensa y quien la produce.
          </p>
          <div class="w-full max-w-140 flex flex-col gap-4 lg:gap-5 mt-2">
            <div class="w-full flex items-center gap-3 md:gap-4">
              <span class="text-hueso text-lg lg:text-2xl font-bold">2011</span>
              <span class="relative flex-1 h-px bg-blanco/20">
                <span ref="linea" class="absolute inset-0 origin-left bg-amarillo" />
              </span>
              <span class="text-hueso text-lg lg:text-2xl font-bold">Hoy</span>
            </div>
            <p class="text-hueso/80 text-sm lg:text-base leading-[1.4] font-light">Mismo modelo, más manos, nuevas fronteras.</p>
            <ul ref="listaPaises" class="flex flex-wrap gap-2">
              <li v-for="p in paises" :key="p"
                class="rounded-full border border-blanco/50 bg-negro/40 text-hueso text-xs lg:text-sm py-1.5 px-4">{{ p }}</li>
            </ul>
          </div>
        </div>

        <ul ref="listaMetricas" class="w-full lg:w-auto grid grid-cols-1 md:grid-cols-3 lg:grid-cols-1 gap-2 md:gap-4 lg:gap-2 shrink-0">
          <li v-for="(m, i) in metricas" :key="m.value"
            class="glass lg:bg-negro/50! rounded-2xl flex items-center justify-between md:flex-col md:items-start md:justify-start lg:flex-row lg:items-center lg:justify-between gap-4 md:gap-3 lg:gap-6 px-3 py-2 md:px-6 md:py-4 lg:min-w-80">
            <span class="text-amarillo text-4xl md:text-5xl xxl:text-6xl font-bold leading-none tabular-nums lg:w-36">{{ mostrados[i] }}</span>
            <span class="text-hueso text-[0.625rem] md:text-xs lg:text-sm font-medium uppercase text-right md:text-left tracking-[0.15em] md:tracking-[0.2em]">
              <span v-for="l in m.label" :key="l" class="block">{{ l }}</span>
            </span>
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>

<script setup>
import { paises, metricas } from '~/constants/nosotros'
import { useConteo } from '~/composables/useConteo'
import { useGsapContext } from '~/composables/useGsapContext'

const root = useTemplateRef('root')
const img = useTemplateRef('img')
const texto = useTemplateRef('texto')
const listaMetricas = useTemplateRef('listaMetricas')
const linea = useTemplateRef('linea')
const listaPaises = useTemplateRef('listaPaises')

const mostrados = useConteo(metricas, listaMetricas)

useGsapContext(root, (ctx, gsap) => {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

  gsap.fromTo(img.value.$el, { yPercent: -5 }, {
    yPercent: 5, ease: 'none',
    scrollTrigger: { trigger: root.value, start: 'top bottom', end: 'bottom top', scrub: true }
  })

  gsap.timeline({ scrollTrigger: { trigger: root.value, start: 'top 40%', once: true }, defaults: { ease: 'power3.out' } })
    .from(texto.value.children, { autoAlpha: 0, y: 40, duration: 1, stagger: 0.12 })
    .from(listaMetricas.value.children, { autoAlpha: 0, x: 40, duration: 0.9, stagger: 0.1 }, 0.3)
    .from(listaPaises.value.children, { autoAlpha: 0, y: 12, duration: 0.5, stagger: 0.12 }, 1.2)

  gsap.fromTo(linea.value, { scaleX: 0 }, {
    scaleX: 1, duration: 1.4, ease: 'power2.inOut',
    scrollTrigger: { trigger: linea.value, start: 'top 85%', end: 'bottom top', toggleActions: 'restart reset restart reset' }
  })
})
</script>
