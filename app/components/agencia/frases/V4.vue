<template>
  <section ref="root" class="w-full relative z-10 bg-negro">
    <div
      class="w-full max-w-362 flex flex-col items-center gap-3 lg:gap-4 text-center mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 xxl:px-30 pt-12 md:pt-16 lg:pt-20 xxl:pt-24 mac:pt-16">
      <UiHeadingH2 class="max-w-80 md:max-w-none">
        ¿Te suena <span class="text-amarillo">alguna de estas frases?</span>
      </UiHeadingH2>
      <p class="text-hueso text-sm lg:text-base font-light">Scrolleá. Seguro reconocés más de una.</p>
    </div>

    <div class="w-full max-w-362 flex flex-col mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 xxl:px-30">
      <div v-for="(item, i) in frasesRespuestas" :key="item.frase"
        class="h-dvh flex justify-center items-center sticky top-0">
        <article ref="tarjetas"
          class="w-full max-w-4xl flex flex-col gap-5 lg:gap-8 glass rounded-3xl lg:rounded-[2rem] p-6 md:p-10 lg:p-14"
          :style="{ zIndex: i + 1 }">
          <span class="flex items-center gap-3 text-hueso/60 text-xs lg:text-sm font-light tabular-nums">
            {{ String(i + 1).padStart(2, '0') }}
            <span class="h-px flex-1 bg-blanco/15" />
            {{ String(frasesRespuestas.length).padStart(2, '0') }}
          </span>

          <p class="text-blanco text-xl md:text-3xl lg:text-5xl font-medium italic leading-[1.15]">
            “{{ item.frase }}”
          </p>

          <p class="flex items-start gap-3 text-hueso/70 text-sm lg:text-xl font-light leading-[1.4]">
            <Icon name="material-symbols:arrow-forward-rounded" class="size-4 lg:size-6 shrink-0 mt-1 text-amarillo" />
            <span>{{ item.respuesta }}</span>
          </p>
        </article>
      </div>
    </div>

    <div
      class="w-full max-w-362 flex flex-col items-center gap-4 mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 xxl:px-30 pb-12 md:pb-16 lg:pb-20 xxl:pb-24 mac:pb-16">
      <p class="text-center text-amarillo text-base lg:text-[1.75rem] font-medium">Para eso estamos.</p>
      <UiButtonPrimary to="#contacto" variant="glass" size="glass" class="gap-3 pl-6 pr-4">
        Hablemos de tu marca
        <Icon name="material-symbols:arrow-forward-rounded" class="size-4 lg:size-6 shrink-0" />
      </UiButtonPrimary>
    </div>
  </section>
</template>

<script setup>
import { frasesRespuestas } from '~/constants/agencia'
import { useGsapContext } from '~/composables/useGsapContext'

const root = useTemplateRef('root')
const tarjetas = useTemplateRef('tarjetas')

useGsapContext(root, (ctx, gsap, ScrollTrigger) => {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

  tarjetas.value.slice(0, -1).forEach((tarjeta) => {
    gsap.to(tarjeta, {
      scale: 0.92,
      autoAlpha: 0.35,
      ease: 'none',
      scrollTrigger: {
        trigger: tarjeta,
        start: 'center center',
        end: 'bottom top',
        scrub: true,
        invalidateOnRefresh: true
      }
    })
  })
})
</script>
