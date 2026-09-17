<template>
  <DefaultSection bg="bg-negro"
    class="relative z-10 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 xxl:px-30 py-12 md:py-16 lg:py-20 xxl:py-24 mac:py-16"
    inner="gap-8 lg:gap-12">
    <div class="w-full flex flex-col items-center gap-3 md:gap-4 text-center">
      <UiHeadingH2>
        Cuatro cosas que cambian en tu empresa
        cuando integrás IA a tus procesos
      </UiHeadingH2>
      <p class="text-hueso text-sm lg:text-base font-light">Dejá de apagar incendios y empezá a crecer.</p>
    </div>

    <div ref="grilla" class="w-full max-w-362 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-4 lg:gap-6 xxl:gap-8">
      <TransformacionBeneficioCard v-for="b in beneficios" :key="b.number" :beneficio="b" />
    </div>
  </DefaultSection>
</template>

<script setup>
import { beneficios } from '~/constants/transformacion'
import { useGsapContext } from '~/composables/useGsapContext'

const grilla = useTemplateRef('grilla')

useGsapContext(grilla, (ctx, gsap, ScrollTrigger) => {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

  const cards = grilla.value.children

  gsap.set(cards, { y: 80, autoAlpha: 0 })

  ScrollTrigger.batch(cards, {
    start: 'top 90%',
    once: true,
    onEnter: (lote) => gsap.to(lote, {
      y: 0,
      autoAlpha: 1,
      duration: 0.9,
      ease: 'power3.out',
      stagger: 0.15,
      overwrite: true
    })
  })
})
</script>
