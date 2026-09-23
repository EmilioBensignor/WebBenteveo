<template>
  <DefaultSection bg="bg-negro"
    class="relative z-10 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 xxl:px-30 py-12 md:py-16 lg:py-20 xxl:py-24 mac:py-16"
    inner="gap-8 lg:gap-12">
    <UiHeadingH2 class="max-w-80 md:max-w-none text-center font-light">
      Conoce algunas de las soluciones para tu industria
    </UiHeadingH2>

    <div class="w-full">
      <div ref="emblaRef" class="w-full overflow-hidden">
        <div class="flex gap-3 md:gap-4 lg:gap-8 xxl:gap-12">
          <NuxtLink v-for="ind in industrias" :key="ind.slug" :to="`/transformacion-tecnologica/${ind.slug}`"
            :data-cursor-label="`Ver soluciones para ${ind.label}`" data-cursor-arrow
            class="w-[70vw] sm:w-72 md:w-80 lg:w-100 xxl:w-120 h-40 md:h-52 lg:h-80 xxl:h-96 group shrink-0 flex flex-col justify-end relative border border-blanco/33 rounded-2xl overflow-hidden p-4 lg:p-5">
            <NuxtImg :src="ind.image" :alt="ind.label" format="avif" sizes="400px lg:480px"
              class="size-full absolute inset-0 object-cover transition-transform duration-700 ease-out lg:group-hover:scale-105"
              loading="lazy" />
            <div class="absolute inset-0 bg-linear-to-b from-transparent from-55% to-black/70" />

            <div class="flex flex-col md:flex-row md:items-center gap-2 lg:gap-3 relative">
              <Icon :name="ind.icon" class="size-6! lg:size-8! xxl:size-9! shrink-0 text-amarillo" />
              <p
                class="text-hueso text-sm md:text-base lg:text-xl xxl:text-2xl leading-[1.2] transition-colors duration-300 lg:group-hover:text-amarillo">
                {{ ind.label }}
              </p>
            </div>
          </NuxtLink>
        </div>
      </div>

      <div ref="track" class="w-full py-3 mt-6 lg:mt-9 cursor-pointer touch-none" @pointerdown="agarrar"
        @pointermove="arrastrar" @pointerup="soltar" @pointercancel="soltar">
        <div class="relative w-full h-1 rounded-full overflow-hidden bg-blanco/10">
          <div class="absolute inset-y-0 rounded-full bg-amarillo shadow-amarilla"
            :style="{ width: `${ancho * 100}%`, left: `${progreso * (1 - ancho) * 100}%` }" />
        </div>
      </div>
    </div>
  </DefaultSection>
</template>

<script setup>
import emblaCarouselVue from 'embla-carousel-vue'
import { industrias } from '~/constants/transformacion'

const [emblaRef, embla] = emblaCarouselVue({ align: 'start', containScroll: 'trimSnaps', dragFree: true, duration: 30 })
const track = useTemplateRef('track')
const progreso = ref(0)
const ancho = ref(1)
let arrastrando = false

function medir() {
  const api = embla.value
  ancho.value = Math.min(api.rootNode().clientWidth / api.containerNode().scrollWidth, 1)
  progreso.value = Math.min(Math.max(api.scrollProgress(), 0), 1)
}

function mover(e) {
  const { left, width } = track.value.getBoundingClientRect()
  const p = Math.min(Math.max((e.clientX - left) / width, 0), 1)
  const snaps = embla.value?.scrollSnapList().length ?? 1
  embla.value?.scrollTo(Math.round(p * (snaps - 1)))
}

function agarrar(e) {
  arrastrando = true
  track.value.setPointerCapture(e.pointerId)
  mover(e)
}

function arrastrar(e) {
  if (arrastrando) mover(e)
}

function soltar() {
  arrastrando = false
}

watch(embla, (api) => {
  if (!api) return
  api.on('scroll', medir).on('reInit', medir).on('resize', medir)
  medir()
})
</script>
