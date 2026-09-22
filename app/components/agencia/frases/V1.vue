<template>
  <DefaultSection bg="bg-negro"
    class="relative z-10 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 xxl:px-30 py-12 md:py-16 lg:py-20 xxl:py-24 mac:py-16"
    inner="gap-8 lg:gap-14">
    <UiHeadingH2 class="max-w-80 md:max-w-none text-center">
      ¿Te suena <span class="text-amarillo">alguna de estas frases?</span>
    </UiHeadingH2>

    <ul ref="muro" class="w-full max-w-4xl flex flex-col gap-5 lg:gap-8">
      <li v-for="(frase, i) in frases" :key="frase" class="flex" :class="i % 2 ? 'justify-end' : 'justify-start'">
        <div class="max-w-[88%] md:max-w-[78%] flex flex-col gap-2 glass p-4 md:p-6 lg:p-8"
          :class="i % 2 ? 'rounded-3xl rounded-br-md items-end text-right' : 'rounded-3xl rounded-bl-md'">
          <p class="text-blanco text-base md:text-2xl lg:text-4xl font-medium italic leading-[1.25]">
            “{{ frase }}”
          </p>
          <span class="text-hueso/50 text-xs lg:text-sm font-light">{{ quien[i] }}</span>
        </div>
      </li>
    </ul>

    <div class="flex flex-col items-center gap-4 lg:gap-6">
      <p class="text-center text-amarillo text-base lg:text-[1.75rem] font-medium">Para eso estamos.</p>
      <UiButtonPrimary to="#contacto" variant="glass" size="glass" class="gap-3 pl-6 pr-4">
        Hablemos de tu marca
        <Icon name="material-symbols:arrow-forward-rounded" class="size-4 lg:size-6 shrink-0" />
      </UiButtonPrimary>
    </div>
  </DefaultSection>
</template>

<script setup>
import { frases } from '~/constants/agencia'
import { useGsapContext } from '~/composables/useGsapContext'

const quien = ['Una marca de consumo masivo', 'Una empresa de servicios', 'Una pyme industrial']

const muro = useTemplateRef('muro')

useGsapContext(muro, (ctx, gsap, ScrollTrigger) => {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

  const globos = muro.value.querySelectorAll('li > div')

  globos.forEach((globo, i) => {
    gsap.set(globo, { autoAlpha: 0, y: 28, scale: 0.94, transformOrigin: i % 2 ? 'right bottom' : 'left bottom' })
  })

  ScrollTrigger.batch(globos, {
    start: 'top 90%',
    once: true,
    onEnter: (lote) => gsap.to(lote, {
      autoAlpha: 1, y: 0, scale: 1, duration: 0.7, ease: 'back.out(1.6)', stagger: 0.35, overwrite: true
    })
  })
})
</script>
