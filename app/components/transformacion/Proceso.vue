<template>
  <DefaultSection bg="bg-negro"
    class="relative z-10 overflow-visible! px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 xxl:px-30 py-12 md:py-16 lg:py-0"
    inner="gap-8 lg:gap-12">
    <div ref="root" class="w-full flex flex-col justify-center items-center gap-8 md:gap-10 lg:gap-20 relative lg:h-svh lg:overflow-hidden lg:pt-28 lg:pb-10">
      <div ref="titulo" class="lg:flex lg:justify-center lg:items-center lg:absolute lg:inset-0">
        <UiHeadingH2
          class="text-center lg:text-amarillo! lg:font-semibold lg:text-6xl! xxl:text-7xl! lg:leading-[1.1]"
          :aria-label="lineasTitulo.join(' ')">
          <span v-for="linea in lineasTitulo" :key="linea" class="lg:block" aria-hidden="true">
            <template v-for="(palabra, p) in linea.split(' ')" :key="p">
              <span class="inline-block whitespace-nowrap">
                <span v-for="(letra, i) in palabra" :key="i" class="letra inline-block">{{ letra }}</span>
              </span>{{ ' ' }}
            </template>
          </span>
        </UiHeadingH2>
      </div>

      <div class="w-full grid grid-cols-1 lg:grid-cols-3 lg:items-center gap-8 md:gap-6 xxl:gap-8 relative">
        <article v-for="item in proceso" ref="cards" :key="item.title"
          class="w-full flex flex-col tab:flex-row lg:flex-col gap-6 lg:gap-5 lg:glass lg:rounded-3xl lg:p-2.5">
          <div
            class="w-full tab:w-2/5 lg:w-full aspect-16/11 tab:aspect-auto lg:aspect-4/3 mac:aspect-16/10 tab:min-h-52 md:min-h-60 lg:min-h-0 shrink-0 flex flex-col justify-end relative border border-blanco/33 lg:border-0 rounded-2xl overflow-hidden">
            <NuxtImg :src="item.image" :alt="item.title" format="avif" sizes="480px tab:420px lg:480px" loading="lazy"
              class="size-full absolute inset-0 object-cover" />
            <div class="absolute inset-0 bg-linear-to-b from-black/25 to-black" />

            <span
              class="relative text-amarillo text-[5.5rem] lg:text-[8rem] font-bold -mb-7 lg:-mb-10 -ml-2 md:-ml-3 lg:-ml-4">
              {{ item.number }}
            </span>
          </div>

          <div class="flex-1 min-w-0 flex flex-col justify-center gap-2 lg:gap-3 px-3 tab:px-0 tab:pr-4 lg:px-4 lg:pb-5">
            <h3 class="text-hueso text-lg md:text-xl xxl:text-2xl font-medium leading-tight">{{ item.title }}</h3>
            <p class="max-w-120 text-hueso/70 text-sm lg:text-base font-light leading-normal">{{ item.text }}</p>
          </div>
        </article>
      </div>

      <div ref="boton" class="w-full tab:w-auto relative shrink-0">
        <UiButtonPrimary to="#contacto" variant="glass" size="glass" class="w-full tab:w-max gap-3 pl-6 pr-4">
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
  if (!cards.value?.length || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

  if (window.matchMedia('(max-width: 1079px)').matches) {
    gsap.from(titulo.value, {
      y: 40,
      autoAlpha: 0,
      duration: 0.9,
      ease: 'power3.out',
      scrollTrigger: { trigger: titulo.value, start: 'top 85%', once: true }
    })

    gsap.set([...cards.value, boton.value], { y: 60, autoAlpha: 0 })

    ScrollTrigger.batch([...cards.value, boton.value], {
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
    return
  }

  gsap.fromTo(titulo.value.querySelectorAll('.letra'),
    { opacity: 0.08 },
    {
      opacity: 1,
      ease: 'none',
      stagger: 0.03,
      scrollTrigger: {
        trigger: root.value.closest('section'),
        start: 'top 45%',
        end: () => `top top-=${window.innerHeight * 0.3}`,
        scrub: 1,
        invalidateOnRefresh: true
      }
    }
  )

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: root.value,
      start: 'top top',
      end: () => `+=${window.innerHeight * 2.6}`,
      pin: true,
      pinSpacing: true,
      scrub: 1,
      invalidateOnRefresh: true
    }
  })

  tl.fromTo(cards.value,
    { y: () => window.innerHeight },
    { y: (i) => desfases[i], ease: 'sine.out', duration: 1.5, stagger: 0.25 },
    0.1
  )
    .to(titulo.value, { scale: 0.9, autoAlpha: 0, ease: 'power1.in', duration: 0.9 }, 0.3)
    .fromTo(boton.value,
      { y: () => window.innerHeight * 0.4, autoAlpha: 0 },
      { y: 0, autoAlpha: 1, ease: 'sine.out', duration: 1.1 },
      1.05
    )
    .to({}, { duration: 0.05 })

  requestAnimationFrame(() => ScrollTrigger.refresh())
})
</script>
