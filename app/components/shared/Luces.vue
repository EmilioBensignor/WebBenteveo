<template>
  <div ref="root" class="absolute inset-0 overflow-hidden pointer-events-none mix-blend-screen" aria-hidden="true">
    <div ref="blobA"
      class="absolute left-[8%] top-[12%] -ml-36 -mt-36 md:-ml-55 md:-mt-55 lg:-ml-70 lg:-mt-70 size-72 md:size-110 lg:size-140 rounded-full bg-amarillo/40 blur-[120px] md:blur-[160px]" />
    <div ref="blobB"
      class="absolute left-[92%] top-[28%] -ml-36 -mt-36 md:-ml-55 md:-mt-55 lg:-ml-67 lg:-mt-67 size-72 md:size-110 lg:size-135 rounded-full bg-amarillo/32 blur-[110px] md:blur-[150px]" />
    <div ref="blobC"
      class="absolute left-[15%] top-[82%] -ml-32 -mt-32 md:-ml-50 md:-mt-50 lg:-ml-62 lg:-mt-62 size-64 md:size-100 lg:size-125 rounded-full bg-amarillo/28 blur-[130px] md:blur-[170px]" />
    <div ref="blobD"
      class="absolute left-[78%] top-[88%] -ml-32 -mt-32 md:-ml-47 md:-mt-47 lg:-ml-60 lg:-mt-60 size-64 md:size-95 lg:size-120 rounded-full bg-amarillo/25 blur-[120px] md:blur-[160px]" />
    <div ref="blobE"
      class="absolute left-1/2 top-1/2 -ml-28 -mt-28 md:-ml-45 md:-mt-45 lg:-ml-55 lg:-mt-55 size-56 md:size-90 lg:size-110 rounded-full bg-amarillo/18 blur-[140px] md:blur-[180px]" />

    <slot />
  </div>
</template>

<script setup>
import { useGsapContext } from '~/composables/useGsapContext'

const root = useTemplateRef('root')
const blobA = useTemplateRef('blobA')
const blobB = useTemplateRef('blobB')
const blobC = useTemplateRef('blobC')
const blobD = useTemplateRef('blobD')
const blobE = useTemplateRef('blobE')

useGsapContext(root, (ctx, gsap) => {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

  const flotar = (el, x, y, escala, duracion) => {
    gsap.to(el, {
      x, y, scale: escala,
      duration: duracion,
      ease: 'sine.inOut',
      repeat: -1,
      yoyo: true,
      transformOrigin: 'center center'
    })
  }

  flotar(blobA.value, 520, 420, 1.5, 7)
  flotar(blobB.value, -560, 460, 1.4, 9)
  flotar(blobC.value, 600, -430, 1.55, 8)
  flotar(blobD.value, -540, -400, 1.45, 10)
  flotar(blobE.value, 460, -500, 1.6, 11)
})

defineExpose({ root })
</script>
