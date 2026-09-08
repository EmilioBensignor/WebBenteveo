<template>
  <section ref="root" class="w-full relative">
    <div
      class="w-full min-h-dvh flex justify-center items-center relative z-10 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 xxl:px-30 py-28 md:py-32 lg:py-36">
      <div
        class="w-full max-w-362 flex flex-col items-center gap-6 md:gap-8 lg:flex-row lg:justify-between lg:items-center lg:gap-8 xl:gap-12">
        <div
          class="w-full lg:flex-1 lg:min-w-0 lg:max-w-186 flex flex-col items-center gap-5 lg:items-start lg:gap-8 xl:gap-12">
          <div class="w-full flex flex-col items-center gap-4 lg:items-start">
            <UiHeadingH1 class="text-center lg:text-left text-amarillo text-balance">
              Ideas para conectar.<br>Estrategia para crecer.<br>Tecnología para transformar.
            </UiHeadingH1>

            <p class="w-full lg:max-w-137 text-center lg:text-left text-hueso text-sm md:text-base lg:text-xl">
              Integramos creatividad, producción y transformación tecnológica mediante IA para resolver desafíos de
              marca y mejorar procesos de negocio.
            </p>
          </div>

          <div class="flex flex-col items-center gap-3 md:flex-row md:gap-6">
            <UiButtonPrimary to="#contacto" variant="glass" size="glass" class="pl-6 pr-4"
              @click.prevent="irA('contacto')">
              Hablemos
              <Icon name="material-symbols:arrow-forward-rounded" class="size-4 lg:size-6" />
            </UiButtonPrimary>

            <UiButtonPrimary to="#servicios" variant="glass" size="glass" class="pl-4 pr-6"
              @click.prevent="irA('servicios')">
              <Icon name="material-symbols:search-rounded" class="size-4 lg:size-6" />
              Conoce como trabajamos
            </UiButtonPrimary>
          </div>
        </div>

        <div ref="hueco"
          class="w-full max-w-90 aspect-square sm:max-w-100 md:w-110 md:h-110 md:max-w-none lg:w-88 lg:h-88 xl:w-110 xl:h-110 xxl:w-125 xxl:h-125 mac:w-96 mac:h-96 shrink-0" />
      </div>
    </div>

    <div ref="marco" class="fixed z-0 bg-negro overflow-hidden pointer-events-none transition-opacity duration-300"
      :class="visible ? 'opacity-100' : 'opacity-0'">
      <video ref="video" src="/video/home/Benteveo-Agencia-Publicitaria.mp4"
        class="w-dvw h-dvh absolute left-1/2 top-1/2 max-w-none -translate-x-1/2 -translate-y-1/2 object-cover" autoplay
        loop muted playsinline />
    </div>

    <div ref="disparador" class="w-full h-[160vh]" aria-hidden="true" />
  </section>
</template>

<script setup>
import { scrollToEl } from '~/composables/useSmoothScroll'
import { useGsapContext } from '~/composables/useGsapContext'

const root = useTemplateRef('root')
const hueco = useTemplateRef('hueco')
const marco = useTemplateRef('marco')
const video = useTemplateRef('video')
const disparador = useTemplateRef('disparador')

const visible = ref(true)

let observer = null

function irA(id) {
  scrollToEl(id, -100)
}

onMounted(() => {
  video.value?.play().catch(() => { })

  if (!root.value) return

  observer = new IntersectionObserver(([entrada]) => {
    visible.value = entrada.isIntersecting
  }, { threshold: 0 })

  observer.observe(root.value)
})

onBeforeUnmount(() => observer?.disconnect())

useGsapContext(root, (ctx, gsap) => {
  if (!marco.value || !hueco.value || !disparador.value) return

  const inicio = () => {
    const caja = hueco.value.getBoundingClientRect()
    return {
      width: caja.width,
      height: caja.height,
      top: caja.top + (window.scrollY || 0),
      left: caja.left,
      borderRadius: caja.width / 2
    }
  }

  gsap.set(marco.value, inicio())

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

  ctx.add(() => {
    gsap.timeline({
      scrollTrigger: {
        trigger: root.value,
        start: 'top top',
        end: () => `+=${window.innerHeight}`,
        scrub: 0.5,
        invalidateOnRefresh: true,
        onRefresh: () => gsap.set(marco.value, inicio())
      }
    }).fromTo(
      marco.value,
      inicio,
      {
        width: () => window.innerWidth,
        height: () => window.innerHeight,
        top: 0,
        left: 0,
        borderRadius: 0,
        ease: 'power1.inOut'
      }
    )
  })
})
</script>
