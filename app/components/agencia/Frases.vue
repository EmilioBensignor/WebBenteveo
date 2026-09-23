<template>
  <DefaultSection bg="bg-negro"
    class="relative z-10 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 xxl:px-30 py-12 md:py-16 lg:py-20 xxl:py-24 mac:py-16">
    <div ref="escena"
      class="w-full lg:h-[26rem] xxl:h-[28rem] flex flex-col items-center gap-3 lg:block relative">
      <div
        class="flex flex-col items-center gap-3 lg:gap-5 text-center lg:absolute lg:left-1/2 lg:top-1/2 lg:-translate-x-1/2 lg:-translate-y-1/2 mb-5 lg:mb-0">
        <UiHeadingH2 class="max-w-80 lg:max-w-md">
          ¿Te suena <span class="text-amarillo">alguna de estas frases?</span>
        </UiHeadingH2>
        <p class="text-amarillo text-base lg:text-[1.75rem] font-medium">Para eso estamos.</p>
      </div>

      <div v-for="(c, i) in comentarios" :key="c.texto" class="w-full flex lg:w-auto lg:absolute"
        :class="[posiciones[i], i % 2 ? 'justify-end' : 'justify-start']">
        <div ref="globos"
          class="max-w-[85%] sm:max-w-sm lg:max-w-xs xxl:max-w-sm flex flex-col gap-1 glass rounded-2xl px-4 py-3 lg:px-5 lg:py-4"
          :class="i % 2 ? 'rounded-br-sm' : 'rounded-bl-sm'">
          <p class="text-hueso text-sm lg:text-base leading-[1.4]">{{ c.texto }}</p>
          <span class="text-hueso/50 text-xs font-light">{{ c.autor }}</span>
        </div>
      </div>
    </div>
  </DefaultSection>
</template>

<script setup>
import { comentarios } from '~/constants/agencia'
import { useGsapContext } from '~/composables/useGsapContext'

const posiciones = [
  'lg:left-0 lg:top-[4%]',
  'lg:right-[2%] lg:top-0',
  'lg:left-[4%] lg:bottom-[4%]',
  'lg:right-0 lg:bottom-0'
]

const escena = useTemplateRef('escena')
const globos = useTemplateRef('globos')

useGsapContext(escena, (ctx, gsap) => {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

  gsap.set(globos.value, { autoAlpha: 0, scale: 0.6, y: 20 })

  gsap.to(globos.value, {
    autoAlpha: 1,
    scale: 1,
    y: 0,
    duration: 0.6,
    ease: 'back.out(2)',
    stagger: { each: 0.25, from: 'random' },
    scrollTrigger: { trigger: escena.value, start: 'top 70%', once: true }
  })

  globos.value.forEach((globo, i) => {
    gsap.to(globo.parentElement, {
      y: i % 2 ? -10 : 10,
      duration: 2.5 + (i % 3) * 0.6,
      ease: 'sine.inOut',
      repeat: -1,
      yoyo: true,
      delay: 1.5 + i * 0.2
    })
  })
})
</script>
