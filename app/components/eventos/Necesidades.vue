<template>
  <DefaultSection bg="bg-negro"
    class="relative z-10 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 xxl:px-30 py-12 md:py-16 lg:py-20 xxl:py-24 mac:py-16"
    inner="gap-8 lg:gap-12">
    <UiHeadingH2 class="max-w-80 md:max-w-none text-center">
      Todo lo que necesitás, <span class="text-amarillo">resuelto en un solo lugar</span>
    </UiHeadingH2>

    <ul ref="grilla" class="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-4 lg:gap-x-8 xxl:gap-x-12">
      <li v-for="n in necesidades" :key="n.title"
        class="flex flex-col gap-3 lg:gap-4 border-t border-blanco/20 py-6 lg:py-8">
        <Icon :name="n.icon" class="size-6 lg:size-8 shrink-0 text-amarillo" />
        <h3 class="text-hueso text-base lg:text-xl leading-[1.3]">{{ n.title }}</h3>
        <p class="text-hueso/70 text-sm lg:text-base leading-[1.4] font-light">{{ n.text }}</p>
      </li>
    </ul>

    <div class="flex flex-col items-center gap-4">
      <p class="text-hueso text-sm lg:text-base font-light">¿Ya tenés algo en mente?</p>
      <UiButtonPrimary to="#contacto" variant="glass" size="glass" class="gap-3 pl-6 pr-4">
        Hablemos de tu evento
        <Icon name="material-symbols:arrow-forward-rounded" class="size-4 lg:size-6 shrink-0" />
      </UiButtonPrimary>
    </div>
  </DefaultSection>
</template>

<script setup>
import { necesidades } from '~/constants/eventos'
import { useGsapContext } from '~/composables/useGsapContext'

const grilla = useTemplateRef('grilla')

useGsapContext(grilla, (ctx, gsap, ScrollTrigger) => {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

  const items = grilla.value.children

  gsap.set(items, { y: 60, autoAlpha: 0 })

  ScrollTrigger.batch(items, {
    start: 'top 90%',
    once: true,
    onEnter: (lote) => gsap.to(lote, {
      y: 0,
      autoAlpha: 1,
      duration: 0.8,
      ease: 'power3.out',
      stagger: 0.12,
      overwrite: true
    })
  })
})
</script>
