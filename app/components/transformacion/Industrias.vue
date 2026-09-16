<template>
  <DefaultSection bg="bg-negro"
    class="relative z-10 overflow-visible! px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 xxl:px-30 py-12 md:py-16 lg:py-20 xxl:py-24 mac:py-16"
    inner="gap-8 lg:gap-12">
    <UiHeadingH2 class="max-w-80 md:max-w-none text-center font-light">
      Conocé algunas de las soluciones para tu industria
    </UiHeadingH2>

    <div ref="root" class="w-full">
      <div class="w-full lg:overflow-hidden">
        <div ref="pista" class="grid grid-cols-2 md:grid-cols-3 lg:flex gap-3 md:gap-4 lg:gap-8 xxl:gap-12">
          <NuxtLink v-for="ind in industrias" :key="ind.slug" :to="`/transformacion-tecnologica/${ind.slug}`"
            :data-cursor-label="`Ver soluciones para ${ind.label}`" data-cursor-arrow
            class="w-full lg:w-100 xxl:w-120 h-40 md:h-52 lg:h-80 xxl:h-96 group shrink-0 flex flex-col justify-end relative border border-blanco/33 rounded-2xl overflow-hidden p-4 lg:p-5">
            <NuxtImg :src="ind.image" :alt="ind.label" format="avif" sizes="400px lg:480px"
              class="size-full absolute inset-0 object-cover transition-transform duration-700 ease-out lg:group-hover:scale-105"
              loading="lazy" />
            <div class="absolute inset-0 bg-linear-to-b from-transparent from-55% to-black/70" />

            <div class="flex items-center gap-2 lg:gap-3 relative">
              <Icon :name="ind.icon" class="size-6! lg:size-8! xxl:size-9! shrink-0 text-amarillo" />
              <p
                class="text-hueso text-base lg:text-xl xxl:text-2xl leading-[1.2] transition-colors duration-300 lg:group-hover:text-amarillo">
                {{ ind.label }}
              </p>
            </div>
          </NuxtLink>
        </div>
      </div>

      <div class="hidden lg:block w-full h-px bg-blanco/10 mt-12">
        <div class="h-full origin-left bg-amarillo shadow-amarilla"
          :style="{ transform: `scaleX(${Math.max(progreso, 0.02)})` }" />
      </div>
    </div>
  </DefaultSection>
</template>

<script setup>
import { industrias } from '~/constants/transformacion'
import { useGsapContext } from '~/composables/useGsapContext'

const root = useTemplateRef('root')
const pista = useTemplateRef('pista')
const progreso = ref(0)

useGsapContext(root, (ctx, gsap, ScrollTrigger) => {
  if (!pista.value || window.matchMedia('(max-width: 1079px)').matches) return

  const seccion = root.value.closest('section')
  const recorrido = () => Math.max(pista.value.scrollWidth - root.value.offsetWidth, 0)

  gsap.to(pista.value, {
    x: () => -recorrido(),
    ease: 'none',
    scrollTrigger: {
      trigger: seccion,
      start: 'top top+=112',
      end: () => `+=${recorrido()}`,
      pin: true,
      pinSpacing: true,
      scrub: 1,
      invalidateOnRefresh: true,
      onUpdate: (self) => {
        progreso.value = self.progress
      }
    }
  })

  requestAnimationFrame(() => ScrollTrigger.refresh())
})
</script>
