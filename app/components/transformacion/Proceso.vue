<template>
  <DefaultSection bg="bg-negro"
    class="relative z-10 overflow-visible! px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 xxl:px-30 py-12 md:py-16 lg:py-0"
    inner="gap-8 lg:gap-12">
    <div ref="root" class="w-full flex flex-col justify-center items-center gap-8 lg:gap-20 relative lg:h-svh lg:overflow-hidden lg:pt-28 lg:pb-10">
      <div ref="titulo" class="lg:flex lg:justify-center lg:items-center lg:absolute lg:inset-0">
        <UiHeadingH2 class="text-center text-amarillo! font-semibold lg:text-6xl! xxl:text-7xl! lg:leading-[1.1]"
          :aria-label="lineasTitulo.join(' ')">
          <span v-for="linea in lineasTitulo" :key="linea" class="block" aria-hidden="true">
            <span v-for="(letra, i) in linea" :key="i" class="letra inline-block whitespace-pre">{{ letra }}</span>
          </span>
        </UiHeadingH2>
      </div>

      <div class="w-full grid grid-cols-1 lg:grid-cols-3 lg:items-center gap-10 lg:gap-6 xxl:gap-8 relative">
        <article v-for="item in proceso" ref="cards" :key="item.title"
          class="w-full flex flex-col gap-4 lg:gap-5 glass rounded-3xl p-2 lg:p-2.5">
          <div
            class="w-full aspect-8/7 sm:aspect-16/10 lg:aspect-4/3 mac:aspect-16/10 flex flex-col justify-end relative rounded-2xl overflow-hidden">
            <NuxtImg :src="item.image" :alt="item.title" format="avif" sizes="600px lg:480px" loading="lazy"
              class="size-full absolute inset-0 object-cover" />
            <div class="absolute inset-0 bg-linear-to-b from-black/25 to-black" />

            <span
              class="relative text-amarillo text-[5.5rem] lg:text-[8rem] font-bold -mb-4 md:-mb-6 lg:-mb-10 -ml-2 md:-ml-3 lg:-ml-4">
              {{ item.number }}
            </span>
          </div>

          <div class="flex flex-col gap-2 lg:gap-3 px-3 pb-4 lg:px-4 lg:pb-5">
            <h3 class="text-hueso text-lg lg:text-xl xxl:text-2xl font-medium">{{ item.title }}</h3>
            <p class="max-w-120 text-hueso/70 text-sm lg:text-base font-light leading-normal">{{ item.text }}</p>
          </div>
        </article>
      </div>

      <div ref="boton" class="relative shrink-0">
        <UiButtonPrimary to="#contacto" variant="glass" size="glass" class="gap-3 pl-6 pr-4">
          Quiero empezar
          <Icon name="material-symbols:arrow-forward-rounded" class="size-4 lg:size-6 shrink-0" />
        </UiButtonPrimary>
      </div>
    </div>
  </DefaultSection>
</template>

<script setup>
import { proceso } from '~/constants/transformacion'
import { useGsapContext } from '~/composables/useGsapContext'

const root = useTemplateRef('root')
const titulo = useTemplateRef('titulo')
const cards = useTemplateRef('cards')
const boton = useTemplateRef('boton')

const desfases = [16, 40, 0]
const lineasTitulo = ['No necesitás entender', 'de IA para comenzar']

useGsapContext(root, (ctx, gsap, ScrollTrigger) => {
  if (!cards.value?.length || window.matchMedia('(max-width: 1079px), (prefers-reduced-motion: reduce)').matches) return

  gsap.fromTo(titulo.value.querySelectorAll('.letra'),
    { opacity: 0.08 },
    {
      opacity: 1,
      ease: 'none',
      stagger: 0.03,
      scrollTrigger: {
        trigger: root.value.closest('section'),
        start: 'top bottom',
        end: () => `top top-=${window.innerHeight * 0.6}`,
        scrub: 1,
        invalidateOnRefresh: true
      }
    }
  )

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: root.value,
      start: 'top top',
      end: () => `+=${window.innerHeight * 4}`,
      pin: true,
      pinSpacing: true,
      scrub: 1,
      invalidateOnRefresh: true
    }
  })

  tl.fromTo(cards.value,
    { y: () => window.innerHeight },
    { y: (i) => desfases[i], ease: 'sine.out', duration: 1.5, stagger: 0.25 },
    0.5
  )
    .to(titulo.value, { scale: 0.94, ease: 'none', duration: 1.8 }, 0.6)
    .fromTo(boton.value,
      { y: () => window.innerHeight * 0.4, autoAlpha: 0 },
      { y: 0, autoAlpha: 1, ease: 'sine.out', duration: 1.1 },
      1.45
    )
    .to({}, { duration: 0.25 })

  requestAnimationFrame(() => ScrollTrigger.refresh())
})
</script>
