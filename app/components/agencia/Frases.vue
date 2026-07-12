<template>
  <Section bg="bg-linear-to-b from-negro from-33% to-negro-puro to-100%" class="px-4 md:px-7 lg:px-16 xxl:px-30 py-6 md:py-10 lg:py-16">
    <HeadingH2 class="max-w-56 md:max-w-none text-center text-amarillo">¿Te suena alguna de estas frases?</HeadingH2>

    <CarouselAutoplay class="w-full" :interval="INTERVAL">
      <div v-for="frase in frases" :key="frase" class="flex justify-center items-center px-2 md:px-8">
        <p class="max-w-176 text-center text-base md:text-2xl lg:text-4xl text-blanco font-medium italic">
          “{{ frase }}”
        </p>
      </div>

      <template #dots="{ current, goTo, playing }">
        <div class="flex justify-center items-center gap-1 mt-4 md:mt-6 lg:mt-8">
          <button v-for="(frase, i) in frases" :key="frase" type="button" :aria-label="`Frase ${i + 1}`"
            @click="goTo(i)"
            class="h-0.5 relative bg-blanco rounded-full shadow-amarilla transition-all duration-300 cursor-pointer"
            :class="i === current ? 'w-12' : 'w-6'">
            <span v-if="i === current && playing" class="fill-line h-full absolute inset-y-0 left-0 block bg-amarillo rounded-full"
              :style="{ animationDuration: `${INTERVAL}ms` }" />
          </button>
        </div>
      </template>
    </CarouselAutoplay>

    <p class="text-center text-base lg:text-[1.75rem] text-amarillo font-medium">Para eso estamos.</p>
  </Section>
</template>

<script setup>
import { frases } from '~/constants/agencia'

const INTERVAL = 5000
</script>

<style scoped>
.fill-line {
  animation: fill-line linear forwards;
}

@keyframes fill-line {
  from { width: 0 }
  to { width: 100% }
}
</style>
