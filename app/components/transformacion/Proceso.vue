<template>
  <DefaultSection bg="bg-negro"
    class="relative z-10 overflow-visible! px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 xxl:px-30 py-12 md:py-16 lg:py-20 xxl:py-24 mac:py-16"
    inner="gap-8 lg:gap-12">
    <UiHeadingH2 class="max-w-80 md:max-w-none text-center font-light">
      No necesitás <span class="text-amarillo">entender de IA</span> para comenzar
    </UiHeadingH2>

    <div ref="root" class="w-full">
      <div class="w-full lg:overflow-hidden">
        <div ref="pista" class="flex flex-col lg:flex-row gap-10 lg:gap-8 xxl:gap-12">
          <article v-for="(item, i) in proceso" :key="item.title"
            class="w-full lg:w-160 xxl:w-180 shrink-0 flex flex-col gap-4 lg:gap-6">
            <div class="w-full relative rounded-2xl overflow-hidden border border-blanco/10">
              <NuxtImg :src="item.image" :alt="item.title" format="avif" sizes="600px lg:720px" loading="lazy"
                class="w-full aspect-8/7 sm:aspect-16/10 object-cover" />
              <div class="absolute inset-0 bg-linear-to-b from-transparent from-55% to-black/70" />
            </div>

            <div class="flex flex-col gap-2 lg:gap-3">
              <span class="text-amarillo text-4xl lg:text-5xl xxl:text-6xl leading-none">{{ String(i + 1).padStart(2,
                '0') }}</span>
              <span v-if="item.pill"
                class="w-max flex items-center gap-2 bg-amarillo/10 border border-amarillo/40 rounded-full text-amarillo text-xs lg:text-sm font-medium py-1.5 px-4">
                {{ item.pill }}
              </span>
              <h3 class="text-hueso text-lg lg:text-xl xxl:text-2xl font-medium">{{ item.title }}</h3>
              <p class="max-w-120 text-hueso/70 text-sm lg:text-base font-light leading-normal">{{ item.text }}</p>
            </div>
          </article>
        </div>
      </div>

      <div class="hidden lg:block w-full h-px bg-blanco/10 mt-12">
        <div class="h-full origin-left bg-amarillo shadow-amarilla"
          :style="{ transform: `scaleX(${Math.max(progreso, 0.02)})` }" />
      </div>
    </div>

    <UiButtonPrimary to="#contacto" variant="glass" size="glass" class="gap-3 pl-6 pr-4">
      Quiero empezar
      <Icon name="material-symbols:arrow-forward-rounded" class="size-4 lg:size-6 shrink-0" />
    </UiButtonPrimary>
  </DefaultSection>
</template>

<script setup>
import { proceso } from '~/constants/transformacion'
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
