<template>
  <Section ref="sectionRef" class="px-4 md:px-7 lg:px-16 xxl:px-30 py-6 md:py-10 lg:py-16">
    <HeadingH2 class="max-w-72 sm:max-w-96 md:max-w-none text-center text-blanco">
      Todo empieza con una idea. <span class="text-amarillo">Todo sucede en el mismo equipo.</span>
    </HeadingH2>

    <div class="w-full max-w-260 relative mt-2 md:mt-8">
      <div class="w-px absolute top-0 bottom-0 left-4 md:left-1/2 bg-blanco/10 md:-translate-x-1/2">
        <div class="w-full h-full bg-amarillo shadow-amarilla origin-top" :style="{ transform: `scaleY(${progress})` }" />
      </div>

      <div v-for="(paso, i) in pasos" :key="paso.title"
        class="flex flex-col md:flex-row md:items-center gap-5 md:gap-0 relative pl-10 md:pl-0 mb-14 md:mb-24 last:mb-0"
        :class="i % 2 ? 'md:flex-row-reverse' : ''">
        <span class="size-4 flex justify-center items-center absolute top-1/2 left-4 md:left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
          <span class="size-4 absolute bg-amarillo/25 rounded-full transition-transform duration-500 ease-out"
            :class="reached(i) ? 'scale-150' : 'scale-0'" />
          <span class="size-2 relative rounded-full transition-colors duration-500"
            :class="reached(i) ? 'bg-amarillo shadow-amarilla' : 'bg-blanco/30'" />
        </span>

        <div class="md:w-1/2 transition-all duration-700 ease-out" :class="[
          i % 2 ? 'md:pl-12 lg:pl-20' : 'md:pr-12 lg:pr-20',
          reached(i) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        ]">
          <div class="relative rounded-2xl transition-all duration-500 overflow-hidden"
            :class="reached(i) ? 'shadow-amarilla' : ''">
            <NuxtImg :src="paso.image" :alt="paso.title" format="avif,webp" sizes="600px" loading="lazy"
              class="w-full aspect-8/7 sm:aspect-16/10 object-cover transition-transform duration-700 ease-out"
              :class="reached(i) ? 'scale-100' : 'scale-110'" />
            <div class="absolute inset-0 rounded-2xl border border-blanco/10" />
          </div>
        </div>

        <div class="md:w-1/2 flex flex-col gap-2 md:gap-3 transition-all duration-700 ease-out delay-150" :class="[
          i % 2 ? 'md:pr-12 lg:pr-20 md:text-right md:items-end' : 'md:pl-12 lg:pl-20',
          reached(i) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        ]">
          <span class="text-6xl lg:text-7xl text-amarillo font-bold leading-none">0{{ i + 1 }}</span>
          <h3 class="text-xl lg:text-2xl text-blanco font-bold">{{ paso.title }}</h3>
          <p class="max-w-100 text-sm lg:text-base text-blanco/70 font-medium">{{ paso.text }}</p>
        </div>
      </div>
    </div>
  </Section>
</template>

<script setup>
import { pasos } from '~/constants/agencia'

const sectionRef = ref(null)
const progress = useScrollProgress(sectionRef, (r, vh) => (vh * 0.75 - r.top) / r.height)

const reached = (i) => progress.value * pasos.length >= i + 0.35
</script>
